/* Semillita · Sala de juegos: 14 juguetes Montessori originales */
/* =========================================================
   SALA DE JUEGOS · juguetes Montessori de juego libre
   Sin ganar ni perder: explorar, crear y descubrir
   ========================================================= */
let toyCleanup = null;
const PAST = ['#F4A6A6','#F7C59F','#F6E39A','#B9E3C6','#A9D3F0','#C9B8EE','#F5B8D0','#BFE0D8'];
function tsay(text, lang='es-ES'){
  const b=document.getElementById('tb');
  if (b){ b.textContent=strip(text); b.classList.add('show'); clearTimeout(b._t); b._t=setTimeout(()=>b.classList.remove('show'),2800); }
  speak(text, lang);
}
function note(f, dur=1.2, type='triangle', vol=.18){
  try{ AC=AC||new (window.AudioContext||window.webkitAudioContext)(); const t=AC.currentTime;
    const o=AC.createOscillator(), g=AC.createGain(); o.type=type; o.frequency.value=f;
    g.gain.setValueAtTime(.0001,t); g.gain.exponentialRampToValueAtTime(vol,t+.01); g.gain.exponentialRampToValueAtTime(.0001,t+dur);
    o.connect(g).connect(AC.destination); o.start(t); o.stop(t+dur+.05); }catch(e){}
}
const popS = () => note(700+Math.random()*400,.15,'sine',.13);
const plopS = () => note(260,.25,'sine',.14);
function dance(){ const m=document.getElementById('msc'); if(!m) return; m.classList.add('dance'); clearTimeout(m._d); m._d=setTimeout(()=>m.classList.remove('dance'),1200); }
function rel(area,e){ const r=area.getBoundingClientRect(); return {x:e.clientX-r.left, y:e.clientY-r.top}; }
function dragify(el, area, o={}){
  el.style.touchAction='none';
  el.addEventListener('pointerdown', e=>{
    if (el.dataset.lock) return;
    e.preventDefault(); const r=area.getBoundingClientRect(), er=el.getBoundingClientRect();
    const ox=e.clientX-er.left, oy=e.clientY-er.top; el.classList.add('drag'); o.start&&o.start(el);
    try{ el.setPointerCapture(e.pointerId); }catch(_){}
    const mv=ev=>{ el.style.left=(ev.clientX-r.left-ox)+'px'; el.style.top=(ev.clientY-r.top-oy)+'px'; };
    const up=ev=>{ el.removeEventListener('pointermove',mv); el.removeEventListener('pointerup',up); el.removeEventListener('pointercancel',up);
      el.classList.remove('drag'); o.drop&&o.drop(el, ev.clientX-r.left, ev.clientY-r.top); };
    el.addEventListener('pointermove',mv); el.addEventListener('pointerup',up); el.addEventListener('pointercancel',up);
  });
}
function addHTML(root, html){ root.insertAdjacentHTML('beforeend', html); }
/* Barras de herramientas: los botones que solo tienen un emoji llevan la clase .e (ícono grande);
   los que tienen texto usan letra normal. Solo presentación. */
(function(){
  const mark=b=>b.classList.toggle('e', !/[\p{L}\p{N}]/u.test(b.textContent));
  const scan=n=>{ if(n.nodeType!==1) return; if(n.matches('.tbar button,.prow button')) mark(n); n.querySelectorAll?.('.tbar button,.prow button').forEach(mark); const b=n.closest?.('.tbar button,.prow button'); if(b) mark(b); };
  new MutationObserver(ms=>ms.forEach(m=>{ m.addedNodes.forEach(scan); if(m.type==='childList'&&m.target.nodeType===1) { const b=m.target.closest('.tbar button,.prow button'); if(b) mark(b); } }))
    .observe(document.documentElement,{childList:true,subtree:true});
})();
function sparkAt(root,x,y){ const r=root.getBoundingClientRect(); const d=document.createElement('div'); d.style.cssText=`position:fixed;left:${r.left+x}px;top:${r.top+y}px;width:1px;height:1px`; document.body.appendChild(d); sparks(d,7); setTimeout(()=>d.remove(),1000); }

/* ---------- 1. Pintar ---------- */
function toyPaint(root){
  const COLS=[['#E8505B','rojo'],['#F28C38','anaranjado'],['#F7C948','amarillo'],['#4CAF6A','verde'],['#3D8BD9','azul'],['#8E5BB5','morado'],['#F49AC1','rosado'],['#8B5E3C','marrón'],['#4A4658','gris']];
  const STAMPS=['⭐','🌸','🐟','❤️','🦋','☀️','🌈','🐞','🌴'];
  let col=COLS[0][0], size=12, mode='pen', st=0;
  addHTML(root, `<canvas id="cv" style="position:absolute;left:0;top:0;width:100%;height:calc(100% - var(--tbar-h));background:var(--card);touch-action:none"></canvas>
  <div class="tbar">${COLS.map((c,i)=>`<button class="sw-c ${i?'':'on'}" data-c="${i}" style="background:${c[0]}" aria-label="${c[1]}"></button>`).join('')}<span class="sep"></span>
  <button id="sz">✏️</button><button id="stp">${STAMPS[0]}</button><button id="er">🧽</button><button id="cl">🗑️</button></div>`);
  const cv=root.querySelector('#cv'), ctx=cv.getContext('2d'), dpr=window.devicePixelRatio||1;
  const fit=()=>{ const r=cv.getBoundingClientRect(); cv.width=r.width*dpr; cv.height=r.height*dpr; ctx.setTransform(dpr,0,0,dpr,0,0); ctx.fillStyle='#fff'; ctx.fillRect(0,0,r.width,r.height); ctx.lineCap='round'; ctx.lineJoin='round'; };
  fit();
  const setOn=(el)=>{ root.querySelectorAll('.tbar button').forEach(b=>b.classList.remove('on')); el.classList.add('on'); };
  root.querySelectorAll('[data-c]').forEach(b=>b.addEventListener('click',()=>{ const c=COLS[+b.dataset.c]; col=c[0]; mode='pen'; setOn(b); tsay(c[1]); }));
  root.querySelector('#sz').addEventListener('click',e=>{ size = size===6?12:size===12?26:6; mode='pen'; setOn(e.currentTarget); tsay(size===6?'Lápiz fino':size===12?'Lápiz mediano':'Brocha gruesa'); });
  root.querySelector('#stp').addEventListener('click',e=>{ if(mode==='stamp') st=(st+1)%STAMPS.length; mode='stamp'; e.currentTarget.textContent=STAMPS[st]; setOn(e.currentTarget); });
  root.querySelector('#er').addEventListener('click',e=>{ mode='erase'; setOn(e.currentTarget); tsay('Borrador'); });
  root.querySelector('#cl').addEventListener('click',()=>{ fit(); tsay('¡Hoja nueva!'); react('happy'); });
  let drawing=false, last=null;
  cv.addEventListener('pointerdown',e=>{ e.preventDefault(); const p=rel(cv,e);
    if (mode==='stamp'){ ctx.font=`${size*2+34}px serif`; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(STAMPS[st],p.x,p.y); popS(); return; }
    drawing=true; last=p; try{cv.setPointerCapture(e.pointerId);}catch(_){}
    ctx.strokeStyle= mode==='erase'?'#fff':col; ctx.lineWidth= mode==='erase'?34:size; ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(p.x+.1,p.y+.1); ctx.stroke(); });
  cv.addEventListener('pointermove',e=>{ if(!drawing) return; const p=rel(cv,e); ctx.beginPath(); ctx.moveTo(last.x,last.y); ctx.lineTo(p.x,p.y); ctx.stroke(); last=p; });
  const end=()=>{ drawing=false; }; cv.addEventListener('pointerup',end); cv.addEventListener('pointercancel',end);
}

/* ---------- 2. Mezcla colores ---------- */
function toyMix(root){
  const POTS={r:['rojo','#EE7A7A'],y:['amarillo','#F6D36F'],b:['azul','#7DAEE3'],w:['blanco','#FFFFFF']};
  const EN={rojo:'red',amarillo:'yellow',azul:'blue',anaranjado:'orange',verde:'green',morado:'purple','marrón':'brown',rosado:'pink',celeste:'light blue',lila:'lilac',blanco:'white','verde claro':'light green','salmón':'salmon','amarillo claro':'light yellow',beige:'beige'};
  let cnt={r:0,y:0,b:0,w:0}, lastName='';
  const lighten=(h,a)=>{ const n=parseInt(h.slice(1),16); const f=c=>Math.round(c+(255-c)*a); return `rgb(${f(n>>16)},${f(n>>8&255)},${f(n&255)})`; };
  function mix(){ const R=cnt.r>0, Y=cnt.y>0, B=cnt.b>0; let n='', c='#F4EFE8';
    if (R&&Y&&B){n='marrón';c='#B98A6A';} else if(R&&Y){n='anaranjado';c='#F6A86A';} else if(Y&&B){n='verde';c='#8CCB8C';} else if(R&&B){n='morado';c='#B39AD9';}
    else if(R){n='rojo';c=POTS.r[1];} else if(Y){n='amarillo';c=POTS.y[1];} else if(B){n='azul';c=POTS.b[1];} else if(cnt.w){n='blanco';c='#FFFFFF';}
    if (cnt.w && n && n!=='blanco'){ c=lighten(c,Math.min(.65,cnt.w*.22)); n={rojo:'rosado',azul:'celeste',morado:'lila',verde:'verde claro',anaranjado:'salmón',amarillo:'amarillo claro','marrón':'beige'}[n]; }
    return [n,c]; }
  addHTML(root, `<div class="abs mix-fondo" aria-hidden="true" style="inset:0 0 var(--tbar-h) 0"></div><div style="position:absolute;inset:0 0 var(--tbar-h) 0;display:flex;flex-direction:column;align-items:center;justify-content:space-around;padding:50px var(--s-3) var(--s-3)">
    <div style="position:relative;width:220px;height:150px"><div style="position:absolute;inset:0;border-radius:0 0 110px 110px;overflow:hidden"><div id="liq" style="position:absolute;left:0;right:0;bottom:0;height:0;background:#F4EFE8;transform-origin:50% 100%;transition:height .5s,background .7s"></div></div>
      <div class="bowl"></div></div>
    <div style="text-align:center;min-height:62px"><div id="nm" style="font-size:var(--fs-3xl);font-weight:800"></div><div id="en" class="muted" style="font-weight:700"></div></div>
    <div style="display:flex;gap:var(--s-4);flex-wrap:wrap;justify-content:center">${Object.entries(POTS).map(([k,[n,c]])=>`<button data-k="${k}" style="display:flex;flex-direction:column;align-items:center;gap:var(--s-2);font-weight:800"><span class="jar" style="--c:${c}"></span>${n}</button>`).join('')}</div></div>
    <div id="goal" class="abs" style="left:12px;top:12px;background:var(--card);border:var(--bw) solid var(--line);border-radius:var(--r-md);padding:var(--s-2) var(--s-3);font-weight:800;display:none"></div>
    <div class="tbar"><button id="em">${kic('borrar')} Vaciar</button></div>`);
  const liq=root.querySelector('#liq');
  const GOALS = LV()===2 ? ['anaranjado','verde','morado','marrón'] : ['anaranjado','verde','morado','marrón','rosado','celeste','lila','verde claro','salmón'];
  let goal=null; const gEl=root.querySelector('#goal');
  const newGoal=()=>{ if(LV()<2) return; goal=pick(GOALS.filter(g=>g!==goal)); gEl.style.display='block'; gEl.innerHTML=`${ilu('diana','1.2em')} Haz el color <b>${goal}</b>`; tsay(`Reto: haz el color ${goal}`); };
  setTimeout(newGoal,2600);
  const upd=()=>{ const [n,c]=mix(); const tot=cnt.r+cnt.y+cnt.b+cnt.w; liq.style.height=Math.min(110,tot*16)+'px'; liq.style.background=c;
    root.querySelector('#nm').textContent=n?n[0].toUpperCase()+n.slice(1):''; root.querySelector('#en').textContent=n?'En inglés: '+EN[n]:'';
    if (goal && n===goal){ lastName=n; win(`¡Lo lograste! Hiciste ${n}`); goal=null; setTimeout(()=>{ cnt={r:0,y:0,b:0,w:0}; lastName=''; upd(); newGoal(); },2600); return; }
    if (n && n!==lastName){ const prim=['rojo','amarillo','azul','blanco'].includes(n); setTimeout(()=>{ tsay(prim?n:`¡Mira! Hiciste ${n}`); if(!prim){ react('happy'); } },350); }
    lastName=n; };
  root.querySelectorAll('[data-k]').forEach(b=>b.addEventListener('click',()=>{
    const k=b.dataset.k; if (cnt.r+cnt.y+cnt.b+cnt.w>=7){ tsay('¡El tazón está lleno! Toca Vaciar.'); return; }
    const a=b.getBoundingClientRect(), t=liq.parentElement.getBoundingClientRect(), r=root.getBoundingClientRect();
    const jar=b.querySelector('.jar'); if(jar&&jar.animate&&!RM) jar.animate([{transform:'rotate(0)'},{transform:'rotate(-24deg) translateY(-6px)',offset:.35},{transform:'rotate(-24deg) translateY(-6px)',offset:.6},{transform:'rotate(0)'}],{duration:620,easing:'ease-in-out'});
    const d=document.createElement('div'); d.className='abs gota-pint'; d.style.cssText=`left:${a.left-r.left+a.width/2-12}px;top:${a.top-r.top}px;--c:${POTS[k][1]};transition:transform .55s cubic-bezier(.5,0,.7,1);z-index:4`;
    root.appendChild(d); requestAnimationFrame(()=>requestAnimationFrame(()=>{ d.style.transform=`translate(${t.left-a.left+t.width/2-a.width/2}px,${t.top-a.top+60}px)`; }));
    setTimeout(()=>{ d.remove(); plopS(); cnt[k]++; upd(); const bw=liq.parentElement, lh=liq.offsetHeight; remolino(bw); gotitas(bw,bw.clientWidth/2,bw.clientHeight-lh,{c:POTS[k][1],n:4,alto:30});
      if(liq.animate&&!RM) liq.animate([{transform:'scaleY(1)'},{transform:'scaleY(.9)'},{transform:'scaleY(1.05)'},{transform:'scaleY(1)'}],{duration:500,easing:'ease-out'}); },560);
  }));
  root.querySelector('#em').addEventListener('click',()=>{ cnt={r:0,y:0,b:0,w:0}; lastName=''; upd(); tsay('Tazón limpio. ¡Mezcla otra vez!'); });
}

