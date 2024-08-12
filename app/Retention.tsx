import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Retention() {
  return (
    <div className="w-full py-[100px] px-5 sm:px-10 md:px-[100px] flex flex-col items-center gap-16">
      <h1 className="text-4xl sm:text-5xl md:text-[60px] text-[#3a3a38] text-center font-bold mb-4 md:mb-10">
        Legal Retention Process
      </h1>
      <Image
        src="/images/home/retention.svg"
        className="w-full object-contain"
        alt="retention"
        width={1920}
        height={1080}
      />
      <Link
        href={"/contact"}
        className="group w-fit px-10 sm:px-20 py-4 mt-5 flex items-center gap-14 bg-[#D9D9D9] border border-[#085AA3] hover:text-white hover:bg-[#085AA3] duration-300 rounded-lg text-xl sm:text-2xl text-[#3A3A38] font-semibold"
      >
        Enquire
      </Link>
    </div>
  );
}
