import React from 'react'
import staff from '@/data/staff'
import Image from 'next/image'
import Link from 'next/link'

export default function Lawyers() {
  return (
    <div className='w-full px-8 sm:px-[100px] flex flex-col gap-5'>
        <h3 className='text-lg sm:text-xl md:text-xl text-[#3a3a38] font-normal'>Lawyers</h3>
        <h2 className='text-3xl sm:text-4xl md:text-6xl text-[#3a3a38] font-semibold max-w-[600px] md:leading-[4.25rem] mb-10'>Meet Our Team of Experienced Lawyers</h2>
        <div className="w-full columns-1 lg:columns-2 gap-20">
            {staff?.map((member, index) => (
                <Link href={`/lawyer/${member.id}`} key={index} className="w-full h-fit break-inside-avoid p-8 sm:p-14 mb-20 flex flex-col items-center bg-[#085AA3] text-white rounded-3xl duration-300 hover:scale-105">
                    <Image src={member.image} className="w-[250px] h-[250px] object-cover rounded-full" alt={member.name} width={500} height={800} quality={100} />
                    <h2 className='text-2xl text-center my-5 font-bold'>{member.name}</h2>
                    {/* <p className='mb-5 text-lg font-light'>{member.title}</p> */}
                    <div className="w-fit flex items-center justify-between gap-5 text-2xl mb-10">
                        {member?.socials.map((social, i) => (
                            <Link key={i} href={social.link}>{social.icon}</Link>
                        ))}
                    </div>
                    <p className='text-xl text-[#ddd] text-center'>{member.bio.split("\n")[0]}
                    </p>
                </Link>
            ))}
        </div>
    </div>
  )
}
