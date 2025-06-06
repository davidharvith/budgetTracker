# Budget Tracker Application

A full-stack web application for tracking personal and business budgets, built with React and Spring Boot.

## Features

- 🔐 User authentication and authorization
- 💰 Budget creation and management
- 📊 Transaction tracking and categorization
- 📈 Visual analytics and reporting
- 📱 Responsive design for all devices
- 🔄 Real-time updates

## Tech Stack

### Frontend
- React.js with Vite
- React Router for navigation
- Chart.js for data visualization
- Axios for API communication
- CSS3 for styling

### Backend
- Spring Boot
- Spring Security with JWT
- PostgreSQL database
- JPA/Hibernate for ORM
- Maven for dependency management
- Swagger/OpenAPI 3 for API documentation

### Infrastructure
- Docker and Docker Compose
- Nginx for reverse proxy
- PostgreSQL for data persistence

## Prerequisites


- Java 17 or higher
- Maven
- Docker and Docker Compose
- PostgreSQL

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/budget-tracker.git
   cd budget-tracker
   ```

2. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   # Frontend
   VITE_API_URL=http://localhost:8080
   
   # Backend
   SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/budgettrackerdb
   SPRING_DATASOURCE_USERNAME=postgres
   SPRING_DATASOURCE_PASSWORD=postgres
   JWT_SECRET=your-secret-key
   JWT_EXPIRATION_MS=86400000
   ```

3. Start the application using Docker:
   ```bash
   docker-compose up --build
   ```

   Or run frontend and backend separately:

   Frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

   Backend:
   ```bash
   cd backend
   mvn spring-boot:run
   ```

4. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080
   - API Documentation: http://localhost:8080/swagger-ui.html

## Project Structure

```
budget-tracker/
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── components/    # Reusable UI components
│   │   │   ├── pages/        # Page components
│   │   │   ├── services/     # API services
│   │   │   ├── hooks/        # Custom React hooks
│   │   │   └── assets/       # Static assets
│   │   └── public/           # Public assets
│   │
│   ├── backend/               # Spring Boot backend application
│   │   ├── src/
│   │   │   ├── main/
│   │   │   │   ├── java/    # Java source code
│   │   │   │   └── resources/ # Configuration files
│   │   │   └── test/        # Test files
│   │   └── pom.xml          # Maven configuration
│   │
│   └── docker-compose.yml    # Docker configuration
│
└── README.md
```

## Database Schema

The application uses PostgreSQL with the following main tables:

### Users Table
- `id`: Primary key
- `username`: Unique username for login
- `email`: Unique email address
- `password`: Encrypted password
- `roles`: Set of user roles (e.g., USER, ADMIN)

### Budgets Table
- `id`: Primary key
- `name`: Budget name (e.g., "Groceries", "Rent")
- `amount`: Maximum allocated amount
- `user_id`: Foreign key to users table
- One-to-many relationship with transactions

### Transactions Table
- `id`: Primary key
- `amount`: Transaction amount
- `type`: Transaction type (INCOME or EXPENSE)
- `description`: Optional transaction description
- `date`: Transaction date
- `category`: Optional category label (max 64 chars)
- `budget_id`: Foreign key to budgets table

The database includes indexes for:
- Username and email lookups
- Budget ID searches
- Transaction date queries
- Budget category combinations

## API Documentation

The application uses Swagger/OpenAPI 3 for comprehensive API documentation. When the backend server is running, you can access:

- **Swagger UI**: `http://localhost:8080/swagger-ui.html`
  - Interactive API documentation
  - Test endpoints directly from the browser
  - View request/response schemas
  - Authentication support

- **OpenAPI Specification**: `http://localhost:8080/v3/api-docs`
  - Raw OpenAPI 3.0 specification
  - Machine-readable API documentation
  - Can be imported into API testing tools

The API documentation includes:
- Complete endpoint documentation
- Request/response schemas
- Authentication requirements (JWT Bearer token)
- Example requests and responses
- API version information

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## Contact

feel free to contact me @ davidaviadh@gmail.com to for any questions!