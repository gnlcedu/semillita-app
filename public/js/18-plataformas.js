/* Semillita · El camino de la semilla: juego de plataformas.
   El animalito recorre el campo y recoge lo que una planta necesita (semillas, agua y sol); al llegar a la
   maceta, la semillita crece y florece. Hay obstáculos del jardín (espinas, gusanos, caracoles, abejas y arroyos):
   cada tropiezo quita un corazón y, si se acaban los tres, el camino se intenta de nuevo. No hay reloj.
   La dificultad sube sola: cada camino completado abre una etapa más larga y con más obstáculos; el nivel por
   edad (LV) fija el punto de partida. Niveles 2 y 3: además se forma una palabra con sus letras en orden.
   El camino se arma al azar en cada intento y todo se escala a la altura de la pantalla (celular o tablet).
   Piezas: «Platformer Pack Redux» y «Background Elements» de Kenney (CC0), recoloreadas en 17-entorno.js;
   semilla, gota, sol y flor son piezas propias. */
function toyCamino(root){
  const lv=LV(), E=window.ENTORNO||{}, pid=(prof()||{}).id||'x';
  toyCamino.etapas=toyCamino.etapas||{};          /* etapa alcanzada por perfil; dura mientras la app esté abierta */
  const PALABRAS = lv===2 ? ['SOL','FLOR','AGUA','HOJA','RAÍZ'] : ['SEMILLA','TIERRA','PLANTA','JARDÍN','FRUTO','TALLO'];
  const cuerpo=n=>E[n]?E[n].p.map(q=>`<path d="${q[1]}" fill="${q[0]}"/>`).join(''):'';
  /* pieza con contorno plano, base centrada en (x, yb) */
  const pz=(n,x,yb,h,z=1,c)=>{ const e=E[n]; if(!e) return ''; const w=e.w*h/100; return `<svg class="abs" aria-hidden="true" viewBox="0 0 ${e.w} 100" style="left:${x-w/2}px;top:${yb-h}px;width:${w}px;height:${h}px;overflow:visible;z-index:${z};pointer-events:none">${window.ent(n,e.w/2,100,100,c)}</svg>`; };
  addHTML(root, `<div id="cam" class="abs" style="inset:0 0 var(--tbar-h) 0;overflow:hidden;background:#DDF0FA;touch-action:none"></div>
    <div class="tbar" style="touch-action:none;gap:var(--s-1);padding:0 var(--s-2)">
      <button id="bl" aria-label="Caminar a la izquierda" style="min-width:54px;touch-action:none">◀</button><button id="br" aria-label="Caminar a la derecha" style="min-width:54px;touch-action:none">▶</button>
      <span style="flex:1"></span><button id="bj" style="min-width:76px;touch-action:none">Saltar</button><button id="rs" aria-label="Empezar de nuevo">🔄</button></div>`);
  const cam=root.querySelector('#cam');
  let raf=0, vivo=true, st=null; const tec={};
  const ctl={l:false,r:false,salto:-1};
  const VISTA={semilla:'🌰',agua:'💧',sol:'☀️'};

  function armar(){
    const W=cam.clientWidth, H=cam.clientHeight, etapa=toyCamino.etapas[pid]||1, dif=Math.min(6,(lv-1)+(etapa-1));
    /* T = lado de una loseta: se achica en pantallas bajas para que quepan las plataformas altas */
    const T=Math.max(30,Math.min(56,Math.floor((H-70)/6.3))), k=T/56, gy=H-Math.round(T*1.5);
    const tramos=[], plats=[], cajas=[], resortes=[], espinas=[], bichos=[], moviles=[], items=[], adornos=[], huecos=[], ocupado=[];
    let x=0;
    const suelo=n=>{ const u=tramos[tramos.length-1]; if (u && u[1]===x-1) u[1]=x+n-1; else tramos.push([x,x+n-1]); x+=n; };
    const pon=(kk,tx,al,ch)=>items.push({k:kk,x:tx*T+T/2,y:gy-al*T-30*k,ch});
    /* tramos posibles; cada uno avanza x y deja sus cosas. a = primera loseta del tramo */
    const TRAMO={
      llano(a){ suelo(5); pon('semilla',a+1,0); pon('semilla',a+3,0); pon('sol',a+2,1); pon('agua',a+4,1); adornos.push(['p_arbusto',a+2.6,34]); },
      escalon(a){ suelo(7); plats.push([a+1,2,3]); [1,2,3].forEach(i=>pon('agua',a+i,2)); if (dif>=1){ plats.push([a+5,4,2]); pon('sol',a+5,4); pon('sol',a+6,4); } else pon('sol',a+5,1); },
      caja(a){ suelo(5); cajas.push([a+2,0]); ocupado.push(a+2); if (dif>=2){ cajas.push([a+3,0],[a+3,1]); ocupado.push(a+3); pon('estrella',a+3,2); } else pon('estrella',a+2,1); pon('semilla',a+1,0); },
      resorte(a){ suelo(7); resortes.push(a+1); ocupado.push(a+1); plats.push([a+3,4,3]); [3,4,5].forEach(i=>pon('sol',a+i,4)); pon('semilla',a+5,0); pon('semilla',a+6,0); },
      hueco(a){ suelo(3); pon('semilla',a+1,0); x+=2; pon('agua',a+3.5,2); suelo(3); pon('sol',a+6,1); },
      espinas(a){ const dos=dif>=3; suelo(dos?8:6); espinas.push(a+3); ocupado.push(a+3); pon('semilla',a+1,0); pon('agua',a+3,2); if (dos){ espinas.push(a+5.7); ocupado.push(a+5,a+6); } pon('sol',a+4.4,1); },
      bicho(a){ suelo(7); const lento=rnd(0,1); bichos.push({n:lento?'p_caracol':'p_gusano',a:a+1.3,b:a+5.7,v:(lento?26:46)+8*dif,quien:lento?'caracol':'gusano'}); pon('semilla',a+2,0); pon('semilla',a+4,0); pon('sol',a+3,1.6); },
      abeja(a){ suelo(6); bichos.push({n:'p_abeja',a:a+3,b:a+3,v:0,vuela:1,quien:'abeja'}); pon('semilla',a+1,0); pon('agua',a+3,0); pon('estrella',a+4.6,1); },
      movil(a){ suelo(2); const g0=x; x+=5; moviles.push({a:g0+.2,b:g0+2.8,n:2,v:52+4*dif}); pon('agua',g0+2,1.5); suelo(3); pon('sol',x-2,1); }
    };
    const baraja=['llano','escalon','caja','resorte']; if (dif>=1) baraja.push('hueco','espinas','bicho'); if (dif>=2) baraja.push('abeja','bicho','espinas'); if (dif>=3) baraja.push('movil','hueco','abeja');
    const nTramos=Math.min(13,6+dif+(lv>2?1:0));
    /* inicio */
    suelo(6); [2,3,4].forEach(i=>pon('semilla',i,0)); huecos.push(1);
    let ant='';
    for (let i=0;i<nTramos;i++){ let t; do { t = i===0 ? 'llano' : pick(baraja); } while (t===ant); ant=t; huecos.push(x+.4); TRAMO[t](x); }
    /* final: la maceta */
    const fin0=x; suelo(8); pon('estrella',fin0+1,0); const COLS=x, WW=COLS*T, mx=(fin0+4.5)*T+T/2;
    [3,4,5,6].forEach(i=>adornos.push(['p_cerca',fin0+i+.4,40]));

    const sol=[]; let h='';
    /* lejos: montañas y nubes (se mueven más despacio) */
    let lej=''; for(let xx=160;xx<WW*.4+W;xx+=470) lej+=pz('montes',xx,gy+6,150*k,0,'#CBDDEA');
    for(let i=0;i<Math.ceil(WW*.4/310)+2;i++) lej+=pz('p_nube',120+i*310,(H*.1)+(i%3)*30*k+26,26*k,0);
    /* suelo por tramos (losetas sin contorno, para que no se vean las uniones), arroyo en los huecos, árboles y adornos */
    const tierra=(E.p_tierra&&E.p_tierra.p[0][0])||'#E5BC94', ARB=[['arbol',150],['pino',120],['abeto',112],['arbol_copa',130],['pino_oscuro',110],['casa_lado',100],['abeto_ancho',124]]; let ia=rnd(0,6);
    tramos.forEach(([a,b],i)=>{ const n=b-a+1; sol.push({x:a*T,y:gy,w:n*T,h:600,suelo:1});
      h+=`<svg class="abs" aria-hidden="true" viewBox="0 0 ${n*100} 150" preserveAspectRatio="none" style="left:${a*T}px;top:${gy}px;width:${n*T}px;height:${Math.round(T*1.5)}px;z-index:2;pointer-events:none"><defs><g id="pl-s${i}">${cuerpo('p_suelo')}</g></defs><rect y="30" width="${n*100}" height="122" fill="${tierra}"/>${Array.from({length:n},(_,j)=>`<use href="#pl-s${i}" x="${j*100}"/>`).join('')}</svg>`;
      if (i<tramos.length-1){ const gx=(b+1)*T, gw=(tramos[i+1][0]-b-1)*T; h+=`<div class="abs" style="left:${gx}px;top:${gy+30*k}px;width:${gw}px;height:200px;background:#BFE1F5;border-top:3px solid #A6D2EC;z-index:1"></div>`; }
      for (let t=a+2.5;t<b-1;t+=6){ const [nm,al]=ARB[ia++%ARB.length]; h+=pz(nm,t*T,gy+4,al*k,1); }
      for (let t=a+1.4;t<b-.5;t+=3.3){ if (ocupado.some(o=>Math.abs(o-t)<1.3) || t>fin0+2) continue; const [nm,al]=pick([['p_pasto',24],['p_pasto',24],['p_hongo',26],['p_roca',24]]); adornos.push([nm,t,al]); } });
    h+=pz('p_letrero',1.1*T,gy+2,50*k,3);
    adornos.forEach(([n,tx,al])=>{ h+=pz(n,tx*T,gy+2,al*k,3); });
    plats.forEach(([tx,al,n],i)=>{ const y=gy-al*T; sol.push({x:tx*T,y,w:n*T,h:20,paso:1});
      h+=`<svg class="abs" aria-hidden="true" viewBox="0 0 ${n*175} 100" preserveAspectRatio="none" style="left:${tx*T}px;top:${y}px;width:${n*T}px;height:${T*100/175}px;z-index:2;pointer-events:none"><defs><g id="pl-p${i}">${cuerpo('p_plataforma')}</g></defs>${Array.from({length:n},(_,j)=>`<use href="#pl-p${i}" x="${j*175}"/>`).join('')}</svg>`; });
    cajas.forEach(([tx,al])=>{ const y=gy-(al+1)*T; sol.push({x:tx*T,y,w:T,h:T}); h+=pz('p_caja',tx*T+T/2,y+T,T,3); });
    resortes.forEach(tx=>{ sol.push({x:tx*T+6*k,y:gy-24*k,w:T-12*k,h:24*k,paso:1,resorte:1}); h+=pz('p_resorte',tx*T+T/2,gy,30*k,3); });
    /* plataformas que se mueven sobre el arroyo */
    moviles.forEach((m,i)=>{ const o={x:m.a*T,y:gy,w:m.n*T,h:20,paso:1,movil:1,x0:m.a*T,x1:m.b*T,v:m.v*k,id:'mv'+i}; sol.push(o);
      h+=`<div id="mv${i}" class="abs" style="left:0;top:${gy}px;width:${m.n*T}px;height:${T*100/175}px;z-index:2;will-change:transform;transform:translate3d(${o.x}px,0,0)"><svg aria-hidden="true" viewBox="0 0 ${m.n*175} 100" preserveAspectRatio="none" style="width:100%;height:100%;display:block"><defs><g id="pl-m${i}">${cuerpo('p_plataforma')}</g></defs>${Array.from({length:m.n},(_,j)=>`<use href="#pl-m${i}" x="${j*175}"/>`).join('')}</svg></div>`; });
    /* obstáculos */
    const peligros=[];
    espinas.forEach(tx=>{ const cx=tx*T+T/2, w=40*k, al=20*k; peligros.push({x:cx,w,h:al,y:gy,quien:'espinas'}); h+=pz('p_espinas',cx,gy+1,al,3,'#B9C6CC'); });
    bichos.forEach((b,i)=>{ const al=(b.vuela?30:b.n==='p_caracol'?28:20)*k, w=(E[b.n]?E[b.n].w:100)*al/100, o={x:(b.a*T+T/2),a:b.a*T+T/2,b:b.b*T+T/2,v:b.v*k,dir:1,w,h:al,y:b.vuela?gy-1.5*T:gy,y0:gy-1.5*T,vuela:b.vuela,fase:rnd(0,6),quien:b.quien,id:'bi'+i};
      peligros.push(o); h+=`<div id="bi${i}" class="abs" style="left:0;top:0;width:${w}px;height:${al}px;z-index:4;will-change:transform;pointer-events:none"><div style="width:100%;height:100%">${pz(b.n,w/2,al,al,1)}</div></div>`; });
    /* letras de la palabra (niveles 2 y 3), repartidas en orden a lo largo del camino */
    let palabra='';
    if (lv>1){ palabra=pick(PALABRAS.filter(p=>[...p].length<=huecos.length)); const L=[...palabra], libres=huecos.slice();
      L.forEach((ch,i)=>{ const j=Math.round(i*(huecos.length-1)/Math.max(1,L.length-1)); pon('letra',huecos[j],1,ch); libres[j]=null; });
      if (lv===3){ const otras=[...'BCDGHKMÑPQVXZ'].filter(c=>!L.includes(c)); libres.filter(v=>v!=null).slice(0,2).forEach(tx=>{ pon('letra',tx,1,pick(otras)); items[items.length-1].falsa=1; }); } }
    const lado=Math.round(32*k);
    items.forEach((it,i)=>{ h += it.k==='letra' ? `<div class="abs" data-it="${i}" style="left:${it.x-17}px;top:${it.y-17}px;width:34px;height:34px;display:grid;place-items:center;background:var(--card);border:var(--bw) solid var(--line-2);border-radius:var(--r-sm);box-shadow:var(--sh-1);font-weight:800;font-size:var(--fs-md);color:var(--ink);z-index:4">${it.ch}</div>`
      : it.k==='estrella' ? `<div class="abs" data-it="${i}" style="left:${it.x-lado/2}px;top:${it.y-lado/2}px;width:${lado}px;height:${lado}px;z-index:4">${pz('p_estrella',lado/2,lado-1,lado-2,1)}</div>`
      : `<div class="abs" data-it="${i}" style="left:${it.x-lado/2}px;top:${it.y-lado/2}px;width:${lado}px;height:${lado}px;font-size:${lado-2}px;line-height:1;z-index:4">${emo(VISTA[it.k])}</div>`; });
    /* meta y jugador */
    const pm=Math.round(66*k);
    /* fase 5 de personajes: si el niño armó su personaje, corre él y el animalito lo sigue */
    const conNino=!!(prof().nino && typeof ninoMascot==='function'), pw=Math.round((conNino?40:44)*k), ph=Math.round((conNino?62:50)*k);
    const qs=Math.round(30*k), qw=Math.round(qs*1.2), qh=Math.round(qs*1.2+10);
    h+=`<div id="mac" class="abs" style="left:${mx-pm/2}px;top:${gy-pm+2}px;width:${pm}px;height:${pm}px;font-size:${pm-6}px;line-height:1;z-index:4;text-align:center">${emo('🪴')}</div>`;
    h+=`<div id="pj" class="abs" style="left:0;top:0;width:${pw}px;height:${ph}px;z-index:5;will-change:transform"><div id="pjv" style="width:${pw}px;height:${ph}px">${conNino?ninoMascot(ninoDe(prof()),Math.round((ph-10)/1.6),'scn'):mascot(prof().avatar,pw,'pjm')}</div></div>`;
    if (conNino) h+=`<div id="pet" class="abs" style="left:0;top:0;width:${qw}px;height:${qh}px;z-index:4;will-change:transform;pointer-events:none"><div id="petv" style="width:${qw}px;height:${qh}px">${mascot(prof().avatar,qs,'scp')}</div></div>`;
    cam.innerHTML=`<div id="lej" class="abs" style="left:0;top:0;width:${WW}px;height:${H}px;will-change:transform">${lej}</div><div id="mun" class="abs" style="left:0;top:0;width:${WW}px;height:${H}px;will-change:transform">${h}</div>
      <div id="hud" class="abs" style="left:8px;top:8px;right:8px;z-index:7;display:flex;flex-wrap:wrap;gap:var(--s-1) var(--s-2);align-items:center;pointer-events:none">
        <div style="display:flex;gap:var(--s-3);background:var(--card);border:var(--bw) solid var(--line);border-radius:var(--r-pill);padding:var(--s-1) var(--s-3);font-weight:800;font-size:var(--fs-sm);box-shadow:var(--sh-1)">${['semilla','agua','sol'].map(n=>`<span style="display:inline-flex;align-items:center;gap:3px">${emo(VISTA[n])}<b data-n="${n}">0</b></span>`).join('')}<span style="display:inline-flex;align-items:center;gap:3px">${emo('⭐')}<b data-n="estrella">0</b></span></div>
        <div id="vid" aria-label="Corazones" style="display:flex;gap:2px;background:var(--card);border:var(--bw) solid var(--line);border-radius:var(--r-pill);padding:var(--s-1) var(--s-2);font-size:var(--fs-md);line-height:1;box-shadow:var(--sh-1)">${[0,1,2].map(i=>`<span data-v="${i}">${emo('❤️')}</span>`).join('')}</div>
        <div style="background:var(--butter);border-radius:var(--r-pill);padding:var(--s-1) var(--s-3);font-weight:800;font-size:var(--fs-xs);color:var(--ink)">Camino ${dif+1}</div>
        ${palabra?`<div id="pal" aria-label="Palabra para formar" style="display:flex;gap:3px;background:var(--card);border:var(--bw) solid var(--line);border-radius:var(--r-sm);padding:var(--s-1) var(--s-2);box-shadow:var(--sh-1)">${[...palabra].map((c,i)=>`<span data-l="${i}" style="width:20px;height:26px;display:grid;place-items:center;border-bottom:3px solid var(--line-2);font-weight:800;font-size:var(--fs-sm);color:#5A566B">${c}</span>`).join('')}</div>`:''}</div>`;
    const q=s=>cam.querySelector(s);
    items.forEach((it,i)=>{ it.el=q(`[data-it="${i}"]`); });
    sol.forEach(o=>{ if (o.movil) o.el=q('#'+o.id); }); peligros.forEach(o=>{ if (o.id) o.el=q('#'+o.id); });
    st={W,H,T,k,gy,WW,sol,items,peligros,palabra,letra:0,mx,etapa,dif, n:{semilla:0,agua:0,sol:0,estrella:0}, vidas:3, inv:0, emp:0, empT:0,
      px:1.6*T, py:gy, vx:0, vy:0, piso:true, tPiso:0, cx:0, seg:{x:1.6*T,y:gy}, mira:1, fin:false, aviso:0, dicho:{}, sobre:null, pw, ph,
      pj:q('#pj'), pjv:q('#pjv'), pet:q('#pet'), petv:q('#petv'), qw, qh, qx:.6*T, qy:gy, qm:1, hist:[], giro:SPECIES[prof().avatar]==='tortuga'?-1:1,  /* la tortuga se dibuja mirando a la izquierda */ mun:q('#mun'), lej:q('#lej'), mac:q('#mac')};
    pintar();
  }
  function pintar(){ const s=st; s.pj.style.transform=`translate3d(${s.px-s.pw/2}px,${s.py-s.ph}px,0)`; s.pjv.style.transform=`scaleX(${s.mira*(s.pet?1:s.giro)})`; s.pjv.classList.toggle('corre', s.piso && Math.abs(s.vx)>1);
    if (s.pet){ s.pet.style.transform=`translate3d(${s.qx-s.qw/2}px,${s.qy-s.qh}px,0)`; s.petv.style.transform=`scaleX(${s.qm*s.giro})`; s.petv.classList.toggle('corre', !!s.qmov); }
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
  /* tropiezo: quita un corazón, empuja un poco y da un momento sin daño. Sin corazones, el camino se intenta de nuevo. */
  function tropiezo(quien, lado){
    const s=st, ahora=performance.now()/1000; if (s.fin || ahora<s.inv) return false;
    s.vidas--; const c=cam.querySelector(`[data-v="${s.vidas}"]`); if(c) c.style.opacity='.22';
    note(196,.28,'sine',.12); s.inv=ahora+1.7; s.pj.style.opacity='.55';
    if (lado){ s.vy=-430*s.k; s.piso=false; s.emp=lado*170*s.k; s.empT=ahora+.3; }
    if (s.vidas<=0){ perder(); return true; }
    if (!s.dicho['t_'+quien]){ s.dicho['t_'+quien]=1; tsay({espinas:'¡Ay! Salta por encima de las espinas.',gusano:'¡Cuidado con el gusano! Salta para pasarlo.',caracol:'¡Cuidado con el caracol! Salta para pasarlo.',abeja:'¡Una abeja! Pasa por debajo sin saltar.',arroyo:'¡Chapuzón! Salta un poco antes.'}[quien]); } else react('surprised');
    return true;
  }
  function perder(){
    const s=st; s.fin=true; s.vx=0; react('sad'); tsay('Se acabaron los corazones. ¡Inténtalo otra vez!');
    addHTML(cam, `<div class="card abs stack" role="alertdialog" aria-label="Fin del intento" style="left:50%;top:30%;transform:translateX(-50%);z-index:9;width:min(86%,320px);text-align:center"><b style="font-size:var(--fs-lg)">¡Uy! Se acabaron los corazones</b><p class="muted" style="margin:0;font-size:var(--fs-sm)">No pasa nada. Tu semillita quiere intentarlo otra vez.</p><button id="otra" class="btn full">Intentar de nuevo</button></div>`);
    cam.querySelector('#otra').addEventListener('click',armar);
  }
  function llegar(){
    const s=st, falta=['semilla','agua','sol'].filter(n=>!s.n[n]);
    if (falta.length){ if (performance.now()-s.aviso>4000){ s.aviso=performance.now(); tsay(`A la planta le falta ${falta.map(n=>({semilla:'una semilla',agua:'agua',sol:'sol'}[n])).join(' y ')}. ¡Búscalo en el camino!`); react('think'); } return; }
    s.fin=true; s.vx=0; s.pj.style.opacity='1'; const etapas=['🌱','🌿','🌻'];
    etapas.forEach((e,i)=>setTimeout(()=>{ if(!vivo||st!==s) return; s.mac.innerHTML=emo(e); note(523+i*131,.25,'sine',.1); if(!RM) s.mac.animate([{transform:'scale(.6)'},{transform:'scale(1.12)'},{transform:'scale(1)'}],{duration:380,easing:'ease-out'}); },500+i*750));
    setTimeout(()=>{ if(!vivo||st!==s) return; const completa=!s.palabra||s.letra===[...s.palabra].length;
      if (lv===3) toyCamino.etapas[pid]=s.etapa+1;
      if (completa){ confetti(); win(s.palabra?`¡Tu semillita floreció y formaste la palabra ${s.palabra}!`:`¡Tu semillita floreció! Recogiste ${s.n.semilla} semillas, ${s.n.agua} gotas y ${s.n.sol} soles.`); }
      else { react('happy'); tsay(`¡Tu semillita floreció! La próxima vez completa la palabra ${s.palabra.toLowerCase()}.`); }
      addHTML(cam, `<button id="otra" class="btn abs" style="left:50%;top:36%;transform:translateX(-50%);z-index:8;white-space:nowrap">Siguiente camino</button>`); cam.querySelector('#otra').addEventListener('click',armar);
    },500+etapas.length*750+300);
  }
  function paso(dt){
    const s=st, k=s.k, ahora=performance.now()/1000, dir=(ctl.r||tec.ArrowRight?1:0)-(ctl.l||tec.ArrowLeft?1:0);
    /* plataformas que se mueven: llevan al animalito si va encima */
    for (const o of s.sol){ if (!o.movil) continue; let nx=o.x+o.v*dt; if (nx>o.x1){ nx=o.x1; o.v=-Math.abs(o.v); } else if (nx<o.x0){ nx=o.x0; o.v=Math.abs(o.v); }
      if (s.sobre===o && s.piso) s.px+=nx-o.x; o.x=nx; if (o.el) o.el.style.transform=`translate3d(${nx}px,0,0)`; }
    /* bichos: caminan de un lado a otro; la abeja sube y baja */
    for (const o of s.peligros){ if (!o.el) continue;
      if (o.vuela){ o.y=o.y0+Math.sin(ahora*1.6+o.fase)*s.T*.45; }
      else { o.x+=o.v*o.dir*dt; if (o.x>o.b){ o.x=o.b; o.dir=-1; } else if (o.x<o.a){ o.x=o.a; o.dir=1; } }
      o.el.style.transform=`translate3d(${o.x-o.w/2}px,${o.y-o.h}px,0)`; o.el.firstElementChild.style.transform=`scaleX(${o.dir>0?-1:1})`; }
    if (!s.fin){ s.vx = ahora<s.empT ? s.emp : dir*210*k; if(dir && ahora>=s.empT) s.mira=dir; }
    if (s.inv && ahora>=s.inv){ s.inv=0; s.pj.style.opacity='1'; }
    if (s.piso) s.tPiso=ahora;
    if (!s.fin && ctl.salto>0 && ahora-ctl.salto<.14 && ahora-s.tPiso<.12){ s.vy=-680*k; s.piso=false; ctl.salto=-1; s.tPiso=-1; note(520,.08,'sine',.06); }
    s.vy=Math.min(s.vy+1750*k*dt,900*k);
    const mw=16*k, mh=44*k;
    /* horizontal: choca con suelo y cajas */
    let nx=Math.max(mw+2,Math.min(s.WW-mw-2,s.px+s.vx*dt));
    for (const o of s.sol){ if (o.paso) continue; if (s.py>o.y+2 && s.py-mh<o.y+o.h){ if (s.vx>0 && s.px+mw<=o.x && nx+mw>o.x) nx=o.x-mw; else if (s.vx<0 && s.px-mw>=o.x+o.w && nx-mw<o.x+o.w) nx=o.x+o.w+mw; } }
    /* vertical */
    let ny=s.py+s.vy*dt; s.piso=false; s.sobre=null; const pie=14*k;
    for (const o of s.sol){ if (nx+pie<=o.x || nx-pie>=o.x+o.w) continue;
      if (s.vy>=0 && s.py<=o.y+.5 && ny>=o.y){ ny=o.y; if (o.resorte){ s.vy=-1010*k; note(392,.18,'triangle',.08); } else { s.vy=0; s.piso=true; s.sobre=o; if (o.suelo && nx>o.x+30*k && nx<o.x+o.w-30*k) s.seg={x:nx,y:o.y}; } }
      else if (s.vy<0 && !o.paso && s.py-mh>=o.y+o.h && ny-mh<o.y+o.h){ ny=o.y+o.h+mh; s.vy=0; } }
    s.px=nx; s.py=ny;
    if (s.py>s.H+90){ /* cayó al arroyo: pierde un corazón y vuelve a la orilla */ s.inv=0; tropiezo('arroyo',0); s.px=s.seg.x; s.py=s.seg.y; s.vy=0; s.emp=0; s.empT=0; if (s.fin) return pintar(); }
    for (const o of s.peligros){ if (Math.abs(s.px-o.x)<o.w/2+9*k && s.py>o.y-o.h+4*k && s.py-mh<o.y-3*k){ tropiezo(o.quien, s.px<o.x?-1:1); break; } }
    for (const it of s.items){ if (!it.ok && Math.abs(it.x-s.px)<30*k && Math.abs(it.y-(s.py-24*k))<34*k) recoger(it); }
    if (!s.fin && Math.abs(s.px-s.mx)<46*k && s.piso) llegar();
    /* el animalito sigue al niño: va detrás, por donde el niño pasó hace un momento (así también salta) */
    if (s.pet){ s.hist.push([s.px,s.py,ahora]); while (s.hist.length>2 && ahora-s.hist[1][2]>.22) s.hist.shift(); const [hx,hy]=s.hist[0], tx=hx-s.mira*30*k, ox=s.qx;
      s.qx+=(tx-s.qx)*Math.min(1,dt*8); s.qy=hy; s.qmov=Math.abs(s.qx-ox)>.4; if (s.qmov) s.qm=s.qx>ox?1:-1; }
    const cx=Math.max(0,Math.min(s.WW-s.W,s.px-s.W*.38)); s.cx += (cx-s.cx)*Math.min(1,dt*8);
    pintar();
  }
  let t0=0; const bucle=t=>{ if(!vivo) return; const dt=Math.min(.033,(t-t0)/1000||0); t0=t; if(st) paso(dt); raf=requestAnimationFrame(bucle); };
  const saltar=()=>{ ctl.salto=performance.now()/1000; };
  const sostener=(sel,n)=>{ const b=root.querySelector(sel); const on=e=>{ e.preventDefault(); ctl[n]=true; try{ b.setPointerCapture(e.pointerId); }catch(_){} }, off=()=>{ ctl[n]=false; };
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
  toyCamino._estado=()=>st;   /* para pruebas: estado del intento en curso */
  return ()=>{ vivo=false; cancelAnimationFrame(raf); window.removeEventListener('keydown',kd); window.removeEventListener('keyup',ku); window.removeEventListener('resize',rz); clearTimeout(tr); };
}
TOYS.push({id:'camino', name:'El camino de la semilla', icon:'🌱', c:'sage', open:toyCamino, hi:'Camina y salta. Recoge semillas, agua y sol, y cuida tus corazones.', hi2:'Recoge semillas, agua y sol, forma la palabra y cuida tus corazones.'});
if (window.TOY_ILU) window.TOY_ILU.camino='girasol';
