'use client';
import { Overlay } from './Overlay';
import { WIsotype } from '@/components/ui/WIsotype';
import { WBtn } from '@/components/ui/WBtn';
import { C, FONT, meta } from '@/lib/tokens';

interface ComunidadOverlayProps {
  open: boolean;
  onClose: () => void;
  onJoin: () => void;
}

export function ComunidadOverlay({ open, onClose, onJoin }: ComunidadOverlayProps) {
  if (!open) return null;

  const fieldStyle: React.CSSProperties = {
    width: '100%',
    background: C.PETROL,
    border: `1px solid ${C.PETROL7}`,
    borderRadius: 4,
    padding: '13px 14px',
    color: C.SLATE,
    fontFamily: FONT,
    fontSize: 15,
    outline: 'none',
    cursor: 'not-allowed',
  };

  return (
    <Overlay onClose={onClose} width={440}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 22,
        }}
      >
        <WIsotype size={46} />
        <span
          style={{
            ...meta,
            color: C.PETROL,
            background: C.MINT,
            padding: '6px 12px',
            borderRadius: 999,
            fontSize: 11,
          }}
        >
          Próximamente
        </span>
      </div>
      <h3
        style={{
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: 26,
          color: C.CAL,
          margin: '0 0 10px',
          letterSpacing: '-.01em',
        }}
      >
        Entrar a la comunidad
      </h3>
      <p
        style={{
          fontFamily: FONT,
          fontWeight: 500,
          fontSize: 15,
          lineHeight: 1.55,
          color: C.BODY,
          margin: '0 0 26px',
        }}
      >
        La plataforma de la comunidad —señales, perfiles y conversaciones— abre pronto. El
        acceso aún no está disponible.
      </p>

      <div
        aria-hidden="true"
        style={{ opacity: 0.55, pointerEvents: 'none', userSelect: 'none' }}
      >
        <label style={{ ...meta, color: C.BODY, display: 'block', marginBottom: 8 }}>
          Correo
        </label>
        <input
          disabled
          placeholder="tu@correo.com"
          style={{ ...fieldStyle, marginBottom: 16 }}
        />
        <label style={{ ...meta, color: C.BODY, display: 'block', marginBottom: 8 }}>
          Contraseña
        </label>
        <input
          disabled
          type="password"
          placeholder="••••••••"
          style={{ ...fieldStyle, marginBottom: 22 }}
        />
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 500,
            fontSize: 15,
            padding: '13px 26px',
            borderRadius: 4,
            background: C.PETROL7,
            color: C.SLATE,
            textAlign: 'center',
          }}
        >
          Entrar
        </div>
      </div>

      <div
        style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '26px 0 18px' }}
      >
        <span style={{ height: 1, flex: 1, background: C.PETROL7 }} />
        <span style={{ ...meta, fontSize: 11 }}>mientras tanto</span>
        <span style={{ height: 1, flex: 1, background: C.PETROL7 }} />
      </div>
      <WBtn
        onClick={() => {
          onClose();
          onJoin();
        }}
      >
        Avísame cuando abra
      </WBtn>
    </Overlay>
  );
}
