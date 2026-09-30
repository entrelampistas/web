# Newsletter · Buttondown

Encargo de diseño de los correos de alta (textos, qué es entrelampistas, dirección de arte y marca): `design/docs/newsletter-diseno.md`.

Los textos viven en `content/newsletter/` (una línea `asunto: …`, una línea `---` y el cuerpo en markdown) y se pegan tal cual en Buttondown. La web enseña cómo se leen en `/correo` (página `noindex`, fuera del sitemap).

| Archivo | Cuándo llega | Dónde se pega en Buttondown |
|---|---|---|
| `bienvenida.md` | justo después de apuntarse en la web (confirma el alta y da la bienvenida) | Settings › Subscribing › Welcome (activar el interruptor «Welcome email») |
| `entrega-01.md` | cuando la autora la envíe | Emails › New email (modo markdown) |

## Cómo funciona el alta

Desde el 29-09-2026, **sin paso de confirmación** (decisión de la autora; sustituye al doble opt-in del 26-09):

1. La persona escribe su correo en la web → `POST /api/subscribe` → Buttondown crea el suscriptor **ya activo** (`type: "regular"`), con la etiqueta `web` y la página de origen en `metadata.origen`.
2. La web enseña «gracias · te avisamos cuando haya pieza nueva» (copy del brief §4).
3. Buttondown manda enseguida un solo correo, la bienvenida, que hace de confirmación del alta. Desde ese momento recibe las entregas.
4. Si el correo ya estaba, la web responde igual que a un alta nueva: no revela quién está suscrito.

Lo que se asume al quitar la confirmación: entran direcciones mal escritas o de otra persona (más rebotes y alguna denuncia de spam, que afecta a la entrega). Para compensarlo, la bienvenida dice «Si no te apuntaste tú, date de baja con el enlace de abajo…», y conviene revisar en Buttondown de vez en cuando los rebotes y darlos de baja. El formulario ya pide consentimiento explícito (la persona escribe su correo y pulsa «suscribirme»), que es lo que exige el RGPD.

◆ **Comprobar al configurar**: que Buttondown mande la bienvenida también a las altas que llegan por API como `regular`. Si con el interruptor «Welcome email» no llega, crear en Buttondown › Automations una automatización «cuando alguien se suscribe → enviar correo» con el texto de `bienvenida.md`.

## Configuración (una vez)

1. **Vercel** › Settings › Environment Variables, en *Production* y también en *Preview* para poder probar en la preview:
   - `NEWSLETTER_PROVIDER` = `buttondown`
   - `BUTTONDOWN_API_KEY` = la clave de Buttondown › Settings › API
   Después, volver a desplegar. Comprobación: abrir `/api/subscribe` en el navegador debe responder `{"proveedor":"buttondown","listo":true,"faltan":[]}`. No enseña la clave.
2. **Buttondown › Settings › Basics**: nombre del newsletter «entrelampistas», nombre del remitente «entrelampistas», y un **reply-to que alguien lea** (◆ p. ej. hola@entrelampistas.com): la bienvenida y la entrega dicen «responde a este correo, lo leemos».
3. **Dominio de envío propio** (Settings › Sending domain): añadir en el DNS de entrelampistas.com los registros que da Buttondown (SPF/DKIM). Sin esto los correos salen desde un dominio de Buttondown y es más fácil que caigan en spam.
4. **Settings › Subscribing**: desactivar «Require confirmation» / doble opt-in si está activo (la API ya lo salta, pero así tampoco lo piden los formularios propios de Buttondown) y pegar la bienvenida (tabla de arriba). Enviarse una prueba apuntándose desde la preview con un correo propio: tiene que llegar la bienvenida y el suscriptor aparecer activo, con la etiqueta `web`.

## Si el alta falla («no pudimos guardarlo»)

1. Abrir `/api/subscribe` en el navegador (preview o producción). Responde sin enseñar la clave:
   - `"proveedor": null` · `"entorno": "preview"` → faltan las variables en ese entorno de Vercel (suelen estar solo en *Production*). Añadirlas en *Preview* y volver a desplegar.
   - `"faltan": ["BUTTONDOWN_API_KEY"]` → falta la clave.
   - `"clave": "buttondown 401 …"` → la clave no es válida (copiada mal o revocada): generar otra en Buttondown › Settings › API.
   - `"clave": "buttondown 403 …"` → la clave no tiene permiso o el plan de Buttondown no incluye API.
   - `"listo": true` → configuración correcta.
2. Fuera de producción, el formulario enseña debajo del error el motivo corto (p. ej. `503 · sin NEWSLETTER_PROVIDER en preview` o `502 · buttondown 400 subscriber_blocked`). En entrelampistas.com solo se ve el mensaje de siempre.
3. Los detalles completos quedan en los logs de la función en Vercel (Deployments › Functions › `api/subscribe`).

## Entregas

- Cada entrega es un archivo nuevo `content/newsletter/entrega-NN.md` con el mismo formato; aparece solo en `/correo`.
- Los enlaces llevan `utm_source=newsletter&utm_medium=email&utm_campaign=entrega-NN`: PostHog registra qué entrega trae cada lectura (en la pantalla de mapa, el ensayo o el índice).
- Antes de enviar: «Send test» a una misma, abrirlo en el móvil, comprobar enlaces.
- La tasa de apertura se mira en Buttondown; lo que pasa después del clic, en PostHog (embudo 3 de `design/docs/analitica.md`).

## ◆ Pendiente de la autora

- Validar los textos: son propuesta. Verbatim de textos ya aprobados: la definición de entrelampistas (desde el 29-09 la del feed, tal cual, en la bienvenida), «lo que pensamos necesita trabajo…» (Pensamiento de mantenimiento), la primera frase de cada mapa y la línea del índice. Texto nuevo: saludo, «Ya estás en la lista de entrelampistas», el cierre y la línea de baja de la bienvenida, la línea de «tres mapas» de la bienvenida, los textos de previsualización, la escena de la farola, «No hace falta contestarla ahora…» y el cierre de la entrega.
- Cadencia de envío: los textos no la prometen («te escribiremos cuando haya algo nuevo que pensar»). Si se fija una, se puede decir en la bienvenida.
- Dirección de reply-to.
