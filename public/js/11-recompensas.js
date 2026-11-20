/* Semillita · Recompensas vistosas (fase 8)
   =========================================================
   - flyStars(): al ganar un reto, 3 estrellas de Kenney vuelan hasta el animalito.
   - giveSticker(): misma lógica y mismos datos guardados; ahora el sticker aparece "despegándose".
   - addXP(): misma lógica y mismos datos; al subir de nivel muestra una pantalla especial con
     medalla y el animalito estrenando la ropa nueva.
   Alegre pero calmado: pocas piezas, < 2 s, nada de destellos. Con prefers-reduced-motion
   todo se muestra quieto.
   Se carga después de 10-animaciones.js (y por lo tanto después de 04, que define win/addXP).
   ========================================================= */
(function(){
const reduce=()=> (typeof RM!=='undefined' && RM) || !Element.prototype.animate;

/* ---------- estrellas que vuelan ---------- */
window.flyStars=(from,to,n=3)=>{ if(reduce()||!from||!to||typeof ilu!=='function') return;
  const a=from.getBoundingClientRect(), b=to.getBoundingClientRect(); if(!b.width) return;
  for (let i=0;i<n;i++){ const s=document.createElement('div'); s.className='flystar'; s.innerHTML=ilu('estrella_oro','100%');
    const x0=a.left+a.width/2+(i-(n-1)/2)*40, y0=a.top+a.height*.42; s.style.left=x0+'px'; s.style.top=y0+'px'; document.body.appendChild(s);
    const dx=b.left+b.width/2-x0, dy=b.top+b.height/2-y0, T=(x,y,sc,r)=>`translate(calc(-50% + ${x}px),calc(-50% + ${y}px)) scale(${sc}) rotate(${r}deg)`;
    const an=s.animate([{transform:T(0,0,0,0),opacity:0},{transform:T(0,-10,1.2,20),opacity:1,offset:.22},{transform:T(dx*.45,dy*.45-50,1,150),offset:.6},{transform:T(dx,dy,.35,300),opacity:.85}],
      {duration:1150,delay:i*130,easing:'cubic-bezier(.4,0,.2,1)',fill:'backwards'});
    an.onfinish=()=>{ s.remove(); if(i===n-1){ to.animate([{transform:'scale(1)'},{transform:'scale(1.16)'},{transform:'scale(1)'}],{duration:320,easing:'ease-out'}); try{ note(1320,.12,'sine',.07); }catch(e){} } }; } };
if (typeof win==='function'){ const _win=win;
  win=function(msg){ flyStars(document.getElementById('toy')||document.getElementById('app'), document.getElementById('msc')); return _win(msg); }; }

/* ---------- sticker que se despega ---------- */
function showSticker(s){
  const art=typeof emo==='function'?emo(s,'1em'):s;
  const el=document.createElement('div'); el.className='stk-peel'; el.setAttribute('role','status');
  el.innerHTML=`<span class="stk-card"><span class="stk-art">${art}</span><span class="stk-fold"></span></span><span>¡Nuevo sticker!<br><small class="muted">Míralo en tu álbum</small></span>`;
  document.body.appendChild(el);
  setTimeout(()=>{ el.classList.add('out'); setTimeout(()=>el.remove(),400); },2600);
}
if (typeof giveSticker==='function'){
  /* misma lógica que 04-personajes.js (mismos datos en p.stickers); solo cambia cómo se muestra */
  giveSticker=function(prob=1){
    const p=prof(); if(!p || Math.random()>prob) return; p.stickers=p.stickers||[];
    const free=STK.filter(s=>!p.stickers.includes(s)); const s = free.length ? pick(free) : pick(STK); if (free.length) p.stickers.push(s); save();
    setTimeout(()=>{ showSticker(s); note(1320,.15,'sine',.1); }, 1400);
  };
}

/* ---------- pantalla de subir de nivel ---------- */
function showLevelUp(p,lvl){
  const o=petOf(p), news=Object.entries(ACC).filter(([,a])=>a[2]===lvl);
  const outfit={...(o.outfit||{})}; if (news.length) outfit[news[0][1][0]]=news[0][0];
  /* ropa nueva del niño en este nivel (si ya armó su personaje): se estrena la primera cosa nueva */
  const kidNews=[]; let kid='';
  if (p.nino && typeof NINO_OPC!=='undefined' && typeof ninoMascot==='function'){
    const d=ninoDe(p), prueba={...d,acc:{...d.acc}};
    ['camisa','abajo','zapatos'].forEach(c=>NINO_OPC[c].filter(x=>x[2]===lvl).forEach(([k,n])=>{ kidNews.push(n); if(kidNews.length===1) prueba[c]=k; }));
    Object.entries(NINO_OPC.acc).forEach(([sl,l])=>l.filter(x=>x[2]===lvl).forEach(([k,n])=>{ kidNews.push(n); if(kidNews.length===1) prueba.acc[sl]=k; }));
    kid=ninoMascot(prueba,96,'lvn','happy');
  }
  const medal=`medalla_${((lvl-2)%3)+1}`;
  const el=document.createElement('div'); el.className='lvup'; el.setAttribute('role','dialog'); el.setAttribute('aria-label','Tu amigo subió de nivel');
  el.innerHTML=`<div class="lvup-card">
    <div class="lvup-medal">${typeof ilu==='function'?ilu(medal,'100%'):'🏅'}</div>
    <div class="lvup-pet">${kid}<div class="mascot happy" style="--ms:${kid?96:120}px"><span class="body">${creature(o.sp,{...o,outfit,level:lvl})}</span><span class="shadow"></span></div></div>
    <h2>${kid?`¡${esc(p.name)} y ${mname(p.avatar)} crecieron!`:`¡${mname(p.avatar)} creció!`}</h2>
    <p style="margin:var(--s-1) 0 var(--s-3);font-weight:700">Nivel ${lvl}: <b>${LEVELN[lvl-1]}</b></p>
    ${news.length||kidNews.length?`<p class="muted" style="margin:0 0 var(--s-2);font-weight:800">Cosas nuevas</p><div class="lvup-items">${[...new Set([...news.map(([,a])=>a[1]),...kidNews])].map(n=>`<span class="chip">${n}</span>`).join('')}</div>`:''}
    <button class="btn full" style="margin-top:var(--s-4)">¡Genial!</button></div>`;
  const close=()=>{ el.classList.add('out'); setTimeout(()=>el.remove(),300); };
  el.addEventListener('click',close); document.body.appendChild(el);
  if (!reduce() && typeof sparks==='function') setTimeout(()=>sparks(el.querySelector('.lvup-medal'),7),450);
  const todas=[...new Set([...news.map(([,a])=>a[1]),...kidNews])];
  speak(`¡Subimos al nivel ${lvl}: ${LEVELN[lvl-1]}! ${todas.length?'Hay cosas nuevas: '+todas.join(', '):''}`);
}
window.showLevelUp=showLevelUp;
if (typeof addXP==='function'){
  /* misma lógica que 04-personajes.js (mismo p.xp); solo cambia la celebración */
  addXP=function(n){
    const p=prof(); if(!p) return; const before=xpLevel(p.xp||0); p.xp=(p.xp||0)+n; save();
    const after=xpLevel(p.xp);
    if (after>before) setTimeout(()=>showLevelUp(p,after),900);
  };
}
})();
