// Database types
export interface Project {
	id: string;
	title: string;
	description: string;
	bg_image: string;
	link?: string;
	order_index: number;
	created_at: string;
	updated_at: string;
}

export interface Service {
	id: string;
	title: string;
	description: string;
	icon: string;
	link?: string;
	order_index: number;
	created_at: string;
	updated_at: string;
}

export interface Setting {
	id: string;
	key: string;
	value: string;
	created_at: string;
	updated_at: string;
}

// Form types
export interface ProjectFormData {
	title: string;
	description: string;
	bg_image: string;
	link: string;
	order_index: number;
}

export interface ServiceFormData {
	title: string;
	description: string;
	icon: string;
	link: string;
	order_index: number;
}

// Component props
export interface ThemeProps {
	isDarkMode: boolean;
	setIsDarkMode?: (value: boolean) => void;
}
