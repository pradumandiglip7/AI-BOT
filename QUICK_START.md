# 🚀 Quick Start Guide

## Prerequisites
- Node.js installed
- MongoDB Atlas account (free tier works)

## Setup Steps

### 1️⃣ MongoDB Atlas Setup (5 minutes)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create account
2. Create a FREE cluster (M0)
3. Create database user:
   - Username: `aibot_user`
   - Password: Create a strong password
4. Add IP to whitelist:
   - Click "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for testing)
5. Get connection string:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Example: `mongodb+srv://aibot_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/aibot?retryWrites=true&w=majority`

### 2️⃣ Configure Environment

Edit `.env.local` file and update:

```env
MONGODB_URI=mongodb+srv://aibot_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/aibot?retryWrites=true&w=majority
JWT_SECRET=dfe38ae2000923d4d508195c2836e71f440aaaf09630ee1f322603c67f5e6a84
NEXT_PUBLIC_API_URL=
```

**Replace:**
- `YOUR_PASSWORD` with your MongoDB user password
- `cluster0.xxxxx` with your actual cluster name

### 3️⃣ Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4️⃣ Test Authentication

**Signup:**
1. Go to [http://localhost:3000/signup](http://localhost:3000/signup)
2. Create an account with:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
3. Should redirect to dashboard on success

**Login:**
1. Go to [http://localhost:3000/login](http://localhost:3000/login)
2. Login with created credentials
3. Should redirect to dashboard on success

## ✅ Verification

Check MongoDB Atlas:
1. Click "Browse Collections" on your cluster
2. You should see `users` collection with your data
3. Password should be hashed (not plain text)

## 🎉 You're Done!

Your authentication system is now working. Check `AUTHENTICATION_SETUP.md` for detailed documentation.

## 📝 Next Steps

- Deploy to Vercel
- Add protected routes
- Implement role-based access
- Add email verification
- Add forgot password flow

---

**Need Help?** Check `AUTHENTICATION_SETUP.md` for troubleshooting.
