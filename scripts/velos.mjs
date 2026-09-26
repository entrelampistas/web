// entrelampistas · mide el velo que necesita cada foto con texto (26-09-2026)
// Uso: npm run build && node scripts/velos.mjs && npm run build
// Abre cada página de dist/ a 320 y 390 con Chromium (Playwright), y en cada <figure class="foto …">:
//   · mide dónde caen de verdad el folio, el título, el subtítulo y el pie (líneas de texto, no cajas);
//   · lee los píxeles de la foto que quedan debajo de cada línea (con su recorte y encuadre reales);
//   · calcula el velo mínimo para que el texto papel llegue a 4.5:1, o 3:1 si es texto grande (WCAG: ≥ 24 px, o ≥ 18,66 px en negrita),
//     contando el halo de --sombra-texto-foto (rgba .5 alrededor de la letra: cuenta como HALO de oscurecimiento local).
// Guarda content/velos.json con { fuerza, desde } por uso; build.mjs lo aplica (src/render/lib/velo.mjs).
// Requiere Playwright y Chromium (en este entorno: /opt/pw-browsers). Solo en local; Vercel usa el json ya calculado.
import { createServer } from 'node:http';
import { readFileSync, readdirSync, statSync, writeFileSync, existsSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { claveVelo } from '../src/render/lib/velo.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const PW = ['/opt/node22/lib/node_modules/playwright/index.mjs', 'playwright'];
let chromium;
for (const p of PW) { try { ({ chromium } = await import(p.startsWith('/') ? pathToFileURL(p).href : p)); break; } catch (e) {} }
if (!chromium) { console.error('Falta Playwright'); process.exit(1); }

// servidor estático mínimo sobre dist/
const TIPOS = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
const servidor = createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  let f = join(DIST, p);
  if (existsSync(f) && statSync(f).isDirectory()) f = join(f, 'index.html');
  if (!existsSync(f) && existsSync(f + '.html')) f += '.html';
  if (!existsSync(f)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'Content-Type': TIPOS[extname(f)] || 'application/octet-stream' });
  res.end(readFileSync(f));
}).listen(0);
const BASE = `http://127.0.0.1:${servidor.address().port}`;

const walk = (d, o = []) => { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p, o) : f.endsWith('.html') && o.push(p); } return o; };
const rutas = walk(DIST).map(f => f.replace(DIST, '').replace(/index\.html$/, '')).filter(r => !r.startsWith('/404'));

const PAPEL = [0xF3, 0xF2, 0xEF], TINTA = [0x11, 0x11, 0x11];
const lin = c => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const LP = lum(PAPEL), LT = lum(TINTA);
const HALO = .45;   // parte del halo de la sombra del texto que se da por buena (es .5 en tokens.css)

