import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface Post {
    slug: string;
    title: string;
    date: string;
    updated?: string;
    category?: string;
    excerpt?: string;
    tags?: string[];
    readTime?: string;
    mainImage?: string;
    mainImageAlt?: string;
    seoTitle?: string;
    seoDescription?: string;
}

export interface PostWithContent extends Post {
    content: string;
}

function parsePost(fileName: string): PostWithContent {
    const slug = fileName.replace(/\.mdx?$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? '',
        updated: data.updated,
        category: data.category,
        excerpt: data.excerpt,
        tags: data.tags,
        readTime: data.readTime,
        mainImage: data.mainImage,
        mainImageAlt: data.mainImageAlt,
        seoTitle: data.seoTitle,
        seoDescription: data.seoDescription,
        content,
    };
}

export function getAllPosts(): Post[] {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    return fs
        .readdirSync(postsDirectory)
        .filter((fileName) => /\.mdx?$/.test(fileName))
        .map((fileName) => {
            const { content, ...post } = parsePost(fileName);
            void content;
            return post;
        })
        .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostSlugs(): string[] {
    return getAllPosts().map((post) => post.slug);
}

export function getPostBySlug(slug: string): PostWithContent | null {
    for (const ext of ['.mdx', '.md']) {
        const fileName = `${slug}${ext}`;
        if (fs.existsSync(path.join(postsDirectory, fileName))) {
            return parsePost(fileName);
        }
    }
    return null;
}
