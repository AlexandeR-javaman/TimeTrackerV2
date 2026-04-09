package com.example.employees_service;

import com.github.tomakehurst.wiremock.WireMockServer;

import static com.github.tomakehurst.wiremock.client.WireMock.*;

public class LogEntryWireMock {

    private final WireMockServer wireMockServer;

    public LogEntryWireMock(int port) {
        this.wireMockServer = new WireMockServer(port);
    }

    public void start() {
        wireMockServer.start();
        configureFor("localhost", wireMockServer.port());
    }

    public void stop() {
        wireMockServer.stop();
    }

    public void reset() {
        wireMockServer.resetAll();
    }

    /**
     * Стаб для получения записей лога сотрудника
     * @param employeeId ID сотрудника
     * @param bodyJson JSON-тело ответа (LogEntryDto)
     */
    public void stubLogEntriesByEmployeeId(Long employeeId, String bodyJson) {
        wireMockServer.stubFor(get(urlEqualTo("/api/log_entries/" + employeeId))
                .willReturn(aResponse()
                        .withHeader("Content-Type", "application/json")
                        .withBody(bodyJson)
                        .withStatus(200)
                ));
    }

    /**
     * Стаб для случая, когда записей нет (404)
     */
    public void stubLogEntriesNotFound(Long employeeId) {
        wireMockServer.stubFor(get(urlEqualTo("/api/log_entries/" + employeeId))
                .willReturn(aResponse()
                        .withStatus(404)
                        .withHeader("Content-Type", "application/json")
                ));
    }

    /**
     * Стаб для ошибки сервера
     */
    public void stubServerError(Long employeeId) {
        wireMockServer.stubFor(get(urlEqualTo("/api/log_entries/" + employeeId))
                .willReturn(aResponse()
                        .withStatus(500)
                        .withHeader("Content-Type", "application/json")
                ));
    }
}
