'use client';

import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';
import { heroData } from '@/data/content';

export default function Hero() {
    const { name, tagline, bio, techStack, profileImage, socialLinks, roles } = heroData;
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentRole = roles[currentRoleIndex];
        const typingSpeed = isDeleting ? 50 : 100;
        const pauseTime = isDeleting ? 1000 : 2000;

        if (!isDeleting && displayedText === currentRole) {
            const timeout = setTimeout(() => setIsDeleting(true), pauseTime);
            return () => clearTimeout(timeout);
        }

        if (isDeleting && displayedText === '') {
            const timeout = setTimeout(() => {
                setIsDeleting(false);
                setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
            }, pauseTime);
            return () => clearTimeout(timeout);
        }

        const timeout = setTimeout(() => {
            setDisplayedText(
                isDeleting
                    ? currentRole.substring(0, displayedText.length - 1)
                    : currentRole.substring(0, displayedText.length + 1)
            );
        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [displayedText, isDeleting, currentRoleIndex, roles]);

    const handleViewResume = () => {
        window.open('/Udara_Nalawansa.pdf', '_blank');
    };

    return (
        <section id="about" className={styles.hero}>
            <div className={styles.container}>
                <motion.div
                    className={styles.content}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className={styles.terminal}>
                        <div className={styles.terminalHeader}>
                            <div className={styles.terminalButtons}>
                                <span className={styles.buttonRed}></span>
                                <span className={styles.buttonYellow}></span>
                                <span className={styles.buttonGreen}></span>
                            </div>
                            <span className={styles.terminalTitle}>about.sh</span>
                        </div>
                        <div className={styles.terminalBody}>
                            <div className={styles.terminalLine}>
                                <span className={styles.prompt}>$</span>
                                <span className={styles.command}>whoami</span>
                            </div>
                            <div className={styles.output}>
                                <h1 className={styles.name}>{name}</h1>
                                <div className={styles.roleContainer}>
                                    <span className={styles.prompt}>❯</span>
                                    <span className={styles.role}>
                                        {displayedText}
                                        <span className={styles.cursor}>|</span>
                                    </span>
                                </div>
                                <p className={styles.tagline}>
                                    {tagline}
                                </p>
                            </div>
                            <div className={styles.terminalLine}>
                                <span className={styles.prompt}>$</span>
                                <span className={styles.command}>cat bio.txt</span>
                            </div>
                            <div className={styles.output}>
                                <p className={styles.bio}>
                                    {bio}
                                </p>
                            </div>
                            <button 
                                onClick={handleViewResume}
                                className={styles.resumeButton}
                                aria-label="View Resume"
                            >
                                <FileText size={18} />
                                <span>View My Resume</span>
                            </button>
                        </div>
                    </div>

                    <div className={styles.sidebar}>
                        <motion.div
                            className={styles.profileCard}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            <div className={styles.profileImage}>
                                <Image
                                    src={profileImage}
                                    alt="Profile"
                                    fill
                                    sizes="150px"
                                    className={styles.profileImg}
                                />
                            </div>
                            <div className={styles.techStack}>
                                <h3 className={styles.techTitle}>Tech Stack</h3>
                                <div className={styles.techGrid}>
                                    {techStack.map((tech, index) => (
                                        <motion.div
                                            key={tech.name}
                                            className={styles.techItem}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 + index * 0.1 }}
                                        >
                                            <span className={styles.techIcon}>{tech.icon}</span>
                                            <span className={styles.techName}>{tech.name}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.social}>
                                {socialLinks.map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.socialLink}
                                    >
                                        <link.icon size={20} />
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}