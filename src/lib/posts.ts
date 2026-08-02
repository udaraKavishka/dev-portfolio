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
    pinned?: boolean;
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

export interface SearchEntry {
    slug: string;
    body: string;
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
        pinned: data.pinned === true,
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

// Strip MDX/markdown syntax down to readable prose. Shared by the search index
// and the feed excerpt fallback.
function toPlainText(content: string): string {
    return content
        .replace(/```[\s\S]*?```/g, ' ')
        .replace(/`[^`]*`/g, ' ')
        .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
        .replace(/[#>*_~|-]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

// Posts without an `excerpt` in frontmatter still need a description in the RSS
// feed, so fall back to the opening of the body.
export function excerptFor(post: { excerpt?: string }, content: string, maxLength = 180): string {
    if (post.excerpt) {
        return post.excerpt;
    }

    const plain = toPlainText(content);
    if (plain.length <= maxLength) {
        return plain;
    }

    const cut = plain.slice(0, maxLength);
    const lastSpace = cut.lastIndexOf(' ');
    return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
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
        .sort((a, b) => {
            const dateDiff = new Date(b.date).getTime() - new Date(a.date).getTime();
            if (dateDiff !== 0) return dateDiff;
            return a.title.localeCompare(b.title);
        });
}

export function getSearchIndex(): SearchEntry[] {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    return fs
        .readdirSync(postsDirectory)
        .filter((fileName) => /\.mdx?$/.test(fileName))
        .map((fileName) => {
            const { slug, content } = parsePost(fileName);
            return { slug, body: toPlainText(content).toLowerCase() };
        });
}

export interface FeedPost extends Post {
    description: string;
}

// Every post, newest first, with a guaranteed description for the RSS feed.
export function getFeedPosts(): FeedPost[] {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    return fs
        .readdirSync(postsDirectory)
        .filter((fileName) => /\.mdx?$/.test(fileName))
        .map((fileName) => {
            const { content, ...post } = parsePost(fileName);
            return { ...post, description: excerptFor(post, content) };
        })
        .filter((post) => post.date)
        .sort((a, b) => {
            const dateDiff = new Date(b.date).getTime() - new Date(a.date).getTime();
            if (dateDiff !== 0) return dateDiff;
            return a.title.localeCompare(b.title);
        });
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

export function getRelatedPosts(slug: string, limit = 3): Post[] {
    const allPosts = getAllPosts();
    const currentPost = allPosts.find((post) => post.slug === slug);

    if (!currentPost) {
        return [];
    }

    const currentTags = new Set(currentPost.tags ?? []);

    const scored = allPosts
        .filter((post) => post.slug !== slug)
        .map((post) => {
            const sharedTags = (post.tags ?? []).filter((tag) => currentTags.has(tag)).length;
            const sameCategory = post.category && post.category === currentPost.category ? 1 : 0;
            return { post, score: sharedTags * 2 + sameCategory };
        })
        .filter(({ score }) => score > 0)
        .sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
        })
        .map(({ post }) => post);

    if (scored.length >= limit) {
        return scored.slice(0, limit);
    }

    const fallback = allPosts.filter(
        (post) => post.slug !== slug && !scored.some((related) => related.slug === post.slug)
    );

    return [...scored, ...fallback].slice(0, limit);
}
