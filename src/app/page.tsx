import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Education from '@/components/Education';
import Clubs from '@/components/Clubs';
import Setup from '@/components/Setup';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Education />
        <Clubs />
        <Setup />
        <Contact />
      </main>
    </>
  );
}
