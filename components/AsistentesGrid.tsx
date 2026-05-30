import { MiembroAvatar } from '@/components/MiembroAvatar';

export interface AsistenteMini {
  userId: string;
  nombre: string;
  foto: string | null;
}

/** Grid mini de avatares de asistentes confirmados (solo visible a miembros). */
export function AsistentesGrid({ asistentes }: { asistentes: AsistenteMini[] }) {
  if (asistentes.length === 0) {
    return <p className="text-sm text-slate-500">Aún no hay asistentes confirmados.</p>;
  }
  const visibles = asistentes.slice(0, 12);
  const resto = asistentes.length - visibles.length;
  return (
    <div className="flex flex-wrap items-center gap-2">
      {visibles.map((a) => (
        <MiembroAvatar
          key={a.userId}
          nombre={a.nombre}
          foto={a.foto}
          id={a.userId}
          size={36}
        />
      ))}
      {resto > 0 && <span className="text-sm text-slate-500">+{resto}</span>}
      <span className="ml-2 text-[13px] uppercase tracking-[0.08em] text-slate-500">
        {asistentes.length} confirmado{asistentes.length === 1 ? '' : 's'}
      </span>
    </div>
  );
}
