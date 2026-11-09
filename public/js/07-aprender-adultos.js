/* Semillita · Cuentos, lectura, cálculo mental, inglés, modo aula, reporte e inicio */
/* =========================================================
   CUENTOS · LECTURA EN VOZ ALTA · CÁLCULO MENTAL · MUNDO DE INGLÉS
   MODO AULA · REPORTE · LÍMITE DE TIEMPO
   ========================================================= */
window.VIEWS = window.VIEWS || {};
VIEWS.friend = vFriend;
const today = () => new Date().toISOString().slice(0,10);
const lvlP = () => lvlOf(prof());
function backTop(title, to='home'){ return `<div class="top"><button class="icon-btn" id="back">←</button><h2>${title}</h2><button class="chip vt" style="padding:var(--s-2) var(--s-2);font-size:var(--fs-sm)"></button>${mascot(prof().avatar,46)}</div>`; }

/* ---------- Cuentos interactivos ---------- */
const STORIES=[
 {t:'La semilla mágica', ic:'🌱', v:'Responsabilidad y compartir', q:['¿Qué necesita una semilla para crecer?','Tierra, agua y sol',['Una caja oscura','Mucho ruido']], n:{
  0:['🌳🏡☀️','Un día, {N} y {K} encontraron una semilla brillante en el patio. ¿Qué hacemos con ella?',[['¡Vamos a sembrarla!',1],['Guardarla en una caja',2]]],
  1:['🌱💧','La sembraron y la regaron. Al otro día salió una plantita que dijo: «¡Gracias! Necesito agua todos los días». ¿Qué hacemos?',[['Regarla cada día',3],['Olvidarnos de ella',4]]],
  2:['📦🌑','La semilla estaba triste en la caja oscura. «Necesito tierra, agua y sol», susurró.',[['¡Sembrarla ya!',1]]],
  3:['🌻🦋🐝','Cada día la regaron. La plantita creció y se convirtió en un girasol gigante. ¡Llegaron mariposas y abejas!',[['Compartir semillas con los vecinos',5],['Quedarnos con todas',6]]],
  4:['🥀','Sin agua, la plantita se puso mustia. {N} dijo: «Las plantas dependen de nosotros». ¿Lo intentamos otra vez?',[['Sí, regarla ahora',3]]],
  5:['🌻🌻🌻🏘️','Toda la calle se llenó de girasoles y los vecinos sonreían. ¡Compartir hizo el barrio más bonito!',null],
  6:['🌻💭','El girasol era hermoso, pero {N} pensó: «Sería más lindo si otros también tuvieran uno». Y al final, compartieron.',null]}},
 {t:'El cumpleaños de Lalo', ic:'🐢', v:'Empatía e inclusión', q:['¿Por qué estaba triste Lalo?','Pensaba que nadie quería jugar con él',['Se perdió su bizcocho','Llovía mucho']], n:{
  0:['🎂🐢','Lalo, la tortuga, cumplía años, pero estaba triste: «Soy tan lento que nadie quiere jugar conmigo».',[['Invitarlo a jugar',1],['Seguir jugando sin él',2]]],
  1:['🐢🤝','{K} y {N} lo invitaron: «¿A qué te gusta jugar a ti?».',[['A las escondidas',3],['A una carrera',4]]],
  2:['🐢💧','Lalo se quedó solo y una lágrima rodó por su cara. {N} sintió algo en el pecho. ¿Qué hacemos?',[['Ir con él',1]]],
  3:['🐢🌿🔍','¡Lalo era el mejor escondiéndose dentro de su caparazón! Nadie lo encontraba y todos se reían.',[['Celebrar su cumpleaños',5]]],
  4:['🏃🐢','En la carrera, Lalo llegó último. Entonces {K} dijo: «¡Hagamos una carrera por equipos!», y corrieron juntos.',[['Celebrar su cumpleaños',5]]],
  5:['🎉🎂🎈','Hicieron una fiesta con bizcocho y globos. Lalo dijo: «¡Es mi mejor cumpleaños!». Todos somos buenos en algo diferente.',null]}},
 {t:'La playa limpia', ic:'🏖️', v:'Cuidado del medio ambiente', q:['¿Por qué las fundas plásticas dañan a las tortugas?','Las confunden con medusas',['Son muy pesadas','Les gusta su color']], n:{
  0:['🏖️🌊','{K} y {N} fueron a la playa. Al llegar, vieron botellas y fundas plásticas en la arena.',[['Recoger la basura',1],['Jugar sin hacer caso',2]]],
  1:['🧤🗑️','Se pusieron guantes y llenaron una funda de basura. Una tortuga marina sacó la cabeza del agua.',[['Saludarla',3]]],
  2:['🐢😟','Mientras jugaban, vieron una tortuga marina enredada en una funda plástica. ¡Necesitaba ayuda!',[['Pedir ayuda a un adulto',4],['Ignorarla',5]]],
  3:['🐢💙','«¡Gracias!», parecía decir la tortuga. «Las fundas en el mar parecen medusas y nos hacen daño».',[['Contarles a los amigos',6]]],
  4:['🛟🐢','Un salvavidas liberó a la tortuga con cuidado. Luego {K} y {N} recogieron la basura para que no le pase a otra.',[['Contarles a los amigos',6]]],
  5:['🤔','{N} dijo: «Si no ayudamos, ¿quién lo hará?». Tenía razón.',[['Pedir ayuda a un adulto',4]]],
  6:['🏖️✨👫','El sábado siguiente, muchos niños vinieron a limpiar la playa. ¡Cuidar el mar es cuidar nuestra casa!',null]}}
];
VIEWS.story=function(){
  const p=prof(); const fill=s=>s.replace(/\{N\}/g,mname(p.avatar)).replace(/\{K\}/g,p.name);
  if (view.s===undefined){
    app.innerHTML=backTop('📚 Cuentos')+speaker('Elige un cuento. ¡Tú decides qué pasa!',58)+`<div style="display:flex;flex-direction:column;gap:var(--s-3)">${STORIES.map((s,i)=>`<button class="area bg-${['mint','rose','sky'][i]}" data-s="${i}" style="min-height:0;flex-direction:row;align-items:center;gap:var(--s-4)"><span class="ic">${s.ic}</span><span><b>${s.t}</b><br><small>${s.v}</small></span></button>`).join('')}</div>`;
    bind('#back',()=>go({name:'home'})); bind('[data-s]',el=>go({name:'story',s:+el.dataset.s,n:0})); return; }
  const S0=STORIES[view.s], nd=S0.n[view.n];
  if (view.n==='q'){
    const opts=shuffle([S0.q[1],...S0.q[2]]);
    app.innerHTML=backTop(S0.t)+speaker(`Pregunta: ${S0.q[0]}`,58)+`<div class="opts one">${opts.map(o=>`<button class="opt" data-o="${esc(o)}">${o}</button>`).join('')}</div>`;
    bind('#back',()=>go({name:'story'})); speak(S0.q[0]);
    bind('[data-o]',el=>{ const ok=el.dataset.o===S0.q[1]; el.classList.add(ok?'ok':'no'); react(ok?'happy':'sad');
      if(ok){ confetti(); addXP(3); giveSticker(1); speak('¡Muy bien! Entendiste el cuento.'); setTimeout(()=>go({name:'story'}),2800); } else speak('Casi. Piensa en el cuento otra vez.'); });
    return; }
  const end=!nd[2];
  app.innerHTML=backTop(S0.t)+`<div class="story-scene">${nd[0]}</div><div style="display:flex;justify-content:center;margin:-4px 0 var(--s-2)">${mascot(p.avatar,72)}</div>
    <div class="visual text" style="font-size:var(--fs-lg);animation:popin .4s both">${fill(nd[1])}${end?`<p style="margin:var(--s-3) 0 0;font-weight:800">✨ FIN · ${S0.v}</p>`:''}</div>
    <div class="opts one">${end?`<button class="opt" id="q">❓ Responder una pregunta</button>`:nd[2].map(([t,nx])=>`<button class="opt" data-n="${nx}">${fill(t)}</button>`).join('')}</div>`;
  bind('#back',()=>go({name:'story'}));
  speak(fill(nd[1])+(end?'. Fin.':''));
  bind('[data-n]',el=>{ popS(); go({name:'story',s:view.s,n:+el.dataset.n}); });
  bind('#q',()=>go({name:'story',s:view.s,n:'q'}));
};

