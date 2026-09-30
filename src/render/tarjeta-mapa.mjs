// entrelampistas · datos de la tarjeta compartible de un mapa, para el botón compartir del feed
//   {{@tarjeta-mapa slug="criterio"}} → <script type="application/json" id="tarjeta-mapa-criterio">…</script>
// Lee content/ensayo-<slug>.json o, en los mapas por paradas (30-09-2026), content/mapa-<slug>.json
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
const SITE = 'https://www.entrelampistas.com';
export default function tarjetaMapa(ctx, { ROOT }) {
  const f = ['mapa', 'ensayo'].map(t => join(ROOT, 'content', `${t}-${ctx.slug}.json`)).find(existsSync);
  const M = JSON.parse(readFileSync(f, 'utf8'));
  const ruta = M.ruta || `/${ctx.slug}`;
  const datos = { cab: (M.tituloCorto || M.titulo).toLowerCase(), cita: (M.t1 && M.t1.pregunta) || M.subtitulo || '', texto: M.titulo, enlace: SITE + ruta, pie: 'entrelampistas.com' + ruta, archivo: `entrelampistas-${ctx.slug}-mapa` };
  return `<script type="application/json" id="tarjeta-mapa-${ctx.slug}">${JSON.stringify(datos).replace(/</g, '\\u003c')}</script>`;
}
