import Link from 'next/link';
import type { TipoAliado, RolAliado } from '@prisma/client';

const TIPO_LABEL: Record<TipoAliado, string> = {
  academia: 'Academia',
  cultural: 'Cultural',
  consultora: 'Consultora',
  fundacion: 'Fundación',
};

const ROL_LABEL: Record<RolAliado, string> = {
  editorial: 'Editorial',
  eventos: 'Eventos',
  financiero: 'Financiero',
  intelectual: 'Intelectual',
};

export interface AliadoCardData {
  id: string;
  nombre: string;
  logo: string | null;
  descripcionCorta: string | null;
  tipo: TipoAliado;
  rolEspecifico: RolAliado;
}

export function AliadoCard({
  aliado,
  locale,
}: {
  aliado: AliadoCardData;
  locale: string;
}) {
  return (
    <Link
      href={`/${locale}/aliados/${aliado.id}`}
      className="block rounded-md border border-petrol-700 bg-petrol-800 p-6 transition-colors hover:border-mint-400"
    >
      <div className="flex items-center gap-4">
        {aliado.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={aliado.logo}
            alt={aliado.nombre}
            className="h-12 w-12 rounded object-contain"
          />
        ) : (
          <span className="flex h-12 w-12 items-center justify-center rounded bg-petrol-700 text-mint-400 font-bold text-lg">
            {aliado.nombre.charAt(0)}
          </span>
        )}
        <div>
          <h3 className="font-bold text-[18px] text-cal-50">{aliado.nombre}</h3>
          <p className="text-[12px] uppercase tracking-[0.08em] text-slate-500">
            {TIPO_LABEL[aliado.tipo]} · {ROL_LABEL[aliado.rolEspecifico]}
          </p>
        </div>
      </div>
      {aliado.descripcionCorta && (
        <p className="mt-4 text-[15px] leading-relaxed text-body-dark">
          {aliado.descripcionCorta}
        </p>
      )}
    </Link>
  );
}

export { TIPO_LABEL, ROL_LABEL };
