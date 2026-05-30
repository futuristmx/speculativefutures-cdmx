'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { createClient } from '@/lib/supabase/client';

// Login por magic link (sin contraseña). Provider principal del MDP.
export default function LoginPage() {
  const t = useTranslations('auth');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    setStatus(error ? 'error' : 'sent');
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#062424',
        color: '#F4F7F5',
        padding: 24,
        fontFamily: "'Gotham', system-ui, sans-serif",
      }}
    >
      <div style={{ width: '100%', maxWidth: 420 }}>
        {status === 'sent' ? (
          <>
            <h1 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 12px' }}>
              {t('enlaceEnviado')}
            </h1>
            <p style={{ color: '#C4D6CF', lineHeight: 1.6 }}>
              {t('enlaceEnviadoDescripcion', { email })}
            </p>
          </>
        ) : (
          <>
            <h1 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 8px' }}>
              {t('loginTitulo')}
            </h1>
            <p style={{ color: '#C4D6CF', lineHeight: 1.6, margin: '0 0 24px' }}>
              {t('loginDescripcion')}
            </p>
            <form onSubmit={handleSubmit}>
              <label
                style={{
                  display: 'block',
                  fontSize: 12,
                  letterSpacing: '.08em',
                  textTransform: 'uppercase',
                  color: '#C4D6CF',
                  marginBottom: 8,
                }}
              >
                {t('emailLabel')}
              </label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('emailPlaceholder')}
                style={{
                  width: '100%',
                  background: '#062424',
                  border: '1px solid #547476',
                  borderRadius: 4,
                  padding: '12px 14px',
                  color: '#F4F7F5',
                  fontSize: 15,
                  outline: 'none',
                  marginBottom: 16,
                }}
              />
              <button
                type="submit"
                disabled={status === 'sending'}
                style={{
                  width: '100%',
                  background: '#66EBAC',
                  color: '#062424',
                  border: 'none',
                  borderRadius: 4,
                  padding: '13px 26px',
                  fontSize: 15,
                  fontWeight: 500,
                  cursor: status === 'sending' ? 'wait' : 'pointer',
                }}
              >
                {status === 'sending' ? t('enviando') : t('enviarEnlace')}
              </button>
              {status === 'error' && (
                <p style={{ color: '#ff8a80', fontSize: 13, marginTop: 12 }}>
                  {t('error')}
                </p>
              )}
            </form>
          </>
        )}
      </div>
    </main>
  );
}
