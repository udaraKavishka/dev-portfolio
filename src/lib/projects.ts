import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const projectsDirectory = path.join(process.cwd(), 'projects');

export interface CaseStudy {
    slug: string;
    title: string;
    date: string;
    excerpt?: string;
    techStack: string[];
    githubUrl?: string;
    liveUrl?: string;
    isOngoing?: boolean;
}

export interface CaseStudyWithContent extends CaseStudy {
    content: string;
}

function parseCaseStudy(fileName: string): CaseStudyWithContent {
    const slug = fileName.replace(/\.mdx?$/, '');
    const fullPath = path.join(projectsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? '',
        excerpt: data.excerpt,
        techStack: data.techStack ?? [],
        githubUrl: data.githubUrl,
        liveUrl: data.liveUrl,
        isOngoing: data.isOngoing === true,
        content,
    };
}

export function getAllCaseStudies(): CaseStudy[] {
    if (!fs.existsSync(projectsDirectory)) {
        return [];
    }

    return fs
        .readdirSync(projectsDirectory)
        .filter((fileName) => /\.mdx?$/.test(fileName))
        .map((fileName) => {
            const { content, ...project } = parseCaseStudy(fileName);
            void content;
            return project;
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getCaseStudySlugs(): string[] {
    return getAllCaseStudies().map((project) => project.slug);
}

export function getCaseStudyBySlug(slug: string): CaseStudyWithContent | null {
    for (const ext of ['.mdx', '.md']) {
        const fileName = `${slug}${ext}`;
        if (fs.existsSync(path.join(projectsDirectory, fileName))) {
            return parseCaseStudy(fileName);
        }
    }
    return null;
}
