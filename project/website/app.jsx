/* ============================================================================
   SF CDMX — Website · assembly, overlays, Tweaks
   ============================================================================ */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroVariant": "nodes",
  "heroHeadline": "Ciudad de México",
  "motion": true,
  "hairlines": true
}/*EDITMODE-END*/;

const HEADLINE_OPTS = ['Ciudad de México','Empieza a cambiar','Conectamos'];

/* ---- modal shell --------------------------------------------------------- */
function Overlay({ onClose, children, width=460 }) {
  useEffect(()=>{
    const k = e => e.key==='Escape' && onClose();
    window.addEventListener('keydown',k); return ()=>window.removeEventListener('keydown',k);
  },[onClose]);
  return (
    <div onClick={onClose} className="overlay-fade" style={{ position:'fixed', inset:0, zIndex:60, background:'rgba(6,36,36,.72)',
      backdropFilter:'blur(6px)', display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
      <div onClick={e=>e.stopPropagation()} className="overlay-card" style={{ width, maxWidth:'100%', background:WC.PETROL8,
        border:`1px solid ${WC.PETROL7}`, borderRadius:8, padding:36, position:'relative' }}>
        <button onClick={onClose} aria-label="Cerrar" style={{ position:'absolute', top:16, right:18, background:'none', border:'none',
          color:WC.SLATE, fontSize:22, cursor:'pointer', fontFamily:FONT, lineHeight:1 }}>×</button>
        {children}
      </div>
    </div>
  );
}

/* ---- JOIN ---------------------------------------------------------------- */
function JoinOverlay({ open, onClose }) {
  const [sent, setSent] = useState(false);
  useEffect(()=>{ if(open) setSent(false); },[open]);
  if (!open) return null;
  return (
    <Overlay onClose={onClose}>
      <div style={{ marginBottom:18 }}><WIsotype size={46} /></div>
      {!sent ? (
        <React.Fragment>
          <h3 style={{ fontFamily:FONT, fontWeight:700, fontSize:26, color:WC.CAL, margin:'0 0 10px', letterSpacing:'-.01em' }}>Únete a la comunidad</h3>
          <p style={{ fontFamily:FONT, fontWeight:500, fontSize:15, lineHeight:1.55, color:WC.BODY, margin:'0 0 24px' }}>
            Te avisamos de señales, voces y eventos. Sin ruido.</p>
          <label style={{ ...wMeta, color:WC.BODY, display:'block', marginBottom:8 }}>Correo</label>
          <input placeholder="tu@correo.com" style={{ width:'100%', background:WC.PETROL,
            border:`1px solid ${WC.SLATE}`, borderRadius:4, padding:'13px 14px', color:WC.CAL,
            fontFamily:FONT, fontSize:15, outline:'none', marginBottom:20 }}
            onFocus={e=>e.target.style.borderColor=WC.MINT} onBlur={e=>e.target.style.borderColor=WC.SLATE} />
          <WBtn onClick={()=>setSent(true)}>Quiero participar</WBtn>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <h3 style={{ fontFamily:FONT, fontWeight:700, fontSize:26, color:WC.MINT, margin:'0 0 10px', letterSpacing:'-.01em' }}>Señal recibida.</h3>
          <p style={{ fontFamily:FONT, fontWeight:500, fontSize:15, lineHeight:1.55, color:WC.BODY, margin:0 }}>
            Te escribimos pronto. Mientras, propón una conversación por DM en @futures_mex.</p>
        </React.Fragment>
      )}
    </Overlay>
  );
}

/* ---- COMUNIDAD · login (próximamente) ------------------------------------ */
function ComunidadOverlay({ open, onClose, onJoin }) {
  if (!open) return null;
  const fieldStyle = { width:'100%', background:WC.PETROL, border:`1px solid ${WC.PETROL7}`, borderRadius:4,
    padding:'13px 14px', color:WC.SLATE, fontFamily:FONT, fontSize:15, outline:'none', cursor:'not-allowed' };
  return (
    <Overlay onClose={onClose} width={440}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:22 }}>
        <WIsotype size={46} />
        <span style={{ ...wMeta, color:WC.PETROL, background:WC.MINT, padding:'6px 12px', borderRadius:999, fontSize:11 }}>Próximamente</span>
      </div>
      <h3 style={{ fontFamily:FONT, fontWeight:700, fontSize:26, color:WC.CAL, margin:'0 0 10px', letterSpacing:'-.01em' }}>Entrar a la comunidad</h3>
      <p style={{ fontFamily:FONT, fontWeight:500, fontSize:15, lineHeight:1.55, color:WC.BODY, margin:'0 0 26px' }}>
        La plataforma de la comunidad —señales, perfiles y conversaciones— abre pronto. El acceso aún no está disponible.</p>

      <div aria-hidden="true" style={{ opacity:.55, pointerEvents:'none', userSelect:'none' }}>
        <label style={{ ...wMeta, color:WC.BODY, display:'block', marginBottom:8 }}>Correo</label>
        <input disabled placeholder="tu@correo.com" style={{ ...fieldStyle, marginBottom:16 }} />
        <label style={{ ...wMeta, color:WC.BODY, display:'block', marginBottom:8 }}>Contraseña</label>
        <input disabled type="password" placeholder="••••••••" style={{ ...fieldStyle, marginBottom:22 }} />
        <div style={{ fontFamily:FONT, fontWeight:500, fontSize:15, padding:'13px 26px', borderRadius:4,
          background:WC.PETROL7, color:WC.SLATE, textAlign:'center' }}>Entrar</div>
      </div>

      <div style={{ display:'flex', alignItems:'center', gap:12, margin:'26px 0 18px' }}>
        <span style={{ height:1, flex:1, background:WC.PETROL7 }} />
        <span style={{ ...wMeta, fontSize:11 }}>mientras tanto</span>
        <span style={{ height:1, flex:1, background:WC.PETROL7 }} />
      </div>
      <WBtn onClick={()=>{ onClose(); onJoin(); }}>Avísame cuando abra</WBtn>
    </Overlay>
  );
}

