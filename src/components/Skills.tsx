'use client';

import { motion } from 'framer-motion';
import { GitBranch } from 'lucide-react';
import styles from './Skills.module.css';
import { skillsData } from '@/data/content';

const groups = Array.from(new Set(skillsData.map((s) => s.category))).map((category) => ({
    category,
    skills: skillsData.filter((s) => s.category === category),
}));

export default function Skills() {
    return (
        <section id="skills" className={styles.skills}>
            <div className={styles.container}>
                <h2 className="section-title">Tech Stack</h2>
                <motion.div
                    className={styles.editor}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.5 }}
                >
                    <div className={styles.tabBar}>
                        <span className={styles.dots} aria-hidden="true">
                            <span />
                            <span />
                            <span />
                        </span>
                        <span className={styles.tab}>stack.yaml</span>
                    </div>

                    <div className={styles.code}>
                        <div className={styles.line}>
                            <span className={styles.lineNo} aria-hidden="true">1</span>
                            <p className={styles.comment}># tools I use to build, ship and run software</p>
                        </div>
                        {groups.map((group, index) => (
                            <div key={group.category} className={styles.line}>
                                <span className={styles.lineNo} aria-hidden="true">{index + 2}</span>
                                <h3 className={styles.key}>
                                    {group.category}
                                    <span className={styles.punct}>:</span>
                                </h3>
                                <ul className={styles.values}>
                                    {group.skills.map((skill) => (
                                        <li key={skill.name} className={styles.value}>
                                            {skill.icon ? (
                                                <span
                                                    className={styles.logo}
                                                    style={{ '--logo': `url(/icons/tech/${skill.icon}.svg)` } as React.CSSProperties}
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                <span className={styles.logoFallback} aria-hidden="true">
                                                    {skill.name[0]}
                                                </span>
                                            )}
                                            {skill.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className={styles.statusBar}>
                        <span className={styles.status}>
                            <GitBranch size={12} aria-hidden="true" />
                            main
                        </span>
                        <span className={styles.status}>{skillsData.length} entries</span>
                        <span className={`${styles.status} ${styles.statusRight}`}>YAML · UTF-8 · LF</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
