"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { LuCheckCircle2, LuSend, LuShield, LuClock, LuLock } from "react-icons/lu";

const practiceCategories = [
  "Commercial & Financial",
  "Tax & Customs Duty",
  "Property & Real Estate",
  "Procurement",
  "Litigation & Dispute",
  "Other Legal Advisory",
];

export default function QuickConsultationForm() {
  const [selectedCategory, setSelectedCategory] = useState("Commercial & Financial");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    emailOrPhone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="relative w-full py-20 bg-[#0A1D37] text-white overflow-hidden" id="quick-consultation">
      {/* Background Lighting Elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#FBA832]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#085AA3]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Value Proposition & Guarantees */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FBA832]/15 border border-[#FBA832]/35 text-[#FBA832] text-xs font-semibold tracking-wider uppercase w-fit">
              <LuShield className="w-3.5 h-3.5" />
              <span>Direct Legal Access</span>
            </div>

            <h2 className="font-serif-heading text-3xl sm:text-5xl font-bold leading-tight">
              Request Your <br />
              <span className="text-gold-gradient font-serif-heading">Confidential Consultation</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans-body">
              Fill out this quick form to schedule a direct consultation with Attorney Eferem Hailemariam Bezabhe and our senior legal team.
            </p>

            {/* Guarantee Cards */}
            <div className="flex flex-col gap-3.5 pt-2">
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#0D274C]/90 border border-slate-700/80">
                <div className="p-2 rounded-lg bg-[#085AA3]/30 text-[#FBA832]">
                  <LuLock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">100% Legal Privilege & Confidentiality</h4>
                  <p className="text-xs text-slate-300">Your information is strictly protected by attorney-client privilege.</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#0D274C]/90 border border-slate-700/80">
                <div className="p-2 rounded-lg bg-[#085AA3]/30 text-[#FBA832]">
                  <LuClock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Rapid 24-Hour Response Guarantee</h4>
                  <p className="text-xs text-slate-300">Our legal team will review your case notes and get back to you within 24h.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Consultation Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="rounded-2xl p-6 sm:p-10 bg-gradient-to-b from-[#0D274C] to-[#0A1D37] border border-[#FBA832]/35 shadow-2xl backdrop-blur-2xl">
              {submitted ? (
                <div className="py-12 flex flex-col items-center text-center gap-4">
                  <div className="p-4 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                    <LuCheckCircle2 className="w-14 h-14 animate-bounce" />
                  </div>
                  <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold text-white">
                    Consultation Request Submitted!
                  </h3>
                  <p className="text-slate-300 text-sm max-w-md">
                    Thank you, <strong className="text-white">{formData.fullName || "valued client"}</strong>. Our office will review your inquiry regarding <strong className="text-[#FBA832]">{selectedCategory}</strong> and contact you promptly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ fullName: "", emailOrPhone: "", message: "" });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-lg bg-[#085AA3] hover:bg-[#FBA832] hover:text-[#0A1D37] text-white text-xs font-bold transition-all"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-serif-heading text-2xl font-bold text-white">
                      Consultation Case Intake
                    </h3>
                    <p className="text-xs text-slate-300">
                      Select your area of interest and provide contact details:
                    </p>
                  </div>

                  {/* Practice Area Selector Chips */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-slate-300">
                      Practice Area / Legal Concern
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {practiceCategories.map((cat) => {
                        const active = selectedCategory === cat;
                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                              active
                                ? "bg-[#FBA832] text-[#0A1D37] shadow-md shadow-[#FBA832]/20 font-bold"
                                : "bg-[#061528] text-slate-300 border border-slate-700 hover:border-[#FBA832]/40"
                            }`}
                          >
                            {cat}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name & Contact Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-300">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Samuel Tesfaye"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-[#061528] border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#FBA832] transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-300">
                        Phone or Email Address *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="+251 9... or email@domain.com"
                        value={formData.emailOrPhone}
                        onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-[#061528] border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#FBA832] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Case Details Message */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Brief Description of Legal Matter
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Outline key facts or questions about your legal requirement..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-[#061528] border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#FBA832] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-lg bg-[#FBA832] hover:bg-[#f99b15] text-[#0A1D37] font-bold text-base hover:shadow-[0_0_25px_rgba(251,168,50,0.5)] transition-all flex items-center justify-center gap-2 mt-1"
                  >
                    <LuSend className="w-5 h-5" />
                    <span>Submit Case Evaluation</span>
                  </button>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
