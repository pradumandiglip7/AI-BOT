"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "./sidebar";
import { TopNavbar } from "./top-navbar";
import { SidebarProvider } from "./sidebar-context";
import {
  LayoutDashboard,
  Users,
  Activity,
  Settings,
  DollarSign,
  UserPlus,
  UserMinus,
  Shield,
  Ban,
  CheckCircle,
  XCircle,
  TrendingUp,
  BarChart3,
  AlertTriangle,
  Search,
} from "lucide-react";
import { AdminAnalytics } from "./AdminAnalytics";
import { AdminRevenue } from "./AdminRevenue";
import { AdminActivityLogs } from "./AdminActivityLogs";
import { AdminSettings } from "./AdminSettings";
import { RecentRegistrations } from "./RecentRegistrations";
import { useAuth } from "@/lib/hooks/useAuth";
import { authUtils } from "@/lib/api/auth";

const adminMenuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "users", label: "User Management", icon: Users },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "revenue", label: "Revenue", icon: DollarSign },
  { id: "activity", label: "Activity Logs", icon: Activity },
  { id: "settings", label: "Settings", icon: Settings },
];

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { user } = useAuth();

  return (
    <SidebarProvider>
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        menuItems={adminMenuItems}
        userName={user?.fullName || "Admin User"}
        userRole={user?.role || "System Administrator"}
        userAvatar={user?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"}
      />
      <TopNavbar userName={user?.fullName || "Admin User"} notifications={12} />

      <div className="lg:ml-64 mt-16 lg:mt-20 p-4 sm:p-6">
        <AnimatePresence mode="wait">
          {activeTab === "dashboard" && <AdminDashboardTab key="dashboard" />}
          {activeTab === "users" && <UserManagementTab key="users" />}
          {activeTab === "analytics" && <AdminAnalyticsTab key="analytics" />}
          {activeTab === "revenue" && <RevenueTab key="revenue" />}
          {activeTab === "activity" && <ActivityLogsTab key="activity" />}
          {activeTab === "settings" && <AdminSettingsTab key="settings" />}
        </AnimatePresence>
      </div>
    </SidebarProvider>
  );
};

