// entrelampistas · POST /api/subscribe · alta de correo.
// Proveedor por variable de entorno (NEWSLETTER_PROVIDER = buttondown | resend | mailchimp).
// Sin proveedor configurado responde 503 y el frontend muestra el estado de error del brief.
// GET /api/subscribe dice qué proveedor está configurado, en qué entorno de Vercel, si tiene su clave y si Buttondown la acepta (sin revelarla).
// Los errores devuelven «motivo» (código corto, sin datos personales) para diagnosticar desde la preview.
//
// 26-09-2026 · Buttondown con confirmación (doble opt-in, el comportamiento por defecto de su API): el alta queda
// «unactivated», Buttondown manda el correo de confirmación y, al confirmar, el de bienvenida. Los textos de los dos
// viven en content/newsletter/ (se pegan en Buttondown › Settings › Subscribing). Etiqueta «web» y la página de origen
// en metadata para saber desde dónde se apunta la gente. No se envía la IP.
//
//   buttondown → BUTTONDOWN_API_KEY
//   resend     → RESEND_API_KEY + RESEND_AUDIENCE_ID
//   mailchimp  → MAILCHIMP_API_KEY (con sufijo -usNN) + MAILCHIMP_LIST_ID

const CORREO_OK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function buttondown(email, origen) {
  const r = await fetch('https://api.buttondown.com/v1/subscribers', {
    method: 'POST',
    headers: { Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}`, 'Content-Type': 'application/json' },
    // sin «type»: Buttondown aplica la confirmación por correo (type: 'regular' la saltaría)
    body: JSON.stringify({
      email_address: email,
      tags: ['web'],
      metadata: { origen },
      referrer_url: `https://www.entrelampistas.com${origen}`,
    }),
  });
  if (r.ok) return true;
  const txt = await r.text();
  if (r.status === 400 && /already|exists/i.test(txt)) return true; // ya estaba: no es un error para quien se apunta
  throw new Error(`buttondown ${r.status}${codigo(txt)}: ${txt.slice(0, 200)}`);
}

// código corto del error de Buttondown («email_invalid», «subscriber_blocked»…), sin datos de nadie
function codigo(txt) {
  try { const j = JSON.parse(txt); const c = j.code || (j.detail && String(j.detail).slice(0, 60)); return c ? ` ${c}` : ''; } catch { return ''; }
}

// GET /api/subscribe: prueba la clave contra Buttondown en solo lectura (lista la cuenta, no crea nada) y devuelve solo el estado
async function probarButtondown() {
  try {
    const r = await fetch('https://api.buttondown.com/v1/newsletters', { headers: { Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}` } });
    return r.ok ? 'ok' : `buttondown ${r.status}${codigo(await r.text())}`;
  } catch (e) { return 'sin conexión con buttondown'; }
}

async function resend(email) {
  const r = await fetch(`https://api.resend.com/audiences/${process.env.RESEND_AUDIENCE_ID}/contacts`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, unsubscribed: false }),
  });
  if (r.ok) return true;
  throw new Error(`resend ${r.status}: ${(await r.text()).slice(0, 200)}`);
}

async function mailchimp(email) {
  const key = process.env.MAILCHIMP_API_KEY || '';
  const dc = key.split('-').pop();
  const r = await fetch(`https://${dc}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`, {
    method: 'POST',
    headers: { Authorization: `Basic ${Buffer.from(`anystring:${key}`).toString('base64')}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email_address: email, status: 'pending' }),
  });
  if (r.ok) return true;
  const txt = await r.text();
  if (r.status === 400 && /Member Exists/i.test(txt)) return true;
  throw new Error(`mailchimp ${r.status}: ${txt.slice(0, 200)}`);
}

const PROVEEDORES = { buttondown, resend, mailchimp };
const CLAVES = {
  buttondown: ['BUTTONDOWN_API_KEY'],
  resend: ['RESEND_API_KEY', 'RESEND_AUDIENCE_ID'],
  mailchimp: ['MAILCHIMP_API_KEY', 'MAILCHIMP_LIST_ID'],
};

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const nombre = (process.env.NEWSLETTER_PROVIDER || '').toLowerCase();
  if (req.method === 'GET') {
    // comprobación de configuración: nombres, nunca valores
    const faltan = (CLAVES[nombre] || []).filter(k => !process.env[k]);
    const listo = !!PROVEEDORES[nombre] && !faltan.length;
    const clave = listo && nombre === 'buttondown' ? await probarButtondown() : undefined;
    res.status(200).json({ proveedor: PROVEEDORES[nombre] ? nombre : null, listo: listo && (clave === undefined || clave === 'ok'), faltan, clave, entorno: process.env.VERCEL_ENV || 'local' });
    return;
  }
  if (req.method !== 'POST') { res.status(405).json({ error: 'método no permitido' }); return; }

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  const email = String((body && body.email) || '').trim().toLowerCase();
  if (!CORREO_OK.test(email) || email.length > 254) { res.status(400).json({ error: 'correo no válido' }); return; }

  const origen = /^\/[\w\/-]{0,80}$/.test(String((body && body.origen) || '')) ? body.origen : '/';
  const proveedor = PROVEEDORES[nombre];
  if (!proveedor) { res.status(503).json({ error: 'sin proveedor de correo configurado', motivo: `sin NEWSLETTER_PROVIDER en ${process.env.VERCEL_ENV || 'local'}` }); return; }

  try {
    await proveedor(email, origen);
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[subscribe]', err.message);
    res.status(502).json({ error: 'no pudimos guardarlo', motivo: err.message.split(':')[0] }); // p. ej. «buttondown 401» · sin el correo ni la clave
  }
}
