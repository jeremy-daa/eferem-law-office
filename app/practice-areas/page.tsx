import Hero from '@/components/Hero'
import React from 'react'
import PAList from './PAList'

export default function page() {
  return (
    <div className="w-full min-h-screen relative">
        <Hero title="Practice Areas" />
        <PAList />
    </div>
  )
}
