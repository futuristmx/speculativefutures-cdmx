/* ============================================================================
   SF CDMX — Website · sections + sample data
   Depends on components.jsx + heroes.jsx (WC, atoms, Reveal, NodeNetwork).
   ============================================================================ */

const TERRITORIES = ['Todas','Futuros & Foresight','Innovación & Negocios','Ciudad & Sistemas Vivos','Cultura & Sociedad','Tecnologías Emergentes'];

const TERR_DEFS = [
  ['Futuros & Foresight','Métodos para anticipar, imaginar y disputar lo que viene.'],
  ['Innovación & Negocios','Modelos y economías que emergen cuando algo empieza a cambiar.'],
  ['Ciudad & Sistemas Vivos','Lo urbano leído como sistema que se adapta y se tensiona.'],
  ['Cultura & Sociedad','Cómo se mueven los imaginarios, los rituales y la pertenencia.'],
  ['Tecnologías Emergentes','Lo técnico entendido desde su contexto y sus consecuencias.'],
];

const SIGNALS = [
  { date:'2026.05.21', title:'Microfábricas de barrio', terr:'Ciudad & Sistemas Vivos',
    text:'Manufactura distribuida a escala de cuadra. Implicación: nuevas economías locales y tensión con la zonificación.' },
  { date:'2026.05.14', title:'Agua como interfaz cívica', terr:'Ciudad & Sistemas Vivos',
    text:'La escasez convierte el consumo de agua en un dato público y negociado. Nuevos servicios, nuevas fricciones.' },
  { date:'2026.05.07', title:'Modelos pequeños, contexto grande', terr:'Tecnologías Emergentes',
    text:'La IA local y barata desplaza la conversación de la escala al contexto. Quién entrena con qué memoria de la ciudad.' },
  { date:'2026.04.30', title:'Economías del cuidado', terr:'Innovación & Negocios',
    text:'El trabajo de sostener la vida se vuelve sector. Implicación: métricas, financiamiento y reconocimiento por diseñar.' },
  { date:'2026.04.23', title:'Rituales sin templo', terr:'Cultura & Sociedad',
    text:'Comunidades que ensayan pertenencia fuera de las instituciones clásicas. Señal débil de nuevas formas cívicas.' },
  { date:'2026.04.16', title:'Prospectiva de barrio', terr:'Futuros & Foresight',
    text:'Métodos de foresight aplicados a una cuadra, no a una nación. Escala íntima, decisiones reales.' },
];

const VOCES = [
  { name:'Voz emergente', role:'Diseñadora de futuros', terr:'Futuros & Foresight',
    bio:'Investiga imaginarios urbanos y prototipos de servicios para escenarios de escasez de agua.' },
  { name:'Investigador urbano', role:'Sistemas vivos · CDMX', terr:'Ciudad & Sistemas Vivos',
    bio:'Mapea infraestructuras informales como prototipos de la ciudad que viene.' },
  { name:'Tecnóloga cívica', role:'IA & contexto local', terr:'Tecnologías Emergentes',
    bio:'Construye herramientas de IA con memoria de barrio y gobernanza comunitaria.' },
];

