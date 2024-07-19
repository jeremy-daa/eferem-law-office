import React from 'react'
import practiceAreas from '@/data/practiceAreas'
import Link from 'next/link'
import { PiArrowRightFill } from "react-icons/pi";
import Image from 'next/image';

export default function PracticeAreas() {
  return (
    <div className='w-full flex flex-col items-center gap-14 px-8 md:px-14 lg:px-[100px]'>
        <h2 className='text-5xl xs:text-[60px] text-[#3a3a38] font-semibold'>Our Practice Areas</h2>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10">
            {practiceAreas?.slice(0, 4).map((area, index) => (
                <Link href={`/practice-areas#${area.id}`} key={index} className="w-full md:max-w-[570px] hover:scale-105 duration-300 px-5 xs:px-12 py-10 bg-[#085AA3aa] rounded-lg flex flex-col gap-5">
                    <div className="w-fit flex items-center justify-center  text-5xl text-[#FCA834] rounded-full">
                        {/* {area.icon} */}
                        <Image src={"/images/Logo.png"} width={65} height={65} alt={area.title} quality={100} />
                    </div>
                    <h3 className="text-white text-3xl font-bold">{area.title}</h3>
                    <p className="text-white text-xl font-light">{area.services[0].slice(0, 120)}</p>
                </Link>
            ))}
        </div>
        <div className="w-full">
            <Link href={"/practice-areas"} className="group w-fit px-5 py-4 flex items-center gap-14 bg-[#D9D9D9] border border-[#085AA3] rounded-lg text-xl text-[#3A3A38] font-semibold"><p>See More</p> <PiArrowRightFill className='-translate-x-5 group-hover:translate-x-0 duration-300' color='#085AA3' size={30} /></Link>
        </div>
    </div>
  )
}
