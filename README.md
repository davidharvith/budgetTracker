Budget Tracker
A full stack personal finance application for managing budgets, tracking transactions, and visualizing analytics. Built with Java Spring Boot, React (Vite), PostgreSQL, and Docker. Features secure JWT authentication, role-based access control, and real-time analytics.

Features
Secure user registration and login with JWT-based authentication.

Create, update, and delete multiple budgets per user.

Track income and expense transactions with categories, dates, and descriptions.

Real-time analytics and summaries for each budget.

Role-based access for admin operations.

Interactive API documentation via Swagger UI (OpenAPI).

Responsive React SPA with robust error handling.

Dockerized deployment for backend, frontend, and database.

Architecture Overview
Frontend (React/Vite):

Users interact with a modern SPA dashboard to register, log in, and manage budgets and transactions.

All API requests use a centralized Axios service, which attaches JWT tokens for authentication.

State and data-fetching are managed with custom React hooks for a clean, maintainable codebase.

Backend (Spring Boot):

Exposes RESTful endpoints for authentication, budget management, transactions, analytics, and admin actions.

Handles JWT authentication, password hashing, and role-based authorization.

Business logic is separated into service classes, and data persistence is handled by repositories using JPA/Hibernate.

Global exception handling ensures consistent API error responses.

Database (PostgreSQL):

Stores user accounts, budgets, transactions, and roles.

Accessed via Spring Data JPA repositories.

Deployment:

Docker Compose orchestrates the backend, frontend, and database.

Nginx serves the frontend build and supports client-side routing for the React SPA.

Technology Stack
Layer	Technology
Backend	Java 21, Spring Boot 3.4, JPA, Spring Security, JWT, Hibernate, Lombok
Frontend	React (Vite), Axios, React Router
Database	PostgreSQL 16
DevOps	Docker, Docker Compose, Nginx
Docs	Swagger/OpenAPI
Setup & Configuration
Prerequisites
Docker & Docker Compose installed

Node.js (for local frontend development, optional)

Java 21 (for local backend development, optional)

Environment Variables
Backend:
Sensitive configuration (e.g., database URL, JWT secret) is managed via a .env file (do not commit this file).
Example .env:

text
SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/budgetdb
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=postgres
JWT_SECRET=your_jwt_secret_here
Frontend:
Set VITE_API_BASE_URL in a .env file for API endpoint configuration:

text
VITE_API_BASE_URL=http://localhost:8080
Building and Running the Application
Clone the repository:

text
git clone https://github.com/yourusername/budget-tracker.git
cd budget-tracker
Create .env files for backend and frontend as shown above.

Build the Backend JAR:
The backend Dockerfile expects a built JAR in the target/ directory. Build it with:

text
cd backend
./mvnw clean package -DskipTests
cd ..
Start the Application (Docker Compose):

text
docker compose up --build
Backend: http://localhost:8080

Frontend: http://localhost:5173

Swagger UI: http://localhost:8080/swagger-ui.html

API Structure
Authentication:

POST /api/register — Register a new user

POST /api/login — Authenticate and receive JWT

Budgets:

GET /api/budgets — List all budgets for user

POST /api/budgets — Create a new budget

PUT /api/budgets/{id} — Update a budget

DELETE /api/budgets/{id} — Delete a budget

Transactions:

POST /api/budgets/{id}/transactions — Add a transaction

GET /api/budgets/{id}/transactions — List transactions for a budget

Analytics:

GET /api/budgets/{id}/summary — Get budget summary

GET /api/budgets/{id}/category-summary — Get totals by category

Admin:

GET /api/admin/** — Admin-only endpoints (requires ADMIN role)

API Docs:

Swagger UI at /swagger-ui.html for interactive documentation and testing.

Security
All protected endpoints require a valid JWT in the Authorization header.

Passwords are securely hashed using BCrypt.

CORS is enabled for frontend-backend communication.

Secrets are managed via .env files and never committed to source control.

Development Notes
Backend:

Organized by feature: controller, service, repository, model, security, config, exception.

Uses DTOs for clean API contracts and validation.

Global exception handler provides consistent error responses.

OpenAPI config documents all endpoints and security schemes.

Frontend:

Centralized API service with Axios and JWT management.

Custom React hooks (useBudgets, useSummary) for data fetching and state.

Modular components for dashboard, registration, analytics, and transactions.

Nginx serves the frontend build and supports client-side routing.

Contact:
For questions or collaboration, contact me at davidaviadh@gmail.