'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import styles from './Skills.module.css';
import { skillsData } from '@/data/content';

const categories = Array.from(new Set(skillsData.map((s) => s.category)));

export default function Skills() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="skills" className={styles.skills} ref={ref}>
            <div className={styles.container}>
                <h2 className="section-title">Tech Stack</h2>
                <div className={styles.categories}>
                    {categories.map((category, catIndex) => (
                        <motion.div
                            key={category}
                            className={styles.category}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: catIndex * 0.1, duration: 0.5 }}
                        >
                            <h3 className={styles.categoryTitle}>{category}</h3>
                            <div className={styles.skillsList}>
                                {skillsData
                                    .filter((skill) => skill.category === category)
                                    .map((skill, index) => (
                                        <motion.div
                                            key={skill.name}
                                            className={styles.skillItem}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                                            transition={{
                                                delay: catIndex * 0.1 + index * 0.05,
                                                duration: 0.3,
                                            }}
                                        >
                                            <span className={styles.bullet}>▸</span>
                                            <span className={styles.skillName}>{skill.name}</span>
                                        </motion.div>
                                    ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
