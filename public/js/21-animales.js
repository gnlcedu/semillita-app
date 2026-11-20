/* Semillita · Animalitos que parecen animales
   =========================================================
   Reemplaza creature(sp, o) con un dibujo propio para cada especie, en estilo
   «bebé sentado»: cabeza grande y redonda, cuerpo pequeño sentado de frente,
   panza y hocico más claros, patitas hacia adelante con almohadillas, mejillas
   rosadas y ojos de puntito. Formas planas, sin brillos, contorno de 2,2 px en un
   tono oscuro del relleno (un poco más marcado que el resto de la app para que
   cada animal se lea bien a tamaño pequeño).
   - Cada especie define sus rasgos personalizables en ESPECIES[sp].rasgos, con
     opciones que existen en la naturaleza (melena, caparazón, alas…).
     Se guardan en p.rasgos (campo opcional; semillita.v1 no cambia).
   - Las expresiones usan las mismas clases (eo, eh, es, ez, ew, et / mo, mh, ms, mw, mt).
   - Los accesorios de ACC se colocan en los anclajes de cada especie.
   - Las especies que aún no tienen dibujo nuevo usan el creature() anterior.
   Se carga después de 04-personajes.js (PLANO_KIT se usa al dibujar).
   ========================================================= */
(function(){
const I='#3C3848', CREMA='#FFF3E2', OSC='#6B5A66';
const viejo = typeof creature==='function' ? creature : null;
/* contorno propio de los animalitos */
const ln=c=>/^#f{6}$/i.test(c)?'#A9A3B6':shade(c,-.42);
const sk=c=>`stroke="${ln(c)}" stroke-width="2.2" vector-effect="non-scaling-stroke" stroke-linejoin="round" stroke-linecap="round"`;
const P=(d,c)=>`<path d="${d}" fill="${c}" ${sk(c)}/>`;
const C=(x,y,r,c)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" ${sk(c)}/>`;
const E=(x,y,rx,ry,c,rot)=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}"${rot?` transform="rotate(${rot} ${x} ${y})"`:''} fill="${c}" ${sk(c)}/>`;
const D=(x,y,r,c)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`;
const Eo=(x,y,rx,ry,c,rot)=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}"${rot?` transform="rotate(${rot} ${x} ${y})"`:''} fill="${c}"/>`;
const L=(d,c,w=3)=>`<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const espejo=b=>`<g transform="translate(200 0) scale(-1 1)">${b}</g>`;
/* recorta dibujos interiores (placas, manchas…) a la forma que los contiene */
let NREC=0;
const recorte=(d,inner)=>{ if(!inner) return ''; const id='rec'+(++NREC); return `<clipPath id="${id}"><path d="${d}"/></clipPath><g clip-path="url(#${id})">${inner}</g>`; };

/* ---------- cara: ojos y boca con todas las expresiones ---------- */
function cara({xl,xr,ey,r=6.5,mx,my,mw=7,tipo="w",mejillas=null,ojo=I,boca:conBoca=true,cejas=true}){
  const G=(c,b)=>`<g class="${c}">${b}</g>`, w=r*1.25;
  const arc=(x,up)=>`M${x-w} ${ey+(up?2:-2)} Q${x} ${ey+(up?-r*1.3:r*1.2)} ${x+w} ${ey+(up?2:-2)}`;
  const ojos=G('eo',`<g class="blink">${Eo(xl,ey,r*.86,r,ojo)}${Eo(xr,ey,r*.86,r,ojo)}</g>`)
    +G('eh',L(arc(xl,1)+arc(xr,1),ojo,r*.5))
    +G('es',L(arc(xl,0)+arc(xr,0),ojo,r*.5)+(cejas?L(`M${xl-w-1} ${ey-r*1.7} Q${xl-w*.2} ${ey-r*1.9} ${xl+w*.7} ${ey-r*2.5} M${xr+w+1} ${ey-r*1.7} Q${xr+w*.2} ${ey-r*1.9} ${xr-w*.7} ${ey-r*2.5}`,ojo,r*.42):''))
    +G('ez',L(`M${xl-w} ${ey} h${2*w} M${xr-w} ${ey} h${2*w}`,ojo,r*.5))
    +G('ew',E(xl,ey,r*1.45,r*1.55,'#FFFFFF')+E(xr,ey,r*1.45,r*1.55,'#FFFFFF')+D(xl,ey,r*.75,ojo)+D(xr,ey,r*.75,ojo))
    +G('et',D(xl-1,ey-r*.45,r*.9,ojo)+D(xr-1,ey-r*.45,r*.9,ojo)+(cejas?L(`M${xr-w} ${ey-r*2.6} Q${xr} ${ey-r*3.2} ${xr+w} ${ey-r*2.7}`,ojo,r*.42):''));
  const sonrisa = tipo==='w'
    ? `M${mx-mw} ${my-1} Q${mx-mw/2} ${my+mw*.8} ${mx} ${my} Q${mx+mw/2} ${my+mw*.8} ${mx+mw} ${my-1}`
    : `M${mx-mw} ${my} Q${mx} ${my+mw*1.1} ${mx+mw} ${my}`;
  const abierta=`<path d="M${mx-mw*1.2} ${my-1} Q${mx} ${my+mw*2.2} ${mx+mw*1.2} ${my-1}Z" fill="#E86A7A" stroke="${I}" stroke-width="${Math.max(2,r*.4)}" stroke-linejoin="round"/>`;
  const boca=G('mo',L(sonrisa,I,r*.42))+G('mh',abierta)+G('ms',L(`M${mx-mw} ${my+mw*.7} Q${mx} ${my-mw*.5} ${mx+mw} ${my+mw*.7}`,I,r*.42))
    +G('mw',`<ellipse cx="${mx}" cy="${my+mw*.4}" rx="${mw*.6}" ry="${mw*.75}" fill="#E86A7A" stroke="${I}" stroke-width="${Math.max(2,r*.4)}"/>`)
    +G('mt',L(`M${mx-mw*.8} ${my+2} Q${mx} ${my} ${mx+mw*.8} ${my+3}`,I,r*.42));
  const mj = mejillas ? mejillas.map(([x,y])=>Eo(x,y,r*1.5,r*.95,'#F7A9B6')).join('') : '';
  return mj+ojos+(conBoca?boca:'');
}

/* ---------- plantilla: bebé sentado de frente ----------
   pe: pelaje · pz: panza · ho: hocico · al: almohadillas
   atras: cola y orejas (detrás) · cabeza: forma de la cabeza (path) · marcas: encima de la cabeza
   patas: color de las patas (calcetines) */
const CAB='M100 26 C140 26 162 50 162 80 C162 112 136 132 100 132 C64 132 38 112 38 80 C38 50 60 26 100 26Z';
function sentado({pe,pz,ho,al,patas,atras='',cabeza=CAB,sobreCab='',marcasCuerpo='',hocico=null,nariz=null,cara:cf={}}){
  const pt=patas||pe;
  const pie=P('M44 184 C40 166 56 156 72 160 C88 164 92 180 84 190 C74 198 50 196 44 184Z',pt)+E(64,182,10,9,al)+D(53,170,3.2,al)+D(61,166,3.2,al)+D(70,166,3.2,al);
  const brazo=E(66,150,11,17,pt,18);
  const cuerpo=P('M60 186 C50 152 64 120 100 118 C136 120 150 152 140 186 Q100 196 60 186Z',pe)+marcasCuerpo+E(100,160,23,25,pz);
  const ho2=hocico??E(100,102,24,16,ho);
  const nz=nariz??P('M93 93 Q100 89 107 93 Q106 100 100 102 Q94 100 93 93Z',OSC);
  return {
    fondo: atras,
    cuerpo: cuerpo+brazo+espejo(brazo)+pie+espejo(pie)+P(cabeza,pe)+sobreCab+ho2+nz,
    cara: cara({xl:76,xr:124,ey:84,r:6.5,mx:100,my:106,mw:7,mejillas:[[64,100],[136,100]],...cf}),
    anc:{cabeza:[100,30,.9],ojos:[100,84,1.15],cuello:[100,124,.8],mano:[152,150,.8],espalda:[100,140,.8]}
  };
}

/* ---------- especies ---------- */
const ESPECIES={
 zorro:{
  rasgos:{
   pelaje:['Pelaje',[['#F39A5A','Rojizo'],['#F6B27C','Naranja'],['#F2D29B','Desierto'],['#C29A7C','Café'],['#C9CCD8','Plateado'],['#FFFFFF','Ártico']]],
   cola:['Punta de la cola',[['blanca','Blanca'],['oscura','Oscura'],['igual','Del pelaje']]],
   patas:['Patitas',[['oscuras','Oscuras'],['igual','Del pelaje']]],
   orejas:['Orejas',[['normales','Normales'],['grandes','Grandes (fénec)']]]
  },
  dibujo(o){
   const pe=o.pelaje, art=pe==='#FFFFFF', bl=art?'#EEF2F8':CREMA, os=art?'#B4B9C8':'#7A6670';
   const punta=o.cola==='blanca'?bl:o.cola==='oscura'?os:pe, g=o.orejas==='grandes';
   const oreja=P(g?'M52 62 L34 -6 L92 40Z':'M50 58 L48 6 L90 38Z',pe)+P(g?'M56 50 L44 8 L80 40Z':'M56 50 L54 20 L80 40Z',o.patas==='oscuras'?os:shade(pe,-.15));
   const cola=P('M134 184 C182 182 200 142 186 108 C178 136 162 160 136 166Z',pe)+P('M186 108 C198 122 196 140 188 152 C178 138 176 122 186 108Z',punta);
   return sentado({pe,pz:bl,ho:bl,al:art?'#D9DDE6':'#5E4E58',patas:o.patas==='oscuras'?os:pe,atras:cola+oreja+espejo(oreja),
     cabeza:'M100 28 C140 28 160 50 162 76 L176 98 L152 104 C142 122 124 132 100 132 C76 132 58 122 48 104 L24 98 L38 76 C40 50 60 28 100 28Z',
     hocico:P('M100 86 C114 86 126 96 152 104 C140 122 122 130 100 130 C78 130 60 122 48 104 C74 96 86 86 100 86Z',bl)});
  }
 },
 koala:{
  rasgos:{
   pelaje:['Pelaje',[['#B9B8C6','Gris'],['#D2D2DC','Gris claro'],['#B8A89E','Gris café']]],
   orejas:['Orejas',[['peludas','Muy peludas'],['redondas','Redondas']]],
   nariz:['Nariz',[['#6B5A66','Oscura'],['#8C7B84','Café']]]
  },
  dibujo(o){
   const pe=o.pelaje, cl='#F4F1F6', pel=o.orejas==='peludas';
   const oreja=(pel?[[34,52,15],[26,70,12],[30,86,11],[50,38,13]].map(([x,y,r])=>C(x,y,r,pe)).join(''):'')+C(40,62,28,pe)+C(40,64,17,cl);
   return sentado({pe,pz:cl,ho:pe,al:'#7E7488',atras:oreja+espejo(oreja),
     hocico:'',nariz:P('M88 80 Q100 72 112 80 Q116 98 100 108 Q84 98 88 80Z',o.nariz),
     cara:{xl:74,xr:126,ey:86,my:114,mw:6}});
  }
 },
 leon:{
  rasgos:{
   melena:['Melena',[['#E39A52','Naranja'],['#C98256','Café'],['#F2C46B','Dorada'],['#B97A5A','Café oscuro'],['ninguna','Sin melena (leona)']]],
   pelaje:['Pelaje',[['#F5C76A','Dorado'],['#F2D29B','Arena'],['#E8B47E','Caramelo']]],
   cola:['Mechón de la cola',[['oscuro','Oscuro'],['melena','Como la melena']]]
  },
  dibujo(o){
   const pe=o.pelaje, me=o.melena==='ninguna'?null:o.melena, pz=shade(pe,.55);
   const tuf=o.cola==='oscuro'?'#B07A5A':(me||shade(pe,-.25));
   const cola=L('M136 182 C170 186 176 164 172 146',ln(pe),9.4)+L('M136 182 C170 186 176 164 172 146',pe,6)+P('M172 150 C160 140 164 122 174 120 C186 122 186 140 172 150Z',tuf);
   const melena=me?Array.from({length:14},(_,i)=>{ const a=i/14*Math.PI*2; return C(+(100+62*Math.cos(a)).toFixed(1),+(80+56*Math.sin(a)).toFixed(1),22,me); }).join('')+D(100,80,62,me):'';
   const oreja=C(58,40,14,pe)+D(58,42,7,shade(pe,-.18));
   return sentado({pe,pz,ho:pz,al:'#C98A6A',atras:cola+melena+oreja+espejo(oreja)});
  }
 },
 tortuga:{
  rasgos:{
   piel:['Piel',[['#A3D69B','Verde'],['#B9E3C6','Verde claro'],['#CBD89A','Oliva'],['#E2CFA0','Arena']]],
   concha:['Caparazón',[['#B98A62','Café'],['#8FBF8A','Verde'],['#D9B08A','Tostado'],['#9FB7A0','Musgo'],['#E0A97E','Carey']]],
   dibujo:['Dibujo del caparazón',[['placas','Placas'],['anillos','Anillos'],['manchas','Manchas'],['liso','Liso']]]
  },
  dibujo(o){
   const pi=o.piel, sh=o.concha, lnn=shade(sh,-.3);
   const DOMO='M38 160 C34 92 72 58 116 58 C160 58 188 96 186 158 Q112 176 38 160Z';
   const hex=(cx,cy,r)=>'M'+Array.from({length:6},(_,i)=>{ const a=i*Math.PI/3; return `${(cx+r*Math.cos(a)).toFixed(1)} ${(cy+r*Math.sin(a)).toFixed(1)}`; }).join(' L')+'Z';
   const dib={
    placas: `<path d="${hex(114,108,24)}" fill="none" stroke="${lnn}" stroke-width="2.4"/>`+L('M102 87 L92 62 M126 87 L138 62 M138 108 L184 104 M126 129 L140 156 M102 129 L90 156 M90 108 L40 112',lnn,2.4),
    anillos: L('M64 156 C64 108 88 82 114 82 C140 82 162 108 162 156 M88 156 C88 126 100 108 114 108 C128 108 140 126 140 156',lnn,2.6),
    manchas: [[84,96,10],[126,82,9],[152,116,11],[104,128,12],[66,132,8],[138,146,7]].map(([x,y,r])=>D(x,y,r,shade(sh,-.14))).join(''),
    liso: ''
   }[o.dibujo]||'';
   /* las patas y el cuello salen de debajo del caparazón: se dibujan antes */
   const pata=x=>P(`M${x-13} 150 Q${x-15} 190 ${x} 192 Q${x+15} 190 ${x+13} 150Z`,pi);
   return {
    fondo: P('M176 150 L204 162 L178 170Z',pi)+pata(150)+pata(80)+pata(58)+pata(168)+P('M78 150 Q60 128 46 108 L24 122 Q36 146 56 164Z',pi),
    cuerpo: P(DOMO,sh)+recorte(DOMO,dib)+`<path d="${DOMO}" fill="none" ${sk(sh)}/>`
      +P('M28 154 Q112 178 196 152 Q200 162 192 168 Q112 188 34 172 Q24 164 28 154Z',shade('#F6E39A',.1))
      +E(42,92,40,36,pi),
    cara: cara({xl:28,xr:60,ey:88,r:6,mx:42,my:106,mw:7,tipo:'u',mejillas:[[18,100],[66,100]]}),
    anc:{cabeza:[42,58,.6],ojos:[44,88,.9],cuello:[46,128,.5],mano:[70,160,.7],espalda:[114,100,.9]}
   };
  }
 },
 mariposa:{
  rasgos:{
   alas:['Alas de arriba',[['#C9B8EE','Lila'],['#F6B27C','Naranja'],['#8DBDE6','Azul'],['#F5B8D0','Rosada'],['#F6D36F','Amarilla'],['#FFFFFF','Blanca']]],
   alas2:['Alas de abajo',[['#F5B8D0','Rosada'],['#C9B8EE','Lila'],['#F6B27C','Naranja'],['#8DBDE6','Azul'],['#F6D36F','Amarilla'],['#FFFFFF','Blanca']]],
   dibujo:['Dibujo de las alas',[['puntos','Puntitos'],['ojos','Ojos'],['venas','Venas'],['franjas','Franjas'],['lisas','Lisas']]],
   borde:['Borde',[['si','Con borde'],['no','Sin borde']]],
   cuerpo:['Cuerpo',[['#9C8BB8','Lila'],['#9A8A80','Café'],['#7F8FBF','Azul noche']]]
  },
  dibujo(o){
   const a1=o.alas, a2=o.alas2, cu=o.cuerpo, bo=o.borde==='si';
   const ARR='M92 104 C62 44 6 34 6 86 C6 122 48 132 92 120Z', ABA='M92 126 C56 122 26 146 36 174 C46 200 84 188 96 144Z';
   const ala=(d,c,cx,cy)=>bo?P(d,shade(c,-.25))+`<g transform="translate(${cx} ${cy}) scale(.8) translate(${-cx} ${-cy})">${P(d,c)}</g>`:P(d,c);
   const dibujo={
    puntos: [[22,80,5],[32,60,4.5],[20,102,4],[50,52,4],[46,174,4.5],[62,184,4]].map(([x,y,r])=>D(x,y,r,'#FFFFFF')).join(''),
    ojos: C(44,86,12,shade(a1,-.3))+D(44,86,6.5,'#FFFFFF')+D(44,86,3,shade(a1,-.5))+C(60,162,9,shade(a2,-.3))+D(60,162,4.5,'#FFFFFF'),
    venas: L('M92 112 L28 64 M92 114 L18 90 M92 116 L46 120 M92 132 L46 160 M92 136 L66 182',shade(a1,-.3),1.8),
    franjas: L('M42 50 Q58 84 42 122',shade(a1,-.18),10)+L('M50 138 Q66 160 58 186',shade(a2,-.18),9),
    lisas:''
   }[o.dibujo]||'';
   const lado=ala(ABA,a2,70,154)+ala(ARR,a1,52,90)+dibujo;
   return {
    fondo: lado+espejo(lado),
    cuerpo: E(100,150,15,36,cu)+L('M88 144 h24 M87 158 h26 M89 172 h22',shade(cu,.35),2)+C(100,112,16,cu)
      +L('M88 46 Q80 22 68 14 M112 46 Q120 22 132 14',ln(cu),3)+C(68,14,6,cu)+C(132,14,6,cu)+C(100,74,36,shade(cu,.55)),
    cara: cara({xl:86,xr:114,ey:74,r:6,mx:100,my:90,mw:6,mejillas:[[76,88],[124,88]]}),
    anc:{cabeza:[100,40,.55],ojos:[100,74,.8],cuello:[100,108,.45],mano:[136,132,.6],espalda:[100,124,.6]}
   };
  }
 },
 panda:{
  rasgos:{
   manchas:['Manchas',[['#5E5868','Negras'],['#9A7B6A','Cafés (panda de Qinling)']]],
   parches:['Parches de los ojos',[['caidos','Caídos'],['redondos','Redondos']]],
   bambu:['Bambú',[['no','Sin bambú'],['si','Con bambú']]]
  },
  dibujo(o){
   const os=o.manchas, bl='#FFFFFF';
   const oreja=C(56,38,17,os);
   const parche=o.parches==='redondos'?E(76,86,14,13,os):E(76,88,13,17,os,-28);
   const bambu=o.bambu==='si'?L('M150 196 L166 112',ln('#A3D69B'),9.4)+L('M150 196 L166 112','#A3D69B',6)+L('M154 172 l6 1 M159 146 l6 1',ln('#A3D69B'),2)+P('M164 120 Q182 104 192 108 Q180 122 164 120Z','#7FC08E'):'';
   const d=sentado({pe:bl,pz:'#F4F2F6',ho:bl,al:shade(os,.35),patas:os,atras:oreja+espejo(oreja),
     marcasCuerpo:P('M62 140 C70 124 86 118 100 118 C114 118 130 124 138 140 C128 136 112 134 100 134 C88 134 72 136 62 140Z',os),
     sobreCab:parche+espejo(parche),hocico:E(100,104,20,14,'#F4F2F6'),nariz:P('M93 96 Q100 92 107 96 Q106 102 100 104 Q94 102 93 96Z',os),
     cara:{ojo:'#FFFFFF',r:5.5,my:108}});
   d.cuerpo+=bambu; return d;
  }
 },
 rana:{
  rasgos:{
   piel:['Piel',[['#96D48C','Verde'],['#B9E37A','Verde limón'],['#8DBDE6','Azul (rana dardo)'],['#F29A8E','Roja (rana tomate)'],['#F6D36F','Amarilla']]],
   manchas:['Manchas',[['no','Sin manchas'],['puntos','Puntos'],['franjas','Franjas']]],
   panza:['Panza',[['#FFF3E2','Crema'],['#F6E39A','Amarilla'],['#FFFFFF','Blanca']]]
  },
  dibujo(o){
   const pe=o.piel, os=shade(pe,-.35);
   /* muslo doblado detrás del cuerpo y pie palmeado en el suelo; brazo corto con mano apoyada */
   const pata=E(36,192,20,8,pe)+P('M60 146 C30 146 22 176 34 188 C46 198 70 190 74 172Z',pe);
   const brazo=E(74,170,10,19,pe,12)+E(70,190,13,7,pe);
   const man={puntos:[[66,74,5],[136,80,6],[84,124,4],[120,126,5],[100,62,4]].map(([x,y,r])=>D(x,y,r,os)).join(''),
     franjas:L('M76 66 Q100 58 124 66 M70 82 Q100 74 130 82',os,4.5)}[o.manchas]||'';
   return {
    fondo:'',
    cuerpo: pata+espejo(pata)+P('M48 186 C36 150 54 116 100 114 C146 116 164 150 152 186 Q100 196 48 186Z',pe)+E(100,160,30,26,o.panza)+brazo+espejo(brazo)
      +C(66,60,24,pe)+C(134,60,24,pe)+P('M100 46 C152 46 176 70 176 98 C176 126 142 138 100 138 C58 138 24 126 24 98 C24 70 48 46 100 46Z',pe)
      +D(66,60,15,'#FFFFFF')+D(134,60,15,'#FFFFFF')+man+D(92,96,2.2,os)+D(108,96,2.2,os),
    cara: cara({xl:66,xr:134,ey:60,r:8,mx:100,my:110,mw:22,tipo:'u',cejas:false,mejillas:[[48,104],[152,104]]}),
    anc:{cabeza:[100,48,.8],ojos:[100,62,1.9],cuello:[100,134,.85],mano:[156,160,.8],espalda:[100,140,.8]}
   };
  }
 },
 buho:{
  rasgos:{
   plumas:['Plumas',[['#B98D6E','Café'],['#B4B0BE','Gris'],['#D9A66E','Canela'],['#FFFFFF','Blanco (búho nival)']]],
   cara:['Cara',[['#FFF3E2','Crema'],['#FFFFFF','Blanca'],['#F2D29B','Dorada']]],
   penachos:['Penachos',[['si','Con penachos'],['no','Sin penachos']]],
   pecho:['Pecho',[['plumitas','Plumitas'],['puntos','Puntitos'],['liso','Liso']]]
  },
  dibujo(o){
   const pe=o.plumas, nival=pe==='#FFFFFF', os=nival?'#8C879A':shade(pe,-.3), pz=nival?'#FFFFFF':shade(pe,.5);
   const pen=o.penachos==='si'?P('M54 52 L44 12 L82 38Z',pe):'';
   const ala=P('M40 96 C18 128 28 170 62 180 C64 150 60 118 40 96Z',shade(pe,-.12))+L('M36 140 Q44 150 54 150 M38 158 Q48 166 58 164',os,2);
   const pecho={plumitas:[[86,140],[114,140],[100,154],[86,168],[114,168]].map(([x,y])=>L(`M${x-6} ${y} Q${x} ${y+6} ${x+6} ${y}`,os,2.2)).join(''),
     puntos:[[86,140],[114,140],[100,154],[86,168],[114,168],[100,180]].map(([x,y])=>D(x,y,3,os)).join('')}[o.pecho]||'';
   const pie=['M76 190 l-6 6','M82 192 v7','M88 190 l6 6'].map(d=>L(d,'#E89B5A',4.5)).join('');
   return {
    fondo: pen+espejo(pen),
    cuerpo: P('M100 26 C152 26 168 70 166 120 C164 170 138 192 100 192 C62 192 36 170 34 120 C32 70 48 26 100 26Z',pe)+E(100,152,32,34,pz)+pecho+ala+espejo(ala)
      +C(76,82,28,o.cara)+C(124,82,28,o.cara)+P('M92 98 L108 98 L100 114Z','#F6B27C')+pie+espejo(pie),
    cara: cara({xl:76,xr:124,ey:82,r:8,boca:false,mx:100,my:116,mejillas:[[62,100],[138,100]]}),
    anc:{cabeza:[100,30,.85],ojos:[100,82,1.35],cuello:[100,120,.75],mano:[152,150,.8],espalda:[100,130,.8]}
   };
  }
 },
 cotorra:{
  rasgos:{
   plumas:['Plumas',[['#7DCB86','Verde (cotorra de la Española)'],['#8DBDE6','Azul'],['#F29A8E','Roja'],['#F6D36F','Amarilla']]],
   alas:['Puntas de las alas',[['#6FA3CB','Azules'],['#F29A8E','Rojas'],['#F6D36F','Amarillas'],['#7DCB86','Verdes']]],
   frente:['Frente',[['blanca','Blanca'],['igual','Como las plumas']]],
   garganta:['Garganta',[['rosada','Rosada'],['igual','Como las plumas']]]
  },
  dibujo(o){
   const pe=o.plumas, al=o.alas;
   const ala=P('M44 98 C28 130 38 168 70 180 C70 150 64 118 44 98Z',shade(pe,-.12))+P('M44 146 C46 164 56 176 70 180 C70 166 68 152 64 140Z',al);
   const pie=E(84,188,10,6,'#B4B0BE')+E(116,188,10,6,'#B4B0BE');
   return {
    fondo: P('M88 166 L86 202 L100 196 L114 202 L112 166Z',al),
    cuerpo: P('M100 32 C144 32 162 64 160 104 C158 150 136 184 100 184 C64 184 42 150 40 104 C38 64 56 32 100 32Z',pe)+E(100,146,30,34,shade(pe,.35))
      +ala+espejo(ala)+(o.frente==='blanca'?P('M84 78 Q100 58 116 78 Q100 74 84 78Z','#FFFFFF'):'')+(o.garganta==='rosada'?E(100,118,20,10,'#F5B8D0'):'')
      +C(72,78,11,'#FFFFFF')+C(128,78,11,'#FFFFFF')
      +P('M84 84 Q100 70 116 84 Q114 104 100 114 Q102 100 84 84Z','#EDE3D2')+L('M94 96 Q100 102 106 96',ln('#EDE3D2'),2)+pie,
    cara: cara({xl:72,xr:128,ey:78,r:6,boca:false,mx:100,my:110,mejillas:[[60,96],[140,96]]}),
    anc:{cabeza:[100,36,.8],ojos:[100,78,1.55],cuello:[100,116,.7],mano:[156,140,.8],espalda:[100,130,.8]}
   };
  }
 },
 abeja:{
  rasgos:{
   cuerpo:['Cuerpo',[['#F7D35E','Amarillo'],['#F6C34A','Dorado'],['#F6B27C','Anaranjado']]],
   rayas:['Rayas',[['#6B5A66','Oscuras'],['#9A7B6A','Cafés']]],
   forma:['Forma',[['abeja','Abeja'],['abejorro','Abejorro (peludito)']]],
   alas:['Alas',[['#EAF4FB','Claras'],['#DCE6FA','Azuladas']]]
  },
  dibujo(o){
   const cu=o.cuerpo, ra=o.rayas, ab=o.forma==='abejorro';
   const alas=E(56,74,32,20,o.alas,-28)+E(64,104,22,14,o.alas,-12);
   const [ry,rx]=ab?[44,50]:[46,42];
   const ELI=`M${100-rx} 144 a${rx} ${ry} 0 1 0 ${2*rx} 0 a${rx} ${ry} 0 1 0 ${-2*rx} 0Z`;
   const panza=E(100,144,rx,ry,cu)+recorte(ELI,L(`M${100-rx-6} 128 Q100 142 ${100+rx+6} 128 M${100-rx-6} 158 Q100 172 ${100+rx+6} 158`,ra,11))
     +`<path d="${ELI}" fill="none" ${sk(cu)}/>`;
   const pelo=ab?Array.from({length:12},(_,i)=>{ const a=(i/12)*Math.PI*2; return D(+(100+rx*Math.cos(a)).toFixed(1),+(144+ry*Math.sin(a)).toFixed(1),5,cu); }).join(''):'';
   return {
    fondo: alas+espejo(alas)+P('M92 186 L100 202 L108 186Z',ra),
    cuerpo: pelo+panza+L('M80 172 l-6 14 M120 172 l6 14',ra,3.4)+L('M64 126 Q54 134 56 144 M136 126 Q146 134 144 144',ra,3.4)
      +L('M86 50 Q78 26 66 18 M114 50 Q122 26 134 18',ra,3)+C(66,18,6,ra)+C(134,18,6,ra)+C(100,80,40,cu),
    cara: cara({xl:84,xr:116,ey:80,r:6.5,mx:100,my:96,mw:7,mejillas:[[72,94],[128,94]]}),
    anc:{cabeza:[100,44,.65],ojos:[100,80,.95],cuello:[100,118,.55],mano:[148,144,.75],espalda:[100,130,.7]}
   };
  }
 },
 delfin:{
  rasgos:{
   piel:['Piel',[['#8EC5EA','Azul'],['#B4B9C8','Gris'],['#F3B3C6','Rosada (delfín del Amazonas)'],['#7FA6D6','Azul oscuro']]],
   panza:['Panza',[['#FFFFFF','Blanca'],['#FFF3E2','Crema']]],
   manchas:['Manchas',[['no','Sin manchas'],['pecas','Pecas (delfín moteado)']]]
  },
  dibujo(o){
   const pe=o.piel, pz=o.panza, os=shade(pe,-.25);
   const aleta=P('M50 118 Q20 128 22 156 Q44 150 60 136Z',shade(pe,-.08));
   const CUE='M100 22 C142 22 158 58 156 102 C154 150 132 180 100 188 C68 180 46 150 44 102 C42 58 58 22 100 22Z';
   const pecas=o.manchas==='pecas'?[[66,56],[80,44],[130,50],[140,68],[58,140],[146,136],[70,160],[132,160]].map(([x,y])=>D(x,y,3,os)).join(''):'';
   return {
    fondo: P('M128 40 Q152 12 162 26 Q156 42 144 54Z',pe)+P('M100 176 Q70 182 58 204 Q84 204 100 192 Q116 204 142 204 Q130 182 100 176Z',pe),
    cuerpo: aleta+espejo(aleta)+P(CUE,pe)
      +recorte(CUE,`<path d="M60 150 Q100 118 140 150 L140 200 L60 200Z" fill="${pz}"/>`)+`<path d="${CUE}" fill="none" ${sk(pe)}/>`+pecas+L('M94 34 Q100 30 106 34',os,2.4)
      +E(100,106,28,15,shade(pe,.4)),
    cara: cara({xl:76,xr:124,ey:82,r:6.5,mx:100,my:106,mw:12,tipo:'u',mejillas:[[64,98],[136,98]]}),
    anc:{cabeza:[100,26,.85],ojos:[100,82,1.2],cuello:[100,126,.7],mano:[150,140,.8],espalda:[100,130,.8]}
   };
  }
 },
 pulpo:{
  rasgos:{
   color:['Color',[['#F3A6C3','Rosado'],['#F29A8E','Coral'],['#C9B8EE','Morado'],['#F6B27C','Naranja'],['#8DBDE6','Azul']]],
   manchas:['Manchas',[['no','Sin manchas'],['puntos','Puntos'],['anillos','Anillos (pulpo de anillos)']]],
   ventosas:['Ventosas',[['#FFF3E2','Crema'],['#FFFFFF','Blancas'],['#F5B8D0','Rosadas']]]
  },
  dibujo(o){
   const c=o.color, os=shade(c,-.25), ve=o.ventosas;
   /* tentáculos de afuera hacia adentro: cada uno se dibuja entero (contorno y relleno) antes del siguiente */
   const uno=(d,pts)=>L(d,ln(c),19.4)+L(d,c,17)+pts.map(([x,y])=>D(x,y,3.2,ve)).join('');
   const T1=['M56 132 Q28 158 32 180 Q36 196 52 190',[[36,168],[38,182]]], T2=['M74 146 Q62 176 70 192 Q78 200 88 192',[[66,172],[72,186]]];
   const ten=uno(...T1)+espejo(uno(...T1))+uno(...T2)+espejo(uno(...T2))+uno('M100 150 Q96 178 104 196',[[98,172],[101,186]]);
   const man={puntos:[[72,44,6],[118,36,5],[136,64,7],[60,74,5],[100,58,4]].map(([x,y,r])=>D(x,y,r,os)).join(''),
     anillos:[[72,46],[120,40],[138,70],[60,76]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="6" fill="none" stroke="#6FA3CB" stroke-width="3"/>`).join('')}[o.manchas]||'';
   return {
    fondo: ten,
    cuerpo: P('M100 18 C148 18 168 56 164 98 C160 134 138 154 100 154 C62 154 40 134 36 98 C32 56 52 18 100 18Z',c)+man,
    cara: cara({xl:76,xr:124,ey:102,r:7,mx:100,my:120,mw:7,mejillas:[[62,118],[138,118]]}),
    anc:{cabeza:[100,22,.95],ojos:[100,102,1.2],cuello:[100,148,.8],mano:[160,166,.8],espalda:[100,120,.8]}
   };
  }
 }
};
const defRasgos=sp=>Object.fromEntries(Object.entries((ESPECIES[sp]||{}).rasgos||{}).map(([k,[,l]])=>[k,l[0][0]]));

