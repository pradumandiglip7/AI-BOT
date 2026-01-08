"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "./sidebar";
import { TopNavbar } from "./top-navbar";
import { SidebarProvider } from "./sidebar-context";
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
  Clock,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  Award,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const menuItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "signals", label: "AI Signals", icon: Brain },
  { id: "portfolio", label: "Portfolio", icon: TrendingUp },
  { id: "trades", label: "Trade History", icon: History },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

import SettingsContent from "./settings-content";
import { useAuth } from "@/lib/hooks/useAuth";

export const TraderDashboard: React.FC<{ initialActiveTab?: string }> = ({ initialActiveTab }) => {
  const {user}= useAuth()
  const [activeTab, setActiveTab] = useState(initialActiveTab ?? "overview");

  useEffect(() => {
    if (initialActiveTab) setActiveTab(initialActiveTab);
  }, [initialActiveTab]);

  return (
    <SidebarProvider>
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        menuItems={menuItems}
        userName={user ? user?.fullName : ""}
        userRole="Premium Trader"
        userAvatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"
      />
      <TopNavbar userName={user?.fullName || "Trader"} notifications={5} />
      <div className="lg:ml-64 mt-16 lg:mt-20 p-4 sm:p-6">
        <AnimatePresence mode="wait">
          {activeTab === "overview" && <OverviewTab key="overview" />}
          {activeTab === "signals" && <SignalsTab key="signals" />}
          {activeTab === "portfolio" && <PortfolioTab key="portfolio" />}
          {activeTab === "trades" && <TradesTab key="trades" />}
          {activeTab === "analytics" && <AnalyticsTab key="analytics" />}
          {activeTab === "settings" && <SettingsContent key="settings" />}
        </AnimatePresence>
      </div>
    </SidebarProvider>
  );
};

