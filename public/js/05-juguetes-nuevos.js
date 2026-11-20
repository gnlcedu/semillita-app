/* Semillita · Juguetes nuevos: colmado, granja, reloj, mapas, cuerpo, laboratorio, tangram */
/* =========================================================
   JUGUETES NUEVOS: colmado, granja, reloj, mapas, cuerpo, laboratorio, tangram
   ========================================================= */
function noiseS(dur=.3, vol=.12, freq=900){ try{ AC=AC||new (window.AudioContext||window.webkitAudioContext)(); const n=AC.sampleRate*dur, buf=AC.createBuffer(1,n,AC.sampleRate), d=buf.getChannelData(0);
  for(let i=0;i<n;i++) d[i]=(Math.random()*2-1)*Math.pow(1-i/n,2); const s=AC.createBufferSource(); s.buffer=buf; const f=AC.createBiquadFilter(); f.type='bandpass'; f.frequency.value=freq; const g=AC.createGain(); g.gain.value=vol; s.connect(f).connect(g).connect(AC.destination); s.start(); }catch(e){} }
const splashS=()=>{ noiseS(.35,.18,700); note(420,.25,'sine',.06); };
const coinS=()=>{ note(1568,.12,'square',.04); setTimeout(()=>note(2093,.25,'square',.04),80); };

/* Sonidos grabados de animales (public/sonidos/*.mp3, Freesound, CC0; ver docs/LICENCIAS.md).
   Suena la grabación y al terminar llama a luego(). Respeta el botón de voz; si el audio falla, sigue sin él.
   En el archivo único offline, las grabaciones vienen dentro de window.SONIDOS. */
let sonAnimal=null;
function sonidoAnimal(nombre, luego){
  const sigue=()=>{ if(luego){ const f=luego; luego=null; f(); } };
  try{ if (sonAnimal){ sonAnimal.pause(); sonAnimal=null; }
    if (S.settings.voice===false) return sigue();
    try{ if('speechSynthesis' in window) speechSynthesis.cancel(); }catch(_){}
    const a=new Audio((window.SONIDOS||{})[nombre]||`sonidos/${nombre}.mp3`); sonAnimal=a; a.volume=.9;
    a.addEventListener('ended',sigue); a.addEventListener('error',sigue); const p=a.play(); if(p&&p.catch) p.catch(sigue);
    setTimeout(()=>{ if(sonAnimal===a) sigue(); },3800);
  }catch(e){ sigue(); }
}

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
    <div class="abs mostrador" style="right:0;top:82px;width:176px;height:30px;z-index:5;pointer-events:none"></div>
    <div id="cu" class="abs" style="left:14px;top:46px;display:flex;align-items:flex-end;gap:var(--s-2);max-width:68%;z-index:5"></div>
    <div id="sh" class="abs" style="left:10px;right:10px;top:150px;bottom:calc(var(--tbar-h) + 86px);display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(3,minmax(0,max-content));align-content:start;gap:var(--s-2)"></div>
    <div class="abs caja-r" style="right:14px;bottom:calc(var(--tbar-h) + 92px);width:84px;height:84px;z-index:0;pointer-events:none"><span class="cajon">${ilu('cajon','100%')}</span>${ilu('caja','100%')}</div>
    <div id="bg" class="abs" style="left:10px;right:10px;bottom:calc(var(--tbar-h) + 14px);min-height:64px;max-height:64px;overflow-y:auto;background:var(--card);border:2px dashed var(--line);border-radius:var(--r-md);padding:var(--s-2);display:flex;flex-wrap:wrap;gap:var(--s-2);align-items:center"></div>
    <div class="tbar" id="tb2"></div>`);
  const cu=root.querySelector('#cu'), sh=root.querySelector('#sh'), bg=root.querySelector('#bg'), tb=root.querySelector('#tb2'); sceneParallax(root); scenePet(root,{at:'right:8px;top:40px',size:60,prop:ilu('delantal','100%'),cls:'pet-shop'});
  sh.innerHTML=PROD.map((p,i)=>`<button data-p="${i}" style="background:var(--card);border:var(--bw) solid var(--line);border-radius:var(--r-md);padding:var(--pp,var(--s-2)) 2px;min-height:0;line-height:1.1;display:flex;flex-direction:column;align-items:center;justify-content:center"><span style="font-size:var(--fp,var(--fs-4xl))">${emo(p[0])}</span>${lv>1?`<small style="font-weight:800;background:var(--butter);border-radius:var(--r-xs);padding:0 var(--s-2)">RD$${p[3]}</small>`:`<small style="font-weight:700">${p[1]}</small>`}</button>`).join('');
  /* en pantallas bajas los productos se achican para no encimarse con la bolsa */
  const medirSh=()=>{ const al=(sh.clientHeight-16)/3; sh.style.setProperty('--fp', Math.max(20,Math.min(34,al-34))+'px'); sh.style.setProperty('--pp', al<70?'2px':'var(--s-2)'); const lb=root.querySelector('#lyb .lyt'); if(lb) lb.style.display=root.clientWidth<340?'none':'';
    /* la caja registradora es adorno: se oculta si quedaría encima de los productos */
    const cj=root.querySelector('.caja-r'), ult=sh.lastElementChild; if(cj&&ult){ cj.style.visibility=''; cj.style.visibility = ult.getBoundingClientRect().bottom > cj.getBoundingClientRect().top+6 ? 'hidden' : ''; } };
  window.addEventListener('resize',medirSh); setTimeout(medirSh,0); setTimeout(medirSh,400);
  /* Leyenda plegable: nombre (y precio en niveles 2 y 3) de cada producto; tocar una fila lo dice en voz alta */
  addHTML(root, `<button id="lyb" class="chip abs" aria-expanded="false" aria-controls="ly" style="right:10px;top:102px;min-height:var(--tap);padding:0 var(--s-3);font-size:var(--fs-xs);z-index:6">📖<span class="lyt"> Nombres</span></button>
    <div id="ly" class="abs" hidden style="left:10px;right:10px;top:150px;z-index:8;background:var(--card);border:var(--bw) solid var(--line);border-radius:var(--r-md);box-shadow:var(--sh-2);padding:var(--s-3)">
      <div class="row" style="margin-bottom:var(--s-2)"><b style="font-size:var(--fs-md)">Productos del colmado</b><div class="sp"></div><button id="lyx" class="chip" style="min-height:var(--tap);padding:0 var(--s-3);font-size:var(--fs-xs)">Ocultar</button></div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:var(--s-1) var(--s-2)">${PROD.map((p,i)=>`<button data-ly="${i}" style="display:flex;align-items:center;gap:var(--s-2);min-height:var(--tap);background:none;border:0;padding:0 var(--s-1);text-align:left;font-weight:800;font-size:var(--fs-sm);color:var(--ink)"><span style="font-size:var(--fs-2xl);flex:none">${emo(p[0])}</span><span>${p[1]}${lv>1?`<small style="display:block;font-weight:700;color:#5A566B">RD$${p[3]}</small>`:''}</span></button>`).join('')}</div></div>`);
  { const ly=root.querySelector('#ly'), lyb=root.querySelector('#lyb'); const ver=on=>{ ly.hidden=!on; lyb.setAttribute('aria-expanded',on); lyb.classList.toggle('on',on); };
    lyb.addEventListener('click',()=>ver(ly.hidden)); root.querySelector('#lyx').addEventListener('click',()=>ver(false));
    ly.querySelectorAll('[data-ly]').forEach(b=>b.addEventListener('click',()=>speak(PROD[+b.dataset.ly][1]))); }
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
  return ()=>window.removeEventListener('resize',medirSh);
}

