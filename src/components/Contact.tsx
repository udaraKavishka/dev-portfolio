'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { Check, CornerDownLeft, Loader2, RotateCcw, X, type LucideIcon } from 'lucide-react';
import styles from './Contact.module.css';
import { contactData } from '@/data/content';

const HEADLINE = ["LET'S BUILD", 'SOMETHING'];
const STEPS = ['validate input', 'build payload', 'deploy to inbox', 'deliver message'];
const FIELDS = [
    { name: 'name', label: 'Name', placeholder: '"your name"' },
    { name: 'email', label: 'Email', placeholder: '"you@example.com"' },
    { name: 'message', label: 'Message', placeholder: '"hi Udara, …"' },
] as const;

type FieldName = (typeof FIELDS)[number]['name'];
type Stage = 'idle' | 'running' | 'done' | 'failed';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Social button that drifts toward the pointer and springs back when it leaves.
function MagneticLink({ href, label, Icon }: { href: string; label: string; Icon: LucideIcon }) {
    const reduceMotion = useReducedMotion();
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 300, damping: 18, mass: 0.5 });
    const springY = useSpring(y, { stiffness: 300, damping: 18, mass: 0.5 });

    const handleMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
        if (reduceMotion || e.pointerType !== 'mouse') return;
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (rect.left + rect.width / 2)) * 0.35);
        y.set((e.clientY - (rect.top + rect.height / 2)) * 0.35);
    };

    const reset = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={styles.socialLink}
            style={{ x: springX, y: springY }}
            onPointerMove={handleMove}
            onPointerLeave={reset}
            whileTap={{ scale: 0.94 }}
        >
            <Icon size={20} aria-hidden="true" />
            <span>{label}</span>
        </motion.a>
    );
}

