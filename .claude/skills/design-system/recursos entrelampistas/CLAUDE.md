# CLAUDE.md — Entre Lampistas
> Lee este archivo completo antes de generar cualquier contenido, código o decisión de diseño para este proyecto.

---

## Qué es Entre Lampistas

Entre Lampistas es un proyecto cultural editorial digital nacido como respuesta activa y optimista a un entorno cambiante e incierto. No es un medio de noticias, no es un blog de productividad, no es una app de bienestar. Es una **compañía para pensar** — un espacio donde el pensamiento es una forma de cuidado.

Diseñamos herramientas, contenidos y experiencias para entrenar una forma de pensar activa, contextual y cotidiana. Creemos que pensar bien no es un privilegio intelectual sino una mejora real de la calidad de vida.

**En una frase:** Entre Lampistas ayuda a personas a vivir con más claridad e intención en un mundo acelerado y saturado de estímulos.

---

## El nombre

"entrelampistas" viene del oficio de quienes cuidan, arreglan y mantienen los espacios donde vivimos. Trabajo silencioso pero vital que hacemos entre todos para cuidar nuestra forma de vivir, pensar y convivir.

Pronunciación: [ɛtɹɐ·lam'pistas]
Categoría gramatical: sustantivo colectivo, adj. ocasional, verbo.

El nombre no es metafórico — es programático. Este proyecto hace exactamente eso: mantenimiento silencioso pero vital del pensamiento compartido.

---

## A quién le habla

**Perfil principal:** Mujeres de 25 a 45 años, principalmente en Madrid y Barcelona (aunque también Ciudad de México y Latinoamérica hispanohablante). Con estudios superiores. Leen — literatura, ensayo, no solo contenido digital. Saben distinguir contenido de valor del ruido. Tienen gusto por la filosofía práctica, la psicología aplicada, la sociología cotidiana.

**Cómo piensan:** Sienten que van por la vida reaccionando más que eligiendo. Quieren parar, mirar mejor, decidir con más intención. No buscan soluciones rápidas ni motivación vacía. Buscan herramientas reales para pensar.

**A quién NO le habla:** Al que busca productividad como fin en sí mismo. Al que quiere hacks y atajos. Al que consume contenido para sentirse inteligente sin cambiar nada. Al optimizador obsesivo. Al que ya tiene todas las respuestas.

---

## Proyectos actuales

1. **El mapa de nuestras decisiones** — Curso/ensayo digital sobre decisiones, sesgos cognitivos, pensamiento automático e identidad. 7 capítulos, 23 lecciones. Se está rediseñando como ensayo digital con alta atención a la experiencia de usuario.

2. **Habitabilidad digital** — Ensayo digital sobre nuestra relación con internet a 25 años de su masificación. ¿Dónde estamos? Reúne artículos publicados anteriormente, re-editados como pieza unitaria.

3. **Landing page de Entre Lampistas** — Presentación del proyecto y sus productos.

4. **Aplicación** — En desarrollo futuro, que integre los ensayos y contenidos con experiencia nativa.

5. **Membresía mensual** — Modelo de negocio futuro basado en contenido continuo.

---

## Referencias que definen el nivel

Estos proyectos son los que queremos que evoquen Entre Lampistas. Estúdialos antes de proponer algo:

- **Vizzuality** (vizzuality.com/work) — nivel de detalle en la experiencia de usuario de ensayos digitales interactivos
- **DiEM25 / Yanis Varoufakis** — pensamiento político-filosófico accesible, con posición clara
- **The School of Life** — filosofía práctica, cotidiana, sin condescendencia
- **Farm Street** — editorial con carácter y punto de vista propio
- **Novara Media** — voz independiente, pensamiento crítico sin academicismo
- **Futuro Imposible** — reflexión sobre tecnología y cultura en español

---

## Archivos de referencia

| Archivo | Contenido |
|---|---|
| `brand/voice.md` | Voz, tono, ejemplos de escritura buena y mala |
| `brand/visual.md` | Estética, las tres fuentes visuales (Ware, isométrico, Barcelona), referencias, lo que NO somos |
| `brand/visual-components.md` | Componentes UI e ilustración derivados de las referencias — leer antes de diseñar cualquier elemento |
| `brand/tokens.css` | Variables de color, tipografía y espaciado |
| `brand/editorial.md` | Tipos de piezas, estructura de contenidos, formatos |
| `content/vocabulary.md` | Palabras que usamos, palabras que no usamos |
| `content/tone-examples.md` | Fragmentos reales como referencia de escritura |
| `docs/architecture.md` | Decisiones técnicas y convenciones de código |
| `components/index.md` | Componentes disponibles y cuándo usarlos |

---

## Reglas absolutas para Claude Code

**Siempre:**
- Español de España. Tuteo. Sin latinismos salvo que el contexto sea explícitamente latinoamericano.
- Leer `brand/voice.md` antes de generar cualquier texto o copy.
- Usar tokens de `brand/tokens.css` para colores, tipografías y espaciado. Nunca valores hardcoded.
- Consultar `components/index.md` antes de crear cualquier componente nuevo.
- Priorizar la experiencia de lectura sobre la estética decorativa.
- El detalle en UX es parte de la identidad de marca — no es opcional.

**Nunca:**
- Generar copy motivacional vacío, frases de autoayuda o tono coach.
- Usar tipografías, colores o estilos fuera del sistema definido.
- Crear componentes duplicados sin revisar los existentes.
- Simplificar el mensaje para hacerlo más "popular" — la profundidad es el valor.
- Usar metáforas de productividad o rendimiento (optimizar, escalar, hackear la mente...).
- Diseñar para impresionar — diseñar para que el pensamiento fluya.
