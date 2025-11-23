'use client';

import { motion } from 'framer-motion';
import { Terminal, Github, Linkedin, Mail } from 'lucide-react';
import styles from './Hero.module.css';

export default function Hero() {
    const techStack = [
        { name: 'Docker', icon: '🐳' },
        { name: 'Kubernetes', icon: '☸️' },
        { name: 'AWS', icon: '☁️' },
        { name: 'Terraform', icon: '🏗️' },
        { name: 'Jenkins', icon: '🔧' },
        { name: 'Linux', icon: '🐧' },
    ];

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
                                <h1 className={styles.name}>DevOps Engineer</h1>
                                <p className={styles.tagline}>
                                    Building scalable infrastructure and automating the impossible
                                </p>
                            </div>
                            <div className={styles.terminalLine}>
                                <span className={styles.prompt}>$</span>
                                <span className={styles.command}>cat bio.txt</span>
                            </div>
                            <div className={styles.output}>
                                <p className={styles.bio}>
                                    Passionate about cloud infrastructure, automation, and continuous delivery.
                                    I specialize in designing and implementing robust CI/CD pipelines,
                                    containerized applications, and infrastructure as code solutions.
                                </p>
                            </div>
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
                                {/* Replace with your actual image */}
                                <img
                                    src="https://via.placeholder.com/150"
                                    alt="Profile"
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
                                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                    <Github size={20} />
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                    <Linkedin size={20} />
                                </a>
                                <a href="mailto:contact@example.com" className={styles.socialLink}>
                                    <Mail size={20} />
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
