/**
 * generate-og.mjs — Genera imagenes OG (1200x630) para Entrelampistas
 * Usa Puppeteer para renderizar SVG a PNG.
 * Run: node generate-og.mjs
 */
import puppeteer from 'puppeteer';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const OUTPUT_DIR = join(import.meta.dirname, 'public', 'og');
mkdirSync(OUTPUT_DIR, { recursive: true });

const pages = [
  { slug: 'og-home', title: 'Pensamiento critico\nsobre la vida\ncontemporanea' },
  { slug: 'og-habitabilidad-digital', title: 'Habitabilidad digital:\n¿que tipo de entorno\nes internet?' },
  { slug: 'og-mapa-de-tu-mente', title: 'Sesgos cognitivos:\ncomo tu mente decide\nantes que tu' },
  { slug: 'og-economia-contemporanea', title: 'Economia de\nlo cotidiano' },
  { slug: 'og-sobre', title: 'Sobre\nEntrelampistas' },
  { slug: 'og-glosario', title: 'Glosario de\npensamiento\ncontemporaneo' },
  { slug: 'og-archivo', title: 'Archivo' },
];

function buildSVG(title) {
  const lines = title.split('\n');
  const fontSize = lines.length > 2 ? 52 : 58;
  const startY = 315 - (lines.length * fontSize * 0.6);

  const textLines = lines.map((line, i) =>
    `<text x="600" y="${startY + i * (fontSize * 1.15)}" text-anchor="middle" fill="#F5F0E8" font-family="system-ui, -apple-system, sans-serif" font-size="${fontSize}" font-weight="300">${line}</text>`
  ).join('\n    ');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="hsl(230, 65%, 28%)"/>
  <!-- Decorative line -->
  <line x1="550" y1="${startY - 50}" x2="650" y2="${startY - 50}" stroke="hsl(355, 70%, 48%)" stroke-width="3" stroke-linecap="round"/>
  <!-- Title -->
  ${textLines}
  <!-- Footer -->
  <text x="600" y="560" text-anchor="middle" fill="hsl(225, 30%, 52%)" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="400" letter-spacing="0.1em">entrelampistas.com</text>
  <text x="600" y="590" text-anchor="middle" fill="hsl(225, 30%, 62%)" font-family="system-ui, -apple-system, sans-serif" font-size="15" letter-spacing="0.08em">BARCELONA</text>
</svg>`;
}

async function main() {
  const browser = await puppeteer.launch({ headless: true });

  for (const page of pages) {
    const svg = buildSVG(page.title);
    const html = `<!DOCTYPE html><html><head><style>body{margin:0;padding:0;}</style></head><body>${svg}</body></html>`;

    const tab = await browser.newPage();
    await tab.setViewport({ width: 1200, height: 630 });
    await tab.setContent(html, { waitUntil: 'load' });

    const outPath = join(OUTPUT_DIR, `${page.slug}.png`);
    await tab.screenshot({ path: outPath, type: 'png' });
    await tab.close();

    console.log(`Generated: ${outPath}`);
  }

  await browser.close();
  console.log(`\nDone. ${pages.length} OG images in ${OUTPUT_DIR}`);
}

main().catch(console.error);
