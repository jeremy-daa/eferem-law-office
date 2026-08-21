"use client";
import React from "react";
import staff from "@/data/staff";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { LuAward, LuArrowRight, LuMail, LuLinkedin, LuFacebook, LuTwitter, LuGraduationCap } from "react-icons/lu";

export default function Lawyers() {
  return (
    <section className="relative w-full py-20 bg-[#0A1D37] text-white overflow-hidden">
      {/* Background Lighting Accent */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#FBA832]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#085AA3]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto flex flex-col items-center gap-3.5 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FBA832]/15 border border-[#FBA832]/35 text-[#FBA832] text-xs font-semibold tracking-wider uppercase">
            <LuAward className="w-3.5 h-3.5" />
            <span>Senior Counsel & Legal Advocates</span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-5xl font-bold leading-tight">
            Meet Our Team of <span className="text-gold-gradient font-serif-heading">Experienced Lawyers</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-sans-body">
            Distinguished legal practitioners dedicated to client success, strategic risk mitigation, and courtroom excellence in Ethiopia.
          </p>
        </motion.div>

        {/* Executive Lawyers Grid (Centered Layout) */}
        <div className="flex flex-wrap justify-center items-stretch gap-8">
          {staff?.map((member, index) => (
            <motion.div
              key={member.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0D274C] to-[#061528] border border-[#FBA832]/35 shadow-2xl backdrop-blur-xl flex flex-col justify-between hover:border-[#FBA832] transition-all duration-300 group"
            >
              <div>
                {/* Header Profile Row */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-slate-700/80 mb-6">
                  
                  {/* Avatar Frame */}
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-[#061528] border-2 border-[#FBA832]/50 shadow-xl shrink-0 group-hover:scale-105 transition-transform duration-500">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top filter brightness-105 contrast-105"
                      quality={100}
                    />
                  </div>

                  {/* Attorney Info */}
                  <div className="flex flex-col text-center sm:text-left gap-1.5">
                    <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#085AA3]/30 border border-[#FBA832]/30 text-[#FBA832] text-[11px] font-semibold uppercase tracking-wider w-fit mx-auto sm:mx-0">
                      <LuGraduationCap className="w-3.5 h-3.5" />
                      <span>{member.title}</span>
                    </div>

                    <h3 className="font-serif-heading text-2xl font-bold text-white group-hover:text-[#FBA832] transition-colors">
                      {member.name}
                    </h3>

                    <p className="text-xs text-slate-300 font-medium">
                      {member.id === "1" ? "LL.B Distinction, AAU Faculty of Law" : "LL.B Distinction, Hawassa University"}
                    </p>

                    {/* Social Links */}
                    <div className="flex items-center justify-center sm:justify-start gap-3 mt-2">
                      {member.socials.map((social) => {
                        const getIcon = (name: string) => {
                          if (name === "facebook") return <LuFacebook className="w-4 h-4" />;
                          if (name === "twitter") return <LuTwitter className="w-4 h-4" />;
                          if (name === "linkedin") return <LuLinkedin className="w-4 h-4" />;
                          return <LuMail className="w-4 h-4" />;
                        };
                        return (
                          <Link
                            key={social.id}
                            href={social.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-[#061528] border border-slate-700 text-slate-300 hover:text-[#FBA832] hover:border-[#FBA832] transition-all"
                            aria-label={social.name}
                          >
                            {getIcon(social.name)}
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* Excerpt Bio */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans-body line-clamp-4 mb-6">
                  {member.bio.split("\n")[0]}
                </p>

                {/* Specialized Practice Areas Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {(member.id === "1"
                    ? ["Corporate & Tax", "Banking & Finance", "Litigation & Arbitration", "Procurement"]
                    : ["Business & Tax", "Labor Law", "Contract Negotiation", "Criminal Defense"]
                  ).map((badge, bIdx) => (
                    <span
                      key={bIdx}
                      className="px-2.5 py-1 rounded-md bg-[#085AA3]/20 border border-slate-700/80 text-slate-300 text-[11px] font-medium"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="pt-4 border-t border-slate-700/80 flex items-center justify-between">
                <Link
                  href={`/lawyer/${member.id}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FBA832] hover:bg-[#f99b15] text-[#0A1D37] font-bold text-xs shadow-md transition-all group-hover:translate-x-1"
                >
                  <span>View Full Profile & Case Record</span>
                  <LuArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

