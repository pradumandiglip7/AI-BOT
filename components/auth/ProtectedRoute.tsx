"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authUtils } from '@/lib/api/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
}

/**
 * Protected Route Component
 * Wraps components that require authentication
 * Redirects to login if user is not authenticated
 * 
 * @example
 * ```tsx
 * <ProtectedRoute>
 *   <Dashboard />
 * </ProtectedRoute>
 * ```
 * 
 * @example With custom redirect
 * ```tsx
 * <ProtectedRoute redirectTo="/signin">
 *   <SettingsPage />
 * </ProtectedRoute>
 * ```
 */
export function ProtectedRoute({
  children,
  fallback = null,
  redirectTo = '/login',
}: ProtectedRouteProps) {
  const router = useRouter();
  const isAuthenticated = authUtils.isAuthenticated();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, router, redirectTo]);

  if (!isAuthenticated) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

/**
 * Admin Route Component
 * Wraps components that require admin role
 * Redirects to dashboard if user is not admin
 * 
 * @example
 * ```tsx
 * <AdminRoute>
 *   <AdminPanel />
 * </AdminRoute>
 * ```
 */
export function AdminRoute({
  children,
  fallback = null,
  redirectTo = '/dashboard',
}: ProtectedRouteProps) {
  const router = useRouter();
  const user = authUtils.getUser();
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    if (!user || !isAdmin) {
      router.push(redirectTo);
    }
  }, [user, isAdmin, router, redirectTo]);

  if (!user || !isAdmin) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

/**
 * Guest Route Component
 * Wraps components that should only be accessible to non-authenticated users
 * Redirects to dashboard if user is authenticated
 * 
 * @example
 * ```tsx
 * <GuestRoute>
 *   <LoginPage />
 * </GuestRoute>
 * ```
 */
export function GuestRoute({
  children,
  fallback = null,
  redirectTo = '/dashboard',
}: ProtectedRouteProps) {
  const router = useRouter();
  const isAuthenticated = authUtils.isAuthenticated();

  useEffect(() => {
    if (isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, router, redirectTo]);

  if (isAuthenticated) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
