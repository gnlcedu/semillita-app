# CLAUDE.md · Guía para trabajar en Semillita

## Contexto
App educativa para niños de 5 a 12 años (República Dominicana), estilo Pok Pok: juego libre, calmado, sin ganar ni perder, con retos opcionales por nivel. Idioma de la interfaz: **español** (inglés solo en la sección de inglés). Docente responsable: German Lopez.

## Arquitectura actual (v0.6)
- Vite sirve `index.html`, que carga **scripts clásicos** desde `public/js/` en este orden. **Comparten variables globales**; el orden importa:
  1. `01-nucleo.js` — estado `S` (localStorage `semillita.v1`), utilidades (`rnd`, `pick`, `shuffle`, `Q`, `NQ`), generadores de los 20 retos por grado (`GAMES`), voz `speak()`, sonido `tone()`, vistas base (`render`, `go`, perfiles, retos, zona de adultos), `react()`.
  2. `02-juguetes.js` — sala de juegos (`TOYS`), utilidades de juguetes (`tsay`, `note`, `dragify`, `addHTML`), 14 juguetes originales.
  3. `03-niveles-ingenio.js` — niveles por edad (`LV()`, `setLV`, `win()`), versiones con retos y 6 juegos de ingenio.
  4. `04-personajes.js` — `creature(especie, opciones)` (SVG de los animalitos), accesorios `ACC`, XP/niveles (`LEVELN` y `XPT`: 10 niveles, de Semillita a Guardián de la naturaleza; cada nivel abre ropa y accesorios del animalito en `ACC` y del niño en `NINO_OPC`), stickers, pantalla "Mi amigo", inicio `vHome`.
  5. `/kenney/kenney.js` — **generado** por `npm run kenney`: lista de imágenes de Kenney (`window.KENNEY`).
  6. `08-ilustraciones.js` — `ILU` (SVG propios), `ilu()`, `emo()`, `kic()`, `toyIcon()`, `emoDOM()`.
  7. `09-escenarios.js` — `scene()`, `sceneParallax()`, `scenePet()`, `setPetProp()`; envuelve `tsay` para la expresión de sorpresa.
  - `17-entorno.js` (se carga justo antes de `12`) — **generado** por `npm run entorno`: piezas de paisaje 2D (`window.ENTORNO`: pinos, árboles, casas, cerca, montañas, algas, corales, rocas y piezas `p_*` de plataformas; formas de Kenney «Background Elements», «Fish Pack» y «Platformer Pack Redux», CC0, recoloreadas a pastel). Se dibujan con `ent(nombre, x, y, alto, color)` dentro de una lámina (definido en `12`, pone el contorno plano) o con `entS(nombre, css, clase, color)` como pieza suelta (en `14`).
  8. `12-estilo-plano.js` — **estilo plano** (`PLANO`, paleta `PAL`); envuelve `ilu`, `kic` e `iluFuente` para usar primero las piezas planas, y reemplaza la escena del jardín.
  9. `13-plano-lugares.js` — piezas planas de colmado, pizzería, laboratorio y mezcla; animaciones `volar`, `entrar`/`salir`, `temblar`, `ondas`, `gotitas`, `burbujitas`, `hornear`, `vapor`, `migas`, `remolino`; `sparks` plano; escena del colmado.
  10. `14-plano-mundo.js` — redibuja en plano las piezas SVG antiguas de 08 y agrega el resto (mar, granja, música, retos, stickers, personas, ropa…); íconos monocromos; escenas del acuario, granja, tiempo y bloques; `sonar()`, `relampago()`.
  - `19-nino.js` (se carga justo después de `14`) — **niño o niña del jugador**: `nino(datos, {solo:'cabeza'})` dibuja por capas en estilo plano (piel, cara, ojos, cejas, nariz, expresión, pelo, ropa, zapatos y accesorios en 5 ranuras); `NINO_OPC` (opciones con nombre y nivel), `NINO_DEF`, `ninoAzar(nivel)`, `ninoMascot(datos, tam, id)`. Usa las mismas clases de expresión que `creature()`, así `react()` lo anima. Se guardará en `p.nino` (campo opcional; `semillita.v1` no cambia). Piel, cara y pelo siempre libres. Catálogo: `/docs/personajes.html`.
  - `20-mi-personaje.js` (justo después de `19`) — editor `VIEWS.miNino` («Mi personaje»: pestañas Cara, Pelo, Ropa, Zapatos, Cosas y Gestos, botón «Al azar»; muestra al niño junto a su animalito). Envuelve `vNewProfile` (al crear el perfil sigue al editor con `nuevo:true`) y `vHome` (botón «Mi personaje»). `ninoDe(p)` da los datos completos del personaje de un perfil. **Fase 3** (si el perfil tiene `p.nino`): el niño saluda junto a su animalito en el inicio (`#nin`), aparece en las tarjetas de perfil (`vProfiles`) y en las escenas de los juguetes (`scenePet` agrega `#scn` del lado que mira al centro y le pasa la pieza del juguete: delantal, bata, regadera, careta, instrumento). `react()` del animalito también hace reaccionar al niño. **A nivel del piso:** `modoPet(p, agua)` da `vuela` (mariposa, abeja, búho, cotorra), `nada` (delfín, pulpo y tortuga, solo en el agua) o `piso`; `scenePet` y el inicio ponen la clase `pet-…`. Todos los demás van parados en el piso de cada escena (colmado: detrás del mostrador; jardín: en la tierra delante de la cerca; acuario: en la arena). En el agua (`scenePet({agua:true})`) el niño va de buzo (`nino(d,{buzo:true})`: traje, careta, tanque y aletas) y los animalitos que no son marinos llevan casco (`creature(sp,{casco:true})`). Las piezas de los juguetes (delantal, bata, regadera, instrumento) se dibujan dentro del niño con `nino(d,{pieza:{svg,x,y,w,h,capa}})` para que se muevan con él; `setPetProp` lo vuelve a dibujar. `ficha(cont, el, {emoji,nombre,texto})` (en `09`) muestra y lee una tarjetita sobre un animal (acuario y granja). La sombra va bajo los pies (`.mascot .shadow` con margen negativo). Las cejas normales del niño van en `.cj` y se esconden durante triste, pensando y sorpresa.
  - `21-animales.js` (justo después de `20`) — **los 12 animalitos redibujados** como animales reales en estilo «bebé sentado» (cabeza grande, panza y hocico claros, almohadillas, mejillas; contorno de 2,2 px). Reemplaza `creature(sp, o)` (misma firma) y envuelve `petOf` (agrega `rasgos`) y `vFriend` (pestaña «Cómo es»). `ESPECIES[sp].rasgos` define lo que se personaliza en cada especie, solo con opciones que existen en la naturaleza (melena, caparazón, alas…); se guarda en `p.rasgos` (campo opcional). Los accesorios de `ACC` se colocan con los anclajes `anc` de cada especie. Mariposa y abeja vuelan; delfín y pulpo van en su forma marina; la tortuga va de lado.
  - `22-recompensas-b.js` (justo después de `21`) — 24 stickers dibujados de la República Dominicana (ids `st_rd_…`, se muestran con `stkArt(s)` de `04`; páginas «Comida dominicana» y «Mi país»), `MEDALLAS` por logros calculadas con los datos que ya existen (las ganadas en `p.medallas`, aviso con `revisarMedallas()`; pestaña «Medallas» en «Mi amigo») y `PAISAJES` del inicio por nivel (campo, playa 3, montaña 6, selva 9; pestaña «Lugar» del editor, en `p.paisaje`).
  11. `10-animaciones.js` — entrada de pantallas (envuelve `go`), `squash()`, `landSquash()`.
  12. `11-recompensas.js` — `flyStars()`, `showLevelUp()`; envuelve `win`, `giveSticker` y `addXP` (misma lógica y datos).
  13. `15-mapa-rd.js` — **generado** por `npm run mapa`: provincias de la República Dominicana (`window.MAPA_RD`, contornos de MapSVG, CC0). No se edita a mano.
  14. `16-mapa-mundo.js` — **generado** por `npm run mapa`: continentes del mundo (`window.MAPA_MUNDO`, contornos de MapSVG, CC0, proyección Equal Earth). No se edita a mano.
  15. `05-juguetes-nuevos.js` — colmado, granja, reloj, mapas (Mi país, Provincias, Mundo), cuerpo, laboratorio, tangram.
  16. `06-juguetes-completos.js` — Pintar, Mi jardín, Música (7 instrumentos), Acuario y Bloques completos.
  17. `18-plataformas.js` — «El camino de la semilla»: juego de plataformas. El animalito recoge semillas, agua y sol y hace florecer la maceta; en niveles 2 y 3 forma una palabra con letras en orden. **Excepción pedida por el docente a «sin ganar ni perder»:** tiene obstáculos (espinas, gusano, caracol, abeja, arroyo), 3 corazones y, al perderlos, se reintenta el camino; sigue sin reloj. La dificultad sube por etapas (en memoria, por perfil) a partir del nivel por edad. El camino se arma al azar y se escala a la altura de la pantalla. Usa las piezas `p_*` de `17-entorno.js`. Si el perfil tiene personaje (`p.nino`), corre el niño (`#scn`, trota con la clase `corre`) y el animalito (`#scp`) lo sigue por donde pasó hace 0,22 s, así también salta; sin personaje, corre el animalito como antes. La tortuga se voltea al revés porque se dibuja mirando a la izquierda (`giro`).
  18. `07-aprender-adultos.js` — cuentos, lectura, cálculo mental, inglés, modo aula, reporte, límite de tiempo e **inicio de la app** (`render()` al final).
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
- **Estilo único: plano** (`docs/GUIA-ILUSTRACIONES.md`, catálogo en `/docs/estilo-plano.html`).
  - Formas planas, contorno suave de 1,6 px en un tono más oscuro del relleno, paleta pastel `PAL`, sin brillos ni 3D, sin caras en objetos.
  - Toda pieza nueva se dibuja con los ayudantes de `PLANO_KIT` (en 12, 13 o 14) y se conecta a su emoji en `ILU_EMO`. No se agregan más imágenes de Kenney ni emojis visibles.
  - Toda la app está en estilo plano: 453 piezas cubren los 386 emojis del código. Kenney ya no se muestra en ninguna pantalla.
  - Cada juguete pasado al estilo plano lleva animaciones que cuentan lo que pasa (ver `13-plano-lugares.js`), siempre con versión quieta para `RM`.
