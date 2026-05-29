import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const DESTINATION = 'speculativefuturescdmx@gmail.com';

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Email service not configured.' }, { status: 503 });
  }
  const resend = new Resend(apiKey);

  let body: { nombre?: string; email?: string; mensaje?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const { nombre, email, mensaje } = body;
  if (!nombre || !email || !mensaje) {
    return NextResponse.json({ error: 'Missing fields.' }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: 'Speculative Futures CDMX <onboarding@resend.dev>',
    to: DESTINATION,
    replyTo: email,
    subject: `Consulta de ${nombre} — Speculative Futures CDMX`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:560px;color:#1a1a1a">
        <p style="font-size:12px;color:#888;margin-bottom:24px;text-transform:uppercase;letter-spacing:.08em">
          Speculative Futures CDMX · Formulario de contacto
        </p>
        <h2 style="font-size:22px;margin:0 0 20px">Nueva consulta de ${nombre}</h2>
        <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
          <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#666;width:90px">Nombre</td>
              <td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:600">${nombre}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#666">Correo</td>
              <td style="padding:10px 0;border-bottom:1px solid #eee">
                <a href="mailto:${email}" style="color:#439973">${email}</a>
              </td></tr>
        </table>
        <div style="background:#f6f8f7;border-radius:6px;padding:18px 20px;white-space:pre-wrap;font-size:15px;line-height:1.6">
${mensaje}
        </div>
        <p style="margin-top:24px;font-size:12px;color:#aaa">
          Responder a este email va directo a ${email}
        </p>
      </div>
    `,
  });

  if (error) {
    console.error('[contact]', error);
    return NextResponse.json({ error: 'Send failed.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
