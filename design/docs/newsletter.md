# Newsletter · Buttondown

Los textos viven en `content/newsletter/` (una línea `asunto: …`, una línea `---` y el cuerpo en markdown) y se pegan tal cual en Buttondown. La web enseña cómo se leen en `/correo` (página `noindex`, fuera del sitemap).

| Archivo | Cuándo llega | Dónde se pega en Buttondown |
|---|---|---|
| `confirmacion.md` | justo después de apuntarse en la web | Settings › Subscribing › Confirmation (el cuerpo tiene que llevar `{{ confirmation_url }}` como enlace; ya lo lleva) |
| `bienvenida.md` | al pulsar «Confirmar mi correo» | Settings › Subscribing › Welcome (activar el interruptor «Welcome email») |
| `entrega-01.md` | cuando la autora la envíe | Emails › New email (modo markdown) |

## Cómo funciona el alta

1. La persona escribe su correo en la web → `POST /api/subscribe` → Buttondown crea el suscriptor **sin confirmar** (`unactivated`), con la etiqueta `web` y la página de origen en `metadata.origen`.
2. Buttondown manda el correo de confirmación. La web enseña «casi está · revisa tu correo y confirma».
3. Al confirmar, Buttondown manda la bienvenida y la persona ya recibe las entregas.
4. Si el correo ya estaba, la web responde igual que a un alta nueva: no revela quién está suscrito.

La confirmación es el comportamiento por defecto de la API de Buttondown; `api/subscribe.js` ya no envía `type: "regular"`, que la saltaba. Es lo que pide el RGPD para una lista en la UE y mejora la entrega (menos rebotes y denuncias de spam).

## Configuración (una vez)

1. **Vercel** › Settings › Environment Variables, en *Production* y también en *Preview* para poder probar en la preview:
   - `NEWSLETTER_PROVIDER` = `buttondown`
   - `BUTTONDOWN_API_KEY` = la clave de Buttondown › Settings › API
   Después, volver a desplegar. Comprobación: abrir `/api/subscribe` en el navegador debe responder `{"proveedor":"buttondown","listo":true,"faltan":[]}`. No enseña la clave.
2. **Buttondown › Settings › Basics**: nombre del newsletter «entrelampistas», nombre del remitente «entrelampistas», y un **reply-to que alguien lea** (◆ p. ej. hola@entrelampistas.com): la bienvenida y la entrega dicen «responde a este correo, lo leemos».
3. **Dominio de envío propio** (Settings › Sending domain): añadir en el DNS de entrelampistas.com los registros que da Buttondown (SPF/DKIM). Sin esto los correos salen desde un dominio de Buttondown y es más fácil que caigan en spam.
4. Pegar confirmación y bienvenida (tabla de arriba). Enviarse una prueba apuntándose desde la preview con un correo propio.

## Entregas

- Cada entrega es un archivo nuevo `content/newsletter/entrega-NN.md` con el mismo formato; aparece solo en `/correo`.
- Los enlaces llevan `utm_source=newsletter&utm_medium=email&utm_campaign=entrega-NN`: PostHog registra qué entrega trae cada lectura (en la pantalla de mapa, el ensayo o el índice).
- Antes de enviar: «Send test» a una misma, abrirlo en el móvil, comprobar enlaces.
- La tasa de confirmación y de apertura se mira en Buttondown; lo que pasa después del clic, en PostHog (embudo 3 de `design/docs/analitica.md`).

## ◆ Pendiente de la autora

- Validar los tres textos: son propuesta. Verbatim de textos ya aprobados: la definición de entrelampistas, «lo que pensamos necesita trabajo…» (Pensamiento de mantenimiento), la primera frase de cada mapa y la línea del índice. Texto nuevo: saludo y cierre de confirmación y bienvenida, la escena de la farola, «No hace falta contestarla ahora…» y el cierre de la entrega.
- Cadencia de envío: los textos no la prometen («te escribiremos cuando haya algo nuevo que pensar»). Si se fija una, se puede decir en la bienvenida.
- Dirección de reply-to.
