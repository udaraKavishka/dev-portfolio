'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import styles from './Clubs.module.css';

interface Club {
    name: string;
    role: string;
}

const clubs: Club[] = [
    { name: 'DevOps Community', role: 'Community Lead' },
    { name: 'Cloud Native Student Group', role: 'Co-Founder' },
    { name: 'Open Source Contributors Club', role: 'Active Member' },
    { name: 'Linux User Group', role: 'Member' },
    { name: 'Tech Meetup Organizer', role: 'Organizer' },
];

export default function Clubs() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="clubs" className={styles.clubs} ref={ref}>
            <div className={styles.container}>
                <h2 className="section-title">Clubs & Societies</h2>
                <div className={styles.clubsList}>
                    {clubs.map((club, index) => (
                        <motion.div
                            key={index}
                            className={styles.clubItem}
                            initial={{ opacity: 0, x: -10 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: index * 0.05, duration: 0.3 }}
                        >
                            <div className={styles.clubContent}>
                                <span className={styles.bullet}>▸</span>
                                <div className={styles.clubInfo}>
                                    <span className={styles.clubName}>{club.name}</span>
                                    <span className={styles.clubRole}>{club.role}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
