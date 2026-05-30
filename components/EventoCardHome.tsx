import Link from 'next/link';
import type { ModalidadEvento } from '@prisma/client';
import { ModalidadBadge } from './ModalidadBadge';
import { EstadoRsvpBadge } from './EstadoRsvpBadge';
import { formatoFechaHoraCDMX } from '@/lib/eventos/fecha';

export interface EventoHomeData {
  id: string;
  titulo: string;
  descripcion: string;
  fechaInicio: Date;
  modalidad: ModalidadEvento;
  lleno?: boolean;
  miRsvp?: 'confirmado' | null;
}

interface Props {
  evento: EventoHomeData;
  locale: string;
  /** CTA distinto según sesión. */
  ctaLabel: string;
  ctaHref: string;
}

/** Card destacada de "próximo evento" para el home (D-S3-9). */
export function EventoCardHome({ evento, locale, ctaLabel, ctaHref }: Props) {
  return (
    <div className="rounded-md border border-petrol-700 bg-petrol-800 p-6 sm:p-8">
      <div className="text-[13px] uppercase tracking-[0.08em] text-mint-400">
        Próximo evento · {formatoFechaHoraCDMX(evento.fechaInicio)}
      </div>
      <h3 className="mt-3 font-bold text-[clamp(22px,3vw,30px)] leading-tight tracking-tight text-cal-50">
        {evento.titulo}
      </h3>
      <p className="mt-3 line-clamp-2 max-w-2xl text-[15px] leading-relaxed text-body-dark">
        {evento.descripcion}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <ModalidadBadge modalidad={evento.modalidad} />
        {evento.miRsvp === 'confirmado' ? (
          <EstadoRsvpBadge estado="confirmado" />
        ) : evento.lleno ? (
          <EstadoRsvpBadge estado="lleno" />
        ) : null}
      </div>
      <div className="mt-6 flex gap-3">
        <Link
          href={`/${locale}/eventos/${evento.id}`}
          className="inline-flex h-11 items-center rounded-md border border-petrol-700 px-5 text-[15px] text-cal-50 transition-colors hover:border-mint-400"
        >
          Ver detalle
        </Link>
        <Link
          href={ctaHref}
          className="inline-flex h-11 items-center rounded-md bg-mint-400 px-5 text-[15px] font-medium text-petrol-900 transition hover:brightness-110"
        >
          {ctaLabel}
        </Link>
      </div>
    </div>
  );
}
