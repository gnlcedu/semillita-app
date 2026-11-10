/* Semillita · genera public/js/16-mapa-mundo.js a partir del mapa del mundo de MapSVG (CC0).
   Fuente: https://mapsvg.com/maps/world/  →  vendor/mapsvg/world.svg
   Uso:    npm run mapa
   Qué hace: lee los países (proyección Mercator), los agrupa en 6 continentes, los pasa a la proyección
   Equal Earth (tamaños reales, sin la Groenlandia gigante de Mercator), simplifica los contornos y quita
   las islas diminutas. Rusia se parte en los Urales (60° E) entre Europa y Asia. La Antártida no viene
   en el archivo: el juego la dibuja aparte. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ORIGEN = path.join(RAIZ, 'vendor/mapsvg/world.svg');
const SALIDA = path.join(RAIZ, 'public/js/16-mapa-mundo.js');
const ANCHO = 400, TOL = 0.45, AREA_MIN = 0.8, URALES = 60;

const lista = s => s.trim().split(/\s+/);
const CONT = [
  ['América del Norte', lista('CA US MX GL BM PM GT BZ SV HN NI CR PA CU JM HT DO PR BS TC KY AG AI AW BB BL BQ CW DM GD GP KN LC MF MQ MS SX TT VC VG VI')],
  ['América del Sur', lista('AR BO BR CL CO EC FK GF GY PE PY SR UY VE')],
  ['Europa', lista('AD AL AT AX BA BE BG BY CH CZ DE DK EE ES FI FO FR GB GG GI GR HR HU IE IM IS IT JE XK LI LT LU LV MC MD ME MK MT NL NO PL PT RO RS SE SI SJ SK SM UA VA')],
  ['África', lista('AO BF BI BJ BW CD CF CG CI CM CV DJ DZ EG EH ER ET GA GH GM GN GQ GW KE KM LR LS LY MA MG ML MR MU MW MZ NA NE NG RE RW SC SD SL SN SO SS ST SZ TD TG TN TZ UG YT ZA ZM ZW SH GO JU')],
  ['Asia', lista('AE AF AM AZ BD BH BN BT CN CY GE HK ID IL IN IQ IR JO JP KG KH KP KR KW KZ LA LB LK MM MN MO MV MY NP OM PH PK PS QA SA SG SY TH TJ TL TM TR TW UZ VN YE IO CC CX')],
  ['Oceanía', lista('AU NZ PG FJ SB VU NC AS CK FM GU KI MH MP NF NR NU PF PN PW TK TO TV WF WS UM-DQ UM-FQ UM-HQ UM-JQ UM-MQ UM-WQ')],
];
const IGNORAR = new Set(lista('BV HM TF GS RU'));

if (!fs.existsSync(ORIGEN)) { console.error('Falta ' + ORIGEN + '\nDescárgalo de https://mapsvg.com/maps/world/ (botón de descarga del SVG).'); process.exit(1); }
const txt = fs.readFileSync(ORIGEN, 'utf8');
const [gw, gn, ge, gs] = txt.match(/geoViewBox="([^"]+)"/)[1].split(/\s+/).map(Number);
const W0 = +txt.match(/\swidth="([\d.]+)"/)[1], H0 = +txt.match(/\sheight="([\d.]+)"/)[1];
const RAD = Math.PI / 180, merc = lat => Math.log(Math.tan(Math.PI / 4 + lat * RAD / 2));
const mN = merc(gn), mS = merc(gs), LON0 = (gw + ge) / 2;
const aGeo = ([x, y]) => [gw + x / W0 * (ge - gw), (2 * Math.atan(Math.exp(mN - y / H0 * (mN - mS))) - Math.PI / 2) / RAD];
/* Equal Earth (Šavrič, Patterson y Jenny, 2018) */
const A1 = 1.340264, A2 = -0.081106, A3 = 0.000893, A4 = 0.003796, M3 = Math.sqrt(3) / 2;
function ee(lon, lat) { const t = Math.asin(M3 * Math.sin(lat * RAD)), t2 = t * t, t6 = t2 * t2 * t2;
  return [ (lon - LON0) * RAD * Math.cos(t) / (M3 * (A1 + 3 * A2 * t2 + t6 * (7 * A3 + 9 * A4 * t2))), t * (A1 + A2 * t2 + t6 * (A3 + A4 * t2)) ]; }
const k = ANCHO / (2 * ee(ge, 0)[0]), yN = ee(LON0, gn)[1], ALTO = Math.round((yN - ee(LON0, gs)[1]) * k * 10) / 10;
const proy = ([lon, lat]) => { const [x, y] = ee(lon, lat); return [ANCHO / 2 + x * k, (yN - y) * k]; };
const r1 = v => Math.round(v * 10) / 10;

