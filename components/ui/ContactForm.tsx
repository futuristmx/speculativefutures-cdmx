'use client';
import { useState } from 'react';
import { WBtn } from '@/components/ui/WBtn';
import { C, FONT, meta } from '@/lib/tokens';

interface ContactFormProps {
  onSent?: () => void;
  compact?: boolean;
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

export function ContactForm({ onSent, compact = false }: ContactFormProps) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState('');
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' });

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
        onSent?.();
      } else {
        setError('Hubo un error al enviar. Escríbenos directo a speculativefuturescdmx@gmail.com');
      }
    } catch {
      setError('Sin conexión. Escríbenos a speculativefuturescdmx@gmail.com');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div>
        <h3 style={{ fontFamily: FONT, fontWeight: 700, fontSize: 22, color: C.MINT, margin: '0 0 10px', letterSpacing: '-.01em' }}>
          Mensaje enviado.
        </h3>
        <p style={{ fontFamily: FONT, fontWeight: 500, fontSize: 15, lineHeight: 1.55, color: C.BODY, margin: 0 }}>
          Gracias por escribirnos. Te respondemos en los próximos días.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: compact ? 'block' : 'grid', gridTemplateColumns: compact ? undefined : '1fr 1fr', gap: 14 }}>
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
        <div style={{ marginTop: compact ? 14 : 0 }}>
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
      </div>
      <div>
        <label style={{ ...meta, color: C.BODY, display: 'block', marginBottom: 6 }}>Mensaje</label>
        <textarea
          required
          rows={compact ? 4 : 3}
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

      <div>
        <WBtn>{loading ? 'Enviando…' : 'Enviar mensaje'}</WBtn>
      </div>
    </form>
  );
}
