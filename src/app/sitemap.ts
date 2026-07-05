import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity'
import { SITE_URL } from '@/lib/seo'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const posts = await client.fetch<Array<{ slug?: { current?: string }, publishedAt?: string, _updatedAt?: string }>>(
      `*[_type == "post"]{ 
        slug, 
        publishedAt,
        _updatedAt
      }`
    )
    
    // Static pages with priorities
    const staticPages: MetadataRoute.Sitemap = [
      {
        url: SITE_URL,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1.0,
      },
      {
        url: `${SITE_URL}/blog`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      },
    ]
    
    const blogPages: MetadataRoute.Sitemap = posts
      .filter((post) => post.slug?.current && post.publishedAt)
      .map((post) => ({
      url: `${SITE_URL}/blog/${post.slug?.current}`,
      lastModified: new Date(post._updatedAt || post.publishedAt as string),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
    
    return [...staticPages, ...blogPages]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    
    // Return at least static pages if blog fetch fails
    return [
      {
        url: SITE_URL,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1.0,
      },
      {
        url: `${SITE_URL}/blog`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      },
    ]
  }
}
