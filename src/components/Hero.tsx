'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, FileText, MapPin } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';
import { heroData } from '@/data/content';
import ViewCounter from './ViewCounter';

const [firstName, ...restOfName] = heroData.name.split(' ');
const lastName = restOfName.join(' ');

// Staggered entrance for each hero row.
const rise = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
});

export default function Hero() {
    const { tagline, bio, techStack, profileImage, socialLinks, roles } = heroData;
    const reduceMotion = useReducedMotion();
    const heroRef = useRef<HTMLElement>(null);
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (reduceMotion) return;
        const currentRole = roles[currentRoleIndex];
        const typingSpeed = isDeleting ? 50 : 100;
        const pauseTime = isDeleting ? 1000 : 2000;

        if (!isDeleting && displayedText === currentRole) {
            const timeout = setTimeout(() => setIsDeleting(true), pauseTime);
            return () => clearTimeout(timeout);
        }

        if (isDeleting && displayedText === '') {
            const timeout = setTimeout(() => {
                setIsDeleting(false);
                setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
            }, pauseTime);
            return () => clearTimeout(timeout);
        }

        const timeout = setTimeout(() => {
            setDisplayedText(
                isDeleting
                    ? currentRole.substring(0, displayedText.length - 1)
                    : currentRole.substring(0, displayedText.length + 1)
            );
        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [displayedText, isDeleting, currentRoleIndex, roles, reduceMotion]);

    // The backdrop glow follows the pointer; written straight to CSS variables so it never re-renders.
    const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
        const hero = heroRef.current;
        if (!hero || e.pointerType !== 'mouse') return;
        const rect = hero.getBoundingClientRect();
        hero.style.setProperty('--glow-x', `${e.clientX - rect.left}px`);
        hero.style.setProperty('--glow-y', `${e.clientY - rect.top}px`);
    };

    const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const contact = document.getElementById('contact');
        if (!contact) return;
        e.preventDefault();
        contact.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    };

    return (
        <section id="about" ref={heroRef} className={styles.hero} onPointerMove={handlePointerMove}>
            <div className={styles.backdrop} aria-hidden="true" />
            <div className={styles.container}>
                <div className={styles.layout}>
                    <div className={styles.main}>
                        <motion.h1 className={styles.name} {...rise(0)}>
                            <span className={styles.firstName}>{firstName}</span>
                            <span className={styles.lastName}>
                                {lastName}
                                <span className={styles.blockCursor} aria-hidden="true" />
                            </span>
                        </motion.h1>

                        <motion.p className={styles.roleLine} {...rise(0.08)}>
                            <span className={styles.prompt} aria-hidden="true">❯</span>
                            <span className={styles.role} aria-hidden="true">
                                {reduceMotion ? roles[0] : displayedText}
                                <span className={styles.caret} />
                            </span>
                            <span className={styles.visuallyHidden}>{roles.join(', ')}</span>
                        </motion.p>

                        <motion.div className={styles.copy} {...rise(0.16)}>
                            <p className={styles.tagline}>{tagline}</p>
                            <p className={styles.bio}>{bio}</p>
                        </motion.div>

                        <motion.div className={styles.actions} {...rise(0.24)}>
                            <a
                                href="/Udara_Nalawansa.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.primaryCta}
                            >
                                <FileText size={18} aria-hidden="true" />
                                View resume
                            </a>
                            <a href="#contact" className={styles.secondaryCta} onClick={handleContactClick}>
                                Contact
                                <ArrowRight size={18} aria-hidden="true" />
                            </a>
                            <div className={styles.social}>
                                {socialLinks.map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.socialLink}
                                        aria-label={link.label}
                                    >
                                        <link.icon size={18} />
                                    </a>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div className={styles.stack} {...rise(0.32)}>
                            <span className={styles.stackLabel}>stack</span>
                            <ul className={styles.stackList}>
                                {techStack.map((tech) => (
                                    <li key={tech.name} className={styles.stackItem}>
                                        <span
                                            className={styles.stackIcon}
                                            style={{ '--icon': `url(/icons/tech/${tech.icon}.svg)` } as React.CSSProperties}
                                            aria-hidden="true"
                                        />
                                        {tech.name}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                    <motion.figure className={styles.portrait} {...rise(0.12)}>
                        <div className={styles.photoFrame}>
                            <div className={styles.photoWrap}>
                                <Image
                                    src={profileImage}
                                    alt="Udara Nalawansa, DevOps engineer and full stack developer"
                                    fill
                                    loading="eager"
                                    priority
                                    sizes="(min-width: 1024px) 360px, 420px"
                                    className={styles.photo}
                                />
                            </div>
                            <span className={styles.corners} aria-hidden="true" />
                        </div>
                        <figcaption className={styles.caption}>
                            <span className={styles.fileName}>~/udara.jpg</span>
                            <span className={styles.location}>
                                <MapPin size={13} aria-hidden="true" />
                                Colombo, LK
                            </span>
                            <ViewCounter />
                        </figcaption>
                    </motion.figure>
                </div>
            </div>
        </section>
    );
}
