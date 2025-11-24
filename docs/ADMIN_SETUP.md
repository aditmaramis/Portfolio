# Supabase Admin Setup Guide

## 🎉 What's Been Added

Your portfolio now has a complete admin dashboard that lets you manage projects and services without touching code!

### Features:

- ✅ Secure authentication with email/password
- ✅ Admin dashboard at `/admin`
- ✅ Add, edit, and delete projects
- ✅ Add, edit, and delete services
- ✅ Image upload to Supabase Storage
- ✅ Real-time updates on your portfolio
- ✅ Mobile responsive admin UI

## 📋 Setup Instructions

### Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - Name: `portfolio` (or your choice)
   - Database Password: (save this!)
   - Region: Choose closest to you
5. Wait for project to initialize (~2 minutes)

### Step 2: Get Your API Keys

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these values:

   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (looks like: `eyJhbGc...`)
   - **service_role key** (looks like: `eyJhbGc...`)

3. Open `.env.local` in your project
4. Replace the placeholder values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### Step 3: Set Up Database Tables

1. In Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Open the file `supabase-schema.sql` in your project
4. Copy ALL the SQL code
5. Paste it into the Supabase SQL Editor
6. Click **Run** (or press Cmd/Ctrl + Enter)

This creates:

- `projects` table
- `services` table
- `settings` table
- Storage bucket for images
- Security policies (Row Level Security)
- Initial data from your current portfolio

### Step 4: Create Admin User

1. In Supabase dashboard, go to **Authentication** → **Users**
2. Click **Add User** → **Create new user**
3. Enter:
   - Email: your admin email
   - Password: strong password
   - **Check** "Auto Confirm User"
4. Click **Create User**

### Step 5: Test Your Admin Dashboard

1. Start your development server:

```bash
npm run dev
```

2. Go to [http://localhost:3000/login](http://localhost:3000/login)
3. Log in with the credentials you created
4. You should see the admin dashboard!

## 🚀 Using the Admin Dashboard

### Managing Projects

1. Go to `/admin` after logging in
2. Click **Projects** tab
3. Click **+ Add Project** to create new work
4. Fill in:
   - Title
   - Description
   - Upload background image
   - Optional link
   - Order (for display order)
5. Click **Save**

### Managing Services

1. Click **Services** tab
2. Click **+ Add Service**
3. Fill in:
   - Title
   - Description
   - Icon (emoji like 🌐 or text)
   - Optional link
   - Order
4. Click **Save**

### Editing & Deleting

- Click **Edit** to modify existing items
- Click **Delete** to remove (will ask for confirmation)

## 🔒 Security Notes

- Never commit `.env.local` to git (it's already in `.gitignore`)
- The admin routes are protected - only logged-in users can access
- All Supabase data has Row Level Security enabled
- Public users can only READ data
- Only authenticated users can CREATE, UPDATE, DELETE

## 🎨 Customization

### Change Admin Email Later

In Supabase dashboard:

1. Go to **Authentication** → **Users**
2. Find your user
3. Click to edit email or password

### Add More Admins

Just create additional users in Supabase Authentication panel.

## 🐛 Troubleshooting

### "Invalid API key"

- Check `.env.local` has correct keys
- Restart dev server after changing `.env.local`

### "Relation 'projects' does not exist"

- Run the SQL schema in Supabase SQL Editor
- Make sure all queries ran successfully

### "Authentication failed"

- Check user exists in Supabase Authentication
- Make sure "Auto Confirm User" was checked
- Verify email/password are correct

### Images not uploading

- Check storage bucket `portfolio-images` exists
- Verify storage policies were created from SQL
- Check file size (Supabase free tier: 1GB storage)

## 📱 Production Deployment

When deploying to Vercel/Netlify:

1. Add environment variables in your hosting dashboard:

   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

2. Make sure your Supabase project is on a paid plan if you need higher limits

## 🎯 Next Steps

- Customize the admin dashboard styling
- Add more fields to projects (tags, tech stack, etc.)
- Add an "About Me" editor to the admin
- Add analytics to track portfolio views
- Set up email notifications when contact form is submitted

## 📞 Need Help?

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)

---

**Your admin dashboard is ready! 🎉**

Access it at: `http://localhost:3000/admin`
