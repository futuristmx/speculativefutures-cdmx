/* ============================================================================
   Speculative Futures CDMX — Website · atoms, motion, graphic system
   "Señal en lo oscuro". Reuses the kit's tokens; adds reveal + node animation.
   ============================================================================ */
const { useState, useRef, useEffect, useCallback } = React;

const WC = { PETROL:'#062424', PETROL8:'#0B3331', PETROL7:'#114442', SLATE:'#547476',
  EMERALD:'#439973', MINT:'#66EBAC', CAL:'#F4F7F5', BODY:'#C4D6CF',
  INK9:'#062424', INK7:'#1E3B39', INK5:'#5A716F', LINE:'#D8E2DF' };

const FONT = "'Gotham', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif";
const wMeta = { fontFamily:FONT, fontWeight:500, fontSize:12,
  letterSpacing:'.08em', textTransform:'uppercase', color:WC.SLATE };

const HAIR_GRADIENT = 'repeating-linear-gradient(to right, rgba(84,116,118,.05) 0 1px, transparent 1px 96px)';
const hair = { backgroundImage:'var(--hair-bg, '+HAIR_GRADIENT+')' };

/* ---- MOTION: scroll reveal ----------------------------------------------- */
/* fade + 8px rise, 400ms ease-out on viewport entry (system spec).            */
let MOTION_ON = true;               // toggled by the Tweaks panel
const _revealNodes = new Set();
function setMotion(on){
  MOTION_ON = on;
  document.documentElement.classList.toggle('no-motion', !on);
  if(!on) _revealNodes.forEach(n => n.classList.add('in'));
}
function useReveal(delay=0){
  const ref = useRef(null);
  useEffect(()=>{
    const el = ref.current; if(!el) return;
    el.style.setProperty('--reveal-delay', delay+'ms');
    _revealNodes.add(el);
    if(!MOTION_ON){ el.classList.add('in'); return; }
    const io = new IntersectionObserver((ents)=>{
      ents.forEach(e=>{ if(e.isIntersecting){ el.classList.add('in'); io.unobserve(el); } });
    }, { threshold:0.18, rootMargin:'0px 0px -8% 0px' });
    io.observe(el);
    return ()=>{ io.disconnect(); _revealNodes.delete(el); };
  },[delay]);
  return ref;
}
function Reveal({ children, delay=0, as='div', style, ...rest }){
  const ref = useReveal(delay);
  const Tag = as;
  return <Tag ref={ref} className="reveal" style={style} {...rest}>{children}</Tag>;
}

/* ---- ISOTYPE / LOGO ------------------------------------------------------ */
function WIsotype({ size=40, stroke=WC.EMERALD, tri=WC.EMERALD, node=WC.PETROL }) {
  return (
    <svg width={size} height={size*(150/165)} viewBox="0 0 165 150" aria-label="SF CDMX">
      <polygon points="33.51 48.75 139.57 24.09 107.74 128.8" fill={tri} />
      <circle cx="84.95" cy="85.8" r="25.79" fill={node} stroke={stroke} strokeWidth="3" />
    </svg>
  );
}
function WLogo({ dark=true, w=148 }) {
  const txt = dark ? WC.CAL : WC.INK9;
  const tri = dark ? WC.EMERALD : WC.INK9;
  const node = dark ? WC.PETROL : '#FFFFFF';
  const stroke = dark ? WC.EMERALD : WC.INK9;
  return (
    <svg width={w} height={w*(180/360)} viewBox="0 0 360 180" aria-label="Speculative Futures CDMX" style={{display:'block'}}>
      <polygon points="33.51 48.75 139.57 24.09 107.74 128.8" fill={tri} />
      <circle cx="84.95" cy="85.8" r="25.79" fill={node} stroke={stroke} strokeWidth="2.4" />
      <text transform="translate(132.36 101.11)" fontFamily={FONT} fontWeight="800" fontSize="26.98" fill={txt} letterSpacing="-.5">
        <tspan x="0" y="0">SPECULATIVE</tspan><tspan x="0" y="25.05">FUTURES</tspan><tspan x="0" y="50.11">CDMX</tspan>
      </text>
    </svg>
  );
}

