"use client";

import { useState } from "react";
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
import { useAuth } from "@/lib/hooks/useAuth";

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
  const stats = [
    {
      label: "Total Users",
      value: "12,847",
      change: "+324",
      trend: "up",
      icon: Users,
      color: "primary",
    },
    {
      label: "Active Users",
      value: "9,234",
      change: "+12.5%",
      trend: "up",
      icon: Activity,
      color: "accent",
    },
    {
      label: "Total Revenue",
      value: "$847,293",
      change: "+18.2%",
      trend: "up",
      icon: DollarSign,
      color: "accent",
    },
    {
      label: "Premium Users",
      value: "3,847",
      change: "+234",
      trend: "up",
      icon: TrendingUp,
      color: "primary",
    },
  ];

  const recentUsers = [
    {
      name: "Sarah Chen",
      email: "sarah.chen@example.com",
      role: "Premium Trader",
      status: "active",
      joined: "2 hours ago",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    },
    {
      name: "Marcus Reynolds",
      email: "marcus.r@example.com",
      role: "Free Trader",
      status: "active",
      joined: "5 hours ago",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    },
    {
      name: "Priya Malhotra",
      email: "priya.m@example.com",
      role: "Premium Trader",
      status: "pending",
      joined: "1 day ago",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    },
  ];

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

      {/* Recent Users */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
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

        <div className="space-y-3">
          {recentUsers.map((user, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              whileHover={{ x: 4 }}
              className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-3 sm:p-4 hover:border-accent/50 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-primary/50 flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base sm:text-lg font-bold text-white truncate">{user.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-400 truncate">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="text-left sm:text-right">
                    <p className="text-xs sm:text-sm font-semibold text-white">{user.role}</p>
                    <p className="text-xs text-gray-400">{user.joined}</p>
                  </div>
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                    user.status === "active"
                      ? "bg-accent/20 text-accent border border-accent/50"
                      : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/50"
                  }`}>
                    {user.status}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const UserManagementTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Alex Thompson",
      email: "alex.t@example.com",
      role: "Premium Trader",
      status: "active",
      subscription: "Premium",
      joined: "2024-01-15",
      trades: 247,
      winRate: "73.2%",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    },
    {
      id: 2,
      name: "Sarah Chen",
      email: "sarah.chen@example.com",
      role: "Premium Trader",
      status: "active",
      subscription: "Premium",
      joined: "2024-02-20",
      trades: 189,
      winRate: "68.5%",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    },
    {
      id: 3,
      name: "Marcus Reynolds",
      email: "marcus.r@example.com",
      role: "Free Trader",
      status: "blocked",
      subscription: "Free",
      joined: "2024-03-10",
      trades: 45,
      winRate: "52.1%",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    },
    {
      id: 4,
      name: "Priya Malhotra",
      email: "priya.m@example.com",
      role: "Premium Trader",
      status: "active",
      subscription: "Premium",
      joined: "2024-01-28",
      trades: 312,
      winRate: "71.8%",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    },
  ]);

  const toggleUserStatus = (userId: number) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === "active" ? "blocked" : "active" }
        : user
    ));
  };

  const removeUser = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
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
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-white placeholder:text-gray-500 outline-none"
          />
        </div>
      </div>

      {/* Users Table */}
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
                  Subscription
                </th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">
                  Trades
                </th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">
                  Win Rate
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
              {users.map((user, idx) => (
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
                        src={user.avatar}
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
                            user.subscription === "Premium"
                              ? "bg-accent/20 text-accent border border-accent/50"
                              : "bg-gray-700/50 text-gray-300 border border-gray-600/50"
                          }`}>
                            {user.subscription}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap hidden sm:table-cell">
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-bold ${
                      user.subscription === "Premium"
                        ? "bg-accent/20 text-accent border border-accent/50"
                        : "bg-gray-700/50 text-gray-300 border border-gray-600/50"
                    }`}>
                      {user.subscription}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-white hidden md:table-cell">
                    {user.trades}
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap hidden md:table-cell">
                    <span className="text-xs sm:text-sm font-semibold text-accent">
                      {user.winRate}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-bold ${
                      user.status === "active"
                        ? "bg-accent/20 text-accent border border-accent/50"
                        : "bg-red-500/20 text-red-400 border border-red-500/50"
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
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const AdminAnalyticsTab = () => <AdminAnalytics />;

const RevenueTab = () => <AdminRevenue />;

const ActivityLogsTab = () => <AdminActivityLogs />;

const AdminSettingsTab = () => <AdminSettings />;
