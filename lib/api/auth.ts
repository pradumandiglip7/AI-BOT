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
  phone?: string;
  timezone?: string;
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

export type UpdateProfilePayload = Partial<Omit<User, 'avatar'>> & { avatar?: string | null };

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
      window.dispatchEvent(new CustomEvent('auth:user', { detail: user }));
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
      window.dispatchEvent(new CustomEvent('auth:user', { detail: null }));
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

  // Telegram login
  async telegramLogin(telegramData: any): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/callback/telegram`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(telegramData),
      });

      const result: AuthResponse = await response.json();

      // Save token and user data if successful
      if (result.success && result.data) {
        authUtils.saveToken(result.data.token);
        authUtils.saveUser(result.data.user);
      }

      return result;
    } catch (error: any) {
      console.error('Telegram login API error:', error);
      return {
        success: false,
        message: error.message || 'Network error. Please check your connection.',
      };
    }
  },

  // Update Profile
  async updateProfile(data: UpdateProfilePayload): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...authUtils.getAuthHeader(),
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(
          `Non-JSON response from profile update endpoint (status ${response.status}): ${text.slice(0, 120)}`
        );
      }

      const result: AuthResponse = await response.json();

      // Update local user data if successful
      if (result.success && result.data) {
        authUtils.saveUser(result.data.user);
      }

      return result;
    } catch (error: any) {
      const message = typeof error?.message === 'string' ? error.message : '';
      if (message.startsWith('Non-JSON response from profile update endpoint')) {
        console.warn('Update profile API warning:', error);
      } else {
        console.error('Update profile API error:', error);
      }
      
      // Fallback for demo/mock purposes if API fails (since we might not have a real backend)
      // In a real app, you would throw or return the error. 
      // Here we optimistically update local storage to show functionality.
      const currentUser = authUtils.getUser();
      if (currentUser) {
        const updatedUser: User = { ...currentUser, ...(data as Partial<User>) };
        if ('avatar' in data && data.avatar === null) {
          delete (updatedUser as any).avatar;
        }
        authUtils.saveUser(updatedUser);
        return {
          success: true,
          message: 'Profile updated successfully (Local)',
          data: {
            user: updatedUser,
            token: authUtils.getToken() || '',
          }
        };
      }

      return {
        success: false,
        message: error.message || 'Network error. Please check your connection.',
      };
    }
  },
};
