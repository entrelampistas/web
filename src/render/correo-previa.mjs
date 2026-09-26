// entrelampistas · vista previa de los correos del newsletter (26-09-2026)
//   {{@correo-previa archivo="bienvenida"}} → lee content/newsletter/<archivo>.md («asunto: …», «---», cuerpo en markdown)
// Es la misma fuente que se pega en Buttondown; aquí solo se enseña cómo se lee. Las variables de Buttondown
// ({{ confirmation_url }}…) no se sustituyen: el enlace apunta a «#» y lo avisa la nota.
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const enLinea = (t, esc) => esc(t)
  .replace(/\[([^\]]+)\]\((\{\{[^}]*\}\}|[^)\s]+)\)/g, (_, txt, url) => `<a href="${/\{\{/.test(url) ? '#' : url}"${/\{\{/.test(url) ? ' data-variable-buttondown' : ''}>${txt}</a>`)
  .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

export function leerCorreo(ROOT, archivo) {
  const raw = readFileSync(join(ROOT, 'content', 'newsletter', `${archivo}.md`), 'utf8');
  const [cab, ...resto] = raw.split(/^---$/m);
  const asunto = (cab.match(/^asunto:\s*(.+)$/m) || [])[1] || '';
  return { asunto, cuerpo: resto.join('---').trim() };
}

function markdown(md, esc) {
  return md.split(/\n{2,}/).map(b => {
    const l = b.trim();
    if (l === '---') return '<hr>';
    if (l.startsWith('### ')) return `<h3>${enLinea(l.slice(4), esc)}</h3>`;
    if (/^- /m.test(l)) return `<ul>${l.split('\n').map(i => `<li>${enLinea(i.replace(/^- /, ''), esc)}</li>`).join('')}</ul>`;
    return `<p>${l.split('\n').map(x => enLinea(x, esc)).join('<br>')}</p>`;
  }).join('\n');
}

export default function correoPrevia(ctx, { ROOT, esc }) {
  if (ctx.lista) {
    const archivos = readdirSync(join(ROOT, 'content', 'newsletter')).filter(f => f.endsWith('.md')).map(f => f.replace(/\.md$/, ''));
    const orden = ['confirmacion', 'bienvenida'];
    archivos.sort((a, b) => (orden.indexOf(a) + 1 || 99) - (orden.indexOf(b) + 1 || 99) || a.localeCompare(b));
    return `<div class="lista">${archivos.map(a => `<a class="fila fila--pieza" href="/correo/${a}"><span class="fila__cuerpo"><span class="titulo-s-700">${esc(leerCorreo(ROOT, a).asunto)}</span><span class="mono meta">${esc(a)}</span></span><span class="fila__flecha" aria-hidden="true">›</span></a>`).join('')}</div>`;
  }
  const { asunto, cuerpo } = leerCorreo(ROOT, ctx.archivo);
  const variable = /\{\{/.test(cuerpo);
  return `<article class="previa">
  <dl class="previa__sobre mono meta"><div><dt>de</dt><dd>entrelampistas</dd></div><div><dt>asunto</dt><dd class="previa__asunto">${esc(asunto)}</dd></div></dl>
  <div class="previa__correo">
${markdown(cuerpo, esc)}
  </div>
  <p class="previa__nota mono meta">${variable ? 'el botón lleva el enlace de confirmación que pone buttondown · ' : ''}buttondown añade debajo el enlace para darse de baja</p>
</article>`;
}
