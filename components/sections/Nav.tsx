'use client';
import { useState, useEffect } from 'react';
import { WLogo } from '@/components/ui/WLogo';
import { WBtn } from '@/components/ui/WBtn';
import { InstagramLink } from '@/components/ui/InstagramLink';
import { C, FONT, meta } from '@/lib/tokens';

interface NavProps {
  onJoin: () => void;
  onComunidad: () => void;
}

const links: [string, string][] = [
  ['Eventos', '#eventos'],
  ['Territorios', '#territorios'],
  ['Manifiesto', '#manifiesto'],
  ['Contacto', '#contacto'],
];

export function Nav({ onJoin, onComunidad }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 12);
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          background: scrolled || menuOpen ? 'rgba(6,36,36,.92)' : 'rgba(6,36,36,.4)',
          backdropFilter: 'blur(10px)',
          borderBottom: `1px solid ${scrolled ? C.PETROL7 : 'transparent'}`,
          transition: 'all .25s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px clamp(20px,5vw,64px)',
        }}
      >
        <a href="#top" style={{ display: 'flex' }} onClick={() => setMenuOpen(false)}>
          <WLogo dark w={132} />
        </a>

        {/* Desktop menu */}
        <div
          className="nav-desktop"
          style={{ display: 'flex', alignItems: 'center', gap: 'clamp(14px,2.4vw,30px)' }}
        >
          <div style={{ display: 'flex', gap: 'clamp(14px,2.2vw,28px)' }}>
            {links.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="nav-link"
                style={{ ...meta, color: C.BODY, textDecoration: 'none', fontSize: 12.5 }}
              >
                {label}
              </a>
            ))}
          </div>
          <button
            onClick={onComunidad}
            className="nav-link"
            style={{
              ...meta,
              color: C.CAL,
              fontSize: 12.5,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            Comunidad
          </button>
          <InstagramLink size={19} />
          <WBtn onClick={onJoin}>Únete</WBtn>
        </div>

        {/* Mobile hamburger */}
        <button
          className="nav-hamburger"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
          style={{
            display: 'none',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 5,
            width: 40,
            height: 40,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
          }}
        >
          <span
            style={{
              display: 'block',
              height: 2,
              width: 22,
              background: C.CAL,
              borderRadius: 2,
              transition: 'transform .25s, opacity .2s',
              transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
            }}
          />
          <span
            style={{
              display: 'block',
              height: 2,
              width: 22,
              background: C.CAL,
              borderRadius: 2,
              transition: 'opacity .2s',
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              display: 'block',
              height: 2,
              width: 22,
              background: C.CAL,
              borderRadius: 2,
              transition: 'transform .25s, opacity .2s',
              transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
            }}
          />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className="mobile-drawer"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 39,
          background: 'rgba(6,36,36,.98)',
          backdropFilter: 'blur(12px)',
          display: menuOpen ? 'flex' : 'none',
          flexDirection: 'column',
          padding: '100px clamp(24px,6vw,40px) clamp(24px,6vw,40px)',
          gap: 4,
        }}
      >
        {links.map(([label, href], i) => (
          <a
            key={label}
            href={href}
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: 28,
              letterSpacing: '-.02em',
              color: C.CAL,
              textDecoration: 'none',
              padding: '16px 0',
              borderBottom: `1px solid ${C.PETROL7}`,
            }}
          >
            <span
              style={{ color: C.MINT, fontSize: 14, fontWeight: 500, marginRight: 14 }}
            >
              0{i + 1}
            </span>
            {label}
          </a>
        ))}

        <button
          onClick={() => {
            setMenuOpen(false);
            onComunidad();
          }}
          style={{
            fontFamily: FONT,
            fontWeight: 700,
            fontSize: 28,
            letterSpacing: '-.02em',
            color: C.CAL,
            background: 'none',
            border: 'none',
            textAlign: 'left',
            padding: '16px 0',
            borderBottom: `1px solid ${C.PETROL7}`,
            cursor: 'pointer',
          }}
        >
          <span style={{ color: C.MINT, fontSize: 14, fontWeight: 500, marginRight: 14 }}>
            05
          </span>
          Comunidad
        </button>

        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            paddingTop: 32,
          }}
        >
          <div
            onClick={() => {
              setMenuOpen(false);
              onJoin();
            }}
          >
            <WBtn onClick={onJoin}>Únete a la comunidad</WBtn>
          </div>
          <InstagramLink size={22} label />
        </div>
      </div>
    </>
  );
}