function leer(d) { /* el archivo solo usa "m" relativo (con líneas implícitas) y "z" */
  const tok = d.match(/[mMzZlL]|-?[\d.]+(?:e-?\d+)?/g); const subs = []; let cur = null, x = 0, y = 0, sx = 0, sy = 0, cmd = '', primero = false;
  for (let i = 0; i < tok.length;) { const t = tok[i];
    if (/^[a-zA-Z]$/.test(t)) { cmd = t; i++; if (t === 'z' || t === 'Z') { x = sx; y = sy; cur = null; } else if (t === 'm' || t === 'M') primero = true; continue; }
    const a = +tok[i], b = +tok[i + 1]; i += 2;
    if (cmd === 'm' || cmd === 'l') { x += a; y += b; } else if (cmd === 'M' || cmd === 'L') { x = a; y = b; } else throw new Error('Comando no esperado: ' + cmd);
    if (primero) { cur = []; subs.push(cur); sx = x; sy = y; primero = false; }
    cur.push([x, y]); }
  return subs;
}
function dp(p, tol) { if (p.length < 3) return p; const a = p[0], b = p[p.length - 1]; let md = 0, mi = 0;
  const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1e-9;
  for (let i = 1; i < p.length - 1; i++) { const d = Math.abs(dy * (p[i][0] - a[0]) - dx * (p[i][1] - a[1])) / L; if (d > md) { md = d; mi = i; } }
  return md > tol ? dp(p.slice(0, mi + 1), tol).slice(0, -1).concat(dp(p.slice(mi), tol)) : [a, b]; }
function simplificar(p) { if (p.length < 8) return p; let far = 0, fd = 0; p.forEach((q, i) => { const d = Math.hypot(q[0] - p[0][0], q[1] - p[0][1]); if (d > fd) { fd = d; far = i; } });
  return dp(p.slice(0, far + 1), TOL).slice(0, -1).concat(dp(p.slice(far).concat([p[0]]), TOL).slice(0, -1)); }
const area = p => { let s = 0; for (let i = 0; i < p.length; i++) { const a = p[i], b = p[(i + 1) % p.length]; s += a[0] * b[1] - b[0] * a[1]; } return s / 2; };
const centro = p => { const A = area(p); let cx = 0, cy = 0; for (let i = 0; i < p.length; i++) { const a = p[i], b = p[(i + 1) % p.length], f = a[0] * b[1] - b[0] * a[1]; cx += (a[0] + b[0]) * f; cy += (a[1] + b[1]) * f; } return [cx / (6 * A), cy / (6 * A)]; };
/* corta un polígono (en lon/lat) con el meridiano de los Urales y devuelve el lado pedido */
function cortar(p, lado) { const dentro = q => lado === 'O' ? q[0] < URALES : q[0] >= URALES; const out = [];
  for (let i = 0; i < p.length; i++) { const a = p[i], b = p[(i + 1) % p.length], da = dentro(a), db = dentro(b);
    if (da) out.push(a);
    if (da !== db) { const t = (URALES - a[0]) / (b[0] - a[0]); out.push([URALES, a[1] + t * (b[1] - a[1])]); } }
  return out; }

const pais = {}; let m; const re = /<path\s+d="([^"]+)"[^>]*?id="([^"]+)"/g;
while ((m = re.exec(txt))) pais[m[2]] = leer(m[1]).map(s => s.map(aGeo));
const conocidos = new Set([...CONT.flatMap(c => c[1]), ...IGNORAR]);
const sinGrupo = Object.keys(pais).filter(id => !conocidos.has(id)); if (sinGrupo.length) console.warn('⚠ Sin continente:', sinGrupo.join(' '));

const cont = CONT.map(([n, ids]) => {
  let geo = ids.flatMap(id => { if (!pais[id]) { console.warn('⚠ No está en el archivo:', id); return []; } return pais[id]; });
  if (n === 'Europa') geo = geo.concat(pais.RU.map(s => cortar(s, 'O')).filter(s => s.length > 2));
  if (n === 'Asia') geo = geo.concat(pais.RU.map(s => cortar(s, 'E')).filter(s => s.length > 2));
  const pol = geo.map(s => s.map(proy)).filter(s => Math.abs(area(s)) >= AREA_MIN).map(simplificar).filter(s => s.length > 2);
  let A = 0, cx = 0, cy = 0; pol.forEach(s => { const a = Math.abs(area(s)), c = centro(s); A += a; cx += c[0] * a; cy += c[1] * a; });
  return { n, c: [r1(cx / A), r1(cy / A)], d: pol.map(s => 'M' + s.map(([x, y]) => r1(x) + ' ' + r1(y)).join('L') + 'Z').join(''), pts: pol.reduce((q, s) => q + s.length, 0), pol: pol.length };
});
const datos = { w: ANCHO, h: ALTO, cont: cont.map(({ n, c, d }) => ({ n, c, d })) };
const js = `/* Semillita · mapa del mundo por continentes.
   GENERADO por "npm run mapa" (scripts/mapa-mundo.mjs). No lo edites a mano.
   Contornos: MapSVG (https://mapsvg.com/maps/world/), licencia CC0 1.0. Proyección Equal Earth, lienzo ${ANCHO}×${ALTO}.
   cont: n (nombre), c (centro para la etiqueta), d (contorno). La Antártida la dibuja el juego. */
window.MAPA_MUNDO=${JSON.stringify(datos)};
`;
fs.writeFileSync(SALIDA, js);
cont.forEach(c => console.log(`${c.n}: ${c.pol} polígonos, ${c.pts} puntos, centro ${c.c}`));
console.log(`Listo: ${(js.length / 1024).toFixed(1)} KB, lienzo ${ANCHO}×${ALTO} → ${path.relative(RAIZ, SALIDA)}`);