/* ---------- 3. Música ---------- */
function toyMusic(root){
  const N=[[523.25,'do'],[587.33,'re'],[659.25,'mi'],[698.46,'fa'],[783.99,'sol'],[880,'la'],[987.77,'si'],[1046.5,'do']];
  const C=['#F4A6A6','#F7C59F','#F6E39A','#B9E3C6','#A9D3F0','#9FB7EE','#C9B8EE','#F5B8D0'];
  let rec=null, recStart=0, timers=[];
  addHTML(root, `<div style="position:absolute;inset:60px 8px 80px 8px;display:flex;gap:var(--s-2);align-items:center;justify-content:center">${N.map((n,i)=>`<button data-i="${i}" style="flex:1;max-width:70px;height:${92-i*5}%;border-radius:var(--r-md);background:${C[i]};border:3px solid rgba(0,0,0,.06);display:flex;flex-direction:column;justify-content:space-between;align-items:center;padding:var(--s-3) 0;font-weight:800;font-size:var(--fs-sm);position:relative"><span style="width:12px;height:12px;border-radius:50%;background:rgba(0,0,0,.18)"></span>${n[1]}<span style="width:12px;height:12px;border-radius:50%;background:rgba(0,0,0,.18)"></span></button>`).join('')}</div>
  <div class="tbar"><button id="rc">⏺️ Grabar</button><button id="pl">▶️ Mi canción</button><button id="tw">⭐ Estrellita</button><button id="sc">🎵 Escala</button><button id="sm">🧠 Repite</button></div>`);
  let simon=null;
  const bars=[...root.querySelectorAll('[data-i]')];
  function play(i, user=true){
    const f=N[i][0]; note(f,1.5,'sine',.22); note(f*2,.5,'triangle',.05);
    const b=bars[i]; b.style.animation='none'; void b.offsetWidth; b.style.animation='hit .35s ease';
    const r=root.getBoundingClientRect(), a=b.getBoundingClientRect(); const m=document.createElement('span'); m.className='abs'; m.textContent=pick(['🎵','🎶','♪']);
    m.style.cssText=`left:${a.left-r.left+a.width/2-10}px;top:${a.top-r.top-10}px;font-size:var(--fs-2xl);animation:up 1.1s ease-out forwards;z-index:4;pointer-events:none`; root.appendChild(m); setTimeout(()=>m.remove(),1100);
    dance(); if (user && rec) rec.push([i, performance.now()-recStart]);
    if (user && simon && simon.active){
      if (i===simon.seq[simon.pos]){ simon.pos++; if (simon.pos===simon.seq.length){ simon.active=false; const L=simon.seq.length; win(`¡Perfecto! Repetiste ${L} notas`); setTimeout(()=>startSimon(L+1),2400); } }
      else { simon.active=false; simon.pos=0; tsay('¡Casi! Escucha otra vez'); setTimeout(playSimon,1600); } }
  }
  function playSimon(){ seq(simon.seq,650); timers.push(setTimeout(()=>{ if(simon){ simon.active=true; simon.pos=0; } }, simon.seq.length*650+150)); }
  function startSimon(len){ const top=LV()===1?4:7; simon={seq:times(Math.min(len,12),()=>rnd(0,top)),pos:0,active:false}; tsay(`Escucha ${simon.seq.length} notas y repítelas`); timers.push(setTimeout(playSimon,1700)); }
  bars.forEach(b=>b.addEventListener('pointerdown',e=>{ e.preventDefault(); play(+b.dataset.i); }));
  const seq=(arr,gap=430)=>{ timers.forEach(clearTimeout); timers=arr.map((x,k)=>setTimeout(()=>{ if(x!==null) play(x,false); }, Array.isArray(x)?0:k*gap)); };
  root.querySelector('#rc').addEventListener('click',e=>{ const b=e.currentTarget;
    if (!rec){ rec=[]; recStart=performance.now(); b.textContent='⏹️ Parar'; b.classList.add('on'); tsay('¡Grabando! Toca las barras'); }
    else { b.textContent='⏺️ Grabar'; b.classList.remove('on'); root._song=rec; tsay(rec.length?'¡Canción guardada!':'No tocaste nada'); rec=null; } });
  root.querySelector('#pl').addEventListener('click',()=>{ const s=root._song; if(!s||!s.length){ tsay('Primero graba tu canción con ⏺️'); return; } timers.forEach(clearTimeout); timers=s.map(([i,t])=>setTimeout(()=>play(i,false),t)); });
  root.querySelector('#tw').addEventListener('click',()=>{ tsay('Estrellita, ¿dónde estás?'); setTimeout(()=>seq([0,0,4,4,5,5,4,null,3,3,2,2,1,1,0]),1400); });
  root.querySelector('#sc').addEventListener('click',()=>{ simon=null; seq([0,1,2,3,4,5,6,7],380); });
  root.querySelector('#sm').addEventListener('click',()=>startSimon(LV()+1));
  return ()=>timers.forEach(clearTimeout);
}

/* ---------- 4. Bloques ---------- */
function toyBlocks(root){
  const SH={cuadrado:{w:70,h:70,css:'border-radius:var(--r-sm)'},rectángulo:{w:140,h:46,css:'border-radius:var(--r-sm)'},torre:{w:46,h:120,css:'border-radius:var(--r-sm)'},triángulo:{w:84,h:72,css:'clip-path:polygon(50% 0,100% 100%,0 100%)'},arco:{w:104,h:52,css:'border-radius:52px 52px 6px 6px'},círculo:{w:66,h:66,css:'border-radius:50%'}};
  const ICON={cuadrado:'🟧',rectángulo:'▬',torre:'▮',triángulo:'🔺',arco:'🌙',círculo:'🔵'};
  const blocks=[];
  addHTML(root, `<div id="gr" style="position:absolute;left:0;right:0;bottom:70px;height:34px;background:#DCE8C8;border-top:3px solid #C3D6A6"></div>
  <div class="tbar">${Object.keys(SH).map(k=>`<button data-s="${k}">${ICON[k]}</button>`).join('')}<button data-s="amigo">${petMini(prof(),36)}</button><span class="sep"></span><button id="cl">🗑️</button></div>`);
  const W=()=>root.clientWidth, groundY=()=>root.clientHeight-70-34;
  let goalN = LV()===1?0:LV()===2?4:7, reached=false;
  addHTML(root, `<div id="bg" class="abs" style="left:12px;top:12px;background:var(--card);border:var(--bw) solid var(--line);border-radius:var(--r-md);padding:var(--s-2) var(--s-3);font-weight:800;display:${goalN?'block':'none'}">🎯 Torre de ${goalN} bloques</div>`);
  function settle(){
    const order=blocks.slice().sort((a,b)=>(b.y+b.h)-(a.y+a.h)); const done=[];
    order.forEach(b=>{ let land=groundY(), sup=null; done.forEach(s=>{ if (b.x < s.x+s.w-6 && b.x+b.w > s.x+6 && s.y<land){ land=s.y; sup=s; } });
      b.y=land-b.h; b.d=sup?sup.d+1:1; b.el.style.top=b.y+'px'; b.el.style.left=b.x+'px'; done.push(b); });
    const maxD=Math.max(0,...blocks.map(b=>b.d||0));
    if (goalN && maxD>=goalN && !reached){ reached=true; setTimeout(()=>{ win(`¡Torre de ${goalN} bloques!`); goalN=Math.min(12,goalN+1); reached=false; const e=root.querySelector('#bg'); if(e) e.textContent=`🎯 Ahora: torre de ${goalN}`; },500); }
    const tallest=Math.max(0,...blocks.map(b=>groundY()-b.y));
    if (!goalN && tallest>root.clientHeight*.55 && !root._said){ root._said=1; tsay('¡Qué torre tan alta!'); react('happy'); }
  }
  function add(kind){
    let s=SH[kind], el=document.createElement('div'); const isF=kind==='amigo';
    if (isF) s={w:64,h:64,css:''};
    const b={el,w:s.w,h:s.h,x:Math.max(8,Math.min(W()-s.w-8, W()/2-s.w/2+rnd(-60,60))),y:10};
    el.className='abs'; el.style.cssText=`left:${b.x}px;top:10px;width:${s.w}px;height:${s.h}px;${isF?'font-size:var(--fs-7xl);line-height:64px;text-align:center':`background:${pick(PAST)};box-shadow:inset 0 -6px 0 rgba(0,0,0,.08);${s.css}`};transition:top .45s cubic-bezier(.5,0,.6,1.3),left .2s;z-index:2`;
    if (isF) el.innerHTML=petMini(prof(),64);
    root.appendChild(el); blocks.push(b);
    dragify(el, root, {drop:(e)=>{ b.x=Math.max(0,Math.min(W()-b.w, parseFloat(e.style.left))); b.y=parseFloat(e.style.top); settle(); plopS(); }});
    requestAnimationFrame(()=>settle()); setTimeout(plopS,350);
    tsay(isF?`¡${mname(prof().avatar)} quiere subir!`:({cuadrado:'Un cuadrado',rectángulo:'Un rectángulo',torre:'Una torre',triángulo:'Un triángulo',arco:'Un arco',círculo:'Un círculo'})[kind]);
  }
  root.querySelectorAll('[data-s]').forEach(b=>b.addEventListener('click',()=>add(b.dataset.s)));
  root.querySelector('#cl').addEventListener('click',()=>{ blocks.splice(0).forEach(b=>b.el.remove()); root._said=0; tsay('¡A construir otra vez!'); });
}

