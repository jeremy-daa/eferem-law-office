"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { LuPhone, LuMapPin, LuMail, LuArrowUp } from "react-icons/lu";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-[#061528] text-white border-t border-[#FBA832]/20 pt-16 pb-8 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-48 bg-[#FBA832]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-slate-800">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-11 h-11 p-1 rounded-lg bg-[#085AA3]/30 border border-[#FBA832]/40">
                <Image
                  className="w-full h-full object-contain"
                  src="/images/Logo.png"
                  alt="Eferem Law Office"
                  width={100}
                  height={100}
                  quality={100}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif-heading text-xl sm:text-2xl font-bold text-white group-hover:text-[#FBA832] transition-colors">
                  Eferem <span className="text-[#FBA832] font-serif-heading">Law Office</span>
                </span>
                <span className="text-[9px] tracking-widest text-slate-300 uppercase font-sans-body">
                  Integrity & Expertise
                </span>
              </div>
            </Link>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans-body">
              Founded in 2015 by Principal Attorney Eferem Hailemariam Bezabhe, ELO delivers full-fledged legal advisory and court advocacy services in Ethiopia.
            </p>

            <div className="flex items-center gap-2.5">
              {[
                { icon: FaFacebook, href: "https://www.facebook.com/ELAWOFF", label: "Visit ELO Facebook Page" },
                { icon: FaLinkedin, href: "https://www.linkedin.com/in/eferem-hailemariam-33b46136", label: "Visit Eferem Hailemariam LinkedIn Profile" },
                { icon: FaTwitter, href: "https://x.com/eferemh", label: "Visit ELO Twitter Profile" },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="w-10 h-10 rounded-lg bg-[#0D274C] border border-slate-700/80 flex items-center justify-center text-slate-200 hover:text-[#FBA832] hover:border-[#FBA832]/50 transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="lg:col-span-3 flex flex-col gap-3.5">
            <h3 className="font-serif-heading text-lg font-bold text-[#FBA832] tracking-wide">
              Practice Services
            </h3>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm text-slate-300">
              <li>
                <Link href="/practice-areas" className="hover:text-[#FBA832] transition-colors">
                  Commercial & Financial Advisory
                </Link>
              </li>
              <li>
                <Link href="/practice-areas" className="hover:text-[#FBA832] transition-colors">
                  Public Procurement Counsel
                </Link>
              </li>
              <li>
                <Link href="/practice-areas" className="hover:text-[#FBA832] transition-colors">
                  Tax & Customs Duty Strategy
                </Link>
              </li>
              <li>
                <Link href="/practice-areas" className="hover:text-[#FBA832] transition-colors">
                  Property & Real Estate Transfer
                </Link>
              </li>
              <li>
                <Link href="/practice-areas" className="hover:text-[#FBA832] transition-colors">
                  Dispute Resolution & Litigation
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Directory Links */}
          <div className="lg:col-span-2 flex flex-col gap-3.5">
            <h3 className="font-serif-heading text-lg font-bold text-[#FBA832] tracking-wide">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm text-slate-300">
              <li>
                <Link href="/" className="hover:text-[#FBA832] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#FBA832] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/practice-areas" className="hover:text-[#FBA832] transition-colors">
                  Practice Areas
                </Link>
              </li>
              <li>
                <Link href="/our-team" className="hover:text-[#FBA832] transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#FBA832] transition-colors">
                  Blog & Insights
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#FBA832] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Us */}
          <div className="lg:col-span-3 flex flex-col gap-3.5">
            <h3 className="font-serif-heading text-lg font-bold text-[#FBA832] tracking-wide">
              Contact Information
            </h3>
            <div className="flex flex-col gap-3 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <LuPhone className="w-4 h-4 text-[#FBA832] mt-0.5 shrink-0" />
                <div className="flex flex-col text-slate-300">
                  <span>+251 93007 3321</span>
                  <span>+251 91164 3741</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <LuMapPin className="w-4 h-4 text-[#FBA832] shrink-0" />
                <span className="text-slate-300">P.O.Box: 24016/1000, Addis Ababa</span>
              </div>

              <div className="flex items-start gap-2.5">
                <LuMail className="w-4 h-4 text-[#FBA832] mt-0.5 shrink-0" />
                <div className="flex flex-col text-slate-300 text-xs">
                  <span>eferemh@elo-law-ethiopia.com</span>
                  <span>eferemh@yahoo.com</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>&copy; {new Date().getFullYear()} Eferem Law Office. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#0D274C] border border-slate-700 text-slate-200 hover:text-[#FBA832] hover:border-[#FBA832]/40 transition-all group"
          >
            <span>Back to top</span>
            <LuArrowUp className="w-3.5 h-3.5 text-[#FBA832] group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;


