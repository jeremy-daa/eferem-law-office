"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  LuBriefcase,
  LuBuilding2,
  LuReceipt,
  LuFileText,
  LuScale,
  LuLandmark,
  LuArrowRight,
} from "react-icons/lu";
import Link from "next/link";

const serviceCapabilities = [
  {
    icon: LuBriefcase,
    title: "Corporate & Business Advisory",
    desc: "Assistance in business setup, corporate governance, mergers & acquisitions, and joint ventures.",
  },
  {
    icon: LuReceipt,
    title: "Taxation & Public Finance",
    desc: "Strategic counsel on Ethiopian income tax, customs duties, tax audits, and compliance.",
  },
  {
    icon: LuLandmark,
    title: "Banking, Finance & Investment",
    desc: "Structuring commercial finance, foreign direct investment protocols, and payment system operator regulations.",
  },
  {
    icon: LuBuilding2,
    title: "Procurement & International Bids",
    desc: "Legal guidance on public procurement tenders, international bidding, and infrastructure contracts.",
  },
  {
    icon: LuFileText,
    title: "Contracts & Legal Instruments",
    desc: "Drafting, reviewing, and negotiating complex commercial contracts, leases, and agreements.",
  },
  {
    icon: LuScale,
    title: "Litigation & Arbitral Advocacy",
    desc: "Full representation before all Ethiopian federal courts, appellate tribunals, and arbitral forums.",
  },
];

export default function OurServices() {
  return (
    <section className="relative w-full py-20 bg-[#0A1D37] text-white overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#FBA832]/5 rounded-full blur-3xl pointer-events-none" />

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
            Full-Service Capabilities
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-5xl font-bold leading-tight">
            Comprehensive <span className="text-gold-gradient font-serif-heading">Legal Representation</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-sans-body">
            ELO provides end-to-end legal advisory, drafting, negotiation, and courtroom advocacy tailored for individuals and corporations.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceCapabilities.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="p-6 rounded-xl bg-[#0D274C]/90 border border-white/10 hover:border-[#FBA832]/50 backdrop-blur-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#085AA3]/30 border border-[#FBA832]/30 flex items-center justify-center text-[#FBA832] mb-4 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif-heading text-xl font-bold text-white mb-2 group-hover:text-[#FBA832] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans-body">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-slate-700/80">
                  <Link
                    href="/practice-areas"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FBA832] group-hover:translate-x-1 transition-transform"
                  >
                    <span>View Details</span>
                    <LuArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