/* ---- PRÓXIMO EVENTO ------------------------------------------------------ */
function NextEvent({ onJoin }) {
  return (
    <section id="eventos" style={{ background:WC.PETROL8, borderTop:`1px solid ${WC.PETROL7}`,
      padding:'clamp(64px,9vw,112px) clamp(20px,5vw,64px)' }}>
      <div style={{ maxWidth:1280, margin:'0 auto' }}>
        <Reveal><Eyebrow ix="01" label="Próximo evento" /></Reveal>
        <div style={{ display:'grid', gridTemplateColumns:'minmax(0,1fr) minmax(0,1.25fr)',
          gap:'clamp(24px,4vw,56px)', alignItems:'center', marginTop:36 }} className="event-grid">
          <Reveal>
            <div style={{ height:2, width:48, background:WC.MINT, marginBottom:24 }} />
            <div style={{ ...wMeta, color:WC.MINT, fontSize:14, marginBottom:14 }}>Jue 26 jun · 19:30</div>
            <h2 style={{ fontFamily:FONT, fontWeight:700, fontSize:'clamp(28px,4vw,40px)',
              lineHeight:1.08, letterSpacing:'-.02em', color:WC.CAL, margin:'0 0 16px' }}>
              Señales débiles: leer la ciudad que viene</h2>
            <div style={{ ...wMeta, fontSize:13, marginBottom:20 }}>Presencial · Colonia Roma, CDMX · Cupo limitado</div>
            <p style={{ fontFamily:FONT, fontWeight:500, fontSize:16, lineHeight:1.6, color:WC.BODY, maxWidth:560, margin:'0 0 28px' }}>
              Una conversación sobre cómo detectar lo emergente en la trama urbana antes de que sea evidente —
              y qué hacemos con esas lecturas.</p>
            <WBtn onClick={onJoin}>Reserva tu lugar</WBtn>
          </Reveal>
          <div style={{ border:`1px solid ${WC.PETROL7}`, borderRadius:8, overflow:'hidden', background:WC.PETROL, padding:'12px 14px' }}>
            <NodeNetwork height={420} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- TERRITORIOS --------------------------------------------------------- */
function Territorios() {
  return (
    <section id="territorios" style={{ ...hair, borderTop:`1px solid ${WC.PETROL7}`,
      padding:'clamp(64px,9vw,112px) clamp(20px,5vw,64px)' }}>
      <div style={{ maxWidth:1280, margin:'0 auto' }}>
        <Reveal><Eyebrow ix="02" label="Cinco territorios" /></Reveal>
        <Reveal as="h2" delay={60} style={{ fontFamily:FONT, fontWeight:700, fontSize:'clamp(28px,4vw,40px)',
          lineHeight:1.1, letterSpacing:'-.02em', color:WC.CAL, margin:'24px 0 8px', maxWidth:680 }}>
          Lo que leemos, conectamos y convocamos</Reveal>
        <Reveal as="p" delay={120} style={{ fontFamily:FONT, fontWeight:500, fontSize:17, lineHeight:1.6,
          color:WC.BODY, margin:'0 0 40px', maxWidth:560 }}>
          Una taxonomía fija. Cada señal, voz y evento se ancla a uno de estos cinco territorios.</Reveal>
        <div style={{ borderTop:`1px solid ${WC.PETROL7}` }}>
          {TERR_DEFS.map(([name,desc],i)=>(
            <Reveal key={name} delay={i*70}>
              <div className="terr-row" style={{ display:'grid', gridTemplateColumns:'64px minmax(0,1.1fr) minmax(0,1fr)',
                gap:'clamp(16px,3vw,40px)', alignItems:'center', padding:'24px 0', borderBottom:`1px solid ${WC.PETROL7}` }}>
                <span style={{ ...wMeta, color:WC.SLATE, fontSize:13 }}>0{i+1}</span>
                <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                  <span style={{ width:8, height:8, borderRadius:'50%', border:`1.5px solid ${WC.EMERALD}`, flex:'0 0 8px' }} />
                  <h3 style={{ fontFamily:FONT, fontWeight:700, fontSize:'clamp(19px,2.4vw,24px)', color:WC.CAL, margin:0, letterSpacing:'-.01em' }}>{name}</h3>
                </div>
                <p style={{ fontFamily:FONT, fontWeight:500, fontSize:15, lineHeight:1.5, color:WC.BODY, margin:0 }}>{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- ARCHIVE (LIGHT) ----------------------------------------------------- */
function Archive() {
  const [terr, setTerr] = useState('Todas');
  const list = terr === 'Todas' ? SIGNALS : SIGNALS.filter(s => s.terr === terr);
  return (
    <section id="senales" className="sf-light-region" style={{ background:WC.CAL, color:WC.INK9, padding:'clamp(64px,9vw,112px) clamp(20px,5vw,64px)' }}>
      <div style={{ maxWidth:1280, margin:'0 auto' }}>
        <Reveal><Eyebrow ix="04" label="Archivo de señales" light /></Reveal>
        <Reveal delay={60}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:16, marginTop:24 }}>
            <h2 style={{ fontFamily:FONT, fontWeight:700, fontSize:'clamp(28px,4vw,40px)',
              lineHeight:1.1, letterSpacing:'-.02em', color:WC.INK9, margin:0, maxWidth:620 }}>
              Lo que empieza a cambiar, leído con disciplina</h2>
            <span style={{ ...wMeta, color:WC.INK5 }}>{list.length} señales</span>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div style={{ display:'flex', flexWrap:'wrap', gap:10, margin:'32px 0 36px' }}>
            {TERRITORIES.map(t => <WTag key={t} label={t} light active={terr===t} onClick={()=>setTerr(t)} />)}
          </div>
        </Reveal>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:1, background:WC.LINE, border:`1px solid ${WC.LINE}` }}>
          {list.map((s,i) => (
            <Reveal key={s.title} delay={(i%3)*70}>
              <article className="signal-card" style={{ background:WC.CAL, padding:'28px 26px', display:'flex', flexDirection:'column', height:'100%', transition:'background .18s' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:14 }}>
                  <span style={{ ...wMeta, color:WC.EMERALD }}>Señal</span>
                  <span style={{ ...wMeta, color:WC.INK5 }}>{s.date}</span>
                </div>
                <h3 style={{ fontFamily:FONT, fontWeight:700, fontSize:21, lineHeight:1.2, color:WC.INK9, margin:'0 0 14px' }}>{s.title}</h3>
                <div style={{ marginBottom:14 }}><WTag label={s.terr} light /></div>
                <p style={{ fontFamily:FONT, fontWeight:500, fontSize:14.5, lineHeight:1.55, color:WC.INK7, margin:'0 0 18px', flex:1 }}>{s.text}</p>
                <a href="#" style={{ fontFamily:FONT, fontWeight:400, fontSize:14.5, color:WC.EMERALD,
                  textDecoration:'underline', textUnderlineOffset:3, textDecorationThickness:'1px', alignSelf:'flex-start' }}>Leer la señal →</a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- VOCES --------------------------------------------------------------- */
function Voces() {
  return (
    <section id="voces" style={{ background:WC.PETROL8, borderTop:`1px solid ${WC.PETROL7}`, padding:'clamp(64px,9vw,112px) clamp(20px,5vw,64px)' }}>
      <div style={{ maxWidth:1280, margin:'0 auto' }}>
        <Reveal><Eyebrow ix="05" label="Voces" /></Reveal>
        <Reveal as="h2" delay={60} style={{ fontFamily:FONT, fontWeight:700, fontSize:'clamp(28px,4vw,40px)',
          lineHeight:1.1, letterSpacing:'-.02em', color:WC.CAL, margin:'24px 0 0', maxWidth:620 }}>
          Quienes piensan, investigan y construyen futuros</Reveal>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:20, marginTop:40 }}>
          {VOCES.map((v,i) => (
            <Reveal key={v.name} delay={i*80}>
              <article className="voz-card" style={{ background:WC.PETROL, border:`1px solid ${WC.PETROL7}`, borderRadius:8, padding:18, height:'100%', transition:'border-color .18s, transform .18s' }}>
                <Duotone ratio="4 / 3" label={`retrato · ${v.name.toLowerCase()}`} radius={6} seed={i} />
                <div style={{ padding:'18px 8px 8px' }}>
                  <h3 style={{ fontFamily:FONT, fontWeight:700, fontSize:19, color:WC.CAL, margin:'0 0 4px' }}>{v.name}</h3>
                  <div style={{ ...wMeta, fontSize:11.5, marginBottom:14 }}>{v.role}</div>
                  <WTag label={v.terr} />
                  <p style={{ fontFamily:FONT, fontWeight:500, fontSize:14.5, lineHeight:1.55, color:WC.BODY, margin:'16px 0 14px' }}>{v.bio}</p>
                  <a href="#" style={{ fontFamily:FONT, fontWeight:400, fontSize:14, color:WC.MINT, textDecoration:'underline', textUnderlineOffset:4 }}>Ver perfil →</a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- FOOTER -------------------------------------------------------------- */
function Footer({ onJoin, onComunidad }) {
  return (
    <footer style={{ ...hair, borderTop:`1px solid ${WC.PETROL7}`, padding:'clamp(72px,10vw,120px) clamp(20px,5vw,64px) 56px' }}>
      <div style={{ maxWidth:1280, margin:'0 auto' }}>
        <Reveal as="h2" style={{ fontFamily:FONT, fontWeight:900, fontSize:'clamp(34px,6vw,64px)',
          lineHeight:1, letterSpacing:'-.025em', color:WC.CAL, margin:'0 0 28px', maxWidth:840 }}>
          Imagina y diseña lo que viene desde <span style={{ color:WC.MINT }}>CDMX</span>.</Reveal>
        <Reveal delay={80}>
          <div style={{ display:'flex', gap:14, flexWrap:'wrap', marginBottom:72 }}>
            <WBtn onClick={onJoin}>Únete a la comunidad</WBtn>
            <WBtn variant="ghost" onClick={onComunidad}>Entrar a la comunidad</WBtn>
          </div>
        </Reveal>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:20,
          paddingTop:28, borderTop:`1px solid ${WC.PETROL7}` }}>
          <WLogo dark />
          <div style={{ textAlign:'right' }}>
            <div style={{ ...wMeta, color:WC.MINT }}>Señal en lo oscuro</div>
            <div style={{ ...wMeta, marginTop:6 }}>19.4326° N · 99.1332° W · EST. 2026</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { NextEvent, Territorios, Archive, Voces, Footer, TERRITORIES, TERR_DEFS, SIGNALS, VOCES });
