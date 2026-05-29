/* Go-live deliverable — feed mock + lightbox (swipeable carousels) + captions + PNG export */
const { useState, useRef, useEffect, useCallback } = React;
const C = window.GL_COLORS;
const POSTS = window.GOLIVE_POSTS;

/* ---- go-live calendar (playbook §4) ------------------------------------- */
const DAY_OFFSET = [0, 2, 4, 7, 9, 11];      // Mar, Jue, Sáb, Mar, Jue, Sáb
const TIMES = ['20:30', '20:30', '11:00', '20:30', '20:30', '11:00'];
const DOW = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const MON = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

function parseISO(s) { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); }
function calendarFor(startISO) {
  const base = parseISO(startISO);
  return DAY_OFFSET.map((off, i) => {
    const d = new Date(base); d.setDate(base.getDate() + off);
    const iso = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
    const chip = `${DOW[d.getDay()]} ${d.getDate()} ${MON[d.getMonth()]} · ${TIMES[i]}`;
    return { iso, chip };
  });
}

/* ---- scaling helper ------------------------------------------------------ */
function useFit(maxScale, padV) {
  const [scale, setScale] = useState(0.4);
  useEffect(() => {
    const fit = () => setScale(Math.min(maxScale, (window.innerHeight - padV) / 1350));
    fit(); window.addEventListener('resize', fit); return () => window.removeEventListener('resize', fit);
  }, [maxScale, padV]);
  return scale;
}

function Scaled({ scale, children }) {
  return (
    <div style={{ width: 1080 * scale, height: 1350 * scale, overflow: 'hidden', flex: '0 0 auto' }}>
      <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left', width: 1080, height: 1350 }}>{children}</div>
    </div>
  );
}

const meta = { fontFamily: "'Gotham',sans-serif", fontWeight: 500, fontSize: 12, letterSpacing: '.08em', textTransform: 'uppercase', color: C.SLATE };

/* carousel corner badge (Instagram-style stacked squares) */
function CarouselBadge() {
  return (
    <div style={{ position: 'absolute', top: 12, right: 12 }}>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <rect x="7.5" y="3.5" width="13" height="13" rx="2.5" stroke="#fff" strokeWidth="1.8" fill="rgba(6,36,36,.45)" />
        <rect x="3.5" y="7.5" width="13" height="13" rx="2.5" stroke="#fff" strokeWidth="1.8" fill="rgba(6,36,36,.65)" />
      </svg>
    </div>
  );
}

