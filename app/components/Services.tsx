'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { createClient } from '@/lib/supabase/client';
import type { Service } from '@/types';
import { RadarGraph } from '@/components/ui/radar-graph';
import { TextScramble } from '@/components/ui/text-scramble';

const scramblePhrases = [
	'Code smarter, not harder.',
	'Learn. Build. Iterate.',
	'AI-powered development.',
	'Always evolving.',
	'From zero to engineer.',
];

const Services = () => {
	const [services, setServices] = useState<Service[]>([]);
	const supabase = createClient();

	useEffect(() => {
		const fetchServices = async () => {
			const { data, error } = await supabase
				.from('services')
				.select('*')
				.order('order_index', { ascending: true });

			if (!error && data) {
				setServices(data);
			}
		};

		fetchServices();
	}, [supabase]);

	return (
		<motion.section
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 1 }}
			id="services"
			className="w-full px-[8%] py-10 scroll-mt-20"
		>
			<div className="max-w-7xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center mb-12"
				>
					<p className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium tracking-wider uppercase mb-2">
						Skills
					</p>
					<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
						What I Do
					</h2>
				</motion.div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
					<motion.p
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						className="text-base leading-relaxed text-gray-700 dark:text-gray-300"
					>
						I&apos;m still early in my journey as a software developer, but I am
						driven, curious, and not afraid to start from zero. I&apos;ve been
						building full-stack applications using JavaScript, React,
						Next.js,Node.js, and PostgreSQL, and I&apos;m constantly looking for
						opportunities to learn from others, take feedback, and evolve as a
						software engineer.
					</motion.p>

					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5, delay: 0.4 }}
						className="flex justify-center"
					>
						<RadarGraph
							labels={{
								top: 'Frontend',
								topRight: 'Backend',
								bottomRight: 'Database',
								bottom: 'DevOps',
								bottomLeft: 'UI/UX',
								topLeft: 'Testing',
							}}
							className="w-full max-w-[300px]"
						/>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.5 }}
						className="flex flex-col gap-4"
					>
						<h2 className='text-2xl font-bold'>AI Boost</h2>
						<p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
							I leverage AI as a learning companion to sharpen my coding skills
							and stay aligned with new technologies. It helps me code smarter,
							not harder, and push myself forward.
						</p>
						<div className="text-2xl text-green-700 dark:text-gray-400">
							<TextScramble
								phrases={scramblePhrases}
								delay={2000}
							/>
						</div>
					</motion.div>
				</div>
			</div>
		</motion.section>
	);
};

export default Services;