/* ---- APP ----------------------------------------------------------------- */
function WebApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [join, setJoin] = useState(false);
  const [comu, setComu] = useState(false);

  useEffect(()=>{ setMotion(t.motion); }, [t.motion]);

  const headlineIdx = Math.max(0, HEADLINE_OPTS.indexOf(t.heroHeadline));
  const rootVars = { '--hair-bg': t.hairlines ? HAIR_GRADIENT : 'none' };

  return (
    <div style={{ background:WC.PETROL, color:WC.CAL, fontFamily:FONT, minHeight:'100vh', ...rootVars }}>
      <Nav onJoin={()=>setJoin(true)} onComunidad={()=>setComu(true)} />
      <Hero variant={t.heroVariant} headline={headlineIdx} onJoin={()=>setJoin(true)} />
      <NextEvent onJoin={()=>setJoin(true)} />
      <Territorios />
      <Manifesto />
      <Archive />
      <Voces />
      <Footer onJoin={()=>setJoin(true)} onComunidad={()=>setComu(true)} />

      <JoinOverlay open={join} onClose={()=>setJoin(false)} />
      <ComunidadOverlay open={comu} onClose={()=>setComu(false)} onJoin={()=>setJoin(true)} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Hero" />
        <TweakRadio label="Dirección" value={t.heroVariant}
          options={['nodes','duotono','editorial']}
          onChange={v=>setTweak('heroVariant', v)} />
        <TweakSelect label="Titular" value={t.heroHeadline}
          options={HEADLINE_OPTS}
          onChange={v=>setTweak('heroHeadline', v)} />
        <TweakSection label="Sistema gráfico" />
        <TweakToggle label="Retícula de coordenadas" value={t.hairlines}
          onChange={v=>setTweak('hairlines', v)} />
        <TweakToggle label="Movimiento (reveals + nodos)" value={t.motion}
          onChange={v=>setTweak('motion', v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<WebApp />);
