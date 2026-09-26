// entrelampistas · listado de mapas desde content/ensayo-*.json (orden por "orden")
//   {{@mapas}}   retícula de mapas (26-09-2026: la autora elige la A; se retiran lista y tarjetas)
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
  const estado = M => `<span class="celda__estado" data-lectura="estado" data-slug="${esc(M.slug)}" data-vacio="${M.nuevo ? 'nuevo' : ''}">${M.nuevo ? 'nuevo' : ''}</span>`;

  return `<section class="reticula mapas-reticula" aria-label="Mapas" data-mapas>${lista.map((M, i) => `
    <a class="celda${lista.length % 2 && i === lista.length - 1 ? ' celda--ancha' : ''}" href="${esc(M.ruta)}" data-eje="${esc(M.eje)}">
      <span class="celda__cab">${FORMAS[M.eje] || ''}${estado(M)}</span>
      <span class="celda__titulo">${esc(titulo(M))}</span>
      <span class="celda__linea">${esc(pregunta(M))}</span>
    </a>`).join('')}
  </section>`;
}
