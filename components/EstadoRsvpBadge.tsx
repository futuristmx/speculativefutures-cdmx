type Estado = 'confirmado' | 'lleno' | 'cancelado' | 'abierto';

const CONF: Record<Estado, { label: string; clase: string }> = {
  confirmado: { label: 'Confirmado', clase: 'border-mint-400 text-mint-400' },
  lleno: { label: 'Lleno', clase: 'border-petrol-700 text-slate-500' },
  cancelado: { label: 'Cancelado', clase: 'border-petrol-700 text-slate-500' },
  abierto: { label: 'Lugares disponibles', clase: 'border-petrol-700 text-body-dark' },
};

export function EstadoRsvpBadge({ estado }: { estado: Estado }) {
  const { label, clase } = CONF[estado];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11.5px] font-medium uppercase tracking-[0.08em] ${clase}`}
    >
      {label}
    </span>
  );
}
