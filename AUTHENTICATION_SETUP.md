# Authentication Implementation - Setup Guide

## ✅ What Was Implemented

### Backend (Next.js API Routes)
- ✅ MongoDB connection with Mongoose (`lib/db.ts`)
- ✅ User model with password hashing (`models/User.ts`)
- ✅ JWT authentication utilities (`lib/auth.ts`)
- ✅ Signup API endpoint (`app/api/auth/signup/route.ts`)
- ✅ Login API endpoint (`app/api/auth/login/route.ts`)
- ✅ Token verification endpoint (`app/api/auth/verify/route.ts`)

### Frontend
- ✅ Authentication API client (`lib/api/auth.ts`)
- ✅ Updated Signup page with form handling and validation
- ✅ Updated Login page with form handling and validation
- ✅ Error and success message displays
- ✅ Loading states and disabled inputs during submission
- ✅ Automatic redirect to dashboard on success

### Security Features
- ✅ Bcrypt password hashing (10 salt rounds)
- ✅ JWT tokens with 7-day expiration
- ✅ Email uniqueness validation
- ✅ Password strength validation (minimum 6 characters)
- ✅ Secure token storage in localStorage
- ✅ Authorization header middleware

## 📋 Setup Instructions

### 1. MongoDB Atlas Setup

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up or log in

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose FREE tier (M0)
   - Select your preferred region
   - Click "Create Cluster"

3. **Create Database User**
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Set username and password (save these!)
   - Set privileges to "Read and write to any database"
   - Click "Add User"

4. **Configure Network Access**
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"
   - ⚠️ **For production**: Use specific IP addresses instead

5. **Get Connection String**
   - Go to "Database" in left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<database>` with your database name (e.g., `aibot`)

   Example:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/aibot?retryWrites=true&w=majority
   ```

### 2. Environment Variables Setup

1. **Copy the example file:**
   ```bash
   cp .env.example .env.local
   ```

2. **Generate JWT Secret:**
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

3. **Edit `.env.local`** with your values:
   ```env
   MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/aibot?retryWrites=true&w=majority
   JWT_SECRET=your_generated_jwt_secret_from_step_2
   NEXT_PUBLIC_API_URL=
   ```

   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: The generated secret from step 2
   - `NEXT_PUBLIC_API_URL`: Leave empty (uses same domain)

### 3. Run the Application

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open browser:**
   ```
   http://localhost:3000
   ```

## 🧪 Testing Authentication

### Test Signup Flow

1. Navigate to [http://localhost:3000/signup](http://localhost:3000/signup)
2. Fill in the form:
   - Full Name: `John Doe`
   - Email: `john@example.com`
   - Password: `password123`
   - Confirm Password: `password123`
3. Check "I agree to the Terms of Service"
4. Click "Create Account"
5. You should see success message and redirect to dashboard

### Test Login Flow

1. Navigate to [http://localhost:3000/login](http://localhost:3000/login)
2. Enter credentials:
   - Email: `john@example.com`
   - Password: `password123`
3. Click "Sign In"
4. You should see success message and redirect to dashboard

### Verify Database

1. Go to MongoDB Atlas dashboard
2. Click "Browse Collections" on your cluster
3. You should see:
   - Database: `aibot` (or your chosen name)
   - Collection: `users`
   - Document with your user data

### Test API Endpoints (Optional)

Using curl or Postman:

**Signup:**
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Jane Doe",
    "email": "jane@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@example.com",
    "password": "password123"
  }'
```

**Verify Token:**
```bash
curl -X GET http://localhost:3000/api/auth/verify \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 🚀 Vercel Deployment

### 1. Push to GitHub

```bash
git add .
git commit -m "Add MongoDB authentication"
git push origin main
```

### 2. Deploy to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Import Project"
3. Select your GitHub repository
4. Click "Deploy"

### 3. Add Environment Variables

1. In Vercel dashboard, go to your project
2. Go to "Settings" → "Environment Variables"
3. Add these variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Your JWT secret key
   - `NEXT_PUBLIC_API_URL`: Leave empty or set your domain

4. Redeploy the project for changes to take effect

## 📁 File Structure

```
AI BOT/
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── signup/
│   │       │   └── route.ts          # Signup endpoint
│   │       ├── login/
│   │       │   └── route.ts          # Login endpoint
│   │       └── verify/
│   │           └── route.ts          # Token verification endpoint
│   ├── login/
│   │   └── page.tsx                  # Login page (updated)
│   └── signup/
│       └── page.tsx                  # Signup page (updated)
├── lib/
│   ├── api/
│   │   └── auth.ts                   # Frontend API client
│   ├── auth.ts                       # JWT utilities
│   └── db.ts                         # MongoDB connection
├── models/
│   └── User.ts                       # User model
├── .env.example                      # Environment template
├── .env.local                        # Your actual env vars (git ignored)
└── .gitignore                        # Updated with env files
```

## 🔐 Security Best Practices

### For Production:

1. **Use strong JWT secrets**
   - Minimum 32 characters
   - Use cryptographically secure random strings

2. **MongoDB Security**
   - Use specific IP whitelisting (not 0.0.0.0/0)
   - Use strong database passwords
   - Enable MongoDB Atlas encryption

3. **HTTPS Only**
   - Vercel provides HTTPS automatically
   - Never use HTTP in production

4. **Environment Variables**
   - Never commit `.env.local` to git
   - Use different secrets for dev/staging/production

5. **Password Policy**
   - Current: minimum 6 characters
   - Consider: uppercase, lowercase, numbers, special chars

## 🔄 Future Enhancements

Ready for you to add:

- ✨ Email verification
- ✨ Forgot password flow
- ✨ Refresh token rotation
- ✨ OAuth (Google, GitHub)
- ✨ Protected routes middleware
- ✨ Role-based access control (RBAC)
- ✨ Session management
- ✨ Account settings page
- ✨ Password change functionality

## 🐛 Troubleshooting

### "Please define the MONGODB_URI environment variable"
- Ensure `.env.local` exists in project root
- Check variable name is exactly `MONGODB_URI`
- Restart development server after adding env vars

### "Invalid or expired token"
- Token might have expired (7 days)
- Clear localStorage and login again
- Check JWT_SECRET is set correctly

### "User with this email already exists"
- Email is already registered
- Use a different email or login with existing credentials

### Connection timeout to MongoDB
- Check your internet connection
- Verify MongoDB Atlas IP whitelist includes your IP
- Ensure connection string is correct

### Module not found errors
- Run `npm install` to ensure all dependencies are installed
- Delete `node_modules` and run `npm install` again

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Check terminal for server errors
3. Verify all environment variables are set
4. Ensure MongoDB Atlas cluster is running
5. Check MongoDB Atlas IP whitelist

---

**Implementation Complete!** ✅

Your authentication system is now ready for testing and deployment.
