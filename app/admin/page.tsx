'use client';
import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { assets } from '@/assets/assets';

export default function AdminDashboard() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [activeTab, setActiveTab] = useState('projects');
	const router = useRouter();
	const supabase = createClient();

	useEffect(() => {
		const getUser = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			setUser(user);
			setLoading(false);

			if (!user) {
				router.push('/login');
			}
		};

		getUser();
	}, [router, supabase.auth]);

	const handleLogout = async () => {
		await supabase.auth.signOut();
		router.push('/');
		router.refresh();
	};

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-900">
				<div className="text-lg">Loading...</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-zinc-900">
			{/* Header */}
			<header className="bg-white dark:bg-zinc-800 shadow-sm border-b border-gray-200 dark:border-zinc-700">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
					<div className="flex items-center gap-4">
						<Image
							src={assets.logo}
							alt="Logo"
							className="w-24"
						/>
						<h1 className="text-2xl font-bold text-gray-900 dark:text-white">
							Admin Dashboard
						</h1>
					</div>
					<div className="flex items-center gap-4">
						<span className="text-sm text-gray-600 dark:text-gray-400">
							{user?.email}
						</span>
						<Link
							href="/"
							className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-lg transition"
						>
							View Site
						</Link>
						<button
							onClick={handleLogout}
							className="px-4 py-2 text-sm bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition"
						>
							Logout
						</button>
					</div>
				</div>
			</header>

			{/* Navigation Tabs */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
				<div className="border-b border-gray-200 dark:border-zinc-700">
					<nav className="-mb-px flex space-x-8">
						<button
							onClick={() => setActiveTab('projects')}
							className={`${
								activeTab === 'projects'
									? 'border-rose-500 text-rose-600 dark:text-rose-400'
									: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
							} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition`}
						>
							Projects
						</button>
						<button
							onClick={() => setActiveTab('services')}
							className={`${
								activeTab === 'services'
									? 'border-rose-500 text-rose-600 dark:text-rose-400'
									: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
							} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition`}
						>
							Services
						</button>
					</nav>
				</div>
			</div>

			{/* Content */}
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{activeTab === 'projects' && <ProjectsManager />}
				{activeTab === 'services' && <ServicesManager />}
			</main>
		</div>
	);
}

