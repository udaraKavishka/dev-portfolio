import { NextResponse } from 'next/server';
import { getSearchIndex } from '@/lib/posts';

export const dynamic = 'force-static';

// Full-text search bodies for the blog index, fetched only once someone starts searching,
// so the /blog page itself doesn't carry the text of every post.
export function GET() {
    return NextResponse.json(getSearchIndex());
}
