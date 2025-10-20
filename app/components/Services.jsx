import { assets, serviceData } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'
import { motion } from "motion/react"

const Services = () => {
  return (
    <motion.div
    initial={{opacity: 0}}
    whileInView={{opacity: 1}}
    transition={{duration: 1}}
    id='services' className='w-full px-[12%} py-10 scroll-mt-20'>
        <motion.h4
        initial={{opacity: 0, y: -20}}
        whileInView={{opacity: 1, y: 0}}
        transition={{duration: 0.5, delay: 0.3}}
        className='text-center mb-2 text-lg'>services</motion.h4>

        <motion.h2
        initial={{opacity: 0, y: -20}}
        whileInView={{opacity: 1, y: 0}}
        transition={{duration: 0.5, delay: 0.5}}
        className='text-center mb-10 text-5xl'>what i do..</motion.h2>

        <motion.p
        initial={{opacity: 0}}
        whileInView={{opacity: 1}}
        transition={{duration: 0.5, delay: 0.7}}
        className='text-center max-w-2xl mx-auto mt-5 mb-12 px-10'>i offer end-to-end digital solutions including web development and UI/UX design. i also provide custom graphic design services to help brands stand out with visually compelling and user-friendly experiences. my journey from hotel floors to full-stack frameworks taught me that every detail matters — in service, and in software.
        </motion.p>

        <motion.div
        initial={{opacity: 0}}
        whileInView={{opacity: 1}}
        transition={{duration: 0.6, delay: 0.9}}     
        className='grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 my-20 mx-10 lg:mx-50'>
            {serviceData.map(({icon, title, description, link}, index)=>(
                <motion.div
                whileHover={{scale: 1.05}}
                key={index}
                className='border border-gray-400 rounded-lg px-8 py-8 hover:shadow-md hover:shadow-black cursor-pointer hover:bg-rose-50 hover:-translate-y-1 duration-500 dark:hover:bg-zinc-500 dark:hover:shadow-white'>
                    <Image src={icon} alt='' className='w-10' />
                    <h3 className='text-lg my-4 text-grey-700 dark:text-white'>{title}</h3>
                    <p className='text-sm text-gray-600 leading-5 dark:text-white/80'>
                        {description}
                    </p>
                </motion.div>
            ))}
        </motion.div>
    </motion.div>
  )
}

export default Services