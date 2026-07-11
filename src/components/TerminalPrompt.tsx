'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { flashbang } from '@/lib/flashbang';
import { toggleTheme } from '@/lib/theme';
import styles from './TerminalPrompt.module.css';

// Renders a 3…2…1 countdown, flashbangs the screen, then flips the theme.
function ThemeFlash() {
    const [count, setCount] = useState(3);

    useEffect(() => {
        if (count > 0) {
            const t = setTimeout(() => setCount((c) => c - 1), 700);
            return () => clearTimeout(t);
        }
        flashbang();
        toggleTheme();
    }, [count]);

    return (
        <span className={styles.fun}>
            🧨 flashbang out! {count > 0 ? `${count}…` : '💥 fire in the hole!'}
        </span>
    );
}

interface TerminalPromptProps {
    name: string;
    roles: string[];
    bio: string;
}

interface HistoryEntry {
    input: string;
    output: ReactNode;
}

const SECTIONS: Record<string, string> = {
    about: 'about',
    projects: 'projects',
    skills: 'skills',
    experience: 'experience',
    education: 'education',
    clubs: 'clubs',
    setup: 'setup',
    contact: 'contact',
};

const COMMANDS = [
    ['help', 'list available commands'],
    ['whoami', 'print name, roles and bio'],
    ['projects', 'jump to projects'],
    ['skills', 'jump to skills'],
    ['experience', 'jump to experience'],
    ['contact', 'jump to contact'],
    ['blog', 'open the blog'],
    ['resume', 'open my resume (pdf)'],
    ['hire', 'the correct next command 😉'],
    ['ls', 'list navigable sections'],
    ['clear', 'clear the terminal'],
];

const FUN_COMMANDS = [
    ['sudo', 'you are not root here 🙃'],
    ['coffee', 'brew +10 focus ☕'],
    ['matrix', 'follow the white rabbit 🟢'],
    ['theme', 'flashbang → flip light/dark 🧨'],
    ['echo <text>', 'echo it back'],
    ['rm -rf /', 'do NOT (but try it)'],
    ['top', "what i'm running on"],
    ['ls -la', 'peek at the hidden files'],
    ['cat .env', 'no creds for you 🔐'],
    ['sl', 'choo choo 🚂'],
    ['vim', 'enter, never leave 😈'],
    ['fortune', 'a dev proverb'],
    ['ping', 'pong 🏓'],
    ['uptime', 'crashes since 2021'],
    ['history', 'what you just typed'],
    ['pwd', 'you are here'],
    ['date', 'the current time'],
    ['github', 'open my github ⭐'],
    ['42', 'the answer 🌌'],
    ['exit', 'there is no escape'],
];

