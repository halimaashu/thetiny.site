'use client';

import type { IconType } from 'react-icons';
import { motion, MotionConfig, type Variants } from 'framer-motion';
import { FiBarChart2, FiCheck, FiClock, FiGlobe, FiLock, FiZap } from 'react-icons/fi';
import { RiQrCodeLine } from 'react-icons/ri';

/* ---------- Motion: one staggered reveal when the section scrolls into view ---------- */
const grid: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09 } },
};

const card: Variants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const bar: Variants = {
    hidden: { scaleY: 0 },
    show: (i: number) => ({
        scaleY: 1,
        transition: { delay: 0.3 + i * 0.06, duration: 0.5, ease: 'easeOut' },
    }),
};

const meter: Variants = {
    hidden: { scaleX: 0 },
    show: { scaleX: 1, transition: { delay: 0.5, duration: 0.8, ease: 'easeOut' } },
};

/* ---------- Content ---------- */
// Keep only claims that are true for your app
const SECURITY_POINTS = ['Encrypted links', 'Malware scanned', 'Disable any link'];

const CLICKS_THIS_WEEK = [
    { day: 'M', value: 38 },
    { day: 'T', value: 52 },
    { day: 'W', value: 44 },
    { day: 'T', value: 68 },
    { day: 'F', value: 58 },
    { day: 'S', value: 82 },
    { day: 'S', value: 100 },
];

// 1 = filled square, 0 = empty. Three corner blocks give it the look of a QR code.
const QR_PATTERN = ['1110111', '1011101', '1110111', '1001101', '1110010', '1010110', '1111001'];

/* ---------- Small visuals ---------- */
function ClicksChart() {
    return (
        <div aria-hidden="true" className="mt-8">
            <div className="flex h-32 items-end gap-2 sm:gap-3">
                {CLICKS_THIS_WEEK.map(({ day, value }, i) => (
                    <div key={i} className="flex h-full flex-1 flex-col justify-end">
                        <motion.span
                            custom={i}
                            variants={bar}
                            style={{ height: `${value}%`, originY: 1 }}
                            className="block rounded-t-lg bg-gradient-to-t from-brand to-[#8F68FF] dark:from-brand dark:to-[#A58BFF]"
                        />
                        <span className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">{day}</span>
                    </div>
                ))}
            </div>
            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">Example: clicks per day this week</p>
        </div>
    );
}

function QrPattern() {
    return (
        <div aria-hidden="true" className="grid shrink-0 grid-cols-7 gap-1 rounded-xl bg-gray-50 p-3 dark:bg-white/5">
            {QR_PATTERN.join('')
                .split('')
                .map((cell, i) => (
                    <span
                        key={i}
                        className={`h-3 w-3 rounded-[3px] ${cell === '1' ? 'bg-brand dark:bg-[#A58BFF]' : ''}`}
                    />
                ))}
        </div>
    );
}

function ExpiryMeter() {
    return (
        <div aria-hidden="true" className="mt-6">
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Example: expires in 7 days</span>
                <span>350 / 500 clicks</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-white/10">
                <motion.div
                    variants={meter}
                    style={{ originX: 0, width: '70%' }}
                    className="h-full rounded-full bg-brand dark:bg-[#A58BFF]"
                />
            </div>
        </div>
    );
}

/* ---------- Shared card ---------- */
type CardProps = {
    icon: IconType;
    title: string;
    text: string;
    className?: string;
    children?: React.ReactNode;
};

function FeatureCard({ icon: Icon, title, text, className = '', children }: CardProps) {
    return (
        <motion.article
            variants={card}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className={`flex flex-col rounded-3xl border border-gray-200 bg-white p-7 transition-colors duration-200 hover:border-brand/40 dark:border-white/10 dark:bg-white/5 dark:hover:border-[#A58BFF]/50 ${className}`}
        >
            <Icon aria-hidden="true" size={30} className="text-brand dark:text-[#A58BFF]" />
            <h3 className="mt-5 font-heading text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
            <p className="mt-2 max-w-md text-gray-600 dark:text-gray-300">{text}</p>
            {children}
        </motion.article>
    );
}

/* ---------- Section ---------- */
export default function WhyWe() {
    return (
        <MotionConfig reducedMotion="user">
            <section
                id="why-trust"
                aria-labelledby="why-trust-title"
                className="bg-gray-50 py-20 dark:bg-[#0B0818] sm:py-28"
            >
                <div className="mx-auto max-w-6xl px-5">
                    <header className="max-w-2xl">
                        <h2
                            id="why-trust-title"
                            className="font-heading text-3xl font-extrabold tracking-tight text-gray-950 dark:text-white sm:text-5xl"
                        >
                            Why people trust thetiny.site
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                            Everything you need to manage and track your links, in one place.
                        </p>
                    </header>

                    <motion.div
                        variants={grid}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.15 }}
                        className="mt-12 grid gap-5 md:grid-cols-6"
                    >
                        <FeatureCard
                            icon={FiBarChart2}
                            title="Detailed analytics"
                            text="Track clicks, referrers, locations and devices, so you always know how your links perform."
                            className="md:col-span-4"
                        >
                            <ClicksChart />
                        </FeatureCard>

                        <FeatureCard
                            icon={FiZap}
                            title="Lightning fast"
                            text="Shorten URLs instantly with our optimized infrastructure."
                            className="md:col-span-2"
                        />

                        <FeatureCard
                            icon={RiQrCodeLine}
                            title="QR codes"
                            text="Generate a QR code for any shortened link."
                            className="md:col-span-2"
                        >
                            <div className="mt-6">
                                <QrPattern />
                            </div>
                        </FeatureCard>

                        <FeatureCard
                            icon={FiLock}
                            title="Secure"
                            text="All links are encrypted and malware scanned."
                            className="md:col-span-4"
                        >
                            <ul className="mt-6 flex flex-wrap gap-2">
                                {SECURITY_POINTS.map((point) => (
                                    <li
                                        key={point}
                                        className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1.5 text-sm font-medium text-brand dark:bg-brand/25 dark:text-[#C9B8FF]"
                                    >
                                        <FiCheck aria-hidden="true" />
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </FeatureCard>

                        <FeatureCard
                            icon={FiGlobe}
                            title="Global CDN"
                            text="Fast redirects from anywhere in the world."
                            className="md:col-span-3"
                        />

                        <FeatureCard
                            icon={FiClock}
                            title="Expiration control"
                            text="Set expiry dates or click limits."
                            className="md:col-span-3"
                        >
                            <ExpiryMeter />
                        </FeatureCard>
                    </motion.div>
                </div>
            </section>
        </MotionConfig>
    );
}