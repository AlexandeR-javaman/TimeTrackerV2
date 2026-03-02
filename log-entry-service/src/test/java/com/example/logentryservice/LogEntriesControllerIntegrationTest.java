package com.example.logentryservice;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
class LogEntriesControllerIntegrationTest extends BaseIntegrationTest {

    @Autowired
    protected MockMvc mockMvc;


    @Test
    void shouldStartLogEntry() throws Exception {
        employeesWireMock.stubEmployeeById("user-1", 1L);

        mockMvc.perform(post("/api/log_entries/start")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{ \"keycloakId\": \"user-1\" }"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.logEntryId").exists());
    }

    @Test
    void shouldEndLogEntry() throws Exception {
        employeesWireMock.stubEmployeeById("user-2", 2L);

        mockMvc.perform(post("/api/log_entries/start")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{ \"keycloakId\": \"user-2\" }"))
                .andExpect(status().isCreated());

        mockMvc.perform(put("/api/log_entries/end")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{ \"keycloakId\": \"user-2\", \"message\": \"Завершение смены\" }"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Смена завершена"));
    }

    @Test
    void shouldReturnEntriesByEmployeeId() throws Exception {
        employeesWireMock.stubEmployeeById("user-3", 3L);

        mockMvc.perform(post("/api/log_entries/start")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{ \"keycloakId\": \"user-3\" }"))
                .andExpect(status().isCreated());

        mockMvc.perform(get("/api/log_entries/user-3"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.logEntryList").isArray());
    }

    @Test
    void shouldReturnAllEntries() throws Exception {
        employeesWireMock.stubEmployeeById("u1", 1L);
        employeesWireMock.stubEmployeeById("u2", 2L);

        mockMvc.perform(post("/api/log_entries/start")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"keycloakId\": \"u1\"}"))
                .andExpect(status().isCreated());

        mockMvc.perform(post("/api/log_entries/start")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"keycloakId\": \"u2\"}"))
                .andExpect(status().isCreated());

        mockMvc.perform(get("/api/log_entries"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }
//    @Test
//    void startLogEntry_shouldReturnNotFoundIfEmployeeDoesNotExist() throws Exception {
//        employeesWireMock.stubEmployeeNotFound("user-404");
//
//        mockMvc.perform(post("/api/log_entries/start")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content("{\"keycloakId\":\"user-404\"}"))
//                .andExpect(status().is4xxClientError())
//                .andExpect(jsonPath("$.message").value("id not found"));
//    }

//    @Test
//    void startLogEntry_shouldReturnServerErrorIfEmployeesServiceFails() throws Exception {
//        employeesWireMock.stubServerError("user-500");
//
//        mockMvc.perform(post("/api/log_entries/start")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content("{\"keycloakId\":\"user-500\"}"))
//                .andExpect(status().is5xxServerError())
//                .andExpect(jsonPath("$.message").value("Server error in EmployeesClient user-500"));
//    }

    @Test
    void endLogEntry_shouldReturnErrorIfNoActiveShift() throws Exception {
        mockMvc.perform(put("/api/log_entries/end")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"keycloakId\":\"user-none\",\"message\":\"Завершение\"}"))
                .andExpect(status().is4xxClientError())
                .andExpect(jsonPath("$.message").value("У Вас еще нет начатых смен"));
    }

    @Test
    void startLogEntry_shouldReturnErrorIfShiftAlreadyExists() throws Exception {
        employeesWireMock.stubEmployeeById("user-exist", 10L);

        mockMvc.perform(post("/api/log_entries/start")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"keycloakId\":\"user-exist\"}"));

        mockMvc.perform(post("/api/log_entries/start")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"keycloakId\":\"user-exist\"}"))
                .andExpect(status().is4xxClientError())
                .andExpect(jsonPath("$.message").value("У Вас уже есть незавершенная смена"));
    }

}