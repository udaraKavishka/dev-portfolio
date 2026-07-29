'use client';

import { useEffect, useRef, useState } from 'react';
import { Eye } from 'lucide-react';
import styles from './Hero.module.css';

export default function ViewCounter() {
    const [views, setViews] = useState<number | null>(null);
    const counted = useRef(false);

    useEffect(() => {
        // Strict mode mounts twice in development; only count once.
        if (counted.current) return;
        counted.current = true;

        fetch('/api/views', { method: 'POST' })
            .then((res) => res.json())
            .then((data) => {
                if (typeof data.views === 'number') setViews(data.views);
            })
            .catch(() => {});
    }, []);

    // Nothing to show until the store answers.
    if (views === null) return null;

    return (
        <div className={styles.viewCount} title={`${views.toLocaleString()} page views`}>
            <Eye size={14} />
            <span>{views.toLocaleString()}</span>
        </div>
    );
}
