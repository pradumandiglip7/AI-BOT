# 🔌 Authentication API Reference

Quick reference for all authentication endpoints and utilities.

---

## 🌐 API Endpoints

### 1. Signup (POST `/api/auth/signup`)

**Description:** Register a new user account

**Request Body:**
```json
{
  "fullName": "string (required, max 100 chars)",
  "email": "string (required, valid email)",
  "password": "string (required, min 6 chars)",
  "confirmPassword": "string (required, must match password)"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Account created successfully",
  "data": {
    "user": {
      "id": "string",
      "fullName": "string",
      "email": "string",
      "role": "trader",
      "createdAt": "date"
    },
    "token": "JWT token string"
  }
}
```

**Error Responses:**
- `400` - Validation error
- `409` - Email already exists
- `500` - Server error

**Example:**
```typescript
const result = await authAPI.signup({
  fullName: "John Doe",
  email: "john@example.com",
  password: "password123",
  confirmPassword: "password123"
});
```

---

### 2. Login (POST `/api/auth/login`)

**Description:** Authenticate existing user

**Request Body:**
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "string",
      "fullName": "string",
      "email": "string",
      "role": "trader | admin",
      "createdAt": "date"
    },
    "token": "JWT token string"
  }
}
```

**Error Responses:**
- `400` - Missing credentials
- `401` - Invalid credentials
- `500` - Server error

**Example:**
```typescript
const result = await authAPI.login({
  email: "john@example.com",
  password: "password123"
});
```

---

### 3. Verify Token (GET `/api/auth/verify`)

**Description:** Verify JWT token and get user data

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "string",
      "fullName": "string",
      "email": "string",
      "role": "trader | admin",
      "createdAt": "date"
    }
  }
}
```

**Error Responses:**
- `401` - Invalid or expired token
- `404` - User not found
- `500` - Server error

**Example:**
```typescript
const result = await authAPI.verifyToken();
```

---

## 🎣 React Hooks

### useAuth()

**Description:** Authentication state and methods

**Returns:**
```typescript
{
  user: User | null,
  isAuthenticated: boolean,
  isLoading: boolean,
  login: (email: string, password: string) => Promise<Result>,
  signup: (data: SignupData) => Promise<Result>,
  logout: () => void,
  verifyToken: () => Promise<boolean>
}
```

**Example:**
```tsx
import { useAuth } from '@/lib/hooks/useAuth';

function MyComponent() {
  const { user, isAuthenticated, logout } = useAuth();
  
  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Welcome, {user?.fullName}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <p>Please login</p>
      )}
    </div>
  );
}
```

---

## 🛡️ Route Guards

### ProtectedRoute

**Description:** Requires authentication

**Props:**
- `children: ReactNode` - Content to protect
- `fallback?: ReactNode` - Show while redirecting
- `redirectTo?: string` - Where to redirect (default: '/login')

**Example:**
```tsx
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
```

---

### AdminRoute

**Description:** Requires admin role

**Props:**
- `children: ReactNode` - Content to protect
- `fallback?: ReactNode` - Show while redirecting
- `redirectTo?: string` - Where to redirect (default: '/dashboard')

**Example:**
```tsx
import { AdminRoute } from '@/components/auth/ProtectedRoute';

export default function AdminPage() {
  return (
    <AdminRoute>
      <AdminPanel />
    </AdminRoute>
  );
}
```

---

### GuestRoute

**Description:** Only for non-authenticated users

**Props:**
- `children: ReactNode` - Content to protect
- `fallback?: ReactNode` - Show while redirecting
- `redirectTo?: string` - Where to redirect (default: '/dashboard')

**Example:**
```tsx
import { GuestRoute } from '@/components/auth/ProtectedRoute';

export default function LoginPage() {
  return (
    <GuestRoute>
      <LoginForm />
    </GuestRoute>
  );
}
```

---

## 🔧 Utility Functions

### authUtils

**saveToken(token: string)**
```typescript
authUtils.saveToken(token);
```

**getToken(): string | null**
```typescript
const token = authUtils.getToken();
```

**removeToken()**
```typescript
authUtils.removeToken();
```