/* ---------- Lectura en voz alta ---------- */
VIEWS.fluency=function(){
  const p=prof(), lv=lvlP(); const gs=lv===1?[1,2]:lv===2?[3,4]:[5,6]; const texts=gs.flatMap(g=>LECT[g].map(x=>x.t));
  const st=view.st||'pick';
  if (st==='pick'){
    const hist=(p.fluency||[]).slice(-5).reverse();
    app.innerHTML=backTop('📖 Lectura en voz alta')+speaker('Lee el texto en voz alta. Un adulto puede marcar las palabras que te cuesten.',56)+
      `<div style="display:flex;flex-direction:column;gap:var(--s-3)">${texts.map((t,i)=>`<button class="opt" data-i="${i}" style="text-align:left;font-size:var(--fs-sm)">📄 ${t.slice(0,70)}…</button>`).join('')}</div>`+
      (hist.length?`<h3 style="margin:var(--s-6) 0 var(--s-2);font-size:var(--fs-md)">Mis lecturas</h3><table><tr><th>Fecha</th><th>Palabras/min</th><th>Correctas/min</th></tr>${hist.map(h=>`<tr><td>${h.d}</td><td>${h.wpm}</td><td>${h.wcpm}</td></tr>`).join('')}</table>`:'');
    bind('#back',()=>go({name:'home'})); bind('[data-i]',el=>go({name:'fluency',st:'read',i:+el.dataset.i})); return; }
  const t=texts[view.i], words=t.split(/\s+/);
  app.innerHTML=backTop('📖 Lectura en voz alta')+`<div id="tm" style="text-align:center;font-size:var(--fs-4xl);font-weight:800;margin-bottom:var(--s-2)">0:00</div>
    <div class="visual text" id="tx" style="font-size:${lv===1?24:20}px;line-height:1.7">${words.map((w,i)=>`<span class="word" data-w="${i}">${w}</span>`).join(' ')}</div>
    <p class="muted" id="hl" style="font-weight:700;text-align:center">Toca ▶️ y empieza a leer en voz alta</p>
    <button class="btn full" id="st">▶️ Empezar</button>`;
  bind('#back',()=>go({name:'fluency'}));
  let t0=null, iv=null, secs=0, done=false;
  const tm=document.getElementById('tm');
  app.querySelectorAll('.word').forEach(w=>w.addEventListener('click',()=>{ if(t0) w.classList.toggle('err'); }));
  document.getElementById('st').addEventListener('click',e=>{
    const b=e.currentTarget;
    if (!t0){ t0=Date.now(); b.textContent='⏹️ Terminé'; document.getElementById('hl').textContent='Adulto: toca las palabras que lea con error'; iv=setInterval(()=>{ secs=Math.floor((Date.now()-t0)/1000); tm.textContent=`${Math.floor(secs/60)}:${String(secs%60).padStart(2,'0')}`; },250); react('happy'); return; }
    if (done){ go({name:'fluency'}); return; }
    clearInterval(iv); done=true; const sec=Math.max(1,(Date.now()-t0)/1000), errs=app.querySelectorAll('.word.err').length;
    const wpm=Math.round(words.length/sec*60), wcpm=Math.round((words.length-errs)/sec*60);
    p.fluency=p.fluency||[]; p.fluency.push({d:today(),wpm,wcpm,words:words.length,errs}); save(); addXP(3); giveSticker(.7);
    document.getElementById('hl').innerHTML=`<b style="font-size:var(--fs-lg);color:var(--ink)">${wpm} palabras por minuto</b><br>${words.length} palabras · ${errs} con error · ${wcpm} correctas por minuto`;
    b.textContent='Volver'; confetti(); speak(`¡Muy bien! Leíste ${wpm} palabras por minuto`);
  });
};

