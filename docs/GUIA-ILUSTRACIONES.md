# Guía de ilustraciones · Semillita (estilo plano)

**Objetivo:** que toda la app parezca dibujada por la misma mano. Cada pieza nueva sigue estas reglas. Si una pieza no las cumple, se redibuja; no se mezcla con otro estilo.

Las piezas viven en `public/js/12-estilo-plano.js`. El catálogo está en `/docs/estilo-plano.html`.

## Reglas
1. **Plano.**
   - Sin degradados, sin brillos blancos y sin 3D.
   - El volumen, si hace falta, se da con una sola forma plana un poco más oscura: `sombra()` y `bola()`.
2. **Contorno suave de 1,6 px.**
   - Mide igual a cualquier tamaño (`vector-effect: non-scaling-stroke`).
   - Su color es el relleno un 32 % más oscuro: `o(color)`. Nunca negro. El blanco usa `#C3C8D6`.
3. **Pocos colores.** Solo la paleta de abajo, repetida en todo: escenas, objetos y botones.
4. **Detalles con líneas finas,** claras (vetas de hojas, rayas) o del tono oscuro (canasta, zanahoria).
5. **Sin caras en los objetos.** Solo los animales llevan ojos de punto, sin brillo.
6. **Vista de frente o de lado,** sin perspectiva.
7. **Toque hecho a mano:** el filtro `#mano` mueve un poco los bordes. Se aplica solo con la clase `.plano`.
8. **Fondos limpios:**
   - Cielo y tierra de un solo color cada uno.
   - Pocas piezas en el fondo, más pequeñas y claras que las del juego.

## Paleta (`PAL` en el código)
| Nombre | Color | Uso |
| --- | --- | --- |
| tinta | #4A4658 | Ojos y líneas finas oscuras |
| blanco / crema | #FFFFFF / #FFF6E6 | Nubes, cercas, papel |
| rosa / coral | #F4A6A6 / #F29A8E | Corazones, tomates, toldos |
| durazno / naranja | #F7C59F / #F6B27C | Frutas, peces |
| mant / amarillo | #F6E39A / #F6D36F | Sol, maíz, estrellas |
| menta / hoja / verde | #B9E3C6 / #A3D69B / #7FC08E | Plantas y colinas |
| cielo / azul | #A9D3F0 / #8DBDE6 | Agua, regadera |
| lav / ros | #C9B8EE / #F5B8D0 | Flores, guantes, libros |
| tierra / madera / cafe | #D9B08A / #E6C39C / #C29A7C | Troncos, canastas |
| gris / grisO | #D9DDE6 / #B4B9C8 | Metal, techos de zinc |
| barro | #EFA98A | Macetas |

## Formato en el código
```js
// En PL (12-estilo-plano.js). viewBox 0 0 100 100.
girasol: () => svg(`${tallo('M50 96 V54')}${petalos(50,36,12,18,6.5,11,K.amarillo)}${C(50,36,12.5,K.cafe)}`),
```
- **Ayudantes:**
  - Con contorno: `P` (trazado), `C` (círculo), `E` (elipse), `R` (rectángulo).
  - Sin contorno: `F` y `D`.
  - Líneas: `L` (sin contorno) y `Lo` (línea gruesa con contorno).
  - Formas compuestas: `hoja`, `tallo`, `petalos`, `estrella`, `anillo`, `bola`.
- `ilu('girasol', 48)` usa primero la pieza plana. Si no existe, recurre a Kenney o a los SVG antiguos de `08-ilustraciones.js`.
- Para que un emoji se muestre dibujado, añádelo a `ILU_EMO` (por ejemplo `'🐞':'mariquita'`). Los datos siguen guardando el emoji.
- Íconos de juguetes: `ti_<id>`. Se conectan solos con `toyIcon()`.

## Estado
- **Ya en estilo plano:** inicio, Mi jardín, el animalito, Mi colmado (clientes = animalitos de la app), Pizzería, Laboratorio y Mezcla colores.
- **Pendiente** (aún con Kenney o SVG antiguos):
  - Grupo B: Acuario, Granja, El tiempo y Burbujas.
  - Grupo C: Pintar, Música y Bloques (Encaje ya usa figuras planas).
  - Grupo D: Ordenar, Torre de Hanói y Sudoku, además de las demás pantallas de aprender.
  - Recompensas: las medallas de subir de nivel.
