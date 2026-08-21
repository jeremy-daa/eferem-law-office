"use client";
import React, { useState, useEffect } from "react";
import practiceAreas from "@/data/practiceAreas";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuBriefcase,
  LuBuilding2,
  LuScale,
  LuHome,
  LuReceipt,
  LuShieldCheck,
  LuShoppingBag,
  LuUsers,
  LuCheckCircle2,
  LuArrowRight,
  LuPhoneCall,
  LuChevronLeft,
  LuChevronRight,
  LuLayers,
} from "react-icons/lu";
import Link from "next/link";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "1": LuBriefcase,
  "2": LuBuilding2,
  "3": LuScale,
  "4": LuHome,
  "5": LuShoppingBag,
  "6": LuReceipt,
  "7": LuShieldCheck,
  "8": LuUsers,
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

const slugToIdMap: Record<string, string> = {
  corporate: "1",
  construction: "2",
  litigation: "3",
  property: "4",
  procurement: "5",
  taxation: "6",
  labor: "7",
  cso: "8",
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
};

export default function PAList() {
  const [activeId, setActiveId] = useState<string>("1");
  const [viewMode, setViewMode] = useState<"slide" | "all">("slide");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  // Synchronize state with URL hash on mount & hash change
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && slugToIdMap[hash]) {
        const id = slugToIdMap[hash];
        setActiveId(id);
        const element = document.getElementById(`section-${id}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const selectSection = (id: string) => {
    setActiveId(id);
    const slug = slugMap[id] || id;
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${slug}`);
    }
  };

  const currentIndex = practiceAreas.findIndex((pa) => pa.id === activeId);
  const activeArea = practiceAreas[currentIndex] || practiceAreas[0];

  const nextSection = () => {
    const nextIdx = (currentIndex + 1) % practiceAreas.length;
    selectSection(practiceAreas[nextIdx].id);
  };

  const prevSection = () => {
    const prevIdx = (currentIndex - 1 + practiceAreas.length) % practiceAreas.length;
    selectSection(practiceAreas[prevIdx].id);
  };

  return (
    <div className="w-full bg-[#0A1D37] text-white py-10 px-4 sm:px-8 lg:px-12 relative overflow-hidden">
      
      {/* Background Lighting Accent */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#FBA832]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#085AA3]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-10 sm:gap-14 lg:gap-16 relative z-10">
        
        {/* Category Selector Control Header (No Horizontal Scroll) */}
        <div className="sticky top-20 sm:top-24 z-30 p-4 sm:p-5 rounded-2xl bg-[#0D274C]/95 backdrop-blur-xl border border-[#FBA832]/35 shadow-2xl flex flex-col gap-4 mb-4 sm:mb-6">
          
          {/* Mobile Category Selector Trigger (Custom Pill Dropdown) */}
          <div className="lg:hidden relative w-full">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full p-3.5 rounded-xl bg-[#061528] border border-[#FBA832]/40 text-white flex items-center justify-between shadow-lg"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-lg bg-[#FBA832] text-[#0A1D37] shrink-0">
                  {React.createElement(iconMap[activeArea.id] || LuScale, { className: "w-4 h-4" })}
                </div>
                <div className="flex flex-col text-left truncate">
                  <span className="text-[10px] text-[#FBA832] uppercase tracking-wider font-semibold">
                    Viewing Section 0{currentIndex + 1} of 0{practiceAreas.length}
                  </span>
                  <span className="text-sm font-bold text-white truncate font-serif-heading">
                    {activeArea.title}
                  </span>
                </div>
              </div>
              <div className="px-2.5 py-1 rounded-md bg-[#085AA3]/40 border border-[#FBA832]/30 text-[#FBA832] text-xs font-semibold shrink-0">
                Change Area ▼
              </div>
            </button>

            {/* Mobile Dropdown Options Drawer */}
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 right-0 mt-2 z-50 p-3 rounded-2xl bg-[#061528] border border-[#FBA832]/40 shadow-2xl flex flex-col gap-2 max-h-[380px] overflow-y-auto"
                >
                  {practiceAreas.map((pa, idx) => {
                    const isCurrent = pa.id === activeId;
                    const IconComponent = iconMap[pa.id] || LuScale;
                    return (
                      <button
                        key={pa.id}
                        onClick={() => {
                          selectSection(pa.id);
                          setDropdownOpen(false);
                        }}
                        className={`flex items-center justify-between p-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                          isCurrent
                            ? "bg-[#FBA832] text-[#0A1D37] font-bold"
                            : "bg-[#0D274C]/80 text-slate-200 hover:bg-[#085AA3]/40 border border-slate-800"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <IconComponent className="w-4 h-4 shrink-0" />
                          <span className="truncate">{pa.title}</span>
                        </div>
                        <span className="text-[10px] opacity-80 font-mono">0{idx + 1}</span>
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Responsive 4-Column Grid Category Selector (Visible on lg+ screens) */}
          <div className="hidden lg:grid grid-cols-4 gap-2.5 w-full">
            {practiceAreas.map((pa, idx) => {
              const isActive = pa.id === activeId;
              const IconComponent = iconMap[pa.id] || LuScale;
              return (
                <button
                  key={pa.id}
                  onClick={() => selectSection(pa.id)}
                  className={`flex items-center gap-2.5 p-3 rounded-xl text-xs font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-[#FBA832] text-[#0A1D37] shadow-lg shadow-[#FBA832]/30 font-bold scale-[1.02]"
                      : "bg-[#061528] text-slate-200 hover:text-white hover:bg-[#085AA3]/50 border border-slate-700/70"
                  }`}
                >
                  <div
                    className={`p-1.5 rounded-lg shrink-0 ${
                      isActive ? "bg-[#0A1D37] text-[#FBA832]" : "bg-[#085AA3]/30 text-[#FBA832]"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <span className="truncate text-left leading-tight">
                    {pa.title.split(",")[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mode Switcher & Navigation Controls Row */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-700/60 w-full">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-300 font-medium">Display Mode:</span>
              <div className="flex items-center rounded-lg bg-[#061528] p-1 border border-slate-700/80">
                <button
                  onClick={() => setViewMode("slide")}
                  className={`px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    viewMode === "slide"
                      ? "bg-[#085AA3] text-white shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <span>Slide View</span>
                </button>
                <button
                  onClick={() => setViewMode("all")}
                  className={`px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    viewMode === "all"
                      ? "bg-[#085AA3] text-white shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <LuLayers className="w-3.5 h-3.5" />
                  <span>All Sections</span>
                </button>
              </div>
            </div>

            {/* Step Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevSection}
                className="px-3 py-1.5 rounded-lg bg-[#061528] border border-slate-700 text-xs font-semibold text-slate-200 hover:text-[#FBA832] hover:border-[#FBA832] transition-all flex items-center gap-1"
                aria-label="Previous Practice Area"
              >
                <LuChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Prev</span>
              </button>
              <button
                onClick={nextSection}
                className="px-3 py-1.5 rounded-lg bg-[#061528] border border-slate-700 text-xs font-semibold text-slate-200 hover:text-[#FBA832] hover:border-[#FBA832] transition-all flex items-center gap-1"
                aria-label="Next Practice Area"
              >
                <span className="hidden sm:inline">Next</span>
                <LuChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* View Mode 1: Interactive Slide Focus View */}
        {viewMode === "slide" && (
          <div className="w-full pt-4 sm:pt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeArea.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="relative rounded-3xl bg-gradient-to-b from-[#0D274C] to-[#061528] border border-[#FBA832]/35 shadow-2xl p-6 sm:p-10 lg:p-14 overflow-hidden"
              >
                {/* Top Row: Icon, Count & Slide Controls */}
                <div className="flex items-center justify-between pb-6 border-b border-slate-700/80 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#085AA3]/40 border border-[#FBA832]/40 flex items-center justify-center text-[#FBA832] shadow-inner">
                      {React.createElement(iconMap[activeArea.id] || LuScale, { className: "w-7 h-7" })}
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-widest text-[#FBA832] font-semibold">
                        Practice Area 0{currentIndex + 1} of 0{practiceAreas.length}
                      </span>
                      <h2 className="font-serif-heading text-2xl sm:text-4xl font-bold text-white">
                        {activeArea.title}
                      </h2>
                    </div>
                  </div>

                  {/* Previous / Next Slide Controls */}
                  <div className="hidden sm:flex items-center gap-2">
                    <button
                      onClick={prevSection}
                      className="p-3 rounded-xl bg-[#061528] border border-slate-700 text-slate-200 hover:text-[#FBA832] hover:border-[#FBA832] transition-all"
                      aria-label="Previous Practice Area"
                    >
                      <LuChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextSection}
                      className="p-3 rounded-xl bg-[#061528] border border-slate-700 text-slate-200 hover:text-[#FBA832] hover:border-[#FBA832] transition-all"
                      aria-label="Next Practice Area"
                    >
                      <LuChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {activeArea.subtitle && (
                  <p className="text-base sm:text-lg font-semibold text-[#FBA832] mb-6">
                    {activeArea.subtitle}
                  </p>
                )}

                {/* Scope of Legal Services List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                  {activeArea.services.map((service, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-[#085AA3]/15 border border-white/5 hover:border-[#FBA832]/30 flex items-start gap-3 transition-all duration-300 group"
                    >
                      <LuCheckCircle2 className="w-5 h-5 text-[#FBA832] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-sans-body">
                        {service}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Bottom CTA Row */}
                <div className="pt-8 border-t border-slate-700/80 flex flex-wrap items-center justify-between gap-4 mt-8">
                  <div className="flex items-center gap-3">
                    <Link
                      href="/contact"
                      className="px-6 py-3 rounded-xl bg-[#FBA832] hover:bg-[#f99b15] text-[#0A1D37] font-bold text-xs sm:text-sm shadow-lg shadow-[#FBA832]/20 flex items-center gap-2 transition-all hover:scale-105"
                    >
                      <LuPhoneCall className="w-4 h-4" />
                      <span>Consult on {activeArea.title.split(",")[0]}</span>
                    </Link>
                  </div>

                  <div className="flex items-center gap-2 sm:hidden">
                    <button
                      onClick={prevSection}
                      className="px-4 py-2 rounded-lg bg-[#061528] border border-slate-700 text-xs font-semibold text-slate-200"
                    >
                      Previous
                    </button>
                    <button
                      onClick={nextSection}
                      className="px-4 py-2 rounded-lg bg-[#061528] border border-slate-700 text-xs font-semibold text-slate-200"
                    >
                      Next
                    </button>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* View Mode 2: Multi-Section Scroll View */}
        {viewMode === "all" && (
          <div className="w-full pt-6 sm:pt-10 lg:pt-12 flex flex-col gap-12 sm:gap-16 lg:gap-20">
            {practiceAreas.map((pa, idx) => {
              const IconComponent = iconMap[pa.id] || LuScale;
              const isSelected = pa.id === activeId;
              const slug = slugMap[pa.id] || pa.id;
              return (
                <div
                  id={`section-${pa.id}`}
                  key={pa.id}
                  className={`scroll-mt-72 sm:scroll-mt-80 lg:scroll-mt-96 p-6 sm:p-10 lg:p-12 rounded-3xl transition-all duration-300 ${
                    isSelected
                      ? "bg-[#0D274C] border-2 border-[#FBA832] shadow-2xl shadow-[#FBA832]/20 scale-[1.01]"
                      : "bg-[#061528]/90 border border-white/10 hover:border-slate-700"
                  }`}
                >
                  {/* Selected Indicator Badge */}
                  {isSelected && (
                    <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FBA832]/20 border border-[#FBA832]/40 text-[#FBA832] text-xs font-semibold uppercase tracking-wider">
                      <span className="w-2 h-2 rounded-full bg-[#FBA832] animate-pulse" />
                      <span>Active Selection</span>
                    </div>
                  )}

                  <div className="flex items-center gap-4 pb-6 border-b border-slate-800 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#085AA3]/30 border border-[#FBA832]/30 flex items-center justify-center text-[#FBA832]">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs text-[#FBA832] font-semibold uppercase tracking-wider">
                        Practice Area 0{idx + 1}
                      </span>
                      <h3 className="font-serif-heading text-xl sm:text-3xl font-bold text-white">
                        {pa.title}
                      </h3>
                    </div>
                  </div>

                  {pa.subtitle && (
                    <p className="text-sm sm:text-base font-semibold text-[#FBA832] mb-4">
                      {pa.subtitle}
                    </p>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">
                    {pa.services.map((service, serviceIdx) => (
                      <div
                        key={serviceIdx}
                        className="p-3.5 rounded-xl bg-[#085AA3]/10 border border-white/5 flex items-start gap-2.5 text-slate-200 text-xs sm:text-sm"
                      >
                        <LuCheckCircle2 className="w-4 h-4 text-[#FBA832] shrink-0 mt-0.5" />
                        <span>{service}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex justify-end">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-[#FBA832] hover:underline"
                    >
                      <span>Inquire About This Service</span>
                      <LuArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}

