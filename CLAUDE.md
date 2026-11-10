# CLAUDE.md · Guía para trabajar en Semillita

## Contexto
App educativa para niños de 5 a 12 años (República Dominicana), estilo Pok Pok: juego libre, calmado, sin ganar ni perder, con retos opcionales por nivel. Idioma de la interfaz: **español** (inglés solo en la sección de inglés). Docente responsable: German Lopez.

## Arquitectura actual (v0.6)
- Vite sirve `index.html`, que carga **scripts clásicos** desde `public/js/` en este orden. **Comparten variables globales**; el orden importa:
  1. `01-nucleo.js` — estado `S` (localStorage `semillita.v1`), utilidades (`rnd`, `pick`, `shuffle`, `Q`, `NQ`), generadores de los 20 retos por grado (`GAMES`), voz `speak()`, sonido `tone()`, vistas base (`render`, `go`, perfiles, retos, zona de adultos), `react()`.
  2. `02-juguetes.js` — sala de juegos (`TOYS`), utilidades de juguetes (`tsay`, `note`, `dragify`, `addHTML`), 14 juguetes originales.
  3. `03-niveles-ingenio.js` — niveles por edad (`LV()`, `setLV`, `win()`), versiones con retos y 6 juegos de ingenio.
  4. `04-personajes.js` — `creature(especie, opciones)` (SVG de los animalitos), accesorios `ACC`, XP/niveles, stickers, pantalla "Mi amigo", inicio `vHome`.
  5. `/kenney/kenney.js` — **generado** por `npm run kenney`: lista de imágenes de Kenney (`window.KENNEY`).
  6. `08-ilustraciones.js` — `ILU` (SVG propios), `ilu()`, `emo()`, `kic()`, `toyIcon()`, `emoDOM()`.
  7. `09-escenarios.js` — `scene()`, `sceneParallax()`, `scenePet()`, `setPetProp()`; envuelve `tsay` para la expresión de sorpresa.
  8. `10-animaciones.js` — entrada de pantallas (envuelve `go`), `squash()`, `landSquash()`.
  9. `11-recompensas.js` — `flyStars()`, `showLevelUp()`; envuelve `win`, `giveSticker` y `addXP` (misma lógica y datos).
  10. `05-juguetes-nuevos.js` — colmado, granja, reloj, mapas, cuerpo, laboratorio, tangram.
  11. `06-juguetes-completos.js` — Pintar, Mi jardín, Música (7 instrumentos), Acuario y Bloques completos.
  12. `07-aprender-adultos.js` — cuentos, lectura, cálculo mental, inglés, modo aula, reporte, límite de tiempo e **inicio de la app** (`render()` al final).
- Varias funciones se **sobrescriben** en archivos posteriores (`vHome`, `mascot`, `win`, `finish`, `vAdults`, `go`, `tsay`, `giveSticker`, `addXP`). Antes de editar una función, busca si se redefine más adelante.
- Vistas extra se registran en `window.VIEWS[nombre]`.
- `src/main.js` es un módulo ES: solo carga la letra Nunito y registra la PWA.

## Cómo agregar un juguete
```js
function toyNuevo(root){
  const lv = LV();                 // 1, 2 o 3 según la edad
  addHTML(root, `${scene('jardin','inset:0 0 var(--tbar-h) 0')}
    <div class="stage"></div><div class="tbar"><button>${kic('play')} Jugar</button></div>`);
  sceneParallax(root);             // capas que se mueven un poco (opcional)
  // usa tsay('texto') para que el animalito hable, win('mensaje') al cumplir un reto
  return () => { /* limpiar intervalos y timers */ };
}
TOYS.push({id:'nuevo', name:'Nombre', icon:'🎈', c:'mint', open:toyNuevo, hi:'Saludo inicial', hi2:'Saludo para niveles 2 y 3'});
```
- Colores de tarjeta (`c`): peach, rose, mint, sky, lav, butter, sage.
- Agrega `brain:true` para la sección "Retos de ingenio".
- Para el ícono del inicio, añade `nuevo:'nombre_de_pieza'` a `TOY_ILU` en `08-ilustraciones.js`. El `icon` emoji queda como respaldo.