/* ---------- accesorios en los anclajes de cada especie ---------- */
const BASE={cabeza:[100,56],cuello:[100,150],mano:[166,140],espalda:[100,120]}, SLOT={hat:'cabeza',neck:'cuello',hand:'mano',back:'espalda'};
function accesorio(s,k,anc){
  if (typeof ACC==='undefined' || !k || !ACC[k]) return '';
  const ex=18, ey=100;
  const svg=ACC[k][3].replace(/\{EL\}/g,100-ex).replace(/\{ER\}/g,100+ex).replace(/\{EY\}/g,ey).replace(/\{EL0\}/g,100-ex-15).replace(/\{ER0\}/g,100+ex-15).replace(/\{EY0\}/g,ey-10)
    .replace(/\{BL\}/g,100-ex+14).replace(/\{BW\}/g,2*ex-28).replace(/\{MX0\}/g,100-ex-22).replace(/\{MQ\}/g,ex+22).replace(/\{MW\}/g,2*ex+44).replace(/\{MQ2\}/g,ex+22);
  const [bx,by]= s==='eyes' ? [100,ey] : BASE[SLOT[s]], [x,y,e]= s==='eyes' ? anc.ojos : anc[SLOT[s]];
  return `<g transform="translate(${x} ${y}) scale(${e}) translate(${-bx} ${-by})">${svg}</g>`;
}

