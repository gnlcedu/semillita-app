/* Semillita · Juguetes nuevos: colmado, granja, reloj, mapas, cuerpo, laboratorio, tangram */
/* =========================================================
   JUGUETES NUEVOS: colmado, granja, reloj, mapas, cuerpo, laboratorio, tangram
   ========================================================= */
function noiseS(dur=.3, vol=.12, freq=900){ try{ AC=AC||new (window.AudioContext||window.webkitAudioContext)(); const n=AC.sampleRate*dur, buf=AC.createBuffer(1,n,AC.sampleRate), d=buf.getChannelData(0);
  for(let i=0;i<n;i++) d[i]=(Math.random()*2-1)*Math.pow(1-i/n,2); const s=AC.createBufferSource(); s.buffer=buf; const f=AC.createBiquadFilter(); f.type='bandpass'; f.frequency.value=freq; const g=AC.createGain(); g.gain.value=vol; s.connect(f).connect(g).connect(AC.destination); s.start(); }catch(e){} }
const splashS=()=>{ noiseS(.35,.18,700); note(420,.25,'sine',.06); };
const coinS=()=>{ note(1568,.12,'square',.04); setTimeout(()=>note(2093,.25,'square',.04),80); };

/* ---------- Mi colmado ---------- */
function toyShop(root){
  const lv=LV();
  const PROD=[['🍞','pan','panes',10],['🥚','huevo','huevos',8],['🍌','guineo','guineos',5],['🥛','leche','leches',45],['🧃','jugo','jugos',25],['🧀','queso','quesos',60],['🍫','chocolate','chocolates',30],['🥑','aguacate','aguacates',20],['🍬','dulce','dulces',2],['🍚','arroz','arroces',35],['🍋','limón','limones',3],['🥤','refresco','refrescos',40]];
  const MONEY=[1,5,10,25,50,100,200,500];
  const CUST=['🐶','🐱','🐰','🐥','🐮','🐷','🦁','🐵','🐯','🦒','🐘','🦜'];
  /* clientes: los animalitos de la app con ropa distinta (13-plano-lugares.js), solo para mostrar */
  const custArt=e=>{ const [sp,outfit]=(window.CLIENTES||{})[e]||['leon',{}]; return `<span class="cli">${creature(sp,{outfit})}</span>`; };
  let order=null, bag=[], cash=[], paid=0;
  const money=(v,s=1)=> v<50 ? `<span style="display:inline-grid;place-items:center;width:${(30+v*.6)*s}px;height:${(30+v*.6)*s}px;border-radius:50%;background:${v===25||v===1?'#E9C46A':'#C9CCD3'};border:3px solid rgba(0,0,0,.12);font-size:${11*s}px;font-weight:800">${v}</span>`
    : `<span style="display:inline-grid;place-items:center;width:${64*s}px;height:${34*s}px;border-radius:6px;background:${{50:'#C9B8EE',100:'#F7C59F',200:'#F5B8D0',500:'#A9D3F0'}[v]};border:var(--bw) solid rgba(0,0,0,.12);font-size:${13*s}px;font-weight:800">RD$${v}</span>`;
  addHTML(root, `<div class="abs" style="inset:0 0 var(--tbar-h) 0;background:linear-gradient(#FFF4E4 0 38%,#F1E0C6 38%)"></div>
    ${scene('colmado','inset:0 0 var(--tbar-h) 0')}
    <div class="abs" style="left:0;right:0;top:0;height:30px;background:repeating-linear-gradient(90deg,var(--c-rosa) 0 30px,var(--white) 30px 60px);border-radius:0 0 50% 50%/0 0 14px 14px;z-index:1"></div>
    <div id="cu" class="abs" style="left:14px;top:46px;display:flex;align-items:flex-end;gap:var(--s-2);max-width:68%;z-index:5"></div>
    <div id="sh" class="abs" style="left:10px;right:10px;top:150px;display:grid;grid-template-columns:repeat(4,1fr);gap:var(--s-2)"></div>
    <div class="abs caja-r" style="right:14px;bottom:162px;width:84px;height:84px;z-index:0;pointer-events:none"><span class="cajon">${ilu('cajon','100%')}</span>${ilu('caja','100%')}</div>
    <div id="bg" class="abs" style="left:10px;right:10px;bottom:84px;min-height:64px;background:var(--card);border:2px dashed var(--line);border-radius:var(--r-md);padding:var(--s-2);display:flex;flex-wrap:wrap;gap:var(--s-2);align-items:center"></div>
    <div class="tbar" id="tb2"></div>`);
  const cu=root.querySelector('#cu'), sh=root.querySelector('#sh'), bg=root.querySelector('#bg'), tb=root.querySelector('#tb2'); sceneParallax(root); scenePet(root,{at:'right:8px;top:40px',size:60,prop:ilu('delantal','100%'),cls:'pet-shop'});
  sh.innerHTML=PROD.map((p,i)=>`<button data-p="${i}" style="background:var(--card);border:var(--bw) solid var(--line);border-radius:var(--r-md);padding:var(--s-2) 2px;display:flex;flex-direction:column;align-items:center"><span style="font-size:var(--fs-4xl)">${emo(p[0])}</span>${lv>1?`<small style="font-weight:800;background:var(--butter);border-radius:var(--r-xs);padding:0 var(--s-2)">RD$${p[3]}</small>`:`<small style="font-weight:700">${p[1]}</small>`}</button>`).join('');
  function newCustomer(){
    bag=[]; cash=[]; const who=pick(CUST); const k = lv===1?1:lv===2?rnd(1,2):rnd(2,3);
    const items=sample(PROD.map((_,i)=>i).filter(i=>lv===1||PROD[i][3]<=(lv===2?45:60)),k).map(i=>[i, lv===1?rnd(1,4):rnd(1,3)]);
    const total=items.reduce((s,[i,n])=>s+PROD[i][3]*n,0);
    paid = lv===3 ? [50,100,200,500].find(b=>b>total) : 0;
    order={items,total,who};
    const txt='Quiero '+items.map(([i,n])=>`${n} ${n===1?PROD[i][1]:PROD[i][2]}`).join(' y ');
    cu.innerHTML=`<span style="font-size:var(--fs-8xl);display:inline-block;line-height:1">${custArt(who)}</span><div class="bubble" style="font-size:var(--fs-sm);padding:var(--s-2) var(--s-3);animation-delay:.75s">${txt}${lv===3?`<br><span class="muted">Te pago con ${money(paid,.7)}</span>`:''}</div>`;
    entrar(cu.firstElementChild);
    tsay(txt+(lv===3?`. Te pago con ${paid} pesos`:''));
    drawBag();
  }
  function drawBag(nuevo){
    const hint = lv===1?'Toca los productos que pide':'1) Toca los productos que pide';
    bg.innerHTML = bag.length ? bag.map((i,j)=>`<span style="font-size:var(--fs-3xl);${nuevo&&j===bag.length-1?'animation:popin .3s .42s both':''}">${emo(PROD[i][0])}</span>`).join('') : `<span class="muted" style="font-weight:700">${emo('🛍️','1.6em')} ${hint}</span>`;
    if (lv>1 && bag.length){ const step = lv===2?'2) Cobra: toca el dinero que te da':`2) Da el cambio de RD$${paid}`;
      bg.insertAdjacentHTML('beforeend',`<div style="width:100%;border-top:2px dashed var(--line);margin-top:var(--s-2);padding-top:var(--s-2);font-weight:800">${step}: ${cash.map(v=>money(v,.6)).join(' ')} <span class="muted">= RD$${cash.reduce((a,b)=>a+b,0)}</span></div>`); }
    tb.innerHTML=(lv>1?MONEY.filter(v=>lv===3||v<=100).map(v=>`<button data-m="${v}" style="padding:0 var(--s-2)">${money(v,.8)}</button>`).join('')+'<span class="sep"></span>':'')+`<button id="un" aria-label="Quitar">⌫</button><button id="ok" style="background:var(--c-menta)">${kic('check')} Entregar</button>`;
    tb.querySelectorAll('[data-m]').forEach(b=>b.addEventListener('click',()=>{ if(!bag.length){ tsay('Primero pon los productos en la funda'); return; } cash.push(+b.dataset.m); volar(b,bg,money(+b.dataset.m,.8),{arco:-40}); coinS(); drawBag(); }));
    tb.querySelector('#un').addEventListener('click',()=>{ if(cash.length) cash.pop(); else bag.pop(); drawBag(); });
    tb.querySelector('#ok').addEventListener('click',check);
  }
  function check(){
    const need={}; order.items.forEach(([i,n])=>need[i]=n); const have={}; bag.forEach(i=>have[i]=(have[i]||0)+1);
    const okItems=Object.keys({...need,...have}).every(k=>(need[k]||0)===(have[k]||0));
    if (!okItems){ tsay('Hmm, revisa lo que pidió el cliente'); note(220,.2,'sine',.1); return; }
    const sum=cash.reduce((a,b)=>a+b,0);
    if (lv===2 && sum!==order.total){ tsay(`Cuenta otra vez. Son ${order.total} pesos`); note(220,.2,'sine',.1); return; }
    if (lv===3 && sum!==paid-order.total){ tsay(`El total es ${order.total}. Te pagó ${paid}. ¿Cuánto cambio le das?`); note(220,.2,'sine',.1); return; }
    coinS(); confetti(); cu.querySelector('span').style.animation='hop .7s 2'; abrirCaja(); setTimeout(()=>salir(cu.firstElementChild),1500); win(lv===1?'¡Gracias! ¡Vuelvo mañana!':lv===2?`¡Gracias! Pagué ${order.total} pesos`:`¡Gracias por el cambio de ${paid-order.total} pesos!`); setTimeout(newCustomer,2800);
  }
  sh.querySelectorAll('[data-p]').forEach(b=>b.addEventListener('click',()=>{ if (cash.length){ tsay('Ya estás cobrando. Usa ⌫ para corregir'); return; } bag.push(+b.dataset.p); volar(b.querySelector('span'),bg,emo(PROD[+b.dataset.p][0],'1em')); popS(); speak(PROD[+b.dataset.p][1]); drawBag(true); }));
  /* la caja registradora abre el cajón al cobrar */
  function abrirCaja(){ const c=root.querySelector('.cajon'); temblar(root.querySelector('.caja-r'),{px:2}); if(!c||!c.animate||(typeof RM!=='undefined'&&RM)) return; c.animate([{transform:'translateY(0)'},{transform:'translateY(12%)',offset:.2},{transform:'translateY(12%)',offset:.8},{transform:'translateY(0)'}],{duration:1100,easing:'ease-out'}); }
  setTimeout(newCustomer,300);
}

