"use client";

import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { CheckCircle, XCircle } from "lucide-react";

export const AdminRevenue = () => {
  // Mock subscription data
  const subscriptionData = [
    { name: "Monthly", value: 420000, color: "#2D68FF" },
    { name: "Yearly", value: 320000, color: "#00D18F" },
    { name: "Lifetime", value: 107293, color: "#8B5CF6" },
  ];

  // Mock transactions
  const transactions = [
    {
      id: 1,
      user: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
      },
      plan: "Premium Monthly",
      amount: "$49.00",
      date: "2024-12-15",
      status: "success",
    },
    {
      id: 2,
      user: {
        name: "Marcus Reynolds",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
      },
      plan: "Premium Yearly",
      amount: "$499.00",
      date: "2024-12-14",
      status: "success",
    },
    {
      id: 3,
      user: {
        name: "Alex Thompson",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
      },
      plan: "Premium Monthly",
      amount: "$49.00",
      date: "2024-12-14",
      status: "failed",
    },
    {
      id: 4,
      user: {
        name: "Priya Malhotra",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      },
      plan: "Lifetime",
      amount: "$999.00",
      date: "2024-12-13",
      status: "success",
    },
    {
      id: 5,
      user: {
        name: "John Doe",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      },
      plan: "Premium Monthly",
      amount: "$49.00",
      date: "2024-12-13",
      status: "success",
    },
  ];

  const totalRevenue = subscriptionData.reduce((sum, item) => sum + item.value, 0);

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
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Revenue Overview</h1>
        <p className="text-sm sm:text-base text-gray-400">Financial tracking and subscription analytics</p>
      </div>

      {/* Total Revenue Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6 sm:p-8"
      >
        <div className="text-center">
          <p className="text-sm sm:text-base text-gray-400 mb-2">Total Revenue</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            ${totalRevenue.toLocaleString()}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">All-time earnings</p>
        </div>
      </motion.div>

      {/* Charts and Table Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Pie Chart - Subscription Types */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-4 sm:p-6"
        >
          <div className="mb-4">
            <h2 className="text-xl font-bold text-white mb-1">Subscription Types</h2>
            <p className="text-sm text-gray-400">Revenue breakdown</p>
          </div>
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={subscriptionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {subscriptionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number | undefined) => `$${(value ?? 0).toLocaleString()}`}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {subscriptionData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-gray-400">{item.name}</span>
                </div>
                <span className="font-semibold text-white">${item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Transactions Table */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-4 sm:p-6 lg:col-span-2"
        >
          <div className="mb-4">
            <h2 className="text-xl font-bold text-white mb-1">Recent Transactions</h2>
            <p className="text-sm text-gray-400">Latest payment activity</p>
          </div>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Plan
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                      Date
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {transactions.map((transaction, idx) => (
                    <motion.tr
                      key={transaction.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + idx * 0.05 }}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <img
                            src={transaction.user.avatar}
                            alt={transaction.user.name}
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-primary/50"
                          />
                          <span className="text-sm font-semibold text-white">{transaction.user.name}</span>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-300">{transaction.plan}</span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-white">{transaction.amount}</span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-400 hidden sm:table-cell">
                        {transaction.date}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full text-xs font-bold ${
                            transaction.status === "success"
                              ? "bg-accent/20 text-accent border border-accent/50"
                              : "bg-destructive/20 text-destructive border border-destructive/50"
                          }`}
                        >
                          {transaction.status === "success" ? (
                            <>
                              <CheckCircle className="w-3 h-3" />
                              Success
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3" />
                              Failed
                            </>
                          )}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

