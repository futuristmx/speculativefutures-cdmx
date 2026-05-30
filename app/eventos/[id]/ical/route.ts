import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generarIcs } from '@/lib/eventos/ical';
import { ubicacionTexto, type UbicacionJson } from '@/lib/eventos/ubicacion';

/** Endpoint público .ics de un evento (D-S3-8). */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const evento = await prisma.evento.findUnique({ where: { id } });
  if (!evento) {
    return new NextResponse('Evento no encontrado', { status: 404 });
  }

  const ubic = (evento.ubicacion as UbicacionJson | null) ?? null;
  const ics = generarIcs({
    id: evento.id,
    titulo: evento.titulo,
    descripcion: evento.descripcion,
    fechaInicio: evento.fechaInicio,
    fechaFin: evento.fechaFin,
    ubicacionTexto: ubicacionTexto(evento.modalidad, ubic),
  });
  if (!ics) {
    return new NextResponse('No se pudo generar el calendario', { status: 500 });
  }

  const slug = evento.titulo
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 50);

  return new NextResponse(ics, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="evento-${slug || evento.id}.ics"`,
    },
  });
}