/* casco de buceo redondo (acuario): rodea la cabeza según el anclaje de cada especie */
function casco(anc){ const [x,y,e]=anc.cabeza, cy=+(y+56*e).toFixed(1), r=+(92*e).toFixed(1);
  return `<circle cx="${x}" cy="${cy}" r="${r}" fill="rgba(200,232,250,.32)" stroke="#8FB8D6" stroke-width="3.2"/>`
    +`<path d="M${(x-r*.72).toFixed(1)} ${(cy+r*.7).toFixed(1)} Q${x} ${(cy+r*1.08).toFixed(1)} ${(x+r*.72).toFixed(1)} ${(cy+r*.7).toFixed(1)}" fill="none" stroke="#B4B9C8" stroke-width="${(7*e+2).toFixed(1)}" stroke-linecap="round"/>`; }
creature=function(sp,o={}){
  const E=ESPECIES[sp]; if(!E) return viejo ? viejo(sp,o) : '';
  const r={...defRasgos(sp),...(o.rasgos||{})};
  /* el color elegido antes en «Mi amigo» sigue valiendo como color principal */
  const k0=Object.keys(E.rasgos)[0];
  if (o.color && !(o.rasgos||{})[k0] && E.rasgos[k0][1].some(([v])=>v===o.color)) r[k0]=o.color;
  const d=E.dibujo(r), out=o.outfit||{}, a=s=>accesorio(s,out[s],d.anc);
  /* aura de los niveles altos: dorada (5-6), verde jardín (7-8), azul cielo (9) y lila (10) */
  const lv=o.level||1, aura=lv>=5?`<circle cx="100" cy="118" r="92" fill="${lv>=10?'#EFE8FB':lv>=9?'#DDEFF6':lv>=7?'#E6F4DD':'#FBF1C8'}"/>`:'';
  return `<svg viewBox="-12 -12 224 224" class="crt" aria-hidden="true" focusable="false">${aura}${a('back')}${d.fondo}${d.cuerpo}${d.cara}${a('neck')}${a('eyes')}${a('hat')}${a('hand')}${o.casco?casco(d.anc):''}</svg>`;
};
Object.assign(window,{ESPECIES,defRasgos});

