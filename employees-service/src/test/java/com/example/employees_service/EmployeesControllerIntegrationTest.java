package com.example.employees_service;

import com.example.employees_service.model.Employee;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
class EmployeesControllerIntegrationTest extends BaseIntegrationTest {

    @Autowired
    protected MockMvc mockMvc;

    @Test
    void shouldReturnAllEmployees() throws Exception {
        // Подготовка: создаём сотрудников напрямую в БД
        Employee employee = Employee.builder()
                .surname("Иванов")
                .name("Иван")
                .patronymic("Иванович")
                .stuffId(1L)
                .employeePost("Разработчик")
                .role("ROLE_USER")
                .login("ivanov")
                .keycloakId("keycloak-1")
                .email("ivanov@test.com")
                .build();
        employeeRepository.save(employee);

        // Вызов и проверка
        mockMvc.perform(get("/api/employees"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].surname").value("Иванов"))
                .andExpect(jsonPath("$[0].name").value("Иван"))
                .andExpect(jsonPath("$[0].stuffId").value(1));
    }

    @Test
    void shouldReturnEmptyListWhenNoEmployees() throws Exception {
        mockMvc.perform(get("/api/employees"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$").isEmpty());
    }

    @Test
    void shouldReturnEmployeeByKeycloakId() throws Exception {
        // Подготовка
        Employee employee = Employee.builder()
                .surname("Петров")
                .name("Пётр")
                .patronymic("Петрович")
                .stuffId(2L)
                .employeePost("Тестировщик")
                .role("ROLE_USER")
                .login("petrov")
                .keycloakId("keycloak-2")
                .email("petrov@test.com")
                .build();
        employeeRepository.save(employee);

        // Вызов и проверка
        mockMvc.perform(get("/api/employees/keycloak-2"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.surname").value("Петров"))
                .andExpect(jsonPath("$.name").value("Пётр"))
                .andExpect(jsonPath("$.keycloakId").value("keycloak-2"))
                .andExpect(jsonPath("$.email").value("petrov@test.com"));
    }

    @Test
    void shouldReturnNotFoundWhenEmployeeByKeycloakIdDoesNotExist() throws Exception {
        mockMvc.perform(get("/api/employees/non-existent-keycloak"))
                .andExpect(status().isNotFound());
    }

    @Test
    void shouldCreateEmployeeSuccessfully() throws Exception {
        // Мокаем Keycloak
        keycloakWireMock.stubCreateUserSuccess(null);

        // Вызов
        String createEmployeeJson = """
            {
                "surname": "Сидоров",
                "name": "Сидор",
                "patronymic": "Сидорович",
                "stuffId": 3,
                "employeePost": "Аналитик",
                "role": "ROLE_USER",
                "login": "sidorov",
                "password": "password123"
            }
            """;

        mockMvc.perform(post("/api/employees")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(createEmployeeJson))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.surname").value("Сидоров"))
                .andExpect(jsonPath("$.name").value("Сидор"))
                .andExpect(jsonPath("$.role").value("ROLE_USER"))
                .andExpect(jsonPath("$.id").exists());

        // Проверяем, что сотрудник сохранился в БД
        mockMvc.perform(get("/api/employees"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].surname").value("Сидоров"));
    }

    @Test
    void shouldReturnErrorWhenCreateEmployeeFailsInKeycloak() throws Exception {
        // Мокаем ошибку Keycloak
        keycloakWireMock.stubCreateUserError();

        String createEmployeeJson = """
            {
                "surname": "Ошибка",
                "name": "Тест",
                "patronymic": "Тестович",
                "stuffId": 99,
                "employeePost": "Должность",
                "role": "ROLE_USER",
                "login": "erroruser",
                "password": "password123"
            }
            """;

        mockMvc.perform(post("/api/employees")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(createEmployeeJson))
                .andExpect(status().is5xxServerError());
    }

    @Test
    void shouldUpdateEmployeeSuccessfully() throws Exception {
        // Подготовка: создаём сотрудника
        Employee employee = Employee.builder()
                .surname("Старый")
                .name("Старый")
                .patronymic("Старый")
                .stuffId(10L)
                .employeePost("Старая должность")
                .role("ROLE_USER")
                .login("olduser")
                .keycloakId("keycloak-old")
                .email("old@test.com")
                .build();
        Employee saved = employeeRepository.save(employee);

        // Вызов: обновляем поля
        String updateEmployeeJson = """
            {
                "surname": "Новый",
                "employeePost": "Новая должность"
            }
            """;

        mockMvc.perform(patch("/api/employees/" + saved.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updateEmployeeJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.surname").value("Новый"))
                .andExpect(jsonPath("$.name").value("Старый")) // не изменилось
                .andExpect(jsonPath("$.employeePost").value("Новая должность"));
    }

    @Test
    void shouldReturnNotFoundWhenUpdatingNonExistentEmployee() throws Exception {
        String updateEmployeeJson = """
            {
                "surname": "Новый"
            }
            """;

        mockMvc.perform(patch("/api/employees/99999")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updateEmployeeJson))
                .andExpect(status().isNotFound());
    }

    @Test
    void shouldDeleteEmployeeSuccessfully() throws Exception {
        // Подготовка
        keycloakWireMock.stubDeleteUserSuccess();

        Employee employee = Employee.builder()
                .surname("Удалить")
                .name("Удалить")
                .patronymic("Удалить")
                .stuffId(20L)
                .employeePost("Должность")
                .role("ROLE_USER")
                .login("deleteuser")
                .keycloakId("keycloak-delete")
                .email("delete@test.com")
                .build();
        Employee saved = employeeRepository.save(employee);

        // Вызов
        mockMvc.perform(delete("/api/employees/" + saved.getId()))
                .andExpect(status().isNoContent());

        // Проверяем, что сотрудник удалён
        mockMvc.perform(get("/api/employees"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isEmpty());
    }

    @Test
    void shouldReturnNotFoundWhenDeletingNonExistentEmployee() throws Exception {
        mockMvc.perform(delete("/api/employees/99999"))
                .andExpect(status().isNotFound());
    }
}
