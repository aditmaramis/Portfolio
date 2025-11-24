# 🏗️ Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      YOUR PORTFOLIO                          │
│                   (Next.js Application)                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              │
              ┌───────────────┴───────────────┐
              │                               │
              ▼                               ▼
    ┌─────────────────┐            ┌─────────────────┐
    │  Public Routes  │            │  Admin Routes   │
    │  (Anyone can    │            │  (Auth required)│
    │   access)       │            │                 │
    └─────────────────┘            └─────────────────┘
              │                               │
    ┌─────────┴─────────┐         ┌─────────┴─────────┐
    │                   │         │                   │
    ▼                   ▼         ▼                   ▼
┌────────┐      ┌──────────┐  ┌────────┐      ┌──────────┐
│  Home  │      │ Contact  │  │ Login  │      │  Admin   │
│  Page  │      │   Form   │  │  Page  │      │Dashboard │
└────────┘      └──────────┘  └────────┘      └──────────┘
    │                                              │
    │                                              │
    ├─ Header                                      ├─ Projects Manager
    ├─ About (static)                              └─ Services Manager
    ├─ Services (from DB) ◄──────┐
    ├─ Work (from DB) ◄──────┐   │
    └─ Footer                │   │
                             │   │
                             │   │
                    ┌────────┴───┴────────┐
                    │                     │
                    │  SUPABASE BACKEND   │
                    │                     │
                    └─────────────────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
     ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
     │ PostgreSQL  │ │    Auth     │ │   Storage   │
     │  Database   │ │             │ │             │
     └─────────────┘ └─────────────┘ └─────────────┘
              │              │              │
      ┌───────┴───────┐      │              │
      │               │      │              │
      ▼               ▼      ▼              ▼
┌──────────┐  ┌──────────┐  ┌────────┐  ┌──────────┐
│ projects │  │ services │  │ Users  │  │  Images  │
│  table   │  │  table   │  │  JWT   │  │  Bucket  │
└──────────┘  └──────────┘  └────────┘  └──────────┘
```

## Data Flow

### 1. Public User Views Portfolio

```
User Browser
    │
    │ 1. Visits homepage
    │
    ▼
Next.js Page (/)
    │
    │ 2. Components render
    │
    ▼
Work.jsx & Services.jsx
    │
    │ 3. Fetch data (useEffect)
    │
    ▼
Supabase Client (browser)
    │
    │ 4. Query tables
    │
    ▼
Supabase Database
    │
    │ 5. Return rows (public read access)
    │
    ▼
Components render with data
    │
    │ 6. Display to user
    │
    ▼
User sees projects & services
```

### 2. Admin Adds New Project

```
Admin Browser
    │
    │ 1. Login at /login
    │
    ▼
Supabase Auth
    │
    │ 2. Verify credentials
    │
    ▼
JWT Token (stored in cookie)
    │
    │ 3. Redirect to /admin
    │
    ▼
Middleware checks auth
    │
    │ 4. Allow access (authenticated)
    │
    ▼
Admin Dashboard
    │
    │ 5. Click "+ Add Project"
    │
    ▼
Project Form Modal
    │
    │ 6. Fill form & upload image
    │    ├─ Image → Supabase Storage
    │    └─ Get public URL
    │
    ▼
Submit Form
    │
    │ 7. INSERT into projects table
    │
    ▼
Supabase Database
    │
    │ 8. Check RLS policy (authenticated)
    │
    ▼
New row created
    │
    │ 9. Fetch updated list
    │
    ▼
Admin sees new project
    │
    │ 10. Public homepage also sees it!
    │
    ▼
Real-time update
```

## Authentication Flow

```
┌───────────────┐
│  User visits  │
│    /admin     │
└───────┬───────┘
        │
        ▼
┌──────────────────┐
│   Middleware     │  ◄─── middleware.js
│   checks auth    │
└───────┬──────────┘
        │
    ┌───┴───┐
    │ Auth? │
    └───┬───┘
        │
    ┌───┴────┐
    │        │
   Yes       No
    │        │
    ▼        ▼
