"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { LuCheckCircle2, LuAward, LuSparkles } from "react-icons/lu";

const highlights = [
  {
    title: "25+ Years of Dedicated Legal Practice",
    desc: "Decades of legal advisory across complex regulatory, corporate, and civil domains.",
  },
  {
    title: "Proven Track Record of Court Victory",
    desc: "High success rates representing both domestic corporations and international clients.",
  },
  {
    title: "Multidisciplinary Expert Legal Team",
    desc: "Seasoned attorneys specializing in tax, finance, property, and dispute resolution.",
  },
  {
    title: "Over 200+ High-Stakes Cases Managed",
    desc: "Successfully navigated complex legal disputes and strategic business acquisitions.",
  },
];

export default function Experience() {
  return (
    <section className="relative w-full py-20 bg-[#0A1D37] text-white overflow-hidden">
      {/* Background Decorative Radial Lights */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#FBA832]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#085AA3]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Image Card Showcase */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-[#FBA832]/25 bg-[#0D274C] shadow-2xl p-3.5 group">
              <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden">
                <Image
                  src="/images/home/Experience.png"
                  alt="Legal Experience & Expertise"
                  fill
                  className="object-cover object-center filter brightness-90 contrast-110 group-hover:scale-105 transition-transform duration-700"
                  quality={100}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1D37] via-transparent to-transparent" />
              </div>

              {/* Floating Highlight Card */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-xl bg-[#0A1D37]/90 backdrop-blur-xl border border-[#FBA832]/35 shadow-2xl flex items-center gap-3.5">
                <div className="p-2.5 rounded-lg bg-[#085AA3]/30 border border-[#FBA832]/30 text-[#FBA832]">
                  <LuAward className="w-7 h-7" />
                </div>
                <div>
                  <div className="font-serif-heading text-xl font-bold text-white">
                    25+ Years
                  </div>
                  <div className="text-[11px] text-slate-300">
                    Trusted Legal Practice in Ethiopia
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Track Record & Checklist */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col gap-5"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FBA832]/15 border border-[#FBA832]/35 text-[#FBA832] text-xs font-semibold tracking-wider uppercase w-fit">
              <LuSparkles className="w-3.5 h-3.5" />
              <span>Proven Results & Reputation</span>
            </div>

            <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white">
              Our Extensive Experience Advising & <br className="hidden sm:inline" />
              <span className="text-gold-gradient font-serif-heading">Representing Entities</span>
            </h2>

            <p className="text-slate-200 text-base sm:text-lg font-sans-body">
              With a commitment grounded in integrity and rigorous legal strategy, we assist domestic and international clients through intricate regulatory frameworks and litigation challenges.
            </p>

            {/* Grid of Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="p-4 rounded-xl bg-[#0D274C]/80 border border-slate-700/80 hover:border-[#FBA832]/30 backdrop-blur-md transition-all duration-300 flex flex-col gap-1.5"
                >
                  <div className="flex items-center gap-2.5">
                    <LuCheckCircle2 className="w-4.5 h-4.5 text-[#FBA832] shrink-0" />
                    <h3 className="font-semibold text-white text-sm">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed pl-7">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}


