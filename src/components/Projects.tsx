'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import styles from './Projects.module.css';
import { projectsData } from '@/data/content';

export default function Projects() {
    const handleViewMore = () => {
        window.open('https://github.com/udaraKavishka', '_blank');
    };

    return (
        <section id="projects" className={styles.projects}>
            <div className={styles.container}>
                <h2 className="section-title">Projects</h2>
                <div className={styles.grid}>
                    {projectsData.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className={styles.projectCard}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <div className={styles.badgeContainer}>
                                {project.isOngoing && (
                                    <div className={styles.ongoingBadge}>
                                        <span className={styles.ongoingDot}></span>
                                        Ongoing
                                    </div>
                                )}
                                {project.liveUrl && (
                                    <div className={styles.liveBadge}>
                                        <span className={styles.liveDot}></span>
                                        Live
                                    </div>
                                )}
                            </div>
                            <div className={styles.cardHeader}>
                                <h3 className={styles.projectTitle}>{project.title}</h3>
                                <div className={styles.links}>
                                    {project.githubUrl && (
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.iconLink}
                                            aria-label="GitHub"
                                        >
                                            <Github size={18} />
                                        </a>
                                    )}
                                    {project.liveUrl && (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.iconLink}
                                            aria-label="Live Demo"
                                        >
                                            <ExternalLink size={18} />
                                        </a>
                                    )}
                                </div>
                            </div>
                            <p className={styles.description}>{project.description}</p>
                            <div className={styles.techStack}>
                                {project.techStack.map((tech) => (
                                    <span key={tech} className={styles.techBadge}>
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div className={styles.viewMoreContainer}>
                    <button onClick={handleViewMore} className={styles.viewMoreButton}>
                        <span>View More Projects on GitHub</span>
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </section>
    );
}