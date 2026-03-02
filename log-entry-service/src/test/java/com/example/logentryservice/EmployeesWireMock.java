package com.example.logentryservice;

import com.github.tomakehurst.wiremock.WireMockServer;

import static com.github.tomakehurst.wiremock.client.WireMock.*;

public class EmployeesWireMock {

    private final WireMockServer wireMockServer;

    public EmployeesWireMock(int port) {
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

    public void stubEmployeeById(String keycloakId, long staffId) {
        wireMockServer.stubFor(get(urlEqualTo("/api/employees/" + keycloakId))
                .willReturn(aResponse()
                        .withHeader("Content-Type", "application/json")
                        .withBody("{ \"stuffId\": " + staffId + ", \"keycloakId\": \"" + keycloakId + "\" }")
                        .withStatus(200)
                ));
    }

    public void stubAllEmployees(String bodyJson) {
        wireMockServer.stubFor(get(urlEqualTo("/api/employees"))
                .willReturn(aResponse()
                        .withHeader("Content-Type", "application/json")
                        .withBody(bodyJson)
                        .withStatus(200)
                ));
    }

    public void stubEmployeeNotFound(String keycloakId) {
        wireMockServer.stubFor(get(urlEqualTo("/api/employees/" + keycloakId))
                .willReturn(aResponse()
                        .withStatus(404)
                        .withHeader("Content-Type", "application/json")));
    }

    public void stubServerError(String keycloakId) {
        wireMockServer.stubFor(get(urlEqualTo("/api/employees/" + keycloakId))
                .willReturn(aResponse()
                        .withStatus(500)
                        .withHeader("Content-Type", "application/json")));
    }
}