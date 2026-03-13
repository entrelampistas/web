/**
 * screenshot.mjs — Puppeteer screenshot con auto-incremento
 *
 * Uso:
 *   node screenshot.mjs                        # captura index.html local
 *   node screenshot.mjs https://ejemplo.com    # captura URL remota
 *
 * Guarda en: ./temporary screenshots/screenshot-N.png
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.join(__dirname, 'temporary screenshots');

// Auto-incremento: busca el número más alto existente
const existing = fs.readdirSync(DIR)
  .map(f => f.match(/^screenshot-(\d+)\.png$/))
  .filter(Boolean)
  .map(m => parseInt(m[1], 10));

const next = existing.length ? Math.max(...existing) + 1 : 1;
const outPath = path.join(DIR, `screenshot-${next}.png`);

// URL: argumento CLI o index.html local
const url = process.argv[2] ?? `file://${path.join(__dirname, 'index.html')}`;

console.log(`Capturando: ${url}`);

const browser = await puppeteer.launch({ headless: 'shell' });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
await page.screenshot({ path: outPath, fullPage: true });
await browser.close();

console.log(`Guardado: ${outPath}`);
