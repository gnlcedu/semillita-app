/* Semillita · Editor «Mi personaje» (fase 2 de «personajes»)
   =========================================================
   Vista VIEWS.miNino: el niño arma su personaje (p.nino) con pestañas
   Cara, Pelo, Ropa, Zapatos, Cosas y Gestos, y un botón «Al azar».
   Arriba se ve el personaje junto a su animalito amigo.
   - Piel, cara, pelo y gestos siempre libres; la ropa y las cosas se abren por nivel (xpLevel).
   - Al crear un perfil se llega aquí con un personaje al azar (view.nuevo).
   - En el inicio aparece el botón «Mi personaje» junto a «Mi amigo».
   Se carga después de 19-nino.js.
   ========================================================= */
(function(){
const PEST=[['cara','Cara'],['pelo','Pelo'],['ropa','Ropa'],['zapatos','Zapatos'],['cosas','Cosas'],['gestos','Gestos']];
const RANURA={cabeza:'En la cabeza',cara:'En la cara',cuello:'En el cuello',mano:'En la mano',espalda:'En la espalda'};
const FRASES=['¡Me encanta!','¡Qué bonito!','¡Así me gusta!','¡Wao!','¡Te ves genial!'];
const ninoDe=p=>({...NINO_DEF,...(p.nino||{}),acc:{...NINO_DEF.acc,...((p.nino||{}).acc||{})}});
window.ninoDe=ninoDe;

window.VIEWS = window.VIEWS || {};
window.VIEWS.miNino=function(){
  const p=prof(); if(!p) return go({name:'profiles'});
  if (!p.nino){ p.nino=ninoAzar(1); save(); }
  const n=ninoDe(p), lvl=xpLevel(p.xp||0), tab=view.tab||'cara';
  /* botones de opción: muestra el dibujo con ese cambio */
  const op=(campo,val,nombre,{nv=1,cab=false,on}={})=>{ const lock=nv>lvl, sel=on??(n[campo]===val);
    const d=campo.startsWith('acc.')?{...n,acc:{...NINO_DEF.acc,[campo.slice(4)]:val}}:{...n,[campo]:val};
    return `<button class="mp-op ${sel?'on':''}" data-c="${campo}" data-v="${val}" ${lock?`data-lock="${nv}"`:''} aria-pressed="${sel}" aria-label="${nombre}${lock?', se abre en el nivel '+nv:''}">
      <span class="mp-dib ${cab?'cab':''}" ${lock?'style="opacity:.3;filter:grayscale(1)"':''}>${nino(d,{solo:cab?'cabeza':''})}</span>
      <small>${lock?`${ilu('candado','1em')} Nivel ${nv}`:nombre}</small></button>`; };
  const colores=(campo,lista,titulo)=>`<h3 class="mp-h">${titulo}</h3><div class="mp-sw">${lista.map(x=>{ const c=Array.isArray(x)?x[2]||x[0]:x, v=Array.isArray(x)?x[0]:x, nom=Array.isArray(x)?x[1]:'';
    return `<button data-c="${campo}" data-v="${v}" class="${n[campo]===v?'on':''}" style="background:${c}" aria-label="${nom||'Color'}" aria-pressed="${n[campo]===v}"></button>`; }).join('')}</div>`;
  const grupo=(titulo,html)=>`<h3 class="mp-h">${titulo}</h3><div class="mp-grid">${html}</div>`;
  const O=NINO_OPC; let body='';
  if (tab==='cara'){
    body=colores('piel',O.piel,'Color de piel')
      +grupo('Forma de la cara',O.cara.map(([k,nm])=>op('cara',k,nm,{cab:true})).join(''))
      +grupo('Ojos',O.ojos.map(([k,nm])=>op('ojos',k,nm,{cab:true})).join(''))
      +(n.ojos==='grandes'?colores('colOjos',O.colOjos.map(([c,nm])=>[c,nm,c]),'Color de ojos'):'')
      +grupo('Cejas',O.cejas.map(([k,nm])=>op('cejas',k,nm,{cab:true})).join(''))
      +grupo('Nariz',O.nariz.map(([k,nm])=>op('nariz',k,nm,{cab:true})).join(''))
      +grupo('Detalles',op('mejillas',n.mejillas?'0':'1','Mejillas',{cab:true,on:n.mejillas})+op('pecas',n.pecas?'0':'1','Pecas',{cab:true,on:n.pecas}));
  } else if (tab==='pelo'){
    body=grupo('Peinado',O.pelo.map(([k,nm])=>op('pelo',k,nm,{cab:true})).join(''))+colores('colPelo',O.colPelo.map(([c,nm])=>[c,nm,c]),'Color del pelo');
  } else if (tab==='ropa'){
    body=grupo('Camisa',O.camisa.map(([k,nm,nv])=>op('camisa',k,nm,{nv})).join(''))+colores('colCamisa',O.colRopa,n.camisa==='vestido'?'Color del vestido':'Color de la camisa')
      +(n.camisa==='vestido'?'':grupo('Abajo',O.abajo.map(([k,nm,nv])=>op('abajo',k,nm,{nv})).join(''))+colores('colAbajo',O.colRopa,'Color de abajo'));
  } else if (tab==='zapatos'){
    body=grupo('Zapatos',O.zapatos.map(([k,nm,nv])=>op('zapatos',k,nm,{nv})).join(''))+colores('colZapatos',O.colRopa,'Color de los zapatos');
  } else if (tab==='cosas'){
    body=Object.entries(O.acc).map(([s,l])=>grupo(RANURA[s],l.map(([k,nm,nv])=>op('acc.'+s,k,nm,{nv,cab:s==='cabeza'||s==='cara',on:n.acc[s]===k})).join(''))).join('')
      +`<p class="muted" style="font-weight:700;margin-top:var(--s-3)">Toca otra vez una cosa para quitarla.</p>`;
  } else {
    body=grupo('Su cara de siempre',O.expr.map(([k,nm])=>op('expr',k,nm,{cab:true})).join(''))
      +`<h3 class="mp-h">Haz que reaccione</h3><div class="row" style="gap:var(--s-2);flex-wrap:wrap">${[['happy','Feliz'],['surprised','Sorpresa'],['think','Pensando'],['sad','Triste']].map(([m,nm])=>`<button class="chip" data-m="${m}">${nm}</button>`).join('')}</div>`;
  }
  app.innerHTML=`<div class="top"><button class="icon-btn" id="back" aria-label="Volver">←</button><h2>${view.nuevo?'¡Crea tu personaje!':'Mi personaje'}</h2>
      <button class="chip" id="azar">${ilu('dado','1.2em')} Al azar</button></div>
    <div class="mp-prev">${ninoMascot(n,108,'nin')}${mascot(p.avatar,64,'msc','mp-amigo')}</div>
    <div class="tabs mp-tabs">${PEST.map(([k,nm])=>`<button class="chip ${k===tab?'on':''}" data-tab="${k}">${nm}</button>`).join('')}</div>
    <div class="mp-body">${body}</div>
    <div style="margin-top:var(--s-6)"><button class="btn full" id="listo">Listo</button></div>`;

  const otraVez=()=>{ const y=window.scrollY; render(); window.scrollTo(0,y); };
  const alegre=()=>setTimeout(()=>{ react('happy','nin'); react('happy'); },60);
  bind('#back',()=>go({name:'home'}));
  bind('#listo',()=>{ go({name:'home'}); setTimeout(()=>speak(`¡Listo! ¡Qué bien te ves, ${p.name}!`),300); });
  bind('[data-tab]',el=>go({name:'miNino',tab:el.dataset.tab,nuevo:view.nuevo}));
  bind('#azar',()=>{ p.nino=ninoAzar(lvl); save(); popS(); otraVez(); alegre(); speak(pick(['¡Sorpresa!','¡Mira qué nuevo!','¡Otro estilo!'])); });
  bind('[data-c]',el=>{
    if (el.dataset.lock){ toast(`Se abre en el nivel ${el.dataset.lock}. ¡Sigue jugando!`); speak(`Se abre en el nivel ${el.dataset.lock}. ¡Sigue jugando!`); return; }
    const c=el.dataset.c, v=el.dataset.v, d={...n,acc:{...n.acc}};
    if (c.startsWith('acc.')){ const s=c.slice(4); d.acc[s]=d.acc[s]===v?null:v; }
    else if (c==='mejillas'||c==='pecas') d[c]=v==='1';
    else d[c]=v;
    p.nino=d; save(); popS(); otraVez(); alegre();
    if (Math.random()<.35) speak(pick(FRASES));
  });
  bind('[data-m]',el=>react(el.dataset.m,'nin'));
  bind('#nin',()=>{ react('happy','nin'); speak(pick([`¡Hola! Soy ${p.name}.`,'¡Jiji!','¡Vamos a jugar!'])); });
  bind('#msc',()=>{ react('happy'); speak(`¡Soy ${mname(p.avatar)}, tu amigo!`); });
};

/* al crear un perfil, seguir a armar el personaje */
const _vNew=vNewProfile;
vNewProfile=function(){
  _vNew();
  const ok=document.getElementById('ok'); if(!ok) return;
  ok.textContent='Seguir: crear mi personaje';
  ok.addEventListener('click',()=>{ const p=prof(); if(p && !p.nino && view.name==='home'){ p.nino=ninoAzar(1); save(); go({name:'miNino',nuevo:true}); } });
};

/* botón «Mi personaje» en el inicio */
const _home=vHome;
vHome=function(){
  const r=_home(); const p=prof(); const f=document.getElementById('friend');
  if (p && f && !document.getElementById('miNino')){
    f.insertAdjacentHTML('beforebegin',`<button class="chip" id="miNino"><span class="mp-chip">${nino(ninoDe(p),{solo:'cabeza'})}</span> Mi personaje</button>`);
    document.getElementById('miNino').addEventListener('click',()=>go({name:'miNino'}));
  }
  /* fase 3: el niño saluda junto a su animalito */
  const m=p&&p.nino&&app.querySelector('.hero .mascot');
  if (m && !document.getElementById('nin')){
    m.insertAdjacentHTML('beforebegin',`<div class="duo">${ninoMascot(ninoDe(p),74,'nin')}</div>`);
    const duo=app.querySelector('.hero .duo'); duo.appendChild(m); m.style.setProperty('--ms','62px'); m.classList.add('pet-'+modoPet(p));
    document.getElementById('nin').addEventListener('click',()=>{ react('happy'); speak(pick([`¡Hola, ${p.name}!`,'¡Vamos a jugar juntos!','¡Qué bonito día!'])); });
  }
  return r;
};

/* ---------- fase 3: el niño y su animalito juntos ---------- */
/* react() del animalito principal también hace reaccionar al niño (inicio #nin, escena #scn) */
const _react=react;
react=function(mood,id='msc'){
  _react(mood,id);
  if (id==='msc') ['nin','scn'].forEach(k=>{ if(document.getElementById(k)) _react(mood,k); });
};

/* tarjetas de perfil: la cara del niño con su animalito al lado */
const _vProfiles=vProfiles;
vProfiles=function(){
  _vProfiles();
  S.profiles.forEach(p=>{ if(!p.nino) return; const av=app.querySelector(`.pcard[data-id="${p.id}"] .av`); if(!av) return;
    av.classList.add('av-duo'); av.innerHTML=`<span class="cara">${nino(ninoDe(p),{solo:'cabeza'})}</span>${petMini(p,40)}`; });
};

/* escenas de los juguetes: el niño va al lado de su animalito, del lado que mira al centro.
   La pieza del juguete (delantal, bata, regadera, careta, instrumento) la lleva el niño. */
/* dónde va cada animalito: solo los que tienen alas vuelan; en el agua nadan los marinos y los demás
   van en la arena con casco de buceo (nadie se ahoga) */
const VUELAN=['mariposa','abeja','buho','cotorra'], NADAN=['delfin','pulpo','tortuga'];
window.modoPet=(p,agua=false)=>{ const sp=SPECIES[p.avatar]; if (agua) return NADAN.includes(sp)?'nada':'piso'; return VUELAN.includes(sp)?'vuela':'piso'; };
/* rectángulo de cada pieza dentro del niño (coordenadas de nino()); 'cuerpo' = encima de la ropa, debajo de la cabeza */
const PIEZA={'pet-shop':{x:64,y:150,w:72,h:86,capa:'cuerpo'},'pet-lab':{x:46,y:146,w:108,h:112,capa:'cuerpo'},'pet-garden':{x:132,y:176,w:68,h:68},'pet-music':{x:114,y:170,w:80,h:80}};
const svgDe=html=>{ const t=String(html||''), i=t.indexOf('<svg'), z=t.lastIndexOf('</svg>'); return i<0||z<0?'':t.slice(i,z+6); };
const _scenePet=window.scenePet;
window.scenePet=(root,opts={})=>{
  const el=_scenePet(root,opts), p=prof(); if(!el||!p) return el;
  el.classList.add('pet-'+modoPet(p,opts.agua));
  if (opts.agua){ /* bajo el agua: sin careta suelta; el que no es marino lleva casco */
    const pr=el.querySelector('.pet-prop'); if(pr) pr.remove();
    if (modoPet(p,true)==='piso'){ const b=el.querySelector('#scp .body'); if(b) b.innerHTML=creature(petOf(p).sp,{...petOf(p),casco:true}); } }
  if (!p.nino) return el;
  const size=opts.size||64, lado=/(^|;)\s*right/.test(opts.at||'')?'izq':'der';
  const opc=opts.agua?{buzo:true}:(PIEZA[opts.cls]&&opts.prop?{pieza:{...PIEZA[opts.cls],svg:svgDe(opts.prop)}}:{});
  const caja=document.createElement('div'); caja.className='kid-box kid-'+lado; caja.innerHTML=ninoMascot(ninoDe(p),Math.round(size*.95),'scn','',opc);
  /* la pieza ya va dibujada dentro del niño (se mueve con él): se quita la suelta */
  const prop=el.querySelector('.pet-prop'); if(prop) prop.remove();
  el._nino={opc}; el.appendChild(caja);
  return el;
};
/* cambiar la pieza (por ejemplo, otro instrumento) vuelve a dibujar al niño con ella */
const _setPetProp=window.setPetProp;
window.setPetProp=(root,html)=>{
  const el=root.querySelector('.scene-pet'), b=root.querySelector('#scn .body'), p=prof();
  if (!el||!el._nino||!b||!p) return _setPetProp(root,html);
  const opc=el._nino.opc; if (opc.pieza){ opc.pieza={...opc.pieza,svg:svgDe(html)}; b.innerHTML=nino(ninoDe(p),opc); }
};
})();
