# Use the full JDK for compilation and packaging
FROM eclipse-temurin:21-jdk-jammy AS build

# Set the working directory inside the container
WORKDIR /event-service

# Copy the Maven wrapper, settings, and pom.xml for dependency caching
# This step creates a reusable layer, saving time on subsequent builds 
# if dependencies haven't changed.
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Download dependencies (cached layer)
RUN ./mvnw dependency:go-offline -B

# Copy the rest of the source code
COPY src src

# Package the application into a runnable JAR file
# This assumes you have set <finalName>event-service</finalName> in its pom.xml
RUN ./mvnw package -DskipTests

# ----------------------------------------------------------------------------------

# Stage 2: Create a minimal runtime image
# Use the JRE-only image for a smaller, more secure production container
FROM eclipse-temurin:21-jre-jammy

# Set an environment variable for the application's base directory
ENV APP_HOME /event-service
# Set the final JAR file path based on the expected finalName
ENV APP_JAR ${APP_HOME}/event-service.jar
# Define the port the service will run on (e.g., 8082, assuming 8080 and 8081 are taken)
ENV SERVER_PORT 8081 

# Set the working directory for the runtime stage
WORKDIR ${APP_HOME}

# Copy ONLY the built JAR from the 'build' stage into the runtime directory
COPY --from=build ${APP_HOME}/target/event-service.jar ${APP_JAR}

# Expose the defined application port
EXPOSE ${SERVER_PORT}

# Set the entry point using the shell form to ensure $APP_JAR is expanded correctly
ENTRYPOINT java -jar $APP_JAR

