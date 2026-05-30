import Link from 'next/link';
import { MiembroAvatar } from './MiembroAvatar';
import { RolBadge } from './RolBadge';
import type { RolContribucion } from '@prisma/client';

export interface MiembroCardData {
  userId: string;
  nombre: string;
  foto: string | null;
  disciplina: string | null;
  rolContribucion: RolContribucion;
  primerTerritorio?: string | null;
}

/** Card resumen de un miembro para listados. Enlaza a su perfil público. */
export function MiembroCard({
  miembro,
  locale,
}: {
  miembro: MiembroCardData;
  locale: string;
}) {
  return (
    <Link
      href={`/${locale}/perfil/${miembro.userId}`}
      className="block rounded-md border border-petrol-700 bg-petrol-800 p-5 transition-colors hover:border-mint-400"
    >
      <div className="flex items-start gap-4">
        <MiembroAvatar
          nombre={miembro.nombre}
          foto={miembro.foto}
          id={miembro.userId}
          size={52}
        />
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-bold text-[17px] text-cal-50">{miembro.nombre}</h3>
          {miembro.disciplina && (
            <p className="truncate text-sm text-slate-500">{miembro.disciplina}</p>
          )}
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <RolBadge rol={miembro.rolContribucion} />
            {miembro.primerTerritorio && (
              <span className="text-[11.5px] uppercase tracking-[0.08em] text-body-dark">
                {miembro.primerTerritorio}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
