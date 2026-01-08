"use client";
import { useState, useEffect, useCallback } from 'react';
import { authAPI, authUtils, User } from '@/lib/api/auth';
import { useRouter } from 'next/navigation';

interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  signup: (data: { fullName: string; email: string; password: string; confirmPassword: string }) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  verifyToken: () => Promise<boolean>;
}

/**
 * Custom hook for authentication
 * Provides user state, authentication status, and auth methods
 * 
 * @example
 * ```tsx
 * const { user, isAuthenticated, login, logout } = useAuth();
 * 
 * if (isAuthenticated) {
 *   console.log('User:', user.fullName);
 * }
 * ```
 */
export function useAuth(): UseAuthReturn {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verify token
  const verifyToken = useCallback(async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      const result = await authAPI.verifyToken();
      if (result.success && result.data) {
        setUser(result.data.user);
        setIsLoading(false);
        return true;
      } else {
        setUser(null);
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      setUser(null);
      setIsLoading(false);
      return false;
    }
  }, []);

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedUser = authUtils.getUser();
    if (storedUser) {
      setUser(storedUser);
    }

    // Always verify token on mount (supports cookie-based auth like Google OAuth)
    // `verifyToken` will update `user` and `isLoading` appropriately
    verifyToken();
  }, [verifyToken]);

  // Login
  const login = useCallback(async (
    email: string,
    password: string
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const result = await authAPI.login({ email, password });
      if (result.success && result.data) {
        setUser(result.data.user);
        return { success: true, message: result.message };
      }
      return { success: false, message: result.message };
    } catch (error: any) {
      return { success: false, message: error.message || 'Login failed' };
    }
  }, []);

  // Signup
  const signup = useCallback(async (data: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }): Promise<{ success: boolean; message: string }> => {
    try {
      const result = await authAPI.signup(data);
      if (result.success && result.data) {
        setUser(result.data.user);
        return { success: true, message: result.message };
      }
      return { success: false, message: result.message };
    } catch (error: any) {
      return { success: false, message: error.message || 'Signup failed' };
    }
  }, []);

  // Logout
  const logout = useCallback(() => {
    authAPI.logout();
    setUser(null);
    router.push('/login');
  }, [router]);

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    verifyToken,
  };
}
