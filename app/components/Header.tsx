
import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'
import { motion } from "motion/react"

const Header = () => {
  return (
    <div className='w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-4'>
        <div className='relative flex items-end'>
        <motion.h3
        initial={{y: -20, opacity: 0}}
        whileInView={{y: 0, opacity: 1}}
        transition={{duration: 0.6, delay: 0.3}}
        className='inline-block gap-2 text-xl md:text-3xl w-60 font-extrabold'><span className='text-8xl'>hello</span><span className='text-red-500 text-8xl'>!</span> i'm <span className='underline decoration-red-500'>adit maramis</span></motion.h3>
        
        <motion.div
        initial={{scale: 0}}
        whileInView={{scale: 1}}
        transition={{duration: 0.8, type: 'spring', stiffness: 100}}
        >
            <Image priority={true} src={assets.profile_img} alt='' className='rounded-full w-50 mx-5' />
        </motion.div>
        
        </div>
            <motion.h1
            initial={{y: -30, opacity: 0}}
            whileInView={{y: 0, opacity: 1}}
            transition={{duration: 0.8, delay: 0.5}}
             className='text-3xl sm:text-6xl lg:text-[66px]'>fullstack web developer based in Indonesia.</motion.h1>
            <motion.p 
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            transition={{duration: 0.6, delay: 0.7}}
            className='max-w-2xl mx-auto'>
                i specialize in building clean, user-focused websites and applications that balance functionality with thoughtful design.
            </motion.p>
            <div className='flex flex-col sm:flex-row items-center gap-4 mt-4'>
                <motion.a
                initial={{y: 30, opacity: 0}}
                whileInView={{y: 0, opacity: 1}}
                transition={{duration: 0.6, delay: 1.2}}
                href='/maramis-resume.pdf' download className='px-10 py-3 border rounded-full border-gray-500 flex items-center gap-2 bg-white dark:text-black'>
                my resume <Image src={assets.download_icon} alt='' className='w-4' /></motion.a>
            </div>
    </div>
  )
}

export default Header