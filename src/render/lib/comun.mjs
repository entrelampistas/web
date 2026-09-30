// entrelampistas · piezas compartidas por los renders de mapas (30-09-2026)
//   foto()        único patrón de imagen con texto (components.css .foto): folio · título · subtítulo, dentro de la foto
//   FORMAS        forma de eje (■ criterio · ○ entornos), sin color
//   listaMapas()  todos los mapas publicados: content/ensayo-*.json (mapa + ensayo) y content/mapa-*.json (mapa por paradas)
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

export const FORMAS = {
  criterio: '<span class="forma forma--criterio" aria-hidden="true"><svg viewBox="0 0 10 10"><rect width="10" height="10"/></svg></span>',
  entornos: '<span class="forma forma--entornos" aria-hidden="true"><svg viewBox="0 0 10 10"><circle cx="5" cy="5" r="4.25"/></svg></span>',
};
export const ICONO_COMPARTIR = '<svg viewBox="0 0 14 14" aria-hidden="true"><polyline points="7,9 7,1"/><polyline points="3.5,4.5 7,1 10.5,4.5"/><polyline points="1,8 1,13 13,13 13,8"/></svg>';
export const ICONO_GUARDAR = '<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1.5" y="1.5" width="11" height="11"/></svg>';

// tag: elemento del título (h1/h2/span) · capa: 'div' o 'button' (feed) · extra: html al final de la capa (pie)
export const foto = ({ img, clase = '', folio = '', titulo = '', tituloId = '', tituloTag = 'h2', sub = '', capaTag = 'div', capaAttrs = '', extra = '', tras = '' }) => `<figure class="foto${clase ? ' ' + clase : ''}">
    ${img}
    <${capaTag} class="foto__capa"${capaAttrs}>${folio ? `
      <span class="mono meta foto__folio" aria-hidden="true">${folio}</span>` : ''}
      <${tituloTag} class="foto__titulo"${tituloId ? ` id="${tituloId}"` : ''}>${titulo}</${tituloTag}>${sub ? `
      <span class="foto__sub">${sub}</span>` : ''}${extra}
    </${capaTag}>${tras}
  </figure>`;

// «Habitabilidad digital: ¿qué tipo de entorno es internet?» → título + sub
export const partesTitulo = M => {
  const m = (M.titulo || '').match(/^(.+?): (¿.+)$/);
  if (m) return { titulo: m[1], sub: m[2] };
  return { titulo: M.titulo, sub: (M.t1 && M.t1.pregunta) || M.subtitulo || '' };
};

export function listaMapas(ROOT) {
  const dir = join(ROOT, 'content');
  return readdirSync(dir).filter(f => /^(ensayo|mapa)-[\w-]+\.json$/.test(f))
    .map(f => ({ f, M: JSON.parse(readFileSync(join(dir, f), 'utf8')) }))
    .map(({ f, M }) => {
      const P = partesTitulo(M);
      return { slug: M.slug, ruta: M.ruta || `/${M.slug}`, titulo: P.titulo, pregunta: (M.t1 && M.t1.pregunta) || M.subtitulo || '', eje: M.eje, orden: M.orden || 99, nuevo: !!M.nuevo, paradas: f.startsWith('mapa-'), M };
    })
    .sort((a, b) => a.orden - b.orden);
}
