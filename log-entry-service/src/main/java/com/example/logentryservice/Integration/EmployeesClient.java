package com.example.logentryservice.Integration;

import com.example.logentryservice.dto.EmployeeIDDto;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class EmployeesClient {
    private final RestClient restClient;

    public EmployeesClient(RestClient.Builder builder) {
        this.restClient = builder
                .baseUrl("http://localhost:8081")
                .build();
    }

    public EmployeeIDDto getEmployeeById(String id) {
        return restClient.get()
                .uri("/api/employees/{id}", id)
                .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError, (req, res) -> {
                    throw new RuntimeException("id not found");
                })
                .onStatus(HttpStatusCode::is5xxServerError, (req, res) -> {
                    throw new RuntimeException("Server error");
                })
                .body(EmployeeIDDto.class);
    }
}
