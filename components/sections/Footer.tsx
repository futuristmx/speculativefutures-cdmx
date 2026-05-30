'use client';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { WLogo } from '@/components/ui/WLogo';
import { WBtn } from '@/components/ui/WBtn';
import { ContactForm } from '@/components/ui/ContactForm';
import { InstagramLink } from '@/components/ui/InstagramLink';
import { C, FONT, meta, HAIR } from '@/lib/tokens';

interface FooterProps {
  onJoin: () => void;
  onComunidad: () => void;
  showGrid?: boolean;
}

export function Footer({ onJoin, onComunidad, showGrid = true }: FooterProps) {
  return (
    <footer
      id="contacto"
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
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 'clamp(56px,8vw,88px)' }}>
            <WBtn onClick={onJoin}>Únete a la comunidad</WBtn>
            <WBtn variant="ghost" onClick={onComunidad}>Entrar a la comunidad</WBtn>
          </div>
        </Reveal>

        {/* Contacto inline */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0,.9fr) minmax(0,1.1fr)',
            gap: 'clamp(24px,5vw,72px)',
            paddingTop: 'clamp(40px,5vw,56px)',
            paddingBottom: 'clamp(48px,7vw,80px)',
            borderTop: `1px solid ${C.PETROL7}`,
            alignItems: 'start',
          }}
          className="event-grid"
        >
          <Reveal>
            <Eyebrow ix="06" label="Contacto" />
            <h3 style={{ fontFamily: FONT, fontWeight: 700, fontSize: 'clamp(24px,3.4vw,34px)', lineHeight: 1.1, letterSpacing: '-.02em', color: C.CAL, margin: '24px 0 14px', maxWidth: 420 }}>
              Escríbenos
            </h3>
            <p style={{ fontFamily: FONT, fontWeight: 500, fontSize: 16, lineHeight: 1.6, color: C.BODY, margin: '0 0 20px', maxWidth: 400 }}>
              ¿Quieres participar, proponer un tema o colaborar? Mándanos un mensaje y te respondemos pronto.
            </p>
            <a
              href="mailto:speculativefuturescdmx@gmail.com"
              style={{ ...meta, color: C.MINT, textDecoration: 'none' }}
            >
              speculativefuturescdmx@gmail.com
            </a>
          </Reveal>
          <Reveal delay={80}>
            <ContactForm />
          </Reveal>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20, paddingTop: 28, borderTop: `1px solid ${C.PETROL7}` }}>
          <WLogo dark />
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(20px,4vw,40px)', flexWrap: 'wrap' }}>
            <InstagramLink size={20} label />
            <div style={{ textAlign: 'right' }}>
              <div style={{ ...meta, color: C.MINT }}>Señales entre el ruido</div>
              <div style={{ ...meta, marginTop: 6 }}>19.4326° N · 99.1332° W · EST. 2026</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
