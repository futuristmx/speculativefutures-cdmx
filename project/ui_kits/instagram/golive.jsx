/* ============================================================================
   Speculative Futures CDMX — Los 6 posts del go-live
   Section §3 of the launch playbook, filled into petrol-ground frames.
   All six share: petróleo #062424, Gotham, ONE mint accent (the eje word),
   corner isotype, series marker 0X/06, coordinate-hairline footer.
   Each slide renders at native 1080×1350; scale the wrapper to fit.
   ============================================================================ */
const { useState: useStateG } = React;

const PETROL = '#062424', PETROL8 = '#0B3331', SLATE = '#547476',
      EMERALD = '#439973', MINT = '#66EBAC', CAL = '#F4F7F5', BODY = '#C4D6CF',
      LINE = '#114442';

const GF = "'Gotham', system-ui, sans-serif";

/* ---- shared atoms -------------------------------------------------------- */
function IsotypeG({ size = 84 }) {
  return (
    <svg width={size} height={size * (150 / 165)} viewBox="0 0 165 150" aria-label="SF CDMX" style={{ display: 'block' }}>
      <polygon points="33.51 48.75 139.57 24.09 107.74 128.8" fill={EMERALD} />
      <circle cx="84.95" cy="85.8" r="25.79" fill={PETROL} stroke={EMERALD} strokeWidth="3" />
    </svg>
  );
}

function Wordmark({ width = 360 }) {
  return (
    <svg width={width} height={width * (180 / 360)} viewBox="0 0 360 180" aria-label="Speculative Futures CDMX" style={{ display: 'block' }}>
      <polygon points="33.51 48.75 139.57 24.09 107.74 128.8" fill={EMERALD} />
      <circle cx="84.95" cy="85.8" r="25.79" fill={PETROL} stroke={EMERALD} strokeWidth="2.4" />
      <text transform="translate(132.36 101.11)" fontFamily={GF} fontWeight="800" fontSize="26.98" fill={CAL} letterSpacing="-.5">
        <tspan x="0" y="0">SPECULATIVE</tspan><tspan x="0" y="25.05">FUTURES</tspan><tspan x="0" y="50.11">CDMX</tspan>
      </text>
    </svg>
  );
}

const metaG = { fontFamily: GF, fontWeight: 500, fontSize: 22, letterSpacing: '.08em', textTransform: 'uppercase', color: SLATE };

