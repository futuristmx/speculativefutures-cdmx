import { C, FONT } from '@/lib/tokens';

interface WLogoProps {
  dark?: boolean;
  w?: number;
}

export function WLogo({ dark = true, w = 148 }: WLogoProps) {
  const txt = dark ? C.CAL : C.INK9;
  const tri = dark ? C.EMERALD : C.INK9;
  const node = dark ? C.PETROL : '#FFFFFF';
  const stroke = dark ? C.EMERALD : C.INK9;
  return (
    <svg
      width={w}
      height={w * (180 / 360)}
      viewBox="0 0 360 180"
      aria-label="Speculative Futures CDMX"
      style={{ display: 'block' }}
    >
      <polygon points="33.51 48.75 139.57 24.09 107.74 128.8" fill={tri} />
      <circle
        cx="84.95"
        cy="85.8"
        r="25.79"
        fill={node}
        stroke={stroke}
        strokeWidth="2.4"
      />
      <text
        transform="translate(132.36 101.11)"
        fontFamily={FONT}
        fontWeight="800"
        fontSize="26.98"
        fill={txt}
        letterSpacing="-.5"
      >
        <tspan x="0" y="0">
          SPECULATIVE
        </tspan>
        <tspan x="0" y="25.05">
          FUTURES
        </tspan>
        <tspan x="0" y="50.11">
          CDMX
        </tspan>
      </text>
    </svg>
  );
}
