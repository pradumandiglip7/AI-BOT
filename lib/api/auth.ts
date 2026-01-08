// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Types
export interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'trader' | 'admin';
  avatar?: string;
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: User;
    token: string;
  };
}

export interface VerifyResponse {
  success: boolean;
  message?: string;
  data?: {
    user: User;
  };
}

// Auth utilities
export const authUtils = {
  // Save token to localStorage
  saveToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
  },

  // Get token from localStorage
  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  },

  // Remove token from localStorage
  removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  },

  // Save user data to localStorage
  saveUser(user: User): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
  },

  // Get user data from localStorage
  getUser(): User | null {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  },

  // Remove user data from localStorage
  removeUser(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
  },

  // Clear all auth data
  clearAuth(): void {
    this.removeToken();
    this.removeUser();
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  // Get authorization header
  getAuthHeader(): HeadersInit {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
};

// API functions
export const authAPI = {
  // Signup
  async signup(data: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result: AuthResponse = await response.json();

      // Server sets HttpOnly cookie; only save user data client-side
      if (result.success && result.data) {
        authUtils.removeToken();
        authUtils.saveUser(result.data.user);
      }

      return result;
    } catch (error: any) {
      console.error('Signup API error:', error);
      return {
        success: false,
        message: error.message || 'Network error. Please check your connection.',
      };
    }
  },

  // Login
  async login(data: { email: string; password: string }): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result: AuthResponse = await response.json();

      // Server sets HttpOnly cookie; only save user data client-side
      if (result.success && result.data) {
        authUtils.removeToken();
        authUtils.saveUser(result.data.user);
      }

      return result;
    } catch (error: any) {
      console.error('Login API error:', error);
      return {
        success: false,
        message: error.message || 'Network error. Please check your connection.',
      };
    }
  },

  // Verify token
  async verifyToken(): Promise<VerifyResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...authUtils.getAuthHeader(),
        },
        credentials: 'include', // ensure cookies are sent
      });

      const result: VerifyResponse = await response.json();

      // Update user data if successful
      if (result.success && result.data) {
        authUtils.saveUser(result.data.user);
      } else {
        // Clear auth data if token is invalid
        authUtils.clearAuth();
      }

      return result;
    } catch (error: any) {
      console.error('Verify token API error:', error);
      authUtils.clearAuth();
      return {
        success: false,
        message: error.message || 'Network error. Please check your connection.',
      };
    }
  },

  // Logout
  async logout(): Promise<void> {
    try {
      await fetch(`${API_BASE_URL}/api/auth/logout`, { method: 'POST', credentials: 'include' });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      authUtils.clearAuth();
    }
  },

  // Google OAuth redirect
  redirectToGoogleOAuth(): void {
    window.location.href = '/api/auth/callback/google';
  },
};
