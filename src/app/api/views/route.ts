import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const VIEWS_KEY = 'site:views';

function getRedisConfig() {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return { url: url.replace(/\/$/, ''), token };
}

async function redis(command: string): Promise<number | null> {
  const config = getRedisConfig();
  if (!config) return null;

  try {
    const response = await fetch(`${config.url}/${command}/${VIEWS_KEY}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${config.token}` },
      cache: 'no-store',
    });
    if (!response.ok) return null;
    const data = await response.json();
    const value = Number(data.result);
    return Number.isFinite(value) ? value : 0;
  } catch {
    return null;
  }
}

// Read the current count without incrementing.
export async function GET() {
  const views = await redis('get');
  return NextResponse.json({ views }, { headers: { 'Cache-Control': 'no-store' } });
}

// Count a page view and return the new total.
export async function POST() {
  const views = await redis('incr');
  return NextResponse.json({ views }, { headers: { 'Cache-Control': 'no-store' } });
}
