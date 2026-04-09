package com.example.employees_service;

import com.github.tomakehurst.wiremock.WireMockServer;

import java.util.UUID;

import static com.github.tomakehurst.wiremock.client.WireMock.*;

public class KeycloakWireMock {

    private final WireMockServer wireMockServer;
    private String lastCreatedUserId;

    public KeycloakWireMock(int port) {
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
        lastCreatedUserId = null;
        stubDefaultAuth();
    }

    /**
     * Базовый стаб для аутентификации в Keycloak (token endpoint)
     */
    private void stubDefaultAuth() {
        // Мокаем endpoint получения токена
        wireMockServer.stubFor(post(urlPathEqualTo("/realms/Employees_realm/protocol/openid-connect/token"))
                .willReturn(aResponse()
                        .withHeader("Content-Type", "application/json")
                        .withBody("""
                            {
                                "access_token": "mock-token",
                                "expires_in": 3600,
                                "token_type": "Bearer"
                            }
                            """)
                        .withStatus(200)
                ));
    }

    /**
     * Стаб для успешного создания пользователя
     * @param userId ID пользователя, который будет возвращён (если null, генерируется UUID)
     */
    public void stubCreateUserSuccess(String userId) {
        this.lastCreatedUserId = userId != null ? userId : UUID.randomUUID().toString();

        // POST /admin/realms/{realm}/users -> 201 с заголовком Location
        wireMockServer.stubFor(post(urlPathMatching("/admin/realms/.*/users"))
                .willReturn(aResponse()
                        .withHeader("Location", "/admin/realms/Employees_realm/users/" + this.lastCreatedUserId)
                        .withStatus(201)
                ));

        // GET /admin/realms/{realm}/roles/{roleName} -> возвращаем роль
        wireMockServer.stubFor(get(urlPathMatching("/admin/realms/.*/roles/.+"))
                .willReturn(aResponse()
                        .withHeader("Content-Type", "application/json")
                        .withBody("""
                            {
                                "id": "role-id-1",
                                "name": "USER"
                            }
                            """)
                        .withStatus(200)
                ));

        // POST /admin/realms/{realm}/users/{id}/role-mappings/realm -> 204
        wireMockServer.stubFor(post(urlPathMatching("/admin/realms/.*/users/.*/role-mappings/realm"))
                .willReturn(aResponse()
                        .withStatus(204)
                ));
    }

    /**
     * Стаб для ошибки при создании пользователя
     */
    public void stubCreateUserError() {
        wireMockServer.stubFor(post(urlPathMatching("/admin/realms/.*/users"))
                .willReturn(aResponse()
                        .withStatus(400)
                        .withHeader("Content-Type", "application/json")
                ));
    }

    /**
     * Стаб для успешного удаления пользователя
     */
    public void stubDeleteUserSuccess() {
        wireMockServer.stubFor(delete(urlPathMatching("/admin/realms/.*/users/.*"))
                .willReturn(aResponse()
                        .withStatus(204)
                ));
    }

    /**
     * Стаб для ошибки при удалении пользователя
     */
    public void stubDeleteUserError(String userId) {
        wireMockServer.stubFor(delete(urlEqualTo("/admin/realms/Employees_realm/users/" + userId))
                .willReturn(aResponse()
                        .withStatus(404)
                        .withHeader("Content-Type", "application/json")
                ));
    }

    public String getLastCreatedUserId() {
        return lastCreatedUserId;
    }
}
