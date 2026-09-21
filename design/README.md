# Handoff: entrelampistas · iteración 2 móvil

## Qué es
Segunda iteración de la web editorial. Añade dos temas completos, **El mapa de nuestras decisiones** y **Criterio informativo**, y una pantalla nueva común a los tres temas: **T0 Tema**, la puerta desde el feed y desde Mapas. Móvil 390 de referencia, fluido de 320 a 1023. Escritorio sigue aplazado.

## Qué cambia respecto a la fase 1
- **Flujo**: feed (card/cover) → **T0 Tema** → tesis (T1) · mapa (T2) · ensayo completo (E1…). Antes el feed abría la tesis. Aplica a Habitabilidad también (T0 nueva en su mock).
- **Feed**: dos tarjetas card/cover nuevas (Criterio, Decisiones); logo 44; sin lupa; pestañas todos · ensayos · herramientas. El bloque final «Esto es todo por ahora» se elimina.
- **Mapas**: M1 lista los cuatro temas; los dos nuevos enlazan a su T0.
- **Ensayo**: foto de la autora a todo lo ancho, proporción natural, sin recorte ni velo; folio 96 en crema sobre la foto. Solo la portada (E1) y T0 usan card/cover con velo. Dato del texto destacado como número grande sin alterar el párrafo. Términos con ficha subrayados (Criterio: zona gris, verificación, encuadre).
- **Sin garabatos** en los temas nuevos hasta recibir los definitivos.

## Sobre los archivos
Los `.dc.html` de `mocks/` son referencias de diseño en HTML, no código de producción. Recrear en `entrelampistas/web` con sus patrones (HTML estático + `styles/tokens.css`). Notas grises en Space Mono bajo cada pantalla son instrucciones, no UI. Abrir en navegador con `support.js` y `assets/` al lado.

## Fidelidad
Alta. Colores, tipografía, espaciado y textos son finales. Manda `docs/design-brief.md` v3 sobre el mock; donde el brief calle, manda el mock. El texto de la autora es verbatim: no editar, resumir ni recortar.

## Orden de lectura
1. `docs/design-brief.md` v3 (cabecera: cambios de iteración 2).
2. `docs/mapa-pantallas.md` §Iteración 2 (rutas, pantallas, enlaces).
3. `mocks/` — ocho archivos canónicos.
4. `content/` — texto íntegro de Habitabilidad. ◆ Los textos íntegros de Decisiones y Criterio están dentro de sus mocks (pantallas E); la autora entregará los `.md` fuente.

## Pantallas nuevas
- `Criterio recorrido`: C T0 · C T1 · C T2 · C T3 · C E1–E6 (cortes b/c = mismo scroll) · C E7 FAQ.
- `Mapa de nuestras decisiones recorrido A v2`: A T0 · A T1 · A T2 · A T3 · A E1–E6 · A E7 FAQ.
- `Habitabilidad recorrido final`: + T0 Tema.
- `Feed de inicio v4`: tarjetas Criterio y Decisiones.
- `Mapas`: M1 con cuatro temas.

## Interacciones nuevas
- T0: fila «ensayo» muestra estado de lectura `n / 5` en acento (dato de localStorage, como el % leído de fase 1).
- Mapa (T2): lista de 5 paradas; tocar una abre su ficha con las primeras líneas de la sección y «ir a la sección».
- Ensayo: número grande = mismo dato del párrafo, en Archivo 800; no es contenido adicional.
- Fichas de término: desplegable en línea, como en Habitabilidad. ◆ Texto de las tres fichas de Criterio pendiente.

## Assets
`mocks/assets/` (29). Fotos nuevas `dec-*.jpg` (serie botánica, Rodrig Moss/Unsplash: acreditar) y `cri-*.jpg` (copas de árbol, autora), 14 archivos, ≤1000px de ancho, JPEG q82. Alt y crédito por foto en `docs/fotos.md`. Copiar al repo tal cual.

## Pendientes ◆
- Resumen de la autora para T0 de Habitabilidad.
- Texto de fichas: zona gris, verificación, encuadre.
- Garabatos definitivos y dónde entran (hoy: ninguno en temas nuevos).
- `.md` fuente de Decisiones y Criterio para `content/`.
- Perfil/usuario: fuera de esta iteración.

## Entrega
Dos zips: `01-docs-y-mocks.zip` (docs, content, mocks/*.dc.html, support.js) y `02-assets.zip` (mocks/assets/, 29 archivos). Descomprimir ambos en la misma carpeta.

## Archivos
```
README.md
docs/design-brief.md · docs/mapa-pantallas.md · docs/fotos.md · docs/indice-herramienta-notas.md
content/ensayo-habitabilidad-final.md
mocks/*.dc.html (8) · mocks/support.js · mocks/assets/ (29)
```
