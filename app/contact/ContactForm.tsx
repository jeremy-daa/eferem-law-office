"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuSend,
  LuCheckCircle,
  LuAlertCircle,
  LuUser,
  LuMail,
  LuPhone,
  LuFileText,
  LuBriefcase,
  LuChevronDown,
  LuShieldCheck,
  LuSparkles
} from "react-icons/lu";

export default function ContactForm() {
  const practiceCategories = [
    { title: "Corporate, Commercial & Financial", icon: "💼" },
    { title: "Construction, Engineering & Real Estate", icon: "🏗️" },
    { title: "General Litigation & Dispute Resolution", icon: "⚖️" },
    { title: "Property & Transfer of Rights", icon: "🏠" },
    { title: "Procurement & Public Tenders", icon: "📜" },
    { title: "Taxation & Custom Duty Advisory", icon: "📊" },
    { title: "Labor & Social Security Law", icon: "👥" },
    { title: "Civil Society Organizations (CSO)", icon: "🌐" },
    { title: "General Legal Advisory Consultation", icon: "⚖️" },
  ];

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: practiceCategories[0].title,
    message: "",
  });

  const [selectOpen, setSelectOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; msg: string }>({
    type: null,
    msg: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, msg: "" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus({
          type: "success",
          msg: "Your legal inquiry has been transmitted directly to Senior Counsel. We will contact you within 24 hours.",
        });
        setForm({
          name: "",
          email: "",
          phone: "",
          subject: practiceCategories[0].title,
          message: "",
        });
      } else {
        setStatus({
          type: "error",
          msg: "Unable to transmit message. Please call us directly at +251 91164 3741.",
        });
      }
    } catch (err) {
      setStatus({
        type: "error",
        msg: "Connection issue. Please call +251 91164 3741 or email eferemh@elo-law-ethiopia.com.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full py-20 bg-[#0A1D37] text-white overflow-hidden">
      
      {/* Background Lighting Glows */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-[#085AA3]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-[500px] h-[500px] bg-[#FBA832]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        {/* Luxury Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-[36px] bg-gradient-to-b from-[#0D274C] via-[#081B35] to-[#061528] border-2 border-[#FBA832]/40 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] p-8 sm:p-12 lg:p-16 backdrop-blur-2xl relative overflow-hidden"
        >
          {/* Subtle Top Gold Highlight Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#FBA832] to-transparent" />

          {/* Form Header */}
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-3.5 mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FBA832]/15 border border-[#FBA832]/40 text-[#FBA832] text-xs font-semibold uppercase tracking-widest shadow-inner">
              <LuShieldCheck className="w-4 h-4" />
              <span>Strict Lawyer-Client Privilege Encrypted</span>
            </div>
            
            <h2 className="font-serif-heading text-3xl sm:text-5xl font-bold leading-tight tracking-tight">
              Request a Legal <span className="text-gold-gradient font-serif-heading">Consultation</span>
            </h2>
            
            <p className="text-slate-300 text-sm sm:text-base font-sans-body leading-relaxed max-w-xl">
              Fill out the confidential form below. Our principal attorneys analyze every case inquiry thoroughly before scheduling your advisory session.
            </p>
          </div>

          {/* Practice Area Fast-Select Chips */}
          <div className="mb-10 flex flex-col gap-3">
            <span className="text-xs uppercase tracking-wider text-[#FBA832] font-semibold flex items-center justify-center gap-1.5">
              <LuSparkles className="w-3.5 h-3.5" />
              <span>Select Category Concern</span>
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
              {practiceCategories.slice(0, 5).map((cat, idx) => {
                const isSelected = form.subject === cat.title;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setForm({ ...form, subject: cat.title })}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-300 flex items-center gap-2 ${
                      isSelected
                        ? "bg-[#FBA832] text-[#0A1D37] font-bold shadow-lg shadow-[#FBA832]/30 scale-105"
                        : "bg-[#061528]/80 text-slate-300 hover:text-white hover:bg-[#085AA3]/40 border border-slate-700/80"
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.title.split(",")[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Form Fields */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            
            {/* Input Row 1: Full Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              
              {/* Full Name */}
              <div className="flex flex-col gap-2.5">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <LuUser className="w-4 h-4 text-[#FBA832]" />
                  <span>Full Name *</span>
                </label>
                <div className="relative">
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Ato Abebe Bikila / Corporate Executive"
                    className="w-full bg-[#061528]/90 border border-slate-700/90 focus:border-[#FBA832] focus:ring-2 focus:ring-[#FBA832]/20 rounded-2xl px-5 py-4 text-sm text-white placeholder-slate-500 outline-none transition-all duration-300 shadow-inner"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="flex flex-col gap-2.5">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <LuMail className="w-4 h-4 text-[#FBA832]" />
                  <span>Email Address *</span>
                </label>
                <div className="relative">
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="name@company.com"
                    className="w-full bg-[#061528]/90 border border-slate-700/90 focus:border-[#FBA832] focus:ring-2 focus:ring-[#FBA832]/20 rounded-2xl px-5 py-4 text-sm text-white placeholder-slate-500 outline-none transition-all duration-300 shadow-inner"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

            </div>

            {/* Input Row 2: Phone & Custom Padded Select Dropdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              
              {/* Phone Number */}
              <div className="flex flex-col gap-2.5">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <LuPhone className="w-4 h-4 text-[#FBA832]" />
                  <span>Phone Number *</span>
                </label>
                <div className="relative">
                  <input
                    name="phone"
                    type="tel"
                    required
                    placeholder="+251 911 000 000"
                    className="w-full bg-[#061528]/90 border border-slate-700/90 focus:border-[#FBA832] focus:ring-2 focus:ring-[#FBA832]/20 rounded-2xl px-5 py-4 text-sm text-white placeholder-slate-500 outline-none transition-all duration-300 shadow-inner"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Sexy Custom Padded Dropdown Selector */}
              <div className="flex flex-col gap-2.5 relative">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <LuBriefcase className="w-4 h-4 text-[#FBA832]" />
                  <span>Target Practice Area *</span>
                </label>
                
                {/* Trigger Button */}
                <button
                  type="button"
                  onClick={() => setSelectOpen(!selectOpen)}
                  className="w-full bg-[#061528]/90 border border-slate-700/90 hover:border-[#FBA832]/60 focus:border-[#FBA832] focus:ring-2 focus:ring-[#FBA832]/20 rounded-2xl px-5 py-4 text-sm text-white flex items-center justify-between transition-all duration-300 shadow-inner"
                >
                  <span className="truncate font-semibold text-[#FBA832]">
                    {form.subject}
                  </span>
                  <LuChevronDown
                    className={`w-5 h-5 text-[#FBA832] transition-transform duration-300 ${
                      selectOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Animated Dropdown Menu with Generous Item Padding */}
                <AnimatePresence>
                  {selectOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 right-0 mt-2 z-50 p-3 rounded-2xl bg-[#061528] border-2 border-[#FBA832]/50 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col gap-1.5 max-h-72 overflow-y-auto backdrop-blur-2xl"
                    >
                      {practiceCategories.map((cat, idx) => {
                        const isSelected = form.subject === cat.title;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setForm({ ...form, subject: cat.title });
                              setSelectOpen(false);
                            }}
                            className={`w-full p-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-between text-left transition-all duration-200 ${
                              isSelected
                                ? "bg-[#FBA832] text-[#0A1D37] font-bold shadow-md"
                                : "bg-[#0D274C]/60 text-slate-200 hover:bg-[#085AA3]/50 hover:text-white border border-slate-800"
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <span className="text-base">{cat.icon}</span>
                              <span className="truncate">{cat.title}</span>
                            </div>
                            {isSelected && <LuCheckCircle className="w-4 h-4 shrink-0 text-[#0A1D37]" />}
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

            {/* Case Summary Textarea */}
            <div className="flex flex-col gap-2.5">
              <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <LuFileText className="w-4 h-4 text-[#FBA832]" />
                <span>Detailed Case Summary & Legal Objectives *</span>
              </label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Describe your legal matter, commercial deal structure, litigation dispute, or timeline requirements..."
                className="w-full bg-[#061528]/90 border border-slate-700/90 focus:border-[#FBA832] focus:ring-2 focus:ring-[#FBA832]/20 rounded-2xl p-5 text-sm text-white placeholder-slate-500 outline-none transition-all duration-300 resize-none shadow-inner leading-relaxed"
                value={form.message}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Status Alert */}
            {status.type && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-2xl flex items-center gap-3 text-sm font-medium ${
                  status.type === "success"
                    ? "bg-emerald-500/20 border border-emerald-500/50 text-emerald-300"
                    : "bg-rose-500/20 border border-rose-500/50 text-rose-300"
                }`}
              >
                {status.type === "success" ? (
                  <LuCheckCircle className="w-5 h-5 shrink-0 text-emerald-400" />
                ) : (
                  <LuAlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
                )}
                <span>{status.msg}</span>
              </motion.div>
            )}

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <p className="text-xs text-slate-400 font-sans-body">
                By submitting, you agree to encrypted communication with Eferem Law Office.
              </p>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-[#FBA832] to-[#f99b15] hover:from-[#f99b15] hover:to-[#e08905] text-[#0A1D37] font-bold text-sm sm:text-base shadow-xl shadow-[#FBA832]/30 flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                <LuSend className="w-5 h-5" />
                <span>{loading ? "Transmitting Inquire..." : "Submit Consultation Request"}</span>
              </button>
            </div>

          </form>

        </motion.div>

      </div>
    </section>
  );
}


