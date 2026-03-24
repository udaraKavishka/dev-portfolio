import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://udaradev.me'
  
  try {
    // Fetch blog posts from Sanity
    const posts = await client.fetch<Array<{ slug: { current: string }, publishedAt: string }>>(
      `*[_type == "post"]{ 
        slug, 
        publishedAt,
        _updatedAt
      }`
    )
    
    // Static pages with priorities
    const staticPages: MetadataRoute.Sitemap = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1.0,
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      },
    ]
    
    // Dynamic blog post pages
    const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug.current}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
    
    return [...staticPages, ...blogPages]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    
    // Return at least static pages if blog fetch fails
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1.0,
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      },
    ]
  }
}
