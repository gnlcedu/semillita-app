# Plan · Mejora gráfica de Semillita

Rama: `mejora-grafica` · Un commit al cerrar cada fase · Estado: marcar `[x]` al completar.

## Reglas que aplican a todas las fases
- No cambiar la lógica de los juegos ni el formato de `localStorage` (`semillita.v1`).
- Debe verse bien en **390 px** (celular) y **768 px** (tablet).
- Respetar `prefers-reduced-motion` y `S.settings.voice` (🔊/🔇).
- Paleta pastel + letra Nunito. Botones de 44 px o más.
- Antes de cada fase: resumen de 3-5 líneas y esperar el "sí".
- Al cerrar cada fase: `npm run build` sin errores + resumen corto + commit.
- Antes de editar una función, buscar si se redefine en un archivo posterior (`vHome`, `mascot`, `win`, `finish`, `vAdults`…).
- **Gráficos:** primero Kenney (CC0); si Kenney no tiene la pieza, la ilustración SVG propia de `08-ilustraciones.js`. Toda pieza nueva se anota en `docs/LICENCIAS.md`.

## Estado general
- [x] Fase 0 · Preparar git
- [x] Fase 1 · Sistema visual unificado
- [x] Fase 2 · Biblioteca de ilustraciones SVG (queda como respaldo de Kenney)
- [ ] Fase K · Importar Kenney (recursos, licencias y `ilu()` con imágenes)
- [ ] Fase 3 · Íconos del inicio con Kenney
- [ ] Fase 4 · Escenarios por capas con Kenney
- [ ] Fase 5 · Reconstrucción visual de los juegos (5A–5E)
- [ ] Fase 6 · El animalito dentro de cada escena
- [ ] Fase 7 · Animaciones y transiciones
- [ ] Fase 8 · Recompensas vistosas
- [ ] Fase 9 · Revisión final de calidad

---

## Estrategia gráfica con Kenney (decidida el 2026-11-09)

**Fuente:** paquetes CC0 de Kenney, bajados de las copias oficiales en OpenGameArt (kenney.nl bloquea las descargas automáticas). Detalle de cada paquete en [`docs/LICENCIAS.md`](LICENCIAS.md).

**¿2D o 3D? El motor siempre es 2D** (HTML + CSS + SVG/PNG): nada de WebGL ni librerías 3D, para que funcione fluido en celulares de gama baja y que tocar/arrastrar siga igual de simple. "3D" significa usar los **renders PNG** que Kenney incluye en sus kits 3D (Food Kit, Nature Kit, Mini Shop, Cube Pets). Dan volumen y luz sin costo de rendimiento.

**Regla para elegir:**
- **3D (renders)** en juegos que son "lugares con objetos de verdad" para tocar y coleccionar: tienda, cocina, huerto, laboratorio. Ahí el volumen hace que los objetos se sientan reales.
- **2D plano** en juegos de figuras, letras, números, lógica, creación y en los personajes con cara: se leen mejor y combinan con la interfaz pastel y con el animalito.
- **Nunca mezclar 2D y 3D dentro del mismo objeto de juego.** Una escena puede tener fondo 2D (cielo, colinas) y objetos 3D encima: es lo normal en juegos y se ve coherente.

**La interfaz** (botones, tarjetas, barras, burbujas) sigue con el sistema CSS de la fase 1. El UI Pack de Kenney es brillante y no combina con la paleta pastel. De Kenney solo se usan los **Game Icons / Board Game Icons** como íconos monocromos, coloreados con `mask-image` en el color de la tinta.

### Decisión por juego

