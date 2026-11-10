// Semillita · Importa los gráficos de Kenney (CC0) que usa la app.
// Uso: npm run kenney          (CHROME=ruta\chrome.exe si Chrome no está en la ruta por defecto)
//  1. Descarga a vendor/kenney/zips/ los paquetes que falten (copias oficiales en OpenGameArt).
//  2. Para cada pieza de scripts/kenney-manifiesto.json:
//     · .png → recorta el espacio vacío y la reduce.
//     · .svg → la dibuja a alta resolución.
//     · .glb → renderiza el modelo 3D con three.js en Chrome sin ventana (luz suave, fondo transparente).
//     y la guarda como public/kenney/<nombre>.webp.
//  3. Genera public/kenney/kenney.js (lista de piezas para ilu()/emo()/kic()).
//  4. Reescribe la sección "Archivos en uso" de docs/LICENCIAS.md.
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import AdmZip from 'adm-zip';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const rel = p => path.join(ROOT, p);
const FUENTES = JSON.parse(fs.readFileSync(rel('scripts/kenney-fuentes.json'), 'utf8'));
const MANI = Object.entries(JSON.parse(fs.readFileSync(rel('scripts/kenney-manifiesto.json'), 'utf8'))).filter(([k]) => !k.startsWith('_'));
const ZIPS = rel('vendor/kenney/zips'), XDIR = rel('vendor/kenney/x'), OUT = rel('public/kenney');
for (const d of [ZIPS, XDIR, OUT]) fs.mkdirSync(d, { recursive: true });
const sleep = ms => new Promise(r => setTimeout(r, ms));

/* ---------- 1. descargas ---------- */
const packs = [...new Set(MANI.map(([, [p]]) => p))];
for (const p of packs) {
  const f = path.join(ZIPS, p + '.zip');
  if (fs.existsSync(f)) continue;
  if (!FUENTES[p]) throw new Error(`Paquete sin fuente: ${p}`);
  process.stdout.write(`Descargando ${FUENTES[p].nombre}… `);
  const r = await fetch(FUENTES[p].zip, { headers: { 'User-Agent': 'Semillita-importador/1.0 (uso personal)' } });
  if (!r.ok) throw new Error(`No se pudo descargar ${p}: HTTP ${r.status}`);
  fs.writeFileSync(f, Buffer.from(await r.arrayBuffer()));
  console.log('listo');
}
const zipCache = {};
const zipOf = p => (zipCache[p] ??= new AdmZip(path.join(ZIPS, p + '.zip')));
const entryOf = (pack, file) => { const e = zipOf(pack).getEntry(file); if (!e) throw new Error(`No existe ${file} en ${pack}`); return e; };

/* ---------- renderizador 3D (solo si hay modelos .glb) ---------- */
let R = null;
async function renderer() {
  if (R) return R;
  // carpeta servida: /three → node_modules/three, /x/<paquete> → modelos extraídos, /render.html
  const MIME = { '.js': 'text/javascript', '.html': 'text/html', '.glb': 'model/gltf-binary', '.png': 'image/png', '.json': 'application/json' };
  const server = http.createServer((req, res) => {
    const u = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let f = u === '/render.html' ? rel('scripts/kenney-render.html')
      : u.startsWith('/three/') ? rel('node_modules/three/' + u.slice(7))
      : u.startsWith('/x/') ? path.join(XDIR, u.slice(3)) : null;
    if (!f || !path.resolve(f).startsWith(ROOT) || !fs.existsSync(f)) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res);
  });
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const port = server.address().port;
  const chromePath = process.env.CHROME || ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', '/usr/bin/google-chrome', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'].find(p => fs.existsSync(p));
  if (!chromePath) throw new Error('No encontré Chrome/Edge. Indica la ruta con la variable CHROME.');
  const dbg = 9300 + Math.floor(Math.random() * 600);
  const chrome = spawn(chromePath, ['--headless=new', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--hide-scrollbars',
    `--remote-debugging-port=${dbg}`, `--user-data-dir=${path.join(XDIR, '.chrome')}`, 'about:blank'], { stdio: 'ignore' });
  let tabs; for (let i = 0; i < 60 && !tabs; i++) { try { tabs = await (await fetch(`http://127.0.0.1:${dbg}/json`)).json(); } catch { await sleep(250); } }
  const ws = new WebSocket(tabs.find(t => t.type === 'page').webSocketDebuggerUrl);
  await new Promise(r => (ws.onopen = r));
  let id = 0; const pend = {};
  ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend[m.id]) { pend[m.id](m); delete pend[m.id]; } };
  const send = (method, params = {}) => new Promise(r => { const i = ++id; pend[i] = r; ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async expr => { const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true });
    if (r.result?.exceptionDetails) throw new Error(r.result.exceptionDetails.exception?.description || 'error en el render'); return r.result.result.value; };
  await send('Page.navigate', { url: `http://127.0.0.1:${port}/render.html` });
  for (let i = 0; i < 80; i++) { if (await ev('window.ready===true').catch(() => false)) break; await sleep(250); }
  R = { port, ev, close: () => { ws.close(); chrome.kill(); server.close(); } };
  return R;
}
/* extrae del zip la carpeta de modelos (y sus texturas) la primera vez */
function extractModels(pack, file) {
  const dir = path.posix.dirname(file);
  const marker = path.join(XDIR, pack, dir, '.ok');
  if (fs.existsSync(marker)) return;
  for (const e of zipOf(pack).getEntries()) if (!e.isDirectory && e.entryName.startsWith(dir + '/')) {
    const out = path.join(XDIR, pack, e.entryName); fs.mkdirSync(path.dirname(out), { recursive: true }); fs.writeFileSync(out, e.getData());
  }
  fs.writeFileSync(marker, '');
}

