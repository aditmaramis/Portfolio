import type { Dispatch, SetStateAction } from 'react';

// Content types
export interface Project {
	title: string;
	description: string;
	bgImage: string;
}

// Component props
export interface ThemeProps {
	isDarkMode: boolean;
}

export interface ThemeToggleProps extends ThemeProps {
	setIsDarkMode: Dispatch<SetStateAction<boolean>>;
}