export default function Contact() {
    const reduceMotion = useReducedMotion();
    const [formData, setFormData] = useState<Record<FieldName, string>>({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
    const [stage, setStage] = useState<Stage>('idle');
    const [completed, setCompleted] = useState(0);

    const validateForm = () => {
        const newErrors: Partial<Record<FieldName, string>> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setStage('running');
        setCompleted(0);

        // The request runs while the pipeline animates; the last step waits for its result.
        const request = fetch('https://formspree.io/f/xdkaqqnv', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })
            .then((response) => response.ok)
            .catch((error) => {
                console.error('Error sending message:', error);
                return false;
            });

        for (let step = 1; step < STEPS.length; step++) {
            await wait(reduceMotion ? 0 : 550);
            setCompleted(step);
        }

        if (await request) {
            setCompleted(STEPS.length);
            setStage('done');
            setFormData({ name: '', email: '', message: '' });
        } else {
            setStage('failed');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.target.name as FieldName;
        setFormData((prev) => ({ ...prev, [name]: e.target.value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    // Ctrl/Cmd + Enter sends from anywhere in the form, like running the command.
    const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            e.currentTarget.requestSubmit();
        }
    };

    const { socialLinks } = contactData;
    const progress = completed / STEPS.length;

    return (
        <section id="contact" className={styles.contact}>
            <div className={styles.container}>
                <h2 className="section-title">Contact</h2>

                <motion.p
                    className={styles.headline}
                    aria-label="Let's build something"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ staggerChildren: 0.035 }}
                >
                    {HEADLINE.map((line, lineIndex) => (
                        <span key={line} className={styles.headlineLine} aria-hidden="true">
                            {Array.from(line).map((char, charIndex) => (
                                <motion.span
                                    key={charIndex}
                                    className={styles.char}
                                    variants={{
                                        hidden: { y: '110%', opacity: 0 },
                                        show: { y: 0, opacity: 1 },
                                    }}
                                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    {char === ' ' ? ' ' : char}
                                </motion.span>
                            ))}
                            {lineIndex === HEADLINE.length - 1 && <span className={styles.cursor} />}
                        </span>
                    ))}
                </motion.p>

                <div className={styles.layout}>
                    <motion.div
                        className={styles.terminal}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                    >
                        <div className={styles.titleBar}>
                            <span className={styles.dots} aria-hidden="true">
                                <span />
                                <span />
                                <span />
                            </span>
                            <span className={styles.windowTitle}>~/contact</span>
                        </div>

                        <AnimatePresence mode="wait" initial={false}>
                            {stage === 'idle' ? (
                                <motion.form
                                    key="form"
                                    noValidate
                                    onSubmit={handleSubmit}
                                    onKeyDown={handleKeyDown}
                                    className={styles.form}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <p className={styles.command}>
                                        <span className={styles.prompt} aria-hidden="true">$</span> send-message \
                                    </p>

                                    {FIELDS.map((field) => (
                                        <div key={field.name} className={styles.fieldWrap}>
                                            <div className={`${styles.field} ${errors[field.name] ? styles.fieldError : ''}`}>
                                                <label htmlFor={field.name} className={styles.flag}>
                                                    <span aria-hidden="true">--{field.name}</span>
                                                    <span className={styles.visuallyHidden}>{field.label}</span>
                                                </label>
                                                {field.name === 'message' ? (
                                                    <textarea
                                                        id={field.name}
                                                        name={field.name}
                                                        value={formData[field.name]}
                                                        onChange={handleChange}
                                                        className={styles.input}
                                                        placeholder={field.placeholder}
                                                        rows={4}
                                                        aria-invalid={Boolean(errors[field.name])}
                                                        aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
                                                    />
                                                ) : (
                                                    <input
                                                        type={field.name === 'email' ? 'email' : 'text'}
                                                        id={field.name}
                                                        name={field.name}
                                                        value={formData[field.name]}
                                                        onChange={handleChange}
                                                        className={styles.input}
                                                        placeholder={field.placeholder}
                                                        autoComplete={field.name}
                                                        aria-invalid={Boolean(errors[field.name])}
                                                        aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
                                                    />
                                                )}
                                            </div>
                                            {errors[field.name] && (
                                                <p id={`${field.name}-error`} className={styles.error} role="alert">
                                                    # error: {errors[field.name]}
                                                </p>
                                            )}
                                        </div>
                                    ))}

                                    <div className={styles.actions}>
                                        <button type="submit" className={styles.runButton}>
                                            run
                                            <CornerDownLeft size={16} aria-hidden="true" />
                                        </button>
                                        <span className={styles.hint}>or Ctrl / ⌘ + Enter</span>
                                    </div>
                                </motion.form>
                            ) : (
                                <motion.div
                                    key="pipeline"
                                    className={styles.pipeline}
                                    role="status"
                                    aria-live="polite"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <p className={styles.command}>
                                        <span className={styles.prompt} aria-hidden="true">$</span> send-message --run
                                    </p>
                                    <div className={styles.progress} aria-hidden="true">
                                        <motion.span
                                            className={`${styles.progressBar} ${stage === 'failed' ? styles.progressFailed : ''}`}
                                            animate={{ scaleX: stage === 'failed' ? 1 : progress }}
                                            transition={{ duration: 0.4, ease: 'easeOut' }}
                                        />
                                    </div>
                                    <ol className={styles.steps}>
                                        {STEPS.map((step, index) => {
                                            const isDone = index < completed;
                                            const isFailed = stage === 'failed' && index === completed;
                                            const isRunning = stage === 'running' && index === completed;
                                            return (
                                                <li
                                                    key={step}
                                                    className={`${styles.step} ${isDone ? styles.stepDone : ''} ${
                                                        isFailed ? styles.stepFailed : ''
                                                    } ${isRunning ? styles.stepRunning : ''}`}
                                                >
                                                    <span className={styles.stepIcon} aria-hidden="true">
                                                        {isDone ? (
                                                            <Check size={14} />
                                                        ) : isFailed ? (
                                                            <X size={14} />
                                                        ) : isRunning ? (
                                                            <Loader2 size={14} className={styles.spin} />
                                                        ) : (
                                                            <span className={styles.stepDot} />
                                                        )}
                                                    </span>
                                                    {step}
                                                </li>
                                            );
                                        })}
                                    </ol>

                                    {stage === 'done' && (
                                        <motion.div
                                            className={styles.result}
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            <p className={styles.success}>✓ message delivered. I&apos;ll get back to you soon.</p>
                                            <button type="button" className={styles.againButton} onClick={() => setStage('idle')}>
                                                send another
                                            </button>
                                        </motion.div>
                                    )}
                                    {stage === 'failed' && (
                                        <motion.div
                                            className={styles.result}
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            <p className={styles.failure}>
                                                ✗ delivery failed. Try again, or email hello@udaradev.me directly.
                                            </p>
                                            <button type="button" className={styles.againButton} onClick={() => setStage('idle')}>
                                                <RotateCcw size={14} aria-hidden="true" />
                                                retry
                                            </button>
                                        </motion.div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    <motion.div
                        className={styles.aside}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.5, delay: 0.25 }}
                    >
                        <p className={styles.asideText}>
                            I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part
                            of your vision. Send a message, or find me here:
                        </p>
                        <div className={styles.socialLinks}>
                            {socialLinks.map((social) => (
                                <MagneticLink key={social.label} href={social.href} label={social.label} Icon={social.icon} />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
