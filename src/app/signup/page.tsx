'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import { FiCamera, FiEye, FiEyeOff, FiLock, FiMail, FiUser } from 'react-icons/fi';

type FieldErrors = { name?: string; email?: string; password?: string; photo?: string };
type Step = 'idle' | 'uploading' | 'creating';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_PHOTO_MB = 5;

const inputBase =
    'h-12 w-full rounded-xl border bg-white pl-11 pr-4 text-sm text-gray-900 placeholder:text-gray-500 transition-colors focus:outline-none focus:ring-2 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-400';
const inputOk =
    'border-gray-300 focus:border-brand focus:ring-brand/20 dark:border-white/10 dark:focus:border-[#A58BFF] dark:focus:ring-[#A58BFF]/30';
const inputBad =
    'border-red-500 focus:border-red-500 focus:ring-red-500/20 dark:border-red-400';
const labelClass = 'mb-1.5 block text-sm font-semibold text-gray-800 dark:text-gray-200';
const errorClass = 'mt-1.5 text-sm font-medium text-red-600 dark:text-red-400';
const iconClass =
    'pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400';

/* ---------- Upload the chosen photo to ImgBB and return its URL ---------- */
async function uploadToImgBB(file: File): Promise<string> {
    const key = process.env.NEXT_PUBLIC_IMGBB_KEY;
    if (!key) {
        throw new Error('Photo upload is not set up. Add NEXT_PUBLIC_IMGBB_KEY to .env.local.');
    }

    const body = new FormData();
    body.append('image', file);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
        method: 'POST',
        body,
    });
    if (!res.ok) throw new Error('Photo upload failed. Try a different image.');

    const json: { data?: { display_url?: string } } = await res.json();
    if (!json.data?.display_url) throw new Error('Photo upload failed. Try again.');
    return json.data.display_url;
}

