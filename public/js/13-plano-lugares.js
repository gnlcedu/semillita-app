/* Semillita · Estilo plano, grupo A: Mi colmado, Pizzería, Laboratorio y Mezcla colores
   =========================================================
   - Piezas planas (mismas reglas que 12-estilo-plano.js, docs/GUIA-ILUSTRACIONES.md).
   - Animaciones que cuentan lo que pasa: volar(), entrar()/salir(), ondas(), gotitas(),
     burbujitas(), temblar(), hornear(), vapor(), migas(), remolino().
     Solo transform y opacity; con prefers-reduced-motion no se mueven (RM).
   - sparks() pasa a estrellitas planas (antes eran emojis).
   - Escena plana del colmado.
   Se carga después de 12-estilo-plano.js.
   ========================================================= */
(function(){
const {K,f,o,sk,P,Pn,C,E,R,F,D,L,Lo,svg,bola,hoja,estrella,anillo,gotaG}=window.PLANO_KIT;
const PL=window.PLANO;
const HORNO='#EE9E86';

Object.assign(PL,{
/* ================= COLMADO ================= */
pan:()=>svg(`${P('M12 66 Q12 36 50 34 Q88 36 88 66 Q88 78 76 78 H24 Q12 78 12 66Z','#EBC08A')}${L('M32 44 L38 56 M48 41 L54 54 M64 43 L69 54',shade('#EBC08A',.4),3)}`),
huevo:()=>svg(`${E(50,54,24,30,'#FFF8EC')}${F('M58 32 Q72 44 70 62 Q64 48 58 32Z','#F1E6D2')}`),
leche:()=>svg(`${R(44,10,12,9,2,K.cielo)}${P('M28 34 L50 18 L72 34 V88 H28Z',K.blanco)}${P('M28 34 H72 V46 H28Z',K.cielo)}${R(36,56,28,22,4,K.cielo)}${F('M50 60 Q56 68 56 71 Q56 75 50 75 Q44 75 44 71 Q44 68 50 60Z',K.blanco)}`),
queso:()=>svg(`${P('M12 76 H88 V52 L12 64Z',K.amarillo)}${P('M12 64 L88 52 L66 30Z',K.mant)}${D(30,68,4,shade(K.amarillo,-.12))}${D(56,66,5.5,shade(K.amarillo,-.12))}${D(76,61,3,shade(K.amarillo,-.12))}${D(50,47,3,shade(K.mant,-.12))}`),
chocolate:()=>svg(`${R(24,12,52,76,6,'#B98466')}${L('M24 30 H76 M24 48 H76 M50 12 V48',shade('#B98466',-.18),1.8)}${P('M22 54 L31 60 L40 54 L50 60 L60 54 L69 60 L78 54 V84 Q78 90 72 90 H28 Q22 90 22 84Z',K.rosa)}${L('M36 74 H64',K.blanco,3.5)}`),
aguacate:()=>svg(`${P('M50 10 Q72 12 72 40 Q88 60 76 80 Q64 94 50 92 Q36 94 24 80 Q12 60 28 40 Q28 12 50 10Z','#8CC97A')}${F('M50 20 Q64 22 64 44 Q78 62 68 76 Q60 86 50 84 Q40 86 32 76 Q22 62 36 44 Q36 22 50 20Z','#E6EFA6')}${C(50,62,13,'#C08A62')}`),
dulce:()=>svg(`${P('M32 50 L12 36 L16 50 L12 64Z',K.mant)}${P('M68 50 L88 36 L84 50 L88 64Z',K.mant)}${C(50,50,20,K.ros)}${L('M50 50 m-10 0 a10 10 0 1 1 10 10 a6 6 0 1 1 -6 -6',K.blanco,3.2)}`),
arroz:()=>svg(`${P('M24 26 Q30 18 50 20 Q70 18 76 26 L82 84 Q82 92 74 92 H26 Q18 92 18 84Z',K.crema)}${L('M30 28 Q50 34 70 28',o(K.crema),1.8)}${R(30,48,40,26,4,K.cielo)}${[[40,58],[48,64],[56,57],[61,66],[43,68]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="2.6" ry="1.4" fill="${K.blanco}" transform="rotate(30 ${x} ${y})"/>`).join('')}`),
limon:()=>svg(`${P('M12 54 Q20 30 50 30 Q80 30 88 54 Q80 78 50 78 Q20 78 12 54Z','#C9E27E')}${hoja(62,30,-40,18,K.verde)}${L('M26 52 Q32 44 42 41',shade('#C9E27E',.45),2.4)}`),
refresco:()=>svg(`${R(41,4,18,8,2,shade(K.coral,-.1))}${P('M42 12 H58 V22 Q70 30 70 44 V86 Q70 92 64 92 H36 Q30 92 30 86 V44 Q30 30 42 22Z',K.coral)}${R(30,50,40,20,0,K.blanco)}${L('M38 60 Q50 54 62 60',K.coral,3)}`),
funda:()=>svg(`${L('M34 34 Q34 14 42 14 Q50 14 50 34 M50 34 Q50 14 58 14 Q66 14 66 34',K.azul,3.5)}${P('M18 34 H82 L86 86 Q86 92 80 92 H20 Q14 92 14 86Z','#EAF4FC')}${L('M30 46 Q32 66 28 84 M70 46 Q68 66 72 84',shade('#EAF4FC',-.12),2)}`),
caja:()=>svg(`${R(22,12,44,22,4,K.crema)}${L('M30 23 H56',K.verde,3)}${R(40,34,8,10,0,shade(K.lav,-.1))}${P('M12 44 H88 L92 78 H8Z',K.lav)}${[20,34,48,62].map(x=>[51,63].map(y=>R(x,y,10,7,2,K.blanco)).join('')).join('')}${R(77,50,7,20,3,K.coral)}`),
cajon:()=>svg(`${R(10,74,80,16,4,shade(K.lav,-.12))}${R(42,79,16,6,3,K.amarillo)}`),

/* ================= PIZZERÍA ================= */
queso_lonja:()=>svg(`<g transform="rotate(12 50 50)">${R(20,20,60,60,8,K.mant)}${D(36,38,6,shade(K.mant,-.1))}${D(62,54,8,shade(K.mant,-.1))}${D(40,66,4,shade(K.mant,-.1))}</g>`),
hongo:()=>svg(`${P('M36 54 H64 L60 88 Q50 92 40 88Z',K.crema)}${P('M12 58 Q14 20 50 18 Q86 20 88 58Z','#E2B796')}${D(36,40,5,K.crema)}${D(60,32,4,K.crema)}${D(70,48,3.5,K.crema)}`),
aji:()=>svg(`${L('M50 28 Q50 16 57 12',K.verde,4)}${P('M30 34 Q50 24 70 34 Q82 44 78 66 Q74 88 60 90 Q54 92 50 86 Q46 92 40 90 Q26 88 22 66 Q18 44 30 34Z',K.hoja)}${L('M50 34 Q48 60 50 84',shade(K.hoja,-.12),1.6)}`),
aji_aro:()=>svg(`${anillo(50,52,32,22,K.hoja)}${D(42,46,3,K.crema)}${D(56,58,3,K.crema)}`),
pina:()=>svg(`${hoja(50,32,-120,22,K.verde)}${hoja(50,32,-90,26)}${hoja(50,32,-60,22,K.verde)}${E(50,62,24,30,K.amarillo)}${[[40,48],[60,48],[50,40],[50,58],[38,68],[62,68],[50,78]].map(([x,y])=>`<path d="M${x} ${y-4} L${x+4} ${y} L${x} ${y+4} L${x-4} ${y}Z" fill="${shade(K.amarillo,-.14)}"/>`).join('')}`),
pina_trozo:()=>svg(`${anillo(50,50,39,10,'#E3B04A')}${anillo(50,50,33.5,10,K.amarillo)}<circle cx="50" cy="50" r="15" fill="none" stroke="${shade(K.amarillo,.38)}" stroke-width="4"/>${[0,1,2,3,4,5,6,7,8,9].map(i=>`<g transform="rotate(${i*36} 50 50)">${L('M50 20.5 L50 31',shade(K.amarillo,-.2),2)}</g><g transform="rotate(${i*36+18} 50 50)">${D(50,14.2,1.5,shade('#E3B04A',-.22))}</g>`).join('')}`),
granos:()=>svg([[34,52],[58,40],[60,66]].map(([x,y])=>`<g transform="translate(${x} ${y})">${P('M0 -14 Q12 -12 12 0 Q10 12 0 14 Q-10 12 -12 0 Q-12 -12 0 -14Z',K.amarillo)}</g>`).join('')),
aceituna:()=>svg(anillo(50,50,28,11,'#8E8AA6')),
tomate_rodaja:()=>svg(`${C(50,50,34,K.coral)}${D(50,50,27,'#F7B3A8')}${[0,72,144,216,288].map(a=>`<g transform="rotate(${a} 50 50)"><ellipse cx="50" cy="35" rx="3" ry="5" fill="${K.crema}"/></g>`).join('')}${D(50,50,6,K.coral)}`),
salsa:()=>svg(`${R(22,22,56,64,6,K.coral)}${E(50,22,28,7,shade(K.coral,.3))}${R(22,42,56,26,0,K.blanco)}${C(50,55,8,K.coral)}${hoja(50,47,-60,8)}`),
llama:()=>svg(`${P('M50 8 Q72 34 70 58 Q70 86 50 90 Q30 86 30 60 Q30 44 40 34 Q42 48 48 50 Q42 30 50 8Z',K.naranja)}${P('M50 44 Q62 58 60 72 Q58 84 50 84 Q42 84 40 72 Q40 62 46 56 Q48 64 52 64 Q48 54 50 44Z',K.amarillo)}`),
diana:()=>svg(`${C(50,50,38,K.coral)}${C(50,50,26,K.blanco)}${C(50,50,13,K.coral)}`),
horno:()=>svg(`${R(6,8,88,86,10,HORNO)}${R(12,14,76,12,4,shade(HORNO,-.1))}${[24,40,56].map(x=>C(x,20,3.2,K.crema)).join('')}${R(66,17,16,6,3,K.crema)}${R(16,34,68,50,8,'#6E6880')}${R(21,39,58,40,6,'#F8C877')}<g class="fuego">${P('M30 79 Q30 64 36 58 Q38 66 42 66 Q40 56 46 50 Q52 62 54 70 Q58 64 58 58 Q66 66 66 79Z',K.naranja)}${P('M38 79 Q40 70 44 68 Q46 74 50 72 Q52 76 56 79Z',K.amarillo)}</g>${R(30,30,40,5,2.5,K.gris)}`),
porcion:()=>PL.ti_pizza(),

/* ================= LABORATORIO ================= */
madera:()=>svg(`<g transform="rotate(-12 50 50)">${R(14,36,66,28,10,K.cafe)}${L('M26 44 H60 M30 56 H66',shade(K.cafe,-.15),1.8)}${E(80,50,10,14,K.madera)}${E(80,50,5,7,shade(K.madera,-.1))}</g>`),
piedra:()=>svg(`${P('M14 70 Q10 46 30 36 Q44 22 62 30 Q84 34 88 56 Q92 76 72 82 H28 Q14 80 14 70Z',K.gris)}${F('M60 40 Q74 44 76 58 Q66 50 60 40Z',shade(K.gris,.45))}${D(38,62,3,shade(K.gris,-.14))}${D(58,70,2.4,shade(K.gris,-.14))}`),
manzana:()=>svg(`${L('M50 34 Q50 22 56 16',K.cafe,3.5)}${hoja(54,22,-30,18)}${P('M50 34 Q60 26 72 30 Q88 36 86 58 Q84 84 64 88 Q56 90 50 86 Q44 90 36 88 Q16 84 14 58 Q12 36 28 30 Q40 26 50 34Z',K.coral)}${F('M66 40 Q80 48 78 64 Q72 52 66 40Z',shade(K.coral,-.08))}`),
llave:()=>svg(`${anillo(28,50,17,7,K.amarillo)}${P('M44 45 H88 V55 H82 V64 H74 V55 H68 V62 H60 V55 H44Z',K.amarillo)}`),
patito:()=>svg(`${P('M14 52 L22 60 L16 66Z',K.amarillo)}${E(48,66,32,20,K.amarillo)}${P('M26 62 Q42 52 56 64 Q42 76 26 62Z',shade(K.amarillo,-.08))}${C(68,40,16,K.amarillo)}${P('M82 38 Q96 38 96 44 Q90 50 82 48Z',K.naranja)}${D(72,36,2.6,K.tinta)}`),
ancla:()=>svg(`${anillo(50,16,8,4,K.grisO)}${R(46,22,8,60,3,K.grisO)}${R(32,30,36,8,4,K.grisO)}${Lo('M20 62 Q22 86 50 86 Q78 86 80 62',K.grisO,7)}${P('M12 66 L20 52 L28 66Z',K.grisO)}${P('M72 66 L80 52 L88 66Z',K.grisO)}`),
esponja:()=>svg(`${R(14,30,72,42,10,K.mant)}${R(14,62,72,14,6,K.verde)}${[[30,42,4],[48,40,3],[66,46,5],[38,54,3],[72,36,2.5],[56,54,3]].map(([x,y,r])=>D(x,y,r,shade(K.mant,-.15))).join('')}`),
tornillo:()=>svg(`${R(30,14,40,14,4,K.gris)}${R(42,28,16,56,3,K.gris)}${L('M42 38 L58 34 M42 48 L58 44 M42 58 L58 54 M42 68 L58 64 M42 78 L58 74',shade(K.gris,-.25),1.8)}`),
pelota:()=>svg(`${C(50,50,34,K.blanco)}${L('M24 30 Q48 42 50 84 M52 16 Q40 46 80 70 M84 42 Q56 48 28 78',K.cielo,3.2)}`),
cuchara:()=>svg(`<g transform="rotate(-35 50 50)">${E(50,26,14,18,K.gris)}${R(46,42,8,50,4,K.gris)}</g>`),
clip:()=>svg(Lo('M40 82 V30 Q40 16 52 16 Q64 16 64 30 V72 Q64 84 56 84 Q48 84 48 74 V36',K.grisO,4)),
imperdible:()=>svg(`${Lo('M28 70 L72 28 Q82 20 86 30 Q88 38 78 42 L36 80',K.gris,3.5)}${C(24,76,9,K.amarillo)}`),
destornillador:()=>svg(`<g transform="rotate(40 50 50)">${R(46,48,8,36,2,K.gris)}${P('M46 84 H54 L52 92 H48Z',K.gris)}${R(40,8,20,42,8,K.coral)}${L('M46 16 V42 M54 16 V42',shade(K.coral,-.15),1.8)}</g>`),
peluche:()=>svg(`${C(30,26,10,K.cafe)}${C(70,26,10,K.cafe)}${D(30,26,5,K.madera)}${D(70,26,5,K.madera)}${E(50,78,22,17,K.cafe)}${E(50,80,11,9,K.madera)}${C(50,42,22,K.cafe)}${E(50,50,9,7,K.madera)}${D(50,47,2.6,K.tinta)}${D(42,38,2.4,K.tinta)}${D(58,38,2.4,K.tinta)}`),
lapiz:()=>svg(`<g transform="rotate(-35 50 50)">${R(42,14,16,58,2,K.amarillo)}${P('M42 72 L50 90 L58 72Z',K.madera)}${D(50,86,2.5,K.tinta)}${R(42,8,16,10,3,K.ros)}</g>`),
media:()=>svg(`${P('M34 14 H62 V54 L76 68 Q86 80 76 88 Q66 94 56 86 L38 70 Q32 64 34 58Z',K.ros)}${L('M34 26 H62 M34 36 H62',K.blanco,4)}${R(32,8,32,10,3,shade(K.ros,-.1))}`),
globo:()=>svg(`${L('M50 72 Q44 84 52 96',K.grisO,1.8)}${E(50,40,24,30,K.coral)}${P('M46 70 L54 70 L50 76Z',K.coral)}`),
/* polos hacia abajo: los objetos se pegan en las puntas */
iman:()=>svg(`${Lo('M30 70 V44 Q30 20 50 20 Q70 20 70 44 V70',K.coral,16)}${R(19,70,22,16,3,K.gris)}${R(59,70,22,16,3,K.gris)}`),
botella:()=>svg(`${R(42,8,16,12,3,K.blanco)}${P('M38 20 H62 V30 Q74 36 74 50 V86 Q74 92 68 92 H32 Q26 92 26 86 V50 Q26 36 38 30Z','#EAF4FC')}${R(28,52,44,24,4,K.mant)}`),
gotero:()=>svg(`${R(40,6,20,24,8,K.grisO)}${P('M44 30 H56 L54 66 Q50 74 46 66Z',K.blanco)}${gotaG(50,84,.45,K.coral)}`),
tina:()=>svg(`${L('M22 40 V20 Q22 12 30 12 Q36 12 36 18',K.grisO,3)}${P('M12 50 H88 Q86 80 64 82 H36 Q14 80 12 50Z',K.blanco)}${F('M15 54 H85 Q83 66 77 72 H23 Q17 66 15 54Z',K.cielo)}${R(8,42,84,9,4,K.blanco)}${L('M28 82 L24 92 M72 82 L76 92',K.grisO,3)}`),
flotador:()=>svg(`${anillo(50,50,36,18,K.coral)}${[45,135,225,315].map(a=>`<g transform="rotate(${a} 50 50)">${F('M44 14.5 H56 V32.5 H44Z',K.blanco)}</g>`).join('')}<circle cx="50" cy="50" r="36" fill="none" ${sk(K.coral)}/><circle cx="50" cy="50" r="18" fill="none" ${sk(K.coral)}/>`),
volcan:()=>svg(`${P('M8 90 L36 36 H64 L92 90Z',K.tierra)}${E(50,36,14,4,shade(K.tierra,-.22))}${P('M40 36 Q40 50 44 54 Q48 46 50 52 Q54 44 58 50 Q62 42 60 36Z',K.coral)}${P('M38 34 Q34 24 42 22 Q44 12 54 15 Q64 14 62 24 Q70 28 62 34Z',K.blanco)}`),
chispa:()=>svg(estrella(50,50,44,18,K.amarillo)),
/* ropa del animalito en escena */
delantal:()=>svg(`${L('M30 8 Q50 22 70 8',shade(K.rosa,-.1),3.5)}${L('M16 44 Q30 40 28 30 M84 44 Q70 40 72 30',shade(K.rosa,-.1),3)}${P('M28 20 H72 L78 94 Q50 98 22 94Z',K.rosa)}${P('M36 56 H64 V72 Q64 76 60 76 H40 Q36 76 36 72Z',shade(K.rosa,.35))}`),
bata:()=>svg(`${P('M18 22 Q50 30 82 22 L90 96 Q50 100 10 96Z',K.blanco)}${Pn('M38 26 L50 52 L62 26',K.cielo)}${L('M50 52 V94',K.gris,1.6)}${D(56,62,2.6,K.lav)}${D(56,76,2.6,K.lav)}${R(22,64,16,12,3,K.crema)}${L('M26 64 V58 M30 64 V56',K.azul,2.5)}`),
/* recompensas: estrellas y flechas de volver a empezar */
estrella_oro:()=>svg(estrella(50,52,44,20,K.amarillo)),
estrella_plata:()=>svg(estrella(50,52,44,20,K.gris)),
flechas:()=>svg(`${Lo('M74 34 A28 28 0 0 0 26 44',K.azul,7)}${P('M64 22 L84 34 L66 46Z',K.azul)}${Lo('M26 66 A28 28 0 0 0 74 56',K.verde,7)}${P('M36 78 L16 66 L34 54Z',K.verde)}`)
});

/* clientes del colmado: los mismos animalitos de la app, con ropa distinta */
window.CLIENTES={'🐶':['koala',{hat:'gorra'}],'🐱':['zorro',{neck:'bufanda'}],'🐰':['mariposa',{}],'🐥':['abeja',{hat:'fiesta'}],'🐮':['panda',{hat:'copa'}],'🐷':['pulpo',{hat:'flor'}],
  '🦁':['leon',{eyes:'sol'}],'🐵':['buho',{neck:'corbatin'}],'🐯':['tortuga',{hat:'gorra'}],'🦒':['rana',{neck:'collar'}],'🐘':['delfin',{eyes:'gafas'}],'🦜':['cotorra',{hat:'chef'}]};

Object.assign(window.ILU_EMO,{'🪵':'madera','🪨':'piedra','🍎':'manzana','🔑':'llave','⚓':'ancla','🧽':'esponja','🔩':'tornillo','🏐':'pelota','🥄':'cuchara',
  '📎':'clip','🧷':'imperdible','🪛':'destornillador','🧸':'peluche','✏️':'lapiz','🧦':'media','🎈':'globo','🧲':'iman','🧴':'botella','🛁':'tina','🛟':'flotador',
  '🌋':'volcan','🎯':'diana','🔥':'llama','🥫':'salsa','🍄':'hongo','🫑':'aji','🍍':'pina','🛍️':'funda','🛍':'funda','🦆':'patito','✨':'chispa','⭐':'estrella_oro','🌟':'estrella_oro','😋':'porcion','🔄':'flechas'});
Object.assign(window.PLANO_MONO,{
  borrar:'<path d="M5 7h14M10 4h4M7 7l1 13h8l1-13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
  reiniciar:'<path d="M19 12a7 7 0 1 1-2-4.9M19 4v4h-4" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
  check:'<path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>'
});

/* =========================================================
   ANIMACIONES QUE CUENTAN LO QUE PASA
   ========================================================= */
const quieto=()=> (typeof RM!=='undefined'&&RM) || !Element.prototype.animate;
const pos=(el,cont)=>{ const a=el.getBoundingClientRect(), b=cont.getBoundingClientRect(); return {x:a.left-b.left+a.width/2, y:a.top-b.top+a.height/2, w:a.width, h:a.height}; };
const pieza=(cont,cls,css,html='')=>{ const e=document.createElement('span'); e.className=cls; e.style.cssText=css; e.innerHTML=html; cont.appendChild(e); return e; };
window.animPos=pos;

/* un objeto vuela en arco de un sitio a otro (producto a la funda, moneda al mostrador) */
window.volar=(desde,hasta,html,{ms=520,arco=-70,fin=.85}={})=>{ if(quieto()||!desde||!hasta) return;
  const a=desde.getBoundingClientRect(), b=hasta.getBoundingClientRect(); const el=document.createElement('div'); el.className='volando'; el.innerHTML=html;
  const x0=a.left+a.width/2, y0=a.top+a.height/2; el.style.left=x0+'px'; el.style.top=y0+'px'; document.body.appendChild(el);
  const dx=b.left+b.width/2-x0, dy=b.top+b.height/2-y0, T=(x,y,s)=>`translate(-50%,-50%) translate(${f(x)}px,${f(y)}px) scale(${s})`;
  el.animate([{transform:T(0,0,1)},{transform:T(dx*.5,dy*.5+arco,1.12),offset:.45},{transform:T(dx,dy,fin),opacity:.9}],{duration:ms,easing:'cubic-bezier(.4,0,.3,1)'}).onfinish=()=>el.remove(); };

/* un cliente entra caminando (pasitos) y luego se va */
window.entrar=(el,{desde=-180,ms=900}={})=>{ if(quieto()||!el) return;
  el.animate([{transform:`translateX(${desde}px)`},{transform:'translateX(0)'}],{duration:ms,easing:'cubic-bezier(.25,.8,.4,1)'});
  el.animate([{transform:'translateY(0) rotate(0)'},{transform:'translateY(-7px) rotate(-5deg)'},{transform:'translateY(0) rotate(0)'},{transform:'translateY(-7px) rotate(5deg)'},{transform:'translateY(0) rotate(0)'}],{duration:ms/2,iterations:2,composite:'add'}); };
window.salir=(el,{hasta=280,ms=900}={})=>{ if(!el) return; if(quieto()){ el.style.opacity=0; return; }
  el.animate([{transform:'translateX(0)',opacity:1},{transform:`translateX(${hasta}px)`,opacity:0}],{duration:ms,easing:'ease-in',fill:'forwards'});
  el.animate([{transform:'translateY(0) rotate(0)'},{transform:'translateY(-7px) rotate(5deg)'},{transform:'translateY(0) rotate(0)'},{transform:'translateY(-7px) rotate(-5deg)'},{transform:'translateY(0) rotate(0)'}],{duration:ms/2,iterations:2,composite:'add'}); };

/* sacudida corta (volcán antes de la erupción, caja registradora) */
window.temblar=(el,{ms=420,px=4}={})=>{ if(quieto()||!el) return;
  el.animate([0,-px,px,-px*.7,px*.7,0].map(x=>({transform:`translateX(${x}px)`})),{duration:ms,composite:'add'}); };

/* anillos en el agua donde cae algo (x, y en px dentro de cont) */
window.ondas=(cont,x,y,{n=2,ancho=70,c='#FFFFFF'}={})=>{ if(quieto()) return;
  for(let i=0;i<n;i++){ const e=pieza(cont,'onda',`left:${x}px;top:${y}px;width:${ancho}px;height:${ancho*.32}px;border-color:${c}`);
    e.animate([{transform:'translate(-50%,-50%) scale(.2)',opacity:1},{transform:'translate(-50%,-50%) scale(1)',opacity:0}],{duration:700,delay:i*160,easing:'ease-out',fill:'backwards'}).onfinish=()=>e.remove(); } };

/* gotitas que saltan y caen (salpicadura) */
window.gotitas=(cont,x,y,{n=5,c='#A9D3F0',alto=40}={})=>{ if(quieto()) return;
  for(let i=0;i<n;i++){ const e=pieza(cont,'gotita',`left:${x}px;top:${y}px;background:${c}`); const dx=(i-(n-1)/2)*14+rnd(-4,4), h=alto*(.6+Math.random()*.6);
    e.animate([{transform:'translate(-50%,-50%) translate(0,0) scale(.6)',opacity:1},{transform:`translate(-50%,-50%) translate(${dx*.6}px,${-h}px) scale(1)`,offset:.45},{transform:`translate(-50%,-50%) translate(${dx}px,${h*.3}px) scale(.7)`,opacity:0}],{duration:620,easing:'ease-out'}).onfinish=()=>e.remove(); } };

/* burbujitas que suben (algo que se hunde, la reacción del volcán) */
window.burbujitas=(cont,x,y,{n=3,sube=70,c='#FFFFFF',borde='#8DBDE6',tam=[6,12]}={})=>{ if(quieto()) return;
  for(let i=0;i<n;i++){ const s=rnd(tam[0],tam[1]); const e=pieza(cont,'burbujita',`left:${x+rnd(-12,12)}px;top:${y}px;width:${s}px;height:${s}px;background:${c};border-color:${borde}`);
    e.animate([{transform:'translate(-50%,-50%) translate(0,0)',opacity:0},{opacity:1,offset:.15},{transform:`translate(-50%,-50%) translate(${rnd(-10,10)}px,${-sube}px)`,opacity:0}],{duration:900+i*120,delay:i*170,easing:'ease-out',fill:'backwards'}).onfinish=()=>e.remove(); } };

/* la pizza entra al horno: el horno sube, las llamas bailan, baja y sale el vapor */
window.hornear=(root,pz,ms=1600)=>{ const p=pos(pz,root), s=p.w*1.45;
  const h=pieza(root,'horno-ov',`left:${p.x}px;top:${p.y}px;width:${s}px;height:${s}px`,ilu('horno','100%'));
  const out=()=>{ if(quieto()){ h.remove(); return; } h.animate([{transform:'translate(-50%,-50%)',opacity:1},{transform:'translate(-50%,-50%) translateY(40%)',opacity:0}],{duration:260,easing:'ease-in',fill:'forwards'}).onfinish=()=>h.remove(); };
  if (!quieto()) h.animate([{transform:'translate(-50%,-50%) translateY(60%)',opacity:0},{transform:'translate(-50%,-50%)',opacity:1}],{duration:320,easing:'cubic-bezier(.3,1.3,.5,1)'});
  setTimeout(out,ms-240); setTimeout(()=>vapor(pz),ms+60); };
window.vapor=(cont,{n=3}={})=>{ if(quieto()) return; const w=cont.clientWidth;
  for(let i=0;i<n;i++){ const e=pieza(cont,'vapor',`left:${w*(.32+i*.18)}px;top:${w*.3}px`,`<svg viewBox="0 0 20 60"><path d="M10 58 Q2 44 10 30 Q18 16 10 2" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"/></svg>`);
    e.animate([{transform:'translateY(10px) scaleY(.6)',opacity:0},{opacity:.95,offset:.3},{transform:'translateY(-46px) scaleY(1)',opacity:0}],{duration:1500,delay:i*260,iterations:2,easing:'ease-out',fill:'backwards'}).onfinish=()=>e.remove(); } };

/* migas al comer una porción (k = 0..7, pizza de lado w) */
window.migas=(pz,k)=>{ if(quieto()) return; const w=pz.clientWidth, a=(k+.5)/8*Math.PI*2-Math.PI/2, x=w/2+Math.cos(a)*w*.3, y=w/2+Math.sin(a)*w*.3;
  for(let i=0;i<5;i++){ const e=pieza(pz,'miga',`left:${x}px;top:${y}px`); const dx=rnd(-26,26);
    e.animate([{transform:'translate(-50%,-50%)',opacity:1},{transform:`translate(-50%,-50%) translate(${dx*.5}px,-16px)`,offset:.35},{transform:`translate(-50%,-50%) translate(${dx}px,30px)`,opacity:0}],{duration:600,delay:i*40,easing:'ease-out',fill:'backwards'}).onfinish=()=>e.remove(); } };

/* remolino en el tazón cuando cae una gota de pintura */
window.remolino=(cont)=>{ if(quieto()) return; const e=pieza(cont,'remolino','',`<svg viewBox="0 0 100 100"><path d="M50 50 m-4 0 a4 4 0 1 1 4 4 a10 10 0 1 1 -10 -10 a18 18 0 1 1 18 18 a26 26 0 1 1 -26 -26" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"/></svg>`);
  e.animate([{transform:'translate(-50%,-50%) rotate(0) scale(.5)',opacity:0},{opacity:.7,offset:.2},{transform:'translate(-50%,-50%) rotate(300deg) scale(1)',opacity:0}],{duration:900,easing:'ease-out'}).onfinish=()=>e.remove(); };

/* chispas planas (antes eran emojis ✨⭐💛🌟) */
window.sparks=function(el,n=9){ if((typeof RM!=='undefined'&&RM)||!el) return; const r=el.getBoundingClientRect(); const cols=[K.amarillo,K.rosa,K.cielo,K.menta,K.lav];
  for (let i=0;i<n;i++){ const s=document.createElement('span'); s.className='spark'; s.innerHTML= i%2 ? `<i class="spark-dot" style="background:${cols[i%cols.length]}"></i>` : ilu('chispa','1em');
    const a=Math.random()*Math.PI*2, d=50+Math.random()*50; s.style.left=(r.left+r.width/2)+'px'; s.style.top=(r.top+r.height/2)+'px';
    s.style.setProperty('--dx',Math.cos(a)*d+'px'); s.style.setProperty('--dy',Math.sin(a)*d+'px'); document.body.appendChild(s); setTimeout(()=>s.remove(),1000); } };

/* =========================================================
   ESCENA PLANA DEL COLMADO: estantes con productos y un racimo de guineos
   ========================================================= */
const capa=(d,html,css='')=>`<div class="sl" data-d="${d}" style="${css}">${html}</div>`;
const COLS=[K.coral,K.cielo,K.mant,K.menta,K.lav,K.durazno,K.ros,K.hoja];
const cosa=(x,base,t,c)=>{ switch(t){
  case 0: return P(`M${x+3} ${base} V${base-17} Q${x+3} ${base-21} ${x+6} ${base-23} V${base-29} H${x+10} V${base-23} Q${x+13} ${base-21} ${x+13} ${base-17} V${base}Z`,c)+R(x+3,base-13,10,6,0,K.blanco);
  case 1: return R(x,base-15,13,15,2,c)+L(`M${x} ${base-8} H${x+13}`,K.blanco,2);
  case 2: return R(x+1,base-24,15,5,2,K.grisO)+R(x,base-20,17,20,4,c);
  case 3: return R(x,base-26,18,26,2,c)+R(x+4,base-20,10,8,1,K.blanco);
  default: return P(`M${x} ${base} L${x+2} ${base-18} Q${x+10} ${base-24} ${x+18} ${base-18} L${x+20} ${base}Z`,K.crema)+L(`M${x+4} ${base-16} Q${x+10} ${base-13} ${x+16} ${base-16}`,o(K.crema),1.4); } };
const estantes=()=>{ let s=''; [46,96].forEach((b,j)=>{ for(let x=6,i=0;x<392;i++){ const t=(i*3+j*2)%5, w=t===3?18:t===4?20:t===2?17:t===1?13:16; s+=cosa(x,b,t,COLS[(i+j*3)%COLS.length]); x+=w+6; } s+=R(-4,b,408,6,2,K.madera); });
  return s; };
const racimo=x=>`${L(`M${x} 0 V12`,K.cafe,2)}${[-18,-6,6,18].map(r=>`<g transform="rotate(${r} ${x} 14)">${P(`M${x-3} 14 Q${x-9} 30 ${x-2} 42 Q${x+2} 44 ${x+3} 40 Q${x-3} 30 ${x+3} 15Z`,K.amarillo)}</g>`).join('')}${R(x-4,10,8,6,2,K.cafe)}`;
window.SCENES.colmado=()=>capa(.2,`<svg class="sp" viewBox="0 0 400 100" preserveAspectRatio="xMidYMin slice" aria-hidden="true" style="left:0;width:100%;top:34px;height:112px;opacity:.92">${estantes()}</svg><svg class="sp" viewBox="0 0 40 50" aria-hidden="true" style="left:44%;top:30px;width:34px;height:44px">${racimo(20)}</svg>`);
})();
