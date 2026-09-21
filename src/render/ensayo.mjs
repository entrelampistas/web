// entrelampistas · render del ensayo: content/ensayo-<slug>.md (verbatim) + content/ensayo-<slug>.json (presentación)
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

function parseMd(md) {
  const lineas = md.split('\n').map(l => l.trimEnd());
  let i = 0;
  // saltar cabecera de notas hasta la línea ENSAYO
  while (i < lineas.length && lineas[i].trim() !== 'ENSAYO') i++;
  i++;
  while (i < lineas.length && !lineas[i].trim()) i++;
  const titulo = lineas[i++].trim();
  const intro = [];
  const secciones = [];
  let actual = null;
  for (; i < lineas.length; i++) {
    const l = lineas[i].trim();
    if (!l) continue;
    const m = l.match(/^(0\d) · (.+)$/);
    if (m) { actual = { n: m[1], titulo: m[2], parrafos: [] }; secciones.push(actual); continue; }
    (actual ? actual.parrafos : intro).push(l);
  }
  return { titulo, intro, secciones };
}

export default function ensayo(ctx, { ROOT, esc }) {
  const slug = ctx.slug || 'habitabilidad';
  const md = readFileSync(join(ROOT, 'content', `ensayo-${slug}.md`), 'utf8');
  const meta = JSON.parse(readFileSync(join(ROOT, 'content', `ensayo-${slug}.json`), 'utf8'));
  const doc = parseMd(md);
  let termHecho = false;

  const parrafo = (t) => {
    let html = esc(t);
    if (!termHecho && meta.term && html.includes(meta.term.palabra)) {
      termHecho = true;
      const T = meta.term;
      html = html.replace(meta.term.palabra,
        `<button type="button" class="term" aria-expanded="false" aria-controls="term-${esc(T.palabra)}" data-term>${esc(T.palabra)}</button>`);
      return `<p>${html}</p>
<div class="term-ficha" id="term-${esc(T.palabra)}" hidden>
  <div class="term-ficha__cab"><span class="term-ficha__nombre">${esc(T.nombre)}</span><span class="mono meta">${esc(T.fuente)}</span></div>
  <p class="term-ficha__def">${esc(T.definicion)}</p>
  <a class="mono term-ficha__ir" href="${esc(T.enlace)}">ver en conceptos ›</a>
</div>`;
    }
    return `<p>${html}</p>`;
  };

  // intro: separar el resumen si está dentro del primer párrafo
  let intro = doc.intro.slice();
  if (meta.resumen && intro[0] && intro[0].includes(meta.resumen)) {
    intro[0] = intro[0].replace(meta.resumen, '').replace(/\s+/g, ' ').trim();
  }

  let out = '';
  out += `<header class="ensayo-entrada" id="ensayo">
  <div class="ensayo-portada">
    <img src="${meta.portada.src}" alt="${esc(meta.portada.alt)}" width="${meta.portada.w}" height="${meta.portada.h}" loading="lazy">
    <div class="ensayo-portada__capa">${meta.meta ? `<p class="mono">${esc(meta.meta)}</p>` : ''}<h2 class="ensayo-portada__titulo">${esc(meta.titulo)}</h2></div>
  </div>
  <div class="ensayo-cuerpo">
    <p class="ensayo-sub">${esc(meta.subtitulo)}</p>
    ${meta.resumen ? `<div class="ensayo-resumen"><p class="visually-hidden">resumen</p><p class="cuerpo secundario">${esc(meta.resumen)}</p></div>` : ''}
    ${intro.map(parrafo).join('\n    ')}
  </div>
</header>`;

  for (const s of doc.secciones) {
    const m = meta.secciones.find(x => x.n === s.n) || {};
    const parrafos = s.parrafos.slice();
    // pregunta de cierre: último párrafo que empieza por ¿ (salvo si es el bloque de herramienta)
    let cierre = null;
    const ultimo = parrafos[parrafos.length - 1];
    if (ultimo && ultimo.startsWith('¿')) cierre = parrafos.pop();
    // retícula de cuatro preguntas (sección 03)
    let reticula = null;
    if (m.reticula) {
      reticula = [];
      for (let k = parrafos.length - 1; k >= 0; k--) {
        const mm = parrafos[k].match(/^([^.]+)\. (.+)$/);
        if (mm && m.reticula.includes(mm[1])) { reticula.unshift({ nombre: mm[1], texto: mm[2] }); parrafos.splice(k, 1); }
      }
    }
    let cabecera = '';
    if (m.media) {
      cabecera = `<div class="ensayo-seccion__media ${m.media.tipo === 'textura' ? 'es-textura' : ''}" style="height:${m.media.alto}px">
      <img src="${m.media.src}" alt="${esc(m.media.alt || '')}" loading="lazy" width="1000" height="${m.media.alto * 2}">
      <div class="ensayo-seccion__velo"><span class="ensayo-seccion__num" aria-hidden="true">${s.n}</span></div>
    </div>`;
    } else {
      cabecera = `<p class="mono meta ensayo-seccion__etiqueta">${s.n}</p>`;
    }
    let cuerpo = '';
    parrafos.forEach((p, idx) => {
      cuerpo += parrafo(p) + '\n';
      if (m.filas && idx + 1 === (m.filasTras ?? 1)) {
        cuerpo += `<div class="ensayo-filas">${m.filas.map(f => `<div class="ensayo-fila"><span class="ensayo-fila__nombre">${esc(f.nombre)}</span><span class="secundario">${esc(f.texto)}</span></div>`).join('')}</div>\n`;
      }
      if (m.pullquote && idx + 1 === (m.pullquoteTras ?? 1)) {
        cuerpo += `<blockquote class="pullquote"><p>${esc(m.pullquote)}</p></blockquote>\n`;
      }
      if (reticula && /concretan:$/.test(p)) {
        cuerpo += `<div class="ensayo-reticula">${reticula.map(r => `<div class="ensayo-reticula__celda"><span class="mono ensayo-reticula__nombre">${esc(r.nombre)}</span><span>${esc(r.texto)}</span></div>`).join('')}</div>\n`;
        reticula = null;
      }
    });
    if (reticula) cuerpo += `<div class="ensayo-reticula">${reticula.map(r => `<div class="ensayo-reticula__celda"><span class="mono ensayo-reticula__nombre">${esc(r.nombre)}</span><span>${esc(r.texto)}</span></div>`).join('')}</div>\n`;

    let pie = '';
    if (m.herramienta && cierre) {
      pie = `<div class="ensayo-herramienta sobre-tinta"><p class="mono ensayo-herramienta__meta">${esc(m.herramienta.meta)}</p><p class="ensayo-herramienta__titulo">${esc(cierre)}</p><a class="btn btn--acento btn--cta" href="/indice">${esc(m.herramienta.boton)}</a></div>`;
    } else if (cierre) {
      pie = `<p class="ensayo-seccion__pregunta">${esc(cierre)}</p>`;
    }

    out += `
<section class="ensayo-seccion" id="seccion-${s.n}" data-seccion="${s.n}" data-minutos="${m.minutos || 2}" aria-labelledby="seccion-${s.n}-titulo">
  ${cabecera}
  <div class="ensayo-cuerpo">
    <h2 class="ensayo-seccion__titulo" id="seccion-${s.n}-titulo">${esc(s.titulo)}</h2>
    ${cuerpo}
  </div>
  ${pie}
</section>`;
  }
  return out;
}
