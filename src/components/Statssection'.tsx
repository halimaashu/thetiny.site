'use client';

import { useEffect, useRef } from 'react';
import { animate, motion, MotionConfig, useInView, useReducedMotion, type Variants } from 'framer-motion';

/* ---------- Content: edit these numbers (see the note about honest numbers) ---------- */
const STATS = [
    { value: 100, decimals: 0, suffix: 'K+', label: 'Links created' },
    { value: 1, decimals: 0, suffix: 'M+', label: 'Total clicks' },
    { value: 180, decimals: 0, suffix: '+', label: 'Countries' },
    { value: 99.9, decimals: 1, suffix: '%', label: 'Uptime' },
];

/* ---------- Motion ---------- */
const list: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

/* ---------- Number that counts up once when it scrolls into view ---------- */
function Counter({ value, decimals }: { value: number; decimals: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.8 });
    const reduce = useReducedMotion();

    useEffect(() => {
        const node = ref.current;
        if (!node || !inView) return;

        // Skip the counting for users who prefer reduced motion
        if (reduce) {
            node.textContent = value.toFixed(decimals);
            return;
        }

        const controls = animate(0, value, {
            duration: 1.8,
            ease: 'easeOut',
            onUpdate: (latest) => {
                node.textContent = latest.toFixed(decimals);
            },
        });
        return () => controls.stop();
    }, [inView, reduce, value, decimals]);

    return (
        <span ref={ref} aria-hidden="true">
            {(0).toFixed(decimals)}
        </span>
    );
}

/* ---------- Section ---------- */
export default function StatsSection() {
    return (
        <MotionConfig reducedMotion="user">
            <section
                aria-labelledby="stats-title"
                className="bg-gradient-to-br from-brand to-brand-dark py-16 text-white sm:py-20"
            >
                <div className="mx-auto max-w-6xl px-5">
                    <h2
                        id="stats-title"
                        className="text-center font-heading text-2xl font-extrabold tracking-tight sm:text-3xl"
                    >
                        The numbers we are proud of
                    </h2>

                    <motion.dl
                        variants={list}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.4 }}
                        className="mt-12 grid grid-cols-2 gap-y-10 lg:grid-cols-4 lg:divide-x lg:divide-white/20"
                    >
                        {STATS.map(({ value, decimals, suffix, label }) => (
                            <motion.div key={label} variants={item} className="px-4 text-center">
                                <dt className="sr-only">{label}</dt>
                                <dd>
                                    {/* Screen readers read the final number, not the counting animation */}
                                    <span className="sr-only">{`${value}${suffix} ${label}`}</span>
                                    <span
                                        aria-hidden="true"
                                        className="font-heading text-4xl font-extrabold tabular-nums sm:text-5xl"
                                    >
                                        <Counter value={value} decimals={decimals} />
                                        {suffix}
                                    </span>
                                    <span aria-hidden="true" className="mt-2 block text-sm text-white/85 sm:text-base">
                                        {label}
                                    </span>
                                </dd>
                            </motion.div>
                        ))}
                    </motion.dl>
                </div>
            </section>
        </MotionConfig>
    );
}