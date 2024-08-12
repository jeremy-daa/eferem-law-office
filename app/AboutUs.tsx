import Image from 'next/image'
import React from 'react'

export default function AboutUs() {
  return (
    <div className='w-full my-[130px] flex items-center'>
        <div className="w-full p-[100px] px-8 sm:px-16 md:px-[120px] flex items-center gap-[100px] bg-[#E8E9E1]">
            <div className="flex-[1] absolute lg:relative left-1/2 lg:left-0 -translate-x-1/2 lg:translate-x-0">
                <Image className='w-[250px] h-[250px] object-contain' src="/images/Logo_grey.png" alt="About Us" width={500} height={500} />
            </div>
            <div className="flex-[2.5] flex flex-col pl-8 sm:pl-16 md:pl-[120px] border-l-2 border-[#085AA3]">
                <h2 className='text-4xl sm:text-[47px] leading-[2.75rem] sm:leading-[4.25rem] text-[#085AA3] mb-5'>Integrity And Exceptional Legal Expertise</h2>
                <p className='text-xl font-light mb-4'>committed to providing a legal service of the highest quality with integrity, diligence, and honesty.</p>
                <p className='text-xl font-light'>The Office is established to provide reliable, effective, and efficient legal advisory and representation services for persons and entities living or operating in Ethiopia</p>
            </div>
        </div>
    </div>
  )
}
