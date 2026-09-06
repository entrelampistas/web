/**
 * screenshot.mjs — capturas con Puppeteer.
 *
 * Uso:
 *   node screenshot.mjs                          # inicio, en los tres anchos
 *   node screenshot.mjs /temas/habitabilidad-digital/
 *   node screenshot.mjs /  390                   # un solo ancho
 *   node screenshot.mjs https://ejemplo.com 1440
 *
 * Guarda en ./capturas/<ruta>-<ancho>.png
 */

import puppeteer from 'puppeteer';
import fs from 'node:fs';
import path from 'node:path';

const BASE = process.env.BASE_URL ?? 'http://localhost:4321';
const DIR = path.join(import.meta.dirname, 'capturas');

/** Movil, tablet y escritorio: los tres saltos de la reticula. */
const ANCHOS = [390, 834, 1440];

const destino = process.argv[2] ?? '/';
const anchos = process.argv[3] ? [Number(process.argv[3])] : ANCHOS;
const url = destino.startsWith('http') ? destino : new URL(destino, BASE).href;

fs.mkdirSync(DIR, { recursive: true });

const nombre =
  new URL(url).pathname.replace(/^\/|\/$/g, '').replace(/\//g, '-') || 'inicio';

const navegador = await puppeteer.launch({
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});

try {
  for (const ancho of anchos) {
    const pagina = await navegador.newPage();
    await pagina.setViewport({ width: ancho, height: Math.round(ancho * 2.2), deviceScaleFactor: 2 });
    await pagina.goto(url, { waitUntil: 'networkidle0' });

    // Recorrer la pagina antes de capturar. Sin esto, la captura completa sale
    // con las imagenes diferidas en blanco y los garabatos sin dibujar: el
    // observador de interseccion no se entera de un cambio de tamano de lienzo.
    await pagina.evaluate(async () => {
      const paso = window.innerHeight * 0.8;
      for (let y = 0; y < document.body.scrollHeight; y += paso) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 90));
      }
      window.scrollTo(0, 0);
      // Margen para que terminen los dibujados que arrancaron durante el recorrido.
      await new Promise((r) => setTimeout(r, 1200));
    });

    // Las fuentes autoalojadas cargan con swap: sin esto se captura el fallback.
    await pagina.evaluate(() => document.fonts.ready);

    const salida = path.join(DIR, `${nombre}-${ancho}.png`);
    await pagina.screenshot({ path: salida, fullPage: true });
    console.log(`  ✓ ${path.relative(import.meta.dirname, salida)}`);
    await pagina.close();
  }
} finally {
  await navegador.close();
}
