package com.example.employees_service.service;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import jakarta.ws.rs.core.Response;
import java.util.Collections;

@Service
public class KeycloakUserService {

    private final Keycloak keycloak;

    @Value("${keycloak.realm}")
    private final String realm;

    public KeycloakUserService(Keycloak keycloakAdmin, String realm) {
        this.keycloak = keycloakAdmin;
        this.realm = realm;
    }

    public String createUser(String username, String password, String roleName) {
        // Создаем представление пароля
        CredentialRepresentation credential = new CredentialRepresentation();
        credential.setTemporary(false);
        credential.setType(CredentialRepresentation.PASSWORD);
        credential.setValue(password);

        // Создаем пользователя
        UserRepresentation user = new UserRepresentation();
        user.setUsername(username);
        user.setEnabled(true);
        user.setCredentials(Collections.singletonList(credential));

        // Отправляем запрос на создание
        Response response = keycloak.realm(realm)
                .users()
                .create(user);

        if (response.getStatus() != 201) {
            throw new RuntimeException("Не удалось создать пользователя в Keycloak, статус: " + response.getStatus());
        }

        // Получаем ID созданного пользователя из заголовка Location
        String userId = response.getLocation().getPath().replaceAll(".*/([^/]+)$", "$1");

        // Получаем роль из realm
        RoleRepresentation role = keycloak.realm(realm)
                .roles()
                .get(roleName)
                .toRepresentation();

        // Назначаем роль пользователю
        keycloak.realm(realm)
                .users()
                .get(userId)
                .roles()
                .realmLevel()
                .add(Collections.singletonList(role));
    return userId;
    }
}
