'use client';
import { useState, useTransition } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { X, Plus } from 'lucide-react';
import { Input, Textarea, Label, Checkbox, Button, useToast } from '@/components/ui';
import { perfilSchema, type PerfilInput } from '@/features/perfil/schema';

export interface TerritorioOpcion {
  id: string;
  nombre: string;
  codigo: string;
}

export interface FormularioValoresIniciales {
  nombre?: string;
  disciplina?: string;
  territorios?: string[];
  motivacion?: string;
  bioCorta?: string;
  enlacesExternos?: string[];
  rolEsCuradorComunidad?: boolean;
}

interface Props {
  territorios: TerritorioOpcion[];
  valoresIniciales?: FormularioValoresIniciales;
  /** Server action que recibe los datos validados. Devuelve {ok} o {error}. */
  onSubmit: (data: PerfilInput) => Promise<{ ok: true } | { ok: false; error: string }>;
  modo: 'onboarding' | 'edicion';
  /** En edición, oculta la casilla si ya es curador (no se puede degradar). */
  ocultarCasillaCurador?: boolean;
}

export function FormularioOnboarding({
  territorios,
  valoresIniciales = {},
  onSubmit,
  modo,
  ocultarCasillaCurador = false,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'es';
  const { toast } = useToast();
  const [pending, startTransition] = useTransition();
  const [errores, setErrores] = useState<Record<string, string>>({});

  const [nombre, setNombre] = useState(valoresIniciales.nombre ?? '');
  const [disciplina, setDisciplina] = useState(valoresIniciales.disciplina ?? '');
  const [sel, setSel] = useState<Set<string>>(
    new Set(valoresIniciales.territorios ?? [])
  );
  const [motivacion, setMotivacion] = useState(valoresIniciales.motivacion ?? '');
  const [bioCorta, setBioCorta] = useState(valoresIniciales.bioCorta ?? '');
  const [enlaces, setEnlaces] = useState<string[]>(
    valoresIniciales.enlacesExternos ?? []
  );
  const [quiereCurador, setQuiereCurador] = useState(
    valoresIniciales.rolEsCuradorComunidad ?? false
  );

  function toggleTerritorio(id: string) {
    setSel((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrores({});
    const payload = {
      nombre,
      disciplina,
      territorios: Array.from(sel),
      motivacion,
      bioCorta: bioCorta || '',
      enlacesExternos: enlaces.filter((u) => u.trim() !== ''),
      quiereSerCurador: quiereCurador,
    };
    const parsed = perfilSchema.safeParse(payload);
    if (!parsed.success) {
      const map: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        map[issue.path[0] as string] = issue.message;
      }
      setErrores(map);
      return;
    }
    startTransition(async () => {
      const res = await onSubmit(parsed.data);
      if (res.ok) {
        toast({ title: modo === 'onboarding' ? '¡Bienvenida!' : 'Perfil actualizado' });
        if (modo === 'onboarding') router.push(`/${locale}/dashboard`);
        else router.refresh();
      } else {
        toast({ variant: 'error', title: 'No se pudo guardar', description: res.error });
      }
    });
  }

  const err = (k: string) =>
    errores[k] ? <p className="mt-1 text-[13px] text-[#ff8a80]">{errores[k]}</p> : null;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <Label htmlFor="nombre">Nombre completo</Label>
        <Input
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Tu nombre"
          className="mt-2"
        />
        {err('nombre')}
      </div>

      <div>
        <Label htmlFor="disciplina">Disciplina o rol profesional</Label>
        <Input
          id="disciplina"
          value={disciplina}
          onChange={(e) => setDisciplina(e.target.value)}
          placeholder="Ej. Diseñadora de futuros"
          className="mt-2"
        />
        {err('disciplina')}
      </div>

      <div>
        <Label>Territorios de interés</Label>
        <div className="mt-3 flex flex-wrap gap-2">
          {territorios.map((t) => {
            const activo = sel.has(t.id);
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => toggleTerritorio(t.id)}
                className={`rounded-full border px-3 py-1.5 text-[12px] font-medium uppercase tracking-[0.08em] transition-colors ${
                  activo
                    ? 'border-mint-400 text-mint-400'
                    : 'border-petrol-700 text-body-dark hover:border-slate-500'
                }`}
              >
                {t.nombre}
              </button>
            );
          })}
        </div>
        {err('territorios')}
      </div>

      <div>
        <Label htmlFor="motivacion">Motivación corta</Label>
        <Textarea
          id="motivacion"
          value={motivacion}
          onChange={(e) => setMotivacion(e.target.value)}
          placeholder="¿Qué te trae a la comunidad? (1-2 oraciones)"
          rows={3}
          maxLength={280}
          className="mt-2"
        />
        <div className="mt-1 flex justify-between">
          {err('motivacion') ?? <span />}
          <span className="text-[12px] text-slate-500">{motivacion.length}/280</span>
        </div>
      </div>

      <div>
        <Label htmlFor="bio">Bio corta (opcional)</Label>
        <Textarea
          id="bio"
          value={bioCorta}
          onChange={(e) => setBioCorta(e.target.value)}
          placeholder="Algo más sobre ti"
          rows={3}
          maxLength={500}
          className="mt-2"
        />
        <div className="mt-1 flex justify-end">
          <span className="text-[12px] text-slate-500">{bioCorta.length}/500</span>
        </div>
      </div>

      <div>
        <Label>Enlaces externos (opcional, máx. 3)</Label>
        <div className="mt-2 flex flex-col gap-2">
          {enlaces.map((url, i) => (
            <div key={i} className="flex gap-2">
              <Input
                value={url}
                onChange={(e) =>
                  setEnlaces((prev) => prev.map((u, j) => (j === i ? e.target.value : u)))
                }
                placeholder="https://…"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setEnlaces((prev) => prev.filter((_, j) => j !== i))}
                aria-label="Quitar enlace"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {enlaces.length < 3 && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setEnlaces((prev) => [...prev, ''])}
              className="self-start"
            >
              <Plus className="h-4 w-4" /> Añadir enlace
            </Button>
          )}
        </div>
        {err('enlacesExternos')}
      </div>

      {!ocultarCasillaCurador && (
        <label className="flex items-start gap-3 rounded-md border border-petrol-700 p-4 cursor-pointer">
          <Checkbox
            checked={quiereCurador}
            onCheckedChange={(v) => setQuiereCurador(v === true)}
            className="mt-0.5"
          />
          <span className="text-[14px] leading-relaxed text-body-dark">
            Quiero contribuir como{' '}
            <strong className="text-cal-50">Curador Comunidad</strong> y publicar señales.
            Tus primeras 3 propuestas pasan por una revisión rápida.
          </span>
        </label>
      )}

      <Button type="submit" disabled={pending} size="lg">
        {pending
          ? 'Guardando…'
          : modo === 'onboarding'
            ? 'Completar mi perfil'
            : 'Guardar cambios'}
      </Button>
    </form>
  );
}