/* ---------- Cálculo mental diario ---------- */
VIEWS.math=function(){
  const p=prof(), lv=lvlP(); p.math=p.math||{streak:0,best:0,last:null};
  const gen=()=>{ let a,b,op,r;
    if (lv===1){ if(Math.random()<.6){a=rnd(0,9);b=rnd(0,10-a);op='+';r=a+b;} else {a=rnd(1,10);b=rnd(0,a);op='−';r=a-b;} }
    else if (lv===2){ const k=rnd(1,3); if(k===1){a=rnd(10,89);b=rnd(1,9);op='+';r=a+b;} else if(k===2){a=rnd(11,99);b=rnd(1,9);op='−';r=a-b;} else {a=rnd(2,5);b=rnd(1,10);op='×';r=a*b;} }
    else { const k=rnd(1,4); if(k===1){a=rnd(2,12);b=rnd(2,12);op='×';r=a*b;} else if(k===2){b=rnd(2,12);r=rnd(2,12);a=b*r;op='÷';} else if(k===3){a=rnd(15,85);b=rnd(11,99-a);op='+';r=a+b;} else {a=rnd(40,99);b=rnd(11,a-1);op='−';r=a-b;} }
    return {txt:`${a} ${op} ${b}`, r}; };
  if (!view.go){
    app.innerHTML=backTop('⚡ Cálculo mental')+speaker('¿Cuántas operaciones puedes resolver en 1 minuto?',58)+
      `<div class="card" style="text-align:center"><div style="font-size:var(--fs-6xl)">🔥 ${p.math.streak}</div><b>${p.math.streak===1?'día seguido':'días seguidos'}</b><p class="muted" style="font-weight:700;margin:var(--s-2) 0 0">Mejor puntaje: ${p.math.best}${p.math.last===today()?' · Ya jugaste hoy ✅':''}</p></div>
      <button class="btn full" id="go" style="margin-top:var(--s-4)">▶️ ¡Empezar!</button>`;
    bind('#back',()=>go({name:'home'})); bind('#go',()=>go({name:'math',go:1})); return; }
  let q=gen(), inp='', score=0, left=60, over=false;
  app.innerHTML=backTop('⚡ Cálculo mental')+`<div class="row"><b id="sc" style="font-size:var(--fs-lg)">⭐ 0</b><div class="sp"></div><b id="tl" style="font-size:var(--fs-lg)">⏱️ 60</b></div>
    <div class="bar" style="height:10px;background:var(--line);margin:var(--s-2) 0 var(--s-4)"><i id="tb3" class="fg-peach" style="width:100%;transition:width 1s linear"></i></div>
    <div class="visual"><div class="expr" id="ex">${q.txt}</div><div id="an" style="font-size:var(--fs-5xl);font-weight:800;min-height:48px;color:var(--peachD)">&nbsp;</div></div>
    <div class="keypad">${[1,2,3,4,5,6,7,8,9,'⌫',0,'✓'].map(k=>`<button data-k="${k}">${k}</button>`).join('')}</div>`;
  bind('#back',()=>{ clearInterval(iv); go({name:'math'}); });
  const an=document.getElementById('an'), ex=document.getElementById('ex');
  const next=()=>{ q=gen(); inp=''; ex.textContent=q.txt; an.innerHTML='&nbsp;'; ex.style.animation='none'; void ex.offsetWidth; ex.style.animation='popin .3s both'; };
  const submit=()=>{ if (over||!inp) return; if (+inp===q.r){ score++; document.getElementById('sc').textContent='⭐ '+score; note(880,.1,'sine',.1); react('happy'); next(); } else { note(220,.15,'sine',.1); an.style.color='var(--noD)'; setTimeout(()=>{ an.style.color=''; inp=''; an.innerHTML='&nbsp;'; },350); } };
  bind('[data-k]',el=>{ if(over) return; const k=el.dataset.k; if(k==='⌫') inp=inp.slice(0,-1); else if(k==='✓') return submit(); else if(inp.length<4) inp+=k; an.textContent=inp||' '; if (inp && +inp===q.r) setTimeout(submit,150); });
  const iv=setInterval(()=>{ left--; const tl=document.getElementById('tl'); if(!tl){ clearInterval(iv); return; } tl.textContent='⏱️ '+left; document.getElementById('tb3').style.width=(left/60*100)+'%';
    if (left<=0){ clearInterval(iv); over=true; const m=p.math; const y=new Date(Date.now()-864e5).toISOString().slice(0,10);
      if (m.last!==today()) m.streak = m.last===y ? m.streak+1 : 1; m.last=today(); const rec=score>m.best; m.best=Math.max(m.best,score); save(); addXP(Math.min(6,Math.ceil(score/3))); if(score>=5) giveSticker(1);
      app.querySelector('.keypad').outerHTML=`<div class="card" style="text-align:center"><h2>${score} ${score===1?'acierto':'aciertos'}</h2><p class="muted" style="font-weight:700">${rec?'¡Nuevo récord! 🏆':'Mejor puntaje: '+m.best} · 🔥 ${m.streak} ${m.streak===1?'día':'días'}</p><button class="btn full" id="ag">Volver</button></div>`;
      confetti(); speak(`¡Tiempo! Resolviste ${score}. ${rec?'¡Es tu nuevo récord!':''}`); bind('#ag',()=>go({name:'math'})); } },1000);
};