| # | Juego | Estilo | Recursos de Kenney | Respaldo SVG propio |
| --- | --- | --- | --- | --- |
| 1 | Pintar | 2D | Splat Pack (manchas, cubeta), Game Icons (herramientas), Animal Redux + Foliage (sellos) | — |
| 2 | Mezcla colores | 2D | Splat Pack, Board Game Icons (matraz) | — |
| 3 | Música | 2D | Emotes (notas), Game Icons (play, grabar, pausa) | **Instrumentos** (Kenney no tiene) |
| 4 | Bloques | 2D | Toy Brick Pack (5 colores), Physics Assets (madera/piedra) | — |
| 5 | Mi jardín | **3D** | Nature Kit (maíz en 4 etapas, zanahoria, calabaza, melón, trigo, flores roja/amarilla/morada, árboles, cercas, macetas) + Food Kit (cosecha: tomate, fresa, sandía, maíz, zanahoria) | girasol, tulipán, rosa, cayena, habichuela, mango, plátano |
| 6 | Acuario | 2D | Fish Pack (peces de colores, algas, rocas, burbujas, arena), Animal Redux (ballena, narval, morsa, pingüino) | pulpo, calamar, cangrejo, langosta, tortuga, delfín, tiburón, medusa |
| 7 | Burbujas | 2D | Fish Pack (burbujas), Puzzle Pack 2 (bolas), Particle Pack | — |
| 8 | Pizzería | **3D** | Food Kit (pizza, queso, tomate en rodajas, hongos, pimiento, salchicha, tabla, caja de pizza) | — |
| 9 | Ordenar | **3D** | Food Kit (comida), Sports Pack (pelotas), Mini Shop (canasta) | — |
| 10 | Encaje de figuras | 2D | Shape Characters (figuras con carita) | — |
| 11 | El tiempo | 2D | Background Elements (sol, luna, nubes, árboles, casa), Emotes (gotas), Particle Pack | — |
| 12 | Traza letras | 2D | Letter Tiles (letra modelo de madera) | — |
| 13 | Cuentas | 2D | Puzzle Pack 2 (bolas de colores) | — |
| 14 | Mi colmado | **3D** | Food Kit (pan, huevo, guineo, leche, jugo, queso, chocolate, aguacate, dulce, arroz, limón, refresco), Mini Shop (caja registradora, exhibidores, canasta, estantes), Cube Pets (clientes) | funda |
| 15 | Granja de sonidos | 2D | Animal Pack Redux (vaca, cerdo, gallina, pato, caballo, chivo, perro), Background Elements (granero/casa, cerca, árboles) | oveja, gato |
| 16 | El reloj | 2D | Board Game Icons (reloj de arena), Background Elements (sol/luna para día y noche) | **reloj** (SVG actual) |
| 17 | Mapas | 2D | Map Pack (marcadores, banderas, brújula) | **mapa de la isla** (SVG actual) |
| 18 | Mi cuerpo | 2D | Toon Characters (figura de referencia, opcional) | **capas del cuerpo** (SVG actual) |
| 19 | Laboratorio | **3D** | Food Kit (objetos que flotan o se hunden), Board Game Icons (matraz) | imanes |
| 20 | Tangram | 2D | Shape Characters (carita al completar) | piezas geométricas |
| 21 | Programa a tu amigo | 2D | Food Kit (manzana meta, render), Puzzle Pack 2 (casillas), Robot Pack (decorado) | — |
| 22 | Laberinto | 2D | Puzzle Pack 2 / Platformer (muros, bandera, estrella) | — |
| 23 | Torre de Hanói | 2D | Puzzle Pack 2 (paletas como discos), Platformer (bandera) | — |
| 24 | Sudoku de frutas | **3D** | Food Kit (manzana, banana, uvas, fresa, pera, cerezas, naranja, piña) | — |
| 25 | Rompecabezas 1-2-3 | 2D | Puzzle Pack 2 (fichas de colores) | — |
| 26 | Balanza | 2D | Platformer (pesas), Food Kit (objetos a pesar) | balanza |
| — | Viste a tu amigo (oculto) | — | Sin cambios | — |
| — | Retos por grado y aventuras | 2D/3D | `emo()` traduce los emojis de las preguntas a Kenney cuando existe la pieza | — |
| — | Recompensas | 2D | Particle Pack (estrellas), Physics/Platformer (estrellas oro/plata/bronce, monedas, gemas), Medals | — |

---

## Fases terminadas

### Fase 0 · Preparar git
La carpeta aún no es un repositorio.
- [x] `git init`, commit inicial con el código actual en `main` (v0.5 tal cual).
- [x] Crear y cambiar a la rama `mejora-grafica`.
- [x] Verificar que `npm run build` funciona antes de tocar nada (línea base).

