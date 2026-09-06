/**
 * fetch-fonts.mjs — descarga y autoaloja las fuentes libres del proyecto.
 *
 * Uso: node scripts/fetch-fonts.mjs
 *
 * Descarga solo los subsets latin y latin-ext (el resto — cirilico, griego,
 * vietnamita — no lo usamos y multiplica el peso por cinco), guarda los .woff2
 * en public/fonts/ y escribe styles/fonts.css con las @font-face locales.
 *
 * Script de desarrollo: se ejecuta a mano cuando cambian las fuentes.
 * La salida va commiteada, asi que el build nunca depende de la red.
 */

import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT_FONTS = path.join(ROOT, 'public', 'fonts');
const OUT_CSS = path.join(ROOT, 'styles', 'fonts.css');

const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const SUBSETS = new Set(['latin', 'latin-ext']);

/** Familias que pedimos. Variables donde existan: un archivo cubre todos los pesos. */
const FAMILIES = [
  { query: 'Inter+Tight:wght@400..800', family: 'Inter Tight', slug: 'inter-tight', variable: true },
  { query: 'IBM+Plex+Mono:wght@400', family: 'IBM Plex Mono', slug: 'ibm-plex-mono-400', variable: false },
  { query: 'IBM+Plex+Mono:wght@500', family: 'IBM Plex Mono', slug: 'ibm-plex-mono-500', variable: false },
];

/** Parte el CSS de Google en bloques {subset, weight, unicodeRange, url}. */
function parseFontFaces(css) {
  const faces = [];
  const re = /\/\*\s*([\w-]+)\s*\*\/\s*@font-face\s*\{([^}]*)\}/g;
  for (const [, subset, body] of css.matchAll(re)) {
    const url = body.match(/url\((https:\/\/[^)]+\.woff2)\)/)?.[1];
    const unicodeRange = body.match(/unicode-range:\s*([^;]+);/)?.[1]?.trim();
    const weight = body.match(/font-weight:\s*([^;]+);/)?.[1]?.trim();
    if (url && unicodeRange) faces.push({ subset, url, unicodeRange, weight });
  }
  return faces;
}

async function get(url, as = 'text') {
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${url}`);
  return as === 'text' ? res.text() : Buffer.from(await res.arrayBuffer());
}

await fs.mkdir(OUT_FONTS, { recursive: true });

const blocks = [
  '/* ===========================================',
  '   ENTRELAMPISTAS — Fuentes autoalojadas',
  '   Generado por scripts/fetch-fonts.mjs. No editar a mano.',
  '',
  '   Inter Tight     — display y cuerpo (SIL Open Font License 1.1)',
  '   IBM Plex Mono   — etiquetas, metadatos, numeracion (SIL OFL 1.1)',
  '   =========================================== */',
  '',
];

for (const { query, family, slug, variable } of FAMILIES) {
  const css = await get(`https://fonts.googleapis.com/css2?family=${query}&display=swap`);
  const faces = parseFontFaces(css).filter((f) => SUBSETS.has(f.subset));

  if (faces.length === 0) throw new Error(`Sin subsets latinos para ${family} (${query})`);

  for (const face of faces) {
    const file = `${slug}-${face.subset}.woff2`;
    await fs.writeFile(path.join(OUT_FONTS, file), await get(face.url, 'buffer'));

    blocks.push(
      '@font-face {',
      `  font-family: "${family}";`,
      '  font-style: normal;',
      `  font-weight: ${variable ? '400 800' : face.weight};`,
      '  font-display: swap;',
      `  src: url("/fonts/${file}") format("woff2");`,
      `  unicode-range: ${face.unicodeRange};`,
      '}',
      ''
    );
    console.log(`  ✓ ${file}`);
  }
}

await fs.writeFile(OUT_CSS, blocks.join('\n'));
console.log(`\n→ ${path.relative(ROOT, OUT_CSS)}`);
