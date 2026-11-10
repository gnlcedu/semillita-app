/* Semillita · genera public/js/15-mapa-rd.js a partir del mapa de provincias de MapSVG (CC0).
   Fuente: https://mapsvg.com/maps/dominican-republic/  →  vendor/mapsvg/dominican-republic.svg
   Uso:    npm run mapa
   Qué hace: lee las 32 provincias, las pasa a un lienzo de 400 de ancho, simplifica los contornos,
   calcula el centro de cada una, sus vecinas (para alternar tonos) y proyecta los lugares del juego. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ORIGEN = path.join(RAIZ, 'vendor/mapsvg/dominican-republic.svg');
const SALIDA = path.join(RAIZ, 'public/js/15-mapa-rd.js');
const ANCHO = 400, TOL = 0.28;

/* nombre oficial, región (N = Norte o Cibao, S = Sur, E = Este) y capital de cada provincia */
const PROV = {
  '01':['Distrito Nacional','E','Santo Domingo de Guzmán'], '02':['Azua','S','Azua de Compostela'], '03':['Bahoruco','S','Neiba'],
  '04':['Barahona','S','Barahona'], '05':['Dajabón','N','Dajabón'], '06':['Duarte','N','San Francisco de Macorís'],
  '07':['Elías Piña','S','Comendador'], '08':['El Seibo','E','El Seibo'], '09':['Espaillat','N','Moca'],
  '10':['Independencia','S','Jimaní'], '11':['La Altagracia','E','Higüey'], '12':['La Romana','E','La Romana'],
  '13':['La Vega','N','La Vega'], '14':['María Trinidad Sánchez','N','Nagua'], '15':['Monte Cristi','N','Monte Cristi'],
  '16':['Pedernales','S','Pedernales'], '17':['Peravia','S','Baní'], '18':['Puerto Plata','N','Puerto Plata'],
  '19':['Hermanas Mirabal','N','Salcedo'], '20':['Samaná','N','Samaná'], '21':['San Cristóbal','S','San Cristóbal'],
  '22':['San Juan','S','San Juan de la Maguana'], '23':['San Pedro de Macorís','E','San Pedro de Macorís'],
  '24':['Sánchez Ramírez','N','Cotuí'], '25':['Santiago','N','Santiago de los Caballeros'], '26':['Santiago Rodríguez','N','Sabaneta'],
  '27':['Valverde','N','Mao'], '28':['Monseñor Nouel','N','Bonao'], '29':['Monte Plata','E','Monte Plata'],
  '30':['Hato Mayor','E','Hato Mayor del Rey'], '31':['San José de Ocoa','S','San José de Ocoa'], '32':['Santo Domingo','E','Santo Domingo Este'],
};
/* lugares del juego: [nombre, longitud, latitud, provincia esperada (para comprobar la proyección)] */
const LUGARES = [
  ['Santo Domingo',-69.93,18.475,'01'], ['Santiago',-70.69,19.45,'25'], ['Punta Cana',-68.40,18.58,'11'], ['Pico Duarte',-70.998,19.023,null],
  ['Puerto Plata',-70.69,19.78,'18'], ['Samaná',-69.34,19.21,'20'], ['Lago Enriquillo',-71.58,18.50,null], ['Barahona',-71.10,18.21,'04'],
  ['La Romana',-68.97,18.43,'12'], ['Frontera norte',-71.757,19.705,null], ['Frontera sur',-71.767,18.038,null],
];

if (!fs.existsSync(ORIGEN)) { console.error('Falta ' + ORIGEN + '\nDescárgalo de https://mapsvg.com/maps/dominican-republic/ (botón de descarga del SVG).'); process.exit(1); }
const txt = fs.readFileSync(ORIGEN, 'utf8');
const [gw, gn, ge, gs] = txt.match(/geoViewBox="([^"]+)"/)[1].split(/\s+/).map(Number);
const W0 = +txt.match(/\swidth="([\d.]+)"/)[1], H0 = +txt.match(/\sheight="([\d.]+)"/)[1];
const k = ANCHO / W0, ALTO = Math.round(H0 * k * 10) / 10;
const merc = lat => Math.log(Math.tan(Math.PI / 4 + lat * Math.PI / 360));
const geo = (lon, lat) => [ (lon - gw) / (ge - gw) * ANCHO, (merc(gn) - merc(lat)) / (merc(gn) - merc(gs)) * ALTO ];
const r1 = v => Math.round(v * 10) / 10;