/* ---------- Granja de sonidos ---------- */
function toyFarm(root){
  const lv=LV();
  const A=[['🐄','vaca','¡Muuu!','moo','cow','🌾'],['🐷','cerdo','¡Oinc, oinc!','oink','pig','🍎'],['🐔','gallina','¡Coc, coc, coc!','cluck','hen','🌽'],['🐑','oveja','¡Beee!','baa','sheep','🌿'],['🐴','caballo','¡Iiiiih!','neigh','horse','🥕'],['🦆','pato','¡Cuac, cuac!','quack','duck','🐛'],['🐶','perro','¡Guau, guau!','woof','dog','🦴'],['🐱','gato','¡Miau!','meow','cat','🐟'],['🐐','chivo','¡Meee!','maa','goat','🍃']];
  let food=null, quiz=null;
  addHTML(root, `<div class="abs" style="inset:0 0 var(--tbar-h) 0;background:linear-gradient(#D6ECFA 0 30%,#CFE6B8 30%)"></div>
    ${scene('granja','inset:0 0 var(--tbar-h) 0')}
    <div id="fm" class="abs" style="left:8px;right:8px;top:30%;display:grid;grid-template-columns:repeat(3,1fr);gap:var(--s-2)"></div>
    <div class="tbar" id="ft"></div>`);
  const fm=root.querySelector('#fm'), ft=root.querySelector('#ft'); sceneParallax(root);
  fm.innerHTML=A.map((a,i)=>`<button data-a="${i}" style="font-size:var(--fs-7xl);padding:var(--s-2);border-radius:var(--r-md);display:flex;flex-direction:column;align-items:center"><span style="display:inline-block">${emo(a[0])}</span><small style="font-size:var(--fs-xs);font-weight:800">${lv===3?a[4]:a[1]}</small></button>`).join('');
  ft.innerHTML = lv===1 ? `<span class="muted" style="font-weight:800;padding:0 var(--s-2)">Toca un animal 🔊</span>` : lv===2 ? A.map(a=>`<button data-f="${a[5]}">${['🌽','🥕','🐟'].includes(a[5])?emo(a[5]):a[5]}</button>`).join('') : `<button id="q">❓ Which animal says…?</button>`;
  fm.querySelectorAll('[data-a]').forEach(b=>b.addEventListener('click',()=>{ const a=A[+b.dataset.a]; const s=b.querySelector('span'); s.style.animation='none'; void s.offsetWidth; s.style.animation='hop .7s';
    if (lv===2 && food){ if (food===a[5]){ win(`¡Ñam! A ${a[1]==='vaca'||a[1]==='gallina'||a[1]==='oveja'?'la':'el'} ${a[1]} le gusta ${food}`); sparks(b,6); } else tsay(`Hmm, ${a[1]==='vaca'||a[1]==='gallina'||a[1]==='oveja'?'la':'el'} ${a[1]} no come eso`); food=null; ft.querySelectorAll('[data-f]').forEach(x=>x.classList.remove('on')); return; }
    if (lv===3 && quiz){ if (a===quiz){ win(`Yes! The ${a[4]} says ${a[3]}!`); quiz=null; } else { speak(`No, the ${a[4]} says ${a[3]}`,'en-US'); } return; }
    speak(lv===3?`The ${a[4]} says ${a[3]}`:`${a[2]} Soy ${a[1]==='vaca'||a[1]==='gallina'||a[1]==='oveja'?'la':'el'} ${a[1]}`, lv===3?'en-US':'es-ES'); }));
  ft.querySelectorAll('[data-f]').forEach(b=>b.addEventListener('click',()=>{ food=b.dataset.f; ft.querySelectorAll('[data-f]').forEach(x=>x.classList.toggle('on',x===b)); tsay('¿Quién come esto? Toca el animal'); }));
  const q=root.querySelector('#q'); if (q) q.addEventListener('click',()=>{ quiz=pick(A); tsay(`Which animal says ${quiz[3]}?`,'en-US'); });
}

