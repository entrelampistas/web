# Guía de Instalación — Skill "Entrelampistas Visual System"

## ¿Qué estás instalando?

Un paquete de 7 archivos que enseñan a Claude tu sistema visual completo:
paleta, tipografía, lenguaje de diagramas, componentes de página, anti-patterns,
y las specs exactas de los diagramas de "Habitabilidad digital".

```
entrelampistas-visual-system/
├── SKILL.md                              ← Punto de entrada (lo lee primero)
├── references/
│   ├── tokens.md                         ← Paleta, tipografía, espaciados
│   ├── diagram-language.md               ← Guía profunda de diagramas SVG
│   ├── anti-patterns.md                  ← Lo que NUNCA hacer
│   ├── components.md                     ← Componentes de página (CSS)
│   └── ensayos/
│       └── habitabilidad-digital.md      ← Specs de los 3 diagramas
└── templates/
    └── svg-template.svg                  ← Plantilla SVG base
```

---

## RUTA A: Instalación en Claude Code (terminal/CLI)

Esta es la ruta recomendada si trabajas con Claude Code desde la terminal.

### Paso 1 — Elegir el nivel de instalación

Tienes dos opciones:

**Opción 1: Skill de PROYECTO (recomendada para equipos)**
Se instala dentro del repositorio del proyecto. Todos los que clonen el repo
tendrán el skill. Se commitea a git.

```bash
# Desde la raíz de tu proyecto
mkdir -p .claude/skills
```

**Opción 2: Skill PERSONAL (disponible en todos tus proyectos)**
Se instala en tu directorio home. Solo tú lo tienes.

```bash
mkdir -p ~/.claude/skills
```

### Paso 2 — Copiar la carpeta del skill

**Si elegiste proyecto:**
```bash
cp -r entrelampistas-visual-system .claude/skills/
```

**Si elegiste personal:**
```bash
cp -r entrelampistas-visual-system ~/.claude/skills/
```

### Paso 3 — Verificar la estructura

```bash
# Para proyecto:
find .claude/skills/entrelampistas-visual-system -type f

# Para personal:
find ~/.claude/skills/entrelampistas-visual-system -type f
```

Debes ver estos 7 archivos:
```
.claude/skills/entrelampistas-visual-system/SKILL.md
.claude/skills/entrelampistas-visual-system/references/tokens.md
.claude/skills/entrelampistas-visual-system/references/diagram-language.md
.claude/skills/entrelampistas-visual-system/references/anti-patterns.md
.claude/skills/entrelampistas-visual-system/references/components.md
.claude/skills/entrelampistas-visual-system/references/ensayos/habitabilidad-digital.md
.claude/skills/entrelampistas-visual-system/templates/svg-template.svg
```

### Paso 4 — Probar que funciona

Abre Claude Code en tu proyecto y escribe:

```
/entrelampistas-visual-system
```

Si el slash command aparece, el skill está correctamente instalado.

También puedes probarlo de forma más natural:

```
Crea el diagrama "Entorno construido" del ensayo Habitabilidad digital.
Usa el skill entrelampistas-visual-system.
```

Claude Code debería:
1. Leer el SKILL.md
2. Ir a references/ensayos/habitabilidad-digital.md para las specs
3. Consultar references/tokens.md para la paleta
4. Generar el SVG siguiendo todas las reglas

### Paso 5 — Commitear (solo para skill de proyecto)

```bash
git add .claude/skills/entrelampistas-visual-system/
git commit -m "feat: add entrelampistas visual system skill"
```

A partir de ahora, cualquier miembro del equipo que clone el repo tendrá
el skill disponible automáticamente.

---

## RUTA B: Instalación en claude.ai (interfaz web)

Si trabajas con Claude en la web (claude.ai), la instalación es vía ZIP.

### Requisitos previos

1. Plan Pro, Max, Team o Enterprise (los skills no están en el plan free).
2. Code execution habilitado:
   - Ve a **Settings → Capabilities**
   - Activa **Code execution and file creation**

### Paso 1 — Crear el ZIP

El ZIP debe contener la CARPETA como raíz (no los archivos sueltos).

**En Mac/Linux:**
```bash
cd /ruta/donde/tienes/los/archivos
zip -r entrelampistas-visual-system.zip entrelampistas-visual-system/
```

**En Windows:**
- Click derecho sobre la carpeta `entrelampistas-visual-system`
- "Enviar a" → "Carpeta comprimida (ZIP)"

IMPORTANTE: Al abrir el ZIP, lo primero que debes ver es la carpeta
`entrelampistas-visual-system/`, NO los archivos sueltos. Si ves
`SKILL.md` directamente al abrir el ZIP, el ZIP está mal creado.

### Paso 2 — Subir a claude.ai

1. Abre claude.ai
2. Ve a **Customize → Skills** (en el menú lateral o configuración)
3. Haz clic en **Upload Skill** (o "Subir skill")
4. Selecciona el archivo `entrelampistas-visual-system.zip`
5. Espera a que se procese
6. Verifica que aparece "entrelampistas-visual-system" en tu lista de skills
7. Asegúrate de que el toggle está **activado** (ON)

### Paso 3 — Probar

En una conversación nueva, escribe:

