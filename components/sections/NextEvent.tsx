import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { WBtn } from '@/components/ui/WBtn';
import { NodeNetwork } from '@/components/ui/NodeNetwork';
import { C, FONT, meta } from '@/lib/tokens';

interface NextEventProps {
  onJoin: () => void;
}

export function NextEvent({ onJoin }: NextEventProps) {
  return (
    <section
      id="eventos"
      style={{
        background: C.PETROL8,
        borderTop: `1px solid ${C.PETROL7}`,
        padding: 'clamp(64px,9vw,112px) clamp(20px,5vw,64px)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Reveal><Eyebrow ix="01" label="Próximo evento" /></Reveal>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.25fr)',
            gap: 'clamp(24px,4vw,56px)',
            alignItems: 'center',
            marginTop: 36,
          }}
          className="event-grid"
        >
          <Reveal>
            <div style={{ height: 2, width: 48, background: C.MINT, marginBottom: 24 }} />
            <div style={{ ...meta, color: C.MINT, fontSize: 14, marginBottom: 14 }}>Jue 26 jun · 19:30</div>
            <h2
              style={{
                fontFamily: FONT,
                fontWeight: 700,
                fontSize: 'clamp(28px,4vw,40px)',
                lineHeight: 1.08,
                letterSpacing: '-.02em',
                color: C.CAL,
                margin: '0 0 16px',
              }}
            >
              Señales débiles: leer la ciudad que viene
            </h2>
            <div style={{ ...meta, fontSize: 13, marginBottom: 20 }}>
              Presencial · Colonia Roma, CDMX · Cupo limitado
            </div>
            <p
              style={{
                fontFamily: FONT,
                fontWeight: 500,
                fontSize: 16,
                lineHeight: 1.6,
                color: C.BODY,
                maxWidth: 560,
                margin: '0 0 28px',
              }}
            >
              Una conversación sobre cómo detectar lo emergente en la trama urbana antes de que sea
              evidente — y qué hacemos con esas lecturas.
            </p>
            <WBtn onClick={onJoin}>Reserva tu lugar</WBtn>
          </Reveal>
          <div
            style={{
              border: `1px solid ${C.PETROL7}`,
              borderRadius: 8,
              overflow: 'hidden',
              background: C.PETROL,
              padding: '12px 14px',
            }}
          >
            <NodeNetwork height={420} />
          </div>
        </div>
      </div>
    </section>
  );
}