### Fase 1 · Sistema visual unificado
**Archivos:** `public/css/styles.css`, los 7 `public/js/0X-*.js`, `docs/componentes.html` (nuevo).
- [x] Ampliar `:root` con tokens nuevos (se mantienen los de color existentes):
  - Colores: los actuales + `--white`, `--line-2`, `--paper`, `--paper-2`, `--paper-lav`, `--scrim` y la paleta de ilustración `--c-rosa` … `--c-rosado`.
  - Radios: `--r-xs 8px`, `--r-sm 14px`, `--r-md 18px`, `--r-lg 24px`, `--r-xl 28px`, `--r-pill`.
  - Sombras: `--sh-1`, `--sh-2` (tarjeta), `--sh-3` (flotante), `--sh-btn` (pie del botón), `--sh-press` (hundido), `--sh-drag`.
  - Contorno: `--bw 2px`, `--bw-ilu 3px`.
  - Espacios: `--s-1 4px` … `--s-7 32px`.
  - Letra: `--fs-2xs 11px` … `--fs-8xl 64px` (texto y emojis).
  - Interfaz: `--tap 48px`, `--tap-min 44px`, `--tbar-h 70px`.
  - Movimiento: `--t-fast .15s`, `--t-med .3s`, `--ease-pop`.
- [x] Clases para lo que más se repetía en línea: `.h-sec` (título de sección), `.h-sub`, `.stage` (zona de juego) y `.top h2`.
- [x] Componentes unificados: `.btn` (primario/suave/peligro), `.chip`, `.icon-btn`, `.card`, `.tbar` (barra de herramientas de juguete), `.bubble` (burbuja de diálogo), `.toytile`, `.area`.
- [x] Reemplazar en los 7 JS los valores a mano (`font-size:22px`, `border-radius:…`, colores `#…`) por variables o clases. Solo presentación: no se tocan ids, `data-*` ni lógica.
- [x] `docs/componentes.html`: página de prueba con todos los componentes y la paleta (abrir con `npm run dev` → `/docs/componentes.html`).
- [x] Revisar 390 / 768 px · build · commit `Fase 1: sistema visual unificado`.
- Notas de la fase 1:
  - `--soft` pasó de #8C879A a #6F6A80 para cumplir contraste AA (5.2:1 sobre blanco).
  - Los `<style>` que se inyectaban desde 06 y 07 ahora viven en `styles.css`.
  - Botones de barra: con texto usan `--fs-md`; los de solo emoji reciben la clase `.e` automáticamente (observador en `02-juguetes.js`).
  - Colores de canvas y atributos SVG siguen literales (no aceptan `var()`).
  - Pendiente para fase 8: ventanas emergentes (.tbub) tapan parte del juego unos segundos; títulos largos en encabezado de juguete pasan a 2 líneas.

### Fase 2 · Biblioteca de ilustraciones SVG
**Archivos:** `public/js/08-ilustraciones.js` (nuevo), `index.html`, `02/05/06-*.js`, `docs/catalogo.html` (nuevo).
- [x] Objeto `ILU` + `ilu(nombre, tam)` según `GUIA-ILUSTRACIONES.md` (viewBox 100, contorno `shade(c,-.28)`, luz blanca 35 %, mismo estilo que `creature()`).
- [x] Jardín (16) · Colmado (14) · Mar (14) · Granja (9) · Música (7) = 60 piezas.
- [x] Cargar en `index.html` **antes** de `05-juguetes-nuevos.js`.
- [x] Clase `.ilu` en CSS.
- [x] Reemplazar emojis en Mi jardín, Mi colmado, Acuario, Granja y Música por `ilu()`.
- [x] `docs/catalogo.html` con todas las piezas, su nombre y tamaños 32/48/96.
- [x] Revisar · build · commit `Fase 2: biblioteca de ilustraciones`.
- Notas de la fase 2:
  - 69 piezas: las 60 pedidas + extras (capullo, arbusto, árbol, palmera, gota, canasta, concha, alga, granero) para las etapas del jardín y los decorados.
  - `emo(emoji)` traduce un emoji a su ilustración solo al mostrar; los datos y las comparaciones siguen usando el emoji.
  - Las ilustraciones miden 1.1em por defecto: heredan los tamaños que ya calculaba cada juguete.
  - Colmado: los clientes ahora son animales dibujados (ilu o creature); conejo, oso y mono se cambiaron por búho, león y rana.
  - `o()` acepta colores de 3 dígitos (`shade()` no los entendía).

