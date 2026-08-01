import { getFeedPosts } from '@/lib/posts';
import { absoluteUrl, defaultDescription, PERSON_NAME, SITE_URL } from '@/lib/seo';

export const dynamic = 'force-static';

const FEED_TITLE = `${PERSON_NAME} — Blog`;

function escapeXml(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

function toRfc822(date: string): string {
    const parsed = new Date(date);
    return Number.isNaN(parsed.getTime()) ? '' : parsed.toUTCString();
}

export function GET() {
    const posts = getFeedPosts();

    const items = posts
        .map((post) => {
            const url = absoluteUrl(`/blog/${post.slug}`);
            const pubDate = toRfc822(post.updated ?? post.date);

            return [
                '    <item>',
                `      <title>${escapeXml(post.title)}</title>`,
                `      <link>${url}</link>`,
                `      <guid isPermaLink="true">${url}</guid>`,
                pubDate ? `      <pubDate>${pubDate}</pubDate>` : '',
                post.category ? `      <category>${escapeXml(post.category)}</category>` : '',
                `      <description>${escapeXml(post.description)}</description>`,
                '    </item>',
            ]
                .filter(Boolean)
                .join('\n');
        })
        .join('\n');

    const lastBuildDate = posts[0] ? toRfc822(posts[0].updated ?? posts[0].date) : '';

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(FEED_TITLE)}</title>
    <link>${absoluteUrl('/blog')}</link>
    <description>${escapeXml(defaultDescription)}</description>
    <language>en</language>
    <managingEditor>hello@udaradev.me (${escapeXml(PERSON_NAME)})</managingEditor>
${lastBuildDate ? `    <lastBuildDate>${lastBuildDate}</lastBuildDate>` : ''}
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/rss+xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    });
}
