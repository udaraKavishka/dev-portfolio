'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Calendar } from 'lucide-react';
import styles from './Education.module.css';

interface EducationItem {
    degree: string;
    institution: string;
    period: string;
    description?: string;
}

const education: EducationItem[] = [
    {
        degree: 'Bachelor of Science in Computer Science',
        institution: 'University Name',
        period: '2018 - 2022',
        description: 'Focused on cloud computing, distributed systems, and software engineering.',
    },
    {
        degree: 'AWS Certified Solutions Architect',
        institution: 'Amazon Web Services',
        period: '2023',
    },
    {
        degree: 'Certified Kubernetes Administrator (CKA)',
        institution: 'Cloud Native Computing Foundation',
        period: '2023',
    },
];

export default function Education() {
    return (
        <section id="education" className={styles.education}>
            <div className={styles.container}>
                <h2 className="section-title">Education & Certifications</h2>
                <div className={styles.timeline}>
                    {education.map((item, index) => (
                        <motion.div
                            key={index}
                            className={styles.timelineItem}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <div className={styles.icon}>
                                <GraduationCap size={24} />
                            </div>
                            <div className={styles.content}>
                                <h3 className={styles.degree}>{item.degree}</h3>
                                <div className={styles.meta}>
                                    <span className={styles.institution}>{item.institution}</span>
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