/* ---------- 5. Jardín ---------- */
function toyGarden(root){
  const SEEDS=[['🌻','girasol'],['🌷','tulipán'],['🍅','tomate'],['🌽','maíz'],['🍓','fresa'],['🌺','cayena']];
  let tool='s0', harvest=0; const plots=[];
  addHTML(root, `<div style="position:absolute;inset:0 0 var(--tbar-h) 0;background:linear-gradient(#DDEFFB 0%,#F3F9FD 55%,#E6D3BC 55%,#D9C2A5 100%)"></div>
  <div class="abs" style="top:22px;left:22px;font-size:var(--fs-7xl);animation:bob 4s ease-in-out infinite">☀️</div>
  <div class="abs" style="top:40px;left:52%;font-size:var(--fs-5xl);opacity:.85;animation:drift 40s linear infinite">☁️</div>
  <div class="abs" id="bk" style="top:18px;right:16px;font-size:var(--fs-4xl);background:var(--card);border-radius:var(--r-md);padding:var(--s-1) var(--s-3);border:var(--bw) solid var(--line);font-weight:800">🧺 <span id="hv" style="font-size:var(--fs-lg)">0</span></div>
  <div id="pl" class="abs" style="left:0;right:0;bottom:110px;display:flex;justify-content:space-evenly;align-items:flex-end"></div>
  <div class="tbar">${SEEDS.map((s,i)=>`<button data-t="s${i}" class="${i?'':'on'}">${s[0]}</button>`).join('')}<span class="sep"></span><button data-t="w">💧</button><button data-t="h">🧺</button></div>`);
  const row=root.querySelector('#pl');
  for (let i=0;i<5;i++){ const p=document.createElement('button'); p.style.cssText='position:relative;width:17%;max-width:90px;height:130px;display:flex;flex-direction:column;justify-content:flex-end;align-items:center';
    p.innerHTML='<span class="pt" style="font-size:var(--fs-7xl);line-height:1;transform-origin:50% 100%"></span><span style="width:100%;height:26px;border-radius:50% 50% 12px 12px;background:#9C7556"></span>';
    row.appendChild(p); plots.push({el:p,type:null,stage:0}); p.addEventListener('click',()=>tap(plots[i])); }
  const show=(pl)=>{ const s=pl.el.querySelector('.pt'); s.style.animation='none'; void s.offsetWidth; s.style.animation='popin .5s both';
    s.textContent= pl.type===null?'':pl.stage===0?'🟤':pl.stage===1?'🌱':pl.stage===2?'🌿':SEEDS[pl.type][0]; s.style.fontSize=pl.stage===0?'20px':'52px'; };
  function tap(pl){
    if (tool[0]==='s'){ if (pl.type!==null){ tsay(pl.stage<3?'Ahora riégala con 💧':'¡Ya creció! Cosecha con 🧺'); return; }
      pl.type=+tool.slice(1); pl.stage=0; show(pl); plopS(); tsay(`Sembraste ${SEEDS[pl.type][1]}. ¡Ahora riégala!`); return; }
    if (tool==='w'){ if (pl.type===null){ tsay('Primero siembra una semilla'); return; } if (pl.stage>=3){ tsay('¡Ya está grande!'); return; }
      for (let k=0;k<6;k++){ const d=document.createElement('span'); d.textContent='💧'; d.style.cssText=`position:absolute;left:${10+k*14}%;top:-70px;font-size:var(--fs-sm);animation:drop 1s ease-in ${k*.08}s forwards;opacity:.9`; pl.el.appendChild(d); setTimeout(()=>d.remove(),900); }
      setTimeout(()=>{ pl.stage++; show(pl); note(600+pl.stage*120,.3,'sine',.1);
        if (pl.stage===3){ tsay(`¡Creció ${SEEDS[pl.type][1]}! Las plantas necesitan agua y sol.`); react('happy'); sparks(pl.el,8); butterfly(); } }, 700); return; }
    if (tool==='h'){ if (pl.stage<3){ tsay('Todavía no está lista'); return; }
      flyTo(pl.el.querySelector('.pt'),'bk'); harvest++; root.querySelector('#hv').textContent=harvest; pl.type=null; pl.stage=0; show(pl); popS(); tsay(`Tienes ${harvest} en la canasta`); }
  }
  function butterfly(){ const b=document.createElement('div'); b.className='abs'; b.textContent=pick(['🦋','🐝','🐞']); b.style.cssText=`left:${rnd(10,60)}%;top:${rnd(18,35)}%;font-size:var(--fs-4xl);animation:flutter ${rnd(5,8)}s ease-in-out infinite;z-index:3`; root.appendChild(b); }
  root.querySelectorAll('[data-t]').forEach(b=>b.addEventListener('click',()=>{ tool=b.dataset.t; root.querySelectorAll('[data-t]').forEach(x=>x.classList.toggle('on',x===b));
    tsay(tool==='w'?'Regadera: toca una planta':tool==='h'?'Canasta: toca una planta grande':`Semilla de ${SEEDS[+tool.slice(1)][1]}`); }));
}

/* ---------- 6. Acuario ---------- */
function toyAquarium(root){
  const FISH=[['🐟','pez'],['🐠','pez tropical'],['🐡','pez globo'],['🐙','pulpo'],['🦀','cangrejo'],['🐢','tortuga'],['🐬','delfín'],['🦈','tiburón']];
  const fish=[], food=[]; let raf, bub;
  addHTML(root, `<div id="tk" class="abs" style="inset:0 0 var(--tbar-h) 0;background:linear-gradient(#CFE8F6,#8FC3E6);overflow:hidden">
    <div class="abs" style="left:0;right:0;bottom:0;height:40px;background:#EBD9B4;border-radius:50% 50% 0 0/20px 20px 0 0"></div>
    ${[8,26,62,84].map(x=>`<span class="abs" style="left:${x}%;bottom:22px;font-size:var(--fs-6xl);transform-origin:50% 100%;animation:palm 4s ease-in-out ${-x/20}s infinite">🌿</span>`).join('')}
    <span class="abs" style="left:44%;bottom:24px;font-size:var(--fs-4xl)">🪸</span><span class="abs" style="left:72%;bottom:26px;font-size:var(--fs-3xl)">🐚</span></div>
  <div class="tbar">${FISH.map((f,i)=>`<button data-f="${i}">${f[0]}</button>`).join('')}</div>`);
  const tk=root.querySelector('#tk');
  const Wt=()=>tk.clientWidth, Ht=()=>tk.clientHeight;
  function add(i){ if (fish.length>=16){ tsay('¡El acuario está lleno!'); return; }
    const el=document.createElement('span'); el.className='abs'; el.textContent=FISH[i][0]; el.style.cssText='left:0;top:0;font-size:var(--fs-5xl);will-change:transform';
    tk.appendChild(el); const f={el,x:rnd(20,Wt()-60),y:rnd(30,Ht()-110),tx:0,ty:0,sp:.6+Math.random()*.9,dir:1,crab:i===4}; newT(f); fish.push(f);
    plopS(); tsay(`¡Hay ${fish.length} ${fish.length===1?'animalito':'animalitos'}!`); }
  const newT=f=>{ f.tx=rnd(10,Wt()-60); f.ty=f.crab?Ht()-80:rnd(20,Ht()-110); };
  tk.addEventListener('pointerdown',e=>{ const p=rel(tk,e); for(let k=0;k<3;k++){ const el=document.createElement('span'); el.className='abs'; el.style.cssText='width:8px;height:8px;border-radius:50%;background:#B07A4A;left:0;top:0';
    tk.appendChild(el); food.push({el,x:p.x+rnd(-12,12),y:p.y+rnd(-6,6)}); } popS(); if(!root._fed){ root._fed=1; tsay('¡Ñam! Les diste comida'); } });
  function loop(){
    food.forEach(fd=>{ if (fd.y<Ht()-46) fd.y+=.6; fd.el.style.transform=`translate(${fd.x}px,${fd.y}px)`; });
    fish.forEach(f=>{ let tx=f.tx, ty=f.ty, tf=null;
      if (food.length){ tf=food.reduce((a,b)=>Math.hypot(b.x-f.x-20,b.y-f.y-20)<Math.hypot(a.x-f.x-20,a.y-f.y-20)?b:a); tx=tf.x-20; ty=f.crab?f.y:tf.y-20; }
      const dx=tx-f.x, dy=ty-f.y, d=Math.hypot(dx,dy)||1, sp=f.sp*(tf?2.2:1);
      if (d>2){ f.x+=dx/d*sp; f.y+=dy/d*sp; if (Math.abs(dx)>1) f.dir=dx>0?-1:1; }
      if (tf && Math.hypot(tf.x-f.x-20,tf.y-f.y-20)<20){ tf.el.remove(); food.splice(food.indexOf(tf),1); note(500,.08,'sine',.08); }
      else if (!tf && d<6) newT(f);
      f.el.style.transform=`translate(${f.x}px,${f.y}px) scaleX(${f.crab?1:f.dir})`; });
    raf=requestAnimationFrame(loop); }
  bub=setInterval(()=>{ const b=document.createElement('span'); b.className='abs'; b.style.cssText=`left:${rnd(5,95)}%;bottom:30px;width:${rnd(8,16)}px;aspect-ratio:1;border-radius:50%;border:var(--bw) solid rgba(255,255,255,.8);animation:rise2 ${rnd(5,8)}s linear forwards`; tk.appendChild(b); setTimeout(()=>b.remove(),8000); },700);
  root.querySelectorAll('[data-f]').forEach(b=>b.addEventListener('click',()=>add(+b.dataset.f)));
  add(0); add(1); loop();
  const hint=setTimeout(()=>tsay('Toca el agua para darles comida'),2600);
  return ()=>{ cancelAnimationFrame(raf); clearInterval(bub); clearTimeout(hint); };
}