/* ---- BUTTONS / TAGS ------------------------------------------------------ */
function WBtn({ children, variant='primary', onClick, light=false, href }) {
  const [h,setH] = useState(false);
  const base = { fontFamily:FONT, fontWeight:500, fontSize:15, padding:'13px 26px',
    borderRadius:4, cursor:'pointer', textDecoration:'none', display:'inline-flex', alignItems:'center',
    gap:10, border:'1px solid transparent', transition:'all .18s var(--ease,cubic-bezier(.2,.6,.2,1))', whiteSpace:'nowrap' };
  const styles = {
    primary:{ ...base, background:WC.MINT, color:WC.PETROL,
      filter:h?'brightness(1.08)':'none', transform:h?'translateY(-2px)':'none' },
    ghost:{ ...base, background:'transparent', color:h?WC.MINT:(light?WC.INK9:WC.CAL),
      borderColor:h?WC.MINT:(light?WC.INK9:'rgba(244,247,245,.4)') },
    link:{ fontFamily:FONT, fontWeight:400, fontSize:15, color:light?WC.EMERALD:WC.MINT,
      background:'none', border:'none', cursor:'pointer', textDecoration:'underline', textUnderlineOffset:4 },
  };
  const Tag = href ? 'a' : 'button';
  return <Tag href={href} onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={styles[variant]}>{children}</Tag>;
}

