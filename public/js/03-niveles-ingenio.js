/* Semillita · Niveles por edad y 6 retos de ingenio */
/* =========================================================
   NIVELES POR EDAD + JUEGOS DE INGENIO
   Nivel 1: 5-6 años · Nivel 2: 7-9 años · Nivel 3: 10-12 años
   ========================================================= */
function lvlOf(p){ if (p.age) return p.age<=6?1:p.age<=9?2:3; return p.grade<=1?1:p.grade<=4?2:3; }
function LV(){ const p=prof(); return (S.toyLv&&S.toyLv[p.id]&&S.toyLv[p.id][view.toy]) || lvlOf(p); }
function setLV(n){ const p=prof(); S.toyLv=S.toyLv||{}; (S.toyLv[p.id]=S.toyLv[p.id]||{})[view.toy]=n; save(); }
function updLvChip(){ const c=document.getElementById('lv'); if(c){ const l=LV(); c.textContent=`${'★'.repeat(l)}${'☆'.repeat(3-l)} Nivel ${l}`; } }
let streak=0;
function win(msg){
  streak++; react('happy'); note(880,.2,'sine',.12); setTimeout(()=>note(1175,.3,'sine',.12),150);
  const p=prof(); S.toyWins=S.toyWins||{}; const k=p.id+'|'+view.toy; S.toyWins[k]=(S.toyWins[k]||0)+1; save();
  if (msg) tsay(msg);
  if (streak>=3 && LV()<3){ streak=0; setLV(LV()+1); updLvChip(); setTimeout(()=>{ confetti(); tsay(`¡Subiste al nivel ${LV()}! Ahora será más difícil.`); },2000); return true; }
  return false;
}
const banner = (root,id='tg') => { addHTML(root, `<div id="${id}" class="abs" style="left:12px;top:12px;background:#fff;border:2px solid var(--line);border-radius:16px;padding:6px 12px;font-weight:800;z-index:5;max-width:70%"></div>`); return root.querySelector('#'+id); };

/* ---------- Burbujas (con objetivos por nivel) ---------- */
function toyBubbles2(root){
  const COLS=[['rojo','#F4A6A6'],['azul','#A9D3F0'],['amarillo','#F6E39A'],['verde','#B9E3C6'],['morado','#C9B8EE'],['rosado','#F5B8D0'],['anaranjado','#F7C59F']];
  const ANIM=[['🐶','perro','dog'],['🐱','gato','cat'],['🐮','vaca','cow'],['🐷','cerdo','pig'],['🐸','rana','frog'],['🐵','mono','monkey'],['🦁','león','lion'],['🐔','gallina','hen'],['🐰','conejo','rabbit'],['🐴','caballo','horse']];
  const MIXES=[['verde','amarillo y azul'],['anaranjado','rojo y amarillo'],['morado','rojo y azul'],['rosado','rojo y blanco']];
  let mode='n', it, target=null, hits=0; const lv=LV(); const maxN = lv===1?10:lv===2?20:50;
  addHTML(root, `<div id="bz" class="abs" style="inset:0 0 70px 0;background:linear-gradient(#EAF4FB,#FBF8F3);overflow:hidden"></div>
  <div class="tbar"><button data-m="n" class="on">123</button><button data-m="l">ABC</button><button data-m="c">🎨</button><button data-m="a">🐾</button></div>`);
  const bz=root.querySelector('#bz'); const tg=banner(root); tg.style.display='none';
  function content(forceKey){
    if (mode==='n'){ const n=forceKey?+forceKey:rnd(1,maxN); return {key:String(n), txt:n, say:String(n)}; }
    if (mode==='l'){ const L=forceKey||pick(Object.keys(LETRAS)); return {key:L, txt:L, say:`${L}, de ${LETRAS[L][0]}`}; }
    if (mode==='c'){ const c=forceKey?COLS.find(x=>x[0]===forceKey):pick(COLS); return {key:c[0], bg:c[1], say:c[0]}; }
    const a=forceKey?ANIM.find(x=>x[1]===forceKey):pick(ANIM); return {key:a[1], txt:a[0], say:lv===3?a[2]:`${a[1]}. En inglés, ${a[2]}`, lang:lv===3?'en-US':'es-ES'};
  }
  function newTarget(){
    hits=0; if (lv===1){ target=null; tg.style.display='none'; return; }
    let key, label, sayT;
    if (mode==='n'){ if (lv===2){ key=String(rnd(1,maxN)); label=`el número ${key}`; }
      else { if (Math.random()<.5){ const a=rnd(2,25), b=rnd(2,maxN-a); key=String(a+b); label=`${a} + ${b}`; } else { const a=rnd(2,9), b=rnd(2,Math.floor(maxN/a)); key=String(a*b); label=`${a} × ${b}`; } } }
    else if (mode==='l'){ key=pick(Object.keys(LETRAS)); label= lv===2?`la letra ${key}`:`la letra con que empieza ${LETRAS[key][1]}`; }
    else if (mode==='c'){ if (lv===2){ key=pick(COLS)[0]; label=`el color ${key}`; } else { const m=pick(MIXES); key=m[0]; label=`el color que sale al mezclar ${m[1]}`; } }
    else { const a=pick(ANIM); key=a[1]; label= lv===2?`el ${a[1]}`:`the ${a[2]}`; }
    target={key,label}; tg.style.display='block'; tg.innerHTML=`🎯 Explota: <b>${label}</b> <span class="muted">0/5</span>`;
    tsay(lv===3&&mode==='a'?`Pop the ${label.replace('the ','')}`:`Explota ${label}`, lv===3&&mode==='a'?'en-US':'es-ES');
  }
  function spawn(){ if (bz.children.length>9) return;
    const c = (target && Math.random()<.35) ? content(target.key) : content();
    const b=document.createElement('button'); const sz=rnd(78,104); const bg=c.bg||'rgba(255,255,255,.55)';
    b.className='abs'; b.innerHTML=`<span style="display:grid;place-items:center;width:100%;height:100%;animation:sway ${rnd(3,5)}s ease-in-out infinite">${c.txt??''}</span>`;
    b.style.cssText=`left:${rnd(2,80)}%;bottom:-120px;width:${sz}px;height:${sz}px;border-radius:50%;font-size:${mode==='a'?40:32}px;font-weight:800;color:var(--ink);background:radial-gradient(circle at 30% 30%,rgba(255,255,255,.95) 0 12%,transparent 13%),${bg};border:3px solid rgba(255,255,255,.9);box-shadow:inset -6px -8px 14px rgba(140,170,210,.35);animation:rise2 ${lv===3?rnd(6,9):rnd(8,12)}s linear forwards`;
    b.addEventListener('pointerdown',e=>{ e.preventDefault();
      if (target && c.key!==target.key){ note(220,.2,'sine',.1); b.classList.add('wob'); setTimeout(()=>b.classList.remove('wob'),500); return; }
      popS(); speak(c.say, c.lang||'es-ES'); b.style.transition='transform .2s,opacity .2s'; b.style.animationPlayState='paused'; b.style.transform+=' scale(1.5)'; b.style.opacity='0'; setTimeout(()=>b.remove(),220);
      if (target){ hits++; tg.querySelector('.muted').textContent=`${hits}/5`; if (hits>=5){ win('¡Lo encontraste 5 veces!'); setTimeout(newTarget,2200); } } });
    b.addEventListener('animationend',ev=>{ if(ev.animationName==='rise2') b.remove(); });
    bz.appendChild(b); }
  it=setInterval(spawn, lv===3?800:1000); spawn();
  root.querySelectorAll('[data-m]').forEach(b=>b.addEventListener('click',()=>{ mode=b.dataset.m; root.querySelectorAll('[data-m]').forEach(x=>x.classList.toggle('on',x===b)); bz.innerHTML='';
    if (lv===1) tsay({n:'Burbujas de números',l:'Burbujas de letras',c:'Burbujas de colores',a:'Burbujas de animales'}[mode]); newTarget(); spawn(); }));
  const t0=setTimeout(newTarget,2600);
  return ()=>{ clearInterval(it); clearTimeout(t0); };
}

