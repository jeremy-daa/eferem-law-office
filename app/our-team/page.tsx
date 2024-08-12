import React from 'react'
import Hero from '../../components/Hero'
import Lawyers from './Lawyers'
import WeHelp from '../WeHelp'

export default function page() {
  return (
    <div className="w-full min-h-screen relative">
        <Hero title='Our Team' />
        <Lawyers />
        <WeHelp />
    </div>
  )
}
