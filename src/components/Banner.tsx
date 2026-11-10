'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

/* ---------- Carousel data: replace the image paths with your 3 screenshots ---------- */
const SLIDES = [
    {
        src: '/carousel-image-3.jpg',
        alt: 'thetiny.site shortener screen with a long link turned into a short one',
        title: 'Paste a link. Get a tiny one.',
        text: 'Turn any long URL into a short link in one click, free.',
    },
    {
        src: '/carousel-photo-1.jpg',
        alt: 'thetiny.site dashboard showing clicks per link',
        title: 'Know who clicked.',
        text: 'Every click is counted, so you can see which links work.',
    },
    {
        src: '/carousel-image-3.jpg',
        alt: 'thetiny.site moderation screen with a disable link switch',
        title: 'Switch a link off anytime.',
        text: 'Disable or delete any link the moment you need to.',
    },
];

const AUTOPLAY_MS = 4500;

/* ---------- Carousel ---------- */
function HeroCarousel() {
    const reduce = useReducedMotion();
    const [[index, dir], setPage] = useState<[number, number]>([0, 0]);
    const [paused, setPaused] = useState(false);

    const paginate = useCallback((d: number) => {
        setPage(([i]) => [(i + d + SLIDES.length) % SLIDES.length, d]);
    }, []);

    // Autoplay, stops on hover/focus and when the user prefers reduced motion
    useEffect(() => {
        if (paused || reduce) return;
        const id = setInterval(() => paginate(1), AUTOPLAY_MS);
        return () => clearInterval(id);
    }, [paused, reduce, paginate]);

    const slide = SLIDES[index];
    const shift = reduce ? 0 : 60;

    const variants = {
        enter: (d: number) => ({ x: d >= 0 ? shift : -shift, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (d: number) => ({ x: d >= 0 ? -shift : shift, opacity: 0 }),
    };

    const arrow =
        'flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-gray-800 shadow-sm transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:bg-white/20';

    return (
        <div
            role="region"
            aria-roledescription="carousel"
            aria-label="thetiny.site features"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            className="rounded-3xl border border-gray-200 bg-white p-3 shadow-[0_24px_70px_-24px_rgba(91,33,243,0.45)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_24px_70px_-24px_rgba(122,75,255,0.5)]"
        >
            {/* Image area */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-gray-100 dark:bg-white/5">
                <AnimatePresence initial={false} custom={dir} mode="popLayout">
                    <motion.div
                        key={index}
                        custom={dir}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0"
                        aria-live={paused ? 'polite' : 'off'}
                    >
                        <Image
                            src={slide.src}
                            alt={slide.alt}
                            fill
                            priority={index === 0}
                            sizes="(min-width: 1024px) 560px, 100vw"
                            className="object-cover"
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Arrows */}
                <div className="absolute inset-x-3 top-1/2 flex -translate-y-1/2 justify-between">
                    <button type="button" onClick={() => paginate(-1)} aria-label="Previous slide" className={arrow}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
                    </button>
                    <button type="button" onClick={() => paginate(1)} aria-label="Next slide" className={arrow}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
                    </button>
                </div>
            </div>

            {/* Caption + dots */}
            <div className="flex items-end justify-between gap-4 px-3 pb-3 pt-5">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <h3 className="font-heading text-lg font-bold text-gray-900 dark:text-white">{slide.title}</h3>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{slide.text}</p>
                    </motion.div>
                </AnimatePresence>

                <div className="flex shrink-0 items-center gap-2" role="group" aria-label="Choose slide">
                    {SLIDES.map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => setPage([i, i > index ? 1 : -1])}
                            aria-label={`Go to slide ${i + 1}`}
                            aria-current={i === index}
                            className="rounded-full p-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                        >
                            <motion.span
                                animate={{ width: i === index ? 24 : 8 }}
                                transition={{ duration: 0.25 }}
                                className={`block h-2 rounded-full ${i === index ? 'bg-brand' : 'bg-gray-300 dark:bg-white/25'}`}
                            />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ---------- Helpers ---------- */
function isValidUrl(value: string) {
    try {
        const u = new URL(value.startsWith('http') ? value : `https://${value}`);
        return u.hostname.includes('.');
    } catch {
        return false;
    }
}

/* ---------- Banner ---------- */
export default function Banner() {
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [shortUrl, setShortUrl] = useState('');
    const [copied, setCopied] = useState(false);

    async function handleShorten(e: React.FormEvent) {
        e.preventDefault();
        if (!isValidUrl(url.trim())) {
            setError('Enter a full link, like https://example.com/page');
            return;
        }
        setError('');
        setLoading(true);
        try {
            // TODO: connect your real API. Expected response: { short: "thetiny.site/abc12" }
            const res = await fetch('/api/shorten', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: url.trim() }),
            });
            if (!res.ok) throw new Error('Request failed');
            const data: { short: string } = await res.json();
            setShortUrl(data.short);
            setCopied(false);
        } catch {
            setError('We could not shorten that link. Check it and try again.');
        } finally {
            setLoading(false);
        }
    }

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(`https://${shortUrl}`);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            setError('Copy failed. Select the link and copy it manually.');
        }
    }

    return (
        <section className="bg-white text-gray-900 dark:bg-[#0F0B1F] dark:text-white">
            <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:py-24">
                {/* LEFT: message + CTA */}
                <div>
                    <motion.h1
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="font-heading text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
                    >
                        Short links you can count and control.
                    </motion.h1>

                    <p className="mt-5 max-w-lg text-lg text-gray-600 dark:text-gray-300">
                        Create a free short link in seconds, see how many people click it,
                        and disable it whenever you want.
                    </p>

                    <form
                        onSubmit={handleShorten}
                        noValidate
                        className="mt-8 flex max-w-xl flex-col gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-2 dark:border-white/10 dark:bg-white/5 sm:flex-row"
                    >
                        <label htmlFor="long-url" className="sr-only">Long URL</label>
                        <input
                            id="long-url"
                            type="url"
                            inputMode="url"
                            value={url}
                            onChange={(e) => { setUrl(e.target.value); if (error) setError(''); }}
                            placeholder="Paste your long link here"
                            aria-invalid={!!error}
                            aria-describedby={error ? 'url-error' : undefined}
                            className="h-12 min-w-0 flex-1 rounded-xl bg-transparent px-4 text-base text-gray-900 placeholder:text-gray-500 focus-visible:outline-2 focus-visible:outline-brand dark:text-white dark:placeholder:text-gray-400"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="h-12 rounded-xl bg-brand px-6 font-semibold text-white transition-colors duration-150 hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {loading ? 'Shortening...' : 'Get free link'}
                        </button>
                    </form>

                    {error && (
                        <p id="url-error" role="alert" className="mt-3 text-sm font-medium text-red-600 dark:text-red-400">
                            {error}
                        </p>
                    )}

                    {/* Result + copy button */}
                    <AnimatePresence>
                        {shortUrl && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="max-w-xl overflow-hidden"
                            >
                                <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-brand/30 bg-brand/5 p-3 pl-4 dark:bg-brand/10">
                                    <a
                                        href={`https://${shortUrl}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="truncate font-heading text-lg font-bold text-brand dark:text-[#A58BFF]"
                                    >
                                        {shortUrl}
                                    </a>
                                    <button
                                        type="button"
                                        onClick={handleCopy}
                                        className={`shrink-0 rounded-xl px-4 py-2 text-sm font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                                            copied
                                                ? 'bg-brand text-white'
                                                : 'border border-brand text-brand hover:bg-brand/10 dark:text-[#A58BFF]'
                                        }`}
                                    >
                                        {copied ? 'Copied' : 'Copy link'}
                                    </button>
                                    <span className="sr-only" aria-live="polite">{copied ? 'Link copied' : ''}</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                        Free to use. No credit card needed.
                    </p>
                </div>

                {/* RIGHT: carousel */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                    <HeroCarousel />
                </motion.div>
            </div>
        </section>
    );
}