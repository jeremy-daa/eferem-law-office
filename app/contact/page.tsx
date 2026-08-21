import React from "react";
import type { Metadata } from "next";
import Hero from "../../components/Hero";
import GetInTouch from "./GetInTouch";
import ContactForm from "./ContactForm";
import Map from "./Map";
import LetsWork from "../LetsWork";
import JsonLd from "@/components/JsonLd";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.elo-law-ethiopia.com";

export const metadata: Metadata = {
  title: "Contact Us | Schedule a Confidential Legal Consultation in Addis Ababa",
  description:
    "Get in touch with Eferem Law Office in Addis Ababa, Ethiopia. Schedule a confidential legal consultation with Senior Partner Eferem Hailemariam for corporate, commercial, or litigation matters.",
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
  openGraph: {
    title: "Contact Eferem Law Office | Addis Ababa Legal Counsel",
    description: "Confidential legal advisory and consultation in Addis Ababa, Ethiopia.",
    url: `${siteUrl}/contact`,
    images: [`${siteUrl}/images/Logo.png`],
  },
};

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${siteUrl}/contact/#webpage`,
    "url": `${siteUrl}/contact`,
    "name": "Contact Eferem Law Office",
    "description": "Contact channels, office location, and consultation request form for Eferem Law Office.",
    "mainEntity": {
      "@type": "LegalService",
      "name": "Eferem Law Office",
      "telephone": "+251911245678",
      "email": "contact@eferemlaw.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Bole Sub City, Africa Avenue",
        "addressLocality": "Addis Ababa",
        "addressCountry": "ET"
      }
    }
  };

  return (
    <div className="w-full min-h-screen relative bg-[#0A1D37] text-[#0A1D37] selection:bg-[#FBA832] selection:text-[#0A1D37]">
      <JsonLd data={contactSchema} />
      <Hero
        title="Contact Us"
        subtitle="Direct Access to Senior Legal Counsel & Confidential Case Advisory in Addis Ababa"
      />
      <GetInTouch />
      <ContactForm />
      <Map />
      <LetsWork />
    </div>
  );
}
