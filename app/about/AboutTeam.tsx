"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { LuCheckCircle2, LuUsers, LuArrowRight } from "react-icons/lu";
import Link from "next/link";

export default function AboutTeam() {
  return (
    <section className="relative w-full py-20 bg-[#0A1D37] text-white overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#FBA832]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Team Ethos */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col gap-5"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FBA832]/15 border border-[#FBA832]/35 text-[#FBA832] text-xs font-semibold tracking-wider uppercase w-fit">
              <LuUsers className="w-3.5 h-3.5" />
              <span>Multidisciplinary Legal Team</span>
            </div>

            <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Experienced Legal Team & <br />
              <span className="text-gold-gradient font-serif-heading">Distinguished Representation</span>
            </h2>

            <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-sans-body">
              ELO is committed to providing legal service of the highest quality with integrity, diligence, and honesty. We are established to deliver reliable, effective, and efficient legal advisory and court representation in Ethiopia.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-2">
              {[
                "Corporate Governance & Business Formation",
                "Mergers, Acquisitions & Joint Ventures",
                "Public Procurement & International Tenders",
                "Banking, Insurance & Finance Regulation",
                "Taxation & Public Finance Strategy",
                "Real Estate, Construction & Arbitration",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200 font-medium">
                  <LuCheckCircle2 className="w-4 h-4 text-[#FBA832] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/our-team"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-[#FBA832] hover:bg-[#f99b15] text-[#0A1D37] font-bold text-sm hover:shadow-[0_0_20px_rgba(251,168,50,0.4)] transition-all"
              >
                <span>Meet Our Senior Lawyers</span>
                <LuArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Team Showcase Photo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-md rounded-2xl p-4 bg-[#0D274C] border border-[#FBA832]/35 shadow-2xl backdrop-blur-xl group">
              <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-[#061528]">
                <Image
                  src="/images/AboutTeam.png"
                  alt="Eferem Law Office Legal Team"
                  fill
                  className="object-cover object-center filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-700"
                  quality={100}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1D37] via-transparent to-transparent opacity-80" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

