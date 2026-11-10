/* Semillita · Biblioteca de ilustraciones SVG (docs/GUIA-ILUSTRACIONES.md)
   =========================================================
   - Cada pieza: viewBox 0 0 100 100, formas redondeadas, relleno pastel plano,
     contorno 3.5 en un tono 28 % más oscuro (shade(c,-.28)) y una luz blanca al 35 %.
   - Mismo estilo que creature() en 04-personajes.js (de ahí viene shade()).
   - ILU.nombre(c?) devuelve el <svg>; c cambia el color principal cuando aplica.
   - ilu(nombre, tam) envuelve la pieza en <span class="ilu">. tam en px (número)
     o en unidades CSS ('1em' hereda el tamaño de letra del contenedor).
   - emo(emoji, tam) traduce un emoji a su ilustración; si no hay, deja el emoji.
   Se carga después de 04 y antes de 05.
   ========================================================= */
(function(){
const SW=3.5;
const K={ink:'#4A4658', rosa:'#F4A6A6', dur:'#F7C59F', man:'#F6E39A', men:'#B9E3C6', cie:'#A9D3F0', lav:'#C9B8EE', ros:'#F5B8D0',
  hoja:'#9ED47F', hoja2:'#7FC48A', tierra:'#C9A07A', madera:'#D9B48A', rojo:'#F28B82', naranja:'#F7A65C', crema:'#FFF6E4',
  blanco:'#FBF8F4', gris:'#CDD2DC', cafe:'#A97A5A', amarillo:'#F9D86B', choco:'#9C6B4E'};
const hex6=c=>/^#[0-9a-f]{3}$/i.test(c)?'#'+[...c.slice(1)].map(x=>x+x).join(''):c;
const o=c=>shade(hex6(c),-.28);
const at=(c,ex='')=>`fill="${c}"${/stroke=/.test(ex)?'':` stroke="${o(c)}"`}${/stroke-width/.test(ex)?'':` stroke-width="${SW}"`} stroke-linejoin="round" stroke-linecap="round"${ex?' '+ex:''}`;
const P=(d,c,ex)=>`<path d="${d}" ${at(c,ex)}/>`;
const E=(cx,cy,rx,ry,c,ex)=>`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" ${at(c,ex)}/>`;
const C=(cx,cy,r,c,ex)=>`<circle cx="${cx}" cy="${cy}" r="${r}" ${at(c,ex)}/>`;
const R=(x,y,w,h,r,c,ex)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" ${at(c,ex)}/>`;
/* trazo sin relleno */
const L=(d,c,w=SW)=>`<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
/* trazo grueso con contorno (tallos, tentáculos, coral) */
const T=(d,c,w=8)=>L(d,o(c),w+SW*2)+L(d,c,w);
/* luz suave */
const luz=(cx,cy,rx,ry,rot=-30)=>`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#fff" opacity=".35" transform="rotate(${rot} ${cx} ${cy})"/>`;
/* sin contorno (manchas, semillas, detalles) */
const F=(d,c,op=1)=>`<path d="${d}" fill="${c}"${op<1?` opacity="${op}"`:''}/>`;
const D=(cx,cy,r,c,op=1)=>`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${c}"${op<1?` opacity="${op}"`:''}/>`;
/* carita: ojos de punto con brillo, mejillas rosadas y sonrisa */
const cara=(cx,cy,s=1,sep=9)=>{ const ex=sep*s, r=3.1*s;
  return `${D(cx-ex,cy,r,K.ink)}${D(cx+ex,cy,r,K.ink)}${D(cx-ex+1*s,cy-1.1*s,1*s,'#fff')}${D(cx+ex+1*s,cy-1.1*s,1*s,'#fff')}`
   +`<ellipse cx="${cx-ex-4.5*s}" cy="${cy+5*s}" rx="${3.6*s}" ry="${2.2*s}" fill="#F6A5B5" opacity=".8"/><ellipse cx="${cx+ex+4.5*s}" cy="${cy+5*s}" rx="${3.6*s}" ry="${2.2*s}" fill="#F6A5B5" opacity=".8"/>`
   +L(`M${cx-3.5*s} ${cy+4*s} Q${cx} ${cy+7.5*s} ${cx+3.5*s} ${cy+4*s}`,K.ink,2.4*s); };
const ojo=(cx,cy,r=3.2)=>`${D(cx,cy,r,K.ink)}${D(cx+r*.35,cy-r*.35,r*.33,'#fff')}`;
const mej=(cx,cy,s=1)=>`<ellipse cx="${cx}" cy="${cy}" rx="${3.6*s}" ry="${2.2*s}" fill="#F6A5B5" opacity=".8"/>`;
/* hoja: base en (x,y), ángulo en grados, largo */
const hoja=(x,y,ang,len,c=K.hoja)=>`<g transform="translate(${x} ${y}) rotate(${ang})">${P(`M0 0 Q${len*.45} ${-len*.42} ${len} 0 Q${len*.45} ${len*.42} 0 0Z`,c)}${L(`M${len*.12} 0 L${len*.7} 0`,o(c),2)}</g>`;
const tallo=(d,c=K.hoja2)=>T(d,c,4);
const tierra=()=>P('M14 92 Q14 80 30 78 Q50 74 70 78 Q86 80 86 92Z',K.tierra)+D(36,85,2.2,shade(K.tierra,-.15))+D(60,87,1.8,shade(K.tierra,-.15));
const svg=b=>`<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">${b}</svg>`;
const pet=(cx,cy,n,dist,rx,ry,c)=>Array.from({length:n},(_,i)=>{const a=i*360/n; return `<g transform="rotate(${a} ${cx} ${cy})">${E(cx,cy-dist,rx,ry,c)}</g>`;}).join('');

const ILU={
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

/* emoji → ilustración (solo para mostrar; los datos siguen guardando el emoji) */
const EMO={'🌰':'semilla','🟤':'semilla','🌱':'brote','🌿':'planta','🌼':'flor_amarilla','🥀':'flor_roja','🍀':'arbusto','🍃':'arbusto','🥬':'arbusto','🌾':'arbusto','🪴':'arbusto','🌳':'arbol','🌴':'palmera',
 '🌻':'girasol','🌷':'tulipan','🌹':'rosa','🌺':'cayena','🍅':'tomate','🌽':'maiz','🍓':'fresa','🥕':'zanahoria','🍉':'sandia','🫛':'habichuela','🥭':'mango','💧':'gota','🧺':'canasta',
 '🍞':'pan','🥚':'huevo','🍌':'guineo','🥛':'leche','🧃':'jugo','🧀':'queso','🍫':'chocolate','🥑':'aguacate','🍬':'dulce','🍚':'arroz','🍋':'limon','🥤':'refresco','🛍️':'funda',
 '🐟':'pez','🐠':'pez_tropical','🐡':'pez_globo','🐙':'pulpo','🦑':'calamar','🦀':'cangrejo','🦞':'langosta','🐢':'tortuga','🐬':'delfin','🦈':'tiburon','🐳':'ballena','🪼':'medusa','🏰':'castillo','🪸':'coral','🐚':'concha',
 '🐄':'vaca','🐷':'cerdo','🐔':'gallina','🐑':'oveja','🐴':'caballo','🦆':'pato','🐶':'perro','🐱':'gato','🐐':'chivo','🏚️':'granero',
 '🎹':'piano','🎸':'guitarra','🪈':'flauta','🎻':'violin','🥁':'bateria',
 /* piezas que solo existen en Kenney */
 '🍎':'manzana','🍐':'pera','🍇':'uvas','🍒':'cerezas','🍊':'naranja','🍍':'pina','🍕':'pizza',
 '🐰':'conejo','🐻':'oso','🐵':'mono','🦉':'buho','🐸':'rana','🐼':'panda','🦜':'loro','🐘':'elefante','🦒':'jirafa','🐧':'pinguino','🐮':'vaca','🐖':'cerdo','🐓':'gallina','🐕':'perro',
 '🫧':'burbuja','🪨':'roca'};

/* ---------- Kenney (CC0) primero, SVG propio como respaldo ----------
   window.KENNEY lo genera scripts/kenney.mjs en public/kenney/kenney.js: {nombre:[ancho, alto, esIcono]} */
const KN=()=>window.KENNEY||{};
const tamCss=tam=>typeof tam==='number'?tam+'px':tam;
window.ILU=ILU; window.ILU_EMO=EMO;
/* origen de una pieza: 'kenney', 'svg' o '' si no existe */
window.iluFuente=n=>KN()[n]&&!KN()[n][2]?'kenney':ILU[n]?'svg':'';
window.ilu=(nombre,tam=48,c)=>{ const t=tamCss(tam), k=KN()[nombre];
  if (k && !k[2]) return `<span class="ilu" data-ilu="${nombre}" style="width:${t};height:${t}"><img src="/kenney/${nombre}.webp" alt="" draggable="false" decoding="async"></span>`;
  const f=ILU[nombre]; if(!f) return '';
  return `<span class="ilu" data-ilu="${nombre}" style="width:${t};height:${t}">${c?f(c):f()}</span>`; };
window.emo=(e,tam='1.1em')=> EMO[e]&&iluFuente(EMO[e]) ? ilu(EMO[e],tam) : e;
/* ícono monocromo de Kenney (Game Icons), toma el color del texto: kic('play') */
window.kic=(nombre,tam='1em')=> KN()['kic_'+nombre] ? `<span class="kic" aria-hidden="true" style="width:${tamCss(tam)};height:${tamCss(tam)};--k:url(/kenney/kic_${nombre}.webp)"></span>` : '';
})();
