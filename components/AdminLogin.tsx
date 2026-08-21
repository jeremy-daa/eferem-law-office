"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useNeonAuth } from "@/context/AuthProvider";
import { motion } from "framer-motion";
import { LuLock, LuUser, LuKey, LuAlertCircle, LuShieldCheck } from "react-icons/lu";

export default function AdminLogin() {
  const { signIn } = useNeonAuth();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn(identifier, password);
    if (!res.success) {
      setError(res.error || "Authentication failed. Please check credentials.");
    }
    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen bg-[#0A1D37] text-white flex flex-col items-center justify-center pt-36 sm:pt-40 pb-20 px-5 relative overflow-hidden">
      {/* Ambient Lighting */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#FBA832]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#085AA3]/20 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#0D274C] to-[#061528] border-2 border-[#FBA832]/40 shadow-2xl backdrop-blur-xl relative z-10"
      >
        <div className="flex flex-col items-center text-center gap-3 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#085AA3]/40 border border-[#FBA832]/40 text-[#FBA832] flex items-center justify-center shadow-lg">
            <LuLock className="w-7 h-7" />
          </div>
          
          <h1 className="font-serif-heading text-2xl sm:text-3xl font-bold text-white">
            Admin <span className="text-gold-gradient font-serif-heading">Workspace</span>
          </h1>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#085AA3]/30 border border-[#FBA832]/30 text-[#FBA832] text-[11px] font-semibold uppercase tracking-wider">
            <LuShieldCheck className="w-3.5 h-3.5" />
            <span>Neon Managed Auth Protected</span>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-medium flex items-center gap-2">
            <LuAlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <LuUser className="w-3.5 h-3.5 text-[#FBA832]" />
              <span>Username / Admin Email</span>
            </label>
            <input
              type="text"
              required
              placeholder="admin@elo.com"
              className="w-full bg-[#061528] border border-slate-700/80 focus:border-[#FBA832] rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 outline-none transition-all"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <LuKey className="w-3.5 h-3.5 text-[#FBA832]" />
              <span>Password</span>
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full bg-[#061528] border border-slate-700/80 focus:border-[#FBA832] rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 mt-3 rounded-xl bg-[#FBA832] hover:bg-[#f99b15] text-[#0A1D37] font-bold text-sm shadow-xl shadow-[#FBA832]/25 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
          >
            {loading ? "Authenticating with Neon..." : "Sign In to Admin Workspace"}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Eferem Law Office</span>
          <span className="text-slate-500 font-medium text-[11px]">Protected Portal</span>
        </div>
      </motion.div>
    </div>
  );
}
