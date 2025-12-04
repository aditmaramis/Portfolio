'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { createClient } from '@/lib/supabase/client';
import type { Service } from '@/types';

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
						Services
					</p>
					<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
						What I Do
					</h2>
				</motion.div>

				<motion.p
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.3 }}
					className="text-center max-w-3xl mx-auto text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300"
				>
					I’m still early in my journey as a software developer, but I am driven, curious, and not afraid to start from zero. I genuinely love the process of learning, experimenting, and figuring things out one step at a time. I&apos;ve been building full-stack applications using JavaScript, React, Next.js, Node.js, PostgreSQL, and I&apos;m constantly looking for opportunities to learn from others, take feedback, and evolve as a software engineer.
				</motion.p>
			</div>
		</motion.section>
	);
};

export default Services;
