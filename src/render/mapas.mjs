// entrelampistas · listado de mapas desde content/ensayo-*.json y content/mapa-*.json (orden por "orden")
//   {{@mapas}}   retícula de mapas (26-09-2026: la autora elige la A; se retiran lista y tarjetas)
// Sin preselección: cada mapa muestra solo el estado de lectura de quien mira («en curso» / «leído», en verde) o «nuevo».
import { FORMAS, listaMapas } from './lib/comun.mjs';

export default function mapas(ctx, { ROOT, esc }) {
  const lista = listaMapas(ROOT);  // content/ensayo-*.json y content/mapa-*.json (30-09-2026)
  const estado = M => `<span class="celda__estado" data-lectura="estado" data-slug="${esc(M.slug)}" data-vacio="${M.nuevo ? 'nuevo' : ''}">${M.nuevo ? 'nuevo' : ''}</span>`;

  return `<section class="reticula mapas-reticula" aria-label="Mapas" data-mapas>${lista.map((M, i) => `
    <a class="celda${lista.length % 2 && i === lista.length - 1 ? ' celda--ancha' : ''}" href="${esc(M.ruta)}" data-eje="${esc(M.eje)}">
      <span class="celda__cab">${FORMAS[M.eje] || ''}${estado(M)}</span>
      <span class="celda__titulo">${esc(M.titulo)}</span>
      <span class="celda__linea">${esc(M.pregunta)}</span>
    </a>`).join('')}
  </section>`;
}
