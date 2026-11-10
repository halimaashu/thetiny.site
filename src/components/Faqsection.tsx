'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, MotionConfig, type Variants } from 'framer-motion';
import { FiArrowRight, FiMail, FiPlus } from 'react-icons/fi';

/* ---------- Questions: edit so every answer is true for your app ---------- */
const FAQS = [
    {
        question: 'What is thetiny.site?',
        answer:
            'It is a link shortener. You paste a long URL and get a short one that is easy to share, and you can see how many people click it.',
    },
    {
        question: 'Is it free to use?',
        answer:
            'Yes. The Free plan lets you shorten as many links as you like and see a basic click count. You do not need a credit card to start.',
    },
    {
        question: 'How do I shorten a link?',
        answer:
            'Paste your long link into the box at the top of the home page, press Get free link, then press Copy link. That is all it takes.',
    },
    {
        question: 'How are clicks counted?',
        answer:
            'Each time someone opens your short link, its click count goes up by one. You can see the totals for every link in your dashboard.',
    },
    {
        question: 'Can I turn a link off?',
        answer:
            'Yes. In your dashboard, switch a link to disabled or delete it. People who open it afterwards will see a page that says the link no longer works.',
    },
    {
        question: 'Do I need an account?',
        answer:
            'Create a free account to keep all your links and clicks in one dashboard, so you can find, disable or delete them later.',
    },
];

/* ---------- Motion ---------- */
const list: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07 } },
};

const row: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

/* ---------- Section ---------- */
export default function FaqSection() {
    // Only one answer is open at a time. Press it again to close it.
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <MotionConfig reducedMotion="user">
            <section
                id="faq"
                aria-labelledby="faq-title"
                className="bg-white py-20 dark:bg-[#0F0B1F] sm:py-28"
            >
                <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[4fr_8fr]">
                    {/* Heading and contact card */}
                    <div className="self-start lg:sticky lg:top-28">
                        <h2
                            id="faq-title"
                            className="font-heading text-3xl font-extrabold tracking-tight text-gray-950 dark:text-white sm:text-5xl"
                        >
                            Questions people ask us
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                            Quick answers about shortening links, counting clicks and staying in control.
                        </p>

                        <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-white/10 dark:bg-white/5">
                            <FiMail aria-hidden="true" size={24} className="text-brand dark:text-[#A58BFF]" />
                            <h3 className="mt-3 font-heading text-lg font-bold text-gray-900 dark:text-white">
                                Still have a question?
                            </h3>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                                Send us a message and we will get back to you.
                            </p>
                            <Link
                                href="/contact"
                                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand dark:text-[#A58BFF]"
                            >
                                Contact us
                                <FiArrowRight aria-hidden="true" />
                            </Link>
                        </div>
                    </div>

                    {/* Accordion */}
                    <motion.ul
                        variants={list}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        className="space-y-3"
                    >
                        {FAQS.map(({ question, answer }, i) => {
                            const isOpen = openIndex === i;
                            const buttonId = `faq-button-${i}`;
                            const panelId = `faq-panel-${i}`;

                            return (
                                <motion.li
                                    key={question}
                                    variants={row}
                                    className={`rounded-2xl border transition-colors duration-200 ${
                                        isOpen
                                            ? 'border-brand/50 bg-brand/5 dark:border-[#A58BFF]/50 dark:bg-brand/10'
                                            : 'border-gray-200 bg-white hover:border-brand/30 dark:border-white/10 dark:bg-white/5 dark:hover:border-[#A58BFF]/30'
                                    }`}
                                >
                                    <h3>
                                        <button
                                            type="button"
                                            id={buttonId}
                                            aria-expanded={isOpen}
                                            aria-controls={isOpen ? panelId : undefined}
                                            onClick={() => setOpenIndex(isOpen ? null : i)}
                                            className="flex w-full items-center justify-between gap-4 rounded-2xl px-6 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                                        >
                                            <span className="font-heading text-lg font-bold text-gray-900 dark:text-white">
                                                {question}
                                            </span>
                                            <motion.span
                                                animate={{ rotate: isOpen ? 45 : 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand dark:bg-brand/25 dark:text-[#C9B8FF]"
                                            >
                                                <FiPlus aria-hidden="true" />
                                            </motion.span>
                                        </button>
                                    </h3>

                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                key="answer"
                                                id={panelId}
                                                role="region"
                                                aria-labelledby={buttonId}
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.25, ease: 'easeInOut' }}
                                                className="overflow-hidden"
                                            >
                                                <p className="px-6 pb-5 leading-relaxed text-gray-600 dark:text-gray-300">
                                                    {answer}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.li>
                            );
                        })}
                    </motion.ul>
                </div>
            </section>
        </MotionConfig>
    );
}