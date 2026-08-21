"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useNeonAuth } from "@/context/AuthProvider";
import { ENABLE_ADMIN_SIGNUP } from "@/lib/config";
import { motion } from "framer-motion";
import {
  LuUserPlus,
  LuUser,
  LuMail,
  LuKey,
  LuBriefcase,
  LuAlertCircle,
  LuCheckCircle,
  LuShieldCheck,
  LuArrowLeft,
  LuLock
} from "react-icons/lu";
import Link from "next/link";

export default function AdminSignupPage() {
  const router = useRouter();
  const { refreshSession } = useNeonAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Senior Partner",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; msg: string }>({
    type: null,
    msg: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, msg: "" });

    try {
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus({
          type: "success",
          msg: "Admin account created! Redirecting to dashboard...",
        });
        await refreshSession();
        setTimeout(() => {
          router.push("/admin");
        }, 1200);
      } else {
        setStatus({
          type: "error",
          msg: data.error || "Failed to create admin user. Please try again.",
        });
      }
    } catch (err) {
      setStatus({
        type: "error",
        msg: "Connection error during admin registration.",
      });
    } finally {
      setLoading(false);
    }
  };

  // If feature flag is set to false, display disabled screen
  if (!ENABLE_ADMIN_SIGNUP) {
    return (
      <div className="w-full min-h-screen bg-[#0A1D37] text-white flex flex-col items-center justify-center pt-36 sm:pt-40 pb-20 px-5 relative overflow-hidden">
        <div className="max-w-md w-full p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#0D274C] to-[#061528] border-2 border-slate-700 shadow-2xl text-center flex flex-col items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center">
            <LuLock className="w-8 h-8" />
          </div>
          
          <h1 className="font-serif-heading text-2xl font-bold">Admin Sign-Up Disabled</h1>
          
          <p className="text-slate-300 text-xs leading-relaxed">
            Initial administrator registration is currently turned off. To request workspace access credentials, contact Senior Counsel Eferem Hailemariam.
          </p>

          <Link
            href="/admin"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FBA832] text-[#0A1D37] font-bold text-xs shadow-lg transition-all hover:scale-105"
          >
            <LuArrowLeft className="w-4 h-4" />
            <span>Return to Admin Login</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#0A1D37] text-white flex flex-col items-center justify-center pt-36 sm:pt-40 pb-20 px-5 relative overflow-hidden">
      {/* Background Lighting Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#FBA832]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#085AA3]/25 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg p-8 sm:p-12 rounded-[32px] bg-gradient-to-b from-[#0D274C] via-[#081B35] to-[#061528] border-2 border-[#FBA832]/40 shadow-2xl backdrop-blur-2xl relative z-10"
      >
        <div className="flex flex-col items-center text-center gap-3 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#085AA3]/40 border border-[#FBA832]/40 text-[#FBA832] flex items-center justify-center shadow-lg">
            <LuUserPlus className="w-7 h-7" />
          </div>

          <h1 className="font-serif-heading text-2xl sm:text-4xl font-bold text-white">
            Create <span className="text-gold-gradient font-serif-heading">Admin User</span>
          </h1>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBA832]/15 border border-[#FBA832]/35 text-[#FBA832] text-[11px] font-semibold uppercase tracking-wider">
            <LuShieldCheck className="w-3.5 h-3.5" />
            <span>Neon Postgres Auth Provisioning</span>
          </div>
        </div>

        {status.type && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-xs font-medium ${
              status.type === "success"
                ? "bg-emerald-500/20 border border-emerald-500/50 text-emerald-300"
                : "bg-rose-500/20 border border-rose-500/50 text-rose-300"
            }`}
          >
            {status.type === "success" ? (
              <LuCheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
            ) : (
              <LuAlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            )}
            <span>{status.msg}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <LuUser className="w-3.5 h-3.5 text-[#FBA832]" />
              <span>Full Name *</span>
            </label>
            <input
              name="name"
              type="text"
              required
              placeholder="e.g. Eferem Hailemariam"
              className="w-full bg-[#061528] border border-slate-700/90 focus:border-[#FBA832] rounded-2xl px-6 py-4 text-sm text-white placeholder-slate-500 outline-none transition-all shadow-inner min-h-[54px]"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          {/* Email Address */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <LuMail className="w-3.5 h-3.5 text-[#FBA832]" />
              <span>Official Email Address *</span>
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="eferemh@elo-law-ethiopia.com"
              className="w-full bg-[#061528] border border-slate-700/90 focus:border-[#FBA832] rounded-2xl px-6 py-4 text-sm text-white placeholder-slate-500 outline-none transition-all shadow-inner min-h-[54px]"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <LuKey className="w-3.5 h-3.5 text-[#FBA832]" />
              <span>Secure Password *</span>
            </label>
            <input
              name="password"
              type="password"
              required
              placeholder="••••••••••••"
              className="w-full bg-[#061528] border border-slate-700/90 focus:border-[#FBA832] rounded-2xl px-6 py-4 text-sm text-white placeholder-slate-500 outline-none transition-all shadow-inner min-h-[54px]"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          {/* Role / Title */}
          <div className="flex flex-col gap-2 relative">
            <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <LuBriefcase className="w-3.5 h-3.5 text-[#FBA832]" />
              <span>Law Firm Title / Role *</span>
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full bg-[#061528] border border-slate-700/90 focus:border-[#FBA832] rounded-2xl px-6 py-4 text-sm text-white font-semibold outline-none transition-all shadow-inner cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FBA832%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_12px] bg-[right_1.5rem_center] bg-no-repeat pr-12 min-h-[54px]"
            >
              <option value="Senior Partner" className="bg-[#061528] text-white py-3 px-4">Senior Managing Partner</option>
              <option value="Associate Attorney" className="bg-[#061528] text-white py-3 px-4">Associate Attorney</option>
              <option value="Legal Counsel" className="bg-[#061528] text-white py-3 px-4">Legal Counsel</option>
              <option value="Office Admin" className="bg-[#061528] text-white py-3 px-4">Office Admin</option>
            </select>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-[#FBA832] to-[#f99b15] hover:from-[#f99b15] hover:to-[#e08905] text-[#0A1D37] font-bold text-sm shadow-xl shadow-[#FBA832]/30 flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
          >
            <LuUserPlus className="w-4 h-4" />
            <span>{loading ? "Provisioning Admin User..." : "Create Initial Admin User"}</span>
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-slate-300 hover:text-[#FBA832] transition-colors"
          >
            <LuArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Login</span>
          </Link>
          
          <span className="text-[11px]">ENABLE_ADMIN_SIGNUP = true</span>
        </div>
      </motion.div>
    </div>
  );
}
