'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <div className='relative w-full h-screen overflow-hidden flex items-end justify-end lg:px-[100px]'>
        <motion.div initial={{y: "300px", opacity: 0}} animate={{y: 0, opacity: 1}} transition={{ease: "easeInOut", duration: .5,}} className="absolute z-10 left-0 lg:left-[100px] px-8 md:px-0 lg:max-w-[900px] pb-[100px] flex flex-col text-center lg:text-left items-center lg:items-start gap-[100px]">
            <motion.h1 initial={{y: 0}} animate={{y: [0, 100, 0]}} transition={{duration: .7}} className='text-4xl xs:text-6xl sm:text-[82px] leading-[2.75rem] xs:leading-[6rem] font-bold sm:font-semibold text-[#3a3a38] px-8 md:px-0'>Your Trusted Legal <span className='text-[#FCA834]'>Advisors</span></motion.h1>
            <Link className='text-2xl text-white bg-[#085AA3] hover:bg-[#3a3a38] w-fit rounded-lg duration-300 py-5 px-14' href={'/contact'}>Get started</Link>
        </motion.div>
        <motion.div initial={{x: "300px", opacity: 0}} animate={{x: 0, opacity: 1}} transition={{ease: "easeInOut", duration: .5}} className="w-full h-full flex justify-end items-end ">
            <Image className='w-[900px] h-[50%] lg:h-auto object-cover lg:object-contain blur-sm lg:blur-0' src='/images/home/Hero.png' width={1920} height={1080} alt='Hero Image' />
        </motion.div>
    </div>
  )
}
