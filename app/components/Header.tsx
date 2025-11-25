import { assets } from '@/assets/assets';
import Image from 'next/image';
import React from 'react';
import { motion } from 'motion/react';

const Header = () => {
	return (
		<div className="w-full px-[8%] py-20 lg:py-0 min-h-screen flex items-center justify-center">
			<div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
				{/* Left Content */}
				<motion.div
					initial={{ opacity: 0, x: -50 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8 }}
					className="flex flex-col gap-6 text-center lg:text-left order-2 lg:order-1 lg:pl-12"
				>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						<p className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium tracking-wider uppercase mb-2">
							Hello, I&apos;m
						</p>
						<h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4">
							Adit Maramis
						</h1>
						<div className="flex items-center justify-center lg:justify-start gap-2 text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700 dark:text-gray-300">
							<span>Full Stack Web Developer</span>
						</div>
					</motion.div>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.4 }}
						className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl mx-auto lg:mx-0"
					>
						I specialize in building clean, user-focused
						websites and applications that balance functionality with thoughtful
						design.
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.6 }}
						className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-4"
					>
						<a
							href="#contact"
							className="group px-8 py-3.5 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2"
						>
							Get In Touch
							<svg
								className="w-4 h-4 group-hover:translate-x-1 transition-transform"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M14 5l7 7m0 0l-7 7m7-7H3"
								/>
							</svg>
						</a>
						<a
							href="/maramis-resume.pdf"
							download
							className="group px-8 py-3.5 border-2 border-green-700 dark:border-gray-600 rounded-full font-medium hover:border-black dark:hover:border-white hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
						>
							Download Resume
							<Image
								src={assets.download_icon}
								alt="download"
								className="w-4 h-4 group-hover:translate-y-0.5 transition-transform"
							/>
						</a>
					</motion.div>
				</motion.div>

				{/* Right Image */}
				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					whileInView={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.8, delay: 0.2 }}
					className="relative flex items-center justify-center order-1 lg:order-2 lg:pr-12"
				>
					<div className="relative w-full max-w-lg">
						<div className="relative z-10">
							<Image
								priority={true}
								src={assets.hero}
								alt="Adit Maramis"
								width={400}
								height={400}
								className="h-auto"
							/>
						</div>

						{/* Decorative elements */}
						<div className="absolute -top-4 -right-4 w-72 h-72 bg-rose-200 dark:bg-rose-900/20 rounded-full blur-3xl opacity-20 -z-10" />
						<div className="absolute -bottom-4 -left-4 w-72 h-72 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-20 -z-10" />
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default Header;
