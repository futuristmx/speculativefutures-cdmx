import { C } from '@/lib/tokens';

interface WIsotypeProps {
  size?: number;
  stroke?: string;
  tri?: string;
  node?: string;
}

export function WIsotype({
  size = 40,
  stroke = C.EMERALD,
  tri = C.EMERALD,
  node = C.PETROL,
}: WIsotypeProps) {
  return (
    <svg
      width={size}
      height={size * (150 / 165)}
      viewBox="0 0 165 150"
      aria-label="SF CDMX"
    >
      <polygon points="33.51 48.75 139.57 24.09 107.74 128.8" fill={tri} />
      <circle
        cx="84.95"
        cy="85.8"
        r="25.79"
        fill={node}
        stroke={stroke}
        strokeWidth="3"
      />
    </svg>
  );
}
