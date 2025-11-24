import { assets } from '@/assets/assets';
import Image from 'next/image';
import React from 'react';
import type { ThemeProps } from '@/types';

const Footer = ({ isDarkMode }: ThemeProps) => {
	return (
		<div className="mt-20">
			<div className="text-center sm:flex items-center justify-between border-t border-gray-400 mx-[10%] mt-12 py-6">
				<p>© 2025 adit maramis. all rights reserved.</p>
				<ul className="flex items-center gap-10 justify-center mt-4 sm:mt-0">
					<li>
						<a
							target="_blank"
							href="https://github.com/aditmaramis"
						>
							GitHub
						</a>
					</li>
					<li>
						<a
							target="_blank"
							href="https://www.linkedin.com/in/adit-maramis-200b336a/"
						>
							LinkedIn
						</a>
					</li>
					<li>
						<Image
							src={isDarkMode ? assets.logo_closing_dark : assets.logo_closing}
							alt=""
							className="w-36 mx-auto mb-2"
						/>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Footer;
