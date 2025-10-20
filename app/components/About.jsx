import { assets, infoList, toolsData } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'
import { motion } from "motion/react"

const About = ({isDarkMode}) => {
  return (
    <motion.div
    initial={{opacity: 0}}
    whileInView={{opacity: 1}}
    transition={{duration: 1}}
    id='about' className='w-full px-[12%} py-10 scroll-mt-20'>
        <motion.h4
        initial={{opacity: 0, y: -20}}
        whileInView={{opacity: 1, y: 0}}
        transition={{duration: 0.5, delay: 0.3}}
        className='text-center mb-2 text-lg'>introduction</motion.h4>
        <motion.h2
        initial={{opacity: 0, y: -20}}
        whileInView={{opacity: 1, y: 0}}
        transition={{duration: 0.5, delay: 0.5}}
        className='text-center mb-10 text-5xl'>who i am..</motion.h2>

        <motion.div
        initial={{opacity: 0}}
        whileInView={{opacity: 1}}
        transition={{duration: 0.8}}
        className='flex w-full flex-col lg:flex-row items-center my-10'>
            <motion.div
            initial={{opacity: 0, scale: 0.9}}
            whileInView={{opacity: 1, scale: 1}}
            transition={{duration: 0.6}}
            className='w-64 sm:w-80 lg:ml-50 rounded-3xl max-w-none mb-10 lg:mb-0'>
                <Image priority={true} src={isDarkMode ? assets.user_image_dark : assets.user_image} alt='user' className='w-full rounded-3xl border-transparent border-3'/>
            </motion.div>
            <motion.div
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            transition={{duration: 0.6, delay: 0.8}}
            className='flex-1 mx-10'>
                <p className='mb-10 max-w-2xl'>a former hotelier with over 10 years of experience, now reinvented as a full stack web developer. my background in delivering high-quality guest experiences translates into building intuitive, user-focused digital solutions. i bring both people skills and technical depth to every project, with a passion for creating tools that are as elegant as they are effective.
                </p>
                    <motion.ul
                    initial={{opacity: 0}}
                    whileInView={{opacity: 1}}
                    transition={{duration: 0.8, delay: 1}}
                    className='grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl'>
                        {infoList.map(({icon, iconDark, title, description}, index)=>(
                            <motion.li
                            whileHover={{scale: 1.05}}
                            className='border-[0.5px] border-gray-400 rounded-xl p-6 cursor-pointer hover:bg-rose-50 hover:-translate-y-1 duration-500 hover:shadow-black hover:shadow-md dark:border-white dark:hover:shadow-white dark:hover:bg-zinc-500' key={index}>
                                <Image src={isDarkMode ? iconDark : icon} alt={title} className='w-7 mt-3'/>
                                <h3 className='my-4 font-semibold text-gray-700 dark:text-white'>{title}</h3>
                                <p className='text-gray-600 text-sm dark:text-white/80'>{description}</p>
                            </motion.li>
                        ))}
                    </motion.ul>
                <motion.h4
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.5, delay: 1.3}}
                className='mb-1 my-6 text-gray-700 dark:text-white/80'>tools i use</motion.h4>

                <motion.ul
                initial={{opacity: 0}}
                whileInView={{opacity: 1}}
                transition={{duration: 0.6, delay: 1.5}}
                className='flex items-center gap-3 sm:gap-5'>
                    {toolsData.map((tool, index)=>(
                        <motion.li
                        whileHover={{scale: 1.1}}
                        className='flex items-center justify-center w-12 sm:w-14 aspect-square border border-gray-400 rounded-lg cursor-pointer hover:shadow-black hover:shadow-md hover:bg-rose-50 hover:-translate-y-1 duration-500 dark:hover:bg-zinc-500 dark:hover:shadow-white'
                        key={index}>
                            <Image src={tool} alt='tool' className='w-5 sm:2-7' />
                        </motion.li>
                    ))}

                </motion.ul>
            </motion.div>
        </motion.div>
    </motion.div>
  )
}

export default About