const b = await chromium.launch({ executablePath: existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined });
const usos = {};
for (const ancho of [320, 390]) {
  const ctx = await b.newContext({ viewport: { width: ancho, height: 900 }, deviceScaleFactor: 1 });
  for (const ruta of rutas) {
    const p = await ctx.newPage();
    await p.goto(BASE + ruta, { waitUntil: 'load' });
    const figuras = await p.evaluate(async () => {
      const out = [];
      for (const fig of document.querySelectorAll('figure.foto')) {
        const img = fig.querySelector('img'); if (!img) continue;
        img.loading = 'eager'; try { await img.decode(); } catch (e) { continue; }
        const fr = fig.getBoundingClientRect(), ir = img.getBoundingClientRect();
        if (!fr.height || !img.naturalWidth) continue;
        const cs = getComputedStyle(img);
        const [px, py] = cs.objectPosition.split(' ').map(v => parseFloat(v) / 100);
        const nw = img.naturalWidth, nh = img.naturalHeight;
        const esc = cs.objectFit === 'cover' ? Math.max(ir.width / nw, ir.height / nh) : ir.width / nw;
        const dw = nw * esc, dh = nh * esc, ox = ir.left + (ir.width - dw) * (isNaN(px) ? .5 : px), oy = ir.top + (ir.height - dh) * (isNaN(py) ? .5 : py);
        const c = document.createElement('canvas'); c.width = Math.round(dw); c.height = Math.round(dh);
        const x = c.getContext('2d'); x.drawImage(img, 0, 0, c.width, c.height);
        const datos = x.getImageData(0, 0, c.width, c.height).data;
        const lineas = [];
        for (const el of fig.querySelectorAll('.foto__folio, .foto__titulo, .foto__sub, .foto__pie')) {
          const st = getComputedStyle(el);
          if (st.display === 'none' || st.visibility === 'hidden' || el.closest('[hidden]')) continue;
          const tam = parseFloat(st.fontSize), peso = parseInt(st.fontWeight, 10);
          const grande = tam >= 24 || (tam >= 18.66 && peso >= 700);
          const rng = document.createRange(); rng.selectNodeContents(el);
          for (const r of rng.getClientRects()) {
            if (r.width < 2 || r.height < 2) continue;
            const pix = [];
            for (let yy = Math.floor(r.top); yy < r.bottom; yy += 2) for (let xx = Math.floor(r.left); xx < r.right; xx += 2) {
              const sx = Math.round(xx - ox), sy = Math.round(yy - oy);
              if (sx < 0 || sy < 0 || sx >= c.width || sy >= c.height) continue;
              const i = (sy * c.width + sx) * 4; pix.push([datos[i], datos[i + 1], datos[i + 2]]);
            }
            lineas.push({ arriba: (r.top - fr.top) / fr.height, grande, pix });
          }
        }
        if (lineas.length) out.push({ clase: fig.className, src: img.getAttribute('src'), estilo: img.getAttribute('style') || '', lineas });
      }
      return out;
    });
    for (const f of figuras) {
      const clave = claveVelo(f.clase, f.src, f.estilo); if (!clave) continue;
      const u = usos[clave] || (usos[clave] = { arriba: 1, lineas: [], paginas: new Set() });
      u.paginas.add(ruta);
      for (const l of f.lineas) {
        const ls = l.pix.map(lum).sort((a, b) => a - b);
        const p80 = ls[Math.min(ls.length - 1, Math.floor(ls.length * .8))] || 0;   // lo claro bajo la línea (percentil 80)
        u.arriba = Math.min(u.arriba, l.arriba);
        u.lineas.push({ arriba: l.arriba, grande: l.grande, luz: p80 });
      }
    }
    await p.close();
  }
  await ctx.close();
}
await b.close(); servidor.close();

// fuerza mínima: la rampa (20 puntos) llega al 85 % de la fuerza justo en la primera línea de texto y al 100 % abajo
const salida = {};
for (const [clave, u] of Object.entries(usos).sort()) {
  const desde = Math.max(0, u.arriba - .20);
  let fuerza = 0;
  for (const l of u.lineas) {
    const razon = l.grande ? 3 : 4.5;
    const fondoMax = (LP + 0.05) / razon - 0.05;
    const luz = l.luz * (1 - HALO) + LT * HALO;       // fondo efectivo junto a la letra con el halo
    if (luz <= fondoMax) continue;
    const alfa = (luz - fondoMax) / (luz - LT);
    const g = .85 + .15 * Math.max(0, l.arriba - u.arriba) / Math.max(.01, 1 - u.arriba);
    fuerza = Math.max(fuerza, alfa / g);
  }
  salida[clave] = { velo: Math.round(Math.min(.85, Math.max(.1, fuerza + .04)) * 100) / 100, desde: Math.round(desde * 100) };
  console.log(`${clave.padEnd(70)} fuerza ${salida[clave].velo.toFixed(2)} desde ${String(salida[clave].desde).padStart(2)} %  ·  ${[...u.paginas].join(' ')}`);
}
writeFileSync(join(ROOT, 'content', 'velos.json'), JSON.stringify(salida, null, 1) + '\n');
console.log(`\n${Object.keys(salida).length} usos de foto medidos → content/velos.json`);
