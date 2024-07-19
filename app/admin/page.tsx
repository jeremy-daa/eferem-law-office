import AdminDashboard from "@/components/AdminDashboard";
import AdminHero from "@/components/AdminHero";
import React from "react";

const page = () => {
  return (
    <div className="w-full min-h-screen relative">
      <AdminHero title="Admin Dashboard" />
      <AdminDashboard />
    </div>
  );
};

export default page;
