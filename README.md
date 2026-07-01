# 📝 NoteApp — AI-Powered Notes Management

<p align="center">
  <img src="NoteFront/src/assets/notelogo.png" alt="NoteApp logo" width="120">
</p>

<p align="center">
  A full-stack notes management application built with Angular, Spring Boot, MySQL, Flask, and Gemini AI.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Angular-Frontend-DD0031?logo=angular&logoColor=white" alt="Angular">
  <img src="https://img.shields.io/badge/Spring%20Boot-Backend-6DB33F?logo=springboot&logoColor=white" alt="Spring Boot">
  <img src="https://img.shields.io/badge/MySQL-Database-4479A1?logo=mysql&logoColor=white" alt="MySQL">
  <img src="https://img.shields.io/badge/Flask-AI%20Service-000000?logo=flask&logoColor=white" alt="Flask">
  <img src="https://img.shields.io/badge/Gemini-AI-8E75B2?logo=googlegemini&logoColor=white" alt="Gemini AI">
</p>

---

## 📌 Overview

**NoteApp** is a modern full-stack web application that allows users to create, view, update, delete, and search notes.

The project also includes an artificial intelligence service powered by **Gemini AI**, which can automatically summarize the content of a note.

This project was created as a portfolio project to demonstrate full-stack development, REST API integration, database management, responsive UI design, and AI integration.

---

## ✨ Features

- Create a new note
- Display all notes
- Edit an existing note
- Delete a note
- Search notes by title or content
- Form validation
- Responsive user interface
- Automatic creation and update timestamps
- AI-generated note summaries
- Clear loading and error states
- RESTful communication between services

---

## 🤖 AI Feature

Each note can be summarized using Gemini AI.

```text
Angular Frontend
       │
       ├── Spring Boot REST API ── MySQL
       │
       └── Flask AI Service ────── Gemini API
```

The Gemini API key is stored locally in:

```text
service.ia/.env
```

This file is ignored by Git and must never be committed.

---

## 🛠️ Technologies

### Frontend

- Angular
- TypeScript
- HTML5
- CSS3
- Reactive Forms
- Angular HttpClient

### Backend

- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- Hibernate
- Bean Validation
- Maven

### Database

- MySQL

### Artificial Intelligence

- Python
- Flask
- Flask-CORS
- Google Gemini API
- `google-genai`
- `python-dotenv`

### Tools

- Git
- GitHub
- Postman
- Visual Studio Code / IntelliJ IDEA

---

## 🖼️ Application Preview

<p align="center">
  <img src="NoteFront/src/assets/NotePhoto.png" alt="NoteApp preview" width="850">
</p>

---

## 🔗 API Endpoints

### Notes API

Base URL:

```text
http://localhost:8081/api/notes
```

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/notes` | Get all notes |
| `GET` | `/api/notes/{id}` | Get one note |
| `GET` | `/api/notes?search=keyword` | Search notes |
| `POST` | `/api/notes` | Create a note |
| `PUT` | `/api/notes/{id}` | Update a note |
| `DELETE` | `/api/notes/{id}` | Delete a note |

### AI API

Base URL:

```text
http://localhost:5000/api/ai
```

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/ai/health` | Check AI service status |
| `POST` | `/api/ai/summarize` | Generate a note summary |

Example request:

```json
{
  "title": "Learn Angular",
  "content": "Finish the Angular services, connect the frontend to Spring Boot, and test the CRUD operations."
}
```

Example response:

```json
{
  "summary": "Finish the Angular services, connect the frontend to Spring Boot, and test all CRUD operations."
}
```

---

## ⚙️ Installation

### Prerequisites

- Java 17 or later
- Node.js and npm
- Angular CLI
- MySQL
- Python 3.10 or later
- Git

### 1. Clone the repository

```bash
git clone https://github.com/azizbrahim536-coder/NoteApp.git
cd NoteApp
```

### 2. Start the Spring Boot backend

Configure MySQL in:

```text
src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/NotesApp?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD

spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update

server.servlet.context-path=/api
server.port=8081
```

Run the backend:

```bash
mvnw.cmd spring-boot:run
```

### 3. Start the Angular frontend

```bash
cd NoteFront
npm install
ng serve
```

Frontend URL:

```text
http://localhost:4200
```

### 4. Configure the AI service

```bash
cd service.ia
python -m venv venv
venv\Scripts\activate
pip install flask flask-cors python-dotenv google-genai
```

Create `.env` based on `.env.example`:

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

Start Flask:

```bash
python app.py
```

AI service URL:

```text
http://localhost:5000
```

---

## ▶️ Running the Complete Application

Run the three services in separate terminals:

```text
Angular:     http://localhost:4200
Spring Boot: http://localhost:8081/api
Flask AI:    http://localhost:5000
```

---

## 🔐 Security

- API keys are stored in `.env`
- `.env` is excluded through `.gitignore`
- `.env.example` contains only a placeholder
- Secrets must never be committed to GitHub
- Database credentials should be stored locally or in environment variables

---

## 🚀 Future Improvements

- User authentication with JWT
- Categories and tags
- Pin favorite notes
- Dark mode
- Pagination
- Export notes as PDF
- Rich-text editor
- Automatic title generation with AI
- Grammar correction with AI
- Cloud deployment

---

## 👨‍💻 Author

**Mohamed Aziz Brahim**

- GitHub: [azizbrahim536-coder](https://github.com/azizbrahim536-coder)

---

## 📄 License

This project is created for learning and portfolio purposes.
