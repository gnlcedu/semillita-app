/* Semillita · genera public/js/17-entorno.js: piezas de paisaje (árboles, casas, cerca, montañas).
   Fuente: «Background Elements» de Kenney (CC0) · https://opengameart.org/content/background-elements
           →  vendor/oga/be/Vector/bgElements_elements.svg  (descomprime ahí kenney_backgroundElements.zip)
   Uso:    npm run entorno
   Qué hace: toma las capas elegidas del SVG, las lleva al origen, redondea y pasa los colores a tonos
   pastel para que combinen con el estilo plano. El contorno lo pone ent() en 12-estilo-plano.js. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ORIGEN = path.join(RAIZ, 'vendor/oga/be/Vector/bgElements_elements.svg');
const SALIDA = path.join(RAIZ, 'public/js/17-entorno.js');

/* nombre de la pieza → número de capa (Layer0_N_FILL) en el archivo de Kenney */
const PIEZAS = { pino: 0, pino_oscuro: 2, pino_fino: 6, abeto: 11, abeto_ancho: 14, arbol: 23, arbol_copa: 26, arbol_alto: 17,
  arbusto: 56, casa: 71, casa_lado: 69, casa_alta: 72, cerca: 73, montes: 78, nube: 43 };

if (!fs.existsSync(ORIGEN)) { console.error('Falta ' + ORIGEN + '\nDescarga kenney_backgroundElements.zip de https://opengameart.org/content/background-elements y descomprímelo en vendor/oga/be/'); process.exit(1); }
const txt = fs.readFileSync(ORIGEN, 'utf8');
const r1 = v => Math.round(v * 10) / 10;

/* color → pastel: más claro y un poco menos saturado, conservando el tono y el orden de claros y oscuros */
function pastel(hex) {
  const n = parseInt(hex.slice(1), 16), r = (n >> 16) / 255, g = (n >> 8 & 255) / 255, b = (n & 255) / 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn; let h = 0, l = (mx + mn) / 2, s = d ? d / (1 - Math.abs(2 * l - 1)) : 0;
  if (d) h = mx === r ? ((g - b) / d + 6) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
  l = 0.5 + 0.4 * l; s = Math.min(s * 1.3, 0.62);
  const c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs(h % 2 - 1)), m = l - c / 2;
  const [R, G, B] = [[c, x, 0], [x, c, 0], [0, c, x], [0, x, c], [x, 0, c], [c, 0, x]][Math.floor(h) % 6];
  return '#' + [R, G, B].map(v => Math.round((v + m) * 255).toString(16).padStart(2, '0')).join('').toUpperCase();
}

const datos = {};
for (const [nombre, capa] of Object.entries(PIEZAS)) {
  const m = txt.match(new RegExp(`<g id="Layer0_${capa}_FILL">([\\s\\S]*?)</g>`)); if (!m) throw new Error('No existe la capa ' + capa);
  const ps = [...m[1].matchAll(/<path fill="([^"]+)"[^>]*?d="([^"]+)"/g)].map(q => ({ fill: q[1], tok: q[2].match(/[A-Za-z]|-?\d+(?:\.\d+)?/g) }));
  let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
  for (const p of ps) { const n = p.tok.filter(t => !/[A-Za-z]/.test(t)).map(Number); for (let i = 0; i + 1 < n.length; i += 2) { x0 = Math.min(x0, n[i]); x1 = Math.max(x1, n[i]); y0 = Math.min(y0, n[i + 1]); y1 = Math.max(y1, n[i + 1]); } }
  const usados = new Set(ps.flatMap(p => p.tok.filter(t => /[A-Za-z]/.test(t)))); for (const c of usados) if (!'MLQZ'.includes(c)) throw new Error(`Comando ${c} no esperado en ${nombre}`);
  const k = 100 / (y1 - y0); /* todas las piezas quedan con 100 de alto */
  const p = ps.map(q => { let d = '', par = 0; for (const t of q.tok) { if (/[A-Za-z]/.test(t)) { d += t; par = 0; continue; } const v = r1((+t - (par % 2 ? y0 : x0)) * k); d += (par && !/[A-Za-z]$/.test(d) ? ' ' : (par === 0 && !/[A-Za-z]$/.test(d) ? ' ' : '')) + v; par++; } return [pastel(q.fill), d.replace(/([A-Za-z])\s+/g, '$1')]; });
  datos[nombre] = { w: r1((x1 - x0) * k), h: 100, p };
}
const js = `/* Semillita · piezas de paisaje para las escenas.
   GENERADO por "npm run entorno" (scripts/entorno.mjs). No lo edites a mano.
   Formas: «Background Elements» de Kenney (CC0), recoloreadas a tonos pastel. Cada pieza mide 100 de alto.
   nombre: { w (ancho), h, p: [[color, contorno], …] }. Se dibujan con ent() (12-estilo-plano.js). */
window.ENTORNO=${JSON.stringify(datos)};
`;
fs.writeFileSync(SALIDA, js);
console.log(`Listo: ${Object.keys(datos).length} piezas, ${(js.length / 1024).toFixed(1)} KB → ${path.relative(RAIZ, SALIDA)}`);
for (const [n, o] of Object.entries(datos)) console.log(' ', n.padEnd(12), `${o.w}×100`, o.p.length + ' formas', [...new Set(o.p.map(q => q[0]))].join(' '));
