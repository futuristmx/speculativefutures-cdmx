import type { RolContribucion } from '@prisma/client';

const LABELS: Partial<Record<RolContribucion, string>> = {
  curador_comunidad: 'Curador Comunidad',
  curador_core: 'Curador Core',
};

/** Badge de rol. No muestra nada para 'regular' (default invisible). */
export function RolBadge({ rol }: { rol: RolContribucion }) {
  const label = LABELS[rol];
  if (!label) return null;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-petrol-700 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.1em] text-mint-400">
      <span className="h-1.5 w-1.5 rounded-full bg-mint-400" />
      {label}
    </span>
  );
}
