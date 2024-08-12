import React from "react";
import Lawyer from "./Lawyer";

export default function Hero() {
  return (
    <div className="relative w-full min-h-screen flex justify-center mb-20">
      {/* <Image className='absolute left-0 top-0 blur-md w-full h-full object-cover' src='/images/home/hero/justice-2.jpg' width={1920} height={1080} alt='Hero' quality={100} /> */}
      {/* <div className="absolute top-0 left-0 w-full h-full bg-[#085AA355]"></div> */}
      <div className="absolute left-0 top-0 w-full h-full bg-[#085AA3aa]"></div>
      <Lawyer />
    </div>
  );
}
