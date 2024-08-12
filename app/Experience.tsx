import Image from "next/image";
import React from "react";
import { FaSquareCheck } from "react-icons/fa6";

export default function Experience() {
  return (
    <div className="relative w-full px-8 sm:px-[100px] py-[100px] flex gap-20 items-center">
      <div className="hidden md:block w-[250px] lg:w-[350px] xl:w-full min-w-[250px] max-w-[450px]">
        <Image
          src="/images/home/Experience.png"
          alt="experience"
          width={1080}
          height={1920}
          quality={100}
        />
      </div>
      <div className="relative flex flex-col gap-5 lg:gap-10">
        <h2 className="font-bold md:font-normal text-3xl lg:text-4xl xl:text-5xl xl:leading-[3.5rem] max-w-[600px] text-[#3A3A38]">
          Our Extensive Experience Advising And Representing Entites
        </h2>
        <div className="flex flex-col gap-5 lg:gap-10 border-t border-[#3A3A38] pt-10">
          <div className="flex gap-4 items-center">
            <FaSquareCheck className="text-[#085AA3] text-[20px] lg:text-[30px]" />
            <p className="text-xl lg:text-3xl text-[#3A3A38] font-normal">
              25 years of experience in the field of law
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <FaSquareCheck className="text-[#085AA3] text-[20px] lg:text-[30px]" />
            <p className="text-xl lg:text-3xl text-[#3A3A38] font-normal">
              Proven track record of success
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <FaSquareCheck className="text-[#085AA3] text-[20px] lg:text-[30px]" />
            <p className="text-xl lg:text-3xl text-[#3A3A38] font-normal">
              A team of experienced lawyers
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <FaSquareCheck className="text-[#085AA3] text-[20px] lg:text-[30px]" />
            <p className="text-xl lg:text-3xl text-[#3A3A38] font-normal">
              Over 200 successful cases
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