/* highlight the eje word(s) in mint within a string */
function ejeSplit(text, eje) {
  if (!eje) return [<span key="0">{text}</span>];
  const parts = text.split(new RegExp(`(${eje.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'i'));
  return parts.map((p, i) =>
    p.toLowerCase() === eje.toLowerCase()
      ? <span key={i} style={{ color: MINT }}>{p}</span>
      : <span key={i}>{p}</span>);
}

function SeriesMark({ n, total, slide }) {
  return (
    <div style={{ textAlign: 'right', lineHeight: 1.4 }}>
      <div style={{ ...metaG, fontSize: 24 }}>
        <span style={{ color: MINT, fontWeight: 700 }}>{n}</span>
        <span style={{ color: SLATE }}> / 06</span>
      </div>
      {total > 1 && (
        <div style={{ ...metaG, fontSize: 18, marginTop: 8, color: SLATE }}>{slide + 1} / {total}</div>
      )}
    </div>
  );
}

/* ---- the frame every go-live slide sits in ------------------------------- */
function GoLiveFrame({ n, total = 1, slide = 0, date = '2026.06.02', justify = 'flex-end', children }) {
  const hair = {
    position: 'absolute', inset: 0, pointerEvents: 'none',
    backgroundImage:
      `repeating-linear-gradient(to right, rgba(84,116,118,.07) 0 1px, transparent 1px 135px),` +
      `repeating-linear-gradient(to bottom, rgba(84,116,118,.07) 0 1px, transparent 1px 135px)`,
  };
  return (
    <div style={{ position: 'relative', width: 1080, height: 1350, background: PETROL, color: CAL,
      fontFamily: GF, overflow: 'hidden', WebkitFontSmoothing: 'antialiased' }}>
      <div style={hair} />
      <div style={{ position: 'relative', height: '100%', padding: 92, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flex: '0 0 auto' }}>
          <IsotypeG size={84} />
          <SeriesMark n={n} total={total} slide={slide} />
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: justify, minHeight: 0, paddingTop: 56, paddingBottom: 40 }}>
          {children}
        </div>
        <div style={{ flex: '0 0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          borderTop: `1px solid ${LINE}`, paddingTop: 24 }}>
          <span style={{ ...metaG }}>19.4326° N · 99.1332° W</span>
          <span style={{ ...metaG }}>{date}</span>
        </div>
      </div>
    </div>
  );
}

/* ---- content blocks ------------------------------------------------------ */
function Eyebrow({ children }) {
  return <div style={{ ...metaG, color: MINT, fontWeight: 700, fontSize: 24, marginBottom: 36 }}>{children}</div>;
}

function CoverBody({ post }) {
  return (
    <React.Fragment>
      {post.eyebrow && <Eyebrow>{post.eyebrow}</Eyebrow>}
      <h1 style={{ fontFamily: GF, fontWeight: 900, fontSize: post.titleSize || 132, lineHeight: .98,
        letterSpacing: '-.025em', color: CAL, margin: 0, maxWidth: 900, textWrap: 'balance' }}>
        {ejeSplit(post.title, post.eje)}
      </h1>
      {post.sub && (
        <p style={{ fontFamily: GF, fontWeight: 500, fontSize: 33, lineHeight: 1.5, color: BODY,
          margin: '44px 0 0', maxWidth: 800 }}>{post.sub}</p>
      )}
      {post.cta && (
        <a style={{ alignSelf: 'flex-start', marginTop: 56, fontFamily: GF, fontWeight: 700, fontSize: 32,
          background: MINT, color: PETROL, padding: '26px 52px', borderRadius: 6, textDecoration: 'none' }}>
          {post.cta}
        </a>
      )}
      {post.lockup && <div style={{ marginTop: 64 }}><Wordmark width={360} /></div>}
    </React.Fragment>
  );
}

function IdeaBody({ slide }) {
  return (
    <React.Fragment>
      <Eyebrow>{slide.eyebrow || 'Idea ancla'}</Eyebrow>
      <h1 style={{ fontFamily: GF, fontWeight: 700, fontSize: slide.size || 82, lineHeight: 1.12,
        letterSpacing: '-.018em', color: BODY, margin: 0, maxWidth: 900, textWrap: 'pretty' }}>
        {ejeSplit(slide.phrase, slide.eje)}
      </h1>
      {slide.lockup && <div style={{ marginTop: 72 }}><Wordmark width={340} /></div>}
    </React.Fragment>
  );
}

/* 05 · custom carousel slide layouts */
function FunctionsBody({ slide }) {
  return (
    <React.Fragment>
      <Eyebrow>{slide.eyebrow}</Eyebrow>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 52 }}>
        {slide.items.map((it, i) => (
          <div key={i} style={{ display: 'flex', gap: 30, alignItems: 'flex-start' }}>
            <span style={{ width: 22, height: 22, borderRadius: '50%', background: MINT, marginTop: 22, flex: '0 0 22px' }} />
            <div>
              <div style={{ fontFamily: GF, fontWeight: 900, fontSize: 64, lineHeight: 1.04, letterSpacing: '-.02em', color: CAL }}>{it.term}</div>
              <div style={{ fontFamily: GF, fontWeight: 500, fontSize: 32, lineHeight: 1.45, color: BODY, marginTop: 10, maxWidth: 760 }}>{it.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}

function TerritoriesBody({ slide }) {
  return (
    <React.Fragment>
      <Eyebrow>{slide.eyebrow}</Eyebrow>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {slide.items.map((t, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 32, padding: '26px 0',
            borderTop: i === 0 ? 'none' : `1px solid ${LINE}` }}>
            <span style={{ ...metaG, fontSize: 24, color: SLATE, width: 56, flex: '0 0 56px' }}>{String(i + 1).padStart(2, '0')}</span>
            <span style={{ fontFamily: GF, fontWeight: 700, fontSize: 50, lineHeight: 1.06, letterSpacing: '-.015em', color: CAL }}>{t}</span>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}

function ClosingBody({ slide }) {
  return (
    <React.Fragment>
      <div style={{ marginBottom: 64 }}><Wordmark width={420} /></div>
      <h1 style={{ fontFamily: GF, fontWeight: 700, fontSize: 76, lineHeight: 1.1, letterSpacing: '-.02em',
        color: BODY, margin: 0, maxWidth: 880 }}>{ejeSplit(slide.phrase, slide.eje)}</h1>
    </React.Fragment>
  );
}

/* ---- slide router -------------------------------------------------------- */
function PostSlide({ post, index = 0, date }) {
  const total = post.slides ? post.slides.length : 1;

  if (post.kind === 'cover' || post.kind === 'cta') {
    return <GoLiveFrame n={post.n} date={date} justify="flex-end"><CoverBody post={post} /></GoLiveFrame>;
  }
  if (post.kind === 'carousel-idea') {
    const s = post.slides[index];
    return <GoLiveFrame n={post.n} total={total} slide={index} date={date} justify="center"><IdeaBody slide={s} /></GoLiveFrame>;
  }
  if (post.kind === 'carousel-custom') {
    const s = post.slides[index];
    const just = s.layout === 'statement' || s.layout === 'closing' ? 'center' : 'center';
    const Body = s.layout === 'statement' ? IdeaBody
      : s.layout === 'functions' ? FunctionsBody
        : s.layout === 'territories' ? TerritoriesBody
          : ClosingBody;
    return <GoLiveFrame n={post.n} total={total} slide={index} date={date} justify={just}><Body slide={s} /></GoLiveFrame>;
  }
  return null;
}

/* ============================================================================
   THE SIX GO-LIVE POSTS — copy verbatim from playbook §3
   calIdx → index into the go-live calendar (drives the timestamp tweak)
   ============================================================================ */
const HASHTAGS = '#SpeculativeFutures #FuturosPosibles #Foresight #FuturesThinking #FuturosCDMX';

const GOLIVE_POSTS = [
  {
    n: '01', calIdx: 0, kind: 'cover', label: 'Estamos de regreso', format: 'Imagen 4:5 · Cover / Lanzamiento',
    title: 'Estamos de regreso', eje: 'regreso', titleSize: 150,
    sub: 'Volvemos a reunir a quienes imaginan, cuestionan y diseñan futuros posibles desde Ciudad de México.',
    lockup: true,
    caption: [
      'Estamos de regreso.',
      'Speculative Futures CDMX vuelve a abrir el espacio para imaginar, cuestionar y activar futuros posibles desde Ciudad de México.',
      'Volvemos como comunidad interdisciplinaria —foresight, diseño, innovación, cultura, ciudad y tecnología— y con algo concreto en el horizonte. En los próximos días te contamos qué viene.',
      'Quédate cerca. Esto apenas empieza, otra vez.',
    ],
  },
  {
    n: '02', calIdx: 1, kind: 'cover', label: 'Pronto, en vivo', format: 'Imagen 4:5 · Evento · teaser',
    eyebrow: 'Evento · próximamente',
    title: 'Pronto, en vivo', eje: 'en vivo', titleSize: 138,
    sub: 'El reencuentro de la comunidad, en persona. Fecha y lugar muy pronto.',
    caption: [
      'Algo se está cocinando.',
      'Pronto anunciamos nuestro evento de go-live: el reencuentro de Speculative Futures CDMX, en persona —el punto donde las conversaciones que vivían en mesas separadas se juntan.',
      'Fecha y lugar, en los próximos días. Activa las notificaciones para no perdértelo.',
    ],
  },
  {
    n: '03', calIdx: 2, kind: 'carousel-idea', label: 'Nuestro manifiesto', format: 'Carrusel · 3 slides · Idea ancla',
    slides: [
      { eyebrow: 'Manifiesto', phrase: 'La especulación responsable observa la realidad con profundidad, reconoce sus tensiones y explora posibilidades con consecuencias.', eje: 'consecuencias', size: 74 },
      { eyebrow: 'Manifiesto', phrase: 'Creemos en la imaginación como infraestructura: estratégica, cultural y cívica.', eje: 'infraestructura', size: 84 },
      { eyebrow: 'Manifiesto', phrase: 'Los futuros se imaginan, se disputan, se diseñan y se practican.', eje: 'se practican', size: 88, lockup: true },
    ],
    caption: [
      'Nuestra postura, en tres ideas.',
      'La especulación responsable observa la realidad con profundidad, reconoce sus tensiones y explora posibilidades con consecuencias. Creemos en la imaginación como infraestructura estratégica, cultural y cívica. Y creemos que las voces emergentes amplían el campo de lo posible.',
      'Los futuros se imaginan, se disputan, se diseñan y se practican.',
      '¿Qué idea resuena contigo? Te leemos en los comentarios.',
    ],
  },
  {
    n: '04', calIdx: 3, kind: 'cover', label: 'Visión de la comunidad', format: 'Imagen 4:5 · Idea ancla / Cover',
    eyebrow: 'Visión',
    title: 'Una comunidad de referencia para pensar futuros desde CDMX', eje: 'futuros', titleSize: 80,
    sub: 'Y una voz relevante en Latinoamérica para explorar lo que viene de forma crítica, creativa y estratégica.',
    caption: [
      'Hacia dónde vamos.',
      'Queremos ser la comunidad de referencia en Ciudad de México —y una voz en Latinoamérica— para explorar futuros posibles con criterio: ampliar lo que somos capaces de imaginar, leer las señales del cambio y diseñar mejores formas de responder desde el presente.',
      'Esa es la comunidad que volvemos a construir.',
    ],
  },
  {
    n: '05', calIdx: 4, kind: 'carousel-custom', label: 'Qué encontrarás aquí', format: 'Carrusel · 4 slides · Idea ancla',
    slides: [
      { layout: 'statement', eyebrow: 'Qué encontrarás aquí', phrase: 'Esto vas a encontrar aquí.', eje: 'encontrar', size: 96 },
      { layout: 'functions', eyebrow: 'Tres cosas', items: [
        { term: 'Señales', desc: 'Lo que empieza a cambiar.' },
        { term: 'Voces', desc: 'Quienes construyen futuros.' },
        { term: 'Eventos', desc: 'Para pensar en colectivo.' },
      ] },
      { layout: 'territories', eyebrow: 'Cinco territorios', items: [
        'Futuros & foresight', 'Innovación & negocios', 'Ciudad & sistemas vivos', 'Cultura & sociedad', 'Tecnologías emergentes',
      ] },
      { layout: 'closing', phrase: 'Síguenos para no perderte la primera señal.', eje: 'primera señal' },
    ],
    caption: [
      'Esto vas a encontrar aquí.',
      'Señales: lecturas de lo que empieza a cambiar. Voces: quienes están pensando, investigando y construyendo futuros desde distintas disciplinas. Eventos: conversaciones y encuentros para imaginar en colectivo.',
      'Cruzamos cinco territorios: futuros y foresight; innovación y negocios; ciudad y sistemas vivos; cultura y sociedad; tecnologías emergentes.',
      'Síguenos para no perderte la primera señal.',
    ],
  },
  {
    n: '06', calIdx: 5, kind: 'cta', label: 'Búscanos para ser parte', format: 'Imagen 4:5 · Evento / CTA',
    eyebrow: 'Sé parte',
    title: 'Este es tu lugar', eje: 'tu lugar', titleSize: 150,
    sub: 'Si te interesa imaginar y diseñar lo que viene desde CDMX, búscanos.',
    cta: 'Únete a la comunidad',
    caption: [
      'Búscanos para ser parte.',
      'Si te interesa imaginar, cuestionar y diseñar lo que viene desde Ciudad de México, este es tu lugar.',
      'Únete, propón una conversación o colabora con el capítulo. Escríbenos por DM o en los comentarios.',
      'Esto se construye en comunidad.',
    ],
  },
];

Object.assign(window, {
  IsotypeG, Wordmark, PostSlide, GOLIVE_POSTS, HASHTAGS,
  GL_COLORS: { PETROL, PETROL8, SLATE, EMERALD, MINT, CAL, BODY, LINE },
});
