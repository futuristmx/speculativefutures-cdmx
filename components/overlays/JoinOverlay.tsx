'use client';
import { useState, useEffect } from 'react';
import { Overlay } from './Overlay';
import { WIsotype } from '@/components/ui/WIsotype';
import { WBtn } from '@/components/ui/WBtn';
import { C, FONT, meta } from '@/lib/tokens';

interface JoinOverlayProps {
  open: boolean;
  onClose: () => void;
}

export function JoinOverlay({ open, onClose }: JoinOverlayProps) {
  const [sent, setSent] = useState(false);
  useEffect(() => { if (open) setSent(false); }, [open]);
  if (!open) return null;

  return (
    <Overlay onClose={onClose}>
      <div style={{ marginBottom: 18 }}><WIsotype size={46} /></div>
      {!sent ? (
        <>
          <h3 style={{ fontFamily: FONT, fontWeight: 700, fontSize: 26, color: C.CAL, margin: '0 0 10px', letterSpacing: '-.01em' }}>
            Únete a la comunidad
          </h3>
          <p style={{ fontFamily: FONT, fontWeight: 500, fontSize: 15, lineHeight: 1.55, color: C.BODY, margin: '0 0 24px' }}>
            Te avisamos de señales, voces y eventos. Sin ruido.
          </p>
          <label style={{ ...meta, color: C.BODY, display: 'block', marginBottom: 8 }}>Correo</label>
          <input
            placeholder="tu@correo.com"
            style={{
              width: '100%',
              background: C.PETROL,
              border: `1px solid ${C.SLATE}`,
              borderRadius: 4,
              padding: '13px 14px',
              color: C.CAL,
              fontFamily: FONT,
              fontSize: 15,
              outline: 'none',
              marginBottom: 20,
            }}
            onFocus={(e) => (e.target.style.borderColor = C.MINT)}
            onBlur={(e) => (e.target.style.borderColor = C.SLATE)}
          />
          <WBtn onClick={() => setSent(true)}>Quiero participar</WBtn>
        </>
      ) : (
        <>
          <h3 style={{ fontFamily: FONT, fontWeight: 700, fontSize: 26, color: C.MINT, margin: '0 0 10px', letterSpacing: '-.01em' }}>
            Señal recibida.
          </h3>
          <p style={{ fontFamily: FONT, fontWeight: 500, fontSize: 15, lineHeight: 1.55, color: C.BODY, margin: 0 }}>
            Te escribimos pronto. Mientras, propón una conversación por DM en @futures_mex.
          </p>
        </>
      )}
    </Overlay>
  );
}