/* ---------- Ordenar (categorías por nivel) ---------- */
function toySort2(root){
  const SETS={
    color:{n:'🎨 Colores',lv:1,b:[['🔴','rojo'],['🟡','amarillo'],['🟢','verde']], it:[['🍎',0],['🍓',0],['🌹',0],['❤️',0],['🍒',0],['🍌',1],['🌻',1],['⭐',1],['🐥',1],['🌽',1],['🥦',2],['🐸',2],['🍏',2],['🌿',2],['🥒',2]]},
    casa:{n:'🏠 ¿Dónde vive?',lv:1,b:[['🌊','agua'],['🌳','tierra'],['☁️','aire']], it:[['🐟',0],['🐙',0],['🐬',0],['🦀',0],['🐳',0],['🐶',1],['🐘',1],['🦁',1],['🐴',1],['🐰',1],['🐦',2],['🦋',2],['🐝',2],['🦅',2],['🦜',2]]},
    tipo:{n:'🧺 Comida o juguete',lv:1,b:[['🍽️','comida'],['🧸','juguetes']], it:[['🍎',0],['🍌',0],['🍕',0],['🥕',0],['🧀',0],['🍪',0],['⚽',1],['🪀',1],['🧸',1],['🎈',1],['🪁',1],['🚂',1]]},
    clase:{n:'🐾 Tipo de animal',lv:2,b:[['🐶','mamífero'],['🐦','ave'],['🐟','pez'],['🦎','reptil']], it:[['🐘',0],['🦁',0],['🐬',0],['🐴',0],['🐰',0],['🦅',1],['🦉',1],['🦜',1],['🐧',1],['🐔',1],['🐠',2],['🦈',2],['🐡',2],['🐢',3],['🐍',3],['🐊',3]]},
    estado:{n:'🧊 Sólido, líquido, gas',lv:2,b:[['🧊','sólido'],['💧','líquido'],['💨','gas']], it:[['🪨',0],['🔑',0],['🪵',0],['🧱',0],['🥛',1],['🧃',1],['🍯',1],['☕',1],['♨️',2],['🎈',2],['🫧',2]]},
    par:{n:'🔢 Par o impar',lv:3,b:[['2️⃣','par'],['1️⃣','impar']], it:times(14,()=>{ const n=rnd(1,99); return [String(n), n%2]; })},
    pal:{n:'📝 Sustantivo o verbo',lv:3,b:[['🏠','sustantivo'],['🏃','verbo']], it:[['mesa',0],['perro',0],['escuela',0],['río',0],['libro',0],['flor',0],['correr',1],['cantar',1],['saltar',1],['leer',1],['comer',1],['dormir',1]]},
    eng:{n:'🇺🇸 Animal o comida',lv:3,b:[['🐾','animal'],['🍽️','food']], it:[['dog',0],['cat',0],['horse',0],['bird',0],['cow',0],['fish',0],['bread',1],['apple',1],['rice',1],['milk',1],['cheese',1],['egg',1]]}
  };
  const lv=LV(); const avail=Object.entries(SETS).filter(([,v])=>v.lv<=lv && (lv===1||v.lv>=lv-1));
  let cur=avail[avail.length-1][0], left=0;
  addHTML(root, `<div class="abs" style="inset:0 0 70px 0;background:#FFFBF4"></div><div id="ar" class="abs" style="inset:0 0 70px 0"></div>
  <div class="tbar">${avail.map(([k,v])=>`<button data-s="${k}" class="${k===cur?'on':''}">${v.n}</button>`).join('')}</div>`);
  const ar=root.querySelector('#ar');
  function round(){
    ar.innerHTML=''; const Sx=SETS[cur]; if (cur==='par') Sx.it=times(14,()=>{ const n=rnd(1,99); return [String(n), n%2]; });
    const nb=Sx.b.length; const items=sample(Sx.it, nb>=4?10:nb===2?8:9); left=items.length;
    const W=ar.clientWidth, H=ar.clientHeight, bw=Math.min(130,(W-30)/nb-10);
    const baskets=Sx.b.map((b,i)=>{ const el=document.createElement('div'); el.className='abs';
      el.style.cssText=`left:${(W/nb)*(i+.5)-bw/2}px;top:${H-140}px;width:${bw}px;height:120px;border-radius:20px 20px 34px 34px;background:#EAD8BF;border:4px solid #D7BE9C;display:flex;flex-direction:column;align-items:center;padding-top:6px;transition:transform .2s;overflow:hidden`;
      el.innerHTML=`<span style="font-size:30px">${b[0]}</span><b style="font-size:13px">${b[1]}</b><div class="in" style="display:flex;flex-wrap:wrap;justify-content:center;font-size:14px;max-width:100%"></div>`; ar.appendChild(el); return el; });
    const cols=3, rowsN=Math.ceil(items.length/cols), cw=(W-20)/cols, rh=Math.max(54,(H-150-60)/rowsN); const slots=shuffle(times(items.length,q=>q));
    items.forEach(([e,k],j)=>{ const el=document.createElement('div'); el.className='abs'; const isTxt=/^[\wáéíóúñ]+$/i.test(e); const q=slots[j];
      el.textContent=e; const x=Math.round(10+(q%cols)*cw+rnd(4,Math.max(5,cw-(isTxt?100:60)))), y=Math.round(56+Math.floor(q/cols)*rh+rnd(0,Math.max(1,rh-56)));
      el.style.cssText=`left:${x}px;top:${y}px;font-size:${isTxt?22:46}px;font-weight:800;line-height:1;z-index:3;transition:left .35s,top .35s;animation:popin .4s ${j*.05}s both;${isTxt?'background:#fff;border:2px solid var(--line);border-radius:14px;padding:8px 12px':''}`;
      el.dataset.x=x; el.dataset.y=y; ar.appendChild(el);
      dragify(el, ar, {start:()=>{ popS(); if(isTxt) speak(e, cur==='eng'?'en-US':'es-ES'); }, drop:(el,px,py)=>{
        const a=ar.getBoundingClientRect(); const hit=baskets.findIndex(b=>{ const r=b.getBoundingClientRect(); return px>r.left-a.left-10 && px<r.right-a.left+10 && py>r.top-a.top-30 && py<r.bottom-a.top; });
        if (hit===k){ baskets[k].querySelector('.in').insertAdjacentHTML('beforeend',`<span style="animation:popin .3s both;margin:1px">${isTxt?'•':e}</span>`); el.remove(); left--; note(660,.2,'sine',.12);
          baskets[k].style.transform='scale(1.08)'; setTimeout(()=>baskets[k].style.transform='',200);
          if (left===0){ confetti(); win('¡Todo en su lugar!'); setTimeout(round,2600); } }
        else { el.style.left=el.dataset.x+'px'; el.style.top=el.dataset.y+'px'; if (hit>=0){ el.classList.add('wob'); setTimeout(()=>el.classList.remove('wob'),500); tsay('Hmm... ¿y en otra canasta?'); } } }}); });
  }
  root.querySelectorAll('[data-s]').forEach(b=>b.addEventListener('click',()=>{ cur=b.dataset.s; root.querySelectorAll('[data-s]').forEach(x=>x.classList.toggle('on',x===b)); round(); tsay(SETS[cur].n.replace(/^\S+\s/,'')); }));
  setTimeout(round,30);
}

