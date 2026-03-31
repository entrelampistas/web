# Rediseño: Página /archivo como hub de descubrimiento editorial

## El problema actual

La página de archivo es una lista plana: los 3 ensayos apilados con sus iconos clipart + los 7 conceptos como links en una línea + un CTA de newsletter. No hay jerarquía, no hay orden, no hay formato, no hay experiencia de descubrimiento.

Para un proyecto editorial con la calidad de Entrelampistas, el archivo es una página crítica: es donde alguien va cuando piensa "¿qué más tiene este sitio?" Si esa página es una lista aburrida, la respuesta es "no mucho." Si es un espacio bien diseñado, la respuesta es "esto es un ecosistema."

## Lo que tiene que ser

El archivo no es una lista. Es un mapa de todo lo que Entrelampistas ha publicado, organizado para que alguien nuevo entienda el proyecto en 30 segundos y alguien que vuelve encuentre lo que busca en 5.

## Estructura nueva (HTML completo con inline styles)

Reemplazar TODO el contenido de la página /archivo con esto:

```html
<!-- ARCHIVO — Entrelampistas -->
<main style="max-width: 720px; margin: 0 auto; padding: 48px 32px 96px;">

  <!-- Título y intro -->
  <h1 style="font-family: 'Newsreader', Georgia, serif; font-size: clamp(32px, 5vw, 44px); font-weight: 400; color: #1A1A18; line-height: 1.15; margin: 0 0 16px 0; letter-spacing: -0.01em;">
    Archivo
  </h1>
  <p style="font-family: 'Newsreader', Georgia, serif; font-size: 17px; line-height: 1.7; color: #4A4A46; margin: 0 0 48px 0; max-width: 560px;">
    Todo lo que hemos publicado. Ensayos de largo formato sobre los sistemas invisibles que condicionan cómo vivimos, pensamos y decidimos. Cada ensayo se puede leer en tres niveles de profundidad.
  </p>

  <!-- ═══════════════════════════════════════ -->
  <!-- SECCIÓN: ENSAYOS -->
  <!-- ═══════════════════════════════════════ -->

  <div style="font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: #8A8A85; display: flex; align-items: center; gap: 10px; margin-bottom: 24px;">
    <span style="display: inline-block; width: 20px; height: 2px; background: #B87333;"></span>
    Ensayos
  </div>

  <!-- Ensayo 03: Economía (más reciente primero) -->
  <a href="/economia-contemporanea/capas" style="display: flex; flex-direction: row; align-items: flex-start; gap: 24px; padding: 28px 0; border-top: 1px solid #DDDDD8; text-decoration: none; cursor: pointer; transition: opacity 0.2s;">
    <span style="font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; color: #8A8A85; min-width: 24px; flex-shrink: 0; padding-top: 4px;">03</span>
    <div style="flex: 1; min-width: 0;">
      <div style="font-family: 'DM Sans', sans-serif; font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; color: #3D5A80; margin-bottom: 6px; font-weight: 500;">Sistemas invisibles</div>
      <h2 style="font-family: 'Newsreader', Georgia, serif; font-size: 22px; font-weight: 400; color: #1A1A18; line-height: 1.3; margin: 0 0 8px 0; letter-spacing: -0.01em;">Economía de lo cotidiano</h2>
      <p style="font-family: 'Newsreader', Georgia, serif; font-size: 15px; line-height: 1.55; color: #4A4A46; margin: 0 0 10px 0;">La economía no es un destino. Es un entorno construido por decisiones que alguien tomó. Por qué los números dicen que va bien y tu vida dice otra cosa.</p>
      <div style="font-family: 'DM Sans', sans-serif; font-size: 12px; color: #8A8A85; display: flex; gap: 8px; align-items: center;">
        <span>14 min</span>
        <span style="width: 3px; height: 3px; border-radius: 50%; background: #DDDDD8;"></span>
        <span>2025</span>
        <span style="width: 3px; height: 3px; border-radius: 50%; background: #DDDDD8;"></span>
        <span>Tesis · Mapa · Ensayo</span>
      </div>
    </div>
    <span style="font-size: 16px; color: #DDDDD8; flex-shrink: 0; padding-top: 4px; transition: color 0.2s;">→</span>
  </a>

  <!-- Ensayo 02: Sesgos -->
  <a href="/mapa-de-tu-mente/capas" style="display: flex; flex-direction: row; align-items: flex-start; gap: 24px; padding: 28px 0; border-top: 1px solid #DDDDD8; text-decoration: none; cursor: pointer; transition: opacity 0.2s;">
    <span style="font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; color: #8A8A85; min-width: 24px; flex-shrink: 0; padding-top: 4px;">02</span>
    <div style="flex: 1; min-width: 0;">
      <div style="font-family: 'DM Sans', sans-serif; font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; color: #3D5A80; margin-bottom: 6px; font-weight: 500;">Entrenamiento cognitivo</div>
      <h2 style="font-family: 'Newsreader', Georgia, serif; font-size: 22px; font-weight: 400; color: #1A1A18; line-height: 1.3; margin: 0 0 8px 0; letter-spacing: -0.01em;">El mapa de nuestras decisiones</h2>
      <p style="font-family: 'Newsreader', Georgia, serif; font-size: 15px; line-height: 1.55; color: #4A4A46; margin: 0 0 10px 0;">Cómo funciona la mente cuando decide, juzga y reacciona. Los atajos, los sesgos y los mapas invisibles que configuran lo que llamamos pensamiento.</p>
      <div style="font-family: 'DM Sans', sans-serif; font-size: 12px; color: #8A8A85; display: flex; gap: 8px; align-items: center;">
        <span>12 min</span>
        <span style="width: 3px; height: 3px; border-radius: 50%; background: #DDDDD8;"></span>
        <span>2025</span>
        <span style="width: 3px; height: 3px; border-radius: 50%; background: #DDDDD8;"></span>
        <span>Tesis · Mapa · Ensayo</span>
      </div>
    </div>
    <span style="font-size: 16px; color: #DDDDD8; flex-shrink: 0; padding-top: 4px; transition: color 0.2s;">→</span>
  </a>

  <!-- Ensayo 01: Habitabilidad -->
  <a href="/habitabilidad-digital/capas" style="display: flex; flex-direction: row; align-items: flex-start; gap: 24px; padding: 28px 0; border-top: 1px solid #DDDDD8; border-bottom: 1px solid #DDDDD8; text-decoration: none; cursor: pointer; transition: opacity 0.2s;">
    <span style="font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; color: #8A8A85; min-width: 24px; flex-shrink: 0; padding-top: 4px;">01</span>
    <div style="flex: 1; min-width: 0;">
      <div style="font-family: 'DM Sans', sans-serif; font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; color: #3D5A80; margin-bottom: 6px; font-weight: 500;">Relación con la tecnología</div>
      <h2 style="font-family: 'Newsreader', Georgia, serif; font-size: 22px; font-weight: 400; color: #1A1A18; line-height: 1.3; margin: 0 0 8px 0; letter-spacing: -0.01em;">Habitabilidad digital</h2>
      <p style="font-family: 'Newsreader', Georgia, serif; font-size: 15px; line-height: 1.55; color: #4A4A46; margin: 0 0 10px 0;">A más de tres décadas de la web, ¿qué tipo de lugar queremos que sea internet para la vida humana? Internet dejó de ser herramienta. Hoy es el clima donde vivimos.</p>
      <div style="font-family: 'DM Sans', sans-serif; font-size: 12px; color: #8A8A85; display: flex; gap: 8px; align-items: center;">
        <span>10 min</span>
        <span style="width: 3px; height: 3px; border-radius: 50%; background: #DDDDD8;"></span>
        <span>2025</span>
        <span style="width: 3px; height: 3px; border-radius: 50%; background: #DDDDD8;"></span>
        <span>Tesis · Mapa · Ensayo</span>
      </div>
    </div>
    <span style="font-size: 16px; color: #DDDDD8; flex-shrink: 0; padding-top: 4px; transition: color 0.2s;">→</span>
  </a>

  <!-- ═══════════════════════════════════════ -->
  <!-- SECCIÓN: CONCEPTOS CLAVE -->
  <!-- ═══════════════════════════════════════ -->

  <div style="font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: #8A8A85; display: flex; align-items: center; gap: 10px; margin-top: 64px; margin-bottom: 16px;">
    <span style="display: inline-block; width: 20px; height: 2px; background: #B87333;"></span>
    Conceptos clave
  </div>

  <p style="font-family: 'Newsreader', Georgia, serif; font-size: 15px; line-height: 1.6; color: #4A4A46; margin: 0 0 24px 0;">
    Términos que usamos para pensar con más precisión. Cada concepto tiene su propia página con definición, analogía y conexiones.
  </p>

  <!-- Concepto: Habitabilidad digital -->
  <a href="/conceptos/habitabilidad-digital" style="display: flex; align-items: baseline; gap: 16px; padding: 14px 0; border-top: 1px solid #DDDDD8; text-decoration: none; transition: opacity 0.2s;">
    <span style="font-family: 'Newsreader', Georgia, serif; font-size: 16px; color: #1A1A18; font-weight: 400; min-width: 200px;">Habitabilidad digital</span>
    <span style="font-family: 'Newsreader', Georgia, serif; font-size: 14px; color: #8A8A85; flex: 1;">La capacidad de un entorno tecnológico de sostener vida humana con dignidad y sentido.</span>
    <span style="font-size: 12px; color: #DDDDD8;">→</span>
  </a>

  <!-- Concepto: Autonomía cognitiva -->
  <a href="/conceptos/autonomia-cognitiva" style="display: flex; align-items: baseline; gap: 16px; padding: 14px 0; border-top: 1px solid #DDDDD8; text-decoration: none; transition: opacity 0.2s;">
    <span style="font-family: 'Newsreader', Georgia, serif; font-size: 16px; color: #1A1A18; font-weight: 400; min-width: 200px;">Autonomía cognitiva</span>
    <span style="font-family: 'Newsreader', Georgia, serif; font-size: 14px; color: #8A8A85; flex: 1;">Pensar, decidir y actuar sin que el diseño de las plataformas dirija tu conducta.</span>
    <span style="font-size: 12px; color: #DDDDD8;">→</span>
  </a>

  <!-- Concepto: Enshittification -->
  <a href="/conceptos/enshittification" style="display: flex; align-items: baseline; gap: 16px; padding: 14px 0; border-top: 1px solid #DDDDD8; text-decoration: none; transition: opacity 0.2s;">
    <span style="font-family: 'Newsreader', Georgia, serif; font-size: 16px; color: #1A1A18; font-weight: 400; min-width: 200px;">Enshittification</span>
    <span style="font-family: 'Newsreader', Georgia, serif; font-size: 14px; color: #8A8A85; flex: 1;">Degradación progresiva de plataformas. Concepto de Cory Doctorow.</span>
    <span style="font-size: 12px; color: #DDDDD8;">→</span>
  </a>

  <!-- Concepto: Economía de la atención -->
  <a href="/conceptos/economia-de-la-atencion" style="display: flex; align-items: baseline; gap: 16px; padding: 14px 0; border-top: 1px solid #DDDDD8; text-decoration: none; transition: opacity 0.2s;">
    <span style="font-family: 'Newsreader', Georgia, serif; font-size: 16px; color: #1A1A18; font-weight: 400; min-width: 200px;">Economía de la atención</span>
    <span style="font-family: 'Newsreader', Georgia, serif; font-size: 14px; color: #8A8A85; flex: 1;">Plataformas que compiten por tu tiempo mental. La atención como moneda.</span>
    <span style="font-size: 12px; color: #DDDDD8;">→</span>
  </a>

  <!-- Concepto: Sistema 1 y Sistema 2 -->
  <a href="/conceptos/sistema-1-sistema-2" style="display: flex; align-items: baseline; gap: 16px; padding: 14px 0; border-top: 1px solid #DDDDD8; text-decoration: none; transition: opacity 0.2s;">
    <span style="font-family: 'Newsreader', Georgia, serif; font-size: 16px; color: #1A1A18; font-weight: 400; min-width: 200px;">Sistema 1 y Sistema 2</span>
    <span style="font-family: 'Newsreader', Georgia, serif; font-size: 14px; color: #8A8A85; flex: 1;">Los dos modos de pensar de Kahneman: rápido/automático y lento/deliberado.</span>
    <span style="font-size: 12px; color: #DDDDD8;">→</span>
  </a>

  <!-- Concepto: Pensamiento de mantenimiento -->
  <a href="/conceptos/pensamiento-de-mantenimiento" style="display: flex; align-items: baseline; gap: 16px; padding: 14px 0; border-top: 1px solid #DDDDD8; text-decoration: none; transition: opacity 0.2s;">
    <span style="font-family: 'Newsreader', Georgia, serif; font-size: 16px; color: #1A1A18; font-weight: 400; min-width: 200px;">Pensamiento de mantenimiento</span>
    <span style="font-family: 'Newsreader', Georgia, serif; font-size: 14px; color: #8A8A85; flex: 1;">Revisar periódicamente los supuestos que usamos para decidir y convivir.</span>
    <span style="font-size: 12px; color: #DDDDD8;">→</span>
  </a>

  <!-- Concepto: Ruido económico -->
  <a href="/conceptos/ruido-economico" style="display: flex; align-items: baseline; gap: 16px; padding: 14px 0; border-top: 1px solid #DDDDD8; border-bottom: 1px solid #DDDDD8; text-decoration: none; transition: opacity 0.2s;">
    <span style="font-family: 'Newsreader', Georgia, serif; font-size: 16px; color: #1A1A18; font-weight: 400; min-width: 200px;">Ruido económico</span>
    <span style="font-family: 'Newsreader', Georgia, serif; font-size: 14px; color: #8A8A85; flex: 1;">Datos sin jerarquía ni contexto que crean falsa sensación de estar informado.</span>
    <span style="font-size: 12px; color: #DDDDD8;">→</span>
  </a>

  <!-- ═══════════════════════════════════════ -->
  <!-- SECCIÓN: CATEGORÍAS -->
  <!-- ═══════════════════════════════════════ -->

  <div style="font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: #8A8A85; display: flex; align-items: center; gap: 10px; margin-top: 64px; margin-bottom: 16px;">
    <span style="display: inline-block; width: 20px; height: 2px; background: #B87333;"></span>
    Territorios
  </div>

  <p style="font-family: 'Newsreader', Georgia, serif; font-size: 15px; line-height: 1.6; color: #4A4A46; margin: 0 0 24px 0;">
    Las cinco áreas que Entrelampistas explora. Cada ensayo vive en al menos una.
  </p>

  <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 64px;">
    <span style="font-family: 'DM Sans', sans-serif; font-size: 13px; padding: 8px 16px; border: 1px solid #DDDDD8; border-radius: 100px; color: #4A4A46;">Interpretación del entorno</span>
    <span style="font-family: 'DM Sans', sans-serif; font-size: 13px; padding: 8px 16px; border: 1px solid #DDDDD8; border-radius: 100px; color: #4A4A46;">Entrenamiento cognitivo</span>
    <span style="font-family: 'DM Sans', sans-serif; font-size: 13px; padding: 8px 16px; border: 1px solid #DDDDD8; border-radius: 100px; color: #4A4A46;">Relación con la tecnología</span>
    <span style="font-family: 'DM Sans', sans-serif; font-size: 13px; padding: 8px 16px; border: 1px solid #DDDDD8; border-radius: 100px; color: #4A4A46;">Filosofía de lo cotidiano</span>
    <span style="font-family: 'DM Sans', sans-serif; font-size: 13px; padding: 8px 16px; border: 1px solid #DDDDD8; border-radius: 100px; color: #4A4A46;">Sistemas invisibles</span>
  </div>

  <!-- ═══════════════════════════════════════ -->
  <!-- NEWSLETTER CTA -->
  <!-- ═══════════════════════════════════════ -->

  <div style="font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: #8A8A85; display: flex; align-items: center; gap: 10px; margin-bottom: 16px;">
    <span style="display: inline-block; width: 20px; height: 2px; background: #B87333;"></span>
    Newsletter
  </div>

  <p style="font-family: 'Newsreader', Georgia, serif; font-size: 18px; color: #1A1A18; margin: 0 0 8px 0;">
    Pensamiento de mantenimiento en tu correo.
  </p>
  <p style="font-family: 'Newsreader', Georgia, serif; font-size: 15px; color: #8A8A85; margin: 0 0 24px 0;">
    Para quienes prefieren pensar despacio.
  </p>

  <!-- Aquí va el formulario de suscripción existente (mantener el que ya hay) -->

</main>
```

