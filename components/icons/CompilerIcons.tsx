// Redrawn from the design's vector geometry: an 84×84 box, 1px strokes, no fill.
const frame = {
  viewBox: '0 0 84 84',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1,
} as const;

const size = 'h-[5.25rem] w-[5.25rem]';

export function StackedTrianglesIcon({className}: {className?: string}) {
  return (
    <svg {...frame} className={className ?? size} aria-hidden>
      {[3.5, 24.5, 45.5].map((top) => (
        <path key={top} d={`M42 ${top} L80.5 ${top + 38.5} L3.5 ${top + 38.5} Z`} />
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
      className={className ?? 'h-4 w-4'}
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
      className={className ?? 'h-6 w-6'}
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
      className={className ?? 'h-6 w-6'}
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
      className={className ?? 'h-6 w-6'}
      aria-hidden
    >
      <path d="M12.09 3.25 L21.84 19.75 L2.34 19.75 Z" />
    </svg>
  );
}
