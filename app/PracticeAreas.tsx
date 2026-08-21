"use client";
import React from "react";
import practiceAreas from "@/data/practiceAreas";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LuBriefcase,
  LuBuilding2,
  LuReceipt,
  LuHome,
  LuFileText,
  LuScale,
  LuArrowRight,
} from "react-icons/lu";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "Commercial & Financial Service": LuBriefcase,
  Procurement: LuBuilding2,
  "TAX & Custom Duty": LuReceipt,
  "Property and Transfer of rights": LuHome,
  "Intellectual Property": LuFileText,
  "Litigation & Dispute Resolution": LuScale,
};

const slugMap: Record<string, string> = {
  "1": "corporate",
  "2": "construction",
  "3": "litigation",
  "4": "property",
  "5": "procurement",
  "6": "taxation",
  "7": "labor",
  "8": "cso",
};

export default function PracticeAreas() {
  const displayAreas = practiceAreas ? practiceAreas.slice(0, 6) : [];

  return (
    <section className="relative w-full py-20 bg-[#061528] text-white overflow-hidden">
      {/* Radial Gradient BG Accent */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#FBA832]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10 flex flex-col items-center">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl flex flex-col items-center gap-3.5 mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FBA832]/15 border border-[#FBA832]/35 text-[#FBA832] text-xs font-semibold tracking-wider uppercase">
            Specialized Practice Areas
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-5xl font-bold leading-tight">
            Comprehensive <span className="text-gold-gradient font-serif-heading">Legal Solutions</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-sans-body">
            Providing expert legal counsel tailored to commercial entities, financial institutions, and international ventures operating across Ethiopia.
          </p>
        </motion.div>

        {/* Practice Areas Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayAreas.map((area, index) => {
            const IconComponent = iconMap[area.title] || LuScale;
            const slug = slugMap[area.id] || area.id;
            return (
              <motion.div
                key={area.id || index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Link
                  href={`/practice-areas#${slug}`}
                  className="group relative h-full p-7 rounded-xl bg-[#0D274C]/90 border border-white/10 hover:border-[#FBA832]/50 backdrop-blur-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_30px_-10px_rgba(251,168,50,0.25)]"
                >
                  {/* Subtle Hover Gradient Fill */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-[#FBA832]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div className="relative z-10 flex flex-col gap-4">
                    {/* Icon Container */}
                    <div className="w-12 h-12 rounded-xl bg-[#085AA3]/30 border border-[#FBA832]/30 flex items-center justify-center text-[#FBA832] group-hover:scale-105 group-hover:border-[#FBA832] transition-all duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>

                    {/* Title */}
                    <h3 className="font-serif-heading text-xl font-bold text-white group-hover:text-[#FBA832] transition-colors">
                      {area.title}
                    </h3>

                    {/* Description snippet */}
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {area.services && area.services[0]
                        ? area.services[0]
                        : "Expert legal strategy and consultation tailored to your specific requirements."}
                    </p>
                  </div>

                  {/* Read More Link */}
                  <div className="relative z-10 pt-5 mt-5 border-t border-slate-700/80 flex items-center justify-between text-[#FBA832] text-xs font-semibold">
                    <span>Explore Services</span>
                    <LuArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-12"
        >
          <Link
            href="/practice-areas"
            className="inline-flex items-center gap-2.5 px-7 py-3 rounded-lg bg-[#0D274C] hover:bg-[#085AA3] border border-[#FBA832]/30 hover:border-[#FBA832] text-white font-semibold text-sm transition-all duration-300 group"
          >
            <span>View All Practice Areas</span>
            <LuArrowRight className="w-4 h-4 text-[#FBA832] group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}


