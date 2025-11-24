# Quick Reference - Admin Features

## 🔑 Admin Access

- **Login URL**: `/login`
- **Dashboard URL**: `/admin`
- **Logout**: Click "Logout" in dashboard header

## 📂 File Structure

```
portfolio/
├── app/
│   ├── admin/
│   │   └── page.js          # Admin dashboard with Projects & Services managers
│   ├── login/
│   │   └── page.js          # Login page
│   └── components/
│       ├── Work.jsx          # Projects display (now fetches from Supabase)
│       └── Services.jsx      # Services display (now fetches from Supabase)
├── lib/
│   └── supabase/
│       ├── client.js         # Browser Supabase client
│       ├── server.js         # Server Supabase client
│       └── middleware.js     # Auth middleware
├── middleware.js             # Next.js middleware for route protection
├── .env.local                # Environment variables (DO NOT COMMIT)
├── supabase-schema.sql       # Database setup SQL
└── ADMIN_SETUP.md           # Complete setup instructions
```

## 🗄️ Database Tables

### projects

- `id` (UUID) - Primary key
- `title` (TEXT) - Project title
- `description` (TEXT) - Short description
- `bg_image` (TEXT) - Background image URL
- `link` (TEXT) - Optional project link
- `order_index` (INTEGER) - Display order
- `created_at` / `updated_at` - Timestamps

### services

- `id` (UUID) - Primary key
- `title` (TEXT) - Service title
- `description` (TEXT) - Service description
- `icon` (TEXT) - Icon (emoji or text)
- `link` (TEXT) - Optional link
- `order_index` (INTEGER) - Display order
- `created_at` / `updated_at` - Timestamps

### Storage Bucket

- **Name**: `portfolio-images`
- **Public**: Yes
- **Path**: `/projects/*` for project images

## 🔐 Security

### Row Level Security (RLS)

- ✅ **Public** can READ all tables
- ✅ **Authenticated users** can CREATE, UPDATE, DELETE
- ✅ **Storage** follows same pattern

### Route Protection

- `/admin/*` - Requires authentication
- `/login` - Public
- All other routes - Public

## 🎨 Admin UI Features

### Projects Manager

- Add new projects
- Edit existing projects
- Delete projects
- Upload images directly to Supabase Storage
- Reorder with order_index
- Preview images before saving

### Services Manager

- Add new services
- Edit existing services
- Delete services
- Use emojis or text for icons
- Reorder with order_index

## 🚀 Common Tasks

### Add a new project

1. Login → Admin Dashboard
2. Projects tab → "+ Add Project"
3. Fill form → Upload image → Save

### Change project order

1. Edit the project
2. Change "Order" number
3. Lower numbers appear first
4. Save

### Update service icon

1. Services tab → Edit service
2. Change icon field (e.g., "🎨" or "web_icon")
3. Save

### Reset password

1. Supabase Dashboard
2. Authentication → Users
3. Find user → Reset password

## 🔄 Data Flow

### Frontend (Public View)

```
Work.jsx → Supabase → projects table → Display
Services.jsx → Supabase → services table → Display
```

### Admin Dashboard

```
Admin Dashboard → CRUD operations → Supabase → Update tables → Frontend sees changes
```

## 📝 Environment Variables

Required in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=        # Your Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=   # Public anon key
SUPABASE_SERVICE_ROLE_KEY=       # Service role key (keep secret!)
```

## 🛠️ Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## ⚡ Tips

1. **Images**: Upload images through admin dashboard for automatic Supabase Storage
2. **Order**: Use order_index in increments of 10 (10, 20, 30) for easy reordering
3. **Icons**: For services, use emojis (🌐, 🎨, 💻) for better visuals
4. **Links**: Optional - add project links for external demos/repos
5. **Backup**: Export data from Supabase regularly (Table Editor → Export)

## 🐛 Debug Checklist

If something's not working:

- [ ] `.env.local` has correct values
- [ ] Dev server restarted after changing `.env.local`
- [ ] SQL schema ran successfully in Supabase
- [ ] User exists in Supabase Authentication
- [ ] User has "Email Confirmed" status
- [ ] Check browser console for errors
- [ ] Check Network tab for failed requests

## 📚 Resources

- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Storage**: https://supabase.com/docs/guides/storage
- **RLS Policies**: https://supabase.com/docs/guides/auth/row-level-security
