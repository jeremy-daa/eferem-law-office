"use client";
import React from "react";
import { motion } from "framer-motion";
import { LuLandmark, LuGlobe, LuBuilding, LuBriefcase } from "react-icons/lu";

const clientSectors = [
  {
    icon: LuLandmark,
    title: "Banks & Financial Institutions",
    desc: "Advising banking entities, microfinance institutions, and payment system operators on regulatory compliance and credit securities.",
  },
  {
    icon: LuGlobe,
    title: "International Enterprises & FDI",
    desc: "Representing multinational corporations, foreign investors, and international joint ventures entering the Ethiopian market.",
  },
  {
    icon: LuBuilding,
    title: "Government & Consortiums",
    desc: "Assisting state-owned enterprises, public procurement entities, and business consortiums in legal structuring and dispute resolution.",
  },
  {
    icon: LuBriefcase,
    title: "SMEs & Business Organizations",
    desc: "Guiding domestic commercial enterprises, real estate developers, and tech ventures through corporate growth and tax compliance.",
  },
];

export default function AboutClient() {
  return (
    <section className="relative w-full py-20 bg-[#061528] text-white overflow-hidden">
      {/* Background Lighting */}
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
            Trusted Representation
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-5xl font-bold leading-tight">
            Our Prestigious <span className="text-gold-gradient font-serif-heading">Client Base</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-sans-body">
            Our client base includes small and medium enterprises, financial institutions, payment operators, and multinational corporations operating across East Africa.
          </p>
        </motion.div>

        {/* Sectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {clientSectors.map((sector, index) => {
            const Icon = sector.icon;
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
                  <div className="w-12 h-12 rounded-xl bg-[#085AA3]/30 border border-[#FBA832]/30 flex items-center justify-center text-[#FBA832] mb-4 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif-heading text-lg font-bold text-white mb-2 group-hover:text-[#FBA832] transition-colors">
                    {sector.title}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans-body">
                    {sector.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-700/80 text-[11px] font-semibold text-[#FBA832]">
                  <span>Dedicated Counsel</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

