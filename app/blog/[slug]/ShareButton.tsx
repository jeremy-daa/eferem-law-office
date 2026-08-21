"use client";

import React, { useState } from "react";
import { LuShare2, LuCheck } from "react-icons/lu";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#061528] border border-slate-700/80 hover:border-[#FBA832] text-xs font-semibold text-[#FBA832] transition-all shadow-md hover:scale-105"
    >
      {copied ? <LuCheck className="w-4 h-4 text-emerald-400" /> : <LuShare2 className="w-4 h-4" />}
      <span>{copied ? "Link Copied!" : "Share Article"}</span>
    </button>
  );
}
