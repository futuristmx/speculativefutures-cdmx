'use client';
import { Reveal } from '@/components/ui/Reveal';
import { WBtn } from '@/components/ui/WBtn';
import { WIsotype } from '@/components/ui/WIsotype';
import { NodeNetwork } from '@/components/ui/NodeNetwork';
import { C, FONT, meta, HAIR } from '@/lib/tokens';

const HEADLINES = [
  ['Futuros posibles desde ', 'Ciudad de México', '.'],
  ['Hacemos visible lo que ', 'empieza a cambiar', '.'],
  ['Leemos señales débiles, emergentes y ', 'contradictorias', '.'],
];

const SUB =
  'Comunidad interdisciplinaria para imaginar, cuestionar y activar futuros: foresight, diseño especulativo, innovación, cultura, tecnología, ciudad y sociedad, en la misma conversación.';

function HeroKicker() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 36 }}>
      <span
        className="kicker-dot"
        style={{ width: 9, height: 9, borderRadius: '50%', background: C.MINT }}
      />
      <span style={meta}>Capítulo CDMX · de @speculativefutures</span>
    </div>
  );
}

function HeadlineText({ idx, size }: { idx: number; size: string }) {
  const h = HEADLINES[idx] || HEADLINES[0];
  return (
    <h1
      style={{
        fontFamily: FONT,
        fontWeight: 900,
        fontSize: size,
        lineHeight: 0.98,
        letterSpacing: '-.025em',
        color: C.CAL,
        margin: 0,
        maxWidth: 1000,
      }}
    >
      {h[0]}
      <span style={{ color: C.MINT }}>{h[1]}</span>
      {h[2]}
    </h1>
  );
}

function CoordRule({ light = false }: { light?: boolean }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 24,
        flexWrap: 'wrap',
        marginTop: 56,
        paddingTop: 22,
        borderTop: `1px solid ${light ? C.LINE : C.PETROL7}`,
      }}
    >
      <span style={{ ...meta, color: light ? C.INK5 : C.SLATE }}>
        19.4326° N · 99.1332° W
      </span>
      <span style={{ ...meta, color: light ? C.INK5 : C.SLATE }}>CDMX</span>
      <span style={{ ...meta, color: light ? C.INK5 : C.SLATE }}>EST. 2026</span>
    </div>
  );
}

function HeroCTAs({ onJoin }: { onJoin: () => void }) {
  return (
    <div style={{ display: 'flex', gap: 14, marginTop: 44, flexWrap: 'wrap' }}>
      <WBtn onClick={onJoin}>Únete a la comunidad</WBtn>
      <WBtn variant="ghost" href="#eventos">
        Ver próximos eventos
      </WBtn>
    </div>
  );
}

/* ---- A · RED DE NODOS ---------------------------------------------------- */
function HeroNodes({
  onJoin,
  headline,
  showGrid,
}: {
  onJoin: () => void;
  headline: number;
  showGrid: boolean;
}) {
  return (
    <header
      id="top"
      style={{
        ...(showGrid ? HAIR : {}),
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(56px,8vw,96px) clamp(20px,5vw,64px) clamp(56px,8vw,88px)',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1.05fr) minmax(0,.95fr)',
          gap: 'clamp(24px,4vw,56px)',
          alignItems: 'center',
        }}
        className="hero-grid"
      >
        <div>
          <Reveal>
            <HeroKicker />
          </Reveal>
          <Reveal delay={80}>
            <HeadlineText idx={headline} size="clamp(42px,6.6vw,80px)" />
          </Reveal>
          <Reveal
            delay={160}
            as="p"
            style={{
              fontFamily: FONT,
              fontWeight: 500,
              fontSize: 'clamp(16px,1.7vw,19px)',
              lineHeight: 1.6,
              color: C.BODY,
              marginTop: 30,
              maxWidth: 600,
            }}
          >
            {SUB}
          </Reveal>
          <Reveal delay={220}>
            <HeroCTAs onJoin={onJoin} />
          </Reveal>
          <Reveal delay={280}>
            <CoordRule />
          </Reveal>
        </div>
        <div className="hero-graphic">
          <NodeNetwork height={520} />
        </div>
      </div>
    </header>
  );
}

