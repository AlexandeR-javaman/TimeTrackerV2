Превед!
Команды для извлечения сотрудников и настроек базы из кейклока:
docker exec -it timetrackerv2-keycloak-1 /bin/bash
/opt/keycloak/bin/kc.sh export --realm Employees_realm --users realm_file --file /opt/keycloak/data/realm-export.json