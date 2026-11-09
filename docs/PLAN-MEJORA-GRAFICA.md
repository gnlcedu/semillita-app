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

## Estado general
- [ ] Fase 0 · Preparar git
- [ ] Fase 1 · Sistema visual unificado
- [ ] Fase 2 · Biblioteca de ilustraciones SVG
- [ ] Fase 3 · Íconos ilustrados del inicio
- [ ] Fase 4 · Escenarios por capas
- [ ] Fase 5 · El animalito dentro de cada escena
- [ ] Fase 6 · Animaciones y transiciones
- [ ] Fase 7 · Recompensas vistosas
- [ ] Fase 8 · Revisión final de calidad

---

## Fase 0 · Preparar git
La carpeta aún no es un repositorio.
- [ ] `git init`, commit inicial con el código actual en `main` (v0.5 tal cual).
- [ ] Crear y cambiar a la rama `mejora-grafica`.
- [ ] Verificar que `npm run build` funciona antes de tocar nada (línea base).

## Fase 1 · Sistema visual unificado
**Archivos:** `public/css/styles.css`, los 7 `public/js/0X-*.js`, `docs/componentes.html` (nuevo).
- [ ] Ampliar `:root` con tokens nuevos (mantener los de color existentes):
  - Colores: los actuales + `--ink-line` (contorno), `--white`, `--shadow-c`.
  - Radios: `--r-xs 10px`, `--r-sm 14px`, `--r-md 18px`, `--r-lg 24px`, `--r-pill 999px`.
  - Sombras: `--sh-1` (suave), `--sh-2` (tarjeta), `--sh-press` (botón hundido).
  - Contorno: `--bw 2px`, `--bw-ilu 3px`.
  - Espacios: `--s-1 4px` … `--s-6 32px`.
  - Letra: `--fs-xs 13px`, `--fs-sm 15px`, `--fs-md 17px`, `--fs-lg 20px`, `--fs-xl 24px`, `--fs-2xl 32px`.
  - Movimiento: `--t-fast .15s`, `--t-med .3s`, `--ease-pop`.
- [ ] Clases de utilidad para lo que más se repite en línea (`.h2`, `.stack`, `.gap-*`, `.mt-*`, `.fs-*`).
- [ ] Componentes unificados: `.btn` (primario/suave/peligro), `.chip`, `.icon-btn`, `.card`, `.tbar` (barra de herramientas de juguete), `.bubble` (burbuja de diálogo), `.toytile`, `.area`.
- [ ] Reemplazar en los 7 JS los valores a mano (`font-size:22px`, `border-radius:…`, colores `#…`) por variables o clases. Solo presentación: no se tocan ids, `data-*` ni lógica.
- [ ] `docs/componentes.html`: página de prueba con todos los componentes y la paleta (abrir con `npm run dev` → `/docs/componentes.html`).
- [ ] Revisar 390 / 768 px · build · commit `Fase 1: sistema visual unificado`.

## Fase 2 · Biblioteca de ilustraciones SVG
**Archivos:** `public/js/08-ilustraciones.js` (nuevo), `index.html`, `02/05/06-*.js`, `docs/catalogo.html` (nuevo).
- [ ] Objeto `ILU` + `ilu(nombre, tam)` según `GUIA-ILUSTRACIONES.md` (viewBox 100, contorno `shade(c,-.28)`, luz blanca 35 %, mismo estilo que `creature()`).
- [ ] Jardín (16) · Colmado (14) · Mar (14) · Granja (9) · Música (7) = 60 piezas.
- [ ] Cargar en `index.html` **antes** de `05-juguetes-nuevos.js`.
- [ ] Clase `.ilu` en CSS.
- [ ] Reemplazar emojis en Mi jardín, Mi colmado, Acuario, Granja y Música por `ilu()`.
- [ ] `docs/catalogo.html` con todas las piezas, su nombre y tamaños 32/48/96.
- [ ] Revisar · build · commit `Fase 2: biblioteca de ilustraciones`.

