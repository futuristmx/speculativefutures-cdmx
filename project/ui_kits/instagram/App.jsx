/* Instagram kit — interactive shell: template gallery + feed mock */
const { useState, useRef, useEffect } = React;
const C = window.SF_COLORS;

const TEMPLATES = [
  { id: 'cover', label: 'Cover / Lanzamiento', node: <CoverTemplate /> },
  { id: 'senal', label: 'Señal', node: <SenalTemplate /> },
  { id: 'voz', label: 'Voz', node: <VozTemplate /> },
  { id: 'pregunta', label: 'Pregunta', node: <PreguntaTemplate /> },
  { id: 'evento', label: 'Evento', node: <EventoTemplate /> },
  { id: 'idea', label: 'Idea ancla', node: <IdeaTemplate /> },
];

function Scaled({ scale, children }) {
  return (
    <div style={{ width: 1080 * scale, height: 1350 * scale, overflow: 'hidden', flex: '0 0 auto' }}>
      <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left', width: 1080, height: 1350 }}>
        {children}
      </div>
    </div>
  );
}

const meta = { fontFamily: "'Gotham',sans-serif", fontWeight: 500, fontSize: 12, letterSpacing: '.08em', textTransform: 'uppercase', color: C.SLATE };

function Rail({ view, setView }) {
  return (
    <div style={{ width: 264, flex: '0 0 264px', borderRight: '1px solid #114442', padding: '28px 22px', display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ ...meta, marginBottom: 12 }}>Plantillas maestras</div>
      {TEMPLATES.map((t, i) => {
        const on = view === t.id;
        return (
          <button key={t.id} onClick={() => setView(t.id)} style={{
            display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left', cursor: 'pointer',
            background: on ? '#0B3331' : 'transparent', border: `1px solid ${on ? '#114442' : 'transparent'}`,
            borderRadius: 6, padding: '11px 12px', color: on ? C.CAL : C.BODY, fontFamily: "'Gotham',sans-serif",
            fontWeight: on ? 700 : 500, fontSize: 14.5 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: on ? C.MINT : C.EMERALD, flex: '0 0 8px' }} />
            <span style={{ ...meta, color: on ? C.MINT : C.SLATE, fontSize: 11, width: 22 }}>{String(i + 1).padStart(2, '0')}</span>
            {t.label}
          </button>
        );
      })}
      <div style={{ height: 1, background: '#114442', margin: '14px 0' }} />
      <button onClick={() => setView('feed')} style={{
        display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left', cursor: 'pointer',
        background: view === 'feed' ? '#0B3331' : 'transparent', border: `1px solid ${view === 'feed' ? '#114442' : 'transparent'}`,
        borderRadius: 6, padding: '11px 12px', color: view === 'feed' ? C.CAL : C.BODY, fontFamily: "'Gotham',sans-serif",
        fontWeight: view === 'feed' ? 700 : 500, fontSize: 14.5 }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: view === 'feed' ? C.MINT : C.EMERALD, flex: '0 0 8px' }} />
        Vista de feed
      </button>
    </div>
  );
}

function Stage({ view, setView }) {
  if (view === 'feed') return <FeedMock setView={setView} />;
  const t = TEMPLATES.find(x => x.id === view);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, overflow: 'auto' }}>
      <div style={{ ...meta, marginBottom: 16 }}>{t.label} · 4:5 · 1080 × 1350</div>
      <div style={{ border: '1px solid #114442', borderRadius: 10, overflow: 'hidden', boxShadow: '0 0 0 1px rgba(0,0,0,.2)' }}>
        <Scaled scale={0.46}>{t.node}</Scaled>
      </div>
    </div>
  );
}

function FeedMock({ setView }) {
  return (
    <div style={{ flex: 1, overflow: 'auto', display: 'flex', justifyContent: 'center', padding: '36px 20px' }}>
      <div style={{ width: 560 }}>
        {/* profile header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 26, marginBottom: 22 }}>
          <div style={{ width: 88, height: 88, borderRadius: '50%', border: `2px solid ${C.MINT}`, display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.PETROL }}>
            <Isotype size={48} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 10 }}>
              <span style={{ fontFamily: "'Gotham',sans-serif", fontWeight: 500, fontSize: 19, color: C.CAL }}>futures_mex</span>
              <span style={{ fontFamily: "'Gotham',sans-serif", fontWeight: 500, fontSize: 13, background: C.MINT, color: C.PETROL, padding: '7px 16px', borderRadius: 6 }}>Únete</span>
            </div>
            <div style={{ display: 'flex', gap: 26 }}>
              {[['—', 'posts'], ['0', 'seguidores'], ['1', 'siguiendo']].map(([n, l]) => (
                <span key={l} style={{ fontSize: 13, color: C.BODY, fontFamily: "'Gotham',sans-serif" }}><strong style={{ color: C.CAL, fontWeight: 700 }}>{n}</strong> {l}</span>
              ))}
            </div>
          </div>
        </div>
        <div style={{ fontFamily: "'Gotham',sans-serif", fontSize: 14.5, lineHeight: 1.55, color: C.BODY, marginBottom: 8 }}>
          <strong style={{ color: C.CAL, fontWeight: 700 }}>Speculative Futures CDMX</strong><br />
          Comunidad para imaginar, cuestionar y activar futuros posibles desde CDMX.<br />
          Foresight · diseño especulativo · innovación · cultura · ciudad · tecnología.<br />
          <span style={{ color: C.SLATE }}>📍 Ciudad de México · capítulo de @speculativefutures</span>
        </div>
        <div style={{ ...meta, margin: '8px 0 18px', color: C.MINT }}>👇 Únete / propón una conversación</div>
        <div style={{ height: 1, background: '#114442', marginBottom: 4 }} />
        {/* grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 4 }}>
          {TEMPLATES.map(t => (
            <button key={t.id} onClick={() => setView(t.id)} title={t.label} style={{ padding: 0, border: 'none', cursor: 'pointer', background: 'none', position: 'relative', display: 'block' }}>
              <Scaled scale={184 / 1080}>{t.node}</Scaled>
            </button>
          ))}
        </div>
        <div style={{ ...meta, marginTop: 16, textAlign: 'center' }}>Toca un post para abrir su plantilla</div>
      </div>
    </div>
  );
}

function App() {
  const [view, setView] = useState('cover');
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: C.PETROL, color: C.CAL, fontFamily: "'Gotham',sans-serif" }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 28px', borderBottom: '1px solid #114442', flex: '0 0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Isotype size={40} />
          <div>
            <div style={{ fontFamily: "'Gotham',sans-serif", fontWeight: 700, fontSize: 16, letterSpacing: '.01em' }}>Motor de plantillas · Instagram</div>
            <div style={{ ...meta, marginTop: 3 }}>@futures_mex · 6 plantillas maestras</div>
          </div>
        </div>
        <span style={{ ...meta }}>19.4326° N · 99.1332° W</span>
      </header>
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        <Rail view={view} setView={setView} />
        <Stage view={view} setView={setView} />
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
