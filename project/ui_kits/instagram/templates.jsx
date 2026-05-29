/* ============================================================================
   Speculative Futures CDMX — Instagram master templates
   6 templates · 4:5 · 1080×1350. Two grounds (petróleo / esmeralda), Gotham.
   Each renders at native 1080×1350; scale the wrapper to fit.
   ============================================================================ */
const { useState } = React;

const PETROL = '#062424', PETROL8 = '#0B3331', SLATE = '#547476',
      EMERALD = '#439973', MINT = '#66EBAC', CAL = '#F4F7F5', BODY = '#C4D6CF';

/* ---- ground themes -------------------------------------------------------
   Two backgrounds so the feed isn't all dark. On esmeralda we flip to dark
   petrol ink for contrast and drop mint (too close in hue) for solid petrol. */
function theme(ground) {
  if (ground === 'emerald') {
    return {
      ground: 'emerald', bg: EMERALD,
      head: PETROL, headMute: 'rgba(6,36,36,.74)', body: 'rgba(6,36,36,.82)',
      eyebrow: PETROL, meta: 'rgba(6,36,36,.62)',
      hair: 'rgba(6,36,36,.09)', line: 'rgba(6,36,36,.26)',
      accent: PETROL, iso: { tri: PETROL, stroke: PETROL, node: EMERALD },
      tagBorder: 'rgba(6,36,36,.30)', tagActive: PETROL, tagDot: PETROL, tagText: 'rgba(6,36,36,.82)',
      chipBg: PETROL, chipText: MINT,
    };
  }
  return {
    ground: 'petrol', bg: PETROL,
    head: CAL, headMute: 'rgba(196,214,207,.85)', body: BODY,
    eyebrow: MINT, meta: SLATE,
    hair: 'rgba(84,116,118,.07)', line: '#114442',
    accent: MINT, iso: { tri: EMERALD, stroke: EMERALD, node: PETROL },
    tagBorder: '#114442', tagActive: MINT, tagDot: EMERALD, tagText: BODY,
    chipBg: MINT, chipText: PETROL,
  };
}

/* ---- shared atoms -------------------------------------------------------- */
function Isotype({ size = 92, iso = { tri: EMERALD, stroke: EMERALD, node: PETROL } }) {
  return (
    <svg width={size} height={size * (150 / 165)} viewBox="0 0 165 150" aria-label="SF CDMX">
      <polygon points="33.51 48.75 139.57 24.09 107.74 128.8" fill={iso.tri} />
      <circle cx="84.95" cy="85.8" r="25.79" fill={iso.node} stroke={iso.stroke} strokeWidth="3" />
    </svg>
  );
}

const igFrame = {
  position: 'relative', width: 1080, height: 1350,
  fontFamily: "'Gotham', system-ui, sans-serif", overflow: 'hidden',
  WebkitFontSmoothing: 'antialiased',
};

function metaStyle(T) {
  return {
    fontFamily: "'Gotham', sans-serif", fontWeight: 500, fontSize: 22,
    letterSpacing: '.08em', textTransform: 'uppercase', color: T.meta,
  };
}

function CoordBar({ T, left = '19.4326° N · 99.1332° W', right = '2026.05.29' }) {
  return (
    <div style={{ position: 'absolute', left: 80, right: 80, bottom: 70,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      borderTop: `1px solid ${T.line}`, paddingTop: 22 }}>
      <span style={metaStyle(T)}>{left}</span>
      <span style={metaStyle(T)}>{right}</span>
    </div>
  );
}

/* TemplateFrame: ground + hairlines + corner isotype + coord bar + content slot.
   Passes the resolved theme T down to children via render-prop. */
function TemplateFrame({ children, ground = 'petrol', corner = true, coords = true, coordProps = {}, pad = 80 }) {
  const T = theme(ground);
  const hairlineStyle = {
    position: 'absolute', inset: 0, pointerEvents: 'none',
    backgroundImage:
      `repeating-linear-gradient(to right, ${T.hair} 0 1px, transparent 1px 135px),` +
      `repeating-linear-gradient(to bottom, ${T.hair} 0 1px, transparent 1px 135px)`,
  };
  return (
    <div style={{ ...igFrame, background: T.bg, color: T.head }}>
      <div style={hairlineStyle} />
      {corner && <div style={{ position: 'absolute', top: pad, left: pad }}><Isotype size={84} iso={T.iso} /></div>}
      <div style={{ position: 'relative', height: '100%', padding: pad, display: 'flex', flexDirection: 'column' }}>
        {typeof children === 'function' ? children(T) : children}
      </div>
      {coords && <CoordBar T={T} {...coordProps} />}
    </div>
  );
}

