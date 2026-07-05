import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

const disallowedPaths = ['/api/', '/_next/', '/portfolio-studio/'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: disallowedPaths,
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'anthropic-ai', 'Claude-Web', 'Google-Extended', 'CCBot', 'cohere-ai', 'FacebookBot', 'PerplexityBot', 'Bingbot', 'Applebot', 'Diffbot'],
        allow: '/',
        disallow: disallowedPaths,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
