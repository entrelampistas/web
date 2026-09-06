import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { construirFeed } from '../lib/feed';

/**
 * Indice de busqueda, generado en build.
 *
 * Un solo JSON con todo lo publicado: titulos, bajadas, etiquetas, conceptos y
 * un extracto del ensayo. Para este volumen cabe de sobra en una peticion y
 * evita montar un backend de busqueda para decenas de documentos.
 */

export type Documento = {
  t: string; // titulo
  b: string; // bajada
  k: 'tema' | 'pieza' | 'concepto';
  e: string; // etiqueta de tipo, ya legible
  u: string; // url
  g: string[]; // etiquetas
  x: string; // texto adicional indexado, no mostrado
};

/** Recorta a la primera frase completa que quepa, sin cortar a media palabra. */
function extracto(texto: string, maximo = 320): string {
  const limpio = texto
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/[#*_>`[\]]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (limpio.length <= maximo) return limpio;
  const corte = limpio.lastIndexOf(' ', maximo);
  return limpio.slice(0, corte > 0 ? corte : maximo) + '…';
}

export const GET: APIRoute = async () => {
  const [feed, ensayos, conceptos] = await Promise.all([
    construirFeed(),
    getCollection('ensayos'),
    getCollection('conceptos'),
  ]);

  const cuerpoPorTema = new Map(ensayos.map((e) => [e.id, extracto(e.body ?? '')]));

  const documentos: Documento[] = [
    ...feed.map((a) => ({
      t: a.titulo,
      b: a.bajada,
      k: a.clase,
      e: a.tipo,
      u: a.url,
      g: a.etiquetas,
      x: cuerpoPorTema.get(a.slug) ?? '',
    })),
    ...conceptos.flatMap((c) =>
      c.data.entradas.map((entrada) => ({
        t: entrada.termino,
        b: entrada.definicion,
        k: 'concepto' as const,
        e: 'Concepto',
        u: `/temas/${c.id}/#conceptos`,
        g: [],
        x: '',
      }))
    ),
  ];

  return new Response(JSON.stringify(documentos), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=300, stale-while-revalidate=86400',
    },
  });
};
