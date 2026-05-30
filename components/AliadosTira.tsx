import Link from 'next/link';

export interface AliadoTiraData {
  id: string;
  nombre: string;
  logo: string | null;
  descripcionCorta: string | null;
}

/** Tira institucional de aliados fundadores (home + página de aliados). */
export function AliadosTira({
  aliados,
  locale,
}: {
  aliados: AliadoTiraData[];
  locale: string;
}) {
  if (aliados.length === 0) return null;
  return (
    <div>
      <p className="text-[12px] uppercase tracking-[0.1em] text-slate-500">
        Una iniciativa entre Change · Futurist.mx y aliados fundadores
      </p>
      <div className="mt-4 flex flex-wrap gap-4">
        {aliados.map((a) => (
          <Link
            key={a.id}
            href={`/${locale}/aliados/${a.id}`}
            className="flex items-center gap-3 rounded-md border border-petrol-700 bg-petrol-800 px-4 py-3 transition-colors hover:border-mint-400"
          >
            {a.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={a.logo}
                alt={a.nombre}
                className="h-8 w-8 rounded object-contain"
              />
            ) : (
              <span className="flex h-8 w-8 items-center justify-center rounded bg-petrol-700 text-mint-400 font-bold text-sm">
                {a.nombre.charAt(0)}
              </span>
            )}
            <span className="font-medium text-[15px] text-cal-50">{a.nombre}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
