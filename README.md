# 🌱 Semillita · Aprende jugando

Sala de juegos tipo Montessori y retos educativos para niños de **5 a 12 años** (1ro a 6to de Primaria, República Dominicana).

## Qué incluye (versión 0.5)
- **27 juguetes**: 21 de juego libre (Pintar, Mi jardín, Música con 7 instrumentos, Acuario, Colmado, Laboratorio…) y 6 retos de ingenio (Programa a tu amigo, Laberinto, Hanói, Sudoku, Rompecabezas, Balanza).
- **3 niveles automáticos por edad** (5–6, 7–9, 10–12 años) que suben solos al ganar 3 veces seguidas.
- **12 animalitos dibujados** con expresiones, 21 accesorios, 5 niveles de crecimiento y álbum de 48 stickers.
- **Aprender**: 20 retos por grado (7 áreas), cálculo mental diario, lectura en voz alta, mundo de inglés y 3 cuentos interactivos.
- **Zona de adultos**: reporte por niño, límite de tiempo diario y modo aula.

## Cómo abrirlo en VS Code (primera vez)
1. Instala **Node.js LTS**: https://nodejs.org (siguiente, siguiente, finalizar).
2. Descomprime esta carpeta y ábrela en VS Code: *Archivo → Abrir carpeta…*
3. Abre la terminal (*Terminal → Nueva terminal*) y escribe:
   ```
   npm install
   npm run dev
   ```
4. Abre el enlace que aparece (por ejemplo `http://localhost:5173`).
   - Para probarlo en tu celular: conéctalo al **mismo Wi‑Fi** y abre la dirección **Network** que muestra la terminal.

## Publicarla e instalarla como app
```
npm run build
```
Se crea la carpeta `dist/`. Súbela a cualquier hosting gratuito (Netlify, Vercel, GitHub Pages). Desde el celular, abre la página y elige **"Agregar a pantalla de inicio"**: quedará instalada y funcionará **sin internet**.

## Estructura
```
semillita/
├─ index.html              página principal (carga los scripts en orden)
├─ src/main.js             letra Nunito sin internet + modo app (PWA)
├─ public/
│  ├─ css/styles.css       estilos y paleta pastel
│  ├─ js/                  la app, dividida en 7 archivos (ver CLAUDE.md)
│  ├─ icons/               íconos de la app
│  ├─ ilustraciones/       aquí van las ilustraciones nuevas (SVG)
│  └─ sonidos/             aquí van los sonidos grabados (MP3/OGG)
├─ docs/                   hoja de ruta, guía de ilustraciones y prompts
└─ CLAUDE.md               instrucciones para Claude Code
```

## Trabajar con Claude Code
Instala la extensión **Claude Code** (VS Code te la sugerirá al abrir la carpeta). Claude leerá `CLAUDE.md` automáticamente. En `docs/PROMPTS.md` hay instrucciones listas para copiar y pegar, fase por fase.

## Datos y privacidad
El progreso se guarda **solo en el dispositivo** (localStorage). No hay cuentas, anuncios ni envío de datos.
