'use client';
import { useState } from 'react';
import { C } from '@/lib/tokens';

interface InstagramLinkProps {
  size?: number;
  color?: string;
  label?: boolean;
}

export function InstagramLink({ size = 20, color = C.BODY, label = false }: InstagramLinkProps) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href="https://www.instagram.com/futures_mex/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram · @futures_mex"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        color: hover ? C.MINT : color,
        textDecoration: 'none',
        transition: 'color .18s',
      }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ display: 'block', flexShrink: 0 }}>
        <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.4" cy="6.6" r="1.3" fill="currentColor" />
      </svg>
      {label && (
        <span style={{ fontFamily: "'Gotham', system-ui, sans-serif", fontWeight: 500, fontSize: 12.5, letterSpacing: '.04em', lineHeight: 1 }}>
          @futures_mex
        </span>
      )}
    </a>
  );
}
