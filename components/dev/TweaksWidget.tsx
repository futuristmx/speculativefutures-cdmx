'use client';
import { useState, useEffect } from 'react';
import { C, FONT, meta } from '@/lib/tokens';
import type { HeroVariant } from '@/components/sections/Hero';

const HEADLINES = ['Ciudad de México', 'empieza a cambiar', 'contradictorias'];

interface TweaksWidgetProps {
  variant: HeroVariant;
  headline: number;
  showGrid: boolean;
  showMotion: boolean;
  onVariant: (v: HeroVariant) => void;
  onHeadline: (i: number) => void;
  onGrid: (v: boolean) => void;
  onMotion: (v: boolean) => void;
}

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!on)}
      aria-checked={on}
      role="switch"
      style={{
        width: 38,
        height: 22,
        borderRadius: 999,
        border: 'none',
        cursor: 'pointer',
        background: on ? C.MINT : C.PETROL7,
        position: 'relative',
        transition: 'background .18s',
        flexShrink: 0,
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: 3,
          left: on ? 19 : 3,
          width: 16,
          height: 16,
          borderRadius: '50%',
          background: on ? C.PETROL : C.SLATE,
          transition: 'left .18s',
        }}
      />
    </button>
  );
}

function SegmentedControl({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div
      style={{
        display: 'flex',
        border: `1px solid ${C.PETROL7}`,
        borderRadius: 6,
        overflow: 'hidden',
      }}
    >
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          style={{
            flex: 1,
            padding: '7px 4px',
            fontFamily: FONT,
            fontWeight: value === opt ? 700 : 400,
            fontSize: 12,
            border: 'none',
            borderRight: `1px solid ${C.PETROL7}`,
            cursor: 'pointer',
            background: value === opt ? C.PETROL7 : 'transparent',
            color: value === opt ? C.MINT : C.SLATE,
            transition: 'all .15s',
          }}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 12,
        minHeight: 32,
      }}
    >
      <span style={{ fontFamily: FONT, fontWeight: 400, fontSize: 13.5, color: C.BODY }}>
        {label}
      </span>
      {children}
    </div>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div
      style={{
        ...meta,
        color: C.SLATE,
        fontSize: 10.5,
        paddingBottom: 8,
        borderBottom: `1px solid ${C.PETROL7}`,
        marginBottom: 2,
      }}
    >
      {label}
    </div>
  );
}

export function TweaksWidget({
  variant,
  headline,
  showGrid,
  showMotion,
  onVariant,
  onHeadline,
  onGrid,
  onMotion,
}: TweaksWidgetProps) {
  const [visible, setVisible] = useState(true);

  // Collapse by default on small screens so it never covers content
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      setVisible(false);
    }
  }, []);

  return (
    <>
      {/* collapsed pill */}
      {!visible && (
        <button
          onClick={() => setVisible(true)}
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 50,
            background: C.PETROL8,
            border: `1px solid ${C.PETROL7}`,
            borderRadius: 999,
            padding: '9px 16px',
            fontFamily: FONT,
            fontWeight: 500,
            fontSize: 12.5,
            color: C.BODY,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            boxShadow: '0 4px 20px rgba(0,0,0,.4)',
            transition: 'border-color .18s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = C.MINT)}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.PETROL7)}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="2.5" fill={C.MINT} />
            <line x1="7" y1="0" x2="7" y2="4" stroke={C.MINT} strokeWidth="1.5" />
            <line x1="7" y1="10" x2="7" y2="14" stroke={C.MINT} strokeWidth="1.5" />
            <line x1="0" y1="7" x2="4" y2="7" stroke={C.MINT} strokeWidth="1.5" />
            <line x1="10" y1="7" x2="14" y2="7" stroke={C.MINT} strokeWidth="1.5" />
          </svg>
          Tweaks
        </button>
      )}

      {/* panel */}
      {visible && (
        <div
          className="tweaks-panel"
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 50,
            width: 240,
            maxHeight: 'calc(100vh - 48px)',
            overflowY: 'auto',
            background: 'rgba(11,51,49,.96)',
            border: `1px solid ${C.PETROL7}`,
            borderRadius: 10,
            boxShadow: '0 8px 32px rgba(0,0,0,.5)',
            backdropFilter: 'blur(12px)',
            overflow: 'hidden',
          }}
        >
          {/* header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 14px 11px',
              borderBottom: `1px solid ${C.PETROL7}`,
            }}
          >
            <span
              style={{
                fontFamily: FONT,
                fontWeight: 700,
                fontSize: 13,
                color: C.CAL,
                letterSpacing: '.03em',
              }}
            >
              Tweaks
            </span>
            <button
              onClick={() => setVisible(false)}
              style={{
                background: 'none',
                border: 'none',
                color: C.SLATE,
                fontSize: 18,
                cursor: 'pointer',
                lineHeight: 1,
                padding: '0 2px',
              }}
            >
              ×
            </button>
          </div>

          {/* body */}
          <div
            style={{
              padding: '14px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            <SectionLabel label="HERO" />

            <div>
              <span
                style={{
                  fontFamily: FONT,
                  fontWeight: 400,
                  fontSize: 13,
                  color: C.BODY,
                  display: 'block',
                  marginBottom: 8,
                }}
              >
                Dirección
              </span>
              <SegmentedControl
                options={['nodes', 'duotono', 'editorial']}
                value={variant}
                onChange={(v) => onVariant(v as HeroVariant)}
              />
            </div>

            <div>
              <span
                style={{
                  fontFamily: FONT,
                  fontWeight: 400,
                  fontSize: 13,
                  color: C.BODY,
                  display: 'block',
                  marginBottom: 6,
                }}
              >
                Titular
              </span>
              <select
                value={headline}
                onChange={(e) => onHeadline(Number(e.target.value))}
                style={{
                  width: '100%',
                  background: C.PETROL,
                  border: `1px solid ${C.PETROL7}`,
                  borderRadius: 4,
                  padding: '8px 10px',
                  color: C.CAL,
                  fontFamily: FONT,
                  fontSize: 13,
                  cursor: 'pointer',
                  outline: 'none',
                }}
              >
                {HEADLINES.map((h, i) => (
                  <option key={i} value={i}>
                    {h}
                  </option>
                ))}
              </select>
            </div>

            <SectionLabel label="SISTEMA GRÁFICO" />

            <Row label="Retícula de coordenadas">
              <Toggle on={showGrid} onChange={onGrid} />
            </Row>
            <Row label="Movimiento (reveals + nodos)">
              <Toggle on={showMotion} onChange={onMotion} />
            </Row>
          </div>
        </div>
      )}
    </>
  );
}
