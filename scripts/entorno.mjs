/* Semillita · genera public/js/17-entorno.js: piezas de paisaje (árboles, casas, cerca, montañas) y de fondo marino.
   Fuentes (las dos de Kenney, CC0, vectoriales 2D):
     «Background Elements» · https://opengameart.org/content/background-elements
        →  vendor/oga/be/Vector/bgElements_elements.svg  (descomprime ahí kenney_backgroundElements.zip)
     «Fish Pack» · https://opengameart.org/content/fish-pack-0
        →  vendor/kenney/fish/Vector/*.svg  (descomprime ahí la carpeta Vector de fish-pack-0.zip)
   Uso:    npm run entorno
   Qué hace: toma las formas elegidas, las lleva al origen con 100 de alto, redondea y pasa los colores a
   tonos pastel para que combinen con el estilo plano. El contorno lo pone ent() en 12-estilo-plano.js. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ORIGEN = path.join(RAIZ, 'vendor/oga/be/Vector/bgElements_elements.svg');
const DIR_MAR = path.join(RAIZ, 'vendor/kenney/fish/Vector');
const SALIDA = path.join(RAIZ, 'public/js/17-entorno.js');

/* nombre de la pieza → número de capa (Layer0_N_FILL) en bgElements_elements.svg */
const PIEZAS = { pino: 0, pino_oscuro: 2, pino_fino: 6, abeto: 11, abeto_ancho: 14, arbol: 23, arbol_copa: 26, arbol_alto: 17,
  arbusto: 56, casa: 71, casa_lado: 69, casa_alta: 72, cerca: 73, montes: 78, nube: 43 };
/* nombre de la pieza → archivo de la carpeta Vector del Fish Pack */
const MAR = { alga_a: 'seaweed_green_a', alga_b: 'seaweed_green_b', alga_c: 'seaweed_green_c', alga_d: 'seaweed_green_d',
  alga_rosa: 'seaweed_pink_a', alga_rosa_b: 'seaweed_pink_c', coral_a: 'seaweed_orange_a', coral_b: 'seaweed_orange_b',
  pasto_mar: 'seaweed_grass_a', roca_a: 'rock_a', roca_b: 'rock_b',
  alga_fondo_a: 'background_seaweed_a', alga_fondo_b: 'background_seaweed_g', alga_fondo_c: 'background_seaweed_c',
  roca_fondo_a: 'background_rock_a', roca_fondo_b: 'background_rock_b' };

if (!fs.existsSync(ORIGEN)) { console.error('Falta ' + ORIGEN + '\nDescarga kenney_backgroundElements.zip de https://opengameart.org/content/background-elements y descomprímelo en vendor/oga/be/'); process.exit(1); }
const txt = fs.readFileSync(ORIGEN, 'utf8');
const r1 = v => Math.round(v * 10) / 10;
const esLetra = t => /^[A-Za-z]$/.test(t);

/* color → pastel: más claro y con la saturación contenida, conservando el tono y el orden de claros y oscuros */
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
function pieza(nombre, svg) {
  const ps = [...svg.matchAll(/<path[^>]*?fill="([^"]+)"[^>]*?d="([^"]+)"/g)].map(q => ({ fill: q[1], tok: q[2].match(/[A-Za-z]|-?\d+(?:\.\d+)?/g) }));
  if (!ps.length) throw new Error('Sin formas: ' + nombre);
  let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
  for (const p of ps) { const n = p.tok.filter(t => !esLetra(t)).map(Number); for (let i = 0; i + 1 < n.length; i += 2) { x0 = Math.min(x0, n[i]); x1 = Math.max(x1, n[i]); y0 = Math.min(y0, n[i + 1]); y1 = Math.max(y1, n[i + 1]); } }
  for (const c of new Set(ps.flatMap(p => p.tok.filter(esLetra)))) if (!'MLQZ'.includes(c)) throw new Error(`Comando ${c} no esperado en ${nombre}`);
  const k = 100 / (y1 - y0); /* todas las piezas quedan con 100 de alto */
  const p = ps.map(q => { let d = '', i = 0, pegado = true; /* los comandos son absolutos y solo llevan pares x y */
    for (const t of q.tok) { if (esLetra(t)) { d += t; pegado = true; continue; } d += (pegado ? '' : ' ') + r1((+t - (i % 2 ? y0 : x0)) * k); i++; pegado = false; }
    return [pastel(q.fill), d]; });
  datos[nombre] = { w: r1((x1 - x0) * k), h: 100, p };
}
for (const [nombre, capa] of Object.entries(PIEZAS)) {
  const m = txt.match(new RegExp(`<g id="Layer0_${capa}_FILL">([\\s\\S]*?)</g>`)); if (!m) throw new Error('No existe la capa ' + capa);
  pieza(nombre, m[1]);
}
if (fs.existsSync(DIR_MAR)) for (const [nombre, archivo] of Object.entries(MAR)) pieza(nombre, fs.readFileSync(path.join(DIR_MAR, archivo + '.svg'), 'utf8'));
else console.warn('⚠ Falta ' + DIR_MAR + ': se generan solo las piezas de tierra.');

const js = `/* Semillita · piezas de paisaje y de fondo marino para las escenas.
   GENERADO por "npm run entorno" (scripts/entorno.mjs). No lo edites a mano.
   Formas: «Background Elements» y «Fish Pack» de Kenney (CC0), recoloreadas a tonos pastel. Cada pieza mide 100 de alto.
   nombre: { w (ancho), h, p: [[color, contorno], …] }. Se dibujan con ent() (12-estilo-plano.js). */
window.ENTORNO=${JSON.stringify(datos)};
`;
fs.writeFileSync(SALIDA, js);
console.log(`Listo: ${Object.keys(datos).length} piezas, ${(js.length / 1024).toFixed(1)} KB → ${path.relative(RAIZ, SALIDA)}`);
for (const [n, o] of Object.entries(datos)) console.log(' ', n.padEnd(13), `${o.w}×100`, o.p.length + ' formas', [...new Set(o.p.map(q => q[0]))].join(' '));
