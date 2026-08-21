"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuPhone, LuMail, LuMessageSquare, LuX, LuSend, LuCheckCircle2 } from "react-icons/lu";

export default function FloatingContactBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [showQuickForm, setShowQuickForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowQuickForm(false);
      setIsOpen(false);
      setFormData({ name: "", phone: "", message: "" });
    }, 3500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Quick Contact Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="mb-4 w-80 sm:w-96 rounded-2xl bg-[#0D274C]/95 backdrop-blur-2xl border border-[#FBA832]/40 shadow-2xl p-5 text-white shadow-black/60"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-700/80 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FBA832] animate-pulse" />
                <h3 className="font-serif-heading text-lg font-bold text-[#FBA832]">
                  Quick Legal Assistance
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <LuX className="w-5 h-5" />
              </button>
            </div>

            {showQuickForm ? (
              /* Quick Call Back Form */
              <div>
                {submitted ? (
                  <div className="py-6 flex flex-col items-center text-center gap-3 text-emerald-400">
                    <LuCheckCircle2 className="w-12 h-12 animate-bounce" />
                    <h4 className="font-serif-heading text-xl font-bold text-white">
                      Request Received!
                    </h4>
                    <p className="text-xs text-slate-300">
                      Attorney Eferem & team will reach out to you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <p className="text-xs text-slate-300 mb-1">
                      Leave your details for an immediate callback:
                    </p>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#061528] border border-slate-700 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-[#FBA832]"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Phone Number (+251...)"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#061528] border border-slate-700 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-[#FBA832]"
                    />
                    <textarea
                      rows={2}
                      placeholder="Brief note about your case (optional)"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#061528] border border-slate-700 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-[#FBA832] resize-none"
                    />
                    <div className="flex gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setShowQuickForm(false)}
                        className="flex-1 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-2 rounded-lg bg-[#FBA832] text-[#0A1D37] text-xs font-bold hover:bg-[#f99b15] flex items-center justify-center gap-1.5 shadow-md shadow-[#FBA832]/20"
                      >
                        <LuSend className="w-3.5 h-3.5" />
                        <span>Request Callback</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ) : (
              /* Multi-Channel Options */
              <div className="flex flex-col gap-2.5">
                <a
                  href="tel:+251930073321"
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#061528] border border-slate-700/80 hover:border-[#FBA832]/50 hover:bg-[#085AA3]/30 transition-all group"
                >
                  <div className="p-2 rounded-lg bg-[#085AA3] text-[#FBA832] group-hover:scale-110 transition-transform">
                    <LuPhone className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">Call Principal Attorney</span>
                    <span className="text-[11px] text-[#FBA832]">+251 93007 3321</span>
                  </div>
                </a>

                <button
                  onClick={() => setShowQuickForm(true)}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#061528] border border-slate-700/80 hover:border-[#FBA832]/50 hover:bg-[#085AA3]/30 transition-all group text-left w-full"
                >
                  <div className="p-2 rounded-lg bg-[#FBA832] text-[#0A1D37] group-hover:scale-110 transition-transform">
                    <LuMessageSquare className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">Request Instant Callback</span>
                    <span className="text-[11px] text-slate-300">Fill quick 30-sec form</span>
                  </div>
                </button>

                <a
                  href="mailto:eferemh@elo-law-ethiopia.com"
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#061528] border border-slate-700/80 hover:border-[#FBA832]/50 hover:bg-[#085AA3]/30 transition-all group"
                >
                  <div className="p-2 rounded-lg bg-[#085AA3] text-white group-hover:scale-110 transition-transform">
                    <LuMail className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">Send Direct Email</span>
                    <span className="text-[11px] text-slate-300">eferemh@elo-law-ethiopia.com</span>
                  </div>
                </a>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Trigger Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative p-4 rounded-full bg-gradient-to-r from-[#FBA832] via-[#f99b15] to-[#FBA832] text-[#0A1D37] font-bold shadow-2xl shadow-[#FBA832]/50 border-2 border-white/40 flex items-center justify-center group"
        aria-label="Quick Contact Options"
      >
        {/* Pulsing ring behind button */}
        <span className="absolute -inset-1.5 rounded-full bg-[#FBA832] opacity-40 animate-ping pointer-events-none" />
        
        {isOpen ? (
          <LuX className="w-6 h-6 relative z-10" />
        ) : (
          <LuPhone className="w-6 h-6 relative z-10 animate-pulse" />
        )}
      </motion.button>
    </div>
  );
}
