'use client';

import { motion } from 'framer-motion';
import { FlaskConical, Calendar } from 'lucide-react';
import styles from './Research.module.css';
import { researchData } from '@/data/content';

export default function Research() {
    return (
        <section id="research" className={styles.research}>
            <div className={styles.container}>
                <h2 className="section-title">Research</h2>
                <div className={styles.timeline}>
                    {researchData.map((item, index) => (
                        <motion.div
                            key={index}
                            className={styles.timelineItem}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <div className={styles.icon}>
                                <FlaskConical size={24} />
                            </div>
                            <div className={styles.content}>
                                <h3 className={styles.title}>{item.title}</h3>
                                <div className={styles.meta}>
                                    <span className={styles.institution}>{item.institution}</span>
                                    <span className={styles.period}>
                                        <Calendar size={14} />
                                        {item.period}
                                    </span>
                                </div>
                                <p className={styles.focus}>{item.focus}</p>
                                <ul className={styles.highlights}>
                                    {item.highlights.map((highlight, i) => (
                                        <li key={i}>{highlight}</li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