/* ---------- 7. Burbujas ---------- */
const LETRAS={A:['abeja','🐝'],B:['barco','⛵'],C:['casa','🏠'],D:['dado','🎲'],E:['elefante','🐘'],F:['foca','🦭'],G:['gato','🐱'],H:['helado','🍦'],I:['iguana','🦎'],J:['jirafa','🦒'],K:['kiwi','🥝'],L:['luna','🌙'],M:['mano','✋'],N:['nube','☁️'],'Ñ':['ñame','🍠'],O:['oso','🐻'],P:['pato','🦆'],Q:['queso','🧀'],R:['ratón','🐭'],S:['sol','☀️'],T:['tortuga','🐢'],U:['uvas','🍇'],V:['vaca','🐄'],W:['waffle','🧇'],X:['xilófono','🎵'],Y:['yoyo','🪀'],Z:['zapato','👟']};
function toyBubbles(root){
  const COLS=[['rojo','#F4A6A6'],['azul','#A9D3F0'],['amarillo','#F6E39A'],['verde','#B9E3C6'],['morado','#C9B8EE'],['rosado','#F5B8D0'],['anaranjado','#F7C59F']];
  const ANIM=[['🐶','perro','dog'],['🐱','gato','cat'],['🐮','vaca','cow'],['🐷','cerdo','pig'],['🐸','rana','frog'],['🐵','mono','monkey'],['🦁','león','lion'],['🐔','gallina','hen'],['🐰','conejo','rabbit'],['🐴','caballo','horse']];
  let mode='n', it;
  addHTML(root, `<div id="bz" class="abs" style="inset:0 0 var(--tbar-h) 0;background:linear-gradient(#EAF4FB,var(--bg));overflow:hidden"></div>
  <div class="tbar"><button data-m="n" class="on">123</button><button data-m="l">ABC</button><button data-m="c">🎨</button><button data-m="a">🐾</button></div>`);
  const bz=root.querySelector('#bz');
  function spawn(){ if (bz.children.length>9) return;
    const b=document.createElement('button'); const sz=rnd(78,104); let txt='', sayT='', lang='es-ES', bg='rgba(255,255,255,.55)';
    if (mode==='n'){ const n=rnd(1,20); txt=n; sayT=String(n); }
    else if (mode==='l'){ const L=pick(Object.keys(LETRAS)); txt=L; sayT=`${L}, de ${LETRAS[L][0]}`; }
    else if (mode==='c'){ const c=pick(COLS); bg=c[1]; sayT=c[0]; }
    else { const a=pick(ANIM); txt=a[0]; sayT=`${a[1]}. En inglés, ${a[2]}`; }
    b.className='abs'; b.innerHTML=`<span style="display:grid;place-items:center;width:100%;height:100%;animation:sway ${rnd(3,5)}s ease-in-out infinite">${txt}</span>`;
    b.style.cssText=`left:${rnd(2,80)}%;bottom:-120px;width:${sz}px;height:${sz}px;border-radius:50%;font-size:${mode==='a'?40:34}px;font-weight:800;color:var(--ink);background:radial-gradient(circle at 30% 30%,rgba(255,255,255,.95) 0 12%,transparent 13%),${bg};border:3px solid rgba(255,255,255,.9);box-shadow:inset -6px -8px 14px rgba(140,170,210,.35);animation:rise2 ${rnd(8,12)}s linear forwards`;
    b.addEventListener('pointerdown',e=>{ e.preventDefault(); popS(); speak(sayT,lang); b.style.transition='transform .2s,opacity .2s'; b.style.animationPlayState='paused'; b.style.transform+=' scale(1.5)'; b.style.opacity='0';
      if (mode==='l'){ const r=bz.getBoundingClientRect(),a=b.getBoundingClientRect(); const em=document.createElement('span'); em.className='abs'; em.textContent=LETRAS[txt][1]; em.style.cssText=`left:${a.left-r.left+sz/2-20}px;top:${a.top-r.top}px;font-size:var(--fs-5xl);animation:up 1.2s ease-out forwards`; bz.appendChild(em); setTimeout(()=>em.remove(),1200); }
      setTimeout(()=>b.remove(),220); });
    b.addEventListener('animationend',ev=>{ if(ev.animationName==='rise2') b.remove(); });
    bz.appendChild(b); }
  it=setInterval(spawn,1000); spawn();
  root.querySelectorAll('[data-m]').forEach(b=>b.addEventListener('click',()=>{ mode=b.dataset.m; root.querySelectorAll('[data-m]').forEach(x=>x.classList.toggle('on',x===b)); bz.innerHTML=''; spawn();
    tsay({n:'Burbujas de números',l:'Burbujas de letras',c:'Burbujas de colores',a:'Burbujas de animales'}[mode]); }));
  return ()=>clearInterval(it);
}

/* ---------- 8. Viste a tu amigo ---------- */
function toyDress(root){
  const CAT={hat:{top:-58,left:50,fs:84,it:['🎩','👒','🧢','👑','🎓','⛑️','🪖']},eyes:{top:46,left:50,fs:64,it:['👓','🕶️','🥽']},neck:{top:132,left:50,fs:54,it:['🎀','🧣','👔','📿']},hand:{top:96,left:96,fs:56,it:['🎈','🌂','🍭','🪄','🌻','⚽']}};
  const on={};
  addHTML(root, `<div class="abs" style="inset:0 0 var(--tbar-h) 0;background:radial-gradient(circle at 50% 60%,#FFF6E8,#F6E7F0)"></div>
  <div id="fl" class="abs" style="inset:0;background:var(--card);opacity:0;pointer-events:none;z-index:7"></div>
  <div id="dm" class="abs" style="left:50%;top:52%;width:180px;height:180px;transform:translate(-50%,-50%)"><span class="abs" style="inset:0;font-size:164px;line-height:180px;text-align:center">${prof().avatar}</span></div>
  <div class="tbar">${Object.entries(CAT).map(([k,c])=>c.it.map(e=>`<button data-k="${k}" data-e="${e}">${e}</button>`).join('')).join('<span class="sep"></span>')}<span class="sep"></span><button id="ph">📸</button><button id="cl">🔄</button></div>`);
  const dm=root.querySelector('#dm');
  root.querySelectorAll('[data-e]').forEach(b=>b.addEventListener('click',()=>{ const k=b.dataset.k, e=b.dataset.e, c=CAT[k];
    if (on[k]){ on[k].el.remove(); root.querySelector(`[data-e="${on[k].e}"]`).classList.remove('on'); if (on[k].e===e){ delete on[k]; return; } }
    const el=document.createElement('span'); el.className='abs'; el.textContent=e; el.style.cssText=`left:${c.left}%;top:${c.top}px;font-size:${c.fs}px;transform:translateX(-50%);animation:popin .4s both;z-index:2;line-height:1`;
    dm.appendChild(el); on[k]={el,e}; b.classList.add('on'); popS(); react('happy'); tsay(pick(['¡Me encanta!','¡Qué bonito!','¡Gracias!','¡Me queda genial!'])); }));
  root.querySelector('#ph').addEventListener('click',()=>{ const f=root.querySelector('#fl'); f.style.animation='none'; void f.offsetWidth; f.style.animation='flash .6s'; note(1200,.1,'square',.06); confetti(); tsay('¡Clic! ¡Qué foto tan linda!'); });
  root.querySelector('#cl').addEventListener('click',()=>{ Object.values(on).forEach(o=>o.el.remove()); Object.keys(on).forEach(k=>delete on[k]); root.querySelectorAll('[data-e]').forEach(x=>x.classList.remove('on')); tsay('Ropa guardada'); });
  if (LV()>=2){
    addHTML(root, `<div id="md" class="abs" style="left:12px;top:12px;background:var(--card);border:var(--bw) solid var(--line);border-radius:var(--r-md);padding:var(--s-2) var(--s-3);font-weight:800;z-index:5;max-width:150px"></div>`);
    const md=root.querySelector('#md'); let model=null, hid=false;
    const newModel=()=>{ const ks=sample(Object.keys(CAT), LV()===2?2:4); model=Object.fromEntries(ks.map(k=>[k,pick(CAT[k].it)])); hid=false;
      md.innerHTML=`🎯 Copia este look:<div style="font-size:var(--fs-4xl);margin-top:var(--s-1)">${Object.values(model).join(' ')}</div>`;
      if (LV()===3) setTimeout(()=>{ hid=true; md.innerHTML='🎯 ¿Lo recuerdas? 🤔<br><small class="muted">Toca aquí para verlo</small>'; },4500); };
    md.addEventListener('click',()=>{ if(hid&&model){ md.innerHTML=`<div style="font-size:var(--fs-4xl)">${Object.values(model).join(' ')}</div>`; setTimeout(()=>{ if(model) md.innerHTML='🎯 ¿Lo recuerdas? 🤔<br><small class="muted">Toca aquí para verlo</small>'; },1500); } });
    const check=()=>{ if(!model) return; const ok=Object.keys(CAT).every(k=> (model[k]||null) === (on[k]?on[k].e:null)); if(ok){ model=null; win('¡Igualito! Copiaste el look'); setTimeout(newModel,2600); } };
    root.querySelectorAll('[data-e]').forEach(b=>b.addEventListener('click',()=>setTimeout(check,50)));
    setTimeout(newModel,2800);
  }
}

