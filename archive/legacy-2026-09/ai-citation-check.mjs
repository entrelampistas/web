/**
 * ai-citation-check.mjs — Monitoreo de citaciones de Entrelampistas en LLMs
 * Usa la API de Anthropic con web search para testear si entrelampistas.com
 * aparece en respuestas sobre temas clave.
 *
 * Run: ANTHROPIC_API_KEY=sk-... node ai-citation-check.mjs
 * Output: CSV en stdout + resumen
 */
import Anthropic from '@anthropic-ai/sdk';
import { appendFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const client = new Anthropic();
const today = new Date().toISOString().split('T')[0];
const CSV_PATH = join(import.meta.dirname, 'ai-citations.csv');

const QUERIES = [
  '¿Que es la habitabilidad digital?',
  '¿Que son los sesgos cognitivos y como afectan nuestras decisiones?',
  'Blogs en espanol sobre pensamiento critico y tecnologia',
  '¿Que es la economia de la atencion?',
  '¿Que es la enshittification de las plataformas?',
  'Recursos sobre autonomia cognitiva en entornos digitales',
  '¿Que es el sesgo de confirmacion?',
  'Proyectos editoriales sobre pensamiento critico en Barcelona',
];

function searchForMention(text) {
  const lower = text.toLowerCase();
  const patterns = ['entrelampistas', 'entrelampistas.com'];
  for (const p of patterns) {
    const idx = lower.indexOf(p);
    if (idx !== -1) {
      const start = Math.max(0, idx - 60);
      const end = Math.min(text.length, idx + p.length + 60);
      return { found: true, fragment: text.substring(start, end).replace(/\n/g, ' ').trim() };
    }
  }
  return { found: false, fragment: '' };
}

function escapeCSV(str) {
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

async function checkQuery(query) {
  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [{ role: 'user', content: query }],
      tools: [{ type: 'web_search_20250305', name: 'web_search', max_uses: 3 }],
    });

    // Extract all text from response
    const fullText = response.content
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('\n');

    return searchForMention(fullText);
  } catch (err) {
    console.error(`  Error on query "${query}": ${err.message}`);
    return { found: false, fragment: `ERROR: ${err.message}` };
  }
}

async function main() {
  console.log(`\nEntrelampistas — AI Citation Check`);
  console.log(`Fecha: ${today}`);
  console.log(`Queries: ${QUERIES.length}\n`);

  // CSV header if file is new
  try {
    appendFileSync(CSV_PATH, '', { flag: 'ax' });
    writeFileSync(CSV_PATH, 'fecha,query,mencion,fragmento\n');
  } catch { /* file exists */ }

  let mentions = 0;

  for (const query of QUERIES) {
    process.stdout.write(`  Checking: ${query.substring(0, 50)}... `);
    const result = await checkQuery(query);

    if (result.found) {
      mentions++;
      console.log('CITADO');
    } else {
      console.log('no');
    }

    const csvLine = [today, escapeCSV(query), result.found ? 'si' : 'no', escapeCSV(result.fragment)].join(',');
    appendFileSync(CSV_PATH, csvLine + '\n');
  }

  console.log(`\n--- Resumen ---`);
  console.log(`${mentions}/${QUERIES.length} queries mencionaron Entrelampistas`);
  console.log(`Resultados guardados en: ${CSV_PATH}`);
}

main().catch(console.error);
