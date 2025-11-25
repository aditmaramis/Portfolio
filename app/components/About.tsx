import { assets, infoList, toolsData } from '@/assets/assets';
import Image from 'next/image';
import React from 'react';
import { motion } from 'motion/react';
import type { ThemeProps } from '@/types';

const About = ({ isDarkMode }: ThemeProps) => {
	return (
		<section
			id="about"
			className="w-full px-[8%] py-10 scroll-mt-20"
		>
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center mb-12"
				>
					<p className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium tracking-wider uppercase mb-2">
						Introduction
					</p>
					<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
						Who I Am
					</h2>
				</motion.div>

				{/* Main Content Grid */}
				<div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
					{/* Left Side - Info Cards */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="grid grid-cols-1 gap-6"
					>
						{infoList.map(({ icon, iconDark, title, description }, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
								whileHover={{ y: -8 }}
								className="group bg-white dark:bg-zinc-800/50 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:border-black dark:hover:border-white transition-all duration-300 hover:shadow-lg"
							>
								<div className="mb-4">
									<Image
										src={isDarkMode ? iconDark : icon}
										alt={title}
										className="w-8 h-8"
									/>
								</div>
								<h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
									{title}
								</h3>
								<p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
									{description}
								</p>
							</motion.div>
						))}
					</motion.div>

					{/* Right Side - Description and Tools */}
					<div className="space-y-8">
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className="lg:pl-8"
						>
							<p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
								A former hotelier with over 10 years of experience, now
								reinvented as a full stack web developer. My background in
								delivering high-quality guest experiences translates into
								building intuitive, user-focused digital solutions. I bring both
								people skills and technical depth to every project, with a
								passion for creating tools that are as elegant as they are
								effective.
							</p>
						</motion.div>

						{/* Tools Section */}
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6, delay: 0.6 }}
							className="lg:pl-8"
						>
							<h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
								Tools I Use
							</h3>
							<div className="flex flex-wrap gap-3">
								{toolsData.map((tool, index) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, scale: 0.8 }}
										whileInView={{ opacity: 1, scale: 1 }}
										transition={{ duration: 0.4, delay: 0.7 + index * 0.05 }}
										whileHover={{ scale: 1.1, y: -2 }}
										className="bg-white dark:bg-zinc-800/50 border-2 border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:border-black dark:hover:border-white transition-all duration-300"
									>
										<Image
											src={tool}
											alt="tool"
											className="w-8 h-8"
										/>
									</motion.div>
								))}
							</div>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;
