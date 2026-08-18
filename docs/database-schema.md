# Database Schema Documentation

## 1. Overview & Architecture

The **Personal Portfolio Website & CMS** uses **MongoDB** as its persistent document-based database and **Mongoose** as the Object-Document Mapper (ODM).

The database architecture is designed to support:
- Administrative security and role-based access control.
- Dynamic developer profile and curriculum vitae information.
- Categorized skill sets with numeric proficiency metrics.
- Detailed project records featuring tech stacks, live links, and media.
- Chronological work experience history.
- Formal academic credentials and degrees.
- Inbound contact message logging and read/unread status tracking.

---

## 2. Collections & Schemas

### 2.1 `users` Collection

Stores administrative credentials and system roles.

| Field Name | Type | Required | Default / Constraints | Description |
| :--- | :--- | :--- | :--- | :--- |
| `_id` | `ObjectId` | Auto | Unique primary key | Document Identifier |
| `name` | `String` | Yes | Trimmed | Administrator Full Name |
| `email` | `String` | Yes | Unique, Lowercase, Regex validated | Administrative Email |
| `password` | `String` | Yes | Min length 6, Hashed via bcryptjs (`select: false`) | Securely hashed password |
| `role` | `String` | Yes | `'admin'` (Enum: `['admin', 'user']`) | Access level |
| `createdAt` | `Date` | Auto | Mongoose Timestamp | Record creation timestamp |
| `updatedAt` | `Date` | Auto | Mongoose Timestamp | Record update timestamp |

**Example Document:**
```json
{
  "_id": "67b4474744d0df27ef21a001",
  "name": "Admin Developer",
  "email": "admin@portfolio.com",
  "role": "admin",
  "createdAt": "2025-01-15T08:30:00.000Z",
  "updatedAt": "2025-01-15T08:30:00.000Z"
}
```

---

### 2.2 `profiles` Collection

Stores single-instance developer identity and coordinates.

| Field Name | Type | Required | Default / Constraints | Description |
| :--- | :--- | :--- | :--- | :--- |
| `_id` | `ObjectId` | Auto | Unique primary key | Document Identifier |
| `name` | `String` | Yes | Trimmed | Developer Full Name |
| `title` | `String` | Yes | Trimmed | Professional Title / Role |
| `bio` | `String` | Yes | Long text | Personal Biography & Summary |
| `profileImage`| `String` | No | Default Avatar URL | Public profile photo |
| `email` | `String` | Yes | Lowercase, Trimmed | Public contact email |
| `phone` | `String` | No | `'+1 (555) 234-5678'` | Contact telephone |
| `location` | `String` | No | `'San Francisco, CA'` | Geographic residence |
| `github` | `String` | No | GitHub profile URL | GitHub link |
| `linkedin` | `String` | No | LinkedIn profile URL | LinkedIn link |
| `twitter` | `String` | No | Twitter/X profile URL | Twitter link |
| `resumeUrl` | `String` | No | PDF URL | Direct link to resume |
| `createdAt` | `Date` | Auto | Mongoose Timestamp | Record creation timestamp |
| `updatedAt` | `Date` | Auto | Mongoose Timestamp | Record update timestamp |

**Example Document:**
```json
{
  "_id": "67b4474744d0df27ef21a002",
  "name": "Ethan Vance",
  "title": "Lead Full-Stack Engineer & Distributed Systems Specialist",
  "bio": "Driven full-stack engineer with 6+ years of experience architecting resilient cloud-native applications...",
  "profileImage": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
  "email": "ethan.vance.dev@gmail.com",
  "phone": "+1 (415) 890-3421",
  "location": "San Francisco, CA & Remote",
  "github": "https://github.com/developer-ethan",
  "linkedin": "https://linkedin.com/in/ethan-vance-dev",
  "twitter": "https://twitter.com/ethanvance_dev",
  "resumeUrl": "https://example.com/ethan-vance-resume.pdf",
  "createdAt": "2025-01-15T08:30:00.000Z",
  "updatedAt": "2025-01-15T08:30:00.000Z"
}
```

---

### 2.3 `skills` Collection

Stores categorized technical capabilities.

| Field Name | Type | Required | Default / Constraints | Description |
| :--- | :--- | :--- | :--- | :--- |
| `_id` | `ObjectId` | Auto | Unique primary key | Document Identifier |
| `name` | `String` | Yes | Trimmed | Skill name (e.g., React.js) |
| `category` | `String` | Yes | Enum: `['Programming Languages', 'Frontend', 'Backend', 'Database', 'Tools & Technologies']` | Skill category grouping |
| `proficiency`| `Number` | Yes | Range: 1 – 100, Default: 80 | Mastery percentage |
| `icon` | `String` | No | Default: `'Code'` | Lucide icon name |
| `createdAt` | `Date` | Auto | Mongoose Timestamp | Record creation timestamp |
| `updatedAt` | `Date` | Auto | Mongoose Timestamp | Record update timestamp |

