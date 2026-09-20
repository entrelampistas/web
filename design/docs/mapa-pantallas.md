# Mapa de pantallas · fase 1 móvil

Ruta → archivo de mock → pantallas (data-screen-label) → enlaces salientes. Todo el copy visible sale de los mocks (verbatim); el ensayo largo de `content/ensayo-habitabilidad-final.md`.

## Rutas

| Ruta | Mock | Pantallas | Sale a |
|---|---|---|---|
| `/` inicio | Feed de inicio v4 | P1 Inicio móvil v4 (ignorar «P1 Inicio escritorio v4», fase 2) | /proyecto · /habitabilidad · /pensamiento-de-mantenimiento · /indice |
| `/mapas` | Mapas | M1 Mapa de temas · M2 Tema · M3 Concepto (M4–M6 escritorio: fase 2) | /habitabilidad · /pensamiento-de-mantenimiento · /indice · /conceptos/:slug |
| `/proyecto` | Entrelampistas proyecto final | P2 Sobre el proyecto final (la variante 2a es la vigente) | / · /habitabilidad · /pensamiento-de-mantenimiento |
| `/pensamiento-de-mantenimiento` | Pensamiento de mantenimiento | T Pensamiento de mantenimiento (variante 1a) | /proyecto · /habitabilidad · /indice |
| `/habitabilidad` | Habitabilidad recorrido final | T1 Tesis · T2 Mapa · T3 Preguntas abiertas · E1 Entrada · E2–E6 Secciones 01–05 · E7 Cierre. Ignorar I1–I6 (versión previa del índice; manda «Indice habitabilidad produccion») | /indice · /mapas · compartir |
| `/indice` | Indice habitabilidad produccion | P1 Portada · P2 Portada con índice anterior · Q1–Q10 · R1 Resultado · R2 Por dimensión · R3 Por dónde empezar (R3b variante estructura precaria) · R4 Por app y antes · S1 Compartir + componentes (avisos, estados de opción, botones) | /habitabilidad · compartir |

Bitácora: sin ruta. Pestaña visible al .35 con «pronto».

## Navegación
- Barra inferior (84) solo en `/` y `/mapas`. El resto son piezas con cabecera 56 y «‹» que vuelve a la pantalla anterior (history.back; si no hay historial, a `/`).
- Ensayo: una sola página con scroll; E1–E7 son cortes de esa página a 844px. Barra de progreso 2px acento bajo la cabecera = % leído. Cabecera derecha muestra «0N · 2 min» de la sección visible.
- Tesis y mapa (T1–T3) son la entrada del tema; desde T1 «leer» salta al ensayo, desde T2 cada parada salta a su sección (anchor).
- Term en ensayo (subrayado 1px): al tocar despliega la ficha bajo el párrafo; uno abierto a la vez. Solo «enshittification» en fase 1.
- Feed: tocar la foto del ensayo alterna la tesis dentro de la imagen (velo .8). «leer» abre /habitabilidad.
- Feed, tarjeta índice: la primera pregunta se responde ahí; la respuesta se guarda y /indice abre en Q2.

## Índice · comportamiento
- 5 dimensiones × 2 preguntas = 10 pantallas (Q1–Q10). Opciones 4 (a–d) + «No lo sé» = sin puntuar (se marca con asterisco en resultado).
- Puntuación: opción de arriba abajo 3 · 2 · 1 · 0. Dimensión = suma de sus dos preguntas (0–6). Estados: habitable ≥ 5 · precaria 3–4 · capturada ≤ 2.
- Índice = suma de las cuatro dimensiones con margen (atención, agencia, relación, valor) / 24 × 100. Estructura no entra en el número; se muestra aparte con línea discontinua.
- Dimensión de empezar = la más baja de las cuatro (empate: la primera en orden).
- Título: habitable si índice ≥ 75 y estructura no capturada · poco habitable si índice < 40, o ≥ 2 capturadas, o estructura capturada con índice < 60 · a medio habitar en el resto.
- App opcional por dimensión (Q2, Q4, Q6, Q8, Q10): texto libre, se guarda con el índice.
- Almacenamiento: localStorage, hasta 6 índices {fecha, índice, dimensiones, apps, empezar}. Sin cuenta, sin envío a servidor. P2 aparece si hay índice guardado. «×» en cabecera = «salir · se guarda lo respondido».
- Compartir (S1): hoja desde abajo con tarjeta 4:5 tinta → PNG 1080×1350 (canvas) + «copiar enlace». Nunca respuestas ni identidad. Avisos 2,2 s.
- Teclado: a–d eligen, ← → navegan, s salta.

## Correo
Un solo componente (brief §4 Correo). Endpoint a definir por el equipo (POST email). Estados: enviando / éxito / error, ver brief.

## Estados globales
- Vacío, skeleton, aviso, guardado: brief §4 Estados.
- `prefers-reduced-motion`: sin transiciones salvo opacity.
- Sin overflow horizontal a 375px.

## Fuera de alcance fase 1
Escritorio (≥1024) de todas las rutas · bitácora · buscador ⌘K · glosario completo (M3 se implementa solo para «enshittification») · referencias del ensayo.