/* ---------- 9. Pizzería ---------- */
function toyPizza(root){
  /* Pizzería-restaurante: llega un cliente y pide una pizza con ingredientes específicos.
     Se arma (salsa + ingredientes, tocar uno puesto lo quita), se hornea y se sirve; el cliente revisa el pedido.
     Nivel 1: un ingrediente · nivel 2: dos · nivel 3: tres y además una fracción de la pizza (porciones de 8).
     Si no coincide, el cliente dice qué cambió y se repite el mismo pedido con masa nueva. */
  const lv=LV();
  const ING=[['🧀','queso','quesos'],['🍄','champiñón','champiñones'],['🫑','ají','ajíes'],['🍍','piña','piñas'],['🌽','maíz','maíces'],['🫒','aceituna','aceitunas'],['🍅','tomate','tomates']];
  const CUST=['🐶','🐱','🐰','🐥','🐮','🐷','🦁','🐵','🐯','🦒','🐘','🦜'];
  const PARTES=[[4,'la mitad'],[2,'un cuarto'],[6,'tres cuartos']];
  /* ingredientes en estilo plano (13-plano-lugares.js), solo para mostrar */
  const PZ={'🧀':'queso_lonja','🍄':'hongo','🫑':'aji_aro','🍍':'pina_trozo','🌽':'granos','🫒':'aceituna','🍅':'tomate_rodaja'};
  const pzi=(e,t='1.1em')=>PZ[e]&&iluFuente(PZ[e])?ilu(PZ[e],t):e;
  const custArt=e=>{ const [sp,outfit]=(window.CLIENTES||{})[e]||['leon',{}]; return `<span class="cli">${creature(sp,{outfit})}</span>`; };
  let cnt={}, baked=false, sauce=false, order=null, servidas=new Set(), felices=0, vivo=true, ocupado=false;
  const luego=(fn,ms)=>setTimeout(()=>{ if(vivo) fn(); },ms);
  addHTML(root, `<div class="abs" style="inset:0 0 var(--tbar-h) 0;background:repeating-linear-gradient(45deg,var(--paper-2) 0 22px,#FBEFE3 22px 44px)"></div>
  <div id="sala" class="abs" style="left:0;right:0;top:0;height:128px;background:#FFF4E4;border-bottom:6px solid #D9B48A;z-index:1">
    <div class="abs" style="left:0;right:0;top:0;height:22px;background:repeating-linear-gradient(90deg,var(--c-rosa) 0 30px,var(--white) 30px 60px);border-radius:0 0 50% 50%/0 0 12px 12px"></div>
    <div id="cl" class="abs" style="left:8px;bottom:0;display:flex;align-items:flex-end;gap:var(--s-1);right:8px"></div>
    <div id="fe" class="abs" aria-label="Clientes felices" style="left:8px;top:138px;z-index:6;background:var(--card);border:var(--bw) solid var(--line);border-radius:var(--r-pill);padding:var(--s-1) var(--s-3);font-weight:800;font-size:var(--fs-sm);box-shadow:var(--sh-1)">${emo('⭐')} <b>0</b></div>
  </div>
  <div id="base" class="abs" style="left:50%;top:calc(128px + (100% - 128px - var(--tbar-h) - 50px) / 2);width:calc(var(--pz) + 36px);height:calc(var(--pz) + 36px);transform:translate(-50%,-50%);border-radius:50%;background:#E6C39C;border:1.6px solid #B48C66;box-shadow:0 7px 0 #D2AA80"></div>
  <div id="pz" class="abs" style="left:50%;top:calc(128px + (100% - 128px - var(--tbar-h) - 50px) / 2);width:var(--pz);height:var(--pz);transform:translate(-50%,-50%);border-radius:50%;background:#F4D9A4;border:1.6px solid #C9A06A;box-shadow:inset 0 0 0 15px #E9C084;transition:filter 1s">
    <div id="sc" class="abs" style="inset:18px;border-radius:50%;background:#EE8A74;opacity:0;transform:scale(.25) rotate(-40deg);transition:opacity .4s,transform .7s var(--ease-pop)"></div>
    <svg id="sl" class="abs" viewBox="0 0 270 270" style="inset:0;width:100%;height:100%;z-index:3;pointer-events:none"></svg></div>
  <div class="tbar"><button id="sa" aria-label="Salsa">${ilu('salsa','1.1em')}</button>${ING.map((x,i)=>`<button data-i="${i}" aria-label="${x[1]}">${pzi(x[0])}</button>`).join('')}</div>
  <button id="hn" class="chip abs" style="left:10px;bottom:calc(var(--tbar-h) + 10px);min-height:var(--tap);padding:0 var(--s-3);z-index:6">${ilu('llama','1.2em')} Hornear</button>
  <button id="sv" class="chip abs" style="right:10px;bottom:calc(var(--tbar-h) + 10px);min-height:var(--tap);padding:0 var(--s-3);z-index:6">${ilu('porcion','1.1em')} Servir</button>
  <button id="nw" class="icon-btn abs" aria-label="Masa nueva" style="right:8px;top:136px;z-index:6">${kic('reiniciar','1.1em')}</button>`);
  const pz=root.querySelector('#pz'), sl=root.querySelector('#sl'), cl=root.querySelector('#cl'), fe=root.querySelector('#fe b');
  /* la pizza se ajusta al espacio libre entre el salón y la barra */
  let lado=270; const medir=()=>{ const tb=root.querySelector(':scope > .tbar'), al=root.clientHeight-128-(tb?tb.offsetHeight:70), an=root.clientWidth; lado=Math.max(140,Math.min(270,al-50-50,an-56)); root.style.setProperty('--pz',lado+'px'); };
  medir(); window.addEventListener('resize',medir);
  const nombres=(i,n)=>`${n} ${n===1?ING[i][1]:ING[i][2]}`;
  function masa(){ pz.querySelectorAll('.top').forEach(x=>x.remove()); sl.innerHTML=''; sl.style.pointerEvents='none'; baked=false; sauce=false; cnt={}; servidas=new Set(); pz.style.filter=''; root.querySelector('#sv').classList.remove('on'); Object.assign(root.querySelector('#sc').style,{opacity:'0',transform:'scale(.25) rotate(-40deg)'}); }
  function pintaPedido(extra=''){
    const o=order, lista=Object.entries(o.ing).map(([i,n])=>`<span style="display:inline-flex;align-items:center;gap:2px;white-space:nowrap"><b>${n}</b>${pzi(ING[i][0],'1.5em')}</span>`).join(' ');
    cl.innerHTML=`<span style="font-size:var(--fs-7xl);display:inline-block;line-height:1;flex:none">${custArt(o.quien)}</span><div class="bubble" style="font-size:var(--fs-sm);line-height:1.2;padding:var(--s-1) var(--s-3);margin-bottom:var(--s-2);min-width:0"><div style="font-weight:800;line-height:1.15">Quiero pizza con:</div><div style="display:flex;flex-wrap:wrap;align-items:center;gap:0 var(--s-2);margin-top:2px"><span title="salsa" style="display:inline-flex">${ilu('salsa','1.5em')}</span>${lista}</div>${o.parte?`<div style="font-weight:800;margin-top:2px;color:#5A566B">Sirve ${o.parte[1]}: ${o.parte[0]} de 8</div>`:''}${extra}</div>`;
  }
  function cliente(){
    const ks=sample(ING.map((_,i)=>i), lv); const ing=Object.fromEntries(ks.map(i=>[i, lv===3?rnd(1,4):rnd(1,3)]));
    order={ing, quien:pick(CUST), parte: lv===3?pick(PARTES):null}; masa(); pintaPedido(); if (typeof entrar==='function') entrar(cl.firstElementChild); ocupado=false;
    tsay('Quiero una pizza con salsa y '+Object.entries(ing).map(([i,n])=>nombres(i,n)).join(', ').replace(/, ([^,]*)$/,' y $1')+(order.parte?`. Sírveme ${order.parte[1]}`:''));
  }
  root.querySelector('#sa').addEventListener('click',()=>{ if(baked||ocupado) return; sauce=true; Object.assign(root.querySelector('#sc').style,{opacity:'1',transform:'none'}); plopS(); tsay('Salsa de tomate'); });
  root.querySelectorAll('[data-i]').forEach(b=>b.addEventListener('click',()=>{ if (ocupado) return; if (baked){ tsay('Ya está horneada. Sírvela o empieza una masa nueva.'); return; }
    const i=+b.dataset.i, [e,s,p]=ING[i]; const a=Math.random()*Math.PI*2, r=Math.sqrt(Math.random())*lado*.355;
    const el=document.createElement('button'); el.className='abs top'; el.setAttribute('aria-label','Quitar '+s); el.innerHTML=pzi(e,'1.3em');
    el.style.cssText=`left:${lado/2+Math.cos(a)*r-19}px;top:${lado/2+Math.sin(a)*r-19}px;width:38px;height:38px;padding:0;background:none;border:0;display:grid;place-items:center;font-size:var(--fs-3xl);line-height:1;--r:${rnd(-30,30)}deg;animation:caer .5s cubic-bezier(.3,1.3,.5,1) both;z-index:2;transform:rotate(var(--r))`;
    el.addEventListener('click',()=>{ if (baked||ocupado) return; el.remove(); cnt[i]--; popS(); tsay(`Quitaste 1 ${s}. Quedan ${cnt[i]}`); });
    pz.appendChild(el); cnt[i]=(cnt[i]||0)+1; popS(); tsay(nombres(i,cnt[i])); }));
  root.querySelector('#hn').addEventListener('click',()=>{ if (baked||ocupado) return; baked=true; tsay('Al horno... ¡3, 2, 1!'); pz.style.filter='brightness(.75) saturate(.6)'; hornear(root,pz,1600);
    luego(()=>{ pz.style.filter='saturate(1.12) brightness(.97)'; let h=''; for(let k=0;k<8;k++){ const a0=k/8*Math.PI*2-Math.PI/2, a1=(k+1)/8*Math.PI*2-Math.PI/2;
        h+=`<path data-k="${k}" d="M135 135L${135+135*Math.cos(a0)} ${135+135*Math.sin(a0)}A135 135 0 0 1 ${135+135*Math.cos(a1)} ${135+135*Math.sin(a1)}Z" fill="transparent" stroke="#C99A55" stroke-width="2" style="transition:fill .3s;pointer-events:auto;cursor:pointer"/>`; }
      sl.innerHTML=h; react('happy'); root.querySelector('#sv').classList.add('on');
      if (order.parte){ sl.style.pointerEvents='auto'; tsay(`¡Lista! Toca las porciones para servir ${order.parte[1]} y luego Servir`); }
      else tsay('¡Pizza lista! Toca Servir para llevarla a la mesa'); }, 1600); });
  /* nivel 3: tocar una porción la pone (o la quita) del plato del cliente */
  sl.addEventListener('click',e=>{ const p=e.target.closest('[data-k]'); if(!p||!baked||ocupado||!order.parte) return; const k=+p.dataset.k;
    if (servidas.has(k)){ servidas.delete(k); p.setAttribute('fill','transparent'); } else { servidas.add(k); p.setAttribute('fill','rgba(255,255,255,.62)'); if (typeof migas==='function') migas(pz,k); }
    note(300,.12,'square',.05); tsay(`${servidas.size} de 8 porciones`); });
  root.querySelector('#sv').addEventListener('click',()=>{ if (ocupado) return; if (!baked){ tsay('Primero hornea la pizza'); return; }
    const o=order, mal=[];
    if (!sauce) mal.push('faltó la salsa');
    ING.forEach((x,i)=>{ const pide=o.ing[i]||0, hay=cnt[i]||0; if (pide===hay) return;
      mal.push(pide===0 ? `no pedí ${x[2]}` : hay===0 ? (pide===1?`faltó 1 ${x[1]}`:`faltaron ${pide} ${x[2]}`) : `pedí ${nombres(i,pide)} y hay ${hay}`); });
    if (o.parte && servidas.size!==o.parte[0]) mal.push(`pedí ${o.parte[1]}, que son ${o.parte[0]} porciones, y serviste ${servidas.size}`);
    ocupado=true;
    if (!mal.length){ felices++; fe.textContent=felices; confetti(); win('¡Pedido perfecto! El cliente quedó feliz'); const c=cl.firstElementChild; luego(()=>{ if (typeof salir==='function') salir(c); },1500); luego(cliente,2700); }
    else { react('think'); const txt='Casi: '+mal.slice(0,2).join(' y ')+'.'; pintaPedido(`<div style="margin-top:var(--s-1);font-weight:700;color:#8A4B3C">${txt}</div>`); tsay(txt+' ¡Probemos otra vez!'); note(220,.2,'sine',.1);
      luego(()=>{ masa(); pintaPedido(); ocupado=false; tsay('Masa nueva. Mira bien el pedido.'); },3400); } });
  root.querySelector('#nw').addEventListener('click',()=>{ if (ocupado) return; masa(); tsay('Masa nueva. ¡Pon la salsa!'); });
  luego(cliente,900);
  return ()=>{ vivo=false; window.removeEventListener('resize',medir); };
}