**Example Document:**
```json
{
  "_id": "67b4474744d0df27ef21a003",
  "name": "JavaScript / TypeScript",
  "category": "Programming Languages",
  "proficiency": 95,
  "icon": "Code2",
  "createdAt": "2025-01-15T08:30:00.000Z",
  "updatedAt": "2025-01-15T08:30:00.000Z"
}
```

---

### 2.4 `projects` Collection

Stores showcase applications and repositories.

| Field Name | Type | Required | Default / Constraints | Description |
| :--- | :--- | :--- | :--- | :--- |
| `_id` | `ObjectId` | Auto | Unique primary key | Document Identifier |
| `title` | `String` | Yes | Trimmed | Project Name |
| `description`| `String` | Yes | Full text | Project narrative & features |
| `technologies`| `[String]` | Yes | Array of non-empty strings | Stack tags |
| `image` | `String` | No | Default cover placeholder | Screenshot or graphic |
| `githubUrl` | `String` | No | Empty string | Source code repository |
| `liveUrl` | `String` | No | Empty string | Deployed live app |
| `featured` | `Boolean`| No | Default: `false` | Homepage highlight flag |
| `createdAt` | `Date` | Auto | Mongoose Timestamp | Record creation timestamp |
| `updatedAt` | `Date` | Auto | Mongoose Timestamp | Record update timestamp |

**Example Document:**
```json
{
  "_id": "67b4474744d0df27ef21a004",
  "title": "PulseAnalytics - Real-time SaaS Telemetry Platform",
  "description": "An enterprise analytics observability suite providing live metric streaming...",
  "technologies": ["React", "Node.js", "Express", "MongoDB", "Redis", "Tailwind CSS"],
  "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  "githubUrl": "https://github.com/example/pulse-analytics",
  "liveUrl": "https://pulse-analytics-demo.com",
  "featured": true,
  "createdAt": "2025-01-15T08:30:00.000Z",
  "updatedAt": "2025-01-15T08:30:00.000Z"
}
```

---

### 2.5 `experiences` Collection

Stores professional employment positions.

| Field Name | Type | Required | Default / Constraints | Description |
| :--- | :--- | :--- | :--- | :--- |
| `_id` | `ObjectId` | Auto | Unique primary key | Document Identifier |
| `company` | `String` | Yes | Trimmed | Organization Name |
| `role` | `String` | Yes | Trimmed | Job Title |
| `startDate` | `String` | Yes | e.g. `'Mar 2022'` | Employment start period |
| `endDate` | `String` | No | Default: `'Present'` | Employment end period |
| `description`| `String` | Yes | Bulleted or paragraph text | Contributions & impacts |
| `technologies`| `[String]` | No | Default: `[]` | Tech stack applied |
| `createdAt` | `Date` | Auto | Mongoose Timestamp | Record creation timestamp |
| `updatedAt` | `Date` | Auto | Mongoose Timestamp | Record update timestamp |

---

### 2.6 `educations` Collection

Stores degrees, credentials, and honors.

| Field Name | Type | Required | Default / Constraints | Description |
| :--- | :--- | :--- | :--- | :--- |
| `_id` | `ObjectId` | Auto | Unique primary key | Document Identifier |
| `institution`| `String` | Yes | Trimmed | University or College |
| `degree` | `String` | Yes | Trimmed | e.g. `'Bachelor of Science'` |
| `field` | `String` | Yes | Trimmed | e.g. `'Computer Science'` |
| `startYear` | `String` | Yes | e.g. `'2015'` | Start year |
| `endYear` | `String` | No | Default: `'Present'` | Graduation year |
| `grade` | `String` | No | e.g. `'3.85 GPA'` | Academic honors / GPA |
| `description`| `String` | No | Optional notes | Coursework & activities |
| `createdAt` | `Date` | Auto | Mongoose Timestamp | Record creation timestamp |
| `updatedAt` | `Date` | Auto | Mongoose Timestamp | Record update timestamp |

---

### 2.7 `contactmessages` Collection

Stores user inquiries sent from the public website.

| Field Name | Type | Required | Default / Constraints | Description |
| :--- | :--- | :--- | :--- | :--- |
| `_id` | `ObjectId` | Auto | Unique primary key | Document Identifier |
| `name` | `String` | Yes | Trimmed | Sender Name |
| `email` | `String` | Yes | Lowercase, Regex validated | Sender Email |
| `subject` | `String` | Yes | Trimmed | Subject line |
| `message` | `String` | Yes | Full message content | Inquiry body |
| `isRead` | `Boolean`| No | Default: `false` | Review status flag |
| `createdAt` | `Date` | Auto | Mongoose Timestamp | Submission timestamp |
| `updatedAt` | `Date` | Auto | Mongoose Timestamp | Update timestamp |

---

## 3. Database Indexes

- `users.email`: Unique index for fast login authentication lookup and duplicate prevention.
- `projects.featured`: Index for rapid filtering of homepage featured items.
- `skills.category`: Index for categorized filtering.
- `contactmessages.isRead`: Index for instantaneous unread count calculation in admin dashboard.
