import { Globe, MapPin, Layers } from 'lucide-react';
import type { ModalidadEvento } from '@prisma/client';

const CONF: Record<ModalidadEvento, { label: string; Icon: typeof Globe }> = {
  online: { label: 'Online', Icon: Globe },
  presencial: { label: 'Presencial', Icon: MapPin },
  hibrido: { label: 'Híbrido', Icon: Layers },
};

export function ModalidadBadge({ modalidad }: { modalidad: ModalidadEvento }) {
  const { label, Icon } = CONF[modalidad];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-petrol-700 px-3 py-1 text-[11.5px] font-medium uppercase tracking-[0.08em] text-body-dark">
      <Icon className="h-3.5 w-3.5 text-mint-400" />
      {label}
    </span>
  );
}