- **Funciones de gráficos** (las piezas planas tienen prioridad; Kenney y los SVG con brillo solo quedan como respaldo, sin uso):
  - `ilu('nombre', tam)` muestra la pieza.
  - `emo('🍎')` muestra la ilustración de un emoji. Los datos y las comparaciones siguen usando el emoji.
  - `kic('play')` da un ícono monocromo que toma el color del texto.
  - `toyIcon(t)` da el ícono de un juguete.
  - Catálogo: `/docs/catalogo.html`.
- **Agregar una imagen de Kenney** (ya no se usa; solo como referencia):
  1. Añádela a `scripts/kenney-manifiesto.json`. Puede ser `.png`, `.svg` o `.glb`; los modelos 3D se renderizan solos.
  2. Corre `npm run kenney`, que necesita Chrome o Edge instalado.
  3. El script regenera `public/kenney/`, `kenney.js` y la tabla de `docs/LICENCIAS.md`.
  4. Los `.zip` viven en `vendor/` (fuera de git) y se descargan de OpenGameArt. kenney.nl bloquea las descargas automáticas: no lo esquives.
- **Motor:** siempre 2D (HTML + SVG). Todo es plano; ya no hay renders 3D.
- **`emoDOM`:** convierte a dibujo cualquier emoji que aparezca en `#app`, `#toast`, `.stk-peel` y `.lvup`, salvo dentro de SVG, `textarea` u `option`. Funciona porque ningún código lee el texto visible: las opciones se comprueban por `data-i` y las cartas de memoria por índice. **Si un código nuevo necesita leer el texto de un elemento, guarda el valor en un `data-` atributo.**
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

