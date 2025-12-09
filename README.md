# 📘 College Event Management System – Microservices Architecture

A fully containerized **Microservices-based Event Management Platform** built using **Spring Boot, Node.js, Flask, React, Docker, Kafka, and AWS EC2**.

This system enables:

- User registration with OTP verification  
- Event creation & management  
- Student event registration  
- Notification delivery via Kafka  
- Service discovery & routing via Eureka + API Gateway  

This project represents a **real-world scalable architecture** following cloud & industry standards.

---

# 🚀 1. Features

### 👤 User Features
- Register with email OTP
- Login after verification
- View available events
- Register for events
- Receive email notifications

### 🧑‍🏫 Organizer Features
- Create, update, delete events
- Upload event images (Cloudinary)
- View registrations

### 🔔 Notification Service
- Receives events from Kafka topics
- Sends OTP emails, event alerts, confirmations

### 🧩 Architecture Features
- API Gateway for centralized routing
- Eureka Service Registry for dynamic discovery
- Message-driven communication using Kafka
- Independent microservices with separate databases
- Docker Compose orchestration
- Deployed on AWS EC2

---

# 🧱 2. System Architecture (Microservices)

```
Frontend (React)
      |
      v
API Gateway (Spring Cloud Gateway)
      |
      +--> User Service (Flask + MongoDB)
      |
      +--> Event Service (Spring Boot + MySQL)
      |
      +--> Registration Service (Node.js + MySQL)
      |
      +--> Notification Service (Node.js + Kafka Consumer)

Kafka <-- User/Event/Registration Services publish messages
  |
  v
Notification Service sends emails (Nodemailer)
```

Each microservice runs in its own Docker container.

---

# 🛠 3. Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS

### Backend Microservices

| Service | Technology |
|--------|------------|
| **User Service** | Python (Flask), MongoDB |
| **Event Service** | Spring Boot (Java), MySQL |
| **Registration Service** | Node.js (Express), Sequelize |
| **Notification Service** | Node.js + Kafka Consumer |
| **API Gateway** | Spring Cloud Gateway |
| **Service Registry** | Eureka Server |

### DevOps & Infrastructure
- Docker & Docker Compose
- Kafka & Zookeeper (Confluent)
- AWS EC2
- Cloudinary (image uploads)
- MongoDB Atlas (optional)
- MySQL

---

# ⚙️ 4. Project Structure

```
root/
│
├── api-gateway/
├── service-registry/
├── event-service/
├── user-service/
├── event-registration-service/
├── notification-service/
├── frontend/
├── docker-compose.yml
└── .env
```

---

# 🔑 5. Environment Variables (.env)

Create a `.env` file in project root:

```
# -------------------------------------------
# Cloudinary
CLOUDINARY_CLOUD_NAME=xxxxxx
CLOUDINARY_API_KEY=xxxxxx
CLOUDINARY_API_SECRET=xxxxxx

# -------------------------------------------
# MySQL (Events)
EVENT_DB_URL=jdbc:mysql://host.docker.internal:3306/eventdb
EVENT_DB_USERNAME=root
EVENT_DB_PASSWORD=yourpass

# Registration DB
REG_DB_HOST=host.docker.internal
REG_DB_PORT=3306
REG_DB_USER=root
REG_DB_PASSWORD=yourpass
REG_DB_NAME=registrationdb

# -------------------------------------------
# Kafka
KAFKA_BROKER=kafka:9092
KAFKA_TOPIC=notifications

# -------------------------------------------
# User Service
USER_MONGO_URI=mongodb://host.docker.internal:27017/user_db
USER_SECRET_KEY=supersecretkey
USER_OTP_EXPIRY_MINUTES=5

# -------------------------------------------
# Notification Email Service
EMAIL_USER=your_gmail@example.com
EMAIL_PASS=app_password_here
```

---

# 🧪 6. How to Run the Project Locally

### Requirements
- Docker
- Docker Compose
- Node.js (if running frontend outside Docker)
- Java 17+
- Python 3.10+ (not required if using Docker)

---

## 1️⃣ Clone the Repository
```bash
git clone https://github.com/ram40803/College-Event-Management-System.git
cd college-event-management-system
```

---

## 2️⃣ Create `.env` file
Copy the variables from above.

---

## 3️⃣ Run Docker
```bash
docker compose up --build
```

This will start:

- Eureka → 8761  
- API Gateway → 8080  
- User Service → 8082  
- Event Service → 8081  
- Registration Service → 8083  
- Notification Service → 8084  
- Kafka → 9092  
- React Frontend → 5173  

---

## 4️⃣ Access Services

| Component | URL |
|----------|------|
| **Frontend** | http://localhost:5173 |
| **API Gateway** | http://localhost:8080 |
| **Eureka Dashboard** | http://localhost:8761 |
| **Kafka Broker** | localhost:9092 |

---

# 🧪 7. Testing the System

### Test User Registration
```
POST /users/register
Body:
{
  "name": "Ram",
  "email": "ram@example.com",
  "password": "12345"
}
```

### Verify OTP
```
POST /users/verify
{
  "email": "ram@example.com",
  "otp": "123456"
}
```

### Create Event
```
POST /events
```

### Register for Event
```
POST /registrations
```

Kafka will receive messages automatically.

---

# ☁️ 8. Deploying on AWS EC2

### Steps:
1. Create EC2 instance (Ubuntu)
2. Install Docker & Docker Compose
3. Clone project
4. Set environment variables
5. Run:
   ```bash
   docker compose up -d
   ```
6. Open ports in EC2 Security Group:
   ```
   5173 (Frontend)
   8080 (Gateway)
   8761 (Eureka)
   8081–8084 (Microservices)
   9092 (Kafka)
   ```

---

# 📡 9. API Overview

### User Service
```
POST /user-service/users/register
POST /user-service/users/verify
GET  /user-service/users/{id}
```

### Event Service
```
POST /event-service/events
PUT  /event-service/events/{id}
DELETE /event-service/events/{id}
GET /event-service/events?page=0&size=10
```

### Registration Service
```
GET /event-registration-service/registrations
POST /event-registration-service/registrations
DELETE /event-registration-service/registrations/{id}
```

Notification Service is Kafka-based (minimal REST).

---

# 📚 10. Conclusion

This project demonstrates a full **microservice architecture** with real industry tools such as Kafka, Docker, React, MongoDB, MySQL, Eureka, and API Gateway.  
It is an excellent foundation for scalable cloud-native applications.

---

# ✨ 11. Contributors
- **Ram Patidar** – Backend Microservices, Docker, Databases, Deployment  
- **Sharad Sin Rajput** – Frontend, UI/UX, Testing  
- **Guide:** Poonam Mangwani Ma’am  

---
