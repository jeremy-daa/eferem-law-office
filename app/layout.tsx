import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContactBubble from "@/components/FloatingContactBubble";
import JsonLd from "@/components/JsonLd";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.elo-law-ethiopia.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Eferem Law Office | Premier Legal Counsel & Corporate Law Firm in Ethiopia",
    template: "%s | Eferem Law Office",
  },
  description:
    "Eferem Law Office (ELO) is Ethiopia's premier law firm founded by Senior Counsel Eferem Hailemariam Bezabhe. Providing authoritative legal advisory in Corporate & Commercial Law, Foreign Direct Investment, Construction, Commercial Litigation, and Public Procurement.",
  keywords: [
    "Ethiopian Law Firm",
    "Lawyers in Ethiopia",
    "Addis Ababa Attorney",
    "Corporate Law Firm Ethiopia",
    "Eferem Hailemariam Bezabhe",
    "Foreign Investment Attorney Ethiopia",
    "Commercial Litigation Addis Ababa",
    "Public Procurement Law Ethiopia",
    "Construction Lawyer Addis Ababa",
    "Ethiopian Legal Advisory"
  ],
  authors: [{ name: "Eferem Hailemariam Bezabhe", url: siteUrl }],
  creator: "Eferem Law Office",
  publisher: "Eferem Law Office",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Eferem Law Office",
    title: "Eferem Law Office | Premier Legal Counsel in Ethiopia",
    description:
      "Top-tier legal advisory and corporate litigation services in Ethiopia led by Senior Partner Eferem Hailemariam.",
    images: [
      {
        url: `${siteUrl}/images/Logo.png`,
        width: 1200,
        height: 630,
        alt: "Eferem Law Office Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eferem Law Office | Premier Legal Counsel in Ethiopia",
    description:
      "Top-tier legal advisory and corporate litigation services in Ethiopia led by Senior Partner Eferem Hailemariam.",
    images: [`${siteUrl}/images/Logo.png`],
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "Legal Services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const legalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": `${siteUrl}/#legal-service`,
    "name": "Eferem Law Office",
    "alternateName": ["ELO Law Office", "ELO Legal Counsel Ethiopia"],
    "url": siteUrl,
    "logo": `${siteUrl}/images/Logo.png`,
    "image": `${siteUrl}/images/experience/1.png`,
    "description":
      "Premier legal consultancy firm in Ethiopia providing corporate advisory, commercial litigation, foreign direct investment guidance, and public procurement counsel.",
    "telephone": "+251911245678",
    "email": "contact@eferemlaw.com",
    "priceRange": "$$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Bole Sub City, Africa Avenue",
      "addressLocality": "Addis Ababa",
      "addressRegion": "Addis Ababa",
      "postalCode": "1000",
      "addressCountry": "ET",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 9.0108,
      "longitude": 38.7613,
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:30",
        "closes": "17:30",
      },
    ],
    "founder": {
      "@type": "Person",
      "name": "Eferem Hailemariam Bezabhe",
      "jobTitle": "Senior Managing Partner",
      "description":
        "Senior Legal Counsel with over two decades of practice in Ethiopian Corporate Law, Commercial Litigation, and International Business Advisory.",
    },
    "knowsAbout": [
      "Ethiopian Commercial Code",
      "Corporate & Commercial Law",
      "Foreign Direct Investment in Ethiopia",
      "Public Procurement & Tenders",
      "Construction & Real Estate Law",
      "Litigation & Dispute Resolution"
    ],
  };

  return (
    <html lang="en">
      <head>
        <JsonLd data={legalServiceSchema} />
      </head>
      <body className={poppins.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingContactBubble />
      </body>
    </html>
  );
}
