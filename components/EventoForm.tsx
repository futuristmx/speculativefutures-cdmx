'use client';
import { useState, useTransition } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { X, Plus } from 'lucide-react';
import {
  Input,
  Textarea,
  Label,
  Button,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  useToast,
} from '@/components/ui';
import { eventoSchema, type EventoInput } from '@/features/eventos/schema';

export interface TerritorioOpcion {
  id: string;
  nombre: string;
}

export interface EventoFormValores {
  titulo?: string;
  descripcion?: string;
  modalidad?: 'online' | 'presencial' | 'hibrido';
  territorioId?: string;
  fechaInicioLocal?: string; // datetime-local
  fechaFinLocal?: string;
  capacidad?: number | null;
  ubicacion?: {
    urlOnline?: string;
    plataforma?: string;
    direccion?: string;
    mapsUrl?: string;
  };
  ponentes?: { nombre: string; bio?: string; enlace?: string }[];
}

interface Props {
  territorios: TerritorioOpcion[];
  valores?: EventoFormValores;
  onSubmit: (
    data: EventoInput
  ) => Promise<{ ok: true; id?: string } | { ok: false; error: string }>;
  modo: 'crear' | 'editar';
}

// datetime-local (hora CDMX que escribe el curador) → ISO UTC.
function localCDMXaUTC(local: string): string {
  // El input datetime-local no lleva zona; lo interpretamos como CDMX (UTC-6).
  // Construimos el instante sumando el offset de CDMX.
  const d = new Date(local);
  // getTimezoneOffset del runtime puede no ser CDMX; forzamos -360 min (CDMX sin DST).
  const utc = new Date(d.getTime() - -360 * 60000 + d.getTimezoneOffset() * 60000);
  return utc.toISOString();
}

