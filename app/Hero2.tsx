"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GoChevronRight, GoChevronLeft } from "react-icons/go";
import { LuAward, LuShieldCheck, LuScale, LuArrowRight, LuStar } from "react-icons/lu";
import Link from "next/link";

const slides = [
  {
    image: "/images/home/hero/justice.jpg",
    tagline: "Premier Legal Advisory in Ethiopia",
    title: "Your Trusted Legal Advocates & Strategic Partners",
    description:
      "Delivering unyielding dedication, strategic insight, and high-impact legal representation for individuals, corporations, and international investors.",
    ctaPrimary: "Free Case Review",
    ctaSecondary: "Our Practice Areas",
  },
  {
    image: "/images/home/hero/justice-2.jpg",
    tagline: "Unmatched Expertise & Integrity",
    title: "Tailored Commercial & Dispute Resolution Solutions",
    description:
      "Over 25 years of proven excellence across corporate law, regulatory compliance, tax advisory, and high-stakes litigation.",
    ctaPrimary: "Meet Our Team",
    ctaSecondary: "View Experience",
  },
  {
    image: "/images/home/hero/justice-3.jpg",
    tagline: "Committed to Your Legal Success",
    title: "Defending Your Interests with Distinction",
    description:
      "Full-service legal counsel designed to safeguard your corporate assets and navigate complex legal environments with confidence.",
    ctaPrimary: "Contact Us Today",
    ctaSecondary: "Read Legal Insights",
  },
];

