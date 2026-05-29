import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { C, FONT, HAIR } from '@/lib/tokens';

const lines: [string, string, string][] = [
  ['La especulación responsable observa la realidad con profundidad, reconoce sus tensiones y explora posibilidades con ', 'consecuencias', '.'],
  ['Creemos en la imaginación como ', 'infraestructura', ': estratégica, cultural y cívica.'],
  ['Los futuros se imaginan, se disputan, se diseñan y ', 'se practican', '.'],
];

export function Manifesto({ showGrid = true }: { showGrid?: boolean }) {
  return (
    <section
      id="manifiesto"
      style={{ ...(showGrid ? HAIR : {}), borderTop: `1px solid ${C.PETROL7}`, padding: 'clamp(64px,9vw,118px) clamp(20px,5vw,64px)' }}
    >
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <Reveal><Eyebrow ix="03" label="Manifiesto" /></Reveal>
        <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 36 }}>
          {lines.map((l, i) => (
            <Reveal
              as="p"
              key={i}
              delay={i * 90}
              style={{ fontFamily: FONT, fontWeight: 500, fontSize: 'clamp(22px,3.2vw,30px)', lineHeight: 1.4, color: C.CAL, margin: 0 }}
            >
              {l[0]}<span style={{ color: C.MINT }}>{l[1]}</span>{l[2]}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
