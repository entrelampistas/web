/**
 * Catalogo de garabatos.
 *
 * Los trazos a mano son el contrapeso de la reticula: son lo unico del sistema
 * que puede salirse de la caja. Para que sean sistema y no adorno, cada marca
 * tiene un ROL asignado y no se usa fuera de el.
 *
 * Reglas (ver CLAUDE.md):
 *   1. Un garabato por viewport, maximo.
 *   2. Un solo acento por marca. Nunca dos colores en el mismo trazo.
 *   3. Solo ellos rompen la caja.
 *
 * Los SVG los genera scripts/trace-garabatos.mjs desde brand_assets/garabatos/.
 */

const archivos = import.meta.glob<string>('../assets/garabatos/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
});

/** id -> contenido SVG, con el id normalizado (sin ruta ni extension). */
const porId = new Map(
  Object.entries(archivos).map(([ruta, svg]) => [
    ruta.split('/').pop()!.replace(/\.svg$/, ''),
    svg,
  ])
);

export type Rol = 'indice' | 'subrayado' | 'firma' | 'cierre' | 'vacio';

/**
 * Que marca sirve para que. Elegidas a ojo sobre el catalogo trazado:
 * las lineas onduladas subrayan, los circulos cierran, los trazos con cuerpo
 * firman.
 */
export const ROLES: Record<Rol, readonly string[]> = {
  /** Junto a la numeracion 01/02/03 de los modulos. Marcas pequenas. */
  indice: ['verde-tinta-10', 'verde-tinta-04', 'tinta-tinta-03'],
  /** Bajo la frase clave. Sustituye al filete recto. */
  subrayado: ['ambar-ambar-03', 'ambar-ambar-04'],
  /** Firma de tema o de pieza. Marcas con presencia, sangradas por el borde. */
  firma: [
    'ambar-ambar-01',
    'tinta-tinta-01',
    'tinta-tinta-02',
    'verde-verde-01',
    'tinta-rojo-01',
    'ambar-ambar-02',
  ],
  /** Final de ensayo, en lugar de un <hr>. */
  cierre: ['tinta-tinta-04', 'verde-tinta-06', 'verde-tinta-07'],
  /** Busqueda sin resultados. */
  vacio: ['tinta-tinta-05'],
};

/** Hash estable: la misma clave elige siempre la misma marca entre builds. */
function indiceEstable(clave: string, total: number): number {
  let h = 0;
  for (let i = 0; i < clave.length; i++) h = (h * 31 + clave.charCodeAt(i)) | 0;
  return Math.abs(h) % total;
}

/**
 * Devuelve el SVG de una marca.
 *
 * @param rol   Para que se usa. Acota el catalogo a las marcas apropiadas.
 * @param id    Marca concreta (viene del front-matter). Si no se pasa, se elige
 *              una del rol de forma estable a partir de `clave`.
 * @param clave Semilla del reparto — normalmente el slug del contenido.
 */
export function garabato(rol: Rol, id?: string, clave = ''): string {
  if (id) {
    const svg = porId.get(id);
    if (!svg) {
      throw new Error(
        `Garabato "${id}" no existe. Disponibles: ${[...porId.keys()].join(', ')}`
      );
    }
    return svg;
  }

  const candidatos = ROLES[rol];
  return porId.get(candidatos[indiceEstable(clave, candidatos.length)])!;
}

export const idsDisponibles = () => [...porId.keys()].sort();
