/* Semillita · Recompensas (fase B): stickers de la República Dominicana, medallas por logros y paisajes del inicio
   =========================================================
   - 24 stickers nuevos dibujados en estilo plano: «Comida dominicana» y «Mi país». Sus ids empiezan por
     'st_' (no son emojis): se muestran con stkArt(s) (04), que usa la pieza rd_… de PLANO.
   - Medallas (MEDALLAS): se calculan con los datos que ya existen (retos ganados, caminos, lecturas, cálculo,
     stickers, nivel, personaje). Las ganadas se guardan en p.medallas (campo opcional) para avisar solo una vez.
     revisarMedallas() se llama al ganar, al terminar, al subir puntos, al recibir stickers y en el inicio.
   - Paisajes del inicio (PAISAJES): campo (siempre), playa (nivel 3), montaña (nivel 6) y selva (nivel 9).
     Se eligen en «Mi personaje» → Lugar y se guardan en p.paisaje (campo opcional).
   Se carga después de 21-animales.js.
   ========================================================= */
(function(){
const {K,P,C,E,R,F,D,L,svg,petalos,estrella}=PLANO_KIT, PL=window.PLANO;

/* ---------- 24 stickers dibujados ---------- */
const N=(d,c)=>P(d,c);
Object.assign(PL,{
/* comida dominicana */
rd_mangu:()=>svg(`${E(50,72,44,14,'#FFFFFF')}${E(50,70,34,9,'#F4F1EC')}${P('M20 68 Q22 38 50 36 Q78 38 80 68Z','#E6E2A4')}${L('M30 52 Q38 44 46 52 M48 46 Q56 38 64 46 M56 58 Q64 50 72 58',' #C97FB3'.trim(),3.4)}${L('M40 60 Q46 56 52 60',shade('#C97FB3',.3),2.4)}`),
rd_bandera:()=>svg(`${E(50,68,46,16,'#FFFFFF')}${P('M10 66 Q12 40 36 38 Q56 40 58 64Z','#FFFBF0')}${[[24,52],[34,46],[44,54],[30,60],[40,62],[22,62]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="2.6" ry="1.4" fill="#E9E2D0"/>`).join('')}${E(72,58,20,11,'#C9776C')}${[[64,56],[72,54],[80,57],[70,61],[78,61]].map(([x,y])=>E(x,y,3.4,2.4,'#9E5A52')).join('')}${P('M40 70 Q44 60 58 62 Q66 66 60 74 Q50 78 40 70Z','#B9805A')}`),
rd_sancocho:()=>svg(`${L('M40 26 Q34 18 40 10 M52 26 Q46 18 52 10 M64 26 Q58 18 64 10','#D9DDE6',3)}${R(16,42,68,42,10,K.gris)}${R(8,46,10,8,3,K.grisO)}${R(82,46,10,8,3,K.grisO)}${E(50,42,34,8,'#E8B865')}${D(36,41,4,'#FFF6E6')}${D(50,43,4,K.naranja)}${D(62,40,4,K.amarillo)}${D(44,38,3,'#9CCB7A')}${L('M24 60 H76',shade(K.gris,-.12),2)}`),
rd_tostones:()=>svg(`${[[32,40,0],[66,46,20],[44,70,-12]].map(([x,y,a])=>`<g transform="rotate(${a} ${x} ${y})">${E(x,y,20,16,'#F2C46B')}${E(x,y,13,10,'#F6D88E')}${L(`M${x-8} ${y-3} Q${x} ${y-7} ${x+8} ${y-3} M${x-7} ${y+4} Q${x} ${y} ${x+7} ${y+4}`,shade('#F2C46B',-.2),1.6)}</g>`).join('')}`),
rd_habichuelas:()=>svg(`${P('M14 46 H86 Q84 84 50 86 Q16 84 14 46Z',K.azul)}${E(50,46,36,10,'#B98260')}${[[36,44],[50,48],[62,43],[44,40]].map(([x,y])=>R(x-5,y-3,10,6,2,'#F2D29B')).join('')}${D(56,40,2.4,'#6B4A35')}${D(40,48,2.4,'#6B4A35')}${L('M22 64 Q50 72 78 64',shade(K.azul,.4),2.4)}`),
rd_yaniqueque:()=>svg(`<g transform="rotate(-10 50 50)">${P('M14 52 Q12 26 50 24 Q88 26 86 52 Q86 76 50 78 Q14 76 14 52Z','#EDC27A')}${[[34,40,5],[58,36,4],[70,56,6],[40,62,4],[52,50,3]].map(([x,y,r])=>C(x,y,r,'#F4D59A')).join('')}</g>`),
rd_casabe:()=>svg(`${P('M50 14 A36 36 0 1 1 22 74 L50 50Z','#EFE2C4')}${P('M24 78 L52 54 L60 86 Q40 90 24 78Z','#EFE2C4')}${[[40,30],[62,28],[70,46],[56,40],[44,56],[66,62],[30,46]].map(([x,y])=>D(x,y,1.8,'#D3BE93')).join('')}${D(42,74,1.8,'#D3BE93')}`),
rd_empanada:()=>svg(`${P('M10 62 Q14 22 50 20 Q86 22 90 62Z','#EDB86C')}${L('M10 62 H90',shade('#EDB86C',-.25),2)}${[18,28,38,48,58,68,78].map(x=>L(`M${x} 62 l4 6`,shade('#EDB86C',-.25),2.4)).join('')}${L('M30 42 Q50 34 70 42',shade('#EDB86C',.35),2.4)}`),
rd_morir:()=>svg(`${L('M60 8 L54 40',K.rosa,4)}${P('M28 30 H72 L66 90 H34Z','#FFF8EE')}${F('M30 44 H70 L68 62 H32Z','#F6C48A')}<path d="M28 30 H72 L66 90 H34Z" fill="none" stroke="#C3C8D6" stroke-width="1.6" vector-effect="non-scaling-stroke"/>${C(72,32,11,K.naranja)}${C(72,32,7,'#F9C99A')}${L('M72 25 V39 M65 32 H79',K.naranja,1.4)}`),
rd_chinola:()=>svg(`${C(38,46,26,'#F2D25A')}${[[30,36],[44,32],[50,48],[34,56],[24,48]].map(([x,y])=>D(x,y,1.6,shade('#F2D25A',-.25))).join('')}${C(66,64,22,'#E9C34E')}${C(66,64,16,'#F7D96E')}${[[60,58],[70,56],[72,68],[62,70],[66,63],[58,66]].map(([x,y])=>D(x,y,2.4,'#5A4A40')).join('')}`),
rd_guanabana:()=>svg(`${hojaP(50,22,-60,24)}${P('M50 20 Q82 26 80 60 Q76 90 50 90 Q24 90 20 60 Q18 26 50 20Z','#9CCB7A')}${[[36,40],[52,34],[66,42],[30,58],[46,54],[62,58],[72,70],[38,74],[54,74]].map(([x,y])=>P(`M${x-3} ${y+2} L${x} ${y-4} L${x+3} ${y+2}Z`,'#7FB062')).join('')}`),
rd_coco:()=>svg(`${L('M60 6 L56 36',K.rosa,4)}${C(50,58,32,'#9CCB7A')}${E(50,34,14,6,'#EFF3D8')}${L('M28 66 Q50 76 72 66',shade('#9CCB7A',-.2),2)}`),
/* mi país: lugares y símbolos */
rd_pico:()=>svg(`${P('M2 90 L50 12 L98 90Z','#9FB7C9')}${P('M50 12 L62 32 L54 30 L50 36 L44 30 L38 32Z','#C9D6E2')}${P('M2 90 L30 50 L60 90Z','#8FBF8A')}${[[14,86],[24,88],[70,88],[82,86]].map(([x,y])=>P(`M${x} ${y} L${x+6} ${y-18} L${x+12} ${y}Z`,K.verde)).join('')}${L('M50 12 V2',K.cafe,2)}${R(50,2,10,7,1,'#FFFFFF')}`),
rd_playa:()=>svg(`${C(76,24,12,K.amarillo)}${R(0,48,100,30,0,K.azul)}${L('M10 58 q6 -4 12 0 M40 64 q6 -4 12 0 M70 58 q6 -4 12 0','#FFFFFF',2)}${P('M0 74 Q50 64 100 76 V100 H0Z','#F6E3B4')}${L('M28 92 Q24 66 34 44',K.cafe,4.5)}${hojaP(34,44,-170,24)}${hojaP(34,44,-120,22)}${hojaP(34,44,-30,24)}${hojaP(34,44,-70,20)}`),
rd_salto:()=>svg(`${P('M4 30 L30 18 L36 70 L4 76Z','#B4B0BE')}${P('M96 26 L66 16 L62 70 L96 78Z','#A8A4B4')}${R(34,18,30,56,4,'#A9D3F0')}${L('M40 22 V70 M48 22 V72 M56 22 V70',' #FFFFFF'.trim(),2)}${E(50,80,40,10,K.azul)}${L('M30 78 q6 -4 12 0 M56 80 q6 -4 12 0','#FFFFFF',2)}${hojaP(12,24,-60,18)}${hojaP(86,20,-120,18)}`),
rd_samana:()=>svg(`${R(0,58,100,42,0,K.azul)}${P('M44 62 Q40 34 54 26 Q48 18 36 18 Q48 6 62 16 Q76 6 88 18 Q76 18 70 26 Q84 34 80 62Z','#7F9CC0')}${L('M30 64 q6 -6 12 0 M78 64 q6 -6 12 0','#FFFFFF',2.4)}${D(22,52,3,'#DCEFFB')}${D(92,50,2.6,'#DCEFFB')}`),
rd_monumento:()=>svg(`${R(22,82,56,10,2,'#E6DED0')}${R(30,72,40,10,2,'#EFE8DC')}${R(40,24,20,48,3,'#F7F2E8')}${L('M46 28 V68 M54 28 V68',shade('#F7F2E8',-.12),1.6)}${R(36,18,28,8,2,'#E6DED0')}${C(50,10,5,'#C9C1B3')}${R(47,14,6,6,1,'#C9C1B3')}`),
rd_alcazar:()=>svg(`${R(8,30,84,58,2,'#EAD9BC')}${R(8,24,84,8,1,'#DCC6A0')}${[16,32,48,64,80].map(x=>P(`M${x-6} 56 V44 Q${x} 36 ${x+6} 44 V56Z`,'#C9AE84')+P(`M${x-6} 86 V74 Q${x} 66 ${x+6} 74 V86Z`,'#C9AE84')).join('')}${L('M8 60 H92',shade('#EAD9BC',-.15),2)}`),
rd_bandera_rd:()=>svg(`${L('M12 94 V8',K.cafe,4)}<g transform="translate(14 10)">${R(0,0,76,52,2,'#FFFFFF')}${F('M0 0 H32 V20 H0Z','#3E6FB6')}${F('M44 0 H76 V20 H44Z','#E05A5A')}${F('M0 32 H32 V52 H0Z','#E05A5A')}${F('M44 32 H76 V52 H44Z','#3E6FB6')}${R(32,18,12,16,3,'#FFFFFF')}${D(38,26,4,K.verde)}${L('M38 22 V30',K.cafe,1.4)}</g>`),
rd_cigua:()=>svg(`${L('M8 84 Q50 70 94 82',K.verde,4)}${hojaP(30,80,-150,22)}${hojaP(70,78,-30,22)}${P('M30 58 Q32 34 56 34 Q72 36 74 52 L90 46 L80 60 Q76 74 54 76 Q34 76 30 58Z','#B8A574')}${P('M40 60 Q48 50 62 56 Q64 70 50 72 Q40 70 40 60Z','#FFF6E6')}${L('M46 60 l2 6 M52 58 l2 6 M58 60 l1 6',shade('#B8A574',-.2),1.6)}${D(62,44,3,I0)}${P('M72 46 L84 44 L74 50Z','#E8C27A')}${L('M48 76 V82 M56 76 V82',K.naranja,2)}`),
rd_bayahibe:()=>svg(`${L('M50 96 V64',K.verde,4)}${petalos(50,44,7,16,9,14,'#F5A6C4')}${petalos(50,44,7,8,5,8,'#F8C4D8')}${C(50,44,7,K.amarillo)}`),
rd_larimar:()=>svg(`${P('M14 50 Q14 18 52 16 Q88 18 88 50 Q86 84 50 86 Q14 82 14 50Z','#8ECFE6')}${L('M26 40 Q40 30 52 42 Q62 52 76 40 M24 60 Q38 52 50 62 Q62 72 78 60',' #E8F7FC'.trim(),3.4)}${L('M40 74 Q50 68 60 76',shade('#8ECFE6',-.15),2.4)}`),
rd_iguana:()=>svg(`${L('M10 70 Q4 80 16 84',K.verde,4)}${P('M14 72 Q30 56 56 58 Q78 58 84 66 Q92 66 94 72 Q86 78 74 76 Q54 82 34 80 Q20 80 14 72Z','#9FB59A')}${[24,32,40,48,56,64].map(x=>P(`M${x} 60 l3 -7 l3 7Z`,'#7F9A7A')).join('')}${P('M84 64 L88 56 L90 64Z','#7F9A7A')}${D(80,66,2.2,I0)}${L('M34 80 l-4 10 M62 78 l4 10',K.verde,4)}`),
rd_guira:()=>svg(`<g transform="rotate(-20 50 50)">${R(30,10,24,76,10,'#D9DDE6')}${[18,28,38,48,58,68,78].map(y=>[36,42,48].map(x=>D(x,y,1.4,'#9EA4B4')).join('')).join('')}${R(36,4,12,8,3,'#B4B9C8')}${L('M66 22 L66 74 M72 22 L72 74 M78 22 L78 74',K.grisO,2.4)}${R(62,70,20,18,5,K.cafe)}</g>`)
});
function hojaP(x,y,a,l){ return `<g transform="translate(${x} ${y}) rotate(${a})">${P(`M0 0 Q${l*.5} ${-l*.42} ${l} 0 Q${l*.5} ${l*.42} 0 0Z`,K.hoja)}</g>`; }
var I0='#3C3848';
const NUEVOS=['mangu','bandera','sancocho','tostones','habichuelas','yaniqueque','casabe','empanada','morir','chinola','guanabana','coco',
  'pico','playa','salto','samana','monumento','alcazar','bandera_rd','cigua','bayahibe','larimar','iguana','guira'].map(k=>'st_rd_'+k);
/* nombres para el álbum (se leen al tocar) */
window.STK_NOMBRE={st_rd_mangu:'Mangú',st_rd_bandera:'La bandera: arroz, habichuelas y carne',st_rd_sancocho:'Sancocho',st_rd_tostones:'Tostones',
  st_rd_habichuelas:'Habichuelas con dulce',st_rd_yaniqueque:'Yaniqueque',st_rd_casabe:'Casabe',st_rd_empanada:'Empanada',st_rd_morir:'Morir soñando',
  st_rd_chinola:'Chinola',st_rd_guanabana:'Guanábana',st_rd_coco:'Coco de agua',st_rd_pico:'Pico Duarte, la montaña más alta del Caribe',st_rd_playa:'Playa dominicana',
  st_rd_salto:'Salto del Limón',st_rd_samana:'Ballenas de Samaná',st_rd_monumento:'Monumento de Santiago',st_rd_alcazar:'Alcázar de Colón',st_rd_bandera_rd:'Bandera dominicana',
  st_rd_cigua:'Cigua palmera, el ave nacional',st_rd_bayahibe:'Rosa de Bayahíbe, la flor nacional',st_rd_larimar:'Larimar, piedra azul que solo hay en nuestro país',
  st_rd_iguana:'Iguana rinoceronte',st_rd_guira:'Güira del merengue'};
if (!STK.includes(NUEVOS[0])){ STK.push(...NUEVOS); STK_PAGES.push(['Comida dominicana',48],['Mi país',60]); }

/* ---------- medallas por logros ---------- */
const ganados=p=>Object.entries(S.toyWins||{}).filter(([k])=>k.startsWith(p.id+'|'));
const MEDALLAS=[
  ['personaje','Así soy yo','Crea tu personaje','ic_gorro',p=>!!p.nino],
  ['amigo','Mi amigo y yo','Cambia cómo es tu animalito','huellas',p=>!!p.rasgos],
  ['primera','Primera estrella','Gana tu primer reto','estrella_oro',p=>ganados(p).some(([,v])=>v>0)||Object.keys(S.progress[p.id]||{}).length>0],
  ['jugueton','Juguetón','Gana 25 retos en la sala de juegos','estrella_plata',p=>ganados(p).reduce((s,[,v])=>s+v,0)>=25],
  ['campeon','Campeón','Gana 100 retos en la sala de juegos','corona',p=>ganados(p).reduce((s,[,v])=>s+v,0)>=100],
  ['curioso','Curioso','Gana retos en 8 juguetes distintos','lupa',p=>ganados(p).filter(([,v])=>v>0).length>=8],
  ['caminante','Caminante','Haz florecer 5 caminos de la semilla','girasol',p=>(S.toyWins||{})[p.id+'|camino']>=5],
  ['explorador','Explorador','Haz florecer 20 caminos de la semilla','planta',p=>(S.toyWins||{})[p.id+'|camino']>=20],
  ['estudioso','Estudioso','Completa 10 retos por grado','abc',p=>Object.keys(S.progress[p.id]||{}).length>=10],
  ['lector','Lector','Lee en voz alta 5 veces','libros',p=>(p.fluency||[]).length>=5],
  ['calculista','Calculista','Haz cálculo mental 5 días seguidos','numeros',p=>((p.math||{}).streak||0)>=5],
  ['coleccion','Coleccionista','Junta 24 stickers','ic_album',p=>(p.stickers||[]).length>=24],
  ['album','Álbum lleno','Junta todos los stickers','corazon',p=>(p.stickers||[]).length>=STK.length],
  ['guardian','Guardián','Llega al nivel 10','cohete',p=>xpLevel(p.xp||0)>=10]
];
window.MEDALLAS=MEDALLAS;
/* medalla: cinta, disco dorado y el dibujo del logro adentro */
window.medallaArt=(id,tam='100%')=>{ const m=MEDALLAS.find(x=>x[0]===id), t=m&&PL[m[3]]?PL[m[3]]():'', i=t.indexOf('>'), z=t.lastIndexOf('</svg>');
  const ic=i>0&&z>0?`<svg x="31" y="45" width="38" height="38" viewBox="0 0 100 100" overflow="visible">${t.slice(i+1,z)}</svg>`:'';
  return `<span class="medalla-art" style="width:${tam};height:${tam}">${svg(`${P('M30 6 H44 L56 40 H42Z','#8DBDE6')}${P('M70 6 H56 L44 40 H58Z',K.rosa)}${C(50,64,28,'#F6D36F')}${C(50,64,21,'#FBEAB8')}${ic}`)}</span>`; };
function avisar(m){
  const el=document.createElement('div'); el.className='stk-peel'; el.setAttribute('role','status');
  el.innerHTML=`<span class="stk-card">${medallaArt(m[0],'1em')}</span><span>¡Nueva medalla!<br><b>${m[1]}</b></span>`;
  document.body.appendChild(el); try{ note(988,.15,'sine',.1); }catch(e){}
  speak(`¡Ganaste la medalla ${m[1]}!`);
  setTimeout(()=>{ el.classList.add('out'); setTimeout(()=>el.remove(),400); },3000);
}
let cola=[], ocupado=false;
const sig=()=>{ if (ocupado||!cola.length) return; ocupado=true; avisar(cola.shift()); setTimeout(()=>{ ocupado=false; sig(); },3600); };
window.revisarMedallas=()=>{ const p=typeof prof==='function'&&prof(); if(!p) return;
  p.medallas=p.medallas||[]; const nuevas=MEDALLAS.filter(m=>!p.medallas.includes(m[0])&&m[4](p));
  if (!nuevas.length) return; nuevas.forEach(m=>p.medallas.push(m[0])); save();
  cola.push(...nuevas); setTimeout(sig,2600); };
['win','finish','addXP','giveSticker'].forEach(n=>{ const f=window[n]; if (typeof f!=='function') return;
  window[n]=function(...a){ const r=f.apply(this,a); setTimeout(()=>revisarMedallas(),50); return r; }; });

/* pestaña «Medallas» en «Mi amigo» */
if (typeof vFriend==='function'){ const _vF=vFriend;
  vFriend=function(){ _vF(); const p=prof(); if(!p) return; const tabs=app.querySelector('.tabs'); if(!tabs) return;
    tabs.insertAdjacentHTML('beforeend',`<button class="chip ${view.tab==='medallas'?'on':''}" data-tab="medallas">${ilu('medalla_1','1.2em')} Medallas</button>`);
    tabs.querySelector('[data-tab="medallas"]').addEventListener('click',()=>go({name:'friend',tab:'medallas'}));
    if (view.tab!=='medallas') return;
    tabs.querySelectorAll('[data-tab]').forEach(b=>b.classList.toggle('on',b.dataset.tab==='medallas'));
    const tiene=p.medallas||[], caja=tabs.nextElementSibling;
    caja.innerHTML=`<p style="font-weight:800;margin:var(--s-1) 0 var(--s-3)">${tiene.length} de ${MEDALLAS.length} medallas</p><div class="md-grid">${MEDALLAS.map(m=>{ const ok=tiene.includes(m[0]);
      return `<button class="md-it ${ok?'ok':''}" data-md="${m[0]}" aria-label="${m[1]}: ${m[2]}"><span class="md-dib">${medallaArt(m[0])}</span><b>${m[1]}</b><small>${m[2]}</small></button>`; }).join('')}</div>`;
    caja.querySelectorAll('[data-md]').forEach(b=>b.addEventListener('click',()=>{ const m=MEDALLAS.find(x=>x[0]===b.dataset.md); speak(tiene.includes(m[0])?`${m[1]}. ¡Ya la tienes!`:`${m[1]}. ${m[2]}.`); }));
  };
}

/* ---------- paisajes del inicio ---------- */
const lam=b=>`url('data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 120" width="400" height="120">${b}</svg>`).replace(/'/g,'%27')}')`;  /* comillas simples: va dentro de style="…" */
const palma=(x,y,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})">${L('M0 0 Q-4 -24 6 -46','#C29A7C',5)}${hojaP(6,-46,-170,26)}${hojaP(6,-46,-130,24)}${hojaP(6,-46,-40,24)}${hojaP(6,-46,-6,26)}</g>`;
const e=(n,x,y,a,c)=>typeof ent==='function'?ent(n,x,y,a,c):'';
const PAISAJES=[
  ['campo','Campo',1,'#E3F1FA',''],
  ['playa','Playa',3,'#DDF0FB',()=>lam(`${P('M-2 122 V78 H402 V122Z','#A9D3F0')}${L('M20 90 q8 -5 16 0 M120 86 q8 -5 16 0 M220 92 q8 -5 16 0 M320 86 q8 -5 16 0','#FFFFFF',2)}${P('M300 78 L314 50 L318 78Z','#FFFFFF')}${L('M314 50 V80',K.cafe,1.6)}${P('M298 80 H326 L322 86 H302Z',K.coral)}${P('M-2 122 V100 Q100 92 200 100 Q300 108 402 98 V122Z','#F6E3B4')}${palma(40,104,1)}${palma(370,102,.9)}${palma(150,106,.7)}`)],
  ['montana','Montaña',6,'#E6EEF8',()=>lam(`${P('M-2 122 L90 30 L180 122Z','#AFC3D6')}${P('M90 30 L104 50 L92 46 L84 54 L78 46Z','#D7E1EC')}${P('M120 122 L250 20 L380 122Z','#9FB7C9')}${P('M250 20 L266 42 L254 38 L246 46 L238 38Z','#C9D6E2')}${P('M-2 122 V88 Q100 70 200 86 Q300 100 402 84 V122Z','#BCDDA8')}${[30,60,90,280,320,360].map((x,i)=>e(i%2?'pino':'abeto',x,104+(i%3)*4,30+(i%2)*8)).join('')}`)],
  ['selva','Selva',9,'#E4F2E2',()=>lam(`${P('M-2 122 V70 Q60 50 120 66 Q200 40 280 62 Q340 46 402 66 V122Z','#A8D39A')}${[20,70,140,210,270,340,390].map((x,i)=>e(i%2?'arbol_alto':'arbol_copa',x,104,i%2?62:50)).join('')}${palma(110,108,1.1)}${palma(310,108,1)}${[50,180,250,370].map(x=>hojaP(x,118,-120,30)+hojaP(x,118,-60,30)).join('')}${P('M-2 122 V104 Q100 96 200 104 Q300 112 402 102 V122Z','#8FC57E')}`)]
];
window.PAISAJES=PAISAJES;
window.paisajeImg=id=>{ const pz=PAISAJES.find(x=>x[0]===id); return pz&&pz[4]?pz[4]():''; };
if (typeof vHome==='function'){ const _h=vHome;
  vHome=function(){ const r=_h(); const p=prof(); const h=app.querySelector('.hero.land');
    if (p && h){ const pz=PAISAJES.find(x=>x[0]===p.paisaje); if (pz&&pz[4]&&xpLevel(p.xp||0)>=pz[2]){ h.style.setProperty('--paisaje',pz[4]()); h.style.backgroundColor=pz[3]; } }
    setTimeout(()=>revisarMedallas(),1200); return r; };
}
})();
