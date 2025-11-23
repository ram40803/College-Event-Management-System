# Stage 1: Build the application with JDK 21
FROM eclipse-temurin:21-jdk-jammy AS build

# Set the working directory inside the container to /myservice
WORKDIR /api-gateway

# Copy the Maven wrapper, settings, and pom.xml for dependency caching
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Download dependencies (cached layer)
RUN ./mvnw dependency:go-offline -B

# Copy the rest of the source code
COPY src src

# Package the application into a runnable JAR file
RUN chmod +x mvnw
RUN ./mvnw package -DskipTests

# ----------------------------------------------------------------------------------

# Stage 2: Create a minimal runtime image
FROM eclipse-temurin:21-jre-jammy

# Set an environment variable for the JAR file path using the new directory
ENV APP_HOME /api-gateway
ENV APP_JAR ${APP_HOME}/api-gateway.jar

# Set the working directory for the runtime stage
WORKDIR ${APP_HOME}

# Copy the built JAR from the 'build' stage into the /myservice directory
COPY --from=build ${APP_HOME}/target/api-gateway.jar ${APP_JAR}

# Set the entry point to run the Spring Boot application
ENTRYPOINT java -jar $APP_JAR