/* ---------- Mundo de inglés ---------- */
const ENG_T=[['Colors & Animals','🎨'],['My Body & School','✏️'],['Food & Clothes','🍎'],['Places','🏠'],['Jobs & Weather','🧑‍⚕️'],['Actions','🏃']];
const DIALOG={1:[["Hello! What's your name?",["My name is {K}.","I am blue.","A dog."]],["What color is the apple? 🍎",["It is red.","It is a cat.","Good morning."]],["Do you like dogs? 🐶",["Yes, I do!","It is green.","Goodbye."]],["Goodbye, {K}!",["Bye! See you!","I am a duck.","Red."]]],
 2:[["Good morning! How are you?",["I'm fine, thank you.","It is a pencil.","Two eyes."]],["How many eyes do you have?",["I have two eyes.","I have a book.","I am a nose."]],["What is this? ✏️",["It is a pencil.","It is a nose.","Yes, I do."]],["Open your book, please.",["OK, teacher!","It is yellow.","I like rice."]]],
 3:[["Are you hungry?",["Yes, I am!","It is a shirt.","Blue socks."]],["What do you like to eat?",["I like rice and beans.","I like shoes.","I am a cap."]],["Do you like milk? 🥛",["No, I don't.","It is a dress.","Hello!"]],["What are you wearing?",["I am wearing a shirt.","I am eating bread.","Five apples."]]],
 4:[["Where do you live?",["I live in a house.","I live in a bus.","It is sunny."]],["Where do you go to learn?",["I go to school.","I go to bed.","I eat cheese."]],["How do you go to school?",["By bus.","By banana.","By cloud."]],["Is there a beach near your house?",["Yes, there is.","It is a door.","I am a tree."]]],
 5:[["What's the weather like today?",["It is sunny.","It is a doctor.","I like milk."]],["What do you want to be?",["I want to be a doctor.","I want to be rainy.","I want a pencil."]],["Who helps sick people?",["A doctor.","A farmer.","A cloud."]],["Is it raining?",["No, it isn't.","Yes, I am a cook.","It is a car."]]],
 6:[["Can you swim?",["Yes, I can.","I am a pool.","It is cloudy."]],["What do you like to do?",["I like to dance.","I like to apple.","I am a book."]],["What did you do yesterday?",["I played soccer.","I play tomorrow.","It is my eye."]],["Let's sing together!",["Yes, let's sing!","No, it's a cat.","Twelve."]]]};