function TerritoryTag({ T = theme('petrol'), label, active = false }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', fontFamily: "'Gotham', sans-serif",
      fontWeight: 500, fontSize: 21, letterSpacing: '.1em', textTransform: 'uppercase',
      padding: '13px 26px', border: `1px solid ${active ? T.tagActive : T.tagBorder}`, borderRadius: 999,
      color: active ? T.tagActive : T.tagText }}>
      <span style={{ width: 10, height: 10, borderRadius: '50%', background: active ? T.tagActive : T.tagDot, marginRight: 14 }} />
      {label}
    </span>
  );
}

/* ============================ 1 · COVER ================================== */
function CoverTemplate({
  claim = 'Futuros posibles desde la Ciudad de México',
  sub = 'Comunidad interdisciplinaria de foresight, diseño, innovación y cultura para imaginar la ciudad que viene.',
}) {
  return (
    <TemplateFrame ground="petrol">
      {(T) => (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: 40 }}>
          <h1 style={{ fontFamily: "'Gotham', sans-serif", fontWeight: 900, fontSize: 104, lineHeight: .98,
            letterSpacing: '-.025em', color: T.accent, margin: 0, maxWidth: 880, textWrap: 'balance' }}>
            {claim}
          </h1>
          <p style={{ fontFamily: "'Gotham', sans-serif", fontWeight: 500, fontSize: 32, lineHeight: 1.5,
            color: T.head, marginTop: 40, maxWidth: 760 }}>{sub}</p>
        </div>
      )}
    </TemplateFrame>
  );
}

/* ============================ 2 · SEÑAL ================================= */
function SenalTemplate({
  date = '2026.05.21', title = 'Microfábricas de barrio',
  territory = 'Ciudad & Sistemas Vivos',
  implication = 'Manufactura distribuida a escala de cuadra: nuevas economías locales en tensión con una zonificación pensada para otra ciudad.',
}) {
  return (
    <TemplateFrame ground="emerald" coordProps={{ right: date.replace(/-/g, '.') }}>
      {(T) => (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 44 }}>
            <span style={{ ...metaStyle(T), color: T.eyebrow, fontWeight: 700, fontSize: 24 }}>Señal</span>
            <span style={{ width: 64, height: 1, background: T.line }} />
            <span style={{ ...metaStyle(T), fontSize: 24 }}>{date.replace(/-/g, '.')}</span>
          </div>
          <h1 style={{ fontFamily: "'Gotham', sans-serif", fontWeight: 700, fontSize: 92, lineHeight: 1.02,
            letterSpacing: '-.02em', color: T.head, margin: '0 0 40px', maxWidth: 880 }}>{title}</h1>
          <div style={{ marginBottom: 40 }}><TerritoryTag T={T} label={territory} /></div>
          <p style={{ fontFamily: "'Gotham', sans-serif", fontWeight: 500, fontSize: 34, lineHeight: 1.55,
            color: T.body, margin: 0, maxWidth: 800 }}>{implication}</p>
        </div>
      )}
    </TemplateFrame>
  );
}

/* ============================ 3 · VOZ ================================== */
function VozTemplate({
  name = 'Voz emergente', role = 'Diseñadora de futuros · CDMX',
  territory = 'Futuros & Foresight',
  bio = 'Investiga imaginarios urbanos y prototipa servicios para escenarios de escasez de agua.',
}) {
  return (
    <TemplateFrame ground="petrol">
      {(T) => (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* duotone-green portrait placeholder */}
          <div style={{ width: 360, height: 360, borderRadius: 8, marginBottom: 48, position: 'relative',
            overflow: 'hidden', background: `linear-gradient(150deg, ${PETROL8}, ${EMERALD})`,
            border: '1px solid #114442' }}>
            <div style={{ position: 'absolute', left: '50%', bottom: -40, width: 200, height: 200,
              borderRadius: '50% 50% 0 0', background: MINT, opacity: .35, transform: 'translateX(-50%)' }} />
            <span style={{ position: 'absolute', top: 20, left: 22, ...metaStyle(T), fontSize: 18 }}>Retrato · duotono</span>
          </div>
          <div style={{ ...metaStyle(T), color: T.eyebrow, fontWeight: 700, marginBottom: 16 }}>Voz</div>
          <h1 style={{ fontFamily: "'Gotham', sans-serif", fontWeight: 900, fontSize: 96, lineHeight: .98,
            letterSpacing: '-.025em', color: T.head, margin: '0 0 20px' }}>{name}</h1>
          <div style={{ ...metaStyle(T), fontSize: 26, marginBottom: 36 }}>{role}</div>
          <div style={{ marginBottom: 36 }}><TerritoryTag T={T} label={territory} /></div>
          <p style={{ fontFamily: "'Gotham', sans-serif", fontWeight: 500, fontSize: 32, lineHeight: 1.5,
            color: T.body, margin: 0, maxWidth: 800 }}>{bio}</p>
        </div>
      )}
    </TemplateFrame>
  );
}

