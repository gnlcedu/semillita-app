# Prompts listos para Claude Code

Copia uno a la vez en el chat de Claude Code (VS Code). Revisa el resultado con `npm run dev` antes de pasar al siguiente.

## 1. Revisión inicial
```
Lee CLAUDE.md y revisa el proyecto. Ejecuta npm run build y dime si hay errores o advertencias. No cambies nada todavía; dame un resumen de la arquitectura y 5 riesgos técnicos.
```

## 2. Biblioteca de ilustraciones (jardín)
```
Siguiendo docs/GUIA-ILUSTRACIONES.md, crea public/js/08-ilustraciones.js con un objeto ILU y la función ilu(nombre, tam). Dibuja las 16 piezas del jardín en SVG. Cárgalo en index.html antes de 06-juguetes-completos.js. Luego reemplaza los emojis de toyGarden2 por ilu(). Verifica en 390 px de ancho.
```

## 3. Íconos del inicio
```
Dibuja en ILU un ícono por cada juguete de TOYS (27) con el estilo de la guía y úsalos en las tarjetas de vHome (04-personajes.js) en lugar de los emojis.
```

## 4. Escenarios por capas
```
Para Mi jardín, Acuario y Mi colmado, crea fondos SVG por capas (cielo, fondo, suelo) con un movimiento leve al tocar (parallax). Respeta prefers-reduced-motion.
```

## 5. El animalito en la escena
```
Usa creature() para mostrar el animalito del niño dentro de la escena de Mi jardín (regando), Mi colmado (detrás del mostrador) y Música (tocando el instrumento elegido). Que reaccione con react('happy') al cumplir un reto.
```

## 6. Sonidos grabados
```
Crea un módulo de sonidos que cargue archivos de public/sonidos/ con un respaldo a los sonidos sintetizados actuales si el archivo no existe. Agrega en la zona de adultos un botón aparte para efectos de sonido.
```