function chantLine(t,i,w){ if(t===1) return i<6?`It is ${w}!`:`I see a ${w}!`; if(t===2) return `This is my ${w}!`; if(t===3) return i<7?`I like ${w}!`:`Look at my ${w}!`; if(t===4) return `Look at the ${w}!`; if(t===5) return i<6?`I am a ${w}!`:`It is ${w}!`; return `I can ${w}!`; }
VIEWS.eng=function(){
  const p=prof();
  if (!view.t){
    app.innerHTML=backTop('🇺🇸 Mundo de inglés')+speaker("Let's learn English! Elige un mundo.",58)+`<div class="areas">${ENG_T.map(([n,ic],i)=>`<button class="area bg-${['lav','rose','peach','sky','mint','butter'][i]}" data-t="${i+1}"><span class="ic">${ic}</span><b>${n}</b><small>${VOCAB[i+1].slice(0,3).map(x=>x[1]).join(' ')}</small></button>`).join('')}</div>`;
    bind('#back',()=>go({name:'home'})); bind('[data-t]',el=>go({name:'eng',t:+el.dataset.t,st:'learn'})); return; }
  const t=view.t, V=VOCAB[t], st=view.st; let timers=[];
  const tabs=`<div class="tabs">${[['learn','📇 Learn'],['chant','🎵 Chant'],['talk','💬 Talk'],['play','🎮 Play']].map(([k,n])=>`<button class="chip ${k===st?'on':''}" data-st="${k}">${n}</button>`).join('')}</div>`;
  let body='';
  if (st==='learn') body=`<p class="muted" style="font-weight:700">Toca cada tarjeta para escucharla</p><div class="vocab">${V.map(([w,e])=>`<button data-w="${w}"><span>${e}</span>${w}</button>`).join('')}</div>`;
  if (st==='chant') body=`<p class="muted" style="font-weight:700">Escucha el ritmo y repite cada línea en voz alta 🎶</p><button class="btn full" id="pl">▶️ Play chant</button><div class="vocab" style="margin-top:var(--s-4)">${V.map(([w,e],i)=>`<button data-c="${i}" style="transition:transform .2s,background .2s"><span>${e}</span><small>${chantLine(t,i,w)}</small></button>`).join('')}</div>`;
  if (st==='talk'){ const k=view.k||0, D=DIALOG[t]; if (k>=D.length) body=`<div class="card" style="text-align:center"><h2>Great job! 🎉</h2><p class="muted" style="font-weight:700">Terminaste la conversación</p><button class="btn full" data-st="talk" id="again">Again</button></div>`;
    else { const [qq,ans]=D[k]; const fillK=s=>s.replace(/\{K\}/g,p.name); body=speaker(fillK(qq),64)+`<div class="opts one">${shuffle(ans.map((a,i)=>[a,i])).map(([a,i])=>`<button class="opt" data-a="${i}">${fillK(a)}</button>`).join('')}</div>`; } }
  if (st==='play') body=`<div class="card" style="text-align:center"><p style="font-weight:700">Juega Listen & Choose y Memory con las palabras de este mundo</p><button class="btn full" id="g1">🎧 Listen & Choose</button><button class="btn soft full" id="g2" style="margin-top:var(--s-3)">🃏 Memory</button></div>`;
  app.innerHTML=backTop(`${ENG_T[t-1][1]} ${ENG_T[t-1][0]}`)+tabs+body;
  bind('#back',()=>{ timers.forEach(clearTimeout); go({name:'eng'}); });
  bind('[data-st]',el=>{ timers.forEach(clearTimeout); go({name:'eng',t,st:el.dataset.st,k:0}); });
  bind('[data-w]',el=>{ speak(el.dataset.w,'en-US'); el.style.transform='scale(1.08)'; setTimeout(()=>el.style.transform='',200); });
  bind('#pl',()=>{ timers.forEach(clearTimeout); timers=[]; const btns=[...app.querySelectorAll('[data-c]')];
    V.forEach(([w],i)=>{ const at=i*2600; [0,650,1300,1950].forEach(d=>timers.push(setTimeout(()=>note(110,.12,'sine',.25),at+d)));
      timers.push(setTimeout(()=>{ btns.forEach(b=>b.style.background=''); const b=btns[i]; if(!b) return; b.style.background='var(--butter)'; b.style.transform='scale(1.06)'; setTimeout(()=>b.style.transform='',300); speak(`${w}! ${w}! ${chantLine(t,i,w)}`,'en-US'); dance(); },at)); });
    timers.push(setTimeout(()=>{ btns.forEach(b=>b.style.background=''); speak('Great job!','en-US'); },V.length*2600)); });
  if (st==='talk'){ const k=view.k||0, D=DIALOG[t]; if (k<D.length){ setTimeout(()=>speak(D[k][0].replace(/\{K\}/g,p.name).replace(/[🍎🐶✏️🥛]/gu,''),'en-US'),300);
    bind('[data-a]',el=>{ if (el.dataset.a==='0'){ el.classList.add('ok'); react('happy'); note(880,.15,'sine',.1); speak(el.textContent,'en-US'); if(k===D.length-1){ addXP(3); giveSticker(1); confetti(); } setTimeout(()=>go({name:'eng',t,st:'talk',k:k+1}),1600); } else { el.classList.add('no'); react('sad'); speak('Try again!','en-US'); } }); } }
  bind('#g1',()=>startGame('listen',t,2,'ing')); bind('#g2',()=>startGame('memoria',t,2,'ing'));
};