const OverviewTab = () => {
  const { user } = useAuth();
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
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Welcome back, {user?.fullName?.split(' ')[0] || 'Trader'} 👋
        </h1>
        <p className="text-sm sm:text-base text-gray-400">
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
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/50 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white">
                    AI Trading Signals
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-400">
                    Real-time AI predictions
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-primary/20 hover:bg-primary/30 border border-primary/50 rounded-lg text-sm font-semibold text-primary transition-all duration-300 whitespace-nowrap"
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
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3 sm:gap-4 flex-1">
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-white">
                          {signal.asset}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-400">{signal.price}</p>
                      </div>
                      <span
                        className={`px-2 sm:px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                          signal.action === "BUY"
                            ? "bg-accent/20 text-accent border border-accent/50"
                            : "bg-red-500/20 text-red-400 border border-red-500/50"
                        }`}
                      >
                        {signal.action}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-6 w-full sm:w-auto">
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

type Signal = {
  id: string;
  asset: string;
  symbol: string;
  action: "BUY" | "SELL";
  entry: number | string;
  target: number | string;
  stop: number | string;
  confidence: number;
  risk: "Low" | "Medium" | "High";
  timeAgo: string;
};

function SignalsTab() {
  const seed: Signal[] = [
    { id: "s1", asset: "Bitcoin", symbol: "BTC/USD", action: "BUY", entry: 61000, target: 63500, stop: 60000, confidence: 82, risk: "Medium", timeAgo: "5m ago" },
    { id: "s2", asset: "Ethereum", symbol: "ETH/USD", action: "SELL", entry: 3800, target: 3500, stop: 3900, confidence: 68, risk: "High", timeAgo: "12m ago" },
    { id: "s3", asset: "SOL", symbol: "SOL/USD", action: "BUY", entry: 150, target: 180, stop: 142, confidence: 92, risk: "Medium", timeAgo: "1h ago" },
    { id: "s4", asset: "EUR/USD", symbol: "EURUSD", action: "BUY", entry: 1.085, target: 1.095, stop: 1.078, confidence: 55, risk: "Low", timeAgo: "20m ago" },
  ];

  const [signals, setSignals] = useState<Signal[]>(seed);
  const [filter, setFilter] = useState<"All" | "Buy" | "Sell" | "Strong Buy" | "Strong Sell">("All");
  const [loading, setLoading] = useState(false);

  const filtered = useMemo(() => {
    if (filter === "All") return signals;
    if (filter === "Buy") return signals.filter(s => s.action === "BUY");
    if (filter === "Sell") return signals.filter(s => s.action === "SELL");
    if (filter === "Strong Buy") return signals.filter(s => s.action === "BUY" && s.confidence >= 80);
    if (filter === "Strong Sell") return signals.filter(s => s.action === "SELL" && s.confidence >= 80);
    return signals;
  }, [signals, filter]);

  useEffect(() => {
    // small heartbeat to keep UI feeling live
    const t = setInterval(() => {
      setSignals(prev => prev.map(s => ({ ...s, timeAgo: s.timeAgo === 'now' ? 'just now' : s.timeAgo })));
    }, 45000);
    return () => clearInterval(t);
  }, []);

  const generate = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 900 + Math.random() * 900));
    const id = `s${Date.now()}`;
    const isBuy = Math.random() > 0.45;
    const newSignal: Signal = {
      id,
      asset: isBuy ? "DOT" : "XRP",
      symbol: isBuy ? "DOT/USD" : "XRP/USD",
      action: isBuy ? "BUY" : "SELL",
      entry: +(Math.random() * (isBuy ? 20 : 1) + (isBuy ? 22 : 0.2)).toFixed(3),
      target: +(Math.random() * 50 + 10).toFixed(3),
      stop: +(Math.random() * 5 + 1).toFixed(3),
      confidence: Math.floor(40 + Math.random() * 60),
      risk: Math.random() > 0.66 ? "High" : Math.random() > 0.5 ? "Medium" : "Low",
      timeAgo: "now",
    };
    setSignals(prev => [newSignal, ...prev].slice(0, 30));
    setLoading(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-white">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">AI Trading Signals</h2>
          <p className="text-gray-400 text-xs sm:text-sm">Real-time AI signals with confidence and risk metrics</p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="hidden sm:flex items-center gap-2 bg-white/3 backdrop-blur rounded-full px-3 py-1 border border-white/6 text-xs sm:text-sm text-gray-200">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
            Live
          </div>
          <button onClick={generate} disabled={loading} className={`px-3 sm:px-4 py-2 rounded-full font-semibold text-xs sm:text-sm transition whitespace-nowrap ${loading ? 'bg-amber-500 text-white' : 'bg-gradient-to-r from-emerald-400 to-emerald-300 text-black'}`}>
            {loading ? <span className="flex items-center gap-2"><RefreshCw className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" /> <span className="hidden sm:inline">Generating...</span><span className="sm:hidden">...</span></span> : <span className="flex items-center gap-2"><Zap className="w-3 h-3 sm:w-4 sm:h-4" /> <span className="hidden sm:inline">Generate New Signal</span><span className="sm:hidden">New</span></span>}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 sm:gap-3 mb-6 flex-wrap">
        {(["All","Buy","Sell","Strong Buy","Strong Sell"] as const).map(tab => (
          <button key={tab} onClick={() => setFilter(tab)} className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm whitespace-nowrap ${filter === tab ? 'bg-white/8 text-white border border-white/10' : 'text-gray-300 hover:bg-white/3'}`}>
            {tab}
          </button>
        ))}
        <div className="ml-auto text-xs sm:text-sm text-gray-400 hidden sm:block">Showing {filtered.length} signals</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((s) => (
          <motion.div key={s.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.02 }} transition={{ duration: 0.25 }} className="bg-gray-900/40 backdrop-blur-md border border-gray-800/60 rounded-2xl p-4 hover:shadow-xl">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-semibold text-black" style={{ background: s.action === 'BUY' ? 'linear-gradient(90deg,#34d399,#10b981)' : 'linear-gradient(90deg,#fb7185,#ef4444)'}}>
                  {s.asset[0]}
                </div>
                <div>
                  <div className="text-white font-bold">{s.asset} <span className="text-gray-400 text-sm">{s.symbol}</span></div>
                  <div className="text-xs text-gray-300">{s.timeAgo}</div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${s.action === 'BUY' ? 'bg-emerald-200 text-emerald-800' : 'bg-red-200 text-red-800'}`}>{s.action}</span>
                <div className="text-xs text-gray-300">Risk: <span className={`${s.risk === 'High' ? 'text-amber-400' : s.risk === 'Medium' ? 'text-amber-200' : 'text-green-200'}`}>{s.risk}</span></div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-sm text-gray-200">
              <div className="bg-black/20 rounded-lg p-3">
                <div className="text-xs text-gray-400">Entry</div>
                <div className="font-semibold">{s.entry}</div>
              </div>
              <div className="bg-black/20 rounded-lg p-3">
                <div className="text-xs text-gray-400">Target</div>
                <div className="font-semibold">{s.target}</div>
              </div>
              <div className="bg-black/20 rounded-lg p-3">
                <div className="text-xs text-gray-400">Stop</div>
                <div className="font-semibold">{s.stop}</div>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-gray-300 mb-2">
                <div className="flex items-center gap-2"><Clock className="w-3 h-3" /> <span>{s.timeAgo}</span></div>
                <div className="text-xs">Confidence: {s.confidence}%</div>
              </div>

              <div className="w-full bg-white/6 rounded-full h-3 overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${s.confidence}%` }} transition={{ duration: 1.05 }} className={`h-3 ${s.action === 'BUY' ? 'bg-gradient-to-r from-emerald-400 to-teal-400' : 'bg-gradient-to-r from-red-400 to-rose-400'}`} />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <span className="px-2 py-1 rounded-md bg-white/5">#{s.id}</span>
                <span className="flex items-center gap-1">
                  {s.confidence >= 80 ? <TrendingUp className="w-4 h-4 text-emerald-300" /> : s.action === 'SELL' ? <ArrowDown className="w-4 h-4 text-red-300" /> : <ArrowUp className="w-4 h-4 text-amber-300" />}
                  <span>{s.confidence >= 80 ? 'Strong' : 'Normal'}</span>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button className="px-3 py-1.5 rounded-lg text-sm bg-white/5 text-gray-200 hover:bg-white/7 transition">Details</button>
                <button className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${s.action === 'BUY' ? 'bg-emerald-500 text-black' : 'bg-red-500 text-white'}`}>{s.action}</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

type Holding = {
  id: string;
  asset: string;
  symbol: string;
  amount: number;
  avgBuy: number;
  current: number;
  spark: { x: number; y: number }[];
};

const colors = ["#10b981", "#f97316", "#ef4444", "#60a5fa", "#a78bfa"];

const PortfolioTab = () => {
  const seedHoldings: Holding[] = [
    { id: "h1", asset: "Bitcoin", symbol: "BTC", amount: 0.85, avgBuy: 56000, current: 61000, spark: Array.from({ length: 12 }, (_, i) => ({ x: i, y: 56000 + i * 400 + Math.random() * 800 })) },
    { id: "h2", asset: "Ethereum", symbol: "ETH", amount: 8.12, avgBuy: 3000, current: 3800, spark: Array.from({ length: 12 }, (_, i) => ({ x: i, y: 3000 + i * 70 + Math.random() * 120 })) },
    { id: "h3", asset: "SOL", symbol: "SOL", amount: 120, avgBuy: 90, current: 150, spark: Array.from({ length: 12 }, (_, i) => ({ x: i, y: 90 + i * 4 + Math.random() * 6 })) },
  ];

  const [holdings, setHoldings] = useState<Holding[]>(seedHoldings);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ asset: "", symbol: "", amount: "", avgBuy: "", current: "" });
  const [timeframe, setTimeframe] = useState<"1D" | "1W" | "1M" | "3M" | "1Y" | "ALL">("1M");

  const totalValue = holdings.reduce((s, h) => s + h.amount * h.current, 0);
  const totalChange24 = ((Math.random() * 4 - 2) / 100) * totalValue; // mock 24h change

  const pieData = holdings.map((h) => ({ name: h.asset, value: +(h.amount * h.current).toFixed(2) }));

  const performanceData = (() => {
    const points = timeframe === "1D" ? 24 : timeframe === "1W" ? 7 : timeframe === "1M" ? 30 : timeframe === "3M" ? 90 : timeframe === "1Y" ? 365 : 720;
    let base = totalValue * 0.9;
    return Array.from({ length: points }, (_, i) => {
      base = base * (1 + (Math.random() - 0.48) * 0.01);
      return { t: i, value: Math.round(base) };
    });
  })();

  const addHolding = (e?: React.FormEvent) => {
    e?.preventDefault();
    const newH: Holding = {
      id: `h${Date.now()}`,
      asset: form.asset || "NEW",
      symbol: form.symbol || "SYM",
      amount: Number(form.amount) || 0,
      avgBuy: Number(form.avgBuy) || 0,
      current: Number(form.current) || Number(form.avgBuy) || 0,
      spark: Array.from({ length: 12 }, (_, i) => ({ x: i, y: Number(form.current) + Math.random() * 6 })),
    };
    setHoldings((p) => [newH, ...p]);
    setShowAdd(false);
    setForm({ asset: "", symbol: "", amount: "", avgBuy: "", current: "" });
  };

  const removeHolding = (id: string) => setHoldings((p) => p.filter(h => h.id !== id));

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-white space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Portfolio</h2>
          <p className="text-gray-400 text-xs sm:text-sm">Overview of your holdings and performance</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="text-right flex-1 sm:flex-none">
            <div className="text-2xl sm:text-3xl font-bold">${totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            <div className={`text-xs sm:text-sm ${totalChange24 >= 0 ? 'text-emerald-300' : 'text-red-400'}`}>{totalChange24 >= 0 ? '+' : ''}{((totalChange24 / totalValue) * 100).toFixed(2)}% (24h)</div>
          </div>
          <button onClick={() => setShowAdd(true)} className="px-3 sm:px-4 py-2 rounded-full font-semibold text-xs sm:text-sm bg-gradient-to-r from-emerald-400 to-cyan-400 text-black whitespace-nowrap">Add Asset</button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2 bg-white/5 backdrop-blur-md border border-white/6 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Performance</h3>
            <div className="flex items-center gap-2">
              {(["1D","1W","1M","3M","1Y","ALL"] as const).map(tf => (
                <button key={tf} onClick={() => setTimeframe(tf)} className={`px-2 py-1 text-sm rounded ${timeframe===tf? 'bg-white/8 text-white' : 'text-gray-300 hover:bg-white/3'}`}>{tf}</button>
              ))}
            </div>
          </div>

          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#111827" />
                <XAxis dataKey="t" tick={false} />
                <YAxis tickFormatter={(v) => `$${Math.round(v/1000)}k`} />
                <Tooltip formatter={(v: any) => `$${v}`} />
                <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorPv)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full text-sm table-fixed">
              <thead>
                <tr className="text-left text-gray-400">
                  <th className="pb-3">Asset</th>
                  <th className="pb-3">Symbol</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Avg Buy</th>
                  <th className="pb-3">Current</th>
                  <th className="pb-3">P&L</th>
                  <th className="pb-3">P&L%</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map(h => {
                  const value = h.amount * h.current;
                  const cost = h.amount * h.avgBuy;
                  const pnl = value - cost;
                  const pnlPct = cost ? (pnl / cost) * 100 : 0;
                  return (
                    <motion.tr key={h.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="border-t border-white/6">
                      <td className="py-3"><div className="font-semibold">{h.asset}</div></td>
                      <td className="py-3 text-gray-300">{h.symbol}</td>
                      <td className="py-3">{h.amount}</td>
                      <td className="py-3">${h.avgBuy}</td>
                      <td className="py-3">${h.current}</td>
                      <td className={`py-3 font-semibold ${pnl>=0? 'text-emerald-300':'text-red-400'}`}>${pnl.toFixed(2)}</td>
                      <td className={`py-3 ${pnl>=0? 'text-emerald-300':'text-red-400'}`}>{pnlPct.toFixed(2)}%</td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <button className="px-2 py-1 text-xs rounded bg-white/5">Details</button>
                          <button onClick={() => removeHolding(h.id)} className="px-2 py-1 text-xs rounded bg-red-600/80 text-white">Remove</button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} className="bg-white/5 backdrop-blur-md border border-white/6 rounded-2xl p-5">
          <h3 className="font-semibold text-white mb-4">Allocation</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={4}>
                  {pieData.map((entry, idx) => (
                    <Cell key={entry.name} fill={colors[idx % colors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v:any) => `$${Number(v).toLocaleString()}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 space-y-3">
            {holdings.map((h, idx) => (
              <motion.div key={h.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-black/20 rounded-lg p-3 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold">{h.asset} <span className="text-gray-400 text-xs">{h.symbol}</span></div>
                  <div className="text-xs text-gray-300">{((h.amount*h.current)/totalValue*100).toFixed(1)}% • ${Math.round(h.amount*h.current)}</div>
                </div>
                <div className="w-24 h-8">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={h.spark} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                      <Area type="monotone" dataKey="y" stroke={colors[idx%colors.length]} fill={colors[idx%colors.length]} fillOpacity={0.2} strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Add Asset Modal */}
      <AnimatePresence>
        {showAdd && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60" onClick={() => setShowAdd(false)} />
            <motion.form onSubmit={addHolding} initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: 20 }} className="relative bg-white/5 backdrop-blur-md border border-white/6 rounded-2xl p-6 w-full max-w-md">
              <h3 className="text-lg font-bold mb-3">Add Asset</h3>
              <div className="space-y-3">
                <input value={form.asset} onChange={e => setForm(f => ({ ...f, asset: e.target.value }))} placeholder="Asset name" className="w-full p-2 rounded bg-black/20" />
                <input value={form.symbol} onChange={e => setForm(f => ({ ...f, symbol: e.target.value }))} placeholder="Symbol" className="w-full p-2 rounded bg-black/20" />
                <input value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} placeholder="Amount" className="w-full p-2 rounded bg-black/20" />
                <input value={form.avgBuy} onChange={e => setForm(f => ({ ...f, avgBuy: e.target.value }))} placeholder="Avg Buy Price" className="w-full p-2 rounded bg-black/20" />
                <input value={form.current} onChange={e => setForm(f => ({ ...f, current: e.target.value }))} placeholder="Current Price" className="w-full p-2 rounded bg-black/20" />
              </div>
              <div className="mt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowAdd(false)} className="px-4 py-2 rounded bg-white/5">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded bg-emerald-400 text-black font-semibold">Add</button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

type Trade = {
  id: string;
  date: Date;
  asset: string;
  type: "BUY" | "SELL";
  amount: number;
  price: number;
  total: number;
  fee: number;
  status: "Completed" | "Pending" | "Failed";
};

const TradesTab = () => {
  const seedTrades: Trade[] = [
    { id: "t1", date: new Date(Date.now() - 1*24*60*60*1000), asset: "BTC", type: "BUY", amount: 0.5, price: 61000, total: 30500, fee: 15, status: "Completed" },
    { id: "t2", date: new Date(Date.now() - 2*24*60*60*1000), asset: "ETH", type: "SELL", amount: 2, price: 3800, total: 7600, fee: 30, status: "Completed" },
    { id: "t3", date: new Date(Date.now() - 3*24*60*60*1000), asset: "SOL", type: "BUY", amount: 50, price: 150, total: 7500, fee: 20, status: "Completed" },
    { id: "t4", date: new Date(Date.now() - 4*24*60*60*1000), asset: "BTC", type: "SELL", amount: 0.2, price: 60000, total: 12000, fee: 25, status: "Pending" },
    { id: "t5", date: new Date(Date.now() - 5*24*60*60*1000), asset: "ADA", type: "BUY", amount: 500, price: 0.95, total: 475, fee: 10, status: "Failed" },
  ];

  const [trades, setTrades] = useState<Trade[]>(seedTrades);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ asset: "", type: "All" as "All" | "BUY" | "SELL", status: "All" as "All" | "Completed" | "Pending" | "Failed" });
  const perPage = 10;

  const filtered = trades.filter(t => 
    (!filters.asset || t.asset === filters.asset) &&
    (filters.type === "All" || t.type === filters.type) &&
    (filters.status === "All" || t.status === filters.status)
  );

  const paged = filtered.slice((page - 1) * perPage, page * perPage);
  const maxPage = Math.ceil(filtered.length / perPage);

  const stats = {
    total: trades.length,
    volume: trades.reduce((s, t) => s + t.total, 0),
    avg: trades.length > 0 ? trades.reduce((s, t) => s + t.total, 0) / trades.length : 0,
    winRate: trades.length > 0 ? (trades.filter(t => t.type === "BUY" || t.status === "Completed").length / trades.length * 100).toFixed(1) : 0,
  };

  const exportCSV = () => {
    const csv = "Date,Asset,Type,Amount,Price,Total,Fee,Status\n" + trades.map(t => `${t.date.toISOString()},${t.asset},${t.type},${t.amount},${t.price},${t.total},${t.fee},${t.status}`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "trades.csv";
    a.click();
  };

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-white space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Trade History</h2>
          <p className="text-gray-400 text-xs sm:text-sm">View and manage all your trades</p>
        </div>
        <button onClick={exportCSV} className="px-3 sm:px-4 py-2 rounded-full font-semibold text-xs sm:text-sm bg-blue-500/80 text-white whitespace-nowrap">Export CSV</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[{ label: "Total Trades", value: stats.total }, { label: "Total Volume", value: `$${stats.volume.toLocaleString(undefined, { maximumFractionDigits: 0 })}` }, { label: "Avg Trade Size", value: `$${stats.avg.toFixed(0)}` }, { label: "Win Rate", value: `${stats.winRate}%` }].map((s, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 backdrop-blur-md border border-white/6 rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-1">{s.label}</div>
            <div className="text-2xl font-bold">{s.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white/5 backdrop-blur-md border border-white/6 rounded-2xl p-5">
        <div className="flex items-center gap-4 mb-4 flex-wrap">
          <select value={filters.asset} onChange={e => { setFilters(f => ({ ...f, asset: e.target.value })); setPage(1); }} className="px-3 py-2 rounded bg-black/40 border border-white/10 text-sm">
            <option value="">All Assets</option>
            {["BTC", "ETH", "SOL", "ADA"].map(a => <option key={a} value={a}>{a}</option>)}
          </select>
          <select value={filters.type} onChange={e => { setFilters(f => ({ ...f, type: e.target.value as any })); setPage(1); }} className="px-3 py-2 rounded bg-black/40 border border-white/10 text-sm">
            <option value="All">All Types</option>
            <option value="BUY">Buy</option>
            <option value="SELL">Sell</option>
          </select>
          <select value={filters.status} onChange={e => { setFilters(f => ({ ...f, status: e.target.value as any })); setPage(1); }} className="px-3 py-2 rounded bg-black/40 border border-white/10 text-sm">
            <option value="All">All Status</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
          <div className="ml-auto text-sm text-gray-400">Showing {paged.length} of {filtered.length}</div>
        </div>

        <div className="overflow-x-auto -mx-4 sm:mx-0 font-mono text-xs sm:text-sm">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full">
            <thead>
              <tr className="text-left text-gray-400 border-b border-white/6">
                <th className="py-3 px-4">Date/Time</th>
                <th className="py-3 px-4">Asset</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Fee</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {paged.map((t) => (
                React.createElement(React.Fragment, { key: t.id },
                  <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setExpanded(expanded === t.id ? null : t.id)} className="border-b border-white/6 hover:bg-white/3 transition cursor-pointer">
                    <td className="py-3 px-4">{t.date.toLocaleString()}</td>
                    <td className="py-3 px-4 font-semibold">{t.asset}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${t.type === "BUY" ? "bg-emerald-200 text-emerald-800" : "bg-red-200 text-red-800"}`}>{t.type}</span>
                    </td>
                    <td className="py-3 px-4">{t.amount}</td>
                    <td className="py-3 px-4">${t.price}</td>
                    <td className="py-3 px-4 font-semibold">${t.total.toFixed(2)}</td>
                    <td className="py-3 px-4">${t.fee}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${t.status === "Completed" ? "bg-emerald-500/30 text-emerald-200" : t.status === "Pending" ? "bg-yellow-500/30 text-yellow-200" : "bg-red-500/30 text-red-200"}`}>{t.status}</span>
                    </td>
                    <td className="py-3 px-4 text-right"><span className="text-xs">{expanded === t.id ? "▲" : "▼"}</span></td>
                  </motion.tr>,
                  expanded === t.id && (
                    <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/3 border-b border-white/6">
                      <td colSpan={9} className="py-4 px-4">
                        <div className="grid grid-cols-4 gap-6 text-sm">
                          <div><div className="text-gray-400">Net P&L</div><div className="text-lg font-bold text-emerald-300">${(t.total - t.fee).toFixed(2)}</div></div>
                          <div><div className="text-gray-400">Fee %</div><div className="text-lg font-bold">{((t.fee / t.total) * 100).toFixed(2)}%</div></div>
                          <div><div className="text-gray-400">Status Details</div><div className="text-sm">{t.status === "Completed" ? "Trade executed successfully" : t.status === "Pending" ? "Awaiting execution" : "Trade failed to execute"}</div></div>
                          <div><button className="px-3 py-1 rounded bg-white/5 text-sm hover:bg-white/10">Details</button></div>
                        </div>
                      </td>
                    </motion.tr>
                  )
                )
              ))}
            </tbody>
          </table>
          </div>
        </div>

        {maxPage > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 rounded bg-white/5 disabled:opacity-50">&lt;</button>
            {Array.from({ length: maxPage }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => setPage(p)} className={`px-3 py-1 rounded ${page === p ? "bg-blue-500" : "bg-white/5"}`}>{p}</button>
            ))}
            <button onClick={() => setPage(p => Math.min(maxPage, p + 1))} disabled={page === maxPage} className="px-3 py-1 rounded bg-white/5 disabled:opacity-50">&gt;</button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const AnalyticsTab = () => {
  const [timeframe, setTimeframe] = useState<"1D" | "1W" | "1M" | "3M" | "1Y" | "ALL">("1M");

  const perfData = Array.from({ length: 30 }, (_, i) => {
    let base = 50000;
    for (let j = 0; j <= i; j++) base = base * (1 + (Math.random() - 0.49) * 0.02);
    return { t: i, value: Math.round(base), pnl: Math.round(base - 50000) };
  });

  const assetDist = [
    { name: "BTC", value: 45000 },
    { name: "ETH", value: 28000 },
    { name: "SOL", value: 18000 },
    { name: "Other", value: 9000 },
  ];

  const heatmapData = Array.from({ length: 24 }, (_, h) => ({
    hour: h,
    trades: Math.floor(Math.random() * 50 + 5),
    volume: Math.floor(Math.random() * 100000 + 10000),
  }));

  const topAssets = [
    { name: "BTC", gain: 18.5 },
    { name: "ETH", gain: 24.2 },
    { name: "SOL", gain: 42.8 },
    { name: "ADA", gain: -5.2 },
  ];

  const monthlyReturns = Array.from({ length: 12 }, (_, m) => ({
    month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][m],
    return: (Math.random() * 10 - 3).toFixed(1),
  }));

  const riskMetrics = [
    { label: "Sharpe Ratio", value: "1.85", color: "text-emerald-300" },
    { label: "Max Drawdown", value: "-12.3%", color: "text-red-400" },
    { label: "Volatility", value: "18.4%", color: "text-amber-300" },
    { label: "Win Rate", value: "68.5%", color: "text-emerald-300" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-white space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Analytics</h2>
          <p className="text-gray-400 text-xs sm:text-sm">Comprehensive trading insights and performance metrics</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: "Total P&L", value: "$12,450.50", color: "text-emerald-300" },
          { label: "Win Rate", value: "68.5%", color: "text-emerald-300" },
          { label: "Best Trade", value: "$2,840", color: "text-blue-300" },
          { label: "Worst Trade", value: "-$1,240", color: "text-red-300" },
          { label: "Avg Hold Time", value: "2.3h", color: "text-cyan-300" },
        ].map((s, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} className="bg-gradient-to-br from-white/5 to-white/3 backdrop-blur-md border border-white/6 rounded-lg p-4 hover:border-white/10 transition">
            <div className="text-gray-400 text-sm mb-1">{s.label}</div>
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2 bg-white/5 backdrop-blur-md border border-white/6 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Performance</h3>
            <div className="flex items-center gap-2">
              {/* {("1D 1W 1M 3M 1Y ALL".split(" ") as const).map(tf => ( */}
                {/* <button key={tf} onClick={() => setTimeframe(tf)} className={`px-2 py-1 text-sm rounded ${timeframe === tf ? "bg-white/8 text-white" : "text-gray-300 hover:bg-white/3"}`}>{tf}</button> */}
              {/* ))} */}
            </div>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={perfData}>
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#111827" />
                <XAxis dataKey="t" tick={false} />
                <YAxis tickFormatter={(v) => `$${Math.round(v/1000)}k`} />
                <Tooltip formatter={(v:any) => `$${v}`} />
                <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} fill="url(#grad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} className="bg-white/5 backdrop-blur-md border border-white/6 rounded-2xl p-5">
          <h3 className="font-semibold text-white mb-4">Trade Distribution</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={assetDist} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={3}>
                  {assetDist.map((e, idx) => <Cell key={e.name} fill={colors[idx % colors.length]} />)}
                </Pie>
                <Tooltip formatter={(v:any) => `$${Number(v).toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div className="bg-white/5 backdrop-blur-md border border-white/6 rounded-2xl p-5">
        <h3 className="font-semibold text-white mb-4">Risk Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {riskMetrics.map((m, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="bg-black/20 rounded-lg p-4 text-center">
              <div className="text-gray-400 text-sm mb-2">{m.label}</div>
              <div className={`text-2xl font-bold ${m.color}`}>{m.value}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} className="bg-white/5 backdrop-blur-md border border-white/6 rounded-2xl p-5">
          <h3 className="font-semibold text-white mb-4">Top Performing Assets</h3>
          <div className="space-y-3">
            {topAssets.map((a, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className="flex items-center justify-between bg-black/20 rounded-lg p-3">
                <div className="font-semibold">{a.name}</div>
                <div className={`text-lg font-bold ${a.gain >= 0 ? "text-emerald-300" : "text-red-400"}`}>{a.gain >= 0 ? "+" : ""}{a.gain}%</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} className="bg-white/5 backdrop-blur-md border border-white/6 rounded-2xl p-5">
          <h3 className="font-semibold text-white mb-4">Monthly Returns</h3>
          <div className="grid grid-cols-6 gap-2">
            {monthlyReturns.map((m, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                <div className="text-xs text-gray-400 mb-1">{m.month}</div>
                <div className={`text-sm font-bold ${Number(m.return) >= 0 ? "text-emerald-300" : "text-red-400"}`}>{Number(m.return) >= 0 ? "+" : ""}{m.return}%</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 backdrop-blur-md border border-white/6 rounded-2xl p-5">
        <h3 className="font-semibold text-white mb-4">Hourly Activity</h3>
        <div className="grid gap-1" style={{ gridTemplateColumns: "repeat(24, 1fr)" }}>
          {heatmapData.map((h, idx) => {
            const intensity = Math.min(h.trades / 50, 1);
            return (
              <motion.div key={idx} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} title={`${h.hour}:00 - ${h.trades} trades`} className="h-8 rounded text-xs flex items-center justify-center font-mono cursor-pointer hover:ring-2 ring-white/20" style={{ background: `rgba(16, 185, 129, ${intensity * 0.6 + 0.2})` }}>
                {h.hour % 4 === 0 ? h.hour : ""}
              </motion.div>
            );
          })}
        </div>
        <div className="mt-4 text-xs text-gray-400 flex items-center gap-4">
          <div>Low</div>
          <div className="flex gap-1">
            {[0.2, 0.4, 0.6, 0.8, 1].map((v, i) => <div key={i} className="w-3 h-3 rounded" style={{ background: `rgba(16, 185, 129, ${v})` }} />)}
          </div>
          <div>High</div>
        </div>
      </motion.div>
    </motion.div>
  );
};