```
Crea el diagrama "Entorno construido" del ensayo Habitabilidad digital,
usando mi skill de sistema visual de Entrelampistas.
```

Claude debería activar el skill automáticamente por la descripción.
Si no se activa, puedes ser más explícito:

```
Usa el skill entrelampistas-visual-system para crear el primer diagrama
del ensayo Habitabilidad digital.
```

---

## RUTA C: Instalación manual (copiar y pegar)

Si ninguna de las rutas anteriores te funciona, puedes crear los archivos
manualmente. Es más tedioso pero funciona igual.

### En Claude Code:

```bash
# 1. Crear la estructura de carpetas
mkdir -p .claude/skills/entrelampistas-visual-system/references/ensayos
mkdir -p .claude/skills/entrelampistas-visual-system/templates

# 2. Crear cada archivo
# Abre cada archivo con tu editor y pega el contenido:

# Archivo principal:
nano .claude/skills/entrelampistas-visual-system/SKILL.md
# → Pegar contenido de SKILL.md

nano .claude/skills/entrelampistas-visual-system/references/tokens.md
# → Pegar contenido de tokens.md

nano .claude/skills/entrelampistas-visual-system/references/diagram-language.md
# → Pegar contenido de diagram-language.md

nano .claude/skills/entrelampistas-visual-system/references/anti-patterns.md
# → Pegar contenido de anti-patterns.md

nano .claude/skills/entrelampistas-visual-system/references/components.md
# → Pegar contenido de components.md

nano .claude/skills/entrelampistas-visual-system/references/ensayos/habitabilidad-digital.md
# → Pegar contenido de habitabilidad-digital.md

nano .claude/skills/entrelampistas-visual-system/templates/svg-template.svg
# → Pegar contenido de svg-template.svg
```

---

## Cómo verificar que el skill se activa correctamente

### Test 1: Activación automática
Escribe algo que debería activar el skill y comprueba que Claude lo usa:

```
Necesito un diagrama SVG que explique cómo funciona la economía de la atención,
con el estilo visual de Entrelampistas.
```

Si Claude menciona tokens como #3D5A80, #B87333, nodos con halos, DM Sans,
viewBox 680 — el skill se activó.

### Test 2: Activación por slash command (solo Claude Code)

```
/entrelampistas-visual-system
```

### Test 3: Verificar disponibilidad (Claude Code)

```
¿Qué skills tienes disponibles?
```

El skill debería aparecer en la lista.

### Test 4: Pedir un diagrama del ensayo

```
Implementa el diagrama "Atención profunda vs. capturada" del ensayo
Habitabilidad digital. SVG inline, siguiendo todas las specs del skill.
```

Claude debería:
- Usar viewBox="0 0 680 320"
- Crear dos paneles separados por una línea vertical en #DDDDD8
- Panel izquierdo en azul (#3D5A80) con línea curva fluida
- Panel derecho en cobre (#B87333) con interrupciones crecientes
- Nodos con halos
- Texto en DM Sans, sentence case
- Sin gradientes, sin sombras, sin blur

---

## Troubleshooting

### "El skill no se activa automáticamente"
La descripción del skill está diseñada para ser "pushy" (agresiva en el
triggering), pero si Claude no lo usa:
- Sé explícito: "Usa el skill entrelampistas-visual-system"
- Usa el slash command: `/entrelampistas-visual-system`
- Verifica que el skill está activado (toggle ON en Customize → Skills)

### "Claude no encuentra los archivos de references/"
Verifica que la estructura de carpetas es exacta. El error más común
es que `references/` esté fuera de la carpeta del skill o que falte
el subdirectorio `ensayos/`.

### "El ZIP no se sube correctamente en claude.ai"
El ZIP debe tener la carpeta como raíz. Si al descomprimir ves
`SKILL.md` directamente (sin la carpeta padre), el ZIP está mal.
Recrea: `zip -r entrelampistas-visual-system.zip entrelampistas-visual-system/`

### "Los diagramas no siguen el estilo"
Si Claude genera diagramas que no respetan la paleta o el lenguaje visual,
en tu prompt añade:
```
IMPORTANTE: Lee references/anti-patterns.md antes de generar el SVG.
Verifica el checklist de calidad del SKILL.md antes de entregar.
```

### "Tengo demasiados skills y este no carga"
Claude Code tiene un presupuesto de caracteres para skills (2% del context
window). Si tienes muchos skills, los de menor prioridad se excluyen.
Ejecuta `/context` en Claude Code para ver si hay warnings de skills excluidos.

---

## Mantenimiento del skill

### Añadir un nuevo ensayo
Crea un archivo en `references/ensayos/nombre-del-ensayo.md` siguiendo
el formato de `habitabilidad-digital.md`. El SKILL.md ya instruye a Claude
a buscar en esa carpeta.

### Añadir un anti-pattern
Cuando Claude genere algo incorrecto, abre `references/anti-patterns.md`
y añade el error con un ejemplo de lo que hizo mal y lo correcto.
Con el tiempo, el skill se autoafina.

### Añadir un componente de página
Edita `references/components.md` y añade el nuevo componente con su CSS
y las reglas de uso.

### Actualizar tokens
Si la paleta o tipografía cambia, edita `references/tokens.md`.
Todo el sistema se actualiza automáticamente porque los otros archivos
referencian los tokens por nombre.
