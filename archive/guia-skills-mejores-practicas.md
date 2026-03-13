# Como hacer skills que funcionen de verdad

Guia basada en documentacion oficial de Anthropic, investigacion de la comunidad (dic 2025 - mar 2026), y lo que hemos aprendido en este proyecto.

---

## Por que tus skills no dan el resultado que esperas

La investigacion de la comunidad revela datos concretos:

- Un skill con descripcion basica se activa el 20% de las veces
- Con descripcion optimizada sube al 50%
- Con ejemplos concretos llega al 90%

Ademas, el blog de HumanLayer descubrio algo clave: el system prompt de Claude Code ya tiene ~50 instrucciones internas. Tu CLAUDE.md se suma a eso. Si metes demasiado, Claude empieza a ignorar cosas. La solucion no es mas instrucciones — es mejores instrucciones, mas cortas, con ejemplos.

---

## LAS 5 REGLAS DE ORO

### 1. Un ejemplo concreto vale mas que 100 palabras de explicacion

Esto es lo mas importante de todo. No le digas a Claude "usa ease-out con 200ms". Muestrale:

```css
/* PATRON: Hover de boton */
button {
  transition: background-color 120ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
button:active {
  transform: scale(0.98);
}
```

Claude es un in-context learner. Si tu codebase ya tiene patrones, Claude los copia. Si tu skill tiene ejemplos, Claude los replica. Si tu skill solo tiene filosofia, Claude la interpreta libremente (y mal).

### 2. Nunca mandes a un LLM a hacer el trabajo de un linter

Las reglas de estilo de codigo (indentacion, formato, nomenclatura) NO van en skills ni en CLAUDE.md. Van en linters y formatters (ESLint, Prettier). Son mas rapidos, mas baratos, y 100% deterministas. Usa hooks para ejecutarlos automaticamente despues de cada edit.

### 3. CLAUDE.md debe ser corto (maximo 150 lineas)

Si tu CLAUDE.md tiene 300 lineas, Claude ignora la mitad. La regla:
- Solo incluye lo que aplica a TODAS las sesiones
- Para conocimiento especifico, usa skills (se cargan bajo demanda)
- Para cada linea, preguntate: "Si quito esto, Claude comete errores?" Si no, eliminala.

### 4. Skills = conocimiento bajo demanda, no manual permanente

La diferencia clave:
- CLAUDE.md: se carga SIEMPRE, en cada sesion. Mantenlo minimo.
- Skills: se cargan solo cuando son relevantes. Aqui va el detalle.
- Scripts en skills: ejecutan trabajo determinista. Aqui va lo que debe ser exacto.

Estructura ideal:
```
.claude/
  skills/
    frontend-craft/
      SKILL.md          ← Instrucciones (< 500 lineas)
      references/
        tokens.css       ← Claude lo lee cuando necesita los valores exactos
        components.css   ← Claude lo copia cuando genera componentes
    editorial-voice/
      SKILL.md          ← Instrucciones de voz
      references/
        examples.md      ← Ejemplos reales de textos buenos
    design-system/
      SKILL.md          ← Tokens, paleta, tipografia
```

### 5. Hooks para lo que DEBE pasar siempre

Los hooks son scripts que se ejecutan automaticamente en momentos especificos. A diferencia de instrucciones en CLAUDE.md (que son "sugerencias"), los hooks son deterministicos.

Ejemplos utiles:
- Despues de cada edit: ejecutar el linter
- Despues de cada edit de CSS: verificar que no hay colores hex sueltos fuera de variables
- Despues de crear un archivo: verificar que usa las importaciones correctas

---

## ANATOMIA DE UN SKILL QUE FUNCIONA

### La descripcion es lo mas importante

La descripcion es lo que Claude usa para decidir si activa el skill. Si es vaga, no lo activa.

```yaml
# MAL (20% de activacion):
description: Frontend development guidelines

# MEJOR (50% de activacion):
description: Craft frontend con CSS moderno para plataformas editoriales. Usa cuando generes o modifiques HTML, CSS o JS.

# OPTIMO (90% de activacion):
description: Craft frontend con CSS moderno para plataformas editoriales. Usa cuando generes o modifiques HTML, CSS o JS, incluyendo hover states, transiciones, animaciones, focus states, responsive design, o accesibilidad. Tambien usa cuando el usuario mencione "craft", "polish", "hover", "transicion", "animacion", o "accesibilidad".
```

### La estructura ideal

```markdown
---
name: frontend-craft
description: [descripcion optimizada con triggers]
---

# Titulo corto

## Que hace este skill
Una oracion.

## Patrones (EJEMPLOS DE CODIGO)
[Aqui van los ejemplos concretos que Claude va a copiar]

## Cuando necesites mas detalle
Lee references/tokens.css para valores exactos de variables.
Lee references/components.css para patrones de componentes completos.

## Errores comunes
[Lista corta de lo que NO hacer, con la alternativa correcta]
```

### Lo que NO poner en un skill

