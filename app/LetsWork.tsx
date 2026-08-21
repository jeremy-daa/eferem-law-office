"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { LuPhoneCall, LuArrowRight } from "react-icons/lu";

export default function LetsWork() {
  return (
    <section className="relative w-full py-20 bg-[#061528] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl p-8 sm:p-16 bg-gradient-to-b from-[#0D274C] via-[#0A1D37] to-[#0D274C] border border-[#FBA832]/35 backdrop-blur-2xl shadow-2xl flex flex-col items-center text-center gap-6 overflow-hidden group"
        >
          {/* Watermark Brand Logo Backdrop */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <Image
              className="w-96 h-96 object-contain"
              src="/images/Logo_water.png"
              alt="Brand Watermark"
              width={1080}
              height={1080}
              quality={100}
            />
          </div>

          {/* Ambient Background Lights */}
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#FBA832]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FBA832]/15 border border-[#FBA832]/35 text-[#FBA832] text-xs font-semibold tracking-wider uppercase">
            Start Your Legal Consultation
          </div>

          <h2 className="font-serif-heading text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl">
            READY TO PROTECT YOUR INTERESTS? <br />
            <span className="text-gold-gradient font-serif-heading">LET&apos;S GET TO WORK.</span>
          </h2>

          <p className="text-slate-200 text-sm sm:text-lg max-w-2xl font-sans-body">
            Get in touch with our principal attorney and legal team today to discuss your case with complete confidentiality.
          </p>

          <div className="pt-2 flex flex-wrap justify-center items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-lg bg-[#FBA832] hover:bg-[#f99b15] text-[#0A1D37] font-bold text-base sm:text-lg hover:shadow-[0_0_25px_rgba(251,168,50,0.5)] hover:scale-105 transition-all duration-300"
            >
              <LuPhoneCall className="w-5 h-5" />
              <span>Contact Us Today</span>
              <LuArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


