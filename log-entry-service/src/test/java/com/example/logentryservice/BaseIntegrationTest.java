package com.example.logentryservice;

import com.example.logentryservice.Repository.LogEntryRepository;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@ActiveProfiles("test")
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public abstract class BaseIntegrationTest {

    @Autowired
    protected LogEntryRepository logEntryRepository;

//    @Autowired
//    protected MockMvc mockMvc;

    protected EmployeesWireMock employeesWireMock;

    @Value("${wiremock.port}")
    private int wireMockPort;

    @BeforeAll
    void initWireMock() {
        employeesWireMock = new EmployeesWireMock(wireMockPort);
        employeesWireMock.start();
    }

    @AfterAll
    void stopWireMock() {
        employeesWireMock.stop();
    }

    @BeforeEach
    void cleanDbAndResetWireMock() {
        logEntryRepository.deleteAll();
        employeesWireMock.reset();
    }
}