## Publicación e instalación (PWA en GitHub Pages)
- Se publica en **https://gnlcedu.github.io/semillita-app/** con `.github/workflows/pages.yml`, al subir a `main` o a mano desde Actions.
- En Android: abrir en Chrome → «Instalar app». Funciona sin internet después de la primera visita (service worker de `vite-plugin-pwa`).
- `vite.config.js` usa `base: '/semillita-app/'` en `build` y `preview`; en `dev` sigue en `/`.
  - Vite agrega el prefijo a las rutas de `index.html`.
  - **Dentro del JS, las rutas a archivos de `public/` van sin `/` inicial** (`sonidos/x.mp3`, no `/sonidos/x.mp3`).
- Para probar como en Pages: `npm run build` y luego `npx vite preview` → `http://localhost:4173/semillita-app/` (en `.claude/launch.json`: `semillita-pages`).
- La tarjeta «Instalar en este dispositivo» (zona de adultos, `07`) lee `window.SEMI_PWA`, que llena `src/main.js`.
- `npm run offline` sigue generando el archivo único `entrega/semillita.html`, para compartir sin internet.

## Siguiente trabajo (ver docs/HOJA-DE-RUTA.md)
1. Sonidos grabados o licenciados en `public/sonidos/` (Kenney tiene paquetes CC0 de sonidos de interfaz).
2. Más contenido: cuentos, lecturas por grado, Mezcla colores, Pizzería y El tiempo.
3. Migración gradual a módulos ES (un archivo por juguete) cuando la app esté estable.
