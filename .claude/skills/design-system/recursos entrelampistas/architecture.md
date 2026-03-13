# Arquitectura y convenciones técnicas — Entre Lampistas

## Principio técnico

Las decisiones técnicas sirven a la experiencia editorial. Si una elección técnica complica la experiencia de lectura o el flujo del contenido, es la decisión técnica la que se revisa, no el contenido.

---

## Stack por tipo de proyecto

### Ensayos digitales / Web editorial
- **Framework:** Next.js (App Router)
- **Estilos:** CSS Modules o Tailwind con tokens customizados desde `tokens.css`
- **CMS:** Por definir — priorizar headless CMS con buena experiencia de escritura (Sanity, Notion como fuente, o markdown puro)
- **Deploy:** Vercel
- **Animaciones:** Framer Motion para transiciones narrativas entre secciones

### Cursos
- **Plataforma actual:** Thinkific (entrelampistas.thinkific.com)
- **Dirección futura:** Migrar a experiencia propia como ensayo digital interactivo

### Aplicación
- **Por definir** — pendiente de definición de producto

---

## Convenciones de nomenclatura

**Archivos de componentes:** PascalCase — `ArticleLayout.jsx`, `ChapterNav.jsx`

**Archivos de estilos:** mismo nombre que el componente — `ArticleLayout.module.css`

**Páginas:** kebab-case — `mapa-de-decisiones.jsx`, `habitabilidad-digital.jsx`

**Variables CSS:** kebab-case con prefijo semántico — `--color-bg-primary`, `--text-md`, `--space-8`

**Imágenes:** kebab-case descriptivo — `cover-habitabilidad-digital.jpg`, no `IMG_3847.jpg`

---

## Estructura de carpetas estándar

```
proyecto/
├── CLAUDE.md                    ← referencia a /entrelampistas + específico del proyecto
├── public/
│   └── images/
├── src/
│   ├── components/              ← componentes del proyecto
│   │   └── [NombreComponente]/
│   │       ├── index.jsx
│   │       └── index.module.css
│   ├── pages/ o app/            ← según Next.js version
│   ├── styles/
│   │   ├── globals.css          ← importa tokens.css, reset, estilos base
│   │   └── typography.css       ← estilos de lectura larga
│   ├── lib/                     ← utilidades, helpers
│   └── content/                 ← markdown o datos de contenido si aplica
├── brand/ → ../entrelampistas/brand/  ← symlink o referencia
└── package.json
```

---

## Decisiones tomadas (no reabrir sin razón)

**CSS Variables sobre Tailwind puro:** Los tokens de Entre Lampistas tienen valores semánticos específicos que Tailwind no cubre directamente. Se usa Tailwind para utilidades de layout pero los valores de color, tipografía y espaciado vienen de `tokens.css`.

**Next.js sobre otros frameworks:** Necesidades de SSG para contenido editorial + SSR para partes dinámicas futuras.

**Sin animaciones decorativas:** Las transiciones y animaciones existen solo si sirven a la narrativa del ensayo. Nunca para hacer el sitio "más vivo".

---

## Performance como parte de la experiencia editorial

Un ensayo digital que carga lento rompe la experiencia de lectura. Criterios mínimos:

- Core Web Vitals en verde en producción
- Imágenes siempre optimizadas (next/image o equivalente)
- Fuentes con `font-display: swap` y preload de las fuentes principales
- Sin JS bloqueante en el critical path de lectura

---

## Accesibilidad

No es opcional. Entre Lampistas habla de calidad de vida — sería contradictorio publicar contenido inaccesible.

- Contraste mínimo WCAG AA en todos los textos
- Estructura semántica HTML correcta en todos los artículos
- Navegación por teclado funcional
- Alt text descriptivo en todas las imágenes con contenido