/* ---------- Reloj ---------- */
function toyClock(root){
  const lv=LV(); let mins=180, goal=null; const NUMS=['','una','dos','tres','cuatro','cinco','seis','siete','ocho','nueve','diez','once','doce'];
  const hm=t=>[Math.floor(t/60)%12||12, t%60];
  function frase(t){ let [h,m]=hm(t); const art=hh=>hh===1?'Es la una':`Son las ${NUMS[hh]}`;
    if (m===0) return `${art(h)} en punto`; if (m===15) return `${art(h)} y cuarto`; if (m===30) return `${art(h)} y media`;
    if (m===45) return `${art(h%12+1)} menos cuarto`; return `${art(h)} y ${m}`; }
  const dig=t=>{ const [h,m]=hm(t); return `${h}:${String(m).padStart(2,'0')}`; };
  addHTML(root, `<div class="abs" style="inset:0 0 var(--tbar-h) 0;background:linear-gradient(#E3F0FA,var(--bg))"></div>
    <div id="dg" class="abs" style="left:0;right:0;top:56px;text-align:center;font-size:var(--fs-5xl);font-weight:800"></div>
    <svg id="ck" class="abs" viewBox="-14 -14 328 328" style="left:50%;top:52%;transform:translate(-50%,-50%);width:min(82%,340px);touch-action:none">
      <circle cx="150" cy="150" r="140" fill="#fff" stroke="#C9B8EE" stroke-width="10"/>
      ${times(60,i=>{const a=i/60*Math.PI*2; const r1=i%5?128:118; return `<line x1="${150+r1*Math.sin(a)}" y1="${150-r1*Math.cos(a)}" x2="${150+132*Math.sin(a)}" y2="${150-132*Math.cos(a)}" stroke="#C9C3B8" stroke-width="${i%5?2:4}"/>`;}).join('')}
      ${times(12,i=>{const n=i+1,a=n/12*Math.PI*2; return `<text x="${150+98*Math.sin(a)}" y="${150-98*Math.cos(a)+9}" text-anchor="middle" font-size="26" font-weight="800" fill="#4A4658" font-family="Nunito">${n}</text>`;}).join('')}
      ${lv>1?times(12,i=>{const a=i/12*Math.PI*2; return `<text x="${150+140*Math.sin(a)*.0+ (150+150*Math.sin(a))-150}" y="${150-150*Math.cos(a)+5}" text-anchor="middle" font-size="11" font-weight="700" fill="#8F82C6" font-family="Nunito">${i*5}</text>`;}).join(''):''}
      <line id="hh" x1="150" y1="150" x2="150" y2="85" stroke="#4A4658" stroke-width="10" stroke-linecap="round"/>
      <line id="mh" x1="150" y1="150" x2="150" y2="40" stroke="#D9946C" stroke-width="7" stroke-linecap="round"/>
      <circle cx="150" cy="150" r="10" fill="#4A4658"/></svg>
    <div class="tbar"><button id="hm">−1 h</button><button id="hp">+1 h</button><button id="say">🔊</button>${lv>0?'<button id="rt">🎯 Reto</button><button id="ok" style="background:var(--c-menta)">✅ Listo</button>':''}</div>`);
  const ck=root.querySelector('#ck'), dg=root.querySelector('#dg');
  function draw(){ const m=mins%60, h=(mins/60)%12; const ma=m/60*360, ha=h/12*360;
    root.querySelector('#mh').setAttribute('transform',`rotate(${ma} 150 150)`); root.querySelector('#hh').setAttribute('transform',`rotate(${ha} 150 150)`);
    dg.innerHTML = goal ? `<span style="font-size:var(--fs-lg)">${goal.txt}</span><br>${lv===1?'':dig(mins)}` : dig(mins); }
  let drag=false, lastA=0;
  const ang=e=>{ const r=ck.getBoundingClientRect(); const x=e.clientX-r.left-r.width/2, y=e.clientY-r.top-r.height/2; return (Math.atan2(x,-y)*180/Math.PI+360)%360; };
  ck.addEventListener('pointerdown',e=>{ drag=true; lastA=ang(e); try{ck.setPointerCapture(e.pointerId);}catch(_){} });
  ck.addEventListener('pointermove',e=>{ if(!drag) return; const a=ang(e); let d=a-lastA; if(d>180) d-=360; if(d<-180) d+=360; lastA=a; mins=(mins+d/6+720)%720; draw(); });
  ck.addEventListener('pointerup',()=>{ if(!drag) return; drag=false; const step=lv===1?5:5; mins=Math.round(mins/step)*step%720; draw(); note(880,.05,'square',.04); if(!goal) speak(frase(mins)); });
  root.querySelector('#hm').addEventListener('click',()=>{ mins=(mins-60+720)%720; draw(); speak(frase(mins)); });
  root.querySelector('#hp').addEventListener('click',()=>{ mins=(mins+60)%720; draw(); speak(frase(mins)); });
  root.querySelector('#say').addEventListener('click',()=>speak(frase(mins)));
  function newGoal(){ let t, txt;
    if (lv===1){ t=rnd(1,12)*60; txt=`🎯 Pon: ${frase(t).replace(/^(Es|Son) /,'')}`; tsay(`Pon el reloj: ${frase(t)}`); }
    else if (lv===2){ t=rnd(1,12)*60+pick([0,15,30,45]); txt=`🎯 Pon: ${frase(t)}`; tsay(`Pon el reloj: ${frase(t)}`); }
    else { const s=rnd(1,11)*60+pick([0,15,30,45]), add=pick([15,30,45,60,75,90,120]); t=(s+add)%720; mins=s; txt=`🎯 Son las ${dig(s)}. ¿Qué hora será en ${add} minutos?`; tsay(`Son las ${dig(s)}. Pon la hora que será en ${add} minutos`); }
    goal={t:t%720||0, txt}; draw(); }
  root.querySelector('#rt').addEventListener('click',newGoal);
  root.querySelector('#ok').addEventListener('click',()=>{ if(!goal){ newGoal(); return; } if (mins%720===goal.t%720){ confetti(); win(`¡Correcto! ${frase(mins)}`); goal=null; setTimeout(newGoal,2600); } else { tsay(`Ahora marca ${dig(mins)}. Intenta otra vez`); note(220,.2,'sine',.1); } });
  draw(); if (lv>1) setTimeout(newGoal,2400);
}

