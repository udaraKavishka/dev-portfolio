'use client';

import { motion } from 'framer-motion';
import { Laptop, Monitor, Smartphone, HardDrive, Code, Globe, Wrench } from 'lucide-react';
import styles from './Setup.module.css';

interface SetupItem {
    name: string;
    value: string;
}

interface SetupCategory {
    title: string;
    icon: any;
    items: SetupItem[];
}

const setupData: SetupCategory[] = [
    {
        title: 'Hardware',
        icon: Laptop,
        items: [
            { name: 'Laptop', value: 'Lenovo ThinkPad T480 (i5, 24GB RAM, 500GB SSD)' },
            { name: 'Monitor', value: 'ViewSonic VA2732-H 27" FHD IPS' },
            { name: 'Smartphone', value: 'Moto g51 5G (EvolutionX)' },
            { name: 'External HDD', value: 'Transcend StoreJet 25H3 1TB External HDD' },
        ],
    },
    {
        title: 'Software & Tools',
        icon: Code,
        items: [
            { name: 'Operating System', value: 'Manjaro 23 - Vulcan (XFCE)' },
            { name: 'Shell', value: 'fish' },
            { name: 'Prompt', value: 'Starship' },
            { name: 'IDE', value: 'Visual Studio Code' },
            { name: 'VS Code Theme', value: 'Andromeda' },
            { name: 'AI Pair Programmer', value: 'GitHub Copilot' },
            { name: 'Online IDE', value: 'CodeSandbox, StackBlitz' },
            { name: 'Git Hosting', value: 'GitHub, GitLab' },
            { name: 'Hosting', value: 'Vercel, Netlify' },
            { name: 'API Testing', value: 'Insomnia, Postman' },
            { name: 'CDN', value: 'Cloudflare' },
            { name: 'Prototyping', value: 'Figma' },
            { name: 'Illustrations', value: 'unDraw' },
        ],
    },
    {
        title: 'Services & Apps',
        icon: Globe,
        items: [
            { name: 'Music', value: 'Spotify, YouTube Music' },
            { name: 'Password Manager', value: 'Bitwarden' },
            { name: '2FA', value: 'Twilio Authy' },
            { name: 'Main Browser', value: 'Mozilla Firefox' },
            { name: 'Secondary Browser', value: 'Brave' },
            { name: 'Email Client', value: 'MailSpring' },
            { name: 'Ad Blocker', value: 'uBlock Origin' },
            { name: 'Messaging + Cloud Storage', value: 'Telegram' },
            { name: 'Media Server', value: 'Jellyfin' },
            { name: 'Movies & TV Shows Tracker', value: 'Trakt.tv, Simkl' },
            { name: 'Note Taking', value: 'Notion' },
        ],
    },
];

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