/* ---------- Cuentas (escalera, libre y retos) ---------- */
function toyBeads2(root){
  const BC=['#E8505B','#4CAF6A','#F49AC1','#F7C948','#8FD3F4','#8E5BB5','#FFFFFF','#8B5E3C','#2E4C9B','#E2B13C'];
  const lv=LV(); let n=0, timers=[], target=null;
  addHTML(root, `<div id="ar" class="abs" style="inset:0 0 70px 0;background:#FFFBF4;overflow:auto"></div>
  <div class="tbar"><button data-m="stair" class="${lv===1?'on':''}">🪜 Escalera</button><button data-m="mine">🧮 Mis cuentas</button><button data-m="goal" class="${lv>1?'on':''}">🎯 Forma el número</button></div>`);
  const ar=root.querySelector('#ar');
  const bead=(c,s=22,extra='')=>`<span class="bd" style="display:inline-block;width:${s}px;height:${s}px;border-radius:50%;background:radial-gradient(circle at 35% 35%,rgba(255,255,255,.8) 0 18%,transparent 20%),${c};border:2px solid rgba(0,0,0,.15);${extra}"></span>`;
  function stair(){
    timers.forEach(clearTimeout); ar.innerHTML=`<div style="padding:56px 14px 14px"><div id="big" style="text-align:center;font-size:64px;font-weight:800;height:76px"></div>${times(10,k=>`<button data-r="${k+1}" style="display:flex;align-items:center;gap:3px;margin:7px 0;padding:4px 8px;border-radius:16px;width:100%"><b style="width:28px;font-size:15px;color:var(--soft)">${k+1}</b>${times(k+1,()=>bead(BC[k],24)).join('')}</button>`).join('')}</div>`;
    ar.querySelectorAll('[data-r]').forEach(b=>b.addEventListener('click',()=>{ timers.forEach(clearTimeout); timers=[]; const r=+b.dataset.r, beads=[...b.querySelectorAll('.bd')];
      const big=ar.querySelector('#big'); big.textContent='';
      beads.forEach((x,k)=>timers.push(setTimeout(()=>{ x.style.transition='transform .2s'; x.style.transform='translateY(-8px) scale(1.15)'; note(440+k*40,.18,'sine',.1); big.textContent=k+1; big.style.animation='none'; void big.offsetWidth; big.style.animation='popin .3s both'; },k*420)));
      timers.push(setTimeout(()=>{ beads.forEach(x=>x.style.transform=''); speak(String(r)); react('happy'); },r*420)); }));
  }
  function builder(goal){
    timers.forEach(clearTimeout);
    const tens=Math.floor(n/10), ones=n%10;
    ar.innerHTML=`<div style="padding:${goal?100:60}px 14px 14px;text-align:center"><div style="font-size:84px;font-weight:800;line-height:1">${n}</div>
      <div class="muted" style="font-weight:800;margin:6px 0 14px">${tens?`${tens} ${tens===1?'decena':'decenas'}`:''}${tens&&ones?' y ':''}${ones||!tens?`${ones} ${ones===1?'unidad':'unidades'}`:''}</div>
      <div style="display:flex;justify-content:center;align-items:flex-end;gap:8px;min-height:250px;flex-wrap:wrap">
        ${times(tens,()=>`<div style="display:flex;flex-direction:column;gap:1px;padding:3px;background:#F3E3B8;border-radius:10px">${times(10,()=>bead('#E2B13C',20)).join('')}</div>`).join('')}
        <div style="display:flex;flex-direction:column-reverse;gap:1px">${times(ones,()=>bead('#E2B13C',20,'animation:popin .3s both')).join('')}</div></div>
      <div style="display:flex;justify-content:center;gap:10px;margin-top:16px;flex-wrap:wrap"><button id="mn" class="btn soft" style="font-size:24px;min-width:64px">−1</button><button id="pl" class="btn" style="font-size:24px;min-width:64px">+1</button>${lv>1?`<button id="p10" class="btn" style="font-size:24px;min-width:72px;background:#C2A548">+10</button><button id="m10" class="btn soft" style="font-size:24px;min-width:72px">−10</button>`:''}</div></div>`;
    const chg=d=>{ const nn=n+d; if(nn<0||nn>99) return; n=nn; note(520,.15,'sine',.1); builder(goal);
      if (goal && n===target){ win(`¡Formaste el ${n}!`); setTimeout(newGoal,2400); } else if (d===1 && n%10===0 && n) tsay(`¡10 cuentas forman una decena! Tienes ${n}`); else speak(String(n)); };
    ar.querySelector('#pl').addEventListener('click',()=>chg(1)); ar.querySelector('#mn').addEventListener('click',()=>chg(-1));
    if (lv>1){ ar.querySelector('#p10').addEventListener('click',()=>chg(10)); ar.querySelector('#m10').addEventListener('click',()=>chg(-10)); }
    if (goal){ const g=document.createElement('div'); g.className='abs'; g.style.cssText='left:50%;top:12px;transform:translateX(-50%);background:#fff;border:2px solid var(--line);border-radius:16px;padding:6px 14px;font-weight:800;font-size:18px;white-space:nowrap';
      g.innerHTML = lv===3 && target>20 ? `🎯 Forma: ${Math.floor(target/10)} decenas y ${target%10} unidades` : `🎯 Forma el número <b>${target}</b>`; ar.appendChild(g); }
  }
  function newGoal(){ target = lv===1?rnd(2,10): lv===2?rnd(11,40): rnd(41,99); n=0; builder(true); tsay(lv===3?`Forma ${Math.floor(target/10)} decenas y ${target%10} unidades`:`Forma el número ${target}`); }
  root.querySelectorAll('[data-m]').forEach(b=>b.addEventListener('click',()=>{ root.querySelectorAll('[data-m]').forEach(x=>x.classList.toggle('on',x===b)); const m=b.dataset.m; if(m==='stair') stair(); else if(m==='mine'){ n=0; builder(false); } else newGoal(); }));
  if (lv===1) stair(); else setTimeout(newGoal,50);
  return ()=>timers.forEach(clearTimeout);
}