/* ============================ FEED MOCK ================================== */
function FeedMock({ dates, onOpen }) {
  // Instagram shows newest first → published 01..06 displays as 06,05,04 / 03,02,01
  const gridOrder = [...POSTS].reverse();
  return (
    <div style={{ width: 600, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 28, marginBottom: 24 }}>
        <div style={{ width: 92, height: 92, borderRadius: '50%', border: `2px solid ${C.MINT}`, display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.PETROL, flex: '0 0 92px' }}>
          <window.IsotypeG size={50} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
            <span style={{ fontFamily: "'Gotham',sans-serif", fontWeight: 500, fontSize: 20, color: C.CAL }}>futures_mex</span>
            <span style={{ fontFamily: "'Gotham',sans-serif", fontWeight: 700, fontSize: 13, background: C.MINT, color: C.PETROL, padding: '8px 18px', borderRadius: 6 }}>Únete</span>
          </div>
          <div style={{ display: 'flex', gap: 28 }}>
            {[['6', 'posts'], ['—', 'seguidores'], ['1', 'siguiendo']].map(([n, l]) => (
              <span key={l} style={{ fontSize: 13.5, color: C.BODY, fontFamily: "'Gotham',sans-serif" }}><strong style={{ color: C.CAL, fontWeight: 700 }}>{n}</strong> {l}</span>
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
      <div style={{ ...meta, margin: '6px 0 20px', color: C.MINT }}>👇 Únete / propón una conversación</div>
      <div style={{ height: 1, background: C.LINE, marginBottom: 4 }} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 4 }}>
        {gridOrder.map((p) => {
          const isCar = !!p.slides;
          return (
            <button key={p.n} onClick={() => onOpen(POSTS.indexOf(p))} title={p.label}
              style={{ padding: 0, border: 'none', cursor: 'pointer', background: 'none', position: 'relative', display: 'block', lineHeight: 0 }}>
              <Scaled scale={197 / 1080}><window.PostSlide post={p} index={0} date={dates[p.calIdx].iso} /></Scaled>
              {isCar && <CarouselBadge />}
            </button>
          );
        })}
      </div>
      <div style={{ ...meta, marginTop: 18, textAlign: 'center', lineHeight: 1.6 }}>
        Orden real del grid: lo más reciente arriba-izquierda · al publicar 01→06, la convocatoria (06) queda arriba<br />
        <span style={{ color: C.EMERALD }}>Toca cualquier post para abrirlo, ver el carrusel y la caption</span>
      </div>
    </div>
  );
}

/* ============================ LIGHTBOX ================================== */
function Arrow({ dir, onClick }) {
  return (
    <button onClick={onClick} aria-label={dir < 0 ? 'anterior' : 'siguiente'} style={{
      width: 52, height: 52, borderRadius: '50%', border: `1px solid ${C.LINE}`, background: 'rgba(11,51,49,.85)',
      color: C.CAL, cursor: 'pointer', fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 52px' }}>
      {dir < 0 ? '‹' : '›'}
    </button>
  );
}

function CaptionPanel({ post, cal, onCopy }) {
  const full = post.caption.join('\n\n') + '\n\n' + window.HASHTAGS;
  return (
    <div style={{ width: 420, flex: '0 0 420px', borderLeft: `1px solid ${C.LINE}`, padding: '34px 32px', overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div>
        <div style={{ ...meta, color: C.MINT, marginBottom: 8 }}>Post {post.n} / 06</div>
        <div style={{ fontFamily: "'Gotham',sans-serif", fontWeight: 700, fontSize: 26, color: C.CAL, letterSpacing: '-.01em' }}>{post.label}</div>
        <div style={{ ...meta, marginTop: 8, color: C.SLATE }}>{post.format}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', border: `1px solid ${C.LINE}`, borderRadius: 6, background: C.PETROL8 }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: C.MINT, flex: '0 0 10px' }} />
        <div>
          <div style={{ ...meta, fontSize: 10, color: C.SLATE }}>Programado · CDMX</div>
          <div style={{ fontFamily: "'Gotham',sans-serif", fontWeight: 700, fontSize: 16, color: C.CAL, marginTop: 3 }}>{cal.chip}</div>
        </div>
      </div>
      <div>
        <div style={{ ...meta, color: C.SLATE, marginBottom: 12 }}>Caption</div>
        {post.caption.map((para, i) => (
          <p key={i} style={{ fontFamily: "'Gotham',sans-serif", fontWeight: 500, fontSize: 15, lineHeight: 1.6, color: C.BODY, margin: '0 0 14px' }}>{para}</p>
        ))}
      </div>
      <div>
        <div style={{ ...meta, color: C.SLATE, marginBottom: 10 }}>Hashtags</div>
        <div style={{ fontFamily: "'Gotham',sans-serif", fontWeight: 500, fontSize: 13.5, lineHeight: 1.7, color: C.EMERALD }}>{window.HASHTAGS}</div>
      </div>
      <button onClick={() => onCopy(full)} style={{
        marginTop: 'auto', fontFamily: "'Gotham',sans-serif", fontWeight: 700, fontSize: 14, cursor: 'pointer',
        background: 'transparent', color: C.CAL, border: `1px solid ${C.LINE}`, borderRadius: 6, padding: '14px 18px' }}>
        Copiar caption + hashtags
      </button>
    </div>
  );
}

function Lightbox({ openIdx, setOpenIdx, dates, onCapture, busy, toast }) {
  const post = POSTS[openIdx];
  const total = post.slides ? post.slides.length : 1;
  const [slide, setSlide] = useState(0);
  const scale = useFit(0.5, 230);

  useEffect(() => { setSlide(0); }, [openIdx]);

  const nextPost = useCallback((d) => {
    setOpenIdx((i) => (i + d + POSTS.length) % POSTS.length);
  }, [setOpenIdx]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpenIdx(null);
      else if (e.key === 'ArrowRight') { if (total > 1 && slide < total - 1) setSlide(slide + 1); else nextPost(1); }
      else if (e.key === 'ArrowLeft') { if (total > 1 && slide > 0) setSlide(slide - 1); else nextPost(-1); }
    };
    window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey);
  }, [slide, total, nextPost, setOpenIdx]);

  const cal = dates[post.calIdx];

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(3,18,18,.86)', backdropFilter: 'blur(3px)', display: 'flex', flexDirection: 'column' }}>
      {/* top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', flex: '0 0 auto', borderBottom: `1px solid ${C.LINE}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button onClick={() => nextPost(-1)} style={navBtn}>‹ Post anterior</button>
          <span style={{ ...meta, color: C.MINT }}>{post.n} / 06</span>
          <button onClick={() => nextPost(1)} style={navBtn}>Siguiente post ›</button>
        </div>
        <button onClick={() => setOpenIdx(null)} style={{ ...navBtn, fontSize: 18, padding: '6px 14px' }}>✕</button>
      </div>

      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        {/* stage */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, padding: 24, minWidth: 0 }}>
          {total > 1 ? <Arrow dir={-1} onClick={() => setSlide(Math.max(0, slide - 1))} /> : <span style={{ width: 52 }} />}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div style={{ border: `1px solid ${C.LINE}`, borderRadius: 12, overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,.5)' }}>
              <Scaled scale={scale}><window.PostSlide post={post} index={slide} date={cal.iso} /></Scaled>
            </div>
            {/* slide dots */}
            {total > 1 && (
              <div style={{ display: 'flex', gap: 9 }}>
                {Array.from({ length: total }).map((_, i) => (
                  <button key={i} onClick={() => setSlide(i)} style={{ width: 9, height: 9, borderRadius: '50%', border: 'none', cursor: 'pointer', padding: 0, background: i === slide ? C.MINT : C.LINE }} />
                ))}
              </div>
            )}
            {/* export */}
            <div style={{ display: 'flex', gap: 10 }}>
              <button disabled={busy} onClick={() => onCapture(post, slide)} style={primaryBtn(busy)}>
                {busy ? 'Generando…' : `Descargar PNG${total > 1 ? ` · slide ${slide + 1}` : ''}`}
              </button>
              {total > 1 && (
                <button disabled={busy} onClick={() => onCapture(post, 'all')} style={{ ...navBtn, opacity: busy ? .5 : 1 }}>Descargar las {total}</button>
              )}
            </div>
            <div style={{ ...meta, color: C.SLATE }}>1080 × 1350 · 4:5</div>
          </div>
          {total > 1 ? <Arrow dir={1} onClick={() => setSlide(Math.min(total - 1, slide + 1))} /> : <span style={{ width: 52 }} />}
        </div>

        <CaptionPanel post={post} cal={cal} onCopy={(t) => navigator.clipboard?.writeText(t)} />
      </div>

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: C.MINT, color: C.PETROL, fontFamily: "'Gotham',sans-serif", fontWeight: 700, fontSize: 14, padding: '12px 22px', borderRadius: 6, zIndex: 60 }}>{toast}</div>}
    </div>
  );
}

