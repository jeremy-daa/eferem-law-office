"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { LuCompass, LuCheckCircle2, LuTrendingUp } from "react-icons/lu";

export default function OurGoal() {
  return (
    <section className="relative w-full py-20 bg-[#061528] text-white overflow-hidden">
      {/* Subtle Background Lighting */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#085AA3]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Text & Strategy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col gap-5"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FBA832]/15 border border-[#FBA832]/35 text-[#FBA832] text-xs font-semibold tracking-wider uppercase w-fit">
              <LuCompass className="w-3.5 h-3.5" />
              <span>Primary Strategic Objective</span>
            </div>

            <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Minimizing Legal Risk, <br />
              <span className="text-gold-gradient font-serif-heading">Maximizing Commercial Value</span>
            </h2>

            <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-sans-body">
              Our primary goal is to empower clients to achieve their business objectives with minimal legal risk, full compliance with Ethiopian law, and alignment with international commercial standards.
            </p>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We are dedicated to active listening, understanding core commercial drivers, conducting thorough legal analysis, and crafting tailor-made fitting legal solutions.
            </p>

            {/* Strategic Pillars List */}
            <div className="flex flex-col gap-2.5 pt-2">
              {[
                "Proactive risk mitigation for corporate directors, managers, and investors.",
                "Custom-tailored legal opinions for high-stakes regulatory compliance.",
                "Seamless court and arbitration advocacy aimed at swift, favorable resolution.",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 font-medium">
                  <LuCheckCircle2 className="w-4 h-4 text-[#FBA832] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Visual Graphic / Emblem Frame */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-md aspect-square rounded-2xl p-8 bg-gradient-to-b from-[#0D274C] to-[#0A1D37] border border-[#FBA832]/35 shadow-2xl backdrop-blur-xl flex flex-col items-center justify-center text-center group">
              <div className="p-4 rounded-2xl bg-[#061528] border border-[#FBA832]/30 text-[#FBA832] mb-5 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                <LuTrendingUp className="w-12 h-12" />
              </div>
              <h3 className="font-serif-heading text-2xl font-bold text-white mb-2">
                Strategic Excellence
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xs font-sans-body">
                Allowing directors and policymakers to achieve corporate goals while safeguarding legal exposure.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

