// entrelampistas · render de un mapa en dos páginas (24-09-2026):
//   {{@tema slug="x" parte="mapa"}}   → /x          pantalla de mapa: portada, tesis, recorrido, preguntas, cierre con otros mapas
//   {{@tema slug="x" parte="ensayo"}} → /x/ensayo   ensayo E1–E7, solo se llega por enlace (botón, parada, feed)
// Lee content/ensayo-<slug>.md (texto verbatim de la autora) y content/ensayo-<slug>.json (presentación).
//
// Bloques de sección (json › secciones[n].bloques), con índices 0-based sobre los párrafos de la sección
// (la pregunta de cierre, último párrafo que empieza por ¿, se retira antes y no cuenta):
//   { tipo:"cifras",    desde, hasta }                        líneas «CIFRA — texto» → retícula de una o dos cifras
//   { tipo:"filas",     desde, hasta }                        líneas «Nombre — texto» → filas de dos columnas
//   { tipo:"filas",     tras, filas:[{nombre,texto}] }        filas explícitas tras N párrafos (Habitabilidad)
//   { tipo:"reticula",  desde, hasta, etiqueta?, guardar?, tarjeta? }  líneas «Nombre. texto» → retícula 2×2 (+ guardar → tarjeta)
//   { tipo:"pullquote", linea }                               ese párrafo pasa a pullquote
//   { tipo:"pullquote", tras, texto }                         pullquote con texto propio tras N párrafos
// secciones[n].destacados: ["frase verbatim"] · ◆ propuesta a validar por la autora; se marca <span class="destacado"> (el build falla si no está en el texto)
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const SITE = 'https://www.entrelampistas.com';
const ICONO_COMPARTIR = '<svg viewBox="0 0 14 14" aria-hidden="true"><polyline points="7,9 7,1"/><polyline points="3.5,4.5 7,1 10.5,4.5"/><polyline points="1,8 1,13 13,13 13,8"/></svg>';
const ICONO_GUARDAR = '<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1.5" y="1.5" width="11" height="11"/></svg>';
const FORMAS = {
  criterio: '<span class="forma forma--criterio" aria-hidden="true"><svg viewBox="0 0 10 10"><rect width="10" height="10"/></svg></span>',
  entornos: '<span class="forma forma--entornos" aria-hidden="true"><svg viewBox="0 0 10 10"><circle cx="5" cy="5" r="4.25"/></svg></span>',
};

function parseMd(md) {
  const lineas = md.split('\n').map(l => l.trimEnd());
  let i = 0;
  while (i < lineas.length && lineas[i].trim() !== 'ENSAYO') i++;
  i++;
  while (i < lineas.length && !lineas[i].trim()) i++;
  const titulo = lineas[i++].trim();
  const intro = [];
  const secciones = [];
  let actual = null;
  for (; i < lineas.length; i++) {
    const l = lineas[i].trim();
    if (!l) continue;
    const m = l.match(/^(0\d) · (.+)$/);
    if (m) { actual = { n: m[1], titulo: m[2], parrafos: [] }; secciones.push(actual); continue; }
    (actual ? actual.parrafos : intro).push(l);
  }
  return { titulo, intro, secciones };
}

// <img> con srcset: junto a cada foto-1000 vive una -w1600 para pantallas densas (assets/img, ver design/docs/fotos.md)
const SIZES = '(min-width: 1024px) 480px, 100vw';
const imgAttrs = (f, esc) => {
  const src = f.src || '';
  const m = src.match(/^(.*)\.jpg$/);
  const srcset = m && !/-w\d+$/.test(m[1]) && /\/(cri|dec)-/.test(src) ? ` srcset="${esc(src)} 1000w, ${esc(m[1])}-w1600.jpg 1600w" sizes="${SIZES}"` : '';
  return `src="${esc(src)}"${srcset} alt="${esc(f.alt || '')}" width="${f.w}" height="${f.h}"`;
};
// 23-09-2026 · único patrón de imagen con texto (components.css .foto): folio · título · subtítulo, siempre dentro de la foto
// tag: elemento del título (h1/h2/span) · capa: 'div' o 'button' (feed) · extra: html que va al final de la capa (pie)
const foto = ({ img, clase = '', folio = '', titulo = '', tituloId = '', tituloTag = 'h2', sub = '', capaTag = 'div', capaAttrs = '', extra = '', tras = '' }) => `<figure class="foto${clase ? ' ' + clase : ''}">
    ${img}
    <${capaTag} class="foto__capa"${capaAttrs}>${folio ? `
      <span class="mono meta foto__folio" aria-hidden="true">${folio}</span>` : ''}
      <${tituloTag} class="foto__titulo"${tituloId ? ` id="${tituloId}"` : ''}>${titulo}</${tituloTag}>${sub ? `
      <span class="foto__sub">${sub}</span>` : ''}${extra}
    </${capaTag}>${tras}
  </figure>`;
