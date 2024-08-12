import Image from "next/image";
import React from "react";

export default function AboutTeam() {
  return (
    <div className="w-full px-8 sm:px-[100px] my-20 flex flex-col gap-5">
      <div className="flex flex-wrap justify-between gap-14">
        <div className="flex-[1] text-[#3a3a38] min-w-[250px] sm:min-w-[400px]">
          <h3 className="text-lg sm:text-xl md:text-xl font-normal mb-8">
            About
          </h3>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-medium max-w-[600px] md:leading-[4.25rem] mb-10">
            Our Team
          </h2>
          <p className="text-2xl">
            ELO is committed to providing a legal service of the highest quality
            with integrity, diligence, and honesty. The Office is established to
            provide reliable, effective, and efficient legal advisory and
            representation services for persons and entities living or operating
            in Ethiopia in the areas of commerce & investment including the
            establishment of business organizations, corporate governance,
            mergers & acquisition, procurement & international bids, banking &
            insurance, taxation and public finance, construction and real
            estate, labor, arbitration and related laws.
          </p>
        </div>
        <div className="flex-[1] flex justify-center min-w-[250px] sm:min-w-[400px]">
          <Image
            className="w-full max-w-[500px] h-full object-cover"
            src="/images/AboutTeam.png"
            alt="team"
            width={500}
            height={700}
            quality={100}
          />
        </div>
      </div>
    </div>
  );
}
