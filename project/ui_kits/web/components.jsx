/* ============================================================================
   Speculative Futures CDMX — Web UI kit · shared atoms + sections
   ============================================================================ */
const { useState } = React;
const WC = { PETROL:'#062424', PETROL8:'#0B3331', PETROL7:'#114442', SLATE:'#547476',
  EMERALD:'#439973', MINT:'#66EBAC', CAL:'#F4F7F5', BODY:'#C4D6CF',
  INK9:'#062424', INK7:'#1E3B39', INK5:'#5A716F', LINE:'#D8E2DF' };

const wMeta = { fontFamily:"'Gotham',sans-serif", fontWeight:500, fontSize:12,
  letterSpacing:'.08em', textTransform:'uppercase', color:WC.SLATE };

function WIsotype({ size=40, stroke=WC.EMERALD, tri=WC.EMERALD, node=WC.PETROL }) {
  return (
    <svg width={size} height={size*(150/165)} viewBox="0 0 165 150" aria-label="SF CDMX">
      <polygon points="33.51 48.75 139.57 24.09 107.74 128.8" fill={tri} />
      <circle cx="84.95" cy="85.8" r="25.79" fill={node} stroke={stroke} strokeWidth="3" />
    </svg>
  );
}

function WLogo({ dark=true }) {
  const txt = dark ? WC.CAL : WC.INK9;
  const tri = dark ? WC.EMERALD : WC.INK9;
  const node = dark ? WC.PETROL : '#FFFFFF';
  const stroke = dark ? WC.EMERALD : WC.INK9;
  return (
    <svg width="148" height="74" viewBox="0 0 360 180" aria-label="Speculative Futures CDMX">
      <polygon points="33.51 48.75 139.57 24.09 107.74 128.8" fill={tri} />
      <circle cx="84.95" cy="85.8" r="25.79" fill={node} stroke={stroke} strokeWidth="2.4" />
      <text transform="translate(132.36 101.11)" fontFamily="'Gotham',sans-serif" fontWeight="800" fontSize="26.98" fill={txt} letterSpacing="-.5">
        <tspan x="0" y="0">SPECULATIVE</tspan><tspan x="0" y="25.05">FUTURES</tspan><tspan x="0" y="50.11">CDMX</tspan>
      </text>
    </svg>
  );
}

function WBtn({ children, variant='primary', onClick, light=false }) {
  const base = { fontFamily:"'Gotham',sans-serif", fontWeight:500, fontSize:15, padding:'13px 26px',
    borderRadius:4, cursor:'pointer', textDecoration:'none', display:'inline-flex', alignItems:'center',
    gap:10, border:'1px solid transparent', transition:'all .18s', whiteSpace:'nowrap' };
  const styles = {
    primary:{ ...base, background:WC.MINT, color:WC.PETROL },
    ghost:{ ...base, background:'transparent', color:light?WC.INK9:WC.CAL, borderColor:light?WC.INK9:'rgba(244,247,245,.4)' },
    link:{ fontFamily:"'Gotham',sans-serif", fontWeight:400, fontSize:15, color:light?WC.EMERALD:WC.MINT,
      background:'none', border:'none', cursor:'pointer', textDecoration:'underline', textUnderlineOffset:4 },
  };
  return <button onClick={onClick} style={styles[variant]}>{children}</button>;
}

function WTag({ label, active=false, light=false, onClick }) {
  const border = active ? WC.MINT : (light?WC.LINE:WC.PETROL7);
  const color = active ? WC.MINT : (light?WC.INK7:WC.BODY);
  return (
    <button onClick={onClick} style={{ display:'inline-flex', alignItems:'center', fontFamily:"'Gotham',sans-serif",
      fontWeight:500, fontSize:11.5, letterSpacing:'.1em', textTransform:'uppercase', padding:'8px 16px',
      border:`1px solid ${border}`, borderRadius:999, color, background:'transparent', cursor:onClick?'pointer':'default', transition:'all .18s' }}>
      <span style={{ width:6, height:6, borderRadius:'50%', background:active?WC.MINT:WC.EMERALD, marginRight:9 }} />
      {label}
    </button>
  );
}

const hair = {
  backgroundImage:'repeating-linear-gradient(to right, rgba(84,116,118,.05) 0 1px, transparent 1px 96px)',
};

