import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { WTag } from '@/components/ui/WTag';
import { Duotone } from '@/components/ui/Duotone';
import { C, FONT, meta } from '@/lib/tokens';

const VOCES = [
  { name: 'Voz emergente', role: 'Diseñadora de futuros', terr: 'Futuros & Foresight', bio: 'Investiga imaginarios urbanos y prototipos de servicios para escenarios de escasez de agua.' },
  { name: 'Investigador urbano', role: 'Sistemas vivos · CDMX', terr: 'Ciudad & Sistemas Vivos', bio: 'Mapea infraestructuras informales como prototipos de la ciudad que viene.' },
  { name: 'Tecnóloga cívica', role: 'IA & contexto local', terr: 'Tecnologías Emergentes', bio: 'Construye herramientas de IA con memoria de barrio y gobernanza comunitaria.' },
];

export function Voces() {
  return (
    <section
      id="voces"
      style={{ background: C.PETROL8, borderTop: `1px solid ${C.PETROL7}`, padding: 'clamp(64px,9vw,112px) clamp(20px,5vw,64px)' }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Reveal><Eyebrow ix="05" label="Voces" /></Reveal>
        <Reveal
          as="h2"
          delay={60}
          style={{ fontFamily: FONT, fontWeight: 700, fontSize: 'clamp(28px,4vw,40px)', lineHeight: 1.1, letterSpacing: '-.02em', color: C.CAL, margin: '24px 0 0', maxWidth: 620 }}
        >
          Quienes piensan, investigan y construyen futuros
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 20, marginTop: 40 }}>
          {VOCES.map((v, i) => (
            <Reveal key={v.name} delay={i * 80}>
              <article
                className="voz-card"
                style={{ background: C.PETROL, border: `1px solid ${C.PETROL7}`, borderRadius: 8, padding: 18, height: '100%', transition: 'border-color .18s, transform .18s' }}
              >
                <Duotone ratio="4 / 3" label={`retrato · ${v.name.toLowerCase()}`} radius={6} seed={i} />
                <div style={{ padding: '18px 8px 8px' }}>
                  <h3 style={{ fontFamily: FONT, fontWeight: 700, fontSize: 19, color: C.CAL, margin: '0 0 4px' }}>{v.name}</h3>
                  <div style={{ ...meta, fontSize: 11.5, marginBottom: 14 }}>{v.role}</div>
                  <WTag label={v.terr} />
                  <p style={{ fontFamily: FONT, fontWeight: 500, fontSize: 14.5, lineHeight: 1.55, color: C.BODY, margin: '16px 0 14px' }}>{v.bio}</p>
                  <a href="#" style={{ fontFamily: FONT, fontWeight: 400, fontSize: 14, color: C.MINT, textDecoration: 'underline', textUnderlineOffset: '4px' }}>
                    Ver perfil →
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
