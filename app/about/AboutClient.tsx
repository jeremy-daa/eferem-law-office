import React from "react";

export default function AboutClient() {
  return (
    <div className="w-full px-8 sm:px-[100px] my-20 mt-[200px] flex flex-col gap-10 text-[#3a3a38]">
      <h2 className="text-3xl sm:text-4xl md:text-6xl font-medium max-w-[600px] md:leading-[4.25rem]">
        About Our Clients
      </h2>
      <p className="text-2xl">
        Our clients include medium and small enterprises, payment system
        operators, banks, and international companies. The major client base
        includes institutional and corporate clients who wish to draw upon the
        recognized expertise our office possesses.
      </p>
    </div>
  );
}