/* ---------- Mapas ---------- */
function toyMaps(root){
  const lv=LV(); let mode='isla';
  const ISLA='M25 55 L70 48 L110 40 L150 37 L190 34 L232 28 L262 36 L292 52 L318 54 L346 68 L322 78 L304 80 L334 96 L366 110 L386 130 L370 150 L338 152 L300 156 L256 160 L230 168 L206 176 L192 202 L172 196 L160 176 L140 168 L110 171 L60 168 L20 160 L8 150 L40 140 L90 138 L114 124 L100 106 L70 96 L40 86 L25 70Z';
  const BORDE='M166 36 L170 58 L162 82 L170 104 L160 126 L166 150 L160 176';
  const PL=[['Santo Domingo',258,154,1],['Santiago',220,62,1],['Punta Cana',376,128,1],['Pico Duarte',204,86,1],['Puerto Plata',236,40,2],['Samaná',318,66,2],['Lago Enriquillo',182,142,2],['Barahona',206,164,3],['La Romana',310,148,3],['Haití',80,120,3]];
  const CONT=[['América del Norte','M30 30 Q70 10 130 26 Q150 50 120 70 Q100 90 86 96 Q60 70 30 60Z',80,52],['América del Sur','M110 104 Q140 100 150 124 Q140 170 122 200 Q108 160 104 130Z',126,140],['Europa','M184 34 Q206 24 222 34 Q218 56 196 60 Q182 50 184 34Z',202,46],['África','M188 74 Q226 66 246 88 Q246 130 222 168 Q204 150 196 118 Q180 100 188 74Z',218,112],['Asia','M226 24 Q300 10 368 32 Q372 70 330 90 Q290 106 262 90 Q236 74 226 24Z',300,56],['Oceanía','M318 140 Q350 130 372 146 Q366 172 336 174 Q314 164 318 140Z',344,156],['Antártida','M60 208 Q200 196 340 208 Q200 222 60 208Z',200,209]];
  addHTML(root, `<div class="abs" style="inset:0 0 var(--tbar-h) 0;background:#E3F0FA"></div><div id="mp" class="abs" style="inset:0 0 var(--tbar-h) 0"></div>
    <div class="tbar"><button data-m="isla" class="on">🏝️ Mi isla</button><button data-m="mundo">🌎 El mundo</button><button id="rs">🔄</button></div>`);
  const mp=root.querySelector('#mp');
  function round(){
    const W=mp.clientWidth, H=mp.clientHeight; const sc=Math.min((W-16)/400,(H*.5)/224), ox=(W-400*sc)/2, oy=56;
    const isla=mode==='isla'; const items = isla ? PL.filter(p=>p[3]<=lv) : CONT.slice(0, lv===1?4:7);
    let svg=`<svg class="abs" style="left:${ox}px;top:${oy}px;width:${400*sc}px;height:${224*sc}px" viewBox="0 0 400 224">`;
    if (isla) svg+=`<path d="${ISLA}" fill="#CFE6B8" stroke="#8AA368" stroke-width="2.5"/><path d="${BORDE}" stroke="#8AA368" stroke-width="2" stroke-dasharray="5 4" fill="none"/><text x="70" y="70" font-size="12" fill="#8AA368" font-weight="700" font-family="Nunito">HAITÍ</text><text x="230" y="110" font-size="12" fill="#6F8A55" font-weight="700" font-family="Nunito">REP. DOMINICANA</text><text x="300" y="20" font-size="11" fill="#6FA3CB" font-family="Nunito">Océano Atlántico</text><text x="230" y="214" font-size="11" fill="#6FA3CB" font-family="Nunito">Mar Caribe</text>`;
    else svg+=CONT.map(c=>`<path d="${c[1]}" fill="#CFE6B8" stroke="#8AA368" stroke-width="2"/>`).join('');
    if (lv<3) svg+=items.map(it=>{ const [x,y]=isla?[it[1],it[2]]:[it[2],it[3]]; return `<circle cx="${x}" cy="${y}" r="7" fill="#fff" stroke="#D9946C" stroke-width="3"/>`; }).join('');
    svg+='</svg>'; mp.innerHTML=svg+`<div class="abs" style="left:0;right:0;top:${oy+224*sc+6}px;text-align:center;font-size:var(--fs-2xs)" class="muted">${isla?'Mapa simplificado de la isla La Española':'Mapa simplificado del mundo'}</div>`;
    let left=items.length; const top0=oy+224*sc+30;
    shuffle(items).forEach((it,j)=>{ const name=it[0]; const [tx,ty]=isla?[it[1],it[2]]:[it[2],it[3]];
      const el=document.createElement('div'); el.className='abs'; el.textContent=(isla?'📍 ':'')+name;
      const x0=8+(j%2)*(W/2-4), y0=top0+Math.floor(j/2)*42; el.style.cssText=`left:${x0}px;top:${y0}px;background:var(--card);border:var(--bw) solid var(--line);border-radius:var(--r-sm);padding:var(--s-2) var(--s-3);font-weight:800;font-size:var(--fs-xs);z-index:3;transition:left .3s,top .3s;white-space:nowrap`;
      mp.appendChild(el); el.dataset.x=x0; el.dataset.y=y0;
      dragify(el, mp, {start:()=>speak(name), drop:(el,px,py)=>{ const gx=ox+tx*sc, gy=oy+ty*sc;
        if (Math.hypot(px-gx,py-gy) < (isla?30:46)*Math.max(1,sc)){ el.dataset.lock=1; el.style.left=(gx-12)+'px'; el.style.top=(gy-14)+'px'; el.style.fontSize='11px'; el.style.padding='2px 6px'; el.style.background='#F8EFC9'; note(784,.2,'sine',.12); left--;
          if (left===0){ confetti(); win(isla?'¡Conoces muy bien nuestra isla!':'¡Ubicaste todos los continentes!'); setTimeout(round,3000); } }
        else { el.style.left=el.dataset.x+'px'; el.style.top=el.dataset.y+'px'; } }}); });
  }
  root.querySelectorAll('[data-m]').forEach(b=>b.addEventListener('click',()=>{ mode=b.dataset.m; root.querySelectorAll('[data-m]').forEach(x=>x.classList.toggle('on',x===b)); round(); tsay(mode==='isla'?'Arrastra cada lugar al mapa de nuestra isla':'Arrastra cada continente a su lugar'); }));
  root.querySelector('#rs').addEventListener('click',round);
  setTimeout(round,40);
}

