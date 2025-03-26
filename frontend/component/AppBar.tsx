'use client'
import React from 'react'
import LinkButton from './Button/LinkButton'
import { useRouter } from 'next/navigation'
import { PrimaryButton } from './Button/PrimaryButton'

const AppBar = () => {
  const router=useRouter();
  return (
    <div className='flex border-b justify-between'>
      <div className='text-2xl'>
        Zapier
      </div>
      <div className='flex'>
        <div className='font-small'>
          <LinkButton onClick={()=>{}}>Contact Sales</LinkButton>
        </div>
        <div className='font-small'>
          <LinkButton onClick={()=>{
            router.push("/signin");
          }}>Login</LinkButton>
        </div>
        <PrimaryButton onClick={()=>{router.push('/signup')}}>
          SignUp
        </PrimaryButton>
       </div>
    </div>
  )
}

export default AppBar