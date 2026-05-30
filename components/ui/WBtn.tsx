'use client';
import React, { useState } from 'react';
import { C, FONT } from '@/lib/tokens';

interface WBtnProps {
  children: React.ReactNode;
  variant?: 'primary' | 'ghost' | 'link';
  onClick?: () => void;
  light?: boolean;
  href?: string;
}

export function WBtn({
  children,
  variant = 'primary',
  onClick,
  light = false,
  href,
}: WBtnProps) {
  const [hovered, setHovered] = useState(false);

  const base: React.CSSProperties = {
    fontFamily: FONT,
    fontWeight: 500,
    fontSize: 15,
    padding: '13px 26px',
    borderRadius: 4,
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    border: '1px solid transparent',
    transition: 'all .18s cubic-bezier(.2,.6,.2,1)',
    whiteSpace: 'nowrap',
  };

  const styles: Record<string, React.CSSProperties> = {
    primary: {
      ...base,
      background: C.MINT,
      color: C.PETROL,
      filter: hovered ? 'brightness(1.08)' : 'none',
      transform: hovered ? 'translateY(-2px)' : 'none',
    },
    ghost: {
      ...base,
      background: 'transparent',
      color: hovered ? C.MINT : light ? C.INK9 : C.CAL,
      borderColor: hovered ? C.MINT : light ? C.INK9 : 'rgba(244,247,245,.4)',
    },
    link: {
      fontFamily: FONT,
      fontWeight: 400,
      fontSize: 15,
      color: light ? C.EMERALD : C.MINT,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      textDecoration: 'underline',
      textUnderlineOffset: '4px',
    },
  };

  if (href) {
    return (
      <a
        href={href}
        style={styles[variant]}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      style={styles[variant]}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  );
}
