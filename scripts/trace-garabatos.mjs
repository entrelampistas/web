/**
 * trace-garabatos.mjs — convierte los garabatos de marca de PNG a SVG.
 *
 * Uso: node scripts/trace-garabatos.mjs
 *
 * Los garabatos llegan como PNG: varias marcas sueltas por archivo, sobre fondo
 * blanco, en cuatro colores. Este script las separa y las vectoriza una a una.
 *
 * Dos cosas que potrace no resuelve solo y que resolvemos aqui:
 *
 *   1. Potrace traza por luminancia. El ambar #FFC800 es casi tan claro como el
 *      blanco del fondo, asi que trazarlo en crudo lo haria desaparecer. Por eso
 *      construimos una mascara por distancia de color antes de trazar.
 *
 *   2. Cada PNG lleva varias marcas. Las separamos por componentes conexas sobre
 *      una mascara dilatada — la dilatacion agrupa trazos vecinos que forman una
 *      sola marca, mientras que la extraccion usa la mascara original y conserva
 *      el trazo limpio.
 *
 * Salida: src/assets/garabatos/<archivo>-NN.svg, monocromo y con currentColor,
 * para poder recolorearlos desde CSS. Va commiteada: el build no ejecuta esto.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import potrace from 'potrace';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'brand_assets', 'garabatos');
const OUT = path.join(ROOT, 'src', 'assets', 'garabatos');

/** Colores de marca presentes en los PNG. Muestreados de los originales. */
const TINTAS = [
  { nombre: 'verde', rgb: [0x2f, 0xc8, 0x5a] },
  { nombre: 'ambar', rgb: [0xff, 0xc8, 0x00] },
  { nombre: 'rojo', rgb: [0xfa, 0x3c, 0x2d] },
  { nombre: 'tinta', rgb: [0x11, 0x11, 0x11] },
];

/** Cuanto puede alejarse un pixel de la tinta y seguir contando (distancia euclidea RGB). */
const TOLERANCIA = 90;
/** Radio de dilatacion, en pixeles, para agrupar trazos vecinos en una sola marca. */
const RADIO_UNION = 26;
/** Marcas mas pequenas que esto son ruido de escaneo, no dibujo. */
const AREA_MINIMA = 400;
/** Margen alrededor del recorte, para que el trazo no toque el borde del viewBox. */
const MARGEN = 12;

/**
 * Mascara binaria de los pixeles cercanos a una tinta.
 * Trabajamos por distancia de color, no por luminancia: asi el ambar sobrevive.
 */
function mascaraPorColor(data, ancho, alto, [tr, tg, tb]) {
  const mascara = new Uint8Array(ancho * alto);
  const limite = TOLERANCIA * TOLERANCIA;
  for (let i = 0; i < mascara.length; i++) {
    const dr = data[i * 3] - tr;
    const dg = data[i * 3 + 1] - tg;
    const db = data[i * 3 + 2] - tb;
    if (dr * dr + dg * dg + db * db <= limite) mascara[i] = 1;
  }
  return mascara;
}

/**
 * Dilatacion por transformada de distancia (dos pasadas, chamfer).
 * Mucho mas barato que un kernel circular a radio 26, y para agrupar da igual.
 */
function dilatar(mascara, ancho, alto, radio) {
  const INF = 1e9;
  const dist = new Float64Array(ancho * alto);
  for (let i = 0; i < dist.length; i++) dist[i] = mascara[i] ? 0 : INF;

  const paso = (inicioY, finY, dy, inicioX, finX, dx) => {
    for (let y = inicioY; y !== finY; y += dy) {
      for (let x = inicioX; x !== finX; x += dx) {
        const i = y * ancho + x;
        let mejor = dist[i];
        for (const [ox, oy, coste] of [
          [-dx, 0, 1], [0, -dy, 1], [-dx, -dy, 1.414], [dx, -dy, 1.414],
        ]) {
          const nx = x + ox;
          const ny = y + oy;
          if (nx < 0 || ny < 0 || nx >= ancho || ny >= alto) continue;
          const cand = dist[ny * ancho + nx] + coste;
          if (cand < mejor) mejor = cand;
        }
        dist[i] = mejor;
      }
    }
  };

  paso(0, alto, 1, 0, ancho, 1);
  paso(alto - 1, -1, -1, ancho - 1, -1, -1);

  const salida = new Uint8Array(ancho * alto);
  for (let i = 0; i < salida.length; i++) if (dist[i] <= radio) salida[i] = 1;
  return salida;
}