function WTag({ label, active=false, light=false, onClick }) {
  const [h,setH] = useState(false);
  const on = active || h;
  const border = on ? WC.MINT : (light?WC.LINE:WC.PETROL7);
  const color = on ? WC.MINT : (light?WC.INK7:WC.BODY);
  return (
    <button onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{ display:'inline-flex', alignItems:'center', fontFamily:FONT,
      fontWeight:500, fontSize:11.5, letterSpacing:'.1em', textTransform:'uppercase', padding:'8px 16px',
      border:`1px solid ${border}`, borderRadius:999, color, background:'transparent',
      cursor:onClick?'pointer':'default', transition:'all .18s' }}>
      <span style={{ width:6, height:6, borderRadius:'50%', background:on?WC.MINT:WC.EMERALD, marginRight:9, transition:'background .18s' }} />
      {label}
    </button>
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

/* ---- DUOTONE PLACEHOLDER ------------------------------------------------- */
/* Cool green-cast image slot. Drop a real green-duotone photo via the slot.   */
function Duotone({ ratio='4 / 5', label='retrato · duotono verde', radius=8, seed=0 }) {
  const a = 14 + (seed*23)%40;       // vary the hatch angle per slot for life
  return (
    <div style={{ position:'relative', width:'100%', aspectRatio:ratio, borderRadius:radius,
      overflow:'hidden', border:`1px solid ${WC.PETROL7}`, background:`linear-gradient(150deg, ${WC.PETROL8}, #0a2c2b 55%, ${WC.PETROL})` }}>
      <div style={{ position:'absolute', inset:0, opacity:.5,
        backgroundImage:`repeating-linear-gradient(${a}deg, rgba(67,153,115,.22) 0 2px, transparent 2px 9px)` }} />
      <div style={{ position:'absolute', left:'50%', top:'42%', transform:'translate(-50%,-50%)',
        width:'46%', aspectRatio:'1', borderRadius:'50%',
        background:`radial-gradient(circle at 50% 38%, rgba(102,235,172,.16), rgba(67,153,115,.10) 60%, transparent 72%)` }} />
      <span style={{ position:'absolute', left:14, bottom:12, fontFamily:'ui-monospace,SFMono-Regular,Menlo,monospace',
        fontSize:10.5, letterSpacing:'.04em', color:'rgba(196,214,207,.62)' }}>{label}</span>
    </div>
  );
}

/* ---- NODE NETWORK (animated graphic) ------------------------------------- */
/* Echo of the logo node. Lines draw in (stroke-dashoffset), one mint node      */
/* lights as the active signal. Used in hero + próximo evento.                  */
function NodeNetwork({ height=460, dense=true }) {
  const ref = useReveal(120);
  // a small graph: structural slate nodes + emerald connectors + one mint signal
  const nodes = [
    { x:0.16, y:0.30, r:5,  mint:false },
    { x:0.40, y:0.16, r:5,  mint:false },
    { x:0.70, y:0.24, r:5,  mint:false },
    { x:0.86, y:0.46, r:5,  mint:false },
    { x:0.58, y:0.50, r:14, mint:true  },   // active signal
    { x:0.28, y:0.62, r:5,  mint:false },
    { x:0.48, y:0.82, r:5,  mint:false },
    { x:0.78, y:0.76, r:5,  mint:false },
  ];
  const edges = [[0,4],[1,4],[2,4],[4,3],[4,5],[4,6],[6,7],[2,7]];
  return (
    <div ref={ref} className="reveal nodenet" style={{ width:'100%' }}>
      <svg viewBox="0 0 1000 660" preserveAspectRatio="xMidYMid meet"
        style={{ width:'100%', height:'auto', display:'block', maxHeight:height }}>
        {/* coordinate hairlines */}
        <g stroke={WC.SLATE} strokeWidth="1" opacity=".22">
          <line x1="0" y1="165" x2="1000" y2="165" /><line x1="0" y1="330" x2="1000" y2="330" /><line x1="0" y1="495" x2="1000" y2="495" />
          <line x1="250" y1="0" x2="250" y2="660" /><line x1="500" y1="0" x2="500" y2="660" /><line x1="750" y1="0" x2="750" y2="660" />
        </g>
        {edges.map(([a,b],i)=>{
          const A=nodes[a], B=nodes[b];
          return <line key={i} className="netline" x1={A.x*1000} y1={A.y*660} x2={B.x*1000} y2={B.y*660}
            stroke={WC.EMERALD} strokeWidth="1.6" style={{ '--d': (i*90)+'ms' }} />;
        })}
        {nodes.map((n,i)=> n.mint ? (
          <g key={i} className="netsignal">
            <circle cx={n.x*1000} cy={n.y*660} r="30" fill="none" stroke={WC.MINT} strokeWidth="1.2" className="netpulse" />
            <circle cx={n.x*1000} cy={n.y*660} r={n.r} fill={WC.MINT} />
          </g>
        ) : (
          <circle key={i} className="netdot" cx={n.x*1000} cy={n.y*660} r={n.r} fill={WC.SLATE} style={{ '--d': (300+i*60)+'ms' }} />
        ))}
        <text x="26" y="636" fontFamily={FONT} fontWeight="500" fontSize="15" letterSpacing="1.5" fill={WC.SLATE}>19.4326° N · 99.1332° W</text>
        <text x="650" y="56" fontFamily={FONT} fontWeight="500" fontSize="15" letterSpacing="2" fill={WC.MINT}>SEÑAL ACTIVA</text>
      </svg>
    </div>
  );
}

/* ---- NAV ----------------------------------------------------------------- */
function Nav({ onJoin, onComunidad }) {
  const [scrolled,setScrolled] = useState(false);
  useEffect(()=>{
    const f=()=>setScrolled(window.scrollY>12); f();
    window.addEventListener('scroll',f,{passive:true}); return ()=>window.removeEventListener('scroll',f);
  },[]);
  const links = [['Señales','#senales'],['Eventos','#eventos'],['Voces','#voces'],['Manifiesto','#manifiesto']];
  return (
    <nav style={{ position:'sticky', top:0, zIndex:30,
      background:scrolled?'rgba(6,36,36,.88)':'rgba(6,36,36,.4)', backdropFilter:'blur(10px)',
      borderBottom:`1px solid ${scrolled?WC.PETROL7:'transparent'}`, transition:'all .25s',
      display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px clamp(20px,5vw,64px)' }}>
      <a href="#top" style={{ display:'flex' }}><WLogo dark w={132} /></a>
      <div style={{ display:'flex', alignItems:'center', gap:'clamp(14px,2.4vw,30px)' }}>
        <div className="navlinks" style={{ display:'flex', gap:'clamp(14px,2.2vw,28px)' }}>
          {links.map(([l,href]) => <a key={l} href={href} style={{ ...wMeta, color:WC.BODY,
            textDecoration:'none', fontSize:12.5 }}>{l}</a>)}
        </div>
        <button onClick={onComunidad} style={{ ...wMeta, color:WC.CAL, fontSize:12.5, background:'none',
          border:'none', cursor:'pointer', padding:0 }}>Comunidad</button>
        <WBtn onClick={onJoin}>Únete</WBtn>
      </div>
    </nav>
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
    <section id="manifiesto" style={{ ...hair, borderTop:`1px solid ${WC.PETROL7}`, padding:'clamp(64px,9vw,118px) clamp(20px,5vw,64px)' }}>
      <div style={{ maxWidth:760, margin:'0 auto' }}>
        <Reveal><Eyebrow ix="03" label="Manifiesto" /></Reveal>
        <div style={{ marginTop:40, display:'flex', flexDirection:'column', gap:36 }}>
          {lines.map((l, i) => (
            <Reveal as="p" key={i} delay={i*90} style={{ fontFamily:FONT, fontWeight:500, fontSize:'clamp(22px,3.2vw,30px)',
              lineHeight:1.4, color:WC.CAL, margin:0 }}>
              {l[0]}<span style={{ color:WC.MINT }}>{l[1]}</span>{l[2]}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { WC, FONT, wMeta, hair, HAIR_GRADIENT, setMotion, useReveal, Reveal,
  WIsotype, WLogo, WBtn, WTag, Eyebrow, Duotone, NodeNetwork, Nav, Manifesto });
