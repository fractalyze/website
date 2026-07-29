import {ReactNode} from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * Marks a block for the scroll-driven reveal in globals.css. Deliberately not a
 * client component: the animation is declarative, so nothing here can leave
 * content hidden if a measurement races the fonts or an observer misses.
 */
export function Reveal({children, className}: Props) {
  return (
    <div data-reveal className={className}>
      {children}
    </div>
  );
}