/* ---------- Cuerpo humano por capas ---------- */
function toyBody(root){
  const lv=LV(); let layer='piel', quiz=null;
  const PARTS={
    piel:[['cabeza','La cabeza protege el cerebro',`<circle cx="100" cy="46" r="30"/>`],['tronco','El tronco tiene el pecho y la barriga',`<rect x="62" y="82" width="76" height="118" rx="26"/>`],['brazo','Los brazos nos ayudan a cargar y abrazar',`<rect x="34" y="88" width="24" height="110" rx="12"/><rect x="142" y="88" width="24" height="110" rx="12"/>`],['mano','Con las manos agarramos y escribimos',`<circle cx="46" cy="208" r="13"/><circle cx="154" cy="208" r="13"/>`],['pierna','Las piernas nos permiten caminar y saltar',`<rect x="66" y="196" width="30" height="122" rx="14"/><rect x="104" y="196" width="30" height="122" rx="14"/>`],['pie','Los pies nos sostienen',`<ellipse cx="80" cy="328" rx="20" ry="9"/><ellipse cx="120" cy="328" rx="20" ry="9"/>`]],
    musculos:[['bíceps','El bíceps dobla el brazo',`<ellipse cx="46" cy="120" rx="10" ry="22"/><ellipse cx="154" cy="120" rx="10" ry="22"/>`],['pectorales','Los pectorales mueven los brazos hacia adelante',`<ellipse cx="84" cy="104" rx="18" ry="12"/><ellipse cx="116" cy="104" rx="18" ry="12"/>`],['abdominales','Los abdominales sostienen el tronco',`<rect x="86" y="124" width="28" height="56" rx="8"/>`],['cuádriceps','El cuádriceps estira la pierna',`<ellipse cx="81" cy="232" rx="13" ry="30"/><ellipse cx="119" cy="232" rx="13" ry="30"/>`],['corazón (músculo)','El corazón también es un músculo que nunca descansa',`<path d="M104 112 q8 -10 16 0 q-2 12 -16 20 q-14 -8 -16 -20 q8 -10 16 0Z"/>`]],
    huesos:[['cráneo','El cráneo protege el cerebro',`<circle cx="100" cy="44" r="24"/>`],['columna vertebral','La columna nos mantiene derechos',`<rect x="96" y="80" width="8" height="116" rx="4"/>`],['costillas','Las costillas protegen el corazón y los pulmones',`<path d="M72 100 Q100 90 128 100 M70 112 Q100 102 130 112 M72 124 Q100 114 128 124 M76 136 Q100 128 124 136" fill="none" stroke-width="5"/>`],['fémur','El fémur es el hueso más largo del cuerpo',`<rect x="76" y="204" width="8" height="58" rx="4"/><rect x="116" y="204" width="8" height="58" rx="4"/>`],['húmero','El húmero es el hueso del brazo',`<rect x="42" y="94" width="8" height="54" rx="4"/><rect x="150" y="94" width="8" height="54" rx="4"/>`],['pelvis','La pelvis une el tronco con las piernas',`<path d="M72 186 Q100 210 128 186 L122 200 Q100 214 78 200Z"/>`]],
    organos:[['cerebro','El cerebro controla todo el cuerpo',`<ellipse cx="100" cy="38" rx="24" ry="17"/>`],['pulmones','Los pulmones toman el oxígeno del aire',`<ellipse cx="82" cy="112" rx="14" ry="24"/><ellipse cx="118" cy="112" rx="14" ry="24"/>`],['corazón','El corazón bombea la sangre',`<path d="M102 108 q7 -9 14 0 q-2 11 -14 18 q-12 -7 -14 -18 q7 -9 14 0Z"/>`],['hígado','El hígado limpia la sangre y produce bilis',`<path d="M70 142 Q96 134 104 148 Q90 160 72 156Z"/>`],['estómago','El estómago mezcla y deshace los alimentos',`<ellipse cx="116" cy="150" rx="14" ry="11"/>`],['intestinos','Los intestinos absorben los nutrientes',`<rect x="80" y="164" width="40" height="30" rx="12"/>`]]
  };
  const COLOR={piel:'#F7D1B5',musculos:'#E88A8A',huesos:'#F3EEE2',organos:'#F2A2B4'};
  addHTML(root, `<div class="abs" style="inset:0 0 var(--tbar-h) 0;background:var(--paper-lav)"></div><svg id="bd" class="abs" viewBox="0 0 200 350" style="left:50%;top:44px;transform:translateX(-50%);height:calc(100% - 200px);max-width:92%"></svg>
    <div id="inf" class="abs" style="left:12px;right:12px;bottom:84px;min-height:48px;background:var(--card);border:var(--bw) solid var(--line);border-radius:var(--r-md);padding:var(--s-2) var(--s-3);font-weight:700;text-align:center"></div>
    <div class="tbar"><button data-l="piel" class="on">🧍 Piel</button><button data-l="musculos">💪 Músculos</button><button data-l="huesos">🦴 Huesos</button><button data-l="organos">🫀 Órganos</button>${lv===3?'<button id="qz">❓ Reto</button>':''}</div>`);
  const bd=root.querySelector('#bd'), inf=root.querySelector('#inf');
  const silo=`<g fill="${'#FBE6D6'}" stroke="#E2C2A8" stroke-width="2">${PARTS.piel.map(p=>p[2]).join('')}</g>`;
  function draw(){
    bd.innerHTML = (layer==='piel'?'':`<g opacity=".45">${silo}</g>`) + `<g stroke="${layer==='huesos'?'#CFC6B5':'#fff'}" stroke-width="2" fill="${COLOR[layer]}">${PARTS[layer].map((p,i)=>`<g data-i="${i}" style="cursor:pointer">${p[2]}</g>`).join('')}</g>`;
    if (layer==='huesos') bd.querySelectorAll('[data-i] path[fill="none"]').forEach(x=>x.setAttribute('stroke','#E8E1D2'));
    bd.querySelectorAll('[data-i]').forEach(g=>g.addEventListener('click',()=>{ const p=PARTS[layer][+g.dataset.i];
      g.style.transition='opacity .2s'; g.style.opacity=.6; setTimeout(()=>g.style.opacity=1,250);
      if (quiz){ if (quiz.p===p){ win(`¡Sí! ${p[1]}`); inf.innerHTML=`✅ <b>${p[0]}</b>: ${p[1]}`; quiz=null; } else { inf.innerHTML=`Ese es: <b>${p[0]}</b>. Intenta otra vez`; speak(`Ese es ${p[0]}`); } return; }
      inf.innerHTML=`<b>${p[0][0].toUpperCase()+p[0].slice(1)}</b><br><span style="font-weight:600">${lv>1?p[1]:''}</span>`; speak(lv>1?`${p[0]}. ${p[1]}`:p[0]); popS(); }));
    if (!quiz) inf.innerHTML=`<span class="muted">Toca una parte del cuerpo</span>`;
  }
  root.querySelectorAll('[data-l]').forEach(b=>b.addEventListener('click',()=>{ layer=b.dataset.l; quiz=null; root.querySelectorAll('[data-l]').forEach(x=>x.classList.toggle('on',x===b)); draw(); speak({piel:'La piel',musculos:'Los músculos',huesos:'Los huesos',organos:'Los órganos'}[layer]); }));
  const qz=root.querySelector('#qz'); if (qz) qz.addEventListener('click',()=>{ if(layer==='piel'){ layer='organos'; root.querySelectorAll('[data-l]').forEach(x=>x.classList.toggle('on',x.dataset.l==='organos')); } draw(); const p=pick(PARTS[layer]); quiz={p}; inf.innerHTML=`❓ Toca: <b>${p[1].replace(/^(El|La|Los|Las) [^ ]+( \([^)]*\))? /,'lo que ')}</b>`; tsay(`Toca la parte que: ${p[1].replace(/^(El|La|Los|Las) [^ ]+( \([^)]*\))? /,'')}`); });
  draw();
}

