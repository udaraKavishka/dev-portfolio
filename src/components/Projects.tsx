'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowRight, FileText } from 'lucide-react';
import styles from './Projects.module.css';
import { projectsData } from '@/data/content';

// Tech names that have a logo in public/icons/tech/, shown on the large and wide tile covers.
const TECH_LOGOS: Record<string, string> = {
    Python: 'python',
    FastAPI: 'fastapi',
    Streamlit: 'streamlit',
    'WhatsApp Cloud API': 'whatsapp',
    'Meta Webhooks': 'meta',
    Kubernetes: 'kubernetes',
    Ollama: 'ollama',
    Flask: 'flask',
    PostgreSQL: 'postgresql',
    Docker: 'docker',
    'Node.js': 'nodedotjs',
    'Express.js': 'express',
    MongoDB: 'mongodb',
    'Next.js': 'nextdotjs',
    React: 'react',
    TypeScript: 'typescript',
};

export default function Projects() {
    const handleViewMore = () => {
        window.open('https://github.com/udaraKavishka', '_blank');
    };

    return (
        <section id="projects" className={styles.projects}>
            <div className={styles.container}>
                <h2 className="section-title">Featured Projects</h2>
                <div className={styles.grid}>
                    {projectsData.map((project, index) => {
                        const tile = project.tile ?? 'small';
                        const Icon = project.icon;
                        const logos = project.techStack.filter((tech) => TECH_LOGOS[tech]).slice(0, 3);
                        const chipLimit = tile === 'small' ? 4 : 6;
                        const hiddenChips = project.techStack.length - chipLimit;
                        const href = project.caseStudySlug
                            ? `/projects/${project.caseStudySlug}`
                            : project.liveUrl ?? project.githubUrl;

                        return (
                            <motion.article
                                key={project.id}
                                className={`${styles.tile} ${styles[tile]}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ delay: (index % 4) * 0.06, duration: 0.45 }}
                            >
                                {tile !== 'small' && (
                                    <div className={styles.cover} aria-hidden="true">
                                        <span className={styles.coverIcon}>
                                            <Icon strokeWidth={1.5} />
                                        </span>
                                        {logos.length > 0 && (
                                            <span className={styles.coverLogos}>
                                                {logos.map((tech) => (
                                                    <span key={tech} className={styles.coverLogo}>
                                                        <span
                                                            className={styles.coverLogoMark}
                                                            style={{ '--logo': `url(/icons/tech/${TECH_LOGOS[tech]}.svg)` } as React.CSSProperties}
                                                        />
                                                    </span>
                                                ))}
                                            </span>
                                        )}
                                    </div>
                                )}
                                <div className={styles.body}>
                                    <div className={styles.tileTop}>
                                        <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
                                        {tile === 'small' && <Icon size={16} className={styles.smallIcon} aria-hidden="true" />}
                                        {project.isOngoing && (
                                            <span className={styles.ongoingBadge}>
                                                <span className={styles.ongoingDot}></span>
                                                Ongoing
                                            </span>
                                        )}
                                        {project.liveUrl && (
                                            <span className={styles.liveBadge}>
                                                <span className={styles.liveDot}></span>
                                                Live
                                            </span>
                                        )}
                                        <div className={styles.links}>
                                            {project.caseStudySlug && (
                                                <Link
                                                    href={`/projects/${project.caseStudySlug}`}
                                                    className={styles.iconLink}
                                                    aria-label={`${project.title} case study`}
                                                >
                                                    <FileText size={16} />
                                                </Link>
                                            )}
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={styles.iconLink}
                                                aria-label={`${project.title} on GitHub`}
                                            >
                                                <Github size={16} />
                                            </a>
                                            {project.liveUrl && (
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={styles.iconLink}
                                                    aria-label={`${project.title} live site`}
                                                >
                                                    <ExternalLink size={16} />
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    <h3 className={styles.title}>
                                        {project.caseStudySlug ? (
                                            <Link href={href} className={styles.titleLink}>
                                                {project.title}
                                            </Link>
                                        ) : (
                                            <a href={href} target="_blank" rel="noopener noreferrer" className={styles.titleLink}>
                                                {project.title}
                                            </a>
                                        )}
                                    </h3>
                                    {project.subtitle && <p className={styles.subtitle}>{project.subtitle}</p>}
                                    <p className={styles.description}>{project.description}</p>

                                    <ul className={styles.techStack}>
                                        {project.techStack.slice(0, chipLimit).map((tech) => (
                                            <li key={tech} className={styles.techBadge}>
                                                {tech}
                                            </li>
                                        ))}
                                        {hiddenChips > 0 && (
                                            <li className={`${styles.techBadge} ${styles.moreBadge}`}>+{hiddenChips}</li>
                                        )}
                                    </ul>
                                </div>
                            </motion.article>
                        );
                    })}
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
