import React from 'react'
import {Link} from 'react-router-dom'
import {SignIn} from '../../components/ui/SignIn'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
})

const SignInForm = () => {
  
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl sm:max-2-5xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left */}
        <div className='flex-1'>
          <Link to={"/"} className='font-bold text-2xl sm:text-4xl flex flex-wrap'>
          <span className='text-slate-500'>Morning</span>
          <span className='text-black'>Dispatch</span>
          </Link>

          <h2 className='text-[24px] md:text-[30px] font-bold leading-[140%] tracking-tighter pt-5 sm:pt-12'>Sign in to your account</h2>
        

        <p className='text-slate-500 text-[-14px] font-medium leading-[140%] md:text-[16px] md:font-normal mt-2'>Welcome back, Please provide your details</p>
</div>

        {/* right */}

    <div className='flex-1'>
    <SignIn/>
    </div>

      </div>
      
    </div>
  )
}

export default SignInForm
