import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
// Astro ya no reexporta z desde astro:content: se importa de zod directamente.
import { z } from 'zod/v4';

/**
 * Un Tema es la unidad editorial: una carpeta con sus modulos dentro.
 *
 *   src/content/temas/<slug>/index.md        front-matter + entradilla
 *   src/content/temas/<slug>/ensayo.md       modulo Ensayo
 *   src/content/temas/<slug>/conceptos.yaml  modulo Conceptos
 *
 * Las tres colecciones comparten el id — el nombre de la carpeta — para poder
 * cruzarlas sin un campo de referencia extra.
 */
const idDeCarpeta = ({ entry }: { entry: string }) => entry.split('/')[0];

/** Peso de la pieza en el feed. Es lo que le da cadencia al scroll. */
const variante = z.enum(['fijada', 'destacada', 'estandar']).default('estandar');

/** Id de un garabato de src/assets/garabatos/. Ver catalogo.json. */
const garabato = z.string().optional();

const temas = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/temas', generateId: idDeCarpeta }),
  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      subtitulo: z.string(),
      numero: z.number().int().positive(),
      fecha: z.date(),
      portada: image().optional(),
      portadaAlt: z.string().optional(),
      etiquetas: z.array(z.string()).default([]),
      garabato,
      variante,
      borrador: z.boolean().default(false),
    }),
});

const ensayos = defineCollection({
  loader: glob({ pattern: '*/ensayo.md', base: './src/content/temas', generateId: idDeCarpeta }),
  schema: z.object({
    titulo: z.string().default('Ensayo'),
    minutos: z.number().int().positive(),
  }),
});

const conceptos = defineCollection({
  loader: glob({ pattern: '*/conceptos.yaml', base: './src/content/temas', generateId: idDeCarpeta }),
  schema: z.object({
    entradas: z
      .array(
        z.object({
          termino: z.string(),
          definicion: z.string(),
        })
      )
      .min(1),
  }),
});

/**
 * Una Pieza es contenido que vive por si mismo en el feed: un habito, una nota,
 * o un manifiesto. El branding entra por aqui — es contenido, no una pagina
 * de marketing aparte.
 */
const piezas = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/piezas' }),
  schema: z.object({
    titulo: z.string(),
    tipo: z.enum(['habito', 'nota', 'manifiesto']),
    resumen: z.string(),
    fecha: z.date(),
    minutos: z.number().int().positive(),
    tema: z.string().optional(),
    etiquetas: z.array(z.string()).default([]),
    garabato,
    variante,
    /** La pieza fijada abre el feed siempre, al margen de su fecha. */
    fijada: z.boolean().default(false),
    /** Muestra el bloque de definicion de marca. Solo para manifiestos. */
    definicion: z.boolean().default(false),
    borrador: z.boolean().default(false),
  }),
});

/** Los temas que aparecen como chips de filtro, en el orden en que se listan. */
const etiquetas = defineCollection({
  loader: file('./src/content/etiquetas.yaml'),
  schema: z.object({
    id: z.string(),
    nombre: z.string(),
    descripcion: z.string(),
  }),
});

export const collections = { temas, ensayos, conceptos, piezas, etiquetas };