/* ---------- Laboratorio ---------- */
function toyLab(root){
  const lv=LV(); let mode='flota', cleanup=[];
  addHTML(root, `${scene('laboratorio','inset:0 0 var(--tbar-h) 0')}<div id="lb" class="abs" style="inset:0 0 var(--tbar-h) 0;overflow:hidden"></div>
    <div class="tbar"><button data-m="flota" class="on">${ilu('tina','1.3em')} ¿Flota o se hunde?</button><button data-m="iman">${ilu('iman','1.2em')} Imanes</button><button data-m="volcan">${ilu('volcan','1.3em')} Volcán</button></div>`);
  const lb=root.querySelector('#lb'); sceneParallax(root); scenePet(root,{at:'right:4px;bottom:74px',size:54,prop:ilu('bata','100%'),cls:'pet-lab'});
  function flota(){
    const OB=[['🪵','madera',1],['🪨','piedra',0],['🍎','manzana',1],['🔑','llave',0],['🦆','pato de goma',1],['⚓','ancla',0],['🧽','esponja',1],['🔩','tornillo',0],['🏐','pelota',1],['🥄','cuchara',0]];
    const oe=e=>e==='🦆'?ilu('patito','1em'):emo(e); /* pato de goma propio (el 🦆 general es el pato de granja) */
    const W=lb.clientWidth, H=lb.clientHeight, wt=H*.42;
    lb.innerHTML=`<div class="abs agua" style="left:6%;right:6%;top:${wt}px;bottom:16px"></div>
      <div class="abs" style="left:10px;right:10px;top:14px;display:flex;flex-wrap:wrap;gap:var(--s-2);justify-content:center">${OB.map((o,i)=>`<button data-o="${i}" style="font-size:var(--fs-4xl);line-height:1;background:var(--card);border:var(--bw) solid var(--line-2);border-radius:var(--r-sm);padding:var(--s-1) var(--s-2);box-shadow:var(--sh-btn)">${oe(o[0])}</button>`).join('')}</div>
      <div id="pq" class="abs" style="left:0;right:0;top:${wt-60}px;text-align:center"></div>`;
    const drop=(o,i)=>{ const el=document.createElement('div'); el.className='abs'; el.innerHTML=oe(o[0]); const x=rnd(14,76);
      el.style.cssText=`left:${x}%;top:${wt-70}px;font-size:var(--fs-5xl);transition:top 1.4s cubic-bezier(.3,.7,.4,1)`; lb.appendChild(el); landSquash(el);
      requestAnimationFrame(()=>requestAnimationFrame(()=>{ el.style.top=(o[2]?wt-28:H-70)+'px'; })); const cxo=()=>el.offsetLeft+el.offsetWidth/2; setTimeout(()=>{ splashS(); ondas(lb,cxo(),wt,{ancho:84}); gotitas(lb,cxo(),wt-4,{n:5}); },480); if(!o[2]) setTimeout(()=>burbujitas(lb,cxo(),H-70,{n:4,sube:H-70-wt}),800);
      if (o[2]) setTimeout(()=>el.style.animation='bob 2s ease-in-out infinite',1500);
      setTimeout(()=>speak(`${o[1]}: ${o[2]?'¡flota!':'¡se hunde!'}`),900); };
    lb.querySelectorAll('[data-o]').forEach(b=>b.addEventListener('click',()=>{ const o=OB[+b.dataset.o]; b.disabled=true; b.style.opacity=.35;
      if (lv===1){ drop(o); return; }
      const pq=lb.querySelector('#pq'); pq.innerHTML=`<div class="bubble" style="display:inline-block;font-size:var(--fs-sm)">¿${oe(o[0])} flota o se hunde?<br><button class="chip" data-a="1">${ilu('flotador','1.2em')} Flota</button> <button class="chip" data-a="0">${ilu('ancla','1.2em')} Se hunde</button></div>`;
      speak(`¿La ${o[1]} flota o se hunde?`.replace('La pato','El pato').replace('La tornillo','El tornillo'));
      pq.querySelectorAll('[data-a]').forEach(a=>a.addEventListener('click',()=>{ pq.innerHTML=''; drop(o); const ok=+a.dataset.a===o[2];
        setTimeout(()=>{ if(ok) win('¡Lo predijiste bien!'); else tsay(lv===3?(o[2]?'Flota porque es menos densa que el agua':'Se hunde porque es más densa que el agua'):'¡Sorpresa! Mira qué pasó'); },1700); })); }));
  }
  function iman(){
    const OB=[['📎','clip',1],['🔩','tornillo',1],['🧷','imperdible',1],['✂️','tijeras',1],['🪛','destornillador',1],['🪵','madera',0],['🧸','peluche',0],['✏️','lápiz',0],['🧦','media',0],['🍎','manzana',0],['🎈','globo',0]];
    const W=lb.clientWidth, H=lb.clientHeight; const items=OB.map((o,i)=>{ const el=document.createElement('div'); el.className='abs'; el.innerHTML=emo(o[0]); const x=rnd(10,W-60), y=rnd(H*.35,H-60);
      el.style.cssText=`left:${x}px;top:${y}px;font-size:var(--fs-4xl);transition:left .25s,top .25s`; lb.appendChild(el); return {o,el,stuck:false,x,y}; });
    lb.insertAdjacentHTML('afterbegin',`<p class="muted" style="text-align:center;font-weight:800;margin:var(--s-4) 40px 0">Arrastra el imán ${ilu('iman','1.3em')} cerca de las cosas</p>`);
    const mg=document.createElement('div'); mg.className='abs'; mg.innerHTML=ilu('iman','1em'); mg.style.cssText=`left:${W/2-30}px;top:60px;font-size:var(--fs-7xl);z-index:5`; lb.appendChild(mg);
    let found=0; const total=OB.filter(o=>o[2]).length;
    const tick=()=>{ const mx=parseFloat(mg.style.left)+30, my=parseFloat(mg.style.top)+40;
      items.forEach((it,k)=>{ if (it.stuck){ it.el.style.left=(mx-20+((k%3)-1)*22)+'px'; it.el.style.top=(my+10+Math.floor(k/3)%2*14)+'px'; return; }
        if (it.o[2] && Math.hypot(it.x+18-mx,it.y+18-my)<80){ it.stuck=true; note(1046,.12,'triangle',.08); temblar(mg,{px:3,ms:300}); if(it.el.animate&&!RM) it.el.animate([{transform:'scale(1.35)'},{transform:'scale(1)'}],{duration:320,easing:'ease-out'}); speak(`¡El imán atrae ${it.o[1]==='tijeras'?'las':'el'} ${it.o[1]}!`); found++;
          if (found===total){ setTimeout(()=>win(lv>1?'¡Encontraste todo! El imán atrae los objetos de hierro y acero':'¡Lo encontraste todo!'),600); } } }); };
    dragify(mg, lb, {drop:tick}); const iv=setInterval(()=>{ if(mg.classList.contains('drag')) tick(); },120); cleanup.push(()=>clearInterval(iv));
  }
  function volcan(){
    let bic=0, vin=0, col=false;
    lb.innerHTML=`<svg class="abs" viewBox="0 0 300 260" style="left:50%;bottom:14px;transform:translateX(-50%);width:min(90%,340px)"><path d="M20 250 L120 70 L180 70 L280 250Z" fill="#D9B08A" stroke="#A9825F" stroke-width="1.6" vector-effect="non-scaling-stroke" stroke-linejoin="round"/><path d="M70 180 L96 170 M200 190 L222 178 M150 210 L170 204" stroke="#C29A7C" stroke-width="5" stroke-linecap="round"/><path class="lava" d="M128 74 Q126 108 112 136 Q120 142 128 128 Q138 104 142 76Z" stroke="rgba(0,0,0,.12)" stroke-width="1.6" vector-effect="non-scaling-stroke"/><path class="lava" d="M160 76 Q166 112 186 150 Q178 156 170 140 Q156 110 152 76Z" stroke="rgba(0,0,0,.12)" stroke-width="1.6" vector-effect="non-scaling-stroke"/><ellipse cx="150" cy="70" rx="30" ry="9" fill="#8E6B52"/><path d="M30 250 q8 -14 16 0 M250 250 q8 -14 16 0" fill="#A3D69B" stroke="#6E9A69" stroke-width="1.6" vector-effect="non-scaling-stroke"/></svg>
      <div id="fx" class="abs" style="inset:0;pointer-events:none"></div>
      <div class="abs" style="left:0;right:0;top:16px;display:flex;justify-content:center;gap:var(--s-2);flex-wrap:wrap"><button class="chip" id="b1">${ilu('cuchara','1.3em')} Bicarbonato</button><button class="chip" id="b2">${ilu('botella','1.3em')} Vinagre</button><button class="chip" id="b3">${ilu('gotero','1.3em')} Colorante</button><button class="chip" id="b4" aria-label="Empezar de nuevo">${kic('reiniciar','1.1em')}</button></div>
      <div id="vs" class="abs" style="left:0;right:0;top:112px;text-align:center;font-weight:800"></div>`;
    const vs=lb.querySelector('#vs'), fx=lb.querySelector('#fx');
    const st=()=>vs.innerHTML=`Bicarbonato: ${ilu('cuchara','1.3em').repeat(bic)||'—'} · Vinagre: ${ilu('botella','1.3em').repeat(vin)||'—'}`; st();
    const crater=()=>{ const r=lb.getBoundingClientRect(), v=lb.querySelector('svg').getBoundingClientRect(); return [v.left-r.left+v.width/2, v.top-r.top+v.height*.27]; };
    const burbujea=()=>{ const [cx,cy]=crater(); burbujitas(fx,cx,cy,{n:3,sube:34,c:col?'#F7B3A8':'#FFFFFF',borde:col?'#D9796A':'#C3C8D6'}); };
    const lava=()=>{ if(RM) return; lb.querySelectorAll('.lava').forEach((l,i)=>{ l.setAttribute('fill',col?'#EE8A74':'#FFF7EE'); l.animate([{transform:'scaleY(0)'},{transform:'scaleY(1)',offset:.3},{transform:'scaleY(1)',opacity:1,offset:.75},{transform:'scaleY(1)',opacity:0}],{duration:2600,delay:200+i*120,easing:'ease-out'}); }); };
    const erupt=()=>{ temblar(lb.querySelector('svg'),{px:5,ms:500}); lava(); const n=Math.min(bic,vin)*30+20; const r=lb.getBoundingClientRect(), v=lb.querySelector('svg').getBoundingClientRect(); const cx=v.left-r.left+v.width/2, cy=v.top-r.top+v.height*.27;
      for(let i=0;i<n;i++){ const b=document.createElement('span'); b.className='abs'; const s=rnd(10,26);
        b.style.cssText=`left:${cx-s/2}px;top:${cy}px;width:${s}px;height:${s}px;border-radius:50%;background:${col?'#F4A6A6':'#FFF7EE'};border:1.6px solid ${col?'#D9796A':'#C3C8D6'};transition:transform ${1+Math.random()}s cubic-bezier(.2,.8,.4,1),opacity 1.6s;opacity:1`;
        fx.appendChild(b); requestAnimationFrame(()=>requestAnimationFrame(()=>{ b.style.transform=`translate(${rnd(-110,110)}px,${rnd(-160,90)}px)`; b.style.opacity=0; })); setTimeout(()=>b.remove(),2200); }
      noiseS(1.2,.15,400); confetti();
      win(lv===1?'¡Erupción!':'¡Erupción! El vinagre y el bicarbonato reaccionan y forman un gas, el dióxido de carbono, que hace la espuma');
      bic=0; vin=0; setTimeout(st,1800); };
    lb.querySelector('#b1').addEventListener('click',()=>{ if(bic<3){ bic++; plopS(); st(); burbujea(); if(vin) erupt(); } });
    lb.querySelector('#b2').addEventListener('click',()=>{ if(vin<3){ vin++; splashS(); st(); burbujea(); if(bic) erupt(); } });
    lb.querySelector('#b3').addEventListener('click',()=>{ col=!col; tsay(col?'Colorante rojo, como lava':'Sin colorante'); });
    lb.querySelector('#b4').addEventListener('click',()=>{ bic=0; vin=0; st(); });
    tsay(lv===3?'Pon bicarbonato y vinagre. ¿Qué pasa si pones más cantidad?':'Pon bicarbonato y vinagre en el volcán');
  }
  function show(){ cleanup.forEach(f=>f()); cleanup=[]; lb.innerHTML=''; ({flota,iman,volcan})[mode](); }
  root.querySelectorAll('[data-m]').forEach(b=>b.addEventListener('click',()=>{ mode=b.dataset.m; root.querySelectorAll('[data-m]').forEach(x=>x.classList.toggle('on',x===b)); show(); }));
  setTimeout(show,40);
  return ()=>cleanup.forEach(f=>f());
}

