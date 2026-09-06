import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * El feed mezcla Temas y Piezas en un solo scroll cronologico, con una
 * excepcion: la pieza fijada abre siempre, al margen de su fecha.
 */

export type Variante = 'fijada' | 'destacada' | 'estandar';

export type Articulo = {
  clase: 'tema' | 'pieza';
  slug: string;
  url: string;
  titulo: string;
  /** Subtitulo del tema, o resumen de la pieza. */
  bajada: string;
  /** Etiqueta de tipo en la esquina: TEMA, HABITO, NOTA... */
  tipo: string;
  fecha: Date;
  minutos: number;
  etiquetas: string[];
  garabato?: string;
  variante: Variante;
  /** Numero de orden del tema. Las piezas no lo llevan. */
  numero?: number;
  portada?: CollectionEntry<'temas'>['data']['portada'];
  portadaAlt?: string;
  /** Modulos disponibles, para que la tarjeta diga lo que contiene. */
  modulos?: string[];
};

const publicado = <T extends { data: { borrador: boolean } }>(e: T) =>
  import.meta.env.DEV || !e.data.borrador;

const ETIQUETA_TIPO: Record<string, string> = {
  habito: 'Habito',
  nota: 'Nota',
  manifiesto: 'Manifiesto',
};

/**
 * Construye el feed completo, ya ordenado.
 *
 * Lanza si hay mas de una pieza fijada: es un error de contenido que dejaria la
 * portada en manos del azar, y vale mas romper el build que publicarlo.
 */
export async function construirFeed(): Promise<Articulo[]> {
  const [temas, piezas, ensayos, conceptos] = await Promise.all([
    getCollection('temas', publicado),
    getCollection('piezas', publicado),
    getCollection('ensayos'),
    getCollection('conceptos'),
  ]);

  const conEnsayo = new Set(ensayos.map((e) => e.id));
  const conConceptos = new Set(conceptos.map((c) => c.id));

  const fijadas = piezas.filter((p) => p.data.fijada);
  if (fijadas.length > 1) {
    throw new Error(
      `Solo puede haber una pieza fijada y hay ${fijadas.length}: ` +
        `${fijadas.map((p) => p.id).join(', ')}. ` +
        `Quita "fijada: true" de todas menos una.`
    );
  }

  const articulos: Articulo[] = [
    ...temas.map((t) => ({
      clase: 'tema' as const,
      slug: t.id,
      url: `/temas/${t.id}/`,
      titulo: t.data.titulo,
      bajada: t.data.subtitulo,
      tipo: 'Tema',
      fecha: t.data.fecha,
      minutos: ensayos.find((e) => e.id === t.id)?.data.minutos ?? 0,
      etiquetas: t.data.etiquetas,
      garabato: t.data.garabato,
      variante: t.data.variante,
      numero: t.data.numero,
      portada: t.data.portada,
      portadaAlt: t.data.portadaAlt,
      modulos: modulosDe(conEnsayo.has(t.id), conConceptos.has(t.id)),
    })),
    ...piezas.map((p) => ({
      clase: 'pieza' as const,
      slug: p.id,
      url: `/piezas/${p.id}/`,
      titulo: p.data.titulo,
      bajada: p.data.resumen,
      tipo: ETIQUETA_TIPO[p.data.tipo],
      fecha: p.data.fecha,
      minutos: p.data.minutos,
      etiquetas: p.data.etiquetas,
      garabato: p.data.garabato,
      variante: p.data.fijada ? ('fijada' as const) : p.data.variante,
      modulos: undefined,
    })),
  ];

  return articulos.sort((a, b) => {
    if (a.variante === 'fijada') return -1;
    if (b.variante === 'fijada') return 1;
    return b.fecha.getTime() - a.fecha.getTime();
  });
}

/** Los cinco modulos previstos. Los de fase 2 se listan pero salen apagados. */
export const MODULOS = ['Ensayo', 'Conceptos', 'Referencias', 'Mapa', 'Herramientas'] as const;

function modulosDe(ensayo: boolean, conceptos: boolean): string[] {
  return [...(ensayo ? ['Ensayo'] : []), ...(conceptos ? ['Conceptos'] : [])];
}

const FORMATO_FECHA = new Intl.DateTimeFormat('es-ES', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

export const fechaLegible = (d: Date) => FORMATO_FECHA.format(d);
export const fechaISO = (d: Date) => d.toISOString().slice(0, 10);
