'use client';
import { assets } from '@/assets/assets';
import { projects } from '@/data/projects';
import Image from 'next/image';
import React from 'react';
import { motion } from 'motion/react';
import SectionHeader from './SectionHeader';

const Work = () => {
	return (
		<motion.section
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 1 }}
			id="work"
			className="w-full px-[8%] py-10 scroll-mt-20"
		>
			<div className="max-w-7xl mx-auto">
				<SectionHeader eyebrow="Projects" title="What I Did" />

				<motion.p
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ delay: 0.3, duration: 0.5 }}
					className="text-center max-w-3xl mx-auto text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 mb-12"
				>
					My capstone projects reflect how I love turning everyday challenges
					into digital solutions. I built an event management website and an
					online grocery website app with UI/UX that allows a smooth and
					effortless experience — all built from scratch with modern full-stack
					technologies.
				</motion.p>

				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ delay: 0.5, duration: 0.6 }}
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
				>
					{projects.map((project) => (
						<motion.div
							whileHover={{ scale: 1.03 }}
							transition={{ duration: 0.3 }}
							key={project.title}
							className="aspect-square bg-no-repeat bg-cover bg-center rounded-2xl relative cursor-pointer group overflow-hidden"
							style={{ backgroundImage: `url(${project.bgImage})` }}
						>
							<div className="bg-white/95 dark:bg-gray-900/95 w-[85%] rounded-xl absolute left-1/2 -translate-x-1/2 bottom-4 py-4 px-5 flex items-center justify-between duration-300 group-hover:bottom-6">
								<div>
									<h3 className="text-sm font-semibold text-gray-900 dark:text-white">
										{project.title}
									</h3>
									<p className="text-xs text-gray-600 dark:text-gray-400">
										{project.description}
									</p>
								</div>
								<div className="border-2 rounded-full border-gray-900 dark:border-white w-9 aspect-square flex items-center justify-center group-hover:bg-black group-hover:border-black dark:group-hover:bg-white transition-all duration-300">
									<Image
										src={assets.send_icon}
										alt="send icon"
										className="w-4 group-hover:invert dark:invert dark:group-hover:invert-0 transition-all duration-300"
									/>
								</div>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</motion.section>
	);
};

export default Work;
