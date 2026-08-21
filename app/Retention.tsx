"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LuMessageSquare,
  LuFileSearch,
  LuShield,
  LuCheckCheck,
  LuArrowRight,
} from "react-icons/lu";

const processSteps = [
  {
    step: "01",
    icon: LuMessageSquare,
    title: "Initial Consultation",
    desc: "We analyze your legal objectives, evaluate risk exposures, and establish clear terms of engagement.",
  },
  {
    step: "02",
    icon: LuFileSearch,
    title: "Legal Strategy & Analysis",
    desc: "Our team drafts tailored legal opinions, conducts thorough due diligence, and formulates defense/action plans.",
  },
  {
    step: "03",
    icon: LuShield,
    title: "Representation & Counsel",
    desc: "We execute vigorous court representation, regulatory advocacy, or high-stakes commercial negotiations.",
  },
  {
    step: "04",
    icon: LuCheckCheck,
    title: "Favorable Resolution",
    desc: "Achieving successful legal outcomes, contract executions, or establishing long-term corporate retainership.",
  },
];

export default function Retention() {
  return (
    <section className="relative w-full py-20 bg-[#0A1D37] text-white overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-96 bg-[#FBA832]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10 flex flex-col items-center">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl flex flex-col items-center gap-3.5 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FBA832]/15 border border-[#FBA832]/35 text-[#FBA832] text-xs font-semibold tracking-wider uppercase">
            Structured Workflow
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-5xl font-bold leading-tight">
            Our Legal <span className="text-gold-gradient font-serif-heading">Retention Process</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-sans-body">
            A seamless, transparent, and rigorous 4-step framework designed to deliver peace of mind and maximum legal efficacy.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {processSteps.map((stepItem, index) => {
            const Icon = stepItem.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="h-full p-6 rounded-xl bg-[#0D274C]/90 border border-white/10 hover:border-[#FBA832]/50 backdrop-blur-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_30px_-10px_rgba(251,168,50,0.25)]">
                  
                  <div>
                    {/* Top Row: Icon & Step Badge */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="p-3 rounded-lg bg-[#085AA3]/30 border border-[#FBA832]/30 text-[#FBA832] group-hover:scale-105 transition-transform duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-serif-heading text-2xl font-bold text-[#FBA832]/40 group-hover:text-[#FBA832] transition-colors">
                        {stepItem.step}
                      </span>
                    </div>

                    {/* Step Title & Description */}
                    <h3 className="font-serif-heading text-xl font-bold text-white mb-2 group-hover:text-[#FBA832] transition-colors">
                      {stepItem.title}
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans-body">
                      {stepItem.desc}
                    </p>
                  </div>

                  {/* Step Status Indicator */}
                  <div className="mt-6 pt-3.5 border-t border-slate-700/80 flex items-center gap-2 text-xs font-semibold text-slate-400 group-hover:text-[#FBA832] transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FBA832]" />
                    <span>Phase {stepItem.step}</span>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-14"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg bg-[#FBA832] hover:bg-[#f99b15] text-[#0A1D37] font-bold text-sm sm:text-base hover:shadow-[0_0_20px_rgba(251,168,50,0.5)] hover:scale-105 transition-all duration-300"
          >
            <span>Initiate Retention Enquiry</span>
            <LuArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}


