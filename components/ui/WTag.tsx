'use client';
import { useState } from 'react';
import { C, FONT } from '@/lib/tokens';

interface WTagProps {
  label: string;
  active?: boolean;
  light?: boolean;
  onClick?: () => void;
}

export function WTag({ label, active = false, light = false, onClick }: WTagProps) {
  const [hovered, setHovered] = useState(false);
  const on = active || hovered;
  const border = on ? C.MINT : light ? C.LINE : C.PETROL7;
  const color = on ? C.MINT : light ? C.INK7 : C.BODY;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontFamily: FONT,
        fontWeight: 500,
        fontSize: 11.5,
        letterSpacing: '.1em',
        textTransform: 'uppercase',
        padding: '8px 16px',
        border: `1px solid ${border}`,
        borderRadius: 999,
        color,
        background: 'transparent',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all .18s',
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: on ? C.MINT : C.EMERALD,
          marginRight: 9,
          transition: 'background .18s',
        }}
      />
      {label}
    </button>
  );
}
