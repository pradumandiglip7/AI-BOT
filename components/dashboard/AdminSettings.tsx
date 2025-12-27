"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Save, Lock, Eye, EyeOff } from "lucide-react";

export const AdminSettings = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [pauseRegistrations, setPauseRegistrations] = useState(false);
  const [signalDelay, setSignalDelay] = useState(5);
  const [riskMultiplier, setRiskMultiplier] = useState(1.5);
  const [telegramToken, setTelegramToken] = useState("1234567890:ABCdefGHIjklMNOpqrsTUVwxyz");
  const [openaiKey, setOpenaiKey] = useState("sk-...");
  const [showTelegramToken, setShowTelegramToken] = useState(false);
  const [showOpenaiKey, setShowOpenaiKey] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    // In a real app, you'd show a success toast here
  };

  const maskValue = (value: string) => {
    if (value.length <= 8) return "•".repeat(value.length);
    return value.substring(0, 4) + "•".repeat(value.length - 8) + value.substring(value.length - 4);
  };

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
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Platform Settings</h1>
        <p className="text-sm sm:text-base text-gray-400">Configure system-wide settings and integrations</p>
      </div>

      {/* Global Controls */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-4 sm:p-6"
      >
        <h2 className="text-xl font-bold text-white mb-4">Global Controls</h2>
        <div className="space-y-4">
          {/* Maintenance Mode */}
          <div className="flex items-center justify-between p-4 bg-background/30 border border-border rounded-lg">
            <div>
              <h3 className="text-base font-semibold text-white mb-1">Maintenance Mode</h3>
              <p className="text-sm text-gray-400">
                Temporarily disable platform access for all users
              </p>
            </div>
            <button
              onClick={() => setMaintenanceMode(!maintenanceMode)}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                maintenanceMode ? "bg-accent" : "bg-gray-600"
              }`}
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  maintenanceMode ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Pause New Registrations */}
          <div className="flex items-center justify-between p-4 bg-background/30 border border-border rounded-lg">
            <div>
              <h3 className="text-base font-semibold text-white mb-1">Pause New Registrations</h3>
              <p className="text-sm text-gray-400">
                Stop accepting new user registrations
              </p>
            </div>
            <button
              onClick={() => setPauseRegistrations(!pauseRegistrations)}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                pauseRegistrations ? "bg-accent" : "bg-gray-600"
              }`}
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  pauseRegistrations ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Signal Configuration */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-4 sm:p-6"
      >
        <h2 className="text-xl font-bold text-white mb-4">Signal Configuration</h2>
        <div className="space-y-6">
          {/* Signal Broadcast Delay */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-base font-semibold text-white">
                Signal Broadcast Delay
              </label>
              <span className="text-sm font-bold text-primary">{signalDelay}s</span>
            </div>
            <p className="text-sm text-gray-400 mb-3">
              Delay between signal generation and broadcast to users
            </p>
            <input
              type="range"
              min="0"
              max="30"
              step="1"
              value={signalDelay}
              onChange={(e) => setSignalDelay(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0s</span>
              <span>30s</span>
            </div>
          </div>

          {/* Risk Multiplier */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-base font-semibold text-white">
                Risk Multiplier
              </label>
              <span className="text-sm font-bold text-primary">{riskMultiplier}x</span>
            </div>
            <p className="text-sm text-gray-400 mb-3">
              Multiplier applied to default risk calculations
            </p>
            <input
              type="range"
              min="0.5"
              max="3.0"
              step="0.1"
              value={riskMultiplier}
              onChange={(e) => setRiskMultiplier(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0.5x</span>
              <span>3.0x</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* API Keys */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-4 sm:p-6"
      >
        <h2 className="text-xl font-bold text-white mb-4">API Keys</h2>
        <div className="space-y-4">
          {/* Telegram Bot Token */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Telegram Bot Token
            </label>
            <div className="relative">
              <input
                type={showTelegramToken ? "text" : "password"}
                value={showTelegramToken ? telegramToken : maskValue(telegramToken)}
                onChange={(e) => setTelegramToken(e.target.value)}
                className="w-full px-4 py-2 pr-12 bg-background/50 border border-border rounded-lg text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter Telegram Bot Token"
              />
              <button
                onClick={() => setShowTelegramToken(!showTelegramToken)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showTelegramToken ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Used for Telegram bot integration</p>
          </div>

          {/* OpenAI API Key */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              OpenAI API Key
            </label>
            <div className="relative">
              <input
                type={showOpenaiKey ? "text" : "password"}
                value={showOpenaiKey ? openaiKey : maskValue(openaiKey)}
                onChange={(e) => setOpenaiKey(e.target.value)}
                className="w-full px-4 py-2 pr-12 bg-background/50 border border-border rounded-lg text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter OpenAI API Key"
              />
              <button
                onClick={() => setShowOpenaiKey(!showOpenaiKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showOpenaiKey ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Used for AI signal generation</p>
          </div>
        </div>
      </motion.div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex justify-end"
      >
        <motion.button
          onClick={handleSave}
          disabled={saving}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary via-accent to-primary text-white font-bold rounded-lg shadow-lg shadow-primary/50 hover:shadow-xl hover:shadow-primary/70 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed glow-primary"
        >
          <Save className="w-5 h-5" />
          {saving ? "Saving..." : "Save Changes"}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

