// entrelampistas · mapa por paradas (30-09-2026 · «Entorno digital», sustituye al ensayo de Habitabilidad)
//   {{@paradas slug="habitabilidad" parte="mapa"}}          → /x          portada, tesis, parada 00 (índice), recorrido por tramos, conceptos, FAQ, siguiente mapa
//   {{@paradas slug="habitabilidad" parte="parada" n="03"}} → /x/03       una parada: foto o apertura, dato ancla, texto, bloques propios, ejemplo, conceptos, puente a Criterio, fuentes
//   {{@paradas slug="habitabilidad" parte="fuentes"}}       → /x/fuentes  todas las referencias
//   {{@paradas slug="habitabilidad" parte="indice"}}        → datos para el resultado del índice (qué parada marca cada dimensión)
// Lee content/mapa-<slug>.json. Qué parada marca cada dimensión del índice: content/indice.json › dimensiones[].parada.
// Título y descripción de cada página salen del contenido (ctx.pagina). Fotos: siempre .foto con velo, folio y título dentro;
// las paradas sin foto abren sobre papel (filete, folio / total, título). Pausa: sin texto.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { imagen } from './lib/imagen.mjs';
import { FORMAS, ICONO_COMPARTIR, foto, listaMapas } from './lib/comun.mjs';

const SITE = 'https://www.entrelampistas.com';
const json = o => JSON.stringify(o).replace(/</g, '\\u003c');
const recorta = (t, n) => (t.length <= n ? t : t.slice(0, t.lastIndexOf(' ', n - 1)) + '…');

// secciones del ensayo de Criterio («0N · Título»), para los puentes
function seccionesCriterio(ROOT) {
  const md = readFileSync(join(ROOT, 'content', 'ensayo-criterio.md'), 'utf8');
  const out = {};
  for (const m of md.matchAll(/^(0\d) · (.+)$/gm)) out[m[1]] = m[2].trim();
  return out;
}

