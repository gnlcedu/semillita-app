/* Semillita · Estilo plano: piezas antiguas re-dibujadas y piezas nuevas del mundo
   =========================================================
   1) Las piezas SVG antiguas de 08-ilustraciones.js (mar, granja, música, clima…) se
      vuelven a generar aquí con los ayudantes planos: sin luz, contorno fino de 1,6 px,
      ojos de punto sin brillo y mejillas planas. Mismo dibujo, estilo nuevo.
   2) Piezas nuevas para lo que antes solo existía en Kenney (animales de los retos,
      frutas, casa, medallas, bandera…).
   Se carga después de 13-plano-lugares.js.
   ========================================================= */
(function(){
const PL=window.PLANO, KIT=window.PLANO_KIT;
const {f}=KIT;
/* ---- ayudantes con la misma firma que los de 08, pero planos ---- */
const SW=3.5, SWP=1.6;
const K={ink:'#4A4658', rosa:'#F4A6A6', dur:'#F7C59F', man:'#F6E39A', men:'#B9E3C6', cie:'#A9D3F0', lav:'#C9B8EE', ros:'#F5B8D0',
  hoja:'#A3D69B', hoja2:'#7FC08E', tierra:'#D9B08A', madera:'#E6C39C', rojo:'#F29A8E', naranja:'#F6B27C', crema:'#FFF6E6',
  blanco:'#FFFFFF', gris:'#D9DDE6', cafe:'#C29A7C', amarillo:'#F6D36F', choco:'#B98466'};
const o=KIT.o;
const at=(c,ex='')=>`fill="${c}"${/stroke=/.test(ex)?'':` stroke="${o(c)}"`}${/stroke-width/.test(ex)?'':` stroke-width="${SWP}"`} vector-effect="non-scaling-stroke" stroke-linejoin="round" stroke-linecap="round"${ex?' '+ex:''}`;
const P=(d,c,ex)=>`<path d="${d}" ${at(c,ex)}/>`;
const E=(cx,cy,rx,ry,c,ex)=>`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" ${at(c,ex)}/>`;
const C=(cx,cy,r,c,ex)=>`<circle cx="${cx}" cy="${cy}" r="${r}" ${at(c,ex)}/>`;
const R=(x,y,w,h,r,c,ex)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" ${at(c,ex)}/>`;
const L=(d,c,w=3)=>`<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const T=(d,c,w=8)=>L(d,o(c),w+2.6)+L(d,c,w);
const luz=()=>'';
const F=(d,c,op=1)=>`<path d="${d}" fill="${c}"${op<1?` opacity="${op}"`:''}/>`;
const D=(cx,cy,r,c,op=1)=>`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${c}"${op<1?` opacity="${op}"`:''}/>`;
const MEJ='#F7B3BF';
const cara=(cx,cy,s=1,sep=9)=>{ const ex=sep*s, r=3*s; return `${D(cx-ex,cy,r,K.ink)}${D(cx+ex,cy,r,K.ink)}<ellipse cx="${cx-ex-4.5*s}" cy="${cy+5*s}" rx="${3.4*s}" ry="${2*s}" fill="${MEJ}"/><ellipse cx="${cx+ex+4.5*s}" cy="${cy+5*s}" rx="${3.4*s}" ry="${2*s}" fill="${MEJ}"/>`+L(`M${cx-3.5*s} ${cy+4*s} Q${cx} ${cy+7*s} ${cx+3.5*s} ${cy+4*s}`,K.ink,2.2*s); };
const ojo=(cx,cy,r=3.2)=>D(cx,cy,r*.9,K.ink);
const mej=(cx,cy,s=1)=>`<ellipse cx="${cx}" cy="${cy}" rx="${3.4*s}" ry="${2*s}" fill="${MEJ}"/>`;
const hoja=(x,y,ang,len,c=K.hoja)=>`<g transform="translate(${x} ${y}) rotate(${ang})">${P(`M0 0 Q${len*.45} ${-len*.42} ${len} 0 Q${len*.45} ${len*.42} 0 0Z`,c)}${L(`M${len*.15} 0 L${len*.7} 0`,shade(c,.5),1.4)}</g>`;
const tallo=(d,c=K.hoja2)=>L(d,c,4.5);
const tierra=()=>P('M14 92 Q14 80 30 78 Q50 74 70 78 Q86 80 86 92Z',K.tierra);
const svg=b=>`<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">${b}</svg>`;
const pet=(cx,cy,n,dist,rx,ry,c)=>Array.from({length:n},(_,i)=>{const a=i*360/n; return `<g transform="rotate(${a} ${cx} ${cy})">${E(cx,cy-dist,rx,ry,c)}</g>`;}).join('');

const VIEJO={
/* ================= JARDÍN ================= */
semilla:(c=K.madera)=>svg(`<g transform="rotate(-18 50 54)">${E(50,54,24,30,c)}${L('M50 28 Q42 46 46 56',o(c),2.5)}${luz(40,40,5,9,0)}</g>${cara(52,60,1.1,8)}`),
brote:()=>svg(`${tallo('M50 96 Q49 80 50 66')}${hoja(50,70,-155,30)}${hoja(50,66,-28,32,K.hoja)}`),
planta:()=>svg(`${tallo('M50 96 Q48 56 50 26')}${hoja(49,66,-160,26)}${hoja(50,60,-20,26)}${hoja(49,46,-150,24,K.hoja2)}${hoja(50,40,-32,24,K.hoja2)}${hoja(50,28,-90,18)}`),
capullo:()=>svg(`${tallo('M50 96 Q48 58 50 34')}${hoja(49,66,-160,26)}${hoja(50,58,-22,26)}${P('M50 14 Q62 22 60 34 Q56 40 50 40 Q44 40 40 34 Q38 22 50 14Z',K.ros)}${P('M40 34 Q50 46 60 34 Q58 42 50 44 Q42 42 40 34Z',K.hoja)}${luz(46,24,3,6,10)}`),
arbusto:()=>svg(`${P('M20 92 Q8 74 22 60 Q22 36 38 36 Q44 22 58 28 Q74 24 78 40 Q92 48 84 64 Q90 92 72 92Z',K.hoja)}${D(38,52,3,shade(K.hoja,-.15))}${D(62,46,3,shade(K.hoja,-.15))}${D(54,64,3,shade(K.hoja,-.15))}${luz(36,42,8,5)}`),
arbol:(c)=>svg(`${P('M43 96 L46 52 L54 52 L57 96Z',K.cafe)}${P('M18 50 Q12 30 30 24 Q36 8 54 12 Q72 8 78 26 Q92 34 84 52 Q78 64 60 60 Q50 66 40 60 Q22 64 18 50Z',K.hoja2)}${c?D(34,38,5,c)+D(60,30,5,c)+D(70,48,5,c)+D(46,50,5,c):''}${luz(36,26,9,5)}`),
palmera:()=>svg(`${P('M45 96 Q44 60 48 34 L54 34 Q54 60 57 96Z',K.hoja2)}${L('M47 70 h8 M47 58 h8 M48 46 h7',o(K.hoja2),2)}${hoja(51,32,-170,34,K.hoja)}${hoja(51,30,-120,30,K.hoja)}${hoja(51,30,-60,30,K.hoja)}${hoja(51,32,-10,34,K.hoja)}${P('M50 34 Q58 40 56 52 Q50 56 46 50 Q44 40 50 34Z',K.rosa)}`),
girasol:()=>svg(`${tallo('M50 96 Q50 76 50 56')}${hoja(50,82,-150,22)}${hoja(50,76,-30,22)}${pet(50,38,12,19,7,12,K.amarillo)}${C(50,38,14,'#C48A5A')}${D(44,33,1.4,shade('#C48A5A',-.25))}${D(57,44,1.4,shade('#C48A5A',-.25))}${D(55,31,1.4,shade('#C48A5A',-.25))}${cara(50,39,.85,6)}`),
tulipan:(c=K.ros)=>svg(`${tallo('M50 96 Q50 74 50 50')}${P('M50 92 Q30 80 28 56 Q42 66 50 84Z',K.hoja)}${P('M50 90 Q70 76 72 54 Q58 64 50 82Z',K.hoja2)}${P('M32 24 Q30 52 50 56 Q70 52 68 24 L60 32 L50 18 L40 32Z',c)}${L('M40 32 Q42 46 50 52 M60 32 Q58 46 50 52',o(c),2)}${luz(38,36,3.5,8,-10)}`),
rosa:(c='#F497AA')=>svg(`${tallo('M50 96 Q52 74 50 54')}${hoja(51,80,-160,22)}${hoja(51,70,-24,22,K.hoja2)}${C(50,38,22,c)}${L('M50 38 m-6 0 a6 6 0 1 1 6 6 a10 10 0 1 1 -12 -12 a14 14 0 0 1 22 10',o(c),2.6)}${luz(40,28,6,4)}`),
cayena:(c=K.rojo)=>svg(`${pet(50,50,5,18,15,19,c)}${C(50,50,9,shade(c,-.1))}${L('M50 50 Q60 36 72 26',K.amarillo,3)}${D(72,26,3.5,K.amarillo)}${D(66,24,2.5,K.amarillo)}${D(74,32,2.5,K.amarillo)}${luz(36,40,6,4)}`),
tomate:(c=K.rojo)=>svg(`${C(50,58,30,c)}${P('M50 30 L42 22 L46 32 L34 30 L44 36 L50 32 L56 36 L66 30 L54 32 L58 22Z',K.hoja2)}${L('M50 28 Q50 20 54 16',o(K.hoja2),3.5)}${luz(36,48,8,5)}${cara(50,62,1,10)}`),
maiz:()=>svg(`${P('M50 12 Q68 18 68 50 Q66 80 50 86 Q34 80 32 50 Q32 18 50 12Z',K.amarillo)}${[22,32,42,52,62,72].map(y=>[40,50,60].map(x=>D(x+(y%20?0:2),y,3,shade(K.amarillo,-.12))).join('')).join('')}${P('M50 92 Q22 84 22 40 Q30 58 46 70Z',K.hoja)}${P('M50 92 Q78 84 78 40 Q70 58 54 70Z',K.hoja2)}${luz(42,28,3,8,10)}`),
fresa:(c=K.rojo)=>svg(`${P('M50 90 Q20 70 22 44 Q26 28 50 30 Q74 28 78 44 Q80 70 50 90Z',c)}${[[38,46],[50,44],[62,46],[34,58],[46,58],[58,60],[66,56],[42,70],[54,72],[48,82]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="1.6" ry="2.4" fill="${K.amarillo}"/>`).join('')}${P('M50 34 L36 24 L44 34 L30 32 L44 40 L50 36 L56 40 L70 32 L56 34 L64 24Z',K.hoja)}${L('M50 26 V14',o(K.hoja2),3.5)}${luz(34,46,4,7,20)}`),
zanahoria:(c=K.naranja)=>svg(`${hoja(50,30,-120,24,K.hoja)}${hoja(50,30,-90,28,K.hoja2)}${hoja(50,30,-60,24,K.hoja)}${P('M30 32 Q50 24 70 32 Q64 62 50 94 Q36 62 30 32Z',c)}${L('M38 46 h8 M54 56 h8 M42 66 h7 M52 76 h5',o(c),2.4)}${luz(40,40,3,8,-15)}`),
sandia:()=>svg(`<g transform="rotate(-12 50 50)">${P('M8 40 A42 42 0 0 0 92 40Z','#8CCB6E')}${P('M15 40 A35 35 0 0 0 85 40Z','#F5F0D8',`stroke-width="0"`)}${P('M19 40 A31 31 0 0 0 81 40Z','#F48FA0',`stroke-width="0"`)}${L('M8 40 H92',o('#F48FA0'),SW)}${[[34,52],[50,60],[66,52],[42,66],[58,66]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="2" ry="3.2" fill="${K.ink}"/>`).join('')}${luz(30,46,6,3,0)}</g>`),
habichuela:()=>svg(`${P('M12 66 Q30 30 86 30 Q74 74 12 66Z',K.hoja)}${E(36,58,6,7,shade(K.hoja,.3))}${E(52,51,6,7,shade(K.hoja,.3))}${E(68,43,6,7,shade(K.hoja,.3))}${L('M86 30 Q92 24 90 16',o(K.hoja2),3.5)}${luz(34,48,8,3,-25)}`),
mango:()=>svg(`${P('M52 20 Q82 24 80 56 Q78 88 46 86 Q18 84 22 56 Q26 28 52 20Z','#F9B95C')}${F('M60 26 Q80 34 78 56 Q74 40 60 26Z','#F48FA0',.55)}${L('M52 20 Q54 12 58 8',o(K.cafe),3.5)}${hoja(56,14,-20,20,K.hoja)}${luz(36,44,6,10,20)}`),
platano:()=>svg(`${P('M18 22 Q18 68 54 82 Q74 88 88 78 Q86 72 80 72 Q58 70 42 52 Q30 38 28 20Z','#E4E88A')}${L('M28 30 Q34 58 60 72',o('#E4E88A'),2)}${P('M18 22 L28 20 L27 13 L19 14Z',K.cafe)}${P('M88 78 L82 72 L86 70 L92 74Z',K.cafe)}${luz(26,40,3,10,-20)}`),
regadera:(c=K.cie)=>svg(`${P('M64 52 L90 26 L94 32 L70 62Z',c)}${E(90,28,7,4,shade(c,-.05),`transform="rotate(-45 90 28)"`)}${P('M24 38 H66 V80 Q66 86 60 86 H30 Q24 86 24 80Z',c)}${T('M30 38 Q30 18 46 18 Q60 18 60 38',c,3)}${R(24,50,42,8,2,shade(c,.4))}${D(84,48,2.4,K.cie)}${D(92,46,2.4,K.cie)}${D(88,56,2.4,K.cie)}${luz(34,68,4,9,0)}`),
gota:(c=K.cie)=>svg(`${P('M50 12 Q74 44 74 62 Q74 86 50 86 Q26 86 26 62 Q26 44 50 12Z',c)}${luz(40,58,5,10,15)}`),
canasta:()=>svg(`${T('M26 44 Q26 14 50 14 Q74 14 74 44',K.madera,3)}${P('M12 42 H88 L80 84 Q78 90 72 90 H28 Q22 90 20 84Z',K.madera)}${L('M16 56 H84 M18 70 H82',o(K.madera),2.4)}${L('M34 44 V88 M50 44 V90 M66 44 V88',o(K.madera),2.4)}${luz(28,52,3,6,0)}`),

/* ================= COLMADO ================= */
pan:()=>svg(`${P('M12 66 Q12 36 50 34 Q88 36 88 66 Q88 78 76 78 H24 Q12 78 12 66Z','#E7B77A')}${L('M32 44 L40 56 M48 40 L56 54 M64 42 L70 54',shade('#E7B77A',.35),3.5)}${luz(26,50,4,8,20)}`),
huevo:()=>svg(`${E(50,54,25,31,K.blanco)}${luz(40,40,5,9,20)}${cara(50,58,.95,8)}`),
guineo:()=>svg(`${[[-24,0],[0,-4],[24,0]].map(([r])=>`<g transform="rotate(${r} 50 26)">${P('M44 28 Q30 58 46 86 Q52 92 58 88 Q46 62 54 30Z',K.amarillo)}${D(52,89,2.2,K.cafe)}</g>`).join('')}${P('M42 20 H58 L56 32 H44Z',K.cafe)}${luz(42,56,2.5,10,8)}`),
leche:()=>svg(`${P('M28 34 L50 16 L72 34 V88 H28Z',K.blanco)}${R(44,10,12,8,2,K.blanco)}${R(28,50,44,22,0,K.cie)}${P('M50 54 Q56 62 56 65 Q56 70 50 70 Q44 70 44 65 Q44 62 50 54Z','#fff')}${L('M28 34 H72',o(K.blanco),2.5)}${luz(36,42,3,5,0)}`),
jugo:(c=K.dur)=>svg(`${L('M62 26 L66 8 L74 8',o(K.rosa),SW+5)}${L('M62 26 L66 8 L74 8',K.rosa,5)}${R(26,26,48,62,8,c)}${C(50,64,12,K.naranja)}${hoja(50,52,-60,10,K.hoja)}${cara(50,42,.8,8)}${luz(34,40,3,8,0)}`),
queso:()=>svg(`${P('M12 76 H88 V52 L12 64Z',K.amarillo)}${P('M12 64 L88 52 L68 30Z',shade(K.amarillo,.3))}${E(32,68,4,3,shade(K.amarillo,-.15),`stroke-width="0"`)}${E(58,66,6,4,shade(K.amarillo,-.15),`stroke-width="0"`)}${E(78,60,3,2.4,shade(K.amarillo,-.15),`stroke-width="0"`)}${E(48,50,4,2,shade(K.amarillo,-.1),`stroke-width="0"`)}`),
chocolate:()=>svg(`${R(24,12,52,76,6,K.choco)}${L('M24 32 H76 M24 50 H76 M50 12 V50',shade(K.choco,-.2),2.5)}${P('M20 54 H80 V86 Q80 92 74 92 H26 Q20 92 20 86Z',K.rosa)}${P('M20 54 L30 60 L40 54 L50 60 L60 54 L70 60 L80 54',K.rosa)}${L('M34 74 H66',shade(K.rosa,.5),4)}${luz(32,22,3,6,0)}`),
aguacate:()=>svg(`${P('M50 10 Q72 12 72 40 Q88 60 76 80 Q64 94 50 92 Q36 94 24 80 Q12 60 28 40 Q28 12 50 10Z','#8CCB6E')}${F('M50 20 Q64 22 64 44 Q78 62 68 76 Q60 86 50 84 Q40 86 32 76 Q22 62 36 44 Q36 22 50 20Z','#E6F2A2')}${C(50,62,13,'#B47A52')}${luz(45,57,3,5,0)}`),
dulce:()=>svg(`${P('M30 50 L10 34 L14 50 L10 66Z',shade(K.ros,.35))}${P('M70 50 L90 34 L86 50 L90 66Z',shade(K.ros,.35))}${C(50,50,20,K.ros)}${L('M50 50 m-10 0 a10 10 0 1 1 10 10 a6 6 0 1 1 -6 -6',shade(K.ros,.6),3.5)}${luz(42,40,5,3)}`),
arroz:()=>svg(`${P('M18 50 Q22 26 50 26 Q78 26 82 50Z','#FFFDF6')}${[[34,40],[44,34],[56,36],[66,42],[48,44],[40,46],[60,46]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="2.4" ry="1.3" fill="${shade('#FFFDF6',-.12)}" transform="rotate(30 ${x} ${y})"/>`).join('')}${P('M12 50 H88 Q86 86 50 88 Q14 86 12 50Z',K.cie)}${L('M24 66 Q50 74 76 66',shade(K.cie,.5),3)}${luz(24,60,3,6,-20)}`),
limon:()=>svg(`${P('M12 54 Q20 30 50 30 Q80 30 88 54 Q80 78 50 78 Q20 78 12 54Z','#C6E07A')}${hoja(60,30,-40,20,K.hoja2)}${luz(34,46,9,4,-10)}`),
refresco:(c=K.rojo)=>svg(`${L('M54 22 L60 4',o(K.blanco),SW+5)}${L('M54 22 L60 4',K.blanco,5)}${P('M26 26 H74 L68 90 H32Z',c)}${R(22,18,56,10,5,K.blanco)}${R(29,48,42,14,0,K.blanco)}${L('M38 55 Q50 50 62 55',c,3)}${luz(36,72,3,9,0)}`),
funda:()=>svg(`${T('M30 34 Q30 12 40 12 Q48 12 48 34',K.cie,3)}${T('M52 34 Q52 12 62 12 Q70 12 70 34',K.cie,3)}${P('M20 34 H80 L84 86 Q84 90 80 90 H20 Q16 90 16 86Z','#E4F1FB')}${L('M30 46 Q32 66 28 84 M70 46 Q68 66 72 84',shade('#E4F1FB',-.15),2.5)}${luz(32,60,3,12,0)}`),
caja:()=>svg(`${R(22,14,40,20,4,'#E4F1FB')}${L('M30 24 H54',shade(K.cie,-.2),3)}${P('M14 40 H86 L90 74 H10Z',K.lav)}${[24,38,52,66].map(x=>[48,60].map(y=>R(x,y,9,7,2,'#fff',`stroke-width="2"`)).join('')).join('')}${R(10,74,80,16,4,shade(K.lav,-.08))}${R(42,79,16,6,3,K.amarillo,`stroke-width="2"`)}${L('M38 34 V40',o(K.lav),5)}`),

/* ================= MAR ================= */
pez:(c=K.cie)=>svg(`${P('M68 50 L90 30 Q86 50 90 70Z',shade(c,-.08))}${P('M14 50 Q34 22 62 34 Q74 42 74 50 Q74 58 62 66 Q34 78 14 50Z',c)}${P('M40 30 Q50 20 58 32Z',shade(c,-.08))}${P('M42 60 Q48 70 54 64Z',shade(c,-.08))}${L('M50 38 Q46 50 50 62',o(c),2.2)}${ojo(30,46,3.6)}${mej(32,55)}${luz(36,38,6,3,-15)}`),
pez_tropical:()=>svg(`${P('M70 50 L90 32 Q86 50 90 68Z',K.lav)}${P('M30 26 Q44 6 62 26Z',K.lav)}${P('M30 74 Q44 94 62 74Z',K.lav)}${P('M12 50 Q22 20 48 20 Q72 22 74 50 Q72 78 48 80 Q22 80 12 50Z',K.amarillo)}${L('M40 24 Q36 50 40 76','#F48FA0',6)}${L('M58 24 Q62 50 58 76','#F48FA0',6)}${ojo(26,44,3.6)}${mej(28,53)}${luz(26,32,6,3,-25)}`),
pez_globo:()=>svg(`${P('M74 50 L90 38 Q88 50 90 62Z',K.dur)}${Array.from({length:12},(_,i)=>{const a=i*30*Math.PI/180, x=50+30*Math.cos(a), y=50+30*Math.sin(a), x2=50+37*Math.cos(a), y2=50+37*Math.sin(a); return L(`M${x.toFixed(1)} ${y.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}`,o('#F6D68A'),3);}).join('')}${C(48,50,30,'#F6D68A')}${F('M24 58 Q48 82 72 58 Q60 74 48 74 Q34 74 24 58Z','#fff',.55)}${cara(40,46,1,8)}${luz(34,32,7,4)}`),
pulpo:(c=K.lav)=>svg(`${[18,32,46,60,74].map((x,i)=>T(`M${x+6} 58 Q${x-2+i%2*8} 74 ${x+4} 84 Q${x+12} 90 ${x+14} 82`,c,8)).join('')}${P('M18 58 Q16 14 50 12 Q84 14 82 58 Q66 66 50 64 Q34 66 18 58Z',c)}${cara(50,42,1.1,10)}${luz(34,26,8,5)}`),
calamar:(c='#F7B5A8')=>svg(`${[34,42,50,58,66].map((x,i)=>T(`M${x} 66 Q${x+(i%2?6:-6)} 80 ${x} 92`,c,5)).join('')}${P('M50 6 L72 30 L64 34 V66 Q50 72 36 66 V34 L28 30Z',c)}${ojo(43,52,3)}${ojo(57,52,3)}${mej(39,59,.8)}${mej(61,59,.8)}${luz(44,30,3,8,0)}`),
cangrejo:(c=K.rojo)=>svg(`${[[28,64,14,78],[30,70,18,86],[72,64,86,78],[70,70,82,86]].map(([a,b,x,y])=>L(`M${a} ${b} L${x} ${y}`,o(c),4)).join('')}${L('M30 52 L18 40 M70 52 L82 40',o(c),4)}${P('M10 38 Q6 22 18 20 Q20 30 26 30 Q24 40 10 38Z',c)}${P('M90 38 Q94 22 82 20 Q80 30 74 30 Q76 40 90 38Z',c)}${L('M40 46 V32 M60 46 V32',o(c),3)}${C(40,30,5,K.blanco)}${C(60,30,5,K.blanco)}${D(41,30,2.4,K.ink)}${D(61,30,2.4,K.ink)}${E(50,60,26,18,c)}${mej(36,62)}${mej(64,62)}${L('M46 62 Q50 66 54 62',K.ink,2.4)}${luz(40,52,6,3,-10)}`),
langosta:(c='#F49B7A')=>svg(`${L('M40 34 L22 18 M60 34 L78 18',o(c),3)}${P('M30 40 Q14 40 12 26 Q20 30 26 28 Q22 18 30 14 Q38 24 34 38Z',c)}${P('M70 40 Q86 40 88 26 Q80 30 74 28 Q78 18 70 14 Q62 24 66 38Z',c)}${E(50,44,16,14,c)}${[60,70,79].map((y,i)=>E(50,y,13-i*2,6,c)).join('')}${P('M50 84 L36 94 Q50 98 64 94Z',shade(c,.2))}${ojo(44,42,2.8)}${ojo(56,42,2.8)}${luz(44,38,4,2.5,0)}`),
tortuga:(c='#9ED4A0')=>svg(`<g transform="translate(100 0) scale(-1 1)">${E(22,70,10,6,K.men,`transform="rotate(30 22 70)"`)}${E(74,72,10,6,K.men,`transform="rotate(-30 74 72)"`)}${E(30,40,10,6,K.men,`transform="rotate(-30 30 40)"`)}${C(82,50,12,K.men)}${P('M14 58 Q16 26 48 24 Q76 26 76 58Z',c)}${L('M36 58 L40 40 L56 40 L60 58 M40 40 L34 30 M56 40 L62 30',o(c),2.4)}${R(12,56,66,8,4,shade(c,.2))}${ojo(86,47,2.8)}${mej(88,54,.7)}${luz(32,34,7,3,-20)}</g>`),
delfin:(c='#9CC9EA')=>svg(`${P('M84 30 L94 18 L96 36Z',c)}${P('M10 60 Q16 40 40 34 Q60 30 84 30 Q80 50 60 58 Q40 66 20 64 L10 66Z',c)}${P('M50 32 Q52 18 64 14 Q60 24 62 32Z',c)}${F('M14 62 Q40 60 60 52 Q46 64 22 66Z','#fff',.6)}${P('M44 56 Q42 70 52 72 Q52 64 56 58Z',c)}${ojo(28,48,3)}${mej(28,55,.8)}${L('M12 60 Q16 62 20 60',K.ink,2)}${luz(46,38,8,2.5,-10)}`),
tiburon:(c='#AFC3D6')=>svg(`${P('M76 48 L94 28 L90 50 L94 72Z',c)}${P('M8 54 Q20 34 50 34 Q72 36 80 50 Q72 64 50 66 Q20 68 8 54Z',c)}${P('M40 36 L52 12 L58 36Z',c)}${F('M10 56 Q30 64 50 64 Q70 62 78 52 Q66 70 44 70 Q20 70 10 56Z','#fff',.7)}${L('M54 46 v10 M60 46 v10',o(c),2.2)}${ojo(24,48,3)}${mej(26,56,.8)}${L('M12 58 Q20 62 28 58',K.ink,2.2)}${luz(36,42,8,2.5,-8)}`),
ballena:(c='#8EB8E6')=>svg(`${L('M40 22 Q36 10 30 8 M40 22 Q44 10 50 8 M40 22 V8',K.cie,3)}${P('M8 56 Q8 28 42 28 Q70 28 80 50 L92 36 Q96 50 90 60 Q94 70 92 76 L80 64 Q70 80 42 80 Q8 80 8 56Z',c)}${F('M12 64 Q30 80 56 76 Q40 72 24 66Z','#fff',.6)}${L('M20 66 Q36 74 54 72',o(c),2)}${ojo(26,50,3.4)}${mej(28,58,.9)}${luz(32,36,10,3,-10)}`),
medusa:(c=K.ros)=>svg(`${[30,40,50,60,70].map((x,i)=>L(`M${x} 54 Q${x+(i%2?6:-6)} 68 ${x} 78 Q${x+(i%2?-6:6)} 86 ${x} 94`,o(c),3)).join('')}${P('M16 56 Q16 14 50 14 Q84 14 84 56 Q76 52 68 56 Q60 52 50 56 Q40 52 32 56 Q24 52 16 56Z',c)}${cara(50,38,1,10)}${luz(32,28,7,4)}`),
castillo:(c='#F2D3A6')=>svg(`${P('M8 90 Q50 80 92 90 V94 H8Z',shade(c,-.05))}${P('M14 90 V42 H22 V36 H28 V42 H34 V36 H40 V90Z',c)}${P('M60 90 V42 H66 V36 H72 V42 H78 V36 H86 V90Z',c)}${P('M34 90 V52 H40 V46 H46 V52 H54 V46 H60 V52 H66 V90Z',shade(c,.15))}${P('M42 90 V74 Q50 64 58 74 V90Z',K.cie)}${L('M50 46 V22',o(c),2.5)}${P('M50 22 L64 27 L50 32Z',K.rosa)}${R(20,52,7,9,3,K.cie,`stroke-width="2"`)}${R(70,52,7,9,3,K.cie,`stroke-width="2"`)}`),
coral:(c='#F7A1A1')=>svg(`${T('M50 92 V60 Q50 46 40 38 V20 M50 64 Q60 52 66 40 V26 M40 46 Q28 40 24 28 M66 44 Q76 42 80 32',c,9)}${D(40,18,5.5,c)}${D(66,24,5.5,c)}${D(24,26,5.5,c)}${D(80,30,5.5,c)}${P('M30 92 Q50 84 70 92Z',shade(c,-.05))}`),
concha:(c=K.ros)=>svg(`${P('M50 86 L18 50 Q14 20 50 16 Q86 20 82 50Z',c)}${L('M50 86 L30 26 M50 86 L42 18 M50 86 L58 18 M50 86 L70 26',o(c),2.4)}${P('M40 86 H60 L56 92 H44Z',c)}${luz(36,36,5,8,-20)}`),
alga:(c=K.hoja2)=>svg(`${T('M36 94 Q24 74 36 56 Q46 40 34 20',c,9)}${T('M60 94 Q72 76 60 60 Q50 46 62 30',c,8)}${T('M48 94 Q44 82 50 70',c,7)}`),

/* ================= GRANJA ================= */
vaca:()=>svg(`${P('M26 30 Q22 18 14 20 Q18 28 26 32Z','#F2E3C6')}${P('M74 30 Q78 18 86 20 Q82 28 74 32Z','#F2E3C6')}${E(18,40,11,6,K.blanco,`transform="rotate(-20 18 40)"`)}${E(82,40,11,6,K.blanco,`transform="rotate(20 82 40)"`)}${P('M24 46 Q22 22 50 20 Q78 22 76 46 Q78 70 68 78 H32 Q22 70 24 46Z',K.blanco)}${F('M30 30 Q40 26 42 36 Q38 46 30 42Z','#8A8496')}${F('M64 24 Q74 28 72 40 Q64 38 62 30Z','#8A8496')}${E(50,72,22,14,K.ros)}${D(42,72,2.6,shade(K.ros,-.3))}${D(58,72,2.6,shade(K.ros,-.3))}${ojo(38,50,3.4)}${ojo(62,50,3.4)}${luz(36,30,6,3)}`),
cerdo:(c=K.ros)=>svg(`${P('M22 34 L18 12 L40 24Z',c)}${P('M78 34 L82 12 L60 24Z',c)}${C(50,52,32,c)}${E(50,62,14,10,shade(c,-.08))}${E(45,62,2.4,3.4,shade(c,-.4),`stroke-width="0"`)}${E(55,62,2.4,3.4,shade(c,-.4),`stroke-width="0"`)}${ojo(38,46,3.4)}${ojo(62,46,3.4)}${mej(30,58)}${mej(70,58)}${luz(34,32,7,4)}`),
gallina:()=>svg(`${P('M40 22 Q40 10 48 14 Q52 6 58 14 Q66 12 62 24Z',K.rojo)}${P('M78 60 Q94 46 90 32 Q80 44 74 46Z',K.blanco)}${P('M20 58 Q18 28 48 24 Q74 26 76 54 Q78 84 48 86 Q20 84 20 58Z',K.blanco)}${P('M50 66 Q62 56 72 66 Q64 78 50 74Z',shade(K.blanco,-.06))}${P('M14 44 L24 40 L24 48Z',K.naranja)}${P('M24 50 Q20 58 26 60 Q30 56 28 50Z',K.rojo)}${ojo(34,40,3.2)}${mej(38,50)}${L('M40 86 V94 M56 86 V94',K.naranja,3.5)}${luz(34,32,6,3)}`),
oveja:()=>svg(`${[[26,30],[44,20],[62,22],[78,34],[82,54],[74,72],[56,80],[36,78],[20,66],[16,46]].map(([x,y])=>C(x,y,13,K.blanco)).join('')}${C(50,50,28,K.blanco,`stroke-width="0"`)}${E(26,48,9,5,'#9A93A8',`transform="rotate(25 26 48)"`)}${E(74,48,9,5,'#9A93A8',`transform="rotate(-25 74 48)"`)}${E(50,54,18,22,'#9A93A8')}${P('M36 40 Q42 28 50 34 Q58 28 64 40 Q50 36 36 40Z',K.blanco)}${D(43,52,3.2,K.blanco)}${D(57,52,3.2,K.blanco)}${D(43,52,1.8,K.ink)}${D(57,52,1.8,K.ink)}${L('M46 66 Q50 69 54 66',K.ink,2.2)}${luz(30,26,5,3)}`),
caballo:(c='#C99A72')=>svg(`${P('M34 24 L32 8 L44 18Z',c)}${P('M66 24 L68 8 L56 18Z',c)}${P('M30 40 Q30 18 50 16 Q70 18 70 40 L66 72 Q66 88 50 88 Q34 88 34 72Z',c)}${P('M40 18 Q50 6 62 18 Q56 30 50 34 Q44 26 40 18Z',K.choco)}${E(50,74,15,12,shade(c,.3))}${D(44,74,2.4,shade(c,-.4))}${D(56,74,2.4,shade(c,-.4))}${ojo(40,46,3.2)}${ojo(60,46,3.2)}${luz(38,36,4,6,0)}`),
pato:(c=K.man)=>svg(`${P('M30 66 Q16 52 22 40 Q30 52 40 54Z',c)}${P('M20 66 Q20 44 44 46 L58 48 Q86 50 86 70 Q84 88 52 88 Q24 88 20 66Z',c)}${C(62,34,18,c)}${P('M76 36 Q92 34 94 40 Q90 46 76 44Z',K.naranja)}${P('M38 66 Q50 58 62 66 Q54 76 38 72Z',shade(c,-.06))}${ojo(66,30,3.2)}${mej(70,40,.8)}${luz(56,24,5,3)}`),
perro:(c=K.dur)=>svg(`${P('M24 30 Q8 34 12 60 Q20 66 28 52Z',K.cafe)}${P('M76 30 Q92 34 88 60 Q80 66 72 52Z',K.cafe)}${P('M24 48 Q22 20 50 20 Q78 20 76 48 Q78 80 50 82 Q22 80 24 48Z',c)}${E(50,62,16,12,shade(c,.45))}${E(50,56,6,4.5,K.ink)}${P('M46 68 Q50 80 54 68Z',K.rosa)}${ojo(38,44,3.4)}${ojo(62,44,3.4)}${luz(36,30,6,3)}`),
gato:(c='#C8C3D6')=>svg(`${P('M22 40 L20 10 L44 26Z',c)}${P('M78 40 L80 10 L56 26Z',c)}${F('M25 32 L24 17 L36 26Z',K.ros)}${F('M75 32 L76 17 L64 26Z',K.ros)}${P('M20 54 Q20 24 50 24 Q80 24 80 54 Q80 82 50 82 Q20 82 20 54Z',c)}${P('M46 58 H54 L50 63Z',K.ros,`stroke-width="2"`)}${L('M50 63 Q46 68 42 66 M50 63 Q54 68 58 66',K.ink,2.2)}${L('M16 58 H32 M16 64 L32 62 M84 58 H68 M84 64 L68 62',o(c),2)}${ojo(38,48,3.4)}${ojo(62,48,3.4)}${luz(34,36,6,3)}`),
chivo:(c='#E8DCCB')=>svg(`${T('M38 24 Q30 10 20 14',K.madera,5)}${T('M62 24 Q70 10 80 14',K.madera,5)}${E(18,42,12,5,c,`transform="rotate(20 18 42)"`)}${E(82,42,12,5,c,`transform="rotate(-20 82 42)"`)}${P('M30 40 Q30 20 50 20 Q70 20 70 40 L66 68 Q64 80 50 80 Q36 80 34 68Z',c)}${P('M44 78 Q50 96 56 78Z',shade(c,-.1))}${E(50,66,10,7,shade(c,.3))}${D(46,66,1.8,K.ink)}${D(54,66,1.8,K.ink)}${ojo(40,46,3.2)}${ojo(60,46,3.2)}${luz(40,30,5,3)}`),
granero:()=>svg(`${P('M10 46 L50 14 L90 46Z',shade(K.rojo,-.05))}${R(18,42,64,48,2,K.rojo)}${R(36,58,28,32,2,K.blanco)}${L('M36 58 L64 90 M64 58 L36 90',o(K.blanco),3)}${R(43,30,14,12,2,K.blanco)}${L('M10 46 L50 14 L90 46',K.blanco,4)}`),

/* ================= MÚSICA ================= */
piano:()=>svg(`${R(12,20,76,50,8,K.lav)}${R(12,52,76,22,3,'#fff')}${[22,32,42,52,62,72,82].map(x=>L(`M${x} 52 V74`,o('#fff'),1.8)).join('')}${[20,30,48,58,68].map(x=>R(x,52,5,12,1.5,K.ink,`stroke-width="0"`)).join('')}${R(18,74,8,16,2,K.lav)}${R(74,74,8,16,2,K.lav)}${L('M30 34 h4 M40 30 h4',shade(K.lav,.5),3)}${luz(24,30,6,3,0)}`),
guitarra:()=>svg(`<g transform="rotate(35 50 50)">${R(45,4,10,48,3,K.cafe)}${R(43,0,14,10,4,K.choco)}${P('M50 40 Q34 38 34 54 Q34 62 38 66 Q28 74 32 86 Q38 98 50 98 Q62 98 68 86 Q72 74 62 66 Q66 62 66 54 Q66 38 50 40Z','#F2B57A')}${C(50,64,7,K.choco)}${R(40,80,20,5,2,K.choco,`stroke-width="2"`)}${L('M48 8 V82 M52 8 V82',shade('#F2B57A',.6),1.2)}${luz(42,52,3,6,0)}</g>`),
flauta:()=>svg(`<g transform="rotate(-40 50 50)">${R(42,4,16,92,8,'#E8D2B0')}${R(40,4,20,14,6,shade('#E8D2B0',-.1))}${[34,46,58,70,82].map(y=>D(50,y,3.4,shade('#E8D2B0',-.45))).join('')}${luz(46,40,1.8,14,0)}</g>`),
violin:()=>svg(`${L('M16 86 L86 16',o(K.madera),SW+4)}${L('M16 86 L86 16',K.madera,4)}<g transform="rotate(-30 46 56)">${R(42,4,8,34,3,K.choco)}${C(46,6,5,K.choco)}${P('M46 30 Q30 30 30 46 Q30 52 34 56 Q26 62 28 74 Q32 88 46 88 Q60 88 64 74 Q66 62 58 56 Q62 52 62 46 Q62 30 46 30Z','#D9925B')}${L('M38 58 q-2 6 0 10 M54 58 q2 6 0 10',shade('#D9925B',-.45),2)}${R(41,76,10,4,2,K.choco,`stroke-width="1.5"`)}${luz(38,42,3,6,0)}</g>`),
bateria:()=>svg(`${L('M28 14 L46 42 M74 12 L56 40',o(K.madera),SW+4)}${L('M28 14 L46 42 M74 12 L56 40',K.madera,4)}${D(28,14,4,K.madera)}${D(74,12,4,K.madera)}${P('M16 46 V78 Q16 90 50 90 Q84 90 84 78 V46Z',K.rosa)}${L('M16 50 L30 84 L44 50 L58 88 L72 50 L84 80',shade(K.rosa,.6),2.6)}${E(50,46,34,10,K.blanco)}${luz(30,64,3,9,0)}`),
xilofono:()=>svg(`${R(10,70,80,8,3,K.madera)}${['#F4A6A6','#F7C59F','#F6E39A','#B9E3C6','#A9D3F0','#C9B8EE'].map((c,i)=>R(12+i*13,22+i*6,11,58-i*10,3,c)).join('')}${L('M70 10 L88 30',o(K.madera),SW+3)}${L('M70 10 L88 30',K.madera,3)}${C(68,8,5,K.rosa)}${luz(16,30,2,6,0)}`),
tambora:()=>svg(`${R(44,22,16,62,8,K.gris)}${[32,42,52,62,72].map(y=>[49,55].map(x=>D(x,y,1.4,shade(K.gris,-.4))).join('')).join('')}${L('M66 30 L54 86',o(K.gris),SW+2)}${L('M66 30 L54 86',K.gris,2)}${P('M10 40 Q22 34 34 40 V78 Q22 84 10 78Z',K.madera)}${E(10,59,6,19,K.blanco)}${E(34,59,6,19,K.blanco)}${L('M12 44 L32 52 L12 62 L32 70 L14 76',K.rojo,2.6)}${luz(20,48,2,6,0)}`)
};

/* íconos antiguos y clima */
const heart='M50 86 Q14 62 14 38 Q14 18 32 18 Q44 18 50 30 Q56 18 68 18 Q86 18 86 38 Q86 62 50 86Z';
const drop=(x,y,s,c)=>`<g transform="translate(${x} ${y}) scale(${s})">${P('M0 -22 Q16 -2 16 8 Q16 22 0 22 Q-16 22 -16 8 Q-16 -2 0 -22Z',c)}${luz(-6,6,3,6,15)}</g>`;
const rayos=(cx,cy,r1,r2,n,c)=>Array.from({length:n},(_,i)=>{const a=i*2*Math.PI/n; return L(`M${(cx+r1*Math.cos(a)).toFixed(1)} ${(cy+r1*Math.sin(a)).toFixed(1)} L${(cx+r2*Math.cos(a)).toFixed(1)} ${(cy+r2*Math.sin(a)).toFixed(1)}`,c,5);}).join('');
const nubeSvg=(x,y,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})">${P('M-26 10 Q-34 10 -34 2 Q-34 -8 -22 -8 Q-20 -22 -6 -22 Q8 -24 12 -12 Q26 -14 28 0 Q36 2 34 10 Q32 14 26 14 H-22 Q-26 14 -26 10Z',K.blanco)}${luz(-10,-12,6,3)}</g>`;
Object.assign(VIEJO,{
sol:()=>svg(`${rayos(50,50,34,46,12,'#F7C948')}${C(50,50,28,K.amarillo)}${luz(40,38,8,5)}${cara(50,54,1.1,9)}`),
/* accesorios del animalito en escena (fase 6): se dibujan sobre creature() */
careta:()=>svg(`${L('M8 50 Q50 40 92 50',K.ink,5)}${R(16,34,32,26,12,'#BFE3F7','fill-opacity=".85"')}${R(52,34,32,26,12,'#BFE3F7','fill-opacity=".85"')}${L('M48 46 H52',o(K.cie),4)}${luz(26,42,5,3)}${luz(62,42,5,3)}${T('M88 56 Q96 50 94 30 V8',K.amarillo,5)}${R(88,2,12,8,3,K.rosa)}`),
bata:()=>svg(`${P('M18 22 Q50 30 82 22 L90 96 Q50 100 10 96Z','#FFFFFF')}${P('M38 26 L50 52 L62 26',K.cie,'fill="none" stroke-width="4"')}${L('M50 52 V94',o('#FFFFFF'),2.5)}${D(56,62,2.6,'#8F82C6')}${D(56,76,2.6,'#8F82C6')}${R(22,64,16,12,3,'#F4F1EC','stroke-width="2"')}${L('M26 64 V58 M30 64 V56',K.cie,2.5)}`),
delantal:()=>svg(`${L('M30 8 Q50 22 70 8',K.rosa,4)}${P('M28 20 H72 L78 94 Q50 98 22 94Z',K.rosa)}${R(36,56,28,20,5,shade(K.rosa,.35),'stroke-width="2.5"')}${L('M16 44 Q30 40 28 30 M84 44 Q70 40 72 30',o(K.rosa),3)}${D(50,36,3,K.blanco)}`),
w_nubes:()=>svg(`${nubeSvg(38,40,.9)}${nubeSvg(56,62,1.2)}`),
w_lluvia:()=>svg(`${nubeSvg(50,40,1.3)}${[30,48,66].map((x,i)=>drop(x,72+(i%2)*8,.38,K.cie)).join('')}`),
w_tormenta:()=>svg(`${nubeSvg(50,38,1.3)}${P('M54 50 L38 72 H50 L44 94 L66 66 H54 L60 50Z',K.amarillo)}`),
w_arcoiris:()=>svg(`${[['#F4A6A6',40],['#F7C59F',33],['#F6E39A',26],['#B9E3C6',19],['#A9D3F0',12]].map(([c,r])=>L(`M${50-r} 70 A${r} ${r} 0 0 1 ${50+r} 70`,c,7)).join('')}${nubeSvg(16,72,.55)}${nubeSvg(84,72,.55)}`),
w_viento:()=>svg(`${L('M12 36 H58 Q72 36 72 24 Q72 14 62 14 Q54 14 54 22',K.cie,7)}${L('M12 54 H76 Q90 54 90 66 Q90 76 80 76 Q72 76 72 68',K.cie,7)}${L('M20 72 H46',K.cie,7)}${hoja(48,86,-20,20,K.hoja)}`),
ic_weather:()=>svg(`<g transform="translate(-10 -8) scale(.8)">${rayos(50,50,34,46,10,'#F7C948')}${C(50,50,26,K.amarillo)}${luz(40,40,7,4)}</g>${nubeSvg(60,66,1.25)}`),
ic_paint:()=>svg(`${P('M50 12 Q88 12 90 46 Q92 68 72 66 Q60 66 62 78 Q64 92 44 88 Q10 82 10 50 Q10 12 50 12Z','#F2D3A6')}${C(34,38,7,K.rojo)}${C(52,28,7,K.amarillo)}${C(70,36,7,K.cie)}${C(30,60,7,K.hoja)}${C(54,56,6,'#F2D3A6')}${luz(26,28,7,4)}`),
ic_mix:()=>svg(`${drop(36,46,1.15,K.rosa)}${drop(64,46,1.15,K.cie)}${drop(50,68,1.15,K.amarillo)}${D(50,54,6,K.lav,.9)}`),
ic_bubble:()=>svg(`${[[38,56,26],[72,34,16],[72,74,12]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#DCEFFB" fill-opacity=".75" stroke="${o(K.cie)}" stroke-width="${SW}"/>${luz(x-r*.35,y-r*.35,r*.28,r*.16)}${L(`M${x+r*.2} ${y+r*.55} q${r*.3} -${r*.2} ${r*.4} -${r*.5}`,'#fff',2.5)}`).join('')}`),
ic_beads:()=>svg(`${R(12,14,76,72,8,K.madera)}${R(19,21,62,58,4,K.crema)}${[32,50,68].map((y,i)=>L(`M19 ${y} H81`,o(K.madera),2.5)+[0,1,2,3].map(j=>C(28+j*11+(i===1?14:0),y,5.5,[K.rosa,K.amarillo,K.cie][i])).join('')).join('')}`),
ic_clock:()=>svg(`${C(24,22,9,K.rosa)}${C(76,22,9,K.rosa)}${L('M30 84 L24 92 M70 84 L76 92',o(K.lav),4)}${C(50,54,34,K.lav)}${C(50,54,26,K.blanco)}${[0,90,180,270].map(a=>`<circle cx="${50+20*Math.sin(a*Math.PI/180)}" cy="${54-20*Math.cos(a*Math.PI/180)}" r="2.2" fill="${K.ink}"/>`).join('')}${L('M50 54 V38 M50 54 L62 60',K.ink,3.5)}${D(50,54,3.5,K.rojo)}${luz(36,38,6,3)}`),
ic_maps:()=>svg(`${P('M10 26 L34 16 L64 28 L90 18 V76 L64 86 L34 74 L10 84Z',K.men)}${L('M34 16 V74 M64 28 V86',o(K.men),2.5)}${F('M18 50 Q30 40 42 50 Q52 58 58 48',shade(K.hoja,.2),.8)}${P('M66 24 Q80 24 80 38 Q80 48 66 62 Q52 48 52 38 Q52 24 66 24Z',K.rojo)}${D(66,38,5,'#fff')}`),
ic_body:()=>svg(`${P(heart,'#F48FA0')}${luz(32,32,7,4)}${cara(50,50,1.1,10)}`),
ic_lab:()=>svg(`${R(38,8,24,8,3,'#EAF4FB')}${P('M41 16 H59 V38 L80 78 Q84 88 74 88 H26 Q16 88 20 78 L41 38Z','#EAF4FB')}${F('M31 60 H69 L77 77 Q80 84 73 84 H27 Q20 84 23 77Z',K.men)}${L('M31 60 H69',o(K.men),2.5)}${D(44,72,3.5,'#fff',.8)}${D(56,66,2.5,'#fff',.8)}${C(64,30,4.5,K.men)}${C(72,18,3,K.men)}${luz(48,28,2,7,0)}`),
ic_tangram:()=>svg(`${P('M14 14 H86 L50 50Z',K.rosa)}${P('M14 14 L50 50 L14 86Z',K.cie)}${P('M86 14 V50 L68 32Z',K.amarillo)}${P('M50 50 L68 32 L86 50 L68 68Z',K.men)}${P('M14 86 L50 50 L50 86Z',K.lav)}${P('M50 86 L50 50 L68 68 L68 86Z',K.dur)}${P('M68 86 V68 L86 50 V86Z',K.ros)}`),
ic_maze:()=>svg(`${R(10,10,80,80,12,K.lav)}${L('M24 24 H62 M24 24 V76 M38 38 H76 V62 M38 38 V62 H58 M24 76 H76 V62',K.blanco,6)}${D(31,31,5,K.rojo)}${P('M68 64 l3 6 7 1 -5 5 1 7 -6 -3 -6 3 1 -7 -5 -5 7 -1Z',K.amarillo,'stroke-width="2"')}`),
ic_hanoi:()=>svg(`${R(8,80,84,10,4,K.madera)}${[24,50,76].map(x=>R(x-3,26,6,56,3,K.madera)).join('')}${R(10,70,28,10,5,K.cie)}${R(14,60,20,10,5,K.amarillo)}${R(18,50,12,10,5,K.rosa)}${R(40,70,20,10,5,K.men)}`),
ic_slide:()=>svg(`${R(10,10,80,80,12,K.madera)}${[0,1,2].map(r=>[0,1,2].map(c=> r===2&&c===2?'':R(16+c*24,16+r*24,20,20,5,[K.rosa,K.amarillo,K.cie,K.men,K.lav,K.dur,K.ros,K.rosa][r*3+c])).join('')).join('')}`),
ic_balance:()=>svg(`${R(30,84,40,8,4,K.madera)}${R(47,30,6,56,3,K.madera)}${L('M16 34 L84 26',o(K.gris),5)}${L('M16 34 L84 26',K.gris,3)}${C(50,30,5,K.amarillo)}${L('M16 34 L8 58 M16 34 L24 58 M84 26 L76 50 M84 26 L92 50',o(K.gris),2)}${P('M4 58 H28 Q26 68 16 68 Q6 68 4 58Z',K.rosa)}${P('M72 50 H96 Q94 60 84 60 Q74 60 72 50Z',K.cie)}`),
ic_av_learn:()=>svg(`${P('M30 30 Q30 12 50 12 Q70 12 70 30',`none`,`stroke="${o(K.rojo)}" stroke-width="6" fill="none"`)}${R(18,26,64,64,16,K.rojo)}${R(30,54,40,26,8,shade(K.rojo,.25))}${L('M30 62 H70',o(K.rojo),2.5)}${D(50,62,3,K.amarillo)}${luz(30,38,4,8,0)}${cara(50,40,.8,8)}`),
ic_av_math:()=>svg(`${P('M58 6 L24 54 H46 L38 94 L76 40 H54Z',K.amarillo)}${luz(48,30,3,9,30)}`),
ic_av_fluency:()=>svg(`${P('M50 30 Q32 20 12 24 V80 Q32 76 50 86Z',K.blanco)}${P('M50 30 Q68 20 88 24 V80 Q68 76 50 86Z',K.blanco)}${L('M20 38 Q32 36 42 40 M20 50 Q32 48 42 52 M58 40 Q68 36 80 38 M58 52 Q68 48 80 50',shade(K.cie,-.2),2.5)}${L('M50 30 V86',o(K.blanco),2.5)}${L('M70 8 Q78 14 74 22 M80 4 Q92 14 84 26',K.rosa,3.5)}`)
});

/* lo que ya tiene pieza plana nueva no se pisa */
Object.keys(VIEJO).forEach(n=>{ if(!PL[n]) PL[n]=VIEJO[n]; });
/* ---------- piezas nuevas (antes solo en Kenney) ---------- */
const {estrella,bola,anillo}=KIT;
const TINTA='#5B5872', OSO='#C29A7C', MONO='#C9956E', PIEL='#F2D3B0', ELE='#B8C2D6';
const eyes=(y,sep=11,x=50,r=3)=>D(x-sep,y,r,K.ink)+D(x+sep,y,r,K.ink);
Object.assign(PL,{
conejo:()=>svg(`${E(38,26,8,21,K.blanco)}${E(62,26,8,21,K.blanco)}${F('M38 12 Q42 26 38 40 Q34 26 38 12Z',K.ros)}${F('M62 12 Q66 26 62 40 Q58 26 62 12Z',K.ros)}${C(50,62,26,K.blanco)}${cara(50,60,1,10)}${P('M47 64 H53 L50 67Z',K.ros)}`),
oso:()=>svg(`${C(27,30,11,OSO)}${C(73,30,11,OSO)}${D(27,30,5,K.madera)}${D(73,30,5,K.madera)}${C(50,56,30,OSO)}${E(50,67,13,10,K.madera)}${E(50,62,5,3.5,K.ink)}${eyes(50,12)}${mej(30,62)}${mej(70,62)}`),
mono:()=>svg(`${C(18,52,11,MONO)}${C(82,52,11,MONO)}${D(18,52,5.5,PIEL)}${D(82,52,5.5,PIEL)}${C(50,50,30,MONO)}${P('M50 40 Q60 30 68 40 Q76 52 66 66 Q58 76 50 76 Q42 76 34 66 Q24 52 32 40 Q40 30 50 40Z',PIEL)}${eyes(50,9)}${L('M42 64 Q50 70 58 64',K.ink,2.2)}`),
buho:()=>svg(`${P('M22 40 Q20 16 30 14 L38 26 Q50 22 62 26 L70 14 Q80 16 78 40 Q82 84 50 88 Q18 84 22 40Z',K.cafe)}${E(50,68,18,16,K.madera)}${C(38,42,11,K.blanco)}${C(62,42,11,K.blanco)}${D(38,42,4.5,K.ink)}${D(62,42,4.5,K.ink)}${P('M46 52 H54 L50 60Z',K.naranja)}`),
rana:()=>svg(`${C(32,36,12,K.hoja)}${C(68,36,12,K.hoja)}${E(50,60,36,26,K.hoja)}${D(32,36,4.5,K.ink)}${D(68,36,4.5,K.ink)}${L('M34 64 Q50 76 66 64',K.ink,2.4)}${mej(24,66)}${mej(76,66)}`),
panda:()=>svg(`${C(26,28,11,TINTA)}${C(74,28,11,TINTA)}${C(50,54,32,K.blanco)}${E(37,50,8,11,TINTA,'transform="rotate(-25 37 50)"')}${E(63,50,8,11,TINTA,'transform="rotate(25 63 50)"')}${D(38,49,2.6,K.blanco)}${D(62,49,2.6,K.blanco)}${E(50,63,5,3.5,K.ink)}${L('M45 69 Q50 73 55 69',K.ink,2)}`),
loro:()=>svg(`${P('M38 70 L30 96 L46 82Z',K.cie)}${P('M30 88 Q24 56 34 36 Q42 18 58 20 Q74 24 74 44 Q76 70 60 88Z',K.hoja2)}${P('M34 56 Q44 48 54 60 Q48 76 34 72Z',shade(K.hoja2,-.1))}${C(56,38,9,K.blanco)}${D(57,38,3.2,K.ink)}${P('M70 34 Q88 36 86 52 Q80 46 70 48Z',K.amarillo)}${mej(60,52)}`),
elefante:()=>svg(`${E(22,48,18,24,ELE)}${E(78,48,18,24,ELE)}${E(22,48,10,15,K.ros)}${E(78,48,10,15,K.ros)}${C(50,46,26,ELE)}${T('M50 60 Q48 80 62 88',ELE,12)}${eyes(42,11)}${mej(34,52)}${mej(66,52)}`),
jirafa:()=>svg(`${L('M40 26 V10 M60 26 V10',K.cafe,3.5)}${C(40,10,4,K.cafe)}${C(60,10,4,K.cafe)}${E(26,34,10,5,K.amarillo,'transform="rotate(-25 26 34)"')}${E(74,34,10,5,K.amarillo,'transform="rotate(25 74 34)"')}${P('M34 30 Q50 20 66 30 L68 64 Q68 86 50 88 Q32 86 32 64Z',K.amarillo)}${F('M38 40 q6 -4 8 2 q-2 6 -8 2Z M58 34 q6 0 6 6 q-6 2 -6 -6Z M60 52 q5 -2 6 4 q-4 4 -6 -4Z',shade(K.cafe,.25))}${E(50,74,15,11,'#F2CFA0')}${D(45,74,2,K.cafe)}${D(55,74,2,K.cafe)}${eyes(50,9)}`),
pinguino:()=>svg(`${E(36,92,9,4,K.naranja)}${E(64,92,9,4,K.naranja)}${E(50,56,30,36,TINTA)}${E(50,62,19,27,K.blanco)}${E(50,40,17,12,K.blanco)}${eyes(39,7)}${P('M45 46 H55 L50 53Z',K.naranja)}`),
pollito:()=>svg(`${L('M42 86 V94 M58 86 V94',K.naranja,3)}${C(50,58,28,K.amarillo)}${L('M48 30 Q46 22 52 20 M50 30 Q54 22 58 24',shade(K.amarillo,-.15),2.4)}${P('M38 60 Q46 54 52 64 Q44 72 38 60Z',shade(K.amarillo,-.1))}${P('M60 52 L72 56 L60 60Z',K.naranja)}${D(56,48,3,K.ink)}${mej(48,58)}`),
serpiente:()=>svg(`${T('M14 82 Q32 56 50 72 Q68 88 78 62 Q84 48 70 40',K.hoja,13)}${D(30,68,2.4,shade(K.hoja,-.18))}${D(58,80,2.4,shade(K.hoja,-.18))}${E(68,36,13,10,K.hoja)}${L('M80 38 L90 36 M90 36 L94 32 M90 36 L94 40',K.rojo,2)}${D(66,32,2.8,K.ink)}`),
cocodrilo:()=>svg(`${P('M6 62 Q6 46 28 44 L62 40 Q80 32 92 46 Q96 62 80 66 L28 72 Q6 74 6 62Z',K.hoja2)}${C(64,36,8,K.hoja2)}${C(80,38,7,K.hoja2)}${D(65,35,2.8,K.ink)}${D(81,37,2.6,K.ink)}${L('M14 60 L88 54',o(K.hoja2),1.6)}${[22,34,46,58,70].map(x=>F(`M${x} ${f(60-(x-14)*.08)} l3 6 l3 -6Z`,K.blanco)).join('')}${D(14,52,2,o(K.hoja2))}`),
leon:()=>svg(`${Array.from({length:12},(_,i)=>{ const a=i*Math.PI/6; return C(f(50+30*Math.cos(a)),f(52+30*Math.sin(a)),12,'#E9A86A'); }).join('')}${C(50,52,26,K.amarillo)}${C(30,32,7,K.amarillo)}${C(70,32,7,K.amarillo)}${E(50,62,12,9,K.crema)}${P('M46 56 H54 L50 61Z','#B98466')}${eyes(46,10)}${mej(34,58)}${mej(66,58)}`),
pera:()=>svg(`${L('M50 24 Q50 14 56 10',K.cafe,3.5)}${hoja(54,16,-20,16)}${P('M50 22 Q60 22 60 38 Q60 46 68 54 Q80 66 74 80 Q66 92 50 92 Q34 92 26 80 Q20 66 32 54 Q40 46 40 38 Q40 22 50 22Z','#C9E27E')}`),
uvas:()=>svg(`${L('M50 24 Q50 14 56 10',K.cafe,3.5)}${hoja(54,18,-20,18)}${[[36,38],[50,36],[64,38],[43,51],[57,51],[36,64],[64,64],[50,64],[43,77],[57,77],[50,89]].map(([x,y])=>C(x,y,8.5,K.lav)).join('')}`),
cerezas:()=>svg(`${L('M36 66 Q38 40 54 18 M64 62 Q60 40 54 18',K.hoja2,3)}${hoja(54,18,-10,20)}${bola(36,70,13,K.rojo,4)}${bola(64,66,13,K.rojo,4)}`),
naranja:()=>svg(`${bola(50,56,32,K.naranja,7)}${hoja(52,24,-30,18)}${D(42,46,1.4,shade(K.naranja,-.15))}${D(60,60,1.4,shade(K.naranja,-.15))}${D(48,70,1.4,shade(K.naranja,-.15))}`),
pizza:()=>svg(`${C(50,50,40,K.madera)}${C(50,50,32,K.man)}${L('M50 18 V82 M18 50 H82 M27 27 L73 73 M73 27 L27 73',shade(K.madera,-.1),1.4)}${[[38,32],[64,36],[30,58],[60,64],[46,48]].map(([x,y])=>C(x,y,6,K.rojo)).join('')}`),
brocoli:()=>svg(`${P('M42 58 L38 92 H62 L58 58Z','#C5E3A6')}${[[34,44,14],[50,34,16],[66,44,14],[42,58,12],[58,58,12]].map(([x,y,r])=>C(x,y,r,K.hoja2)).join('')}`),
galleta:()=>svg(`${C(50,50,36,'#E6C08E')}${[[38,36],[60,32],[66,56],[44,60],[32,52],[54,72]].map(([x,y])=>D(x,y,4,'#9C6B4E')).join('')}`),
miel:()=>svg(`${R(26,20,48,14,4,K.cafe)}${R(22,32,56,58,12,K.amarillo)}${R(32,50,36,22,5,K.crema)}${P('M30 32 Q30 44 36 44 Q40 44 40 36 Q44 46 50 40 V32Z',K.amarillo)}`),
cafe:()=>svg(`${L('M38 30 q-4 -8 0 -14 M52 30 q-4 -8 0 -14',K.gris,3)}${T('M70 48 Q90 48 86 62 Q82 72 68 70',K.blanco,5)}${P('M16 40 H74 V60 Q74 84 45 84 Q16 84 16 60Z',K.blanco)}${E(45,40,29,6,K.choco)}`),
burbuja:()=>svg(`<circle cx="50" cy="50" r="36" fill="#EAF5FC" stroke="#8DBDE6" stroke-width="1.6" vector-effect="non-scaling-stroke"/>${L('M30 44 Q32 30 46 26',K.blanco,4)}`),
balon:()=>svg(`${C(50,50,36,K.naranja)}${L('M14 50 H86 M50 14 V86 M24 24 Q40 50 24 76 M76 24 Q60 50 76 76',shade(K.naranja,-.3),2)}`),
casa:()=>svg(`${R(16,46,68,46,3,K.men)}${P('M8 48 L50 16 L92 48Z',K.gris)}${L('M22 42 L50 22 M34 42 L56 26 M66 42 L58 36',shade(K.gris,-.15),1.6)}${R(42,64,16,28,2,K.rojo)}${R(22,58,14,14,2,K.cie)}${R(64,58,14,14,2,K.cie)}${L('M29 58 V72 M71 58 V72',shade(K.cie,-.2),1.6)}`),
figura:()=>svg(`${R(18,18,64,64,16,K.lav)}${cara(50,50,1.2,10)}`),
moai:()=>svg(`${P('M30 92 L28 30 Q30 12 50 12 Q70 12 72 30 L70 92Z',K.gris)}${R(30,30,40,7,3,shade(K.gris,-.1))}${P('M46 38 L42 62 H56Z',shade(K.gris,-.08))}${L('M36 46 H44 M56 46 H64 M40 74 H60',shade(K.gris,-.3),2.4)}`),
gema:()=>svg(`${P('M14 38 L32 16 H68 L86 38 L50 88Z',K.cie)}${L('M14 38 H86 M32 16 L40 38 L50 88 M68 16 L60 38 L50 88 M40 38 L50 16 L60 38',K.blanco,1.6)}`),
hueso:()=>svg(`${C(24,42,9,K.crema)}${C(24,58,9,K.crema)}${C(76,42,9,K.crema)}${C(76,58,9,K.crema)}${R(22,43,56,14,6,K.crema)}`),
paraguas:()=>svg(`${L('M50 50 V80 Q50 90 40 86',K.gris,4)}${P('M10 52 Q14 16 50 14 Q86 16 90 52 Q80 44 70 52 Q60 44 50 52 Q40 44 30 52 Q20 44 10 52Z',K.rojo)}${L('M50 14 Q38 30 30 52 M50 14 Q62 30 70 52',shade(K.rojo,-.15),1.6)}`),
zzz:()=>svg(T('M20 56 H40 L20 76 H40 M52 30 H68 L52 46 H68 M76 10 H88 L76 22 H88',K.lav,4)),
hojita:()=>svg(hoja(16,62,-32,70,K.hoja)),
rayo:()=>svg(P('M58 6 L24 54 H46 L38 94 L76 40 H54Z',K.amarillo)),
admira:()=>svg(`${C(50,48,32,K.blanco)}${L('M50 32 V52',K.ink,6)}${D(50,64,3.5,K.ink)}`),
bandera:()=>svg(`${L('M22 94 V10',K.gris,4)}${R(24,14,60,40,2,K.blanco)}${F('M25 15 H50 V31 H25Z M58 37 H83 V53 H58Z','#7D9ED6')}${F('M58 15 H83 V31 H58Z M25 37 H50 V53 H25Z','#E88686')}`),
c_rojo:()=>svg(C(50,50,32,K.rojo)), c_amarillo:()=>svg(C(50,50,32,K.amarillo)), c_verde:()=>svg(C(50,50,32,K.hoja2)), c_azul:()=>svg(C(50,50,32,'#8DBDE6')),
corazon:()=>PL.ti_body(),
palmera_fondo:()=>PL.palmera(),
nube2:()=>PL.nube1(), nube3:()=>PL.nube1()
});
PL.pato=()=>VIEJO.pato(K.blanco);
[1,2,3].forEach((n,i)=>{ const c=['#F6D36F','#D9DDE6','#E6B48E'][i]; PL['medalla_'+n]=()=>svg(`${P('M30 6 H44 L56 40 H42Z','#8DBDE6')}${P('M70 6 H56 L44 40 H58Z',K.rosa)}${C(50,64,26,c)}${C(50,64,18,shade(c,.3))}${estrella(50,64,11,5,shade(c,-.15))}`); });
Object.assign(window.ILU_EMO,{'🦁':'leon','🦴':'hueso','🗿':'moai','💎':'gema','☂️':'paraguas','☂':'paraguas','💤':'zzz','🦆':'pato','❤️':'corazon','❤':'corazon','🔴':'c_rojo','🟡':'c_amarillo','🟢':'c_verde','🔵':'c_azul','🥇':'medalla_1','🥈':'medalla_2','🥉':'medalla_3','🏆':'medalla_1','🏡':'casa','🌈':'w_arcoiris'});
Object.assign(window.PLANO_MONO,{
  play:'<path d="M8 5.5v13l10.5-6.5z" fill="currentColor" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
  parar:'<rect x="6" y="6" width="12" height="12" rx="2.5" fill="currentColor"/>',
  deshacer:'<path d="M9 6L4 11l5 5M4 11h10a5 5 0 0 1 0 10h-3" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
  musica:'<path d="M9 17V6l10-2v11" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/><circle cx="6.5" cy="17" r="2.6" fill="currentColor"/><circle cx="16.5" cy="15" r="2.6" fill="currentColor"/>',
  info:'<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M12 11v6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><circle cx="12" cy="7.6" r="1.4" fill="currentColor"/>',
  estrella:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" fill="currentColor" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>'
});

/* ---------- piezas para los emojis que quedaban dentro de los juguetes ---------- */
const flecha=(rot,c=K.cie)=>()=>svg(`<g transform="rotate(${rot} 50 50)">${P('M50 14 L84 48 H64 V86 H36 V48 H16Z',c)}</g>`);
const persona=(c)=>`${C(50,24,13,c)}${P('M34 40 Q50 34 66 40 L72 66 H62 L60 92 H52 L50 72 L48 92 H40 L38 66 H28Z',c)}`;
Object.assign(PL,{
cuadro:()=>svg(`${R(10,18,80,64,4,K.madera)}${R(18,26,64,48,2,K.cie)}${P('M18 74 L40 46 L54 62 L64 52 L82 74Z',K.hoja2)}${C(68,38,6,K.amarillo)}`),
espejo:()=>svg(`${E(50,44,30,36,K.ros)}${E(50,44,22,28,'#EAF5FC')}${L('M38 30 Q36 40 40 48',K.blanco,4)}${R(44,80,12,14,3,K.ros)}`),
carpeta:()=>svg(`${P('M10 26 H40 L46 34 H90 V82 Q90 86 86 86 H14 Q10 86 10 82Z',K.amarillo)}${R(10,40,80,46,4,K.man)}`),
crayon:()=>svg(`<g transform="rotate(40 50 50)">${R(40,24,20,60,4,K.rojo)}${P('M40 24 L50 6 L60 24Z',shade(K.rojo,-.05))}${R(40,40,20,8,0,shade(K.rojo,.35))}${R(40,64,20,8,0,shade(K.rojo,.35))}</g>`),
boligrafo:()=>svg(`<g transform="rotate(40 50 50)">${R(43,10,14,66,5,K.cie)}${P('M43 76 L50 92 L57 76Z',K.gris)}${R(41,14,18,10,3,'#8DBDE6')}${L('M58 18 V44',K.gris,3)}</g>`),
pincel:()=>svg(`<g transform="rotate(40 50 50)">${R(45,8,10,54,4,K.cafe)}${R(43,58,14,10,2,K.gris)}${P('M43 68 H57 Q58 84 50 94 Q42 84 43 68Z',K.lav)}</g>`),
soplo:()=>svg(`${L('M12 36 H58 Q72 36 72 24 Q72 14 62 14 Q54 14 54 22 M12 54 H76 Q90 54 90 66 Q90 76 80 76 Q72 76 72 68 M20 72 H46',K.cie,6)}`),
cubeta:()=>svg(`${L('M26 38 Q26 10 50 10 Q74 10 74 38',K.gris,4)}${P('M18 38 H82 L74 88 Q72 92 66 92 H34 Q28 92 26 88Z',K.cie)}${E(50,38,32,7,shade(K.cie,.3))}`),
rombo:()=>svg(P('M50 10 L86 50 L50 90 L14 50Z','#8DBDE6')),
i_info:()=>svg(`${C(50,50,38,'#8DBDE6')}${L('M50 46 V72',K.blanco,8)}${D(50,30,5.5,K.blanco)}`),
grabar:()=>svg(`${C(50,50,36,K.blanco)}${C(50,50,22,K.rojo)}`),
zafacon:()=>svg(`${R(44,10,12,8,3,K.gris)}${R(18,18,64,10,4,'#9FD3B2')}${P('M24 28 H76 L70 90 H30Z','#B9E3C6')}${L('M38 38 L40 80 M50 38 V80 M62 38 L60 80',shade('#B9E3C6',-.2),2)}`),
mas:()=>svg(`${C(50,50,38,K.hoja)}${L('M50 30 V70 M30 50 H70',K.blanco,9)}`),
bombillo:()=>PL.ic_idea(),
plato:()=>svg(`${E(50,56,40,26,K.blanco)}${E(50,54,26,16,shade(K.blanco,-.04))}${L('M14 14 V34 M20 14 V34 M26 14 V34 M20 34 V56',K.gris,3)}${L('M80 14 Q90 26 80 38 V56',K.gris,3)}`),
chichigua:()=>svg(`${P('M50 8 L80 40 L50 72 L20 40Z',K.ros)}${L('M50 8 V72 M20 40 H80',shade(K.ros,-.2),1.6)}${L('M50 72 Q40 82 52 88 Q62 94 50 98',K.gris,2)}${P('M44 82 l6 4 l-6 2Z',K.amarillo)}`),
paleta:()=>PL.ti_paint(),
manzana_verde:()=>PL.manzana().replace(new RegExp(K.rojo,'gi'),'#B5DA8A').replace(new RegExp(shade(K.rojo,-.32),'gi'),shade('#B5DA8A',-.32)),
ola:()=>svg(`${P('M6 70 Q18 40 40 44 Q60 48 58 66 Q50 58 44 62 Q56 74 74 66 Q86 60 94 70 V90 H6Z','#8DBDE6')}${L('M14 80 Q30 74 46 80 Q62 86 86 78',K.blanco,3)}`),
aguila:()=>svg(`${P('M50 50 Q30 30 6 34 Q22 44 30 56 Q40 54 50 60Z',K.cafe)}${P('M50 50 Q70 30 94 34 Q78 44 70 56 Q60 54 50 60Z',K.cafe)}${E(50,62,12,18,K.cafe)}${C(50,42,9,K.blanco)}${P('M50 44 L60 48 L52 52Z',K.amarillo)}${D(47,40,2.2,K.ink)}`),
tren:()=>svg(`${R(10,40,52,36,6,K.rojo)}${R(54,26,30,50,6,'#8DBDE6')}${R(60,32,18,14,3,K.blanco)}${R(14,30,12,12,2,K.gris)}${R(18,46,36,12,3,K.amarillo)}${C(26,80,9,TINTA)}${C(50,80,9,TINTA)}${C(72,80,9,TINTA)}`),
yoyo:()=>svg(`${L('M50 6 V30',K.gris,2.5)}${C(50,58,30,K.lav)}${C(50,58,10,K.blanco)}${L('M26 48 A26 26 0 0 1 74 48',shade(K.lav,.4),3)}`),
hielo:()=>svg(`${P('M20 34 L50 20 L80 34 V70 L50 84 L20 70Z','#D6ECFA')}${L('M20 34 L50 48 L80 34 M50 48 V84',shade('#D6ECFA',-.2),1.6)}`),
ladrillo:()=>svg(`${R(10,30,80,40,4,'#E8A08A')}${L('M10 50 H90 M36 30 V50 M64 30 V50 M24 50 V70 M50 50 V70 M76 50 V70',shade('#E8A08A',-.2),2)}`),
huellas:()=>svg(`${E(38,62,13,15,K.cafe)}${C(24,40,6,K.cafe)}${C(36,32,6,K.cafe)}${C(50,34,6,K.cafe)}${C(58,46,6,K.cafe)}${E(70,72,9,10,shade(K.cafe,.2))}`),
pepino:()=>svg(`${P('M14 70 Q30 30 78 22 Q94 22 88 36 Q70 74 26 84 Q8 86 14 70Z',K.hoja2)}${D(40,58,2.4,shade(K.hoja2,.5))}${D(58,44,2.4,shade(K.hoja2,.5))}${D(70,34,2.4,shade(K.hoja2,.5))}`),
lagartija:()=>svg(`${T('M20 80 Q36 72 46 56 Q58 36 76 26',K.hoja,10)}${E(78,24,10,7,K.hoja)}${D(80,21,2.2,K.ink)}${L('M40 64 L30 58 M44 60 L52 70 M58 40 L50 32 M62 38 L72 46',K.hoja2,4)}`),
vapor_caliente:()=>svg(`${L('M30 80 Q22 64 30 50 Q38 36 30 20 M50 80 Q42 64 50 50 Q58 36 50 20 M70 80 Q62 64 70 50 Q78 36 70 20',K.rojo,6)}`),
numeros:()=>svg(`${R(14,14,72,72,14,K.man)}${D(34,34,6,K.ink)}${D(66,34,6,K.ink)}${D(50,50,6,K.ink)}${D(34,66,6,K.ink)}${D(66,66,6,K.ink)}`),
corredor:()=>svg(`${C(58,18,10,K.dur)}${T('M54 30 L46 56 L60 70 L56 90 M46 56 L30 70 L18 66 M52 36 L68 46 L80 40 M52 36 L36 42 L30 54',K.dur,7)}`),
altavoz:()=>svg(`${P('M14 38 H32 L56 18 V82 L32 62 H14Z',K.lav)}${L('M66 36 Q76 50 66 64 M76 26 Q92 50 76 74',K.lav,5)}`),
pregunta:()=>svg(`${C(50,50,38,K.amarillo)}${L('M38 40 Q38 26 50 26 Q62 26 62 38 Q62 46 50 50 V58',K.blanco,8)}${D(50,72,5,K.blanco)}`),
visto:()=>svg(`${C(50,50,38,K.hoja)}${L('M32 52 L45 64 L68 38',K.blanco,9)}`),
pin:()=>svg(`${P('M50 92 Q22 60 22 40 Q22 14 50 14 Q78 14 78 40 Q78 60 50 92Z',K.rojo)}${C(50,40,10,K.blanco)}`),
isla:()=>svg(`${P('M4 80 Q50 70 96 80 V90 H4Z','#8DBDE6')}${P('M20 78 Q50 56 80 78Z','#F2DDB0')}${PL.palmera().replace('<svg ','<svg x="34" y="14" width="44" height="64" ')}`),
mundo:()=>svg(`${C(50,50,38,'#8DBDE6')}${P('M30 26 Q44 20 50 30 Q46 40 36 40 Q30 50 22 46 Q18 34 30 26Z',K.hoja)}${P('M58 46 Q72 40 80 52 Q78 68 66 74 Q58 64 62 56 Q56 52 58 46Z',K.hoja)}${P('M36 66 Q44 62 48 72 Q44 82 36 78Z',K.hoja)}`),
persona:()=>svg(persona(K.dur)),
brazo:()=>svg(`${P('M14 70 Q12 50 30 46 L50 44 Q50 22 66 18 Q84 18 84 36 Q84 50 70 54 Q72 62 64 70 Q50 84 30 84 Q16 82 14 70Z',K.dur)}${L('M56 38 Q62 30 70 34',shade(K.dur,-.2),2)}`),
organo:()=>svg(`${P('M50 88 Q16 66 18 40 Q20 20 38 20 Q46 20 50 30 Q54 20 64 18 Q84 20 82 42 Q80 66 50 88Z',K.rojo)}${L('M44 22 V8 M56 20 V6',K.rojo,6)}${L('M40 40 Q50 50 46 64',shade(K.rojo,-.15),2)}`),
escalera:()=>svg(`${L('M28 10 V90 M72 10 V90',K.madera,7)}${L('M28 24 H72 M28 42 H72 M28 60 H72 M28 78 H72',K.madera,5)}`),
abaco:()=>PL.ti_beads(),
meta:()=>svg(`${L('M20 94 V8',K.gris,4)}${R(22,10,60,40,2,K.blanco)}${F('M22 10 H37 V20 H22Z M52 10 H67 V20 H52Z M37 20 H52 V30 H37Z M67 20 H82 V30 H67Z M22 30 H37 V40 H22Z M52 30 H67 V40 H52Z M37 40 H52 V50 H37Z M67 40 H82 V50 H67Z',TINTA)}`),
regalo:()=>svg(`${R(16,40,68,50,4,K.rosa)}${R(12,30,76,14,4,shade(K.rosa,-.06))}${R(44,30,12,60,0,K.amarillo)}${P('M50 30 Q34 8 28 20 Q26 30 50 30Z M50 30 Q66 8 72 20 Q74 30 50 30Z',K.amarillo)}`),
calabaza:()=>svg(`${L('M50 26 Q50 14 58 10',K.hoja2,5)}${E(34,58,20,28,K.naranja)}${E(66,58,20,28,K.naranja)}${E(50,58,18,30,shade(K.naranja,.1))}`),
flecha_arriba:flecha(0), flecha_abajo:flecha(180), flecha_izq:flecha(-90), flecha_der:flecha(90), triangulo_der:()=>svg(P('M26 14 L84 50 L26 86Z',K.lav)), triangulo_izq:()=>svg(P('M74 14 L16 50 L74 86Z',K.lav))
});
Object.assign(window.ILU_EMO,{'🖼️':'cuadro','🖼':'cuadro','🪞':'espejo','🗂️':'carpeta','🗂':'carpeta','✏':'lapiz','🖍️':'crayon','🖍':'crayon','🖊️':'boligrafo','🖊':'boligrafo','🖌️':'pincel','🖌':'pincel','💨':'soplo','🪣':'cubeta','🔷':'rombo',
  'ℹ️':'i_info','ℹ':'i_info','⏺️':'grabar','⏺':'grabar','🗑️':'zafacon','🗑':'zafacon','➕':'mas','💡':'bombillo','🍽️':'plato','🍽':'plato','🪁':'chichigua','🎨':'paleta','🍏':'manzana_verde','🌊':'ola','🦅':'aguila','🚂':'tren','🪀':'yoyo',
  '🧊':'hielo','🧱':'ladrillo','🐾':'huellas','🥒':'pepino','🦎':'lagartija','♨️':'vapor_caliente','♨':'vapor_caliente','🔢':'numeros','📝':'nota','🏃':'corredor','😮':'admira','🔊':'altavoz','❓':'pregunta','✅':'visto',
  '📍':'pin','🏝️':'isla','🏝':'isla','🌎':'mundo','🧍':'persona','💪':'brazo','🫀':'organo','◀':'triangulo_izq','◀️':'triangulo_izq','▶':'triangulo_der','▶️':'triangulo_der','🪜':'escalera','🧮':'abaco',
  '⬆️':'flecha_arriba','⬆':'flecha_arriba','⬇️':'flecha_abajo','⬇':'flecha_abajo','⬅️':'flecha_izq','⬅':'flecha_izq','➡️':'flecha_der','➡':'flecha_der','🏁':'meta','🎁':'regalo','🎃':'calabaza','💾':'carpeta'});

/* ---------- aprender, inglés, cuentos y stickers ---------- */
const PIEL2=K.dur;
const gente=(cuerpo,extra='')=>svg(`${C(50,24,13,PIEL2)}${P('M28 92 Q28 44 50 44 Q72 44 72 92Z',cuerpo)}${extra}`);
Object.assign(PL,{
globo_texto:()=>svg(`${P('M14 20 H86 Q92 20 92 28 V60 Q92 68 86 68 H40 L24 84 L28 68 H14 Q8 68 8 60 V28 Q8 20 14 20Z','#8DBDE6')}${D(32,44,5,K.blanco)}${D(50,44,5,K.blanco)}${D(68,44,5,K.blanco)}`),
escuela:()=>svg(`${R(12,44,76,48,3,K.dur)}${P('M6 46 L50 22 L94 46Z',K.rojo)}${R(40,10,20,16,2,K.dur)}${C(50,36,6,K.blanco)}${R(42,66,16,26,2,'#8DBDE6')}${R(20,56,14,12,2,K.cie)}${R(66,56,14,12,2,K.cie)}${L('M50 10 V2',K.gris,2)}${P('M50 2 H60 L58 6 H50Z',K.rojo)}`),
hoja_papel:()=>svg(`${P('M22 8 H62 L80 26 V92 H22Z',K.blanco)}${P('M62 8 V26 H80Z',shade(K.blanco,-.06))}${L('M32 40 H70 M32 52 H70 M32 64 H62 M32 76 H66',K.gris,3)}`),
carta:()=>svg(`${R(20,8,60,84,8,K.blanco)}${R(28,16,44,68,5,K.rosa)}${estrella(50,50,14,6,K.amarillo)}`),
libros:()=>svg(`${R(14,66,72,16,3,'#8DBDE6')}${R(20,50,64,16,3,K.rosa)}${R(16,34,66,16,3,K.amarillo)}${L('M22 74 H78 M28 58 H76 M24 42 H74',K.blanco,2)}`),
hablar:()=>svg(`${P('M14 92 V70 Q8 66 12 58 Q8 50 16 44 Q16 20 40 18 Q62 18 64 40 L72 52 L64 56 Q64 72 50 74 V92Z',K.lav)}${L('M74 32 Q80 40 74 48 M82 24 Q94 40 82 56',K.lav,4)}`),
playa:()=>svg(`${P('M4 70 Q50 56 96 70 V96 H4Z','#F2DDB0')}${P('M4 60 Q50 50 96 60 V72 Q50 62 4 72Z','#8DBDE6')}${L('M60 86 L44 28',K.gris,3)}${P('M18 34 Q30 6 62 14 Q76 20 74 30 Q60 24 46 30 Q32 26 18 34Z',K.rojo)}${C(80,22,9,K.amarillo)}`),
rompecabezas:()=>svg(P('M20 30 H40 Q38 16 50 16 Q62 16 60 30 H80 V50 Q94 48 94 60 Q94 72 80 70 V90 H20 V70 Q34 72 34 60 Q34 48 20 50Z','#8DBDE6')),
corazon_am:()=>svg(P('M50 86 Q14 62 14 38 Q14 18 32 18 Q44 18 50 30 Q56 18 68 18 Q86 18 86 38 Q86 62 50 86Z',K.amarillo)),
hospital:()=>svg(`${R(14,24,72,68,4,K.blanco)}${R(40,32,20,20,3,K.rojo)}${F('M47 35 H53 V40 H58 V45 H53 V50 H47 V45 H42 V40 H47Z',K.blanco)}${R(42,68,16,24,2,'#8DBDE6')}${R(20,60,14,12,2,K.cie)}${R(66,60,14,12,2,K.cie)}`),
doctora:()=>gente(K.blanco,`${R(44,52,12,12,2,K.rojo)}${F('M48 54 H52 V57 H55 V60 H52 V63 H48 V60 H45 V57 H48Z',K.blanco)}${L('M38 46 Q36 66 46 70',K.gris,2.4)}`),
maestra:()=>gente(K.lav,`${R(66,40,30,24,2,K.hoja2)}${L('M70 50 H90 M70 56 H84',K.blanco,2)}`),
carro:()=>svg(`${P('M8 66 V54 Q8 48 16 46 L28 30 Q32 26 40 26 H62 Q70 26 74 32 L84 46 Q92 48 92 56 V66Z',K.rojo)}${P('M32 44 L38 32 H50 V44Z M56 44 V32 H64 Q68 32 70 36 L74 44Z',K.cie)}${C(28,68,10,TINTA)}${C(72,68,10,TINTA)}${D(28,68,4,K.gris)}${D(72,68,4,K.gris)}`),
sarten:()=>svg(`${R(64,44,32,10,5,K.cafe)}${C(40,50,30,'#B4B9C8')}${C(40,50,22,K.blanco)}${C(42,50,9,K.amarillo)}`),
dormido:()=>svg(`${C(48,54,32,K.amarillo)}${L('M30 52 Q36 58 42 52 M54 52 Q60 58 66 52 M42 70 Q48 72 54 70',K.ink,2.6)}${T('M70 20 H82 L70 32 H82',K.lav,3)}`),
amanecer:()=>svg(`${P('M10 60 A40 40 0 0 1 90 60Z',K.amarillo)}${rayos2()}${R(0,60,100,40,0,'#8DBDE6')}${L('M16 72 H44 M56 72 H84 M26 84 H74',K.blanco,3)}`),
audifonos:()=>svg(`${L('M20 60 V48 Q20 18 50 18 Q80 18 80 48 V60',K.lav,7)}${R(10,52,20,32,8,K.rosa)}${R(70,52,20,32,8,K.rosa)}`),
ojo:()=>svg(`${P('M6 50 Q50 10 94 50 Q50 90 6 50Z',K.blanco)}${C(50,50,18,'#8DBDE6')}${D(50,50,8,K.ink)}`),
oreja:()=>svg(`${P('M36 20 Q66 6 74 34 Q78 54 62 66 Q56 72 56 82 Q54 92 44 90 Q36 88 38 78 Q40 70 46 64 Q30 56 30 40 Q30 26 36 20Z',PIEL2)}${L('M46 34 Q56 28 62 38 Q64 48 54 52',shade(PIEL2,-.2),3)}`),
nariz:()=>svg(`${P('M44 10 Q46 40 30 64 Q24 76 36 80 Q44 82 50 76 Q56 82 64 80 Q76 76 70 64 Q56 40 56 10Z',PIEL2)}${D(42,72,3.5,shade(PIEL2,-.3))}${D(58,72,3.5,shade(PIEL2,-.3))}`),
nadador:()=>svg(`${C(40,40,11,PIEL2)}${T('M48 46 Q62 30 78 36',PIEL2,7)}${P('M4 56 Q18 46 32 56 Q46 66 60 56 Q74 46 96 56 V96 H4Z','#8DBDE6')}${L('M8 74 Q22 66 36 74 Q50 82 64 74 Q78 66 92 74',K.blanco,3)}${R(32,26,16,8,4,K.rojo)}`),
cronometro:()=>svg(`${R(42,6,16,10,3,K.gris)}${C(50,56,34,K.lav)}${C(50,56,26,K.blanco)}${L('M50 56 V38 M50 56 L62 62',K.ink,3.5)}${R(78,24,10,8,3,K.gris,'transform="rotate(40 83 28)"')}`),
unicornio:()=>svg(`${P('M50 6 L44 34 H56Z',K.amarillo)}${P('M30 40 Q30 20 50 20 Q70 20 70 40 L66 72 Q66 88 50 88 Q34 88 34 72Z',K.blanco)}${P('M30 34 Q18 40 20 60 Q30 54 34 44Z M36 24 Q24 16 22 30 Q30 30 34 32Z',K.lav)}${P('M64 24 Q76 18 78 32 Q70 32 66 30Z',K.ros)}${E(50,74,14,10,K.ros)}${eyes(48,10)}`),
cohete:()=>svg(`${P('M50 6 Q72 24 70 62 H30 Q28 24 50 6Z',K.blanco)}${C(50,38,9,'#8DBDE6')}${P('M30 50 L16 72 L30 66Z M70 50 L84 72 L70 66Z',K.rojo)}${P('M38 62 H62 L58 72 H42Z',K.gris)}${P('M42 72 Q50 96 58 72Z',K.naranja)}`),
barril:()=>svg(`${R(24,14,52,74,10,'#8DBDE6')}${L('M24 34 H76 M24 68 H76',shade('#8DBDE6',-.25),3)}${E(50,16,24,5,shade('#8DBDE6',.3))}`),
bailarina:()=>svg(`${C(50,18,10,PIEL2)}${L('M50 30 L30 18 M50 30 L72 40',PIEL2,4)}${P('M44 30 H56 L60 52 Q80 76 72 84 Q50 90 28 84 Q20 76 40 52Z',K.rojo)}${L('M44 86 L40 96 M56 86 L60 96',PIEL2,4)}`),
fichas:()=>svg(`${R(18,30,64,46,4,K.blanco)}${R(14,22,64,46,4,K.cie)}${L('M22 36 H66 M22 46 H58 M22 56 H62',K.blanco,3)}`),
control:()=>svg(`${P('M14 40 Q14 28 28 28 H72 Q86 28 86 40 L92 68 Q94 80 82 80 Q74 80 70 70 L66 62 H34 L30 70 Q26 80 18 80 Q6 80 8 68Z',K.lav)}${L('M26 46 V58 M20 52 H32',K.blanco,4)}${D(68,46,4,K.rojo)}${D(76,54,4,K.amarillo)}`),
cama:()=>svg(`${R(8,30,10,58,3,K.madera)}${R(82,48,10,40,3,K.madera)}${R(14,56,74,20,4,K.cie)}${R(18,44,24,14,6,K.blanco)}${R(40,48,46,12,4,K.rosa)}`),
puerta:()=>svg(`${R(22,8,56,86,4,K.madera)}${R(30,16,40,30,3,shade(K.madera,-.08))}${R(30,52,40,34,3,shade(K.madera,-.08))}${D(66,52,3.5,K.amarillo)}`),
iglesia:()=>svg(`${R(18,48,64,44,2,K.blanco)}${P('M12 50 L50 26 L88 50Z',K.rosa)}${R(40,10,20,24,2,K.blanco)}${L('M50 2 V14 M45 7 H55',K.amarillo,3)}${P('M42 92 V72 Q50 62 58 72 V92Z','#8DBDE6')}${C(50,44,6,K.cie)}`),
guagua:()=>svg(`${R(6,24,88,50,10,K.amarillo)}${[12,30,48,66].map(x=>R(x,32,14,16,3,K.cie)).join('')}${R(80,32,10,26,3,K.cie)}${L('M6 58 H94',shade(K.amarillo,-.2),2)}${C(26,76,9,TINTA)}${C(72,76,9,TINTA)}`),
bicicleta:()=>svg(`${anillo(24,64,18,12,TINTA)}${anillo(76,64,18,12,TINTA)}${L('M24 64 L42 38 H66 L76 64 M42 38 L50 64 L66 38 M50 64 H24 M38 30 H48 M66 38 L62 26 H72',K.rojo,3.5)}`),
dino:()=>svg(`${P('M14 82 Q20 60 36 56 L40 30 Q42 14 58 12 Q76 12 78 26 Q80 36 66 38 L58 40 Q62 52 70 60 Q84 66 94 60 Q90 76 70 80 L64 92 H54 L52 82 H40 L38 92 H28 L28 84Z',K.hoja2)}${D(64,22,2.8,K.ink)}${L('M48 46 L58 48',shade(K.hoja2,-.2),2)}`),
flamenco:()=>svg(`${L('M50 66 V94 M50 80 L58 72',K.rosa,3)}${E(52,56,20,13,K.rosa)}${T('M40 54 Q30 30 42 20 Q50 14 56 22',K.rosa,6)}${P('M56 22 L68 28 L58 32Z',TINTA)}${D(52,22,2,K.ink)}`),
erizo:()=>svg(`${P('M10 70 Q12 30 50 26 Q86 30 88 66 Z',K.cafe)}${L('M20 50 L14 40 M32 38 L28 26 M46 32 L46 18 M60 34 L66 22 M74 42 L82 34',shade(K.cafe,-.2),3)}${P('M60 70 Q66 52 82 54 Q94 58 92 70Z',K.madera)}${D(92,66,3,K.ink)}${D(78,60,2.4,K.ink)}`),
dona:()=>svg(`${anillo(50,52,36,12,'#E6C08E')}<path fill-rule="evenodd" d="M18 46 Q22 18 50 16 Q78 18 82 46 Q70 40 66 48 Q58 40 50 48 Q42 40 34 48 Q28 40 18 46ZM38 52a12 12 0 1 0 24 0a12 12 0 1 0 -24 0Z" fill="${K.ros}"/>${[[30,30],[48,24],[66,30],[72,40]].map(([x,y])=>R(x,y,6,2.4,1,[K.amarillo,K.cie,K.blanco,K.hoja][x%4])).join('')}`),
cupcake:()=>svg(`${P('M24 54 H76 L68 90 H32Z','#8DBDE6')}${L('M36 56 L40 88 M50 56 V88 M64 56 L60 88',shade('#8DBDE6',-.2),1.6)}${P('M20 56 Q16 40 32 36 Q34 22 50 22 Q66 22 68 36 Q84 40 80 56Z',K.ros)}${C(50,16,6,K.rojo)}`),
planeta:()=>svg(`${C(50,50,28,K.lav)}${F('M26 58 Q40 66 62 60 Q52 70 34 66Z',shade(K.lav,-.1))}<ellipse cx="50" cy="52" rx="46" ry="12" transform="rotate(-18 50 52)" fill="none" stroke="${K.amarillo}" stroke-width="5"/>`),
cometa:()=>svg(`${P('M14 86 Q40 70 62 44 L72 54 Q48 76 14 86Z',K.amarillo)}${C(72,38,16,K.naranja)}`),
ovni:()=>svg(`${E(50,40,18,16,K.cie)}${E(50,54,42,14,K.gris)}${[30,50,70].map(x=>D(x,56,4,K.amarillo)).join('')}${P('M38 68 L30 92 H70 L62 68Z',K.amarillo)}`),
trompeta:()=>svg(`${P('M10 46 H60 L88 26 V74 L60 54 H10Z',K.amarillo)}${R(28,32,6,14,2,K.amarillo)}${R(38,32,6,14,2,K.amarillo)}${R(48,32,6,14,2,K.amarillo)}`),
maraca:()=>svg(`<g transform="rotate(-30 50 50)">${R(46,56,8,38,4,K.madera)}${E(50,34,22,26,K.rojo)}${L('M30 34 Q50 42 70 34',K.amarillo,4)}</g>`),
beisbol:()=>svg(`${C(50,50,36,K.blanco)}${L('M26 22 Q40 50 26 78 M74 22 Q60 50 74 78',K.rojo,2.6)}${L('M28 32 L34 30 M30 42 L36 42 M30 58 L36 58 M28 68 L34 70 M72 32 L66 30 M70 42 L64 42 M70 58 L64 58 M72 68 L66 70',K.rojo,2)}`),
patines:()=>svg(`${P('M20 20 H50 V56 H80 Q88 56 88 66 V72 H20Z',K.ros)}${R(18,72,72,8,3,K.gris)}${C(32,86,8,K.amarillo)}${C(74,86,8,K.amarillo)}`),
corona:()=>svg(`${P('M12 76 L16 30 L34 52 L50 20 L66 52 L84 30 L88 76Z',K.amarillo)}${D(50,62,5,K.rojo)}${D(32,64,4,'#8DBDE6')}${D(68,64,4,'#8DBDE6')}`),
zorro:()=>svg(`${P('M18 22 L38 40 L22 56Z',K.naranja)}${P('M82 22 L62 40 L78 56Z',K.naranja)}${P('M16 46 Q30 20 50 22 Q70 20 84 46 Q76 78 50 84 Q24 78 16 46Z',K.naranja)}${P('M24 54 Q38 54 50 70 Q62 54 76 54 Q66 80 50 84 Q34 80 24 54Z',K.crema)}${E(50,68,5,3.5,K.ink)}${eyes(50,13)}`),
koala:()=>svg(`${C(22,40,16,'#BDBCCB')}${C(78,40,16,'#BDBCCB')}${D(22,40,8,K.ros)}${D(78,40,8,K.ros)}${C(50,56,30,'#BDBCCB')}${E(50,62,8,10,TINTA)}${eyes(48,13)}`)
});
Object.assign(PL,{
 flor_rosada:()=>svg(`${petalos5(50,50,K.ros)}${C(50,50,9,K.amarillo)}`),
 gasolina:()=>svg(`${R(20,14,44,78,8,K.rojo)}${R(28,24,28,20,3,K.blanco)}${T('M64 40 Q82 40 80 60 V78 Q80 86 72 82',K.gris,4)}${R(14,86,56,8,3,K.gris)}`),
 microfono:()=>svg(`${L('M50 66 V88 M36 90 H64',K.gris,4)}${L('M30 44 Q30 66 50 66 Q70 66 70 44',K.gris,3.5)}${R(38,10,24,46,12,K.lav)}${L('M38 26 H62 M38 36 H62',shade(K.lav,-.2),1.6)}`)
});
Object.assign(PL,{
 c_naranja:()=>svg(C(50,50,32,K.naranja)), c_morado:()=>svg(C(50,50,32,K.lav)),
 foca:()=>svg(`${P('M10 78 Q20 52 44 46 Q50 22 66 20 Q84 20 84 38 Q84 52 70 56 Q74 72 86 80 Q70 88 50 84 Q30 88 10 78Z','#B8C2D6')}${P('M36 70 L26 88 L44 80Z','#B8C2D6')}${D(72,32,3,K.ink)}${D(82,40,3,K.ink)}${L('M84 44 L94 42 M84 46 L94 48',K.gris,1.6)}`)
});
PL.bandera_us=()=>svg(`${L('M22 94 V10',K.gris,4)}${R(24,14,60,40,2,K.blanco)}${F('M25 15 H83 V20 H25Z M25 26 H83 V31 H25Z M25 37 H83 V42 H25Z M25 48 H83 V53 H25Z','#E88686')}${F('M25 15 H50 V34 H25Z','#7D9ED6')}${D(31,21,1.6,K.blanco)}${D(38,21,1.6,K.blanco)}${D(45,21,1.6,K.blanco)}${D(34,28,1.6,K.blanco)}${D(42,28,1.6,K.blanco)}`);
Object.assign(window.ILU_EMO,{'🟠':'c_naranja','🟣':'c_morado','🦭':'foca','🇺🇸':'bandera_us','🇩🇴':'bandera'});
function petalos5(cx,cy,c){ return [0,72,144,216,288].map(a=>`<g transform="rotate(${a} ${cx} ${cy})">${E(cx,cy-20,13,17,c)}</g>`).join(''); }
function rayos2(){ return [[-60],[-30],[0],[30],[60]].map(([a])=>`<g transform="rotate(${a} 50 60)">${L('M50 14 V6',K.amarillo,4)}</g>`).join(''); }
Object.assign(PL,{ libro_abierto:()=>PL.ti_fluency(), mapa:()=>PL.ti_maps(), mochila:()=>PL.ti_learn(), colmadito:()=>PL.ti_shop(), sol_nube:()=>PL.ti_weather() });
Object.assign(window.ILU_EMO,{'💬':'globo_texto','🏫':'escuela','📄':'hoja_papel','🃏':'carta','🗺️':'mapa','📖':'libro_abierto','📚':'libros','🗣️':'hablar','🏖️':'playa','🧩':'rompecabezas','💛':'corazon_am',
  '🏥':'hospital','🧑‍⚕️':'doctora','🧑‍🏫':'maestra','🧑':'persona','🚗':'carro','🍳':'sarten','😴':'dormido','🌅':'amanecer','🎧':'audifonos','🎒':'mochila','⚡':'rayo','👁️':'ojo','👂':'oreja','👃':'nariz',
  '🏊':'nadador','⏱️':'cronometro','🦄':'unicornio','🚀':'cohete','🛢️':'barril','💃':'bailarina','📇':'fichas','🎮':'control','🛏️':'cama','🚪':'puerta','🏪':'colmadito','⛪':'iglesia','🚌':'guagua','🚲':'bicicleta',
  '🦖':'dino','🦩':'flamenco','🦔':'erizo','🍩':'dona','🧁':'cupcake','🪐':'planeta','☄️':'cometa','🛸':'ovni','⛅':'sol_nube','🎺':'trompeta','🪇':'maraca','⚾':'beisbol','🛼':'patines','👑':'corona','🦊':'zorro','🐨':'koala','🌸':'flor_rosada','⛽':'gasolina','🎤':'microfono','✍️':'lapiz','✍':'lapiz',
  '🦋':'mariposa','🐝':'abeja','🐞':'mariquita'});
/* cada emoji también se reconoce sin el selector de variante (☀ además de ☀️) */
Object.keys(window.ILU_EMO).forEach(e=>{ const s=e.replace(/️/g,''); if(s!==e && !window.ILU_EMO[s]) window.ILU_EMO[s]=window.ILU_EMO[e]; });

/* ---------- última tanda: personas, ropa, caras, casa y objetos de los retos ---------- */
const PIEL3=K.dur, PELO='#9C6B4E', CANA='#E1E4EB';
const cabeza=(pelo,extra='')=>svg(`${pelo}${C(50,52,28,PIEL3)}${eyes(50,10)}${mej(34,60)}${mej(66,60)}${L('M43 64 Q50 69 57 64',K.ink,2.2)}${extra}`);
const caraE=(c,ojos,boca,extra='')=>svg(`${C(50,52,36,c)}${ojos}${boca}${extra}`);
const oficio=(cuerpo,gorro)=>svg(`${P('M26 94 Q26 50 50 50 Q74 50 74 94Z',cuerpo)}${C(50,34,15,PIEL3)}${eyes(34,6,50,2.4)}${gorro}`);
Object.assign(PL,{
c_blanco:()=>svg(C(50,50,32,K.blanco)),
avion:()=>svg(`${P('M10 54 Q10 46 20 46 H74 L90 38 L86 54 Z',K.blanco)}${P('M40 46 L28 18 H38 L56 46Z M42 54 L32 78 H42 L56 54Z',K.cie)}${[30,40,50,60].map(x=>D(x,50,2.4,'#8DBDE6')).join('')}`),
dado:()=>svg(`${R(16,16,68,68,14,K.blanco)}${[[32,32],[68,32],[50,50],[32,68],[68,68]].map(([x,y])=>D(x,y,6,K.ink)).join('')}`),
lobo:()=>svg(`${P('M22 40 L24 10 L42 30Z M78 40 L76 10 L58 30Z','#A8ADBD')}${P('M18 46 Q22 24 50 24 Q78 24 82 46 Q78 74 50 84 Q22 74 18 46Z','#A8ADBD')}${P('M32 58 Q40 52 50 70 Q60 52 68 58 Q62 78 50 84 Q38 78 32 58Z',K.blanco)}${E(50,66,5,3.5,K.ink)}${eyes(48,12)}`),
libro_rojo:()=>svg(`${R(22,10,56,80,6,K.rojo)}${R(22,10,10,80,4,shade(K.rojo,-.1))}${R(42,30,26,14,3,K.blanco)}`),
tigre:()=>svg(`${C(26,26,10,K.naranja)}${C(74,26,10,K.naranja)}${C(50,54,32,K.naranja)}${F('M50 22 L46 34 L54 34Z M22 46 L32 48 L22 52Z M78 46 L68 48 L78 52Z M30 30 L38 38 L28 38Z M70 30 L62 38 L72 38Z',TINTA)}${E(50,66,14,10,K.blanco)}${P('M46 60 H54 L50 65Z',K.ros)}${eyes(50,12)}`),
silla:()=>svg(`${R(26,10,48,40,4,K.madera)}${R(20,50,60,10,3,shade(K.madera,-.08))}${L('M26 60 V92 M74 60 V92',K.madera,6)}`),
tenis:()=>svg(`${P('M10 70 V54 Q10 46 18 46 H40 L52 30 Q56 26 62 30 L74 44 Q90 48 92 62 V70Z',K.cie)}${R(8,70,86,10,4,K.blanco)}${L('M42 40 L50 46 M48 34 L56 40',K.blanco,2.4)}`),
camion:()=>svg(`${R(6,30,58,40,4,K.amarillo)}${P('M64 42 H80 L92 56 V70 H64Z',K.rojo)}${R(70,46,12,10,2,K.cie)}${C(24,74,9,TINTA)}${C(76,74,9,TINTA)}`),
ventana:()=>svg(`${R(16,12,68,76,4,K.blanco)}${R(22,18,56,64,2,K.cie)}${L('M50 18 V82 M22 50 H78',K.blanco,4)}`),
celular:()=>svg(`${R(28,6,44,88,10,TINTA)}${R(32,14,36,64,4,K.cie)}${D(50,86,3,K.gris)}`),
caracol:()=>svg(`${P('M8 82 Q20 70 40 72 H80 Q90 72 92 82Z','#B9E3A0')}${L('M76 72 Q80 54 84 46 M80 72 Q88 56 92 50',K.hoja2,2)}${C(46,56,24,K.dur)}${L('M46 56 m-4 0 a4 4 0 1 1 4 4 a10 10 0 1 1 -10 -10 a16 16 0 1 1 16 16',shade(K.dur,-.25),2.4)}`),
arana:()=>svg(`${L('M50 4 V34',K.gris,1.5)}${L('M40 50 L18 36 M40 56 L14 56 M40 62 L18 76 M60 50 L82 36 M60 56 L86 56 M60 62 L82 76',TINTA,3)}${C(50,56,16,TINTA)}${C(50,38,9,TINTA)}${D(46,36,2,K.blanco)}${D(54,36,2,K.blanco)}`),
hormiga:()=>svg(`${L('M36 56 L24 74 M50 58 L50 78 M64 56 L76 74 M30 38 L20 26 M34 36 L30 22',TINTA,2.6)}${C(28,46,10,'#7A5A44')}${E(50,54,10,8,'#7A5A44')}${E(72,58,14,11,'#7A5A44')}`),
pulmones:()=>svg(`${L('M50 10 V40 M50 40 Q44 46 40 50 M50 40 Q56 46 60 50',K.rosa,5)}${P('M42 34 Q20 30 16 60 Q14 86 30 86 Q44 86 44 70Z',K.rosa)}${P('M58 34 Q80 30 84 60 Q86 86 70 86 Q56 86 56 70Z',K.rosa)}`),
jabon:()=>svg(`${R(14,40,72,40,16,K.ros)}${C(30,28,9,'#EAF5FC')}${C(50,20,7,'#EAF5FC')}${C(68,30,6,'#EAF5FC')}`),
ducha:()=>svg(`${L('M20 92 V20 Q20 10 30 10 H56 V22',K.gris,5)}${P('M42 22 H70 Q70 34 56 34 Q42 34 42 22Z',K.gris)}${L('M46 42 L42 56 M56 42 V58 M66 42 L70 56',K.cie,3)}`),
papel_higienico:()=>svg(`${R(24,20,44,60,6,K.blanco)}${E(46,20,22,8,K.blanco)}${E(46,20,6,3,K.gris)}${P('M68 50 H86 V86 H68Z',K.blanco)}`),
bebe:()=>cabeza(`${L('M50 22 Q54 14 60 18',PELO,3)}`,`${C(50,72,4,K.ros)}`),
nino:()=>cabeza(`${P('M22 50 Q20 20 50 20 Q80 20 78 50 Q70 32 50 32 Q30 32 22 50Z',PELO)}`),
nina:()=>cabeza(`${P('M18 64 Q14 18 50 18 Q86 18 82 64 Q78 40 70 34 Q50 40 30 34 Q22 40 18 64Z',PELO)}`),
hombre_barba:()=>cabeza(`${P('M24 46 Q22 22 50 22 Q78 22 76 46 Q66 34 50 34 Q34 34 24 46Z',PELO)}`,`${P('M24 56 Q30 86 50 86 Q70 86 76 56 Q66 74 50 74 Q34 74 24 56Z',PELO)}`),
abuelo:()=>cabeza(`${P('M22 50 Q20 32 30 28 Q36 40 30 50Z M78 50 Q80 32 70 28 Q64 40 70 50Z',CANA)}`,`${anillo(40,50,7,5,K.gris)}${anillo(60,50,7,5,K.gris)}`),
abuela:()=>cabeza(`${C(50,20,12,CANA)}${P('M20 56 Q18 22 50 22 Q82 22 80 56 Q72 34 50 34 Q28 34 20 56Z',CANA)}`,`${anillo(40,50,7,5,K.lav)}${anillo(60,50,7,5,K.lav)}`),
mujer:()=>PL.nina(),
hombre:()=>PL.nino(),
ciudad_tarde:()=>svg(`${R(0,0,100,100,0,K.dur)}${C(50,62,20,K.amarillo)}${R(8,44,18,56,2,K.lav)}${R(30,30,16,70,2,'#B39AD9')}${R(56,40,18,60,2,K.lav)}${R(78,52,16,48,2,'#B39AD9')}${[14,36,62,84].map(x=>R(x,58,5,6,1,K.amarillo)).join('')}`),
sobre:()=>svg(`${R(10,24,80,54,4,K.blanco)}${L('M10 26 L50 56 L90 26',K.gris,2.4)}${C(74,64,7,K.rojo)}`),
telefono:()=>svg(`${P('M14 46 Q14 22 50 22 Q86 22 86 46 L74 50 L66 38 Q50 34 34 38 L26 50Z',K.rojo)}${P('M24 52 H76 L84 82 H16Z',K.rojo)}${C(50,66,9,K.blanco)}`),
boca:()=>svg(`${P('M10 50 Q30 26 50 38 Q70 26 90 50 Q70 80 50 80 Q30 80 10 50Z',K.rojo)}${L('M14 50 Q50 58 86 50',shade(K.rojo,-.25),2.4)}`),
pie:()=>svg(`${P('M34 10 H58 V60 Q86 62 88 78 Q88 90 70 90 H34 Q26 90 26 80 V20 Q26 10 34 10Z',PIEL3)}${[66,74,82].map((x,i)=>D(x,64+i*2,4,shade(PIEL3,-.08))).join('')}`),
camiseta:()=>svg(P('M30 14 Q50 26 70 14 L92 30 L82 46 L72 40 V90 H28 V40 L18 46 L8 30Z',K.cie)),
gorra:()=>svg(`${P('M16 60 Q16 24 50 24 Q84 24 84 60Z',K.rojo)}${P('M60 58 Q90 54 96 64 Q80 70 56 66Z',shade(K.rojo,-.1))}${C(50,24,5,shade(K.rojo,-.1))}`),
vestido:()=>svg(P('M38 10 H62 L60 30 Q64 38 70 40 L88 88 Q50 96 12 88 L30 40 Q36 38 40 30Z',K.ros)),
agricultor:()=>oficio(K.hoja2,`${E(50,22,26,6,K.amarillo)}${P('M38 22 Q40 6 50 6 Q60 6 62 22Z',K.amarillo)}`),
bombero:()=>oficio(K.rojo,`${P('M32 26 Q32 8 50 8 Q68 8 68 26Z',K.amarillo)}${R(28,24,44,6,3,K.amarillo)}`),
policia:()=>oficio('#7D9ED6',`${P('M34 24 Q36 10 50 10 Q64 10 66 24Z','#5B7BB5')}${R(32,22,36,6,3,TINTA)}${estrella(50,16,4,2,K.amarillo)}`),
cocinero:()=>oficio(K.blanco,`${P('M34 26 V14 Q30 4 40 4 Q46 0 52 4 Q60 0 64 6 Q72 8 66 16 V26Z',K.blanco)}`),
copo:()=>svg(`${[0,60,120].map(a=>`<g transform="rotate(${a} 50 50)">${L('M50 10 V90 M50 22 L42 14 M50 22 L58 14 M50 78 L42 86 M50 78 L58 86',K.cie,5)}</g>`).join('')}`),
calor:()=>caraE(K.rojo,eyes(46,12),L('M38 66 Q50 58 62 66',K.ink,3),`${gotaG2(80,30)}`),
por:()=>svg(L('M24 24 L76 76 M76 24 L24 76',K.lav,14)),
menos:()=>svg(L('M20 50 H80',K.lav,14)),
escuadra:()=>svg(`<path fill-rule="evenodd" d="M12 88 V12 L88 88Z M26 74 H58 L26 42Z" ${at(K.amarillo)}/>${L('M14 30 H20 M14 46 H20 M14 62 H20',shade(K.amarillo,-.3),2)}`),
abc:()=>svg(`${R(10,22,80,56,12,K.man)}${T('M20 66 L30 34 L40 66 M24 54 H36',K.rojo,4)}${T('M48 34 V66 Q64 66 62 56 Q60 48 48 50 Q60 48 58 40 Q56 34 48 34',K.cie,3.5)}${T('M86 40 Q80 34 74 36 Q66 40 66 50 Q66 62 74 64 Q80 66 86 60',K.hoja2,3.5)}`),
lupa:()=>svg(`${T('M62 62 L88 88',K.cafe,10)}${anillo(40,40,28,20,K.gris)}<circle cx="40" cy="40" r="20" fill="#EAF5FC"/>`),
brujula:()=>svg(`${C(50,50,38,K.madera)}${C(50,50,30,K.blanco)}${P('M50 22 L58 50 H42Z',K.rojo)}${P('M50 78 L58 50 H42Z',K.gris)}${D(50,50,4,K.ink)}`),
reloj_arena:()=>svg(`${R(18,8,64,10,3,K.madera)}${R(18,82,64,10,3,K.madera)}${P('M26 18 H74 Q74 40 54 50 Q74 60 74 82 H26 Q26 60 46 50 Q26 40 26 18Z','#EAF5FC')}${P('M34 26 H66 Q62 38 50 44 Q38 38 34 26Z M36 80 Q42 66 50 62 Q58 66 64 80Z',K.amarillo)}`),
candado:()=>svg(`${L('M32 46 V30 Q32 12 50 12 Q68 12 68 30 V46',K.gris,8)}${R(20,44,60,46,8,K.amarillo)}${C(50,62,6,shade(K.amarillo,-.3))}${R(47,64,6,12,2,shade(K.amarillo,-.3))}`),
silencio_c:()=>svg(`${P('M14 38 H32 L56 18 V82 L32 62 H14Z',K.lav)}${L('M66 38 L88 62 M88 38 L66 62',K.rojo,5)}`),
parar_c:()=>svg(R(22,22,56,56,10,K.rojo)),
cuadro_naranja:()=>svg(R(18,18,64,64,8,K.naranja)),
triangulo_rojo:()=>svg(P('M50 14 L88 82 H12Z',K.rojo)),
triangulo_abajo:()=>svg(P('M50 86 L88 18 H12Z',K.rojo)),
rombo_naranja:()=>svg(P('M50 10 L86 50 L50 90 L14 50Z',K.naranja)),
cuadro_blanco:()=>svg(R(18,18,64,64,8,K.blanco)),
corazon_blanco:()=>svg(P('M50 86 Q14 62 14 38 Q14 18 32 18 Q44 18 50 30 Q56 18 68 18 Q86 18 86 38 Q86 62 50 86Z',K.blanco)),
corazon_azul:()=>svg(P('M50 86 Q14 62 14 38 Q14 18 32 18 Q44 18 50 30 Q56 18 68 18 Q86 18 86 38 Q86 62 50 86Z','#8DBDE6')),
velero:()=>svg(`${P('M10 70 H90 L78 86 H22Z',K.madera)}${L('M50 70 V12',K.cafe,3)}${P('M52 14 L84 62 H52Z',K.blanco)}${P('M48 24 L22 62 H48Z',K.rojo)}${P('M0 88 Q25 80 50 88 Q75 96 100 88 V100 H0Z','#8DBDE6')}`),
helado:()=>svg(`${P('M30 50 L50 94 L70 50Z',K.madera)}${L('M36 56 L60 80 M64 56 L44 80',shade(K.madera,-.15),1.6)}${C(40,40,16,K.ros)}${C(60,40,16,K.crema)}${C(50,24,15,'#B98466')}`),
kiwi:()=>svg(`${C(50,50,38,'#B98466')}${C(50,50,32,'#A9D47F')}${C(50,50,10,'#F1F4D6')}${[0,40,80,120,160,200,240,280,320].map(a=>`<g transform="rotate(${a} 50 50)">${E(50,30,1.6,3,K.ink)}</g>`).join('')}`),
batata:()=>svg(`${P('M10 60 Q16 30 50 32 Q86 30 92 52 Q90 76 56 76 Q20 80 10 60Z','#C9806E')}${L('M30 46 Q36 42 40 46 M60 60 Q66 56 70 60',shade('#C9806E',-.2),2)}`),
raton:()=>svg(`${C(28,32,14,K.gris)}${C(72,32,14,K.gris)}${D(28,32,8,K.ros)}${D(72,32,8,K.ros)}${P('M20 56 Q22 34 50 34 Q78 34 80 56 Q70 82 50 84 Q30 82 20 56Z',K.gris)}${D(50,68,4,K.ros)}${eyes(54,11)}${L('M30 70 H16 M70 70 H84',K.grisO||'#B4B9C8',1.6)}`),
waffle:()=>svg(`${R(14,14,72,72,12,'#E6C08E')}${L('M32 14 V86 M50 14 V86 M68 14 V86 M14 32 H86 M14 50 H86 M14 68 H86',shade('#E6C08E',-.18),3)}${P('M54 10 H74 Q76 22 66 22 Q56 22 54 10Z',K.amarillo)}`),
sombrero:()=>svg(`${E(50,64,44,12,K.amarillo)}${P('M28 62 Q28 30 50 30 Q72 30 72 62Z',K.amarillo)}${R(28,54,44,8,0,K.rosa)}`),
birrete:()=>svg(`${P('M50 18 L94 38 L50 58 L6 38Z',TINTA)}${P('M26 48 V68 Q50 82 74 68 V48 L50 58Z',TINTA)}${L('M88 40 V64',K.amarillo,3)}${C(88,66,4,K.amarillo)}`),
casco:()=>svg(`${P('M10 66 Q10 22 50 20 Q90 22 90 66Z',K.amarillo)}${R(4,62,92,10,5,shade(K.amarillo,-.1))}${R(46,20,8,44,2,shade(K.amarillo,-.1))}`),
lentes:()=>svg(`${anillo(28,50,18,13,TINTA)}${anillo(72,50,18,13,TINTA)}<circle cx="28" cy="50" r="13" fill="#EAF5FC"/><circle cx="72" cy="50" r="13" fill="#EAF5FC"/>${L('M46 48 Q50 44 54 48',TINTA,3)}`),
lentes_sol:()=>svg(`${R(8,36,38,28,10,TINTA)}${R(54,36,38,28,10,TINTA)}${L('M46 44 H54',TINTA,4)}${L('M16 44 L26 44',K.gris,2)}`),
lazo:()=>svg(`${P('M50 50 L14 26 Q8 50 14 74Z',K.rosa)}${P('M50 50 L86 26 Q92 50 86 74Z',K.rosa)}${P('M46 56 L34 92 L44 86 L50 60Z M54 56 L66 92 L56 86 L50 60Z',shade(K.rosa,-.08))}${C(50,50,9,shade(K.rosa,-.1))}`),
bufanda:()=>svg(`${P('M14 30 Q50 52 86 30 V48 Q50 70 14 48Z',K.rojo)}${R(58,48,16,42,4,K.rojo)}${L('M60 90 V96 M66 90 V96 M72 90 V96',K.rojo,2)}${L('M14 38 Q50 60 86 38',K.blanco,2.4)}`),
corbata:()=>svg(`${P('M40 10 H60 L56 22 H44Z','#7D9ED6')}${P('M44 22 H56 L66 76 L50 92 L34 76Z','#7D9ED6')}${L('M46 40 L60 34 M42 58 L62 50',K.blanco,2.4)}`),
collar:()=>svg(Array.from({length:11},(_,i)=>{ const a=(200+i*14)*Math.PI/180; return C(f(50+36*Math.cos(a)*-1),f(30+36*Math.sin(-a)*-1+20),6,i%2?K.ros:K.blanco); }).join('')),
chupeta:()=>svg(`${L('M50 56 V96',K.blanco,5)}${C(50,34,28,K.ros)}${L('M50 34 m-14 0 a14 14 0 1 1 14 14 a8 8 0 1 1 -8 -8',K.blanco,4)}`),
varita:()=>svg(`${L('M18 86 L62 42',TINTA,6)}${estrella(70,30,20,9,K.amarillo)}`),
camara:()=>svg(`${R(10,30,80,52,8,K.gris)}${R(32,20,22,14,3,K.gris)}${C(50,56,18,TINTA)}${C(50,56,10,'#8DBDE6')}${D(78,40,4,K.rojo)}`),
pensando:()=>caraE(K.amarillo,`${D(38,46,3.4,K.ink)}${D(62,42,3.4,K.ink)}${L('M56 34 L68 30',K.ink,2.4)}`,L('M40 68 Q50 64 60 70',K.ink,2.8),`${C(80,80,8,K.amarillo)}`),
preocupado:()=>caraE(K.amarillo,`${eyes(48,12)}${L('M30 36 L42 40 M70 36 L58 40',K.ink,2.4)}`,L('M38 70 Q50 62 62 70',K.ink,2.8)),
tubo_ensayo:()=>svg(`<g transform="rotate(25 50 50)">${R(38,6,24,8,3,K.gris)}${P('M40 14 H60 V78 Q60 92 50 92 Q40 92 40 78Z','#EAF5FC')}${P('M41 50 H59 V78 Q59 90 50 90 Q41 90 41 78Z',K.ros)}</g>`),
sol_lluvia:()=>svg(`<g transform="translate(-14 -14) scale(.8)">${rayos3()}${C(50,50,22,K.amarillo)}</g><g transform="translate(16 10) scale(.8)">${P('M22 70 Q10 70 10 58 Q10 46 24 46 Q26 30 44 30 Q58 28 64 40 Q78 36 84 50 Q94 52 92 62 Q90 70 80 70Z',K.blanco)}</g>${L('M40 78 l-4 10 M58 78 l-4 10 M76 78 l-4 10',K.cie,3.5)}`),
remolino_ic:()=>svg(L('M50 50 m-4 0 a4 4 0 1 1 4 4 a10 10 0 1 1 -10 -10 a18 18 0 1 1 18 18 a28 28 0 1 1 -28 -28',K.lav,6)),
torre:()=>svg(`${P('M50 6 L58 40 L66 92 H34 L42 40Z','#B39AD9')}${L('M44 40 H56 M40 62 H60',shade('#B39AD9',-.2),3)}${P('M42 92 Q50 74 58 92Z',K.blanco)}`),
microscopio:()=>svg(`${R(20,84,60,10,4,K.gris)}${T('M66 84 Q80 70 68 46',K.gris,6)}${R(40,14,16,44,4,K.blanco,'transform="rotate(-25 48 36)"')}${R(28,60,38,8,3,K.gris)}${C(44,72,5,K.cie)}`),
campana:()=>svg(`${P('M20 74 Q24 66 26 50 Q28 22 50 20 Q72 22 74 50 Q76 66 80 74Z',K.amarillo)}${R(16,72,68,8,4,shade(K.amarillo,-.1))}${C(50,84,6,shade(K.amarillo,-.2))}${C(50,16,5,shade(K.amarillo,-.1))}`),
disco:()=>svg(`${C(50,50,38,'#D6ECFA')}${C(50,50,12,K.blanco)}${L('M30 34 Q40 24 54 22',K.lav,3)}${L('M70 66 Q62 76 48 78',K.ros,3)}`),
caja_carton:()=>svg(`${P('M14 34 L50 20 L86 34 V78 L50 92 L14 78Z',K.madera)}${L('M14 34 L50 48 L86 34 M50 48 V92',shade(K.madera,-.2),1.6)}${R(40,26,20,8,2,shade(K.madera,.3),'transform="rotate(-20 50 30)"')}`),
luna_nueva:()=>svg(`${C(50,50,34,'#5B5872')}${D(40,40,5,'#6E6880')}${D(60,62,4,'#6E6880')}`),
casas:()=>svg(`${R(8,48,38,40,2,K.ros)}${P('M4 50 L27 28 L50 50Z',K.rojo)}${R(52,40,40,48,2,K.men)}${P('M48 42 L72 20 L96 42Z',K.gris)}${R(20,66,12,22,2,K.blanco)}${R(66,64,12,24,2,K.blanco)}`),
nube_pensar:()=>svg(`${P('M24 60 Q10 60 10 46 Q10 32 26 32 Q30 16 50 18 Q66 16 72 30 Q90 30 90 46 Q90 60 76 60Z',K.blanco)}${C(30,74,7,K.blanco)}${C(18,88,4,K.blanco)}`),
pastel:()=>svg(`${R(14,46,72,44,6,K.ros)}${P('M14 54 Q24 62 32 54 Q40 62 50 54 Q58 62 68 54 Q76 62 86 54 V46 H14Z',K.blanco)}${[30,50,70].map(x=>R(x-3,24,6,22,2,['#8DBDE6',K.amarillo,K.hoja2][x%3])+P(`M${x} 12 Q${x+5} 18 ${x} 22 Q${x-5} 18 ${x} 12Z`,K.naranja)).join('')}`),
fiesta:()=>svg(`${P('M14 88 L36 30 L70 64Z',K.amarillo)}${L('M22 66 L40 74 M30 46 L52 58',K.rosa,4)}${[[62,24,K.rosa],[78,40,K.cie],[84,18,K.hoja],[52,12,K.lav]].map(([x,y,c])=>R(x,y,7,7,2,c)).join('')}`),
pareja:()=>svg(`${C(32,30,12,PIEL3)}${C(68,30,12,PIEL3)}${P('M14 92 Q14 48 32 48 Q50 48 50 92Z','#8DBDE6')}${P('M50 92 Q50 48 68 48 Q86 48 86 92Z',K.ros)}${eyes(30,5,32,2)}${eyes(30,5,68,2)}`),
mono2:()=>PL.mono(), despertador:()=>PL.ti_clock(), robot:()=>PL.ti_code(), balanza:()=>PL.ti_balance(), reloj:()=>PL.ti_clock(), partitura:()=>PL.nota_musical()
});
PL.carita=()=>svg(`${eyes(44,13,50,5)}${mej(28,56,1.4)}${mej(72,56,1.4)}${L('M40 58 Q50 68 60 58',K.ink,4)}`);
function gotaG2(x,y){ return `<g transform="translate(${x} ${y}) scale(.5)">${P('M0 -22 Q16 -2 16 8 Q16 22 0 22 Q-16 22 -16 8 Q-16 -2 0 -22Z',K.cie)}</g>`; }
function rayos3(){ return Array.from({length:10},(_,i)=>{ const a=i*Math.PI/5; return L(`M${f(50+30*Math.cos(a))} ${f(50+30*Math.sin(a))} L${f(50+40*Math.cos(a))} ${f(50+40*Math.sin(a))}`,K.amarillo,5); }).join(''); }
Object.assign(window.ILU_EMO,{'⚪':'c_blanco','✈️':'avion','🎲':'dado','🐺':'lobo','🐒':'mono2','⏰':'despertador','📕':'libro_rojo','🐯':'tigre','🪑':'silla','🚆':'tren','👟':'tenis','🚚':'camion','🪟':'ventana','📱':'celular',
 '🐌':'caracol','🕷️':'arana','🐜':'hormiga','🫁':'pulmones','🧼':'jabon','👐':'mano','🚿':'ducha','🧻':'papel_higienico','👶':'bebe','🧒':'nino','🧔':'hombre_barba','👴':'abuelo','🌇':'ciudad_tarde','✉️':'sobre','☎️':'telefono',
 '👄':'boca','🦶':'pie','👵':'abuela','👕':'camiseta','🧢':'gorra','👗':'vestido','🧑‍🌾':'agricultor','🧑‍🚒':'bombero','👮':'policia','🧑‍🍳':'cocinero','❄️':'copo','🥵':'calor','✖️':'por','📐':'escuadra','🔤':'abc',
 '🔍':'lupa','🧭':'brujula','⏳':'reloj_arena','🤝':'mano','🔒':'candado','🔇':'silencio_c','⏹️':'parar_c','🟧':'cuadro_naranja','🔺':'triangulo_rojo','⛵':'velero','🍦':'helado','🥝':'kiwi','🍠':'batata','🐭':'raton',
 '🧇':'waffle','👒':'sombrero','🎓':'birrete','⛑️':'casco','🪖':'casco','👓':'lentes','🕶️':'lentes_sol','🥽':'careta','🎀':'lazo','🧣':'bufanda','👔':'corbata','📿':'collar','🌂':'paraguas','🍭':'chupeta','🪄':'varita',
 '📸':'camara','🤔':'pensando','🫒':'aceituna','👩':'mujer','👨':'hombre','🧪':'tubo_ensayo','🌦️':'sol_lluvia','🤖':'robot','🌀':'remolino_ic','🗼':'torre','⚖️':'balanza','🕐':'reloj','🔬':'microscopio','🔶':'rombo_naranja',
 '⬜':'cuadro_blanco','🤍':'corazon_blanco','➖':'menos','🎼':'partitura','🔔':'campana','📀':'disco','👏':'mano','🔻':'triangulo_abajo','📦':'caja_carton','🌑':'luna_nueva','🏘️':'casas','💭':'nube_pensar','🎂':'pastel',
 '🎉':'fiesta','😟':'preocupado','💙':'corazon_azul','👫':'pareja'});
Object.keys(window.ILU_EMO).forEach(e=>{ const s=e.replace(/️/g,''); if(s!==e && !window.ILU_EMO[s]) window.ILU_EMO[s]=window.ILU_EMO[e]; });

/* ---------- música: batería, merengue y notas ---------- */
Object.assign(PL,{
platillo:()=>svg(`${L('M50 40 V92 M36 92 H64',K.gris,3)}${E(50,36,40,9,K.amarillo)}${E(50,32,8,4,shade(K.amarillo,-.1))}`),
tambor:()=>svg(`${P('M14 40 V76 Q14 88 50 88 Q86 88 86 76 V40Z',K.cie)}${L('M14 46 L32 82 L50 46 L68 84 L86 46',shade(K.cie,.5),2.4)}${E(50,40,36,11,K.blanco)}`),
bombo:()=>svg(`${C(50,52,38,K.rosa)}${C(50,52,30,K.blanco)}${C(50,52,10,K.rosa)}${L('M30 92 L36 84 M70 92 L64 84',K.gris,3)}`),
mano:()=>svg(P('M32 92 V58 Q26 44 24 34 Q23 27 28 26 Q33 25 35 33 L39 46 V22 Q39 16 44 16 Q49 16 49 22 V44 L51 18 Q51 12 57 12 Q62 13 62 19 L61 44 L65 24 Q66 18 71 19 Q76 20 75 26 L71 52 Q70 64 68 72 V92Z',K.dur)),
palitos:()=>svg(`${L('M20 90 L70 10 M34 92 L84 14',K.madera,6)}${L('M20 90 L70 10 M34 92 L84 14',shade(K.madera,-.25),1.2)}`),
nota_musical:()=>svg(`${L('M38 72 V20 L76 12 V62',K.lav,6)}${E(30,74,12,9,K.lav,'transform="rotate(-20 30 74)"')}${E(68,64,12,9,K.lav,'transform="rotate(-20 68 64)"')}`)
});
Object.assign(window.ILU_EMO,{'🎵':'nota_musical','🎶':'nota_musical','🔁':'flechas','🔆':'platillo','🪘':'tambor','⚫':'bombo','✋':'mano','🥢':'palitos','🎩':'ic_gorro'});

/* ---------- animaciones de la naturaleza ---------- */
const quieto=()=> (typeof RM!=='undefined'&&RM) || !Element.prototype.animate;
/* ondas de sonido junto a un animal de la granja */
window.sonar=(el)=>{ if(quieto()||!el) return; const s=document.createElement('span'); s.className='sonar';
  s.innerHTML='<svg viewBox="0 0 40 60"><path d="M6 18 Q14 30 6 42 M16 10 Q30 30 16 50 M26 2 Q46 30 26 58" fill="none" stroke="#8F82C6" stroke-width="3.5" stroke-linecap="round"/></svg>';
  el.appendChild(s); s.animate([{opacity:0,transform:'translateX(-6px) scale(.7)'},{opacity:1,offset:.3},{opacity:0,transform:'translateX(10px) scale(1.1)'}],{duration:900,easing:'ease-out'}).onfinish=()=>s.remove(); };
/* un rayo que aparece un momento en la tormenta */
window.relampago=(cont)=>{ if(quieto()) return; const r=document.createElement('span'); r.className='relampago'; r.style.left=rnd(20,70)+'%'; r.innerHTML=ilu('rayo','100%'); cont.appendChild(r);
  r.animate([{opacity:0,transform:'scale(.6)'},{opacity:1,transform:'scale(1)',offset:.15},{opacity:1,offset:.5},{opacity:0}],{duration:900}).onfinish=()=>r.remove(); };

/* ---------- escenas planas: acuario, granja, tiempo, bloques ---------- */
const capa=(d,html,css='')=>`<div class="sl" data-d="${d}" style="${css}">${html}</div>`;
const lam=(vb,body,css,par='xMidYMax slice')=>`<svg class="sp" viewBox="${vb}" preserveAspectRatio="${par}" aria-hidden="true" style="${css}">${body}</svg>`;
const ilus=(n,css,cls='')=>`<div class="sp ${cls}" style="${css}">${ilu(n,'100%')}</div>`;
const colinas=(c1,c2)=>P('M-20 112 Q50 34 160 62 Q230 80 270 112Z',c1)+P('M140 112 Q250 40 420 70 V112Z',c2);
const pino=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})">${P('M-2 0 V-10 H2 V0Z',K.cafe)}${P('M0 -46 L13 -10 H-13Z',K.hoja2)}</g>`;
const arbolito=(x,y,s,c=K.hoja2)=>`<g transform="translate(${x} ${y}) scale(${s})">${P('M-3 0 L-2 -24 H2 L3 0Z',K.cafe)}${C(0,-34,15,c)}</g>`;
const cercaPlana=()=>{ let s=''; for(let x=0;x<400;x+=16) s+=P(`M${x+2} 40 V10 L${x+7} 4 L${x+12} 10 V40Z`,K.crema); return s+R(-4,16,408,5,2,K.crema)+R(-4,28,408,5,2,K.crema); };
const S=window.SCENES;
S.acuario=()=>capa(.2,ilus('alga','left:4%;bottom:30px;width:18%;max-width:110px','sway')+ilus('alga','left:42%;bottom:30px;width:13%;max-width:80px','sway slow')+ilus('alga','right:4%;bottom:30px;width:20%;max-width:120px','sway'),'opacity:.5')
  +capa(.45,lam('0 0 400 60',`${P('M-10 60 V30 Q60 14 140 26 Q220 40 300 22 Q360 14 410 24 V60Z','#F2DDB0')}${P('M96 32 Q104 18 120 22 Q132 26 128 34Z',K.gris)}${P('M270 30 Q276 20 290 22 Q300 26 296 32Z',shade(K.gris,-.05))}${D(60,44,3,shade('#F2DDB0',-.1))}${D(200,48,2.5,shade('#F2DDB0',-.1))}${D(340,42,3,shade('#F2DDB0',-.1))}`,'left:0;width:100%;bottom:0;height:64px')+ilus('coral','left:24%;bottom:24px;width:12%;max-width:64px')+ilus('alga','left:56%;bottom:26px;width:10%;max-width:56px','sway'));
S.granja=()=>capa(.12,`<div class="sp spin" style="right:6%;top:3%;width:16%;max-width:70px">${ilu('sol','100%')}</div>`+ilus('nube1','left:8%;top:5%;width:24%;max-width:120px','drift')+ilus('nube1','left:56%;top:calc(5% + 18px);width:18%;max-width:96px','drift slow'))
  +capa(.3,lam('0 0 400 110',`${colinas('#CDE8BE','#BCDDA8')}${arbolito(30,100,1.1)}${arbolito(62,104,.8,'#93CC9A')}${PL.granero().replace('<svg ','<svg x="300" y="38" width="76" height="76" ')}`,'left:0;width:100%;bottom:70%;height:20%'))
  +capa(.45,lam('0 0 400 40',cercaPlana(),'left:0;width:100%;bottom:calc(70% - 3px);height:6%'));
S.tiempo=()=>capa(.3,lam('0 0 400 110',`${colinas('#C3E2B0','#B2D89C')}${pino(250,104,1)}${pino(270,108,.8)}${arbolito(330,104,1)}${arbolito(110,106,.8,'#93CC9A')}`,'left:0;width:100%;bottom:29%;height:18%'));
S.bloques=()=>capa(.15,ilus('nube1','left:8%;top:6%;width:24%;max-width:120px','drift')+ilus('nube1','left:52%;top:calc(6% + 22px);width:18%;max-width:96px','drift slow'))
  +capa(.35,lam('0 0 400 110',colinas('#D6EBC6','#C8E3B2'),'left:0;width:100%;bottom:30px;height:22%'));

})();
