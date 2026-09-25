// entrelampistas · <img> o <picture> para las fotos de assets/img (25-09-2026)
// Junto a cada foto de iteración 2 a 1000 px (cri-, dec-, hab-*.jpg) viven -w1200 (móvil a 3×) y -w1600, y las tres en AVIF (la mitad de peso en follaje).
// Con AVIF: <picture> con <source type="image/avif"> y el <img> JPG de respaldo (Safari < 16, navegadores viejos).
// base.css pone picture { display: contents }: el <img> sigue siendo el hijo que maquetan .foto, .ensayo-imagen, etc.
export const SIZES = '(min-width: 1024px) 480px, 100vw';

export function imagen(f, { esc, clase = '', attrs = '', sizes = SIZES, alt = f.alt || '' }) {
  const src = f.src || '';
  const m = src.match(/^(.*\/(?:cri|dec|hab)-[\w-]+?)\.jpg$/);
  const serie = m && !/-w\d+$/.test(m[1]) ? m[1] : null;
  const img = `<img${clase ? ` class="${clase}"` : ''} src="${esc(src)}"${serie ? ` srcset="${esc(src)} 1000w, ${esc(serie)}-w1200.jpg 1200w, ${esc(serie)}-w1600.jpg 1600w" sizes="${sizes}"` : ''} alt="${esc(alt)}" width="${f.w}" height="${f.h}"${attrs}${f.posicion ? ` style="object-position:${esc(f.posicion)}"` : ''}>`;
  if (!serie) return img;
  return `<picture><source type="image/avif" srcset="${esc(serie)}.avif 1000w, ${esc(serie)}-w1200.avif 1200w, ${esc(serie)}-w1600.avif 1600w" sizes="${sizes}">${img}</picture>`;
}