/* ---------- Tangram ---------- */
function toyTangram(root){
  const P=[['#F4A6A6',[[0,0],[4,0],[2,2]]],['#A9D3F0',[[0,0],[2,2],[0,4]]],['#F6E39A',[[2,4],[4,4],[4,2]]],['#B9E3C6',[[4,0],[4,2],[3,1]]],['#C9B8EE',[[2,2],[3,1],[4,2],[3,3]]],['#F7C59F',[[2,2],[3,3],[1,3]]],['#F5B8D0',[[0,4],[1,3],[3,3],[2,4]]]];
  addHTML(root, `<div id="tg2" class="abs" style="inset:0 0 var(--tbar-h) 0;background:var(--paper)"></div><div class="tbar"><button id="rs">🔄 Mezclar</button><span class="muted" style="font-weight:800;padding:0 var(--s-2);white-space:nowrap" id="hint"></span></div>`);
  const ar=root.querySelector('#tg2');
  function round(){
    const lv=LV(); ar.innerHTML=''; const W=ar.clientWidth, H=ar.clientHeight; const U=Math.min((W-40)/4, (H*.42)/4, 60); const ox=(W-U*4)/2, oy=24;
    root.querySelector('#hint').textContent = lv===3?'Toca una pieza para girarla':'Arrastra las piezas al cuadrado';
    ar.insertAdjacentHTML('beforeend',`<svg class="abs" style="left:${ox}px;top:${oy}px;width:${U*4}px;height:${U*4}px;overflow:visible" viewBox="0 0 4 4"><rect width="4" height="4" fill="#EDE5D8" stroke="#C9B79D" stroke-width=".05"/>${lv===1?P.map(p=>`<polygon points="${p[1].map(q=>q.join(',')).join(' ')}" fill="none" stroke="#C9B79D" stroke-width=".04" stroke-dasharray=".12 .1"/>`).join(''):''}</svg>`);
    let left=P.length;
    P.forEach((p,i)=>{ const xs=p[1].map(q=>q[0]), ys=p[1].map(q=>q[1]); const minx=Math.min(...xs), miny=Math.min(...ys), w=Math.max(...xs)-minx, h=Math.max(...ys)-miny;
      const el=document.createElement('div'); el.className='abs'; let rot = lv===3 ? pick([90,180,270]) : 0;
      el.innerHTML=`<svg width="${w*U}" height="${h*U}" viewBox="${minx} ${miny} ${w} ${h}" style="display:block;overflow:visible"><polygon points="${p[1].map(q=>q.join(',')).join(' ')}" fill="${p[0]}" stroke="#fff" stroke-width=".05" stroke-linejoin="round"/></svg>`;
      const tx=ox+minx*U, ty=oy+miny*U; const sx=rnd(8,Math.max(10,W-w*U-8)), sy=rnd(oy+U*4+30, Math.max(oy+U*4+40,H-h*U-10));
      el.style.cssText=`left:${sx}px;top:${sy}px;width:${w*U}px;height:${h*U}px;z-index:3;transition:transform .25s,left .3s,top .3s;transform:rotate(${rot}deg);animation:popin .4s ${i*.05}s both`;
      ar.appendChild(el); let downAt=null;
      el.addEventListener('pointerdown',e=>{ downAt=[e.clientX,e.clientY]; },true);
      dragify(el, ar, {drop:(el,px,py)=>{ const moved = downAt && Math.hypot(downAt[0]-(ar.getBoundingClientRect().left+px), downAt[1]-(ar.getBoundingClientRect().top+py))<6;
        if (moved && lv===3){ rot=(rot+90)%360; el.style.transform=`rotate(${rot}deg)`; popS(); return; }
        const cx=parseFloat(el.style.left), cy=parseFloat(el.style.top);
        if (rot===0 && Math.hypot(cx-tx,cy-ty)<U*.5){ el.style.left=tx+'px'; el.style.top=ty+'px'; el.dataset.lock=1; el.style.zIndex=2; note(784,.2,'sine',.12); left--;
          if (left===0){ confetti(); win('¡Armaste el tangram!'); setTimeout(round,3000); } }
        else if (rot!==0 && Math.hypot(cx-tx,cy-ty)<U*.5){ tsay('Casi. Gira la pieza tocándola'); } }});
    });
  }
  root.querySelector('#rs').addEventListener('click',round);
  setTimeout(round,40);
}

