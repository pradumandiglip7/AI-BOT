"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Search, LogIn, Edit, Trash2, AlertCircle, Shield, UserPlus, Settings } from "lucide-react";

type LogAction = "login" | "update" | "delete" | "error" | "security" | "register" | "settings";

interface ActivityLog {
  id: string;
  action: LogAction;
  description: string;
  ipAddress: string;
  timestamp: Date;
  userId?: string;
}

export const AdminActivityLogs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterAction, setFilterAction] = useState<LogAction | "all">("all");

  // Mock activity logs
  const logs: ActivityLog[] = [
    {
      id: "1",
      action: "login",
      description: "User sarah.chen logged in successfully",
      ipAddress: "192.168.1.45",
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      userId: "user_123",
    },
    {
      id: "2",
      action: "update",
      description: "User marcus.r updated profile settings",
      ipAddress: "192.168.1.102",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      userId: "user_456",
    },
    {
      id: "3",
      action: "register",
      description: "New user registration: alex.thompson",
      ipAddress: "192.168.1.78",
      timestamp: new Date(Date.now() - 32 * 60 * 1000),
      userId: "user_789",
    },
    {
      id: "4",
      action: "delete",
      description: "User priya.m deleted trading signal #4521",
      ipAddress: "192.168.1.201",
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      userId: "user_321",
    },
    {
      id: "5",
      action: "error",
      description: "API rate limit exceeded for user john.doe",
      ipAddress: "192.168.1.156",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      userId: "user_654",
    },
    {
      id: "6",
      action: "security",
      description: "Failed login attempt from IP 192.168.1.999",
      ipAddress: "192.168.1.999",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: "7",
      action: "settings",
      description: "Admin updated system configuration",
      ipAddress: "192.168.1.1",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    },
    {
      id: "8",
      action: "login",
      description: "User sarah.chen logged out",
      ipAddress: "192.168.1.45",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      userId: "user_123",
    },
  ];

  const getActionIcon = (action: LogAction) => {
    switch (action) {
      case "login":
        return LogIn;
      case "update":
        return Edit;
      case "delete":
        return Trash2;
      case "error":
        return AlertCircle;
      case "security":
        return Shield;
      case "register":
        return UserPlus;
      case "settings":
        return Settings;
      default:
        return AlertCircle;
    }
  };

  const getActionColor = (action: LogAction) => {
    switch (action) {
      case "login":
        return "text-accent bg-accent/20 border-accent/50";
      case "update":
        return "text-primary bg-primary/20 border-primary/50";
      case "delete":
        return "text-destructive bg-destructive/20 border-destructive/50";
      case "error":
        return "text-yellow-400 bg-yellow-400/20 border-yellow-400/50";
      case "security":
        return "text-purple-400 bg-purple-400/20 border-purple-400/50";
      case "register":
        return "text-cyan-400 bg-cyan-400/20 border-cyan-400/50";
      case "settings":
        return "text-blue-400 bg-blue-400/20 border-blue-400/50";
      default:
        return "text-gray-400 bg-gray-400/20 border-gray-400/50";
    }
  };

  const formatRelativeTime = (date: Date) => {
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

  const filteredLogs = logs.filter((log) => {
    const matchesSearch = searchQuery === "" || 
      log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.userId?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterAction === "all" || log.action === filterAction;
    return matchesSearch && matchesFilter;
  });

  const actionFilters: { value: LogAction | "all"; label: string }[] = [
    { value: "all", label: "All" },
    { value: "login", label: "Login" },
    { value: "update", label: "Update" },
    { value: "delete", label: "Delete" },
    { value: "error", label: "Error" },
    { value: "security", label: "Security" },
    { value: "register", label: "Register" },
    { value: "settings", label: "Settings" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Activity Logs</h1>
        <p className="text-sm sm:text-base text-gray-400">System activity and audit trail</p>
      </div>

      {/* Search & Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-4 sm:p-6"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by user ID or action description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background/50 border border-border rounded-lg text-foreground placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            {actionFilters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setFilterAction(filter.value)}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  filterAction === filter.value
                    ? "bg-primary text-white border border-primary/50"
                    : "bg-background/50 text-gray-400 border border-border hover:border-primary/50"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Log List */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-4 sm:p-6"
      >
        <div className="mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-white">
            Showing {filteredLogs.length} log{filteredLogs.length !== 1 ? "s" : ""}
          </h2>
        </div>
        <div className="space-y-3 max-h-[600px] overflow-y-auto">
          {filteredLogs.map((log, idx) => {
            const Icon = getActionIcon(log.action);
            const colorClass = getActionColor(log.action);
            return (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.05 }}
                className="bg-background/30 border border-border/50 rounded-lg p-3 sm:p-4 hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-lg border flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm sm:text-base font-semibold text-white mb-1">
                      {log.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-400">
                      <span className="font-mono bg-background/50 px-2 py-1 rounded">
                        {log.ipAddress}
                      </span>
                      <span>{formatRelativeTime(log.timestamp)}</span>
                      {log.userId && (
                        <span className="text-primary">ID: {log.userId}</span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};

