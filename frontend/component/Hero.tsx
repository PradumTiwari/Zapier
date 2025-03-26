'use client'
import React from 'react'
import { PrimaryButton } from './Button/PrimaryButton'
import { SecondaryButton } from './Button/SecondaryButton'
import {Feature} from './Feature'
import { useRouter } from 'next/navigation'

const Hero = () => {
  const router=useRouter();
  return (
    <div>
   <div>
        <div className='flex justify-center'>
            <div className='text-4xl font-semibold text-center pt-8 max-w-xl'>
                Automate As fast as you can
            </div>
         </div>
         <div className='flex justify-center'>
            <div className='text-xl font-normal max-w-2xl text-center pt-8'>
            Turn chaos into smooth operations by automating workflows yourself—no developers, no IT tickets, no delays. The only limit is your imagination.
             </div>
         </div>
        <div className='flex justify-center pt-8'>
        <div className='flex'>
           <PrimaryButton onClick={()=>{
            router.push("/login")
           }} size='big'>Get Started Free</PrimaryButton>
          <SecondaryButton onClick={()=>{}} size='big'>Contact Us</SecondaryButton>
         </div>
        </div>
   </div>
            <div className='flex justify-center pt-4'>
              <Feature title='Free Forever' subtitle='for Core features'></Feature>
              <Feature title='More Apps' subtitle='than any other platform'></Feature>
              <Feature title='Cutting Edge' subtitle='Ai features'></Feature>
            </div>
   </div>
  )
}

export default Hero