/* ---------- Modo aula ---------- */
VIEWS.class=function(){
  const c=view.c;
  if (!c){
    let g=view.g||3, n=view.n||2; const choiceGames=GAMES.filter(G=>g>=G.grades[0]&&g<=G.grades[1]).filter(G=>{ try{ const d=G.gen(g,2); return Array.isArray(d)&&d[0]&&d[0].type==='choice'; }catch(e){ return false; } });
    app.innerHTML=`<div class="top"><button class="icon-btn" id="back">←</button><h2>🏫 Modo aula</h2></div><p class="muted" style="font-weight:700">Proyecta la pantalla. Los equipos responden por turnos y tú tocas la respuesta que dicen.</p>
      <label class="lb">Grado</label><div class="grades">${GRADES.map((x,i)=>`<button class="chip ${i+1===g?'on':''}" data-g="${i+1}">${x}</button>`).join('')}</div>
      <label class="lb">Equipos</label><div class="grades">${[2,3,4].map(k=>`<button class="chip ${k===n?'on':''}" data-n="${k}">${k} equipos</button>`).join('')}</div>
      <label class="lb">Juego</label><div style="display:flex;flex-direction:column;gap:var(--s-2)">${choiceGames.map(G=>`<button class="opt" data-gm="${G.id}" style="text-align:left">${G.icon} ${G.name} <small class="muted">· ${AREAS.find(a=>a.id===G.area).name}</small></button>`).join('')}</div>`;
    bind('#back',()=>go({name:'adults'})); bind('[data-g]',el=>go({name:'class',g:+el.dataset.g,n})); bind('[data-n]',el=>go({name:'class',g,n:+el.dataset.n}));
    bind('[data-gm]',el=>{ const G=GM[el.dataset.gm]; let qs=[]; while(qs.length<10) qs=qs.concat(G.gen(g,2)); const TEAMS=[['🦁','Leones'],['🐬','Delfines'],['🦜','Cotorras'],['🐢','Tortugas']].slice(0,n);
      go({name:'class',c:{G:G.id,g,qs:qs.slice(0,10),i:0,teams:TEAMS.map(t=>({e:t[0],n:t[1],s:0})),turn:0}}); });
    return; }
  if (c.i>=c.qs.length){ const sorted=c.teams.slice().sort((a,b)=>b.s-a.s);
    app.innerHTML=`<div class="result"><h1 style="font-size:var(--fs-4xl)">🏆 ¡Ganan los ${sorted[0].n}!</h1><div style="font-size:90px;margin:var(--s-4) 0">${sorted[0].e}</div>${sorted.map((t,i)=>`<div class="card" style="margin:var(--s-2) 0;font-size:var(--fs-xl);font-weight:800">${['🥇','🥈','🥉','4️⃣'][i]} ${t.e} ${t.n}: ${t.s}</div>`).join('')}<button class="btn full" id="bk" style="margin-top:var(--s-4)">Volver</button></div>`;
    confetti(); speak(`¡Ganan los ${sorted[0].n}!`); bind('#bk',()=>go({name:'class'})); return; }
  const q=c.qs[c.i], tm=c.teams[c.turn]; const opts=q._o||(q._o=shuffle(q.options));
  app.innerHTML=`<div class="row" style="gap:var(--s-2);flex-wrap:wrap;margin-bottom:var(--s-3)">${c.teams.map((t,i)=>`<div class="chip ${i===c.turn?'on':''}" style="font-size:var(--fs-md)">${t.e} ${t.n}: ${t.s}</div>`).join('')}<div class="sp"></div><button class="chip" id="x">✕</button></div>
    <p class="muted" style="font-weight:800;font-size:var(--fs-md);margin:0 0 var(--s-2)">Pregunta ${c.i+1} de ${c.qs.length} · Turno: ${tm.e} ${tm.n}</p>
    <div class="bubble" style="font-size:var(--fs-2xl);margin-bottom:var(--s-3)">${q.prompt}</div>${q.visual?`<div class="visual ${q.visualText?'text':''}" style="font-size:var(--fs-xl)">${q.visual}</div>`:''}
    <div class="opts ${q.big?'big':''}">${opts.map((o,i)=>`<button class="opt" style="font-size:var(--fs-2xl)" data-i="${i}">${o}</button>`).join('')}</div>`;
  bind('#x',()=>go({name:'class'}));
  let done=false;
  bind('[data-i]',el=>{ if(done) return; done=true; const ok=opts[+el.dataset.i]===q.correct;
    app.querySelectorAll('[data-i]').forEach((b,i)=>{ if(opts[i]===q.correct) b.classList.add('ok'); else if(b===el) b.classList.add('no'); });
    if (ok){ tm.s++; tone(true); confetti(); } else tone(false);
    showFb(ok,`<b>${ok?`¡Punto para los ${tm.n}!`:'¡Casi!'}</b><p>Respuesta: <b>${q.correct}</b></p><button class="btn full" id="nx">Siguiente</button>`);
    fb.querySelector('#nx').addEventListener('click',()=>{ hideFb(); c.i++; c.turn=(c.turn+1)%c.teams.length; render(); }); });
};

