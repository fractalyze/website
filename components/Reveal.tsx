'use client';

import {ReactNode, useEffect, useRef, useState} from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({children, className, delay = 0}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  // Server output carries neither attribute, so the content is visible to
  // readers without scripting and there is nothing for React to mismatch on.
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }

    setArmed(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      // Fires as the top edge clears the lower 12% of the viewport. A fractional
      // threshold would hold a tall section blank while half of it is on screen.
      {threshold: 0, rootMargin: '0px 0px -12% 0px'}
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={armed || undefined}
      data-shown={shown || undefined}
      style={delay ? ({'--reveal-delay': `${delay}ms`} as React.CSSProperties) : undefined}
      className={className}
    >
      {children}
    </div>
  );
}
