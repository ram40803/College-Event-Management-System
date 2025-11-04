# user-service/Dockerfile
# Use an official Python runtime as a parent image
FROM python:3.13.7-slim

# Set the working directory in the container
WORKDIR /user_service

# Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on (Flask default is 5000)
EXPOSE 8082

# Define the command to run the application
# We use Gunicorn or a similar WSGI server for production, 
# but for development, we can start with flask run:
CMD ["python", "run.py"]