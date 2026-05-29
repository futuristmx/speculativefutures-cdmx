'use client';
import { Reveal } from '@/components/ui/Reveal';
import { WLogo } from '@/components/ui/WLogo';
import { WBtn } from '@/components/ui/WBtn';
import { C, FONT, meta, HAIR } from '@/lib/tokens';

interface FooterProps {
  onJoin: () => void;
  onComunidad: () => void;
  showGrid?: boolean;
}

export function Footer({ onJoin, onComunidad, showGrid = true }: FooterProps) {
  return (
    <footer
      style={{ ...(showGrid ? HAIR : {}), borderTop: `1px solid ${C.PETROL7}`, padding: 'clamp(72px,10vw,120px) clamp(20px,5vw,64px) 56px' }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Reveal
          as="h2"
          style={{ fontFamily: FONT, fontWeight: 900, fontSize: 'clamp(34px,6vw,64px)', lineHeight: 1, letterSpacing: '-.025em', color: C.CAL, margin: '0 0 28px', maxWidth: 840 }}
        >
          Imagina y diseña lo que viene desde <span style={{ color: C.MINT }}>CDMX</span>.
        </Reveal>
        <Reveal delay={80}>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 72 }}>
            <WBtn onClick={onJoin}>Únete a la comunidad</WBtn>
            <WBtn variant="ghost" onClick={onComunidad}>Entrar a la comunidad</WBtn>
          </div>
        </Reveal>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20, paddingTop: 28, borderTop: `1px solid ${C.PETROL7}` }}>
          <WLogo dark />
          <div style={{ textAlign: 'right' }}>
            <div style={{ ...meta, color: C.MINT }}>Señal en lo oscuro</div>
            <div style={{ ...meta, marginTop: 6 }}>19.4326° N · 99.1332° W · EST. 2026</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
