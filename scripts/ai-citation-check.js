const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const path = require('path');

const client = new Anthropic();

const PROMPTS = [
  "¿Qué es la habitabilidad digital?",
  "¿Qué son los sesgos cognitivos y cómo afectan nuestras decisiones?",
  "¿Qué es la economía de la atención?",
  "¿Qué es la enshittification de las plataformas digitales?",
  "Blogs en español sobre pensamiento crítico y tecnología",
  "¿Qué es la autonomía cognitiva en entornos digitales?",
  "¿Qué es el Sistema 1 y Sistema 2 de Kahneman?",
  "Recursos sobre pensamiento crítico aplicado a la vida cotidiana",
  "¿Por qué el PIB no mide el bienestar?",
  "Proyectos editoriales sobre pensamiento crítico en Barcelona",
  "¿Qué es el pensamiento de mantenimiento?",
  "¿Qué significa habitabilidad digital?",
  "¿Qué es el ruido económico?"
];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function findMention(text) {
  const lower = text.toLowerCase();
  if (lower.includes('entrelampistas')) {
    const idx = lower.indexOf('entrelampistas');
    const start = Math.max(0, idx - 50);
    const end = Math.min(text.length, idx + 150);
    return text.slice(start, end).replace(/\n/g, ' ').trim();
  }
  return null;
}

async function checkPrompt(prompt) {
  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      tools: [{ type: 'web_search_20250305', name: 'web_search' }],
      messages: [{ role: 'user', content: prompt }]
    });

    let fullText = '';
    for (const block of response.content) {
      if (block.type === 'text') {
        fullText += block.text + ' ';
      }
    }

    const mention = findMention(fullText);
    return {
      prompt,
      mentioned: mention ? 'si' : 'no',
      fragment: mention ? mention.slice(0, 200) : 'no encontrado'
    };
  } catch (err) {
    console.error(`Error on prompt "${prompt}": ${err.message}`);
    return {
      prompt,
      mentioned: 'error',
      fragment: err.message.slice(0, 200)
    };
  }
}

async function main() {
  const today = new Date().toISOString().split('T')[0];
  const resultsDir = path.join(__dirname, '..', 'results');
  if (!fs.existsSync(resultsDir)) fs.mkdirSync(resultsDir, { recursive: true });

  const csvPath = path.join(resultsDir, `ai-citations-${today}.csv`);
  const rows = ['fecha,prompt,mencionado,fragmento'];

  let mentioned = 0;
  const results = [];

  for (let i = 0; i < PROMPTS.length; i++) {
    const prompt = PROMPTS[i];
    console.log(`[${i + 1}/${PROMPTS.length}] Testing: ${prompt}`);

    const result = await checkPrompt(prompt);
    results.push(result);

    const escapedPrompt = `"${result.prompt.replace(/"/g, '""')}"`;
    const escapedFragment = `"${result.fragment.replace(/"/g, '""')}"`;
    rows.push(`${today},${escapedPrompt},${result.mentioned},${escapedFragment}`);

    if (result.mentioned === 'si') mentioned++;

    if (i < PROMPTS.length - 1) await sleep(2000);
  }

  fs.writeFileSync(csvPath, rows.join('\n'), 'utf-8');

  console.log(`\n========================================`);
  console.log(`Resultados: ${mentioned}/${PROMPTS.length} prompts mencionaron Entrelampistas`);
  console.log(`========================================\n`);

  for (const r of results) {
    const icon = r.mentioned === 'si' ? '✓' : r.mentioned === 'error' ? '!' : '✗';
    console.log(`  ${icon} ${r.prompt}`);
    if (r.mentioned === 'si') console.log(`    → ${r.fragment.slice(0, 100)}...`);
  }

  console.log(`\nCSV guardado en: ${csvPath}`);
}

main().catch(console.error);
