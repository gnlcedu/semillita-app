# Guía de ilustraciones · Semillita

Objetivo: que **todo** se vea del mismo estilo que los animalitos y igual en cualquier celular (los emojis cambian según el dispositivo).

## Estilo
- SVG con `viewBox="0 0 100 100"`, formas redondeadas y sin esquinas filosas.
- Contorno de 3 a 4 px en un tono **28 % más oscuro** que el relleno (función `shade(color, -.28)` ya existe).
- Relleno pastel plano; una sola luz suave (elipse blanca al 35 %).
- Caras simples: ojos de punto con brillo y mejillas rosadas cuando el objeto tiene "personalidad".
- Sin degradados fuertes, sin sombras realistas, sin texto dentro.

## Paleta base
| Uso | Color |
| --- | --- |
| Fondo | #FBF8F3 |
| Texto / contorno oscuro | #4A4658 |
| Rosa | #F4A6A6 · Durazno #F7C59F · Mantequilla #F6E39A |
| Menta | #B9E3C6 · Cielo #A9D3F0 · Lavanda #C9B8EE · Rosado #F5B8D0 |

## Formato en el código
```js
const ILU = {
  manzana: c => `<svg viewBox="0 0 100 100">…</svg>`,
  // …
};
const ilu = (nombre, tam=48) => `<span class="ilu" style="width:${tam}px;height:${tam}px">${ILU[nombre]()}</span>`;
```

## Lista prioritaria (≈75 piezas)
- **Jardín (16):** semilla, brote, planta, girasol, tulipán, rosa, cayena, tomate, maíz, fresa, zanahoria, sandía, habichuela, mango, plátano, regadera.
- **Colmado (14):** pan, huevo, guineo, leche, jugo, queso, chocolate, aguacate, dulce, arroz, limón, refresco, funda, caja registradora.
- **Mar (14):** pez, pez tropical, pez globo, pulpo, calamar, cangrejo, langosta, tortuga, delfín, tiburón, ballena, medusa, castillo, coral.
- **Granja (9):** vaca, cerdo, gallina, oveja, caballo, pato, perro, gato, chivo.
- **Música (7):** piano, guitarra, flauta, violín, batería, xilófono, tambora y güira.
- **Íconos de inicio (27):** uno por juguete.

## Opción profesional
Para un acabado con textura hecha a mano, encargar a un ilustrador las mismas piezas en SVG siguiendo esta guía, o usar un paquete con **licencia comercial** que permita modificarlo. Guardar los archivos en `public/ilustraciones/`.
