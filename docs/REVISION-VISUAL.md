# Revisión visual final · Fase 9

Fecha: 2026-11-09 · Rama `mejora-grafica`.

## Cómo se revisó

- **Pantallas:** perfiles, inicio, los 26 juguetes, Retos por grado, Cálculo mental, Lectura en voz alta, Mundo de inglés, Cuentos, Mi amigo, zona de adultos, ruta de un área, una pregunta y la pantalla de resultado.
- **Anchos:** 390 px (celular) y 768 px (tablet), en Chrome sin ventana con emulación móvil.
- **Auditoría automática en cada pantalla:**
  - Desborde horizontal.
  - Textos cortados o fuera de la pantalla.
  - Botones de menos de 40 px.
  - Contraste de texto según WCAG AA: 4,5:1 para texto normal y 3:1 para texto grande (24 px, o 18,6 px en negrita).
- La auditoría se validó con un caso trampa: un texto gris claro y un botón de 20 px que sí detectó.
- **Revisión a ojo** con capturas de cada juguete durante las fases 4 a 8.
- **Fluidez:** CPU 6 veces más lenta → 60 cuadros por segundo en inicio, acuario, jardín y granja; ningún cuadro pasó de 17 ms.
- **Errores:** recorrido por los 26 juguetes y todas las vistas, sin ningún error de JavaScript.

## Problemas encontrados y corregidos

| # | Problema | Dónde | Corrección |
| --- | --- | --- | --- |
| 1 | Subtítulos con poco contraste (3,4 a 3,6:1) | Tarjetas de aventuras, áreas de Retos por grado, Cuentos | `.area small` pasa a `#5A566B`: al menos 5,3:1 sobre todas las tarjetas pastel |
| 2 | "llita" del logo con 2,4:1 | Perfiles e inicio | `#4C8F6C`: 3,6:1, que es AA para texto grande |
| 3 | Gris de texto secundario con 3,5:1 | Toda la app | `--soft` a `#6F6A80`: 5,2:1 (fase 1) |
| 4 | Botón "+10" blanco sobre dorado (2,4:1) | Cuentas, nivel 2 y 3 | Fondo `#7D6620`: 5,5:1 |
| 5 | Interruptores de 30 px de alto | Zona de adultos | Borde transparente: área táctil de 44 px sin cambiar el dibujo |
| 6 | Botón de voz chico | Encabezado de aventuras | `.vt` mide al menos 44 × 44 px |
| 7 | Colores de 26 px | Bloques | 30 px más área táctil invisible: 42 px |
| 8 | El título partía palabras ("Laboratori / o") | Encabezado de juguetes a 390 px | Ícono, margen y chip de nivel más compactos a ≤ 400 px; ningún título de los 26 juguetes parte palabras |
| 9 | Chip de nivel muy ancho | Encabezado de juguetes en celular | A ≤ 480 px muestra solo las estrellas (con `aria-label`) |
| 10 | Burbujas invisibles con movimiento reducido | Burbujas | Con `prefers-reduced-motion` aparecen quietas en lugares al azar y se van solas (fase 5B) |
| 11 | El emoji del título ocupaba una línea sola | Encabezado de juguetes | El ícono va fuera del `<h2>` (fase 3) |
| 12 | Botones de barra con texto en letra gigante | Barras de herramientas | Texto en `--fs-md`; solo los emojis solos usan `.e` (fase 1) |
| 13 | Ilustración desbordada en un botón de barra | Acuario, "➕🐠" | Contenido en fila (`grid-auto-flow:column`) (fase K) |

## Revisado y aceptado

- **Teclas del piano (unos 38 × 200 px a 390 px):** son estrechas por naturaleza. Superan el mínimo de 24 px de WCAG 2.2 y el teclado no cabe de otra forma.
- **Burbuja de ayuda del juguete:** tapa parte del juego unos 3 segundos. No bloquea toques (`pointer-events:none`) y a ≤ 400 px es más pequeña.
- **Líneas de solo emojis:** la auditoría las marca por "contraste", pero los emojis son imágenes y no aplica.
- **Texto para lectores de pantalla (`.sr`):** aparece como "cortado" porque está oculto a propósito.
- **Estilos mezclados:** en algunos juegos conviven piezas de Kenney con SVG propios, como las flores del jardín o la oveja y el gato de la granja, porque Kenney no las tiene. Están anotados en `docs/LICENCIAS.md`.

## Resultado

La auditoría final no deja problemas reales a 390 ni a 768 px. Su único aviso son los colores de Bloques: los mide por su tamaño visible (30 px), pero su área táctil es de 42 px (fila 7). El build termina sin errores y la caché de la app sin conexión pesa 1,5 MB.