/**
 * Etiqueta componentes conexas sobre la mascara dilatada y devuelve, para cada
 * una, su caja y los pixeles que le corresponden en la mascara ORIGINAL.
 */
function componentes(dilatada, original, ancho, alto) {
  const visto = new Uint8Array(ancho * alto);
  const pila = new Int32Array(ancho * alto);
  const grupos = [];

  for (let semilla = 0; semilla < dilatada.length; semilla++) {
    if (!dilatada[semilla] || visto[semilla]) continue;

    let cima = 0;
    pila[cima++] = semilla;
    visto[semilla] = 1;

    let minX = ancho, minY = alto, maxX = -1, maxY = -1, area = 0;
    const pixeles = [];

    while (cima > 0) {
      const i = pila[--cima];
      const x = i % ancho;
      const y = (i - x) / ancho;

      if (original[i]) {
        pixeles.push(i);
        area++;
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }

      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= ancho || ny >= alto) continue;
        const j = ny * ancho + nx;
        if (dilatada[j] && !visto[j]) {
          visto[j] = 1;
          pila[cima++] = j;
        }
      }
    }

    if (area >= AREA_MINIMA) grupos.push({ minX, minY, maxX, maxY, area, pixeles });
  }

  // De mayor a menor: las marcas con presencia primero, para que la numeracion
  // del catalogo sea estable y util al elegirlas desde el front-matter.
  return grupos.sort((a, b) => b.area - a.area);
}

/** Recorta una componente a un PNG negro sobre blanco, listo para potrace. */
function recortar(grupo, ancho) {
  const w = grupo.maxX - grupo.minX + 1 + MARGEN * 2;
  const h = grupo.maxY - grupo.minY + 1 + MARGEN * 2;
  const lienzo = Buffer.alloc(w * h, 0xff);

  for (const i of grupo.pixeles) {
    const x = i % ancho;
    const y = (i - x) / ancho;
    lienzo[(y - grupo.minY + MARGEN) * w + (x - grupo.minX + MARGEN)] = 0;
  }

  return sharp(lienzo, { raw: { width: w, height: h, channels: 1 } }).png().toBuffer();
}

function trazar(png) {
  return new Promise((resolve, reject) => {
    const p = new potrace.Potrace({ threshold: 128, turdSize: 6, optCurve: true, alphaMax: 1 });
    p.loadImage(png, (err) => (err ? reject(err) : resolve(p.getPathTag())));
  });
}

await fs.mkdir(OUT, { recursive: true });
await fs.rm(OUT, { recursive: true, force: true });
await fs.mkdir(OUT, { recursive: true });

const catalogo = [];

for (const archivo of (await fs.readdir(SRC)).filter((f) => f.endsWith('.png')).sort()) {
  const base = path.basename(archivo, '.png');
  const imagen = sharp(path.join(SRC, archivo)).flatten({ background: '#ffffff' }).removeAlpha();
  const { data, info } = await imagen.raw().toBuffer({ resolveWithObject: true });
  const { width: ancho, height: alto } = info;

  for (const tinta of TINTAS) {
    const mascara = mascaraPorColor(data, ancho, alto, tinta.rgb);
    if (!mascara.some(Boolean)) continue;

    const grupos = componentes(dilatar(mascara, ancho, alto, RADIO_UNION), mascara, ancho, alto);

    for (const [n, grupo] of grupos.entries()) {
      const w = grupo.maxX - grupo.minX + 1 + MARGEN * 2;
      const h = grupo.maxY - grupo.minY + 1 + MARGEN * 2;
      const path_ = (await trazar(await recortar(grupo, ancho))).replace(/\s*fill="[^"]*"/, '');

      const id = `${base}-${tinta.nombre}-${String(n + 1).padStart(2, '0')}`;
      const svg =
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" ` +
        `fill="currentColor" aria-hidden="true" focusable="false">${path_}</svg>\n`;

      await fs.writeFile(path.join(OUT, `${id}.svg`), svg);
      catalogo.push({ id, tinta: tinta.nombre, ancho: w, alto: h, area: grupo.area });
    }
  }
}

await fs.writeFile(
  path.join(OUT, 'catalogo.json'),
  JSON.stringify(catalogo, null, 2) + '\n'
);

console.log(`${catalogo.length} marcas en ${path.relative(ROOT, OUT)}`);
for (const m of catalogo) {
  console.log(`  ${m.id.padEnd(24)} ${String(m.ancho).padStart(5)}×${String(m.alto).padEnd(5)} area ${m.area}`);
}
