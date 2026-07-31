// Redrawn from the design's vector geometry: an 84×84 box, 1px strokes, no fill.
const frame = {
  viewBox: '0 0 84 84',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1,
} as const;

const size = 'h-[5.25rem] w-[5.25rem]';

export function AsteriskIcon({className}: {className?: string}) {
  // Eight rays of one length, so the diagonals reach 38.5/√2 along each axis
  // and stop short of the box the upright pair spans.
  const diagonal = 38.5 / Math.SQRT2;
  const near = (42 - diagonal).toFixed(2);
  const far = (42 + diagonal).toFixed(2);

  return (
    <svg {...frame} className={className ?? size} aria-hidden>
      <path d="M42 3.5 L42 80.5" />
      <path d="M3.5 42 L80.5 42" />
      <path d={`M${near} ${near} L${far} ${far}`} />
      <path d={`M${near} ${far} L${far} ${near}`} />
    </svg>
  );
}

export function StackedPlanesIcon({className}: {className?: string}) {
  return (
    <svg {...frame} className={className ?? size} aria-hidden>
      {[20, 42, 64].map((cy) => (
        <path key={cy} d={`M42 ${cy - 16.5} L80.5 ${cy} L42 ${cy + 16.5} L3.5 ${cy} Z`} />
      ))}
    </svg>
  );
}

export function OrbitIcon({className}: {className?: string}) {
  return (
    <svg {...frame} className={className ?? size} aria-hidden>
      {[
        [42, 56],
        [56, 42],
        [42, 28],
        [28, 42],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={21} />
      ))}
    </svg>
  );
}

export function NestedSquaresIcon({className}: {className?: string}) {
  return (
    <svg {...frame} className={className ?? size} aria-hidden>
      <path d="M42 3.5 L80.5 42 L42 80.5 L3.5 42 Z" />
      <path d="M42 24.5 L59.5 42 L42 59.5 L24.5 42 Z" />
      <rect x={24.5} y={24.5} width={35} height={35} />
    </svg>
  );
}

export function ArrowTailIcon({className}: {className?: string}) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      // Pinned with the button it sits in, which is 40px with a 14px label.
      className={className ?? 'h-[16px] w-[16px]'}
      aria-hidden
    >
      <path d="M8.286 3.703a.75.75 0 0 1 1.061 0l3.75 3.75a.75.75 0 0 1 0 1.061l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.469-2.47H3.25a.75.75 0 0 1 0-1.5h7.505L8.286 4.764a.75.75 0 0 1 0-1.061Z" />
    </svg>
  );
}

export function CheckMark({className}: {className?: string}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      // Pixels, not a rem: these sit in a table whose type is pixels too, and as
      // a rem the mark drew 15px at 1024 against 24px on the phone beside it.
      // 24px is what the frame draws — its cross inks 15px in a 24px box.
      className={className ?? 'h-[24px] w-[24px]'}
      aria-hidden
    >
      <path d="M20 7 L10 17 L4.5 11.5" />
    </svg>
  );
}

export function CrossMark({className}: {className?: string}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      // Pixels, not a rem: these sit in a table whose type is pixels too, and as
      // a rem the mark drew 15px at 1024 against 24px on the phone beside it.
      // 24px is what the frame draws — its cross inks 15px in a 24px box.
      className={className ?? 'h-[24px] w-[24px]'}
      aria-hidden
    >
      <path d="M19 5 L5 19 M5 5 L19 19" />
    </svg>
  );
}

export function PartialMark({className}: {className?: string}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinejoin="round"
      // Pixels, not a rem: these sit in a table whose type is pixels too, and as
      // a rem the mark drew 15px at 1024 against 24px on the phone beside it.
      // 24px is what the frame draws — its cross inks 15px in a 24px box.
      className={className ?? 'h-[24px] w-[24px]'}
      aria-hidden
    >
      <path d="M12.09 3.25 L21.84 19.75 L2.34 19.75 Z" />
    </svg>
  );
}
