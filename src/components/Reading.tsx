import { ExternalLink } from 'lucide-react';
import { getReadingList, HN_FAVORITES_URL } from '@/lib/reading';
import styles from './Reading.module.css';

function formatDate(date: string) {
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) {
        return '';
    }
    return parsed.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

export default async function Reading() {
    const items = await getReadingList();

    if (items.length === 0) {
        return null;
    }

    return (
        <section className={styles.reading}>
            <h2 className={styles.title}>what i read</h2>
            <p className={styles.subtitle}>
                stories i favorited on hacker news. updated automatically.
            </p>
            <div className={styles.list}>
                {items.map((item) => (
                    <article key={item.commentsUrl} className={styles.row}>
                        <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.rowTitle}
                        >
                            {item.title}
                        </a>
                        <div className={styles.meta}>
                            <span className={styles.source}>{item.source}</span>
                            {formatDate(item.date) && (
                                <>
                                    <span className={styles.dot}>·</span>
                                    <span>{formatDate(item.date)}</span>
                                </>
                            )}
                            <span className={styles.dot}>·</span>
                            <a
                                href={item.commentsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.hnLink}
                            >
                                hn
                            </a>
                        </div>
                    </article>
                ))}
            </div>
            <a
                href={HN_FAVORITES_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.allLink}
            >
                <span>all favorites on hn</span>
                <ExternalLink size={14} />
            </a>
        </section>
    );
}