/* ---- NAV ----------------------------------------------------------------- */
function Nav({ onJoin }) {
  const links = ['Señales','Voces','Eventos','Manifiesto'];
  return (
    <nav style={{ position:'sticky', top:0, zIndex:20, background:'rgba(6,36,36,.86)', backdropFilter:'blur(8px)',
      borderBottom:`1px solid ${WC.PETROL7}`, display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'16px clamp(20px,5vw,64px)' }}>
      <WLogo dark />
      <div style={{ display:'flex', alignItems:'center', gap:28 }}>
        {links.map(l => <a key={l} href={'#'+l.toLowerCase().replace('ñ','n')} style={{ ...wMeta, color:WC.BODY,
          textDecoration:'none', fontSize:12.5 }}>{l}</a>)}
        <WBtn onClick={onJoin}>Únete</WBtn>
      </div>
    </nav>
  );
}

/* ---- HERO ---------------------------------------------------------------- */
function Hero({ onJoin }) {
  return (
    <header style={{ ...hair, padding:'clamp(72px,11vw,128px) clamp(20px,5vw,64px) 96px', position:'relative' }}>
      <div style={{ maxWidth:1280, margin:'0 auto' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:40 }}>
          <span style={{ width:9, height:9, borderRadius:'50%', background:WC.MINT }} />
          <span style={wMeta}>Capítulo CDMX · de @speculativefutures</span>
        </div>
        <h1 style={{ fontFamily:"'Gotham',sans-serif", fontWeight:900, fontSize:'clamp(44px,8.5vw,88px)',
          lineHeight:.98, letterSpacing:'-.025em', color:WC.CAL, margin:0, maxWidth:1000, textWrap:'balance' }}>
          Futuros posibles desde <span style={{ color:WC.MINT }}>Ciudad de México</span>
        </h1>
        <p style={{ fontFamily:"'Gotham',sans-serif", fontWeight:500, fontSize:'clamp(17px,2vw,20px)', lineHeight:1.6,
          color:WC.BODY, marginTop:32, maxWidth:680 }}>
          Comunidad interdisciplinaria para imaginar, cuestionar y activar futuros: foresight, diseño
          especulativo, innovación, cultura, tecnología, ciudad y sociedad, en la misma conversación.
        </p>
        <div style={{ display:'flex', gap:14, marginTop:44, flexWrap:'wrap' }}>
          <WBtn onClick={onJoin}>Únete a la comunidad</WBtn>
          <WBtn variant="ghost">Ver próximos eventos</WBtn>
        </div>
        <div style={{ display:'flex', gap:24, flexWrap:'wrap', marginTop:56, paddingTop:22, borderTop:`1px solid ${WC.PETROL7}` }}>
          <span style={wMeta}>19.4326° N · 99.1332° W</span>
          <span style={wMeta}>CDMX</span>
          <span style={wMeta}>EST. 2026</span>
        </div>
      </div>
    </header>
  );
}

