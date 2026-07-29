'use client';

import {ReactNode, useEffect, useRef} from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

const FAILSAFE_MS = 1000;

/**
 * Fades a block up as it scrolls into view.
 *
 * Nothing is hidden by CSS and nothing is hidden at render: an element is only
 * dimmed once it is known to be below the fold, and a timer clears that state
 * whichever way the observer behaves. The worst outcome is a missing animation,
 * never missing content — an earlier version could leave a whole section blank
 * when its measurement raced the webfonts.
 */
export function Reveal({children, className, delay = 0}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined' || !el.animate) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    // Bars inside the block grow from their own start rather than sliding in.
    const bars = Array.from(el.querySelectorAll<HTMLElement>('[data-grow]'));

    el.style.opacity = '0';
    bars.forEach((bar) => {
      bar.style.transformOrigin = 'left center';
      bar.style.transform = 'scaleX(0)';
    });

    const clear = () => {
      el.style.opacity = '';
      bars.forEach((bar) => {
        bar.style.transform = '';
      });
    };

    // Cleared by the observer's first callback; only fires if none arrives.
    const failsafe = window.setTimeout(clear, FAILSAFE_MS);

    const observer = new IntersectionObserver(
      ([entry]) => {
        // The first callback arrives right after observing whether or not the
        // block is in view, so it doubles as proof the observer is alive.
        window.clearTimeout(failsafe);
        if (!entry.isIntersecting) return;
        observer.disconnect();
        clear();
        el.animate(
          [
            {opacity: 0, transform: 'translateY(12px)'},
            {opacity: 1, transform: 'none'},
          ],
          {duration: 500, delay, easing: 'cubic-bezier(0.2, 0.6, 0.2, 1)', fill: 'backwards'}
        );
        bars.forEach((bar, index) => {
          bar.animate([{transform: 'scaleX(0)'}, {transform: 'none'}], {
            duration: 700,
            delay: delay + index * 60,
            easing: 'cubic-bezier(0.2, 0.6, 0.2, 1)',
            fill: 'backwards',
          });
        });
      },
      {threshold: 0, rootMargin: '0px 0px -10% 0px'}
    );

    observer.observe(el);

    return () => {
      window.clearTimeout(failsafe);
      observer.disconnect();
      clear();
    };
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
