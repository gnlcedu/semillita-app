/* Semillita · Estilo plano (docs/GUIA-ILUSTRACIONES.md)
   =========================================================
   Un solo estilo para toda la app, dibujado en SVG:
   - Formas planas, sin degradados, sin brillos y sin 3D.
   - Contorno suave de 1,6 px (siempre igual, a cualquier tamaño) en un tono
     32 % más oscuro que el relleno. Nunca negro.
   - Volumen, si hace falta, con una sola forma plana un poco más oscura.
   - Detalles con líneas finas claras (vetas) o del tono oscuro.
   - Solo la paleta K (pastel). Sin caras en los objetos: solo los animales llevan ojos.
   - Un filtro "hecho a mano" (#mano) mueve un poco los bordes.
   PLANO.nombre(c?) devuelve el <svg>. ilu() usa estas piezas antes que Kenney
   y que los SVG antiguos de 08-ilustraciones.js.
   Se carga después de 09-escenarios.js (reemplaza la escena del jardín).
   ========================================================= */
(function(){
const K={tinta:'#4A4658',blanco:'#FFFFFF',crema:'#FFF6E6',rosa:'#F4A6A6',coral:'#F29A8E',durazno:'#F7C59F',naranja:'#F6B27C',
  mant:'#F6E39A',amarillo:'#F6D36F',menta:'#B9E3C6',hoja:'#A3D69B',verde:'#7FC08E',cielo:'#A9D3F0',azul:'#8DBDE6',lav:'#C9B8EE',
  ros:'#F5B8D0',tierra:'#D9B08A',madera:'#E6C39C',cafe:'#C29A7C',gris:'#D9DDE6',grisO:'#B4B9C8',barro:'#EFA98A'};
window.PAL=K;
const f=n=>+n.toFixed(1);
const hex6=c=>/^#[0-9a-f]{3}$/i.test(c)?'#'+[...c.slice(1)].map(x=>x+x).join(''):c;
/* contorno: tono oscuro del relleno; el blanco usa un gris azulado suave */
const o=c=>/^#f{6}$/i.test(hex6(c))?'#C3C8D6':shade(hex6(c),-.32);
const SW=1.6;
const sk=c=>`stroke="${o(c)}" stroke-width="${SW}" vector-effect="non-scaling-stroke" stroke-linejoin="round" stroke-linecap="round"`;
const P=(d,c)=>`<path d="${d}" fill="${c}" ${sk(c)}/>`;
const Pn=(d,c)=>`<path d="${d}" fill="none" ${sk(c)}/>`;
const C=(x,y,r,c)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" ${sk(c)}/>`;
const E=(x,y,rx,ry,c,rot)=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}"${rot?` transform="rotate(${rot} ${x} ${y})"`:''} fill="${c}" ${sk(c)}/>`;
const R=(x,y,w,h,r,c)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${c}" ${sk(c)}/>`;
/* sin contorno: detalles y sombras planas */
const F=(d,c)=>`<path d="${d}" fill="${c}"/>`;
const D=(x,y,r,c)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`;
/* línea (grosor en unidades del dibujo) */
const L=(d,c,w=3)=>`<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
/* línea gruesa con contorno (lombriz, letras) */
const Lo=(d,c,w=8)=>L(d,o(c),w+2.6)+L(d,c,w);
const svg=b=>`<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">${b}</svg>`;
/* sombra plana en forma de media luna, abajo a la derecha de un círculo */
const sombra=(cx,cy,r,k,c)=>{ const d=k*Math.SQRT2, mx=cx-k/2, my=cy-k/2, h=Math.sqrt(r*r-(d/2)**2), ux=k/d, uy=-k/d;
  const p1=`${f(mx+ux*h)} ${f(my+uy*h)}`, p2=`${f(mx-ux*h)} ${f(my-uy*h)}`;
  return `<path d="M${p1} A${r} ${r} 0 1 1 ${p2} A${r} ${r} 0 0 0 ${p1}Z" fill="${c}"/>`; };
const bola=(cx,cy,r,c,k=7)=>D(cx,cy,r,c)+sombra(cx,cy,r,k,shade(hex6(c),-.1))+`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" ${sk(c)}/>`;
/* hoja con vena clara: base en (x,y), ángulo, largo */
const hoja=(x,y,ang,len,c=K.hoja)=>`<g transform="translate(${x} ${y}) rotate(${ang})">${P(`M0 0 Q${f(len*.5)} ${f(-len*.46)} ${len} 0 Q${f(len*.5)} ${f(len*.46)} 0 0Z`,c)}${L(`M${f(len*.18)} 0 H${f(len*.7)}`,shade(c,.5),1.4)}</g>`;
const tallo=(d,w=4.5)=>L(d,K.verde,w);
const petalos=(cx,cy,n,dist,rx,ry,c)=>Array.from({length:n},(_,i)=>`<g transform="rotate(${f(i*360/n)} ${cx} ${cy})">${E(cx,cy-dist,rx,ry,c)}</g>`).join('');
const estrella=(cx,cy,r1,r2,c)=>P('M'+Array.from({length:10},(_,i)=>{ const a=-Math.PI/2+i*Math.PI/5, r=i%2?r2:r1; return `${f(cx+r*Math.cos(a))} ${f(cy+r*Math.sin(a))}`; }).join(' L')+'Z',c);
const anillo=(cx,cy,r,ri,c)=>`<path fill-rule="evenodd" d="M${cx-r} ${cy}a${r} ${r} 0 1 0 ${2*r} 0a${r} ${r} 0 1 0 ${-2*r} 0ZM${cx-ri} ${cy}a${ri} ${ri} 0 1 0 ${2*ri} 0a${ri} ${ri} 0 1 0 ${-2*ri} 0Z" fill="${c}" ${sk(c)}/>`;
const gotaG=(x,y,s,c)=>`<g transform="translate(${x} ${y}) scale(${s})">${P('M0 -22 Q16 -2 16 8 Q16 22 0 22 Q-16 22 -16 8 Q-16 -2 0 -22Z',c)}</g>`;
const NUBE='M22 70 Q10 70 10 58 Q10 46 24 46 Q26 30 44 30 Q58 28 64 40 Q78 36 84 50 Q94 52 92 62 Q90 70 80 70Z';
const rayos=(cx,cy,r1,r2,n,c,w=5.5)=>Array.from({length:n},(_,i)=>{ const a=i*2*Math.PI/n; return L(`M${f(cx+r1*Math.cos(a))} ${f(cy+r1*Math.sin(a))} L${f(cx+r2*Math.cos(a))} ${f(cy+r2*Math.sin(a))}`,c,w); }).join('');
const SOL=()=>rayos(50,50,31,43,10,shade(K.amarillo,-.06))+C(50,50,24,K.amarillo);
const CANASTA=`${P('M12 42 H88 L80 84 Q78 90 72 90 H28 Q22 90 20 84Z',K.madera)}${L('M16 56 H84 M18 70 H82',shade(K.madera,-.18),1.8)}${L('M34 44 V88 M50 44 V90 M66 44 V88',shade(K.madera,-.18),1.8)}`;
const GUITARRA=`<g transform="rotate(35 50 50)">${R(45,4,10,48,3,K.cafe)}${R(42,0,16,10,4,shade(K.cafe,-.12))}${P('M50 40 Q34 38 34 54 Q34 62 38 66 Q28 74 32 86 Q38 98 50 98 Q62 98 68 86 Q72 74 62 66 Q66 62 66 54 Q66 38 50 40Z',K.naranja)}${C(50,64,7,shade(K.cafe,-.15))}${R(40,80,20,5,2,shade(K.cafe,-.12))}${L('M48 6 V82 M52 6 V82',K.crema,1)}</g>`;

const PL={
/* ================= JARDÍN ================= */
semilla:(c=K.cafe)=>svg(`<g transform="rotate(-20 50 52)">${E(50,52,18,25,c)}${L('M50 33 Q45 50 50 69',shade(c,.4),2.2)}</g>`),
brote:()=>svg(`${tallo('M50 94 Q50 76 50 60')}${hoja(50,64,-150,30)}${hoja(50,60,-28,32)}`),
planta:()=>svg(`${tallo('M50 96 Q47 62 50 28')}${hoja(49,74,-162,26)}${hoja(50,66,-20,28)}${hoja(49,54,-154,24,K.verde)}${hoja(50,46,-28,24,K.verde)}${hoja(50,30,-92,18)}`),
flor_amarilla:()=>svg(`${tallo('M50 96 V48')}${hoja(50,84,-152,22)}${hoja(50,74,-28,22)}${petalos(50,36,10,13,5.5,9,K.amarillo)}${C(50,36,8,K.naranja)}`),
flor_roja:()=>svg(`${tallo('M50 96 Q48 66 50 48')}${hoja(49,80,-158,24)}${hoja(50,68,-24,24)}${P('M50 18 Q65 27 62 40 Q58 48 50 48 Q42 48 38 40 Q35 27 50 18Z',K.ros)}${L('M50 21 Q45 34 50 46',shade(K.ros,-.18),1.6)}${P('M38 40 Q43 52 50 49 Q57 52 62 40 Q56 46 50 45 Q44 46 38 40Z',K.hoja)}`),
mata:()=>svg(`${tallo('M50 96 Q50 72 50 50',5)}${hoja(50,88,-168,26)}${hoja(50,84,-12,26)}${hoja(50,72,-150,28,K.verde)}${hoja(50,68,-30,28,K.verde)}${hoja(50,56,-128,26)}${hoja(50,56,-52,26)}${hoja(50,52,-90,22,K.verde)}`),
espiga:()=>svg(`${tallo('M50 97 V24',5)}${P('M50 84 Q30 64 14 70 Q32 72 50 92Z',K.hoja)}${P('M50 70 Q72 50 88 56 Q70 58 50 78Z',K.verde)}${P('M50 52 Q34 36 22 40 Q36 44 50 60Z',K.hoja)}${L('M50 26 L43 11 M50 26 L50 8 M50 26 L57 11',shade(K.amarillo,-.15),3)}`),
trebol:()=>{ const tri=(x,y)=>C(x-6,y+3,7,K.hoja)+C(x+6,y+3,7,K.hoja)+C(x,y-6,7,K.hoja);
  return svg(`${L('M36 96 Q36 80 30 68 M50 96 V60 M64 96 Q64 80 70 68',K.verde,3.5)}${tri(30,62)}${tri(50,54)}${tri(70,62)}${C(24,86,6,K.coral)}${petalos(78,84,5,5,3.6,4.2,K.blanco)}${D(78,84,2.6,K.amarillo)}`); },
lechuga:()=>svg(`${hoja(50,90,-128,40,K.verde)}${hoja(50,90,-104,46)}${hoja(50,90,-78,46,K.verde)}${hoja(50,90,-54,40)}${P('M40 90 Q50 84 60 90 L56 98 H44Z',K.naranja)}`),
enredadera:()=>svg(`${L('M10 84 Q28 68 46 82 Q64 96 80 78 Q88 68 84 60',K.verde,3.5)}${L('M84 60 q7 -6 1 -11 q-5 -3 -6 2',K.verde,2)}${hoja(28,76,-120,22)}${hoja(58,90,-62,22,K.verde)}${hoja(78,80,-30,20)}${petalos(44,70,5,5,3.6,4.2,K.amarillo)}${D(44,70,2.4,K.naranja)}${E(24,90,10,7,'#9CD08A')}${L('M19 85 Q22 90 19 95 M26 84 Q29 90 26 96',shade('#9CD08A',-.2),1.4)}`),
arbol:(c)=>svg(`${P('M44 97 L46 58 L54 58 L56 97Z',K.cafe)}${P('M20 50 Q10 34 24 24 Q28 8 50 10 Q72 8 76 24 Q90 34 80 50 Q76 64 58 62 Q50 68 42 62 Q24 64 20 50Z',K.verde)}${L('M30 40 Q34 34 40 36 M56 24 Q62 20 68 26 M58 48 Q64 44 70 48',shade(K.verde,.35),1.8)}${c?C(34,46,4.5,c)+C(62,34,4.5,c)+C(70,52,4.5,c)+C(46,54,4.5,c):''}`),
palmera:()=>svg(`${P('M47 97 Q42 70 51 40 L58 41 Q51 70 56 97Z',K.cafe)}${L('M46 86 h9 M46 74 h8 M48 62 h8 M50 51 h7',o(K.cafe),1.6)}${hoja(55,40,-172,36,K.verde)}${hoja(55,38,-138,32)}${hoja(55,38,-42,32)}${hoja(55,40,-8,36,K.verde)}${hoja(55,38,-92,24)}${C(51,45,4.5,K.cafe)}${C(59,46,4.5,K.cafe)}`),
girasol:()=>svg(`${tallo('M50 96 V54')}${hoja(50,84,-152,22)}${hoja(50,74,-28,22)}${petalos(50,36,12,18,6.5,11,K.amarillo)}${C(50,36,12.5,K.cafe)}${[[45,32],[55,32],[50,41],[44,40],[56,40],[50,30]].map(([x,y])=>D(x,y,1.5,shade(K.cafe,-.25))).join('')}`),
tulipan:(c=K.ros)=>svg(`${tallo('M50 96 V52')}${P('M50 94 Q30 82 26 58 Q42 66 50 86Z',K.hoja)}${P('M50 92 Q70 78 74 56 Q58 64 50 84Z',K.verde)}${P('M32 22 Q30 50 50 55 Q70 50 68 22 L59 32 L50 18 L41 32Z',c)}${L('M41 32 Q43 46 50 53 M59 32 Q57 46 50 53',shade(c,-.18),1.6)}`),
rosa:(c='#F497AA')=>svg(`${tallo('M50 96 Q52 74 50 54')}${hoja(51,82,-160,22)}${hoja(51,70,-24,22,K.verde)}${C(50,37,21,c)}${L('M50 37 m-6 0 a6 6 0 1 1 6 6 a10 10 0 1 1 -12 -12 a14 14 0 0 1 22 10',shade(c,-.22),2)}`),
cayena:(c=K.coral)=>svg(`${petalos(50,50,5,18,14,19,c)}${[0,72,144,216,288].map(a=>`<g transform="rotate(${a} 50 50)">${L('M50 42 V24',shade(c,-.14),1.6)}</g>`).join('')}${C(50,50,7,shade(c,-.12))}${L('M50 50 Q60 36 72 26',K.amarillo,3)}${C(72,26,3.5,K.amarillo)}`),
tomate:(c=K.coral)=>svg(`${bola(50,58,30,c,8)}${P('M50 30 L41 22 L45 32 L33 30 L43 37 L50 33 L57 37 L67 30 L55 32 L59 22Z',K.hoja)}${L('M50 28 Q50 20 54 15',K.verde,3.5)}`),
maiz:()=>svg(`${P('M50 12 Q68 18 68 50 Q66 80 50 86 Q34 80 32 50 Q32 18 50 12Z',K.mant)}${[22,32,42,52,62,72].map(y=>[41,50,59].map(x=>D(x+(y%20?0:1.5),y,2.8,shade(K.mant,-.12))).join('')).join('')}${P('M50 92 Q22 84 22 40 Q30 58 46 70Z',K.hoja)}${P('M50 92 Q78 84 78 40 Q70 58 54 70Z',K.verde)}`),
fresa:(c=K.coral)=>svg(`${P('M50 90 Q20 70 22 44 Q26 28 50 30 Q74 28 78 44 Q80 70 50 90Z',c)}${[[38,46],[50,44],[62,46],[34,58],[46,58],[58,60],[66,56],[42,70],[54,72],[48,82]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="1.5" ry="2.3" fill="${K.crema}"/>`).join('')}${P('M50 34 L36 24 L44 34 L30 32 L44 40 L50 36 L56 40 L70 32 L56 34 L64 24Z',K.hoja)}${L('M50 26 V14',K.verde,3.5)}`),
zanahoria:(c=K.naranja)=>svg(`${hoja(50,30,-122,24,K.hoja)}${hoja(50,30,-90,28,K.verde)}${hoja(50,30,-58,24,K.hoja)}${P('M30 32 Q50 24 70 32 Q64 62 50 94 Q36 62 30 32Z',c)}${L('M38 46 h8 M54 56 h8 M42 66 h7 M52 76 h5',shade(c,-.16),2)}`),
sandia:()=>svg(`<g transform="rotate(-12 50 50)">${P('M8 40 A42 42 0 0 0 92 40Z','#9CD08A')}${F('M14 40 A36 36 0 0 0 86 40Z','#F7F3DF')}${F('M19 40 A31 31 0 0 0 81 40Z','#F59AA6')}<path d="M8 40 H92" ${sk('#F59AA6')}/>${[[34,52],[50,60],[66,52],[42,66],[58,66]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="2" ry="3.2" fill="${K.tinta}"/>`).join('')}</g>`),
habichuela:()=>svg(`${P('M12 66 Q30 30 86 30 Q74 74 12 66Z',K.hoja)}${E(36,57,6,7,shade(K.hoja,.3))}${E(52,50,6,7,shade(K.hoja,.3))}${E(68,42,6,7,shade(K.hoja,.3))}${L('M86 30 Q92 24 90 16',K.verde,3.5)}`),
mango:()=>svg(`${P('M52 20 Q82 24 80 56 Q78 88 46 86 Q18 84 22 56 Q26 28 52 20Z','#F8C066')}${F('M62 27 Q80 36 78 56 Q74 42 62 27Z',K.coral)}${L('M52 20 Q54 12 58 8',K.cafe,3.5)}${hoja(56,14,-20,20)}`),
guineo:()=>svg(`${[-24,0,24].map(r=>`<g transform="rotate(${r} 50 26)">${P('M44 28 Q30 58 46 86 Q52 92 58 88 Q46 62 54 30Z',K.amarillo)}${D(52,89,2.2,K.cafe)}</g>`).join('')}${P('M42 20 H58 L56 32 H44Z',K.cafe)}`),
regadera:(c=K.cielo)=>svg(`${P('M64 52 L88 28 L94 34 L70 62Z',c)}${E(91,30,7,4,shade(c,-.08),-45)}${P('M30 38 Q30 18 46 18 Q60 18 60 38 L55 38 Q55 24 46 24 Q36 24 35 38Z',shade(c,-.08))}${P('M22 38 H66 V80 Q66 87 59 87 H29 Q22 87 22 80Z',c)}${F('M23 52 H65 V60 H23Z',shade(c,.45))}${D(84,48,2.4,K.azul)}${D(92,46,2.4,K.azul)}${D(88,56,2.4,K.azul)}`),
gota:(c=K.cielo)=>svg(`${P('M50 12 Q74 44 74 62 Q74 86 50 86 Q26 86 26 62 Q26 44 50 12Z',c)}${L('M38 62 Q38 72 46 76',shade(c,.6),3)}`),
canasta:()=>svg(`${P('M26 46 Q26 12 50 12 Q74 12 74 46 L68 46 Q68 19 50 19 Q32 19 32 46Z',shade(K.madera,-.1))}${CANASTA}`),
sol:()=>svg(SOL()),
luna:()=>svg(`${P('M58 12 A40 40 0 1 0 90 68 A32 32 0 1 1 58 12Z',K.mant)}${D(40,62,4,shade(K.mant,-.1))}${D(54,80,2.8,shade(K.mant,-.1))}`),
nube1:()=>svg(P(NUBE,K.blanco)),
w_lluvia:()=>svg(`<g transform="translate(0 -14)">${P(NUBE,K.blanco)}</g>${L('M30 66 l-4 10 M48 66 l-4 10 M66 66 l-4 10 M39 82 l-3 8 M57 82 l-3 8',K.azul,3.5)}`),
/* bichitos y visitas del jardín */
gusano:()=>svg(`${[[20,68],[32,62],[44,60],[56,62]].map(([x,y])=>C(x,y,10,K.hoja)).join('')}${C(70,54,13,K.verde)}${D(75,51,2.2,K.tinta)}${L('M66 42 Q64 34 60 32 M74 42 Q76 34 80 32',K.tinta,1.8)}`),
mariposa:()=>svg(`${E(32,38,18,15,K.ros,-20)}${E(68,38,18,15,K.ros,20)}${E(35,64,13,10,K.lav,20)}${E(65,64,13,10,K.lav,-20)}${D(30,38,5,K.blanco)}${D(70,38,5,K.blanco)}${E(50,52,4.5,22,'#7A7590')}${L('M48 32 Q42 20 36 18 M52 32 Q58 20 64 18',K.tinta,1.8)}`),
mariquita:()=>svg(`${C(50,30,12,'#5B5872')}${C(50,58,28,K.coral)}${L('M50 32 V85',o(K.coral),1.6)}${D(38,48,5,'#5B5872')}${D(62,48,5,'#5B5872')}${D(36,68,4.5,'#5B5872')}${D(64,68,4.5,'#5B5872')}${D(45,26,2,K.blanco)}${D(55,26,2,K.blanco)}`),
pajarito:()=>svg(`${P('M26 60 L8 50 L12 68Z',K.azul)}${C(48,54,26,K.cielo)}${P('M36 58 Q48 46 62 58 Q50 70 36 58Z',K.azul)}${P('M73 46 L86 51 L73 56Z',K.naranja)}${D(63,46,2.6,K.tinta)}${L('M42 80 V88 M54 80 V88',K.naranja,2.5)}`),
/* herramientas del jardín */
guante:()=>svg(`${P('M30 92 V58 Q24 42 22 32 Q21 25 26 24 Q31 23 33 31 L37 44 V22 Q37 16 42 16 Q47 16 47 22 V42 L49 18 Q49 12 55 12 Q60 13 60 19 L59 42 L63 22 Q64 16 69 17 Q74 18 73 24 L69 50 Q68 62 66 70 V92Z',K.lav)}${R(27,78,42,16,4,shade(K.lav,-.12))}`),
lombriz:()=>svg(`${Lo('M16 70 Q30 50 44 64 Q58 78 70 58 Q76 46 86 50',K.ros,9)}${L('M40 59 l4 -3 M56 71 l3 -4',shade(K.ros,-.15),1.6)}${D(84,48,1.8,K.tinta)}`),
tijeras:()=>svg(`${P('M36 66 Q60 36 84 12 Q72 40 46 72Z',K.gris)}${P('M64 66 Q40 36 16 12 Q28 40 54 72Z',shade(K.gris,.25))}${anillo(30,78,12,6,K.coral)}${anillo(70,78,12,6,K.coral)}${D(50,54,3,K.grisO)}`),
/* cocina con la cosecha */
ensalada:()=>svg(`${hoja(32,50,-150,24)}${hoja(68,50,-30,24,K.verde)}${hoja(50,48,-100,26)}${C(40,46,7,K.coral)}${C(60,44,7,K.coral)}${P('M10 50 H90 Q88 86 50 88 Q12 86 10 50Z',K.cielo)}${L('M22 64 Q50 72 78 64',shade(K.cielo,.5),2.5)}`),
olla:()=>svg(`${L('M36 26 q-4 -8 0 -14 M50 24 q-4 -8 0 -14 M64 26 q-4 -8 0 -14',K.grisO,3)}${R(8,48,12,8,3,K.coral)}${R(80,48,12,8,3,K.coral)}${P('M16 42 H84 V74 Q84 88 70 88 H30 Q16 88 16 74Z',K.coral)}${R(12,34,76,10,5,shade(K.coral,-.08))}${R(44,27,12,8,3,shade(K.coral,-.08))}`),
ramo:()=>svg(`${L('M50 90 L36 34 M50 90 L62 30 M50 90 L50 46',K.verde,3)}${hoja(44,62,-150,16)}${hoja(56,58,-30,16)}${petalos(36,32,5,8,6,7,K.ros)}${D(36,32,4,K.amarillo)}${petalos(63,28,5,8,6,7,K.amarillo)}${D(63,28,4,K.naranja)}${petalos(50,46,5,8,6,7,K.lav)}${D(50,46,4,K.amarillo)}${P('M30 60 H70 L58 94 H42Z',K.cielo)}${P('M44 70 L36 64 L36 78Z M56 70 L64 64 L64 78Z',K.rosa)}${C(50,70,4,K.rosa)}`),
nota:()=>svg(`${P('M24 10 H76 V88 L69 82 L62 88 L55 82 L48 88 L41 82 L34 88 L27 82 L24 86Z',K.blanco)}${L('M34 28 H66 M34 40 H66 M34 52 H58 M34 64 H62',K.grisO,3)}`),
jugo:(c=K.durazno)=>svg(`${L('M60 26 L64 8 L72 8',K.rosa,4)}${R(28,24,44,64,6,c)}${C(50,58,11,K.naranja)}${hoja(50,47,-60,10)}`),
/* inicio: chips y títulos */
ic_gorro:()=>svg(`${E(50,76,40,9,shade(K.lav,-.12))}${P('M28 76 L32 24 Q50 18 68 24 L72 76Z',K.lav)}${P('M29.3 58 H70.7 L71.5 68 H28.5Z',K.ros)}`),
ic_album:()=>svg(`${R(18,12,64,78,8,K.mant)}${R(18,12,14,78,6,shade(K.mant,-.12))}${estrella(57,50,16,7,K.coral)}`),
ic_perfil:()=>svg(`${C(50,34,16,K.lav)}${P('M20 88 Q20 58 50 58 Q80 58 80 88Z',K.lav)}`),

/* ================= ÍCONOS DE LOS JUGUETES ================= */
ti_paint:()=>svg(`${P('M50 12 Q88 12 90 46 Q92 68 72 66 Q60 66 62 78 Q64 92 44 88 Q10 82 10 50 Q10 12 50 12Z',K.madera)}${C(32,38,7,K.coral)}${C(50,27,7,K.amarillo)}${C(69,35,7,K.azul)}${C(28,60,7,K.hoja)}${C(48,56,6,shade(K.madera,.55))}`),
ti_mix:()=>svg(`${gotaG(36,44,1.1,K.rosa)}${gotaG(64,44,1.1,K.cielo)}${gotaG(50,66,1.1,K.amarillo)}`),
ti_music:()=>svg(GUITARRA),
ti_blocks:()=>svg(`${R(10,58,38,32,5,K.cielo)}${R(52,58,38,32,5,K.coral)}${R(28,28,44,30,5,K.amarillo)}${P('M32 28 L50 8 L68 28Z',K.hoja)}`),
ti_garden:()=>svg(`${tallo('M50 66 V40')}${hoja(50,58,-150,18)}${hoja(50,52,-30,18)}${petalos(50,28,10,12,5,8,K.amarillo)}${C(50,28,8,K.cafe)}${P('M30 70 H70 L64 94 H36Z',K.barro)}${R(26,62,48,11,4,shade(K.barro,-.08))}`),
ti_aqua:()=>{ const B='M12 50 Q30 22 60 30 Q74 38 74 50 Q74 62 60 70 Q30 78 12 50Z';
  return svg(`${P('M66 50 L88 32 Q84 50 88 68Z',shade(K.naranja,-.06))}${P('M36 31 Q46 14 58 30Z',shade(K.naranja,-.06))}${F(B,K.naranja)}${L('M40 32 Q36 50 40 70 M54 32 Q58 50 54 68',K.crema,5)}${Pn(B,K.naranja)}${D(26,46,3,K.tinta)}`); },
ti_bubble:()=>svg([[38,58,24],[70,32,15],[72,74,11]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#EAF5FC" ${sk(K.azul)}/>${L(`M${f(x-r*.6)} ${f(y-r*.1)} Q${f(x-r*.55)} ${f(y-r*.55)} ${f(x-r*.15)} ${f(y-r*.65)}`,K.blanco,2.6)}`).join('')),
ti_pizza:()=>svg(`${P('M50 92 L14 26 Q50 10 86 26Z',K.mant)}${P('M14 26 Q50 10 86 26 L82 34 Q50 20 18 34Z',K.madera)}${C(46,42,7,K.coral)}${C(60,56,6,K.coral)}${C(44,66,5,K.coral)}${hoja(54,74,-60,9)}${hoja(34,48,-20,9)}`),
ti_sort:()=>svg(`${bola(34,38,11,K.coral,4)}${bola(54,32,11,K.amarillo,4)}${bola(72,40,10,K.hoja,4)}${CANASTA}`),
ti_shapes:()=>svg(`${C(30,66,20,K.cielo)}${R(52,50,36,36,6,K.coral)}${P('M26 42 L44 10 L62 42Z',K.amarillo)}`),
ti_weather:()=>svg(`<g transform="translate(-12 -12) scale(.8)">${SOL()}</g><g transform="translate(18 20) scale(.85)">${P(NUBE,K.blanco)}</g>`),
ti_trace:()=>svg(`${Lo('M24 84 L46 18 L68 84 M33 62 H59',K.lav,11)}<g transform="rotate(35 76 54)">${R(70,26,12,40,2,K.amarillo)}${P('M70 66 L76 82 L82 66Z',K.madera)}${D(76,80,2,K.tinta)}${R(70,20,12,8,2,K.ros)}</g>`),
ti_beads:()=>svg(`${R(12,16,76,68,8,K.madera)}${R(19,23,62,54,4,K.crema)}${[34,50,66].map((y,i)=>L(`M19 ${y} H81`,shade(K.madera,-.15),2)+[0,1,2,3].map(j=>C(29+j*10+(i===1?14:0),y,5,[K.coral,K.amarillo,K.azul][i])).join('')).join('')}`),
ti_shop:()=>svg(`${R(14,40,72,50,3,'#FFF1DA')}${R(24,54,26,22,3,K.cielo)}${L('M24 65 H50',shade(K.cielo,-.2),1.6)}${R(28,57,5,8,1.5,K.coral)}${R(36,58,5,7,1.5,K.amarillo)}${R(29,67,6,8,1.5,K.hoja)}${R(39,68,6,7,1.5,K.lav)}${R(58,56,20,34,3,K.azul)}${D(73,74,1.8,K.blanco)}${P('M10 30 H90 V42 Q85 48 80 42 Q75 48 70 42 Q65 48 60 42 Q55 48 50 42 Q45 48 40 42 Q35 48 30 42 Q25 48 20 42 Q15 48 10 42Z',K.coral)}${F('M20 31 h10 v11 h-10Z M40 31 h10 v11 h-10Z M60 31 h10 v11 h-10Z M80 31 h9 v11 h-9Z','#FFFFFF')}${Pn('M10 30 H90 V42 Q85 48 80 42 Q75 48 70 42 Q65 48 60 42 Q55 48 50 42 Q45 48 40 42 Q35 48 30 42 Q25 48 20 42 Q15 48 10 42Z',K.coral)}${R(28,12,44,16,4,K.mant)}`),
ti_farm:()=>svg(`${P('M30 26 Q24 14 18 16 Q22 24 28 30Z',K.madera)}${P('M70 26 Q76 14 82 16 Q78 24 72 30Z',K.madera)}${E(18,42,11,6,K.blanco,-20)}${E(82,42,11,6,K.blanco,20)}${P('M24 48 Q22 24 50 22 Q78 24 76 48 Q78 72 68 80 H32 Q22 72 24 48Z',K.blanco)}${F('M30 32 Q40 28 42 38 Q38 48 30 44Z','#A8A3B8')}${F('M64 26 Q73 30 72 42 Q64 40 62 32Z','#A8A3B8')}${E(50,72,22,13,K.ros)}${D(43,72,2.6,shade(K.ros,-.3))}${D(57,72,2.6,shade(K.ros,-.3))}${D(38,52,3.2,K.tinta)}${D(62,52,3.2,K.tinta)}`),
ti_clock:()=>svg(`${C(25,22,9,K.coral)}${C(75,22,9,K.coral)}${L('M30 84 L24 92 M70 84 L76 92',o(K.lav),4)}${C(50,54,34,K.lav)}${C(50,54,26,K.blanco)}${[0,90,180,270].map(a=>D(f(50+20*Math.sin(a*Math.PI/180)),f(54-20*Math.cos(a*Math.PI/180)),2,K.grisO)).join('')}${L('M50 54 V38 M50 54 L62 60',K.tinta,3)}${D(50,54,3.2,K.coral)}`),
ti_maps:()=>svg(`${P('M10 26 L34 16 L64 28 L90 18 V76 L64 86 L34 74 L10 84Z',K.menta)}${L('M34 16 V74 M64 28 V86',o(K.menta),1.6)}${`<path d="M18 66 Q30 50 44 60 Q54 66 58 52" fill="none" stroke="${K.azul}" stroke-width="2.6" stroke-linecap="round" stroke-dasharray="2 5"/>`}${P('M66 22 Q80 22 80 36 Q80 46 66 60 Q52 46 52 36 Q52 22 66 22Z',K.coral)}${D(66,36,5,K.blanco)}`),
ti_body:()=>svg(P('M50 86 Q14 62 14 38 Q14 18 32 18 Q44 18 50 30 Q56 18 68 18 Q86 18 86 38 Q86 62 50 86Z',K.rosa)),
ti_lab:()=>{ const B='M42 16 H58 V38 L80 78 Q84 88 74 88 H26 Q16 88 20 78 L42 38Z';
  return svg(`${R(38,8,24,8,3,'#EEF6FC')}${F(B,'#EEF6FC')}${F('M31 60 H69 L78 77 Q81 85 73 85 H27 Q19 85 22 77Z',K.menta)}${Pn(B,'#CFE3F1')}${C(44,72,3.5,K.blanco)}${C(56,66,2.5,K.blanco)}${C(64,30,4.5,K.menta)}${C(72,18,3,K.menta)}`); },
ti_tangram:()=>svg(`${P('M14 14 H86 L50 50Z',K.rosa)}${P('M14 14 L50 50 L14 86Z',K.cielo)}${P('M86 14 V50 L68 32Z',K.amarillo)}${P('M50 50 L68 32 L86 50 L68 68Z',K.menta)}${P('M14 86 L50 50 L50 86Z',K.lav)}${P('M50 86 L50 50 L68 68 L68 86Z',K.durazno)}${P('M68 86 V68 L86 50 V86Z',K.ros)}`),
ti_code:()=>svg(`${L('M50 20 V10',K.grisO,2.5)}${C(50,9,4,K.coral)}${R(24,20,52,34,10,K.gris)}${R(31,27,38,20,6,'#5B5872')}${D(42,37,3.2,K.menta)}${D(58,37,3.2,K.menta)}${R(16,62,10,20,5,K.gris)}${R(74,62,10,20,5,K.gris)}${R(28,58,44,32,8,K.cielo)}${R(40,66,20,10,3,K.mant)}`),
ti_maze:()=>svg(`${R(10,10,80,80,12,K.lav)}${L('M24 24 H62 M24 24 V76 M38 38 H76 V62 M38 38 V62 H58 M24 76 H76 V62',K.blanco,6)}${C(31,31,5,K.coral)}${estrella(69,69,8,3.8,K.amarillo)}`),
ti_hanoi:()=>svg(`${R(8,80,84,10,4,K.madera)}${[24,50,76].map(x=>R(x-3,26,6,56,3,K.madera)).join('')}${R(10,70,28,10,5,K.cielo)}${R(14,60,20,10,5,K.amarillo)}${R(18,50,12,10,5,K.coral)}${R(40,70,20,10,5,K.menta)}`),
ti_sudoku:()=>svg(`${R(12,12,76,76,8,K.crema)}${L('M37.3 14 V86 M62.6 14 V86 M14 37.3 H86 M14 62.6 H86',shade(K.crema,-.18),1.8)}${C(25,25,7,K.coral)}${P('M50 18 L57 31 H43Z',K.amarillo)}${R(68,68,13,13,3,K.azul)}${C(50,75,7,K.hoja)}${P('M75 43 L82 56 H68Z',K.lav)}${R(19,44,12,12,3,K.ros)}`),
ti_slide:()=>svg(`${R(10,10,80,80,12,K.madera)}${[0,1,2].map(r=>[0,1,2].map(c=> r===2&&c===2?'':R(16+c*24,16+r*24,20,20,5,[K.rosa,K.amarillo,K.cielo,K.menta,K.lav,K.durazno,K.ros,K.coral][r*3+c])).join('')).join('')}`),
ti_balance:()=>svg(`${R(30,84,40,8,4,K.madera)}${R(47,30,6,56,3,K.madera)}${L('M16 34 L84 26',K.grisO,3)}${C(50,30,5,K.amarillo)}${L('M16 34 L8 58 M16 34 L24 58 M84 26 L76 50 M84 26 L92 50',K.grisO,1.6)}${P('M4 58 H28 Q26 68 16 68 Q6 68 4 58Z',K.rosa)}${P('M72 50 H96 Q94 60 84 60 Q74 60 72 50Z',K.cielo)}`),
/* aventuras */
ti_learn:()=>svg(`${L('M42 22 Q42 10 50 10 Q58 10 58 22',o(K.coral),4)}${P('M22 36 Q22 20 50 20 Q78 20 78 36 V82 Q78 90 70 90 H30 Q22 90 22 82Z',K.coral)}${P('M22 36 Q22 20 50 20 Q78 20 78 36 V48 Q50 56 22 48Z',shade(K.coral,-.08))}${R(34,62,32,20,6,K.mant)}${D(50,52,3,K.amarillo)}`),
ti_math:()=>svg(P('M58 6 L24 54 H46 L38 94 L76 40 H54Z',K.amarillo)),
ti_fluency:()=>svg(`${P('M50 28 Q32 18 12 22 V80 Q32 76 50 86Z',K.blanco)}${P('M50 28 Q68 18 88 22 V80 Q68 76 50 86Z',K.blanco)}${L('M20 38 Q32 36 42 40 M20 50 Q32 48 42 52 M20 62 Q32 60 42 64 M58 40 Q68 36 80 38 M58 52 Q68 48 80 50',K.grisO,2.4)}${F('M70 21 H78 V40 L74 36 L70 40Z',K.coral)}`),
ti_eng:()=>svg(`${P('M18 14 H60 Q68 14 68 22 V44 Q68 52 60 52 H32 L22 62 L24 52 H18 Q10 52 10 44 V22 Q10 14 18 14Z',K.cielo)}${L('M20 28 H56 M20 38 H44',K.blanco,3.5)}${P('M44 44 H84 Q92 44 92 52 V72 Q92 80 84 80 H80 L82 90 L70 80 H44 Q36 80 36 72 V52 Q36 44 44 44Z',K.ros)}${D(52,62,3.4,K.blanco)}${D(64,62,3.4,K.blanco)}${D(76,62,3.4,K.blanco)}`),
ti_story:()=>svg(`${R(22,26,54,66,6,K.lav)}${R(22,26,11,66,4,shade(K.lav,-.12))}${estrella(55,58,14,6.5,K.amarillo)}${P('M80 8 A14 14 0 1 0 92 28 A11 11 0 1 1 80 8Z',K.mant)}`)
};
/* ícono de bombillo: los rayos van detrás */
PL.ic_idea=()=>svg(`${rayos(50,40,30,38,7,shade(K.amarillo,-.1),4)}${P('M34 56 Q26 46 28 36 Q32 16 50 16 Q68 16 72 36 Q74 46 66 56 Q62 62 62 68 H38 Q38 62 34 56Z',K.amarillo)}${R(38,68,24,16,5,K.gris)}${L('M40 76 H60',K.grisO,1.6)}`);
PL.abeja=()=>svg(`${E(42,36,12,9,K.blanco,-25)}${E(58,34,12,9,K.blanco,25)}${E(48,58,28,20,K.amarillo)}${F('M42 39 Q40 58 42 77 L48 78 Q46 58 48 38Z',K.tinta)}${F('M58 41 Q56 58 58 75 L64 73 Q62 58 64 43Z',K.tinta)}<ellipse cx="48" cy="58" rx="28" ry="20" fill="none" ${sk(K.amarillo)}/>${P('M75 60 L85 58 L75 54Z',K.tinta)}${D(30,54,2.6,K.tinta)}`);
window.PLANO=PL;
/* ayudantes de dibujo para otros archivos del estilo plano (13-plano-lugares.js …) */
window.PLANO_KIT={K,f,o,sk,P,Pn,C,E,R,F,D,L,Lo,svg,sombra,bola,hoja,tallo,petalos,estrella,anillo,gotaG,rayos,NUBE};

/* íconos monocromos (toman el color del texto), en lugar de los de Kenney */
const MONO={
  sonido:'<path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7M18.6 6a8.6 8.6 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
  silencio:'<path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16.5 9.5l5 5M21.5 9.5l-5 5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>'
};

window.PLANO_MONO=MONO;
/* ---------- conexión con ilu(), emo(), kic() y toyIcon() ---------- */
const tamCss=t=>typeof t==='number'?t+'px':t;
const _ilu=window.ilu, _fuente=window.iluFuente, _kic=window.kic;
window.ilu=(n,tam=48,c)=>{ const p=PL[n]; if(!p) return _ilu(n,tam,c); const t=tamCss(tam);
  return `<span class="ilu plano" data-ilu="${n}" style="width:${t};height:${t}">${c?p(c):p()}</span>`; };
window.iluFuente=n=>PL[n]?'plano':_fuente(n);
window.kic=(n,tam='1em')=> MONO[n] ? `<span class="kim" aria-hidden="true" style="width:${tamCss(tam)};height:${tamCss(tam)}"><svg viewBox="0 0 24 24">${MONO[n]}</svg></span>` : _kic(n,tam);
/* emojis del jardín con pieza propia (los datos siguen guardando el emoji) */
Object.assign(window.ILU_EMO,{'🪴':'mata','🌾':'espiga','🍀':'trebol','🥬':'lechuga','🍃':'enredadera','☁️':'nube1','🌧️':'w_lluvia','🌧':'w_lluvia','☀️':'sol','🌙':'luna',
  '🐛':'gusano','🦋':'mariposa','🐝':'abeja','🐞':'mariquita','🐦':'pajarito','🧤':'guante','🪱':'lombriz','✂️':'tijeras',
  '🥗':'ensalada','🍲':'olla','💐':'ramo','🧾':'nota','🧃':'jugo','🎩':'ic_gorro','📒':'ic_album','👤':'ic_perfil','🧠':'ic_idea'});
/* íconos de juguetes y aventuras */
Object.keys(window.TOY_ILU).forEach(id=>{ if (PL['ti_'+id]) window.TOY_ILU[id]='ti_'+id; });

/* ---------- filtro "hecho a mano": bordes un poco irregulares ---------- */
const defs=()=>{ if (document.getElementById('mano')) return;
  document.body.insertAdjacentHTML('afterbegin',`<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><filter id="mano" x="-4%" y="-4%" width="108%" height="108%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency=".045" numOctaves="2" seed="4" result="r"/><feDisplacementMap in="SourceGraphic" in2="r" scale="2.2" xChannelSelector="R" yChannelSelector="G"/></filter></svg>`); };
if (document.body) defs(); else document.addEventListener('DOMContentLoaded',defs);

/* ---------- escena plana de Mi jardín ---------- */
const capa=(d,html,css='')=>`<div class="sl" data-d="${d}" style="${css}">${html}</div>`;
const lam=(vb,body,css)=>`<svg class="sp" viewBox="${vb}" preserveAspectRatio="xMidYMax slice" aria-hidden="true" style="${css}">${body}</svg>`;
const palma=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})">${P('M-3 0 Q-6 -24 2 -46 L6 -45 Q0 -24 3 0Z',K.cafe)}${hoja(4,-46,-172,26,K.verde)}${hoja(4,-46,-134,22)}${hoja(4,-46,-46,22)}${hoja(4,-46,-8,26,K.verde)}</g>`;
const arbusto=(x,y,s,c=K.hoja)=>`<g transform="translate(${x} ${y}) scale(${s})">${P('M-20 0 Q-26 -12 -14 -16 Q-12 -28 0 -26 Q12 -30 16 -18 Q28 -14 22 0Z',c)}</g>`;
const cerca=()=>{ let s=''; for(let x=0;x<400;x+=16) s+=P(`M${x+2} 40 V10 L${x+7} 4 L${x+12} 10 V40Z`,K.crema);
  return s+R(-4,16,408,5,2,K.crema)+R(-4,28,408,5,2,K.crema); };
/* pieza de paisaje de 17-entorno.js (formas de Kenney, CC0): base centrada en (x,y) y alto en unidades de la lámina.
   Lleva el contorno del estilo plano (silueta más oscura detrás). c = color único, para siluetas lejanas. */
const ent=(n,x,y,alto,c)=>{ const e=(window.ENTORNO||{})[n]; if(!e) return ''; const w=e.w*alto/100, bor=shade(c||e.p[0][0],c?-.12:-.3);
  return `<svg x="${x-w/2}" y="${y-alto}" width="${w}" height="${alto}" viewBox="0 0 ${e.w} 100" overflow="visible"><g fill="${bor}" stroke="${bor}" stroke-width="3.2" stroke-linejoin="round">${e.p.map(q=>`<path d="${q[1]}" vector-effect="non-scaling-stroke"/>`).join('')}</g>${e.p.map(q=>`<path d="${q[1]}" fill="${c||q[0]}"/>`).join('')}</svg>`; };
window.ent=ent;
const JARDIN=()=>capa(.15,`<div class="sp drift" style="left:6%;top:5%;width:26%;max-width:140px">${ilu('nube1','100%')}</div><div class="sp drift slow" style="left:60%;top:calc(5% + 26px);width:20%;max-width:110px">${ilu('nube1','100%')}</div>`)
  +capa(.3,lam('0 0 400 110',`${ent('montes',200,88,62,'#CBDDEA')}${P('M-20 112 Q50 34 160 62 Q230 80 270 112Z','#CDE8BE')}${P('M140 112 Q250 40 420 70 V112Z','#BCDDA8')}${ent('arbol_copa',128,66,24)}${ent('pino',152,68,22)}${ent('arbol',32,92,58)}${ent('pino',70,96,44)}${ent('casa_lado',236,92,36)}${ent('abeto',284,84,34)}${palma(330,98,1.05)}${ent('abeto_ancho',376,98,50)}`,'left:0;width:100%;bottom:calc(54% - 8px);height:calc(24% + 8px)'))
  +capa(.5,lam('0 0 400 40',cerca(),'left:0;width:100%;bottom:calc(54% - 3px);height:7%')+lam('0 0 400 40',`${arbusto(70,40,.9)}${arbusto(300,40,.75,K.verde)}`,'left:0;width:100%;bottom:calc(54% - 3px);height:7%'));
if (window.SCENES) window.SCENES.jardin=JARDIN;
/* Tira de paisaje (montañas, lomas, árboles, casa y palma) que se repite de lado a lado sin costura.
   Se guarda como imagen en la variable CSS --paisaje: la usan el pie de todas las pantallas (#app) y el inicio (.hero.land). */
(function(){ if(!window.ENTORNO) return;
  const tira=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 120" width="400" height="120">${ent('montes',200,84,52,'#CBDDEA')}${P('M-2 122 V80 Q50 58 110 72 Q170 86 220 70 Q250 62 280 70 V122Z','#CDE8BE')}${P('M150 122 V86 Q220 62 300 72 Q360 78 402 80 V122Z','#BCDDA8')}${ent('arbol_copa',118,74,24)}${ent('pino',140,76,22)}${ent('arbol',34,96,46)}${ent('pino_oscuro',64,100,36)}${ent('casa_lado',214,92,30)}${ent('abeto',254,90,30)}${palma(318,104,.8)}${ent('abeto_ancho',368,104,40)}${P('M-2 122 V102 Q60 94 130 100 Q200 106 270 99 Q340 93 402 102 V122Z','#AED69A')}</svg>`;
  try{ document.documentElement.style.setProperty('--paisaje',`url("data:image/svg+xml,${encodeURIComponent(tira)}")`); }catch(e){}
})();
})();