/* ---- PRÓXIMO EVENTO ------------------------------------------------------ */
function NextEvent({ onJoin }) {
  return (
    <section id="eventos" style={{ background:WC.PETROL8, borderTop:`1px solid ${WC.PETROL7}`,
      padding:'clamp(64px,9vw,112px) clamp(20px,5vw,64px)' }}>
      <div style={{ maxWidth:1280, margin:'0 auto' }}>
        <Eyebrow ix="01" label="Próximo evento" />
        <div style={{ display:'grid', gridTemplateColumns:'minmax(0,1fr) minmax(0,1.3fr)', gap:'clamp(24px,4vw,56px)', alignItems:'center', marginTop:36 }}>
          <div>
            <div style={{ height:2, width:48, background:WC.MINT, marginBottom:24 }} />
            <div style={{ ...wMeta, color:WC.MINT, fontSize:14, marginBottom:14 }}>Jue 26 jun · 19:30</div>
            <h2 style={{ fontFamily:"'Gotham',sans-serif", fontWeight:700, fontSize:'clamp(28px,4vw,40px)',
              lineHeight:1.08, letterSpacing:'-.02em', color:WC.CAL, margin:'0 0 16px' }}>
              Señales débiles: leer la ciudad que viene</h2>
            <div style={{ ...wMeta, fontSize:13, marginBottom:20 }}>Presencial · Colonia Roma, CDMX · Cupo limitado</div>
            <p style={{ fontFamily:"'Gotham',sans-serif", fontWeight:500, fontSize:16, lineHeight:1.6, color:WC.BODY, maxWidth:560, margin:'0 0 28px' }}>
              Una conversación sobre cómo detectar lo emergente en la trama urbana antes de que sea evidente —
              y qué hacemos con esas lecturas.</p>
            <WBtn onClick={onJoin}>Reserva tu lugar</WBtn>
          </div>
          <div style={{ border:`1px solid ${WC.PETROL7}`, borderRadius:8, overflow:'hidden', background:WC.PETROL }}>
            <svg viewBox="0 0 1000 620" style={{ width:'100%', height:'auto', display:'block' }}>
              <rect width="1000" height="620" fill="#0B3331" />
              <g stroke={WC.SLATE} strokeWidth="1" opacity=".3">
                <line x1="0" y1="155" x2="1000" y2="155" /><line x1="0" y1="310" x2="1000" y2="310" /><line x1="0" y1="465" x2="1000" y2="465" />
                <line x1="250" y1="0" x2="250" y2="620" /><line x1="500" y1="0" x2="500" y2="620" /><line x1="750" y1="0" x2="750" y2="620" />
              </g>
              <line x1="250" y1="465" x2="500" y2="155" stroke={WC.EMERALD} strokeWidth="1.6" />
              <line x1="500" y1="155" x2="750" y2="310" stroke={WC.EMERALD} strokeWidth="1.6" />
              <line x1="500" y1="155" x2="500" y2="465" stroke={WC.EMERALD} strokeWidth="1.6" />
              <circle cx="250" cy="465" r="7" fill={WC.SLATE} /><circle cx="750" cy="310" r="7" fill={WC.SLATE} /><circle cx="500" cy="465" r="7" fill={WC.SLATE} />
              <circle cx="500" cy="155" r="13" fill={WC.MINT} />
              <text x="525" y="150" fontFamily="'Gotham',sans-serif" fontWeight="500" fontSize="17" letterSpacing="2" fill={WC.MINT}>SEÑAL ACTIVA</text>
              <text x="30" y="592" fontFamily="'Gotham',sans-serif" fontWeight="500" fontSize="15" letterSpacing="1.5" fill={WC.SLATE}>19.4326° N · 99.1332° W</text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

function Eyebrow({ ix, label, light=false }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:12 }}>
      <span style={{ width:9, height:9, borderRadius:'50%', background:WC.MINT }} />
      <span style={{ ...wMeta, color:light?WC.INK5:WC.SLATE }}><span style={{ color:WC.MINT }}>{ix}</span> · {label}</span>
    </div>
  );
}

/* ---- MANIFIESTO ---------------------------------------------------------- */
function Manifesto() {
  const lines = [
    ['La especulación responsable observa la realidad con profundidad, reconoce sus tensiones y explora posibilidades con ', 'consecuencias', '.'],
    ['Creemos en la imaginación como ', 'infraestructura', ': estratégica, cultural y cívica.'],
    ['Los futuros se imaginan, se disputan, se diseñan y ', 'se practican', '.'],
  ];
  return (
    <section id="manifiesto" style={{ ...hair, borderTop:`1px solid ${WC.PETROL7}`, padding:'clamp(64px,9vw,112px) clamp(20px,5vw,64px)' }}>
      <div style={{ maxWidth:760, margin:'0 auto' }}>
        <Eyebrow ix="02" label="Manifiesto" />
        <div style={{ marginTop:40, display:'flex', flexDirection:'column', gap:36 }}>
          {lines.map((l, i) => (
            <p key={i} style={{ fontFamily:"'Gotham',sans-serif", fontWeight:500, fontSize:'clamp(22px,3.2vw,30px)',
              lineHeight:1.4, color:WC.CAL, margin:0 }}>
              {l[0]}<span style={{ color:WC.MINT }}>{l[1]}</span>{l[2]}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { WC, wMeta, WIsotype, WLogo, WBtn, WTag, Nav, Hero, NextEvent, Manifesto, Eyebrow });
