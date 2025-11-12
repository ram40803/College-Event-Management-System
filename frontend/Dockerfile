# ----------------------------------------------------------------------------------
# Stage 1: Build the React Application (uses Node environment)
# ----------------------------------------------------------------------------------
FROM node:21-slim AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first for better caching
# Docker will only re-run 'npm install' if these files change.
COPY package.json .
COPY package-lock.json .

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the React application
# This command generates the optimized static files (usually in the 'build' folder)
RUN npm run build

# ----------------------------------------------------------------------------------
# Stage 2: Serve the Static Files (uses lightweight Nginx server)
# ----------------------------------------------------------------------------------
FROM nginx:alpine

# Copy the Nginx configuration file (if you have one for routing/SPA history)
# If you need custom Nginx config, create a file named 'nginx.conf' in your project root.
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built, optimized static assets from the 'builder' stage 
# to the Nginx default web root directory.
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the default HTTP port
EXPOSE 80

# The default Nginx CMD is sufficient to start the web server
CMD ["nginx", "-g", "daemon off;"]