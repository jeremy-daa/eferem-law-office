import React from 'react'
import Hero from '../../components/Hero'
import Lawyers from './Lawyers'
import QuickConsultationForm from '@/components/QuickConsultationForm'
import LetsWork from '../LetsWork'

export default function page() {
  return (
    <div className="w-full min-h-screen relative bg-[#0A1D37] text-[#0A1D37] selection:bg-[#FBA832] selection:text-[#0A1D37]">
      <Hero title="Our Team" subtitle="Distinguished Legal Advocates & Senior Counsel in Ethiopia" />
      <Lawyers />
      <QuickConsultationForm />
      <LetsWork />
    </div>
  )
}

