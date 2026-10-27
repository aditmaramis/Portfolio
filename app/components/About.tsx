import React from 'react';
import { motion } from 'motion/react';
import type { ThemeProps } from '@/types';
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';
import { NumberSnapper } from '@/components/ui/number-snapper';
import SectionHeader from './SectionHeader';

const testimonials = [
	{
		quote:
			'Kicked off my hospitality career by learning alongside incredible individuals that shaped my mindset around precision, attention to detail, and continuous improvement.',
		name: 'Culinary Intern',
		designation: 'USA, 2011',
		src: '/chef.webp',
	},
	{
		quote:
			'The chapter that strengthened my analytical thinking and ability to manage complex moving parts.',
		name: 'Restaurant Supervisor',
		designation: 'Indonesia/USA/UAE, 2014',
		src: '/spv.webp',
	},
	{
		quote:
			'A stage where leadership became not just a responsibility, but a daily practice.',
		name: 'Restaurant Manager',
		designation: 'Seychelles, 2024',
		src: '/mgr.webp',
	},
	{
		quote:
			'The shift into web development started by joining a coding bootcamp, where I learned the fundamentals of software engineering.',
		name: 'Hotelier Reinvented',
		designation: 'Indonesia, 2025',
		src: '/jcwd.webp',
	},
];

// Timeline events for the career journey
const careerTimeline: Record<number, string> = {
	2011: 'Started as a Culinary Intern in the USA',
    2013: 'Graduated with BA in International Hotel and Events Management',
	2014: 'Promoted to Restaurant Supervisor',
	2017: 'Back to the USA for new opportunities',
    2018: 'Broaden my experience by relocating to the UAE',
	2020: 'Navigated the industry through challenging times',
	2024: 'Became Restaurant Manager in Seychelles',
	2025: 'Career pivot into Full Stack Web Development',
};

const About = ({ isDarkMode }: ThemeProps) => {
	const paragraphColor = isDarkMode ? 'text-gray-300' : 'text-gray-700';

	return (
		<section
			id="about"
			className="w-full px-[8%] py-10 scroll-mt-20"
		>
			<div className="max-w-7xl mx-auto">
				<SectionHeader eyebrow="Introduction" title="Who I Am" />

				{/* Main Content Grid */}
				<div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
					{/* Left Column - Testimonials Carousel */}
					<div className="flex justify-center lg:justify-start lg:-mt-12">
						<AnimatedTestimonials
							autoplay
							testimonials={testimonials}
							className="w-full"
						/>
					</div>

					{/* Right Column - Description */}
					<div className="space-y-8">
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className="lg:pl-8"
						>
							<p
								className={`text-lg md:text-lg leading-relaxed ${paragraphColor}`}
							>
								A former hotelier with over 10 years of experience, now
								reinvented as a full stack web developer. My background in
								delivering high-quality guest experiences translates into
								building intuitive, user-focused digital solutions. I bring both
								people skills and technical depth to every project, by focusing
								on crafting delightful user journeys, building performant
								frontends, and shipping dependable backends.
							</p>
						</motion.div>

						{/* Timeline Slider */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.4 }}
							className="lg:pl-8"
						>
							<NumberSnapper
								label="My Journey Timeline"
								min={2011}
								max={2025}
								step={1}
								data={careerTimeline}
								variant="timeline"
							/>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;