**saveUser(user: User)**
```typescript
authUtils.saveUser(user);
```

**getUser(): User | null**
```typescript
const user = authUtils.getUser();
```

**removeUser()**
```typescript
authUtils.removeUser();
```

**clearAuth()**
```typescript
authUtils.clearAuth(); // Removes token + user
```

**isAuthenticated(): boolean**
```typescript
if (authUtils.isAuthenticated()) {
  // User is logged in
}
```

**getAuthHeader(): HeadersInit**
```typescript
fetch('/api/protected', {
  headers: {
    'Content-Type': 'application/json',
    ...authUtils.getAuthHeader(),
  }
});
```

---

### JWT Utilities (Server-Side)

**generateToken(payload: JWTPayload): string**
```typescript
import { generateToken } from '@/lib/auth';

const token = generateToken({
  userId: user._id.toString(),
  email: user.email,
  role: user.role,
});
```

**verifyToken(token: string): JWTPayload | null**
```typescript
import { verifyToken } from '@/lib/auth';

const payload = verifyToken(token);
if (payload) {
  console.log(payload.userId, payload.email, payload.role);
}
```

**verifyAuthToken(request: NextRequest): JWTPayload | null**
```typescript
import { verifyAuthToken } from '@/lib/auth';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const payload = verifyAuthToken(request);
  
  if (!payload) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Use payload.userId
}
```

---

## 📦 TypeScript Types

### User
```typescript
interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'trader' | 'admin';
  createdAt: string;
}
```

### AuthResponse
```typescript
interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: User;
    token: string;
  };
}
```

### JWTPayload
```typescript
interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}
```

---

## 🔐 Security Headers

### Client-Side Requests
```typescript
fetch('/api/endpoint', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    ...authUtils.getAuthHeader(), // Adds: Authorization: Bearer <token>
  },
  body: JSON.stringify(data),
});
```

### Server-Side Verification
```typescript
import { verifyAuthToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const payload = verifyAuthToken(request);
  
  if (!payload) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  // Authenticated user: payload.userId
}
```

---

## 🌍 Environment Variables

**Required:**
```env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_key_here
```

**Optional:**
```env
NEXT_PUBLIC_API_URL=
```

---

## 📝 Common Patterns

### Login Flow
```typescript
const { login } = useAuth();
const router = useRouter();

async function handleLogin(email: string, password: string) {
  const result = await login(email, password);
  
  if (result.success) {
    router.push('/dashboard');
  } else {
    console.error(result.message);
  }
}
```

### Signup Flow
```typescript
const { signup } = useAuth();

async function handleSignup(data: SignupData) {
  const result = await signup(data);
  
  if (result.success) {
    router.push('/dashboard');
  } else {
    console.error(result.message);
  }
}
```

### Logout Flow
```typescript
const { logout } = useAuth();

function handleLogout() {
  logout(); // Clears localStorage and redirects to /login
}
```

### Check Authentication Status
```typescript
const { isAuthenticated, user } = useAuth();

if (isAuthenticated) {
  console.log('Logged in as:', user?.email);
} else {
  console.log('Not authenticated');
}
```

### Protected API Call
```typescript
import { authUtils } from '@/lib/api/auth';

async function fetchProtectedData() {
  try {
    const response = await fetch('/api/protected-endpoint', {
      headers: {
        'Content-Type': 'application/json',
        ...authUtils.getAuthHeader(),
      },
    });
    
    if (!response.ok) {
      throw new Error('Unauthorized');
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
  }
}
```

---

## 🔍 Error Codes

| Code | Meaning | Action |
|------|---------|--------|
| 200 | Success | Continue |
| 201 | Created | User registered |
| 400 | Bad Request | Check input validation |
| 401 | Unauthorized | Invalid credentials or token |
| 404 | Not Found | User doesn't exist |
| 409 | Conflict | Email already exists |
| 500 | Server Error | Check server logs |

---

## 🧪 Testing Examples

### Test Signup
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

### Test Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Test Token Verification
```bash
curl -X GET http://localhost:3000/api/auth/verify \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

**Last Updated:** January 2, 2026  
**Version:** 1.0.0