/* =========================================================
   RETOS DE INGENIO
   ========================================================= */

/* ---------- Torre de Hanói ---------- */
function toyHanoi(root){
  const lv=LV(); let n=[3,4,5][lv-1], rods, sel=null, moves=0;
  const COL=['#F4A6A6','#F7C59F','#F6E39A','#B9E3C6','#A9D3F0','#C9B8EE'];
  addHTML(root, `<div id="ar" class="abs" style="inset:0 0 70px 0;background:#FFFBF4"></div><div class="tbar"><button id="rs">🔄 Empezar de nuevo</button><span id="mv" style="font-weight:800;padding:0 8px"></span></div>`);
  const ar=root.querySelector('#ar'), mv=root.querySelector('#mv'); const tg=banner(root); tg.innerHTML=`🎯 Pasa la torre a la última varilla`;
  function reset(){ rods=[times(n,i=>n-i),[],[]]; sel=null; moves=0; draw(); }
  function draw(){
    const W=ar.clientWidth, H=ar.clientHeight, base=H-60, rw=W/3, dh=Math.min(34,(H-220)/6);
    let h=`<div class="abs" style="left:10px;right:10px;top:${base}px;height:16px;border-radius:8px;background:#D9C2A5"></div>`;
    rods.forEach((r,ri)=>{ const cx=rw*(ri+.5);
      h+=`<button data-r="${ri}" class="abs" style="left:${cx-rw/2}px;top:${base-dh*7-30}px;width:${rw}px;height:${dh*7+46}px;border-radius:18px;${sel===ri?'background:rgba(249,239,201,.6)':''}"></button>`;
      h+=`<div class="abs" style="left:${cx-6}px;top:${base-dh*7-10}px;width:12px;height:${dh*7+10}px;border-radius:6px;background:#C9B79D;pointer-events:none"></div>`;
      r.forEach((d,k)=>{ const w=30+d*(rw-46)/6; const lift = sel===ri && k===r.length-1 ? 40 : 0;
        h+=`<div class="abs" style="left:${cx-w/2}px;top:${base-dh*(k+1)-lift-(lift?dh*(6-k):0)}px;width:${w}px;height:${dh-3}px;border-radius:${dh/2}px;background:${COL[d-1]};border:2px solid rgba(0,0,0,.08);pointer-events:none;transition:top .25s"></div>`; });
      if (ri===2) h+=`<div class="abs" style="left:${cx-14}px;top:${base+20}px;font-size:24px">🏁</div>`; });
    ar.innerHTML=h; mv.textContent=''; tg.innerHTML=`🎯 Pasa la torre a la 🏁<br><small class="muted">Movimientos: ${moves} · mínimo: ${2**n-1}</small>`;
    ar.querySelectorAll('[data-r]').forEach(b=>b.addEventListener('click',()=>tap(+b.dataset.r)));
  }
  function tap(ri){
    if (sel===null){ if (!rods[ri].length) return; sel=ri; popS(); draw(); return; }
    if (sel===ri){ sel=null; draw(); return; }
    const d=rods[sel][rods[sel].length-1], top=rods[ri][rods[ri].length-1];
    if (top!==undefined && top<d){ tsay('Un disco grande no puede ir encima de uno pequeño'); note(220,.25,'sine',.1); sel=null; draw(); return; }
    rods[ri].push(rods[sel].pop()); sel=null; moves++; plopS(); draw();
    if (rods[2].length===n){ confetti(); const best=moves===2**n-1; const up=win(best?`¡Perfecto! Lo hiciste en ${moves} movimientos, el mínimo posible`:`¡Lo lograste en ${moves} movimientos! El mínimo es ${2**n-1}`);
      setTimeout(()=>{ n=[3,4,5][LV()-1]; reset(); }, 3200); }
  }
  root.querySelector('#rs').addEventListener('click',reset);
  setTimeout(reset,30);
}