┌───────┐  ┌──────────────┐
│ Allow │  │ Redirect to  │
│ /admin│  │   /login     │
└───────┘  └──────┬───────┘
    │              │
    │              ▼
    │      ┌───────────────┐
    │      │ Login Form    │
    │      └───────┬───────┘
    │              │
    │              ▼
    │      ┌──────────────┐
    │      │ Supabase     │
    │      │ Auth Check   │
    │      └───────┬──────┘
    │              │
    │          ┌───┴───┐
    │          │ Valid?│
    │          └───┬───┘
    │              │
    │          ┌───┴────┐
    │         Yes       No
    │          │        │
    │          ▼        ▼
    │      ┌────────┐  ┌─────────┐
    │      │Set JWT │  │  Error  │
    │      │Cookie  │  │ Message │
    │      └───┬────┘  └─────────┘
    │          │
    └──────────┘
```

## File Relationships

```
middleware.js
    │
    ├─ Protects /admin routes
    └─ Uses: lib/supabase/middleware.js
            │
            └─ Uses: @supabase/ssr

app/admin/page.js
    │
    ├─ Uses: lib/supabase/client.js
    ├─ Fetches from: projects & services tables
    └─ Uploads to: portfolio-images bucket

app/components/Work.jsx
    │
    ├─ Uses: lib/supabase/client.js
    └─ Fetches from: projects table

app/components/Services.jsx
    │
    ├─ Uses: lib/supabase/client.js
    └─ Fetches from: services table

.env.local
    │
    └─ Provides:
        ├─ NEXT_PUBLIC_SUPABASE_URL
        ├─ NEXT_PUBLIC_SUPABASE_ANON_KEY
        └─ SUPABASE_SERVICE_ROLE_KEY
```

## Security Layers

```
┌─────────────────────────────────────────┐
│          Layer 1: Middleware            │
│     (Route protection /admin/*)         │
└───────────────┬─────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────┐
│     Layer 2: Supabase Auth (JWT)        │
│    (Who is making the request?)         │
└───────────────┬─────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────┐
│   Layer 3: Row Level Security (RLS)     │
│  (Database-level access control)        │
│                                         │
│  Public:                                │
│    ✓ SELECT (read) on all tables       │
│    ✗ INSERT/UPDATE/DELETE               │
│                                         │
│  Authenticated:                         │
│    ✓ SELECT (read)                      │
│    ✓ INSERT (create)                    │
│    ✓ UPDATE (edit)                      │
│    ✓ DELETE (remove)                    │
└─────────────────────────────────────────┘
```

## Technology Stack

```
Frontend:
├── Next.js 15 (React 19)
├── Tailwind CSS 4
├── Motion (Framer Motion)
└── Lucide React

Backend:
├── Supabase
│   ├── PostgreSQL Database
│   ├── Authentication (JWT)
│   ├── Storage (S3-compatible)
│   └── Row Level Security
└── Next.js API Routes (future expansion)

Development:
├── Node.js
├── npm
└── ESLint
```

## Deployment Architecture

```
┌─────────────────────────────────────────┐
│           Production Setup               │
└─────────────────────────────────────────┘

Your Domain (yourdomain.com)
    │
    ▼
┌──────────────────┐
│  Vercel/Netlify  │  ◄── Deploy Next.js app here
│  Edge Network    │
└────────┬─────────┘
         │
         │ Environment Variables:
         │  - NEXT_PUBLIC_SUPABASE_URL
         │  - NEXT_PUBLIC_SUPABASE_ANON_KEY
         │  - SUPABASE_SERVICE_ROLE_KEY
         │
         ▼
┌─────────────────────┐
│  Supabase Cloud     │  ◄── Already hosted
│  (Global CDN)       │
└─────────────────────┘
         │
         ├─── Database (PostgreSQL)
         ├─── Auth Service
         └─── Storage (Images CDN)
```

## Request Example

**Adding a new project:**

```
1. Admin clicks "Save" button
   ↓
2. JavaScript event handler
   ↓
3. createClient() from lib/supabase/client.js
   ↓
4. supabase.from('projects').insert([{...}])
   ↓
5. HTTP POST to Supabase API
   ↓
6. Supabase checks JWT token
   ↓
7. Supabase checks RLS policy
   ↓
8. PostgreSQL INSERT query
   ↓
9. Return success/error
   ↓
10. Update UI with new data
```

---

This architecture provides:

- ✅ Separation of concerns
- ✅ Security at multiple layers
- ✅ Scalability (Supabase handles scaling)
- ✅ Easy maintenance (no backend code to manage)
- ✅ Fast performance (CDN for images)
