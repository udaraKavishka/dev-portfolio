'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Linkedin, ArrowRight } from 'lucide-react';
import styles from './Clubs.module.css';
import { clubsData } from '@/data/content';

export default function Clubs() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const handleViewExperience = () => {
        window.open('https://www.linkedin.com/in/udaranalawansa/', '_blank');
    };

    return (
        <section id="clubs" className={styles.clubs} ref={ref}>
            <div className={styles.container}>
                <h2 className="section-title">Clubs & Societies</h2>
                <div className={styles.clubsList}>
                    {clubsData.map((club, index) => (
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
                                    {club.description && (
                                        <p className={styles.clubDescription}>{club.description}</p>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div className={styles.viewMoreContainer}>
                    <button onClick={handleViewExperience} className={styles.linkedinButton}>
                        <Linkedin size={18} />
                        <span>View My Experience on LinkedIn</span>
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </section>
    );
}