/* ---------- Sudoku de dibujos ---------- */
function toySudoku(root){
  const lv=LV(); const SYM=['🍎','🍌','🍇','🍓'], blanks=[5,8,11][lv-1]; let sol, grid, fixed, cur=0;
  addHTML(root, `<div id="ar" class="abs" style="inset:0 0 70px 0;background:#FFFBF4;display:flex;flex-direction:column;align-items:center;justify-content:center;padding-top:40px"></div>
  <div class="tbar">${SYM.map((s,i)=>`<button data-s="${i}" class="${i?'':'on'}" style="font-size:30px">${s}</button>`).join('')}<button data-s="-1">🧽</button><span class="sep"></span><button id="nw">🔄</button></div>`);
  const ar=root.querySelector('#ar');
  function gen(){
    const base=[[0,1,2,3],[2,3,0,1],[1,0,3,2],[3,2,1,0]];
    const p=shuffle([0,1,2,3]); let g=base.map(r=>r.map(v=>p[v]));
    if (Math.random()<.5) g=[g[1],g[0],g[2],g[3]]; if (Math.random()<.5) g=[g[0],g[1],g[3],g[2]];
    if (Math.random()<.5) g=g.map(r=>[r[1],r[0],r[2],r[3]]); if (Math.random()<.5) g=g.map(r=>[r[0],r[1],r[3],r[2]]);
    sol=g; grid=g.map(r=>r.slice()); fixed=g.map(r=>r.map(()=>true));
    sample(times(16,i=>i),blanks).forEach(i=>{ grid[Math.floor(i/4)][i%4]=-1; fixed[Math.floor(i/4)][i%4]=false; }); draw(); }
  function conflict(r,c){ const v=grid[r][c]; if (v<0) return false; for(let k=0;k<4;k++){ if(k!==c&&grid[r][k]===v) return true; if(k!==r&&grid[k][c]===v) return true; }
    const br=r-r%2, bc=c-c%2; for(let i=br;i<br+2;i++) for(let j=bc;j<bc+2;j++) if((i!==r||j!==c)&&grid[i][j]===v) return true; return false; }
  function draw(){
    const S=Math.min(ar.clientWidth-40, ar.clientHeight-160, 360)/4;
    ar.innerHTML=`<p class="muted" style="font-weight:800;margin:0 0 12px;text-align:center;max-width:320px">Cada fila, columna y cuadro de 4 debe tener los 4 dibujos, sin repetir</p><div style="display:grid;grid-template-columns:repeat(4,${S}px);gap:0;border:4px solid #C9B79D;border-radius:16px;overflow:hidden;background:#fff">${grid.map((row,r)=>row.map((v,c)=>`<button data-c="${r*4+c}" style="width:${S}px;height:${S}px;font-size:${S*.55}px;border-right:${c===1?4:1}px solid #C9B79D;border-bottom:${r===1?4:1}px solid #C9B79D;background:${fixed[r][c]?'#F6EFE4':conflict(r,c)?'#F8DADA':'#fff'}">${v<0?'':SYM[v]}</button>`).join('')).join('')}</div>`;
    ar.querySelectorAll('[data-c]').forEach(b=>b.addEventListener('click',()=>{ const i=+b.dataset.c, r=Math.floor(i/4), c=i%4; if (fixed[r][c]){ note(220,.15,'sine',.08); return; }
      grid[r][c]=cur; popS(); draw(); if (grid.every((row,ri)=>row.every((v,ci)=>v===sol[ri][ci]) || false) || grid.every((row,ri)=>row.every((v,ci)=>v>=0&&!conflict(ri,ci)))){ confetti(); win('¡Sudoku resuelto!'); setTimeout(gen,2800); } }));
  }
  root.querySelectorAll('[data-s]').forEach(b=>b.addEventListener('click',()=>{ cur=+b.dataset.s; root.querySelectorAll('[data-s]').forEach(x=>x.classList.toggle('on',x===b)); }));
  root.querySelector('#nw').addEventListener('click',gen);
  setTimeout(gen,30);
}

