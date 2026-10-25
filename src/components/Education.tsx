'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import { GraduationCap, Calendar, ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import styles from './Education.module.css';
import { educationData } from '@/data/content';

const INLINE_MEDIA_COUNT = 3;
const SWIPE_THRESHOLD = 60;

const slideVariants = {
    enter: (direction: number) => ({ x: direction >= 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction >= 0 ? -80 : 80, opacity: 0 }),
};

interface ViewerState {
    eduIndex: number;
    mediaIndex: number;
}

export default function Education() {
    const [listFor, setListFor] = useState<number | null>(null);
    const [viewer, setViewer] = useState<ViewerState | null>(null);
    const [direction, setDirection] = useState(0);
    const listRef = useRef<HTMLDivElement>(null);
    const viewerRef = useRef<HTMLDivElement>(null);

    const listMedia = listFor !== null ? educationData[listFor].media ?? [] : [];
    const viewerMedia = viewer ? educationData[viewer.eduIndex].media ?? [] : [];
    const current = viewer ? viewerMedia[viewer.mediaIndex] : undefined;
    const adjacent = viewer && viewerMedia.length > 1
        ? [
            viewerMedia[(viewer.mediaIndex + 1) % viewerMedia.length],
            viewerMedia[(viewer.mediaIndex - 1 + viewerMedia.length) % viewerMedia.length],
        ]
        : [];
    const isListOpen = listFor !== null;
    const isViewerOpen = viewer !== null;
    const isOverlayOpen = isListOpen || isViewerOpen;

    const openViewer = (eduIndex: number, mediaIndex: number) => {
        setDirection(0);
        setViewer({ eduIndex, mediaIndex });
    };

    const step = useCallback((delta: number) => {
        setDirection(delta);
        setViewer((v) => {
            if (!v) return v;
            const total = educationData[v.eduIndex].media?.length ?? 0;
            return { ...v, mediaIndex: (v.mediaIndex + delta + total) % total };
        });
    }, []);

    const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (info.offset.x < -SWIPE_THRESHOLD) step(1);
        else if (info.offset.x > SWIPE_THRESHOLD) step(-1);
    };

    useEffect(() => {
        if (!isOverlayOpen) return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [isOverlayOpen]);

    // Move focus into each overlay when it opens and hand it back to the
    // button that opened it when it closes.
    useEffect(() => {
        if (!isListOpen) return;
        const opener = document.activeElement as HTMLElement | null;
        listRef.current?.querySelector<HTMLElement>('button')?.focus();
        return () => opener?.focus();
    }, [isListOpen]);

    useEffect(() => {
        if (!isViewerOpen) return;
        const opener = document.activeElement as HTMLElement | null;
        viewerRef.current?.querySelector<HTMLElement>('button')?.focus();
        return () => opener?.focus();
    }, [isViewerOpen]);

    useEffect(() => {
        if (!isOverlayOpen) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Tab') {
                const root = viewer ? viewerRef.current : listRef.current;
                const focusable = root ? Array.from(root.querySelectorAll<HTMLElement>('button')) : [];
                if (!root || focusable.length === 0) return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (!root.contains(document.activeElement)) {
                    e.preventDefault();
                    first.focus();
                } else if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
                return;
            }
            if (viewer) {
                if (e.key === 'ArrowRight') step(1);
                else if (e.key === 'ArrowLeft') step(-1);
                else if (e.key === 'Escape') setViewer(null);
            } else if (e.key === 'Escape') {
                setListFor(null);
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [isOverlayOpen, viewer, step]);

    return (
        <section id="education" className={styles.education}>
            <div className={styles.container}>
                <h2 className="section-title">Education</h2>
                <div className={styles.timeline}>
                    {educationData.map((item, index) => (
                        <motion.div
                            key={index}
                            className={styles.timelineItem}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <div className={styles.icon}>
                                <GraduationCap size={24} />
                            </div>
                            <div className={styles.content}>
                                <h3 className={styles.degree}>{item.degree}</h3>
                                <div className={styles.meta}>
                                    <span className={styles.institution}>{item.institution}</span>
                                    <span className={styles.period}>
                                        <Calendar size={14} />
                                        {item.period}
                                    </span>
                                </div>
                                {item.description && (
                                    <p className={styles.description}>{item.description}</p>
                                )}
                                {item.media && item.media.length > 0 && (
                                    <div className={styles.media}>
                                        {item.media.slice(0, INLINE_MEDIA_COUNT).map((media, mediaIndex) => (
                                            <button
                                                key={media.src}
                                                type="button"
                                                className={styles.mediaRow}
                                                onClick={() => openViewer(index, mediaIndex)}
                                            >
                                                <span className={styles.mediaThumb}>
                                                    <Image
                                                        src={media.src}
                                                        alt={media.title}
                                                        fill
                                                        sizes="120px"
                                                        className={styles.coverImage}
                                                    />
                                                </span>
                                                <span className={styles.mediaTitle}>{media.title}</span>
                                            </button>
                                        ))}
                                        {item.media.length > INLINE_MEDIA_COUNT && (
                                            <button
                                                type="button"
                                                className={styles.showAll}
                                                onClick={() => setListFor(index)}
                                            >
                                                Show all {item.media.length} media
                                                <ArrowRight size={16} />
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {listFor !== null && (
                    <motion.div
                        className={styles.overlay}
                        onClick={() => setListFor(null)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <motion.div
                            ref={listRef}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="education-media-title"
                            className={styles.modal}
                            onClick={(e) => e.stopPropagation()}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className={styles.modalHeader}>
                                <h3 id="education-media-title" className={styles.modalTitle}>Media</h3>
                                <button
                                    type="button"
                                    className={styles.iconButton}
                                    onClick={() => setListFor(null)}
                                    aria-label="Close media list"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <div className={styles.modalBody}>
                                {listMedia.map((media, mediaIndex) => (
                                    <button
                                        key={media.src}
                                        type="button"
                                        className={styles.modalItem}
                                        onClick={() => openViewer(listFor, mediaIndex)}
                                    >
                                        <span className={styles.modalThumb}>
                                            <Image
                                                src={media.src}
                                                alt={media.title}
                                                fill
                                                sizes="(max-width: 640px) 90vw, 280px"
                                                className={styles.coverImage}
                                            />
                                        </span>
                                        <span className={styles.modalItemTitle}>{media.title}</span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {viewer && current && (
                    <motion.div
                        ref={viewerRef}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Media viewer"
                        className={styles.viewer}
                        onClick={() => setViewer(null)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <button
                            type="button"
                            className={styles.viewerClose}
                            onClick={() => setViewer(null)}
                            aria-label="Close viewer"
                        >
                            <X size={24} />
                        </button>
                        <button
                            type="button"
                            className={`${styles.viewerNav} ${styles.viewerPrev}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                step(-1);
                            }}
                            aria-label="Previous image"
                        >
                            <ChevronLeft size={28} />
                        </button>
                        <div className={styles.viewerStage} onClick={(e) => e.stopPropagation()}>
                            <AnimatePresence initial={false} custom={direction} mode="wait">
                                <motion.div
                                    key={current.src}
                                    className={styles.viewerFrame}
                                    custom={direction}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.2 }}
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={0.6}
                                    onDragEnd={handleDragEnd}
                                >
                                    <Image
                                        src={current.src}
                                        alt={current.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 1100px"
                                        className={styles.viewerImage}
                                        draggable={false}
                                    />
                                </motion.div>
                            </AnimatePresence>
                            <div className={styles.viewerPreload} aria-hidden="true">
                                {adjacent.map((media) => (
                                    <Image
                                        key={media.src}
                                        src={media.src}
                                        alt=""
                                        fill
                                        sizes="(max-width: 768px) 100vw, 1100px"
                                        loading="eager"
                                    />
                                ))}
                            </div>
                            <div className={styles.viewerCaption}>
                                <p className={styles.viewerTitle}>{current.title}</p>
                                <span className={styles.viewerCounter}>
                                    {viewer.mediaIndex + 1} / {viewerMedia.length}
                                </span>
                            </div>
                        </div>
                        <button
                            type="button"
                            className={`${styles.viewerNav} ${styles.viewerNext}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                step(1);
                            }}
                            aria-label="Next image"
                        >
                            <ChevronRight size={28} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