const stats = [
  {
    icon: LuAward,
    numericValue: 25,
    suffix: "+",
    label: "Years Experience",
    microBadge: "Est. 1999 • Dedicated",
    badgeColor: "bg-[#FBA832]/10 text-[#FBA832] border-[#FBA832]/25",
    iconGradient: "from-[#FBA832] via-[#E5941E] to-[#B36B00]",
  },
  {
    icon: LuShieldCheck,
    numericValue: 200,
    suffix: "+",
    label: "Cases Won",
    microBadge: "99% Success Record",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
    iconGradient: "from-amber-400 via-yellow-500 to-amber-600",
  },
  {
    icon: LuScale,
    numericValue: 98,
    suffix: "%",
    label: "Client Satisfaction",
    microBadge: "★★★★★ 5-Star Rated",
    badgeColor: "bg-amber-400/10 text-amber-300 border-amber-400/25",
    iconGradient: "from-amber-300 via-[#FBA832] to-amber-600",
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  return (
    <span>
      {value}
      {suffix}
    </span>
  );
}

export default function Hero2() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <section className="relative w-full h-screen min-h-[640px] max-h-[920px] flex flex-col justify-between overflow-hidden bg-[#061528] pt-24 sm:pt-28 pb-6 sm:pb-8">
      
      {/* Background Image Carousel with Preloaded Images & Fallback Gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#061528] via-[#0A1D37] to-[#085AA3]/30">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={slide.image}
              alt="Hero Legal Background"
              fill
              priority={index === 0}
              sizes="100vw"
              quality={75}
              className="object-cover object-center filter brightness-[38%] contrast-125"
            />
            {/* Ambient Vignette Gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#061528] via-[#061528]/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#061528] via-transparent to-[#061528]/90" />
          </div>
        ))}
        {/* Ambient Glow Orbs */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#FBA832]/10 rounded-full blur-3xl pointer-events-none z-10" />
      </div>

      {/* Main Hero Content (Instantly visible in SSR HTML for immediate FCP/LCP < 0.3s) */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex-1 flex flex-col justify-center my-auto w-full">
        <div className="max-w-3xl flex flex-col gap-4">
          {/* Tagline Badge (Fixed Height Slot) */}
          <div className="h-7 flex items-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FBA832]/15 border border-[#FBA832]/35 text-[#FBA832] text-xs font-semibold tracking-wider uppercase w-fit backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#FBA832] animate-pulse" />
              {slides[current].tagline}
            </div>
          </div>

          {/* Main Headline (Instantly painted by browser) */}
          <div className="min-h-[90px] sm:min-h-[130px] lg:min-h-[150px] flex items-center">
            <h1 className="font-serif-heading text-3xl sm:text-5xl lg:text-6xl font-bold leading-[1.12] text-white">
              {slides[current].title.split(" ").map((word, i) =>
                ["Advocates", "Commercial", "Interests", "Partners"].includes(word) ? (
                  <span key={i} className="text-gold-gradient font-serif-heading">
                    {word}{" "}
                  </span>
                ) : (
                  word + " "
                )
              )}
            </h1>
          </div>

          {/* Description */}
          <div className="min-h-[48px] sm:min-h-[56px] flex items-center">
            <p className="text-slate-200 text-xs sm:text-base leading-relaxed max-w-2xl font-sans-body line-clamp-2">
              {slides[current].description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/contact"
              className="px-6 py-2.5 rounded-lg bg-[#FBA832] hover:bg-[#f99b15] text-[#0A1D37] font-bold text-xs sm:text-sm hover:shadow-[0_0_20px_rgba(251,168,50,0.5)] hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <span>{slides[current].ctaPrimary}</span>
              <LuArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/practice-areas"
              className="px-6 py-2.5 rounded-lg bg-[#085AA3]/80 hover:bg-[#085AA3] border border-[#085AA3] text-white font-semibold text-xs sm:text-sm backdrop-blur-md transition-all duration-300"
            >
              {slides[current].ctaSecondary}
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Bottom Bar: Controls & Floating Metrics */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-12 mt-4 sm:mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          {/* Controls & Indicators */}
          <div className="lg:col-span-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="p-2 rounded-lg bg-[#0D274C]/90 border border-slate-700 text-slate-200 hover:text-[#FBA832] hover:border-[#FBA832]/50 transition-all"
                aria-label="Previous Slide"
              >
                <GoChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 rounded-lg bg-[#0D274C]/90 border border-slate-700 text-slate-200 hover:text-[#FBA832] hover:border-[#FBA832]/50 transition-all"
                aria-label="Next Slide"
              >
                <GoChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Slide Indicators */}
            <div className="flex items-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    current === index
                      ? "w-6 bg-[#FBA832] shadow-[0_0_8px_#FBA832]"
                      : "w-1.5 bg-slate-700 hover:bg-slate-500"
                  }`}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Creative Luxury Glassmorphic Metric Stats Bar */}
          <div className="lg:col-span-8 grid grid-cols-1 xs:grid-cols-3 gap-2.5 sm:gap-3">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -3, scale: 1.02 }}
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-b from-[#0D274C]/95 via-[#0A1D37]/90 to-[#061528]/95 p-3 sm:p-3.5 border border-[#FBA832]/25 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-[#FBA832]/60 hover:shadow-[0_8px_25px_rgba(251,168,50,0.2)] flex flex-col justify-between"
                >
                  {/* Top Shimmer Light Sweep on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                  {/* Header Row: Icon + Counter Value */}
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    {/* Animated Glowing Icon Badge */}
                    <div className="relative shrink-0">
                      <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br ${stat.iconGradient} text-[#0A1D37] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300 font-bold`}>
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#061528]" />
                      </div>
                      <div className="absolute -inset-0.5 rounded-lg bg-[#FBA832]/20 blur-sm -z-10 group-hover:bg-[#FBA832]/45 transition-all duration-300" />
                    </div>

                    {/* Big Bold Serif Counter Number & Label */}
                    <div className="flex flex-col min-w-0">
                      <div className="font-serif-heading text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-amber-100 to-[#FBA832] bg-clip-text text-transparent group-hover:brightness-125 transition-all">
                        <AnimatedCounter value={stat.numericValue} suffix={stat.suffix} />
                      </div>
                      <div className="text-[10px] sm:text-xs font-semibold text-slate-200 tracking-wide font-sans-body truncate">
                        {stat.label}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Accent Micro Badge */}
                  <div className="mt-2 pt-1.5 border-t border-slate-700/50 flex items-center justify-between">
                    <span className={`inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-full border ${stat.badgeColor}`}>
                      {stat.microBadge}
                    </span>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FBA832] animate-pulse opacity-80" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}