## Qué hace este diseño

1. **Tres secciones claras** con labels editoriales (línea de cobre + texto uppercase): Ensayos, Conceptos clave, Territorios. Cada sección tiene un rol distinto.

2. **Los ensayos tienen jerarquía:** número, categoría en azul accent, título en Newsreader, descripción, metadata con tiempo de lectura + año + las tres capas disponibles ("Tesis · Mapa · Ensayo"). El más reciente va primero. Sin iconos clipart.

3. **Los conceptos son una lista editorial limpia:** nombre a la izquierda (Newsreader 16px, peso visual), definición corta a la derecha (Newsreader 14px, gris), flecha discreta. Cada uno es un link a su micro-página.

4. **Los territorios son pills/tags** que muestran las 5 categorías. No son links por ahora — son contexto que dice "esto es lo que exploramos."

5. **Newsletter cierra** con el copy confirmado.

## Instrucciones para Claude Code

1. Abrir el archivo de /archivo (archivo.html o /archivo/index.html)
2. Buscar el contenido principal (entre el header y el footer)
3. REEMPLAZAR todo el contenido entre header y footer con el HTML de arriba
4. Mantener el header y footer existentes (no tocarlos)
5. Mantener el formulario de newsletter existente (copiarlo dentro del nuevo bloque de newsletter)
6. Verificar que las URLs de los ensayos son correctas (actualmente apuntan a /capas)

## Lo que se elimina

- Los iconos SVG/clipart de los ensayos
- La lista plana de conceptos como links sueltos
- El texto "Recibe pensamiento estructural cada mes" (reemplazado por el copy correcto)
- Cualquier bloque de categorías duplicado

## Verificación

- [ ] Los 3 ensayos aparecen con número, categoría, título, descripción y metadata
- [ ] El más reciente (Economía) aparece primero
- [ ] Los 7 conceptos aparecen como lista editorial con definición corta
- [ ] Las 5 categorías aparecen como pills
- [ ] No hay iconos decorativos
- [ ] El layout es horizontal (número | contenido | flecha) para ensayos
- [ ] Los conceptos son clickables y llevan a /conceptos/[slug]
- [ ] El newsletter tiene el copy correcto
- [ ] Funciona en móvil (375px) — los conceptos pasan a una sola columna
