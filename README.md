# 🎓 College Event Management System  
*A Microservices-Based Scalable Event Platform for Colleges*

---

## 📌 Overview
The **College Event Management System** is a fully containerized, microservices-based web application that allows students and administrators to manage college events efficiently.  
The system supports:

- User Registration with Email OTP Verification  
- Event Creation & Management  
- Event Registration with Seat Validation  
- Email Notifications (via Kafka)  
- Service Discovery & API Gateway  
- Role-Based Access (Student, Admin, Organizer)

The project is built with **multiple technologies**:
- Java Spring Boot → Event Service + API Gateway  
- Node.js → Registration Service + Notification Service  
- Python Flask → User Service  
- Eureka Server → Service Discovery  
- Kafka → Asynchronous Notifications  
- MySQL + MongoDB → Databases  
- ReactJS → Frontend  
- Docker → Containerization

---

## 🏗️ Microservices Architecture

---

## 🔧 Technologies Used

### **Backend**
- **Java Spring Boot** (Event, Gateway)
- **Node.js + Express** (Registration, Notification)
- **Python Flask** (User Service)
- **Kafka** (Event messaging)
- **Eureka** (Service Discovery)
- **JWT Authentication**

### **Frontend**
- **ReactJS** (Hooks + Axios + Tailwind)

### **Databases**
- **MongoDB** (User Service)
- **MySQL** (Event & Registration Services)

### **Containerization**
- **Docker**
- **Docker Compose**

---

## 🚀 Features

### ✅ **User Service (Python + MongoDB)**
- User registration with OTP
- Email validation
- JWT-based login
- Only verified users can register for events

### ✅ **Event Service (Spring Boot + MySQL)**
- Create, update, delete events
- Capacity management
- Status control (OPEN/CLOSED)
- Auto-trigger Kafka event_created messages

### ✅ **Registration Service (Node.js + MySQL)**
- Register user for an event
- Validates user + event via API calls
- Prevents duplicate registrations
- Deletes all registrations when event is deleted

### ✅ **Notification Service (Node.js + Kafka)**
- Listens to Kafka topics:
  - `otp_generated`
  - `event_created`
  - `user_registered`
- Sends emails using nodemailer

### ✅ **API Gateway (Spring Cloud Gateway)**
- Routes requests to the correct microservice
- Central entry point
- CORS support

### ✅ **Eureka Service Discovery**
- All microservices auto-register
- Gateway dynamically resolves services

---
