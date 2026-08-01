// "What I read" is driven by Hacker News favorites, exposed as RSS by hnrss.org.
// Nothing here is secret: the username is public, and the favorites page is public.
export const HN_USERNAME = 'Udara_Kavishka';
export const HN_FAVORITES_URL = `https://news.ycombinator.com/favorites?id=${HN_USERNAME}`;
export const HN_FEED_URL = `https://hnrss.org/favorites?id=${HN_USERNAME}`;

const REVALIDATE_SECONDS = 21600; // 6 hours

export interface ReadingItem {
    title: string;
    // The article itself. HN "Ask HN"-style posts have no external link, so this
    // falls back to the discussion.
    url: string;
    // The Hacker News discussion thread.
    commentsUrl: string;
    date: string;
    source: string;
}

function tag(block: string, name: string): string {
    const match = block.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`));
    if (!match) return '';
    return match[1]
        .replace(/^<!\[CDATA\[/, '')
        .replace(/\]\]>$/, '')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, '&')
        .trim();
}

function hostOf(url: string): string {
    try {
        return new URL(url).hostname.replace(/^www\./, '');
    } catch {
        return 'news.ycombinator.com';
    }
}

function parseFeed(xml: string, limit: number): ReadingItem[] {
    return xml
        .split('<item>')
        .slice(1)
        .map((block) => {
            const title = tag(block, 'title');
            const link = tag(block, 'link');
            const comments = tag(block, 'comments') || link;
            const url = link || comments;
            if (!title || !url) return null;

            return {
                title,
                url,
                commentsUrl: comments,
                date: tag(block, 'pubDate'),
                source: hostOf(url),
            };
        })
        .filter((item): item is ReadingItem => item !== null)
        .slice(0, limit);
}

// Returns [] on any failure so the caller can hide the section instead of
// rendering an error.
export async function getReadingList(limit = 8): Promise<ReadingItem[]> {
    if (!HN_USERNAME) {
        return [];
    }

    try {
        const response = await fetch(HN_FEED_URL, {
            next: { revalidate: REVALIDATE_SECONDS },
        });
        if (!response.ok) {
            return [];
        }
        return parseFeed(await response.text(), limit);
    } catch {
        return [];
    }
}
