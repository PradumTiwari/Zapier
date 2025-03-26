'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

const page = () => {
    const router=useRouter();
  return (
    <div className='flex justify-center items-center pt-[150px] '>
        <h1>It Looks Like You are Missing Something</h1>
        <h4>Please <button className='p-2 bg-amber-600 rounded-xl shadow-2xl cursor-pointer  ' onClick={()=>{router.push('/signin')}}>Signin here</button>  </h4>
    </div>
  )
}

export default page;