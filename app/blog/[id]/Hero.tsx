import Image from "next/image";
import React from "react";

export default function Hero({ title, date }: { title: string; date: any }) {
  const dateConverter = (date: any) => {
    const newDate = new Date(date);
    return newDate.toDateString();
  };

  return (
    <div className="relative w-full pt-44 pb-32 px-10 flex items-center justify-center mb-20">
      <Image
        className="absolute top-0 bottom-0 w-full h-full object-cover"
        src="/images/Contact.png"
        width={1920}
        height={650}
        alt="Hero"
        quality={100}
      />
      <div className="flex flex-col items-center gap-10 text-center z-10 max-w-[75%]">
        <h2 className=" text-5xl sm:text-7xl text-white font-medium">
          {title}
        </h2>
        <p className=" text-white">{dateConverter(date)}</p>
      </div>
    </div>
  );
}
