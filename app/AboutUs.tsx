"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LuCheckCircle2, LuArrowRight, LuScale } from "react-icons/lu";

export default function AboutUs() {
  return (
    <section className="relative w-full py-20 bg-[#0A1D37] text-white overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#FBA832]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#085AA3]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Brand Emblem & Visual Badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative flex justify-center"
          >
            <div className="relative w-full max-w-md aspect-square rounded-2xl p-6 bg-gradient-to-b from-[#0D274C] to-[#0A1D37] border border-[#FBA832]/25 backdrop-blur-xl shadow-2xl flex flex-col items-center justify-center text-center group">
              {/* Outer Glowing Ring */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#FBA832]/20 via-[#085AA3]/20 to-[#FBA832]/20 blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative w-36 h-36 mb-5 p-3.5 rounded-xl bg-[#061528] border border-[#FBA832]/35 flex items-center justify-center shadow-inner">
                <Image
                  className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(251,168,50,0.3)]"
                  src="/images/Logo.png"
                  alt="Eferem Law Office Logo"
                  width={300}
                  height={300}
                  quality={100}
                />
              </div>

              <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FBA832]/15 border border-[#FBA832]/35 text-[#FBA832] text-xs font-semibold uppercase tracking-wider mb-2">
                <LuScale className="w-3.5 h-3.5" />
                <span>Established 2015</span>
              </div>

              <h3 className="font-serif-heading text-2xl font-bold text-white mb-1">
                Eferem Law Office
              </h3>
              <p className="text-slate-300 text-xs tracking-wider uppercase">
                Addis Ababa, Ethiopia
              </p>
            </div>
          </motion.div>

          {/* Right Column: Firm Ethos & Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col gap-5"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FBA832]/15 border border-[#FBA832]/35 text-[#FBA832] text-xs font-semibold tracking-wider uppercase w-fit">
              About Our Firm
            </div>

            <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white">
              Integrity, Diligence & <br className="hidden sm:inline" />
              <span className="text-gold-gradient font-serif-heading">Exceptional Legal Expertise</span>
            </h2>

            <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-sans-body">
              Eferem Law Office (ELO) was founded by Principal Attorney <strong className="text-white font-semibold">Eferem Hailemariam Bezabhe</strong> to deliver premier, full-fledged legal advisory and court representation in Ethiopia.
            </p>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We provide reliable, efficient, and tailored legal counsel for domestic businesses, international corporations, and private clients operating in Ethiopia’s dynamic legal landscape.
            </p>

            {/* Pillars Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-2">
              {[
                "High Integrity & Confidentiality",
                "Corporate & Tax Advisory",
                "Proven Track Record in Court",
                "Full-Service Business Representation",
              ].map((pillar, i) => (
                <div key={i} className="flex items-center gap-2.5 text-slate-200 text-sm font-medium">
                  <LuCheckCircle2 className="w-4.5 h-4.5 text-[#FBA832] shrink-0" />
                  <span>{pillar}</span>
                </div>
              ))}
            </div>

            {/* Action CTA */}
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-[#FBA832] hover:bg-[#f99b15] text-[#0A1D37] font-bold text-sm hover:shadow-[0_0_20px_rgba(251,168,50,0.4)] hover:scale-105 transition-all duration-300"
              >
                <span>Read Full Firm Profile</span>
                <LuArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}


