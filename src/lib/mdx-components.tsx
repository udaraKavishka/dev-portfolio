import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import type { MDXComponents } from 'mdx/types';

export function createMdxComponents(contentImageClassName: string): MDXComponents {
    return {
        pre: (props) => {
            const child = props.children as React.ReactElement<{ className?: string; children?: string }> | undefined;
            const className = child?.props?.className ?? '';
            const language = className.replace('language-', '') || 'text';
            const code = typeof child?.props?.children === 'string' ? child.props.children : '';

            return (
                <div className="my-10">
                    <SyntaxHighlighter language={language} style={dracula}>
                        {code.replace(/\n$/, '')}
                    </SyntaxHighlighter>
                </div>
            );
        },
        // Architecture diagrams are draw.io SVGs under public/. They are inlined so their
        // light-dark() colors follow the site theme and labels pick up the site font.
        Diagram: ({ src, alt }: { src: string; alt: string }) => {
            const svg = fs
                .readFileSync(path.join(process.cwd(), 'public', src), 'utf8')
                .replace(/^<\?xml[^>]*>\s*(<!DOCTYPE[^>]*>\s*)?/, '');
            return (
                <figure className="diagram">
                    <div className="diagram-frame" role="img" aria-label={alt} dangerouslySetInnerHTML={{ __html: svg }} />
                    <figcaption>
                        <a href={src} target="_blank" rel="noopener noreferrer">Open full size</a>
                    </figcaption>
                </figure>
            );
        },
        img: ({ src, alt }) => {
            if (!src || typeof src !== 'string') {
                return null;
            }
            return (
                <span className="my-8" style={{ display: 'block' }}>
                    <Image
                        src={src}
                        alt={alt || 'Content image'}
                        width={1200}
                        height={800}
                        sizes="(max-width: 800px) 100vw, 800px"
                        className={contentImageClassName}
                        style={{ width: '100%', height: 'auto' }}
                    />
                </span>
            );
        },
    };
}
