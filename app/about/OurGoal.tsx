import Image from 'next/image'
import React from 'react'

export default function OurGoal() {
  return (
    <div className='w-full px-8 sm:px-[100px] my-20 mt-[200px] flex flex-col gap-10'>
        <div className="flex w-full flex-col-reverse sm:flex-row gap-5 sm:gap-20">
            <div className="w-full sm:w-[300px] h-[300px]">
                <Image className='w-full h-full object-cover' src={"https://picsum.photos/1080"} alt="OurGoal" width={1080} height={1080} quality={100} />
            </div>
            <div className="text-[#3a3a38]">
                <h3 className='text-lg sm:text-xl md:text-xl font-normal mb-8'>Primary Goal</h3>
                <h2 className='text-3xl sm:text-4xl md:text-6xl font-normal max-w-[600px] md:leading-[4.25rem] mb-10'>Final destination of Eferem Law Office</h2>
            </div>
        </div>
        <p className='text-[#3a3a38] text-2xl'>Our primary goal is to enable our clients to attain their business objectives with minimal legal risk and in compliance with the applicable local laws and international legal standards. We are dedicated to listening to our clients, truly understanding their business objectives, closely working with our clients, analyzing encountered legal issues thoroughly, providing tailor-made and fitting legal solutions, and meeting the distinctive needs of our clients. Our philosophy is to provide advice and representation that allows managers, directors, and policymakers of businesses to achieve their goals while minimizing legal risk.</p>
    </div>
  )
}
