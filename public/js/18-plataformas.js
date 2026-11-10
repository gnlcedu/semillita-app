/* Semillita · El camino de la semilla: juego de plataformas calmado.
   El animalito recorre el campo y recoge lo que una planta necesita (semillas, agua y sol); al llegar a la
   maceta, la semillita crece y florece. No hay enemigos, ni vidas, ni reloj: si cae al arroyo, vuelve a la orilla.
   Niveles 2 y 3: además se forma una palabra recogiendo sus letras en orden (el error muestra la letra que toca).
   Piezas: suelo, plataformas, cajas, resorte y adornos del «Platformer Pack Redux» de Kenney (CC0) y paisaje de
   «Background Elements», recoloreados a pastel en 17-entorno.js; semilla, gota, sol y flor son piezas propias. */
function toyCamino(root){
  const lv=LV(), E=window.ENTORNO||{}, T=56, COLS=64;
  const PALABRAS = lv===2 ? ['SOL','FLOR','AGUA','HOJA','RAÍZ'] : ['SEMILLA','TIERRA','PLANTA','JARDÍN','FRUTO','TALLO'];
  const cuerpo=n=>E[n]?E[n].p.map(q=>`<path d="${q[1]}" fill="${q[0]}"/>`).join(''):'';
  /* pieza con contorno plano, base centrada en (x, yb) */
  const pz=(n,x,yb,h,z=1,c)=>{ const e=E[n]; if(!e) return ''; const w=e.w*h/100; return `<svg class="abs" aria-hidden="true" viewBox="0 0 ${e.w} 100" style="left:${x-w/2}px;top:${yb-h}px;width:${w}px;height:${h}px;overflow:visible;z-index:${z};pointer-events:none">${window.ent(n,e.w/2,100,100,c)}</svg>`; };
  addHTML(root, `<div id="cam" class="abs" style="inset:0 0 var(--tbar-h) 0;overflow:hidden;background:#DDF0FA;touch-action:none"></div>
    <div class="tbar" style="touch-action:none;gap:var(--s-2)">
      <button id="bl" aria-label="Caminar a la izquierda" style="min-width:60px;touch-action:none">◀</button><button id="br" aria-label="Caminar a la derecha" style="min-width:60px;touch-action:none">▶</button>
      <span style="flex:1"></span><button id="bj" style="min-width:92px;touch-action:none">Saltar</button><button id="rs" aria-label="Empezar de nuevo">🔄</button></div>`);
  const cam=root.querySelector('#cam');
  /* el globo del animalito va arriba, para no tapar el camino */
  { const tb=document.getElementById('tb'); if(tb){ tb.style.bottom='auto'; tb.style.top='92px'; } }
  let raf=0, vivo=true, st=null; const tec={};
  const ctl={l:false,r:false,salto:-1};

  function armar(){
    const W=cam.clientWidth, H=cam.clientHeight, gy=H-84, WW=COLS*T;
    const tramos = lv===1 ? [[0,COLS-1]] : [[0,13],[16,27],[30,41],[44,COLS-1]];
    const plats=[[5,2,3],[9,4,3],[21,2,3],[35,4,3],[50,4,3]], cajas=[[19,0],[47,0],[48,0],[48,1]], resortes=[33];
    const sol=[]; let h='';
    /* lejos: montañas y nubes (se mueven más despacio) */
    let lej=''; for(let x=160;x<WW*.4+W;x+=470) lej+=pz('montes',x,gy+6,150,0,'#CBDDEA');
    for(let i=0;i<7;i++) lej+=pz('p_nube',120+i*310,(H*.12)+(i%3)*34+26,26,0);
    /* árboles y casas detrás del camino */
    [['arbol',3.5,150],['pino',11.5,120],['casa_lado',23.6,104],['abeto',26.4,112],['arbol_copa',38,130],['pino_oscuro',40.4,110],['arbol',53,150],['abeto_ancho',57,124]].forEach(([n,tx,al])=>{ h+=pz(n,tx*T,gy+4,al,1); });
    /* suelo por tramos (losetas sin contorno, para que no se vean las uniones) y arroyo en los huecos */
    const tierra=(E.p_tierra&&E.p_tierra.p[0][0])||'#E5BC94';
    tramos.forEach(([a,b],i)=>{ const n=b-a+1; sol.push({x:a*T,y:gy,w:n*T,h:400,suelo:1});
      h+=`<svg class="abs" aria-hidden="true" viewBox="0 0 ${n*100} 150" preserveAspectRatio="none" style="left:${a*T}px;top:${gy}px;width:${n*T}px;height:84px;z-index:2;pointer-events:none"><defs><g id="pl-s${i}">${cuerpo('p_suelo')}</g></defs><rect y="30" width="${n*100}" height="122" fill="${tierra}"/>${Array.from({length:n},(_,k)=>`<use href="#pl-s${i}" x="${k*100}"/>`).join('')}</svg>`;
      if (i<tramos.length-1){ const gx=(b+1)*T, gw=(tramos[i+1][0]-b-1)*T; h+=`<div class="abs" style="left:${gx}px;top:${gy+30}px;width:${gw}px;height:120px;background:#BFE1F5;border-top:3px solid #A6D2EC;z-index:1"></div>`; } });
    plats.forEach(([tx,al,n],i)=>{ const y=gy-al*T; sol.push({x:tx*T,y,w:n*T,h:20,paso:1});
      h+=`<svg class="abs" aria-hidden="true" viewBox="0 0 ${n*175} 100" preserveAspectRatio="none" style="left:${tx*T}px;top:${y}px;width:${n*T}px;height:${T*100/175}px;z-index:2;pointer-events:none"><defs><g id="pl-p${i}">${cuerpo('p_plataforma')}</g></defs>${Array.from({length:n},(_,k)=>`<use href="#pl-p${i}" x="${k*175}"/>`).join('')}</svg>`; });
    cajas.forEach(([tx,al])=>{ const y=gy-(al+1)*T; sol.push({x:tx*T,y,w:T,h:T}); h+=pz('p_caja',tx*T+T/2,y+T,T,3); });
    resortes.forEach(tx=>{ sol.push({x:tx*T+6,y:gy-24,w:T-12,h:24,paso:1,resorte:1}); h+=pz('p_resorte',tx*T+T/2,gy,30,3); });
    /* adornos */
    h+=pz('p_letrero',1.1*T,gy+2,50,3);
    [['p_hongo',12.3,26],['p_arbusto',16.9,34],['p_pasto',7.4,24],['p_pasto',20.6,24],['p_roca',25.4,26],['p_arbusto',31.4,34],['p_pasto',37.2,24],['p_hongo',46,26],['p_roca',44.7,26],['p_pasto',49.3,24],['p_arbusto',51.4,34],['p_pasto',56.2,24],['p_cerca',58.9,40],['p_cerca',59.9,40],['p_cerca',60.9,40],['p_cerca',61.9,40]].forEach(([n,tx,al])=>{ h+=pz(n,tx*T,gy+2,al,3); });
    /* cosas para recoger */
    const items=[]; const pon=(k,tx,al,ch)=>items.push({k,x:tx*T+T/2,y:gy-al*T-30,ch});
    [2,3,4,17,18,25,31,45,55].forEach(tx=>pon('semilla',tx,0)); [[5,2],[6,2],[7,2],[14.5,2],[21,2],[22,2],[23,2],[28.5,2],[42.5,2]].forEach(([tx,al])=>pon('agua',tx,al));
    [[12.4,1],[40,1],[56,1],[9,4],[10,4],[11,4],[35,4],[36,4],[37,4],[50,4],[51,4],[52,4]].forEach(([tx,al])=>pon('sol',tx,al)); /* tres soles quedan a un salto del suelo; los demás son premio por subir */ [[19,1],[48,2],[58,0]].forEach(([tx,al])=>pon('estrella',tx,al));
    let palabra='';
    if (lv>1){ palabra=pick(PALABRAS); const HUECOS=[1,8,12.5,16.5,24,30.5,39,46,54], L=[...palabra];
      L.forEach((ch,i)=>pon('letra',HUECOS[Math.round(i*(HUECOS.length-1)/(L.length-1))],1,ch));
      if (lv===3){ const otras=[...'BCDGHKMÑPQVXZ'].filter(c=>!L.includes(c)); pon('letra',27,1,pick(otras)); pon('letra',57,1,pick(otras)); items.slice(-2).forEach(it=>it.falsa=1); } }
    const VISTA={semilla:'🌰',agua:'💧',sol:'☀️'};
    items.forEach((it,i)=>{ h += it.k==='letra' ? `<div class="abs" data-it="${i}" style="left:${it.x-17}px;top:${it.y-17}px;width:34px;height:34px;display:grid;place-items:center;background:var(--card);border:var(--bw) solid var(--line-2);border-radius:var(--r-sm);box-shadow:var(--sh-1);font-weight:800;font-size:var(--fs-md);color:var(--ink);z-index:4">${it.ch}</div>`
      : it.k==='estrella' ? `<div class="abs" data-it="${i}" style="left:${it.x-16}px;top:${it.y-16}px;width:32px;height:32px;z-index:4">${pz('p_estrella',16,31,30,1)}</div>`
      : `<div class="abs" data-it="${i}" style="left:${it.x-16}px;top:${it.y-16}px;width:32px;height:32px;font-size:30px;line-height:1;z-index:4">${emo(VISTA[it.k])}</div>`; });
    /* meta: la maceta */
    const mx=60*T+T/2;
    h+=`<div id="mac" class="abs" style="left:${mx-34}px;top:${gy-66}px;width:68px;height:68px;font-size:62px;line-height:1;z-index:4;text-align:center">${emo('🪴')}</div>`;
    h+=`<div id="pj" class="abs" style="left:0;top:0;width:44px;height:50px;z-index:5;will-change:transform"><div id="pjv" style="width:44px;height:50px">${mascot(prof().avatar,44,'pjm')}</div></div>`;
    cam.innerHTML=`<div id="lej" class="abs" style="left:0;top:0;width:${WW}px;height:${H}px;will-change:transform">${lej}</div><div id="mun" class="abs" style="left:0;top:0;width:${WW}px;height:${H}px;will-change:transform">${h}</div>
      <div id="hud" class="abs" style="left:8px;top:8px;z-index:7;display:flex;flex-direction:column;gap:var(--s-1);align-items:flex-start;pointer-events:none">
        <div style="display:flex;gap:var(--s-3);background:var(--card);border:var(--bw) solid var(--line);border-radius:var(--r-pill);padding:var(--s-1) var(--s-3);font-weight:800;font-size:var(--fs-sm);box-shadow:var(--sh-1)">${['semilla','agua','sol'].map(k=>`<span style="display:inline-flex;align-items:center;gap:3px">${emo(VISTA[k])}<b data-n="${k}">0</b></span>`).join('')}<span style="display:inline-flex;align-items:center;gap:3px;width:auto">${emo('⭐')}<b data-n="estrella">0</b></span></div>
        ${palabra?`<div id="pal" aria-label="Palabra para formar" style="display:flex;gap:3px;background:var(--card);border:var(--bw) solid var(--line);border-radius:var(--r-sm);padding:var(--s-1) var(--s-2);box-shadow:var(--sh-1)">${[...palabra].map((c,i)=>`<span data-l="${i}" style="width:20px;height:26px;display:grid;place-items:center;border-bottom:3px solid var(--line-2);font-weight:800;font-size:var(--fs-sm);color:#5A566B">${c}</span>`).join('')}</div>`:''}</div>`;
    const q=s=>cam.querySelector(s);
    items.forEach((it,i)=>{ it.el=q(`[data-it="${i}"]`); });
    st={W,H,gy,WW,sol,items,palabra,letra:0,mx, n:{semilla:0,agua:0,sol:0,estrella:0}, px:1.6*T, py:gy, vx:0, vy:0, piso:true, tPiso:0, cx:0, seg:{x:1.6*T,y:gy}, mira:1, fin:false, aviso:0, dicho:{},
      pj:q('#pj'), pjv:q('#pjv'), mun:q('#mun'), lej:q('#lej'), mac:q('#mac')};
    pintar();
  }
  function pintar(){ const s=st; s.pj.style.transform=`translate3d(${s.px-22}px,${s.py-50}px,0)`; s.pjv.style.transform=`scaleX(${s.mira})`;
    s.mun.style.transform=`translate3d(${-s.cx}px,0,0)`; s.lej.style.transform=`translate3d(${RM?0:-s.cx*.25}px,0,0)`; }
  function recoger(it){
    const s=st;
    if (it.k==='letra'){ const toca=[...s.palabra][s.letra];
      if (it.falsa || it.ch!==toca || it!==s.items.find(o=>o.k==='letra'&&!o.falsa&&!o.ok&&o.ch===toca)){ /* no es la que toca: se mueve y se señala la correcta */
        if (performance.now()-s.aviso>2200){ s.aviso=performance.now(); note(220,.2,'sine',.1); if(!RM) it.el.animate([{transform:'rotate(0)'},{transform:'rotate(-12deg)'},{transform:'rotate(12deg)'},{transform:'rotate(0)'}],{duration:320});
          const sig=cam.querySelector(`[data-l="${s.letra}"]`); if(sig&&!RM) sig.animate([{transform:'scale(1)'},{transform:'scale(1.5)'},{transform:'scale(1)'}],{duration:500,iterations:2}); tsay(`Ahora va la letra ${toca}`); }
        return; }
      it.ok=1; const hueco=cam.querySelector(`[data-l="${s.letra}"]`); if(hueco){ hueco.style.color='var(--ink)'; hueco.style.borderBottomColor='#6FAF8F'; hueco.style.background='var(--mint)'; }
      s.letra++; speak(it.ch); note(660+s.letra*60,.14,'sine',.1);
      if (s.letra===[...s.palabra].length) setTimeout(()=>tsay(`¡Formaste la palabra ${s.palabra.toLowerCase()}!`),350);
    } else { it.ok=1; s.n[it.k]++; const b=cam.querySelector(`[data-n="${it.k}"]`); if(b) b.textContent=s.n[it.k]; note(it.k==='estrella'?988:784,.12,'sine',.1);
      if (!s.dicho[it.k]){ s.dicho[it.k]=1; tsay({semilla:'¡Una semilla!',agua:'¡Agua para la planta!',sol:'¡Luz del sol!',estrella:'¡Una estrella!'}[it.k]); } }
    const el=it.el; if (RM||!el.animate){ el.remove(); return; }
    el.animate([{transform:'translateY(0) scale(1)',opacity:1},{transform:'translateY(-26px) scale(1.25)',opacity:0}],{duration:320,easing:'ease-out'}).onfinish=()=>el.remove();
  }
  function llegar(){
    const s=st, falta=['semilla','agua','sol'].filter(k=>!s.n[k]);
    if (falta.length){ if (performance.now()-s.aviso>4000){ s.aviso=performance.now(); tsay(`A la planta le falta ${falta.map(k=>({semilla:'una semilla',agua:'agua',sol:'sol'}[k])).join(' y ')}. ¡Búscalo en el camino!`); react('think'); } return; }
    s.fin=true; s.vx=0; const etapas=['🌱','🌿','🌻'];
    etapas.forEach((e,i)=>setTimeout(()=>{ if(!vivo||st!==s) return; s.mac.innerHTML=emo(e); note(523+i*131,.25,'sine',.1); if(!RM) s.mac.animate([{transform:'scale(.6)'},{transform:'scale(1.12)'},{transform:'scale(1)'}],{duration:380,easing:'ease-out'}); },500+i*750));
    setTimeout(()=>{ if(!vivo||st!==s) return; const completa=!s.palabra||s.letra===[...s.palabra].length;
      if (completa){ confetti(); win(s.palabra?`¡Tu semillita floreció y formaste la palabra ${s.palabra}!`:`¡Tu semillita floreció! Recogiste ${s.n.semilla} semillas, ${s.n.agua} gotas y ${s.n.sol} soles.`); }
      else { react('happy'); tsay(`¡Tu semillita floreció! La próxima vez completa la palabra ${s.palabra.toLowerCase()}.`); }
      addHTML(cam, `<button id="otra" class="btn abs" style="left:50%;top:38%;transform:translateX(-50%);z-index:8">Jugar otra vez</button>`); cam.querySelector('#otra').addEventListener('click',armar);
    },500+etapas.length*750+300);
  }
  function paso(dt){
    const s=st, ahora=performance.now()/1000, dir=(ctl.r||tec.ArrowRight?1:0)-(ctl.l||tec.ArrowLeft?1:0);
    if (!s.fin){ s.vx=dir*210; if(dir) s.mira=dir; }
    if (s.piso) s.tPiso=ahora;
    if (!s.fin && ctl.salto>0 && ahora-ctl.salto<.14 && ahora-s.tPiso<.12){ s.vy=-680; s.piso=false; ctl.salto=-1; s.tPiso=-1; note(520,.08,'sine',.06); }
    s.vy=Math.min(s.vy+1750*dt,900);
    /* horizontal: choca con suelo y cajas */
    let nx=Math.max(18,Math.min(s.WW-18,s.px+s.vx*dt));
    for (const o of s.sol){ if (o.paso) continue; if (s.py>o.y+2 && s.py-44<o.y+o.h){ if (s.vx>0 && s.px+16<=o.x && nx+16>o.x) nx=o.x-16; else if (s.vx<0 && s.px-16>=o.x+o.w && nx-16<o.x+o.w) nx=o.x+o.w+16; } }
    /* vertical */
    let ny=s.py+s.vy*dt; s.piso=false;
    for (const o of s.sol){ if (nx+14<=o.x || nx-14>=o.x+o.w) continue;
      if (s.vy>=0 && s.py<=o.y+.5 && ny>=o.y){ ny=o.y; if (o.resorte){ s.vy=-1010; note(392,.18,'triangle',.08); } else { s.vy=0; s.piso=true; if (o.suelo && nx>o.x+30 && nx<o.x+o.w-30) s.seg={x:nx,y:o.y}; } }
      else if (s.vy<0 && !o.paso && s.py-44>=o.y+o.h && ny-44<o.y+o.h){ ny=o.y+o.h+44; s.vy=0; } }
    s.px=nx; s.py=ny;
    if (s.py>s.H+90){ /* cayó al arroyo: vuelve a la orilla, sin castigo */ s.px=s.seg.x; s.py=s.seg.y; s.vy=0; note(300,.25,'sine',.08); if(!s.dicho.agua2){ s.dicho.agua2=1; tsay('¡Chapuzón! Salta un poco antes.'); } }
    for (const it of s.items){ if (!it.ok && Math.abs(it.x-s.px)<30 && Math.abs(it.y-(s.py-24))<34) recoger(it); }
    if (!s.fin && Math.abs(s.px-s.mx)<46 && s.piso) llegar();
    const cx=Math.max(0,Math.min(s.WW-s.W,s.px-s.W*.38)); s.cx += (cx-s.cx)*Math.min(1,dt*8);
    pintar();
  }
  let t0=0; const bucle=t=>{ if(!vivo) return; const dt=Math.min(.033,(t-t0)/1000||0); t0=t; if(st) paso(dt); raf=requestAnimationFrame(bucle); };
  const saltar=()=>{ ctl.salto=performance.now()/1000; };
  const sostener=(sel,k)=>{ const b=root.querySelector(sel); const on=e=>{ e.preventDefault(); ctl[k]=true; try{ b.setPointerCapture(e.pointerId); }catch(_){} }, off=()=>{ ctl[k]=false; };
    b.addEventListener('pointerdown',on); ['pointerup','pointercancel','lostpointercapture'].forEach(ev=>b.addEventListener(ev,off)); b.addEventListener('contextmenu',e=>e.preventDefault()); };
  sostener('#bl','l'); sostener('#br','r');
  root.querySelector('#bj').addEventListener('pointerdown',e=>{ e.preventDefault(); saltar(); });
  root.querySelector('#rs').addEventListener('click',armar);
  const kd=e=>{ if (['ArrowLeft','ArrowRight'].includes(e.key)){ tec[e.key]=true; e.preventDefault(); } else if ((e.key==='ArrowUp'||e.key===' ') && !e.repeat){ saltar(); e.preventDefault(); } };
  const ku=e=>{ if (e.key in tec) tec[e.key]=false; };
  window.addEventListener('keydown',kd); window.addEventListener('keyup',ku);
  /* si cambia el tamaño de la pantalla (girar el celular), el camino se arma de nuevo a la medida */
  let tr=0, w0=0, h0=0; const rz=()=>{ clearTimeout(tr); tr=setTimeout(()=>{ if(vivo && st && (cam.clientWidth!==w0 || cam.clientHeight!==h0)){ w0=cam.clientWidth; h0=cam.clientHeight; armar(); } },250); };
  window.addEventListener('resize',rz);
  setTimeout(()=>{ if(!vivo) return; w0=cam.clientWidth; h0=cam.clientHeight; armar(); raf=requestAnimationFrame(bucle); },60);
  return ()=>{ vivo=false; cancelAnimationFrame(raf); window.removeEventListener('keydown',kd); window.removeEventListener('keyup',ku); window.removeEventListener('resize',rz); clearTimeout(tr); };
}
TOYS.push({id:'camino', name:'El camino de la semilla', icon:'🌱', c:'sage', open:toyCamino, hi:'Camina y salta. Recoge semillas, agua y sol, y llévalos a la maceta.', hi2:'Recoge semillas, agua y sol, y forma la palabra con las letras en orden.'});
if (window.TOY_ILU) window.TOY_ILU.camino='girasol';
