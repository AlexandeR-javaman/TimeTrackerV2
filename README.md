# TimeTrackerV2

Приложение для учёта рабочего времени сотрудников.

## Архитектура приложения

**TimeTrackerV2** — это микросервисное веб-приложение для учёта рабочего времени сотрудников, построенное на базе **Spring Boot 3.4.5**, **React 18**, **PostgreSQL**, **Keycloak** и **Apache Kafka**.

### 📐 Общая архитектура

```
┌────────────────────────────────────────────────────────────────┐
│                         Браузер пользователя                   │
│  React SPA (порт 3000, nginx)                                  │
└──┬──────────────────────────────────────────────┬──────────────┘
   │  Аутентификация                              │
   ▼                                              │
┌─────────────────┐                               │
│  Keycloak       │                               │
│  (порт 8080)    │                               │
│                 │     валидация JWT             │
│  • Выдача JWT   │       ┌───────────────────────┘
│  • Управление   │       │
│    ролями       │       │
└─────────────────┘       ▼
┌────────────────────────────────────────────────────────────────┐
│                        API Gateway (порт 8090)                 │
│  • Обратный прокси (Spring Cloud Gateway)                      │
│  • Валидация JWT через Keycloak (OAuth2 Resource Server)       │
│  • CORS для фронтенда                                          │
└───┬───────────────────────┬────────────────────────────────────┘
    │ /employees_...        │ /log_entry_...        
    ▼                       ▼                       
┌──────────────┐       ┌──────────────┐   ┌──────────────────────┐
│ Employees    │       │ Log Entry    │   │  Mail Sender         │
│ Service      │       │ Service      │   │  (порт 8083)         │
│ (порт 8081)  │       │ (порт 8082)  │   │                      │
│              │ ◄─────┤              │   │  • Consumer ← Kafka  │
│ • CRUD       │  REST │ • Учёт смен  │   │  • REST → Employees  │
│   сотрудников│       │ • Scheduler  │   │    (email/fio)       │
│ • Admin API  │       │   (10 сек)   │   │  • Отправка email    │
│   → Keycloak │       │ • Producer   │   │    (SMTP)            │
│   (создание/ │       │   → Kafka    │   │                      │
│   удаление)  │       │              │   └──────────┬───┬───────┘
│ • Своя БД    │       │ • Своя БД    │              │   │
└───────┬──────┘       └───────┬──────┘              │   │
        │                      │   события           │   │
        │   REST GET           │ (need-close)        │   │
        │ /api/employees       │ (need-open)         │   │
        │                      ▼                     │   │
        │             ┌────────────────────┐         │   │
        │             │   Apache Kafka     │─────────┘   │
        │             │   (9092/29092)     │             │
        │             │                    │             │
        │             │  Producer:         │             │
        │             │    Log Entry Svc   │             │
        │             │  Consumer:         │             │   
        │             │    Mail Sender     │             │
        │             └────────────────────┘             │
        └────────────────────────────────────────────────┘
┌──────────────────────────────────────┐
│  PostgreSQL (порт 5432)              │
│  БД: TestDBInContainer               │
│  Таблицы: employees, log_entries     │
└──────────────────────────────────────┘
```

---

### 🧩 Микросервисы

#### 1. **API Gateway** (порт 8090)

Единая точка входа для всех клиентских запросов. Работает на **Spring Cloud Gateway** (реактивный, WebFlux).

**Обязанности:**
- **Маршрутизация** запросов к backend-сервисам
- **Аутентификация и авторизация** через Keycloak (OAuth2 Resource Server)
- **CORS** для взаимодействия с фронтендом (`http://localhost:3000`)

**Маршруты:**

| Внешний путь            | Куда перенаправляется      | Требует авторизации     |
|-------------------------|----------------------------|-------------------------|
| `/employees_service/**` | `http://localhost:8081/**` | Да, только `ROLE_ADMIN` |
| `/log_entry_service/**` | `http://localhost:8082/**` | Нет (`permitAll`)       |

**Безопасность:**
- Валидирует JWT-токены от Keycloak
- Конвертирует роли из Keycloak (`realm_access.roles`) в формат Spring Security (`ROLE_ADMIN`, `ROLE_USER`)
- OPTIONS-запросы разрешены для CORS preflight

