'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Briefcase, FlaskConical, GraduationCap, School, type LucideIcon } from 'lucide-react';
import styles from './Journey.module.css';
import EducationMedia from './EducationMedia';
import { educationData, experienceData, researchData } from '@/data/content';

interface Entry {
    key: string;
    side: 'left' | 'right';
    row: string;
    kind: string;
    icon: LucideIcon;
    anchor?: string;
    title: string;
    badge?: string;
    org: string;
    period: string;
    current?: boolean;
    lead?: string;
    highlights?: string[];
    tags?: string[];
    mediaFor?: number;
}

const yearOf = (period: string) => period.match(/\d{4}/)?.[0] ?? period;

// Education runs down the left of the spine, oldest first. Research and work happened during the degree,
// so they sit on the right beside it and the latest degree card spans their rows.
const education = educationData.map((item, index) => ({ item, index })).reverse();
const right = [
    ...researchData.map((item, index) => ({
        key: `research-${index}`,
        kind: 'research',
        icon: FlaskConical,
        anchor: index === 0 ? 'research' : undefined,
        title: item.title,
        org: item.institution,
        period: item.period,
        lead: item.focus,
        highlights: item.highlights,
        tags: item.tags,
    })),
    ...experienceData
        .map((item, index) => ({
            key: `work-${index}`,
            kind: 'work',
            icon: Briefcase,
            anchor: index === 0 ? 'experience' : undefined,
            title: item.role,
            org: item.company,
            period: item.period,
            current: item.period.includes('Present'),
            lead: item.description,
            highlights: item.highlights,
            tags: item.tags,
        }))
        .reverse(),
];

const degreeRow = education.length;
const entries: Entry[] = [
    ...education.map(({ item, index }, position) => {
        const [title, badge] = item.degree.split(' - ');
        const isDegree = position === education.length - 1;
        return {
            key: `edu-${index}`,
            side: 'left' as const,
            row: isDegree ? `${degreeRow} / span ${Math.max(right.length, 1)}` : `${position + 1}`,
            kind: isDegree ? 'education' : 'school',
            icon: isDegree ? GraduationCap : School,
            anchor: index === 0 ? 'education' : undefined,
            title,
            badge,
            org: item.institution,
            period: item.period,
            lead: item.description,
            mediaFor: item.media?.length ? index : undefined,
        };
    }),
    ...right.map((entry, position) => ({ ...entry, side: 'right' as const, row: `${degreeRow + position}` })),
];

export default function Journey() {
    const timelineRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 75%', 'end 60%'] });
    const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

    return (
        <section id="journey" className={styles.journey}>
            <div className={styles.container}>
                <h2 className="section-title">Journey</h2>

                <div ref={timelineRef} className={styles.timeline}>
                    <span className={styles.spine} aria-hidden="true">
                        <motion.span className={styles.spineFill} style={{ scaleY: fill }} />
                    </span>

                    {entries.map((entry) => {
                        const Icon = entry.icon;
                        const fromLeft = entry.side === 'left';
                        return (
                            <motion.article
                                key={entry.key}
                                id={entry.anchor}
                                className={`${styles.entry} ${fromLeft ? styles.left : styles.right}`}
                                style={{ '--row': entry.row } as React.CSSProperties}
                                initial={{ opacity: 0, x: fromLeft ? -40 : 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <span className={styles.yearAnchor}>
                                    <motion.span
                                        className={styles.year}
                                        initial={{ scale: 0.6, opacity: 0 }}
                                        whileInView={{ scale: 1, opacity: 1 }}
                                        viewport={{ once: true, margin: '-120px' }}
                                        transition={{ type: 'spring', stiffness: 380, damping: 22, delay: 0.15 }}
                                    >
                                        {yearOf(entry.period)}
                                    </motion.span>
                                </span>

                                <div className={styles.card}>
                                    <div className={styles.cardTop}>
                                        <span className={styles.kind}>
                                            <Icon size={14} aria-hidden="true" />
                                            {entry.kind}
                                        </span>
                                        {entry.current && (
                                            <span className={styles.now}>
                                                <span className={styles.nowDot} />
                                                now
                                            </span>
                                        )}
                                        {entry.badge && <span className={styles.badge}>{entry.badge}</span>}
                                    </div>
                                    <h3 className={styles.title}>{entry.title}</h3>
                                    <p className={styles.org}>
                                        {entry.org}
                                        <span className={styles.period}>{entry.period}</span>
                                    </p>
                                    {entry.lead && <p className={styles.lead}>{entry.lead}</p>}
                                    {entry.tags && (
                                        <ul className={styles.chips}>
                                            {entry.tags.map((tag) => (
                                                <li key={tag} className={styles.chip}>
                                                    {tag}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {entry.highlights && (
                                        <details className={styles.details}>
                                            <summary className={styles.summary}>
                                                {entry.highlights.length} highlights
                                            </summary>
                                            <ul className={styles.highlights}>
                                                {entry.highlights.map((highlight, i) => (
                                                    <li key={i}>{highlight}</li>
                                                ))}
                                            </ul>
                                        </details>
                                    )}
                                    {entry.mediaFor !== undefined && <EducationMedia eduIndex={entry.mediaFor} />}
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
