import Link from 'next/link';

/** Saludo personalizado para el home de un miembro autenticado (D-S3-9). */
export function BienvenidaMiembro({
  nombre,
  locale,
}: {
  nombre: string;
  locale: string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <h2 className="text-[clamp(20px,2.6vw,26px)] font-bold tracking-tight text-cal-50">
        Hola de nuevo, {nombre.split(' ')[0] || nombre}
      </h2>
      <Link
        href={`/${locale}/dashboard`}
        className="inline-flex h-10 items-center rounded-md border border-petrol-700 px-4 text-sm text-cal-50 transition-colors hover:border-mint-400"
      >
        Ir a mi panel
      </Link>
    </div>
  );
}
