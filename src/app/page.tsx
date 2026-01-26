import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Education from '@/components/Education';
import Clubs from '@/components/Clubs';
import Setup from '@/components/Setup';
import Achievements from '@/components/Achievements';
import HomeBlog from '@/components/HomeBlog';
import { client } from '@/lib/sanity';

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
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Education />
        <Achievements />
        <Clubs />
        <HomeBlog posts={posts} />
        <Setup />
        <Contact />
      </main>
    </>
  );
}