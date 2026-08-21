"use client";
import React from "react";
import { motion } from "framer-motion";
import { LuMapPin, LuPhoneCall, LuMail, LuClock } from "react-icons/lu";

export default function GetInTouch() {
  const contactInfo = [
    {
      icon: LuMapPin,
      title: "Headquarters Office",
      subtitle: "Addis Ababa, Ethiopia",
      details: [
        "Lideta Sub City Woreda 8, Kelifa Sabit Building",
        "1st Floor, Office No. 112",
        "(In front of Adot Cinema, behind South African Embassy)"
      ],
      action: { text: "Get Directions", href: "#office-map" }
    },
    {
      icon: LuPhoneCall,
      title: "Direct Phone Lines",
      subtitle: "Immediate Legal Assistance",
      details: [
        "+251 91164 3741 (Senior Counsel)",
        "+251 93007 3321 (Office Admin)",
        "Available Mon - Fri during working hours"
      ],
      action: { text: "Call Office", href: "tel:+251911643741" }
    },
    {
      icon: LuMail,
      title: "Official Email Inquiries",
      subtitle: "Confidential Case Review",
      details: [
        "eferemh@elo-law-ethiopia.com",
        "eferemh@yahoo.com",
        "24-Hour Confidential Response"
      ],
      action: { text: "Send Email", href: "mailto:eferemh@elo-law-ethiopia.com" }
    }
  ];

  return (
    <section className="relative w-full py-16 bg-[#0A1D37] text-white overflow-hidden">
      {/* Background Accent Blur */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-[#085AA3]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#FBA832]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        {/* Header Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FBA832]/15 border border-[#FBA832]/35 text-[#FBA832] text-xs font-semibold uppercase tracking-wider">
            <LuClock className="w-3.5 h-3.5" />
            <span>Mon – Fri: 8:30 AM – 5:30 PM EAT</span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-5xl font-bold leading-tight">
            Get In <span className="text-gold-gradient font-serif-heading">Touch</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-sans-body">
            Reach out directly to Eferem Law Office for legal consultations, corporate retainers, or emergency representation in Ethiopia.
          </p>
        </motion.div>

        {/* 3 Executive Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactInfo.map((card, idx) => {
            const IconComp = card.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="p-8 rounded-3xl bg-gradient-to-b from-[#0D274C] to-[#061528] border border-[#FBA832]/30 shadow-2xl backdrop-blur-xl flex flex-col justify-between hover:border-[#FBA832] transition-all duration-300 group"
              >
                <div>
                  {/* Icon & Title */}
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-700/80">
                    <div className="w-14 h-14 rounded-2xl bg-[#085AA3]/35 border border-[#FBA832]/40 text-[#FBA832] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <IconComp className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="font-serif-heading text-xl font-bold text-white group-hover:text-[#FBA832] transition-colors">
                        {card.title}
                      </h3>
                      <span className="text-xs text-[#FBA832] font-medium">{card.subtitle}</span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-8 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans-body">
                    {card.details.map((line, lIdx) => (
                      <p key={lIdx} className={lIdx === 0 ? "font-semibold text-white" : ""}>
                        {line}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Card Button */}
                <a
                  href={card.action.href}
                  className="w-full py-3 px-4 rounded-xl bg-[#061528] hover:bg-[#FBA832] border border-[#FBA832]/40 text-[#FBA832] hover:text-[#0A1D37] text-xs font-bold text-center transition-all duration-300 shadow-md"
                >
                  {card.action.text}
                </a>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