function ProjectsManager() {
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);
	const [showForm, setShowForm] = useState(false);
	const [editingProject, setEditingProject] = useState(null);
	const supabase = createClient();

	const fetchProjects = useCallback(async () => {
		const { data, error } = await supabase
			.from('projects')
			.select('*')
			.order('order_index', { ascending: true });

		if (!error) {
			setProjects(data);
		}
		setLoading(false);
	}, [supabase]);

	useEffect(() => {
		fetchProjects();
	}, [fetchProjects]);

	const handleDelete = async (id) => {
		if (confirm('Are you sure you want to delete this project?')) {
			const { error } = await supabase.from('projects').delete().eq('id', id);

			if (!error) {
				fetchProjects();
			}
		}
	};

	if (loading) return <div>Loading projects...</div>;

	return (
		<div>
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
					Projects
				</h2>
				<button
					onClick={() => {
						setEditingProject(null);
						setShowForm(true);
					}}
					className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition"
				>
					+ Add Project
				</button>
			</div>

			{showForm && (
				<ProjectForm
					project={editingProject}
					onClose={() => {
						setShowForm(false);
						setEditingProject(null);
					}}
					onSave={() => {
						setShowForm(false);
						setEditingProject(null);
						fetchProjects();
					}}
				/>
			)}

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{projects.map((project) => (
					<div
						key={project.id}
						className="bg-white dark:bg-zinc-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-zinc-700"
					>
						<div
							className="h-48 bg-cover bg-center"
							style={{ backgroundImage: `url(${project.bg_image})` }}
						/>
						<div className="p-4">
							<h3 className="font-semibold text-lg text-gray-900 dark:text-white">
								{project.title}
							</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
								{project.description}
							</p>
							<div className="flex gap-2 mt-4">
								<button
									onClick={() => {
										setEditingProject(project);
										setShowForm(true);
									}}
									className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
								>
									Edit
								</button>
								<button
									onClick={() => handleDelete(project.id)}
									className="flex-1 px-3 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition"
								>
									Delete
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

function ProjectForm({ project, onClose, onSave }) {
	const [formData, setFormData] = useState({
		title: project?.title || '',
		description: project?.description || '',
		bg_image: project?.bg_image || '',
		link: project?.link || '',
		order_index: project?.order_index || 0,
	});
	const [uploading, setUploading] = useState(false);
	const [saving, setSaving] = useState(false);
	const supabase = createClient();

	const handleImageUpload = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		setUploading(true);
		const fileExt = file.name.split('.').pop();
		const fileName = `${Math.random()}.${fileExt}`;
		const filePath = `projects/${fileName}`;

		const { error: uploadError } = await supabase.storage
			.from('portfolio-images')
			.upload(filePath, file);

		if (!uploadError) {
			const { data } = supabase.storage
				.from('portfolio-images')
				.getPublicUrl(filePath);

			setFormData({ ...formData, bg_image: data.publicUrl });
		}
		setUploading(false);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSaving(true);

		if (project) {
			// Update existing
			const { error } = await supabase
				.from('projects')
				.update(formData)
				.eq('id', project.id);

			if (!error) onSave();
		} else {
			// Create new
			const { error } = await supabase.from('projects').insert([formData]);

			if (!error) onSave();
		}
		setSaving(false);
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
			<div className="bg-white dark:bg-zinc-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
				<div className="p-6">
					<div className="flex justify-between items-center mb-6">
						<h3 className="text-2xl font-bold text-gray-900 dark:text-white">
							{project ? 'Edit Project' : 'Add New Project'}
						</h3>
						<button
							onClick={onClose}
							className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
						>
							✕
						</button>
					</div>

					<form
						onSubmit={handleSubmit}
						className="space-y-4"
					>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Title
							</label>
							<input
								type="text"
								required
								value={formData.title}
								onChange={(e) =>
									setFormData({ ...formData, title: e.target.value })
								}
								className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-rose-500 bg-white dark:bg-zinc-700 text-gray-900 dark:text-white"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Description
							</label>
							<input
								type="text"
								required
								value={formData.description}
								onChange={(e) =>
									setFormData({ ...formData, description: e.target.value })
								}
								className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-rose-500 bg-white dark:bg-zinc-700 text-gray-900 dark:text-white"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Background Image
							</label>
							<input
								type="file"
								accept="image/*"
								onChange={handleImageUpload}
								disabled={uploading}
								className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-rose-500 bg-white dark:bg-zinc-700 text-gray-900 dark:text-white"
							/>
							{uploading && (
								<p className="text-sm text-gray-600 mt-1">Uploading...</p>
							)}
							{formData.bg_image && (
								<Image
									src={formData.bg_image}
									alt="Preview"
									width={200}
									height={128}
									className="mt-2 h-32 rounded object-cover"
								/>
							)}
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Link (optional)
							</label>
							<input
								type="url"
								value={formData.link}
								onChange={(e) =>
									setFormData({ ...formData, link: e.target.value })
								}
								className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-rose-500 bg-white dark:bg-zinc-700 text-gray-900 dark:text-white"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Order
							</label>
							<input
								type="number"
								value={formData.order_index}
								onChange={(e) =>
									setFormData({
										...formData,
										order_index: parseInt(e.target.value),
									})
								}
								className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-rose-500 bg-white dark:bg-zinc-700 text-gray-900 dark:text-white"
							/>
						</div>

						<div className="flex gap-3 pt-4">
							<button
								type="button"
								onClick={onClose}
								className="flex-1 px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-700 transition"
							>
								Cancel
							</button>
							<button
								type="submit"
								disabled={saving}
								className="flex-1 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition disabled:opacity-50"
							>
								{saving ? 'Saving...' : 'Save'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

function ServicesManager() {
	const [services, setServices] = useState([]);
	const [loading, setLoading] = useState(true);
	const [showForm, setShowForm] = useState(false);
	const [editingService, setEditingService] = useState(null);
	const supabase = createClient();

	const fetchServices = useCallback(async () => {
		const { data, error } = await supabase
			.from('services')
			.select('*')
			.order('order_index', { ascending: true });

		if (!error) {
			setServices(data);
		}
		setLoading(false);
	}, [supabase]);

	useEffect(() => {
		fetchServices();
	}, [fetchServices]);

	const handleDelete = async (id) => {
		if (confirm('Are you sure you want to delete this service?')) {
			const { error } = await supabase.from('services').delete().eq('id', id);

			if (!error) {
				fetchServices();
			}
		}
	};

	if (loading) return <div>Loading services...</div>;

	return (
		<div>
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
					Services
				</h2>
				<button
					onClick={() => {
						setEditingService(null);
						setShowForm(true);
					}}
					className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition"
				>
					+ Add Service
				</button>
			</div>

			{showForm && (
				<ServiceForm
					service={editingService}
					onClose={() => {
						setShowForm(false);
						setEditingService(null);
					}}
					onSave={() => {
						setShowForm(false);
						setEditingService(null);
						fetchServices();
					}}
				/>
			)}

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{services.map((service) => (
					<div
						key={service.id}
						className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-zinc-700"
					>
						<div className="text-4xl mb-4">{service.icon}</div>
						<h3 className="font-semibold text-lg text-gray-900 dark:text-white">
							{service.title}
						</h3>
						<p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
							{service.description}
						</p>
						<div className="flex gap-2 mt-4">
							<button
								onClick={() => {
									setEditingService(service);
									setShowForm(true);
								}}
								className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
							>
								Edit
							</button>
							<button
								onClick={() => handleDelete(service.id)}
								className="flex-1 px-3 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition"
							>
								Delete
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

function ServiceForm({ service, onClose, onSave }) {
	const [formData, setFormData] = useState({
		title: service?.title || '',
		description: service?.description || '',
		icon: service?.icon || '',
		link: service?.link || '',
		order_index: service?.order_index || 0,
	});
	const [saving, setSaving] = useState(false);
	const supabase = createClient();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSaving(true);

		if (service) {
			const { error } = await supabase
				.from('services')
				.update(formData)
				.eq('id', service.id);

			if (!error) onSave();
		} else {
			const { error } = await supabase.from('services').insert([formData]);

			if (!error) onSave();
		}
		setSaving(false);
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
			<div className="bg-white dark:bg-zinc-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
				<div className="p-6">
					<div className="flex justify-between items-center mb-6">
						<h3 className="text-2xl font-bold text-gray-900 dark:text-white">
							{service ? 'Edit Service' : 'Add New Service'}
						</h3>
						<button
							onClick={onClose}
							className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
						>
							✕
						</button>
					</div>

					<form
						onSubmit={handleSubmit}
						className="space-y-4"
					>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Title
							</label>
							<input
								type="text"
								required
								value={formData.title}
								onChange={(e) =>
									setFormData({ ...formData, title: e.target.value })
								}
								className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-rose-500 bg-white dark:bg-zinc-700 text-gray-900 dark:text-white"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Description
							</label>
							<textarea
								required
								rows="3"
								value={formData.description}
								onChange={(e) =>
									setFormData({ ...formData, description: e.target.value })
								}
								className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-rose-500 bg-white dark:bg-zinc-700 text-gray-900 dark:text-white"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Icon (emoji or text)
							</label>
							<input
								type="text"
								required
								value={formData.icon}
								onChange={(e) =>
									setFormData({ ...formData, icon: e.target.value })
								}
								className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-rose-500 bg-white dark:bg-zinc-700 text-gray-900 dark:text-white"
								placeholder="🌐 or icon name"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Link (optional)
							</label>
							<input
								type="url"
								value={formData.link}
								onChange={(e) =>
									setFormData({ ...formData, link: e.target.value })
								}
								className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-rose-500 bg-white dark:bg-zinc-700 text-gray-900 dark:text-white"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Order
							</label>
							<input
								type="number"
								value={formData.order_index}
								onChange={(e) =>
									setFormData({
										...formData,
										order_index: parseInt(e.target.value),
									})
								}
								className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-rose-500 bg-white dark:bg-zinc-700 text-gray-900 dark:text-white"
							/>
						</div>

						<div className="flex gap-3 pt-4">
							<button
								type="button"
								onClick={onClose}
								className="flex-1 px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-700 transition"
							>
								Cancel
							</button>
							<button
								type="submit"
								disabled={saving}
								className="flex-1 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition disabled:opacity-50"
							>
								{saving ? 'Saving...' : 'Save'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
