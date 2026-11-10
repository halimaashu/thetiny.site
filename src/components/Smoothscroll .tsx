'use client';

import { ReactLenis } from 'lenis/react';
import { useReducedMotion } from 'framer-motion';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const reduce = useReducedMotion();

    // Respect users who turned off motion in their system settings
    if (reduce) return <>{children}</>;

    return (
        <ReactLenis root options={{ duration: 1.1, smoothWheel: true }}>
            {children}
        </ReactLenis>
    );
}