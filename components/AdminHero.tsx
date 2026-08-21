"use client";
import React from "react";
import Image from "next/image";
import { useNeonAuth } from "@/context/AuthProvider";
import { LuLogOut, LuShieldCheck } from "react-icons/lu";

const AdminHero = ({ title }: { title: string }) => {
  const { user, signOut } = useNeonAuth();
  const firstName = user?.name ? user.name.split(" ")[0] : "Admin";

  return (
    <div className="w-full relative min-h-[280px] bg-[#061528] pt-32 pb-16 px-5 sm:px-8 border-b border-[#FBA832]/30 text-white overflow-hidden shadow-2xl flex flex-col items-center justify-center">
      {/* Background Graphic */}
      <Image
        src="/images/home/hero/justice-2.jpg"
        alt="Hero Background"
        fill
        className="object-cover object-center filter brightness-[20%] contrast-125 -z-10"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#061528] via-[#0A1D37]/90 to-[#061528] -z-10" />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FBA832]/15 border border-[#FBA832]/40 text-[#FBA832] text-xs font-semibold uppercase tracking-wider">
          <LuShieldCheck className="w-4 h-4" />
          <span>Neon Managed Auth Protected Workspace</span>
        </div>

        <h1 className="font-serif-heading text-3xl sm:text-5xl font-bold tracking-tight">
          Welcome Back, <span className="text-gold-gradient font-serif-heading">{firstName}</span>
        </h1>

        <p className="text-slate-300 text-xs sm:text-sm font-sans-body max-w-lg">
          Logged in as <span className="text-[#FBA832] font-semibold">{user?.email || "admin@elo.com"}</span> (Postgres 18 & Neon S3 Storage)
        </p>

        <button
          onClick={() => signOut()}
          className="mt-2 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-xs font-bold transition-all shadow-md"
        >
          <LuLogOut className="w-4 h-4" />
          <span>Sign Out of Dashboard</span>
        </button>
      </div>
    </div>
  );
};

export default AdminHero;
