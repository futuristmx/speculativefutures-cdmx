import Link from 'next/link';
import type { ModalidadEvento } from '@prisma/client';
import { ModalidadBadge } from './ModalidadBadge';
import { TerritorioBadge } from './TerritorioBadge';
import { EstadoRsvpBadge } from './EstadoRsvpBadge';
import { formatoFechaHoraCDMX } from '@/lib/eventos/fecha';

export interface EventoCardData {
  id: string;
  titulo: string;
  fechaInicio: Date;
  modalidad: ModalidadEvento;
  territorioNombre?: string | null;
  territorioCodigo?: string | null;
  lleno?: boolean;
  miRsvp?: 'confirmado' | null;
}

export function EventoCard({
  evento,
  locale,
}: {
  evento: EventoCardData;
  locale: string;
}) {
  return (
    <Link
      href={`/${locale}/eventos/${evento.id}`}
      className="block rounded-md border border-petrol-700 bg-petrol-800 p-5 transition-colors hover:border-mint-400"
    >
      <div className="text-[13px] uppercase tracking-[0.08em] text-mint-400">
        {formatoFechaHoraCDMX(evento.fechaInicio)}
      </div>
      <h3 className="mt-2 font-bold text-[19px] leading-tight text-cal-50">
        {evento.titulo}
      </h3>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <ModalidadBadge modalidad={evento.modalidad} />
        {evento.territorioNombre && (
          <TerritorioBadge
            nombre={evento.territorioNombre}
            codigo={evento.territorioCodigo ?? undefined}
          />
        )}
        {evento.miRsvp === 'confirmado' && <EstadoRsvpBadge estado="confirmado" />}
        {evento.miRsvp !== 'confirmado' && evento.lleno && (
          <EstadoRsvpBadge estado="lleno" />
        )}
      </div>
    </Link>
  );
}
