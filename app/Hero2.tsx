'use client'
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"
import { GoChevronRight, GoChevronLeft } from "react-icons/go";
import { useRouter } from "next/navigation";

const variant1 = {
    hidden: {
        opacity: 0,
        y: 20
    },
    visible: {
        opacity: [0, 0, 1],
        y: [20, 20, 0],
        transition: {
            delay: .5,
            duration: 1,
            ease: "easeInOut"
        }
    },
    exit: {
        opacity: 0,
        y: 20,
        transition: {
            duration: .5,
            ease: "easeInOut"
        }
    }
}
const variant2 = {
    hidden: {
        opacity: 0,
        y: -20
    },
    visible: {
        opacity: [0, 0, 1],
        y: [-20, -20, 0],
        transition: {
            delay: .7,
            duration: 1,
            ease: "easeInOut"
        }
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: {
            duration: .5,
            ease: "easeInOut"
        }
    }
}


export default function Hero2() {
    const [current, setCurrent] = useState(0)
    const slideRef = useRef<HTMLDivElement>(null)
    const length = slideRef.current ? slideRef.current.children.length : 0;
    const router = useRouter()


    const goTo = () => {
        router.push(`/contact`)
    }

    const nextSlide = () => {
        if (slideRef.current) {
            if (current === length - 1) {
                setCurrent(0)
            } else {
                setCurrent(current + 1)
            }
        }
    }

    const prevSlide = () => {
        if (slideRef.current) {
            if (current === 0) {
                setCurrent(length - 1)
            } else {
                setCurrent(current - 1)
            }
        }
    }

    useEffect(() => {
        if (slideRef.current) {
            slideRef.current.style.transform = `translateX(-${current * 100}%)`
        }

        const interval = setInterval(() => {
            if (slideRef.current) {
                if (current === length - 1) {
                    setCurrent(0)
                } else {
                    setCurrent(current + 1)
                }
            }
        }, 5000)
        
        return () => clearInterval(interval)
    }, [current])

  return (
    <div className={"w-full h-screen flex flex-col items-center justify-center"}>
        <div className={"w-full h-screen overflow-hidden relative flex "}>

            <div className={`${"absolute top-1/2 -traslate-y-1/2 z-[1]"} ${"left-[10px]"}`}>
                <button className="text-[50px] bg-transparent outline-none border-none text-[#ffffff55] duration-300 hover:text-white" onClick={prevSlide}> <GoChevronLeft /> </button>
            </div>
            <div className={`${"absolute top-1/2 -traslate-y-1/2 z-[1]"} ${"right-[10px]"}`}>
                <button className="text-[50px] bg-transparent outline-none border-none text-[#ffffff55] duration-300 hover:text-white" onClick={nextSlide}> <GoChevronRight /> </button>
            </div>

            <div ref={slideRef} className={"min-w-full h-screen relative flex items-center duration-[0.7s] delay-[.3s] ease-in-out"}>
                <div className={"relative min-w-full max-w-full h-screen flex justify-end items-end "}>
                    <Image className=' w-full h-full object-cover brightness-[65%] blur-sm lg:blur-0' src="/images/home/hero/justice.jpg" alt="hero1" width={1920} height={1080} />
                    <motion.div className={"absolute z-10 left-0 lg:left-[100px] px-8 md:px-0 lg:max-w-[900px] pb-[100px] flex flex-col text-center lg:text-left items-center lg:items-start gap-[100px]"}>
                        <AnimatePresence>
                            {current === 0 && (
                                <>
                                    <motion.h1 variants={variant1} initial="hidden" animate="visible" exit="exit" className={"text-4xl xs:text-6xl sm:text-[82px] leading-[2.75rem] xs:leading-[6rem] font-bold sm:font-semibold text-[#fff] px-8 md:px-0"} >Your Trusted Legal <span className='text-[#FCA834]'>Advisors</span></motion.h1>
                                    <motion.button variants={variant2} initial="hidden" animate="visible" exit="exit" onClick={() => goTo()} className='text-2xl text-white bg-[#085AA3] hover:shadow-[0_0_10px_5px_#ffffff55] w-fit rounded-lg duration-300 py-5 px-14'>More Detail</motion.button>
                                </>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
                <div className={"relative min-w-full max-w-full h-screen flex justify-end items-end "}>
                    <Image className=' w-full h-full object-cover brightness-[65%] blur-sm lg:blur-0' src="/images/home/hero/justice-2.jpg" alt="hero1" width={1920} height={1080} />
                    <motion.div className={"absolute z-10 left-0 lg:left-[100px] px-8 md:px-0 lg:max-w-[900px] pb-[100px] flex flex-col text-center lg:text-left items-center lg:items-start gap-[100px]"}>
                        <AnimatePresence>
                            {current === 1 && (
                                <>
                                    <motion.h1 variants={variant1} initial="hidden" animate="visible" exit="exit" className={"text-4xl xs:text-6xl sm:text-[82px] leading-[2.75rem] xs:leading-[6rem] font-bold sm:font-semibold text-[#fff] px-8 md:px-0"} ><span className='text-[#FCA834]'>Expert</span> Legal Solutions Tailored to You </motion.h1>
                                    <motion.button variants={variant2} initial="hidden" animate="visible" exit="exit" onClick={() => goTo()} className='text-2xl text-white bg-[#085AA3] hover:shadow-[0_0_10px_5px_#ffffff55] w-fit rounded-lg duration-300 py-5 px-14'>More Detail</motion.button>
                                </>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
                <div className={"relative min-w-full max-w-full h-screen flex justify-end items-end "}>
                    <Image className=' w-full h-full object-cover brightness-[65%] blur-sm lg:blur-0' src="/images/home/hero/justice-3.jpg" alt="hero1" width={1920} height={1080} />
                    <motion.div className={"absolute z-10 left-0 lg:left-[100px] px-8 md:px-0 lg:max-w-[900px] pb-[100px] flex flex-col text-center lg:text-left items-center lg:items-start gap-[100px]"}>
                        <AnimatePresence>
                            {current === 2 && (
                                <>
                                    <motion.h1 variants={variant1} initial="hidden" animate="visible" exit="exit" className={"text-4xl xs:text-6xl sm:text-[82px] leading-[2.75rem] xs:leading-[6rem] font-bold sm:font-semibold text-[#fff] px-8 md:px-0"} >Committed to Your <span className='text-[#FCA834]'>Legal</span> Success</motion.h1>
                                    <motion.button variants={variant2} initial="hidden" animate="visible" exit="exit" onClick={() => goTo()} className='text-2xl text-white bg-[#085AA3] hover:shadow-[0_0_10px_5px_#ffffff55] w-fit rounded-lg duration-300 py-5 px-14'>More Detail</motion.button>
                                </>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
                
            </div>
            
        </div>
    </div>
  )
}

