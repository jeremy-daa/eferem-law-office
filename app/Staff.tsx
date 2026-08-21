"use client";
import Image from "next/image";
import React from "react";
import staff from "@/data/staff";
import Link from "next/link";
import { motion } from "framer-motion";
import { LuArrowRight, LuUserCheck } from "react-icons/lu";

export default function Staff() {
  const displayStaff = staff ? staff.slice(0, 3) : [];

  return (
    <section className="relative w-full py-20 bg-[#061528] text-white overflow-hidden">
      {/* Background Decorative Radial Accent */}
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#FBA832]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10 flex flex-col items-center">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl flex flex-col items-center gap-3.5 mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FBA832]/15 border border-[#FBA832]/35 text-[#FBA832] text-xs font-semibold tracking-wider uppercase">
            <LuUserCheck className="w-3.5 h-3.5" />
            <span>Legal Expertise & Leadership</span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-5xl font-bold leading-tight">
            Professional Lawyers <br className="hidden sm:inline" />
            <span className="text-gold-gradient font-serif-heading">With Extensive Experience</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-sans-body">
            Our accomplished legal practitioners bring decades of courtroom mastery, corporate advisory experience, and unwavering dedication to every client case.
          </p>
        </motion.div>

        {/* Staff Cards Grid - Centered Flex Layout */}
        <div className="w-full flex flex-wrap justify-center items-stretch gap-6 max-w-5xl">
          {displayStaff.map((member, index) => (
            <motion.div
              key={member.id || index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="w-full sm:w-[350px] flex flex-col"
            >
              <Link
                href={`/lawyer/${member.id}`}
                className="group relative h-full rounded-xl overflow-hidden bg-[#0D274C]/90 border border-white/10 hover:border-[#FBA832]/50 backdrop-blur-xl flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_30px_-10px_rgba(251,168,50,0.25)]"
              >
                {/* Photo Frame */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#061528]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-700"
                    quality={100}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D274C] via-transparent to-transparent opacity-80" />
                </div>

                {/* Member Info */}
                <div className="p-5 flex flex-col flex-1 justify-between gap-3.5">
                  <div>
                    <span className="text-[11px] uppercase font-semibold text-[#FBA832] tracking-wider">
                      {member.title}
                    </span>
                    <h3 className="font-serif-heading text-xl font-bold text-white mt-0.5 group-hover:text-[#FBA832] transition-colors">
                      {member.name}
                    </h3>
                  </div>

                  {/* Social Links & Action */}
                  <div className="pt-3.5 border-t border-slate-700/80 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-slate-300 text-sm">
                      {member?.socials?.map((social, i) => (
                        <span
                          key={i}
                          className="hover:text-[#FBA832] transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {social.icon}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-xs font-semibold text-[#FBA832] group-hover:translate-x-1 transition-transform">
                      <span>Profile</span>
                      <LuArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View Team Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-12"
        >
          <Link
            href="/our-team"
            className="inline-flex items-center gap-2.5 px-7 py-3 rounded-lg bg-[#0D274C] hover:bg-[#085AA3] border border-[#FBA832]/30 hover:border-[#FBA832] text-white font-semibold text-sm transition-all duration-300 group"
          >
            <span>Meet Our Entire Team</span>
            <LuArrowRight className="w-4 h-4 text-[#FBA832] group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}