export default function paradas(ctx, { ROOT, esc, render, partials }) {
  const slug = ctx.slug;
  const M = JSON.parse(readFileSync(join(ROOT, 'content', `mapa-${slug}.json`), 'utf8'));
  const IND = JSON.parse(readFileSync(join(ROOT, 'content', 'indice.json'), 'utf8'));
  const ruta = M.ruta || `/${slug}`;
  const P = M.paradas;
  const total = String(P.length).padStart(2, '0');
  const rutaParada = p => `${ruta}/${p.n}`;
  const forma = FORMAS[M.eje] || '';
  const todos = listaMapas(ROOT);
  const sig = todos.find(o => o.slug === (M.siguiente && M.siguiente.slug)) || todos.find(o => o.slug !== slug);
  const otros = todos.filter(o => o.slug !== slug);
  const marcaDe = {}; // parada → dimensión del índice que la marca
  for (const d of IND.dimensiones) if (d.parada) marcaDe[d.parada] = d;
  const pagina = ctx.pagina || {};

  const filaMapa = o => `<a class="fila fila--relacion fila--mapa" href="${esc(o.ruta)}">${FORMAS[o.eje] || ''}<span class="titulo-s-700">${esc(o.titulo)}</span><span class="fila__estado" data-lectura="fraccion" data-slug="${esc(o.slug)}" data-vacio=""></span></a>`;

  /* conceptos: chips que abren su ficha debajo, una a la vez (enshittification lleva además a su página) */
  let nFichas = 0;
  const conceptos = ids => {
    const cs = ids.map(id => ({ id, ...M.conceptos[id] })).filter(c => c.nombre);
    if (!cs.length) return '';
    const pre = `c${++nFichas}-`;
    return `<div class="conceptos">
      <h2 class="visually-hidden">conceptos</h2>
      <div class="chips">${cs.map(c => `<button type="button" class="chip chip--concepto" aria-expanded="false" aria-controls="${pre}${c.id}" data-term>${esc(c.nombre)}</button>`).join('')}</div>
      ${cs.map(c => `<div class="term-ficha" id="${pre}${c.id}" hidden>
        <div class="term-ficha__cab"><span class="term-ficha__nombre">${esc(c.nombre)}</span>${c.fuente ? `<span class="mono meta">${esc(c.fuente)}</span>` : ''}</div>
        <p class="term-ficha__def">${esc(c.definicion)}</p>${c.enlace ? `
        <a class="mono term-ficha__ir" href="${esc(c.enlace)}">ver en conceptos ›</a>` : ''}
      </div>`).join('\n      ')}
    </div>`;
  };

  const faqHtml = faq => !faq || !faq.length ? '' : `
  <section class="faq mapa-bloque" aria-labelledby="faq-titulo">
    <h2 class="mono meta" id="faq-titulo">Preguntas frecuentes</h2>
    <div class="faq__lista">
${faq.map((f, i) => `      <div class="faq__item">
        <h3 class="faq__q"><button type="button" class="faq__boton" aria-expanded="false" aria-controls="faq-${i + 1}" data-faq><span>${esc(f.q)}</span><span class="faq__marca" aria-hidden="true">+</span></button></h3>
        <div class="faq__a" id="faq-${i + 1}" hidden><p class="cuerpo secundario">${esc(f.a)}</p></div>
      </div>`).join('\n')}
    </div>
  </section>
<script type="application/ld+json">${json({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) })}</script>`;

  const tarjeta = (id, datos) => `<script type="application/json" id="${id}"${id === 'tarjeta-mapa' ? ' data-tarjeta' : ''}>${json(datos)}</script>`;

  /* ════════ datos para el resultado del índice ════════ */
  if (ctx.parte === 'indice') {
    const datos = { ruta, titulo: M.titulo, paradas: P.map(p => ({ n: p.n, nombre: p.nombre, titular: p.titular, ruta: rutaParada(p) })), marcas: Object.fromEntries(IND.dimensiones.filter(d => d.parada).map(d => [d.id, d.parada])) };
    return `<script type="application/json" id="datos-mapa-indice">${json(datos)}</script>`;
  }

  /* ════════ PANTALLA DE MAPA ════════ */
  if (ctx.parte === 'mapa') {
    pagina.title = `${M.titulo}, ${M.subtitulo.replace(/^¿(.)/, (_, c) => '¿' + c.toLowerCase())} · entrelampistas`;
    pagina.description = recorta(M.tesis, 158);
    const C = M.cero;
    const filaParada = p => {
      const marca = marcaDe[p.n];
      return `<li><a class="fila parada-fila" href="${esc(rutaParada(p))}" data-parada-fila="${p.n}">
          <span class="mono-num parada-fila__n">${p.n}</span>
          <span class="fila__cuerpo">
            <span class="parada-fila__titular">${esc(p.titular)}</span>
            <span class="parada-fila__dato">${esc(p.recorrido.dato)}</span>
            <span class="fila__meta">${esc(p.recorrido.meta)}</span>
            <span class="parada-fila__estado"><span class="fila__estado" data-estado-parada="${p.n}" hidden></span>${marca ? `<span class="fila__estado" data-marca-indice="${esc(marca.id)}" hidden>para ti · ${esc(marca.nombre.toLowerCase())}</span>` : ''}</span>
          </span>
          <span class="fila__flecha" aria-hidden="true">›</span>
        </a></li>`;
    };
    return `
<div class="mapa mapa--paradas" data-mapa-paradas data-slug="${esc(slug)}" data-eje="${esc(M.eje || '')}" data-total="${P.length}">
  <section class="mapa-portada" id="tema" aria-labelledby="tema-titulo">
    ${foto({ clase: 'foto--4x3', img: imagen(M.portada, { esc, attrs: ' loading="eager" fetchpriority="high"' }), titulo: esc(M.titulo), tituloId: 'tema-titulo', tituloTag: 'h1', sub: esc(M.subtitulo) })}
    <div class="mapa-portada__cuerpo mapa-tesis">
      <p class="mapa-tesis__entrada">${esc(M.tesis)}</p>
      <p class="cuerpo secundario">${esc(M.comoLeer)}</p>
      <p class="mono meta mapa-estado" data-mapa-estado hidden><span>tu lectura</span> <span class="fila__estado es-propio" data-lectura-paradas></span></p>
    </div>
  </section>

  <!-- parada 00 · el índice como puerta (opcional) -->
  <section class="cero sobre-tinta" id="parada-00" aria-labelledby="cero-titulo">
    <p class="mono-num cero__folio" aria-hidden="true">00</p>
    <h2 class="cero__titulo" id="cero-titulo">${esc(C.titular)}</h2>
    <div class="cero__sin" data-cero-sin>
      ${C.parrafos.map(p => `<p class="cero__texto">${esc(p)}</p>`).join('\n      ')}
      <div class="cero__botones">
        <a class="btn btn--acento btn--cta" href="/indice" data-desde="mapa">${esc(C.boton)}</a>
        <a class="btn btn--hueco btn--cta" href="${esc(rutaParada(P[0]))}" data-cta-leer>${esc(C.leer)}</a>
      </div>
    </div>
    <div class="cero__con" data-cero-con hidden>
      <p class="cero__indice"><span class="mono-num cero__num" data-cero-num></span><span class="mono meta">/ 100 · <span data-cero-fecha></span></span></p>
      <p class="cero__texto">${esc(C.hecho)}</p>
      <div class="cero__botones">
        <a class="btn btn--acento btn--cta" href="/indice#resultado">ver mi resultado</a>
        <a class="btn btn--hueco btn--cta" href="${esc(rutaParada(P[0]))}" data-cta-leer>${esc(C.leer)}</a>
      </div>
    </div>
  </section>

  <!-- recorrido · siete paradas en cuatro tramos -->
  <section class="mapa-bloque recorrido" id="recorrido" aria-labelledby="recorrido-titulo">
    <div class="recorrido__cab"><h2 class="recorrido__titulo" id="recorrido-titulo">El recorrido</h2><span class="mono meta" data-leidas>${P.length} paradas</span></div>
${M.tramos.map(t => `    <div class="tramo">
      <h3 class="mono meta tramo__nombre">${esc(t.nombre)}</h3>
      <ol class="lista tramo__lista">
        ${t.paradas.map(n => filaParada(P.find(p => p.n === n))).join('\n        ')}
      </ol>
    </div>`).join('\n')}
  </section>

  <section class="mapa-bloque" aria-labelledby="conceptos-mapa">
    <h2 class="mono meta" id="conceptos-mapa">conceptos del mapa</h2>
    ${conceptos(Object.keys(M.conceptos)).replace('<h2 class="visually-hidden">conceptos</h2>', '')}
  </section>
${faqHtml(M.faq)}
  <section class="mapa-cierre" aria-label="Seguir">
    ${sig ? `<div class="mapa-cierre__bloque siguiente-mapa">
      <h2 class="mono meta">siguiente mapa</h2>
      <p class="cuerpo">${esc(M.siguiente.texto)}</p>
      <div class="lista">${filaMapa(sig)}</div>
    </div>` : ''}${M.relacion && M.relacion.length ? `
    <div class="mapa-cierre__bloque">
      <h2 class="visually-hidden">se relaciona con</h2>
      <div class="lista">${M.relacion.map(r => `<a class="fila fila--relacion" href="${esc(r.enlace)}">${FORMAS[r.eje] || ''}<span class="cuerpo">${esc(r.nombre)}</span><span class="mono-fon meta">${esc(r.nota || '')}</span></a>`).join('')}</div>
    </div>` : ''}
    <div class="mapa-cierre__bloque">
      <h2 class="mono meta">otros mapas</h2>
      <div class="lista">${otros.filter(o => o !== sig).map(filaMapa).join('')}</div>
    </div>
    <a class="fila fila--pieza fuentes-fila" href="${ruta}/fuentes"><span class="fila__cuerpo"><span class="titulo-s-700">Todas las fuentes</span><span class="fila__meta">con país y fecha en cada parada · revisado en ${esc(M.revisado)}</span></span><span class="fila__flecha" aria-hidden="true">›</span></a>
  </section>
</div>
${tarjeta('tarjeta-mapa', { cab: M.titulo.toLowerCase(), cita: M.subtitulo, texto: `${M.titulo}: ${M.subtitulo}`, enlace: SITE + ruta, pie: `entrelampistas.com${ruta}`, archivo: (M.tarjeta && M.tarjeta.archivo) || `entrelampistas-${slug}` })}`;
  }

  /* ════════ FUENTES ════════ */
  if (ctx.parte === 'fuentes') {
    pagina.title = `Fuentes · ${M.titulo} · entrelampistas`;
    pagina.description = `Las fuentes del mapa ${M.titulo}, con país y fecha de cada dato. Revisado en ${M.revisado}.`;
    return `
<article class="fuentes-pagina" data-slug="${esc(slug)}">
  <header class="pieza-cab">
    <h1 class="display-m">Fuentes</h1>
    <p class="cuerpo secundario">Cada dato del mapa ${esc(M.titulo)} lleva su fuente, su país y su fecha. Revisado en ${esc(M.revisado)}. Los datos se revisan una vez al año, cuando sale el Digital News Report, y las leyes en trámite antes de cada actualización.</p>
  </header>
  <section class="mapa-bloque" aria-labelledby="refs-titulo">
    <h2 class="mono meta" id="refs-titulo">fuentes principales</h2>
    <ol class="lista refs">
      ${M.referencias.map(r => `<li class="ref"><a class="ref__nombre" href="${esc(r.url)}" rel="noopener" target="_blank">${esc(r.fuente)}<span class="visually-hidden"> (se abre en otra pestaña)</span></a><span class="ref__aporta">${esc(r.aporta)}</span><span class="fila__meta">${esc(r.pais)} · ${esc(r.fecha)} · parada ${esc(r.paradas)}</span></li>`).join('\n      ')}
    </ol>
  </section>
${P.map(p => `  <section class="mapa-bloque" aria-labelledby="fuentes-${p.n}">
    <h2 class="fuentes-pagina__parada" id="fuentes-${p.n}"><a href="${esc(rutaParada(p))}"><span class="mono-num">${p.n}</span> ${esc(p.nombre)}</a></h2>
    ${listaFuentes(p.fuentes, esc)}
  </section>`).join('\n')}
</article>`;
  }

  /* ════════ PARADA ════════ */
  const i = P.findIndex(p => p.n === ctx.n);
  if (i < 0) throw new Error(`{{@paradas}}: no existe la parada ${ctx.n} en mapa-${slug}.json`);
  const p = P[i];
  const ant = P[i - 1], prox = P[i + 1];
  const crit = seccionesCriterio(ROOT);
  pagina.title = `${p.n} ${p.nombre} · ${M.titulo} · entrelampistas`;
  pagina.description = recorta(`${p.titular} ${p.dato ? `${p.dato.pre ? p.dato.pre[0].toUpperCase() + p.dato.pre.slice(1) + ' ' : ''}${p.dato.cifra ? p.dato.cifra + ' ' : ''}${p.dato.texto}` : (p.entradilla || '')}`, 158);
  const folio = `${p.n} / ${total} · ${p.nombre}`;

  let cab;
  if (p.foto) {
    cab = foto({ clase: 'foto--natural parada-foto', img: imagen(p.foto, { esc, attrs: ' loading="eager" fetchpriority="high"' }), folio: esc(folio), titulo: esc(p.titular), tituloTag: 'h1', tituloId: 'parada-titulo' });
  } else {
    cab = `<header class="ensayo-apertura parada-apertura">
    <p class="mono-num ensayo-apertura__folio" aria-hidden="true"><span>${p.n}</span><span class="ensayo-apertura__total">/ ${total}</span></p>
    <p class="mono meta">${esc(p.nombre)}</p>
    <h1 class="ensayo-apertura__titulo" id="parada-titulo"><span class="visually-hidden">${p.n} · </span>${esc(p.titular)}</h1>
  </header>`;
  }

  let cuerpo = '';
  const D = p.dato;
  if (D) {
    cuerpo += `<section class="dato${D.cifra ? '' : ' dato--texto'}" aria-labelledby="dato-${p.n}">
      <h2 class="visually-hidden" id="dato-${p.n}">el dato</h2>${D.cifra ? `
      <p class="dato__cifra">${D.pre ? `<span class="mono dato__pre">${esc(D.pre)}</span>` : ''}<span class="dato__num">${esc(D.cifra)}</span></p>` : ''}
      <p class="dato__texto">${esc(D.texto)}</p>
      <p class="mono meta dato__meta"><span>${esc(D.fuente)}</span><span>${esc([D.pais, D.fecha].filter(Boolean).join(' · '))}</span></p>${D.url ? `
      <a class="mono dato__ver" href="${esc(D.url)}" rel="noopener" target="_blank">ver fuente <span aria-hidden="true">↗</span><span class="visually-hidden"> (se abre en otra pestaña)</span></a>` : ''}
    </section>\n`;
  }
  if (p.entradilla) cuerpo += `<p class="ensayo-entradilla">${esc(p.entradilla)}</p>\n`;
  (p.parrafos || []).forEach((t, k) => { cuerpo += `<p${k === 0 && !D ? ' class="ensayo-entradilla"' : ''}>${esc(t)}</p>\n`; });

  if (p.contexto) {
    cuerpo += `<div class="cifras cifras--contexto">${p.contexto.map(c => `<div class="cifra">${c.pre ? `<span class="mono meta cifra__pre">${esc(c.pre)}</span>` : ''}<span class="cifra__num">${esc(c.cifra)}</span><span class="cifra__frase">${esc(c.texto)}</span><span class="mono meta">${esc(c.pais)} · ${esc(c.fecha)}</span></div>`).join('')}</div>\n`;
  }

  /* 04 · criterios + quinta dimensión + índice */
  if (p.criterios) {
    cuerpo += `<ol class="ensayo-lista ensayo-lista--numerada criterios">${p.criterios.lista.map((c, k) => `<li><span class="mono-num ensayo-lista__num" aria-hidden="true">${String(k + 1).padStart(2, '0')}</span><div class="ensayo-lista__cuerpo"><p class="ensayo-lista__nombre">${esc(c.nombre)}</p><p>${esc(c.texto)}</p></div></li>`).join('')}</ol>\n`;
    if (p.criterios.quinta) cuerpo += `<p class="parada-quinta">${esc(p.criterios.quinta)}</p>\n`;
  }
  if (p.herramienta) {
    const H = p.herramienta;
    cuerpo += `<div class="parada-herramienta sobre-tinta"><p class="parada-herramienta__titulo">${esc(H.titulo)}</p><p>${esc(H.texto)}</p><a class="btn btn--acento btn--cta" href="${esc(H.enlace)}">${esc(H.boton)}</a></div>\n`;
  }

  /* 05 · señales */
  if (p.senales) {
    cuerpo += p.senales.map((s, k) => `<article class="senal" aria-labelledby="senal-${k + 1}">
      <p class="senal__cab mono meta"><span>señal ${k + 1}</span><span class="senal__estado">${esc(s.estado)}</span></p>
      <h2 class="senal__titulo" id="senal-${k + 1}">${esc(s.titulo)}</h2>${s.barras && !s.reparto ? `
      <div class="barras-dato">${s.barras.map(b => `<div class="barra-dato"><p class="barra-dato__nombre"><span>${esc(b.nombre)}</span><span class="mono-num">${esc(b.etiqueta)}</span></p><span class="barra-dato__pista" aria-hidden="true"><span class="barra-dato__relleno" style="width:${Math.round(b.valor / Math.max(...s.barras.map(x => x.valor)) * 100)}%"></span></span></div>`).join('')}</div>` : ''}${s.reparto ? `
      <div class="reparto" role="img" aria-label="${esc(s.barras.map(b => `${b.nombre}: ${b.etiqueta}`).join(' · '))}">${s.barras.map((b, j) => `<span class="reparto__parte${j ? ' reparto__parte--resto' : ''}" style="flex-basis:${b.valor}%">${esc(b.nombre)}</span>`).join('')}</div>` : ''}${s.cifras ? `
      <div class="cifras cifras--contexto">${s.cifras.map(c => `<div class="cifra"><span class="cifra__num">${esc(c.cifra)}</span><span class="cifra__frase">${esc(c.texto)}</span></div>`).join('')}</div>` : ''}${s.nota ? `
      <p class="senal__nota">${esc(s.nota)}</p>` : ''}
      <p>${esc(s.texto)}</p>${s.contrasenal ? `
      <div class="senal__contra"><p class="mono meta">contraseñal · 2026</p><p>${esc(s.contrasenal)}</p></div>` : ''}
      <p class="senal__significa"><b>Lo que significa para ti:</b> ${esc(s.significa)}</p>
      <p class="mono meta senal__fuente">${esc(s.fuente)}</p>
    </article>`).join('\n') + '\n';
    if (p.nota) cuerpo += `<p class="cuerpo secundario">${esc(p.nota)}</p>\n`;
  }

  /* 06 · la factura: lo que se ve → cómo te llega; la reacción */
  if (p.factura) {
    cuerpo += `<ol class="factura">${p.factura.map(f => `<li class="factura__item">
        <p class="mono meta">lo que se ve · ${esc(f.pais)}, ${esc(f.fecha)}</p>
        <p class="factura__cifra">${esc(f.cifra)}</p>
        <p class="factura__texto">${esc(f.texto)}</p>
        <div class="factura__llega"><p class="mono meta"><span aria-hidden="true">↓ </span>cómo te llega</p><p>${esc(f.llega)}</p></div>
      </li>`).join('')}</ol>\n`;
  }
  let tras = '';
  if (p.pausa) tras += imagen(p.pausa, { esc, clase: 'ensayo-pausa', attrs: ' loading="lazy" decoding="async"' });
  let cuerpo2 = '';
  if (p.reaccion) {
    const R = p.reaccion;
    cuerpo2 += `<section class="reaccion" aria-labelledby="reaccion-titulo">
      <h2 class="reaccion__titulo" id="reaccion-titulo">${esc(R.titulo)}</h2>
      <ol class="hitos">${R.hitos.map(h => `<li class="hito${h.estado ? ' hito--abierto' : ''}"><p class="mono meta hito__cuando">${esc(h.cuando)}</p><p>${esc(h.texto)}</p>${h.estado ? `<p class="mono hito__estado">${esc(h.estado)}</p>` : ''}</li>`).join('')}</ol>
      <p class="reaccion__cierre">${esc(R.cierre)}</p>
    </section>\n`;
  }

  /* 07 · exigencias, gesto y la única pregunta del mapa */
  if (p.exigencias) {
    cuerpo2 += `<p class="parada-lead">${esc(p.exigencias.lead)}</p>
    <ol class="ensayo-lista ensayo-lista--numerada exigencias">${p.exigencias.lista.map((c, k) => `<li><span class="mono-num ensayo-lista__num" aria-hidden="true">${String(k + 1).padStart(2, '0')}</span><div class="ensayo-lista__cuerpo"><p class="ensayo-lista__nombre">${esc(c.nombre)}</p><p>${esc(c.texto)}</p></div></li>`).join('')}</ol>\n`;
  }
  if (p.gesto) cuerpo2 += `<p class="parada-gesto"><b>Gesto práctico.</b> ${esc(p.gesto)}</p>\n`;
  if (p.ejemplo) cuerpo2 += `<aside class="parada-ejemplo" aria-label="Ejemplo"><p class="mono meta">lo reconocerás si…</p><p class="parada-ejemplo__texto">${esc(p.ejemplo)}</p></aside>\n`;
  if (p.conceptos) cuerpo2 += conceptos(p.conceptos) + '\n';

  let preguntaHtml = '';
  if (p.pregunta) {
    preguntaHtml = `<section class="parada-pregunta sobre-tinta" aria-labelledby="pregunta-mapa">
    <p class="parada-pregunta__cab" aria-hidden="true">${forma}</p>
    <h2 class="parada-pregunta__texto" id="pregunta-mapa"><span class="visually-hidden">La pregunta del mapa: </span>${esc(p.pregunta)}</h2>
    <button class="btn btn--hueco btn--cta" type="button" data-compartir="tarjeta-pregunta">${ICONO_COMPARTIR} compartir la pregunta</button>
  </section>
  ${tarjeta('tarjeta-pregunta', { cab: M.titulo.toLowerCase(), cita: p.pregunta, texto: p.pregunta, enlace: `${SITE}${rutaParada(p)}#pregunta-mapa`, pie: `entrelampistas.com${rutaParada(p)}`, archivo: `entrelampistas-${slug}-pregunta` })}`;
  }

  let puente = '';
  if (p.puente) {
    const sec = p.puente.seccion;
    puente = `<aside class="puente" aria-label="Sigue en Criterio informativo">
      <p class="mono meta">sigue en criterio informativo</p>
      <p class="puente__pregunta">${esc(p.puente.pregunta)}</p>
      <div class="lista"><a class="fila fila--pieza" href="/criterio/ensayo#seccion-${sec}" data-puente="${sec}"><span class="fila__cuerpo"><span class="fila__meta">criterio · ${sec}</span><span class="titulo-s-700">${esc(crit[sec] || '')}</span></span><span class="fila__flecha" aria-hidden="true">›</span></a></div>
    </aside>`;
  }
  const fuentes = `<details class="fuentes"><summary class="mono">fuentes (${p.fuentes.length})</summary>${listaFuentes(p.fuentes, esc)}</details>`;

  const nav = `<nav class="parada-nav" aria-label="Paradas" data-parada-fin>
    <a class="btn btn--hueco parada-nav__ant" href="${ant ? esc(rutaParada(ant)) : esc(ruta)}"><span aria-hidden="true">‹ </span>${ant ? `<span class="visually-hidden">parada anterior: </span>${ant.n}` : 'mapa'}</a>
    ${prox ? `<a class="btn btn--tinta parada-nav__sig" href="${esc(rutaParada(prox))}">siguiente · ${prox.n} ${esc(prox.nombre)} <span aria-hidden="true">›</span></a>`
      : sig ? `<a class="btn btn--tinta parada-nav__sig" href="${esc(sig.ruta)}">siguiente mapa · ${esc(sig.titulo)} <span aria-hidden="true">›</span></a>` : ''}
  </nav>`;

  // hoja «el recorrido» (icono ≡ de la cabecera): todas las paradas, leídas, «estás aquí», guardadas y fuentes
  const hoja = `<div class="hoja hoja--recorrido" id="hoja-recorrido" data-hoja-recorrido hidden>
  <div class="hoja__velo" data-cerrar-recorrido></div>
  <div class="hoja__panel" role="dialog" aria-modal="true" aria-labelledby="recorrido-hoja-titulo">
    <div class="hoja__cab"><span class="mono" id="recorrido-hoja-titulo">el recorrido</span><span class="mono meta" data-leidas-hoja style="margin-left:auto;margin-right:12px"></span><button type="button" class="icono-btn" data-cerrar-recorrido aria-label="cerrar"><svg viewBox="0 0 24 24" aria-hidden="true"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg></button></div>
    <div class="hoja__cuerpo">
      <ol class="lista">
        <li><a class="fila hoja-parada" href="${esc(ruta)}#parada-00"><span class="mono-num">00</span><span class="fila__cuerpo"><span class="titulo-s-700">Mide tu entorno</span></span><span class="fila__estado" data-estado-cero hidden></span></a></li>
${M.tramos.map(t => `        <li class="hoja-tramo mono meta" aria-hidden="true">${esc(t.nombre)}</li>
${t.paradas.map(n => { const q = P.find(x => x.n === n); return `        <li><a class="fila hoja-parada${q.n === p.n ? ' fila--actual' : ''}" href="${esc(rutaParada(q))}"${q.n === p.n ? ' aria-current="page"' : ''}><span class="mono-num">${q.n}</span><span class="fila__cuerpo"><span class="titulo-s-700">${esc(q.nombre)}</span></span><span class="fila__estado"${q.n === p.n ? '' : ` data-estado-parada="${q.n}" hidden`}>${q.n === p.n ? 'estás aquí' : ''}</span></a></li>`; }).join('\n')}`).join('\n')}
      </ol>
      <p class="mono meta" data-guardadas-hoja hidden></p>
      <a class="fila fila--pieza" href="${esc(ruta)}/fuentes"><span class="fila__cuerpo"><span class="titulo-s-700">Todas las fuentes</span></span><span class="fila__flecha" aria-hidden="true">›</span></a>
    </div>
  </div>
</div>`;

  return `
<article class="parada-p" data-parada-pagina data-slug="${esc(slug)}" data-n="${p.n}" data-total="${P.length}" data-eje="${esc(M.eje || '')}" aria-labelledby="parada-titulo">
  ${cab}
  <div class="ensayo-cuerpo parada-cuerpo">
    ${cuerpo.trim()}
  </div>
  ${tras}${cuerpo2 ? `
  <div class="ensayo-cuerpo parada-cuerpo parada-cuerpo--pie">
    ${cuerpo2.trim()}
  </div>` : ''}
  ${preguntaHtml}
  <div class="ensayo-cuerpo parada-cuerpo parada-cuerpo--pie">
    ${puente}
    ${fuentes}
  </div>
  ${nav}
</article>
${hoja}
${tarjeta('tarjeta-parada', { cab: M.titulo.toLowerCase(), cita: p.titular, texto: `${p.titular} · ${M.titulo}`, enlace: SITE + rutaParada(p), pie: `entrelampistas.com${rutaParada(p)}`, archivo: `entrelampistas-${slug}-${p.n}` })}`;
}

function listaFuentes(fs, esc) {
  return `<ol class="lista-fuentes">${fs.map(f => `<li>${f.url ? `<a href="${esc(f.url)}" rel="noopener" target="_blank">${esc(f.nombre)}<span class="visually-hidden"> (se abre en otra pestaña)</span></a>` : `<span>${esc(f.nombre)}</span>`}<span class="mono meta">${esc(f.pais)} · ${esc(f.fecha)}</span>${f.nota ? `<span class="meta">${esc(f.nota)}</span>` : ''}</li>`).join('')}</ol>`;
}
