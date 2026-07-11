import Link from 'next/link';
import { Calendar, ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { notFound } from 'next/navigation';
import { getAllCaseStudies, getCaseStudyBySlug } from '@/lib/projects';
import Navbar from '@/components/Navbar';
import { CaseStudySchema, BreadcrumbSchema } from '@/components/StructuredData';
import { createMdxComponents } from '@/lib/mdx-components';
import styles from './project.module.css';
import type { Metadata } from 'next';
import { absoluteUrl, SITE_URL } from '@/lib/seo';

const mdxComponents = createMdxComponents(styles.contentImage);

export function generateStaticParams() {
    return getAllCaseStudies().map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const project = getCaseStudyBySlug(slug);

    if (!project) {
        return {
            title: 'Project Not Found',
            description: 'The requested project case study could not be found.',
        };
    }

    const projectUrl = absoluteUrl(`/projects/${slug}`);
    const title = `${project.title} | Case Study`;
    const description = project.excerpt || `Case study: ${project.title} by Udara Nalawansa.`;

    return {
        title,
        description,
        authors: [{ name: 'Udara Nalawansa', url: absoluteUrl('/') }],
        openGraph: {
            type: 'article',
            url: projectUrl,
            title,
            description,
            siteName: 'Udara Nalawansa Portfolio',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            creator: '@udaranalawansa',
        },
        alternates: {
            canonical: projectUrl,
        },
    };
}

export default async function ProjectCaseStudy({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = getCaseStudyBySlug(slug);

    if (!project) {
        notFound();
    }

    return (
        <>
            <BreadcrumbSchema items={[
                { name: 'Home', url: SITE_URL },
                { name: 'Projects', url: '/#projects' },
                { name: project.title, url: `/projects/${slug}` }
            ]} />
            <CaseStudySchema
                title={project.title}
                excerpt={project.excerpt}
                techStack={project.techStack}
                githubUrl={project.githubUrl}
                liveUrl={project.liveUrl}
                slug={slug}
            />
            <Navbar />
            <main className={styles.project}>
                <div className={styles.container}>
                    <Link href="/#projects" className={styles.backLink}>
                        <ArrowLeft size={18} />
                        Back to Projects
                    </Link>

                    <article>
                        <header className={styles.header}>
                            <h1 className={styles.title}>{project.title}</h1>
                            <div className={styles.meta}>
                                {project.date && (
                                    <div className={styles.metaItem}>
                                        <Calendar size={16} />
                                        <span>{new Date(project.date).toLocaleDateString()}</span>
                                    </div>
                                )}
                                {project.isOngoing && (
                                    <div className={styles.ongoingBadge}>
                                        <span className={styles.ongoingDot}></span>
                                        Ongoing
                                    </div>
                                )}
                            </div>
                            {project.techStack.length > 0 && (
                                <div className={styles.techStack}>
                                    {project.techStack.map((tech) => (
                                        <span key={tech} className={styles.techBadge}>
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            )}
                            <div className={styles.links}>
                                {project.githubUrl && (
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.linkButton}
                                    >
                                        <Github size={16} />
                                        <span>Source</span>
                                    </a>
                                )}
                                {project.liveUrl && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.linkButton}
                                    >
                                        <ExternalLink size={16} />
                                        <span>Live</span>
                                    </a>
                                )}
                            </div>
                        </header>

                        <div className={styles.content}>
                            <MDXRemote
                                source={project.content}
                                components={mdxComponents}
                                options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
                            />
                        </div>
                    </article>
                </div>
            </main>
        </>
    );
}
