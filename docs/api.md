# REST API Documentation

Base URL: `http://localhost:5000/api`

All administrative write operations (`POST`, `PUT`, `DELETE`) require a valid JSON Web Token passed in the `Authorization` header:
```http
Authorization: Bearer <JWT_TOKEN>
```

---

## 1. Authentication Endpoints

### 1.1 Login Admin
- **Method**: `POST`
- **URL**: `/api/auth/login`
- **Auth**: Public
- **Request Body**:
```json
{
  "email": "admin@portfolio.com",
  "password": "Admin@123456"
}
```
- **Success Response (200 OK)**:
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "67b4474744d0df27ef21a001",
    "name": "Admin Developer",
    "email": "admin@portfolio.com",
    "role": "admin"
  }
}
```
- **Error Responses**:
  - `400 Bad Request`: `{"success": false, "message": "Please provide both email and password"}`
  - `401 Unauthorized`: `{"success": false, "message": "Invalid credentials. Password does not match."}`

---

### 1.2 Get Current User
- **Method**: `GET`
- **URL**: `/api/auth/me`
- **Auth**: Private (`Bearer <Token>`)
- **Success Response (200 OK)**:
```json
{
  "success": true,
  "user": {
    "_id": "67b4474744d0df27ef21a001",
    "name": "Admin Developer",
    "email": "admin@portfolio.com",
    "role": "admin",
    "createdAt": "2025-01-15T08:30:00.000Z"
  }
}
```

---

## 2. Profile Endpoints

### 2.1 Get Profile
- **Method**: `GET`
- **URL**: `/api/profile`
- **Auth**: Public
- **Success Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "_id": "67b4474744d0df27ef21a002",
    "name": "Ethan Vance",
    "title": "Lead Full-Stack Engineer & Distributed Systems Specialist",
    "bio": "Driven full-stack engineer with 6+ years of experience...",
    "profileImage": "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    "email": "ethan.vance.dev@gmail.com",
    "phone": "+1 (415) 890-3421",
    "location": "San Francisco, CA & Remote",
    "github": "https://github.com/developer-ethan",
    "linkedin": "https://linkedin.com/in/ethan-vance-dev",
    "twitter": "https://twitter.com/ethanvance_dev",
    "resumeUrl": "https://example.com/ethan-vance-resume.pdf"
  }
}
```

### 2.2 Update Profile
- **Method**: `PUT`
- **URL**: `/api/profile`
- **Auth**: Private/Admin
- **Request Body**: Full or partial profile fields
- **Success Response (200 OK)**:
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": { ... }
}
```

---

## 3. Skills Endpoints

### 3.1 Get All Skills
- **Method**: `GET`
- **URL**: `/api/skills` (Optional query: `?category=Frontend`)
- **Auth**: Public
- **Success Response (200 OK)**:
```json
{
  "success": true,
  "count": 12,
  "data": [
    {
      "_id": "67b4474744d0df27ef21a003",
      "name": "JavaScript / TypeScript",
      "category": "Programming Languages",
      "proficiency": 95,
      "icon": "Code2"
    }
  ]
}
```

### 3.2 Create Skill
- **Method**: `POST`
- **URL**: `/api/skills`
- **Auth**: Private/Admin
- **Request Body**:
```json
{
  "name": "GraphQL",
  "category": "Backend",
  "proficiency": 90,
  "icon": "Network"
}
```
- **Success Response (201 Created)**:
```json
{
  "success": true,
  "message": "Skill created successfully",
  "data": { ... }
}
```

### 3.3 Update Skill
- **Method**: `PUT`
- **URL**: `/api/skills/:id`
- **Auth**: Private/Admin

### 3.4 Delete Skill
- **Method**: `DELETE`
- **URL**: `/api/skills/:id`
- **Auth**: Private/Admin

---

## 4. Projects Endpoints

### 4.1 Get Projects
- **Method**: `GET`
- **URL**: `/api/projects` (Optional query: `?featured=true`)
- **Auth**: Public

### 4.2 Get Project by ID
- **Method**: `GET`
- **URL**: `/api/projects/:id`
- **Auth**: Public

### 4.3 Create Project
- **Method**: `POST`
- **URL**: `/api/projects`
- **Auth**: Private/Admin
- **Request Body**:
```json
{
  "title": "PulseAnalytics SaaS",
  "description": "Real-time observability platform...",
  "technologies": ["React", "Node.js", "Express", "MongoDB"],
  "image": "https://images.unsplash.com/...",
  "githubUrl": "https://github.com/example/repo",
  "liveUrl": "https://live-app.com",
  "featured": true
}
```

### 4.4 Update Project
- **Method**: `PUT`
- **URL**: `/api/projects/:id`
- **Auth**: Private/Admin

### 4.5 Delete Project
- **Method**: `DELETE`
- **URL**: `/api/projects/:id`
- **Auth**: Private/Admin

---

## 5. Experience Endpoints

### 5.1 Get Experiences
- **Method**: `GET`
- **URL**: `/api/experience`
- **Auth**: Public

### 5.2 Create Experience
- **Method**: `POST`
- **URL**: `/api/experience`
- **Auth**: Private/Admin

### 5.3 Update Experience
- **Method**: `PUT`
- **URL**: `/api/experience/:id`
- **Auth**: Private/Admin

### 5.4 Delete Experience
- **Method**: `DELETE`
- **URL**: `/api/experience/:id`
- **Auth**: Private/Admin

---

## 6. Education Endpoints

### 6.1 Get Education
- **Method**: `GET`
- **URL**: `/api/education`
- **Auth**: Public

### 6.2 Create Education
- **Method**: `POST`
- **URL**: `/api/education`
- **Auth**: Private/Admin

### 6.3 Update Education
- **Method**: `PUT`
- **URL**: `/api/education/:id`
- **Auth**: Private/Admin

### 6.4 Delete Education
- **Method**: `DELETE`
- **URL**: `/api/education/:id`
- **Auth**: Private/Admin

---

## 7. Contact & Dashboard Stats Endpoints

### 7.1 Submit Contact Message
- **Method**: `POST`
- **URL**: `/api/contact`
- **Auth**: Public
- **Request Body**:
```json
{
  "name": "Jane Developer",
  "email": "jane@example.com",
  "subject": "Role inquiry",
  "message": "We'd love to chat about a lead engineer position."
}
```
- **Success Response (201 Created)**:
```json
{
  "success": true,
  "message": "Thank you! Your message has been sent successfully.",
  "data": { ... }
}
```

### 7.2 Get Messages
- **Method**: `GET`
- **URL**: `/api/contact`
- **Auth**: Private/Admin
- **Success Response (200 OK)**:
```json
{
  "success": true,
  "count": 5,
  "unreadCount": 2,
  "data": [ ... ]
}
```

### 7.3 Toggle / Mark Message Read Status
- **Method**: `PUT`
- **URL**: `/api/contact/:id/read`
- **Auth**: Private/Admin
- **Request Body** (optional): `{"isRead": true}`

### 7.4 Delete Message
- **Method**: `DELETE`
- **URL**: `/api/contact/:id`
- **Auth**: Private/Admin

### 7.5 Get Admin Dashboard Stats
- **Method**: `GET`
- **URL**: `/api/contact/stats`
- **Auth**: Private/Admin
- **Success Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "totalProjects": 4,
    "featuredProjects": 3,
    "totalSkills": 12,
    "totalExperiences": 2,
    "totalEducation": 1,
    "totalMessages": 2,
    "unreadMessages": 1
  }
}
```
