'use client';
import { useState, useEffect } from 'react';
import { Overlay } from './Overlay';
import { WIsotype } from '@/components/ui/WIsotype';
import { WBtn } from '@/components/ui/WBtn';
import { C, FONT, meta } from '@/lib/tokens';

interface ContactFormOverlayProps {
  open: boolean;
  onClose: () => void;
}

const inputStyle = (focused: boolean): React.CSSProperties => ({
  width: '100%',
  background: C.PETROL,
  border: `1px solid ${focused ? C.MINT : C.SLATE}`,
  borderRadius: 4,
  padding: '12px 14px',
  color: C.CAL,
  fontFamily: FONT,
  fontSize: 15,
  outline: 'none',
  transition: 'border-color .18s',
  resize: 'none' as const,
});

export function ContactFormOverlay({ open, onClose }: ContactFormOverlayProps) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState('');
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' });

  useEffect(() => {
    if (open) { setSent(false); setError(''); setForm({ nombre: '', email: '', mensaje: '' }); }
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSent(true);
      } else {
        setError('Hubo un error al enviar. Escríbenos directo a speculativefuturescdmx@gmail.com');
      }
    } catch {
      setError('Sin conexión. Escríbenos a speculativefuturescdmx@gmail.com');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Overlay onClose={onClose} width={480}>
      <div style={{ marginBottom: 18 }}><WIsotype size={42} /></div>

      {!sent ? (
        <>
          <h3 style={{ fontFamily: FONT, fontWeight: 700, fontSize: 24, color: C.CAL, margin: '0 0 8px', letterSpacing: '-.01em' }}>
            Más información
          </h3>
          <p style={{ fontFamily: FONT, fontWeight: 500, fontSize: 15, lineHeight: 1.55, color: C.BODY, margin: '0 0 24px' }}>
            Cuéntanos quién eres y qué te interesa. Te respondemos pronto.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ ...meta, color: C.BODY, display: 'block', marginBottom: 6 }}>Nombre</label>
              <input
                required
                value={form.nombre}
                onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
                onFocus={() => setFocusedField('nombre')}
                onBlur={() => setFocusedField('')}
                placeholder="Tu nombre"
                style={inputStyle(focusedField === 'nombre')}
              />
            </div>
            <div>
              <label style={{ ...meta, color: C.BODY, display: 'block', marginBottom: 6 }}>Correo</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField('')}
                placeholder="tu@correo.com"
                style={inputStyle(focusedField === 'email')}
              />
            </div>
            <div>
              <label style={{ ...meta, color: C.BODY, display: 'block', marginBottom: 6 }}>Mensaje</label>
              <textarea
                required
                rows={4}
                value={form.mensaje}
                onChange={e => setForm(f => ({ ...f, mensaje: e.target.value }))}
                onFocus={() => setFocusedField('mensaje')}
                onBlur={() => setFocusedField('')}
                placeholder="¿Qué te interesa saber o proponer?"
                style={inputStyle(focusedField === 'mensaje')}
              />
            </div>

            {error && (
              <p style={{ fontFamily: FONT, fontSize: 13, color: '#ff8a80', margin: 0 }}>{error}</p>
            )}

            <WBtn>{loading ? 'Enviando…' : 'Enviar mensaje'}</WBtn>
          </form>
        </>
      ) : (
        <>
          <h3 style={{ fontFamily: FONT, fontWeight: 700, fontSize: 24, color: C.MINT, margin: '0 0 10px', letterSpacing: '-.01em' }}>
            Mensaje enviado.
          </h3>
          <p style={{ fontFamily: FONT, fontWeight: 500, fontSize: 15, lineHeight: 1.55, color: C.BODY, margin: '0 0 22px' }}>
            Gracias por escribirnos. Te respondemos en los próximos días.
          </p>
          <WBtn variant="ghost" onClick={onClose}>Cerrar</WBtn>
        </>
      )}
    </Overlay>
  );
}
