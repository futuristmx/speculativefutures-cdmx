// Color asociado por territorio (matices de la paleta verde del proyecto).
const TERRITORIO_COLOR: Record<string, string> = {
  futuros: '#66EBAC',
  innovacion_negocios: '#439973',
  ciudad_sistemas_vivos: '#547476',
  cultura_sociedad: '#7Fb9a0',
  tecnologias_emergentes: '#3a8f8a',
};

interface TerritorioBadgeProps {
  nombre: string;
  codigo?: string;
}

export function TerritorioBadge({ nombre, codigo }: TerritorioBadgeProps) {
  const color = (codigo && TERRITORIO_COLOR[codigo]) || '#439973';
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-petrol-700 px-3 py-1 text-[11.5px] font-medium uppercase tracking-[0.08em] text-body-dark">
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
      {nombre}
    </span>
  );
}
