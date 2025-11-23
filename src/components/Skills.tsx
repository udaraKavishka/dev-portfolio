'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import styles from './Skills.module.css';

interface Skill {
    name: string;
    category: string;
}

const skills: Skill[] = [
    { name: 'Docker', category: 'Containerization' },
    { name: 'Kubernetes', category: 'Orchestration' },
    { name: 'AWS', category: 'Cloud' },
    { name: 'Azure', category: 'Cloud' },
    { name: 'GCP', category: 'Cloud' },
    { name: 'Terraform', category: 'IaC' },
    { name: 'Ansible', category: 'IaC' },
    { name: 'CloudFormation', category: 'IaC' },
    { name: 'Jenkins', category: 'CI/CD' },
    { name: 'GitLab CI', category: 'CI/CD' },
    { name: 'GitHub Actions', category: 'CI/CD' },
    { name: 'ArgoCD', category: 'CI/CD' },
    { name: 'Prometheus', category: 'Monitoring' },
    { name: 'Grafana', category: 'Monitoring' },
    { name: 'ELK Stack', category: 'Monitoring' },
    { name: 'Python', category: 'Programming' },
    { name: 'Bash', category: 'Programming' },
    { name: 'Go', category: 'Programming' },
];

const categories = Array.from(new Set(skills.map((s) => s.category)));

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
                                {skills
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
