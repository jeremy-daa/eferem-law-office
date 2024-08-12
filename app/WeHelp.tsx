import Link from 'next/link'
import React from 'react'

export default function WeHelp() {
  return (
    <div className='w-full my-28 py-28 px-10 bg-[#085AA3] flex flex-col items-center gap-10 text-center text-white'>
        <h2 className='text-4xl sm:text-6xl'>We Help You With Quality Legal Lawyers</h2>
        <p className='text-lg max-w-[1000px]'>Our team of experienced lawyers are here to help you with your legal needs. We provide quality legal services to our clients. We also provide legal advice and representation in court.</p>
        <Link href={"/contact"} className="group w-fit px-10 sm:px-20 py-4 mt-5 flex items-center gap-14 bg-[#D9D9D9] border border-[#FCA834] rounded-lg text-2xl text-[#3A3A38] font-semibold"><p>Enquire</p></Link>
    </div>
  )
}
