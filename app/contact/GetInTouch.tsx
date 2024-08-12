import React from "react";

export default function GetInTouch() {
  return (
    <div className="w-full px-5 md:px-[120px] mb-14">
      <h2 className="text-6xl mb-14">Get In Touch</h2>
      <div className="flex items-center flex-wrap gap-10">
        <div className="max-w-[400px]">
          <h3 className="text-3xl font-medium mb-3">Our Office</h3>
          <p>
            Lideta Sub City Woreda 8, Kelifa Sabit Building (in front of Adot
            Cinema, behind the South African Embassy) 1st Floor Office No 112{" "}
          </p>
        </div>
        {/* <div className="border-l border-[#085AA3] pl-14 py-3 min-w-[300px]">
                <h3 className='text-3xl font-medium mb-3'>Bole</h3>
                <p>4264 Mesa Drive</p>
                <p>contact@elo.com</p>
                <p className='font-bold'>+251 911 11 11 11</p>
            </div> */}
        <div className="border-l border-[#085AA3] pl-14 py-3 min-w-[300px]">
          {/* <h3 className='text-3xl font-medium mb-3'>Lideta</h3> */}
          {/* <p></p> */}
          <p>eferemh@yahoo.com</p>
          <p>eferemh@elo-law-ethiopia.com</p>
          <p className="font-bold">+251 91164 3741</p>
          <p className="font-bold">+251 93007 3321</p>
        </div>
      </div>
    </div>
  );
}
