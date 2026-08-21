import React from "react";
import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Welcome from "./Welcome";
import AboutTeam from "./AboutTeam";
import OurServices from "./OurServices";
import OurGoal from "./OurGoal";
import OurValue from "./OurValue";
import VisMis from "./VisMis";
import AboutClient from "./AboutClient";
import QuickConsultationForm from "@/components/QuickConsultationForm";
import LetsWork from "../LetsWork";
import JsonLd from "@/components/JsonLd";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.elo-law-ethiopia.com";

export const metadata: Metadata = {
  title: "About Us | Senior Counsel Eferem Hailemariam & Law Office Credentials",
  description:
    "Learn about Eferem Law Office (ELO), founded by Senior Partner Eferem Hailemariam Bezabhe. Over two decades of legal excellence representing corporations, foreign investors, and institutions in Ethiopia.",
  alternates: {
    canonical: `${siteUrl}/about`,
  },
  openGraph: {
    title: "About Eferem Law Office | Premier Counsel in Ethiopia",
    description:
      "Established legal practice in Ethiopia led by Senior Attorney Eferem Hailemariam Bezabhe.",
    url: `${siteUrl}/about`,
    images: [`${siteUrl}/images/Logo.png`],
  },
};

export default function AboutPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${siteUrl}/about/#webpage`,
    "url": `${siteUrl}/about`,
    "name": "About Eferem Law Office",
    "description": "History, values, credentials, and legal team of Eferem Law Office in Ethiopia.",
    "mainEntity": {
      "@type": "Person",
      "name": "Eferem Hailemariam Bezabhe",
      "jobTitle": "Senior Managing Partner",
      "worksFor": {
        "@type": "LegalService",
        "name": "Eferem Law Office",
        "url": siteUrl
      }
    }
  };

  return (
    <div className="w-full min-h-screen relative bg-[#0A1D37] text-slate-100 selection:bg-[#FBA832] selection:text-[#0A1D37]">
      <JsonLd data={aboutSchema} />
      <Hero title="About Us" subtitle="Premier Legal Advisory & Court Advocacy in Ethiopia Since 2015" />
      <Welcome />
      <VisMis />
      <OurValue />
      <AboutTeam />
      <OurServices />
      <OurGoal />
      <AboutClient />
      <QuickConsultationForm />
      <LetsWork />
    </div>
  );
}
