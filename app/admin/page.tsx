"use client";

import React from "react";
import { useNeonAuth } from "@/context/AuthProvider";
import AdminHero from "@/components/AdminHero";
import AdminDashboard from "@/components/AdminDashboard";
import AdminLogin from "@/components/AdminLogin";
import { LuLoader } from "react-icons/lu";

export default function AdminPage() {
  const { user, loading } = useNeonAuth();

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#0A1D37] text-white flex flex-col items-center justify-center gap-4">
        <LuLoader className="w-8 h-8 text-[#FBA832] animate-spin" />
        <span className="text-xs uppercase tracking-wider text-[#FBA832] font-semibold">
          Verifying Neon Managed Auth Session...
        </span>
      </div>
    );
  }

  // If user is not authenticated, prompt with Admin Login Screen
  if (!user) {
    return <AdminLogin />;
  }

  // Authenticated Admin Workspace
  return (
    <div className="w-full min-h-screen relative bg-[#0A1D37]">
      <AdminHero title="Admin Dashboard" />
      <AdminDashboard />
    </div>
  );
}
