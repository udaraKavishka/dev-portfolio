'use client';

import { motion } from 'framer-motion';
import { Linkedin, ArrowRight, Crown, Newspaper, Trophy, Flag, Users, UsersRound, type LucideIcon } from 'lucide-react';
import styles from './Clubs.module.css';
import { clubsData } from '@/data/content';

// Leadership roles get a card each, ordered by weight; every other role is listed as a membership.
const LEADERSHIP_ORDER: { match: string; icon: LucideIcon }[] = [
    { match: 'President', icon: Crown },
    { match: 'Chief Editor', icon: Newspaper },
    { match: 'Colours', icon: Trophy },
    { match: 'Representative', icon: Flag },
    { match: 'Committee', icon: UsersRound },
    { match: 'Board', icon: Users },
];

// A role can name two ranks ("Committee Member, … Representative"); the first one in the order wins.
const rankOf = (role: string) => LEADERSHIP_ORDER.findIndex(({ match }) => role.includes(match));
const leadership = clubsData
    .filter((club) => rankOf(club.role) >= 0)
    .sort((a, b) => rankOf(a.role) - rankOf(b.role))
    .map((club) => ({ ...club, icon: LEADERSHIP_ORDER[rankOf(club.role)].icon }));
const memberships = clubsData.filter((club) => !leadership.some((lead) => lead.name === club.name));
const membershipGroups = (['University', 'School'] as const)
    .map((scope) => ({ scope, clubs: memberships.filter((club) => club.scope === scope) }))
    .filter((group) => group.clubs.length > 0);

export default function Clubs() {
    const handleViewExperience = () => {
        window.open('https://www.linkedin.com/in/udaranalawansa/', '_blank');
    };

    return (
        <section id="clubs" className={styles.clubs}>
            <div className={styles.container}>
                <h2 className="section-title">Clubs & Societies</h2>

                <p className={styles.groupLabel}>leadership</p>
                <div className={styles.leadGrid}>
                    {leadership.map((club, index) => {
                        const Icon = club.icon;
                        return (
                            <motion.article
                                key={club.name}
                                className={styles.leadCard}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ delay: index * 0.07, duration: 0.45 }}
                            >
                                <div className={styles.leadTop}>
                                    <span className={styles.leadIcon}>
                                        <Icon size={18} aria-hidden="true" />
                                    </span>
                                    <span className={styles.scope}>{club.scope}</span>
                                </div>
                                <p className={styles.role}>{club.role}</p>
                                <h3 className={styles.org}>{club.name}</h3>
                                {club.description && <p className={styles.description}>{club.description}</p>}
                            </motion.article>
                        );
                    })}
                </div>

                <p className={styles.groupLabel}>member of</p>
                <div className={styles.memberGroups}>
                    {membershipGroups.map((group) => (
                        <div key={group.scope} className={styles.memberGroup}>
                            <span className={styles.memberScope}>{group.scope}</span>
                            <ul className={styles.memberList}>
                                {group.clubs.map((club, index) => (
                                    <motion.li
                                        key={club.name}
                                        className={styles.memberChip}
                                        title={club.description}
                                        initial={{ opacity: 0, scale: 0.94 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05, duration: 0.3 }}
                                    >
                                        {club.name}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className={styles.viewMoreContainer}>
                    <button onClick={handleViewExperience} className={styles.linkedinButton}>
                        <Linkedin size={18} />
                        <span>View My Experience on LinkedIn</span>
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </section>
    );
}
