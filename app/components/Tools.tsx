'use client';
import Image from 'next/image';
import type { ThemeProps } from '@/types';

// Define logos with individual sizes
const toolLogos = [
	{ src: '/logos/javascript.svg', size: 'w-16 h-16 md:w-20 md:h-20' },
	{ src: '/logos/html-5.svg', size: 'w-16 h-16 md:w-20 md:h-20' },
	{ src: '/logos/css-3.svg', size: 'w-16 h-16 md:w-20 md:h-20' },
	{ src: '/logos/typescript.svg', size: 'w-16 h-16 md:w-20 md:h-20' },
	{ src: '/logos/vscode.svg', size: 'w-16 h-16 md:w-40 md:h-20' },
	{ src: '/logos/git.svg', size: 'w-16 h-16 md:w-20 md:h-20' },
	{ src: '/logos/tailwindcss.svg', size: 'w-16 h-16 md:w-30 md:h-20' },
	{ src: '/logos/bootstrap.svg', size: 'w-16 h-16 md:w-20 md:h-20' },
	{ src: '/logos/chromedevtools.svg', size: 'w-16 h-16 md:w-20 md:h-20' },
	{ src: '/logos/reactjs.svg', size: 'w-16 h-16 md:w-20 md:h-20' },
	{ src: '/logos/nodejs.svg', size: 'w-16 h-16 md:w-20 md:h-20' },
	{ src: '/logos/postgresql.svg', size: 'w-16 h-16 md:w-20 md:h-20' },
	{ src: '/logos/prisma.svg', size: 'w-16 h-16 md:w-20 md:h-20' },
	{ src: '/logos/supabase.svg', size: 'w-16 h-16 md:w-20 md:h-20' },
	{ src: '/logos/postman.svg', size: 'w-16 h-16 md:w-20 md:h-20' },
	{ src: '/logos/vercel.svg', size: 'w-16 h-16 md:w-20 md:h-20' },
	{ src: '/logos/railway.svg', size: 'w-16 h-16 md:w-20 md:h-20' },
	{ src: '/logos/github-copilot.svg', size: 'w-16 h-16 md:w-20 md:h-20' },
	{ src: '/logos/claude.svg', size: 'w-16 h-16 md:w-20 md:h-20' },
	{ src: '/logos/chatgpt.svg', size: 'w-16 h-16 md:w-20 md:h-20' },
];

const Tools = ({ isDarkMode }: ThemeProps) => {
	const topRow = toolLogos.slice(0, 10);
	const bottomRow = toolLogos.slice(10);

	const marqueeTop = [...topRow, ...topRow, ...topRow];
	const marqueeBottom = [...bottomRow, ...bottomRow, ...bottomRow];

	return (
		<section className="w-full overflow-hidden py-12 bg-white dark:bg-zinc-900 relative">
			{/* Gradient Overlays */}
			<div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white dark:from-zinc-900 to-transparent z-10 pointer-events-none" />
			<div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white dark:from-zinc-900 to-transparent z-10 pointer-events-none" />

			<div className="space-y-6">
				{/* Top Row */}
				<div className="flex w-max animate-scroll-left marquee-row">
					{marqueeTop.map((logo, index) => (
						<div
							key={`top-${index}`}
							className="flex-shrink-0 px-6 md:px-8"
						>
							<Image
								src={logo.src}
								alt={`top-tool-${index % topRow.length}`}
								width={80}
								height={80}
								className={`${logo.size} object-contain opacity-70 hover:opacity-100 transition-opacity`}
							/>
						</div>
					))}
				</div>

				{/* Bottom Row */}
				<div className="flex w-max animate-scroll-right marquee-row">
					{marqueeBottom.map((logo, index) => (
						<div
							key={`bottom-${index}`}
							className="flex-shrink-0 px-6 md:px-8"
						>
							<Image
								src={logo.src}
								alt={`bottom-tool-${index % bottomRow.length}`}
								width={80}
								height={80}
								className={`${logo.size} object-contain opacity-70 hover:opacity-100 transition-opacity`}
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Tools;
