'use client';
import { useState, useEffect } from 'react';
import { Nav } from '@/components/sections/Nav';
import { Hero, HeroVariant } from '@/components/sections/Hero';
import { NextEvent } from '@/components/sections/NextEvent';
import { Territorios } from '@/components/sections/Territorios';
import { Manifesto } from '@/components/sections/Manifesto';
import { Footer } from '@/components/sections/Footer';
import { JoinOverlay } from '@/components/overlays/JoinOverlay';
import { ComunidadOverlay } from '@/components/overlays/ComunidadOverlay';
import { ContactFormOverlay } from '@/components/overlays/ContactFormOverlay';
import { TweaksWidget } from '@/components/dev/TweaksWidget';

// El widget de desarrollo sólo se incluye fuera de producción.
const IS_DEV = process.env.NODE_ENV === 'development';

export function SiteApp() {
  const [join, setJoin] = useState(false);
  const [comunidad, setComunidad] = useState(false);
  const [contact, setContact] = useState(false);

  const [variant, setVariant] = useState<HeroVariant>('nodes');
  const [headline, setHeadline] = useState(0);
  const [showGrid, setShowGrid] = useState(true);
  const [showMotion, setShowMotion] = useState(true);

  useEffect(() => {
    if (showMotion) {
      document.documentElement.classList.remove('no-motion');
    } else {
      document.documentElement.classList.add('no-motion');
    }
  }, [showMotion]);

  return (
    <div style={{ background: '#062424', color: '#F4F7F5', minHeight: '100vh' }}>
      <Nav onJoin={() => setJoin(true)} onComunidad={() => setComunidad(true)} />
      <Hero
        variant={variant}
        onJoin={() => setJoin(true)}
        headline={headline}
        showGrid={showGrid}
      />
      <NextEvent onContact={() => setContact(true)} />
      <Territorios showGrid={showGrid} />
      <Manifesto showGrid={showGrid} />
      <Footer
        onJoin={() => setJoin(true)}
        onComunidad={() => setComunidad(true)}
        showGrid={showGrid}
      />

      <JoinOverlay open={join} onClose={() => setJoin(false)} />
      <ComunidadOverlay
        open={comunidad}
        onClose={() => setComunidad(false)}
        onJoin={() => setJoin(true)}
      />
      <ContactFormOverlay open={contact} onClose={() => setContact(false)} />

      {IS_DEV && (
        <TweaksWidget
          variant={variant}
          headline={headline}
          showGrid={showGrid}
          showMotion={showMotion}
          onVariant={setVariant}
          onHeadline={setHeadline}
          onGrid={setShowGrid}
          onMotion={setShowMotion}
        />
      )}
    </div>
  );
}