/* ---------- Laberinto ---------- */
function toyMaze(root){
  let N, walls, pos, goal, cell, ox, oy;
  addHTML(root, `<div id="ar" class="abs" style="inset:0 0 70px 0;background:#F3F9EE"></div>
  <div class="tbar" style="justify-content:center"><button data-d="L">⬅️</button><button data-d="U">⬆️</button><button data-d="D">⬇️</button><button data-d="R">➡️</button><span class="sep"></span><button id="nw">🔄</button></div>`);
  const ar=root.querySelector('#ar');
  function gen(){
    N=[5,8,11][LV()-1]; walls=times(N*N,()=>({U:1,D:1,L:1,R:1})); const seen=new Set([0]), st=[0];
    while(st.length){ const c=st[st.length-1], x=c%N, y=Math.floor(c/N);
      const nb=[['U',x,y-1,'D'],['D',x,y+1,'U'],['L',x-1,y,'R'],['R',x+1,y,'L']].filter(([,a,b])=>a>=0&&b>=0&&a<N&&b<N&&!seen.has(b*N+a));
      if (!nb.length){ st.pop(); continue; } const [d,a,b,o]=pick(nb), k=b*N+a; walls[c][d]=0; walls[k][o]=0; seen.add(k); st.push(k); }
    pos=0; goal=N*N-1; draw(); }
  function draw(){
    const W=ar.clientWidth, H=ar.clientHeight; cell=Math.floor(Math.min((W-24)/N,(H-90)/N)); ox=(W-cell*N)/2; oy=60+(H-60-cell*N)/2;
    let l=''; walls.forEach((w,i)=>{ const x=ox+(i%N)*cell, y=oy+Math.floor(i/N)*cell;
      if(w.U) l+=`M${x} ${y}h${cell}`; if(w.L) l+=`M${x} ${y}v${cell}`; if(i%N===N-1&&w.R) l+=`M${x+cell} ${y}v${cell}`; if(Math.floor(i/N)===N-1&&w.D) l+=`M${x} ${y+cell}h${cell}`; });
    ar.innerHTML=`<svg class="abs" style="inset:0;width:100%;height:100%"><rect x="${ox}" y="${oy}" width="${cell*N}" height="${cell*N}" rx="6" fill="#fff"/><path d="${l}" stroke="#8AA368" stroke-width="${Math.max(3,cell/8)}" stroke-linecap="round" fill="none"/></svg>
      <span class="abs" style="left:${ox+(goal%N)*cell}px;top:${oy+Math.floor(goal/N)*cell}px;width:${cell}px;height:${cell}px;font-size:${cell*.7}px;display:grid;place-items:center">🍎</span>
      <span id="me" class="abs" style="left:${ox+(pos%N)*cell}px;top:${oy+Math.floor(pos/N)*cell}px;width:${cell}px;height:${cell}px;display:grid;place-items:center;transition:left .15s,top .15s">${petMini(prof(),cell*.95)}</span>`;
  }
  function move(d){ if (walls[pos][d]){ note(180,.12,'sine',.08); const m=ar.querySelector('#me'); m.classList.add('wob'); setTimeout(()=>m.classList.remove('wob'),400); return; }
    pos += d==='U'?-N:d==='D'?N:d==='L'?-1:1; const m=ar.querySelector('#me'); m.style.left=(ox+(pos%N)*cell)+'px'; m.style.top=(oy+Math.floor(pos/N)*cell)+'px'; note(500,.06,'sine',.06);
    if (pos===goal){ confetti(); win('¡Llegaste a la manzana!'); setTimeout(gen,2600); } }
  root.querySelectorAll('[data-d]').forEach(b=>b.addEventListener('click',()=>move(b.dataset.d)));
  let sx=null, sy=null; ar.addEventListener('pointerdown',e=>{ sx=e.clientX; sy=e.clientY; });
  ar.addEventListener('pointerup',e=>{ if(sx===null) return; const dx=e.clientX-sx, dy=e.clientY-sy; sx=null; if (Math.max(Math.abs(dx),Math.abs(dy))<24) return; move(Math.abs(dx)>Math.abs(dy)?(dx>0?'R':'L'):(dy>0?'D':'U')); });
  const kb=e=>{ const m={ArrowUp:'U',ArrowDown:'D',ArrowLeft:'L',ArrowRight:'R'}[e.key]; if(m){ e.preventDefault(); move(m); } }; document.addEventListener('keydown',kb);
  root.querySelector('#nw').addEventListener('click',gen);
  setTimeout(gen,30);
  return ()=>document.removeEventListener('keydown',kb);
}

/* ---------- Rompecabezas deslizante ---------- */
function toySlide(root){
  let N, t, empty; const COL=['#F4A6A6','#F7C59F','#F6E39A','#B9E3C6','#A9D3F0','#C9B8EE','#F5B8D0','#BFE0D8'];
  addHTML(root, `<div id="ar" class="abs" style="inset:0 0 70px 0;background:#FFFBF4;display:flex;flex-direction:column;align-items:center;justify-content:center;padding-top:40px"></div><div class="tbar"><button id="nw">🔄 Mezclar otra vez</button><span id="mv" style="font-weight:800;padding:0 8px;font-size:14px;white-space:nowrap"></span></div>`);
  const ar=root.querySelector('#ar'); let moves=0;
  function gen(){ const lv=LV(); N=lv===3?4:3; t=times(N*N,i=>i<N*N-1?i+1:0); empty=N*N-1;
    let last=-1; for(let k=0;k<[12,40,90][lv-1];k++){ const nb=nbrs(empty).filter(x=>x!==last); const p=pick(nb); last=empty; swap(p); } moves=0; draw(); }
  const nbrs=e=>{ const x=e%N,y=Math.floor(e/N); return [[x-1,y],[x+1,y],[x,y-1],[x,y+1]].filter(([a,b])=>a>=0&&b>=0&&a<N&&b<N).map(([a,b])=>b*N+a); };
  const swap=p=>{ t[empty]=t[p]; t[p]=0; empty=p; };
  function draw(){ const S=Math.min(ar.clientWidth-40, ar.clientHeight-140, 360)/N;
    ar.innerHTML=`<p class="muted" style="font-weight:800;margin:0 0 12px">Ordena los números del 1 al ${N*N-1}</p><div style="position:relative;width:${S*N+8}px;height:${S*N+8}px;background:#E9DFCF;border-radius:18px;padding:4px">${t.map((v,i)=>v?`<button data-i="${i}" class="abs" style="left:${4+(i%N)*S}px;top:${4+Math.floor(i/N)*S}px;width:${S-6}px;height:${S-6}px;margin:3px;border-radius:14px;background:${COL[(v-1)%8]};font-size:${S*.4}px;font-weight:800;box-shadow:inset 0 -5px 0 rgba(0,0,0,.08);transition:left .15s,top .15s">${v}</button>`:'').join('')}</div>`;
    root.querySelector('#mv').textContent=`Movimientos: ${moves}`;
    ar.querySelectorAll('[data-i]').forEach(b=>b.addEventListener('click',()=>{ const i=+b.dataset.i; if(!nbrs(empty).includes(i)){ note(200,.1,'sine',.06); return; } swap(i); moves++; popS(); draw();
      if (t.every((v,k)=>k===N*N-1?v===0:v===k+1)){ confetti(); win(`¡Ordenado en ${moves} movimientos!`); setTimeout(gen,2800); } })); }
  root.querySelector('#nw').addEventListener('click',gen);
  setTimeout(gen,30);
}

