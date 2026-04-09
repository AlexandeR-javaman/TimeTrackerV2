package com.example.employees_service;

import com.example.employees_service.model.Employee;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
class EmployeeServiceIntegrationTest extends BaseIntegrationTest {

    @Autowired
    protected MockMvc mockMvc;

    @Test
    void shouldReturnEmployeeWithLogEntries() throws Exception {
        // Подготовка: создаём сотрудника в БД
        Employee employee = Employee.builder()
                .surname("Сидоров")
                .name("Сидор")
                .patronymic("Сидорович")
                .stuffId(5L)
                .employeePost("Разработчик")
                .role("ROLE_USER")
                .login("sidorov")
                .keycloakId("keycloak-5")
                .email("sidorov@test.com")
                .build();
        Employee saved = employeeRepository.save(employee);

        // Мокаем log-entry-service
        String logEntryJson = """
            {
                "logEntryList": [
                    {
                        "id": 1,
                        "startTime": "2024-01-15T09:00:00",
                        "endTime": "2024-01-15T18:00:00",
                        "employeeId": %d,
                        "message": "Рабочий день",
                        "jobTime": 540
                    },
                    {
                        "id": 2,
                        "startTime": "2024-01-16T09:00:00",
                        "endTime": "2024-01-16T17:00:00",
                        "employeeId": %d,
                        "message": "Встреча с клиентом",
                        "jobTime": 480
                    }
                ]
            }
            """.formatted(saved.getId(), saved.getId());

        logEntryWireMock.stubLogEntriesByEmployeeId(saved.getId(), logEntryJson);

        // Вызов и проверка
        mockMvc.perform(get("/api/employees/employeeEntry/" + saved.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.surname").value("Сидоров"))
                .andExpect(jsonPath("$.name").value("Сидор"))
                .andExpect(jsonPath("$.logEntries").isArray())
                .andExpect(jsonPath("$.logEntries.length()").value(2))
                .andExpect(jsonPath("$.logEntries[0].message").value("Рабочий день"))
                .andExpect(jsonPath("$.logEntries[1].message").value("Встреча с клиентом"));
    }

    @Test
    void shouldReturnEmployeeWithEmptyLogEntries() throws Exception {
        // Подготовка
        Employee employee = Employee.builder()
                .surname("Пусто")
                .name("Пусто")
                .patronymic("Пусто")
                .stuffId(6L)
                .employeePost("Тестировщик")
                .role("ROLE_USER")
                .login("empty")
                .keycloakId("keycloak-6")
                .email("empty@test.com")
                .build();
        Employee saved = employeeRepository.save(employee);

        // Мокаем пустой ответ от log-entry-service
        String emptyLogEntryJson = """
            {
                "logEntryList": []
            }
            """;

        logEntryWireMock.stubLogEntriesByEmployeeId(saved.getId(), emptyLogEntryJson);

        // Вызов и проверка
        mockMvc.perform(get("/api/employees/employeeEntry/" + saved.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.surname").value("Пусто"))
                .andExpect(jsonPath("$.logEntries").isArray())
                .andExpect(jsonPath("$.logEntries").isEmpty());
    }

}
