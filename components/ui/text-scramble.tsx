'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface TextScrambleProps {
	phrases: string[];
	className?: string;
	delay?: number;
	chars?: string;
}

export const TextScramble = ({
	phrases,
	className,
	delay = 800,
	chars = '!<>-_\\/[]{}—=+*^?#________',
}: TextScrambleProps) => {
	const [output, setOutput] = useState('');
	const frameRef = useRef(0);
	const queueRef = useRef<
		{ from: string; to: string; start: number; end: number; char?: string }[]
	>([]);
	const resolveRef = useRef<(() => void) | null>(null);
	const frameRequestRef = useRef<number | null>(null);
	const counterRef = useRef(0);
	const currentTextRef = useRef('');

	const randomChar = useCallback(() => {
		return chars[Math.floor(Math.random() * chars.length)];
	}, [chars]);

	const update = useCallback(() => {
		let outputStr = '';
		let complete = 0;

		for (let i = 0, n = queueRef.current.length; i < n; i++) {
			const { from, to, start, end } = queueRef.current[i];
			let { char } = queueRef.current[i];

			if (frameRef.current >= end) {
				complete++;
				outputStr += to;
			} else if (frameRef.current >= start) {
				if (!char || Math.random() < 0.28) {
					char = randomChar();
					queueRef.current[i].char = char;
				}
				outputStr += `<span class="text-gray-500">${char}</span>`;
			} else {
				outputStr += from;
			}
		}

		setOutput(outputStr);

		if (complete === queueRef.current.length) {
			resolveRef.current?.();
		} else {
			frameRequestRef.current = requestAnimationFrame(update);
			frameRef.current++;
		}
	}, [randomChar]);

	const setText = useCallback(
		(newText: string): Promise<void> => {
			const oldText = currentTextRef.current;
			const length = Math.max(oldText.length, newText.length);
			const promise = new Promise<void>((resolve) => {
				resolveRef.current = resolve;
			});

			queueRef.current = [];
			for (let i = 0; i < length; i++) {
				const from = oldText[i] || '';
				const to = newText[i] || '';
				const start = Math.floor(Math.random() * 40);
				const end = start + Math.floor(Math.random() * 40);
				queueRef.current.push({ from, to, start, end });
			}

			if (frameRequestRef.current) {
				cancelAnimationFrame(frameRequestRef.current);
			}
			frameRef.current = 0;
			currentTextRef.current = newText;
			update();

			return promise;
		},
		[update]
	);

	useEffect(() => {
		const next = () => {
			setText(phrases[counterRef.current]).then(() => {
				setTimeout(next, delay);
			});
			counterRef.current = (counterRef.current + 1) % phrases.length;
		};

		next();

		return () => {
			if (frameRequestRef.current) {
				cancelAnimationFrame(frameRequestRef.current);
			}
		};
	}, [phrases, delay, setText]);

	return (
		<span
			className={cn('font-mono font-light', className)}
			dangerouslySetInnerHTML={{ __html: output }}
		/>
	);
};