/* ---------- Granja de sonidos ---------- */
function toyFarm(root){
  const lv=LV();
  const A=[['🐄','vaca','¡Muuu!','moo','cow','🌾'],['🐷','cerdo','¡Oinc, oinc!','oink','pig','🍎'],['🐔','gallina','¡Coc, coc, coc!','cluck','hen','🌽'],['🐑','oveja','¡Beee!','baa','sheep','🌿'],['🐴','caballo','¡Iiiiih!','neigh','horse','🥕'],['🦆','pato','¡Cuac, cuac!','quack','duck','🐛'],['🐶','perro','¡Guau, guau!','woof','dog','🦴'],['🐱','gato','¡Miau!','meow','cat','🐟'],['🐐','chivo','¡Meee!','maa','goat','🍃']];
  let food=null, quiz=null;
  addHTML(root, `<div class="abs" style="inset:0 0 var(--tbar-h) 0;background:linear-gradient(#D6ECFA 0 30%,#CFE6B8 30%)"></div>
    ${scene('granja','inset:0 0 var(--tbar-h) 0')}
    <div id="fm" class="abs" style="left:8px;right:8px;top:30%;bottom:calc(var(--tbar-h) + var(--s-2));display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(3,minmax(0,1fr));gap:var(--s-1) var(--s-2)"></div>
    <div class="tbar" id="ft"></div>`);
  const fm=root.querySelector('#fm'), ft=root.querySelector('#ft'); sceneParallax(root);
  fm.innerHTML=A.map((a,i)=>`<button data-a="${i}" style="font-size:var(--fa,var(--fs-7xl));line-height:1.05;padding:2px;min-height:0;border-radius:var(--r-md);display:flex;flex-direction:column;align-items:center;justify-content:center"><span style="display:inline-block">${emo(a[0])}</span><small style="font-size:var(--fs-xs);font-weight:800">${lv===3?a[4]:a[1]}</small></button>`).join('');
  /* tamaño del dibujo según el alto y el ancho de cada casilla, para que las tres filas se vean completas */
  const medir=()=>{ const al=fm.clientHeight/3, an=fm.clientWidth/3; fm.style.setProperty('--fa', Math.max(30,Math.min(72,al-30,an-20))+'px'); };
  medir(); window.addEventListener('resize',medir);
  ft.innerHTML = lv===1 ? `<span class="muted" style="font-weight:800;padding:0 var(--s-2)">Toca un animal ${kic('sonido','1.1em')}</span>` : lv===2 ? A.map(a=>`<button data-f="${a[5]}">${a[5]==='🍃'?ilu('hojita','1.1em'):emo(a[5])}</button>`).join('') : `<button id="q">❓ Which animal says…?</button>`;
  const oidos=new Set();
  fm.querySelectorAll('[data-a]').forEach(b=>b.addEventListener('click',()=>{ const a=A[+b.dataset.a]; if (lv===1){ oidos.add(a[1]); if (oidos.size===A.length){ oidos.clear(); setTimeout(()=>win('¡Conociste a todos los animales de la granja!'),2600); } } const s=b.querySelector('span'); s.style.animation='none'; void s.offsetWidth; s.style.animation='hop .7s'; sonar(b);
    if (lv===2 && food){ if (food===a[5]){ const fb=ft.querySelector('.on'); if(fb) volar(fb,s,fb.innerHTML,{arco:-90}); win(`¡Ñam! A ${a[1]==='vaca'||a[1]==='gallina'||a[1]==='oveja'?'la':'el'} ${a[1]} le gusta ${food}`); sparks(b,6); } else tsay(`Hmm, ${a[1]==='vaca'||a[1]==='gallina'||a[1]==='oveja'?'la':'el'} ${a[1]} no come eso`); food=null; ft.querySelectorAll('[data-f]').forEach(x=>x.classList.remove('on')); return; }
    if (lv===3 && quiz){ if (a===quiz){ sonidoAnimal(a[1]); win(`Yes! The ${a[4]} says ${a[3]}!`); quiz=null; } else { sonidoAnimal(a[1],()=>speak(`No, that is the ${a[4]}`,'en-US')); } return; }
    /* primero se oye el animal de verdad y luego el animalito dice quién es */
    sonidoAnimal(a[1],()=>speak(lv===3?`The ${a[4]} says ${a[3]}`:`Soy ${a[1]==='vaca'||a[1]==='gallina'||a[1]==='oveja'?'la':'el'} ${a[1]}`, lv===3?'en-US':'es-ES')); }));
  ft.querySelectorAll('[data-f]').forEach(b=>b.addEventListener('click',()=>{ food=b.dataset.f; ft.querySelectorAll('[data-f]').forEach(x=>x.classList.toggle('on',x===b)); tsay('¿Quién come esto? Toca el animal'); }));
  const q=root.querySelector('#q'); if (q) q.addEventListener('click',()=>{ quiz=pick(A); const z=quiz; tsay(`Which animal says ${z[3]}?`,'en-US'); setTimeout(()=>{ if(quiz===z) sonidoAnimal(z[1]); },1900); });
  return ()=>{ window.removeEventListener('resize',medir); if (sonAnimal){ sonAnimal.pause(); sonAnimal=null; } };
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
  const lv=LV(), M=window.MAPA_RD; let mode='isla', vivo=true, turno=0; const esperas=[];
  const luego=(fn,ms)=>{ const t=turno; esperas.push(setTimeout(()=>{ if(vivo&&t===turno) fn(); },ms)); };
  /* República Dominicana: contornos reales de las 32 provincias (15-mapa-rd.js, MapSVG CC0), coloreadas por región */
  const REG={N:{n:'Norte (Cibao)',c:['#BFE3B4','#A9D69B','#D2EBC6','#9CCB8E']},S:{n:'Sur',c:['#F8E3A3','#F2D27F','#FBEDC2','#EBC66B']},E:{n:'Este',c:['#F7C9AE','#F1B291','#FADCCB','#EAA07C']}};
  const colP=p=>REG[p.r].c[p.t%4];
  const G=M.lugares, FN=G['Frontera norte'], FS=G['Frontera sur'], PD=G['Pico Duarte'], LE=G['Lago Enriquillo'];
  const VB_RD=[-34,-10,M.w+44,M.h+20], VB_MUNDO=[0,-6,400,(window.MAPA_MUNDO?window.MAPA_MUNDO.h:176)+34];
  /* lugar, x, y, nivel, lado de la etiqueta respecto al pin (u arriba, d abajo, l izquierda, r derecha) */
  const PL=[['Santo Domingo',...G['Santo Domingo'],1,'u'],['Santiago',...G['Santiago'],1,'l'],['Punta Cana',...G['Punta Cana'],1,'u'],['Pico Duarte',...PD,1,'r'],['Puerto Plata',...G['Puerto Plata'],2,'r'],['Samaná',...G['Samaná'],2,'u'],['Lago Enriquillo',...LE,2,'u'],['Barahona',...G['Barahona'],3,'d'],['La Romana',...G['La Romana'],3,'d'],['Haití',-14,118,3,'d']];
  const FACIL=['25','11','18','20','04','13','22','02','15','16','32','12','21','06','05'];
  /* El mundo: continentes reales (16-mapa-mundo.js, MapSVG CC0, proyección Equal Earth). La Antártida no viene en el archivo: es una franja propia. */
  const W2=window.MAPA_MUNDO, AY=W2.h+13;
  const CONT=W2.cont.map(c=>[c.n,c.d,c.c[0],c.c[1]]).concat([['Antártida',`M10 ${AY+9} Q60 ${AY-7} 112 ${AY-2} Q160 ${AY-9} 204 ${AY-3} Q252 ${AY-9} 300 ${AY-2} Q348 ${AY-7} 390 ${AY+9}Z`,200,AY+3]]);
  const CCOL={'América del Norte':'#F7C59F','América del Sur':'#B9E3C6','Europa':'#C9B8EE','África':'#F6E39A','Asia':'#F5B8D0','Oceanía':'#A3D69B','Antártida':'#FFFFFF'};
  const MAR='#BFE1F5', BAJO='#D9EEF9', COSTA='#7FA066', TXT_MAR='#35628A';
  const monte=(x,y,s=1)=>`<path d="M${x-7*s} ${y+5*s} L${x} ${y-7*s} L${x+7*s} ${y+5*s}Z" fill="#8FBF7E" stroke="#6C9A5C" stroke-width="1.6" vector-effect="non-scaling-stroke" stroke-linejoin="round"/><path d="M${x-2.6*s} ${y-2.6*s} L${x} ${y-7*s} L${x+2.6*s} ${y-2.6*s}Z" fill="#FFFFFF"/>`;
  const rosa=(x,y)=>`<g transform="translate(${x} ${y})"><circle r="13" fill="#FFFFFF" stroke="#9CC4E4" stroke-width="1.6" vector-effect="non-scaling-stroke"/><path d="M0 -11 L3 0 L0 11 L-3 0Z" fill="#8DBDE6"/><path d="M0 -11 L3 0 L-3 0Z" fill="#EE8A8A"/><text y="-15" font-size="8" text-anchor="middle" fill="${TXT_MAR}" font-weight="800" font-family="Nunito">N</text></g>`;
  const olas=(n,vb)=>Array.from({length:n},(_,i)=>{ const x=vb[0]+16+((i*97)%(vb[2]-40)), y=vb[1]+12+((i*53)%(vb[3]-24)); return `<path d="M${x} ${y} q5 -4 10 0 q5 4 10 0" fill="none" stroke="#FFFFFF" stroke-width="1.6" stroke-linecap="round" opacity=".8"/>`; }).join('');
  const texto=(t,x,y,tam,col,extra='')=>`<text x="${x}" y="${y}" font-size="${tam}" fill="${col}" font-weight="800" font-family="Nunito" text-anchor="middle" ${extra}>${t}</text>`;
  const HAITI=`M${VB_RD[0]-4} ${FN[1]-10} L${FN[0]} ${FN[1]} L${FN[0]+28} ${FN[1]+30} L${FS[0]+28} ${FS[1]-30} L${FS[0]} ${FS[1]} L${VB_RD[0]-4} ${FS[1]-13}Z`;
  function svgRD(sc, conMontes){
    const todas=M.prov.map(p=>`<path d="${p.d}"/>`).join('');
    return `<rect x="${VB_RD[0]}" y="${VB_RD[1]}" width="${VB_RD[2]}" height="${VB_RD[3]}" fill="${MAR}"/>${olas(11,VB_RD)}
      <g fill="${BAJO}" stroke="${BAJO}" stroke-width="9" stroke-linejoin="round"><path d="${HAITI}"/>${todas}</g>
      <path d="${HAITI}" fill="#ECE8DA" stroke="#BDB7A2" stroke-width="${1.6/sc}" stroke-linejoin="round"/>
      <g fill="${COSTA}" stroke="${COSTA}" stroke-width="${3.4/sc}" stroke-linejoin="round">${todas}</g>
      <g id="pv" stroke="#FFFFFF" stroke-width="${1/sc}" stroke-linejoin="round">${M.prov.map(p=>`<path data-p="${p.id}" d="${p.d}" fill="${colP(p)}"/>`).join('')}</g>
      <ellipse cx="${LE[0]}" cy="${LE[1]}" rx="13" ry="4" transform="rotate(-10 ${LE[0]} ${LE[1]})" fill="${MAR}" stroke="#8DBDE6" stroke-width="${1.6/sc}" pointer-events="none"/>
      ${conMontes?`<g pointer-events="none">${monte(PD[0]-17,PD[1]-9,.8)}${monte(PD[0]+16,PD[1]+11,.8)}${monte(PD[0]+31,PD[1]+22,.7)}${monte(PD[0],PD[1],1.1)}</g>`:''}
      <g pointer-events="none">${texto('HAITÍ',-15,72,9,'#6B6756','letter-spacing=".5"')}${texto('Océano Atlántico',262,8,10,TXT_MAR)}${texto('Mar Caribe',236,M.h-4,10,TXT_MAR)}${rosa(M.w-22,M.h-22)}</g>`;
  }
  addHTML(root, `<div class="abs" style="inset:0 0 var(--tbar-h) 0;background:#E3F0FA"></div><div id="mp" class="abs" style="inset:0 0 var(--tbar-h) 0;overflow:hidden"></div>
    <div class="tbar" style="gap:var(--s-1);padding:0 var(--s-1)">${[['isla','🏝️','Mi país'],['prov','🗺️','Provincias'],['mundo','🌎','Mundo']].map(([m,e,t],i)=>`<button data-m="${m}"${i?'':' class="on"'} style="font-size:var(--fs-sm);padding:0 6px">${e} ${t}</button>`).join('')}<button id="rs" aria-label="Empezar de nuevo">🔄</button></div>`);
  const mp=root.querySelector('#mp');
  const CHIP='background:var(--card);border:var(--bw) solid var(--line);border-radius:var(--r-sm);font-weight:800;white-space:nowrap';
  const mecer=(el,dy,ms)=>{ if(!RM) el.animate([{transform:'translateY(0) rotate(-2deg)'},{transform:`translateY(${dy}px) rotate(2deg)`}],{duration:ms,direction:'alternate',iterations:Infinity,easing:'ease-in-out'}); };
  function round(){
    turno++; const W=mp.clientWidth, H=mp.clientHeight, rd=mode!=='mundo', vb=rd?VB_RD:VB_MUNDO;
    const sc=Math.min((W-20)/vb[2],(H*.5)/vb[3]), mw=vb[2]*sc, mh=vb[3]*sc, ox=(W-mw)/2, oy=18;
    const px=(x,y)=>[ox+(x-vb[0])*sc, oy+(y-vb[1])*sc];
    const cuerpo = rd ? svgRD(sc, mode==='isla') : `<rect x="${vb[0]}" y="${vb[1]}" width="${vb[2]}" height="${vb[3]}" fill="${MAR}"/>${olas(12,vb)}<g fill="${BAJO}" stroke="${BAJO}" stroke-width="6" stroke-linejoin="round">${CONT.map(c=>`<path d="${c[1]}"/>`).join('')}</g>${CONT.map(c=>{ const col=CCOL[c[0]], bor=col==='#FFFFFF'?'#C3C8D6':shade(col,-.32); return `<path d="${c[1]}" fill="${bor}" stroke="${bor}" stroke-width="${4.2/sc}" stroke-linejoin="round"/><path d="${c[1]}" fill="${col}" stroke="${col}" stroke-width="${1.4/sc}" stroke-linejoin="round"/>`; }).join('')}${rosa(30,W2.h-34)}`;
    mp.innerHTML=`<div class="abs" style="left:${ox-4}px;top:${oy-4}px;width:${mw+8}px;height:${mh+8}px;background:var(--card);border-radius:var(--r-md);box-shadow:var(--sh-2)"></div>
      <svg id="mapa" class="abs" style="left:${ox}px;top:${oy}px;width:${mw}px;height:${mh}px;border-radius:var(--r-sm);overflow:hidden" viewBox="${vb.join(' ')}" role="img" aria-label="${rd?'Mapa de la República Dominicana':'Mapa del mundo'}">${cuerpo}</svg>
      <div id="ley" class="abs" style="left:0;right:0;top:${oy+mh+12}px;display:flex;justify-content:center;gap:var(--s-3);font-size:var(--fs-2xs);font-weight:800;color:#5A566B">${rd?Object.values(REG).map(r=>`<span style="display:inline-flex;align-items:center;gap:4px"><i style="width:12px;height:12px;border-radius:4px;background:${r.c[1]};border:1.6px solid ${shade(r.c[1],-.32)};display:inline-block"></i>${r.n}</span>`).join(''):'Los continentes del mundo'}</div>`;
    const svg=mp.querySelector('#mapa'), top0=oy+mh+40;
    if (rd){ /* ballenas jorobadas frente a Samaná y un velero en el Caribe */
      [['ballena',352,36,34,5,2600],['velero',150,M.h-26,26,-4,2200]].forEach(([n,x,y,t,dy,ms])=>{ const d=document.createElement('div'); d.className='abs'; const s=Math.max(20,t*sc), [a,b]=px(x,y);
        d.style.cssText=`left:${a-s/2}px;top:${b-s/2}px;width:${s}px;height:${s}px;pointer-events:none;z-index:1`; d.innerHTML=ilu(n,s); mp.appendChild(d); mecer(d,dy,ms); });
    }
    const pista=(gx,gy)=>{ const r=document.createElement('div'); r.className='abs'; r.style.cssText=`left:${gx-16}px;top:${gy-16}px;width:32px;height:32px;border-radius:50%;border:3px solid #E07A6A;pointer-events:none;z-index:2`; mp.appendChild(r);
      if(!RM) r.animate([{transform:'scale(.5)',opacity:1},{transform:'scale(1.25)',opacity:.2}],{duration:650,iterations:2,easing:'ease-out'}); setTimeout(()=>r.remove(),1300); };
    if (mode==='prov') return provincias(svg, sc, top0, W);
    const isla=mode==='isla'; const items = isla ? PL.filter(p=>p[3]<=lv) : CONT.slice(0, lv===1?4:7);
    if (lv<3) svg.insertAdjacentHTML('beforeend', items.map(it=>{ const [x,y]=isla?[it[1],it[2]]:[it[2],it[3]]; return `<g pointer-events="none"><circle cx="${x}" cy="${y}" r="${6/Math.max(sc,.8)}" fill="#FFFFFF" stroke="#E07A6A" stroke-width="2.4" vector-effect="non-scaling-stroke"/><circle cx="${x}" cy="${y}" r="${2.2/Math.max(sc,.8)}" fill="#E07A6A"/></g>`; }).join(''));
    let left=items.length;
    shuffle(items).forEach((it,j)=>{ const name=it[0]; const [tx,ty]=isla?[it[1],it[2]]:[it[2],it[3]];
      const el=document.createElement('div'); el.className='abs'; el.textContent=(isla?'📍 ':'')+name;
      const x0=10+(j%2)*(W/2-4), y0=top0+Math.floor(j/2)*46; el.style.cssText=`left:${x0}px;top:${y0}px;${CHIP};box-shadow:var(--sh-1);padding:var(--s-2) var(--s-3);font-size:var(--fs-xs);z-index:3;transition:left .3s,top .3s`;
      mp.appendChild(el); el.dataset.x=x0; el.dataset.y=y0;
      dragify(el, mp, {start:()=>speak(name), drop:(el,dx,dy)=>{ const [gx,gy]=px(tx,ty);
        if (Math.hypot(dx-gx,dy-gy) < (isla?30:46)*Math.max(1,sc)){ el.dataset.lock=1; left--; note(784,.2,'sine',.12);
          el.textContent=name; el.style.fontSize='11px'; el.style.padding='1px 6px'; el.style.boxShadow='none'; el.style.background='#FFF8DC'; el.style.zIndex=2;
          const w=el.offsetWidth, lado=isla?it[4]:'c';
          el.style.left=Math.max(ox+2,Math.min(ox+mw-w-2, lado==='r'?gx+8:lado==='l'?gx-8-w:gx-w/2))+'px'; el.style.top=Math.max(oy+2, lado==='c'?gy-10:lado==='d'?gy+4:lado==='u'?gy-38:gy-22)+'px';
          if (isla){ const pin=document.createElement('div'); pin.className='abs'; pin.style.cssText=`left:${gx-9}px;top:${gy-17}px;width:18px;height:18px;pointer-events:none;z-index:2`; pin.innerHTML=ilu('pin',18); mp.appendChild(pin);
            if(!RM) pin.animate([{transform:'translateY(-18px)',opacity:0},{transform:'translateY(2px)',opacity:1,offset:.7},{transform:'translateY(0)',opacity:1}],{duration:380,easing:'ease-out'}); }
          if (left===0){ confetti(); win(isla?'¡Conoces muy bien nuestro país!':'¡Ubicaste todos los continentes!'); luego(round,3000); } }
        else { el.style.left=el.dataset.x+'px'; el.style.top=el.dataset.y+'px'; pista(gx,gy); note(220,.2,'sine',.1); } }}); });
  }
  /* Provincias: tocar para conocerlas (nivel 1) o encontrarlas (niveles 2 y 3). El error siempre muestra la respuesta. */
  function provincias(svg, sc, top0, W){
    const pv=svg.querySelector('#pv'), porId=Object.fromEntries(M.prov.map(p=>[p.id,p]));
    const dn=porId['01']; svg.insertAdjacentHTML('beforeend', `<circle data-p="01" cx="${dn.c[0]}" cy="${dn.c[1]}" r="7" fill="transparent"/>`);
    const card=document.createElement('div'); card.className='abs';
    card.style.cssText=`left:var(--s-3);right:var(--s-3);top:${top0}px;background:var(--card);border:var(--bw) solid var(--line);border-radius:var(--r-md);box-shadow:var(--sh-1);padding:var(--s-3) var(--s-4);text-align:center;z-index:3`;
    mp.appendChild(card);
    const pinta=(tit,sub,pie)=>{ card.innerHTML=`<div style="font-size:var(--fs-lg);font-weight:800;color:var(--ink);line-height:1.2">${tit}</div>${sub?`<div style="font-size:var(--fs-sm);color:#5A566B;font-weight:700;margin-top:2px">${sub}</div>`:''}${pie?`<div style="font-size:var(--fs-2xs);color:#5A566B;margin-top:var(--s-2)">${pie}</div>`:''}`; };
    const ficha=p=>`<span style="display:inline-block;width:10px;height:10px;border-radius:3px;background:${REG[p.r].c[1]};border:1.6px solid ${shade(REG[p.r].c[1],-.32)};margin-right:4px"></span>Región ${REG[p.r].n} · Capital: ${p.cap}`;
    const el=id=>pv.querySelector(`[data-p="${id}"]`);
    const marca=(p,col)=>{ pv.querySelectorAll('.sel').forEach(x=>{ x.classList.remove('sel'); x.setAttribute('stroke','#FFFFFF'); x.setAttribute('stroke-width',1/sc); });
      const e=el(p.id); pv.appendChild(e); e.classList.add('sel'); e.setAttribute('stroke',col); e.setAttribute('stroke-width',2.4/sc);
      if(!RM){ e.style.transformBox='fill-box'; e.style.transformOrigin='center'; e.animate([{transform:'scale(1)'},{transform:'scale(1.07)'},{transform:'scale(1)'}],{duration:420,easing:'ease-out'}); } };
    const vistas=new Set(); let meta=null, aciertos=0, ocupado=false; const RONDA=5;
    const cola=shuffle((lv===2?M.prov.filter(p=>FACIL.includes(p.id)):M.prov).slice());
    function pregunta(){ meta=cola.pop(); if(!meta) return; ocupado=false; pinta(`¿Dónde está ${meta.n}?`, 'Toca la provincia en el mapa', `Aciertos: ${aciertos} de ${RONDA}`); speak(`¿Dónde está ${meta.n}?`); }
    if (lv===1) pinta('Toca una provincia','Así conoces su nombre y su capital','Has visitado 0 de 32'); else pregunta();
    svg.addEventListener('click',e=>{ const t=e.target.closest('[data-p]'); if(!t||ocupado) return; const p=porId[t.dataset.p];
      if (lv===1){ marca(p,'#3A3550'); vistas.add(p.id); el(p.id).setAttribute('fill',shade(colP(p),-.12)); pinta(p.n, ficha(p), `Has visitado ${vistas.size} de 32`); speak(`${p.n}. Capital: ${p.cap}`); note(660,.15,'sine',.1);
        if (vistas.size===32){ confetti(); win('¡Visitaste las 32 provincias!'); } return; }
      ocupado=true;
      if (p===meta){ aciertos++; marca(p,'#3E8E5A'); el(p.id).setAttribute('fill',shade(colP(p),-.14)); note(784,.2,'sine',.12); pinta(`¡Sí! ${p.n}`, ficha(p), `Aciertos: ${aciertos} de ${RONDA}`); speak(`¡Sí! ${p.n}`);
        if (aciertos>=RONDA){ confetti(); win('¡Conoces las provincias de tu país!'); luego(round,3000); } else luego(pregunta,1700); }
      else { marca(meta,'#3A3550'); note(220,.2,'sine',.1); pinta(`${meta.n} está aquí`, ficha(meta), `Tocaste ${p.n}`); speak(`Esa es ${p.n}. ${meta.n} está aquí.`); luego(pregunta,3200); } });
  }
  const SALUDO={isla:'Arrastra cada lugar al mapa de nuestro país', prov:lv===1?'Toca cada provincia para conocerla':'Busca cada provincia en el mapa', mundo:'Arrastra cada continente a su lugar'};
  root.querySelectorAll('[data-m]').forEach(b=>b.addEventListener('click',()=>{ mode=b.dataset.m; root.querySelectorAll('[data-m]').forEach(x=>x.classList.toggle('on',x===b)); round(); if(mode!=='prov'||lv===1) tsay(SALUDO[mode]); }));
  root.querySelector('#rs').addEventListener('click',round);
  luego(round,40);
  return ()=>{ vivo=false; esperas.forEach(clearTimeout); };
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
    <div id="inf" class="abs" style="left:12px;right:12px;bottom:calc(var(--tbar-h) + 14px);min-height:48px;background:var(--card);border:var(--bw) solid var(--line);border-radius:var(--r-md);padding:var(--s-2) var(--s-3);font-weight:700;text-align:center"></div>
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
  const lb=root.querySelector('#lb'); sceneParallax(root); scenePet(root,{at:'right:4px;bottom:calc(var(--tbar-h) + 4px)',size:54,prop:ilu('bata','100%'),cls:'pet-lab'});
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
      items.forEach((it,k)=>{ if (it.stuck){ it.el.style.left=(mx-20+((k%3)-1)*22)+'px'; it.el.style.top=(my+2+Math.floor(k/3)%2*12)+'px'; return; }
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
  /* Las 7 piezas en su posición dentro del cuadrado de 4×4. Las dos primeras (triángulos grandes) forman una mitad
     del cuadrado y las otras cinco la otra mitad; moviendo una mitad respecto a la otra salen otras figuras, y
     girando o volteando todo cambia el lugar de cada pieza. Así el reto no es siempre el mismo. */
  const P=[['#F4A6A6',[[0,0],[4,0],[2,2]]],['#A9D3F0',[[0,0],[2,2],[0,4]]],['#F6E39A',[[2,4],[4,4],[4,2]]],['#B9E3C6',[[4,0],[4,2],[3,1]]],['#C9B8EE',[[2,2],[3,1],[4,2],[3,3]]],['#F7C59F',[[2,2],[3,3],[1,3]]],['#F5B8D0',[[0,4],[1,3],[3,3],[2,4]]]];
  const FIG=[['el cuadrado',([x,y])=>[x,y]],['el triángulo',([x,y])=>[x-4,4-y]],['el romboide',([x,y])=>[x,y-4]]];   /* cómo se mueve la segunda mitad */
  const SIM=[([x,y])=>[x,y],([x,y])=>[-x,y],([x,y])=>[x,-y],([x,y])=>[-x,-y],([x,y])=>[y,x],([x,y])=>[-y,x],([x,y])=>[y,-x],([x,y])=>[-y,-x]];
  addHTML(root, `<div id="tg2" class="abs" style="inset:0 0 var(--tbar-h) 0;background:var(--paper)"></div><div class="tbar"><button id="rs">🔄 Otra figura</button><span class="muted" style="font-weight:800;padding:0 var(--s-2);white-space:nowrap" id="hint"></span></div>`);
  const ar=root.querySelector('#tg2'); let ultima='', vivo=true;
  function round(){
    if (!vivo) return;
    const lv=LV(); ar.innerHTML=''; const W=ar.clientWidth, H=ar.clientHeight;
    /* figura y orientación al azar, distintas de la anterior */
    let fi, si, clave; do { fi=rnd(0,FIG.length-1); si=rnd(0,SIM.length-1); clave=fi+'-'+si; } while (clave===ultima); ultima=clave;
    const [nombre,mitad]=FIG[fi], giro=SIM[si];
    let piezas=P.map((p,i)=>[p[0], p[1].map(q=>giro(i<2?q:mitad(q)))]);
    const todos=piezas.flatMap(p=>p[1]), x0=Math.min(...todos.map(q=>q[0])), y0=Math.min(...todos.map(q=>q[1]));
    piezas=piezas.map(p=>[p[0],p[1].map(q=>[q[0]-x0,q[1]-y0])]);
    const FW=Math.max(...piezas.flatMap(p=>p[1].map(q=>q[0]))), FH=Math.max(...piezas.flatMap(p=>p[1].map(q=>q[1])));
    const U=Math.min((W-40)/FW, (H*.44)/FH, 60), ox=(W-U*FW)/2, oy=20;
    root.querySelector('#hint').textContent = (lv===3?'Toca una pieza para girarla. ':'')+'Arma '+nombre;
    const pts=p=>p[1].map(q=>q.join(',')).join(' ');
    ar.insertAdjacentHTML('beforeend',`<svg class="abs" role="img" aria-label="Figura para armar: ${nombre}" style="left:${ox}px;top:${oy}px;width:${U*FW}px;height:${U*FH}px;overflow:visible" viewBox="0 0 ${FW} ${FH}"><g fill="#C9B79D" stroke="#C9B79D" stroke-width=".14" stroke-linejoin="round">${piezas.map(p=>`<polygon points="${pts(p)}"/>`).join('')}</g><g fill="#EDE5D8" stroke="#EDE5D8" stroke-width=".03" stroke-linejoin="round">${piezas.map(p=>`<polygon points="${pts(p)}"/>`).join('')}</g>${lv===1?piezas.map(p=>`<polygon points="${pts(p)}" fill="none" stroke="#C9B79D" stroke-width=".04" stroke-dasharray=".12 .1"/>`).join(''):''}</svg>`);
    let left=piezas.length; const bajo=oy+U*FH+26;
    piezas.forEach((p,i)=>{ const xs=p[1].map(q=>q[0]), ys=p[1].map(q=>q[1]); const minx=Math.min(...xs), miny=Math.min(...ys), w=Math.max(...xs)-minx, h=Math.max(...ys)-miny;
      const el=document.createElement('div'); el.className='abs'; let rot = lv===3 ? pick([90,180,270]) : 0;
      el.innerHTML=`<svg width="${w*U}" height="${h*U}" viewBox="${minx} ${miny} ${w} ${h}" style="display:block;overflow:visible"><polygon points="${pts(p)}" fill="${p[0]}" stroke="#fff" stroke-width=".05" stroke-linejoin="round"/></svg>`;
      const tx=ox+minx*U, ty=oy+miny*U; const sx=rnd(8,Math.max(10,W-w*U-8)), sy=rnd(Math.min(bajo,H-h*U-10), Math.max(bajo+10,H-h*U-10));
      el.style.cssText=`left:${sx}px;top:${sy}px;width:${w*U}px;height:${h*U}px;z-index:3;transition:transform .25s,left .3s,top .3s;transform:rotate(${rot}deg);animation:popin .4s ${i*.05}s both`;
      ar.appendChild(el); let downAt=null;
      el.addEventListener('pointerdown',e=>{ downAt=[e.clientX,e.clientY]; },true);
      dragify(el, ar, {drop:(el,px,py)=>{ const moved = downAt && Math.hypot(downAt[0]-(ar.getBoundingClientRect().left+px), downAt[1]-(ar.getBoundingClientRect().top+py))<6;
        if (moved && lv===3){ rot=(rot+90)%360; el.style.transform=`rotate(${rot}deg)`; popS(); return; }
        const cx=parseFloat(el.style.left), cy=parseFloat(el.style.top);
        if (rot===0 && Math.hypot(cx-tx,cy-ty)<U*.5){ el.style.left=tx+'px'; el.style.top=ty+'px'; el.dataset.lock=1; el.style.zIndex=2; note(784,.2,'sine',.12); left--;
          if (left===0){ confetti(); win(`¡Armaste ${nombre}!`); setTimeout(round,3000); } }
        else if (rot!==0 && Math.hypot(cx-tx,cy-ty)<U*.5){ tsay('Casi. Gira la pieza tocándola'); } }});
    });
  }
  root.querySelector('#rs').addEventListener('click',round);
  setTimeout(round,40);
  return ()=>{ vivo=false; };
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
