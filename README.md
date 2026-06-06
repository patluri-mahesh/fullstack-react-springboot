# 🖥️ Full Stack App — React + Spring Boot

A production-ready full stack application with a React 18 + TypeScript frontend and a Spring Boot 3 backend, connected end to end with JWT authentication, role-based access control, and a paginated product catalog.

## Tech Stack

**Frontend**
- React 18 + TypeScript
- React Router v6 — client-side routing
- TanStack Query (React Query) — server state, caching, pagination
- React Hook Form — form handling + validation
- Axios — HTTP client with JWT interceptor
- Tailwind CSS — utility-first styling
- Vite — fast dev server with API proxy
- react-hot-toast — notifications

**Backend**
- Java 17, Spring Boot 3.2
- Spring Security + JWT (stateless)
- Spring Data JPA + PostgreSQL
- Bean Validation
- Role-based access (`ROLE_USER`, `ROLE_ADMIN`)
- Global exception handler
- Paginated REST API

## Features

- ✅ Register and login with JWT
- ✅ Protected routes (frontend + backend)
- ✅ Admin-only routes (product management)
- ✅ Paginated product listing
- ✅ Product search by keyword
- ✅ Full CRUD for products (admin only)
- ✅ Axios interceptor — auto-attach token, handle 401
- ✅ React Query caching + invalidation
- ✅ Responsive UI with Tailwind CSS

## Quick Start

```bash
git clone https://github.com/patluri-mahesh/fullstack-react-springboot.git
cd fullstack-react-springboot

# Start everything with Docker Compose
docker-compose up --build

# App available at:   http://localhost:3000
# API available at:   http://localhost:8080/api
```

## Running Locally (without Docker)

```bash
# Backend
cd backend
mvn spring-boot:run
# API at http://localhost:8080

# Frontend (separate terminal)
cd frontend
npm install
npm run dev
# App at http://localhost:3000
```

## API Endpoints

```
POST /api/auth/register         — Register new user
POST /api/auth/login            — Login, get JWT

GET  /api/users/me              — Current user profile (auth required)

GET  /api/products              — All products (paginated, auth required)
GET  /api/products/search       — Search by keyword
GET  /api/products/category/:c  — Filter by category
GET  /api/products/:id          — Product detail

POST   /api/products            — Create product (ADMIN only)
PUT    /api/products/:id        — Update product (ADMIN only)
DELETE /api/products/:id        — Delete product (ADMIN only)
```

## Project Structure

```
fullstack-react-springboot/
├── backend/
│   └── src/main/java/com/app/
│       ├── auth/               # JWT filter, service, controller
│       ├── config/             # Security config, CORS, UserDetailsService
│       ├── user/               # User entity, repo, controller
│       ├── product/            # Product entity, service, controller
│       └── common/             # ApiResponse, PageResponse, GlobalExceptionHandler
├── frontend/
│   └── src/
│       ├── api/                # axios instance + API calls
│       ├── components/         # Navbar, ProductCard, ProtectedRoute, Spinner
│       ├── context/            # AuthContext (JWT state)
│       ├── hooks/              # useProducts (React Query)
│       ├── pages/              # Login, Register, Products, Admin
│       └── types/              # TypeScript interfaces
├── docker-compose.yml
└── README.md
```

## Running Tests

```bash
cd backend
mvn test
```