/* ---------- Programa a tu amigo ---------- */
function toyCode(root){
  let N, rocks, start, goal, prog=[], running=false, pos, cell, ox, oy, timers=[];
  const AR={U:'⬆️',D:'⬇️',L:'⬅️',R:'➡️'};
  addHTML(root, `<div id="ar" class="abs" style="inset:0 0 70px 0;background:#F6F2FB"></div>
  <div class="tbar">${Object.entries(AR).map(([k,v])=>`<button data-d="${k}">${v}</button>`).join('')}<span class="sep"></span><button id="go" style="background:#B9E3C6">▶️</button><button id="bk">⌫</button><button id="nw">🔄</button></div>`);
  const ar=root.querySelector('#ar');
  function bfs(){ const q=[start], seen=new Map([[start,null]]); while(q.length){ const c=q.shift(); if(c===goal) return true;
      for(const n of nb(c)) if(!seen.has(n)&&!rocks.has(n)){ seen.set(n,c); q.push(n); } } return false; }
  const nb=c=>{ const x=c%N,y=Math.floor(c/N); return [[x,y-1],[x,y+1],[x-1,y],[x+1,y]].filter(([a,b])=>a>=0&&b>=0&&a<N&&b<N).map(([a,b])=>b*N+a); };
  function gen(){ const lv=LV(); N=[4,5,6][lv-1]; do { start=rnd(0,N-1)*N; goal=rnd(0,N-1)*N+N-1; rocks=new Set(sample(times(N*N,i=>i).filter(i=>i!==start&&i!==goal),[2,5,9][lv-1])); } while(!bfs());
    prog=[]; pos=start; draw(); tsay(lv===1?'Toca las flechas para darme órdenes y luego ▶️':'Escribe todo el camino con flechas y luego toca ▶️'); }
  function draw(){
    const W=ar.clientWidth, H=ar.clientHeight; cell=Math.floor(Math.min((W-24)/N,(H-190)/N)); ox=(W-cell*N)/2; oy=60;
    let h=''; for(let i=0;i<N*N;i++){ const x=ox+(i%N)*cell, y=oy+Math.floor(i/N)*cell; h+=`<div class="abs" style="left:${x}px;top:${y}px;width:${cell-4}px;height:${cell-4}px;margin:2px;border-radius:10px;background:${(i+Math.floor(i/N))%2?'#ECE5F7':'#E2DAF2'};display:grid;place-items:center;font-size:${cell*.6}px">${rocks.has(i)?'🪨':i===goal?'🍎':''}</div>`; }
    h+=`<span id="me" class="abs" style="left:${ox+(pos%N)*cell}px;top:${oy+Math.floor(pos/N)*cell}px;width:${cell}px;height:${cell}px;display:grid;place-items:center;transition:left .3s,top .3s;z-index:2">${petMini(prof(),cell*.95)}</span>`;
    h+=`<div class="abs" style="left:12px;right:12px;top:${oy+cell*N+14}px;background:#fff;border:2px dashed var(--line);border-radius:16px;min-height:56px;padding:8px;display:flex;flex-wrap:wrap;gap:4px;font-size:24px">${prog.length?prog.map((d,k)=>`<span id="p${k}" style="padding:2px;border-radius:8px">${AR[d]}</span>`).join(''):'<span class="muted" style="font-size:15px;font-weight:700">Mi programa: toca las flechas</span>'}</div>`;
    ar.innerHTML=h; }
  function run(){
    if (running||!prog.length) return; running=true; pos=start; draw(); let k=0;
    const step=()=>{ if (k>=prog.length){ running=false; if (pos!==goal){ tsay('No llegué a la manzana. ¡Revisa el programa!'); timers.push(setTimeout(()=>{ pos=start; draw(); },1200)); } return; }
      const d=prog[k], x=pos%N, y=Math.floor(pos/N); const nx=x+(d==='L'?-1:d==='R'?1:0), ny=y+(d==='U'?-1:d==='D'?1:0), np=ny*N+nx;
      const cur=ar.querySelector('#p'+k); if(cur) cur.style.background='#F6E39A';
      if (nx<0||ny<0||nx>=N||ny>=N||rocks.has(np)){ running=false; note(160,.3,'sawtooth',.08); const m=ar.querySelector('#me'); m.classList.add('wob'); tsay(rocks.has(np)?'¡Ay! Choqué con una piedra':'¡Ese camino se sale!'); timers.push(setTimeout(()=>{ pos=start; draw(); },1400)); return; }
      pos=np; const m=ar.querySelector('#me'); m.style.left=(ox+nx*cell)+'px'; m.style.top=(oy+ny*cell)+'px'; note(440+k*30,.1,'sine',.08); k++;
      if (pos===goal){ running=false; confetti(); win(`¡Llegué con ${prog.length} instrucciones!`); timers.push(setTimeout(gen,3000)); return; }
      timers.push(setTimeout(step,420)); };
    timers.push(setTimeout(step,300)); }
  root.querySelectorAll('[data-d]').forEach(b=>b.addEventListener('click',()=>{ if(running) return; if(prog.length>=24) return; prog.push(b.dataset.d); popS(); draw(); }));
  root.querySelector('#bk').addEventListener('click',()=>{ if(running) return; prog.pop(); draw(); });
  root.querySelector('#go').addEventListener('click',run);
  root.querySelector('#nw').addEventListener('click',()=>{ if(!running) gen(); });
  setTimeout(gen,30);
  return ()=>timers.forEach(clearTimeout);
}

