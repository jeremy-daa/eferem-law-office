"use client";
import React from "react";
import { motion } from "framer-motion";
import { LuShieldCheck, LuUsers, LuLock, LuCpu } from "react-icons/lu";

const coreValues = [
  {
    icon: LuShieldCheck,
    title: "Honesty & Uncompromising Integrity",
    desc: "Our counsel is guided by moral clarity, trustworthiness, and ethical discipline in every transaction and courtroom representation.",
  },
  {
    icon: LuUsers,
    title: "Client-Centered Focus & Custom Solutions",
    desc: "We listen deeply to understand client objectives, customizing legal strategies that directly address challenges and safeguard client interests.",
  },
  {
    icon: LuLock,
    title: "Meticulous Precision & Absolute Privacy",
    desc: "We strive for perfection in every opinion and contract, while strictly enforcing security to protect client data and attorney-client privilege.",
  },
  {
    icon: LuCpu,
    title: "Technological Innovation in Legal Practice",
    desc: "We leverage modern legal tech and research tools to optimize efficiency, streamline communication, and deliver superior legal outcomes.",
  },
];

export default function OurValue() {
  return (
    <section className="relative w-full py-20 bg-[#0A1D37] text-white overflow-hidden">
      {/* Subtle Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-96 bg-[#FBA832]/5 blur-3xl pointer-events-none" />

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
            Guiding Principles
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-5xl font-bold leading-tight">
            Our Core <span className="text-gold-gradient font-serif-heading">Firm Values</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-sans-body">
            The foundational pillars that govern our relationship with clients, court authorities, and corporate stakeholders.
          </p>
        </motion.div>

        {/* 4-Card Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-[#0D274C]/90 border border-white/10 hover:border-[#FBA832]/50 backdrop-blur-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#085AA3]/30 border border-[#FBA832]/30 flex items-center justify-center text-[#FBA832] mb-5 group-hover:scale-105 group-hover:border-[#FBA832] transition-all">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-serif-heading text-xl font-bold text-white mb-2.5 group-hover:text-[#FBA832] transition-colors">
                    {value.title}
                  </h3>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans-body">
                    {value.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3.5 border-t border-slate-700/80 flex items-center gap-2 text-xs font-semibold text-[#FBA832]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FBA832]" />
                  <span>Pillar 0{index + 1}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

