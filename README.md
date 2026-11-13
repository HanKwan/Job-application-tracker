# Job Application Tracker

就職活動の応募状況を管理するフルスタックWebアプリケーションです。

A full-stack web application for managing job applications and tracking their progress.

---

## Features / 主な機能

- Add, view, edit, and delete job applications
- Search and filter applications
- User registration and login
- Session-based authentication
- Password hashing with BCrypt
- Associate applications with individual users
- Restrict application access based on ownership
- REST API communication between frontend and backend
- MySQL database persistence

---

## Tech Stack / 使用技術

### Frontend

- React
- TypeScript
- Vite
- CSS

### Backend

- Java
- Spring Boot
- Spring Data JPA
- REST API
- BCrypt
- Session-based authentication

### Database

- MySQL

---

## What I Learned / 学んだこと

- Building a full-stack application with React and Spring Boot
- Designing and implementing REST APIs
- Implementing CRUD operations and search functionality
- Implementing user authentication and session management
- Designing relationships between users and application records
- Applying ownership-based access control
- Connecting the frontend, backend, and MySQL database

---

## Future Improvements / 今後の改善

- Application sorting by application date, deadline, or company name
- Email management
- To-do and memo features for managing recruitment tasks
- Dockerization
- Deployment using AWS or another cloud platform

---

## Running Locally / 起動方法

### Prerequisites

- Node.js
- Java 21
- MySQL

### Database Setup

```sql
CREATE DATABASE job_tracker;
```

### Backend Setup

```bash
cd backend
./mvnw spring-boot:run
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
