# Fix: Header — textos que se juntan

## El problema

En el header/navegación, el texto "ENTRELAMPISTAS" se pega con "SOBRE". No hay espacio entre el logo y los items de navegación.

## La solución

Buscar el elemento del header/nav y añadir spacing entre el logo y los links de navegación.

### Opción A: si el header usa flexbox

Buscar el contenedor del header y asegurar que tiene:

```css
.header, .nav, [el selector que sea] {
  display: flex;
  align-items: center;
  justify-content: space-between; /* logo a la izquierda, nav a la derecha */
  gap: 16px;
}
```

El logo ("ENTRELAMPISTAS") debe estar en un elemento separado de los links de navegación. Si están todos en el mismo contenedor sin separación, envolver el logo en un `<div>` y los links en otro `<nav>`:

```html
<header style="display: flex; align-items: center; justify-content: space-between; padding: 16px 32px; width: 100%; max-width: 1200px; margin: 0 auto;">
  <a href="/" style="font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600; letter-spacing: 0.04em; color: white; text-decoration: none; white-space: nowrap;">
    <span style="margin-right: 8px;">L</span> ENTRELAMPISTAS
  </a>
  <nav style="display: flex; gap: 32px; align-items: center;">
    <a href="/sobre" style="font-family: 'DM Sans', sans-serif; font-size: 13px; color: rgba(255,255,255,0.7); text-decoration: none;">SOBRE</a>
    <a href="/archivo" style="font-family: 'DM Sans', sans-serif; font-size: 13px; color: rgba(255,255,255,0.7); text-decoration: none;">ARCHIVO</a>
    <a href="/glosario" style="font-family: 'DM Sans', sans-serif; font-size: 13px; color: rgba(255,255,255,0.7); text-decoration: none;">GLOSARIO</a>
    <a href="/conceptos" style="font-family: 'DM Sans', sans-serif; font-size: 13px; color: rgba(255,255,255,0.7); text-decoration: none;">CONCEPTOS</a>
    <a href="/newsletter" style="font-family: 'DM Sans', sans-serif; font-size: 13px; color: rgba(255,255,255,0.7); text-decoration: none; border-bottom: 2px solid #B87333;">NEWSLETTER</a>
  </nav>
</header>
```

### Si el CSS no se aplica (como nos pasó antes)

Usar inline styles directamente en el HTML del header. Buscar todos los archivos que contienen el header y aplicar:

```bash
grep -rl "ENTRELAMPISTAS" --include="*.html" .
```

En cada archivo, asegurar que:
1. El logo y la nav son DOS elementos hermanos dentro del header
2. El header tiene `display: flex` y `justify-content: space-between`
3. Los links de nav tienen `gap: 32px` entre ellos
4. El logo tiene `white-space: nowrap` para que no se rompa en dos líneas

### Verificación

Después de aplicar:
- [ ] "ENTRELAMPISTAS" y "SOBRE" tienen espacio claro entre ellos
- [ ] La navegación está alineada a la derecha
- [ ] En móvil, los textos no se solapan (verificar a 375px de ancho)
- [ ] El underline de cobre sigue en "NEWSLETTER" (o en la página activa)
- [ ] Aplicado en TODAS las páginas del sitio (home, sobre, archivo, glosario, conceptos, newsletter, los 3 ensayos, las páginas de capas)
