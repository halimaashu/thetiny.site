'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { FiArrowRight, FiArrowUp, FiBarChart2, FiLink, FiMail, FiShield } from 'react-icons/fi';
import { FaGithub, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';

/* ---------- Edit these: only keep pages and profiles that really exist ---------- */
const COLUMNS = [
    {
        title: 'Product',
        links: [
            { href: '/#shorten', label: 'Shorten a link' },
            { href: '/dashboard', label: 'Dashboard' },
            { href: '/dashboard', label: 'Click analytics' },
        ],
    },
    {
        title: 'Company',
        links: [
            { href: '/about', label: 'About' },
            { href: '/contact', label: 'Contact' },
        ],
    },
    {
        title: 'Legal',
        links: [
            { href: '/privacy', label: 'Privacy policy' },
            { href: '/terms', label: 'Terms of use' },
        ],
    },
];

const SOCIALS = [
    { href: 'https://github.com/your-username', label: 'GitHub', Icon: FaGithub },
    { href: 'https://x.com/your-username', label: 'X (Twitter)', Icon: FaXTwitter },
    { href: 'https://linkedin.com/in/your-username', label: 'LinkedIn', Icon: FaLinkedinIn },
    { href: 'mailto:hello@thetiny.site', label: 'Email', Icon: FiMail },
];

const HIGHLIGHTS = [
    { Icon: FiLink, text: 'Free short links' },
    { Icon: FiBarChart2, text: 'Every click counted' },
    { Icon: FiShield, text: 'Disable any link' },
];

const focus =
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand';

const Footer = () => {
    const year = new Date().getFullYear();
    const lenis = useLenis();

    return (
        <footer className="bg-gray-50 text-gray-700 dark:bg-[#0B0818] dark:text-gray-300">
            {/* Call to action band */}
            <div className="mx-auto max-w-6xl px-5 pt-16">
                <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-brand px-8 py-10 text-white md:flex-row md:items-center">
                    <div>
                        <h2 className="font-heading text-2xl font-extrabold sm:text-3xl">
                            Got a long link? Make it tiny.
                        </h2>
                        <p className="mt-2 max-w-md text-white/80">
                            Create your first short link in seconds and watch the clicks come in.
                        </p>
                    </div>
                    <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.15 }}>
                        <Link
                            href="/#shorten"
                            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-brand-dark transition-colors hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                            Get free link
                            <FiArrowRight aria-hidden="true" />
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Main footer content */}
            <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 md:grid-cols-[1.4fr_2fr]">
                {/* Brand */}
                <div>
                    <Link href="/" aria-label="thetiny.site home" className={`inline-flex items-center gap-2.5 ${focus}`}>
                        <Image src="/logo.png" alt="thetiny.site logo" width={70} height={40} className="h-9 w-auto" />
                    </Link>
                    <p className="mt-4 max-w-xs text-sm leading-relaxed">
                        Shorten links, count every click, and stay in control of where they go.
                    </p>

                    <ul className="mt-5 space-y-2 text-sm">
                        {HIGHLIGHTS.map(({ Icon, text }) => (
                            <li key={text} className="flex items-center gap-2">
                                <Icon aria-hidden="true" className="text-brand dark:text-[#A58BFF]" />
                                {text}
                            </li>
                        ))}
                    </ul>

                    <ul className="mt-6 flex gap-3" aria-label="Social links">
                        {SOCIALS.map(({ href, label, Icon }) => (
                            <li key={label}>
                                <motion.a
                                    href={href}
                                    target={href.startsWith('http') ? '_blank' : undefined}
                                    rel="noreferrer"
                                    aria-label={label}
                                    whileHover={{ y: -3 }}
                                    transition={{ duration: 0.15 }}
                                    className={`flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition-colors hover:border-brand hover:bg-brand hover:text-white dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:border-brand ${focus}`}
                                >
                                    <Icon aria-hidden="true" size={16} />
                                </motion.a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Link columns */}
                <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
                    {COLUMNS.map((col) => (
                        <nav key={col.title} aria-label={col.title}>
                            <h3 className="font-heading text-sm font-bold text-gray-900 dark:text-white">
                                {col.title}
                            </h3>
                            <ul className="mt-4 space-y-3 text-sm">
                                {col.links.map((l) => (
                                    <li key={l.label}>
                                        <Link
                                            href={l.href}
                                            className={`rounded transition-colors duration-150 hover:text-brand dark:hover:text-[#A58BFF] ${focus}`}
                                        >
                                            {l.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    ))}
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-200 dark:border-white/10">
                <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-6 text-sm sm:flex-row">
                    <p>&copy; {year} thetiny.site. All rights reserved.</p>
                    <button
                        type="button"
                        onClick={() => (lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: 'smooth' }))}
                        className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 font-medium transition-colors hover:bg-gray-200 dark:hover:bg-white/10 ${focus}`}
                    >
                        Back to top
                        <FiArrowUp aria-hidden="true" />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;