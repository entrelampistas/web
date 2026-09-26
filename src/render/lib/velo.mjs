// entrelampistas · velo medido por foto (26-09-2026)
// Cada uso de una foto con texto (<figure class="foto …">) se identifica por archivo, recorte, encuadre y componente.
// scripts/velos.mjs mide en el navegador dónde cae el texto y qué luz tiene la foto debajo, y guarda en content/velos.json
// cuánto velo hace falta (--velo-foto-fuerza) y desde qué altura empieza (--velo-foto-desde). build.mjs lo aplica con aplicarVelos().
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

export function claveVelo(claseFigura, src, estiloImg = '') {
  const base = ((src || '').match(/\/assets\/img\/([\w-]+?)(?:-w\d+)?\.(?:jpg|jpeg|webp|png|avif)/) || [])[1];
  if (!base) return null;
  const clases = claseFigura.split(/\s+/).filter(Boolean);
  const recorte = ['4x3', 'corta', 'natural'].find(r => clases.includes('foto--' + r)) || '4x5';
  const pos = (estiloImg.match(/object-position:\s*([\d.]+)%\s+([\d.]+)%/) || [, 50, 50]).slice(1).map(Number).join('-');
  const componente = clases.filter(c => c !== 'foto' && !c.startsWith('foto--')).sort().join('.') || '-';
  return `${base}|${recorte}|${pos}|${componente}`;
}

export function aplicarVelos(html, ROOT) {
  const f = join(ROOT, 'content', 'velos.json');
  const velos = existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')) : {};
  return html.replace(/<figure class="(foto(?:\s[^"]*)?)"([^>]*)>([\s\S]*?)<\/figure>/g, (todo, clase, attrs, dentro) => {
    const img = dentro.match(/<img\b[^>]*>/);
    if (!img) return todo;
    const src = (img[0].match(/\bsrc="([^"]+)"/) || [])[1];
    const estilo = (img[0].match(/\bstyle="([^"]*)"/) || [])[1] || '';
    const v = velos[claveVelo(clase, src, estilo)];
    if (!v || /\bstyle=/.test(attrs)) return todo;
    return `<figure class="${clase}"${attrs} style="--velo-foto-fuerza: ${v.velo}; --velo-foto-desde: ${v.desde}%">${dentro}</figure>`;
  });
}
