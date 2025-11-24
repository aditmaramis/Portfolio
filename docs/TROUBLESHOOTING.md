# 🔧 Troubleshooting Guide

Common issues and their solutions.

## 🚨 Authentication Issues

### "Invalid API key" or "Failed to fetch"

**Symptoms:**

- Can't login
- Admin dashboard not loading
- Console shows API errors

**Solutions:**

1. ✅ Check `.env.local` has correct values:

   ```bash
   # Open .env.local and verify:
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
   ```

2. ✅ No extra spaces or quotes around values

3. ✅ Restart dev server:

   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

4. ✅ Hard refresh browser (Cmd+Shift+R or Ctrl+Shift+F5)

### "Invalid login credentials"

**Symptoms:**

- Login form says incorrect email/password
- You're sure credentials are correct

**Solutions:**

1. ✅ Check user exists in Supabase:

   - Go to Supabase Dashboard
   - Authentication → Users
   - Find your user

2. ✅ Check user is confirmed:

   - Should have green dot/checkmark
   - If not, click user → Send reset email

3. ✅ Try resetting password:

   - In Supabase, click user
   - Click "Reset Password"
   - Check email for reset link

4. ✅ Recreate user:
   - Delete old user
   - Create new user
   - **Important:** Check "Auto Confirm User"

### Infinite redirect loop (login → admin → login)

**Symptoms:**

- Can't access admin dashboard
- Keeps redirecting to login

**Solutions:**

1. ✅ Clear browser cookies:

   ```
   Chrome: Dev Tools → Application → Cookies → Delete all
   ```

2. ✅ Check middleware is correct:

   ```bash
   # Verify middleware.js exists in root
   ls middleware.js
   ```

3. ✅ Try incognito/private window

4. ✅ Check Supabase session:
   - Open browser console
   - Run: `localStorage.getItem('supabase.auth.token')`
   - Should return a token or null

## 🗄️ Database Issues

### "relation 'projects' does not exist"

**Symptoms:**

- Frontend shows no projects
- Console error about missing table
- Admin dashboard empty

**Solutions:**

1. ✅ Run SQL schema in Supabase:

   - Copy `supabase-schema.sql`
   - Paste in Supabase SQL Editor
   - Run entire script

2. ✅ Verify tables exist:

   - Go to Table Editor in Supabase
   - Should see: projects, services, settings

3. ✅ Check SQL ran without errors:
   - Look for error messages in SQL Editor
   - All lines should execute successfully

### "permission denied for table projects"

**Symptoms:**

- Can read but not write
- Admin can't add/edit projects

**Solutions:**

1. ✅ Check RLS policies exist:

   - Table Editor → projects table → Policies tab
   - Should see read/write policies

2. ✅ Re-run RLS section of SQL:

   ```sql
   -- Run just the policy creation parts
   CREATE POLICY "Allow authenticated insert on projects"...
   ```

3. ✅ Verify user is authenticated:
   - Open browser console
   - Check for valid session

### Data not updating on frontend

**Symptoms:**

- Added project in admin
- Homepage doesn't show it

**Solutions:**

1. ✅ Hard refresh homepage (Cmd+Shift+R)

2. ✅ Check data exists in Supabase:

   - Table Editor → projects
   - Verify row is there

3. ✅ Check browser console for fetch errors

4. ✅ Verify component is using Supabase:
   ```javascript
   // Work.jsx should have:
   import { createClient } from '@/lib/supabase/client';
   ```

## 📁 Storage/Upload Issues

### "Storage bucket not found"

**Symptoms:**

- Can't upload images
- Error about missing bucket

**Solutions:**

1. ✅ Check bucket exists:

   - Supabase → Storage
   - Should see `portfolio-images`

2. ✅ Re-run storage bucket SQL:

   ```sql
   INSERT INTO storage.buckets (id, name, public)
   VALUES ('portfolio-images', 'portfolio-images', true);
   ```

3. ✅ Check bucket is public:
   - Storage → portfolio-images → Settings
   - "Public" should be enabled

### Images not displaying

**Symptoms:**

- Uploaded successfully
- But image broken on frontend

**Solutions:**

1. ✅ Check image URL in database:

   - Table Editor → projects
   - `bg_image` should start with `https://`

2. ✅ Test URL directly:

   - Copy URL from database
   - Paste in browser
   - Should show image

3. ✅ Check storage policies:
   - Storage → Policies
   - Public read access should exist

### Upload fails/timeout

**Symptoms:**

- Stuck on "Uploading..."
- Error after long wait

**Solutions:**

1. ✅ Check file size:

   - Free tier: 50MB limit per file
   - Compress large images

2. ✅ Check file format:

   - Supported: jpg, png, webp, gif
   - Try converting to jpg

