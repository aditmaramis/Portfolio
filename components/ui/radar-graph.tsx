'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface RadarGraphProps {
	className?: string;
	labels?: {
		top?: string;
		topRight?: string;
		bottomRight?: string;
		bottom?: string;
		bottomLeft?: string;
		topLeft?: string;
	};
}

// Center point of the radar
const CENTER_X = 254.593;
const CENTER_Y = 190.718;

// Original dot positions
const DOT_POSITIONS = {
	top: { x: 255.093, y: 51.218, labelKey: 'top' },
	topRight: { x: 366.593, y: 126.218, labelKey: 'topRight' },
	bottomRight: { x: 352.593, y: 249.274, labelKey: 'bottomRight' },
	bottom: { x: 253.482, y: 259.274, labelKey: 'bottom' },
	bottomLeft: { x: 159.093, y: 244.274, labelKey: 'bottomLeft' },
	topLeft: { x: 149.093, y: 130.218, labelKey: 'topLeft' },
};

const DOT_ORDER = [
	'top',
	'topRight',
	'bottomRight',
	'bottom',
	'bottomLeft',
	'topLeft',
] as const;

// Calculate hover position (pulled 15% further from center)
const getHoverPosition = (pos: { x: number; y: number }) => {
	const dx = pos.x - CENTER_X;
	const dy = pos.y - CENTER_Y;
	return {
		x: CENTER_X + dx * 1.15,
		y: CENTER_Y + dy * 1.15,
	};
};

// Get current position based on hover state
const getCurrentPosition = (
	key: string,
	hoveredDot: string | null
): { x: number; y: number } => {
	const pos = DOT_POSITIONS[key as keyof typeof DOT_POSITIONS];
	if (hoveredDot === key) {
		return getHoverPosition(pos);
	}
	return pos;
};

// Generate SVG path d attribute from positions
const getPathD = (hoveredDot: string | null): string => {
	const positions = DOT_ORDER.map((key) => getCurrentPosition(key, hoveredDot));
	const first = positions[0];
	const rest = positions.slice(1);
	return `M ${first.x} ${first.y} ${rest
		.map((p) => `L ${p.x} ${p.y}`)
		.join(' ')} Z`;
};