---

## Fases pendientes

## Fase K · Importar Kenney
**Archivos:** `scripts/kenney.mjs` (nuevo), `scripts/kenney-fuentes.json`, `scripts/kenney-manifiesto.json`, `public/kenney/` (imágenes ya procesadas), `public/js/08-ilustraciones.js`, `vite.config.js`, `package.json`, `.gitignore`, `docs/LICENCIAS.md`, `docs/catalogo.html`.
- [ ] `scripts/kenney-fuentes.json`: URL de cada `.zip` en OpenGameArt.
- [ ] `scripts/kenney.mjs` (`npm run kenney`): descarga los `.zip` a `vendor/kenney/` (fuera de git), los descomprime, y para cada pieza del manifiesto recorta el espacio vacío, la reduce a 256 px y la guarda como `.webp` en `public/kenney/`. Usa `sharp` (dependencia de desarrollo).
- [ ] `scripts/kenney-manifiesto.json`: nombre en Semillita → paquete + archivo original. Una sola fuente de verdad.
- [ ] `ilu()` y `emo()` usan primero la imagen de Kenney (`<img src="/kenney/…webp">`) y, si no existe, el SVG propio. Así **todos los lugares que ya usan `ilu()`/`emo()` cambian solos**, sin tocar la lógica.
- [ ] Íconos monocromos (`kic('play')`) con `mask-image` para las barras de herramientas.
- [ ] El script regenera la sección "Archivos en uso" de `docs/LICENCIAS.md` (pieza → paquete → archivo original).
- [ ] `docs/catalogo.html` muestra cada pieza con su origen (Kenney o SVG propio).
- [ ] Crédito a Kenney en la zona de adultos.
- [ ] Incluir `.webp` en la caché de la PWA (`vite.config.js`); medir el peso total (meta: menos de 3 MB).
- [ ] Revisar · build · commit `Fase K: importar Kenney`.

## Fase 3 · Íconos del inicio con Kenney
**Archivos:** `08-ilustraciones.js`, `04-personajes.js` (`vHome`), `02-juguetes.js` (`vToy`), `styles.css`.
- [ ] Un ícono por juguete visible (26) y por aventura (5), tomado de la pieza más representativa de cada juego (tabla de arriba). Si no hay pieza de Kenney, se usa el SVG propio.
- [ ] Función `toyIcon(t)` (en vez de un campo nuevo en `TOYS`): devuelve la imagen o el emoji de respaldo.
- [ ] Usar el ícono en las tarjetas del inicio, en las aventuras y en el encabezado de cada juguete.
- [ ] Rebote leve al tocar la tarjeta (sin animación con movimiento reducido).
- [ ] Revisar · build · commit `Fase 3: íconos del inicio`.

## Fase 4 · Escenarios por capas con Kenney
**Archivos:** `public/js/09-escenarios.js` (nuevo), juguetes afectados, `styles.css`.
- [ ] `scene(nombre)` arma capas: cielo (CSS), fondo (Background Elements: colinas, árboles, nubes), suelo y detalles.
- [ ] Escenas: Mi jardín (huerto con cercas y árboles), Acuario (arena, rocas y algas del Fish Pack), Mi colmado (estantes y exhibidores del Mini Shop), Granja (granero, cerca y árboles), El tiempo (sol, luna, nubes), Música (escenario sencillo), Laboratorio (mesa y estantes).
- [ ] Parallax suave al tocar o al inclinar el celular; capas fijas con `prefers-reduced-motion`.
- [ ] Capas con `pointer-events:none` para no romper toques ni arrastres.
- [ ] Revisar · build · commit `Fase 4: escenarios`.

