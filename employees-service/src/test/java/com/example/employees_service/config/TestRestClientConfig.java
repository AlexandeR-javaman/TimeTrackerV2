package com.example.employees_service.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestClient;

@TestConfiguration
public class TestRestClientConfig {

    @Value("${wiremock.logentry.port}")
    private int logEntryWireMockPort;

    @Bean
    public RestClient restClientForTests() {
        return RestClient.builder()
                .baseUrl("http://localhost:" + logEntryWireMockPort)
                .build();
    }
}
