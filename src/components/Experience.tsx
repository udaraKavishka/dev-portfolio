'use client';

import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';
import styles from './Experience.module.css';
import { experienceData } from '@/data/content';

export default function Experience() {
    return (
        <section id="experience" className={styles.experience}>
            <div className={styles.container}>
                <h2 className="section-title">Experience</h2>
                <div className={styles.timeline}>
                    {experienceData.map((item) => (
                        <motion.div
                            key={`${item.company}-${item.role}`}
                            className={styles.timelineItem}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className={styles.icon}>
                                <Briefcase size={24} />
                            </div>
                            <div className={styles.content}>
                                <h3 className={styles.role}>{item.role}</h3>
                                <div className={styles.meta}>
                                    <span className={styles.company}>
                                        {item.link ? (
                                            <a href={item.link} target="_blank" rel="noopener noreferrer">
                                                {item.company}
                                            </a>
                                        ) : (
                                            item.company
                                        )}
                                    </span>
                                    <span className={styles.period}>
                                        <Calendar size={14} />
                                        {item.period}
                                    </span>
                                </div>
                                {item.description && (
                                    <p className={styles.description}>{item.description}</p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