## Fase 5 · Reconstrucción visual de los juegos
Cada subfase rehace la **presentación** de sus juegos (escena, objetos, barra, tamaños), según la tabla de decisiones. La lógica, los niveles y los mensajes no cambian. Un commit por subfase.
- [ ] **5A · Lugares (3D):** Mi jardín, Mi colmado, Pizzería, Laboratorio.
- [ ] **5B · Naturaleza (2D):** Acuario, Granja, El tiempo, Burbujas.
- [ ] **5C · Crear (2D):** Pintar, Mezcla colores, Música, Bloques.
- [ ] **5D · Aprender (2D/3D):** Ordenar, Encaje de figuras, Traza letras, Cuentas, El reloj, Mapas, Mi cuerpo, Tangram.
- [ ] **5E · Ingenio y retos:** Programa a tu amigo, Laberinto, Hanói, Sudoku, Rompecabezas, Balanza + imágenes de los Retos por grado vía `emo()`.
- [ ] Por cada juego: captura antes/después a 390 px en la descripción del commit o en `docs/REVISION-VISUAL.md`.

## Fase 6 · El animalito dentro de cada escena
**Archivos:** `04-personajes.js` (`creature`), juguetes afectados.
- [ ] Nueva expresión `sorprendido` en `creature()` (y revisar `feliz` y `pensando`).
- [ ] El animalito del niño (con su especie, color y ropa) en: Jardín (regando), Colmado (tras el mostrador del Mini Shop), Música (con el instrumento elegido), Acuario (buceando), Laboratorio (con bata).
- [ ] Globitos de emoción del Emotes Pack (idea, corazón, nota musical) sobre el animalito.
- [ ] Reacciones (acierto → feliz, algo nuevo → sorprendido, espera → pensando) enlazadas a `tsay()`/`win()` sin cambiar su lógica.
- [ ] Revisar · build · commit `Fase 6: animalito en la escena`.

## Fase 7 · Animaciones y transiciones
**Archivos:** `styles.css`, `01-nucleo.js` (`go`/`render`), juguetes con objetos que caen.
- [ ] Transición entre pantallas: deslizar + desvanecer (Web Animations API en `go()`).
- [ ] Aplastar y rebotar al caer objetos; botones que se hunden.
- [ ] Plantas que se mecen, peces que nadan ondulando (`transform` sobre las imágenes).
- [ ] Solo `transform`/`opacity`, sin librerías; todo desactivado con `prefers-reduced-motion`.
- [ ] Prueba con CPU ×6 más lenta en DevTools · build · commit `Fase 7: animaciones`.

## Fase 8 · Recompensas vistosas
**Archivos:** `03-niveles-ingenio.js` (`win`), `04-personajes.js` (XP, stickers), `styles.css`.
- [ ] Estrellas (Physics/Platformer) que vuelan hasta el contador.
- [ ] Stickers con efecto de despegarse; álbum con animales de Animal Pack Redux y comida del Food Kit.
- [ ] Pantalla de subir de nivel con medalla (Medals) y la ropa nueva del animalito.
- [ ] Alegre sin ser ruidoso: pocas partículas, ≤ 2 s; versión estática con movimiento reducido.
- [ ] Build · commit `Fase 8: recompensas`.

## Fase 9 · Revisión final de calidad
- [ ] Recorrer cada pantalla en 390 px y 768 px; lista de problemas en `docs/REVISION-VISUAL.md` y corregirlos (incluye los pendientes anotados en fases anteriores).
- [ ] Contraste WCAG AA (4.5:1 texto normal, 3:1 texto grande e íconos).
- [ ] Peso de la app y fluidez en gama baja.
- [ ] Verificar que `docs/LICENCIAS.md` lista cada archivo de Kenney en uso.
- [ ] Actualizar `CLAUDE.md` (tokens, `ilu()`/`emo()`/`kic()`, Kenney, `scene()`, animaciones) y `docs/HOJA-DE-RUTA.md`.
- [ ] Build · commit final `Fase 9: revisión de calidad`.