/* ---------- 2. procesar ---------- */
const lista = {};
let bytes = 0;
for (const [name, [pack, file, opt = {}]] of MANI) {
  const ext = path.extname(file).toLowerCase();
  let src;
  if (ext === '.glb') {
    extractModels(pack, file);
    const r = await renderer();
    const url = `/x/${pack}/${file}`.split('/').map(encodeURIComponent).join('/');
    const dataUrl = await r.ev(`render(${JSON.stringify(url)}, ${JSON.stringify({ giro: opt.giro, azimut: opt.azimut, altura: opt.altura })})`);
    src = sharp(Buffer.from(dataUrl.split(',')[1], 'base64'));
  } else if (ext === '.svg') {
    src = sharp(entryOf(pack, file).getData(), { density: 300 });
  } else {
    src = sharp(entryOf(pack, file).getData());
  }
  const tam = opt.tam || (opt.icono ? 96 : 256);
  let img = src.ensureAlpha().trim({ threshold: 1 });
  if (opt.espejo) img = img.flop();
  const buf = await img.resize(tam, tam, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 84, alphaQuality: 90, effort: 5 }).toBuffer({ resolveWithObject: true });
  fs.writeFileSync(path.join(OUT, name + '.webp'), buf.data);
  bytes += buf.data.length;
  lista[name] = [buf.info.width, buf.info.height, opt.icono ? 1 : 0];
  process.stdout.write('.');
}
console.log('');
if (R) R.close();
for (const f of fs.readdirSync(OUT)) if (f.endsWith('.webp') && !lista[f.slice(0, -5)]) fs.unlinkSync(path.join(OUT, f));

/* ---------- 3. lista para el navegador ---------- */
fs.writeFileSync(path.join(OUT, 'kenney.js'),
  `/* Generado por scripts/kenney.mjs — no editar a mano. Gráficos de Kenney (www.kenney.nl), CC0. */\n` +
  `window.KENNEY=${JSON.stringify(lista)};\n`);

/* ---------- 4. licencias ---------- */
const LIC = rel('docs/LICENCIAS.md');
const lic = fs.readFileSync(LIC, 'utf8');
const ini = '## Archivos en uso', marca = '<!-- Sección generada por scripts/kenney.mjs (npm run kenney) desde scripts/kenney-manifiesto.json -->';
const como = f => f.endsWith('.glb') ? 'modelo 3D renderizado' : f.endsWith('.svg') ? 'vector' : 'PNG';
const filas = MANI.map(([name, [pack, file]]) => `| \`${name}\` | ${FUENTES[pack].nombre} | \`${file}\` | ${como(file)} |`).join('\n');
const seccion = `${ini}\n\n${marca}\n${MANI.length} piezas · ${(bytes / 1024).toFixed(0)} KB en \`public/kenney/\`.\n\n| Pieza en Semillita | Paquete de Kenney | Archivo original | Cómo se usa |\n| --- | --- | --- | --- |\n${filas}\n`;
fs.writeFileSync(LIC, lic.slice(0, lic.indexOf(ini)) + seccion);

console.log(`✓ ${MANI.length} piezas · ${(bytes / 1024).toFixed(0)} KB en public/kenney/`);
