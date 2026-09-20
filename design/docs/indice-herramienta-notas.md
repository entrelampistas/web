# Herramienta · Índice de habitabilidad digital
## Branding y UI sobre el código recibido (14 sept 2026)

Fuente: `practica.v3` (HTML de una sola página, todo local). El código es estructura y comportamiento; aquí se fija la capa de marca.

## Renombrado (a validar)
La metáfora "espejo / umbral" se sustituye por el oficio de mantenimiento, que es la marca.

| En el código | Nombre visible | Qué es |
|---|---|---|
| El espejo y el umbral (portada) | Índice de habitabilidad digital | La herramienta completa |
| El espejo | La inspección | 10 preguntas · 5 dimensiones · 3 min · índice 0–100 |
| Mi índice (resultado) | El parte | Resultado con lecturas por dimensión |
| El umbral (cruce) | El aviso de obra | Pantalla de paso, única con movimiento |
| Nombrar el suelo (i) | Los cimientos | 3–5 valores |
| Pesar lo que cargo (ii) | El inventario | Tecnologías opcionales / necesarias + condición |
| Fijar el comienzo (iii) | La fecha | Hoy · mañana · lunes · invitación |
| Los treinta días | El mantenimiento | 30 cartas, cuaderno, marcar el día |
| La revisión (iv) | La revisión | Dos preguntas por tecnología |
| Mi constitución (v) | El acta | Documento final, imagen 1080×1920, imprimir |

Botones: "Mirarme en el espejo" → "Empezar la inspección" · "Cruzar al umbral" → "Empezar el mantenimiento" · "Cruzar" → "Empezar" · "Todavía no" se mantiene.

## Tokens de marca para `:root` y `drawCard`
- `--papel` #F3F2EF · `--papel-2` #E9E8E4 · `--tinta` #111111 · `--tinta-2` #3A3A3A · `--tinta-3` #6B6B6B · `--linea` #1A1A1A (hairline 1px)
- `--acento` #2EBD5E (acción y estado habitable)
- Estados del índice: habitable = relleno verde · precaria = trama diagonal ink · capturada = relleno ink (sin ámbar ni rojo, decisión cerrada §2)
- `--instrumento` Archivo · `--cartas` Archivo (una sola familia; la lectura se diferencia por tamaño 19/1.5 y color tinta-2). Space Mono para meta, números y estados.
- `--r` 0 (sin radios) · sin sombras · sin degradados · botones 44px

## Feed
`Card/Tool/cover`: foto `assets/indice-farola.jpeg` 4:5 dentro del margen, título y subtítulo en tinta sobre la zona lisa del muro, fila inferior: Comenzar (verde) + compartir. Comenzar abre P13 Presentación.

## Pantallas
- P13 Presentación (nueva): qué incluye, tres partes, cinco dimensiones, privacidad, "Empezar la inspección" / "Continuar donde lo dejé".
- P11 La inspección y P12 El mantenimiento: ya especificadas en `espejo-y-umbral.md`; solo cambian nombres y tokens.
