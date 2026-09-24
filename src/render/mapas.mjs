// entrelampistas · listado de mapas desde content/ensayo-*.json (orden por "orden")
//   {{@mapas variante="reticula"}}   variantes: reticula · lista · tarjetas (24-09-2026, a comparar en /mapas?v=)
// Sin preselección: cada mapa muestra solo el estado de lectura de quien mira («en curso» / «leído», en verde) o «nuevo».
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const FORMAS = {
  criterio: '<span class="forma forma--criterio" aria-hidden="true"><svg viewBox="0 0 10 10"><rect width="10" height="10"/></svg></span>',
  entornos: '<span class="forma forma--entornos" aria-hidden="true"><svg viewBox="0 0 10 10"><circle cx="5" cy="5" r="4.25"/></svg></span>',
};
const titulo = M => { const m = (M.titulo || '').match(/^(.+?): (¿.+)$/); return m ? m[1] : M.titulo; };
const pregunta = M => (M.t1 && M.t1.pregunta) || M.subtitulo || '';

export default function mapas(ctx, { ROOT, esc }) {
  const lista = readdirSync(join(ROOT, 'content')).filter(f => /^ensayo-[\w-]+\.json$/.test(f))
    .map(f => JSON.parse(readFileSync(join(ROOT, 'content', f), 'utf8')))
    .sort((a, b) => (a.orden || 99) - (b.orden || 99));
  const v = ctx.variante || 'reticula';
  const estado = M => `<span class="celda__estado" data-lectura="estado" data-slug="${esc(M.slug)}" data-vacio="${M.nuevo ? 'nuevo' : ''}">${M.nuevo ? 'nuevo' : ''}</span>`;
  const img = (M, w, clase = '') => {
    const f = M.t0.foto; const src = f.src;
    const m1600 = /\/(cri|dec)-[\w-]+\.jpg$/.test(src) ? `${src.replace(/\.jpg$/, '')}-w1600.jpg` : '';
    return `<img class="${clase}" src="${esc(src)}"${m1600 ? ` srcset="${esc(src)} 1000w, ${esc(m1600)} 1600w" sizes="${w}"` : ''} alt="" width="${f.w}" height="${f.h}" loading="lazy"${f.posicion ? ` style="object-position:${esc(f.posicion)}"` : ''}>`;
  };

  if (v === 'lista') {
    return `<div class="lista margen mapas-lista" data-mapas>${lista.map(M => `
    <a class="fila mapas-lista__fila" href="${esc(M.ruta)}" data-eje="${esc(M.eje)}">
      <span class="mapas-lista__foto">${img(M, '96px')}</span>
      <span class="fila__cuerpo"><span class="mapas-lista__cab">${FORMAS[M.eje] || ''}${estado(M)}</span><span class="fila__titulo">${esc(titulo(M))}</span><span class="fila__linea">${esc(pregunta(M))}</span></span>
    </a>`).join('')}
  </div>`;
  }
  if (v === 'tarjetas') {
    return `<div class="mapas-tarjetas" data-mapas>${lista.map(M => `
    <a class="mapas-tarjeta" href="${esc(M.ruta)}" data-eje="${esc(M.eje)}">
      <figure class="foto foto--4x3">${img(M, '(min-width: 1024px) 448px, calc(100vw - 32px)')}
        <span class="foto__capa"><span class="foto__titulo">${esc(titulo(M))}</span><span class="foto__sub">${esc(pregunta(M))}</span></span>
      </figure>
      <span class="mapas-tarjeta__pie">${FORMAS[M.eje] || ''}${estado(M)}</span>
    </a>`).join('')}
  </div>`;
  }
  // reticula
  return `<section class="reticula mapas-reticula" aria-label="Mapas" data-mapas>${lista.map((M, i) => `
    <a class="celda${lista.length % 2 && i === lista.length - 1 ? ' celda--ancha' : ''}" href="${esc(M.ruta)}" data-eje="${esc(M.eje)}">
      <span class="celda__cab">${FORMAS[M.eje] || ''}${estado(M)}</span>
      <span class="celda__titulo">${esc(titulo(M))}</span>
      <span class="celda__linea">${esc(pregunta(M))}</span>
    </a>`).join('')}
  </section>`;
}
