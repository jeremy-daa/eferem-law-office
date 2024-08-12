import React from "react";

export default function VisMis() {
  return (
    <div className="w-full px-8 sm:px-[100px] my-20 mt-[200px] flex flex-wrap md:flex-nowrap justify-center gap-10">
      <div className="flex max-w-[600px] gap-8">
        <div className="hidden xs:block min-w-[50px] lg:min-w-[100px] max-w-[100px] h-full border-t border-[#3a3a38] translate-y-[1.5rem]"></div>
        <div className="">
          <h3 className="text-5xl mb-10">Our Vision</h3>
          <p>
            To be the leading corporate law office in Ethiopia known for its
            reliable legal services.
          </p>
        </div>
      </div>
      <div className="flex max-w-[600px] gap-8">
        <div className="hidden xs:block min-w-[50px] lg:min-w-[100px] max-w-[100px] h-full border-t border-[#3a3a38] translate-y-[1.5rem]"></div>
        <div className="">
          <h3 className="text-5xl mb-10">Our Mission</h3>
          <p className="text-lg font-semibold mb-3">At ELO, we strive to</p>
          <ul className="list-disc">
            <li>
              Deliver the highest standards of legal services and representation
              to our client base while maintaining the utmost ethical and
              professional standards.
            </li>
            <li>
              Exceed the reasonable and legitimate expectations of our clients
              in an ethical manner by providing services that are practical,
              innovative, and cost-effective.
            </li>
            <li>
              Earn the trust of our clients by helping them understand the law
              and achieve successful outcomes in their legal issues and
              disputes.
            </li>
            <li>
              Prioritize the legitimate needs of our clients and foster a shared
              vision and collaborative team environment.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
