'use client';
import React, { useEffect } from 'react';
import { C, FONT } from '@/lib/tokens';

interface OverlayProps {
  onClose: () => void;
  children: React.ReactNode;
  width?: number;
}

export function Overlay({ onClose, children, width = 460 }: OverlayProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 60,
        background: 'rgba(6,36,36,.72)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width,
          maxWidth: '100%',
          background: C.PETROL8,
          border: `1px solid ${C.PETROL7}`,
          borderRadius: 8,
          padding: 36,
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Cerrar"
          style={{
            position: 'absolute',
            top: 16,
            right: 18,
            background: 'none',
            border: 'none',
            color: C.SLATE,
            fontSize: 22,
            cursor: 'pointer',
            fontFamily: FONT,
            lineHeight: 1,
          }}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
