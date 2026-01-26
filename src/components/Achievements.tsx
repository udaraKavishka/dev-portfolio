'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Award, Trophy, ExternalLink } from 'lucide-react';
import styles from './Achievements.module.css';
import { certificatesData, achievementsData } from '@/data/content';

export default function Achievements() {
    const [activeTab, setActiveTab] = useState<'certificates' | 'achievements'>('certificates');

    const currentData = activeTab === 'certificates' ? certificatesData : achievementsData;
    const Icon = activeTab === 'certificates' ? Award : Trophy;

    return (
        <section id="achievements" className={styles.achievements}>
            <div className={styles.container}>
                <h2 className="section-title">Certificates & Achievements</h2>
                <div className={styles.tabContainer}>
                    <button
                        className={`${styles.tab} ${activeTab === 'certificates' ? styles.active : ''}`}
                        onClick={() => setActiveTab('certificates')}
                    >
                        <Award size={18} />
                        <span>Certificates</span>
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'achievements' ? styles.active : ''}`}
                        onClick={() => setActiveTab('achievements')}
                    >
                        <Trophy size={18} />
                        <span>Achievements</span>
                    </button>
                </div>
                <div className={styles.content}>
                    {currentData.map((item, index) => (
                        <motion.div
                            key={index}
                            className={styles.item}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <div className={styles.iconWrapper}>
                                <Icon size={24} />
                            </div>
                            <div className={styles.itemContent}>
                                <div className={styles.titleRow}>
                                    <h3 className={styles.itemTitle}>{item.title}</h3>
                                    {item.link && (
                                        <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.linkIcon}
                                            aria-label="View certificate"
                                        >
                                            <ExternalLink size={18} />
                                        </a>
                                    )}
                                </div>
                                <p className={styles.itemIssuer}>{item.issuer}</p>
                                {item.date && (
                                    <p className={styles.itemDate}>{item.date}</p>
                                )}
                                {item.description && (
                                    <p className={styles.itemDescription}>{item.description}</p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}