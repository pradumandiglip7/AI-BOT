"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TraderDashboard } from "../../components/dashboard/trader-dashboard";
import {
  User,
  Lock,
  Bell,
  Settings,
  Code,
  Palette,
  Upload,
  Eye,
  EyeOff,
  Copy,
  Trash2,
  LogOut,
  Moon,
  Sun,
  Check,
  X,
} from "lucide-react";

type Section = "profile" | "security" | "notifications" | "trading" | "api" | "appearance";

type Toast = {
  id: string;
  message: string;
  type: "success" | "error" | "info";
};

export default function SettingsPage() {
  return <TraderDashboard initialActiveTab="settings" />;
}

const ProfileSection = ({ addToast, theme }: { addToast: (msg: string, type?: string) => void; theme: string }) => {
  const [profile, setProfile] = useState({ name: "Alex Thompson", email: "alex@trading.com", phone: "+1 234-567-8900", timezone: "UTC-5" });

  const handleSave = () => {
    addToast("Profile updated successfully!", "success");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Profile Settings</h2>
        <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>Manage your account information</p>
      </div>

      <div className={`p-6 rounded-xl border ${theme === "dark" ? "border-gray-800 bg-white/5 backdrop-blur" : "border-gray-200 bg-gray-50"}`}>
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-3">Profile Picture</label>
          <div className="flex items-center gap-4">
            <div className={`w-24 h-24 rounded-full ${theme === "dark" ? "bg-gradient-to-br from-blue-500 to-purple-500" : "bg-blue-200"} flex items-center justify-center text-4xl font-bold`}>
              AT
            </div>
            <button className={`px-4 py-2 rounded-lg flex items-center gap-2 ${theme === "dark" ? "bg-white/10 hover:bg-white/15" : "bg-gray-200 hover:bg-gray-300"}`}>
              <Upload className="w-4 h-4" /> Upload Picture
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Full Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
              className={`w-full px-4 py-2 rounded-lg border ${theme === "dark" ? "bg-white/5 border-gray-700" : "bg-white border-gray-300"}`}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
              className={`w-full px-4 py-2 rounded-lg border ${theme === "dark" ? "bg-white/5 border-gray-700" : "bg-white border-gray-300"}`}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Phone</label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
              className={`w-full px-4 py-2 rounded-lg border ${theme === "dark" ? "bg-white/5 border-gray-700" : "bg-white border-gray-300"}`}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Timezone</label>
            <select className={`w-full px-4 py-2 rounded-lg border ${theme === "dark" ? "bg-white/5 border-gray-700" : "bg-white border-gray-300"}`}>
              <option>UTC-5 (EST)</option>
              <option>UTC-6 (CST)</option>
              <option>UTC-7 (MST)</option>
              <option>UTC-8 (PST)</option>
              <option>UTC+0 (GMT)</option>
              <option>UTC+1 (CET)</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSave}
            className={`px-6 py-2 rounded-lg font-semibold ${theme === "dark" ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-600 hover:bg-blue-700"} text-white`}
          >
            Save Changes
          </button>
          <button className={`px-6 py-2 rounded-lg font-semibold ${theme === "dark" ? "bg-white/10 hover:bg-white/15" : "bg-gray-200 hover:bg-gray-300"}`}>
            Cancel
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const SecuritySection = ({ addToast, theme }: { addToast: (msg: string, type?: string) => void; theme: string }) => {
  const [password, setPassword] = useState({ current: "", new: "", confirm: "" });
  const [show2FA, setShow2FA] = useState(false);
  const [twoFA, setTwoFA] = useState(false);

  const handleChangePassword = () => {
    if (password.new !== password.confirm) {
      addToast("Passwords do not match!", "error");
      return;
    }
    addToast("Password changed successfully!", "success");
    setPassword({ current: "", new: "", confirm: "" });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Security Settings</h2>
        <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>Manage your account security</p>
      </div>

      <div className={`p-6 rounded-xl border ${theme === "dark" ? "border-gray-800 bg-white/5 backdrop-blur" : "border-gray-200 bg-gray-50"}`}>
        <h3 className="text-xl font-semibold mb-4">Change Password</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Current Password</label>
            <input
              type="password"
              value={password.current}
              onChange={(e) => setPassword((p) => ({ ...p, current: e.target.value }))}
              className={`w-full px-4 py-2 rounded-lg border ${theme === "dark" ? "bg-white/5 border-gray-700" : "bg-white border-gray-300"}`}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">New Password</label>
            <input
              type="password"
              value={password.new}
              onChange={(e) => setPassword((p) => ({ ...p, new: e.target.value }))}
              className={`w-full px-4 py-2 rounded-lg border ${theme === "dark" ? "bg-white/5 border-gray-700" : "bg-white border-gray-300"}`}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Confirm Password</label>
            <input
              type="password"
              value={password.confirm}
              onChange={(e) => setPassword((p) => ({ ...p, confirm: e.target.value }))}
              className={`w-full px-4 py-2 rounded-lg border ${theme === "dark" ? "bg-white/5 border-gray-700" : "bg-white border-gray-300"}`}
            />
          </div>

          <button
            onClick={handleChangePassword}
            className={`px-6 py-2 rounded-lg font-semibold ${theme === "dark" ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-600 hover:bg-blue-700"} text-white`}
          >
            Update Password
          </button>
        </div>
      </div>

      <div className={`p-6 rounded-xl border ${theme === "dark" ? "border-gray-800 bg-white/5 backdrop-blur" : "border-gray-200 bg-gray-50"}`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold">Two-Factor Authentication</h3>
            <p className={theme === "dark" ? "text-sm text-gray-400" : "text-sm text-gray-600"}>Add extra security to your account</p>
          </div>
          <button
            onClick={() => setTwoFA(!twoFA)}
            className={`relative w-14 h-8 rounded-full transition ${twoFA ? "bg-emerald-500" : theme === "dark" ? "bg-gray-700" : "bg-gray-300"}`}
          >
            <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition ${twoFA ? "right-1" : "left-1"}`} />
          </button>
        </div>

        {twoFA && (
          <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-emerald-500/10 border border-emerald-500/30" : "bg-emerald-50 border border-emerald-200"}`}>
            <p className="text-sm mb-3">Scan this QR code with your authenticator app:</p>
            <div className={`w-32 h-32 rounded-lg ${theme === "dark" ? "bg-white" : "bg-white"} mb-3`}>
              {/* QR Code placeholder */}
            </div>
            <p className="text-xs text-gray-400 mb-3">Or enter this code manually: JBSWY3DPEBLW64TMMQ</p>
            <button className={`px-4 py-2 rounded-lg text-sm font-semibold ${theme === "dark" ? "bg-white/10 hover:bg-white/15" : "bg-gray-200 hover:bg-gray-300"}`}>
              Verify & Enable
            </button>
          </div>
        )}
      </div>

      <div className={`p-6 rounded-xl border ${theme === "dark" ? "border-gray-800 bg-white/5 backdrop-blur" : "border-gray-200 bg-gray-50"}`}>
        <h3 className="text-xl font-semibold mb-4">Active Sessions</h3>
        <div className="space-y-3">
          {[
            { device: "Chrome on Windows", location: "New York, USA", time: "Now" },
            { device: "Safari on iPhone", location: "New York, USA", time: "2 hours ago" },
          ].map((session, idx) => (
            <div key={idx} className={`flex items-center justify-between p-3 rounded-lg ${theme === "dark" ? "bg-white/3" : "bg-gray-100"}`}>
              <div>
                <div className="font-semibold">{session.device}</div>
                <div className="text-sm text-gray-400">{session.location} • {session.time}</div>
              </div>
              <button className={`px-3 py-1 rounded text-sm flex items-center gap-2 ${theme === "dark" ? "hover:bg-red-500/20 text-red-400" : "hover:bg-red-50 text-red-600"}`}>
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const NotificationsSection = ({ addToast, theme }: { addToast: (msg: string, type?: string) => void; theme: string }) => {
  const [prefs, setPrefs] = useState({
    emailAlerts: true,
    pushNotifications: true,
    priceAlerts: true,
    orderUpdates: true,
    weeklyReport: false,
  });

  const handleSave = () => {
    addToast("Notification preferences saved!", "success");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Notification Settings</h2>
        <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>Manage how you receive updates</p>
      </div>

      <div className={`p-6 rounded-xl border ${theme === "dark" ? "border-gray-800 bg-white/5 backdrop-blur" : "border-gray-200 bg-gray-50"}`}>
        <div className="space-y-4">
          {[
            { key: "emailAlerts", label: "Email Alerts", desc: "Receive email notifications for important events" },
            { key: "pushNotifications", label: "Push Notifications", desc: "Get real-time push notifications" },
            { key: "priceAlerts", label: "Price Alerts", desc: "Notify when prices reach your targets" },
            { key: "orderUpdates", label: "Order Updates", desc: "Get notified when your orders execute" },
            { key: "weeklyReport", label: "Weekly Report", desc: "Receive weekly trading summary" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 rounded-lg hover:bg-white/3 transition">
              <div>
                <div className="font-semibold">{item.label}</div>
                <div className="text-sm text-gray-400">{item.desc}</div>
              </div>
              <button
                onClick={() => setPrefs((p) => ({ ...p, [item.key]: !p[item.key as keyof typeof p] }))}
                className={`relative w-14 h-8 rounded-full transition ${prefs[item.key as keyof typeof prefs] ? "bg-emerald-500" : theme === "dark" ? "bg-gray-700" : "bg-gray-300"}`}
              >
                <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition ${prefs[item.key as keyof typeof prefs] ? "right-1" : "left-1"}`} />
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSave}
            className={`px-6 py-2 rounded-lg font-semibold ${theme === "dark" ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-600 hover:bg-blue-700"} text-white`}
          >
            Save Preferences
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const TradingSection = ({ addToast, theme }: { addToast: (msg: string, type?: string) => void; theme: string }) => {
  const [settings, setSettings] = useState({
    orderType: "limit",
    riskLevel: "medium",
    stopLoss: "2",
    takeProfit: "5",
  });

  const handleSave = () => {
    addToast("Trading settings updated!", "success");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Trading Settings</h2>
        <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>Configure your trading defaults</p>
      </div>

      <div className={`p-6 rounded-xl border ${theme === "dark" ? "border-gray-800 bg-white/5 backdrop-blur" : "border-gray-200 bg-gray-50"}`}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Default Order Type</label>
            <select
              value={settings.orderType}
              onChange={(e) => setSettings((s) => ({ ...s, orderType: e.target.value }))}
              className={`w-full px-4 py-2 rounded-lg border ${theme === "dark" ? "bg-white/5 border-gray-700" : "bg-white border-gray-300"}`}
            >
              <option value="market">Market Order</option>
              <option value="limit">Limit Order</option>
              <option value="stop">Stop Order</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Risk Level</label>
            <select
              value={settings.riskLevel}
              onChange={(e) => setSettings((s) => ({ ...s, riskLevel: e.target.value }))}
              className={`w-full px-4 py-2 rounded-lg border ${theme === "dark" ? "bg-white/5 border-gray-700" : "bg-white border-gray-300"}`}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Auto Stop-Loss (%)</label>
            <input
              type="number"
              value={settings.stopLoss}
              onChange={(e) => setSettings((s) => ({ ...s, stopLoss: e.target.value }))}
              className={`w-full px-4 py-2 rounded-lg border ${theme === "dark" ? "bg-white/5 border-gray-700" : "bg-white border-gray-300"}`}
              placeholder="2"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Auto Take Profit (%)</label>
            <input
              type="number"
              value={settings.takeProfit}
              onChange={(e) => setSettings((s) => ({ ...s, takeProfit: e.target.value }))}
              className={`w-full px-4 py-2 rounded-lg border ${theme === "dark" ? "bg-white/5 border-gray-700" : "bg-white border-gray-300"}`}
              placeholder="5"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSave}
            className={`px-6 py-2 rounded-lg font-semibold ${theme === "dark" ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-600 hover:bg-blue-700"} text-white`}
          >
            Save Settings
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const ApiSection = ({ addToast, theme }: { addToast: (msg: string, type?: string) => void; theme: string }) => {
  const [keys, setKeys] = useState([
    { id: "key1", name: "Main API Key", key: "sk_live_abc...xyz", created: "2024-01-15", lastUsed: "2 hours ago" },
    { id: "key2", name: "Testing Key", key: "sk_test_123...456", created: "2024-02-20", lastUsed: "Never" },
  ]);

  const handleGenerate = () => {
    addToast("New API key generated!", "success");
  };

  const handleRevoke = (id: string) => {
    setKeys((k) => k.filter((x) => x.id !== id));
    addToast("API key revoked successfully!", "success");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">API Settings</h2>
          <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>Manage your API keys</p>
        </div>
        <button
          onClick={handleGenerate}
          className={`px-6 py-2 rounded-lg font-semibold ${theme === "dark" ? "bg-emerald-500 hover:bg-emerald-600" : "bg-emerald-600 hover:bg-emerald-700"} text-white`}
        >
          + Generate Key
        </button>
      </div>

      <div className={`p-6 rounded-xl border ${theme === "dark" ? "border-gray-800 bg-white/5 backdrop-blur" : "border-gray-200 bg-gray-50"}`}>
        <div className="space-y-4">
          {keys.map((k) => (
            <div key={k.id} className={`p-4 rounded-lg ${theme === "dark" ? "bg-white/3 border border-white/6" : "bg-white border border-gray-200"}`}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="font-semibold">{k.name}</div>
                  <div className="text-sm text-gray-400">Created: {k.created}</div>
                </div>
                <button
                  onClick={() => handleRevoke(k.id)}
                  className={`px-3 py-1 rounded text-sm flex items-center gap-2 ${theme === "dark" ? "hover:bg-red-500/20 text-red-400" : "hover:bg-red-50 text-red-600"}`}
                >
                  <Trash2 className="w-4 h-4" /> Revoke
                </button>
              </div>

              <div className="flex items-center gap-2 bg-black/20 rounded px-3 py-2 font-mono text-sm">
                <span>{k.key}</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(k.key);
                    addToast("API key copied!", "info");
                  }}
                  className="ml-auto hover:opacity-70"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs text-gray-400 mt-2">Last used: {k.lastUsed}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const AppearanceSection = ({ addToast, theme, setTheme }: { addToast: (msg: string, type?: string) => void; theme: string; setTheme: (t: string) => void }) => {
  const [settings, setSettings] = useState({
    theme: theme,
    chartColors: "default",
    compactMode: false,
  });

  const handleSave = () => {
    setTheme(settings.theme);
    addToast("Appearance settings updated!", "success");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Appearance Settings</h2>
        <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>Customize your interface</p>
      </div>

      <div className={`p-6 rounded-xl border ${theme === "dark" ? "border-gray-800 bg-white/5 backdrop-blur" : "border-gray-200 bg-gray-50"}`}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-3">Theme</label>
            <div className="flex gap-4">
              {[
                { id: "dark", label: "Dark", icon: Moon },
                { id: "light", label: "Light", icon: Sun },
              ].map((t) => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    onClick={() => setSettings((s) => ({ ...s, theme: t.id }))}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
                      settings.theme === t.id
                        ? theme === "dark"
                          ? "border-blue-500 bg-blue-500/20"
                          : "border-blue-600 bg-blue-50"
                        : theme === "dark"
                        ? "border-gray-700 hover:border-gray-600"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Chart Color Scheme</label>
            <select
              value={settings.chartColors}
              onChange={(e) => setSettings((s) => ({ ...s, chartColors: e.target.value }))}
              className={`w-full px-4 py-2 rounded-lg border ${theme === "dark" ? "bg-white/5 border-gray-700" : "bg-white border-gray-300"}`}
            >
              <option value="default">Default (Green/Red)</option>
              <option value="blue">Blue Theme</option>
              <option value="purple">Purple Theme</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg hover:bg-white/3 transition">
            <div>
              <div className="font-semibold">Compact Mode</div>
              <div className="text-sm text-gray-400">Reduce padding and spacing</div>
            </div>
            <button
              onClick={() => setSettings((s) => ({ ...s, compactMode: !s.compactMode }))}
              className={`relative w-14 h-8 rounded-full transition ${settings.compactMode ? "bg-emerald-500" : theme === "dark" ? "bg-gray-700" : "bg-gray-300"}`}
            >
              <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition ${settings.compactMode ? "right-1" : "left-1"}`} />
            </button>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSave}
            className={`px-6 py-2 rounded-lg font-semibold ${theme === "dark" ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-600 hover:bg-blue-700"} text-white`}
          >
            Save Changes
          </button>
        </div>
      </div>
    </motion.div>
  );
};
