'use client';
import React from 'react';
import { motion } from 'motion/react';

type SectionHeaderProps = {
	eyebrow: string;
	title: string;
};

const SectionHeader = ({ eyebrow, title }: SectionHeaderProps) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			className="text-center mb-12"
		>
			<p className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium tracking-wider uppercase mb-2">
				{eyebrow}
			</p>
			<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
				{title}
			</h2>
		</motion.div>
	);
};

export default SectionHeader;
