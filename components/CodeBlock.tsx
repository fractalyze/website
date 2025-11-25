'use client';

import {useEffect, useRef} from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';

interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
}

export function CodeBlock({code, language, title}: CodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, language]);

  return (
    <div className="overflow-hidden rounded-2xl bg-[#282c34] shadow-lg">
      {/* Minimal header */}
      {title && (
        <div className="border-b border-gray-700/50 px-6 py-4">
          <div className="text-sm font-medium text-gray-400">{title}</div>
        </div>
      )}

      {/* Code content */}
      <pre className="language-python overflow-x-auto !bg-[#282c34] !p-8 !m-0 text-base">
        <code ref={codeRef} className={`language-${language}`}>
          {code}
        </code>
      </pre>
    </div>
  );
}
