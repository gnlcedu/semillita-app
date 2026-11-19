import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

/* En desarrollo la app vive en la raíz (/). Al hacer el build se publica en GitHub Pages,
   dentro de https://gnlcedu.github.io/semillita-app/, así que todas las rutas llevan ese prefijo.
   Vite lo agrega solo a las rutas de index.html; el manifiesto usa rutas relativas. */
const BASE_PAGES = '/semillita-app/';

export default defineConfig(({ command, isPreview }) => ({
  base: command === 'build' || isPreview ? BASE_PAGES : '/',
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/*.png', 'css/*.css', 'js/*.js', 'kenney/kenney.js'],
      manifest: {
        id: BASE_PAGES,
        name: 'Semillita · Aprende jugando',
        short_name: 'Semillita',
        description: 'Juegos educativos tipo Montessori para niños de 5 a 12 años',
        lang: 'es',
        start_url: '.',
        scope: '.',
        display: 'standalone',
        orientation: 'any',
        background_color: '#FBF8F3',
        theme_color: '#FBF8F3',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,webp,woff2,mp3,ogg}'],
        /* las imágenes de Kenney ya no se muestran: no se guardan en el dispositivo (kenney.js sí, lo carga index.html) */
        globIgnores: ['kenney/*.webp'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024
      }
    })
  ]
}));
