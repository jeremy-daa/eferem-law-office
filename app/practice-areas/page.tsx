import React from "react";
import type { Metadata } from "next";
import Hero from "@/components/Hero";
import PAList from "./PAList";
import JsonLd from "@/components/JsonLd";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.elo-law-ethiopia.com";

export const metadata: Metadata = {
  title: "Practice Areas | Corporate, Investment, Procurement & Litigation Services",
  description:
    "Comprehensive legal practice areas at Eferem Law Office in Ethiopia: Corporate Law, Construction, Public Tenders & Procurement, Taxation, Intellectual Property, and Dispute Resolution.",
  alternates: {
    canonical: `${siteUrl}/practice-areas`,
  },
  openGraph: {
    title: "Practice Areas | Eferem Law Office Ethiopia",
    description: "Specialized legal services and corporate legal advisory in Addis Ababa, Ethiopia.",
    url: `${siteUrl}/practice-areas`,
    images: [`${siteUrl}/images/Logo.png`],
  },
};

export default function PracticeAreasPage() {
  const practiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}/practice-areas/#service`,
    "name": "Legal Practice Areas & Corporate Advisory",
    "provider": {
      "@type": "LegalService",
      "name": "Eferem Law Office",
      "url": siteUrl
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Legal Practice Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Corporate & Commercial Law" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Public Procurement & Tenders" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Commercial Litigation & Arbitration" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Foreign Direct Investment (FDI)" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Taxation & Custom Advisory" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Construction & Real Estate Law" } }
      ]
    }
  };

  return (
    <div className="w-full min-h-screen relative bg-[#0A1D37] text-slate-100 selection:bg-[#FBA832] selection:text-[#0A1D37]">
      <JsonLd data={practiceSchema} />
      <Hero title="Practice Areas" subtitle="Authoritative Legal Solutions Across Ethiopia's Key Business Sectors" />
      <PAList />
    </div>
  );
}
