FROM eclipse-temurin:23-jre-alpine

COPY /target/*.jar app.jar
ENTRYPOINT [ "java", "-jar", "app.jar" ]