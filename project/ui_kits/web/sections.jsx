/* ============================================================================
   SF CDMX — Web UI kit · Archive (light), Voces, Footer, data
   Depends on components.jsx (WC, atoms) loaded first.
   ============================================================================ */

const TERRITORIES = ['Todas','Futuros & Foresight','Innovación & Negocios','Ciudad & Sistemas Vivos','Cultura & Sociedad','Tecnologías Emergentes'];

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
    bio:'Investiga imaginarios urbanos y prototipos de servicios para escenarios de escasez de agua.', h:152 },
  { name:'Investigador urbano', role:'Sistemas vivos · CDMX', terr:'Ciudad & Sistemas Vivos',
    bio:'Mapea infraestructuras informales como prototipos de la ciudad que viene.', h:130 },
  { name:'Tecnóloga cívica', role:'IA & contexto local', terr:'Tecnologías Emergentes',
    bio:'Construye herramientas de IA con memoria de barrio y gobernanza comunitaria.', h:168 },
];

/* ---- ARCHIVE (LIGHT) ----------------------------------------------------- */
function Archive() {
  const [terr, setTerr] = useState('Todas');
  const list = terr === 'Todas' ? SIGNALS : SIGNALS.filter(s => s.terr === terr);
  return (
    <section id="senales" style={{ background:WC.CAL, color:WC.INK9, padding:'clamp(64px,9vw,112px) clamp(20px,5vw,64px)' }}>
      <div style={{ maxWidth:1280, margin:'0 auto' }}>
        <Eyebrow ix="03" label="Archivo de señales" light />
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:16, marginTop:24 }}>
          <h2 style={{ fontFamily:"'Gotham',sans-serif", fontWeight:700, fontSize:'clamp(28px,4vw,40px)',
            lineHeight:1.1, letterSpacing:'-.02em', color:WC.INK9, margin:0, maxWidth:620 }}>
            Lo que empieza a cambiar, leído con disciplina</h2>
          <span style={{ ...wMeta, color:WC.INK5 }}>{list.length} señales</span>
        </div>
        <div style={{ display:'flex', flexWrap:'wrap', gap:10, margin:'32px 0 36px' }}>
          {TERRITORIES.map(t => <WTag key={t} label={t} light active={terr===t} onClick={()=>setTerr(t)} />)}
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:1, background:WC.LINE, border:`1px solid ${WC.LINE}` }}>
          {list.map(s => (
            <article key={s.title} style={{ background:WC.CAL, padding:'28px 26px', display:'flex', flexDirection:'column' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:14 }}>
                <span style={{ ...wMeta, color:WC.EMERALD }}>Señal</span>
                <span style={{ ...wMeta, color:WC.INK5 }}>{s.date}</span>
              </div>
              <h3 style={{ fontFamily:"'Gotham',sans-serif", fontWeight:700, fontSize:21, lineHeight:1.2, color:WC.INK9, margin:'0 0 14px' }}>{s.title}</h3>
              <div style={{ marginBottom:14 }}><WTag label={s.terr} light /></div>
              <p style={{ fontFamily:"'Gotham',sans-serif", fontWeight:500, fontSize:14.5, lineHeight:1.55, color:WC.INK7, margin:'0 0 18px', flex:1 }}>{s.text}</p>
              <a href="#" style={{ fontFamily:"'Gotham',sans-serif", fontWeight:400, fontSize:14.5, color:WC.EMERALD,
                textDecoration:'underline', textUnderlineOffset:3, textDecorationThickness:'1px', alignSelf:'flex-start' }}>Leer la señal →</a>
            </article>
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
        <Eyebrow ix="04" label="Voces" />
        <h2 style={{ fontFamily:"'Gotham',sans-serif", fontWeight:700, fontSize:'clamp(28px,4vw,40px)',
          lineHeight:1.1, letterSpacing:'-.02em', color:WC.CAL, margin:'24px 0 0', maxWidth:620 }}>
          Quienes piensan, investigan y construyen futuros</h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:20, marginTop:40 }}>
          {VOCES.map(v => (
            <article key={v.name} style={{ background:WC.PETROL, border:`1px solid ${WC.PETROL7}`, borderRadius:8, padding:26 }}>
              <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:18 }}>
                <div style={{ width:58, height:58, borderRadius:'50%', flex:'0 0 58px', position:'relative',
                  overflow:'hidden', background:`linear-gradient(140deg, ${WC.PETROL7}, ${WC.EMERALD})` }}>
                  <div style={{ position:'absolute', left:'50%', bottom:-7, width:30, height:30, borderRadius:'50% 50% 0 0', background:WC.MINT, opacity:.4, transform:'translateX(-50%)' }} />
                </div>
                <div>
                  <h3 style={{ fontFamily:"'Gotham',sans-serif", fontWeight:700, fontSize:19, color:WC.CAL, margin:0 }}>{v.name}</h3>
                  <div style={{ ...wMeta, fontSize:11.5, marginTop:4 }}>{v.role}</div>
                </div>
              </div>
              <WTag label={v.terr} />
              <p style={{ fontFamily:"'Gotham',sans-serif", fontWeight:500, fontSize:14.5, lineHeight:1.55, color:WC.BODY, margin:'16px 0 14px' }}>{v.bio}</p>
              <a href="#" style={{ fontFamily:"'Gotham',sans-serif", fontWeight:400, fontSize:14, color:WC.MINT, textDecoration:'underline', textUnderlineOffset:4 }}>Ver perfil →</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- FOOTER -------------------------------------------------------------- */
function Footer({ onJoin }) {
  return (
    <footer style={{ ...hair, borderTop:`1px solid ${WC.PETROL7}`, padding:'clamp(72px,10vw,120px) clamp(20px,5vw,64px) 56px' }}>
      <div style={{ maxWidth:1280, margin:'0 auto' }}>
        <h2 style={{ fontFamily:"'Gotham',sans-serif", fontWeight:900, fontSize:'clamp(34px,6vw,64px)',
          lineHeight:1, letterSpacing:'-.025em', color:WC.CAL, margin:'0 0 28px', maxWidth:840 }}>
          Imagina y diseña lo que viene desde <span style={{ color:WC.MINT }}>CDMX</span>.</h2>
        <div style={{ display:'flex', gap:14, flexWrap:'wrap', marginBottom:72 }}>
          <WBtn onClick={onJoin}>Únete a la comunidad</WBtn>
          <WBtn variant="ghost">Propón una conversación</WBtn>
        </div>
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

Object.assign(window, { Archive, Voces, Footer, TERRITORIES, SIGNALS, VOCES });
