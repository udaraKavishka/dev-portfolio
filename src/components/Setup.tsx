'use client';

import { motion, type Variants } from 'framer-motion';
import styles from './Setup.module.css';
import { setupData } from '@/data/content';

// Arch logo as neofetch prints it (Omarchy is Arch based).
const LOGO = String.raw`                   -${'`'}
                  .o+${'`'}
                 ${'`'}ooo/
                ${'`'}+oooo:
               ${'`'}+oooooo:
               -+oooooo+:
             ${'`'}/:-:++oooo+:
            ${'`'}/++++/+++++++:
           ${'`'}/++++++++++++++:
          ${'`'}/+++ooooooooooooo/${'`'}
         ./ooosssso++osssssso+${'`'}
        .oossssso-${'````'}/ossssss+${'`'}
       -osssssso.      :ssssssso.
      :osssssss/        osssso+++.
     /ossssssss/        +ssssooo/-
   ${'`'}/ossssso+/:-        -:/+osssso+-
  ${'`'}+sso+:-${'`'}                 ${'`'}.-/+oso:
 ${'`'}++:.                           ${'`'}-/+/
 .${'`'}                                 ${'`'}/`.split('\n');

const PALETTE = ['#3f3f46', '#f87171', '#4ade80', '#facc15', '#60a5fa', '#c084fc', '#22d3ee', '#e5e7eb'];

// Each block starts after the previous one has finished printing.
const group = (delay: number, stagger: number): Variants => ({
    hidden: {},
    show: { transition: { delayChildren: delay, staggerChildren: stagger } },
});

const typeChar: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0 } },
};

const printLine: Variants = {
    hidden: { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
    show: { opacity: 1, clipPath: 'inset(0 0% 0 0)', transition: { duration: 0.35, ease: 'easeOut' } },
};

const logoLine: Variants = {
    hidden: { opacity: 0, x: -6 },
    show: { opacity: 1, x: 0, transition: { duration: 0.25 } },
};

function Command({ text, delay }: { text: string; delay: number }) {
    return (
        <motion.p className={styles.command} variants={group(delay, 0.04)}>
            <span className={styles.prompt}>$</span>{' '}
            {Array.from(text).map((char, index) => (
                <motion.span key={index} variants={typeChar}>
                    {char}
                </motion.span>
            ))}
        </motion.p>
    );
}

export default function Setup() {
    const [hardware, tools, apps] = setupData;
    const specs = [...hardware.items, ...tools.items];
    const infoStart = 0.7;
    const appsCommandStart = infoStart + (specs.length + 3) * 0.06 + 0.4;
    const appsStart = appsCommandStart + 0.5;
    const promptStart = appsStart + apps.items.length * 0.06 + 0.4;

    return (
        <section id="setup" className={styles.setup}>
            <div className={styles.container}>
                <h2 className="section-title">My Setup</h2>
                <motion.div
                    className={styles.window}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-120px' }}
                >
                    <div className={styles.titleBar}>
                        <span className={styles.dots} aria-hidden="true">
                            <span />
                            <span />
                            <span />
                        </span>
                        <span className={styles.windowTitle}>udara@omarchy: ~</span>
                    </div>

                    <div className={styles.body}>
                        <Command text="neofetch" delay={0} />

                        <div className={styles.neofetch}>
                            <motion.pre className={styles.logo} aria-hidden="true" variants={group(0.5, 0.03)}>
                                {LOGO.map((line, index) => (
                                    <motion.span key={index} className={styles.logoLine} variants={logoLine}>
                                        {line}
                                    </motion.span>
                                ))}
                            </motion.pre>

                            <motion.dl className={styles.info} variants={group(infoStart, 0.06)}>
                                <motion.div className={styles.userHost} variants={printLine}>
                                    udara<span className={styles.at}>@</span>omarchy
                                </motion.div>
                                <motion.div className={styles.rule} variants={printLine} aria-hidden="true">
                                    -------------
                                </motion.div>
                                {specs.map((item) => (
                                    <motion.div key={item.name} className={styles.row} variants={printLine}>
                                        <dt className={styles.key}>{item.name}</dt>
                                        <dd className={styles.value}>{item.value}</dd>
                                    </motion.div>
                                ))}
                                <motion.div className={styles.palette} variants={printLine} aria-hidden="true">
                                    {PALETTE.map((color, index) => (
                                        <span
                                            key={color}
                                            style={{ backgroundColor: color, animationDelay: `${index * 0.12}s` }}
                                        />
                                    ))}
                                </motion.div>
                            </motion.dl>
                        </div>

                        <Command text="ls ~/apps --long" delay={appsCommandStart} />
                        <motion.dl className={styles.apps} variants={group(appsStart, 0.06)}>
                            {apps.items.map((item) => (
                                <motion.div key={item.name} className={styles.appRow} variants={printLine}>
                                    <dt className={styles.key}>{item.name}</dt>
                                    <dd className={styles.value}>
                                        <span className={styles.arrow} aria-hidden="true">→ </span>
                                        {item.value}
                                    </dd>
                                </motion.div>
                            ))}
                        </motion.dl>

                        <motion.p className={styles.command} variants={group(promptStart, 0)} aria-hidden="true">
                            <motion.span variants={typeChar}>
                                <span className={styles.prompt}>$</span> <span className={styles.cursor} />
                            </motion.span>
                        </motion.p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
