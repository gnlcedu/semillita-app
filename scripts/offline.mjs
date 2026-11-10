/* Semillita · genera entrega/semillita.html: toda la app en UN solo archivo.
   Uso:    npm run offline
   Para qué: copiar el archivo a un celular, tablet o computadora y abrirlo en el navegador, sin internet ni servidor.
   Qué hace: toma index.html y mete dentro la hoja de estilos, todos los scripts de public/, la letra Nunito y el
   ícono. Quita el módulo de la PWA (src/main.js), que solo sirve cuando la app se abre desde un sitio web.
   El progreso se guarda en el navegador del dispositivo, igual que en la versión web. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pub = p => path.join(RAIZ, 'public', p.replace(/^\//, ''));
const SALIDA = path.join(RAIZ, 'entrega', 'semillita.html');
let html = fs.readFileSync(path.join(RAIZ, 'index.html'), 'utf8');

/* letra Nunito dentro del archivo (subconjunto latino: cubre el español) */
const FUENTES = path.join(RAIZ, 'node_modules/@fontsource/nunito/files');
const letra = [400, 600, 700, 800].map(w => { const f = path.join(FUENTES, `nunito-latin-${w}-normal.woff2`);
  if (!fs.existsSync(f)) throw new Error('Falta ' + f + ' (corre "npm install").');
  return `@font-face{font-family:'Nunito';font-style:normal;font-display:swap;font-weight:${w};src:url(data:font/woff2;base64,${fs.readFileSync(f).toString('base64')}) format('woff2')}`; }).join('\n');

/* hoja de estilos */
html = html.replace(/<link rel="stylesheet" href="([^"]+)">/g, (_, href) => { const css = fs.readFileSync(pub(href), 'utf8');
  const fuera = [...css.matchAll(/url\(([^)]+)\)/g)].map(m => m[1]).filter(u => !/^['"]?(#|data:)/.test(u)); if (fuera.length) throw new Error('La hoja de estilos usa archivos externos: ' + fuera.join(', '));
  return `<style>\n${letra}\n${css}\n</style>`; });
/* scripts clásicos; el módulo de la PWA se quita */
let n = 0;
html = html.replace(/<script type="module"[^>]*><\/script>\n?/g, '');
html = html.replace(/<script src="([^"]+)"><\/script>/g, (_, src) => { n++; const js = fs.readFileSync(pub(src), 'utf8').replace(/<\/script/gi, '<\\/script');
  return `<script>/* ${src} */\n${js}\n</script>`; });
/* ícono */
const icono = 'data:image/png;base64,' + fs.readFileSync(pub('/icons/icon-192.png')).toString('base64');
html = html.replace(/<link rel="icon" href="[^"]+">/, `<link rel="icon" href="${icono}">`).replace(/<link rel="apple-touch-icon" href="[^"]+">/, `<link rel="apple-touch-icon" href="${icono}">`);

const quedan = [...html.matchAll(/<(?:script|link)[^>]+(?:src|href)="(?!data:)([^"]+)"/g)].map(m => m[1]);
if (quedan.length) throw new Error('Quedaron referencias a archivos externos: ' + quedan.join(', '));
fs.mkdirSync(path.dirname(SALIDA), { recursive: true });
fs.writeFileSync(SALIDA, html);
console.log(`Listo: ${n} scripts, ${(fs.statSync(SALIDA).size / 1024).toFixed(0)} KB → ${path.relative(RAIZ, SALIDA)}`);
