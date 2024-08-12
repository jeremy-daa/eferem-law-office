import Image from "next/image";
import React from "react";

export default function OurServices() {
  return (
    <div className="w-full px-8 sm:px-[100px] my-20 mt-40 flex flex-col items-center gap-5">
      <h2 className="text-6xl text-center text-[#3a3a38] mb-10">Our Service</h2>
      <div className="w-full hidden md:flex flex-wrap justify-center mb-10">
        <div className="w-[250px] h-[250px] p-14 border-r-2 border-[#3a3a38]">
          <Image
            className="w-full h-full object-contain"
            src={"/images/services/Service1.png"}
            alt="service1"
            width={500}
            height={500}
            quality={100}
          />
        </div>
        <div className="w-[250px] h-[250px] p-14 border-r-2 border-[#3a3a38]">
          <Image
            className="w-full h-full object-contain"
            src={"/images/services/Service2.png"}
            alt="service1"
            width={500}
            height={500}
            quality={100}
          />
        </div>
        <div className="w-[250px] h-[250px] p-14 border-r-2 border-[#3a3a38]">
          <Image
            className="w-full h-full object-contain"
            src={"/images/services/Service3.png"}
            alt="service1"
            width={500}
            height={500}
            quality={100}
          />
        </div>
        <div className="w-[250px] h-[250px] p-14">
          <Image
            className="w-full h-full object-contain"
            src={"/images/services/Service4.png"}
            alt="service1"
            width={500}
            height={500}
            quality={100}
          />
        </div>
      </div>
      <p className="text-2xl text-center max-w-[1000px]">
        The Office provides comprehensive legal services, including advisory and
        consultancy services; drafting and revision of various contracts and
        legal instruments; assistance in the establishment of new business
        ventures and the setting up of business organizations; and
        representation of clients before arbitral tribunals and all federal
        courts.
      </p>
    </div>
  );
}