## Sistema visual (docs/PLAN-MEJORA-GRAFICA.md)
- **Tokens en `public/css/styles.css`.** Úsalos siempre, en CSS y en los estilos dentro del JS:
  - Colores: `--ink`, `--soft`, `--paper`, `--c-rosa` …
  - Radios: `--r-xs` … `--r-pill`.
  - Sombras: `--sh-1`, `--sh-2`, `--sh-3`, `--sh-btn`, `--sh-press`.
  - Espacios: `--s-1` … `--s-7`.
  - Letra: `--fs-2xs` … `--fs-8xl`.
  - Medidas: `--tap`, `--tbar-h`.
  - Excepción: el canvas y los atributos SVG no aceptan `var()`.
- **Componentes:**
  - Básicos: `.btn` (`.soft`, `.full`), `.chip`, `.icon-btn`, `.card`, `.bubble`, `.tbar` / `.pbar` + `.prow`, `.toytile`, `.area`, `.stage`, `.h-sec`.
  - Todo lo que se toca tiene "pie" de sombra y se hunde al tocarlo.
  - Página de prueba: `/docs/componentes.html`.
- **Gráficos: Kenney primero, SVG propio como respaldo.**
  - `ilu('nombre', tam)` muestra la pieza.
  - `emo('🍎')` muestra la ilustración de un emoji. Los datos y las comparaciones siguen usando el emoji.
  - `kic('play')` da un ícono monocromo que toma el color del texto.
  - `toyIcon(t)` da el ícono de un juguete.
  - Catálogo: `/docs/catalogo.html`.
- **Agregar una imagen de Kenney:**
  1. Añádela a `scripts/kenney-manifiesto.json`. Puede ser `.png`, `.svg` o `.glb`; los modelos 3D se renderizan solos.
  2. Corre `npm run kenney`, que necesita Chrome o Edge instalado.
  3. El script regenera `public/kenney/`, `kenney.js` y la tabla de `docs/LICENCIAS.md`.
  4. Los `.zip` viven en `vendor/` (fuera de git) y se descargan de OpenGameArt. kenney.nl bloquea las descargas automáticas: no lo esquives.
- **Decisión 2D/3D:** el motor siempre es 2D.
  - "3D" = renders de modelos de Kenney, en los lugares con objetos (colmado, pizzería, jardín, laboratorio, ordenar, sudoku).
  - 2D plano en figuras, letras, lógica y personajes.
- **`emoDOM`:** convierte emojis a ilustraciones solo en `.visual`, `.egrid`, `.lesson-v`, `.story-scene` y `.opts .opt`. Las opciones se comprueban por posición (`data-i`). **No lo apliques a elementos cuyo texto lea el código**, como las cartas de memoria.
- **Escenas y animalito:**
  - `scene('jardin'|'granja'|'acuario'|'colmado'|'tiempo'|'musica'|'laboratorio'|'bloques')` va detrás del juego, sin recibir toques.
  - `scenePet(root, {at, size, prop, cls})` pone el animalito del niño. `react('happy'|'sad'|'surprised'|'think')` lo hace reaccionar.
- **Movimiento:**
  - Solo `transform` y `opacity`, con CSS o Web Animations API, sin librerías.
  - Toda animación se apaga con `prefers-reduced-motion`, por la regla global y la variable `RM`. Si un juego depende de una animación para mostrar algo (por ejemplo, objetos que suben), da una versión quieta con `RM`.

## Convenciones
- Diseño minimalista, paleta pastel, letra Nunito, botones de 44 px o más (o con área táctil ampliada).
- Contraste WCAG AA: 4,5:1 para texto normal y 3:1 para texto grande. Los subtítulos sobre tarjetas pastel usan `#5A566B`.
- Sin anuncios, sin compras, sin cronómetros que presionen en juego libre; el error siempre muestra la respuesta correcta.
- Recompensas alegres pero calmadas: pocas piezas, menos de 2 s, sin destellos.
- Contenido dominicano cuando aplique (colmado, zafacón, pesos RD$, merengue).
- Todo `localStorage` dentro de `try/catch`. No cambies el formato de `semillita.v1`.
- Respeta `S.settings.voice` (botón de voz) y `prefers-reduced-motion`.
- Verifica en 390 px (celular) y 768 px (tablet) antes de dar algo por terminado. Ver `docs/REVISION-VISUAL.md`.
- Cada gráfico externo nuevo se anota en `docs/LICENCIAS.md`.

## Siguiente trabajo (ver docs/HOJA-DE-RUTA.md)
1. Sonidos grabados o licenciados en `public/sonidos/` (Kenney tiene paquetes CC0 de sonidos de interfaz).
2. Más contenido: cuentos, lecturas por grado, Mezcla colores, Pizzería y El tiempo.
3. Migración gradual a módulos ES (un archivo por juguete) cuando la app esté estable.
