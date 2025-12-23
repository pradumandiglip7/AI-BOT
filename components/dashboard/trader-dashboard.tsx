"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "./sidebar";
import { TopNavbar } from "./top-navbar";
import {
  LayoutDashboard,
  TrendingUp,
  Activity,
  History,
  Settings,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Brain,
  Zap,
  Award,
} from "lucide-react";

const menuItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "signals", label: "AI Signals", icon: Brain },
  { id: "portfolio", label: "Portfolio", icon: TrendingUp },
  { id: "trades", label: "Trade History", icon: History },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

export const TraderDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        menuItems={menuItems}
        userName="Alex Thompson"
        userRole="Premium Trader"
        userAvatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"
      />
      <TopNavbar userName="Alex Thompson" notifications={5} />

      <div className="ml-64 mt-16 p-6">
        <AnimatePresence mode="wait">
          {activeTab === "overview" && <OverviewTab key="overview" />}
          {activeTab === "signals" && <SignalsTab key="signals" />}
          {activeTab === "portfolio" && <PortfolioTab key="portfolio" />}
          {activeTab === "trades" && <TradesTab key="trades" />}
          {activeTab === "analytics" && <AnalyticsTab key="analytics" />}
        </AnimatePresence>
      </div>
    </>
  );
};

const OverviewTab = () => {
  const stats = [
    {
      label: "Total Balance",
      value: "$127,482.50",
      change: "+12.5%",
      trend: "up",
      icon: TrendingUp,
      color: "accent",
    },
    {
      label: "Active Trades",
      value: "8",
      change: "+3",
      trend: "up",
      icon: Activity,
      color: "primary",
    },
    {
      label: "Win Rate",
      value: "73.2%",
      change: "+5.1%",
      trend: "up",
      icon: Target,
      color: "accent",
    },
    {
      label: "Today's P&L",
      value: "$2,847.20",
      change: "+18.3%",
      trend: "up",
      icon: BarChart3,
      color: "primary",
    },
  ];

  const aiSignals = [
    {
      asset: "BTC/USD",
      action: "BUY",
      confidence: 94,
      price: "$98,742.50",
      target: "$102,500",
      risk: "Low",
    },
    {
      asset: "EUR/USD",
      action: "SELL",
      confidence: 87,
      price: "1.0892",
      target: "1.0750",
      risk: "Medium",
    },
    {
      asset: "ETH/USD",
      action: "BUY",
      confidence: 91,
      price: "$3,847.20",
      target: "$4,100",
      risk: "Low",
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
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, Alex 👋
        </h1>
        <p className="text-gray-400">
          Here's what's happening with your portfolio today
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
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-lg bg-${stat.color}/20 border border-${stat.color}/50 flex items-center justify-center`}
                >
                  <Icon className={`w-6 h-6 text-${stat.color}`} />
                </div>
                <span
                  className={`flex items-center gap-1 text-sm font-semibold ${
                    stat.trend === "up" ? "text-accent" : "text-red-400"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  {stat.change}
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* AI Signals Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/50 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    AI Trading Signals
                  </h2>
                  <p className="text-sm text-gray-400">
                    Real-time AI predictions
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-primary/20 hover:bg-primary/30 border border-primary/50 rounded-lg text-sm font-semibold text-primary transition-all duration-300"
              >
                View All
              </motion.button>
            </div>

            <div className="space-y-3">
              {aiSignals.map((signal, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-4 hover:border-primary/50 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-white">
                          {signal.asset}
                        </h3>
                        <p className="text-sm text-gray-400">{signal.price}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          signal.action === "BUY"
                            ? "bg-accent/20 text-accent border border-accent/50"
                            : "bg-red-500/20 text-red-400 border border-red-500/50"
                        }`}
                      >
                        {signal.action}
                      </span>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-xs text-gray-400">Confidence</p>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${signal.confidence}%` }}
                              transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                              className="h-full bg-accent"
                            />
                          </div>
                          <span className="text-sm font-bold text-accent">
                            {signal.confidence}%
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400">Target</p>
                        <p className="text-sm font-semibold text-white">
                          {signal.target}
                        </p>
                      </div>
                      <div>
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            signal.risk === "Low"
                              ? "bg-accent/10 text-accent"
                              : "bg-yellow-500/10 text-yellow-400"
                          }`}
                        >
                          {signal.risk} Risk
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Market Sentiment */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6"
        >
          <h2 className="text-xl font-bold text-white mb-6">
            Market Sentiment
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Crypto</span>
                <span className="text-sm font-bold text-accent">Bullish</span>
              </div>
              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "78%" }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="h-full bg-accent"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Forex</span>
                <span className="text-sm font-bold text-yellow-400">Neutral</span>
              </div>
              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "52%" }}
                  transition={{ duration: 1, delay: 0.7 }}
                  className="h-full bg-yellow-400"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Stocks</span>
                <span className="text-sm font-bold text-accent">Bullish</span>
              </div>
              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "65%" }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="h-full bg-accent"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-700/50">
            <h3 className="text-sm font-semibold text-white mb-3">
              Recent Achievements
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/50 flex items-center justify-center">
                  <Award className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    10 Win Streak
                  </p>
                  <p className="text-xs text-gray-400">2 days ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    Fast Execution
                  </p>
                  <p className="text-xs text-gray-400">5 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const SignalsTab = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="text-white"
  >
    <h2 className="text-2xl font-bold mb-4">AI Signals</h2>
    <p className="text-gray-400">Real-time trading signals powered by AI...</p>
  </motion.div>
);

const PortfolioTab = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="text-white"
  >
    <h2 className="text-2xl font-bold mb-4">Portfolio</h2>
    <p className="text-gray-400">Your portfolio performance...</p>
  </motion.div>
);

const TradesTab = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="text-white"
  >
    <h2 className="text-2xl font-bold mb-4">Trade History</h2>
    <p className="text-gray-400">All your trading history...</p>
  </motion.div>
);

const AnalyticsTab = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="text-white"
  >
    <h2 className="text-2xl font-bold mb-4">Analytics</h2>
    <p className="text-gray-400">Advanced analytics and insights...</p>
  </motion.div>
);
