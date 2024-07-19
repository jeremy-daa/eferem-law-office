'use client'
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { CiPhone, CiLocationOn, CiMail } from "react-icons/ci";

const Footer = () => {
  const currentPage = usePathname().split("/")[1] || "";
  return (
    <div className={`${currentPage === "admin" ? "flex" : "flex"} flex-col items-center gap-[50px] bg-[#085AA3] px-8 sm:px-16 md:px-[120px] py-10`}>
      <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center gap-5 border-b pb-10 w-full max-w-[700px]">
        <Image className="w-20 h-20" src={"/images/Logo.png"} alt="logo" width={300} height={300} quality={100} unoptimized />
        <h2 className="text-3xl sm:text-4xl text-white font-bold">Eferem Law Office</h2>
      </div>
      <div className="w-full flex flex-col md:flex-row flex-wrap justify-between gap-14 px-0 sm:px-20">
        <div className="flex flex-col max-w-[300px] text-white gap-5">
          <h3 className="text-3xl font-semibold mb-2">About Us</h3>
          <p className="text-lg">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis, laudantium?</p>
          <div className="flex items-center gap-5">
            <Link href="https://facebook.com" className="text-[#eee]"><FaFacebook size={30} /></Link>
            <Link href="https://linkedin.com" className="text-[#eee]"><FaLinkedin size={30} /></Link>
            <Link href="https://twitter.com" className="text-[#eee]"><FaTwitter size={30} /></Link>
            <Link href="https://instagram.com" className="text-[#eee]"><FaInstagram size={30} /></Link>
          </div>
        </div>

        <div className="flex flex-col max-w-[300px] text-white gap-5">
          <h3 className="text-3xl font-semibold mb-2">Services</h3>
          <div className="flex flex-col gap-4">
            <p className="text-lg">Business Law</p>
            <p className="text-lg">Education Law</p>
            <p className="text-lg">Legal Consultancy</p>
            <p className="text-lg">General Lawyer</p>
          </div>
        </div>

        <div className="flex flex-col max-w-[300px] text-white gap-5">
          <h3 className="text-3xl font-semibold mb-2">Pages</h3>
          <div className="flex flex-col gap-4">
            <Link href={"/"} className="text-lg">About</Link>
            <Link href={"/"} className="text-lg">Practice Areas</Link>
            <Link href={"/"} className="text-lg">Our Team</Link>
            <Link href={"/"} className="text-lg">Blog</Link>
            <Link href={"/"} className="text-lg">Contact</Link>
          </div>
        </div>

        <div className="flex flex-col max-w-[300px] text-white gap-5">
          <h3 className="text-3xl font-semibold mb-2">Contact Us</h3>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4"><CiPhone size={30} /><p className="text-lg">+251 97272 8282</p></div>
            <div className="flex items-center gap-4"><CiLocationOn size={30} /><p className="text-lg">Addis Ababa, Ethiopia</p></div>
            <div className="flex items-center gap-4"><CiMail size={30} /><p className="text-lg">attorney@elo-law-ethiopia.com</p></div>
          </div>
        </div>

      </div>
      <div className="w-full flex flex-col items-center text-center pt-10 text-white text-lg border-t">
        <p>&copy; 2024 Eferem Law Office. All Rights Reserved</p>
      </div>
    </div>
  )
};

export default Footer;
