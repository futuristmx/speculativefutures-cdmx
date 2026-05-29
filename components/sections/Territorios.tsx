import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { C, FONT, meta, HAIR } from '@/lib/tokens';

const TERR_DEFS: [string, string][] = [
  ['Futuros & Foresight', 'Métodos para anticipar, imaginar y disputar lo que viene.'],
  ['Innovación & Negocios', 'Modelos y economías que emergen cuando algo empieza a cambiar.'],
  ['Ciudad & Sistemas Vivos', 'Lo urbano leído como sistema que se adapta y se tensiona.'],
  ['Cultura & Sociedad', 'Cómo se mueven los imaginarios, los rituales y la pertenencia.'],
  ['Tecnologías Emergentes', 'Lo técnico entendido desde su contexto y sus consecuencias.'],
];

export function Territorios() {
  return (
    <section
      id="territorios"
      style={{ ...HAIR, borderTop: `1px solid ${C.PETROL7}`, padding: 'clamp(64px,9vw,112px) clamp(20px,5vw,64px)' }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Reveal><Eyebrow ix="02" label="Cinco territorios" /></Reveal>
        <Reveal
          as="h2"
          delay={60}
          style={{ fontFamily: FONT, fontWeight: 700, fontSize: 'clamp(28px,4vw,40px)', lineHeight: 1.1, letterSpacing: '-.02em', color: C.CAL, margin: '24px 0 8px', maxWidth: 680 }}
        >
          Lo que leemos, conectamos y convocamos
        </Reveal>
        <Reveal
          as="p"
          delay={120}
          style={{ fontFamily: FONT, fontWeight: 500, fontSize: 17, lineHeight: 1.6, color: C.BODY, margin: '0 0 40px', maxWidth: 560 }}
        >
          Una taxonomía fija. Cada señal, voz y evento se ancla a uno de estos cinco territorios.
        </Reveal>
        <div style={{ borderTop: `1px solid ${C.PETROL7}` }}>
          {TERR_DEFS.map(([name, desc], i) => (
            <Reveal key={name} delay={i * 70}>
              <div
                className="terr-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '64px minmax(0,1.1fr) minmax(0,1fr)',
                  gap: 'clamp(16px,3vw,40px)',
                  alignItems: 'center',
                  padding: '24px 0',
                  borderBottom: `1px solid ${C.PETROL7}`,
                }}
              >
                <span style={{ ...meta, color: C.SLATE, fontSize: 13 }}>0{i + 1}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', border: `1.5px solid ${C.EMERALD}`, flex: '0 0 8px' }} />
                  <h3 style={{ fontFamily: FONT, fontWeight: 700, fontSize: 'clamp(19px,2.4vw,24px)', color: C.CAL, margin: 0, letterSpacing: '-.01em' }}>{name}</h3>
                </div>
                <p style={{ fontFamily: FONT, fontWeight: 500, fontSize: 15, lineHeight: 1.5, color: C.BODY, margin: 0 }}>{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