export function EventoForm({ territorios, valores = {}, onSubmit, modo }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'es';
  const { toast } = useToast();
  const [pending, startTransition] = useTransition();
  const [errores, setErrores] = useState<Record<string, string>>({});

  const [titulo, setTitulo] = useState(valores.titulo ?? '');
  const [descripcion, setDescripcion] = useState(valores.descripcion ?? '');
  const [modalidad, setModalidad] = useState<'online' | 'presencial' | 'hibrido'>(
    valores.modalidad ?? 'online'
  );
  const [territorioId, setTerritorioId] = useState(valores.territorioId ?? '');
  const [fechaInicio, setFechaInicio] = useState(valores.fechaInicioLocal ?? '');
  const [fechaFin, setFechaFin] = useState(valores.fechaFinLocal ?? '');
  const [capacidad, setCapacidad] = useState<string>(
    valores.capacidad != null ? String(valores.capacidad) : ''
  );
  const [urlOnline, setUrlOnline] = useState(valores.ubicacion?.urlOnline ?? '');
  const [plataforma, setPlataforma] = useState(valores.ubicacion?.plataforma ?? '');
  const [direccion, setDireccion] = useState(valores.ubicacion?.direccion ?? '');
  const [mapsUrl, setMapsUrl] = useState(valores.ubicacion?.mapsUrl ?? '');
  const [ponentes, setPonentes] = useState<
    { nombre: string; bio?: string; enlace?: string }[]
  >(valores.ponentes ?? []);

  const err = (k: string) =>
    errores[k] ? <p className="mt-1 text-[13px] text-[#ff8a80]">{errores[k]}</p> : null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrores({});
    const payload = {
      titulo,
      descripcion,
      modalidad,
      territorioId: territorioId || '',
      fechaInicio: fechaInicio ? localCDMXaUTC(fechaInicio) : '',
      fechaFin: fechaFin ? localCDMXaUTC(fechaFin) : '',
      capacidad: capacidad ? parseInt(capacidad, 10) : null,
      ubicacion: { urlOnline, plataforma, direccion, mapsUrl },
      ponentes: ponentes.filter((p) => p.nombre.trim() !== ''),
      idiomas: ['es'] as ('es' | 'en')[],
      estado: 'programado' as const,
    };
    const parsed = eventoSchema.safeParse(payload);
    if (!parsed.success) {
      const map: Record<string, string> = {};
      for (const issue of parsed.error.issues)
        map[issue.path[0] as string] = issue.message;
      setErrores(map);
      return;
    }
    startTransition(async () => {
      const res = await onSubmit(parsed.data);
      if (res.ok) {
        toast({ title: modo === 'crear' ? 'Evento creado' : 'Evento actualizado' });
        const id = 'id' in res && res.id ? res.id : undefined;
        router.push(`/${locale}/eventos${id ? '/' + id : ''}`);
      } else {
        toast({ variant: 'error', title: 'No se pudo guardar', description: res.error });
      }
    });
  }

  const muestraOnline = modalidad === 'online' || modalidad === 'hibrido';
  const muestraPresencial = modalidad === 'presencial' || modalidad === 'hibrido';

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <Label htmlFor="titulo">Título</Label>
        <Input
          id="titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="mt-2"
        />
        {err('titulo')}
      </div>

      <div>
        <Label htmlFor="descripcion">Descripción</Label>
        <Textarea
          id="descripcion"
          rows={5}
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="mt-2"
        />
        {err('descripcion')}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label>Modalidad</Label>
          <Select
            value={modalidad}
            onValueChange={(v) => setModalidad(v as typeof modalidad)}
          >
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="online">Online</SelectItem>
              <SelectItem value="presencial">Presencial</SelectItem>
              <SelectItem value="hibrido">Híbrido</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Territorio (opcional)</Label>
          <Select
            value={territorioId || 'none'}
            onValueChange={(v) => setTerritorioId(v === 'none' ? '' : v)}
          >
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Sin territorio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Sin territorio</SelectItem>
              {territorios.map((t) => (
                <SelectItem key={t.id} value={t.id}>
                  {t.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="ini">Fecha y hora de inicio (CDMX)</Label>
          <Input
            id="ini"
            type="datetime-local"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="mt-2"
          />
          {err('fechaInicio')}
        </div>
        <div>
          <Label htmlFor="fin">Fecha y hora de fin (opcional)</Label>
          <Input
            id="fin"
            type="datetime-local"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            className="mt-2"
          />
          {err('fechaFin')}
        </div>
      </div>

      {muestraOnline && (
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <Label htmlFor="url">URL de la sesión</Label>
            <Input
              id="url"
              value={urlOnline}
              onChange={(e) => setUrlOnline(e.target.value)}
              placeholder="https://…"
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="plat">Plataforma</Label>
            <Input
              id="plat"
              value={plataforma}
              onChange={(e) => setPlataforma(e.target.value)}
              placeholder="Zoom, Meet…"
              className="mt-2"
            />
          </div>
        </div>
      )}

      {muestraPresencial && (
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <Label htmlFor="dir">Dirección</Label>
            <Input
              id="dir"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="maps">URL de Google Maps (opcional)</Label>
            <Input
              id="maps"
              value={mapsUrl}
              onChange={(e) => setMapsUrl(e.target.value)}
              placeholder="https://maps…"
              className="mt-2"
            />
          </div>
        </div>
      )}
      {err('ubicacion')}

      <div>
        <Label htmlFor="cap">Capacidad (vacío = sin límite)</Label>
        <Input
          id="cap"
          type="number"
          min={1}
          value={capacidad}
          onChange={(e) => setCapacidad(e.target.value)}
          className="mt-2 max-w-[200px]"
        />
      </div>

      <div>
        <Label>Ponentes (opcional)</Label>
        <div className="mt-2 flex flex-col gap-2">
          {ponentes.map((p, i) => (
            <div key={i} className="flex gap-2">
              <Input
                value={p.nombre}
                onChange={(e) =>
                  setPonentes((prev) =>
                    prev.map((x, j) => (j === i ? { ...x, nombre: e.target.value } : x))
                  )
                }
                placeholder="Nombre del ponente"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setPonentes((prev) => prev.filter((_, j) => j !== i))}
                aria-label="Quitar ponente"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {ponentes.length < 10 && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setPonentes((prev) => [...prev, { nombre: '' }])}
              className="self-start"
            >
              <Plus className="h-4 w-4" /> Añadir ponente
            </Button>
          )}
        </div>
      </div>

      <Button type="submit" disabled={pending} size="lg">
        {pending ? 'Guardando…' : modo === 'crear' ? 'Crear evento' : 'Guardar cambios'}
      </Button>
    </form>
  );
}
