"use client";

import { motion } from "framer-motion";
import {
  LayoutDashboard,
  TrendingUp,
  Activity,
  Settings,
  Users,
  BarChart3,
  Bell,
  Search,
  LogOut,
  ChevronDown,
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  menuItems: { id: string; label: string; icon: any }[];
  userName: string;
  userRole: string;
  userAvatar: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  menuItems,
  userName,
  userRole,
  userAvatar,
}) => {
  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      className="fixed left-0 top-0 h-screen w-64 bg-gray-900/50 backdrop-blur-sm border-r border-gray-800/50 z-40"
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-gray-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">AI Trading</h1>
              <p className="text-xs text-gray-400">Pro Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg
                    transition-all duration-300 group
                    ${
                      isActive
                        ? "bg-primary/20 text-primary border border-primary/50"
                        : "text-gray-400 hover:bg-gray-800/50 hover:text-white"
                    }
                  `}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon
                    className={`w-5 h-5 ${isActive ? "text-primary" : "text-gray-400 group-hover:text-white"}`}
                  />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="ml-auto w-2 h-2 bg-primary rounded-full"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-800/50">
          <motion.div
            className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-all duration-300 cursor-pointer"
            whileHover={{ scale: 1.02 }}
          >
            <img
              src={userAvatar}
              alt={userName}
              className="w-10 h-10 rounded-full border-2 border-primary/50"
            />
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">{userName}</p>
              <p className="text-xs text-gray-400">{userRole}</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
