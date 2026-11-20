/* Semillita · El niño o la niña del jugador (fase 1 de «personajes»)
   =========================================================
   nino(o, {solo}) dibuja un personaje caricaturesco por capas, en estilo plano
   (ayudantes de PLANO_KIT, contorno de 1,6 px en un tono más oscuro del relleno).
   - o: datos guardados en el perfil (p.nino). Lo que falte se toma de NINO_DEF.
   - solo:'cabeza' recorta el dibujo a la cabeza (tarjetas de perfil, chips).
   Las expresiones usan las mismas clases que creature() (eo, eh, es, ez, ew, et y
   mo, mh, ms, mw, mt), así react('happy'|'sad'|'surprised'|'think') funciona igual.
   NINO_OPC lista las opciones con su nombre en español y el nivel que las abre
   (piel, cara y pelo siempre libres: son la identidad del niño).
   Se carga después de 14-plano-mundo.js (necesita PLANO_KIT).
   ========================================================= */
(function(){
const I='#3C3848', LINEA='#4A4658';
const NINO_OPC={
  piel:[['p1','Muy clara','#FDE6D4'],['p2','Clara','#F8D3B4'],['p3','Trigueña clara','#EDBC90'],['p4','Trigueña','#DDA370'],
        ['p5','Canela','#C98D5C'],['p6','Morena','#AC7148'],['p7','Morena oscura','#8C5838'],['p8','Oscura','#6E432A']],
  cara:[['redonda','Redonda'],['ovalada','Ovalada'],['cuadrada','Cuadrada']],
  ojos:[['puntos','Puntitos'],['grandes','Grandes'],['pestanas','Con pestañas'],['almendra','Almendra']],
  colOjos:[['#6B4A35','Café'],['#3E3540','Negro'],['#6FA3CB','Azul'],['#7FB07A','Verde'],['#B08A4A','Miel']],
  cejas:[['finas','Finas'],['gruesas','Gruesas'],['arqueadas','Arqueadas'],['ninguna','Sin cejas']],
  nariz:[['punto','Puntito'],['boton','Botón'],['curva','Curvita']],
  expr:[['feliz','Feliz'],['tranquilo','Tranquilo'],['risa','Risa'],['guino','Guiño'],['picaro','Pícaro']],
  pelo:[['corto','Corto'],['rapado','Rapado'],['rizos','Rizos'],['afro','Afro'],['liso','Largo liso'],['largo_rizo','Largo rizado'],
        ['cola','Cola'],['dos_colas','Dos colitas'],['trenzas','Trenzas'],['monos','Dos moños'],['mono','Moño']],
  colPelo:[['#3E3540','Negro'],['#5B3E31','Castaño oscuro'],['#8A5A3C','Castaño'],['#E3BB6C','Rubio'],['#C8643C','Pelirrojo'],
           ['#F5B8D0','Rosado'],['#8DBDE6','Azul'],['#C9B8EE','Morado'],['#A3D69B','Verde']],
  /* ropa: [id, nombre, nivel] */
  camisa:[['camiseta','Camiseta',1],['rayas','Rayas',1],['uniforme','Uniforme escolar',1],['polo','Polo',2],['sueter','Suéter',2],
          ['jersey','Camiseta de pelota',3],['estrella','Estrella',3],['vestido','Vestido',1]],
  abajo:[['pantalon','Pantalón',1],['short','Pantaloncito',1],['falda','Falda',1]],
  zapatos:[['tenis','Tenis',1],['escolares','Escolares',1],['sandalias','Sandalias',2],['chancletas','Chancletas',2],['botas','Botas',3]],
  colRopa:['#F4A6A6','#F7C59F','#F6D36F','#B9E3C6','#7FC08E','#A9D3F0','#8DBDE6','#C9B8EE','#F5B8D0','#FFFFFF','#D9DDE6','#6E7FB0','#C29A7C','#5A5266'],
  /* accesorios: ranura → [id, nombre, nivel] */
  acc:{
    cabeza:[['gorra','Gorra',1],['lazo','Lazo',1],['diadema','Diadema',1],['gorro','Gorro de lana',2],['sombrero','Sombrero',3],['flores','Corona de flores',4]],
    cara:[['gafas','Gafas',1],['curita','Curita',1],['gafas_sol','Gafas de sol',3],['gafas_estrella','Gafas de estrella',4]],
    cuello:[['corbatin','Corbatín',1],['bufanda','Bufanda',2],['collar','Collar',3],['medalla','Medalla',5]],
    mano:[['globo','Globo',1],['libro','Libro',1],['pelota','Pelota de béisbol',2],['flor','Flor',3]],
    espalda:[['mochila','Mochila',1],['capa','Capa',3],['alas','Alas',4]]
  }
};
const NINO_DEF={piel:'p3',cara:'redonda',ojos:'puntos',colOjos:'#6B4A35',cejas:'finas',nariz:'punto',expr:'feliz',mejillas:true,pecas:false,
  pelo:'corto',colPelo:'#3E3540',camisa:'camiseta',colCamisa:'#A9D3F0',abajo:'pantalon',colAbajo:'#6E7FB0',zapatos:'tenis',colZapatos:'#F4A6A6',
  acc:{cabeza:null,cara:null,cuello:null,mano:null,espalda:null}};
const PIEL=Object.fromEntries(NINO_OPC.piel.map(([k,,c])=>[k,c]));

function nino(datos={}, {solo=''}={}){
  const {P,C,E,R,F,D,L,Lo,o:oc,sk,estrella,petalos}=PLANO_KIT;
  const o={...NINO_DEF,...datos, acc:{...NINO_DEF.acc,...(datos.acc||{})}};
  const piel=PIEL[o.piel]||o.piel||PIEL.p3, pielO=shade(piel,-.12), cp=o.colPelo, cc=o.colCamisa, ca=o.colAbajo, cz=o.colZapatos;
  const ex=20, ey=98, my=126, G=(cl,b)=>`<g class="${cl}">${b}</g>`, espejo=b=>`<g transform="translate(200 0) scale(-1 1)">${b}</g>`;

  /* ---------- pelo: lo de atrás y lo de adelante ---------- */
  const FR={
    base:'M44 100 C38 46 68 30 100 30 C132 30 162 46 156 100 C152 80 146 68 138 62 C128 70 112 70 100 62 C88 70 72 70 62 62 C54 68 48 80 44 100Z',
    lado:'M44 102 C38 44 70 30 100 30 C134 30 162 46 156 102 C152 80 148 68 140 60 C120 66 96 58 78 48 C70 62 54 70 44 102Z',
    corto:'M46 92 C42 44 70 32 100 32 C130 32 158 44 154 92 C150 72 144 62 136 58 C124 64 108 62 100 56 C92 62 76 64 64 58 C56 62 50 72 46 92Z',
    rapado:'M48 80 C48 44 72 36 100 36 C128 36 152 44 152 80 C146 60 128 52 100 52 C72 52 54 60 48 80Z',
    liso:'M44 96 C40 42 70 32 100 32 C130 32 160 42 156 96 C150 66 130 50 100 50 C70 50 50 66 44 96Z'
  };
  const arco=(cx,cy,rad,a0,a1,n,r,c)=>Array.from({length:n},(_,i)=>{ const a=(a0+(a1-a0)*i/(n-1))*Math.PI/180; return C(+(cx+rad*Math.cos(a)).toFixed(1),+(cy+rad*Math.sin(a)).toFixed(1),r,c); }).join('');
  const LARGO='M42 96 C36 34 70 26 100 26 C130 26 164 34 158 96 L162 176 Q130 186 100 184 Q70 186 38 176Z';
  const liga=(x,y)=>C(x,y,4.5,'#F4A6A6');
  let atras='', adelante='';
  switch(o.pelo){
    case 'rapado': adelante=P(FR.rapado,cp); break;
    case 'rizos': adelante=P(FR.rapado,cp)+arco(100,92,54,192,348,9,13,cp)+arco(100,90,40,212,328,5,11,cp); break;
    case 'afro': atras=D(100,80,66,cp)+arco(100,80,64,0,337.5,16,22,cp)+D(100,80,60,cp);
      adelante=arco(100,94,50,200,340,8,12,cp); break;
    case 'liso': atras=P(LARGO,cp); adelante=P(FR.lado,cp); break;
    case 'largo_rizo': atras=P(LARGO,cp)+[44,62,81,100,119,138,156].map(x=>C(x,178+(x===100?4:0),12,cp)).join('')+[110,130,150].map(y=>C(38,y,12,cp)+C(162,y,12,cp)).join('');
      adelante=P(FR.rapado,cp)+arco(100,92,54,192,348,9,13,cp); break;
    case 'cola': atras=P('M138 48 Q188 36 184 94 Q180 124 166 132 Q172 94 148 70Z',cp)+liga(146,52); adelante=P(FR.base,cp); break;
    case 'dos_colas': atras=E(34,104,15,27,cp,-18)+E(166,104,15,27,cp,18)+liga(46,82)+liga(154,82); adelante=P(FR.base,cp); break;
    case 'trenzas': atras=[-1,1].map(s=>{ const x=100+s*60; return [112,126,140,154,168].map(y=>E(x,y,10,8.5,cp)).join('')+liga(x,180)+P(`M${x-6} 184 L${x} 198 L${x+6} 184Z`,cp); }).join('');
      adelante=P(FR.base,cp); break;
    case 'monos': atras=C(56,44,18,cp)+C(144,44,18,cp); adelante=P(FR.liso,cp); break;
    case 'mono': atras=C(100,24,20,cp)+R(90,38,20,8,4,'#F4A6A6'); adelante=P(FR.liso,cp); break;
    default: adelante=P(FR.corto,cp);
  }
  if (o.camisa==='sueter') atras=P('M60 168 Q58 136 100 134 Q142 136 140 168Z',shade(cc,-.1))+atras;

  /* ---------- cuerpo ---------- */
  const T='M62 170 Q64 154 84 152 H116 Q136 154 138 170 L142 228 Q142 234 136 234 H64 Q58 234 58 228Z';
  const VEST='M70 168 Q72 154 86 152 H114 Q128 154 130 168 L150 252 Q150 258 144 258 H56 Q50 258 50 252Z';
  const vestido=o.camisa==='vestido', manga=o.camisa==='sueter'?'larga':'corta';
  const brazo=s=>{ const d='M66 164 Q54 186 50 214', b=Lo(d,manga==='larga'?cc:piel,15)+(manga==='corta'?Lo('M66 164 Q60 176 57 186',cc,19):'')+C(49,220,9,piel); return s>0?espejo(b):b; };
  /* piernas y ropa de abajo */
  let piernas=R(76,226,20,54,8,piel)+R(104,226,20,54,8,piel);
  if (!vestido){
    if (o.abajo==='pantalon') piernas+=P('M60 224 H140 L136 280 H106 L102 248 H98 L94 280 H64Z',ca);
    else if (o.abajo==='short') piernas+=P('M60 224 H140 L138 256 H104 L100 242 L96 256 H62Z',ca)+L('M100 228 V242',shade(ca,-.2),1.6);
    else piernas+=P('M62 222 H138 L152 262 Q100 270 48 262Z',ca)+L('M80 230 L74 262 M100 230 V266 M120 230 L126 262',shade(ca,-.18),1.6);
  }
  /* zapatos (el derecho es el espejo del izquierdo) */
  const pie={
    tenis: P('M68 286 Q66 272 82 272 Q96 272 98 282 Q98 290 90 290 H72 Q68 290 68 286Z',cz)+L('M70 287 H96','#FFFFFF',2.6)+L('M80 276 l6 2 M82 281 l6 1',shade(cz,-.25),1.6),
    escolares: P('M68 286 Q66 274 82 274 Q96 274 98 283 Q98 290 90 290 H72 Q68 290 68 286Z',cz)+L('M76 278 Q84 276 90 280',shade(cz,.4),1.6),
    sandalias: E(84,282,13,8,piel)+L('M73 282 H95 M78 276 L84 286 L90 276',cz,3.6)+P('M68 288 Q68 284 74 284 H96 Q100 284 100 288 Q100 291 96 291 H72 Q68 291 68 288Z',shade(cz,-.08)),
    chancletas: E(84,280,12,8,piel)+P('M66 288 Q66 283 74 283 H96 Q101 283 101 288 Q101 292 96 292 H72 Q66 292 66 288Z',cz)+L('M86 274 L78 284 M86 274 L94 284','#FFFFFF',2.6),
    botas: P('M72 256 H96 V282 Q98 290 90 290 H70 Q66 290 66 284 Q66 276 72 274Z',cz)+L('M72 262 H96',shade(cz,-.2),1.8)
  }[o.zapatos]||'';
  /* camisa */
  const rayas=c=>[176,190,204,218].map(y=>L(`M61 ${y} H139`,shade(c,.55),5)).join('')+`<path d="${T}" fill="none" ${sk(c)}/>`;
  const cuelloCamisa=c=>P('M86 152 L100 164 L92 170 L80 156Z','#FFFFFF')+P('M114 152 L100 164 L108 170 L120 156Z','#FFFFFF');
  let torso='';
  switch(o.camisa){
    case 'rayas': torso=P(T,cc)+rayas(cc); break;
    case 'polo': torso=P(T,cc)+cuelloCamisa()+D(100,176,2.4,shade(cc,-.3))+D(100,186,2.4,shade(cc,-.3)); break;
    case 'uniforme': torso=P(T,cc)+cuelloCamisa()+R(112,180,14,14,3,shade(cc,-.06))+[178,194,210,224].map(y=>D(100,y,2.2,shade(cc,-.3))).join('')+L('M100 166 V232',shade(cc,-.16),1.4); break;
    case 'sueter': torso=P(T,cc)+P('M78 200 H122 L126 226 H74Z',shade(cc,-.08))+L('M92 156 V176 M108 156 V176','#FFFFFF',2.2); break;
    case 'jersey': torso=P(T,cc)+L('M86 154 L100 170 L114 154',shade(cc,-.3),3)+L('M100 170 V232',shade(cc,-.22),1.6)+D(104,184,2,shade(cc,-.3))+D(104,200,2,shade(cc,-.3))+`<text x="122" y="210" text-anchor="middle" font-family="Nunito,sans-serif" font-weight="900" font-size="20" fill="${shade(cc,-.35)}">7</text>`; break;
    case 'estrella': torso=P(T,cc)+L('M88 153 Q100 162 112 153',shade(cc,-.2),2)+estrella(100,194,15,7,'#F6D36F'); break;
    case 'vestido': torso=P(VEST,cc)+L('M66 196 H134',shade(cc,-.18),2.4)+[[80,220],[110,214],[96,238],[124,240],[70,244]].map(([x,y])=>D(x,y,3,shade(cc,.55))).join(''); break;
    default: torso=P(T,cc)+L('M88 153 Q100 162 112 153',shade(cc,-.2),2);
  }

  /* ---------- cabeza ---------- */
  const CARA={redonda:'M100 38 C134 38 156 62 156 94 C156 126 132 148 100 148 C68 148 44 126 44 94 C44 62 66 38 100 38Z',
    ovalada:'M100 36 C134 36 154 60 154 90 C154 124 130 150 100 150 C70 150 46 124 46 90 C46 60 66 36 100 36Z',
    cuadrada:'M62 40 H138 Q156 40 156 60 V112 Q156 146 100 146 Q44 146 44 112 V60 Q44 40 62 40Z'}[o.cara]||'';
  const orejas=E(45,100,10,13,piel)+E(155,100,10,13,piel)+D(46,100,4,pielO)+D(154,100,4,pielO);
  const ojo=(x,s)=>({
    grandes: E(x,ey,10,11,'#FFFFFF')+D(x,ey+1,6.5,o.colOjos)+D(x,ey+1,3.2,I),
    pestanas:`<ellipse cx="${x}" cy="${ey}" rx="6" ry="7.5" fill="${I}"/>`+L(`M${x+s*5} ${ey-6} l${s*4} -4 M${x+s*7} ${ey-2} l${s*5} -2`,I,2.2),
    almendra:F(`M${x-9} ${ey+1} Q${x} ${ey-9} ${x+9} ${ey+1} Q${x} ${ey+8} ${x-9} ${ey+1}Z`,I),
  }[o.ojos]||`<ellipse cx="${x}" cy="${ey}" rx="6" ry="7.5" fill="${I}"/>`);
  const arcoOjo=(x,w=3.6)=>L(`M${x-8} ${ey+2} Q${x} ${ey-7} ${x+8} ${ey+2}`,I,w);
  const xl=100-ex, xr=100+ex;
  const ojos = G('eo',`<g class="blink">${ojo(xl,-1)}${o.expr==='guino'?'':ojo(xr,1)}</g>${o.expr==='guino'?arcoOjo(xr):''}`)
    + G('eh',arcoOjo(xl)+arcoOjo(xr))
    + G('es',L(`M${xl-8} ${ey-2} Q${xl} ${ey+6} ${xl+8} ${ey-2} M${xr-8} ${ey-2} Q${xr} ${ey+6} ${xr+8} ${ey-2}`,I,3.6)+L(`M${xl-10} ${ey-16} l14 5 M${xr+10} ${ey-16} l-14 5`,I,3))
    + G('ez',L(`M${xl-8} ${ey} h16 M${xr-8} ${ey} h16`,I,3.6))
    + G('ew',E(xl,ey,10,11,'#FFFFFF')+E(xr,ey,10,11,'#FFFFFF')+D(xl,ey,5,I)+D(xr,ey,5,I))
    + G('et',D(xl-2,ey-3,6.5,I)+D(xr-2,ey-3,6.5,I)+L(`M${xr-9} ${ey-19} l16 -5`,I,3));
  const ccj=shade(cp,-.12), cejas={finas:L(`M${xl-8} ${ey-15} Q${xl} ${ey-19} ${xl+8} ${ey-15} M${xr-8} ${ey-15} Q${xr} ${ey-19} ${xr+8} ${ey-15}`,ccj,2.6),
    gruesas:L(`M${xl-9} ${ey-15} Q${xl} ${ey-19} ${xl+9} ${ey-16} M${xr-9} ${ey-16} Q${xr} ${ey-19} ${xr+9} ${ey-15}`,ccj,5),
    arqueadas:L(`M${xl-9} ${ey-14} Q${xl} ${ey-24} ${xl+9} ${ey-16} M${xr-9} ${ey-16} Q${xr} ${ey-24} ${xr+9} ${ey-14}`,ccj,3)}[o.cejas]||'';
  const nariz={boton:C(100,112,4.5,piel), curva:L('M98 106 Q104 112 98 115',pielO,2.4)}[o.nariz]||`<ellipse cx="100" cy="112" rx="3.6" ry="2.8" fill="${shade(piel,-.2)}"/>`;
  const bocaAbierta=`<path d="M88 ${my-2} Q100 ${my+18} 112 ${my-2}Z" fill="#E86A7A" stroke="${I}" stroke-width="3" stroke-linejoin="round"/>`;
  const mo={tranquilo:L(`M94 ${my+1} Q100 ${my+5} 106 ${my+1}`,I,3),
    risa:bocaAbierta+F(`M94 ${my+6} Q100 ${my+3} 106 ${my+6} Q100 ${my+11} 94 ${my+6}Z`,'#F6A3B0'),
    picaro:L(`M90 ${my} Q100 ${my+9} 110 ${my}`,I,3.2)+`<ellipse cx="104" cy="${my+7}" rx="4.5" ry="5" fill="#F28C9B" stroke="${I}" stroke-width="2"/>`}[o.expr]||L(`M90 ${my} Q100 ${my+9} 110 ${my}`,I,3.2);
  const bocas=G('mo',mo)+G('mh',bocaAbierta)+G('ms',L(`M91 ${my+6} Q100 ${my-3} 109 ${my+6}`,I,3.2))
    +G('mw',`<ellipse cx="100" cy="${my+3}" rx="6" ry="7.5" fill="#E86A7A" stroke="${I}" stroke-width="3"/>`)+G('mt',L(`M93 ${my+3} Q100 ${my+1} 107 ${my+4}`,I,3.2));
  const mejillas=o.mejillas?`<ellipse cx="68" cy="116" rx="9" ry="5.5" fill="#F7A9B6" opacity=".7"/><ellipse cx="132" cy="116" rx="9" ry="5.5" fill="#F7A9B6" opacity=".7"/>`:'';
  const pecas=o.pecas?[[70,108],[76,113],[64,113],[130,108],[124,113],[136,113]].map(([x,y])=>D(x,y,1.6,shade(piel,-.3))).join(''):'';

  /* ---------- accesorios ---------- */
  const A=o.acc, ac={
    gorra:()=>P('M42 80 C42 40 68 26 100 26 C132 26 158 40 158 80 Q100 66 42 80Z','#F4A6A6')+P('M40 80 Q100 64 160 80 Q166 86 160 90 Q100 76 40 90 Q34 86 40 80Z',shade('#F4A6A6',-.12))+D(100,27,4,shade('#F4A6A6',-.2)),
    gorro:()=>P('M44 78 C44 36 70 24 100 24 C130 24 156 36 156 78Z','#C9B8EE')+R(40,68,120,16,8,shade('#C9B8EE',-.1))+L('M60 76 V68 M80 76 V68 M100 76 V68 M120 76 V68 M140 76 V68',shade('#C9B8EE',-.25),1.4)+C(100,20,9,'#FFFFFF'),
    sombrero:()=>E(100,62,80,13,'#E6C39C')+P('M64 62 Q64 22 100 22 Q136 22 136 62Z','#E6C39C')+R(64,46,72,9,2,'#F4A6A6'),
    lazo:()=>P('M136 46 L116 33 Q111 46 116 59Z','#F5B8D0')+P('M136 46 L156 33 Q161 46 156 59Z','#F5B8D0')+C(136,46,6,shade('#F5B8D0',-.1)),
    diadema:()=>Lo('M50 74 Q56 32 100 30 Q144 32 150 74','#F6D36F',6),
    flores:()=>[200,225,250,270,290,315,340].map((a,i)=>{ const r=a*Math.PI/180, x=+(100+56*Math.cos(r)).toFixed(1), y=+(88+50*Math.sin(r)).toFixed(1), c=['#F5B8D0','#F6D36F','#FFFFFF','#C9B8EE'][i%4];
      return petalos(x,y,5,4.6,3.8,4.4,c)+D(x,y,2.6,'#F6B27C'); }).join(''),
    gafas:()=>`<g fill="rgba(255,255,255,.3)" stroke="${LINEA}" stroke-width="3"><circle cx="${xl}" cy="${ey}" r="14"/><circle cx="${xr}" cy="${ey}" r="14"/></g>`+L(`M${xl+14} ${ey} H${xr-14}`,LINEA,3),
    gafas_sol:()=>R(xl-15,ey-9,30,19,8,'#4A4658')+R(xr-15,ey-9,30,19,8,'#4A4658')+L(`M${xl+15} ${ey-2} H${xr-15}`,LINEA,3.4),
    gafas_estrella:()=>estrella(xl,ey,17,9,'#F5B8D0')+estrella(xr,ey,17,9,'#F5B8D0')+D(xl,ey,5,I)+D(xr,ey,5,I)+L(`M${xl+12} ${ey-2} H${xr-12}`,LINEA,3),
    curita:()=>`<g transform="rotate(-25 134 118)">${R(120,113,28,10,5,'#F4D3A8')}${R(129,113,10,10,2,shade('#F4D3A8',-.08))}</g>`,
    corbatin:()=>P('M100 160 L82 150 L82 170Z','#F29A8E')+P('M100 160 L118 150 L118 170Z','#F29A8E')+C(100,160,5,shade('#F29A8E',-.1)),
    bufanda:()=>P('M70 150 Q100 166 130 150 L132 162 Q100 178 68 162Z','#7FC08E')+R(112,160,14,30,5,shade('#7FC08E',-.08)),
    collar:()=>Array.from({length:9},(_,i)=>{ const a=(20+i*17.5)*Math.PI/180; return C(+(100+22*Math.cos(a)).toFixed(1),+(150+14*Math.sin(a)).toFixed(1),4,i%2?'#F5B8D0':'#FFFFFF'); }).join(''),
    medalla:()=>L('M88 152 L100 176 L112 152','#8DBDE6',7)+C(100,182,11,'#F6D36F')+estrella(100,182,6.5,3,shade('#F6D36F',-.12)),
    globo:()=>L('M151 214 Q160 180 166 150','#B4B9C8',1.6)+E(168,126,18,22,'#F4A6A6')+P('M164 148 l4 5 l4 -5Z','#F4A6A6'),
    libro:()=>R(140,206,26,32,3,'#8DBDE6')+R(143,209,20,26,2,'#FFFFFF')+C(151,220,9,piel),
    pelota:()=>C(160,212,11,'#FFFFFF')+L('M152 204 Q157 212 152 220 M168 204 Q163 212 168 220','#F29A8E',1.6)+C(151,220,9,piel),
    flor:()=>L('M152 216 Q156 188 160 172','#7FC08E',3.5)+petalos(160,166,5,6,4.8,5.6,'#F5B8D0')+D(160,166,3.4,'#F6D36F')+C(151,220,9,piel),
    mochila:()=>R(50,166,100,64,16,'#F7C59F'),
    capa:()=>P('M72 158 L38 266 Q100 278 162 266 L128 158Z','#F29A8E'),
    alas:()=>P('M66 176 Q14 140 18 196 Q30 224 66 206Z','#FFFFFF')+P('M134 176 Q186 140 182 196 Q170 224 134 206Z','#FFFFFF')
  }, pon=s=>A[s]&&ac[A[s]]?ac[A[s]]():'';
  const tirantes=A.espalda==='mochila'?L('M80 154 Q76 180 78 204 M120 154 Q124 180 122 204',shade('#F7C59F',-.2),5):'';

  const cuerpo = solo==='cabeza' ? '' : `${pon('espalda')}${brazo(-1)}${brazo(1)}${piernas}${pie}${espejo(pie)}${torso}${tirantes}${pon('cuello')}${pon('mano')}`;
  const cuello = solo==='cabeza' ? '' : R(90,138,20,20,6,pielO);
  const vb = solo==='cabeza' ? (o.pelo==='afro'?'4 -12 192 192':'22 4 156 156') : '-14 -12 228 306';
  return `<svg viewBox="${vb}" class="crt nn" aria-hidden="true" focusable="false">
    ${atras}${cuerpo}${cuello}${orejas}<path d="${CARA}" fill="${piel}" ${sk(piel)}/>
    ${mejillas}${pecas}${ojos}${cejas}${nariz}${bocas}${adelante}${pon('cara')}${pon('cabeza')}
  </svg>`;
}

/* personaje al azar (botón «Al azar» del editor y perfiles nuevos) */
function ninoAzar(nivel=1){
  const k=a=>a[Math.floor(Math.random()*a.length)], id=a=>k(a)[0], libre=a=>a.filter(x=>(x[2]||1)<=nivel);
  const r={piel:id(NINO_OPC.piel),cara:id(NINO_OPC.cara),ojos:id(NINO_OPC.ojos),colOjos:id(NINO_OPC.colOjos),cejas:id(NINO_OPC.cejas.slice(0,3)),
    nariz:id(NINO_OPC.nariz),expr:id(NINO_OPC.expr),mejillas:Math.random()<.7,pecas:Math.random()<.25,pelo:id(NINO_OPC.pelo),
    colPelo:id(Math.random()<.85?NINO_OPC.colPelo.slice(0,5):NINO_OPC.colPelo),camisa:id(libre(NINO_OPC.camisa)),colCamisa:k(NINO_OPC.colRopa),
    abajo:id(NINO_OPC.abajo),colAbajo:k(NINO_OPC.colRopa),zapatos:id(libre(NINO_OPC.zapatos)),colZapatos:k(NINO_OPC.colRopa),acc:{}};
  Object.entries(NINO_OPC.acc).forEach(([s,l])=>{ r.acc[s]=Math.random()<.3?id(libre(l)):null; });
  return r;
}
/* igual que mascot(): caja con sombra, balanceo y expresiones */
function ninoMascot(datos,size=64,id='nin',cls=''){
  return `<div class="mascot nino ${cls}" id="${id}" style="--ms:${size}px"><span class="body">${nino(datos)}</span><span class="shadow"></span></div>`;
}
Object.assign(window,{nino,ninoAzar,ninoMascot,NINO_OPC,NINO_DEF});
})();
