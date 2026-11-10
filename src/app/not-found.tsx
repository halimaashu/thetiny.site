'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { FiArrowLeft, FiHome, FiLink2 } from 'react-icons/fi';

const focus =
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand';

export default function NotFound() {
    const reduce = useReducedMotion();

    return (
        <main className="flex min-h-[70vh] items-center justify-center bg-white px-5 py-20 text-gray-900 dark:bg-[#0F0B1F] dark:text-white">
            <div className="flex max-w-xl flex-col items-center text-center">
                {/* 404 with a broken link in the middle */}
                <div className="flex items-center gap-2 font-heading text-8xl font-extrabold leading-none text-brand dark:text-[#A58BFF] sm:text-9xl" aria-hidden="true">
                    <span>4</span>
                    <motion.span
                        initial={{ rotate: 0 }}
                        animate={reduce ? undefined : { rotate: [0, -14, 10, -6, 0] }}
                        transition={{ duration: 0.9, delay: 0.3, ease: 'easeInOut' }}
                        className="flex h-20 w-20 items-center justify-center rounded-full bg-brand/10 text-brand dark:bg-brand/25 dark:text-[#A58BFF] sm:h-28 sm:w-28"
                    >
                        <FiLink2 className="h-10 w-10 sm:h-14 sm:w-14" />
                    </motion.span>
                    <span>4</span>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <h1 className="mt-8 font-heading text-3xl font-extrabold sm:text-4xl">
                        This link leads nowhere
                    </h1>
                    <p className="mx-auto mt-3 max-w-md text-gray-600 dark:text-gray-300">
                        The page you are looking for does not exist, or the short link was
                        disabled or deleted. Check the address, or head back to the home page.
                    </p>

                    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Link
                            href="/"
                            className={`inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 font-semibold text-white transition-colors duration-150 hover:bg-brand-dark ${focus}`}
                        >
                            <FiHome aria-hidden="true" />
                            Go home
                        </Link>
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className={`inline-flex items-center gap-2 rounded-xl border border-brand px-6 py-3 font-semibold text-brand transition-colors duration-150 hover:bg-brand/10 dark:border-[#A58BFF] dark:text-[#A58BFF] ${focus}`}
                        >
                            <FiArrowLeft aria-hidden="true" />
                            Go back
                        </button>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}