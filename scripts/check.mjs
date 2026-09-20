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
console.log(fallos ? `\n${fallos} incumplimientos` : '✓ checklist limpio: sin radios, sombras, transition all, cursiva, hex sueltos ni fuentes ajenas');
process.exit(fallos ? 1 : 0);
