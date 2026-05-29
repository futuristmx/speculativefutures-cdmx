'use client';
import { useState } from 'react';
import { Nav } from '@/components/sections/Nav';
import { Hero, HeroVariant } from '@/components/sections/Hero';
import { NextEvent } from '@/components/sections/NextEvent';
import { Territorios } from '@/components/sections/Territorios';
import { Manifesto } from '@/components/sections/Manifesto';
import { Archive } from '@/components/sections/Archive';
import { Voces } from '@/components/sections/Voces';
import { Footer } from '@/components/sections/Footer';
import { JoinOverlay } from '@/components/overlays/JoinOverlay';
import { ComunidadOverlay } from '@/components/overlays/ComunidadOverlay';

export function SiteApp() {
  const [join, setJoin] = useState(false);
  const [comunidad, setComunidad] = useState(false);

  return (
    <div style={{ background: '#062424', color: '#F4F7F5', minHeight: '100vh' }}>
      <Nav onJoin={() => setJoin(true)} onComunidad={() => setComunidad(true)} />
      <Hero variant="nodes" onJoin={() => setJoin(true)} headline={0} />
      <NextEvent onJoin={() => setJoin(true)} />
      <Territorios />
      <Manifesto />
      <Archive />
      <Voces />
      <Footer onJoin={() => setJoin(true)} onComunidad={() => setComunidad(true)} />

      <JoinOverlay open={join} onClose={() => setJoin(false)} />
      <ComunidadOverlay open={comunidad} onClose={() => setComunidad(false)} onJoin={() => setJoin(true)} />
    </div>
  );
}