- Filosofia o teoria sin ejemplos de codigo
- Explicaciones de por que algo es como es
- Listas largas de principios abstractos
- Historia o contexto que no cambia el output
- Instrucciones que aplican a todas las sesiones (esas van en CLAUDE.md)

---

## COMO APLICAR ESTO A CADA TIPO DE SKILL

### Skill de Frontend

```
Lo que NO funciona: "Usa ease-out para entradas"
Lo que SI funciona: Un archivo references/components.css con el ease-out ya escrito
```

El skill apunta a los archivos de referencia. Claude los lee y copia los patrones. No interpreta — replica.

### Skill de Escritura/Editorial

```
Lo que NO funciona: "Escribe con tono sereno y cotidiano"
Lo que SI funciona: 5 ejemplos de parrafos reales de Entrelampistas + 3 transformaciones de antes/despues
```

Los LLMs aprenden del ejemplo, no de la instruccion. Si le das 5 parrafos que suenan como Entrelampistas, el parrafo 6 sonara parecido. Si le das 5 paginas de reglas de tono, generara algo generico.

### Skill de SEO

```
Lo que NO funciona: "Optimiza para buscadores"
Lo que SI funciona: Un template de meta tags, una estructura de headings, y 3 ejemplos de titles/descriptions que funcionan
```

### Skill de Marketing Digital

```
Lo que NO funciona: "Crea contenido que conecte con la audiencia"
Lo que SI funciona: 5 posts reales que funcionaron, con metricas, y la estructura desglosada
```

### Patron universal

Para cualquier skill:
1. Pon el 70% del peso en EJEMPLOS CONCRETOS
2. Pon el 20% en REGLAS CORTAS con alternativas ("no hagas X, haz Y")
3. Pon el 10% en CONTEXTO (solo lo minimo necesario)

---

## COMO ESTRUCTURAR TU PROYECTO PARA 3 PROYECTOS

Cuando pases de Entrelampistas a la app de futbol y LinkedIn v2, la estructura es:

```
~/.claude/
  skills/                        ← Skills GLOBALES (aplican a todos los proyectos)
    frontend-craft/SKILL.md      ← Principios de craft universales
    editorial-voice/SKILL.md     ← Si escribes en todos los proyectos

entrelampistas/
  CLAUDE.md                      ← Corto. Solo lo especifico de este proyecto.
  .claude/
    skills/                      ← Skills LOCALES (solo este proyecto)
      design-system/SKILL.md     ← Paleta Klein, Neo Grotesque, etc.
      entrelampistas-voice/SKILL.md ← Voz especifica de Entrelampistas

futbol-app/
  CLAUDE.md
  .claude/
    skills/
      design-system/SKILL.md     ← Otra paleta, otra tipografia
      futbol-patterns/SKILL.md   ← Patrones de UI de la app

linkedin-v2/
  CLAUDE.md
  .claude/
    skills/
      design-system/SKILL.md
      linkedin-patterns/SKILL.md
```

Los skills globales (en ~/.claude/skills/) se comparten entre proyectos.
Los skills locales (en proyecto/.claude/skills/) son especificos de cada uno.

---

## SOBRE EL DASHBOARD

Leva es una libreria de GUI para React/Three.js — paneles de controles interactivos. No es un dashboard de proyecto, pero la IDEA de un panel de control visual para tus proyectos es buena.

Lo que describes — visitas, usuarios, likes, estado de tareas, progreso de proyectos — no es algo que Leva resuelva. Lo que necesitas es un dashboard custom que agregue datos de:

- Analiticas web (visitas, usuarios): Vercel Analytics, Plausible, o similar
- Estado de tareas: GitHub Issues, o un sistema propio
- Progreso de proyectos: commits, deploys, estado de cada pagina

Esto se puede construir como un proyecto propio — una app React con paneles que muestren datos de tus 3 proyectos. Pero es un cuarto proyecto en si mismo, y ahora tu prioridad es publicar Entrelampistas.

Mi recomendacion: primero publica Entrelampistas. Cuando este en produccion y tengas datos reales (visitas, suscriptores), entonces tiene sentido construir un dashboard que los muestre. Ahora no hay datos que visualizar.

Si quieres empezar simple: Vercel Analytics (gratis, se integra al deploy) te da visitas, usuarios, paises. Es suficiente para empezar sin construir nada custom.

---

## PROXIMOS PASOS CONCRETOS

### Ahora mismo (esta sesion)

1. Te creo el tokens.css y components.css con el craft ya aplicado
2. Te creo los 6 componentes semilla HTML
3. Te creo el CLAUDE.md optimizado (< 80 lineas)
4. Reestructuro el skill de frontend para que tenga ejemplos, no filosofia

### Esta semana

5. Mueves los archivos a tu proyecto
6. Pruebas con Claude Code y me dices que funciono y que no
7. Iteramos el CLAUDE.md basandonos en lo que Claude hizo mal

### Semana siguiente

8. Aplicas lo mismo al skill editorial (mas ejemplos reales, menos reglas)
9. Empiezas el primer ensayo digital

Quieres que empiece con el paso 1?
