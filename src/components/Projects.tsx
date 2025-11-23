'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import styles from './Projects.module.css';

interface Project {
    id: number;
    title: string;
    description: string;
    techStack: string[];
    githubUrl?: string;
    liveUrl?: string;
}

const projects: Project[] = [
    {
        id: 1,
        title: 'Kubernetes Cluster Automation',
        description: 'Automated K8s cluster provisioning with Terraform and Ansible. Includes monitoring, logging, and auto-scaling configurations.',
        techStack: ['Kubernetes', 'Terraform', 'Ansible', 'Prometheus'],
        githubUrl: 'https://github.com',
        liveUrl: 'https://example.com',
    },
    {
        id: 2,
        title: 'CI/CD Pipeline Framework',
        description: 'Multi-stage Jenkins pipeline with automated testing, security scanning, and deployment to multiple environments.',
        techStack: ['Jenkins', 'Docker', 'SonarQube', 'AWS'],
        githubUrl: 'https://github.com',
    },
    {
        id: 3,
        title: 'Infrastructure as Code',
        description: 'Complete AWS infrastructure managed with Terraform modules. Includes VPC, ECS, RDS, and CloudFront configurations.',
        techStack: ['Terraform', 'AWS', 'CloudFormation', 'Python'],
        githubUrl: 'https://github.com',
        liveUrl: 'https://example.com',
    },
    {
        id: 4,
        title: 'Monitoring Dashboard',
        description: 'Custom Grafana dashboards for infrastructure monitoring with Prometheus metrics and alerting rules.',
        techStack: ['Grafana', 'Prometheus', 'AlertManager', 'Docker'],
        githubUrl: 'https://github.com',
    },
    {
        id: 5,
        title: 'Container Registry',
        description: 'Self-hosted Docker registry with automated image scanning, vulnerability detection, and cleanup policies.',
        techStack: ['Harbor', 'Docker', 'Trivy', 'Nginx'],
        githubUrl: 'https://github.com',
    },
    {
        id: 6,
        title: 'GitOps Deployment',
        description: 'ArgoCD-based GitOps workflow for declarative application deployment with automated sync and rollback capabilities.',
        techStack: ['ArgoCD', 'Kubernetes', 'Helm', 'Git'],
        githubUrl: 'https://github.com',
        liveUrl: 'https://example.com',
    },
];

export default function Projects() {
    return (
        <section id="projects" className={styles.projects}>
            <div className={styles.container}>
                <h2 className="section-title">Projects</h2>
                <div className={styles.grid}>
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className={styles.projectCard}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
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
            </div>
        </section>
    );
}
