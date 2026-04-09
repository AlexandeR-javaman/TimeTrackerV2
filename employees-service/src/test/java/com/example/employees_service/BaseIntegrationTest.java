package com.example.employees_service;

import com.example.employees_service.repository.EmployeeRepository;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public abstract class BaseIntegrationTest {

    @Autowired
    protected EmployeeRepository employeeRepository;

    protected KeycloakWireMock keycloakWireMock;
    protected LogEntryWireMock logEntryWireMock;

    @Value("${wiremock.keycloak.port}")
    private int keycloakWireMockPort;

    @Value("${wiremock.logentry.port}")
    private int logEntryWireMockPort;

    @BeforeAll
    void initWireMock() {
        keycloakWireMock = new KeycloakWireMock(keycloakWireMockPort);
        keycloakWireMock.start();

        logEntryWireMock = new LogEntryWireMock(logEntryWireMockPort);
        logEntryWireMock.start();
    }

    @AfterAll
    void stopWireMock() {
        keycloakWireMock.stop();
        logEntryWireMock.stop();
    }

    @BeforeEach
    void cleanDbAndResetWireMock() {
        employeeRepository.deleteAll();
        keycloakWireMock.reset();
        logEntryWireMock.reset();
    }
}