/* ---------- datos del perfil y pestaña «Cómo es» de «Mi amigo» ---------- */
if (typeof petOf==='function'){ const _petOf=petOf; petOf=function(p){ return {..._petOf(p), rasgos:p.rasgos||null}; }; }
if (typeof vFriend==='function'){
  const _vFriend=vFriend;
  vFriend=function(){
    _vFriend();
    const p=prof(); if(!p) return;
    const t=app.querySelector('[data-tab="color"]');
    if ((view.tab||'ropa')!=='color') return;
    const sp=SPECIES[p.avatar]||'leon', E=ESPECIES[sp], caja=t&&t.parentElement.nextElementSibling;
    if (!E || !caja) return;
    const o=petOf(p), r={...defRasgos(sp),...(p.rasgos||{})};
    if (p.color && !(p.rasgos||{})[Object.keys(E.rasgos)[0]] && E.rasgos[Object.keys(E.rasgos)[0]][1].some(([v])=>v===p.color)) r[Object.keys(E.rasgos)[0]]=p.color;
    caja.innerHTML=`<p class="muted" style="font-weight:700">Así es ${mname(p.avatar)}. Todo lo que eliges existe en la naturaleza.</p>`+
      Object.entries(E.rasgos).map(([k,[nombre,l]])=>`<h3 class="mp-h">${nombre}</h3><div class="mp-grid">${l.map(([v,nm])=>{ const on=r[k]===v;
        return `<button class="mp-op ${on?'on':''}" data-ras="${k}" data-v="${v}" aria-pressed="${on}" aria-label="${nm}"><span class="mp-dib cab">${creature(sp,{...o,color:null,rasgos:{...r,[k]:v},outfit:{},level:1})}</span><small>${nm}</small></button>`; }).join('')}</div>`).join('');
    caja.querySelectorAll('[data-ras]').forEach(el=>el.addEventListener('click',()=>{
      p.rasgos={...r,[el.dataset.ras]:el.dataset.v}; p.color=null; save(); popS();
      const y=window.scrollY; render(); window.scrollTo(0,y);
      setTimeout(()=>{ react('happy'); if(Math.random()<.4) speak(pick(['¡Me encanta!','¡Así soy yo!','¡Qué bonito!'])); },60);
    }));
  };
}
})();
