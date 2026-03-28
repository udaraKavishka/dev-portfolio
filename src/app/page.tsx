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

export const metadata: Metadata = {
  title: 'Udara Nalawansa | DevOps & Cloud Engineer Portfolio',
  description: 'Portfolio of Udara Nalawansa — final year IT student at University of Jaffna specializing in DevOps, cloud infrastructure, Kubernetes, CI/CD automation, and MLOps.',
  alternates: {
    canonical: 'https://udaradev.me',
  },
  openGraph: {
    title: 'Udara Nalawansa | DevOps & Cloud Engineer Portfolio',
    description: 'DevOps Engineer portfolio showcasing cloud infrastructure projects, CI/CD pipelines, Kubernetes deployments, and technical blog posts.',
    url: 'https://udaradev.me',
    type: 'website',
    images: [
      {
        url: '/screenshot.png',
        width: 1200,
        height: 630,
        alt: 'Udara Nalawansa — DevOps & Cloud Engineer Portfolio',
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
      <ProfilePageSchema />
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