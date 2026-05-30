'use client';
import { useState, useEffect } from 'react';
import { WLogo } from '@/components/ui/WLogo';
import { WBtn } from '@/components/ui/WBtn';
import { C, FONT, meta } from '@/lib/tokens';

interface NavProps {
  onJoin: () => void;
  onComunidad: () => void;
  onContact: () => void;
}

export function Nav({ onJoin, onComunidad, onContact }: NavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 12);
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);

  const links: [string, string][] = [
    ['Eventos', '#eventos'],
    ['Territorios', '#territorios'],
    ['Manifiesto', '#manifiesto'],
  ];

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 30,
        background: scrolled ? 'rgba(6,36,36,.88)' : 'rgba(6,36,36,.4)',
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${scrolled ? C.PETROL7 : 'transparent'}`,
        transition: 'all .25s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px clamp(20px,5vw,64px)',
      }}
    >
      <a href="#top" style={{ display: 'flex' }}>
        <WLogo dark w={132} />
      </a>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(14px,2.4vw,30px)' }}>
        <div className="navlinks" style={{ display: 'flex', gap: 'clamp(14px,2.2vw,28px)' }}>
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              style={{ ...meta, color: C.BODY, textDecoration: 'none', fontSize: 12.5 }}
            >
              {label}
            </a>
          ))}
        </div>
        <button
          onClick={onContact}
          className="navlinks"
          style={{ ...meta, color: C.BODY, fontSize: 12.5, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          Contacto
        </button>
        <button
          onClick={onComunidad}
          style={{ ...meta, color: C.CAL, fontSize: 12.5, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          Comunidad
        </button>
        <WBtn onClick={onJoin}>Únete</WBtn>
      </div>
    </nav>
  );
}