/* ============================ 4 · PREGUNTA ============================= */
function PreguntaTemplate({
  question = '¿Qué economías nacen cuando la ciudad fabrica lo que consume?',
  eje = 'fabrica',
}) {
  const parts = question.split(new RegExp(`(${eje})`, 'i'));
  return (
    <TemplateFrame ground="emerald">
      {(T) => (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ ...metaStyle(T), color: T.eyebrow, fontWeight: 700, marginBottom: 56 }}>Pregunta</div>
          <h1 style={{ fontFamily: "'Gotham', sans-serif", fontWeight: 700, fontSize: 88, lineHeight: 1.08,
            letterSpacing: '-.02em', color: T.headMute, margin: 0, maxWidth: 860 }}>
            {parts.map((p, i) => p.toLowerCase() === eje.toLowerCase()
              ? <span key={i} style={{ color: T.accent }}>{p}</span> : <span key={i}>{p}</span>)}
          </h1>
        </div>
      )}
    </TemplateFrame>
  );
}

/* ============================ 5 · EVENTO =============================== */
function EventoTemplate({
  day = '26', month = 'JUN', time = '19:30',
  title = 'Señales débiles: leer la ciudad que viene',
  place = 'Presencial · Colonia Roma, CDMX', cta = 'Reserva tu lugar',
}) {
  return (
    <TemplateFrame ground="petrol">
      {(T) => (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ ...metaStyle(T), color: T.eyebrow, fontWeight: 700, marginBottom: 28 }}>Evento</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 28, marginBottom: 8 }}>
            <span style={{ fontFamily: "'Gotham', sans-serif", fontWeight: 900, fontSize: 220, lineHeight: .82,
              letterSpacing: '-.03em', color: T.accent }}>{day}</span>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontFamily: "'Gotham', sans-serif", fontWeight: 700, fontSize: 64, color: T.head, letterSpacing: '.02em' }}>{month}</span>
              <span style={{ ...metaStyle(T), fontSize: 28, marginTop: 10 }}>{time} h</span>
            </div>
          </div>
          <h1 style={{ fontFamily: "'Gotham', sans-serif", fontWeight: 700, fontSize: 72, lineHeight: 1.08,
            letterSpacing: '-.02em', color: T.head, margin: '40px 0 22px', maxWidth: 820 }}>{title}</h1>
          <div style={{ ...metaStyle(T), fontSize: 26, marginBottom: 56 }}>{place}</div>
          <a style={{ alignSelf: 'flex-start', fontFamily: "'Gotham', sans-serif", fontWeight: 500, fontSize: 30,
            background: T.chipBg, color: T.chipText, padding: '24px 48px', borderRadius: 6, textDecoration: 'none' }}>{cta}</a>
        </div>
      )}
    </TemplateFrame>
  );
}

/* ============================ 6 · IDEA ANCLA =========================== */
function IdeaTemplate({
  phrase = 'Creemos en la imaginación como infraestructura: estratégica, cultural y cívica.',
  eje = 'infraestructura', attribution = 'Speculative Futures CDMX',
}) {
  const parts = phrase.split(new RegExp(`(${eje})`, 'i'));
  return (
    <TemplateFrame ground="emerald">
      {(T) => (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ ...metaStyle(T), color: T.eyebrow, fontWeight: 700, marginBottom: 48 }}>Idea ancla</div>
          <h1 style={{ fontFamily: "'Gotham', sans-serif", fontWeight: 700, fontSize: 84, lineHeight: 1.12,
            letterSpacing: '-.02em', color: T.headMute, margin: 0, maxWidth: 880 }}>
            {parts.map((p, i) => p.toLowerCase() === eje.toLowerCase()
              ? <span key={i} style={{ color: T.accent }}>{p}</span> : <span key={i}>{p}</span>)}
          </h1>
          <div style={{ ...metaStyle(T), marginTop: 64 }}>— {attribution}</div>
        </div>
      )}
    </TemplateFrame>
  );
}

Object.assign(window, {
  Isotype, TemplateFrame, TerritoryTag, CoordBar,
  CoverTemplate, SenalTemplate, VozTemplate, PreguntaTemplate, EventoTemplate, IdeaTemplate,
  SF_COLORS: { PETROL, PETROL8, SLATE, EMERALD, MINT, CAL, BODY },
});