---

#### 2. **Employees Service** (порт 8081)

CRUD-сервис для управления сотрудниками. Работает с PostgreSQL через Spring Data JPA, миграции через Liquibase.

**API Endpoints:**

| Метод    | Endpoint                            | Описание                      |
|----------|-------------------------------------|-------------------------------|
| `GET`    | `/api/employees`                    | Список всех сотрудников       |
| `GET`    | `/api/employees/{keycloakId}`       | Сотрудник по Keycloak ID      |
| `GET`    | `/api/employees/employeeEntry/{id}` | Сотрудник с записями журналов |
| `POST`   | `/api/employees`                    | Создание сотрудника           |
| `PATCH`  | `/api/employees/{id}`               | Обновление сотрудника         |
| `DELETE` | `/api/employees/{id}`               | Удаление сотрудника           |

**Ключевые особенности:**
- При создании сотрудника автоматически создаёт пользователя в **Keycloak** через Keycloak Admin API
- При удалении — удаляет пользователя из Keycloak
- Назначает роли в Keycloak (ADMIN/USER)
- Агрегирует данные из **Log Entry Service** через REST-вызов

---

#### 3. **Log Entry Service** (порт 8082)

Сервис учёта рабочих смен (log entries). Отвечает за фиксацию начала и завершения рабочего дня.

**API Endpoints:**

| Метод   | Endpoint                       | Описание                        |
|---------|--------------------------------|---------------------------------|
| `POST`  | `/api/log_entries/start`       | Начать смену                    |
| `PUT`   | `/api/log_entries/end`         | Завершить смену (+ комментарий) |
| `GET`   | `/api/log_entries/{keycloakId}`| Все смены сотрудника            |
| `GET`   | `/api/log_entries`             | Все смены всех сотрудников      |

**Бизнес-логика:**
- При начале смены проверяет, нет ли уже незавершённой смены
- При завершении рассчитывает отработанное время (`jobTime` в секундах)
- **Scheduler** каждые 10 секунд:
  - Ищет незавершённые смены → публикует событие в Kafka топик `need-close`
  - Ищет сотрудников, не начавших смену → публикует событие в Kafka топик `need-open`
- Администраторы (`ROLE_ADMIN`) исключаются из проверки — им не нужно начинать смену

**Kafka:** Является **producer'ом** — отправляет уведомления для mail-sender.

---

#### 4. **Mail Sender** (порт 8083)

Сервис email-рассылки уведомлений. Не имеет REST-эндпоинтов, работает исключительно как **Kafka consumer**.

**Как работает:**
1. Слушает топики Kafka: `need-close` и `need-open`
2. При получении сообщения (содержит `keycloakId`):
   - Делает запрос к **Employees Service** для получения email и фамилии сотрудника
   - Формирует и отправляет email через SMTP (Mail.ru)

**Типы уведомлений:**
- `"Вы забыли завершить смену"` — если смена не закрыта вовремя
- `"Вы забыли начать смену"` — если смена не начата вовремя

---

#### 5. **Frontend — time-tracker-ui** (порт 3000)

SPA на **React 18**, собранное через Create React App. Раздаётся через **nginx**.

**Технологии:** React, react-router-dom, axios, @react-keycloak/web, CSS Modules

**Страницы:**

**Для администратора (ADMIN):**
- Список сотрудников (просмотр, редактирование, удаление)
- Добавление нового сотрудника
- Все записи рабочих смен
- Экспорт данных в CSV

**Для пользователя (USER):**
- Начало смены (кнопка «Начать смену»)
- Завершение смены (кнопка «Завершить смену» + комментарий до 255 символов)
- История своих смен

**Аутентификация:**
- Keycloak OIDC через `keycloak-js` SDK
- Автоматическое обновление токена (если осталось < 30 секунд)
- Токен прикрепляется к каждому запросу: `Authorization: Bearer <token>`

---

### 🔐 Keycloak (порт 8080)

Сервер управления идентификацией и доступом.

**Конфигурация:**
- **Realm:** `Employees_realm`
- **Клиенты:**
  - `frontend` — для React SPA
  - `employee_service` — для Employees Service (Admin API)
