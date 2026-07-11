import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'
import { getAllCaseStudies } from '@/lib/projects'
import { SITE_URL } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
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

  const blogPages: MetadataRoute.Sitemap = getAllPosts()
    .filter((post) => post.date)
    .map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updated || post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

  const projectPages: MetadataRoute.Sitemap = getAllCaseStudies()
    .filter((project) => project.date)
    .map((project) => ({
      url: `${SITE_URL}/projects/${project.slug}`,
      lastModified: new Date(project.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

  return [...staticPages, ...blogPages, ...projectPages]
}