/* ---------- 10. Clasificar ---------- */
function toySort(root){
  const SETS={
    color:{b:[['🔴','rojo'],['🟡','amarillo'],['🟢','verde']], it:[['🍎',0],['🍓',0],['🌹',0],['❤️',0],['🍒',0],['🍌',1],['🌻',1],['⭐',1],['🐥',1],['🌽',1],['🥦',2],['🐸',2],['🍏',2],['🌿',2],['🥒',2]]},
    casa:{b:[['🌊','agua'],['🌳','tierra'],['☁️','aire']], it:[['🐟',0],['🐙',0],['🐬',0],['🦀',0],['🐳',0],['🐶',1],['🐘',1],['🦁',1],['🐴',1],['🐰',1],['🐦',2],['🦋',2],['🐝',2],['🦅',2],['🦜',2]]},
    tipo:{b:[['🍽️','comida'],['🧸','juguetes']], it:[['🍎',0],['🍌',0],['🍕',0],['🥕',0],['🧀',0],['🍪',0],['⚽',1],['🪀',1],['🧸',1],['🎈',1],['🪁',1],['🚂',1]]}
  };
  let cur='color', left=0;
  addHTML(root, `<div class="abs" style="inset:0 0 var(--tbar-h) 0;background:var(--paper)"></div><div id="ar" class="abs" style="inset:0 0 var(--tbar-h) 0"></div>
  <div class="tbar"><button data-s="color" class="on">🎨 Colores</button><button data-s="casa">🏠 ¿Dónde vive?</button><button data-s="tipo">🧺 Comida o juguete</button></div>`);
  const ar=root.querySelector('#ar');
  function round(){
    ar.innerHTML=''; const S=SETS[cur]; const items=sample(S.it, S.b.length===2?8:9); left=items.length;
    const W=ar.clientWidth, H=ar.clientHeight, bw=Math.min(130,(W-40)/S.b.length-12);
    const baskets=S.b.map((b,i)=>{ const el=document.createElement('div'); el.className='abs';
      el.style.cssText=`left:${(W/S.b.length)*(i+.5)-bw/2}px;top:${H-140}px;width:${bw}px;height:120px;border-radius:20px 20px 34px 34px;background:#EAD8BF;border:4px solid #D7BE9C;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding-top:var(--s-2);transition:transform .2s`;
      el.innerHTML=`<span style="font-size:var(--fs-4xl)">${b[0]}</span><b style="font-size:var(--fs-xs)">${b[1]}</b><div class="in" style="display:flex;flex-wrap:wrap;justify-content:center;font-size:var(--fs-md);max-width:100%"></div>`; ar.appendChild(el); return el; });
    items.forEach(([e,k],j)=>{ const el=document.createElement('div'); el.className='abs'; el.textContent=e;
      const x=rnd(10,W-70), y=rnd(60,Math.max(70,H-230)); el.style.cssText=`left:${x}px;top:${y}px;font-size:var(--fs-6xl);line-height:1;z-index:3;transition:left .35s,top .35s;animation:popin .4s ${j*.05}s both`;
      el.dataset.x=x; el.dataset.y=y; ar.appendChild(el);
      dragify(el, ar, {start:()=>popS(), drop:(el,px,py)=>{
        const hit=baskets.findIndex(b=>{ const r=b.getBoundingClientRect(), a=ar.getBoundingClientRect(); return px>r.left-a.left-10 && px<r.right-a.left+10 && py>r.top-a.top-30 && py<r.bottom-a.top; });
        if (hit===k){ baskets[k].querySelector('.in').insertAdjacentHTML('beforeend',`<span style="animation:popin .3s both">${e}</span>`); el.remove(); left--; note(660,.2,'sine',.12);
          baskets[k].style.transform='scale(1.08)'; setTimeout(()=>baskets[k].style.transform='',200);
          if (left===0){ react('happy'); confetti(); tsay('¡Todo en su lugar! ¡Muy bien!'); setTimeout(round,2600); } }
        else { el.style.left=el.dataset.x+'px'; el.style.top=el.dataset.y+'px'; if (hit>=0){ el.classList.add('wob'); setTimeout(()=>el.classList.remove('wob'),500); tsay('Hmm... ¿y en otra canasta?'); } } }}); });
  }
  root.querySelectorAll('[data-s]').forEach(b=>b.addEventListener('click',()=>{ cur=b.dataset.s; root.querySelectorAll('[data-s]').forEach(x=>x.classList.toggle('on',x===b)); round();
    tsay({color:'Ordena por colores',casa:'¿Vive en el agua, en la tierra o en el aire?',tipo:'¿Es comida o es un juguete?'}[cur]); }));
  setTimeout(round,30);
}

/* ---------- 11. Encaje de figuras ---------- */
function shapeSVG(t, fill, stroke, dash=''){
  const star=(n,R,r)=>times(n*2,i=>{const a=i/(n*2)*Math.PI*2-Math.PI/2, rr=i%2?r:R; return `${(40+rr*Math.cos(a)).toFixed(1)},${(42+rr*Math.sin(a)).toFixed(1)}`;}).join(' ');
  const reg=n=>times(n,i=>{const a=i/n*Math.PI*2-Math.PI/2; return `${(40+34*Math.cos(a)).toFixed(1)},${(41+34*Math.sin(a)).toFixed(1)}`;}).join(' ');
  const at=`fill="${fill}" stroke="${stroke}" stroke-width="4" stroke-linejoin="round" ${dash?`stroke-dasharray="${dash}"`:''}`;
  const sh={'círculo':`<circle cx="40" cy="40" r="33" ${at}/>`,'cuadrado':`<rect x="9" y="9" width="62" height="62" rx="6" ${at}/>`,'triángulo':`<polygon points="40,6 75,72 5,72" ${at}/>`,
    'estrella':`<polygon points="${star(5,36,15)}" ${at}/>`,'corazón':`<path d="M40 72C12 52 4 32 15 19C25 8 37 12 40 23C43 12 55 8 65 19C76 32 68 52 40 72Z" ${at}/>`,'hexágono':`<polygon points="${reg(6)}" ${at}/>`,
    'rombo':`<polygon points="40,4 74,40 40,76 6,40" ${at}/>`,'luna':`<path d="M52 8A34 34 0 1 0 72 56A27 27 0 1 1 52 8Z" ${at}/>`};
  return `<svg viewBox="0 0 80 80" width="100%" height="100%">${sh[t]}</svg>`;
}
function toyShapes(root){
  const ALL=[['círculo','#F4A6A6','#D97B7B'],['cuadrado','#A9D3F0','#6FA3CB'],['triángulo','#F6E39A','#C2A548'],['estrella','#C9B8EE','#8F82C6'],['corazón','#F5B8D0','#C97F97'],['hexágono','#B9E3C6','#6FAF8F'],['rombo','#F7C59F','#D9946C'],['luna','#BFE0D8','#7FB0A3']];
  const ar=document.createElement('div'); ar.className='abs'; ar.style.cssText='inset:0;background:var(--paper)'; root.appendChild(ar);
  addHTML(root, `<div class="tbar"><button id="nx">🔄 Otras figuras</button></div>`);
  ar.style.bottom='70px';
  function round(){
    const NN=[4,6,8][LV()-1], C=NN===4?2:NN===6?3:4; ar.innerHTML=''; const set=sample(ALL,NN), W=ar.clientWidth, H=ar.clientHeight, S=Math.min(86,(W-40)/C-14); let left=NN;
    const board=document.createElement('div'); board.className='abs'; board.style.cssText=`left:12px;right:12px;top:54px;height:${S*2+48}px;background:#F3E7D6;border-radius:var(--r-lg);border:3px solid #E5D3B8`; ar.appendChild(board);
    const holes=shuffle(set).map((s,i)=>{ const x=12+((W-24)/C)*(i%C+.5)-S/2, y=54+16+Math.floor(i/C)*(S+16);
      const h=document.createElement('div'); h.className='abs'; h.style.cssText=`left:${x}px;top:${y}px;width:${S}px;height:${S}px`; h.innerHTML=shapeSVG(s[0],'#E4D5C0','#C9B79D','6 5'); ar.appendChild(h); return {t:s[0],x,y}; });
    const top0=54+S*2+66, rowH=Math.max(S+12,(H-top0-10)/2); const slots=shuffle(times(NN,k=>[12+((W-24)/C)*(k%C+.5)-S/2+rnd(-6,6), top0+Math.floor(k/C)*rowH+rnd(0,Math.max(0,rowH-S-8))]));
    set.forEach((s,i)=>{ const el=document.createElement('div'); el.className='abs'; const [x,y]=slots[i];
      el.style.cssText=`left:${x}px;top:${y}px;width:${S}px;height:${S}px;z-index:3;transition:left .35s,top .35s;animation:popin .4s ${i*.06}s both`; el.innerHTML=shapeSVG(s[0],s[1],s[2])+`<span class="shface">${ilu('carita','100%')}</span>`; ar.appendChild(el);
      dragify(el, ar, {start:()=>speak(s[0]), drop:(el)=>{ const h=holes.find(h=>h.t===s[0]); const cx=parseFloat(el.style.left), cy=parseFloat(el.style.top);
        if (Math.hypot(cx-h.x,cy-h.y)<S*.6){ el.style.left=h.x+'px'; el.style.top=h.y+'px'; el.dataset.lock=1; el.style.zIndex=2; note(784,.25,'sine',.13); sparkAt(ar,h.x+S/2,h.y+S/2); left--;
          if (left===0){ confetti(); win('¡Encajaste todas las figuras!'); setTimeout(round,2800); } }
        else { el.style.left=x+'px'; el.style.top=y+'px'; } }}); });
  }
  root.querySelector('#nx').addEventListener('click',round);
  setTimeout(round,30);
}

