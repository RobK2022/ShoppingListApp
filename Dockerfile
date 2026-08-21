# Stage 1: Build the JAR file
FROM maven:3.9-eclipse-temurin-21 AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Runtime environment
FROM eclipse-temurin:21-jre
LABEL authors="Rob"
WORKDIR /app
COPY --from=builder /app/target/ShoppingListApp-0.0.1-SNAPSHOT.jar /app/ShoppingListApp-0.0.1-SNAPSHOT.jar
EXPOSE 8080
CMD ["java", "-jar", "/app/ShoppingListApp-0.0.1-SNAPSHOT.jar"]