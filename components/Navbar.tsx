"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { LuMenu, LuX, LuPhoneCall } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Practice Areas", href: "/practice-areas" },
  { name: "Our Team", href: "/our-team" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when full-screen mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 px-3 sm:px-6 py-2 sm:py-3">
      <nav
        className={`max-w-7xl mx-auto rounded-xl transition-all duration-300 px-4 sm:px-6 py-2.5 flex items-center justify-between ${
          isScrolled
            ? "bg-[#0A1D37]/90 backdrop-blur-xl border border-[#FBA832]/30 shadow-xl shadow-black/40"
            : "bg-[#0A1D37]/75 backdrop-blur-md border border-white/10"
        }`}
      >
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 p-1 rounded-lg bg-[#085AA3]/30 border border-[#FBA832]/40 group-hover:border-[#FBA832] transition-all duration-300 flex items-center justify-center">
            <Image
              className="w-full h-full object-contain filter drop-shadow"
              src="/images/Logo.png"
              width={100}
              height={100}
              alt="Eferem Law Office"
              quality={100}
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif-heading text-lg sm:text-xl font-bold tracking-wide text-white group-hover:text-[#FBA832] transition-colors">
              Eferem <span className="text-[#FBA832] font-serif-heading">Law Office</span>
            </span>
            <span className="text-[9px] tracking-widest text-slate-300 uppercase font-sans-body">
              Integrity & Expertise
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-sm font-medium tracking-wide transition-colors py-1 ${
                  active
                    ? "text-[#FBA832] font-semibold"
                    : "text-slate-200 hover:text-[#FBA832]"
                }`}
              >
                {link.name}
                {active && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FBA832] rounded-full shadow-[0_0_8px_rgba(251,168,50,0.8)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FBA832] hover:bg-[#f99b15] text-[#0A1D37] font-bold text-xs sm:text-sm hover:shadow-[0_0_15px_rgba(251,168,50,0.5)] hover:scale-105 transition-all duration-300 whitespace-nowrap"
          >
            <LuPhoneCall className="w-3.5 h-3.5" />
            <span>Free Consultation</span>
          </Link>

          <button
            onClick={() => setMenuOpen(true)}
            className="lg:hidden p-2.5 rounded-lg bg-[#0D274C] border border-[#FBA832]/30 text-[#FBA832] hover:text-white transition-all duration-300 flex items-center gap-1.5"
            aria-label="Open Navigation Menu"
          >
            <LuMenu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Full-Screen Mobile Navigation Modal Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-[100] w-screen h-screen bg-[#061528] text-white flex flex-col justify-between p-6 sm:p-10 overflow-y-auto"
          >
            {/* Ambient Lighting Orbs */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#FBA832]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#085AA3]/20 rounded-full blur-3xl pointer-events-none" />

            {/* Modal Header: Brand + Dedicated Cancel Button */}
            <div className="relative z-10 flex items-center justify-between pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 p-1 rounded-lg bg-[#085AA3]/30 border border-[#FBA832]/40 flex items-center justify-center">
                  <Image
                    className="w-full h-full object-contain"
                    src="/images/Logo.png"
                    width={80}
                    height={80}
                    alt="ELO Logo"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif-heading text-lg font-bold text-white">
                    Eferem <span className="text-[#FBA832] font-serif-heading">Law Office</span>
                  </span>
                  <span className="text-[9px] text-slate-300 uppercase tracking-wider font-sans-body">
                    Integrity & Legal Expertise
                  </span>
                </div>
              </div>

              {/* Dedicated Cancel / Close Button */}
              <button
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#0D274C] border border-[#FBA832]/50 text-[#FBA832] hover:bg-[#FBA832] hover:text-[#0A1D37] transition-all duration-300 shadow-lg shadow-black/50 group"
                aria-label="Close Mobile Navigation"
              >
                <span className="text-xs font-bold uppercase tracking-wider">Close</span>
                <LuX className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Full-Screen Navigation Links List */}
            <div className="relative z-10 my-auto py-8 flex flex-col gap-3">
              <span className="text-xs uppercase tracking-widest text-[#FBA832] font-semibold px-2 mb-1">
                Navigation Menu
              </span>
              <div className="flex flex-col gap-2">
                {navLinks.map((link, idx) => {
                  const active = isActive(link.href);
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center justify-between px-5 py-4 rounded-xl border text-lg font-semibold transition-all ${
                          active
                            ? "bg-[#085AA3]/40 border-[#FBA832] text-[#FBA832] shadow-lg shadow-[#FBA832]/10"
                            : "border-slate-800/80 text-slate-100 hover:bg-[#0D274C] hover:border-[#FBA832]/30"
                        }`}
                      >
                        <span>{link.name}</span>
                        {active ? (
                          <span className="w-2.5 h-2.5 rounded-full bg-[#FBA832] shadow-[0_0_10px_#FBA832]" />
                        ) : (
                          <span className="text-slate-500 text-xs font-mono">0{idx + 1}</span>
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Modal Bottom CTAs */}
            <div className="relative z-10 pt-6 border-t border-slate-800 flex flex-col gap-3">
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="w-full text-center py-4 rounded-xl bg-[#FBA832] hover:bg-[#f99b15] text-[#0A1D37] font-bold text-base shadow-xl shadow-[#FBA832]/20 flex items-center justify-center gap-2"
              >
                <LuPhoneCall className="w-4.5 h-4.5" />
                <span>Schedule Free Consultation</span>
              </Link>

              <div className="flex items-center justify-between text-xs text-slate-400 px-1 pt-1">
                <span>+251 93007 3321</span>
                <span>&copy; {new Date().getFullYear()} ELO Ethiopia</span>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;