/* ---------- Tiempo de juego y límite ---------- */
VIEWS.rest=function(){
  const p=prof();
  app.innerHTML=`<div class="result"><div style="display:flex;justify-content:center">${mascot(p.avatar,140,'msc','sleep')}</div><h2 style="margin-top:var(--s-3)">¡Hora de descansar!</h2>
    <p class="muted" style="font-size:var(--fs-md);font-weight:700">Hoy jugaste ${Math.round(((p.time||{})[today()]||0)/60)} minutos. ${mname(p.avatar)} también necesita dormir. 💤<br>¡Mañana jugamos más!</p>
    <div class="btns"><button class="btn soft full" id="ad">👤 Zona de adultos</button><button class="btn soft full" id="sw">Cambiar de perfil</button></div></div>`;
  speak(`¡Hora de descansar! Mañana jugamos más.`);
  bind('#ad',()=>gate()); bind('#sw',()=>go({name:'profiles'}));
};
setInterval(()=>{
  try{ const p=prof(); if (!p || document.visibilityState!=='visible' || ['profiles','adults','class','rest','newProfile'].includes(view.name)) return;
    p.time=p.time||{}; p.time[today()]=(p.time[today()]||0)+10;
    if (view.name==='toy'){ p.toyTime=p.toyTime||{}; p.toyTime[view.toy]=(p.toyTime[view.toy]||0)+10; }
    save();
    const lim=(S.settings.limit||0)*60; if (lim && p.time[today()]>=lim && (S.settings.unlocked!==today()+p.id)) go({name:'rest'});
  }catch(e){}
},10000);