export const RadarGraph = ({
	className,
	labels = {
		top: 'Front',
		topRight: 'Management',
		bottomRight: 'Back',
		bottom: 'System',
		bottomLeft: 'Architecture',
		topLeft: 'Communication',
	},
}: RadarGraphProps) => {
	const groupRef = useRef<SVGGElement>(null);
	const hasAnimated = useRef(false);
	const [hoveredDot, setHoveredDot] = useState<string | null>(null);

	useEffect(() => {
		const group = groupRef.current;
		if (!group || hasAnimated.current) return;

		// Get bounding box center
		const bbox = group.getBBox();
		const cx = bbox.x + bbox.width / 2 + 9;
		const cy = bbox.y + bbox.height / 2;

		// Set initial state (scaled to 0)
		group.style.transformOrigin = `${cx}px ${cy}px`;
		group.style.transform = 'scale(0)';

		// Animate with a slight delay
		const timeout = setTimeout(() => {
			group.style.transition =
				'transform 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
			group.style.transform = 'scale(1)';
			hasAnimated.current = true;
		}, 100);

		return () => clearTimeout(timeout);
	}, []);

	// Create pattern ID unique to this instance
	const patternId = useRef(
		`radar-pattern-${Math.random().toString(36).substr(2, 9)}`
	);
	const maskId = useRef(
		`radar-mask-${Math.random().toString(36).substr(2, 9)}`
	);
	const gradientId = useRef(
		`radar-gradient-${Math.random().toString(36).substr(2, 9)}`
	);

	return (
		<svg
			version="1.0"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 509.426 381.718"
			className={cn('w-full max-w-md', className)}
			style={{ overflow: 'visible' }}
		>
			<defs>
				{/* Diagonal stripe pattern */}
				<pattern
					id={patternId.current}
					patternUnits="userSpaceOnUse"
					width="10"
					height="10"
				>
					<path
						d="M10-5-10,15M15,0,0,15M0-5-20,15"
						fill="none"
						stroke="currentColor"
						strokeWidth="5"
						className="text-amber-400 dark:text-amber-500"
					/>
				</pattern>

				{/* Radial gradient for the filled area */}
				<radialGradient
					id={gradientId.current}
					cx="0.5"
					cy="0.65"
					r="0.6"
				>
					<stop
						offset="0%"
						className="text-amber-400 dark:text-amber-500"
						stopColor="currentColor"
					/>
					<stop
						offset="100%"
						stopColor="white"
						stopOpacity="0.8"
					/>
				</radialGradient>

				{/* Mask with pattern - dynamic */}
				<mask id={maskId.current}>
					<motion.path
						fillRule="evenodd"
						clipRule="evenodd"
						fill={`url(#${patternId.current})`}
						d={getPathD(hoveredDot)}
						animate={{ d: getPathD(hoveredDot) }}
						transition={{ duration: 0.3, ease: 'easeOut' }}
					/>
				</mask>
			</defs>

			{/* Background axes */}
			<polygon
				fillRule="evenodd"
				clipRule="evenodd"
				className="fill-gray-300 dark:fill-gray-600"
				points="403.4,106.209 402.4,104.477 255.593,189.236 255.593,19.718 253.593,19.718 253.593,189.13 106.592,104.218 105.593,105.951 252.685,190.915 105.786,275.727 106.786,277.459 253.593,192.7 253.593,362.218 255.593,362.218 255.593,192.595 402.093,277.218 403.093,275.486 256.684,190.916"
			/>

			{/* Animated group */}
			<g ref={groupRef}>
				{/* Filled radar area with mask - dynamic */}
				<motion.path
					fillRule="evenodd"
					clipRule="evenodd"
					fill={`url(#${gradientId.current})`}
					mask={`url(#${maskId.current})`}
					d={getPathD(hoveredDot)}
					animate={{ d: getPathD(hoveredDot) }}
					transition={{ duration: 0.3, ease: 'easeOut' }}
				/>

				{/* Connecting lines - animated path for smooth animation */}
				<motion.path
					d={getPathD(hoveredDot)}
					fill="none"
					className="stroke-amber-400 dark:stroke-amber-500"
					strokeWidth="4"
					strokeLinejoin="round"
					animate={{ d: getPathD(hoveredDot) }}
					transition={{ duration: 0.3, ease: 'easeOut' }}
				/>

				{/* Data point dots - interactive */}
				{Object.entries(DOT_POSITIONS).map(([key, pos]) => {
					const isHovered = hoveredDot === key;
					const hoverPos = getHoverPosition(pos);
					const currentX = isHovered ? hoverPos.x : pos.x;
					const currentY = isHovered ? hoverPos.y : pos.y;
					const radius = isHovered ? 14 : 10;

					return (
						<g key={key}>
							{/* Invisible larger hit area - stays at original position */}
							<circle
								cx={pos.x}
								cy={pos.y}
								r={35}
								fill="transparent"
								className="cursor-pointer"
								onMouseEnter={() => setHoveredDot(key)}
								onMouseLeave={() => setHoveredDot(null)}
							/>
							{/* Visible dot that moves */}
							<circle
								cx={currentX}
								cy={currentY}
								r={radius}
								className="fill-amber-400 dark:fill-amber-500 pointer-events-none"
								style={{
									transition:
										'cx 0.3s ease-out, cy 0.3s ease-out, r 0.3s ease-out',
								}}
							/>
						</g>
					);
				})}
			</g>

			{/* Labels */}
			<g
				className="text-sm font-light fill-gray-600 dark:fill-gray-400"
				style={{ fontFamily: "'Roboto', sans-serif" }}
			>
				<text
					x="254.593"
					y="11.72"
					textAnchor="middle"
					className={cn(
						'transition-all duration-300 origin-center',
						hoveredDot === 'top' && 'font-medium scale-110'
					)}
					style={{
						transform: hoveredDot === 'top' ? 'scale(2)' : 'scale(1)',
						transformOrigin: '254.593px 11.72px',
						transition: 'transform 0.3s ease-out, font-weight 0.3s ease-out',
					}}
				>
					{labels.top}
				</text>
				<text
					x="254.593"
					y="378.22"
					textAnchor="middle"
					className={cn(
						'transition-all duration-300',
						hoveredDot === 'bottom' && 'font-medium'
					)}
					style={{
						transform: hoveredDot === 'bottom' ? 'scale(2)' : 'scale(1)',
						transformOrigin: '254.593px 378.22px',
						transition: 'transform 0.3s ease-out, font-weight 0.3s ease-out',
					}}
				>
					{labels.bottom}
				</text>
				<text
					x="413.48"
					y="104.22"
					className={cn(
						'transition-all duration-300',
						hoveredDot === 'topRight' && 'font-medium'
					)}
					style={{
						transform: hoveredDot === 'topRight' ? 'scale(2)' : 'scale(1)',
						transformOrigin: '413.48px 104.22px',
						transition: 'transform 0.3s ease-out, font-weight 0.3s ease-out',
					}}
				>
					{labels.topRight}
				</text>
				<text
					x="95"
					y="104.22"
					textAnchor="end"
					className={cn(
						'transition-all duration-300',
						hoveredDot === 'topLeft' && 'font-medium'
					)}
					style={{
						transform: hoveredDot === 'topLeft' ? 'scale(2)' : 'scale(1)',
						transformOrigin: '95px 104.22px',
						transition: 'transform 0.3s ease-out, font-weight 0.3s ease-out',
					}}
				>
					{labels.topLeft}
				</text>
				<text
					x="105"
					y="287.46"
					textAnchor="end"
					className={cn(
						'transition-all duration-300',
						hoveredDot === 'bottomLeft' && 'font-medium'
					)}
					style={{
						transform: hoveredDot === 'bottomLeft' ? 'scale(2)' : 'scale(1)',
						transformOrigin: '105px 287.46px',
						transition: 'transform 0.3s ease-out, font-weight 0.3s ease-out',
					}}
				>
					{labels.bottomLeft}
				</text>
				<text
					x="413.48"
					y="287.22"
					className={cn(
						'transition-all duration-300',
						hoveredDot === 'bottomRight' && 'font-medium'
					)}
					style={{
						transform: hoveredDot === 'bottomRight' ? 'scale(2)' : 'scale(1)',
						transformOrigin: '413.48px 287.22px',
						transition: 'transform 0.3s ease-out, font-weight 0.3s ease-out',
					}}
				>
					{labels.bottomRight}
				</text>
			</g>
		</svg>
	);
};

export default RadarGraph;
