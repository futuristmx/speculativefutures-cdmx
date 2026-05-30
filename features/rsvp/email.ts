import { Resend } from 'resend';
import { formatoFechaHoraCDMX } from '@/lib/eventos/fecha';

const SENDER =
  process.env.EVENTOS_FROM ??
  process.env.CONTACT_FROM ??
  'Speculative Futures CDMX <onboarding@resend.dev>';

interface DatosEmailRsvp {
  para: string;
  nombre: string;
  eventoId: string;
  titulo: string;
  fechaInicio: Date;
  modalidadTexto: string;
  ubicacionTexto: string;
  ics: string | null;
}

/** Envía el email de confirmación de RSVP con .ics adjunto (D-S3-7). */
export async function enviarEmailRsvp(d: DatosEmailRsvp): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return; // sin key, se omite silenciosamente (no rompe el RSVP)

  const resend = new Resend(apiKey);
  const sitio = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://speculativefutures.mx';
  const link = `${sitio}/es/eventos/${d.eventoId}`;

  const html = `
    <div style="font-family:Gotham,system-ui,sans-serif;max-width:560px;background:#062424;color:#F4F7F5;padding:32px;border-radius:8px">
      <p style="font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#66EBAC;margin:0 0 20px">
        RSVP confirmado
      </p>
      <h1 style="font-size:24px;margin:0 0 16px;color:#F4F7F5">${d.titulo}</h1>
      <p style="color:#C4D6CF;line-height:1.6;margin:0 0 20px">
        Hola ${d.nombre}, tu lugar está confirmado. Aquí los detalles:
      </p>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
        <tr><td style="padding:8px 0;border-bottom:1px solid #114442;color:#547476;width:110px">Fecha</td>
            <td style="padding:8px 0;border-bottom:1px solid #114442">${formatoFechaHoraCDMX(d.fechaInicio)}</td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid #114442;color:#547476">Modalidad</td>
            <td style="padding:8px 0;border-bottom:1px solid #114442">${d.modalidadTexto}</td></tr>
        ${
          d.ubicacionTexto
            ? `<tr><td style="padding:8px 0;border-bottom:1px solid #114442;color:#547476">Dónde</td>
               <td style="padding:8px 0;border-bottom:1px solid #114442">${d.ubicacionTexto}</td></tr>`
            : ''
        }
      </table>
      <a href="${link}" style="display:inline-block;background:#66EBAC;color:#062424;padding:12px 24px;border-radius:4px;text-decoration:none;font-weight:500">
        Ver el evento
      </a>
      <p style="color:#547476;font-size:12px;margin-top:24px">
        Adjuntamos un archivo .ics para que lo añadas a tu calendario.
      </p>
    </div>
  `;

  const attachments = d.ics
    ? [{ filename: 'evento.ics', content: Buffer.from(d.ics).toString('base64') }]
    : undefined;

  try {
    await resend.emails.send({
      from: SENDER,
      to: d.para,
      subject: `RSVP confirmado: ${d.titulo}`,
      html,
      attachments,
    });
  } catch (e) {
    console.error('[rsvp-email]', e);
  }
}