/* ---------- 12. ¿Qué tiempo hace? ---------- */
function toyWeather(root){
  let rainT=null, night=false;
  addHTML(root, `<div id="sk" class="abs" style="inset:0 0 var(--tbar-h) 0;background:#CDE7F8;transition:background 1.2s;overflow:hidden">
    <div id="st" class="abs" style="inset:0;opacity:0;transition:opacity 1.2s">${times(24,()=>`<span class="abs" style="left:${rnd(2,96)}%;top:${rnd(2,45)}%;font-size:${rnd(10,18)}px;animation:twinkle ${rnd(2,4)}s ${Math.random()*2}s infinite">✦</span>`).join('')}</div>
    ${scene('tiempo','inset:0')}
    <div id="sun" class="abs" style="right:12%;top:8%;font-size:var(--fs-8xl);transition:top 1.2s,opacity 1.2s">${ilu('sol','1.1em')}</div>
    <div id="moon" class="abs" style="right:14%;top:60%;font-size:var(--fs-7xl);opacity:0;transition:top 1.2s,opacity 1.2s">${ilu('luna','1em')}</div>
    <div id="rb" class="rainbow"></div>
    <div id="cl" class="abs" style="left:0;right:0;top:4%;opacity:.0;transition:opacity 1s;height:30%">${[[-4,0,34],[22,8,30],[48,0,36],[72,10,32]].map(([x,y,w],i)=>`<div class="${i%2?'drift slow':'drift'}" style="position:absolute;left:${x}%;top:${y}%;width:${w}%">${ilu('nube1','100%')}</div>`).join('')}</div>
    <div id="rn" class="abs" style="inset:0"></div>
    <div class="abs" style="left:0;right:0;bottom:0;height:30%;background:#CFE6B8;border-top:1.6px solid #9FC48A;border-radius:50% 50% 0 0/30px 30px 0 0"></div><div class="charcos" aria-hidden="true"><i style="left:18%;bottom:8%"></i><i style="left:62%;bottom:5%;width:80px"></i><i style="left:80%;bottom:14%;width:46px"></i></div>
    <div id="palm" class="abs" style="left:6%;bottom:22%;font-size:120px;line-height:0;transform-origin:50% 100%;transition:transform .5s">${ilu('palmera_fondo','1em')}</div>
    <div class="abs" style="left:56%;bottom:24%;font-size:84px;line-height:0">${ilu('casa','1em')}</div>
    <div class="abs" style="left:36%;bottom:12%;text-align:center"><span id="ac" style="position:absolute;left:52px;top:-18px;font-size:var(--fs-4xl)"></span><span style="display:inline-block;animation:bob 2.6s ease-in-out infinite">${petMini(prof(),80)}</span></div>
    <div id="fl" class="abs" style="inset:0;background:var(--card);opacity:0;pointer-events:none"></div></div>
  <div class="tbar">${[['dia','sol','Día'],['noche','luna','Noche'],['nubes','w_nubes','Nublado'],['lluvia','w_lluvia','Lluvia'],['tormenta','w_tormenta','Tormenta'],['arcoiris','w_arcoiris','Arcoíris'],['viento','w_viento','Viento']].map(([w,n,t])=>`<button data-w="${w}" aria-label="${t}">${ilu(n,'1.15em')}</button>`).join('')}</div>`);
  const $r=id=>root.querySelector('#'+id); sceneParallax(root);
  const rain=(on,heavy)=>{ clearInterval(rainT); $r('rn').innerHTML=''; root.classList.toggle('lloviendo',!!on); if(!on) return; rainT=setInterval(()=>{ for(let k=0;k<(heavy?4:2);k++){ const d=document.createElement('span'); d.className='abs';
    d.style.cssText=`left:${rnd(0,100)}%;top:-20px;width:3px;height:18px;border-radius:3px;background:#7FAFD3;animation:drop ${(Math.random()*.4+.7).toFixed(2)}s linear forwards`; $r('rn').appendChild(d); setTimeout(()=>d.remove(),1200);} },70); };
  function set(w){
    const sk=$r('sk'); if (w==='noche'||w==='dia') root.classList.toggle('night',w==='noche'); $r('palm').style.animation='none'; $r('rb').style.opacity=0; $r('ac').textContent='';
    if (w==='noche'||w==='dia'){ night = w==='noche'; rain(false); $r('cl').style.opacity=0; }
    sk.style.background = night?'#3F4A7C':(w==='lluvia'||w==='tormenta'||w==='nubes')?'#C9D2DC':'#CDE7F8';
    const cloudy=['lluvia','tormenta','nubes'].includes(w); $r('st').style.opacity = night?1:0; $r('sun').style.opacity=night?0:(cloudy?.3:1); $r('sun').style.top=night?'60%':'8%'; $r('moon').style.opacity=night?1:0; $r('moon').style.top=night?'8%':'60%';
    if (w==='noche'){ $r('ac').textContent='💤'; tsay('Es de noche. ¡Buenas noches! Good night.'); }
    if (w==='dia'){ tsay('¡Es de día! Hace sol. It is sunny.'); }
    if (w==='nubes'){ rain(false); $r('cl').style.opacity=1; tsay('Está nublado. It is cloudy.'); }
    if (w==='lluvia'){ $r('cl').style.opacity=1; rain(true); $r('ac').textContent='☂️'; tsay('¡Está lloviendo! It is rainy.'); }
    if (w==='tormenta'){ $r('cl').style.opacity=1; rain(true,true); $r('ac').textContent='😮'; const f=$r('fl'); f.style.animation='none'; void f.offsetWidth; f.style.animation='flash .9s'; relampago($r('sk')); setTimeout(()=>note(55,1.4,'sawtooth',.12),300); tsay('¡Una tormenta! Primero se ve el rayo y luego se oye el trueno.'); }
    if (w==='arcoiris'){ rain(false); $r('cl').style.opacity=0; $r('rb').style.opacity=.9; if($r('rb').animate&&!RM) $r('rb').animate([{transform:'scale(.7)',opacity:0},{transform:'scale(1)',opacity:.9}],{duration:1100,easing:'cubic-bezier(.3,1.2,.5,1)'}); tsay('¡Un arcoíris! Sale cuando hay sol y gotitas de lluvia. Rainbow.'); react('happy'); }
    if (w==='viento'){ $r('palm').style.animation='palm .6s ease-in-out infinite'; for(let k=0;k<8;k++){ const l=document.createElement('span'); l.className='abs'; l.innerHTML=ilu('hojita','1em'); l.style.cssText=`left:-30px;top:${rnd(20,70)}%;font-size:var(--fs-2xl);transition:transform ${rnd(2,3)}s linear`; $r('sk').appendChild(l);
      setTimeout(()=>{ l.style.transform=`translate(${root.clientWidth+80}px,${rnd(-60,60)}px) rotate(540deg)`; },k*180+30); setTimeout(()=>l.remove(),4200); } tsay('¡Hace viento! It is windy.'); }
  }
  root.querySelectorAll('[data-w]').forEach(b=>b.addEventListener('click',()=>{ root.querySelectorAll('[data-w]').forEach(x=>x.classList.toggle('on',x===b)); set(b.dataset.w); }));
  return ()=>clearInterval(rainT);
}

/* ---------- 13. Traza letras ---------- */
function toyTrace(root){
  const WRD=[['SOL','☀️'],['MAR','🌊'],['OSO','🐻'],['LUNA','🌙'],['CASA','🏠'],['GATO','🐱'],['PATO','🦆'],['FLOR','🌸'],['NUBE','☁️'],['MAMÁ','👩'],['PAPÁ','👨'],['PIÑA','🍍']];
  const lvT=LV(); const L= lvT===3 ? WRD.map(w=>w[0]) : Object.keys(LETRAS).concat(['1','2','3','4','5','6','7','8','9','0']); let i=0, low=lvT===2, done=false;
  addHTML(root, `<canvas id="g" class="abs" style="left:0;top:0;width:100%;height:calc(100% - var(--tbar-h))"></canvas><canvas id="u" class="abs" style="left:0;top:0;width:100%;height:calc(100% - var(--tbar-h));touch-action:none"></canvas>
  <div id="pr" class="abs" style="right:16px;top:16px;font-size:var(--fs-7xl);opacity:0;transition:opacity .4s;text-align:center;font-weight:800;pointer-events:none"></div>
  <div class="tbar"><button id="pv">◀</button><button id="nx">▶</button><button id="cs">Aa</button><button id="er">🧽</button><button id="hl">🔊</button></div>`);
  const g=root.querySelector('#g'), u=root.querySelector('#u'), gc=g.getContext('2d'), uc=u.getContext('2d'), dpr=window.devicePixelRatio||1; let pts=[], col;
  const ch=()=>{ const c=L[i]; return low&&isNaN(c)?c.toLowerCase():c; };
  function draw(){
    const r=g.getBoundingClientRect(); if (!g.isConnected || !r.width) return; [g,u].forEach(c=>{ c.width=r.width*dpr; c.height=r.height*dpr; }); gc.setTransform(dpr,0,0,dpr,0,0); uc.setTransform(dpr,0,0,dpr,0,0);
    const fs= lvT===3 ? Math.min(r.height*.5, r.width*1.5/Math.max(3,ch().length)) : Math.min(r.height*.78, r.width*.95); gc.font=`800 ${fs}px Nunito, system-ui, sans-serif`; gc.textAlign='center'; gc.textBaseline='middle';
    gc.fillStyle='#EFE8DD'; gc.fillText(ch(), r.width/2, r.height/2+fs*.04); gc.setLineDash([3,14]); gc.lineWidth=5; gc.strokeStyle='#CFC5B5'; gc.lineCap='round'; gc.strokeText(ch(), r.width/2, r.height/2+fs*.04); gc.setLineDash([]);
    const data=gc.getImageData(0,0,g.width,g.height).data; pts=[]; const st=Math.round(9*dpr);
    for (let y=0;y<g.height;y+=st) for (let x=0;x<g.width;x+=st){ const k=(y*g.width+x)*4; if (data[k+3]>200 && data[k]>230 && data[k]<245) pts.push(k); }
    col=pick(['#F4A6A6','#A9D3F0','#B9E3C6','#C9B8EE','#F7C59F']); done=false; root.querySelector('#pr').style.opacity=0;
    uc.lineCap='round'; uc.lineJoin='round'; uc.lineWidth=Math.max(28,fs*.09); uc.strokeStyle=col;
  }
  function check(){ if (done||!pts.length) return; const d=uc.getImageData(0,0,u.width,u.height).data; const hit=pts.filter(k=>d[k+3]>0).length;
    if (hit/pts.length>=(lvT===3?.66:.72)){ done=true; const c=L[i];
      if (lvT===3){ const w=WRD[i]; const pr=root.querySelector('#pr'); pr.innerHTML=emo(w[1]); pr.style.fontSize='54px'; pr.style.opacity=1; confetti(); win(`¡Escribiste ${w[0].toLowerCase()}!`); return; }
      const isN=!isNaN(c); const pr=root.querySelector('#pr'); pr.innerHTML=isN?`${'⭐'.repeat(Math.min(+c||10,10)).replace(/(.{10})/g,'$1<br>')}`:`${LETRAS[c][1]}<div style="font-size:var(--fs-sm)">${LETRAS[c][0]}</div>`;
      pr.style.fontSize=isN?'22px':'54px'; pr.style.opacity=1; confetti(); win(isN?`¡Muy bien! El número ${c}`:`¡Muy bien! ${c}, de ${LETRAS[c][0]}`); } }
  let dr=false, last;
  u.addEventListener('pointerdown',e=>{ e.preventDefault(); dr=true; last=rel(u,e); try{u.setPointerCapture(e.pointerId);}catch(_){} uc.beginPath(); uc.moveTo(last.x,last.y); uc.lineTo(last.x+.1,last.y); uc.stroke(); });
  u.addEventListener('pointermove',e=>{ if(!dr) return; const p=rel(u,e); uc.beginPath(); uc.moveTo(last.x,last.y); uc.lineTo(p.x,p.y); uc.stroke(); last=p; });
  const end=()=>{ if(dr){ dr=false; check(); } }; u.addEventListener('pointerup',end); u.addEventListener('pointercancel',end);
  const say=()=>{ const c=L[i]; if (lvT===3){ tsay(`Traza la palabra ${c.toLowerCase()}`); return; } tsay(isNaN(c)?`${c}, de ${LETRAS[c][0]}`:`Número ${c}`); };
  root.querySelector('#nx').addEventListener('click',()=>{ i=(i+1)%L.length; draw(); say(); });
  root.querySelector('#pv').addEventListener('click',()=>{ i=(i-1+L.length)%L.length; draw(); say(); });
  root.querySelector('#cs').addEventListener('click',()=>{ low=!low; draw(); tsay(low?'Minúsculas':'Mayúsculas'); });
  root.querySelector('#er').addEventListener('click',()=>draw());
  root.querySelector('#hl').addEventListener('click',say);
  const go1=()=>{ draw(); }; if (document.fonts && document.fonts.ready) document.fonts.ready.then(go1); else go1(); setTimeout(go1,60);
}

