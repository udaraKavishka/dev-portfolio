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
