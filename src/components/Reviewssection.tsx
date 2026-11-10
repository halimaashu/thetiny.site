'use client';

import Link from 'next/link';
import { motion, MotionConfig, type Variants } from 'framer-motion';
import { FaStar } from 'react-icons/fa6';
import { FiArrowRight } from 'react-icons/fi';

/* ---------- Demo reviews: sample content, replace with real ones when you have them ---------- */
type Review = {
    name: string;
    role: string;
    rating: number;
    text: string;
    featured?: boolean;
};

const REVIEWS: Review[] = [
    {
        name: 'Maya Chen',
        role: 'Newsletter writer',
        rating: 5,
        text: 'I paste a long link, copy the short one, and I am done. Seeing which issue links get clicked has changed what I write about.',
        featured: true,
    },
    {
        name: 'Daniel Okafor',
        role: 'Shop owner',
        rating: 5,
        text: 'I switched off an old sale link in one click after the offer ended. Nobody lands on a dead promo page anymore.',
    },
    {
        name: 'Sara Ahmed',
        role: 'Social media manager',
        rating: 4,
        text: 'The dashboard is clean and easy to read. Click counts are all I need for my weekly report.',
    },
    {
        name: 'Tom Becker',
        role: 'Freelance designer',
        rating: 5,
        text: 'It works well on my phone, and dark mode is easy on the eyes when I check clicks at night.',
    },
    {
        name: 'Nadia Karim',
        role: 'Community organizer',
        rating: 5,
        text: 'I share one tiny link at every event. The QR code made our flyers much simpler.',
    },
    {
        name: 'Leo Martins',
        role: 'Student',
        rating: 4,
        text: 'Simple, fast and free. It took me less than a minute to create my first link.',
    },
];

// Average is calculated from the reviews above, so it always matches
const AVERAGE = (REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length).toFixed(1);

// Two columns, the second one sits lower for a staggered look
const COLUMNS = [REVIEWS.filter((_, i) => i % 2 === 0), REVIEWS.filter((_, i) => i % 2 === 1)];

/* ---------- Motion ---------- */
const group: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
};

const rise: Variants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

/* ---------- Pieces ---------- */
function Stars({ rating, className = '' }: { rating: number; className?: string }) {
    return (
        <div role="img" aria-label={`${rating} out of 5 stars`} className={`flex gap-1 ${className}`}>
            {Array.from({ length: 5 }, (_, i) => (
                <FaStar
                    key={i}
                    aria-hidden="true"
                    size={16}
                    className={i < rating ? 'text-amber-400' : 'text-gray-300 dark:text-white/20'}
                />
            ))}
        </div>
    );
}

function ReviewCard({ review }: { review: Review }) {
    const { name, role, rating, text, featured } = review;
    const initials = name
        .split(' ')
        .map((part) => part[0])
        .join('');

    return (
        <motion.figure
            variants={rise}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className={`rounded-3xl p-7 ${
                featured
                    ? 'bg-brand text-white shadow-xl shadow-brand/25'
                    : 'border border-gray-200 bg-white dark:border-white/10 dark:bg-white/5'
            }`}
        >
            <Stars rating={rating} />

            <blockquote
                className={`mt-4 leading-relaxed ${featured ? 'text-lg text-white' : 'text-gray-700 dark:text-gray-200'}`}
            >
                <p>{text}</p>
            </blockquote>

            <figcaption className="mt-6 flex items-center gap-3">
                <span
                    aria-hidden="true"
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                        featured
                            ? 'bg-white/20 text-white'
                            : 'bg-brand/10 text-brand dark:bg-brand/25 dark:text-[#C9B8FF]'
                    }`}
                >
                    {initials}
                </span>
                <span>
                    <span className={`block font-semibold ${featured ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                        {name}
                    </span>
                    <span className={`block text-sm ${featured ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                        {role}
                    </span>
                </span>
            </figcaption>
        </motion.figure>
    );
}

/* ---------- Section ---------- */
export default function ReviewsSection() {
    return (
        <MotionConfig reducedMotion="user">
            <section
                id="reviews"
                aria-labelledby="reviews-title"
                className="bg-gray-50 py-20 dark:bg-[#0B0818] sm:py-28"
            >
                <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[4fr_8fr]">
                    {/* Summary */}
                    <div className="self-start lg:sticky lg:top-28">
                        <h2
                            id="reviews-title"
                            className="font-heading text-3xl font-extrabold tracking-tight text-gray-950 dark:text-white sm:text-5xl"
                        >
                            What people say about thetiny.site
                        </h2>

                        <div className="mt-8 flex items-center gap-4">
                            <span className="font-heading text-6xl font-extrabold text-brand dark:text-[#A58BFF]">
                                {AVERAGE}
                            </span>
                            <div>
                                <Stars rating={Math.round(Number(AVERAGE))} />
                                <p className="mt-1.5 text-sm text-gray-600 dark:text-gray-300">
                                    from {REVIEWS.length} reviews
                                </p>
                            </div>
                        </div>

                        <p className="mt-6 max-w-sm text-gray-600 dark:text-gray-300">
                            Short links, clear click counts, and full control over where each link goes.
                        </p>

                        <Link
                            href="/#shorten"
                            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 font-semibold text-white transition-colors duration-150 hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                        >
                            Try it free
                            <FiArrowRight aria-hidden="true" />
                        </Link>

                        <p className="mt-6 text-xs text-gray-500 dark:text-gray-400">
                            Sample reviews written for this demo.
                        </p>
                    </div>

                    {/* Review cards */}
                    <motion.div
                        variants={group}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.15 }}
                        className="grid gap-5 md:grid-cols-2"
                    >
                        {COLUMNS.map((column, i) => (
                            <div key={i} className={`flex flex-col gap-5 ${i === 1 ? 'md:mt-12' : ''}`}>
                                {column.map((review) => (
                                    <ReviewCard key={review.name} review={review} />
                                ))}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </MotionConfig>
    );
}