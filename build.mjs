#!/usr/bin/env node
// entrelampistas · generador estático sin dependencias.
// Lee src/pages/*.html (con cabecera JSON en comentario), inyecta parciales de src/partials,
// contenido de content/ y escribe HTML plano en dist/. Copia styles/, js/, assets/.
//
//   {{> nombre atr="valor"}}   parcial con parámetros
//   {{atr}}                    variable (de la página o del parcial)
//   {{?atr}}…{{/atr}}          bloque condicional
//   {{@ensayo}}                render especial (src/render/*.mjs)
//   {{@json indice}}           content/indice.json inline como <script type="application/json">

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, cpSync, rmSync, existsSync } from 'node:fs';
import { join, dirname, basename, extname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';

const ROOT = dirname(fileURLToPath(import.meta.url));
const SRC = join(ROOT, 'src');
const DIST = join(ROOT, 'dist');
const SITE = 'https://www.entrelampistas.com';

const layout = readFileSync(join(SRC, 'layout.html'), 'utf8');
const partials = Object.fromEntries(
  readdirSync(join(SRC, 'partials')).filter(f => f.endsWith('.html'))
    .map(f => [basename(f, '.html'), readFileSync(join(SRC, 'partials', f), 'utf8')])
);
const renderers = {};
for (const f of existsSync(join(SRC, 'render')) ? readdirSync(join(SRC, 'render')) : []) {
  if (f.endsWith('.mjs')) renderers[basename(f, '.mjs')] = (await import(pathToFileURL(join(SRC, 'render', f)).href)).default;
}

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

function parseAttrs(s) {
  const out = {};
  for (const m of s.matchAll(/([\w-]+)=(?:"([^"]*)"|'([^']*)')/g)) out[m[1]] = m[2] ?? m[3];
  return out;
}

function render(tpl, ctx, depth = 0) {
  if (depth > 20) throw new Error('parciales anidados en bucle');
  // renders especiales
  tpl = tpl.replace(/\{\{@json\s+([\w-]+)\}\}/g, (_, name) => {
    const json = readFileSync(join(ROOT, 'content', name + '.json'), 'utf8');
    return `<script type="application/json" id="datos-${name}">${JSON.stringify(JSON.parse(json))}</script>`;
  });
  tpl = tpl.replace(/\{\{@([\w-]+)(?:\s+([^}]*))?\}\}/g, (_, name, attrs) => {
    if (!renderers[name]) throw new Error(`render desconocido: ${name}`);
    return renderers[name]({ ...ctx, ...parseAttrs(attrs || '') }, { ROOT, render: (t, c) => render(t, c, depth + 1), partials, esc });
  });
  // parciales
  tpl = tpl.replace(/\{\{>\s*([\w-]+)([^}]*)\}\}/g, (_, name, attrs) => {
    if (!partials[name]) throw new Error(`parcial desconocido: ${name}`);
    return render(partials[name], { ...ctx, ...parseAttrs(attrs) }, depth + 1);
  });
  // condicionales
  tpl = tpl.replace(/\{\{\?([\w-]+)\}\}([\s\S]*?)\{\{\/\1\}\}/g, (_, k, body) => (ctx[k] ? render(body, ctx, depth + 1) : ''));
  tpl = tpl.replace(/\{\{!([\w-]+)\}\}([\s\S]*?)\{\{\/\1\}\}/g, (_, k, body) => (!ctx[k] ? render(body, ctx, depth + 1) : ''));
  // variables
  tpl = tpl.replace(/\{\{([\w-]+)\}\}/g, (_, k) => (ctx[k] === undefined ? '' : String(ctx[k])));
  return tpl;
}

function readPage(file) {
  const raw = readFileSync(file, 'utf8');
  const m = raw.match(/^<!--\s*(\{[\s\S]*?\})\s*-->\s*/);
  if (!m) throw new Error(`${file}: falta la cabecera JSON`);
  return { meta: JSON.parse(m[1]), body: raw.slice(m[0].length) };
}

function walk(dir, out = []) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p, out); else if (f.endsWith('.html')) out.push(p);
  }
  return out;
}

rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });

// versión por contenido en las URLs de styles/ y js/: vercel.json los cachea un día
// y sin esto un despliegue deja HTML nuevo con CSS/JS viejos en el navegador.
const versiones = {};
function ver(rel) {
  if (!versiones[rel]) {
    const f = join(ROOT, rel);
    versiones[rel] = existsSync(f) ? createHash('sha1').update(readFileSync(f)).digest('hex').slice(0, 8) : 'x';
  }
  return versiones[rel];
}
// Las imágenes también: vercel.json les pone max-age de una semana y esa cabecera se aplica incluso a un 404,
// así que un navegador que vio la ruta antes de existir el archivo se quedaría con el 404 en caché.
const versionar = html => html
  .replace(/(href|src)="\/(styles|js)\/([\w./-]+\.(?:css|js))"/g, (_, a, d, f) => `${a}="/${d}/${f}?v=${ver(d + '/' + f)}"`)
  .replace(/\/assets\/img\/([\w.-]+\.(?:jpg|jpeg|png|webp|svg))(?![\w?])/g, (_, f) => `/assets/img/${f}?v=${ver('assets/img/' + f)}`);

const pages = [];
for (const file of walk(join(SRC, 'pages'))) {
  const { meta, body } = readPage(file);
  const route = meta.route ?? '/' + basename(file, '.html');
  const outFile = route === '/' ? 'index.html' : meta.archivo || route.replace(/^\//, '') + '/index.html';
  const ctx = {
    site: SITE,
    canonical: SITE + route,
    year: new Date().getFullYear(),
    ...meta,
    css: (meta.css || []).map(c => `<link rel="stylesheet" href="/styles/${c}.css">`).join('\n'),
    js: (meta.js || []).map(j => `<script src="/js/${j}.js" defer></script>`).join('\n'),
    body: render(body, { site: SITE, canonical: SITE + route, year: new Date().getFullYear(), ...meta }),
    titleEsc: esc(meta.title || ''),
    descriptionEsc: esc(meta.description || ''),
  };
  const html = versionar(render(layout, ctx));
  const dest = join(DIST, outFile);
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, html);
  pages.push({ route, file: outFile, noindex: !!meta.noindex, lastmod: meta.lastmod });
  console.log('✓', route, '→', outFile);
}

for (const d of ['styles', 'js', 'assets']) if (existsSync(join(ROOT, d))) cpSync(join(ROOT, d), join(DIST, d), { recursive: true });
for (const f of ['robots.txt']) if (existsSync(join(ROOT, f))) cpSync(join(ROOT, f), join(DIST, f));

// sitemap
const today = new Date().toISOString().slice(0, 10);
const urls = pages.filter(p => !p.noindex).map(p => `  <url><loc>${SITE}${p.route}</loc><lastmod>${p.lastmod || today}</lastmod></url>`).join('\n');
writeFileSync(join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
console.log(`\n${pages.length} páginas en dist/`);
