"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { LuAward, LuGraduationCap, LuScale, LuShieldCheck } from "react-icons/lu";

export default function Welcome() {
  return (
    <section className="relative w-full py-20 bg-[#0A1D37] text-white overflow-hidden">
      {/* Ambient Lighting */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#FBA832]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Principal Attorney Emblem / Visual Showcase */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-md rounded-2xl p-6 bg-gradient-to-b from-[#0D274C] to-[#061528] border border-[#FBA832]/35 shadow-2xl backdrop-blur-xl group">
              <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden mb-5 bg-[#061528] border border-slate-700/80">
                <Image
                  src="/images/Logo.png"
                  alt="Principal Attorney Eferem Hailemariam Bezabhe"
                  fill
                  className="object-contain p-8 filter drop-shadow-[0_0_15px_rgba(251,168,50,0.3)] group-hover:scale-105 transition-transform duration-700"
                  quality={100}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061528] via-transparent to-transparent opacity-60" />
              </div>

              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#FBA832]/15 border border-[#FBA832]/35 text-[#FBA832] text-xs font-semibold uppercase tracking-wider mb-2 w-fit">
                <LuScale className="w-3.5 h-3.5" />
                <span>Founder & Principal Attorney</span>
              </div>

              <h3 className="font-serif-heading text-2xl font-bold text-white">
                Eferem Hailemariam Bezabhe
              </h3>
              <p className="text-slate-300 text-xs mt-1">
                LL.B, Faculty of Law — Addis Ababa University (Distinction)
              </p>
            </div>
          </motion.div>

          {/* Right Column: Firm Profile & Credentials */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col gap-5"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FBA832]/15 border border-[#FBA832]/35 text-[#FBA832] text-xs font-semibold tracking-wider uppercase w-fit">
              Established 2015
            </div>

            <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Welcome to <br />
              <span className="text-gold-gradient font-serif-heading">Eferem Law Office (ELO)</span>
            </h2>

            <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-sans-body">
              Eferem Law Office (ELO) was founded in 2015 by Principal Attorney <strong className="text-white">Eferem Hailemariam Bezabhe</strong> to deliver a premier, full-fledged law practice in Ethiopia renowned for its integrity and exceptional legal expertise.
            </p>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Ato Eferem acquired valuable legal expertise after graduating with <strong className="text-white">distinction from Addis Ababa University Faculty of Law</strong>. Having served in major government entities, corporate boards, and private practice across Ethiopia, he brings unmatched insight to complex legal matters.
            </p>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Since its inception, ELO has advised and represented national and international corporations, consortiums, government agencies, and financial institutions across high-stakes court litigation, arbitral tribunals, tax advisory, and commercial transactions.
            </p>

            {/* Credential Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
              <div className="p-3.5 rounded-xl bg-[#0D274C]/90 border border-slate-700/80 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#085AA3]/30 text-[#FBA832]">
                  <LuGraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">AAU Faculty of Law</h4>
                  <p className="text-[11px] text-slate-300">Graduated with Distinction</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0D274C]/90 border border-slate-700/80 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#085AA3]/30 text-[#FBA832]">
                  <LuAward className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">25+ Years Experience</h4>
                  <p className="text-[11px] text-slate-300">Public & Private Practice</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

