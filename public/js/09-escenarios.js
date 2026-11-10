/* Semillita · Escenarios por capas (fase 4)
   =========================================================
   scene(nombre) devuelve el HTML de un fondo por capas (cielo, fondo, medio, suelo, detalles)
   hecho con piezas de Kenney (public/kenney) y CSS. Va detrás de la zona de juego:
   no recibe toques (pointer-events:none) y no cambia la lógica de ningún juguete.
   sceneParallax(root) mueve un poco las capas al tocar/arrastrar o al inclinar el celular.
   Con prefers-reduced-motion las capas quedan fijas.
   Se carga después de 08-ilustraciones.js y antes de 05-juguetes-nuevos.js.
   ========================================================= */
(function(){
/* sprite de Kenney posicionado; css = posición y tamaño */
const sp=(n,css,extra='')=>`<img class="sp${extra?' '+extra:''}" src="/kenney/${n}.webp" alt="" draggable="false" decoding="async" style="${css}">`;
/* capa con profundidad d (0 = fija, 1 = se mueve más) */
const capa=(d,html,css='')=>`<div class="sl" data-d="${d}" style="${css}">${html}</div>`;
const colinas=(c1,c2,top,h='60%')=>`<div class="hill" style="top:${top};height:${h};background:${c1};left:-20%;width:80%"></div><div class="hill" style="top:calc(${top} + 14px);height:calc(${h} - 14px);background:${c2};left:30%;width:95%"></div>`;
const nubes=(top='6%')=>sp('nube1',`left:8%;top:${top};width:22%;max-width:120px`,'drift')+sp('nube2',`left:58%;top:calc(${top} + 22px);width:18%;max-width:96px`,'drift slow');

const SC={
  /* Mi jardín: el horizonte está al 46 % (ahí empieza la tierra del huerto) */
  jardin:()=>capa(.15,nubes('4%'))
    +capa(.3,colinas('#BFDDA2','#A9D18C','33%','13.5%')+sp('arbol_fondo','left:4%;bottom:52%;width:15%;max-width:80px')+sp('pino','right:6%;bottom:52%;width:11%;max-width:60px')+sp('casa_peq','right:22%;bottom:53%;width:15%;max-width:80px'))
    +capa(.5,`<div class="fence" style="bottom:52.5%"></div>`+sp('arbusto_fondo','left:24%;bottom:52%;width:14%;max-width:70px')+sp('arbusto_fondo2','right:34%;bottom:52%;width:12%;max-width:60px')),
  /* Granja de sonidos: cielo hasta el 30 % */
  granja:()=>capa(.12,`<div class="sp spin" style="right:6%;top:3%;width:16%;max-width:70px">${ilu('sol','100%')}</div>`+nubes('5%'))
    +capa(.3,colinas('#C7E3AE','#B4D896','22%')+sp('arbol_fondo','left:3%;bottom:70%;width:16%;max-width:84px')+sp('arbol_peq','left:19%;bottom:70%;width:9%;max-width:46px'))
    +capa(.45,`<div class="fence" style="bottom:69%"></div>`+`<div class="sp" style="right:3%;bottom:69.5%;width:22%;max-width:110px">${ilu('granero','100%')}</div>`),
  /* Acuario: algas lejanas y rocas; la arena va en el piso */
  acuario:()=>capa(.2,sp('alga_fondo1','left:4%;bottom:30px;height:46%','sway')+sp('alga_fondo2','left:40%;bottom:30px;height:34%','sway slow')+sp('alga_fondo3','right:6%;bottom:30px;height:52%','sway')+sp('roca_fondo','left:62%;bottom:24px;width:26%'),'opacity:.55')
    +capa(.45,`<div class="sand"></div>`+sp('roca','left:28%;bottom:18px;width:13%;max-width:70px')+sp('alga_hierba','left:50%;bottom:22px;width:10%;max-width:50px','sway')),
  /* Mi colmado: estantes contra la pared (la pared ocupa el 38 % de arriba) */
  colmado:()=>capa(.2,sp('estante_cajas','right:3%;top:44px;height:88px')+sp('estante_fundas','right:29%;top:50px;height:80px'),'opacity:.95'),
  /* El tiempo: colinas y árboles lejanos (el pasto propio del juguete va delante) */
  tiempo:()=>capa(.3,colinas('#B9DCA6','#A6D190','58%')+sp('pino','left:62%;bottom:28%;width:10%;max-width:54px')+sp('arbol_peq','left:80%;bottom:27%;width:10%;max-width:54px')+sp('arbusto_fondo','left:26%;bottom:27%;width:12%;max-width:60px')),
  /* Bloques: cielo con nubes y colinas suaves detrás del pasto */
  bloques:()=>capa(.15,nubes('6%'))+capa(.35,colinas('#D2EAC0','#C3E1AC','66%','30%')),
  /* Música: escenario con telón y piso de madera (CSS) */
  musica:()=>capa(.1,`<div class="stage-wall"></div><div class="spot" style="left:30%"></div><div class="spot" style="left:62%"></div>`)
    +capa(.35,`<div class="curtain l"></div><div class="curtain r"></div><div class="valance"></div><div class="floor-wood"></div>`),
  /* Laboratorio: azulejos, repisa con frascos y mesa (CSS + ilustraciones propias) */
  laboratorio:()=>capa(.1,`<div class="tiles"></div>`)
    +capa(.5,`<div class="table"></div>`)
};

window.scene=(nombre,css='')=> SC[nombre] ? `<div class="scene scene-${nombre}" aria-hidden="true" style="${css}">${SC[nombre]()}</div>` : '';

/* ---------- el animalito del niño dentro de la escena (fase 6) ----------
   scenePet(root, {at, size, prop, cls}) pone su creature() (especie, color y ropa del perfil) en la escena.
   No recibe toques. Usa id "scp": react() lo hace reaccionar junto con el del encabezado.
   Si nadie toca el juguete en 9 s se pone pensativo. */
window.scenePet=(root,{at='',size=64,prop='',cls=''}={})=>{
  const p=typeof prof==='function'&&prof(); if(!p||typeof creature!=='function') return null;
  const o=petOf(p), el=document.createElement('div');
  el.className='scene-pet '+cls; el.style.cssText=at+`;--ps:${size}px`; el.setAttribute('aria-hidden','true');
  el.innerHTML=`<div class="mascot" id="scp" style="--ms:${size}px"><span class="body">${creature(o.sp,o)}</span><span class="shadow"></span></div><div class="pet-prop">${prop}</div>`;
  root.appendChild(el);
  const m=el.querySelector('.mascot'); let last=Date.now();
  root.addEventListener('pointerdown',()=>{ last=Date.now(); m.classList.remove('think'); },{passive:true});
  const iv=setInterval(()=>{ if(!root.isConnected) return clearInterval(iv); if(Date.now()-last>9000 && !m.classList.contains('think')) m.classList.add('think'); },1500);
  return el;
};
window.setPetProp=(root,html)=>{ const e=root.querySelector('.scene-pet .pet-prop'); if(e) e.innerHTML=html; };

/* sorpresa: cuando el animalito anuncia algo inesperado ("¡Oh!", "¡Sorpresa!", "¡Una tormenta!"…) */
if (typeof tsay==='function'){ const _tsay=tsay;
  tsay=function(text,lang){ if (/^¡(Oh|Sorpresa|Una tormenta|Mira|Llueve|Un arcoíris)/.test(String(text))) react('surprised'); return _tsay(text,lang); }; }

/* parallax suave: hasta ~10 px; se apaga solo cuando el juguete se cierra */
window.sceneParallax=(root)=>{
  if (typeof RM!=='undefined' && RM) return;
  const layers=()=>[...root.querySelectorAll('.scene .sl')];
  let tx=0, ty=0, raf=0;
  const apply=()=>{ raf=0; layers().forEach(l=>{ const d=+l.dataset.d||0; l.style.transform=`translate3d(${(-tx*d*12).toFixed(1)}px,${(-ty*d*6).toFixed(1)}px,0)`; }); };
  const set=(x,y)=>{ tx=Math.max(-1,Math.min(1,x)); ty=Math.max(-1,Math.min(1,y)); if(!raf) raf=requestAnimationFrame(apply); };
  root.addEventListener('pointermove',e=>{ const r=root.getBoundingClientRect(); set((e.clientX-r.left)/r.width*2-1,(e.clientY-r.top)/r.height*2-1); },{passive:true});
  root.addEventListener('pointerleave',()=>set(0,0),{passive:true});
  const ori=e=>{ if(!root.isConnected){ window.removeEventListener('deviceorientation',ori); return; } if(e.gamma==null) return; set(e.gamma/30,((e.beta||45)-45)/30); };
  window.addEventListener('deviceorientation',ori,{passive:true});
};
})();