const AdminDashboardTab = () => {
  const [stats, setStats] = useState([
    {
      label: "Total Users",
      value: "...",
      change: "+0",
      trend: "up",
      icon: Users,
      color: "primary",
    },
    {
      label: "Active Users",
      value: "...",
      change: "+0",
      trend: "up",
      icon: Activity,
      color: "accent",
    },
    {
      label: "Total Revenue",
      value: "...",
      change: "+0",
      trend: "up",
      icon: DollarSign,
      color: "accent",
    },
    {
      label: "Premium Users",
      value: "...",
      change: "+0",
      trend: "up",
      icon: TrendingUp,
      color: "primary",
    },
  ]);
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/users', {
          method: 'GET',
          headers: {
            ...authUtils.getAuthHeader(),
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            console.error('Unauthorized. Please log in as an admin.');
          } else if (response.status === 403) {
            console.error('Access denied. Admin role required.');
          } else {
            console.error('Failed to fetch users');
          }
          return;
        }

        const data = await response.json();
        
        if (data.success && data.data && data.data.users) {
          const users = data.data.users;
          const totalUsers = users.length;
          
          // Calculate stats
          // Active users: users who have logged in within the last 24 hours
          const twentyFourHoursAgo = new Date();
          twentyFourHoursAgo.setDate(twentyFourHoursAgo.getDate() - 1);
          
          const activeUsers = users.filter((user: any) => {
            const lastLoginAt = user.lastLoginAt ? new Date(user.lastLoginAt) : new Date(user.createdAt);
            return lastLoginAt > twentyFourHoursAgo;
          }).length;
          
          // For revenue and premium users, we'll use placeholder values since these aren't in the user model
          // In a real application, you'd fetch these from other APIs
          const premiumUsers = users.filter((user: any) => user.role === 'premium' || user.subscription === 'premium').length;
          
          // Calculate recent changes (last 30 days)
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          
          const recentUsers = users.filter((user: any) => new Date(user.createdAt) > thirtyDaysAgo);
          
          // Calculate recently active users (logged in in the last 30 days)
          const recentlyActiveUsers = users.filter((user: any) => {
            const lastLoginAt = user.lastLoginAt ? new Date(user.lastLoginAt) : new Date(user.createdAt);
            return lastLoginAt > thirtyDaysAgo;
          });
          
          setStats([
            {
              label: "Total Users",
              value: totalUsers.toLocaleString(),
              change: `+${recentUsers.length}`,
              trend: "up",
              icon: Users,
              color: "primary",
            },
            {
              label: "Active Users",
              value: activeUsers.toLocaleString(),
              change: `+${recentlyActiveUsers.length}`, // Recently verified users
              trend: "up",
              icon: Activity,
              color: "accent",
            },
            {
              label: "Total Revenue",
              value: "$847,293", // Placeholder - would come from a billing/revenue API
              change: "+18.2%",
              trend: "up",
              icon: DollarSign,
              color: "accent",
            },
            {
              label: "Premium Users",
              value: premiumUsers.toLocaleString(),
              change: `+${Math.max(premiumUsers - 100, 0)}`, // Placeholder calculation
              trend: "up",
              icon: TrendingUp,
              color: "primary",
            },
          ]);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);



  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Admin Dashboard 🛡️
        </h1>
        <p className="text-sm sm:text-base text-gray-400">
          System overview and user management
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 hover:border-accent/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-${stat.color}/20 border border-${stat.color}/50 flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 text-${stat.color}`} />
                </div>
                <span className="flex items-center gap-1 text-sm font-semibold text-accent">
                  +{stat.change}
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      <RecentRegistrations />
    </motion.div>
  );
};

const UserManagementTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
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
          // Format the user data to match the expected structure
          const formattedUsers = data.data.users.map((user: any) => ({
            id: user.id || user._id,
            name: user.fullName || user.name,
            email: user.email,
            role: user.role,
            status: user.isVerified ? 'active' : 'pending',
            subscription: user.role === 'admin' ? 'Admin' : 'Free', // Simplified subscription status
            joined: new Date(user.createdAt).toLocaleDateString(),
            lastLogin: user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : 'Never',
            avatar: user.avatar,
          }));
          
          setUsers(formattedUsers);
        } else {
          setError('Invalid response format');
        }
      } catch (err: any) {
        console.error('Error fetching users:', err);
        setError(err.message || 'An error occurred while fetching users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const toggleUserStatus = async (userId: string) => {
    try {
      const user = users.find(u => u.id === userId);
      if (!user) return;
      
      // Toggle verification status
      const newStatus = user.status === 'active' ? 'pending' : 'active';
      
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...authUtils.getAuthHeader(),
        },
        body: JSON.stringify({
          isVerified: newStatus === 'active',
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update user status');
      }
      
      setUsers(users.map(u => 
        u.id === userId 
          ? { ...u, status: newStatus }
          : u
      ));
    } catch (err: any) {
      console.error('Error updating user status:', err);
      alert(err.message || 'Failed to update user status');
    }
  };

  const removeUser = async (userId: string) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          ...authUtils.getAuthHeader(),
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete user');
      }
      
      setUsers(users.filter(user => user.id !== userId));
    } catch (err: any) {
      console.error('Error removing user:', err);
      alert(err.message || 'Failed to remove user');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            User Management
          </h1>
          <p className="text-sm sm:text-base text-gray-400">
            Manage users, roles, and permissions
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-accent/20 hover:bg-accent/30 border border-accent/50 rounded-lg font-semibold text-accent transition-all duration-300 text-sm sm:text-base"
        >
          <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="whitespace-nowrap">Add New User</span>
        </motion.button>
      </div>

      {/* Search Bar */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-4">
        <div className="flex items-center gap-3 px-4 py-2 bg-gray-800/30 border border-gray-700/50 rounded-lg">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search users by name, email, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
            className="flex-1 bg-transparent text-white placeholder:text-gray-500 outline-none"
          />
        </div>
      </div>

      {/* Loading and Error States */}
      {loading && (
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-white">Loading users...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-900/50 backdrop-blur-sm border border-red-800/50 rounded-xl p-6 text-center">
          <p className="text-red-300">Error: {error}</p>
        </div>
      )}

      {/* Users Table */}
      {!loading && !error && (
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl overflow-hidden">
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-gray-700/50">
              <thead className="bg-gray-800/50 border-b border-gray-700/50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                    Role
                  </th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">
                    Last Login
                  </th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">
                    Joined
                  </th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                {users
                  .filter(user => 
                    user.name.toLowerCase().includes(searchQuery) || 
                    user.email.toLowerCase().includes(searchQuery) || 
                    user.role.toLowerCase().includes(searchQuery)
                  )
                  .map((user, idx) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="hover:bg-gray-800/30 transition-colors duration-200"
                    >
                      <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <img
                            src={user.avatar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop"}
                            alt={user.name}
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-primary/50"
                          />
                          <div>
                            <p className="text-xs sm:text-sm font-semibold text-white">
                              {user.name}
                            </p>
                            <p className="text-xs text-gray-400 hidden sm:block">{user.email}</p>
                            <div className="sm:hidden">
                              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                                user.role === "admin"
                                  ? "bg-purple-500/20 text-purple-400 border border-purple-500/50"
                                  : "bg-accent/20 text-accent border border-accent/50"
                              }`}>
                                {user.role}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap hidden sm:table-cell">
                        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-bold ${
                          user.role === "admin"
                            ? "bg-purple-500/20 text-purple-400 border border-purple-500/50"
                            : "bg-accent/20 text-accent border border-accent/50"
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-white hidden md:table-cell">
                        {user.lastLogin}
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-300 hidden md:table-cell">
                        {user.joined}
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-bold ${
                          user.status === "active"
                            ? "bg-accent/20 text-accent border border-accent/50"
                            : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/50"
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => toggleUserStatus(user.id)}
                            className={`p-2 rounded-lg transition-all duration-300 ${
                              user.status === "active"
                                ? "bg-red-500/20 hover:bg-red-500/30 border border-red-500/50"
                                : "bg-accent/20 hover:bg-accent/30 border border-accent/50"
                            }`}
                            title={user.status === "active" ? "Block User" : "Unblock User"}
                          >
                            {user.status === "active" ? (
                              <Ban className="w-4 h-4 text-red-400" />
                            ) : (
                              <CheckCircle className="w-4 h-4 text-accent" />
                            )}
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 rounded-lg bg-primary/20 hover:bg-primary/30 border border-primary/50 transition-all duration-300"
                            title="Edit User"
                          >
                            <Settings className="w-4 h-4 text-primary" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeUser(user.id)}
                            className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 transition-all duration-300"
                            title="Remove User"
                          >
                            <UserMinus className="w-4 h-4 text-red-400" />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
              {users.filter(user => 
                user.name.toLowerCase().includes(searchQuery) || 
                user.email.toLowerCase().includes(searchQuery) || 
                user.role.toLowerCase().includes(searchQuery)
              ).length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 sm:px-6 py-12 text-center whitespace-nowrap">
                    <div className="text-gray-400">
                      No users found matching your search.
                    </div>
                  </td>
                </tr>
              )}
              </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

const AdminAnalyticsTab = () => <AdminAnalytics />;

const RevenueTab = () => <AdminRevenue />;

const ActivityLogsTab = () => <AdminActivityLogs />;

const AdminSettingsTab = () => <AdminSettings />;
