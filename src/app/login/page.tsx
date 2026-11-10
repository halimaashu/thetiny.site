'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import { FiEye, FiEyeOff, FiLock, FiMail } from 'react-icons/fi';

type FieldErrors = { email?: string; password?: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputBase =
    'h-12 w-full rounded-xl border bg-white pl-11 pr-4 text-sm text-gray-900 placeholder:text-gray-500 transition-colors focus:outline-none focus:ring-2 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-400';
const inputOk =
    'border-gray-300 focus:border-brand focus:ring-brand/20 dark:border-white/10 dark:focus:border-[#A58BFF] dark:focus:ring-[#A58BFF]/30';
const inputBad =
    'border-red-500 focus:border-red-500 focus:ring-red-500/20 dark:border-red-400';

export default function LoginPage() {
    const router = useRouter();
    const reduce = useReducedMotion();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<FieldErrors>({});
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        // Validate in the browser
        const next: FieldErrors = {};
        if (!email.trim()) next.email = 'Enter your email address.';
        else if (!EMAIL_PATTERN.test(email.trim())) next.email = 'Enter a valid email, like john@example.com.';
        if (!password) next.password = 'Enter your password.';
        setErrors(next);
        if (Object.keys(next).length > 0) return;

        setLoading(true);
        // Front-end demo only: no server check. Replace this delay with a real API call later.
        await new Promise((r) => setTimeout(r, 800));
        setLoading(false);
        router.push('/dashboard');
    }

    return (
        <main className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-4 py-14 dark:bg-[#0F0B1F]">
            <motion.div
                initial={{ opacity: 0, y: reduce ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-[0_24px_70px_-30px_rgba(91,33,243,0.45)] dark:border-white/10 dark:bg-white/5 sm:p-10"
            >
                <Link
                    href="/"
                    aria-label="thetiny.site home"
                    className="inline-block rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                    <Image src="/logo.png" alt="thetiny.site logo" width={70} height={40} className="h-9 w-auto" />
                </Link>

                <h1 className="mt-6 font-heading text-3xl font-extrabold tracking-tight text-gray-950 dark:text-white">
                    Welcome back
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Sign in to see your links and clicks.
                </p>

                <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-gray-800 dark:text-gray-200">
                            Email
                        </label>
                        <div className="relative">
                            <FiMail aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                            <input
                                id="email"
                                type="email"
                                autoComplete="email"
                                placeholder="john@example.com"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
                                }}
                                aria-invalid={!!errors.email}
                                aria-describedby={errors.email ? 'email-error' : undefined}
                                className={`${inputBase} ${errors.email ? inputBad : inputOk}`}
                            />
                        </div>
                        {errors.email && (
                            <p id="email-error" role="alert" className="mt-1.5 text-sm font-medium text-red-600 dark:text-red-400">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-gray-800 dark:text-gray-200">
                            Password
                        </label>
                        <div className="relative">
                            <FiLock aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="current-password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    if (errors.password) setErrors((p) => ({ ...p, password: undefined }));
                                }}
                                aria-invalid={!!errors.password}
                                aria-describedby={errors.password ? 'password-error' : undefined}
                                className={`${inputBase} pr-12 ${errors.password ? inputBad : inputOk}`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((v) => !v)}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                aria-pressed={showPassword}
                                className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-gray-500 transition-colors hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-brand dark:text-gray-400 dark:hover:text-white"
                            >
                                {showPassword ? <FiEyeOff size={18} aria-hidden="true" /> : <FiEye size={18} aria-hidden="true" />}
                            </button>
                        </div>
                        {errors.password && (
                            <p id="password-error" role="alert" className="mt-1.5 text-sm font-medium text-red-600 dark:text-red-400">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Remember me */}
                    <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <input type="checkbox" className="h-4 w-4 rounded border-gray-300 accent-[#5B21F3]" />
                        Remember me
                    </label>

                    <button
                        type="submit"
                        disabled={loading}
                        className="h-12 w-full rounded-xl bg-brand text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-colors duration-150 hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-70 dark:shadow-none"
                    >
                        {loading ? 'Signing in…' : 'Sign in'}
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                    New to thetiny.site?{' '}
                    <Link
                        href="/signup"
                        className="rounded-md font-semibold text-brand hover:underline focus-visible:outline-2 focus-visible:outline-brand dark:text-[#A58BFF]"
                    >
                        Create an account
                    </Link>
                </p>
            </motion.div>
        </main>
    );
}