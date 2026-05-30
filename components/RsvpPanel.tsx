'use client';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Button, useToast } from '@/components/ui';
import { EstadoRsvpBadge } from '@/components/EstadoRsvpBadge';
import { confirmarRsvp } from '@/features/rsvp/actions/confirmar-rsvp';
import { cancelarRsvp } from '@/features/rsvp/actions/cancelar-rsvp';

interface Props {
  eventoId: string;
  locale: string;
  estado: 'anonimo' | 'sin_rsvp' | 'confirmado' | 'lleno' | 'cancelado_evento';
}

/** Panel de RSVP en el detalle del evento (D-S3-2/4/5/8). */
export function RsvpPanel({ eventoId, locale, estado }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [pending, startTransition] = useTransition();

  if (estado === 'cancelado_evento') {
    return <p className="text-slate-500">Este evento fue cancelado.</p>;
  }

  if (estado === 'anonimo') {
    return (
      <a
        href={`/${locale}/login?next=/eventos/${eventoId}`}
        className="inline-flex h-11 items-center rounded-md bg-mint-400 px-6 text-[15px] font-medium text-petrol-900 transition hover:brightness-110"
      >
        Inicia sesión para asistir
      </a>
    );
  }

  function confirmar() {
    startTransition(async () => {
      const res = await confirmarRsvp(eventoId);
      if (res.ok) {
        toast({
          title: 'Asistencia confirmada',
          description: 'Te enviamos un correo con los detalles.',
        });
        router.refresh();
      } else {
        toast({
          variant: 'error',
          title: 'No se pudo confirmar',
          description: res.error,
        });
      }
    });
  }

  function cancelar() {
    startTransition(async () => {
      const res = await cancelarRsvp(eventoId);
      if (res.ok) {
        toast({ title: 'RSVP cancelado' });
        router.refresh();
      } else {
        toast({ variant: 'error', title: 'No se pudo cancelar', description: res.error });
      }
    });
  }

  if (estado === 'confirmado') {
    return (
      <div className="flex flex-col gap-3">
        <EstadoRsvpBadge estado="confirmado" />
        <div className="flex flex-wrap gap-3">
          <a
            href={`/eventos/${eventoId}/ical`}
            className="inline-flex h-11 items-center rounded-md border border-petrol-700 px-5 text-[15px] text-cal-50 transition-colors hover:border-mint-400"
          >
            Añadir a mi calendario
          </a>
          <Button variant="outline" onClick={cancelar} disabled={pending}>
            {pending ? 'Cancelando…' : 'Cancelar mi RSVP'}
          </Button>
        </div>
      </div>
    );
  }

  if (estado === 'lleno') {
    return (
      <div className="flex flex-col gap-3">
        <EstadoRsvpBadge estado="lleno" />
        <Button variant="outline" disabled>
          Únete a la lista de espera
        </Button>
        <p className="text-[13px] text-slate-500">Te avisaremos si se libera un lugar.</p>
      </div>
    );
  }

  // sin_rsvp
  return (
    <Button onClick={confirmar} disabled={pending} size="lg">
      {pending ? 'Confirmando…' : 'Confirmar asistencia'}
    </Button>
  );
}
