"use client";
import React from "react";
import { motion } from "framer-motion";
import { LuEye, LuTarget, LuCheckCircle2 } from "react-icons/lu";

const missionPillars = [
  "Deliver the highest standards of legal counsel while adhering to strict ethical and professional norms.",
  "Exceed client expectations by providing practical, innovative, and cost-effective legal solutions.",
  "Earn absolute client trust by simplifying complex law and achieving successful case outcomes.",
  "Prioritize client objectives within a collaborative, team-oriented legal environment.",
];

export default function VisMis() {
  return (
    <section className="relative w-full py-20 bg-[#061528] text-white overflow-hidden">
      {/* Ambient Lighting */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#FBA832]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto flex flex-col items-center gap-3.5 mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FBA832]/15 border border-[#FBA832]/35 text-[#FBA832] text-xs font-semibold tracking-wider uppercase">
            Firm Purpose & Strategy
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-5xl font-bold leading-tight">
            Our Vision & <span className="text-gold-gradient font-serif-heading">Mission Statement</span>
          </h2>
        </motion.div>

        {/* Vision & Mission Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 sm:p-10 rounded-2xl bg-[#0D274C]/90 border border-[#FBA832]/30 backdrop-blur-xl shadow-2xl flex flex-col justify-between group hover:border-[#FBA832] transition-all"
          >
            <div>
              <div className="flex items-center gap-3.5 mb-6">
                <div className="p-3 rounded-xl bg-[#085AA3]/30 border border-[#FBA832]/30 text-[#FBA832] group-hover:scale-105 transition-transform">
                  <LuEye className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-xs uppercase font-semibold text-[#FBA832] tracking-wider">
                    Our Future Impact
                  </span>
                  <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold text-white">
                    Our Vision
                  </h3>
                </div>
              </div>

              <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-sans-body">
                To be recognized as the leading corporate, commercial, and dispute resolution law office in Ethiopia — celebrated for unyielding integrity, strategic foresight, and exceptional client success.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-700/80 text-xs font-semibold text-[#FBA832] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FBA832]" />
              <span>Leading Law Office in Ethiopia</span>
            </div>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-8 sm:p-10 rounded-2xl bg-[#0D274C]/90 border border-[#FBA832]/30 backdrop-blur-xl shadow-2xl flex flex-col justify-between group hover:border-[#FBA832] transition-all"
          >
            <div>
              <div className="flex items-center gap-3.5 mb-6">
                <div className="p-3 rounded-xl bg-[#085AA3]/30 border border-[#FBA832]/30 text-[#FBA832] group-hover:scale-105 transition-transform">
                  <LuTarget className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-xs uppercase font-semibold text-[#FBA832] tracking-wider">
                    Our Daily Commitment
                  </span>
                  <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold text-white">
                    Our Mission
                  </h3>
                </div>
              </div>

              <div className="flex flex-col gap-3 text-slate-200 text-xs sm:text-sm font-sans-body">
                {missionPillars.map((pillar, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <LuCheckCircle2 className="w-4 h-4 text-[#FBA832] shrink-0 mt-0.5" />
                    <span>{pillar}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-700/80 text-xs font-semibold text-[#FBA832] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FBA832]" />
              <span>Client-Centered Professional Standards</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