/* el archivo solo usa "m" relativo (con líneas implícitas) y "z" */
function leer(d) {
  const tok = d.match(/[mMzZlL]|-?[\d.]+(?:e-?\d+)?/g); const subs = []; let cur = null, x = 0, y = 0, sx = 0, sy = 0, cmd = '', primero = false;
  for (let i = 0; i < tok.length;) {
    const t = tok[i];
    if (/[a-zA-Z]/.test(t)) { cmd = t; i++; if (t === 'z' || t === 'Z') { x = sx; y = sy; cur = null; } else if (t === 'm' || t === 'M') primero = true; continue; }
    const a = +tok[i], b = +tok[i + 1]; i += 2;
    if (cmd === 'm' || cmd === 'l') { x += a; y += b; } else if (cmd === 'M' || cmd === 'L') { x = a; y = b; } else throw new Error('Comando no esperado: ' + cmd);
    if (primero) { cur = []; subs.push(cur); sx = x; sy = y; primero = false; }
    cur.push([x, y]);
  }
  return subs;
}
function dp(p, tol) { /* Douglas-Peucker */
  if (p.length < 3) return p; const a = p[0], b = p[p.length - 1]; let md = 0, mi = 0;
  const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1e-9;
  for (let i = 1; i < p.length - 1; i++) { const d = Math.abs(dy * (p[i][0] - a[0]) - dx * (p[i][1] - a[1])) / L; if (d > md) { md = d; mi = i; } }
  return md > tol ? dp(p.slice(0, mi + 1), tol).slice(0, -1).concat(dp(p.slice(mi), tol)) : [a, b];
}
function simplificar(p) { /* anillo cerrado: se parte en dos mitades para conservar la forma */
  if (p.length < 8) return p; let far = 0, fd = 0; p.forEach((q, i) => { const d = Math.hypot(q[0] - p[0][0], q[1] - p[0][1]); if (d > fd) { fd = d; far = i; } });
  return dp(p.slice(0, far + 1), TOL).slice(0, -1).concat(dp(p.slice(far).concat([p[0]]), TOL).slice(0, -1));
}
const area = p => { let s = 0; for (let i = 0; i < p.length; i++) { const a = p[i], b = p[(i + 1) % p.length]; s += a[0] * b[1] - b[0] * a[1]; } return s / 2; };
function centro(p) { const A = area(p); let cx = 0, cy = 0; for (let i = 0; i < p.length; i++) { const a = p[i], b = p[(i + 1) % p.length], f = a[0] * b[1] - b[0] * a[1]; cx += (a[0] + b[0]) * f; cy += (a[1] + b[1]) * f; } return [cx / (6 * A), cy / (6 * A)]; }
const dentro = (p, [x, y]) => { let c = false; for (let i = 0, j = p.length - 1; i < p.length; j = i++) { const a = p[i], b = p[j]; if ((a[1] > y) !== (b[1] > y) && x < (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]) + a[0]) c = !c; } return c; };

const provs = []; let m; const re = /<path\s+d="([^"]+)"[^>]*?id="DO-(\d\d)/g;
while ((m = re.exec(txt))) {
  const id = m[2], inf = PROV[id]; if (!inf) throw new Error('Provincia desconocida: ' + id);
  const crudo = leer(m[1]).map(s => s.map(([x, y]) => [x * k, y * k]));
  const subs = crudo.filter(s => Math.abs(area(s)) > 0.25).sort((a, b) => Math.abs(area(b)) - Math.abs(area(a)));
  provs.push({ id, n: inf[0], r: inf[1], cap: inf[2], crudo, subs: subs.map(simplificar), c: centro(subs[0]), a: Math.abs(area(subs[0])) });
}
if (provs.length !== 32) throw new Error('Se esperaban 32 provincias y hay ' + provs.length);

/* vecinas: comparten vértices del contorno original */
const celda = new Map();
provs.forEach((p, i) => p.crudo.forEach(s => s.forEach(([x, y]) => { const key = Math.round(x * 4) + ',' + Math.round(y * 4); if (!celda.has(key)) celda.set(key, new Set()); celda.get(key).add(i); })));
const vec = provs.map(() => new Set());
celda.forEach(set => { if (set.size > 1) set.forEach(a => set.forEach(b => { if (a !== b) vec[a].add(b); })); });
/* tono 0-2 distinto al de las vecinas (de mayor a menor número de vecinas) */
const orden = provs.map((_, i) => i).sort((a, b) => vec[b].size - vec[a].size);
orden.forEach(i => { const usados = new Set([...vec[i]].map(j => provs[j].t).filter(t => t !== undefined)); let t = 0; while (usados.has(t)) t++; provs[i].t = t; });

const dPath = subs => subs.map(s => 'M' + s.map(([x, y]) => r1(x) + ' ' + r1(y)).join('L') + 'Z').join('');
const lugares = {};
for (const [n, lon, lat, esp] of LUGARES) {
  const q = geo(lon, lat); lugares[n] = q.map(r1);
  if (esp) { const p = provs.find(v => v.id === esp); if (!p.subs.some(s => dentro(s, q))) console.warn('⚠ ' + n + ' no cae dentro de ' + p.n); }
}
provs.sort((a, b) => a.id.localeCompare(b.id));
const datos = { w: ANCHO, h: ALTO, lugares, prov: provs.map(p => ({ id: p.id, n: p.n, r: p.r, cap: p.cap, t: p.t, c: p.c.map(r1), a: Math.round(p.a), d: dPath(p.subs) })) };
const js = `/* Semillita · mapa de la República Dominicana por provincias.
   GENERADO por "npm run mapa" (scripts/mapa-rd.mjs). No lo edites a mano.
   Contornos: MapSVG (https://mapsvg.com/maps/dominican-republic/), licencia CC0 1.0. Lienzo ${ANCHO}×${ALTO}.
   prov: id, n (nombre), r (región N/S/E), cap (capital), t (tono 0-3), c (centro), a (área), d (contorno). */
window.MAPA_RD=${JSON.stringify(datos)};
`;
fs.writeFileSync(SALIDA, js);
const pts = provs.reduce((s, p) => s + p.subs.reduce((q, v) => q + v.length, 0), 0);
console.log(`Listo: ${provs.length} provincias, ${pts} puntos, ${(js.length / 1024).toFixed(1)} KB → ${path.relative(RAIZ, SALIDA)}`);
console.log('Tonos usados:', Math.max(...provs.map(p => p.t)) + 1, '· lugares:', JSON.stringify(lugares));
