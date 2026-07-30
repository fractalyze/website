'use client';

import Link from 'next/link';
import {RefObject, useEffect, useRef, useState} from 'react';
import headerNavLinks from '@/data/headerNavLinks';
import {contactLink} from './ContactButton';

// The header's border transition and the Reveal easing already use these.
const DURATION_MS = 200;
const EASING = 'cubic-bezier(0.4, 0, 0.2, 1)';

const FOCUSABLE = 'a[href], button:not([disabled])';

// Every row is the same object: full width, its own hairline underneath, and a
// tap target well past the 24px floor. The focus ring is pulled inside the row
// because a row reaches both edges of the screen, so a ring drawn outside one
// would have its sides cut off.
const ROW =
  'flex min-h-6 items-center border-b border-line px-6 py-5 text-label font-medium text-ink transition-opacity hover:opacity-70 focus-visible:-outline-offset-2 md:px-10';

type Props = {
  /** Must match the hamburger's aria-controls. */
  id: string;
  open: boolean;
  onClose: () => void;
  /** The hamburger. It stays inside the focus trap and is where focus returns. */
  triggerRef: RefObject<HTMLButtonElement | null>;
};

/**
 * The panel the hamburger opens, directly under the sticky header.
 *
 * The outer element is always there so the hamburger's aria-controls always
 * names a real node. The rows are only mounted while the panel is open — a
 * closed panel must not hold links a Tab or a screen reader can reach — and
 * their unmount waits out the closing animation, which needs something to
 * collapse.
 */
export function NavMenu({id, open, onClose, triggerRef}: Props) {
  const contact = contactLink();
  const [present, setPresent] = useState(open);
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(open);

  // Mount first, animate second: the opening animation needs the rows measured.
  useEffect(() => {
    if (open) setPresent(true);
  }, [open]);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;

    const instant =
      !el.animate || window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (open) {
      if (instant) return;
      const animation = el.animate(
        [{height: '0px'}, {height: `${el.scrollHeight}px`}],
        {duration: DURATION_MS, easing: EASING}
      );
      return () => animation.cancel();
    }

    if (instant) {
      setPresent(false);
      return;
    }
    const animation = el.animate([{height: `${el.scrollHeight}px`}, {height: '0px'}], {
      duration: DURATION_MS,
      easing: EASING,
      fill: 'forwards',
    });
    animation.onfinish = () => setPresent(false);
    return () => animation.cancel();
  }, [open, present]);

  // Escape closes; Tab cycles the hamburger and the rows and nothing else.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      const panel = panelRef.current;
      const items = [
        triggerRef.current,
        ...(panel ? Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)) : []),
      ].filter((node): node is HTMLElement => node !== null);
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      // Anything outside the set — the browser chrome having handed focus back,
      // say — comes in at the top rather than being left where it was.
      if (!(active instanceof HTMLElement) || !items.includes(active)) {
        event.preventDefault();
        first.focus();
        return;
      }
      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose, triggerRef]);

  // A press anywhere the panel and the hamburger do not cover closes it. Without
  // this the panel is only dismissible from its own button while the page behind
  // it will not scroll, which on a phone is a corner with no way out.
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (panelRef.current?.contains(target) || triggerRef.current?.contains(target)) return;
      onClose();
    };

    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open, onClose, triggerRef]);

  // The page behind the panel does not scroll. The padding stands in for the
  // scrollbar the lock removes, so the header does not shift sideways as it goes.
  //
  // iOS Safari honours this less than reliably and can keep scrolling through
  // it. The usual answer — pinning the body with position: fixed — is not open
  // to us: it would take the sticky header out of its scrolling context and
  // strand it at the top of the document. The panel hangs off that header, so
  // the failure there is the page drifting behind a menu that stays put, and a
  // press outside still closes it.
  useEffect(() => {
    if (!open) return;

    const {body} = document;
    const overflow = body.style.overflow;
    const paddingRight = body.style.paddingRight;
    const gutter = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = 'hidden';
    if (gutter > 0) body.style.paddingRight = `${gutter}px`;

    return () => {
      body.style.overflow = overflow;
      body.style.paddingRight = paddingRight;
    };
  }, [open]);

  // Whatever closed the panel, focus lands back on the button that opened it.
  useEffect(() => {
    if (wasOpen.current && !open) triggerRef.current?.focus();
    wasOpen.current = open;
  }, [open, triggerRef]);

  return (
    <div id={id} className="absolute left-0 right-0 top-full xl:hidden">
      {present && (
        // Closing takes 200ms, and for that long the rows are still mounted.
        // Marking the collapsing panel inert takes them out of the tab order and
        // the accessibility tree at the moment the state says they are gone,
        // rather than whenever the animation ends.
        <div ref={panelRef} inert={!open} className="overflow-hidden bg-paper">
          <ul className="border-t border-line">
            {headerNavLinks.map((link) => (
              <li key={link.title}>
                <Link href={link.href} className={ROW} onClick={onClose}>
                  {link.title}
                </Link>
              </li>
            ))}
            <li>
              <a {...contact} className={ROW} onClick={onClose}>
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