/* ---------- Balanza ---------- */
function toyBalance(root){
  const lv=LV(); const WTS=lv===1?[1,2,5]:[1,2,5,10]; let target, right=[], obj;
  addHTML(root, `<div id="ar" class="abs" style="inset:0 0 70px 0;background:#FFFBF4"></div>
  <div class="tbar">${WTS.map(w=>`<button data-w="${w}" style="font-size:18px">${w} kg</button>`).join('')}<span class="sep"></span><button id="bk">⌫</button><button id="nw">🔄</button></div>`);
  const ar=root.querySelector('#ar'); const tg=banner(root);
  function gen(){ target= lv===1?rnd(2,10): lv===2?rnd(8,35): rnd(13,60); obj=pick(['🍉','🎃','🐶','🎁','🧺','🐱']); right=[];
    tg.innerHTML = lv===3 ? `🎯 ¿Cuánto pesa ${obj}? Equilibra la balanza` : `🎯 Equilibra: ${obj} pesa ${target} kg`; draw();
    tsay(lv===3?`¿Cuánto pesa? Pon pesas hasta que la balanza quede derecha`:`Pon pesas que sumen ${target} kilos`); }
  function draw(){
    const sum=right.reduce((a,b)=>a+b,0), diff=sum-target, ang=Math.max(-18,Math.min(18,diff*(lv===3?1.2:2.5)));
    const W=ar.clientWidth, H=ar.clientHeight, cx=W/2, cy=H*.42, arm=Math.min(150,(W-140)/2);
    const rad=ang*Math.PI/180, lx=cx-arm*Math.cos(rad), ly=cy-arm*Math.sin(rad), rx=cx+arm*Math.cos(rad), ry=cy+arm*Math.sin(rad);
    const pan=(x,y,content)=>`<div class="abs" style="left:${x-62}px;top:${y}px;width:124px;transition:all .5s"><div style="height:${60}px;border-left:2px solid #B9A88E;border-right:2px solid #B9A88E;margin:0 18px"></div><div style="height:16px;border-radius:0 0 60px 60px;background:#D9C2A5"></div><div style="position:absolute;bottom:18px;left:0;right:0;display:flex;flex-wrap:wrap-reverse;justify-content:center;gap:2px">${content}</div></div>`;
    ar.innerHTML=`<div class="abs" style="left:${cx-8}px;top:${cy}px;width:16px;height:${H*.4}px;background:#C9B79D;border-radius:8px"></div>
      <div class="abs" style="left:${cx-60}px;top:${cy+H*.4-10}px;width:120px;height:18px;background:#C9B79D;border-radius:9px"></div>
      <div class="abs" style="left:${cx-arm}px;top:${cy-5}px;width:${arm*2}px;height:10px;background:#B9A88E;border-radius:5px;transform:rotate(${ang}deg);transition:transform .5s"></div>
      <div class="abs" style="left:${cx-12}px;top:${cy-12}px;width:24px;height:24px;border-radius:50%;background:#8C7B63"></div>
      ${pan(lx,ly,`<span style="font-size:48px;line-height:1">${obj}</span>${lv<3?`<b style="width:100%;text-align:center">${target} kg</b>`:''}`)}
      ${pan(rx,ry,right.map(w=>`<span style="display:inline-grid;place-items:center;width:${22+w*2}px;height:${22+w*2}px;border-radius:6px 6px 10px 10px;background:#9BA6B5;color:#fff;font-size:11px;font-weight:800">${w}</span>`).join(''))}
      <div class="abs" style="left:0;right:0;bottom:16px;text-align:center;font-weight:800;font-size:18px">${lv<3||diff===0?`Pesas: ${right.join(' + ')||'0'} = ${sum} kg`:(diff<0?'⬅️ Pesa más el objeto':'➡️ Pesan más las pesas')}</div>`;
  }
  root.querySelectorAll('[data-w]').forEach(b=>b.addEventListener('click',()=>{ right.push(+b.dataset.w); plopS(); draw(); const sum=right.reduce((a,b)=>a+b,0);
    if (sum===target){ confetti(); win(lv===3?`¡Equilibrada! ${obj} pesa ${target} kilos`:`¡Equilibrada! ${right.join(' más ')} es igual a ${target}`); setTimeout(gen,3200); } }));
  root.querySelector('#bk').addEventListener('click',()=>{ right.pop(); draw(); });
  root.querySelector('#nw').addEventListener('click',gen);
  setTimeout(gen,30);
}

/* ---------- registro ---------- */
TOYS.find(t=>t.id==='bubble').open=toyBubbles2; TOYS.find(t=>t.id==='bubble').hi2='¡Busca y explota la burbuja que te pido!';
TOYS.find(t=>t.id==='sort').open=toySort2;
TOYS.find(t=>t.id==='beads').open=toyBeads2; TOYS.find(t=>t.id==='beads').hi2='Usa decenas y unidades para formar el número.';
TOYS.find(t=>t.id==='blocks').hi2='¡Construye la torre del reto!';
TOYS.find(t=>t.id==='trace').hi2='Traza con tu dedo. ¡Ahora es más difícil!';
TOYS.find(t=>t.id==='shapes').hi2='¡Más figuras para encajar!';
TOYS.push(
 {id:'code',   name:'Programa a tu amigo', icon:'🤖', c:'lav',    brain:true, open:toyCode,    hi:'Dame órdenes con flechas para llegar a la manzana.'},
 {id:'maze',   name:'Laberinto',           icon:'🌀', c:'mint',   brain:true, open:toyMaze,    hi:'Llévame hasta la manzana. Desliza el dedo o usa las flechas.'},
 {id:'hanoi',  name:'Torre de Hanói',      icon:'🗼', c:'peach',  brain:true, open:toyHanoi,   hi:'Pasa todos los discos a la varilla de la bandera. Un disco grande nunca va sobre uno pequeño.'},
 {id:'sudoku', name:'Sudoku de frutas',    icon:'🍇', c:'rose',   brain:true, open:toySudoku,  hi:'Elige una fruta abajo y toca un cuadro vacío.'},
 {id:'slide',  name:'Rompecabezas 1-2-3',  icon:'🔢', c:'sky',    brain:true, open:toySlide,   hi:'Desliza las fichas para ordenar los números.'},
 {id:'balance',name:'Balanza',             icon:'⚖️', c:'butter', brain:true, open:toyBalance, hi:'Pon pesas hasta que la balanza quede derecha.'}
);