## Fase 3 · Íconos ilustrados del inicio
**Archivos:** `08-ilustraciones.js`, `04-personajes.js` (`vHome`), `styles.css`.
- [ ] Un ícono ILU por cada juguete visible (27) y por las 5 aventuras (Retos por grado, Cálculo mental, Lectura en voz alta, Mundo de inglés, Cuentos).
- [ ] Campo `ilu` en cada entrada de `TOYS` (con el emoji como respaldo si falta).
- [ ] `vHome` usa `ilu()` en tarjetas y aventuras.
- [ ] Animación leve al tocar la tarjeta (rebote corto; sin animación con movimiento reducido).
- [ ] Agregar los íconos al catálogo · build · commit `Fase 3: íconos del inicio`.

## Fase 4 · Escenarios por capas
**Archivos:** `public/js/09-escenarios.js` (nuevo), juguetes afectados, `styles.css`.
- [ ] Función `scene(nombre)` que devuelve capas SVG: cielo, fondo, suelo, detalles.
- [ ] Escenas: Mi jardín, Acuario, Mi colmado, Granja, El tiempo, Música, Laboratorio.
- [ ] Parallax suave al tocar/arrastrar y con `deviceorientation` (pidiendo permiso en iOS); límite de pocos px.
- [ ] Con `prefers-reduced-motion`: capas fijas, sin escuchar sensores.
- [ ] Las capas van detrás de la zona de juego (`pointer-events:none`) para no romper toques ni `dragify`.
- [ ] Revisar · build · commit `Fase 4: escenarios por capas`.

## Fase 5 · El animalito dentro de cada escena
**Archivos:** `04-personajes.js` (`creature`), juguetes afectados.
- [ ] Nueva expresión `sorprendido` en `creature()` (y revisar `feliz`, `pensando`).
- [ ] Animalito del niño (especie, color y ropa de su perfil) en: Jardín (regando), Colmado (tras el mostrador), Música (con el instrumento elegido), Acuario (con careta de buceo), Laboratorio (con bata).
- [ ] Reacciones según lo que hace el niño (acierto → feliz, algo nuevo → sorprendido, espera → pensando), enlazadas a `tsay()`/`win()` sin cambiar su lógica.
- [ ] Revisar · build · commit `Fase 5: animalito en la escena`.

## Fase 6 · Animaciones y transiciones
**Archivos:** `styles.css`, `01-nucleo.js` (`go`/`render`), juguetes con objetos que caen.
- [ ] Transición entre pantallas: deslizar + desvanecer (Web Animations API en `go()`).
- [ ] Aplastar y rebotar al caer objetos; botones que se hunden (`:active` + `--sh-press`).
- [ ] Plantas que se mecen, peces que mueven la cola (CSS `transform` en partes del SVG).
- [ ] Solo `transform`/`opacity`, sin librerías; pausar animaciones fuera de pantalla.
- [ ] Todo desactivado con `prefers-reduced-motion`.
- [ ] Prueba con CPU ×6 más lenta en DevTools · build · commit `Fase 6: animaciones`.

## Fase 7 · Recompensas vistosas
**Archivos:** `03-niveles-ingenio.js` (`win`), `04-personajes.js` (XP, stickers), `styles.css`.
- [ ] Estrellas ganadas vuelan al contador (`.stars-pill`).
- [ ] Stickers aparecen con efecto de despegarse.
- [ ] Pantalla de subida de nivel: animalito con la ropa nueva desbloqueada, colores suaves, sonido corto, se cierra al tocar.
- [ ] Alegre sin ser ruidoso: pocas partículas, sin destellos, duración ≤ 2 s; versión estática con movimiento reducido.
- [ ] Build · commit `Fase 7: recompensas`.

## Fase 8 · Revisión final de calidad
- [ ] Recorrer cada pantalla en 390 px y 768 px: inicio, perfiles, cada juguete, retos, Mi amigo, álbum, aventuras, zona de adultos.
- [ ] Lista de problemas (textos cortados, elementos encimados, contraste bajo, botones < 44 px) en `docs/REVISION-VISUAL.md` y corregirlos.
- [ ] Contraste WCAG AA (4.5:1 texto normal, 3:1 texto grande e íconos).
- [ ] Actualizar `CLAUDE.md` con las convenciones gráficas (tokens, `ilu()`, `scene()`, animaciones) y la hoja de ruta.
- [ ] Build · commit final `Fase 8: revisión de calidad`.
