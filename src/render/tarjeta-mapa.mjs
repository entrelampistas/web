// entrelampistas · datos de la tarjeta compartible de un mapa, para el botón compartir del feed
//   {{@tarjeta-mapa slug="criterio"}} → <script type="application/json" id="tarjeta-mapa-criterio">…</script>
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
const SITE = 'https://www.entrelampistas.com';
export default function tarjetaMapa(ctx, { ROOT }) {
  const M = JSON.parse(readFileSync(join(ROOT, 'content', `ensayo-${ctx.slug}.json`), 'utf8'));
  const ruta = M.ruta || `/${ctx.slug}`;
  const datos = { cab: (M.tituloCorto || M.titulo).toLowerCase(), cita: (M.t1 && M.t1.pregunta) || M.subtitulo || '', texto: M.titulo, enlace: SITE + ruta, pie: 'entrelampistas.com' + ruta, archivo: `entrelampistas-${ctx.slug}-mapa` };
  return `<script type="application/json" id="tarjeta-mapa-${ctx.slug}">${JSON.stringify(datos).replace(/</g, '\\u003c')}</script>`;
}
