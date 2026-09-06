// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.entrelampistas.com',
  output: 'static',
  integrations: [
    sitemap({
      // /estilo es la guia visual interna: no se indexa.
      filter: (page) => !page.includes('/estilo'),
    }),
  ],
  // La barra de desarrollo se cuela en las capturas y estorba al revisar diseno.
  devToolbar: { enabled: false },
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      // Los garabatos son SVG pequenos: incrustarlos evita una peticion por marca.
      assetsInlineLimit: 8192,
    },
  },
});
