import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Education from '@/components/Education';
import Clubs from '@/components/Clubs';
import Setup from '@/components/Setup';
import HomeBlog from '@/components/HomeBlog';
import { PersonSchema, WebsiteSchema, ProfilePageSchema, ProjectsSchema } from '@/components/StructuredData';
import { client } from '@/lib/sanity';
import { projectsData } from '@/data/content';
import { defaultDescription, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'DevOps Engineer in Sri Lanka',
  description: defaultDescription,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'Udara Nalawansa | DevOps Engineer in Sri Lanka',
    description: defaultDescription,
    url: SITE_URL,
    type: 'website',
    images: [
      {
        url: '/screenshot.png',
        width: 1200,
        height: 630,
        alt: 'Udara Nalawansa DevOps and cloud engineer portfolio',
      },
    ],
  },
};

async function getPosts() {
  try {
    const posts = await client.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        publishedAt,
        readTime,
        seoTitle,
        seoDescription,
        mainImage {
          asset->{
            url
          },
          alt
        },
        excerpt
      }
    `);
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <>
      <PersonSchema />
      <WebsiteSchema />
      <ProfilePageSchema projects={projectsData} posts={posts} />
      <ProjectsSchema projects={projectsData} />
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Education />
        <Clubs />
        <HomeBlog posts={posts} />
        <Setup />
        <Contact />
      </main>
    </>
  );
}
