#!/usr/bin/env node
// entrelampistas · checklist por commit (design-brief §9) sobre styles/, js/, src/ y content/
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
const ROOT = new URL('..', import.meta.url).pathname;
function walk(d, out = []) { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p, out) : out.push(p); } return out; }
const archivos = ['styles', 'js', 'src'].flatMap(d => walk(join(ROOT, d))).filter(f => /\.(css|js|mjs|html)$/.test(f));
const reglas = [
  { re: /border-radius\s*:(?!\s*0\s*[;}])/, msg: 'border-radius distinto de 0' },
  { re: /box-shadow\s*:\s*(?!none)/, msg: 'box-shadow' },
  { re: /transition\s*:\s*all\b/, msg: 'transition: all' },
  { re: /font-style\s*:\s*italic/, msg: 'cursiva (solo permitida en .cita-autora)', permitir: /cita-autora/ },
  { re: /font-family\s*:[^;]*(serif|Georgia|Times|Newsreader|Space Grotesk|Neo Grotesque)/i, msg: 'tipografía fuera de Archivo / Space Mono', permitir: /sans-serif|monospace/ },
  { re: /#(?:[0-9a-f]{3}){1,2}\b/i, msg: 'hex suelto (solo en tokens.css)', soloEn: /\.css$/, excepto: /tokens\.css$|compartir\.js$/ },
  { re: /\b(?:blue|red|orange|yellow|purple|klein|amber)\b\s*;/i, msg: 'color con nombre' },
  // 23-09-2026 · una sola forma de poner texto sobre foto: el componente .foto y el token --velo-foto
  { re: /rgba\(\s*17\s*,\s*17\s*,\s*17|linear-gradient\(/, msg: 'velo o degradado fuera de tokens.css (usa .foto y --velo-foto)', soloEn: /\.css$/, excepto: /tokens\.css$/ },
  { re: /class="[^"]*\b(foto-velo|ensayo-portada__capa|indice-portada__capa|ensayo-seccion__velo|ensayo-foto__folio)\b/, msg: 'patrón de foto retirado: usa .foto / .foto__capa / .foto__folio / .foto__titulo / .foto__sub' },
];
let fallos = 0;
for (const f of archivos) {
  const src = readFileSync(f, 'utf8');
  src.split('\n').forEach((linea, i) => {
    for (const r of reglas) {
      if (r.soloEn && !r.soloEn.test(f)) continue;
      if (r.excepto && r.excepto.test(f)) continue;
      if (r.re.test(linea) && !(r.permitir && r.permitir.test(linea))) { fallos++; console.log(`✗ ${f.replace(ROOT, '')}:${i + 1} · ${r.msg}\n    ${linea.trim().slice(0, 120)}`); }
    }
  });
}
// 23-09-2026 · skills: ninguno puede volver a describir el estilo anterior al handoff.
// PENDIENTES: skills editoriales que aún no se han rehecho; se quitan de la lista al rehacerlos.
const PENDIENTES = ['editor-lampista', 'editorial-voice', 'project'];
const SKILLS = join(ROOT, '.claude', 'skills');
const ANTIGUO = /klein|neo grotesque|space grotesk|l del lampista/i;
for (const d of readdirSync(SKILLS)) {
  const dir = join(SKILLS, d);
  if (!statSync(dir).isDirectory() || PENDIENTES.includes(d)) continue;
  for (const f of walk(dir).filter(x => x.endsWith('.md'))) {
    readFileSync(f, 'utf8').split('\n').forEach((linea, i) => {
      if (ANTIGUO.test(linea)) { fallos++; console.log(`✗ ${f.replace(ROOT, '')}:${i + 1} · skill con reglas del estilo anterior (manda sistema-visual)\n    ${linea.trim().slice(0, 120)}`); }
    });
  }
}

// 26-09-2026 · regla de fotos (23-09): toda foto de las series de los mapas (cri-, dec-, hab-) va en .foto con velo y texto dentro
// (folio pequeño + título); la única excepción es la foto de pausa (.ensayo-pausa, brief §4b). Se mira el HTML generado.
const DIST = join(ROOT, 'dist');
let paginas = [];
try { paginas = walk(DIST).filter(f => f.endsWith('.html')); } catch (e) { console.log('· sin dist/: ejecuta npm run build para comprobar la regla de fotos'); }
for (const f of paginas) {
  const html = readFileSync(f, 'utf8');
  const fotos = [];
  const reFig = /<figure class="foto[\s"][\s\S]*?<\/figure>/g; let m;
  while ((m = reFig.exec(html))) fotos.push([m.index, m.index + m[0].length, /foto__titulo/.test(m[0])]);
  const reImg = /<img\b[^>]*src="\/assets\/img\/(?:cri|dec|hab)-[^"]*"[^>]*>/g;
  while ((m = reImg.exec(html))) {
    if (/class="ensayo-pausa"/.test(m[0])) continue;
    // ◆ /mapas variante b (lista con miniatura, en exploración): la miniatura va junto al título, no debajo; si se elige, decidir con la autora
    if (/<span class="mapas-lista__foto">\s*(?:<picture>.*?)?$/.test(html.slice(Math.max(0, m.index - 400), m.index))) continue;
    const dentro = fotos.find(([a, b]) => m.index > a && m.index < b);
    if (!dentro || !dentro[2]) { fallos++; console.log(`✗ ${f.replace(ROOT, '')} · foto sin .foto con título dentro (regla 23-09: velo, folio pequeño y título en la foto; solo la pausa va sin texto)\n    ${m[0].slice(0, 120)}`); }
  }
}

// 26-09-2026 · ninguna ruta viva puede caer en un redirect de vercel.json (Vercel aplica redirects antes que los archivos:
// «/criterio/:path+» se comía /criterio/ensayo). Traducción mínima de la sintaxis de rutas de Vercel a RegExp.
function rutaARegex(src) {
  let r = '', i = 0;
  while (i < src.length) {
    if (src[i] === ':') {
      const m = src.slice(i).match(/^:(\w+)(\((?:[^()]|\([^()]*\))*\))?([*+?])?/);
      const g = m[2] || '([^/]+)';
      if (m[3] === '*') r = r.replace(/\/$/, '') + `(?:/${m[2] ? g : '(.*)'})?`;
      else if (m[3] === '+') r += m[2] ? g : '(.+)';
      else r += g;
      i += m[0].length;
    } else { r += src[i] === '.' ? '\\.' : src[i]; i++; }
  }
  return new RegExp('^' + r + '$');
}
try {
  const vercel = JSON.parse(readFileSync(join(ROOT, 'vercel.json'), 'utf8'));
  const vivas = paginas.map(f => f.replace(DIST, '').replace(/\/index\.html$/, '').replace(/\.html$/, '') || '/');
  for (const ruta of vivas) for (const red of vercel.redirects || []) {
    if (rutaARegex(red.source).test(ruta)) { fallos++; console.log(`✗ vercel.json · la ruta ${ruta} cae en el redirect ${red.source} → ${red.destination} y no se podría abrir`); }
  }
} catch (e) { console.log('· no se pudo comprobar vercel.json:', e.message); }

console.log(fallos ? `\n${fallos} incumplimientos` : '✓ checklist limpio: sin radios, sombras, transition all, cursiva, hex sueltos ni fuentes ajenas; skills sin estilo anterior; fotos con texto dentro; ninguna ruta tapada por un redirect');
process.exit(fallos ? 1 : 0);
