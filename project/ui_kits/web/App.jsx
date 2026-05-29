/* SF CDMX — Web kit · app assembly + join overlay */
function JoinOverlay({ open, onClose }) {
  const [sent, setSent] = useState(false);
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position:'fixed', inset:0, zIndex:50, background:'rgba(6,36,36,.7)',
      backdropFilter:'blur(6px)', display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
      <div onClick={e=>e.stopPropagation()} style={{ width:460, maxWidth:'100%', background:WC.PETROL8,
        border:`1px solid ${WC.PETROL7}`, borderRadius:8, padding:36, position:'relative' }}>
        <button onClick={onClose} style={{ position:'absolute', top:18, right:20, background:'none', border:'none',
          color:WC.SLATE, fontSize:22, cursor:'pointer', fontFamily:"'Gotham',sans-serif" }}>×</button>
        <div style={{ marginBottom:18 }}><WIsotype size={48} /></div>
        {!sent ? (
          <React.Fragment>
            <h3 style={{ fontFamily:"'Gotham',sans-serif", fontWeight:700, fontSize:26, color:WC.CAL, margin:'0 0 10px', letterSpacing:'-.01em' }}>Únete a la comunidad</h3>
            <p style={{ fontFamily:"'Gotham',sans-serif", fontWeight:500, fontSize:15, lineHeight:1.55, color:WC.BODY, margin:'0 0 24px' }}>
              Te avisamos de señales, voces y eventos. Sin ruido.</p>
            <label style={{ ...wMeta, color:WC.BODY, display:'block', marginBottom:8 }}>Correo</label>
            <input id="join-email" placeholder="tu@correo.com" style={{ width:'100%', background:WC.PETROL,
              border:`1px solid ${WC.SLATE}`, borderRadius:4, padding:'13px 14px', color:WC.CAL,
              fontFamily:"'Gotham',sans-serif", fontSize:15, outline:'none', marginBottom:20 }}
              onFocus={e=>e.target.style.borderColor=WC.MINT} onBlur={e=>e.target.style.borderColor=WC.SLATE} />
            <WBtn onClick={()=>setSent(true)}>Quiero participar</WBtn>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h3 style={{ fontFamily:"'Gotham',sans-serif", fontWeight:700, fontSize:26, color:WC.MINT, margin:'0 0 10px', letterSpacing:'-.01em' }}>Señal recibida.</h3>
            <p style={{ fontFamily:"'Gotham',sans-serif", fontWeight:500, fontSize:15, lineHeight:1.55, color:WC.BODY, margin:0 }}>
              Te escribimos pronto. Mientras, propón una conversación por DM en @futures_mex.</p>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

function WebApp() {
  const [join, setJoin] = useState(false);
  const open = () => setJoin(true);
  return (
    <div style={{ background:WC.PETROL, color:WC.CAL, fontFamily:"'Gotham',sans-serif", minHeight:'100vh' }}>
      <Nav onJoin={open} />
      <Hero onJoin={open} />
      <NextEvent onJoin={open} />
      <Manifesto />
      <Archive />
      <Voces />
      <Footer onJoin={open} />
      <JoinOverlay open={join} onClose={()=>setJoin(false)} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<WebApp />);