TOYS.find(t=>t.id==='dress').hidden=true;
TOYS.splice(TOYS.findIndex(t=>t.id==='weather')+1,0,
 {id:'shop',   name:'Mi colmado',         icon:'🏪', c:'peach',  open:toyShop,    hi:'¡Bienvenido a tu colmado! Atiende a los clientes.', hi2:'Atiende al cliente y cobra con pesos dominicanos.'},
 {id:'farm',   name:'Granja de sonidos',  icon:'🐄', c:'mint',   open:toyFarm,    hi:'Toca los animales para escucharlos.', hi2:'Elige una comida y dásela al animal correcto.'},
 {id:'clock',  name:'El reloj',           icon:'🕐', c:'lav',    open:toyClock,   hi:'Mueve la aguja larga y escucha la hora.'},
 {id:'maps',   name:'Mapas',              icon:'🗺️', c:'sky',    open:toyMaps,    hi:'Arrastra cada lugar a su sitio en el mapa.'},
 {id:'body',   name:'Mi cuerpo',          icon:'🫀', c:'rose',   open:toyBody,    hi:'Toca las partes del cuerpo. Cambia de capa abajo.'},
 {id:'lab',    name:'Laboratorio',        icon:'🔬', c:'butter', open:toyLab,     hi:'¡Hora de experimentar! ¿Flota o se hunde?'},
 {id:'tangram',name:'Tangram',            icon:'🔶', c:'sage',   open:toyTangram, hi:'Arma el cuadrado con las 7 piezas.'}
);
