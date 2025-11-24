'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { assets } from '@/assets/assets';

export default function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const supabase = createClient();

	const handleLogin = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		try {
			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});

			if (error) throw error;

			router.push('/admin');
			router.refresh();
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-white dark:from-zinc-900 dark:to-zinc-800 px-4">
			<div className="max-w-md w-full space-y-8 bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-2xl border border-gray-200 dark:border-zinc-700">
				<div className="text-center">
					<Image
						src={assets.logo}
						alt="Logo"
						className="mx-auto w-32 mb-4"
					/>
					<h2 className="text-3xl font-bold text-gray-900 dark:text-white">
						Admin Login
					</h2>
					<p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
						Sign in to manage your portfolio
					</p>
				</div>

				<form
					className="mt-8 space-y-6"
					onSubmit={handleLogin}
				>
					<div className="space-y-4">
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
							>
								Email address
							</label>
							<input
								id="email"
								name="email"
								type="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="appearance-none relative block w-full px-4 py-3 border border-gray-300 dark:border-zinc-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white dark:bg-zinc-700"
								placeholder="admin@example.com"
							/>
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
							>
								Password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="appearance-none relative block w-full px-4 py-3 border border-gray-300 dark:border-zinc-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white dark:bg-zinc-700"
								placeholder="••••••••"
							/>
						</div>
					</div>

					{error && (
						<div className="bg-red-50 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
							{error}
						</div>
					)}

					<button
						type="submit"
						disabled={loading}
						className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
					>
						{loading ? 'Signing in...' : 'Sign in'}
					</button>
				</form>

				<div className="text-center mt-4">
					<Link
						href="/"
						className="text-sm text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300"
					>
						← Back to Portfolio
					</Link>
				</div>
			</div>
		</div>
	);
}
