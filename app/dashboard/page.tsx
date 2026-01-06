"use client";

import { useState } from "react";
import { AdminDashboard } from "@/components/dashboard/admin-dashboard";
import { TraderDashboard } from "@/components/dashboard/trader-dashboard";
import { GradientBackground } from "@/components/ui/gradient-background";

export default function DashboardPage() {
  const [userRole, setUserRole] = useState<"admin" | "trader">("trader");

  const customGradients = [
    "linear-gradient(135deg, #0d1117 0%, #000814 50%, #1a2332 100%)",
    "linear-gradient(135deg, #000814 0%, #1e3a8a 50%, #00d18f 100%)",
    "linear-gradient(135deg, #1a2332 0%, #2d68ff 50%, #06b6d4 100%)",
    "linear-gradient(135deg, #0f172a 0%, #00d18f 50%, #2d68ff 100%)",
    "linear-gradient(135deg, #0d1117 0%, #000814 50%, #1a2332 100%)",
  ];

  return (
    <GradientBackground
      gradients={customGradients}
      animationDuration={12}
      overlay={true}
      overlayOpacity={0.4}
    >
      <div className="min-h-screen w-full">
        {/* Role Switcher (For Demo) */}
        <div className="fixed top-20 right-6 z-50 flex gap-2">
          <button
            onClick={() => setUserRole("trader")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
              userRole === "trader"
                ? "bg-primary text-white shadow-lg shadow-primary/50"
                : "bg-gray-800/80 text-gray-400 hover:bg-gray-700/80"
            }`}
          >
            Trader View
          </button>
          <button
            onClick={() => setUserRole("admin")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
              userRole === "admin"
                ? "bg-accent text-white shadow-lg shadow-accent/50"
                : "bg-gray-800/80 text-gray-400 hover:bg-gray-700/80"
            }`}
          >
            Admin View
          </button>
        </div>

        {userRole === "admin" ? <AdminDashboard /> : <TraderDashboard />}
      </div>
    </GradientBackground>
  );
}