const navBtn = { fontFamily: "'Gotham',sans-serif", fontWeight: 500, fontSize: 13.5, cursor: 'pointer', background: 'transparent', color: '#C4D6CF', border: '1px solid #114442', borderRadius: 6, padding: '9px 16px' };
function primaryBtn(busy) { return { fontFamily: "'Gotham',sans-serif", fontWeight: 700, fontSize: 14, cursor: busy ? 'default' : 'pointer', background: '#66EBAC', color: '#062424', border: 'none', borderRadius: 6, padding: '13px 24px', opacity: busy ? .6 : 1 }; }

/* ============================ APP ROOT ================================== */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "goliveStart": "2026-06-02",
  "showTimestamp": false
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = window.useTweaks(TWEAK_DEFAULTS);
  const [openIdx, setOpenIdx] = useState(null);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState('');
  const [exportTarget, setExportTarget] = useState(null);
  const exportRef = useRef(null);

  const baseDates = calendarFor(t.goliveStart || '2026-06-02');
  const dates = baseDates.map(d => ({ ...d, iso: t.showTimestamp ? d.iso : '' }));

  const flash = (m) => { setToast(m); setTimeout(() => setToast(''), 2200); };

  const captureOne = useCallback(async (post, idx) => {
    setExportTarget({ post, idx });
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
    await (document.fonts ? document.fonts.ready : Promise.resolve());
    const url = await window.htmlToImage.toPng(exportRef.current, { width: 1080, height: 1350, pixelRatio: 1, cacheBust: true, backgroundColor: '#062424' });
    const a = document.createElement('a');
    a.href = url;
    a.download = `SF-CDMX_${post.n}${post.slides ? `-${idx + 1}` : ''}.png`;
    a.click();
  }, []);

  const onCapture = useCallback(async (post, which) => {
    if (busy) return;
    setBusy(true);
    try {
      if (which === 'all') {
        for (let i = 0; i < post.slides.length; i++) { await captureOne(post, i); await new Promise(r => setTimeout(r, 250)); }
        flash(`${post.slides.length} imágenes descargadas`);
      } else {
        await captureOne(post, which);
        flash('PNG descargado');
      }
    } catch (e) { flash('Error al exportar'); console.error(e); }
    setBusy(false);
    setExportTarget(null);
  }, [busy, captureOne]);

  return (
    <div style={{ minHeight: '100vh', background: C.PETROL, color: C.CAL, fontFamily: "'Gotham',sans-serif", display: 'flex', flexDirection: 'column' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 32px', borderBottom: `1px solid ${C.LINE}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <window.IsotypeG size={40} />
          <div>
            <div style={{ fontFamily: "'Gotham',sans-serif", fontWeight: 700, fontSize: 17 }}>Los 6 posts del go-live</div>
            <div style={{ ...meta, marginTop: 3 }}>@futures_mex · arco de prelanzamiento · 4:5</div>
          </div>
        </div>
        <span style={{ ...meta }}>19.4326° N · 99.1332° W · EST. 2026</span>
      </header>

      <main style={{ flex: 1, padding: '44px 24px 80px', overflow: 'auto' }}>
        <FeedMock dates={dates} onOpen={setOpenIdx} />
      </main>

      {openIdx !== null && (
        <Lightbox openIdx={openIdx} setOpenIdx={setOpenIdx} dates={dates} onCapture={onCapture} busy={busy} toast={toast} />
      )}

      {/* offscreen full-size render node for PNG export */}
      <div style={{ position: 'fixed', left: -20000, top: 0, width: 1080, height: 1350, pointerEvents: 'none' }}>
        <div ref={exportRef} style={{ width: 1080, height: 1350 }}>
          {exportTarget && <window.PostSlide post={exportTarget.post} index={exportTarget.idx} date={dates[exportTarget.post.calIdx].iso} />}
        </div>
      </div>

      <window.TweaksPanel title="Tweaks">
        <window.TweakSection label="Calendario del go-live" />
        <div style={{ padding: '4px 2px 12px' }}>
          <label style={{ display: 'block', fontFamily: "'Gotham',sans-serif", fontSize: 12, color: '#9fb3ad', marginBottom: 8, letterSpacing: '.04em' }}>Inicio (martes) — recalcula los 6 timestamps</label>
          <input type="date" value={t.goliveStart} onChange={(e) => setTweak('goliveStart', e.target.value)}
            style={{ width: '100%', fontFamily: "'Gotham',sans-serif", fontSize: 14, padding: '10px 12px', borderRadius: 6, border: '1px solid #2c4a47', background: '#0B3331', color: '#F4F7F5', colorScheme: 'dark' }} />
        </div>
        <window.TweakToggle label="Mostrar timestamp en el pie" value={t.showTimestamp} onChange={(v) => setTweak('showTimestamp', v)} />
      </window.TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