/* ---------- Zona de adultos: reporte y ajustes ---------- */
const _vAdults=vAdults;
vAdults=function(){
  _vAdults();
  const fmtM=s=>`${Math.round((s||0)/60)} min`;
  const week=p=>{ let s=0; for(let i=0;i<7;i++){ s+=(p.time||{})[new Date(Date.now()-i*864e5).toISOString().slice(0,10)]||0; } return s; };
  let html=`<div class="card" style="margin-bottom:var(--s-4)"><h3 style="font-size:var(--fs-md);margin-bottom:var(--s-2)">⏱️ Tiempo de juego por día</h3>
    <div class="grades">${[0,15,30,45,60,90].map(m=>`<button class="chip ${(S.settings.limit||0)===m?'on':''}" data-lim="${m}">${m?m+' min':'Sin límite'}</button>`).join('')}</div>
    <p class="muted" style="font-size:var(--fs-xs);margin:var(--s-2) 0 0">Al llegar al límite, la app muestra la pantalla de descanso. Desde aquí puedes darle más tiempo hoy.</p>
    ${S.profiles.map(p=>`<button class="chip" data-unl="${p.id}" style="margin-top:var(--s-2)">➕ Más tiempo hoy para ${esc(p.name)}</button>`).join(' ')}
    <button class="btn full" id="cls" style="margin-top:var(--s-4)">🏫 Modo aula</button></div>`;
  S.profiles.forEach(p=>{ const tt=Object.entries(p.toyTime||{}).sort((a,b)=>b[1]-a[1]).slice(0,3).map(([k,v])=>{ const T=TOYS.find(t=>t.id===k); return T?`${T.icon} ${T.name} (${fmtM(v)})`:''; }).filter(Boolean);
    const wins=Object.entries(S.toyWins||{}).filter(([k])=>k.startsWith(p.id+'|')).reduce((s,[,v])=>s+v,0); const fl=(p.fluency||[]).slice(-3); const lvl=xpLevel(p.xp||0);
    html+=`<div class="card" style="margin-bottom:var(--s-4)"><div class="row">${petMini(p,48)}<div><b style="font-size:var(--fs-md)">Reporte de ${esc(p.name)}</b><div class="muted">${p.age?p.age+' años · ':''}Nivel de juego ${lvlOf(p)}</div></div></div>
      <table style="margin-top:var(--s-3)"><tr><td>Tiempo hoy</td><td><b>${fmtM((p.time||{})[today()])}</b></td></tr><tr><td>Últimos 7 días</td><td><b>${fmtM(week(p))}</b></td></tr>
      <tr><td>Juguetes favoritos</td><td>${tt.join('<br>')||'—'}</td></tr><tr><td>Retos ganados en juguetes</td><td><b>${wins}</b></td></tr>
      <tr><td>Su amigo</td><td>${LEVELN[lvl-1]} · ${p.xp||0} puntos</td></tr><tr><td>Stickers</td><td>${(p.stickers||[]).length} de ${STK.length}</td></tr>
      <tr><td>Cálculo mental</td><td>${p.math?`🔥 ${p.math.streak} días · récord ${p.math.best}`:'—'}</td></tr>
      <tr><td>Lectura (palabras correctas/min)</td><td>${fl.length?fl.map(f=>`${f.d}: <b>${f.wcpm}</b>`).join('<br>'):'—'}</td></tr></table></div>`; });
  app.insertAdjacentHTML('beforeend',html);
  bind('[data-lim]',el=>{ S.settings.limit=+el.dataset.lim; save(); render(); });
  bind('[data-unl]',el=>{ S.settings.unlocked=today()+el.dataset.unl; save(); el.textContent='✅ Listo: tiempo libre hoy'; });
  bind('#cls',()=>go({name:'class'}));
};

/* ---------- inicio ---------- */
if (app){
  try{ if('speechSynthesis' in window) speechSynthesis.getVoices(); }catch(e){}
  if (S.current && prof()) view={name:'home'};
  render();
}