export default function SignupPage() {
    const router = useRouter();
    const reduce = useReducedMotion();
    const fileRef = useRef<HTMLInputElement>(null);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [photo, setPhoto] = useState<File | null>(null);
    const [preview, setPreview] = useState('');
    const [errors, setErrors] = useState<FieldErrors>({});
    const [formError, setFormError] = useState('');
    const [step, setStep] = useState<Step>('idle');

    const busy = step !== 'idle';

    // Free the temporary preview URL when it changes or the page closes
    useEffect(() => {
        return () => {
            if (preview.startsWith('blob:')) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    function clearError(field: keyof FieldErrors) {
        if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
    }

    function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setErrors((p) => ({ ...p, photo: 'Choose an image file (JPG, PNG, WebP or GIF).' }));
            e.target.value = '';
            return;
        }
        if (file.size > MAX_PHOTO_MB * 1024 * 1024) {
            setErrors((p) => ({ ...p, photo: `Choose an image smaller than ${MAX_PHOTO_MB} MB.` }));
            e.target.value = '';
            return;
        }

        clearError('photo');
        setPhoto(file);
        setPreview(URL.createObjectURL(file));
    }

    function removePhoto() {
        setPhoto(null);
        setPreview('');
        if (fileRef.current) fileRef.current.value = '';
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setFormError('');

        // Validate in the browser
        const next: FieldErrors = {};
        if (!name.trim()) next.name = 'Enter your full name.';
        if (!email.trim()) next.email = 'Enter your email address.';
        else if (!EMAIL_PATTERN.test(email.trim())) next.email = 'Enter a valid email, like john@example.com.';
        if (!password) next.password = 'Create a password.';
        else if (password.length < 8) next.password = 'Use at least 8 characters.';
        if (errors.photo) next.photo = errors.photo;
        setErrors(next);
        if (Object.keys(next).length > 0) return;

        try {
            // 1. Upload the optional profile photo to ImgBB
            if (photo) {
                setStep('uploading');
                const hostedUrl = await uploadToImgBB(photo);
                setPreview(hostedUrl); // show the hosted image
            }

            // 2. Front-end demo only: no account is created on a server.
            // TODO: send { name, email, password, photoURL: hostedUrl } to your API later.
            setStep('creating');
            await new Promise((r) => setTimeout(r, 800));
            router.push('/dashboard');
        } catch (err) {
            setFormError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
            setStep('idle');
        }
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
                    Create your account
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Make your first short link in under a minute.
                </p>

                <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
                    {/* Profile photo (optional) */}
                    <div>
                        <span className={labelClass}>
                            Profile photo{' '}
                            <span className="font-normal text-gray-500 dark:text-gray-400">(optional)</span>
                        </span>
                        <div className="flex items-center gap-4">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-300 bg-gray-100 text-gray-500 dark:border-white/10 dark:bg-white/5 dark:text-gray-400">
                                {preview ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={preview} alt="Your profile photo preview" className="h-full w-full object-cover" />
                                ) : (
                                    <FiUser size={26} aria-hidden="true" />
                                )}
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                                <input
                                    ref={fileRef}
                                    id="photo"
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhoto}
                                    disabled={busy}
                                    aria-describedby={errors.photo ? 'photo-error' : undefined}
                                    className="peer sr-only"
                                />
                                <label
                                    htmlFor="photo"
                                    className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-brand px-4 py-2 text-sm font-semibold text-brand transition-colors hover:bg-brand/10 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand peer-disabled:cursor-not-allowed peer-disabled:opacity-60 dark:border-[#A58BFF] dark:text-[#A58BFF]"
                                >
                                    <FiCamera aria-hidden="true" />
                                    {photo ? 'Change photo' : 'Choose photo'}
                                </label>
                                {photo && !busy && (
                                    <button
                                        type="button"
                                        onClick={removePhoto}
                                        className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-brand dark:text-gray-300 dark:hover:bg-white/10"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        </div>
                        {errors.photo && <p id="photo-error" role="alert" className={errorClass}>{errors.photo}</p>}
                    </div>

                    {/* Name */}
                    <div>
                        <label htmlFor="name" className={labelClass}>Full name</label>
                        <div className="relative">
                            <FiUser aria-hidden="true" className={iconClass} />
                            <input
                                id="name"
                                type="text"
                                autoComplete="name"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => { setName(e.target.value); clearError('name'); }}
                                aria-invalid={!!errors.name}
                                aria-describedby={errors.name ? 'name-error' : undefined}
                                className={`${inputBase} ${errors.name ? inputBad : inputOk}`}
                            />
                        </div>
                        {errors.name && <p id="name-error" role="alert" className={errorClass}>{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className={labelClass}>Email</label>
                        <div className="relative">
                            <FiMail aria-hidden="true" className={iconClass} />
                            <input
                                id="email"
                                type="email"
                                autoComplete="email"
                                placeholder="john@example.com"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); clearError('email'); }}
                                aria-invalid={!!errors.email}
                                aria-describedby={errors.email ? 'email-error' : undefined}
                                className={`${inputBase} ${errors.email ? inputBad : inputOk}`}
                            />
                        </div>
                        {errors.email && <p id="email-error" role="alert" className={errorClass}>{errors.email}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className={labelClass}>Password</label>
                        <div className="relative">
                            <FiLock aria-hidden="true" className={iconClass} />
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="new-password"
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); clearError('password'); }}
                                aria-invalid={!!errors.password}
                                aria-describedby={errors.password ? 'password-error' : 'password-hint'}
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
                        {errors.password ? (
                            <p id="password-error" role="alert" className={errorClass}>{errors.password}</p>
                        ) : (
                            <p id="password-hint" className="mt-1.5 text-xs text-gray-600 dark:text-gray-400">
                                Use at least 8 characters.
                            </p>
                        )}
                    </div>

                    {formError && (
                        <div role="alert" className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-800 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
                            {formError}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={busy}
                        className="h-12 w-full rounded-xl bg-brand text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-colors duration-150 hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-70 dark:shadow-none"
                    >
                        {step === 'uploading' ? 'Uploading photo…' : step === 'creating' ? 'Creating account…' : 'Create account'}
                    </button>

                    <p className="text-center text-xs text-gray-600 dark:text-gray-400">
                        By creating an account you agree to the{' '}
                        <Link href="/terms" className="font-medium underline hover:text-brand dark:hover:text-[#A58BFF]">Terms</Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="font-medium underline hover:text-brand dark:hover:text-[#A58BFF]">Privacy policy</Link>.
                    </p>
                </form>

                <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                    Already have an account?{' '}
                    <Link
                        href="/login"
                        className="rounded-md font-semibold text-brand hover:underline focus-visible:outline-2 focus-visible:outline-brand dark:text-[#A58BFF]"
                    >
                        Sign in
                    </Link>
                </p>
            </motion.div>
        </main>
    );
}