// «Criterio informativo: ¿cómo te llega lo que sabes?» → título «Criterio informativo» + sub «¿cómo te llega lo que sabes?»
const partesTitulo = M => {
  const m = (M.titulo || '').match(/^(.+?): (¿.+)$/);
  if (m) return { titulo: m[1], sub: m[2] };
  return { titulo: M.titulo, sub: (M.t1 && M.t1.pregunta) || M.subtitulo || '' };
};
const idDe = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const parteGuion = l => { const m = l.match(/^(.+?) — (.+)$/); return m ? { nombre: m[1], texto: m[2] } : { nombre: '', texto: l }; };
const partePunto = l => { const m = l.match(/^([^.]+)\. (.+)$/); return m ? { nombre: m[1], texto: m[2] } : { nombre: '', texto: l }; };

export default function tema(ctx, { ROOT, esc, render, partials }) {
  const slug = ctx.slug;
  if (!slug) throw new Error('{{@tema}} necesita slug');
  const md = readFileSync(join(ROOT, 'content', `ensayo-${slug}.md`), 'utf8');
  const M = JSON.parse(readFileSync(join(ROOT, 'content', `ensayo-${slug}.json`), 'utf8'));
  const doc = parseMd(md);
  const ruta = M.ruta || `/${slug}`;
  const rutaCab = (M.tituloCorto || M.titulo).toLowerCase();
  const forma = FORMAS[M.eje] || '';
  const json = o => JSON.stringify(o).replace(/</g, '\\u003c');

  /* ── secciones: retirar pregunta de cierre ── */
  const secciones = doc.secciones.map(s => {
    const parrafos = s.parrafos.slice();
    const ultimo = parrafos[parrafos.length - 1];
    const cierre = ultimo && ultimo.startsWith('¿') ? parrafos.pop() : null;
    return { ...s, parrafos, cierre, meta: (M.secciones || []).find(x => x.n === s.n) || {} };
  });

  /* ── términos con ficha: una vez cada uno, en su primera aparición ── */
  const terms = (M.terms || []).map(t => ({ ...t, hecho: false }));
  // clase: «ensayo-entradilla» en el primer párrafo de cada sección · destacados: frases verbatim del párrafo (◆ propuesta, json › secciones[].destacados)
  const parrafo = (t, { clase = '', destacados = [] } = {}) => {
    let html = esc(t);
    let fichas = '';
    for (const T of terms) {
      if (T.hecho || !html.includes(T.palabra)) continue;
      T.hecho = true;
      const id = 'term-' + idDe(T.palabra);
      html = html.replace(T.palabra, `<button type="button" class="term" aria-expanded="false" aria-controls="${id}" data-term>${esc(T.palabra)}</button>`);
      fichas += `
<div class="term-ficha" id="${id}" hidden>${T.nota ? `<!-- ◆ ${esc(T.nota)} -->` : ''}
  <div class="term-ficha__cab"><span class="term-ficha__nombre">${esc(T.nombre)}</span>${T.fuente ? `<span class="mono meta">${esc(T.fuente)}</span>` : ''}</div>
  <p class="term-ficha__def">${esc(T.definicion)}</p>${T.enlace ? `
  <a class="mono term-ficha__ir" href="${esc(T.enlace)}">ver en conceptos ›</a>` : ''}
</div>`;
      break; // un término por párrafo
    }
    for (const d of destacados) {
      const e = esc(d.texto);
      if (d.hecho || !html.includes(e)) continue;
      d.hecho = true;
      html = html.replace(e, `<span class="destacado">${e}</span>`);
    }
    return `<p${clase ? ` class="${clase}"` : ''}>${html}</p>${fichas}`;
  };

  /* ── T2: paradas · del json o derivadas del primer párrafo de cada sección ── */
  const paradas = secciones.map((s, i) => {
    const p = (M.t2 && M.t2.paradas && M.t2.paradas[i]) || {};
    return { n: s.n, titulo: p.titulo || s.titulo, frase: p.frase || '', intro: p.intro || s.parrafos[0] || '', recorte: !p.intro };
  });

  /* ── T3: preguntas · del json o las de cierre de cada sección ── */
  const preguntas = (M.t3 && M.t3.preguntas) || secciones.map(s => s.cierre).filter(Boolean);
  const resumen = M.resumen || (M.t0 && M.t0.resumen) || '';
  const H = M.herramienta;
  const PT = partesTitulo(M);

  const ENS = `${ruta}/ensayo`;
  const parte = ctx.parte === 'ensayo' ? 'ensayo' : 'mapa';
  const t3 = M.t3 || {};
  const C = M.cierre || {};

  /* otros mapas: todos los content/ensayo-*.json, en su orden */
  const todos = readdirSync(join(ROOT, 'content')).filter(f => /^ensayo-[\w-]+\.json$/.test(f))
    .map(f => JSON.parse(readFileSync(join(ROOT, 'content', f), 'utf8')))
    .map(o => ({ slug: o.slug, ruta: o.ruta || `/${o.slug}`, titulo: partesTitulo(o).titulo, eje: o.eje, orden: o.orden || 99 }))
    .sort((a, b) => a.orden - b.orden);
  const otros = todos.filter(o => o.slug !== slug);
  const siguiente = otros.find(o => o.eje === M.eje) || todos[(todos.findIndex(o => o.slug === slug) + 1) % todos.length];
  const filaMapa = o => `<a class="fila fila--relacion fila--mapa" href="${esc(o.ruta)}">${FORMAS[o.eje] || ''}<span class="titulo-s-700">${esc(o.titulo)}</span><span class="fila__estado" data-lectura="fraccion" data-slug="${esc(o.slug)}" data-vacio=""></span></a>`;

  /* ════════ PANTALLA DE MAPA ════════ */
  const mismo = (a, b) => (a || '').trim().toLowerCase() === (b || '').trim().toLowerCase();
  const tesisP = (M.t1 && M.t1.parrafos) || [];
  const resumenMapa = M.t0 && M.t0.resumen && !tesisP.some(p => mismo(p, M.t0.resumen)) ? M.t0.resumen : '';
  const preguntaTesis = M.t1 && M.t1.pregunta && !mismo(M.t1.pregunta, PT.sub) ? M.t1.pregunta : '';
  const botonEnsayo = (extra = '') => `<a class="btn btn--tinta btn--cta" href="${ENS}" data-cta-ensayo data-desde="mapa"${extra}>leer el ensayo</a>`;

  const mapaHtml = `
<div class="mapa" data-mapa data-slug="${esc(slug)}" data-eje="${esc(M.eje || '')}" data-secciones="${secciones.length}">
  <!-- portada: visión general y primera salida al ensayo -->
  <section class="mapa-portada" id="tema" aria-labelledby="tema-titulo">
    ${foto({ clase: 'foto--4x3', img: `<img ${imgAttrs(M.t0.foto, esc)} loading="eager" fetchpriority="high"${M.t0.foto.posicion ? ` style="object-position:${esc(M.t0.foto.posicion)}"` : ''}>`,
      titulo: esc(PT.titulo), tituloId: 'tema-titulo', tituloTag: 'h1', sub: esc(PT.sub) })}
    <div class="mapa-portada__cuerpo">${resumenMapa ? `
      <p class="mapa-resumen">${esc(resumenMapa)}</p>` : ''}
      ${botonEnsayo()}
      <p class="mono meta mapa-estado" data-mapa-estado hidden><span>tu lectura</span> <span class="fila__estado" data-lectura="fraccion" data-slug="${esc(slug)}"></span></p>
    </div>
  </section>

  <!-- tesis -->
  <section class="mapa-bloque mapa-tesis" id="tesis" aria-labelledby="tesis-titulo">
    <h2 class="visually-hidden" id="tesis-titulo">tesis</h2>
    ${tesisP.map((p, i) => `<p${i === 0 ? ' class="mapa-tesis__entrada"' : ''}>${esc(p)}</p>`).join('\n    ')}${preguntaTesis ? `
    <p class="tema-sub">${esc(preguntaTesis)}</p>` : ''}
  </section>

  <!-- recorrido: las cinco paradas del ensayo, cada una lleva a su sección -->
  <section class="mapa-bloque" id="recorrido" aria-labelledby="recorrido-titulo">
    <h2 class="mono meta" id="recorrido-titulo">${secciones.length} paradas · toca una para ver de qué va</h2>
    <p class="tema-mapa__lead">${esc(M.t2.lead)}</p>
    <ol class="paradas">
${paradas.map((p, i) => `      <li class="parada">
        <button class="parada__cab" type="button" aria-expanded="false" aria-controls="parada-${p.n}" data-parada="${p.n}"><span class="mono-num">${p.n}</span><span class="parada__titulo">${esc(p.titulo)}</span><span class="parada__marca" aria-hidden="true">+</span></button>
        <div class="parada__cuerpo" id="parada-${p.n}" hidden>${p.frase ? `
          <p class="parada__frase">${esc(p.frase)}</p>` : ''}
          <p class="parada__intro${p.recorte ? ' parada__intro--recorte' : ''}">${esc(p.intro)}</p>
          <a class="btn btn--texto btn--inline parada__ir" href="${ENS}#seccion-${p.n}" data-desde="parada">ir a la sección ›</a>
        </div>
      </li>`).join('\n')}
    </ol>
  </section>

  <!-- preguntas para llevarse -->
  <section class="mapa-preguntas sobre-tinta" id="preguntas" aria-labelledby="preguntas-titulo">
    <p class="tema-preguntas__lead">${esc(t3.lead || '')}</p>
    <h2 class="tema-preguntas__titulo" id="preguntas-titulo">${esc(t3.titulo || 'Preguntas')}</h2>
    <ol class="tema-preguntas__lista${t3.rombos ? ' tema-preguntas__lista--rombos' : ''}">
      ${preguntas.map((q, i) => `<li>${t3.rombos ? '<span class="tema-preguntas__rombo" aria-hidden="true">◆</span>' : `<span class="mono-num tema-preguntas__folio" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>`}<span>${esc(q)}</span></li>`).join('\n      ')}
    </ol>
    <button class="btn btn--texto btn--cta" type="button" data-compartir="tarjeta-preguntas">${ICONO_COMPARTIR} compartir las preguntas</button>
  </section>

  <!-- cierre: la decisión principal otra vez, herramienta, conceptos y otros mapas -->
  <section class="mapa-cierre" aria-label="Seguir">
    ${botonEnsayo()}${H ? `
    <a class="btn btn--acento btn--cta" href="${esc(H.enlace)}">${esc(H.boton || H.titulo)}</a>` : ''}${M.conceptos && M.conceptos.length ? `
    <div class="mapa-cierre__bloque">
      <h2 class="visually-hidden">conceptos</h2>
      <div class="chips">${M.conceptos.map(c => c.enlace ? `<a class="chip" href="${esc(c.enlace)}">${esc(c.nombre)}</a>` : `<span class="chip" aria-disabled="true" title="ficha pronto">${esc(c.nombre)}</span>`).join('')}</div>
    </div>` : ''}${M.relacion && M.relacion.length ? `
    <div class="mapa-cierre__bloque">
      <h2 class="visually-hidden">se relaciona con</h2>
      <div class="lista">${M.relacion.map(r => `<a class="fila fila--relacion" href="${esc(r.enlace)}">${FORMAS[r.eje] || ''}<span class="cuerpo">${esc(r.nombre)}</span><span class="mono-fon meta">${esc(r.nota || '')}</span></a>`).join('')}</div>
    </div>` : ''}
    <div class="mapa-cierre__bloque">
      <h2 class="mono meta">otros mapas</h2>
      <div class="lista">${otros.map(filaMapa).join('')}</div>
    </div>
  </section>
</div>`;

  const tarjetaMapa = { cab: rutaCab, cita: (M.t1 && M.t1.pregunta) || PT.sub, texto: M.titulo, enlace: `${SITE}${ruta}`, pie: `entrelampistas.com${ruta}`, archivo: `entrelampistas-${slug}-mapa` };
  const TP = t3.tarjeta || {};
  const tarjetaPreguntas = `<script type="application/json" id="tarjeta-preguntas">${json({ cab: TP.cab || rutaCab, titulo: TP.titulo || t3.titulo || 'Preguntas', lineas: preguntas, texto: TP.texto || `${t3.titulo || 'Preguntas'} · ${M.titulo}`, enlace: `${SITE}${ruta}#preguntas`, pie: `entrelampistas.com${ruta}`, archivo: TP.archivo || `entrelampistas-${slug}-preguntas` })}</script>`;
  if (parte === 'mapa') {
    return mapaHtml + `
<script type="application/json" id="tarjeta-mapa" data-tarjeta>${json(tarjetaMapa)}</script>
${tarjetaPreguntas}`;
  }

  /* ════════ E1 · entrada ════════ */
  let intro = doc.intro.slice();
  if (resumen && intro[0] && intro[0].includes(resumen)) intro[0] = intro[0].replace(resumen, '').replace(/\s+/g, ' ').trim();
  intro = intro.filter(Boolean);
  let preguntaEntrada = null;
  if (intro.length && intro[intro.length - 1].startsWith('¿')) preguntaEntrada = intro.pop();
  const P = M.portada;
  let out = `

  <!-- E1–E7 · ensayo -->
  <article class="ensayo" id="ensayo" data-ensayo data-mapa-ruta="${esc(ruta)}" data-slug="${esc(slug)}" data-eje="${esc(M.eje || '')}" data-ruta="${esc(rutaCab)}" aria-label="Ensayo: ${esc(M.titulo)}">
<header class="ensayo-entrada">
  ${foto({ clase: 'ensayo-portada', img: `<img ${imgAttrs(P, esc)} loading="lazy"${P.posicion ? ` style="object-position:${esc(P.posicion)}"` : ''}>`,
    titulo: esc(PT.titulo), sub: esc(PT.sub) })}
  <div class="ensayo-cuerpo">${resumen ? `
    <div class="ensayo-resumen"><p class="visually-hidden">resumen</p><p class="cuerpo secundario">${esc(resumen)}</p></div>` : ''}
    ${intro.map(parrafo).join('\n    ')}${preguntaEntrada ? (M.entrada && M.entrada.preguntaPullquote
      ? `\n    <blockquote class="pullquote"><p>${esc(preguntaEntrada)}</p></blockquote>`
      : `\n    <p class="ensayo-seccion__pregunta ensayo-seccion__pregunta--entrada">${esc(preguntaEntrada)}</p>`) : ''}
  </div>
</header>`;

  /* ════════ E2–E6 · secciones ════════ */
  const tarjetas = [];
  const bloqueHtml = (b, n) => {
    if (b.tipo === 'cifras') {
      const cs = b.lineas.map(parteGuion);
      // una cifra sola o una larga («2.495.300») van a una columna: a dos no caben entre 320 y 390
      const apiladas = cs.length === 1 || cs.some(c => c.nombre.length >= 8);
      return `<div class="cifras${apiladas ? ' cifras--una' : ''}">${cs.map(c => `<div class="cifra"><span class="cifra__num">${esc(c.nombre)}</span><span class="cifra__texto">${esc(c.texto)}</span></div>`).join('')}</div>\n`;
    }
    if (b.tipo === 'filas') {
      const fs = b.filas || b.lineas.map(parteGuion);
      const apiladas = fs.some(f => f.nombre.length > 22);
      return `<div class="ensayo-filas${apiladas ? ' ensayo-filas--apiladas' : ''}">${fs.map(f => `<div class="ensayo-fila"><span class="ensayo-fila__nombre">${esc(f.nombre)}</span><span class="secundario">${esc(f.texto)}</span></div>`).join('')}</div>\n`;
    }
    if (b.tipo === 'reticula') {
      const rs = b.lineas.map(partePunto);
      let html = '';
      if (b.etiqueta) html += `<p class="mono ensayo-reticula__etiqueta">${esc(b.etiqueta)}</p>\n`;
      html += `<div class="ensayo-reticula${b.guardar ? ' ensayo-reticula--preguntas' : ''}">${rs.map(r => `<div class="ensayo-reticula__celda"><span class="mono ensayo-reticula__nombre">${esc(r.nombre)}.</span><span>${esc(r.texto)}</span></div>`).join('')}</div>\n`;
      if (b.guardar) {
        const id = `tarjeta-reticula-${n}`;
        const T = b.tarjeta || {};
        tarjetas.push({ id, datos: { cab: T.cab || rutaCab, titulo: T.titulo || b.etiqueta || '', lineas: rs.map(r => `${r.nombre}. ${r.texto}`), texto: T.texto || `${T.titulo || ''} · ${M.titulo}`, enlace: `${SITE}${ENS}#seccion-${n}`, pie: `entrelampistas.com${ruta}`, archivo: T.archivo || `entrelampistas-${slug}-preguntas` } });
        html += `<button class="btn btn--hueco btn--cta" type="button" data-compartir="${id}">${ICONO_GUARDAR} ${esc(b.guardar)}</button>\n`;
      }
      return html;
    }
    if (b.tipo === 'pullquote') return `<blockquote class="pullquote"><p>${esc(b.texto)}</p></blockquote>\n`;
    throw new Error(`bloque desconocido: ${b.tipo}`);
  };

  for (const s of secciones) {
    const m = s.meta;
    const lineas = s.parrafos;
    const enIdx = {}, tras = {}, consumidos = new Set();
    for (const b of m.bloques || []) {
      if (b.tipo === 'pullquote' && b.linea !== undefined) { enIdx[b.linea] = { ...b, texto: lineas[b.linea] }; consumidos.add(b.linea); }
      else if (b.desde !== undefined) { for (let k = b.desde; k <= b.hasta; k++) consumidos.add(k); enIdx[b.desde] = { ...b, lineas: lineas.slice(b.desde, b.hasta + 1) }; }
      else if (b.tras !== undefined) { (tras[b.tras] = tras[b.tras] || []).push(b); }
      else throw new Error(`sección ${s.n}: bloque sin posición`);
    }
    let cuerpo = '';
    const destacados = (m.destacados || []).map(texto => ({ texto, hecho: false }));
    let entradilla = true;
    lineas.forEach((p, i) => {
      if (enIdx[i]) { cuerpo += bloqueHtml(enIdx[i], s.n); entradilla = false; }
      else if (!consumidos.has(i)) { cuerpo += parrafo(p, { clase: entradilla ? 'ensayo-entradilla' : '', destacados }) + '\n'; entradilla = false; }
      if (tras[i + 1]) for (const b of tras[i + 1]) cuerpo += bloqueHtml(b, s.n);
    });
    for (const d of destacados) if (!d.hecho) throw new Error(`sección ${s.n}: destacado no encontrado en el texto: «${d.texto}»`);

    // cabecera de sección: folio + título siempre juntos; dentro de la foto cuando la hay
    const tituloSeccion = `<span class="visually-hidden">${s.n} · </span>${esc(s.titulo)}`;
    const idTitulo = `seccion-${s.n}-titulo`;
    let cabecera;
    if (m.foto) {
      // proporción natural del archivo (brief §4b); "recorte": "4x3" | "corta" para texturas muy altas
      // ◆ variantes c y d (24-09-2026): el título sale de la foto y va sobre papel; la foto queda sin texto ni velo
      cabecera = `<div class="ensayo-cuerpo ensayo-seccion__cab ensayo-seccion__cab--fuera" data-solo-v="c d"><p class="mono meta" aria-hidden="true">${s.n}</p><p class="ensayo-seccion__titulo" aria-hidden="true">${esc(s.titulo)}</p></div>
  ` + foto({ clase: `${m.foto.recorte ? 'foto--' + m.foto.recorte : 'foto--natural'} ensayo-foto`, img: `<img ${imgAttrs(m.foto, esc)} loading="lazy" decoding="async"${m.foto.posicion ? ` style="object-position:${esc(m.foto.posicion)}"` : ''}>`,
        folio: s.n, titulo: tituloSeccion, tituloId: idTitulo });
    } else {
      cabecera = `<div class="ensayo-cuerpo ensayo-seccion__cab"><p class="mono meta" aria-hidden="true">${s.n}</p><h2 class="ensayo-seccion__titulo" id="${idTitulo}">${tituloSeccion}</h2></div>`;
    }

    let pie = '';
    if (m.pausa) pie += `<img class="ensayo-pausa" ${imgAttrs(m.pausa, esc)} loading="lazy" decoding="async">\n  `;
    if (m.herramienta && H && s.cierre) {
      pie += `<div class="ensayo-herramienta sobre-tinta"><p class="ensayo-herramienta__titulo">${esc(s.cierre)}</p><a class="btn btn--acento btn--cta" href="${esc(H.enlace)}">${esc(H.boton || H.titulo)}</a></div>`;
    } else if (s.cierre) {
      pie += `<p class="ensayo-seccion__pregunta${m.pausa ? ' ensayo-seccion__pregunta--tras-foto' : ''}">${esc(s.cierre)}</p>`;
    }
    const metaCab = m.metaCab || (m.herramienta ? `${s.n} · fin` : s.n);

    out += `

<section class="ensayo-seccion" id="seccion-${s.n}" data-seccion="${s.n}" data-meta="${esc(metaCab)}" aria-labelledby="seccion-${s.n}-titulo">
  ${cabecera}
  <div class="ensayo-cuerpo">
    ${cuerpo.trim()}
  </div>
  ${pie}
</section>`;
  }

  /* ════════ E7 · cierre ════════ */
  const faq = C.faq || [];
  const correo = faq.length || C.correoCompacto ? render(partials['correo-compacto'], ctx) : '';
  out += `

<footer class="ensayo-cierre" id="fin" data-seccion="fin" data-meta="fin">
  <p class="mono meta ensayo-estado"><span>has terminado</span> <span class="guardado" data-guardado hidden>· guardado</span></p>${C.cita ? `
  <blockquote class="pullquote"><p>${esc(C.cita)}</p></blockquote>` : ''}
  <div class="ensayo-cierre__acciones">
    <button class="btn btn--hueco btn--cta" type="button" data-compartir="tarjeta-ensayo">${ICONO_COMPARTIR} compartir</button>
    <a class="btn btn--hueco btn--cta" href="${esc(ruta)}">volver al mapa</a>
  </div>
  <div class="lista ensayo-cierre__seguir">
    <a class="fila fila--pieza" href="${esc(ruta)}#preguntas"><span class="fila__cuerpo"><span class="titulo-s-700">${esc(t3.titulo || 'Preguntas')}</span></span><span class="fila__flecha" aria-hidden="true">›</span></a>${H ? `
    <a class="fila fila--pieza" href="${esc(H.enlace)}"><span class="fila__cuerpo"><span class="titulo-s-700">${esc(H.titulo)}</span></span><span class="fila__estado">comenzar ›</span></a>` : ''}
  </div>${siguiente ? `
  <div class="ensayo-cierre__siguiente">
    <h2 class="mono meta">siguiente mapa</h2>
    <div class="lista">${filaMapa(siguiente)}</div>
  </div>` : ''}${faq.length ? `
  <section class="faq" aria-labelledby="faq-titulo">
    <h2 class="mono meta" id="faq-titulo">Preguntas frecuentes</h2>
    <div class="faq__lista">
${faq.map((f, i) => `      <div class="faq__item">
        <h3 class="faq__q"><button type="button" class="faq__boton" aria-expanded="${i === 0}" aria-controls="faq-${i + 1}" data-faq><span>${esc(f.q)}</span><span class="faq__marca" aria-hidden="true">${i === 0 ? '−' : '+'}</span></button></h3>
        <div class="faq__a" id="faq-${i + 1}"${i === 0 ? '' : ' hidden'}><p class="cuerpo secundario">${esc(f.a)}</p></div>
      </div>`).join('\n')}
    </div>
  </section>` : ''}
  ${correo}${C.creditos ? `
  <p class="mono meta ensayo-creditos">${esc(C.creditos)}</p>` : ''}
</footer>
  </article>`;

  /* ════════ datos para compartir + schema ════════ */
  const TE = C.tarjeta || {};
  out += `
${tarjetaPreguntas}
<script type="application/json" id="tarjeta-ensayo" data-tarjeta>${json({ cab: TE.cab || rutaCab, cita: TE.cita || C.cita || '', titulo: TE.cita || C.cita ? undefined : M.titulo, texto: TE.texto || M.titulo, enlace: `${SITE}${ENS}`, pie: `entrelampistas.com${ENS}`, archivo: TE.archivo || `entrelampistas-${slug}` })}</script>`;
  for (const t of tarjetas) out += `\n<script type="application/json" id="${t.id}">${json(t.datos)}</script>`;
  if (faq.length) {
    out += `\n<script type="application/ld+json">${json({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) })}</script>`;
  }
  return out;
}
