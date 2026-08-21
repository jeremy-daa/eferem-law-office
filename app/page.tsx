import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero2 from "./Hero2";
import JsonLd from "@/components/JsonLd";

// Dynamic Code-Splitting below-the-fold sections for maximum performance (slashes TBT and JS execution time)
const AboutUs = dynamic(() => import("./AboutUs"), { ssr: true });
const PracticeAreas = dynamic(() => import("./PracticeAreas"), { ssr: true });
const Retention = dynamic(() => import("./Retention"), { ssr: true });
const Staff = dynamic(() => import("./Staff"), { ssr: true });
const WeHelp = dynamic(() => import("./WeHelp"), { ssr: true });
const Experience = dynamic(() => import("./Experience"), { ssr: true });
const Blog = dynamic(() => import("./Blog"), { ssr: true });
const LetsWork = dynamic(() => import("./LetsWork"), { ssr: true });
const QuickConsultationForm = dynamic(() => import("@/components/QuickConsultationForm"), { ssr: true });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.elo-law-ethiopia.com";

export const metadata: Metadata = {
  title: "Eferem Law Office | Premier Legal Counsel in Ethiopia",
  description:
    "Eferem Law Office (ELO) is Ethiopia's leading law office founded by Senior Counsel Eferem Hailemariam Bezabhe. Trusted advisory in Corporate Law, Public Procurement, Commercial Litigation, Foreign Direct Investment, and Construction.",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Eferem Law Office | Premier Legal Counsel in Ethiopia",
    description:
      "Premier legal consultancy in Ethiopia representing corporate entities, commercial investors, and foreign enterprises.",
    url: siteUrl,
    images: [`${siteUrl}/images/Logo.png`],
  },
};

export default function Home() {
  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    "url": siteUrl,
    "name": "Eferem Law Office",
    "description": "Premier Corporate & Commercial Law Firm in Addis Ababa, Ethiopia",
    "publisher": {
      "@type": "LegalService",
      "name": "Eferem Law Office",
      "url": siteUrl,
      "logo": `${siteUrl}/images/Logo.png`,
    },
  };

  return (
    <main className="w-full min-h-screen relative bg-[#0A1D37] text-slate-100 overflow-x-hidden selection:bg-[#FBA832] selection:text-[#0A1D37]">
      <JsonLd data={homeSchema} />
      <Hero2 />
      <AboutUs />
      <PracticeAreas />
      <Retention />
      <Staff />
      <WeHelp />
      <Experience />
      <Blog />
      <QuickConsultationForm />
      <LetsWork />
    </main>
  );
}
