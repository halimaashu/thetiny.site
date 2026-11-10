'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, MotionConfig, type Variants } from 'framer-motion';
import { FiArrowRight, FiCheck } from 'react-icons/fi';

/* ---------- Plans: edit prices and features here ---------- */
type Plan = {
    id: string;
    name: string;
    price: number;
    period: string;
    blurb: string;
    cta: string;
    badge?: string;
    features: string[];
};

const PLANS: Plan[] = [
    {
        id: 'free',
        name: 'Free',
        price: 0,
        period: 'forever',
        blurb: 'Great for individuals and casual use.',
        cta: 'Get started free',
        features: [
            'Unlimited link shortening',
            'Basic click counter',
            'HTTPS security',
            'QR code (basic)',
            'Cross-device support',
        ],
    },
    {
        id: 'pro',
        name: 'Pro',
        price: 9,
        period: 'month',
        blurb: 'For creators, marketers and power users.',
        cta: 'Start 14-day trial',
        badge: 'Most popular',
        features: [
            'Everything in Free',
            'Custom short links',
            'Advanced analytics',
            'UTM builder',
            'QR code (custom)',
            'Browser extension',
            'Priority support',
        ],
    },
    {
        id: 'business',
        name: 'Business',
        price: 29,
        period: 'month',
        blurb: 'For teams and growing companies.',
        cta: 'Subscribe now',
        features: [
            'Everything in Pro',
            'Team dashboard',
            'Developer API',
            'Bulk link creation',
            'White-label domain',
            'App integrations',
            'Dedicated support',
        ],
    },
];

/* ---------- Motion ---------- */
const featureList: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};

const featureItem: Variants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

/* ---------- Section ---------- */
export default function PricingSection() {
    const [activeId, setActiveId] = useState('pro');
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const active = PLANS.find((p) => p.id === activeId) ?? PLANS[1];

    function select(index: number) {
        setActiveId(PLANS[index].id);
        tabRefs.current[index]?.focus();
    }

    // Arrow keys, Home and End move between plans, like a normal tab list
    function handleKeyDown(e: React.KeyboardEvent, index: number) {
        const last = PLANS.length - 1;
        let next: number | null = null;

        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = index === last ? 0 : index + 1;
        else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = index === 0 ? last : index - 1;
        else if (e.key === 'Home') next = 0;
        else if (e.key === 'End') next = last;

        if (next !== null) {
            e.preventDefault();
            select(next);
        }
    }

    return (
        <MotionConfig reducedMotion="user">
            <section
                id="pricing"
                aria-labelledby="pricing-title"
                className="bg-white py-20 text-gray-900 dark:bg-[#0F0B1F] dark:text-white sm:py-28"
            >
                <div className="mx-auto max-w-6xl px-5">
                    <header className="max-w-2xl">
                        <h2
                            id="pricing-title"
                            className="font-heading text-3xl font-extrabold tracking-tight text-gray-950 dark:text-white sm:text-5xl"
                        >
                            Pick the plan that fits your links
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                            Start free. Upgrade when you need more.
                        </p>
                    </header>

                    <div className="mt-12 grid gap-6 lg:grid-cols-[5fr_7fr]">
                        {/* Plan picker */}
                        <div
                            role="tablist"
                            aria-label="Pricing plans"
                            aria-orientation="vertical"
                            className="flex flex-col gap-3"
                        >
                            {PLANS.map((plan, i) => {
                                const selected = plan.id === activeId;
                                return (
                                    <button
                                        key={plan.id}
                                        ref={(el) => {
                                            tabRefs.current[i] = el;
                                        }}
                                        type="button"
                                        role="tab"
                                        id={`plan-tab-${plan.id}`}
                                        aria-selected={selected}
                                        aria-controls="plan-panel"
                                        tabIndex={selected ? 0 : -1}
                                        onClick={() => setActiveId(plan.id)}
                                        onKeyDown={(e) => handleKeyDown(e, i)}
                                        className={`relative w-full rounded-2xl border px-5 py-4 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                                            selected
                                                ? 'border-brand text-white'
                                                : 'border-gray-200 bg-white hover:border-brand/40 dark:border-white/10 dark:bg-white/5 dark:hover:border-[#A58BFF]/50'
                                        }`}
                                    >
                                        {selected && (
                                            <motion.span
                                                layoutId="plan-highlight"
                                                transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                                                className="absolute inset-0 rounded-2xl bg-brand shadow-lg shadow-brand/30"
                                            />
                                        )}

                                        <span className="relative z-10 flex items-center justify-between gap-4">
                                            <span>
                                                <span className="flex items-center gap-2">
                                                    <span className="font-heading text-lg font-bold">{plan.name}</span>
                                                    {plan.badge && (
                                                        <span
                                                            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                                                selected
                                                                    ? 'bg-white/20 text-white'
                                                                    : 'bg-brand/10 text-brand dark:bg-brand/25 dark:text-[#C9B8FF]'
                                                            }`}
                                                        >
                                                            {plan.badge}
                                                        </span>
                                                    )}
                                                </span>
                                                <span
                                                    className={`mt-1 block text-sm ${
                                                        selected ? 'text-white/85' : 'text-gray-600 dark:text-gray-300'
                                                    }`}
                                                >
                                                    {plan.blurb}
                                                </span>
                                            </span>

                                            <span className="shrink-0 text-right">
                                                <span className="font-heading text-2xl font-extrabold">${plan.price}</span>
                                                <span
                                                    className={`block text-xs ${
                                                        selected ? 'text-white/85' : 'text-gray-500 dark:text-gray-400'
                                                    }`}
                                                >
                                                    /{plan.period}
                                                </span>
                                            </span>
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Plan details */}
                        <div
                            role="tabpanel"
                            id="plan-panel"
                            aria-labelledby={`plan-tab-${active.id}`}
                            tabIndex={0}
                            className="flex min-h-[27rem] rounded-3xl border border-gray-200 bg-gray-50 p-7 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand dark:border-white/10 dark:bg-white/5 sm:p-10"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div
                                    key={active.id}
                                    initial={{ opacity: 0, x: 16 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -16 }}
                                    transition={{ duration: 0.22 }}
                                    className="flex flex-1 flex-col"
                                >
                                    <p className="text-sm font-semibold text-brand dark:text-[#A58BFF]">
                                        {active.name} plan
                                    </p>
                                    <p className="mt-2 flex items-baseline gap-2">
                                        <span className="font-heading text-6xl font-extrabold tracking-tight">
                                            ${active.price}
                                        </span>
                                        <span className="text-gray-500 dark:text-gray-400">/{active.period}</span>
                                    </p>
                                    <p className="mt-3 text-gray-600 dark:text-gray-300">{active.blurb}</p>

                                    <motion.ul
                                        variants={featureList}
                                        initial="hidden"
                                        animate="show"
                                        className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2"
                                    >
                                        {active.features.map((feature) => (
                                            <motion.li key={feature} variants={featureItem} className="flex items-center gap-3">
                                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand dark:bg-brand/25 dark:text-[#C9B8FF]">
                                                    <FiCheck size={14} aria-hidden="true" />
                                                </span>
                                                {feature}
                                            </motion.li>
                                        ))}
                                    </motion.ul>

                                    <div className="mt-auto pt-10">
                                        <Link
                                            href={`/signup?plan=${active.id}`}
                                            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand px-8 font-semibold text-white transition-colors duration-150 hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:w-auto"
                                        >
                                            {active.cta}
                                            <FiArrowRight aria-hidden="true" />
                                        </Link>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>
        </MotionConfig>
    );
}