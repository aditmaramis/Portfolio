import { assets } from '@/assets/assets';
import Image from 'next/image';
import React, { useState } from 'react';
import { motion } from 'motion/react';

const Contact = () => {
	const [result, setResult] = useState('');

	const onSubmit = async (event) => {
		event.preventDefault();
		setResult('Sending....');
		const formData = new FormData(event.target);

		formData.append('access_key', '8fcd304f-4c57-4b32-b6e9-0eb5d36c272d');

		const response = await fetch('https://api.web3forms.com/submit', {
			method: 'POST',
			body: formData,
		});

		const data = await response.json();

		if (data.success) {
			setResult('Form Submitted Successfully');
			event.target.reset();
		} else {
			console.log('Error', data);
			setResult(data.message);
		}
	};

	return (
		<motion.section
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 1 }}
			id="contact"
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
						Connect With Me
					</p>
					<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
						Let&apos;s Chat!
					</h2>
				</motion.div>

				<motion.p
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ delay: 0.3, duration: 0.5 }}
					className="text-center max-w-3xl mx-auto text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 mb-12"
				>
					I&apos;d love to hear from you! If you have any questions, comments,
					or feedback, use the form below.
				</motion.p>

				<motion.form
					onSubmit={onSubmit}
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ delay: 0.5, duration: 0.5 }}
					className="max-w-2xl mx-auto"
				>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
						<motion.input
							initial={{ y: 20, opacity: 0 }}
							whileInView={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.6, duration: 0.5 }}
							type="text"
							placeholder="Enter your name"
							required
							className="w-full p-4 outline-none border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900/50 focus:border-gray-400 dark:focus:border-gray-500 transition-colors text-gray-900 dark:text-white placeholder:text-gray-500"
							name="name"
						/>

						<motion.input
							initial={{ y: 20, opacity: 0 }}
							whileInView={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.7, duration: 0.5 }}
							type="email"
							placeholder="Enter your email"
							required
							className="w-full p-4 outline-none border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900/50 focus:border-gray-400 dark:focus:border-gray-500 transition-colors text-gray-900 dark:text-white placeholder:text-gray-500"
							name="email"
						/>
					</div>
					<motion.textarea
						initial={{ y: 20, opacity: 0 }}
						whileInView={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.8, duration: 0.5 }}
						rows={6}
						placeholder="Enter your message"
						required
						className="w-full p-4 outline-none border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900/50 focus:border-gray-400 dark:focus:border-gray-500 transition-colors text-gray-900 dark:text-white placeholder:text-gray-500 mb-6"
						name="message"
					></motion.textarea>

					<motion.button
						whileHover={{ scale: 1.05 }}
						transition={{ duration: 0.3 }}
						type="submit"
						className="group px-8 py-3.5 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2 mx-auto"
					>
						Submit
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
					</motion.button>

					<p className="mt-6 text-center text-gray-600 dark:text-gray-400">
						{result}
					</p>
				</motion.form>
			</div>
		</motion.section>
	);
};

export default Contact;
