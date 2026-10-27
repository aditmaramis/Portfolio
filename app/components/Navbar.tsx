import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { assets } from '@/assets/assets';
import type { ThemeToggleProps } from '@/types';

const Navbar = ({ isDarkMode, setIsDarkMode }: ThemeToggleProps) => {
	const [isScroll, setIsScroll] = useState(false);
	const sideMenuRef = useRef<HTMLDivElement>(null);

	const openMenu = () => {
		if (sideMenuRef.current) {
			sideMenuRef.current.style.transform = 'translateX(-16rem)';
		}
	};

	const closeMenu = () => {
		if (sideMenuRef.current) {
			sideMenuRef.current.style.transform = 'translateX(16rem)';
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', () => {
			if (scrollY > 50) {
				setIsScroll(true);
			} else {
				setIsScroll(false);
			}
		});
	}, []);

	return (
		<>
			<nav
				className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-[1000] ${
					isScroll
						? 'bg-white/30 backdrop-blur-lg dark:bg-transparent dark:shadow-white/20'
						: ''
				}`}
			>
				<a
					href="#top"
					aria-label="back to top"
				>
					<Image
						priority={true}
						src={isDarkMode ? assets.logo_dark : assets.logo}
						className="w-28 cursor-pointer lg:mr-26"
						alt=""
					/>
				</a>

				<ul
					className={`hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 bg-white shadow-sm bg-opacity-50 dark:border dark:border-white/50 dark:bg-transparent
                ${
									isScroll
										? ''
										: 'bg-white shadow-sm bg-opacity-50 dark:border dark:border-white/50 dark:bg-transparent'
								}`}
				>
					<li>
						<a href="#top">home</a>
					</li>
					<li>
						<a href="#about">about</a>
					</li>
					<li>
						<a href="#services">skills</a>
					</li>
					<li>
						<a href="#work">projects</a>
					</li>
				</ul>

				<div className="flex items-center gap-4">
					<button
						aria-label="mode-button"
						onClick={() => setIsDarkMode((prev) => !prev)}
					>
						<Image
							src={isDarkMode ? assets.sun_icon : assets.moon_icon}
							alt=""
							className="w-6"
						/>
					</button>

					<a
						href="#contact"
						className="hidden lg:flex items-center gap-3 px-10 py-2.5 border border-gray-500 rounded-full ml-4 dark:border-white/50"
					>
						contact
						<Image
							src={isDarkMode ? assets.arrow_icon_dark : assets.arrow_icon}
							alt=""
							className="w-3"
						/>
					</a>

					<button
						className="block md:hidden ml-3"
						aria-label="menu-button"
						onClick={openMenu}
					>
						<Image
							src={isDarkMode ? assets.menu_white : assets.menu_black}
							alt=""
							className="w-6"
						/>
					</button>
				</div>

				{/* MOBILE */}

				<div
					ref={sideMenuRef}
					className="flex md:hidden flex-col gap-4 py-20 px-10 fixed -right-64 top-0 bottom-0 w-64 z-50 h-screen bg-rose-50 transition duration-500 dark:bg-zinc-500 dark:text-white"
				>
					<div
						className="absolute right-6 top-6"
						onClick={closeMenu}
					>
						<Image
							src={assets.close_black}
							alt=""
							className="w-5 cursor-pointer"
						/>
					</div>
					<ul>
						<li>
							<a
								onClick={closeMenu}
								href="#top"
							>
								home
							</a>
						</li>
						<li>
							<a
								onClick={closeMenu}
								href="#about"
							>
								about me
							</a>
						</li>
						<li>
							<a
								onClick={closeMenu}
								href="#services"
							>
								services
							</a>
						</li>
						<li>
							<a
								onClick={closeMenu}
								href="#work"
							>
								my work
							</a>
						</li>
						<li>
							<a
								onClick={closeMenu}
								href="#contact"
							>
								contact me
							</a>
						</li>
					</ul>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
