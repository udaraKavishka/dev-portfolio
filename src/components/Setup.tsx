'use client';

import { motion } from 'framer-motion';
import styles from './Setup.module.css';
import { setupData } from '@/data/content';

export default function Setup() {
    return (
        <section id="setup" className={styles.setup}>
            <div className={styles.container}>
                <h2 className="section-title">My Setup</h2>
                <div className={styles.categories}>
                    {setupData.map((category, catIndex) => (
                        <motion.div
                            key={category.title}
                            className={styles.category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ delay: catIndex * 0.1, duration: 0.5 }}
                        >
                            <div className={styles.categoryHeader}>
                                <category.icon size={24} className={styles.categoryIcon} />
                                <h3 className={styles.categoryTitle}>{category.title}</h3>
                            </div>
                            <div className={styles.itemsList}>
                                {category.items.map((item, index) => (
                                    <div key={index} className={styles.item}>
                                        <span className={styles.itemName}>{item.name}</span>
                                        <span className={styles.itemValue}>{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
