# ✅ Supabase Setup Checklist

Print this or keep it open while setting up!

## Part 1: Supabase Account & Project

- [ ] Go to https://supabase.com
- [ ] Create account (or login)
- [ ] Click "New Project"
- [ ] Enter project details:
  - [ ] Name: `portfolio` (or your choice)
  - [ ] Database Password: ********\_******** (save this!)
  - [ ] Region: ********\_******** (choose closest)
- [ ] Wait ~2 minutes for project to initialize
- [ ] See green "Active" status

## Part 2: Get API Keys

- [ ] In Supabase, go to Settings (⚙️ icon on left)
- [ ] Click "API" in settings menu
- [ ] Copy **Project URL**: ****************\_****************
- [ ] Copy **anon/public key**: ****************\_****************
- [ ] Copy **service_role key**: ****************\_****************

## Part 3: Update .env.local

- [ ] Open `.env.local` in your project
- [ ] Replace `your_supabase_url_here` with Project URL
- [ ] Replace `your_supabase_anon_key_here` with anon key
- [ ] Replace `your_service_role_key_here` with service_role key
- [ ] Save file
- [ ] **IMPORTANT**: Restart your dev server!

## Part 4: Run Database Setup

- [ ] In Supabase, click SQL Editor (left sidebar)
- [ ] Click "New Query" button
- [ ] Open `supabase-schema.sql` from your project
- [ ] Copy ALL the SQL code
- [ ] Paste into Supabase SQL Editor
- [ ] Click "Run" button (or Cmd/Ctrl + Enter)
- [ ] See "Success. No rows returned" message
- [ ] Verify tables exist:
  - [ ] Go to Table Editor
  - [ ] See `projects` table
  - [ ] See `services` table
  - [ ] See `settings` table

## Part 5: Verify Storage Bucket

- [ ] In Supabase, go to Storage (left sidebar)
- [ ] See `portfolio-images` bucket
- [ ] It should show as "Public"

## Part 6: Create Admin User

- [ ] In Supabase, go to Authentication (left sidebar)
- [ ] Click "Add User" button
- [ ] Select "Create new user"
- [ ] Enter your admin email: ****************\_****************
- [ ] Enter a strong password: ****************\_****************
- [ ] **CHECK** "Auto Confirm User" checkbox ⚠️ IMPORTANT!
- [ ] Click "Create User"
- [ ] See user in list with green dot (confirmed)

## Part 7: Test Everything

- [ ] In terminal, run: `npm run dev`
- [ ] Open browser to: http://localhost:3000
- [ ] Portfolio homepage loads correctly
- [ ] Go to: http://localhost:3000/login
- [ ] Login with admin credentials
- [ ] Redirected to: http://localhost:3000/admin
- [ ] See admin dashboard
- [ ] See "Projects" and "Services" tabs

## Part 8: Test Projects Manager

- [ ] Click "Projects" tab
- [ ] See existing projects (4 initial ones)
- [ ] Click "+ Add Project" button
- [ ] Form appears
- [ ] Fill in test project:
  - [ ] Title: Test Project
  - [ ] Description: Test Description
  - [ ] Upload an image (any image)
  - [ ] Link: https://example.com (optional)
  - [ ] Order: 99
- [ ] Click "Save"
- [ ] See new project in grid
- [ ] Click "Edit" on test project
- [ ] Change title
- [ ] Click "Save"
- [ ] See updated title
- [ ] Click "Delete" on test project
- [ ] Confirm deletion
- [ ] Test project removed

## Part 9: Test Services Manager

- [ ] Click "Services" tab
- [ ] See existing services (3 initial ones)
- [ ] Click "+ Add Service"
- [ ] Fill in test service:
  - [ ] Title: Test Service
  - [ ] Description: Test Description
  - [ ] Icon: 🧪 (or any emoji)
  - [ ] Order: 99
- [ ] Click "Save"
- [ ] See new service
- [ ] Edit and delete work correctly

## Part 10: Verify Frontend Updates

- [ ] Go back to homepage: http://localhost:3000
- [ ] Scroll to "what i did.." section (Work)
- [ ] See projects from Supabase (not hardcoded)
- [ ] Scroll to "what i do.." section (Services)
- [ ] See services from Supabase (not hardcoded)
- [ ] Add a new project in admin
- [ ] Refresh homepage
- [ ] See new project appears

## Part 11: Test Logout

- [ ] Click "Logout" in admin dashboard
- [ ] Redirected to homepage
- [ ] Try to go to: http://localhost:3000/admin
- [ ] Should redirect to login page
- [ ] Login works again

## 🎉 Complete!

If all checkboxes are checked, your admin system is fully working!

## 🐛 If Something Failed

### Error: "Invalid API key"

- [ ] Check `.env.local` has correct values
- [ ] No extra spaces in keys
- [ ] Restart dev server

### Error: "relation does not exist"

- [ ] SQL schema ran completely
- [ ] Check Supabase SQL Editor for errors
- [ ] All tables created (use Table Editor to verify)

### Error: "Storage bucket not found"

- [ ] SQL for storage bucket ran
- [ ] Check Storage section in Supabase
- [ ] Bucket is public

### Login doesn't work

- [ ] User exists in Authentication
- [ ] User is "Confirmed" (green dot)
- [ ] "Auto Confirm User" was checked
- [ ] Email/password are correct
- [ ] Check browser console for errors

### Images not uploading

- [ ] Storage bucket exists
- [ ] Storage policies created (from SQL)
- [ ] File is valid image format
- [ ] File size < 50MB

## 📞 Still Stuck?

1. Check browser console (F12) for errors
2. Check terminal for server errors
3. Check Supabase logs (Logs section in dashboard)
4. Read `ADMIN_SETUP.md` for detailed explanations
5. Check Supabase documentation

---

**Save this checklist for future reference!**
