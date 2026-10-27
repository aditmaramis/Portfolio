'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface NumberSnapperProps {
	label?: string;
	min?: number;
	max?: number;
	step?: number;
	value?: number;
	ticks?: number;
	data?: Record<number, string>;
	onChange?: (value: number) => void;
	className?: string;
	variant?: 'default' | 'timeline';
}

export const NumberSnapper = ({
	label = '',
	min = 0,
	max = 100,
	step = 1,
	value: initialValue,
	ticks: ticksProp,
	data,
	onChange,
	className,
	variant = 'default',
}: NumberSnapperProps) => {
	const [value, setValue] = useState(initialValue ?? min);
	const scrollRef = useRef<HTMLDivElement>(null);
	const isResizingRef = useRef(false);
	const scrollRangeRef = useRef(0);
	const isDraggingRef = useRef(false);
	const dragStartRef = useRef({ x: 0, scrollLeft: 0 });

	const range = max - min;
	const ticks = ticksProp ?? Math.floor(range / step);

	// Generate tick values
	const tickValues = Array.from({ length: ticks + 1 }, (_, i) =>
		Math.round(min + (i * range) / ticks)
	);

	const eventInfo = data?.[value];

	// Update scroll range on resize
	useEffect(() => {
		const scroll = scrollRef.current;
		if (!scroll) return;

		const updateScrollRange = () => {
			isResizingRef.current = true;
			scrollRangeRef.current = scroll.scrollWidth - scroll.clientWidth;
			// Set initial scroll position
			const initialPos =
				(((initialValue ?? min) - min) / range) * scrollRangeRef.current;
			scroll.scrollLeft = initialPos;
			setTimeout(() => {
				isResizingRef.current = false;
			}, 200);
		};

		const resizeObserver = new ResizeObserver(updateScrollRange);
		resizeObserver.observe(scroll);
		updateScrollRange();

		return () => resizeObserver.disconnect();
	}, [min, range, initialValue]);

	// Handle scroll to update value
	const handleScroll = useCallback(() => {
		if (isResizingRef.current) return;
		const scroll = scrollRef.current;
		if (!scroll || scrollRangeRef.current === 0) return;

		const rawValue = min + (scroll.scrollLeft / scrollRangeRef.current) * range;
		const snappedValue = Math.round(rawValue / step) * step;
		const clampedValue = Math.max(min, Math.min(max, snappedValue));

		if (clampedValue !== value) {
			setValue(clampedValue);
			onChange?.(clampedValue);
		}
	}, [min, max, range, step, value, onChange]);

	// Pointer drag handlers (like the original web component)
	const handlePointerDown = useCallback((e: React.PointerEvent) => {
		const scroll = scrollRef.current;
		if (!scroll) return;

		e.preventDefault();
		isDraggingRef.current = true;
		dragStartRef.current = { x: e.clientX, scrollLeft: scroll.scrollLeft };
		scroll.setPointerCapture(e.pointerId);
		scroll.style.cursor = 'grabbing';
	}, []);

	const handlePointerMove = useCallback((e: React.PointerEvent) => {
		if (!isDraggingRef.current) return;
		const scroll = scrollRef.current;
		if (!scroll) return;

		const delta = e.clientX - dragStartRef.current.x;
		scroll.scrollLeft = dragStartRef.current.scrollLeft - delta;
	}, []);

	const handlePointerUp = useCallback((e: React.PointerEvent) => {
		const scroll = scrollRef.current;
		if (!scroll) return;

		isDraggingRef.current = false;
		scroll.releasePointerCapture(e.pointerId);
		scroll.style.cursor = 'ew-resize';
	}, []);

	return (
		<div className={cn('w-full', className)}>
			<div className="grid gap-4 text-center select-none">
				{/* Label */}
				{label && (
					<p className="text-sm font-medium text-gray-600 dark:text-gray-400">
						{label}
					</p>
				)}

				{/* Current Value */}
				<div
					className={cn(
						'text-4xl font-semibold tabular-nums',
						variant === 'timeline'
							? 'font-serif text-amber-800 dark:text-amber-200'
							: 'text-gray-900 dark:text-white'
					)}
				>
					{value}
				</div>

				{/* Timeline Track Container */}
				<div className="relative h-16">
					{/* Fixed indicator (triangle + line) - stays in center */}
					<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
						{/* Triangle pointer */}
						<div
							className={cn(
								'w-4 h-2 mx-auto -mb-0.5',
								variant === 'timeline'
									? 'bg-amber-800 dark:bg-amber-300'
									: 'bg-gray-800 dark:bg-gray-200'
							)}
							style={{ clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)' }}
						/>
						{/* Vertical line */}
						<div
							className={cn(
								'w-1 h-8 mx-auto rounded-full',
								variant === 'timeline'
									? 'bg-amber-800 dark:bg-amber-300'
									: 'bg-gray-800 dark:bg-gray-200'
							)}
						/>
					</div>

					{/* Scrollable area */}
					<div
						ref={scrollRef}
						className="absolute inset-0 overflow-x-auto cursor-ew-resize scrollbar-hide"
						style={{
							scrollSnapType: 'x proximity',
							overscrollBehavior: 'none',
							maskImage:
								'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
							WebkitMaskImage:
								'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
						}}
						onScroll={handleScroll}
						onPointerDown={handlePointerDown}
						onPointerMove={handlePointerMove}
						onPointerUp={handlePointerUp}
						onPointerCancel={handlePointerUp}
					>
						{/* Scroll content with padding for centering */}
						<div
							className="flex h-full items-end"
							style={{
								width: '200%',
								paddingLeft: '50%',
								paddingRight: '50%',
							}}
						>
							{/* Tick marks */}
							<div className="flex justify-between items-end h-full w-full">
								{tickValues.map((tick) => {
									const hasData = data && tick in data;
									return (
										<div
											key={tick}
											data-value={tick}
											className={cn(
												'rounded-full flex-shrink-0',
												hasData
													? cn(
															'w-1 h-full',
															variant === 'timeline'
																? 'bg-amber-600 dark:bg-amber-400'
																: 'bg-gray-600 dark:bg-gray-300'
													  )
													: cn(
															'w-0.5 h-1/2',
															variant === 'timeline'
																? 'bg-amber-300/60 dark:bg-amber-700/60'
																: 'bg-gray-300 dark:bg-gray-600'
													  )
											)}
											style={{ scrollSnapAlign: 'center' }}
										/>
									);
								})}
							</div>
						</div>
					</div>

					{/* Min/Max labels */}
					<div className="absolute -bottom-5 left-0 text-xs text-gray-500 dark:text-gray-400">
						{min}
					</div>
					<div className="absolute -bottom-5 right-0 text-xs text-gray-500 dark:text-gray-400">
						{max}
					</div>
				</div>

				{/* Event Info */}
				{data && (
					<div className="min-h-[2.5rem] text-sm text-gray-600 dark:text-gray-400 mt-4">
						{eventInfo && <p>{eventInfo}</p>}
					</div>
				)}
			</div>
		</div>
	);
};