export default function TerminalPrompt({ name, roles, bio }: TerminalPromptProps) {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState('');
    const [history, setHistory] = useState<HistoryEntry[]>([]);
    const [commandLog, setCommandLog] = useState<string[]>([]);
    const [logIndex, setLogIndex] = useState<number>(-1);

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    const run = (raw: string): ReactNode => {
        const cmd = raw.trim().toLowerCase();
        if (!cmd) return null;

        // --- witty / troll commands ---
        if (cmd === 'sudo' || cmd.startsWith('sudo ')) {
            const rest = cmd.slice(4).trim();
            if (rest === 'make me a sandwich') {
                return <span className={styles.fun}>🥪 poof! you&rsquo;re a sandwich.</span>;
            }
            if (rest === 'hire udara' || rest === 'hire me') {
                router.push('/blog');
                return <span className={styles.fun}>escalating privileges… request approved ✅</span>;
            }
            return (
                <span className={styles.error}>
                    [sudo] password for guest: <br />
                    nice try 🙃 you&rsquo;re not root on my portfolio.
                </span>
            );
        }

        if (cmd === 'make me a sandwich') {
            return <span className={styles.fun}>what? make it yourself. (try &lsquo;sudo&rsquo;)</span>;
        }

        if (cmd.startsWith('echo ')) {
            return <span>{raw.trim().slice(5)}</span>;
        }

        if (cmd === 'rm -rf /' || cmd === 'rm -rf /*' || cmd === 'rm -rf ~') {
            return (
                <span className={styles.fun}>
                    deleting the universe… 🔥🔥🔥
                    <br />
                    …just kidding. everything is fine. please never run that on a real server.
                </span>
            );
        }

        if (cmd === 'hire' || cmd === 'hire me' || cmd === 'hire udara') {
            scrollTo('contact');
            return (
                <span className={styles.fun}>
                    🚀 excellent choice. scrolling to contact — let&rsquo;s talk.
                </span>
            );
        }

        if (cmd === 'coffee' || cmd === 'make coffee') {
            return <span className={styles.fun}>☕ brewing… +10 focus, +5 uptime. ready to ship.</span>;
        }

        if (cmd === 'matrix') {
            return <span className={styles.fun}>wake up, Neo… 🟢 the code has you. (kubectl into the matrix)</span>;
        }

        if (cmd === 'exit' || cmd === 'quit' || cmd === ':q') {
            return <span className={styles.fun}>there is no escape. you live in the terminal now. 👁️</span>;
        }

        if (cmd === 'pwd') {
            return <span>~/udara/portfolio &nbsp;# you are here</span>;
        }

        if (cmd === 'date') {
            return <span>{new Date().toString()}</span>;
        }

        if (cmd === 'history') {
            return commandLog.length ? (
                <ol className={styles.historyList}>
                    {commandLog.map((c, i) => (
                        <li key={i}>{c}</li>
                    ))}
                </ol>
            ) : (
                <span>no history yet.</span>
            );
        }

        if (cmd === 'theme' || cmd === 'flashbang') {
            return <ThemeFlash />;
        }

        if (cmd === 'sl') {
            return <span className={styles.fun}>🚂💨 choo choo! (you meant &lsquo;ls&rsquo;, didn&rsquo;t you?)</span>;
        }

        if (cmd === 'ls -la' || cmd === 'ls -a') {
            return (
                <pre className={styles.pre}>{`drwxr-xr-x  passion/
drwxr-xr-x  side-projects/
-rw-------  .env        # nice try 😏
-rw-------  .secrets    # also empty, promise`}</pre>
            );
        }

        if (cmd === 'cat .env' || cmd === 'cat .secrets' || cmd === 'cat secrets') {
            return <span className={styles.fun}>export MOTIVATION=over9000 # that&rsquo;s all you&rsquo;re getting 🔐</span>;
        }

        if (cmd === 'top' || cmd === 'htop') {
            return (
                <pre className={styles.pre}>{`PID   COMMAND        %CPU
1     shipping-code  99.9
2     coffee.service 87.0
3     debugging      42.0
4     sleep          0.2`}</pre>
            );
        }

        if (cmd === 'uptime') {
            return <span>up since 2021 · 0 crashes in prod (that you know of) 🟢</span>;
        }

        if (cmd === 'ping') {
            return <span className={styles.fun}>pong 🏓 (0ms — we&rsquo;re on the same page)</span>;
        }

        if (cmd === 'vim' || cmd === 'nvim' || cmd === 'vi') {
            return <span className={styles.fun}>you&rsquo;re now trapped in vim. :q doesn&rsquo;t work. good luck. 😈</span>;
        }

        if (cmd === 'fortune') {
            const fortunes = [
                'it works on my machine ¯\\_(ツ)_/¯',
                'there are 2 hard problems: caching, naming, and off-by-one errors.',
                'the code you wrote at 2am will be reviewed at 9am. plan accordingly.',
                'commit early, commit often, blame someone else.',
                'prod is just staging with confidence.',
            ];
            return <span>{fortunes[Math.floor(Math.random() * fortunes.length)]}</span>;
        }

        if (cmd === 'github' || cmd === 'star') {
            window.open('https://github.com/udaraKavishka', '_blank');
            return <span className={styles.fun}>⭐ opening github — a star would make my day.</span>;
        }

        if (cmd === '42' || cmd === 'answer') {
            return <span>the answer to life, the universe, and everything. 🌌</span>;
        }

        if (cmd === 'help') {
            return (
                <div>
                    <ul className={styles.helpList}>
                        {COMMANDS.map(([name, desc]) => (
                            <li key={name}>
                                <span className={styles.helpCmd}>{name}</span>
                                <span className={styles.helpDesc}>{desc}</span>
                            </li>
                        ))}
                    </ul>
                    <p className={styles.helpHeading}># hidden / fun</p>
                    <ul className={styles.helpList}>
                        {FUN_COMMANDS.map(([name, desc]) => (
                            <li key={name}>
                                <span className={styles.helpCmd}>{name}</span>
                                <span className={styles.helpDesc}>{desc}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }

        if (cmd === 'whoami') {
            return (
                <div>
                    <div className={styles.who}>{name}</div>
                    <div className={styles.roles}>{roles.join(' · ')}</div>
                    <p className={styles.bioLine}>{bio}</p>
                </div>
            );
        }

        if (cmd === 'ls') {
            return <span>{Object.keys(SECTIONS).join('  ')}  blog</span>;
        }

        if (cmd === 'blog') {
            router.push('/blog');
            return <span>opening blog…</span>;
        }

        if (cmd === 'resume') {
            window.open('/Udara_Nalawansa.pdf', '_blank');
            return <span>opening resume.pdf…</span>;
        }

        if (cmd === 'clear') {
            return null;
        }

        if (cmd in SECTIONS) {
            scrollTo(SECTIONS[cmd]);
            return <span>opening {cmd}…</span>;
        }

        return (
            <span className={styles.error}>
                command not found: {cmd} — even my CI couldn&rsquo;t build that. type &lsquo;help&rsquo;
            </span>
        );
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const raw = value;
            if (raw.trim().toLowerCase() === 'clear') {
                setHistory([]);
            } else {
                const output = run(raw);
                setHistory((prev) => [...prev, { input: raw, output }]);
            }
            if (raw.trim()) {
                setCommandLog((prev) => [...prev, raw]);
            }
            setLogIndex(-1);
            setValue('');
            return;
        }

        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandLog.length === 0) return;
            const next = logIndex === -1 ? commandLog.length - 1 : Math.max(0, logIndex - 1);
            setLogIndex(next);
            setValue(commandLog[next]);
            return;
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (logIndex === -1) return;
            const next = logIndex + 1;
            if (next >= commandLog.length) {
                setLogIndex(-1);
                setValue('');
            } else {
                setLogIndex(next);
                setValue(commandLog[next]);
            }
        }
    };

    return (
        <div className={styles.terminal} onClick={() => inputRef.current?.focus()}>
            <div className={styles.header}>
                <span className={styles.headerDot} />
                <span className={styles.headerLabel}>interactive shell — type &lsquo;help&rsquo;</span>
            </div>
            {history.map((entry, i) => (
                <div key={i} className={styles.entry}>
                    <div className={styles.promptRow}>
                        <span className={styles.prompt}>$</span>
                        <span className={styles.echo}>{entry.input}</span>
                    </div>
                    {entry.output && <div className={styles.output}>{entry.output}</div>}
                </div>
            ))}
            <div className={styles.promptRow}>
                <span className={styles.prompt}>$</span>
                <input
                    ref={inputRef}
                    type="text"
                    className={styles.input}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    aria-label="terminal command input"
                    autoComplete="off"
                    autoCapitalize="off"
                    spellCheck={false}
                />
                {history.length === 0 && !value && (
                    <span className={styles.hint}>type &lsquo;help&rsquo;</span>
                )}
            </div>
        </div>
    );
}
