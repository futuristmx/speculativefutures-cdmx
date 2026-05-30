'use client';
import { Overlay } from './Overlay';
import { WIsotype } from '@/components/ui/WIsotype';
import { ContactForm } from '@/components/ui/ContactForm';
import { C, FONT } from '@/lib/tokens';

interface ContactFormOverlayProps {
  open: boolean;
  onClose: () => void;
}

export function ContactFormOverlay({ open, onClose }: ContactFormOverlayProps) {
  if (!open) return null;

  return (
    <Overlay onClose={onClose} width={480}>
      <div style={{ marginBottom: 18 }}><WIsotype size={42} /></div>
      <h3 style={{ fontFamily: FONT, fontWeight: 700, fontSize: 24, color: C.CAL, margin: '0 0 8px', letterSpacing: '-.01em' }}>
        Más información
      </h3>
      <p style={{ fontFamily: FONT, fontWeight: 500, fontSize: 15, lineHeight: 1.55, color: C.BODY, margin: '0 0 24px' }}>
        Cuéntanos quién eres y qué te interesa. Te respondemos pronto.
      </p>
      <ContactForm compact />
    </Overlay>
  );
}
