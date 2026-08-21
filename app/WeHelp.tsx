"use client";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { LuPhoneCall, LuShieldCheck } from "react-icons/lu";

export default function WeHelp() {
  return (
    <section className="relative w-full py-16 bg-[#061528] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl p-8 sm:p-14 bg-gradient-to-r from-[#085AA3] via-[#0D274C] to-[#085AA3] border border-[#FBA832]/35 backdrop-blur-2xl shadow-2xl flex flex-col items-center text-center gap-5 overflow-hidden group"
        >
          {/* Ambient Background Lights */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#FBA832]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#085AA3]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FBA832]/15 border border-[#FBA832]/35 text-[#FBA832] text-xs font-semibold tracking-wider uppercase">
            <LuShieldCheck className="w-3.5 h-3.5" />
            <span>Dedicated Legal Protection</span>
          </div>

          <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight max-w-3xl">
            We Safeguard Your Interests With <br />
            <span className="text-gold-gradient font-serif-heading">Quality Legal Counsel</span>
          </h2>

          <p className="text-slate-200 text-sm sm:text-base max-w-2xl font-sans-body">
            Our team of high-calibre attorneys provides strategic legal advice, rigorous trial representation, and corporate compliance services across Ethiopia.
          </p>

          <div className="pt-2 flex flex-wrap justify-center items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg bg-[#FBA832] hover:bg-[#f99b15] text-[#0A1D37] font-bold text-sm sm:text-base hover:shadow-[0_0_20px_rgba(251,168,50,0.5)] hover:scale-105 transition-all duration-300"
            >
              <LuPhoneCall className="w-4.5 h-4.5" />
              <span>Schedule Legal Enquiry</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


