import { useId } from 'react';

/** Decorative grid used on brand-coloured bands. Uses a unique pattern id per instance. */
const GridPattern = ({ className = 'opacity-10' }: { className?: string }) => {
  const id = useId();
  return (
    <svg className={`absolute inset-0 h-full w-full ${className}`} aria-hidden="true" focusable="false">
      <defs>
        <pattern id={id} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
};

export default GridPattern;