/* ---- B · TERRITORIO DUOTONO ---------------------------------------------- */
function HeroDuotone({
  onJoin,
  headline,
  showGrid,
}: {
  onJoin: () => void;
  headline: number;
  showGrid: boolean;
}) {
  return (
    <header
      id="top"
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: 'min(86vh,820px)',
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(160deg, #0a2c2b, ${C.PETROL} 70%)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.45,
          backgroundImage:
            'repeating-linear-gradient(22deg, rgba(67,153,115,.20) 0 2px, transparent 2px 10px)',
        }}
      />
      {showGrid && (
        <div
          style={{ position: 'absolute', inset: 0, backgroundImage: 'var(--hair-bg)' }}
        />
      )}
      <div
        style={{
          position: 'absolute',
          right: '12%',
          top: '24%',
          width: '34vw',
          maxWidth: 520,
          aspectRatio: '1',
          background:
            'radial-gradient(circle, rgba(102,235,172,.20), rgba(102,235,172,.05) 55%, transparent 70%)',
        }}
      />
      <div style={{ position: 'absolute', right: 'clamp(28px,8vw,140px)', top: '30%' }}>
        <WIsotype size={130} />
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(0deg, rgba(6,36,36,.86) 8%, rgba(6,36,36,.2) 60%, transparent)',
        }}
      />
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 clamp(20px,5vw,64px) clamp(48px,7vw,80px)',
        }}
      >
        <Reveal>
          <HeroKicker />
        </Reveal>
        <Reveal delay={80}>
          <HeadlineText idx={headline} size="clamp(44px,8.2vw,92px)" />
        </Reveal>
        <Reveal
          delay={160}
          as="p"
          style={{
            fontFamily: FONT,
            fontWeight: 500,
            fontSize: 'clamp(16px,1.7vw,19px)',
            lineHeight: 1.6,
            color: C.BODY,
            marginTop: 28,
            maxWidth: 600,
          }}
        >
          {SUB}
        </Reveal>
        <Reveal delay={220}>
          <HeroCTAs onJoin={onJoin} />
        </Reveal>
        <Reveal delay={280}>
          <CoordRule />
        </Reveal>
      </div>
    </header>
  );
}

/* ---- C · MANIFIESTO EDITORIAL -------------------------------------------- */
function HeroEditorial({
  onJoin,
  headline,
  showGrid,
}: {
  onJoin: () => void;
  headline: number;
  showGrid: boolean;
}) {
  return (
    <header
      id="top"
      style={{
        ...(showGrid ? HAIR : {}),
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(64px,10vw,128px) clamp(20px,5vw,64px) clamp(56px,8vw,96px)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '-7%',
          right: '-5%',
          opacity: 0.9,
          pointerEvents: 'none',
        }}
      >
        <svg width="min(46vw,560px)" viewBox="0 0 165 150" style={{ display: 'block' }}>
          <polygon
            points="33.51 48.75 139.57 24.09 107.74 128.8"
            fill="none"
            stroke={C.PETROL7}
            strokeWidth="1.4"
          />
          <circle
            cx="84.95"
            cy="85.8"
            r="25.79"
            fill="none"
            stroke={C.EMERALD}
            strokeWidth="1.4"
          />
        </svg>
      </div>
      <div style={{ position: 'relative', maxWidth: 1100, margin: '0 auto' }}>
        <Reveal>
          <HeroKicker />
        </Reveal>
        <Reveal delay={80}>
          <HeadlineText idx={headline} size="clamp(46px,9.5vw,112px)" />
        </Reveal>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
            gap: 'clamp(20px,4vw,56px)',
            marginTop: 40,
            alignItems: 'end',
          }}
          className="hero-grid"
        >
          <Reveal
            delay={160}
            as="p"
            style={{
              fontFamily: FONT,
              fontWeight: 500,
              fontSize: 'clamp(16px,1.7vw,19px)',
              lineHeight: 1.6,
              color: C.BODY,
              margin: 0,
              maxWidth: 560,
            }}
          >
            {SUB}
          </Reveal>
          <Reveal delay={220} style={{ justifySelf: 'start' }}>
            <HeroCTAs onJoin={onJoin} />
          </Reveal>
        </div>
        <Reveal delay={280}>
          <CoordRule />
        </Reveal>
      </div>
    </header>
  );
}

export type HeroVariant = 'nodes' | 'duotono' | 'editorial';

interface HeroProps {
  variant?: HeroVariant;
  onJoin: () => void;
  headline?: number;
  showGrid?: boolean;
}

export function Hero({
  variant = 'nodes',
  onJoin,
  headline = 0,
  showGrid = true,
}: HeroProps) {
  if (variant === 'duotono')
    return <HeroDuotone onJoin={onJoin} headline={headline} showGrid={showGrid} />;
  if (variant === 'editorial')
    return <HeroEditorial onJoin={onJoin} headline={headline} showGrid={showGrid} />;
  return <HeroNodes onJoin={onJoin} headline={headline} showGrid={showGrid} />;
}
