# Full-Stack Personal Portfolio & Content Management System (CMS)

A production-ready, full-stack Developer Portfolio website and Admin Content Management System built with **React (Vite, Tailwind CSS, Lucide Icons, React Router)** on the frontend, **Node.js & Express** on the backend, and **MongoDB & Mongoose** for persistent document storage.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Key Features](#key-features)
3. [Tech Stack](#tech-stack)
4. [System Architecture](#system-architecture)
5. [Folder Structure](#folder-structure)
6. [Getting Started & Installation](#getting-started--installation)
7. [Environment Configuration](#environment-configuration)
8. [Database Seeding](#database-seeding)
9. [Running the Application](#running-the-application)
10. [Admin Credentials](#demo-admin-credentials)
11. [REST API Reference](#rest-api-reference)
12. [Database Design](#database-design)
13. [Deployment Guide](#deployment)
14. [Documentation & Reports](#documentation--reports)
15. [Author & License](#author--license)

---

## Project Overview

This repository provides an enterprise-grade full-stack personal portfolio application where **all portfolio content** (Profile, Skills, Projects, Experience, Education, and Inbound Messages) is completely dynamic and persisted in MongoDB.

Administrators can log into a dedicated, responsive CMS Dashboard to manage their portfolio in real-time without editing source code or redeploying.

---

## Key Features

### 🌟 Public Portfolio
- **Modern Hero Section**: Name, professional title, bio, real profile photo, action buttons, and direct LeetCode link.
- **Dynamic Projects Showcase**: Primary featured project (*Online Voting Application*), *URL Shortener*, *BookSphere*, *Weather App*, and *CravMap* with search, tech stack filtering, modal previews, and detailed single-project pages (`/projects/:id`).
- **Problem Solving & DSA Matrix**: LeetCode stats (450+ LeetCode solved, 1710 contest rating, 500+ across platforms), C++ primary problem solving language, and 13 core algorithmic topic tags.
- **Dynamic Categorized Skills**: Skills grouped into *Programming Languages*, *Core CS*, *Backend*, *Frontend (Currently Learning)*, *Database*, and *Tools & Technologies* (featuring Postman).
- **Academic Credentials (Education)**: Degree, college, and computer science curriculum without GPA.
- **Interactive Contact Form**: Client & backend validated inquiry submission persisted directly to MongoDB with instant toast feedback.
- **Rich Aesthetics**: Dark-mode glassmorphic interface, custom scrollbars, glowing accents, and responsive layout for mobile, tablet, and desktop.

### 🛡️ Admin CMS Dashboard
- **Protected Routes**: Secure `/admin/*` routes with JWT token verification and automatic redirection for unauthenticated visitors.
- **Dashboard Overview**: Metrics on Total Projects, Skills, Experiences, Educations, and Unread Inbound Messages.
- **Profile Manager**: Edit name, title, bio, location, phone, social handles, avatar URL, and resume links.
- **Skill Manager**: Full CRUD with category filters and proficiency sliders.
- **Project Manager**: Full CRUD with technology tags, live demo links, repository URLs, and featured flags.
- **Experience & Education Managers**: Full CRUD with timeline controls and rich descriptions.
- **Inquiry Inbox**: View incoming messages, toggle read/unread status, reply via email, and delete inquiries with confirmation dialogs.

---

## Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite 6, Tailwind CSS 3.4, React Router DOM 6, Axios, Lucide React Icons |
| **Backend** | Node.js, Express.js 4, JSON Web Token (JWT), bcryptjs, CORS, Morgan, dotenv |
| **Database** | MongoDB, Mongoose 8.9 ODM |
| **Dev Tooling** | Concurrently, Nodemon |

---

## System Architecture

```
React Frontend (SPA) 
  ──(Axios HTTP / JSON)──► Express.js REST API
                              ├── JWT Auth Middleware
                              ├── Centralized Error Handler
                              └── Mongoose ODM ──► MongoDB Database
```

---

## Folder Structure

```
portfolio-website/
├── client/                      # React Frontend (Vite)
│   ├── public/                  # Public assets
│   ├── src/
│   │   ├── admin/               # Admin CMS modules (Dashboard, Profile, Skills, Projects, etc.)
│   │   ├── components/          # Reusable UI components (Navbar, Footer, ProjectCard, Modal, Toast, etc.)
│   │   ├── context/             # AuthContext, ToastContext
│   │   ├── hooks/               # Custom hooks
│   │   ├── layouts/             # PublicLayout, AdminLayout
│   │   ├── pages/               # Public pages (Home, About, Skills, Projects, Contact, etc.)
│   │   ├── services/            # Centralized Axios API services
│   │   ├── utils/               # Helper utilities
│   │   ├── App.jsx              # App root & route definitions
│   │   ├── index.css            # Tailwind directives & glassmorphic styles
│   │   └── main.jsx             # React entry point
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/                      # Express Backend Server
│   ├── config/                  # MongoDB Connection (db.js)
│   ├── controllers/             # Resource controllers (auth, profile, skill, project, etc.)
│   ├── middleware/              # Auth, error, and validation middlewares
│   ├── models/                  # Mongoose Schemas (User, Profile, Skill, Project, Experience, etc.)
│   ├── routes/                  # Express REST routes
│   ├── seed/                    # Database seeder script & rich realistic mock data
│   ├── utils/                   # JWT generator & token helpers
│   ├── package.json
│   └── server.js                # Express app entry point
│
├── docs/                        # Complete Technical Documentation
│   ├── database-schema.md       # Comprehensive database reference
│   ├── api.md                   # REST API documentation with sample payloads
│   └── project-report.md        # Academic-grade project report (suitable for PDF)
│
├── .env.example                 # Example environment variables
├── .gitignore                   # Git exclusion rules
├── package.json                 # Unified workspace orchestration
└── README.md                    # Project documentation
```

---

## Getting Started & Installation

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **MongoDB** running locally or a **MongoDB Atlas** connection URI

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/portfolio-website.git
cd portfolio-website
```

### 2. Install All Dependencies
You can install root, server, and client dependencies with a single command:
```bash
npm run install:all
```
*(Or install individually: `npm install`, `cd server && npm install`, `cd ../client && npm install`)*

---

## Environment Configuration

Create a `.env` file inside the `server/` directory:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/portfolio_db
JWT_SECRET=super_secret_jwt_key_change_in_production_2025_secure_portfolio
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

*(If deploying frontend separately, you can optionally create `client/.env` with `VITE_API_URL=https://your-backend-api.com/api`)*

---

## Database Seeding

Populate MongoDB with realistic demo content, 12 grouped skills, 4 featured projects, career timeline, university education, sample messages, and the demo admin account:

```bash
npm run seed
```
*(Or from the `server/` directory: `npm run seed`)*

---

## Running the Application

### Option A: Run Both Client and Backend Concurrently (Recommended)
From the root directory:
```bash
npm run dev
```
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

### Option B: Run Services Separately
**Start Backend:**
```bash
cd server
npm run dev
```

**Start Frontend:**
```bash
cd client
npm run dev
```

---

## Demo Admin Credentials

To evaluate and manage the CMS:
1. Navigate to: **`http://localhost:5173/admin/login`**
2. Use the credentials:
   - **Email**: `admin@portfolio.com`
   - **Password**: `Admin@123456`
   *(Tip: A one-click **"Autofill Demo Admin Credentials"** button is also available directly on the login form for testing convenience).*

---

## REST API Reference

| Endpoint | Method | Access | Description |
| :--- | :--- | :--- | :--- |
| `/api/auth/login` | `POST` | Public | Authenticate admin & receive JWT token |
| `/api/auth/me` | `GET` | Private | Get authenticated admin profile |
| `/api/profile` | `GET` | Public | Fetch public developer profile |
| `/api/profile` | `PUT` | Private/Admin | Update profile details |
| `/api/skills` | `GET` | Public | Get all skills (filter by `?category=`) |
| `/api/skills` | `POST` | Private/Admin | Create new skill |
| `/api/skills/:id` | `PUT` / `DELETE` | Private/Admin | Update or delete skill |
| `/api/projects` | `GET` | Public | Get projects (filter by `?featured=true`) |
| `/api/projects/:id` | `GET` | Public | Get single project details |
| `/api/projects` | `POST` | Private/Admin | Create new project |
| `/api/projects/:id` | `PUT` / `DELETE` | Private/Admin | Update or delete project |
| `/api/experience` | `GET` | Public | Get career experience |
| `/api/experience` | `POST` | Private/Admin | Create experience entry |
| `/api/experience/:id` | `PUT` / `DELETE` | Private/Admin | Update or delete experience |
| `/api/education` | `GET` | Public | Get academic credentials |
| `/api/education` | `POST` | Private/Admin | Create education record |
| `/api/education/:id` | `PUT` / `DELETE` | Private/Admin | Update or delete education |
| `/api/contact` | `POST` | Public | Submit contact inquiry to MongoDB |
| `/api/contact` | `GET` | Private/Admin | View all contact messages |
| `/api/contact/:id/read` | `PUT` | Private/Admin | Toggle message read/unread status |
| `/api/contact/:id` | `DELETE` | Private/Admin | Delete message |
| `/api/contact/stats` | `GET` | Private/Admin | Aggregated statistics for CMS dashboard |

*See [`docs/api.md`](docs/api.md) for full request/response schemas.*

---

## Database Design

The database consists of 7 Mongoose collections:
- `User`: Administrative access & bcrypt hashes.
- `Profile`: Identity, contact coordinates, social channels, and resume link.
- `Skill`: Name, category, proficiency metric, and icon.
- `Project`: Title, description, technology array, screenshot, live demo, and GitHub link.
- `Experience`: Company, role, timeline, and responsibilities.
- `Education`: Institution, degree, field, and core curriculum (NO CGPA).
- `ContactMessage`: Public inquiry logs with read status flags.

*See [`docs/database-schema.md`](docs/database-schema.md) for full field constraints and JSON models.*

---

## Deployment

### Backend (Render / Railway / Heroku / AWS EC2)
1. Push your repository to GitHub.
2. Set environment variables: `PORT=5000`, `NODE_ENV=production`, `MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL`.
3. Build & start command: `npm install && npm start`.

### Frontend (Vercel / Netlify / Cloudflare Pages)
1. Deploy the `client/` directory.
2. Build command: `npm run build`.
3. Output directory: `dist`.
4. Environment variable: `VITE_API_URL=https://your-backend.onrender.com/api`.

---

## Documentation & Reports

- **Database Schema**: [`docs/database-schema.md`](docs/database-schema.md)
- **API Documentation**: [`docs/api.md`](docs/api.md)
- **Academic Project Report**: [`docs/project-report.md`](docs/project-report.md)

---

## Author & License

- **Developer**: Shashwat Pandey (Full-Stack Developer | AI & Data Science Student)
- **GitHub**: [github.com/Shashwat-pandey21](https://github.com/Shashwat-pandey21)
- **LinkedIn**: [linkedin.com/in/shashwat-pandey](https://www.linkedin.com/in/shashwat-pandey-b596a732a/)
- **LeetCode**: [leetcode.com/u/shashwatpandey_21](https://leetcode.com/u/shashwatpandey_21/)
- **License**: MIT License — open for academic, personal, and professional use.
