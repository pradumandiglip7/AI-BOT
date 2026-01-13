"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { authUtils } from "@/lib/api/auth";
import { User as UserType } from "@/lib/api/auth";

interface RecentRegistration {
  id: string;
  fullName: string;
  email: string;
  role: string;
  avatar?: string;
  isVerified?: boolean;
  lastLoginAt?: string;
  createdAt: string;
}

export const RecentRegistrations = () => {
  const [registrations, setRegistrations] = useState<RecentRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentRegistrations = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/admin/users', {
          method: 'GET',
          headers: {
            ...authUtils.getAuthHeader(),
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Unauthorized. Please log in as an admin.');
          } else if (response.status === 403) {
            throw new Error('Access denied. Admin role required.');
          } else {
            throw new Error('Failed to fetch users');
          }
        }

        const data = await response.json();
        
        if (data.success && data.data && data.data.users) {
          // Sort users by creation date (newest first) and take the 5 most recent
          const sortedUsers = data.data.users
            .sort((a: UserType, b: UserType) => 
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
            .slice(0, 5)
            .map((user: UserType) => ({
              id: user.id.toString(),
              fullName: user.fullName,
              email: user.email,
              role: user.role,
              avatar: user.avatar,
              isVerified: user.isVerified,
              lastLoginAt: user.lastLoginAt,
              createdAt: new Date(user.createdAt).toISOString(),
            }));
          
          setRegistrations(sortedUsers);
        } else {
          setError('Invalid response format');
        }
      } catch (err: any) {
        console.error('Error fetching recent registrations:', err);
        setError(err.message || 'An error occurred while fetching recent registrations');
      } finally {
        setLoading(false);
      }
    };

    fetchRecentRegistrations();
  }, []);

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-white">Recent Registrations</h2>
          <div className="w-20 h-8 bg-gray-700/50 rounded-lg animate-pulse"></div>
        </div>
        <div className="space-y-3">
          {[...Array(3)].map((_, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * idx }}
              className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-3 sm:p-4"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-700/50 animate-pulse flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <div className="h-4 bg-gray-700/50 rounded mb-2 animate-pulse w-3/4"></div>
                  <div className="h-3 bg-gray-700/50 rounded animate-pulse w-1/2"></div>
                </div>
                <div className="w-16 h-6 bg-gray-700/50 rounded-full animate-pulse"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6"
      >
        <h2 className="text-lg sm:text-xl font-bold text-white mb-6">Recent Registrations</h2>
        <div className="text-red-400 text-center py-4">{error}</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-white">Recent Registrations</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-accent/20 hover:bg-accent/30 border border-accent/50 rounded-lg text-sm font-semibold text-accent transition-all duration-300 whitespace-nowrap"
        >
          View All
        </motion.button>
      </div>

      {registrations.length === 0 ? (
        <div className="text-gray-400 text-center py-4">No recent registrations</div>
      ) : (
        <div className="space-y-3">
          {registrations.map((user, idx) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * idx }}
              whileHover={{ x: 4 }}
              className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-3 sm:p-4 hover:border-accent/50 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                  <img
                    src={user.avatar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop"}
                    alt={user.fullName}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-primary/50 flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base sm:text-lg font-bold text-white truncate">{user.fullName}</h3>
                    <p className="text-xs sm:text-sm text-gray-400 truncate">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="text-left sm:text-right">
                    <p className="text-xs sm:text-sm font-semibold text-white">{user.role}</p>
                    <p className="text-xs text-gray-400">{formatRelativeTime(user.createdAt)}</p>
                  </div>
                  <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-bold bg-accent/20 text-accent border border-accent/50 whitespace-nowrap">
                    {user.isVerified ? 'verified' : 'pending'}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};