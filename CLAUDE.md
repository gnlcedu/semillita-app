# CLAUDE.md · Guía para trabajar en Semillita

## Contexto
App educativa para niños de 5 a 12 años (República Dominicana), estilo Pok Pok: juego libre, calmado, sin ganar ni perder, con retos opcionales por nivel. Idioma de la interfaz: **español** (inglés solo en la sección de inglés). Docente responsable: German Lopez.

## Arquitectura actual (v0.5)
- Vite sirve `index.html`, que carga **scripts clásicos** desde `public/js/` en este orden. **Comparten variables globales**; el orden importa:
  1. `01-nucleo.js` — estado `S` (localStorage `semillita.v1`), utilidades (`rnd`, `pick`, `shuffle`, `Q`, `NQ`), generadores de los 20 retos por grado (`GAMES`), voz `speak()`, sonido `tone()`, vistas base (`render`, `go`, perfiles, retos, zona de adultos).
  2. `02-juguetes.js` — sala de juegos (`TOYS`), utilidades de juguetes (`tsay`, `note`, `dragify`, `addHTML`), 14 juguetes originales.
  3. `03-niveles-ingenio.js` — niveles por edad (`LV()`, `setLV`, `win()`), versiones con retos y 6 juegos de ingenio.
  4. `04-personajes.js` — `creature(especie, opciones)` (SVG de los animalitos), accesorios `ACC`, XP/niveles, stickers, pantalla "Mi amigo", inicio `vHome`.
  5. `05-juguetes-nuevos.js` — colmado, granja, reloj, mapas, cuerpo, laboratorio, tangram.
  6. `06-juguetes-completos.js` — Pintar, Mi jardín, Música (7 instrumentos), Acuario y Bloques completos.
  7. `07-aprender-adultos.js` — cuentos, lectura, cálculo mental, inglés, modo aula, reporte, límite de tiempo e **inicio de la app** (`render()` al final).
- Varias funciones se **sobrescriben** en archivos posteriores (por ejemplo `vHome`, `mascot`, `win`, `finish`, `vAdults`). Antes de editar una función, busca si se redefine más adelante.
- Vistas extra se registran en `window.VIEWS[nombre]`.
- `src/main.js` es un módulo ES: solo carga la letra Nunito y registra la PWA.

## Cómo agregar un juguete
```js
function toyNuevo(root){
  const lv = LV();                 // 1, 2 o 3 según la edad
  addHTML(root, `<div class="abs" style="inset:0 0 70px 0"></div><div class="tbar">…</div>`);
  // usa tsay('texto') para que el animalito hable, win('mensaje') al cumplir un reto
  return () => { /* limpiar intervalos y timers */ };
}
TOYS.push({id:'nuevo', name:'Nombre', icon:'🎈', c:'mint', open:toyNuevo, hi:'Saludo inicial', hi2:'Saludo para niveles 2 y 3'});
```
Colores de tarjeta (`c`): peach, rose, mint, sky, lav, butter, sage. Agrega `brain:true` para la sección "Retos de ingenio".

## Convenciones
- Diseño minimalista, paleta pastel (tokens en `styles.css`), letra Nunito, botones de 44 px o más.
- Sin anuncios, sin compras, sin cronómetros que presionen en juego libre; el error siempre muestra la respuesta correcta.
- Contenido dominicano cuando aplique (colmado, zafacón, pesos RD$, merengue).
- Todo `localStorage` dentro de `try/catch`.
- Respeta `S.settings.voice` (botón 🔊/🔇) y `prefers-reduced-motion`.
- Verifica en un ancho de 390 px (celular) antes de dar algo por terminado.

## Siguiente trabajo (ver docs/HOJA-DE-RUTA.md)
1. Biblioteca de ilustraciones SVG propias para sustituir emojis (docs/GUIA-ILUSTRACIONES.md).
2. Íconos ilustrados para cada juguete y escenarios por capas.
3. El animalito dentro de cada escena.
4. Sonidos grabados en `public/sonidos/`.
5. Migración gradual a módulos ES (un archivo por juguete) cuando la app esté estable.
