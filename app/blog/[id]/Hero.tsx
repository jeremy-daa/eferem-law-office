import Image from 'next/image'
import React from 'react'

export default function Hero({title, date}: {title: string, date: any}) {

    const dateConverter = (date: any) => {
        const newDate = new Date(date)
        return newDate.toDateString()
    }

  return (
    <div className='relative w-full max-h-[450px] h-[650px] flex items-center justify-center mb-20'>
        <Image className='relative w-full h-full object-cover' src='/images/Contact.png' width={1920} height={650} alt='Hero' quality={100} />
        <div className="absolute flex flex-col items-center gap-10 text-center">
            <h2 className=' text-5xl sm:text-7xl text-white font-medium'>{title}</h2>
            <p className=' text-white'>{dateConverter(date)}</p>
        </div>
    </div>
  )
}
