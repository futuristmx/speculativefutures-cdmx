'use client';
import { useRef, useEffect } from 'react';
import { C, FONT } from '@/lib/tokens';

interface NodeNetworkProps {
  height?: number;
}

const nodes = [
  { x: 0.16, y: 0.30, r: 5,  mint: false },
  { x: 0.40, y: 0.16, r: 5,  mint: false },
  { x: 0.70, y: 0.24, r: 5,  mint: false },
  { x: 0.86, y: 0.46, r: 5,  mint: false },
  { x: 0.58, y: 0.50, r: 14, mint: true  },
  { x: 0.28, y: 0.62, r: 5,  mint: false },
  { x: 0.48, y: 0.82, r: 5,  mint: false },
  { x: 0.78, y: 0.76, r: 5,  mint: false },
];

const edges = [[0,4],[1,4],[2,4],[4,3],[4,5],[4,6],[6,7],[2,7]];

export function NodeNetwork({ height = 460 }: NodeNetworkProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--reveal-delay', '120ms');
    if (document.documentElement.classList.contains('no-motion')) {
      el.classList.add('in');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { el.classList.add('in'); io.unobserve(el); } }),
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="reveal nodenet" style={{ width: '100%' }}>
      <svg
        viewBox="0 0 1000 660"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: 'auto', display: 'block', maxHeight: height }}
      >
        <g stroke={C.SLATE} strokeWidth="1" opacity=".22">
          <line x1="0" y1="165" x2="1000" y2="165" />
          <line x1="0" y1="330" x2="1000" y2="330" />
          <line x1="0" y1="495" x2="1000" y2="495" />
          <line x1="250" y1="0" x2="250" y2="660" />
          <line x1="500" y1="0" x2="500" y2="660" />
          <line x1="750" y1="0" x2="750" y2="660" />
        </g>

        {edges.map(([a, b], i) => {
          const A = nodes[a], B = nodes[b];
          return (
            <line
              key={i}
              className="netline"
              x1={A.x * 1000} y1={A.y * 660}
              x2={B.x * 1000} y2={B.y * 660}
              stroke={C.EMERALD}
              strokeWidth="1.6"
              style={{ '--d': (i * 90) + 'ms' } as React.CSSProperties}
            />
          );
        })}

        {nodes.map((n, i) =>
          n.mint ? (
            <g key={i} className="netsignal">
              <circle cx={n.x * 1000} cy={n.y * 660} r="30" fill="none" stroke={C.MINT} strokeWidth="1.2" className="netpulse" />
              <circle cx={n.x * 1000} cy={n.y * 660} r={n.r} fill={C.MINT} />
            </g>
          ) : (
            <circle
              key={i}
              className="netdot"
              cx={n.x * 1000} cy={n.y * 660}
              r={n.r}
              fill={C.SLATE}
              style={{ '--d': (300 + i * 60) + 'ms' } as React.CSSProperties}
            />
          )
        )}

        <text x="26" y="636" fontFamily={FONT} fontWeight="500" fontSize="15" letterSpacing="1.5" fill={C.SLATE}>
          19.4326° N · 99.1332° W
        </text>
        <text x="650" y="56" fontFamily={FONT} fontWeight="500" fontSize="15" letterSpacing="2" fill={C.MINT}>
          SEÑAL ACTIVA
        </text>
      </svg>
    </div>
  );
}
