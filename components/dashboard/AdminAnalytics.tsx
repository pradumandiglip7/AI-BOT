"use client";

import { motion } from "framer-motion";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Users, TrendingUp, Target } from "lucide-react";

export const AdminAnalytics = () => {
  // Mock data for User Growth (last 6 months)
  const userGrowthData = [
    { month: "Jul", users: 5200 },
    { month: "Aug", users: 6800 },
    { month: "Sep", users: 7800 },
    { month: "Oct", users: 9200 },
    { month: "Nov", users: 10500 },
    { month: "Dec", users: 12847 },
  ];

  // Mock data for Traffic Sources
  const trafficSourcesData = [
    { source: "Direct", visitors: 4520 },
    { source: "Referral", visitors: 3200 },
    { source: "Social", visitors: 2127 },
  ];

  const stats = [
    {
      label: "Total Signups",
      value: "12,847",
      change: "+15.2%",
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/20",
      borderColor: "border-primary/50",
    },
    {
      label: "Premium Conversions",
      value: "34.2%",
      change: "+5.1%",
      icon: TrendingUp,
      color: "text-accent",
      bgColor: "bg-accent/20",
      borderColor: "border-accent/50",
    },
    {
      label: "Signal Accuracy",
      value: "87.5%",
      change: "+2.3%",
      icon: Target,
      color: "text-cyan-400",
      bgColor: "bg-cyan-400/20",
      borderColor: "border-cyan-400/50",
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
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
        <p className="text-sm sm:text-base text-gray-400">Comprehensive system analytics and performance metrics</p>
      </div>

      {/* Top Row Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className={`glass-card p-4 sm:p-6 hover:border-primary/50 transition-all duration-300 ${stat.borderColor}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg ${stat.bgColor} border ${stat.borderColor} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className={`flex items-center gap-1 text-sm font-semibold ${stat.color}`}>
                  <TrendingUp className="w-4 h-4" />
                  {stat.change}
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
              <p className={`text-2xl sm:text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Main Chart - User Growth */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-4 sm:p-6 lg:col-span-2"
        >
          <div className="mb-4">
            <h2 className="text-xl font-bold text-white mb-1">User Growth</h2>
            <p className="text-sm text-gray-400">Last 6 months overview</p>
          </div>
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userGrowthData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2D68FF" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#2D68FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#2D68FF"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorUsers)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Secondary Chart - Traffic Sources */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-4 sm:p-6"
        >
          <div className="mb-4">
            <h2 className="text-xl font-bold text-white mb-1">Traffic Sources</h2>
            <p className="text-sm text-gray-400">Recent activity</p>
          </div>
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trafficSourcesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="source" 
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))'
                  }}
                />
                <Bar dataKey="visitors" fill="#00D18F" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

