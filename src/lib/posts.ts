import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import type { PortableTextBlock } from '@portabletext/types';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface SanityPost {
    _id: string;
    title: string;
    slug: {
        current: string;
    };
    publishedAt: string;
    readTime?: string;
    mainImage?: {
        asset: {
            url: string;
        };
        alt?: string;
    };
    body?: PortableTextBlock[];
    excerpt?: string;
    tags?: string[];
}

export interface PostData extends Record<string, unknown> {
    id: string;
    date: string;
    title: string;
    excerpt?: string;
    tags?: string[];
    contentHtml?: string;
    mainImage?: string; // For compatibility
    readTime?: string; // For compatibility
}

export function getSortedPostsData(): PostData[] {
    // Create posts directory if it doesn't exist
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        const fullPath = path.join(postsDirectory, fileName);
        const stat = fs.statSync(fullPath);
        let fileContents = '';
        let id = '';

        if (stat.isDirectory()) {
            // Check for README.md in the directory
            const readmePath = path.join(fullPath, 'README.md');
            if (fs.existsSync(readmePath)) {
                fileContents = fs.readFileSync(readmePath, 'utf8');
                id = fileName;
            } else {
                return null; // Skip directories without README.md
            }
        } else if (fileName.endsWith('.md')) {
            // Handle legacy .md files directly in posts/
            fileContents = fs.readFileSync(fullPath, 'utf8');
            id = fileName.replace(/\.md$/, '');
        } else {
            return null; // Skip non-md files
        }

        const matterResult = matter(fileContents);

        return {
            id,
            ...matterResult.data,
        } as PostData;
    });

    // Filter out nulls
    const validPosts = allPostsData.filter((post): post is PostData => post !== null);

    return validPosts.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export async function getPostData(id: string): Promise<PostData> {
    let fullPath = path.join(postsDirectory, `${id}.md`);

    // Check if it's a directory-based post first (preferred) or if the .md file doesn't exist
    const dirPath = path.join(postsDirectory, id);
    if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
        const readmePath = path.join(dirPath, 'README.md');
        if (fs.existsSync(readmePath)) {
            fullPath = readmePath;
        }
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
        id,
        contentHtml,
        ...matterResult.data,
    } as PostData;
}
