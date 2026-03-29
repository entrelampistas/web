const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const cards = [
  {
    slug: 'og-home',
    title: 'Pensamiento práctico sobre la vida contemporánea',
    subtitle: 'Ideas y herramientas para entender los sistemas que configuran cómo vivimos',
    color1: '#1B6B7A',
    color2: '#C23B22'
  },
  {
    slug: 'og-habitabilidad-digital',
    title: 'Habitabilidad digital',
    subtitle: '¿Qué tipo de entorno es internet para la vida humana?',
    color1: '#1B6B7A',
    color2: '#C23B22'
  },
  {
    slug: 'og-mapa-de-tu-mente',
    title: 'El mapa de nuestras decisiones',
    subtitle: 'Sesgos cognitivos, heurísticas y los mapas invisibles del pensamiento',
    color1: '#3E4580',
    color2: '#C49B2A'
  },
  {
    slug: 'og-economia-contemporanea',
    title: 'Economía de lo cotidiano',
    subtitle: 'La economía no es un destino. Es un entorno construido.',
    color1: '#5A6068',
    color2: '#A66332'
  },
  {
    slug: 'og-sobre',
    title: 'Acerca de Entrelampistas',
    subtitle: 'Pensamiento de mantenimiento desde Barcelona',
    color1: '#1B6B7A',
    color2: '#3E4580'
  },
  {
    slug: 'og-archivo',
    title: 'Archivo',
    subtitle: 'Todos los ensayos y conceptos publicados',
    color1: '#5A6068',
    color2: '#1B6B7A'
  },
  {
    slug: 'og-conceptos',
    title: 'Conceptos clave',
    subtitle: 'Definiciones para pensar con más precisión',
    color1: '#1B6B7A',
    color2: '#C23B22'
  }
];

function makeHTML(card) {
  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<!-- fonts loaded locally -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; background: #3D5BA9; display: flex; flex-direction: column; justify-content: space-between; padding: 60px; font-family: 'Space Grotesk', sans-serif; }
  .title { color: white; font-size: 48px; font-weight: 700; line-height: 1.15; max-width: 900px; }
  .subtitle { color: rgba(255,255,255,0.7); font-family: 'Newsreader', serif; font-style: italic; font-size: 22px; line-height: 1.4; max-width: 700px; margin-top: 16px; }
  .bottom { display: flex; justify-content: space-between; align-items: flex-end; }
  .brand { color: rgba(255,255,255,0.8); font-size: 16px; font-weight: 500; }
  .phonetic { color: rgba(255,255,255,0.5); font-family: 'Newsreader', serif; font-style: italic; font-size: 13px; margin-top: 4px; }
  .colors { display: flex; gap: 6px; }
  .color-sq { width: 20px; height: 20px; border-radius: 3px; }
</style></head>
<body>
  <div>
    <div class="title">${card.title}</div>
    <div class="subtitle">${card.subtitle}</div>
  </div>
  <div class="bottom">
    <div>
      <div class="brand">entrelampistas</div>
      <div class="phonetic">[ɛ̃tɾə·lamˈpistas]</div>
    </div>
    <div class="colors">
      <div class="color-sq" style="background:${card.color1}"></div>
      <div class="color-sq" style="background:${card.color2}"></div>
    </div>
  </div>
</body></html>`;
}

async function main() {
  const outDir = path.join(__dirname, '..', 'public', 'og');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });

  for (const card of cards) {
    const html = makeHTML(card);
    await page.setContent(html, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 500));
    const outPath = path.join(outDir, `${card.slug}.png`);
    await page.screenshot({ path: outPath, type: 'png' });
    console.log(`  ✓ ${card.slug}.png`);
  }

  await browser.close();
  console.log(`\n${cards.length} OG cards generated in public/og/`);
}

main().catch(console.error);
