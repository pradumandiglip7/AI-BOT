"use client";

import { useState } from "react";
import { AdminDashboard } from "@/components/dashboard/admin-dashboard";
import { TraderDashboard } from "@/components/dashboard/trader-dashboard";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

export default function DashboardPage() {
  const [userRole, setUserRole] = useState<"admin" | "trader">("trader");

  return (
    <BackgroundGradientAnimation
      gradientBackgroundStart="rgb(13, 17, 23)"
      gradientBackgroundEnd="rgb(0, 8, 20)"
      firstColor="45, 104, 255"
      secondColor="0, 209, 143"
      thirdColor="100, 149, 237"
      fourthColor="30, 64, 175"
      fifthColor="6, 182, 212"
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
    </BackgroundGradientAnimation>
  );
}