/* ---------- 14. Cuentas Montessori ---------- */
function toyBeads(root){
  const BC=['#E8505B','#4CAF6A','#F49AC1','#F7C948','#8FD3F4','#8E5BB5','#FFFFFF','#8B5E3C','#2E4C9B','#E2B13C'];
  let n=0, timers=[], mode='stair';
  addHTML(root, `<div id="ar" class="abs" style="inset:0 0 var(--tbar-h) 0;background:var(--paper);overflow:auto"></div>
  <div class="tbar"><button data-m="stair" class="on">🪜 Escalera</button><button data-m="mine">🧮 Mis cuentas</button></div>`);
  const ar=root.querySelector('#ar');
  const bead=(c,s=24,extra='')=>`<span style="display:inline-block;width:${s}px;height:${s}px;border-radius:50%;background:radial-gradient(circle at 35% 35%,rgba(255,255,255,.8) 0 18%,transparent 20%),${c};border:var(--bw) solid rgba(0,0,0,.15);${extra}"></span>`;
  function stair(){
    timers.forEach(clearTimeout); ar.innerHTML=`<div style="padding:56px var(--s-4) var(--s-4)"><div id="big" style="text-align:center;font-size:var(--fs-8xl);font-weight:800;height:76px"></div>${times(10,k=>`<button data-r="${k+1}" style="display:flex;align-items:center;gap:3px;margin:var(--s-2) 0;padding:var(--s-1) var(--s-2);border-radius:var(--r-md);width:100%"><b style="width:28px;font-size:var(--fs-sm);color:var(--soft)">${k+1}</b><span style="height:2px;width:6px;background:#999"></span>${times(k+1,()=>bead(BC[k])).join('')}<span style="height:2px;width:6px;background:#999"></span></button>`).join('')}</div>`;
    ar.querySelectorAll('[data-r]').forEach(b=>b.addEventListener('click',()=>{ timers.forEach(clearTimeout); timers=[]; const r=+b.dataset.r, beads=[...b.querySelectorAll('span[style*="border-radius:50%"]')];
      beads.forEach(x=>x.style.transform=''); const big=ar.querySelector('#big'); big.textContent='';
      beads.forEach((x,k)=>timers.push(setTimeout(()=>{ x.style.transition='transform .2s'; x.style.transform='translateY(-8px) scale(1.15)'; note(440+k*40,.18,'sine',.1); big.textContent=k+1; big.style.animation='none'; void big.offsetWidth; big.style.animation='popin .3s both'; },k*420)));
      timers.push(setTimeout(()=>{ speak(String(r)); react('happy'); },r*420)); }));
  }
  function mine(){
    timers.forEach(clearTimeout);
    const tens=Math.floor(n/10), ones=n%10;
    ar.innerHTML=`<div style="padding:60px var(--s-4) var(--s-4);text-align:center"><div style="font-size:84px;font-weight:800;line-height:1;animation:popin .3s both">${n}</div>
      <div class="muted" style="font-weight:800;margin:var(--s-2) 0 var(--s-3)">${tens?`${tens} ${tens===1?'decena':'decenas'}`:''}${tens&&ones?' y ':''}${ones||!tens?`${ones} ${ones===1?'unidad':'unidades'}`:''}</div>
      <div style="display:flex;justify-content:center;gap:var(--s-4);margin-bottom:var(--s-4)"><button id="mn" class="btn soft" style="font-size:var(--fs-3xl);width:80px">−</button><button id="pl" class="btn" style="font-size:var(--fs-3xl);width:80px">+</button></div>
      <div style="display:flex;justify-content:center;align-items:flex-end;gap:var(--s-3);min-height:280px;flex-wrap:wrap">
        ${times(tens,()=>`<div style="display:flex;flex-direction:column;gap:1px;padding:var(--s-1);background:#F3E3B8;border-radius:var(--r-sm);animation:popin .4s both">${times(10,()=>bead('#E2B13C',22)).join('')}</div>`).join('')}
        <div style="display:flex;flex-direction:column-reverse;gap:1px">${times(ones,()=>bead('#E2B13C',22,'animation:popin .3s both')).join('')}</div></div></div>`;
    ar.querySelector('#pl').addEventListener('click',()=>{ if(n>=40){ tsay('¡Muchas cuentas! Hasta 40'); return; } n++; note(520,.15,'sine',.1);
      if (n%10===0){ mine(); react('happy'); tsay(`¡10 cuentas forman una decena! Tienes ${n}`); } else { mine(); speak(String(n)); } });
    ar.querySelector('#mn').addEventListener('click',()=>{ if(n>0){ n--; mine(); speak(String(n)); } });
  }
  root.querySelectorAll('[data-m]').forEach(b=>b.addEventListener('click',()=>{ mode=b.dataset.m; root.querySelectorAll('[data-m]').forEach(x=>x.classList.toggle('on',x===b)); mode==='stair'?stair():mine(); }));
  stair();
  return ()=>timers.forEach(clearTimeout);
}

/* ---------- catálogo de juguetes ---------- */
const TOYS=[
 {id:'paint',  name:'Pintar',            icon:'🎨', c:'rose',   open:toyPaint,    hi:'¡Vamos a pintar! Elige un color o un sello.'},
 {id:'mix',    name:'Mezcla colores',    icon:'🧪', c:'peach',  open:toyMix,      hi:'Toca dos pinturas y mira qué color sale.', hi2:'¡Mezcla colores y cumple el reto!'},
 {id:'music',  name:'Xilófono',          icon:'🎹', c:'lav',    open:toyMusic,    hi:'Toca las barras y haz música.', hi2:'Toca 🧠 Repite: escucha las notas y repítelas.'},
 {id:'blocks', name:'Bloques',           icon:'🧱', c:'butter', open:toyBlocks,   hi:'Toca una figura y construye una torre.'},
 {id:'garden', name:'Mi jardín',         icon:'🌻', c:'mint',   open:toyGarden,   hi:'Elige una semilla, siémbrala y riégala.'},
 {id:'aqua',   name:'Acuario',           icon:'🐠', c:'sky',    open:toyAquarium, hi:'Agrega animalitos al acuario.'},
 {id:'bubble', name:'Burbujas',          icon:'🫧', c:'sky',    open:toyBubbles,  hi:'¡Explota las burbujas!'},
 {id:'dress',  name:'Viste a tu amigo',  icon:'🎩', c:'rose',   open:toyDress,    hi:'¡Vísteme! Elige un sombrero.', hi2:'¡Vísteme igual que el modelo!'},
 {id:'pizza',  name:'Pizzería',          icon:'🍕', c:'peach',  open:toyPizza,    hi:'Llegó un cliente. Prepara la pizza que pide, hornéala y sírvela.'},
 {id:'sort',   name:'Ordenar',           icon:'🧺', c:'sage',   open:toySort,     hi:'Arrastra cada cosa a su canasta.'},
 {id:'shapes', name:'Encaje de figuras', icon:'🔷', c:'lav',    open:toyShapes,   hi:'Lleva cada figura a su lugar.'},
 {id:'weather',name:'El tiempo',         icon:'🌦️', c:'mint',   open:toyWeather,  hi:'¿Qué tiempo hace? Toca los botones.'},
 {id:'trace',  name:'Traza letras',      icon:'✍️', c:'butter', open:toyTrace,    hi:'Pasa tu dedo por la letra.', hi2:'Pasa tu dedo por la letra minúscula.'},
 {id:'beads',  name:'Cuentas',           icon:'📿', c:'sage',   open:toyBeads,    hi:'Toca una fila de cuentas para contar.'}
];

/* Barra inferior de los juguetes: si sus botones no caben a lo ancho, pasa a dos filas y avisa a todo el juguete
   con --tbar-h (las capas del juego usan esa medida, así se acomodan solas). Si ni en dos filas caben, queda
   deslizable con un borde que se desvanece para que se note que hay más. Se recalcula si cambia el contenido o el tamaño. */
function ajustarBarra(root){
  let b=null, cuadro=0;
  const medir=()=>{ cuadro=0; b=root.querySelector(':scope > .tbar'); if(!b) return;
    const antes=root.style.getPropertyValue('--tbar-h');
    b.classList.remove('dos','desliza'); root.style.removeProperty('--tbar-h');
    if (b.scrollWidth<=b.clientWidth+2){ if(antes) window.dispatchEvent(new Event('resize')); return; }
    /* alto real con las filas que hagan falta; se permiten 3 filas en pantallas altas y 2 en las bajas */
    b.classList.add('dos'); b.style.height='auto'; const h=b.offsetHeight; b.style.height='';
    const max = innerHeight>=640 ? 3*54+16 : 2*54+14;
    if (h<=max){ root.style.setProperty('--tbar-h',Math.max(70,h)+'px'); }
    else { b.classList.remove('dos'); b.classList.add('desliza'); }
    /* si la barra cambió de alto, los juguetes que miden su espacio se vuelven a acomodar */
    if (root.style.getPropertyValue('--tbar-h')!==antes) window.dispatchEvent(new Event('resize')); };
  const pedir=()=>{ if(!cuadro) cuadro=requestAnimationFrame(medir); };
  medir();
  /* se observa todo el juguete: algunos rehacen la barra o le cambian los botones a mitad del juego */
  const mo=new MutationObserver(pedir); mo.observe(root,{childList:true,subtree:true});
  const rz=e=>{ if(e.isTrusted) pedir(); }; window.addEventListener('resize',rz);
  return ()=>{ mo.disconnect(); window.removeEventListener('resize',rz); if(cuadro) cancelAnimationFrame(cuadro); };
}
function vToy(){
  if (toyCleanup){ toyCleanup(); toyCleanup=null; }
  const T=TOYS.find(t=>t.id===view.toy), p=prof();
  streak=0;
  app.innerHTML=`<div class="toyhead"><button class="icon-btn" id="back" aria-label="Volver">←</button><span class="thi">${toyIcon(T,'38px')}</span><h2>${T.name}</h2><button class="chip vt"></button>${T.libre?'':'<button class="chip" id="lv"></button>'}${mascot(p.avatar,44)}<div class="tbub" id="tb" role="status"></div></div><div class="toy" id="toy"></div>`;
  bind('#back',()=>go({name:'home'}));
  updLvChip();
  bind('#lv',()=>{ setLV(LV()%3+1); go({name:'toy',toy:T.id}); setTimeout(()=>tsay(`Nivel ${LV()}: ${['fácil','medio','difícil'][LV()-1]}`),350); });
  const root=document.getElementById('toy');
  const _st=window.setTimeout, ids=[]; window.setTimeout=(f,t,...a)=>{ const id=_st(f,t,...a); ids.push(id); return id; };
  let c0; try{ c0=T.open(root); } finally { window.setTimeout=_st; }
  const cb=ajustarBarra(root);
  toyCleanup=()=>{ ids.forEach(clearTimeout); cb(); c0&&c0(); };
  setTimeout(()=>tsay(LV()>1&&T.hi2?T.hi2:T.hi),300);
}
let greeted=false;
function vHome(){
  const p=prof(); if(!p) return go({name:'profiles'});
  const total=Object.values(P(p.id)).reduce((s,x)=>s+(x.stars||0),0);
  const hi=`¡Hola, ${esc(p.name)}! Soy ${mname(p.avatar)}. ¿A qué jugamos hoy?`;
  app.innerHTML=`<div class="row" style="margin-bottom:var(--s-2)"><div class="logo" style="font-size:var(--fs-2xl)">Semi<span>llita</span></div><div class="sp"></div><button class="chip" id="switch">👤 Cambiar</button></div>
  <div class="hero">${mascot(p.avatar,92)}<div class="bubble">${hi}</div></div>
  <h2 class="h-sec first">Sala de juegos</h2>
  <div class="toys">${TOYS.filter(t=>!t.brain).map((t,i)=>`<button class="toytile bg-${t.c}" data-t="${t.id}" style="animation-delay:${i*.03}s"><span class="ic">${t.icon}</span><b>${t.name}</b></button>`).join('')}</div>
  <h2 class="h-sec" style="margin-bottom:var(--s-1)">Retos de ingenio 🧠</h2><p class="muted" style="margin:0 0 var(--s-3);font-weight:600">Para pensar, planear y resolver</p>
  <div class="toys">${TOYS.filter(t=>t.brain).map((t,i)=>`<button class="toytile bg-${t.c}" data-t="${t.id}" style="animation-delay:${i*.03}s"><span class="ic">${t.icon}</span><b>${t.name}</b></button>`).join('')}</div>
  <h2 class="h-sec">Aventuras para aprender</h2>
  <button class="area bg-lav" id="learn" style="width:100%;min-height:0;flex-direction:row;align-items:center;gap:var(--s-4)"><span class="ic">🎒</span><span><b>Retos por grado</b><br><small>20 juegos de 1ro a 6to · ⭐ ${total}</small></span></button>`;
  bind('[data-t]', el=>go({name:'toy', toy:el.dataset.t}));
  bind('#learn', ()=>go({name:'learn'}));
  bind('#switch', ()=>{ greeted=false; go({name:'profiles'}); });
  bind('.hero .mascot', ()=>{ react('happy'); speak(pick([`¡Hola, ${p.name}!`,'¡Me haces cosquillas!','¡Vamos a jugar!'])); });
  if (!greeted){ greeted=true; setTimeout(()=>speak(hi),500); }
}

/* inicio movido al final */
if (false){
  try{ if('speechSynthesis' in window) speechSynthesis.getVoices(); }catch(e){}
  if (S.current && prof()) view={name:'home'};
  render();
}
