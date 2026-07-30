'use client';

import {ReactNode, useEffect, useRef} from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

const FAILSAFE_MS = 1000;

// How far above the viewport the recovery root below reaches. It has to cover
// the distance from the top of the viewport back to the top of the document for
// a block left anywhere above the fold to count as passed; a page taller than
// this would leave a block above the mark dimmed.
const PASSED_REACH_PX = 100000;

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
    // `data-grow="left"` anchors that start on the right instead, so a bar
    // reaching leftwards from a baseline still grows out of the line it hangs off.
    const bars = Array.from(el.querySelectorAll<HTMLElement>('[data-grow]'));

    el.style.opacity = '0';
    bars.forEach((bar) => {
      bar.style.transformOrigin = bar.dataset.grow === 'left' ? 'right center' : 'left center';
      bar.style.transform = 'scaleX(0)';
    });

    const clear = () => {
      el.style.opacity = '';
      bars.forEach((bar) => {
        bar.style.transform = '';
      });
    };

    // Cleared by the observer's first callback; only fires if none arrives —
    // which is also the case where nothing else will ever disconnect them, so it
    // has to tear both observers down rather than only undim the block.
    const failsafe = window.setTimeout(() => {
      stop();
      clear();
    }, FAILSAFE_MS);

    const stop = () => {
      window.clearTimeout(failsafe);
      observer.disconnect();
      passed.disconnect();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        // The first callback arrives right after observing whether or not the
        // block is in view, so it doubles as proof the observer is alive.
        window.clearTimeout(failsafe);
        if (!entry.isIntersecting) return;
        stop();
        clear();
        el.animate(
          [
            {opacity: 0, transform: 'translateY(24px)'},
            {opacity: 1, transform: 'none'},
          ],
          {duration: 1100, delay, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'backwards'}
        );
        bars.forEach((bar, index) => {
          bar.animate([{transform: 'scaleX(0)'}, {transform: 'none'}], {
            duration: 900,
            delay: delay + index * 90,
            easing: 'cubic-bezier(0.2, 0.6, 0.2, 1)',
            fill: 'backwards',
          });
        });
      },
      {threshold: 0, rootMargin: '0px 0px -10% 0px'}
    );

    // A jump — a restored scroll position, a #hash link, find-in-page — can
    // carry a dimmed block from below the fold to above the viewport in one
    // step. Both ends of that jump have a zero intersection ratio, so the
    // observer above is never called again and the block would stay dimmed for
    // good. This root covers everything above the viewport instead, which makes
    // being scrolled past an event of its own: the animation is missed, but the
    // content the reader is scrolling back to is there.
    const passed = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        stop();
        clear();
      },
      {threshold: 0, rootMargin: `${PASSED_REACH_PX}px 0px -100% 0px`}
    );

    observer.observe(el);
    passed.observe(el);

    return () => {
      stop();
      clear();
    };
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
