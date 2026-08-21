'use client';

import { useEffect, useRef } from 'react';

// @ts-ignore - KaTeX auto-render の型解決用
import renderMathInElement from 'katex/dist/contrib/auto-render';

interface Props {
  html: string;
  className?: string;
}

export default function MathHtml({ html, className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && typeof renderMathInElement === 'function') {
      renderMathInElement(containerRef.current, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\(', right: '\\)', display: false },
          { left: '\\[', right: '\\]', display: true },
        ],
        throwOnError: false,
      });
    }
  }, [html]);

  return (
    <div
      ref={containerRef}
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}