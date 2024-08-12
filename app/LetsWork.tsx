import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function LetsWork() {
  return (
    <div className="relative w-full min-h-screen flex flex-col gap-5 sm:gap-10 items-center justify-center py-10 px-8">
      <div className="relative min-h-[400px] flex flex-col items-center justify-center">
        <Image
          className="absolute max-w-[350px] w-4/5 sm:w-full object-contain"
          src="/images/Logo_water.png"
          alt="lets work"
          width={1080}
          height={1080}
          quality={100}
        />
        <h2 className="relative text-[3rem] sm:text-[4rem] md:text-[5rem] md:leading-[6.5rem] text-center max-w-[700px]">
          READY? LET&apos;S GET TO WORK.
        </h2>
      </div>
      <Link
        href={"/contact"}
        className="relative w-fit px-10 sm:px-20 py-5 rounded-lg flex items-center gap-14 bg-[#085AA3] border border-[#085AA3] text-2xl text-[#fff] font-semibold"
      >
        <p>Contact Us</p>
      </Link>
    </div>
  );
}
