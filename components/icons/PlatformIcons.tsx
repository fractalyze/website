// Traced from the design's platform marks; strokes follow the current text colour.
type IconProps = {className?: string};

export function CpuIcon({className}: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? 'h-6 w-6'} aria-hidden>
      <g>
      <path d="M18 6H6V18H18V6Z" stroke="currentColor" strokeLinecap="round"/>
      <path d="M14.5 9.5H9.5V14.5H14.5V9.5Z" stroke="currentColor" strokeLinecap="round"/>
      <path d="M9 6V3.25M12 6V3.25M15 6V3.25M9 20.75V18M12 20.75V18M15 20.75V18M6 9H3.25M6 12H3.25M6 15H3.25M20.75 9H18M20.75 12H18M20.75 15H18" stroke="currentColor" strokeLinejoin="round"/>
      </g>
    </svg>
  );
}

export function GpuIcon({className}: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? 'h-6 w-6'} aria-hidden>
      <g>
      <path d="M21 5.5H3V16H21V5.5Z" stroke="currentColor" strokeLinecap="round"/>
      <path d="M12.5 18V16" stroke="currentColor" strokeLinejoin="round"/>
      <path d="M9.5 18V16" stroke="currentColor" strokeLinejoin="round"/>
      <path d="M6.5 18V16" stroke="currentColor" strokeLinejoin="round"/>
      <path d="M15.5 18V16" stroke="currentColor" strokeLinejoin="round"/>
      <path d="M18.5 18V16" stroke="currentColor" strokeLinejoin="round"/>
      <path d="M9 13.75C10.6569 13.75 12 12.4069 12 10.75C12 9.09315 10.6569 7.75 9 7.75C7.34315 7.75 6 9.09315 6 10.75C6 12.4069 7.34315 13.75 9 13.75Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 13C17.2426 13 18.25 11.9926 18.25 10.75C18.25 9.50736 17.2426 8.5 16 8.5C14.7574 8.5 13.75 9.50736 13.75 10.75C13.75 11.9926 14.7574 13 16 13Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 16L3 20" stroke="currentColor"/>
      </g>
    </svg>
  );
}

export function TpuIcon({className}: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? 'h-6 w-6'} aria-hidden>
      <g>
      <path d="M20.5 7H3.5V17H20.5V7Z" stroke="currentColor" strokeLinecap="round"/>
      <path d="M12 19.75V17" stroke="currentColor" strokeLinejoin="round"/>
      <path d="M12 6.75V4" stroke="currentColor" strokeLinejoin="round"/>
      <path d="M9 19.75V17" stroke="currentColor" strokeLinejoin="round"/>
      <path d="M9 6.75V4" stroke="currentColor" strokeLinejoin="round"/>
      <path d="M6 19.75V17" stroke="currentColor" strokeLinejoin="round"/>
      <path d="M6 6.75V4" stroke="currentColor" strokeLinejoin="round"/>
      <path d="M15 19.75V17" stroke="currentColor" strokeLinejoin="round"/>
      <path d="M15 6.75V4" stroke="currentColor" strokeLinejoin="round"/>
      <path d="M18 19.75V17" stroke="currentColor" strokeLinejoin="round"/>
      <path d="M18 6.75V4" stroke="currentColor" strokeLinejoin="round"/>
      <path d="M9 9.5H6V14.5H9V9.5Z" stroke="currentColor" strokeLinecap="round"/>
      <path d="M13.5 9.5H10.5V14.5H13.5V9.5Z" stroke="currentColor" strokeLinecap="round"/>
      <path d="M18 9.5H15V14.5H18V9.5Z" stroke="currentColor" strokeLinecap="round"/>
      </g>
    </svg>
  );
}

export function FpgaIcon({className}: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? 'h-6 w-6'} aria-hidden>
      <g>
      <path d="M20.5 5H3.5V19H20.5V5Z" stroke="currentColor" strokeLinecap="round"/>
      <path d="M12 21.75V19" stroke="currentColor" strokeLinejoin="round"/>
      <path d="M12 4.75V2" stroke="currentColor" strokeLinejoin="round"/>
      <path d="M9 21.75V19" stroke="currentColor" strokeLinejoin="round"/>
      <path d="M9 4.75V2" stroke="currentColor" strokeLinejoin="round"/>
      <path d="M6 21.75V19" stroke="currentColor" strokeLinejoin="round"/>
      <path d="M6 4.75V2" stroke="currentColor" strokeLinejoin="round"/>
      <path d="M15 21.75V19" stroke="currentColor" strokeLinejoin="round"/>
      <path d="M15 4.75V2" stroke="currentColor" strokeLinejoin="round"/>
      <path d="M18 21.75V19" stroke="currentColor" strokeLinejoin="round"/>
      <path d="M18 4.75V2" stroke="currentColor" strokeLinejoin="round"/>
      <path d="M9.5 8H6.5V10H9.5V8Z" stroke="currentColor" strokeLinecap="round"/>
      <path d="M9.5 14H6.5V16H9.5V14Z" stroke="currentColor" strokeLinecap="round"/>
      <path d="M13.5 11H10.5V13H13.5V11Z" stroke="currentColor" strokeLinecap="round"/>
      <path d="M17.5 8H14.5V10H17.5V8Z" stroke="currentColor" strokeLinecap="round"/>
      <path d="M17.5 14H14.5V16H17.5V14Z" stroke="currentColor" strokeLinecap="round"/>
      </g>
    </svg>
  );
}

