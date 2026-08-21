"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { LuChevronRight, LuCalendar, LuScale } from "react-icons/lu";

interface HeroProps {
  title?: string;
  subtitle?: string;
  date?: string;
}

export default function Hero({ title = "Eferem Law Office", subtitle, date }: HeroProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="relative w-full min-h-[380px] sm:min-h-[440px] bg-[#061528] flex items-center justify-center pt-32 sm:pt-36 pb-16 sm:pb-20 overflow-hidden text-white border-b border-[#FBA832]/25 shadow-2xl">
      {/* Background Image with Dark Blue Vignette & Lighting */}
      <div className="absolute inset-0 z-0">
        <Image
          className="w-full h-full object-cover object-center filter brightness-[25%] contrast-125 scale-105"
          src="/images/Contact.png"
          width={1920}
          height={650}
          alt={title}
          priority
          quality={90}
        />
        {/* Ambient Dark Blue & Gold Radial Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#061528] via-[#0A1D37]/90 to-[#061528]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061528] via-transparent to-[#061528]/95" />
        
        {/* Executive ELO Logo Emblem Watermark (Centered Halfway in Height) */}
        <div className="absolute right-6 sm:right-16 lg:right-24 top-[55%] -translate-y-1/2 w-44 h-44 sm:w-60 sm:h-60 lg:w-68 lg:h-68 pointer-events-none opacity-20">
          <div className="relative w-full h-full p-4 rounded-3xl bg-[#085AA3]/20 border border-[#FBA832]/30 backdrop-blur-sm shadow-2xl flex items-center justify-center">
            <Image
              src="/images/Logo.png"
              alt="ELO Watermark Emblem"
              fill
              className="object-contain p-3 filter drop-shadow-[0_0_25px_rgba(251,168,50,0.4)]"
            />
          </div>
        </div>

        {/* Dynamic Glowing Radial Lights */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-72 bg-[#FBA832]/12 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#085AA3]/30 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Main Hero Header Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 text-center flex flex-col items-center gap-4">
        
        {/* Firm Tagline & Breadcrumb Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
        >
          {/* Tagline Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#085AA3]/40 border border-[#FBA832]/35 text-[#FBA832] text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
            <LuScale className="w-3.5 h-3.5" />
            <span>Eferem Law Office</span>
          </div>

          {/* Breadcrumb Chip */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0D274C]/90 border border-slate-700/80 text-xs text-slate-200 backdrop-blur-md">
            <Link href="/" className="hover:text-[#FBA832] transition-colors font-medium">
              Home
            </Link>
            <LuChevronRight className="w-3.5 h-3.5 text-[#FBA832]" />
            <span className="text-[#FBA832] font-semibold line-clamp-1 max-w-[200px] sm:max-w-xs">
              {title}
            </span>
          </div>
        </motion.div>

        {/* Headline Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-serif-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl leading-tight"
        >
          {title.split(" ").map((word, i) =>
            ["About", "Practice", "Team", "Contact", "News", "Law", "Office", "Ethiopia"].includes(word) ? (
              <span key={i} className="text-gold-gradient font-serif-heading">
                {word}{" "}
              </span>
            ) : (
              word + " "
            )
          )}
        </motion.h1>

        {/* Date Badge (If passed for Blog articles) */}
        {date && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBA832]/15 border border-[#FBA832]/35 text-[#FBA832] text-xs font-semibold">
            <LuCalendar className="w-3.5 h-3.5" />
            <span>{formatDate(date)}</span>
          </div>
        )}

        {/* Subtitle (If passed) */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-200 text-sm sm:text-base lg:text-lg max-w-2xl font-sans-body leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
}