- **Роли:** `ADMIN`, `USER`

**Интеграции:**
- Employees Service создаёт/удаляет пользователей через **Keycloak Admin REST API**
- API Gateway валидирует JWT-токены через **OAuth2 Resource Server**
- Фронтенд выполняет вход/выход через **keycloak-js** SDK

---

### 📨 Apache Kafka

Брокер сообщений для асинхронного взаимодействия между сервисами.

**Топики:**

| Топик        | Producer          | Consumer    | Назначение                       |
|--------------|-------------------|-------------|----------------------------------|
| `need-close` | Log Entry Service | Mail Sender | Сотрудник забыл завершить смену  |
| `need-open`  | Log Entry Service | Mail Sender | Сотрудник забыл начать смену     |

**Формат сообщений:**
```json
{ "keycloakId": "uuid-string" }
```

---

### 💾 PostgreSQL (порт 5432)

Каждый микросервис управляет **собственной базой данных**:

| Сервис            | БД               | Таблица       |
|-------------------|------------------|---------------|
| Employees Service | `employees_db`   | `employees`   |
| Log Entry Service | `log_entries_db` | `log_entries` |

**Миграции:** Liquibase (changelog XML)

---

### 🔀 Поток данных

#### Сценарий: Аутентификация и получение JWT
```
1. Пользователь нажимает "Войти" на фронтенде
2. React перенаправляет на Keycloak (Employees_realm)
3. Keycloak проверяет логин/пароль
4. Keycloak выдаёт JWT-токен с ролями (realm_access.roles)
5. Фронтенд сохраняет токен и прикрепляет к запросам: Authorization: Bearer <token>
```

#### Сценарий: Начало смены
```
1. Пользователь нажимает "Начать смену" на фронтенде
2. React → POST /log_entry_service/api/log_entries/start (через API Gateway)
3. API Gateway валидирует JWT через Keycloak
4. Log Entry Service:
   - Проверяет, нет ли незавершённой смены
   - GET /api/employees/{keycloakId} → Employees Service (получение stuffId)
   - Сохраняет запись с start_time в свою БД
5. Возвращает logEntryId фронтенду
```

#### Сценарий: Scheduler обнаружил незавершённую смену
```
1. Log Entry Scheduler (каждые 10 сек):
   - Находит записи с end_time = NULL → Kafka топик "need-close"
2. Mail Sender (слушает "need-close"):
   - GET /api/employees/{keycloakId} → Employees Service (email, фамилия)
   - Отправляет email: "Вы забыли завершить смену"
```

#### Сценарий: Создание сотрудника
```
1. Админ заполняет форму на фронтенде
2. React → POST /employees_service/api/employees (через API Gateway)
3. Employees Service:
   - Создаёт пользователя в Keycloak через Admin API
   - Назначает роль (ADMIN/USER) в Keycloak
   - Сохраняет сотрудника в свою БД (с keycloakId)
4. Возвращает EmployeeDto фронтенду
```

---

### 🚀 Запуск приложения

1. Склонировать репозиторий
2. Собрать микросервисы через Maven: `employees-service`, `log-entry-service`, `api-gateway`, `mail-sender` (фронтенд собирать не нужно)
3. Запустить: `docker-compose up`

**Тестовые учётные данные:**
- `usera` / `usera` — администратор
- `user2` / `user2` — пользователь №2
- `user3` / `user3` — пользователь №3
- `user4` / `user4` — пользователь №4

---

### 📊 Сводная таблица портов

| Сервис              | Порт        | Технология                   |
|---------------------|-------------|------------------------------|
| Frontend            | 3000        | React + nginx                |
| API Gateway         | 8090        | Spring Cloud Gateway         |
| Keycloak            | 8080        | Keycloak 23                  |
| Employees Service   | 8081        | Spring Boot + JPA            |
| Log Entry Service   | 8082        | Spring Boot + Kafka          |
| Mail Sender         | 8083        | Spring Boot + Kafka Consumer |
| PostgreSQL          | 5432        | PostgreSQL 17                |
| Kafka               | 9092 / 29092| Confluent Kafka 7.3          |
| Zookeeper           | 2181        | Confluent Zookeeper          |
