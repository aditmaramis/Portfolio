# Portfolio with Admin Dashboard

A modern, full-stack portfolio website built with Next.js 15 and Supabase, featuring a complete admin dashboard for content management.

## ✨ Features

### Public Portfolio

- 🎨 Modern, responsive design
- 🌓 Dark/Light mode toggle
- ⚡ Smooth animations with Framer Motion
- 📱 Mobile-first responsive layout
- 📧 Contact form integration
- 🎯 Single-page application with smooth scroll

### Admin Dashboard

- 🔐 Secure authentication
- 📊 Visual content management
- 🖼️ Direct image upload
- ✏️ Add/Edit/Delete projects
- 🛠️ Manage services section
- 🚀 No code changes needed for updates

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (React 19)
- **Styling**: Tailwind CSS 4
- **Animations**: Motion (Framer Motion)
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Deployment**: Vercel-ready

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project
3. Get your API keys from Settings → API
4. Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

5. Run the database setup:

   - Open Supabase SQL Editor
   - Copy contents of `supabase-schema.sql`
   - Run the SQL script

6. Create your admin user:
   - Go to Authentication → Users in Supabase
   - Click "Add User"
   - Enter email/password
   - Check "Auto Confirm User"

### 3. Run Development Server

```bash
npm run dev
```

Visit:

- Portfolio: [http://localhost:3000](http://localhost:3000)
- Admin Login: [http://localhost:3000/login](http://localhost:3000/login)
- Admin Dashboard: [http://localhost:3000/admin](http://localhost:3000/admin)

## 📚 Documentation

Comprehensive documentation is available in the `docs/` folder:

- **[SETUP_CHECKLIST.md](./docs/SETUP_CHECKLIST.md)** - Step-by-step setup checklist
- **[ADMIN_SETUP.md](./docs/ADMIN_SETUP.md)** - Complete setup guide
- **[ADMIN_QUICK_REFERENCE.md](./docs/ADMIN_QUICK_REFERENCE.md)** - Quick reference for daily use
- **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - System architecture overview
- **[TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md)** - Common issues and solutions
- **[IMPLEMENTATION_SUMMARY.md](./docs/IMPLEMENTATION_SUMMARY.md)** - What was built
- **[TYPESCRIPT_MIGRATION.md](./docs/TYPESCRIPT_MIGRATION.md)** - TypeScript conversion guide

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── admin/              # Admin dashboard
│   ├── login/              # Login page
│   └── components/         # React components
├── lib/
│   └── supabase/          # Supabase configuration
├── assets/                # Static assets
├── public/                # Public files
└── *.md                   # Documentation files
```

## 🎯 Using the Admin Dashboard

1. **Login**: Visit `/login` with your credentials
2. **Manage Projects**: Add, edit, or delete portfolio projects
3. **Manage Services**: Update your services section
4. **Upload Images**: Direct upload to Supabase Storage
5. **Reorder Items**: Use the order field to control display order

Changes appear instantly on your public portfolio!

## 🔐 Security

- Environment variables for sensitive data
- Row Level Security (RLS) on all tables
- Protected admin routes with middleware
- JWT-based authentication
- Secure image storage

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production

Add these in your hosting platform:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

## 🧪 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 📝 License

This project is open source and available for personal and commercial use.

## 🙋 Support

Having issues? Check these resources:

1. Read [TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md)
2. Review [ADMIN_SETUP.md](./docs/ADMIN_SETUP.md)
3. Check [Supabase Documentation](https://supabase.com/docs)
4. Check [Next.js Documentation](https://nextjs.org/docs)

## 🎉 Credits

Built with ❤️ using modern web technologies.

---

**Ready to manage your portfolio without touching code!** 🚀
