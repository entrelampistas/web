// entrelampistas · render de un tema completo: T0 (puerta) · T1 (tesis) · T2 (mapa) · T3 (preguntas) · E1–E7 (ensayo)
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
import { readFileSync } from 'node:fs';
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
  const parrafo = (t) => {
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
    return `<p>${html}</p>${fichas}`;
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

  /* ════════ T0 · puerta del tema ════════ */
  let out = `
  <!-- T0 · tema -->
  <section class="pantalla tema-t0" id="tema" data-pantalla data-ruta="${esc(M.mapasRuta || 'mapas')}" data-meta="" data-t0 aria-labelledby="tema-titulo">
    <div class="foto-velo tema-t0__foto">
      <img src="${esc(M.t0.foto.src)}" alt="${esc(M.t0.foto.alt || '')}" width="${M.t0.foto.w}" height="${M.t0.foto.h}" loading="eager"${M.t0.foto.posicion ? ` style="object-position:${esc(M.t0.foto.posicion)}"` : ''}>
      <div class="foto-velo__capa foto-velo__capa--pie">
        <h1 class="display-m" id="tema-titulo">${esc(M.tituloLargo || M.titulo)}</h1>
      </div>
    </div>
    <p class="tema-t0__resumen">${esc(M.t0.resumen)}${M.t0.resumenPendiente ? '<!-- ◆ resumen provisional: primer párrafo de la tesis, pendiente de la autora -->' : ''}</p>
    <div class="lista tema-t0__salidas">
      <a class="fila" href="#tesis"><span class="fila__cuerpo"><span class="fila__meta">1 · tesis</span><span class="fila__titulo">${esc(M.t1.pregunta || M.subtitulo || 'Tesis')}</span></span><span class="fila__flecha" aria-hidden="true">›</span></a>
      <a class="fila" href="#mapa"><span class="fila__cuerpo"><span class="fila__meta">2 · mapa · ${secciones.length} paradas</span><span class="fila__titulo">Recorrer el ensayo</span></span><span class="fila__flecha" aria-hidden="true">›</span></a>
      <a class="fila" href="#ensayo"><span class="fila__cuerpo"><span class="fila__meta">3 · ensayo</span><span class="fila__titulo">Leer el ensayo completo</span></span><span class="fila__estado" data-lectura="fraccion" data-slug="${esc(slug)}" data-vacio="0 / ${secciones.length}">0 / ${secciones.length}</span></a>${H ? `
      <a class="fila" href="${esc(H.enlace)}"><span class="fila__cuerpo"><span class="fila__meta">4 · herramienta</span><span class="fila__titulo">${esc(H.titulo)}</span></span><span class="fila__flecha" aria-hidden="true">›</span></a>` : ''}
    </div>${M.conceptos && M.conceptos.length ? `
    <section class="tema-t0__bloque" aria-labelledby="tema-conceptos">
      <h2 class="visually-hidden" id="tema-conceptos">conceptos</h2>
      <div class="chips">${M.conceptos.map(c => c.enlace ? `<a class="chip" href="${esc(c.enlace)}">${esc(c.nombre)}</a>` : `<span class="chip" aria-disabled="true" title="ficha pronto">${esc(c.nombre)}</span>`).join('')}</div>
    </section>` : ''}${M.relacion && M.relacion.length ? `
    <section class="tema-t0__bloque" aria-labelledby="tema-relacion">
      <h2 class="visually-hidden" id="tema-relacion">se relaciona con</h2>
      <div class="lista">${M.relacion.map(r => `<a class="fila fila--relacion" href="${esc(r.enlace)}">${FORMAS[r.eje] || ''}<span class="cuerpo">${esc(r.nombre)}</span><span class="mono-fon meta">${esc(r.nota || '')}</span></a>`).join('')}</div>
    </section>` : ''}
  </section>`;

  /* ════════ T1 · tesis ════════ */
  out += `

  <!-- T1 · tesis -->
  <section class="pantalla tema-tesis" id="tesis" data-pantalla data-ruta="${esc(rutaCab)}" data-meta="1 · tesis" aria-labelledby="tesis-titulo">
    <div class="tema-tesis__cab">
      <h2 class="display-m" id="tesis-titulo">${esc(M.titulo)}</h2>${M.subtitulo ? `
      <p class="tema-sub">${esc(M.subtitulo)}</p>` : ''}
    </div>
    <div class="tema-tesis__texto">
      ${M.t1.parrafos.map(p => `<p>${esc(p)}</p>`).join('\n      ')}${!M.subtitulo && M.t1.pregunta ? `
      <p class="tema-sub tema-tesis__pregunta">${esc(M.t1.pregunta)}</p>` : ''}
    </div>
    <div class="lista tema-tesis__salidas">
      <a class="fila fila--pieza" href="#mapa"><span class="fila__cuerpo"><span class="fila__meta">2 · mapa · ${secciones.length} paradas</span><span class="titulo-s-700">Recorrer el ensayo</span></span><span class="fila__flecha" aria-hidden="true">›</span></a>${H ? `
      <a class="fila fila--pieza" href="${esc(H.enlace)}"><span class="fila__cuerpo"><span class="fila__meta">3 · herramienta</span><span class="titulo-s-700">${esc(H.titulo)}</span></span><span class="fila__flecha" aria-hidden="true">›</span></a>` : ''}
    </div>
    <div class="pantalla__pie"><a class="btn btn--tinta btn--cta" href="#ensayo">leer</a></div>
  </section>`;

  /* ════════ T2 · mapa ════════ */
  out += `

  <!-- T2 · mapa -->
  <section class="pantalla tema-mapa" id="mapa" data-pantalla data-ruta="${esc(rutaCab)}" data-meta="2 · mapa" aria-labelledby="mapa-titulo">
    <div class="tema-mapa__cab">
      <h2 class="mono meta" id="mapa-titulo">${secciones.length} paradas · toca una para ver de qué va</h2>
      <p class="tema-mapa__lead">${esc(M.t2.lead)}</p>
    </div>
    <ol class="paradas">
${paradas.map((p, i) => `      <li class="parada">
        <button class="parada__cab" type="button" aria-expanded="${i === 0}" aria-controls="parada-${p.n}" data-parada><span class="mono-num">${p.n}</span><span class="parada__titulo">${esc(p.titulo)}</span></button>
        <div class="parada__cuerpo" id="parada-${p.n}"${i === 0 ? '' : ' hidden'}>${p.frase ? `
          <p class="parada__frase">${esc(p.frase)}</p>` : ''}
          <p class="parada__intro${p.recorte ? ' parada__intro--recorte' : ''}">${esc(p.intro)}</p>
          <a class="btn btn--texto btn--inline parada__ir" href="#seccion-${p.n}">ir a la sección ›</a>
        </div>
      </li>`).join('\n')}${H ? `
      <li class="parada parada--puente">
        <a class="parada__cab parada__cab--enlace" href="${esc(H.enlace)}"><span class="mono-num parada__rombo" aria-hidden="true">◆</span><span class="fila__cuerpo"><span class="parada__titulo">${esc(H.titulo)}</span></span><span class="fila__flecha" aria-hidden="true">›</span></a>
      </li>` : ''}
    </ol>
    <div class="pantalla__pie"><a class="btn btn--tinta btn--cta" href="#ensayo">leer</a></div>
  </section>`;

  /* ════════ T3 · preguntas ════════ */
  const t3 = M.t3 || {};
  out += `

  <!-- T3 · preguntas -->
  <section class="pantalla tema-preguntas sobre-tinta" id="preguntas" data-pantalla data-ruta="${esc(rutaCab)}" data-meta="2 · mapa · fin" data-tinta aria-labelledby="preguntas-titulo">
    <p class="tema-preguntas__lead">${esc(t3.lead || '')}</p>
    <h2 class="tema-preguntas__titulo" id="preguntas-titulo">${esc(t3.titulo || 'Preguntas')}</h2>
    <ol class="tema-preguntas__lista${t3.rombos ? ' tema-preguntas__lista--rombos' : ''}">
      ${preguntas.map((q, i) => `<li>${t3.rombos ? '<span class="tema-preguntas__rombo" aria-hidden="true">◆</span>' : `<span class="mono-num tema-preguntas__folio" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>`}<span>${esc(q)}</span></li>`).join('\n      ')}
    </ol>
    <div class="pantalla__pie tema-preguntas__pie">
      <a class="btn btn--cta tema-preguntas__papel" href="#ensayo">leer el ensayo</a>${H ? `
      <a class="btn btn--acento btn--cta" href="${esc(H.enlace)}">${esc(H.boton || H.titulo)}</a>` : ''}
      <button class="btn btn--texto btn--cta" type="button" data-compartir="tarjeta-preguntas">${ICONO_COMPARTIR} compartir las preguntas</button>
    </div>
  </section>`;

  /* ════════ E1 · entrada ════════ */
  let intro = doc.intro.slice();
  if (resumen && intro[0] && intro[0].includes(resumen)) intro[0] = intro[0].replace(resumen, '').replace(/\s+/g, ' ').trim();
  intro = intro.filter(Boolean);
  let preguntaEntrada = null;
  if (intro.length && intro[intro.length - 1].startsWith('¿')) preguntaEntrada = intro.pop();
  const P = M.portada;
  out += `

  <!-- E1–E7 · ensayo -->
  <article class="ensayo" id="ensayo" data-ensayo data-slug="${esc(slug)}" data-ruta="${esc(rutaCab)}" aria-label="Ensayo: ${esc(M.titulo)}">
<header class="ensayo-entrada">
  <div class="ensayo-portada${P.corta ? ' ensayo-portada--corta' : ''}">
    <img src="${esc(P.src)}" alt="${esc(P.alt || '')}" width="${P.w}" height="${P.h}" loading="lazy"${P.posicion ? ` style="object-position:${esc(P.posicion)}"` : ''}>
    <div class="ensayo-portada__capa"><h2 class="ensayo-portada__titulo">${esc(M.titulo)}</h2></div>
  </div>
  <div class="ensayo-cuerpo">${M.subtitulo ? `
    <p class="ensayo-sub">${esc(M.subtitulo)}</p>` : ''}${resumen ? `
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
      return `<div class="ensayo-filas">${fs.map(f => `<div class="ensayo-fila${f.nombre.length > 16 ? ' ensayo-fila--larga' : ''}"><span class="ensayo-fila__nombre">${esc(f.nombre)}</span><span class="secundario">${esc(f.texto)}</span></div>`).join('')}</div>\n`;
    }
    if (b.tipo === 'reticula') {
      const rs = b.lineas.map(partePunto);
      let html = '';
      if (b.etiqueta) html += `<p class="mono ensayo-reticula__etiqueta">${esc(b.etiqueta)}</p>\n`;
      html += `<div class="ensayo-reticula${b.guardar ? ' ensayo-reticula--preguntas' : ''}">${rs.map(r => `<div class="ensayo-reticula__celda"><span class="mono ensayo-reticula__nombre">${esc(r.nombre)}.</span><span>${esc(r.texto)}</span></div>`).join('')}</div>\n`;
      if (b.guardar) {
        const id = `tarjeta-reticula-${n}`;
        const T = b.tarjeta || {};
        tarjetas.push({ id, datos: { cab: T.cab || rutaCab, titulo: T.titulo || b.etiqueta || '', lineas: rs.map(r => `${r.nombre}. ${r.texto}`), texto: T.texto || `${T.titulo || ''} · ${M.titulo}`, enlace: `${SITE}${ruta}#seccion-${n}`, pie: `entrelampistas.com${ruta}`, archivo: T.archivo || `entrelampistas-${slug}-preguntas` } });
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
    lineas.forEach((p, i) => {
      if (enIdx[i]) cuerpo += bloqueHtml(enIdx[i], s.n);
      else if (!consumidos.has(i)) cuerpo += parrafo(p) + '\n';
      if (tras[i + 1]) for (const b of tras[i + 1]) cuerpo += bloqueHtml(b, s.n);
    });

    let cabecera;
    if (m.foto) {
      cabecera = `<figure class="ensayo-foto"><img src="${esc(m.foto.src)}" alt="${esc(m.foto.alt || '')}" width="${m.foto.w}" height="${m.foto.h}" loading="lazy"><span class="ensayo-foto__folio" aria-hidden="true">${s.n}</span></figure>`;
    } else if (m.media) {
      cabecera = `<div class="ensayo-seccion__media${m.media.tipo === 'textura' ? ' es-textura' : ''}" style="height:${m.media.alto}px">
    <img src="${esc(m.media.src)}" alt="${esc(m.media.alt || '')}" loading="lazy" width="1000" height="${m.media.alto * 2}">
    <div class="ensayo-seccion__velo"><span class="ensayo-seccion__num" aria-hidden="true">${s.n}</span></div>
  </div>`;
    } else {
      cabecera = `<p class="mono meta ensayo-seccion__etiqueta" aria-hidden="true">${s.n}</p>`;
    }

    let pie = '';
    if (m.pausa) pie += `<img class="ensayo-pausa" src="${esc(m.pausa.src)}" alt="${esc(m.pausa.alt || '')}" width="${m.pausa.w}" height="${m.pausa.h}" loading="lazy">\n  `;
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
    <h2 class="ensayo-seccion__titulo" id="seccion-${s.n}-titulo"><span class="visually-hidden">${s.n} · </span>${esc(s.titulo)}</h2>
    ${cuerpo.trim()}
  </div>
  ${pie}
</section>`;
  }

  /* ════════ E7 · cierre ════════ */
  const C = M.cierre || {};
  const faq = C.faq || [];
  const correo = faq.length || C.correoCompacto ? render(partials['correo-compacto'], ctx) : '';
  out += `

<footer class="ensayo-cierre" id="fin" data-seccion="fin" data-meta="fin">
  <p class="mono meta ensayo-estado"><span>has terminado</span> <span class="guardado" data-guardado hidden>· guardado</span></p>${C.cita ? `
  <blockquote class="pullquote"><p>${esc(C.cita)}</p></blockquote>` : ''}
  <div class="ensayo-cierre__acciones">
    <button class="btn btn--hueco btn--cta" type="button" data-compartir="tarjeta-ensayo">${ICONO_COMPARTIR} compartir</button>
    <a class="btn btn--hueco btn--cta" href="#mapa">volver al mapa</a>
  </div>${H ? `
  <div class="lista">
    <a class="fila fila--pieza" href="${esc(H.enlace)}"><span class="fila__cuerpo"><span class="titulo-s-700">${esc(H.titulo)}</span></span><span class="fila__estado">comenzar ›</span></a>
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
  const TP = t3.tarjeta || {};
  const TE = C.tarjeta || {};
  out += `
<script type="application/json" id="tarjeta-preguntas">${json({ cab: TP.cab || rutaCab, titulo: TP.titulo || t3.titulo || 'Preguntas', lineas: preguntas, texto: TP.texto || `${t3.titulo || 'Preguntas'} · ${M.titulo}`, enlace: `${SITE}${ruta}#preguntas`, pie: `entrelampistas.com${ruta}`, archivo: TP.archivo || `entrelampistas-${slug}-preguntas` })}</script>
<script type="application/json" id="tarjeta-ensayo">${json({ cab: TE.cab || rutaCab, cita: TE.cita || C.cita || '', titulo: TE.cita || C.cita ? undefined : M.titulo, texto: TE.texto || M.titulo, enlace: `${SITE}${ruta}`, pie: `entrelampistas.com${ruta}`, archivo: TE.archivo || `entrelampistas-${slug}` })}</script>`;
  for (const t of tarjetas) out += `\n<script type="application/json" id="${t.id}">${json(t.datos)}</script>`;
  if (faq.length) {
    out += `\n<script type="application/ld+json">${json({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) })}</script>`;
  }
  return out;
}
