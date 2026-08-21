"use client";
import React from "react";
import { motion } from "framer-motion";
import { LuMapPin, LuNavigation } from "react-icons/lu";

export default function Map() {
  return (
    <section id="office-map" className="relative w-full py-16 bg-[#0A1D37] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        {/* Map Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8"
        >
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#085AA3]/30 border border-[#FBA832]/40 text-[#FBA832] flex items-center justify-center shrink-0">
              <LuMapPin className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-[#FBA832] font-semibold">
                Lideta Sub City Woreda 8, Addis Ababa
              </span>
              <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold text-white">
                Visit Our Headquarters
              </h3>
            </div>
          </div>

          <a
            href="https://maps.google.com/?q=Kelifa+Sabit+Apartments+Addis+Ababa"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-[#061528] border border-[#FBA832]/40 text-[#FBA832] hover:bg-[#FBA832] hover:text-[#0A1D37] text-xs font-bold transition-all flex items-center gap-2"
          >
            <LuNavigation className="w-4 h-4" />
            <span>Open in Google Maps</span>
          </a>
        </motion.div>

        {/* Embedded Map Frame */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full h-[450px] sm:h-[500px] rounded-3xl overflow-hidden border border-[#FBA832]/35 shadow-2xl relative"
        >
          <iframe
            className="w-full h-full filter saturate-125 contrast-110"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.763807518586!2d38.72589177462974!3d8.993868391066096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b877ac0c96325%3A0x2cb79b98d91b798b!2sKelifa%20Sabit%20apartments!5e0!3m2!1sen!2set!4v1721916019632!5m2!1sen!2set"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Eferem Law Office Google Maps Location"
          ></iframe>
        </motion.div>

      </div>
    </section>
  );
}

