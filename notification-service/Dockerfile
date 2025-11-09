# Using a slim Node image for a good balance between size and functionality
FROM node:21-slim

# Set the working directory inside the container
WORKDIR /usr/src/app

# --- Dependency Caching ---
# Copy package.json and package-lock.json first.
COPY package*.json ./

# Install all dependencies (including devDependencies like Nodemon)
RUN npm install

# --- Application Setup ---
# Copy the rest of the application source code
COPY . .

# Expose the default port for this service (e.g., Express default)
EXPOSE 8084

# Command to run the application in development mode.
CMD ["npm", "run", "dev"]
