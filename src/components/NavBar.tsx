'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

// Edit this list so it only contains pages that really exist
const NAV_LINKS = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
];

const NavBar = () => {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    // Close the mobile menu whenever the page changes
    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    const linkClass = (href: string) =>
        `rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150
         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand
         ${pathname === href
            ? 'bg-brand/10 text-brand'
            : 'text-gray-700 hover:bg-gray-100 hover:text-brand'}`;

    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur">
            <nav
                aria-label="Main"
                className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5"
            >
                {/* Brand logo, links to home */}
                <Link href="/" aria-label="thetiny.site home" className="flex items-center">
                    <Image
                        src="/logo.png"
                        alt="thetiny.site logo"
                        width={70}
                        height={40}
                        priority
                        className="h-9 w-auto"
                    />
                </Link>

                {/* Desktop navigation links */}
                <ul className="hidden items-center gap-2 md:flex">
                    {NAV_LINKS.map(({ href, label }) => (
                        <li key={href}>
                            <Link
                                href={href}
                                className={linkClass(href)}
                                aria-current={pathname === href ? 'page' : undefined}
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Desktop user actions */}
                <div className="hidden items-center gap-3 md:flex">
                    <Link
                        href="/login"
                        className="rounded-lg px-4 py-2 text-sm font-semibold text-brand transition-colors duration-150 hover:bg-brand/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                    >
                        Login
                    </Link>
                    <Link
                        href="/signup"
                        className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                    >
                        Sign Up
                    </Link>
                </div>

                {/* Mobile menu button */}
                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    aria-expanded={open}
                    aria-controls="mobile-menu"
                    aria-label={open ? 'Close menu' : 'Open menu'}
                    className="rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand md:hidden"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                        {open ? (
                            <path d="M6 6l12 12M18 6L6 18" />
                        ) : (
                            <path d="M4 7h16M4 12h16M4 17h16" />
                        )}
                    </svg>
                </button>
            </nav>

            {/* Mobile menu panel */}
            {open && (
                <div id="mobile-menu" className="border-t border-gray-200 bg-white px-5 pb-5 pt-3 md:hidden">
                    <ul className="flex flex-col gap-1">
                        {NAV_LINKS.map(({ href, label }) => (
                            <li key={href}>
                                <Link
                                    href={href}
                                    className={`block ${linkClass(href)}`}
                                    aria-current={pathname === href ? 'page' : undefined}
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4 flex flex-col gap-2">
                        <Link
                            href="/login"
                            className="rounded-lg border border-brand px-4 py-2.5 text-center text-sm font-semibold text-brand hover:bg-brand/10"
                        >
                            Login
                        </Link>
                        <Link
                            href="/signup"
                            className="rounded-lg bg-brand px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-brand-dark"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default NavBar;