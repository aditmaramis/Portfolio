import { assets, workData } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'
import { motion } from "motion/react"

const Work = (isDarkMode) => {
  return (
    <motion.div
    initial={{opacity: 0}}
    whileInView={{opacity: 1}}
    transition={{duration: 1}}
    id='work' className='w-full px-[12%} py-10 scroll-mt-20'>

        <motion.h4
        initial={{y: -20, opacity: 0}}
        whileInView={{y: 0, opacity: 1}}
        transition={{delay: 0.3, duration: 1}}
        className='text-center mb-2 text-lg'>my portfolio</motion.h4>

        <motion.h2
        initial={{y: -20, opacity: 0}}
        whileInView={{y: 0, opacity: 1}}
        transition={{delay: 0.5, duration: 0.5}}
        className='text-center mb-10 text-5xl'>what i did..</motion.h2>

        <motion.p
        initial={{opacity: 0}}
        whileInView={{opacity: 1}}
        transition={{delay: 0.7, duration: 0.5}}
        className='text-center max-w-2xl mx-auto mt-5 mb-12 px-10'>my capstone projects reflect how I love turning everyday challenges into digital solutions. i built an event management website that helps organizers and attendees connect easily through a clean, interactive interface. i also created an online grocery app where users can browse, add to cart, and purchase groceries effortlessly — all built from scratch with modern full-stack technologies.
        </motion.p>

        <motion.div
        initial={{opacity: 0}}
        whileInView={{opacity: 1}}
        transition={{delay: 0.9, duration: 0.6}}
        className='grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] mx-10 my-15 lg:mx-50 gap-5 dark:text-black'>
            {workData.map((project, index)=>(
                <motion.div
                whileHover={{scale: 1.05}}
                transition={{duration: 0.3}}
                key={index}
                className='aspect-square bg-no-repeat bg-cover bg-center rounded-lg relative cursor-pointer group' style={{backgroundImage: `url(${project.bgImage})`}}>
                    <div className='bg-white w-10/12 rounded-md absolute mx-10 bottom-5 left 1/2 -translate-x-5 py-3 px-5 flex items-center justify-between duration-500 group-hover:bottom-7'>
                        <div>
                            <h2 className='text-sm font-semibold'>{project.title}</h2>
                            <p className='text-xs text-gray-700'>{project.description}</p>
                        </div>
                        <div className='border rounded-full border-black w-9 aspect-square flex items-center justify-center shadow-[2px_2px_0_#000] group-hover:bg-lime-300 transition'>
                            <Image src={assets.send_icon} alt='send icon' className='w-5' />
                        </div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    </motion.div>
  )
}

export default Work