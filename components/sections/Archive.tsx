'use client';
import { useState } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { WTag } from '@/components/ui/WTag';
import { C, FONT, meta } from '@/lib/tokens';

const TERRITORIES = ['Todas', 'Futuros & Foresight', 'Innovación & Negocios', 'Ciudad & Sistemas Vivos', 'Cultura & Sociedad', 'Tecnologías Emergentes'];

const SIGNALS = [
  { date: '2026.05.21', title: 'Microfábricas de barrio', terr: 'Ciudad & Sistemas Vivos', text: 'Manufactura distribuida a escala de cuadra. Implicación: nuevas economías locales y tensión con la zonificación.' },
  { date: '2026.05.14', title: 'Agua como interfaz cívica', terr: 'Ciudad & Sistemas Vivos', text: 'La escasez convierte el consumo de agua en un dato público y negociado. Nuevos servicios, nuevas fricciones.' },
  { date: '2026.05.07', title: 'Modelos pequeños, contexto grande', terr: 'Tecnologías Emergentes', text: 'La IA local y barata desplaza la conversación de la escala al contexto. Quién entrena con qué memoria de la ciudad.' },
  { date: '2026.04.30', title: 'Economías del cuidado', terr: 'Innovación & Negocios', text: 'El trabajo de sostener la vida se vuelve sector. Implicación: métricas, financiamiento y reconocimiento por diseñar.' },
  { date: '2026.04.23', title: 'Rituales sin templo', terr: 'Cultura & Sociedad', text: 'Comunidades que ensayan pertenencia fuera de las instituciones clásicas. Señal débil de nuevas formas cívicas.' },
  { date: '2026.04.16', title: 'Prospectiva de barrio', terr: 'Futuros & Foresight', text: 'Métodos de foresight aplicados a una cuadra, no a una nación. Escala íntima, decisiones reales.' },
];

export function Archive() {
  const [terr, setTerr] = useState('Todas');
  const list = terr === 'Todas' ? SIGNALS : SIGNALS.filter((s) => s.terr === terr);

  return (
    <section
      id="senales"
      style={{ background: C.CAL, color: C.INK9, padding: 'clamp(64px,9vw,112px) clamp(20px,5vw,64px)' }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Reveal><Eyebrow ix="04" label="Archivo de señales" light /></Reveal>
        <Reveal delay={60}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginTop: 24 }}>
            <h2 style={{ fontFamily: FONT, fontWeight: 700, fontSize: 'clamp(28px,4vw,40px)', lineHeight: 1.1, letterSpacing: '-.02em', color: C.INK9, margin: 0, maxWidth: 620 }}>
              Lo que empieza a cambiar, leído con disciplina
            </h2>
            <span style={{ ...meta, color: C.INK5 }}>{list.length} señales</span>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, margin: '32px 0 36px' }}>
            {TERRITORIES.map((t) => (
              <WTag key={t} label={t} light active={terr === t} onClick={() => setTerr(t)} />
            ))}
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 1, background: C.LINE, border: `1px solid ${C.LINE}` }}>
          {list.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 70}>
              <article
                className="signal-card"
                style={{ background: C.CAL, padding: '28px 26px', display: 'flex', flexDirection: 'column', height: '100%', transition: 'background .18s' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
                  <span style={{ ...meta, color: C.EMERALD }}>Señal</span>
                  <span style={{ ...meta, color: C.INK5 }}>{s.date}</span>
                </div>
                <h3 style={{ fontFamily: FONT, fontWeight: 700, fontSize: 21, lineHeight: 1.2, color: C.INK9, margin: '0 0 14px' }}>{s.title}</h3>
                <div style={{ marginBottom: 14 }}><WTag label={s.terr} light /></div>
                <p style={{ fontFamily: FONT, fontWeight: 500, fontSize: 14.5, lineHeight: 1.55, color: C.INK7, margin: '0 0 18px', flex: 1 }}>{s.text}</p>
                <a href="#" style={{ fontFamily: FONT, fontWeight: 400, fontSize: 14.5, color: C.EMERALD, textDecoration: 'underline', textUnderlineOffset: '3px', textDecorationThickness: '1px', alignSelf: 'flex-start' }}>
                  Leer la señal →
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