3. ✅ Check network connection:
   - Slow internet can timeout
   - Try smaller file first

## 🎨 UI/Display Issues

### Admin dashboard shows but no styling

**Symptoms:**

- Plain HTML, no colors/layout
- Everything in a vertical list

**Solutions:**

1. ✅ Check Tailwind is working:

   ```bash
   # Restart dev server
   npm run dev
   ```

2. ✅ Check for build errors in terminal

3. ✅ Clear Next.js cache:
   ```bash
   rm -rf .next
   npm run dev
   ```

### Dark mode not working

**Symptoms:**

- Admin dashboard always light/dark

**Solutions:**

1. ✅ Check main page dark mode toggle still works

2. ✅ Admin uses system theme by default

3. ✅ Add dark mode class to html:
   ```javascript
   // In browser console:
   document.documentElement.classList.add('dark');
   ```

### Projects/Services not showing in grid

**Symptoms:**

- Admin shows them
- Homepage doesn't

**Solutions:**

1. ✅ Check browser console for errors

2. ✅ Verify data structure matches:

   - Database field names
   - Component expects `bg_image` not `bgImage`

3. ✅ Check empty array:
   ```javascript
   // Add temporary console.log in Work.jsx:
   console.log('Projects:', projects);
   ```

## 🔥 Common Errors

### Error: "Hydration failed"

**Cause:** Server/client mismatch

**Solution:**

```bash
# Clear cache and restart
rm -rf .next
npm run dev
```

### Error: "Missing dependencies in useEffect"

**This is normal** - The linter warnings are handled correctly in the code.

### Error: "Invalid hook call"

**Cause:** React version mismatch

**Solution:**

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Error: "Module not found: @supabase"

**Cause:** Package not installed

**Solution:**

```bash
npm install @supabase/supabase-js @supabase/ssr
```

## 🐛 Debugging Tips

### Enable Supabase Logging

In browser console:

```javascript
localStorage.setItem('supabase.auth.debug', 'true');
```

Then check console for detailed auth logs.

### Check Supabase Logs

In Supabase Dashboard:

- Logs & Reports → Logs
- Filter by time/error type
- See actual database queries

### Network Tab Debugging

1. Open Dev Tools (F12)
2. Network tab
3. Reproduce issue
4. Look for failed requests (red)
5. Click request → Response tab

### Test Supabase Connection

Create test file `test-supabase.js`:

```javascript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('your-url', 'your-anon-key');

const test = async () => {
	const { data, error } = await supabase.from('projects').select('*');

	console.log('Data:', data);
	console.log('Error:', error);
};

test();
```

Run with: `node test-supabase.js`

## 🆘 Still Stuck?

### 1. Check Status Pages

- Supabase: https://status.supabase.com
- Vercel: https://www.vercel-status.com

### 2. Review Logs

- Browser Console (F12)
- Terminal where `npm run dev` is running
- Supabase Dashboard → Logs

### 3. Verify Environment

```bash
# Check Node version (should be 18+)
node --version

# Check npm version
npm --version

# Check environment variables loaded
npm run dev
# Look for [env] logs
```

### 4. Clean Install

```bash
# Nuclear option - start fresh
rm -rf node_modules package-lock.json .next
npm install
npm run dev
```

### 5. Check Documentation

- `ADMIN_SETUP.md` - Setup guide
- `ADMIN_QUICK_REFERENCE.md` - Quick reference
- `ARCHITECTURE.md` - How it works
- Supabase Docs: https://supabase.com/docs

### 6. Compare with Working State

Check if files match expected structure:

```bash
# Should exist:
ls lib/supabase/client.js
ls lib/supabase/server.js
ls lib/supabase/middleware.js
ls middleware.js
ls app/admin/page.js
ls app/login/page.js
ls .env.local
```

## 📞 Get Help

### Supabase Support

- Docs: https://supabase.com/docs
- Discord: https://discord.supabase.com
- GitHub: https://github.com/supabase/supabase

### Next.js Support

- Docs: https://nextjs.org/docs
- Discord: https://nextjs.org/discord
- GitHub: https://github.com/vercel/next.js

---

## 🎯 Prevention Tips

To avoid issues in the future:

1. ✅ Keep `.env.local` values safe
2. ✅ Regularly export database backups from Supabase
3. ✅ Test in incognito before deploying
4. ✅ Keep dependencies updated
5. ✅ Monitor Supabase usage/quotas
6. ✅ Use version control (git)
7. ✅ Test changes locally before pushing
8. ✅ Keep admin password secure

---

**Most issues are solved by:**

1. Restarting dev server
2. Hard refresh browser
3. Checking `.env.local`
4. Verifying SQL ran completely
