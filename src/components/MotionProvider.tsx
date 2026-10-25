'use client';

import { MotionConfig } from 'framer-motion';

// Lets framer-motion follow the visitor's "reduce motion" OS setting.
export default function MotionProvider({ children }: { children: React.ReactNode }) {
    return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
