import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/context/AuthProvider";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eferem Law Office",
  description:
    "Eferem Law Office (ELO) is a premier legal firm in Ethiopia, founded by Principal Attorney Eferem Hailemariam Bezabhe, renowned for its integrity and unparalleled legal expertise. With a distinguished background in Ethiopian law and extensive experience in both government and private sectors, ELO offers comprehensive legal services spanning business law, investment, taxation, labor, arbitration, and more. Our commitment to integrity, diligence, and honesty ensures reliable and effective representation for national and international clients alike. From advisory services to representation in arbitration and court cases, ELO provides tailored solutions for all legal needs, empowering clients to navigate the complexities of Ethiopian law with confidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
