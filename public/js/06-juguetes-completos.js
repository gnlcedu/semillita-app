/* Semillita · Versiones completas: Pintar, Mi jardín, Música, Acuario, Bloques */
/* =========================================================
   VERSIONES COMPLETAS: Pintar, Mi jardín, Música, Acuario, Bloques
   ========================================================= */

/* ---------- 1. PINTAR (completo) ---------- */
const STAR=(cx,cy,R,r,n=5)=>Array.from({length:n*2},(_,i)=>{const a=i/(n*2)*Math.PI*2-Math.PI/2, rr=i%2?r:R; return `${(cx+rr*Math.cos(a)).toFixed(1)},${(cy+rr*Math.sin(a)).toFixed(1)}`;}).join(' ');
const COLORING={
 casa:['Casa',`<rect x="70" y="140" width="160" height="120"/><path d="M52 146 L150 58 L248 146Z"/><path d="M188 98 V64 H210 V118"/><rect x="132" y="192" width="40" height="68"/><circle cx="164" cy="228" r="3"/><rect x="85" y="160" width="36" height="36"/><path d="M103 160v36M85 178h36"/><rect x="180" y="160" width="36" height="36"/><path d="M198 160v36M180 178h36"/><circle cx="42" cy="44" r="22"/><path d="M42 12v-8M42 76v8M10 44h-8M74 44h8M20 22l-6-6M64 66l6 6M64 22l6-6M20 66l-6 6"/><path d="M0 262H300"/><circle cx="270" cy="200" r="24"/><rect x="264" y="224" width="12" height="38"/><path d="M110 40q14-14 28 0q14-10 22 4q-25 6-50-4Z"/>`],
 mariposa:['Mariposa',`<path d="M138 128 C80 36 14 70 38 130 C54 166 110 160 138 146Z"/><path d="M162 128 C220 36 286 70 262 130 C246 166 190 160 162 146Z"/><path d="M140 168 C90 168 58 220 90 246 C116 264 140 220 142 190Z"/><path d="M160 168 C210 168 242 220 210 246 C184 264 160 220 158 190Z"/><ellipse cx="150" cy="160" rx="12" ry="70"/><circle cx="150" cy="80" r="16"/><circle cx="84" cy="110" r="17"/><circle cx="216" cy="110" r="17"/><circle cx="102" cy="216" r="11"/><circle cx="198" cy="216" r="11"/><path d="M144 66 Q130 30 112 24 M156 66 Q170 30 188 24"/><circle cx="110" cy="23" r="6"/><circle cx="190" cy="23" r="6"/>`],
 pez:['Pez',`<path d="M56 150 C100 78 200 78 230 150 C200 222 100 222 56 150Z"/><path d="M230 150 L286 104 L274 150 L286 196Z"/><circle cx="94" cy="138" r="11"/><path d="M124 112 Q142 150 124 188"/><path d="M128 98 Q160 52 194 102"/><path d="M140 205 Q160 240 180 205"/><circle cx="40" cy="96" r="9"/><circle cx="28" cy="64" r="13"/><circle cx="52" cy="38" r="7"/><path d="M250 290 Q236 260 252 236 Q264 212 250 190"/><path d="M20 292 Q8 266 22 244"/><path d="M0 290H300"/>`],
 flor:['Flor',`${Array.from({length:8},(_,i)=>`<ellipse cx="150" cy="58" rx="18" ry="34" transform="rotate(${i*45} 150 110)"/>`).join('')}<circle cx="150" cy="110" r="25"/><path d="M150 136 Q144 210 150 284"/><path d="M148 222 Q100 190 94 232 Q120 248 148 234Z"/><path d="M152 252 Q202 222 206 262 Q180 274 152 264Z"/><path d="M0 284H300"/>`],
 cohete:['Cohete',`<path d="M150 26 C192 68 196 150 186 210 H114 C104 150 108 68 150 26Z"/><circle cx="150" cy="108" r="24"/><circle cx="150" cy="108" r="14"/><path d="M114 166 L76 232 L118 216Z"/><path d="M186 166 L224 232 L182 216Z"/><rect x="128" y="210" width="44" height="16"/><path d="M132 226 Q150 296 168 226Z"/><path d="M125 160 H175"/><polygon points="${STAR(50,60,18,8)}"/><polygon points="${STAR(250,90,14,6)}"/><polygon points="${STAR(240,250,16,7)}"/><circle cx="60" cy="200" r="22"/><path d="M48 192a6 6 0 1 0 0.1 0"/>`],
 helado:['Helado',`<path d="M104 162 L150 286 L196 162Z"/><path d="M114 190 L182 190 M124 218 L172 218 M134 246 L164 246"/><circle cx="118" cy="140" r="33"/><circle cx="182" cy="140" r="33"/><circle cx="150" cy="98" r="36"/><circle cx="150" cy="52" r="12"/><path d="M152 40 Q160 22 174 18"/><path d="M60 280 Q40 260 54 240 M246 280 Q266 260 250 238"/>`],
 tortuga:['Tortuga',`<path d="M56 192 C56 96 244 96 244 192Z"/><polygon points="150,120 176,134 176,162 150,176 124,162 124,134"/><path d="M150 120 V100 M176 134 L204 124 M176 162 L210 176 M124 162 L90 176 M124 134 L96 124 M150 176 V192"/><circle cx="268" cy="174" r="22"/><circle cx="276" cy="168" r="4"/><ellipse cx="92" cy="206" rx="20" ry="13"/><ellipse cx="208" cy="206" rx="20" ry="13"/><path d="M56 186 L30 196 L56 200"/><path d="M0 222H300"/><circle cx="60" cy="50" r="24"/>`],
 mandala:['Mandala',`<circle cx="150" cy="150" r="128"/><circle cx="150" cy="150" r="92"/><circle cx="150" cy="150" r="56"/><circle cx="150" cy="150" r="22"/>${Array.from({length:12},(_,i)=>`<ellipse cx="150" cy="80" rx="13" ry="26" transform="rotate(${i*30} 150 150)"/><circle cx="150" cy="34" r="9" transform="rotate(${i*30+15} 150 150)"/>`).join('')}${Array.from({length:8},(_,i)=>`<path d="M150 128 Q160 112 150 98 Q140 112 150 128Z" transform="rotate(${i*45} 150 150)"/>`).join('')}`],
 carro:['Carro',`<path d="M28 204 V162 Q28 146 48 143 L88 140 L120 100 H210 L246 140 Q276 146 276 168 V204Z"/><path d="M128 110 H164 V140 H100Z"/><path d="M174 110 H206 L234 140 H174Z"/><circle cx="86" cy="206" r="28"/><circle cx="86" cy="206" r="12"/><circle cx="222" cy="206" r="28"/><circle cx="222" cy="206" r="12"/><circle cx="262" cy="160" r="7"/><path d="M0 236H300"/><path d="M30 60q15-18 32 0q16-12 26 6q-30 8-58-6Z"/>`],
 playa:['Playa',`<circle cx="240" cy="62" r="30"/><path d="M240 18v-10M240 106v10M196 62h-10M284 62h10"/><path d="M82 282 Q70 200 96 128 L110 131 Q90 200 102 282Z"/><path d="M103 128 Q60 90 30 112 Q66 102 100 132Z"/><path d="M103 128 Q120 76 160 80 Q124 100 106 132Z"/><path d="M103 128 Q150 120 170 150 Q132 128 104 134Z"/><path d="M103 128 Q80 70 50 70 Q86 92 100 130Z"/><circle cx="114" cy="140" r="7"/><circle cx="100" cy="144" r="7"/><path d="M0 222 Q25 208 50 222 T100 222 T150 222 T200 222 T250 222 T300 222"/><path d="M190 200 H262 L250 214 H202Z"/><path d="M226 200 V140 L256 196Z"/><path d="M0 260 Q40 250 80 262"/>`],
 cotorra:['Cotorra',`<rect x="36" y="258" width="236" height="16" rx="8"/><ellipse cx="54" cy="252" rx="18" ry="8"/><ellipse cx="256" cy="252" rx="18" ry="8"/><path d="M128 250 L108 296 L130 292 L142 256Z"/><path d="M142 254 L140 298 L160 292 L154 254Z"/><path d="M122 118 C88 150 88 224 126 252 C152 270 188 256 194 224 C200 186 184 146 160 122Z"/><path d="M128 140 C104 176 110 224 146 246 C152 210 154 172 142 142Z"/><path d="M122 180 Q132 190 146 186 M124 206 Q136 216 148 210"/><circle cx="160" cy="94" r="42"/><path d="M136 66 Q160 50 184 64 Q170 76 148 78Z"/><path d="M196 80 C228 78 236 112 212 134 C214 118 206 110 194 110Z"/><circle cx="172" cy="88" r="9"/><circle cx="174" cy="86" r="3"/><path d="M140 252 q4 10 10 8 M164 252 q4 10 10 8"/><circle cx="56" cy="56" r="20"/><path d="M56 26v-10M56 86v10M26 56h-10M86 56h10M35 35l-7-7M77 77l7 7M77 35l7-7M35 77l-7 7"/>`],
 dino:['Dinosaurio',`<path d="M64 182 C34 186 16 210 4 228 C30 226 56 214 72 204Z"/><rect x="84" y="210" width="28" height="64" rx="12"/><rect x="116" y="214" width="26" height="60" rx="12"/><rect x="168" y="210" width="28" height="64" rx="12"/><rect x="198" y="206" width="26" height="66" rx="12"/><ellipse cx="146" cy="188" rx="84" ry="50"/><path d="M196 148 C208 118 210 92 218 71"/><path d="M222 167 C232 136 238 104 248 76"/><ellipse cx="240" cy="56" rx="32" ry="21"/><circle cx="250" cy="50" r="5"/><path d="M252 66 q8 5 16 -2"/><circle cx="118" cy="168" r="13"/><circle cx="156" cy="156" r="9"/><circle cx="98" cy="196" r="8"/><circle cx="176" cy="196" r="10"/><path d="M0 276H300"/><circle cx="52" cy="54" r="20"/><path d="M52 24v-10M52 84v10M22 54h-10M82 54h10M31 33l-7-7M73 75l7 7M73 33l7-7M31 75l-7 7"/><path d="M270 276 Q262 250 276 236 M282 276 Q288 254 298 246"/>`]
};
function toyPaint2(root){
  const COLS=['#000000','#4A4658','#8C879A','#FFFFFF','#E8505B','#F4A6A6','#F28C38','#F7C59F','#F7C948','#F6E39A','#9ACD32','#4CAF6A','#B9E3C6','#2E8B57','#3D8BD9','#A9D3F0','#1F4FA3','#8E5BB5','#C9B8EE','#F49AC1','#D2232A','#8B5E3C','#D9B38C','#E2B13C'];
  const BR=[['lapiz','✏️','Lápiz'],['crayon','🖍️','Crayón'],['marcador','🖊️','Marcador'],['pincel','🖌️','Pincel'],['aerosol','💨','Aerosol'],['arcoiris','🌈','Arcoíris'],['brillo','✨','Brillitos'],['borrador','🧽','Borrador']];
  const TOOLS=[['fill','🪣','Rellenar'],['stamp','⭐','Sellos'],['shape','🔷','Figuras']];
  const STAMPS=['⭐','🌸','❤️','🦋','🐟','☀️','🌈','🐞','🌴','🍎','🐶','🐱','🦄','🚗','🎈','🌙','⚽','🍦','🌻','🐢','🎵','👑','💎','🍕'];
  const SHAPES=[['circulo','⚪'],['cuadrado','⬜'],['estrella','⭐'],['corazon','🤍'],['triangulo','🔺'],['linea','➖']];
  let col='#E8505B', size=14, mode='brush', brush='lapiz', stamp=STAMPS[0], shape='circulo', sym=false, hue=0, page=null;
  const undo=[], redo=[];
  addHTML(root, `<div id="cw" class="abs" style="left:0;right:0;top:0;bottom:118px;background:var(--card);overflow:hidden;touch-action:none">
      <div id="zv" class="abs" style="left:0;top:0;width:100%;height:100%;transform-origin:0 0;will-change:transform"><canvas id="c1" class="abs" style="inset:0;width:100%;height:100%"></canvas><canvas id="c2" class="abs" style="inset:0;width:100%;height:100%;pointer-events:none"></canvas><canvas id="c3" class="abs" style="inset:0;width:100%;height:100%;touch-action:none"></canvas></div>
      <div id="zm" class="fl" style="left:10px;right:auto;top:auto;bottom:10px;flex-direction:row;align-items:center"><button id="zh" aria-label="Mover la hoja" aria-pressed="false"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18M3 12h18M12 3l-3 3M12 3l3 3M12 21l-3-3M12 21l3-3M3 12l3-3M3 12l3 3M21 12l-3-3M21 12l-3 3"/></svg></button><button id="zo" aria-label="Alejar" disabled>−</button><button id="zr" aria-label="Tamaño normal" style="width:auto;min-width:56px;padding:0 var(--s-2);font-size:var(--fs-sm)">1×</button><button id="zi" aria-label="Acercar">+</button></div></div>
    <div class="fl"><button id="un" title="Deshacer" aria-label="Deshacer">${kic('deshacer')}</button><button id="re" title="Rehacer" aria-label="Rehacer"><span style="display:inline-block;transform:scaleX(-1)">${kic('deshacer')}</span></button><button id="pg" title="Dibujos">🖼️</button><button id="sy" title="Simetría">🪞</button><button id="sv" title="Guardar">💾</button><button id="ga" title="Galería">🗂️</button><button id="nw" title="Hoja nueva" aria-label="Hoja nueva">${kic('borrar')}</button></div>
    <div class="pbar"><div class="prow" id="r1"></div><div class="prow" id="r2"></div></div>`);
  const cw=root.querySelector('#cw'), c1=root.querySelector('#c1'), c2=root.querySelector('#c2'), c3=root.querySelector('#c3');
  const x1=c1.getContext('2d',{willReadFrequently:true}), x2=c2.getContext('2d',{willReadFrequently:true}), x3=c3.getContext('2d'); let dpr=1, W=0, H=0;
  /* resolución de la hoja: hasta 3 puntos por píxel de pantalla, con tope de ~2,6 millones de puntos por capa para no agotar la memoria */
  function fit(){ const r=cw.getBoundingClientRect(); W=r.width; H=r.height; dpr=Math.max(Math.min(2,window.devicePixelRatio||1), Math.min(3, Math.sqrt(2.6e6/Math.max(1,W*H)))); [c1,c2,c3].forEach(c=>{ c.width=W*dpr; c.height=H*dpr; }); [x1,x2,x3].forEach(x=>{ x.setTransform(dpr,0,0,dpr,0,0); x.lineCap='round'; x.lineJoin='round'; }); x1.fillStyle='#fff'; x1.fillRect(0,0,W,H); }
  fit();
  const snap=()=>{ undo.push(x1.getImageData(0,0,c1.width,c1.height)); if(undo.length>10) undo.shift(); redo.length=0; };
  function r1(){ const R=root.querySelector('#r1');
    R.innerHTML=BR.map(b=>`<button data-b="${b[0]}" class="${mode==='brush'&&brush===b[0]?'on':''}">${b[1]}</button>`).join('')+'<span class="sep" style="flex:none;width:2px;height:28px;background:var(--line)"></span>'+TOOLS.map(t=>`<button data-t="${t[0]}" class="${mode===t[0]?'on':''}">${t[1]}</button>`).join('')+
      `<input type="range" class="sz" id="szr" min="1" max="60" value="${size}" aria-label="Tamaño"><span id="szp" style="flex:none;display:inline-block;width:${Math.min(40,size)}px;height:${Math.min(40,size)}px;border-radius:50%;background:${col};border:1px solid var(--line)"></span>`;
    R.querySelectorAll('[data-b]').forEach(b=>b.addEventListener('click',()=>{ mode='brush'; brush=b.dataset.b; r1(); r2(); tsay(BR.find(x=>x[0]===brush)[2]); }));
    R.querySelectorAll('[data-t]').forEach(b=>b.addEventListener('click',()=>{ mode=b.dataset.t; r1(); r2(); tsay(TOOLS.find(x=>x[0]===mode)[2]); }));
    R.querySelector('#szr').addEventListener('input',e=>{ size=+e.target.value; const p=R.querySelector('#szp'); p.style.width=p.style.height=Math.min(40,size)+'px'; });
  }
  function r2(){ const R=root.querySelector('#r2');
    if (mode==='stamp') R.innerHTML=STAMPS.map(s=>`<button data-s="${s}" class="${stamp===s?'on':''}">${s}</button>`).join('');
    else if (mode==='shape') R.innerHTML=SHAPES.map(s=>`<button data-sh="${s[0]}" class="${shape===s[0]?'on':''}">${s[1]}</button>`).join('')+COLS.map(c=>`<button class="cc ${c===col?'on':''}" data-c="${c}" style="background:${c}"></button>`).join('');
    else R.innerHTML=COLS.map(c=>`<button class="cc ${c===col?'on':''}" data-c="${c}" style="background:${c}" aria-label="color"></button>`).join('')+`<label style="flex:none;position:relative;width:38px;height:38px;border-radius:50%;background:conic-gradient(red,yellow,lime,cyan,blue,magenta,red);border:3px solid var(--white);box-shadow:0 0 0 2px var(--line)"><input type="color" id="cp" value="${col}" style="opacity:0;position:absolute;inset:0;width:100%;height:100%"></label>`;
    R.querySelectorAll('[data-c]').forEach(b=>b.addEventListener('click',()=>{ col=b.dataset.c; if(brush==='borrador'&&mode==='brush') brush='lapiz'; r1(); r2(); }));
    R.querySelectorAll('[data-s]').forEach(b=>b.addEventListener('click',()=>{ stamp=b.dataset.s; r2(); }));
    R.querySelectorAll('[data-sh]').forEach(b=>b.addEventListener('click',()=>{ shape=b.dataset.sh; r2(); }));
    const cp=R.querySelector('#cp'); if (cp) cp.addEventListener('input',e=>{ col=e.target.value; r1(); });
  }
  r1(); r2();
  /* grosor efectivo: el tamaño elegido es el que se ve en pantalla; con zoom el trazo sobre la hoja es más fino */
  const efectivo=()=>size/z;
  /* pinceles */
  const pts=(p)=> sym ? [p,{x:W-p.x,y:p.y}] : [p];
  function seg(a,b){
    const size=efectivo(), px=1/z;
    const pa=pts(a), pb=pts(b);
    pa.forEach((A,k)=>{ const B=pb[k]; x1.save();
      if (brush==='lapiz'||brush==='borrador'||brush==='marcador'||brush==='arcoiris'){
        x1.globalAlpha = brush==='marcador'?.35:1; x1.strokeStyle = brush==='borrador'?'#fff':brush==='arcoiris'?`hsl(${hue},85%,60%)`:col; x1.lineWidth = brush==='marcador'?size*1.6:brush==='borrador'?size*1.8:size;
        x1.beginPath(); x1.moveTo(A.x,A.y); x1.lineTo(B.x,B.y); x1.stroke(); }
      else if (brush==='pincel'){ const d=Math.hypot(B.x-A.x,B.y-A.y); x1.strokeStyle=col; x1.lineWidth=Math.max(2*px,size*1.3-d*.6); x1.globalAlpha=.9; x1.beginPath(); x1.moveTo(A.x,A.y); x1.lineTo(B.x,B.y); x1.stroke(); }
      else { const d=Math.hypot(B.x-A.x,B.y-A.y), n=Math.max(1,Math.ceil(d/Math.max(2*px,size/4)));
        for (let i=0;i<=n;i++){ const x=A.x+(B.x-A.x)*i/n, y=A.y+(B.y-A.y)*i/n;
          if (brush==='crayon'){ x1.fillStyle=col; for(let k=0;k<5;k++){ x1.globalAlpha=.25+Math.random()*.5; x1.fillRect(x+(Math.random()-.5)*size, y+(Math.random()-.5)*size, 1.6*px, (1.6+Math.random()*2)*px); } }
          if (brush==='aerosol'){ x1.fillStyle=col; for(let k=0;k<8;k++){ const a=Math.random()*Math.PI*2, r=Math.random()*size*1.4; x1.globalAlpha=.6; x1.fillRect(x+Math.cos(a)*r,y+Math.sin(a)*r,1.5*px,1.5*px); } }
          if (brush==='brillo' && i%2===0){ x1.globalAlpha=1; x1.fillStyle=pick(['#F6C34A','#F49AC1','#A9D3F0','#fff','#C9B8EE',col]); const s=2*px+Math.random()*size/3; x1.beginPath(); x1.moveTo(x+(Math.random()-.5)*size,y+(Math.random()-.5)*size); const cx=x+(Math.random()-.5)*size, cy=y+(Math.random()-.5)*size; x1.beginPath(); for(let j=0;j<8;j++){ const rr=j%2?s*.35:s, aa=j/8*Math.PI*2; x1.lineTo(cx+Math.cos(aa)*rr, cy+Math.sin(aa)*rr); } x1.fill(); } } }
      x1.restore(); });
    hue=(hue+4)%360;
  }
  /* rellenar */
  function hex2rgb(h){ const n=parseInt(h.slice(1),16); return [n>>16,n>>8&255,n&255]; }
  function flood(px,py){
    const w=c1.width, h=c1.height, X=Math.floor(px*dpr), Y=Math.floor(py*dpr); if (X<0||Y<0||X>=w||Y>=h) return;
    const im=x1.getImageData(0,0,w,h), d=im.data, ln=x2.getImageData(0,0,w,h).data; const i0=(Y*w+X)*4; if (ln[i0+3]>90) return;
    const [r0,g0,b0]=[d[i0],d[i0+1],d[i0+2]], [r,g,b]=hex2rgb(col); if (Math.abs(r0-r)+Math.abs(g0-g)+Math.abs(b0-b)<8) return;
    const tol=60, seen=new Uint8Array(w*h), st=[X+Y*w];
    const ok=k=>{ if(seen[k]) return false; const j=k*4; if (ln[j+3]>90) return false; return Math.abs(d[j]-r0)+Math.abs(d[j+1]-g0)+Math.abs(d[j+2]-b0)<=tol; };
    while(st.length){ const k=st.pop(); if(!ok(k)) continue; seen[k]=1; const j=k*4; d[j]=r; d[j+1]=g; d[j+2]=b; d[j+3]=255; const x=k%w;
      if (x>0) st.push(k-1); if (x<w-1) st.push(k+1); if (k>=w) st.push(k-w); if (k<w*(h-1)) st.push(k+w); }
    // borde suave: pinta también 1 px vecino a las líneas
    x1.putImageData(im,0,0);
  }
  /* figuras */
  function drawShape(ctx,a,b){ const size=efectivo(), x=Math.min(a.x,b.x), y=Math.min(a.y,b.y), w=Math.abs(b.x-a.x), h=Math.abs(b.y-a.y), cx=x+w/2, cy=y+h/2; ctx.save(); ctx.fillStyle=col; ctx.strokeStyle=col; ctx.lineWidth=size;
    ctx.beginPath();
    if (shape==='circulo') ctx.ellipse(cx,cy,w/2,h/2,0,0,Math.PI*2);
    else if (shape==='cuadrado') ctx.rect(x,y,w,h);
    else if (shape==='triangulo'){ ctx.moveTo(cx,y); ctx.lineTo(x+w,y+h); ctx.lineTo(x,y+h); ctx.closePath(); }
    else if (shape==='estrella'){ for(let i=0;i<10;i++){ const aa=i/10*Math.PI*2-Math.PI/2, rr=i%2?.4:1; ctx.lineTo(cx+Math.cos(aa)*w/2*rr, cy+Math.sin(aa)*h/2*rr); } ctx.closePath(); }
    else if (shape==='corazon'){ ctx.moveTo(cx,y+h*.95); ctx.bezierCurveTo(x-w*.05,y+h*.55,x+w*.05,y-h*.05,cx,y+h*.28); ctx.bezierCurveTo(x+w*.95,y-h*.05,x+w*1.05,y+h*.55,cx,y+h*.95); }
    else { ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke(); ctx.restore(); return; }
    ctx.fill(); ctx.restore(); }
  /* zoom: la hoja se agranda hasta 5 veces. Con un dedo se pinta; con dos se pellizca para acercar y se arrastra
     para moverse. Botones + y − (y 1× para volver) y rueda del ratón, que acerca hacia el puntero. El dibujo no cambia
     de tamaño: solo cambia cómo se ve. */
  const zv=root.querySelector('#zv'), ZMAX=5; let z=1, tx=0, ty=0;
  const rel=(c,e)=>{ const r=c.getBoundingClientRect(); return {x:(e.clientX-r.left)*W/r.width, y:(e.clientY-r.top)*H/r.height}; };
  function verZoom(){ z=Math.max(1,Math.min(ZMAX,z)); tx=Math.min(0,Math.max(W-W*z,tx)); ty=Math.min(0,Math.max(H-H*z,ty));
    zv.style.transform=`translate(${tx}px,${ty}px) scale(${z})`; root.querySelector('#zr').textContent=(Math.round(z*10)/10)+'×';
    root.querySelector('#zo').disabled=z<=1.001; root.querySelector('#zi').disabled=z>=ZMAX-.001; }
  function zoomEn(nz,cx,cy){ nz=Math.max(1,Math.min(ZMAX,nz)); const wx=(cx-tx)/z, wy=(cy-ty)/z; tx=cx-wx*nz; ty=cy-wy*nz; z=nz; verZoom(); }
  root.querySelector('#zi').addEventListener('click',()=>zoomEn(z*1.5,W/2,H/2));
  root.querySelector('#zo').addEventListener('click',()=>zoomEn(z/1.5,W/2,H/2));
  root.querySelector('#zr').addEventListener('click',()=>{ z=1; tx=ty=0; verZoom(); });
  cw.addEventListener('wheel',e=>{ e.preventDefault(); const r=cw.getBoundingClientRect(); zoomEn(z*Math.exp(-e.deltaY*.0015),e.clientX-r.left,e.clientY-r.top); },{passive:false});
  /* mano: con un dedo (o el ratón) se arrastra la hoja en vez de pintar. También mueve el botón central del ratón. */
  let mano=false, arrastre=null;
  const zh=root.querySelector('#zh');
  zh.addEventListener('click',()=>{ mano=!mano; zh.classList.toggle('on',mano); zh.setAttribute('aria-pressed',mano); c3.style.cursor=mano?'grab':'';
    tsay(mano ? (z>1.001?'Arrastra para mover la hoja. Toca la mano otra vez para pintar.':'Acerca la hoja con + para poder moverla.') : 'A pintar'); });
  const dedos=new Map(); let pinza=null, t0=0;
  const centro=()=>{ const r=cw.getBoundingClientRect(), [a,b]=[...dedos.values()]; return {x:(a.x+b.x)/2-r.left, y:(a.y+b.y)/2-r.top, d:Math.hypot(a.x-b.x,a.y-b.y)||1}; };
  c3.addEventListener('pointerdown',e=>{ dedos.set(e.pointerId,{x:e.clientX,y:e.clientY}); try{c3.setPointerCapture(e.pointerId);}catch(_){}
    if (dedos.size===2){ /* empieza el pellizco: se deshace lo que alcanzó a pintar el primer dedo */
      if ((drawing || performance.now()-t0<350) && undo.length){ x1.putImageData(undo.pop(),0,0); }
      drawing=false; if (mode==='shape') x3.clearRect(0,0,W,H);
      const c=centro(); pinza={c, z, tx, ty}; e.preventDefault(); return; }
    if (dedos.size>2 || pinza) return;
    if ((mano || e.button===1) && dedos.size===1){ e.preventDefault(); e.stopImmediatePropagation(); arrastre={x:e.clientX,y:e.clientY,tx,ty}; c3.style.cursor='grabbing'; return; }
    t0=performance.now(); }, true);
  c3.addEventListener('pointermove',e=>{ if (dedos.has(e.pointerId)) dedos.set(e.pointerId,{x:e.clientX,y:e.clientY});
    if (arrastre && !pinza){ e.stopImmediatePropagation(); tx=arrastre.tx+(e.clientX-arrastre.x); ty=arrastre.ty+(e.clientY-arrastre.y); verZoom(); return; }
    if (pinza && dedos.size>=2){ e.stopImmediatePropagation(); arrastre=null; const c=centro(), nz=Math.max(1,Math.min(ZMAX,pinza.z*c.d/pinza.c.d));
      const wx=(pinza.c.x-pinza.tx)/pinza.z, wy=(pinza.c.y-pinza.ty)/pinza.z; tx=c.x-wx*nz; ty=c.y-wy*nz; z=nz; verZoom(); } }, true);
  const soltar=e=>{ dedos.delete(e.pointerId); if (pinza && dedos.size===0) pinza=null; if (arrastre && dedos.size===0){ arrastre=null; c3.style.cursor=mano?'grab':''; } };
  c3.addEventListener('pointerup',soltar); c3.addEventListener('pointercancel',soltar);
  let drawing=false, last=null, start=null;
  c3.addEventListener('pointerdown',e=>{ e.preventDefault(); if (pinza || dedos.size>1) return; const p=rel(c3,e);
    if (mode==='fill'){ snap(); flood(p.x,p.y); if(sym) flood(W-p.x,p.y); popS(); return; }
    if (mode==='stamp'){ snap(); pts(p).forEach(q=>{ x1.save(); x1.font=`${(size*2+22)/z}px serif`; x1.textAlign='center'; x1.textBaseline='middle'; x1.fillText(stamp,q.x,q.y); x1.restore(); }); popS(); return; }
    snap(); drawing=true; last=p; start=p; if (mode==='brush') seg(p,{x:p.x+.1,y:p.y+.1}); });
  c3.addEventListener('pointermove',e=>{ if(!drawing || pinza) return; const p=rel(c3,e);
    if (mode==='shape'){ x3.clearRect(0,0,W,H); drawShape(x3,start,p); if(sym) drawShape(x3,{x:W-start.x,y:start.y},{x:W-p.x,y:p.y}); return; }
    seg(last,p); last=p; });
  const end=e=>{ if(!drawing) return; drawing=false; if (mode==='shape'){ const p=rel(c3,e); x3.clearRect(0,0,W,H); drawShape(x1,start,p); if(sym) drawShape(x1,{x:W-start.x,y:start.y},{x:W-p.x,y:p.y}); } };
  c3.addEventListener('pointerup',end); c3.addEventListener('pointercancel',end);
  c3.addEventListener('auxclick',e=>e.preventDefault());
  /* botones laterales */
  const fl=id=>root.querySelector('#'+id);
  fl('un').addEventListener('click',()=>{ if(!undo.length) return; redo.push(x1.getImageData(0,0,c1.width,c1.height)); x1.putImageData(undo.pop(),0,0); });
  fl('re').addEventListener('click',()=>{ if(!redo.length) return; undo.push(x1.getImageData(0,0,c1.width,c1.height)); x1.putImageData(redo.pop(),0,0); });
  fl('sy').addEventListener('click',e=>{ sym=!sym; e.currentTarget.classList.toggle('on',sym); x3.clearRect(0,0,W,H); if(sym){ x3.save(); x3.setLineDash([6,8]); x3.strokeStyle='#C9B8EE'; x3.lineWidth=2; x3.beginPath(); x3.moveTo(W/2,0); x3.lineTo(W/2,H); x3.stroke(); x3.restore(); } tsay(sym?'Simetría: lo que pintes se copia del otro lado':'Simetría apagada'); });
  fl('nw').addEventListener('click',()=>{ snap(); x1.fillStyle='#fff'; x1.fillRect(0,0,W,H); x2.clearRect(0,0,W,H); page=null; tsay('¡Hoja nueva!'); });
  function loadPage(k){ const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="-6 -6 312 312"><g fill="none" stroke="#111" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round">${COLORING[k][1]}</g></svg>`;
    const img=new Image(); img.onload=()=>{ snap(); x1.fillStyle='#fff'; x1.fillRect(0,0,W,H); x2.clearRect(0,0,W,H); const s=Math.min(W,H)*.94; x2.drawImage(img,(W-s)/2,(H-s)/2,s,s); page=k; mode='fill'; z=1; tx=ty=0; verZoom(); r1(); r2(); tsay(`${COLORING[k][0]}. Usa el balde 🪣 para rellenar`); };
    img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg); }
  function sheet(html){ const o=document.createElement('div'); o.className='ov'; o.innerHTML=`<div class="sheet">${html}</div>`; o.addEventListener('click',e=>{ if(e.target===o) o.remove(); }); root.appendChild(o); return o; }
  fl('pg').addEventListener('click',()=>{ const o=sheet(`<h3 style="margin-bottom:var(--s-3)">🖼️ Dibujos para colorear</h3><div class="thumbs">${Object.entries(COLORING).map(([k,[n,s]])=>`<button data-k="${k}"><svg viewBox="-6 -6 312 312"><g fill="none" stroke="#111" stroke-width="7" stroke-linejoin="round">${s}</g></svg>${n}</button>`).join('')}</div>`);
    o.querySelectorAll('[data-k]').forEach(b=>b.addEventListener('click',()=>{ o.remove(); loadPage(b.dataset.k); })); });
  const GK=()=>'semillita.gal.'+prof().id;
  const getGal=()=>{ try{ return JSON.parse(localStorage.getItem(GK())||'[]'); }catch(e){ return []; } };
  fl('sv').addEventListener('click',()=>{ const t=document.createElement('canvas'); const sc=Math.min(1,520/Math.max(c1.width,c1.height)); t.width=c1.width*sc; t.height=c1.height*sc; const tx=t.getContext('2d'); tx.drawImage(c1,0,0,t.width,t.height); tx.drawImage(c2,0,0,t.width,t.height);
    const g=getGal(); g.unshift(t.toDataURL('image/jpeg',.75)); try{ localStorage.setItem(GK(),JSON.stringify(g.slice(0,9))); confetti(); tsay('¡Guardado en tu galería!'); addXP(1); }catch(e){ tsay('No se pudo guardar en este navegador'); } });
  fl('ga').addEventListener('click',()=>{ const g=getGal(); const o=sheet(`<h3 style="margin-bottom:var(--s-3)">🗂️ Mi galería</h3>${g.length?`<div class="thumbs">${g.map((s,i)=>`<button data-g="${i}"><img src="${s}" alt="Dibujo ${i+1}"></button>`).join('')}</div><p class="muted" style="font-size:var(--fs-xs)">Toca un dibujo para seguir pintándolo. Se guardan los últimos 9.</p>`:'<p class="muted">Todavía no has guardado dibujos. Toca 💾 para guardar.</p>'}`);
    o.querySelectorAll('[data-g]').forEach(b=>b.addEventListener('click',()=>{ const img=new Image(); img.onload=()=>{ snap(); x2.clearRect(0,0,W,H); x1.drawImage(img,0,0,W,H); o.remove(); }; img.src=g[+b.dataset.g]; })); });
}

/* ---------- 2. MI JARDÍN (completo) ---------- */
function toyGarden2(root){
  const lv=LV();
  const PL=[
    ['girasol','🌻',['🌱','🌿','🌼','🌻'],'El girasol se mueve buscando la luz del sol.'],
    ['tulipán','🌷',['🌱','🌿','🌷'],'El tulipán nace de un bulbo, como una cebollita.'],
    ['rosa','🌹',['🌱','🌿','🥀','🌹'],'Las rosas tienen espinas para protegerse.'],
    ['cayena','🌺',['🌱','🌿','🌺'],'La cayena es una flor muy común en los patios dominicanos.'],
    ['tomate','🍅',['🌱','🌿','🪴','🍅'],'El tomate es un fruto, aunque lo comemos en ensalada.'],
    ['maíz','🌽',['🌱','🌿','🌾','🌽'],'El maíz necesita mucho sol para crecer.'],
    ['fresa','🍓',['🌱','🌿','🍀','🍓'],'La fresa tiene sus semillitas por fuera.'],
    ['zanahoria','🥕',['🌱','🌿','🥬'],'La zanahoria crece escondida bajo la tierra. ¡Es una raíz!'],
    ['sandía','🍉',['🌱','🌿','🍃','🍉'],'La sandía tiene mucha agua por dentro.'],
    ['habichuela','🫛',['🌱','🌿','🫛'],'Las habichuelas crecen dentro de vainas.'],
    ['mango','🥭',['🌱','🌿','🪴','🌳','🥭'],'El mango es un árbol: tarda más en dar frutos.'],
    ['plátano','🍌',['🌱','🌿','🪴','🌴','🍌'],'El plátano se usa para hacer mangú.']
  ];
  const RECIPES=[['🥗','ensalada',{'tomate':1,'zanahoria':1,'maíz':1}],['🧃','jugo de frutas',{'fresa':1,'mango':1}],['🍉','merienda de sandía',{'sandía':1}],['🍲','sancocho',{'plátano':1,'maíz':1,'zanahoria':1}],['💐','ramo de flores',{'girasol':1,'rosa':1,'tulipán':1}]];
  let tool='seed', seed=0, day=true, inv={}, order=null, tick, bugs=lv>=2, made={};
  /* lo que se cocina queda a la vista en la mesa (solo mientras se juega) */
  const showMade=k=>{ const box=root.querySelector('#mesa .mesa-items'); box.innerHTML=Object.entries(made).map(([e,n])=>`<span class="crea" data-e="${e}">${emo(e,'100%')}${n>1?`<b>×${n}</b>`:''}</span>`).join('');
    const el=k&&box.querySelector(`[data-e="${k}"]`); if(el){ el.classList.add('new'); sparks(el,6); } };
  const plots=[];
  addHTML(root, `<div id="sky" class="abs" style="inset:0 0 var(--tbar-h) 0;background:linear-gradient(#DDEFFA 0 46%,#E4C4A2 46% 100%);transition:background 1s"></div>
    ${scene('jardin','inset:0 0 var(--tbar-h) 0')}
    <div id="mesa" class="mesa" aria-label="Mis creaciones"><div class="mesa-items"></div><div class="mesa-top"></div><div class="mesa-legs"><i></i><i></i></div></div>
    <div id="sun" class="abs" style="top:16px;left:18px;font-size:var(--fs-7xl);transition:opacity 1s;animation:bob 4s ease-in-out infinite">${ilu('sol','1em')}</div>
    <div id="moon" class="abs" style="top:16px;left:18px;font-size:var(--fs-6xl);opacity:0;transition:opacity 1s">${ilu('luna','1em')}</div>
    <div id="rain" class="abs" style="inset:0 0 var(--tbar-h) 0;pointer-events:none"></div>
    <div id="plotsA" class="abs" style="left:4%;right:4%;top:40%;display:flex;justify-content:space-evenly;align-items:flex-end;transform:scale(.86);transform-origin:50% 100%"></div>
    <div id="plotsB" class="abs" style="left:2%;right:2%;bottom:calc(var(--tbar-h) + 14px);display:flex;justify-content:space-evenly;align-items:flex-end"></div>
    <button id="bk" class="abs" style="top:12px;right:12px;font-size:var(--fs-2xl);background:var(--card);border-radius:var(--r-md);padding:var(--s-1) var(--s-3);border:var(--bw) solid var(--line);font-weight:800;z-index:5">${emo('🧺')} <span id="hv" style="font-size:var(--fs-md)">0</span></button>
    ${lv===3?'<div id="ord" class="abs" style="top:60px;right:12px;background:var(--card);border:var(--bw) solid var(--line);border-radius:var(--r-sm);padding:var(--s-2) var(--s-3);font-weight:800;font-size:var(--fs-xs);z-index:5;max-width:55%"></div>':''}
    <div class="tbar"><button data-t="seed" class="on" id="sd">${emo('🌰')}</button><button data-t="water" aria-label="Regadera">${ilu('regadera','1.1em')}</button>${lv>=2?`<button data-t="bug" aria-label="Guantes">${ilu('guante','1.1em')}</button><button data-t="fert" aria-label="Abono">${ilu('lombriz','1.1em')}</button>`:''}<button data-t="harvest" aria-label="Tijeras">${ilu('tijeras','1.1em')}</button><span class="sep"></span><button id="dn" aria-label="Día o noche">${ilu('luna','1.1em')}</button><button id="rn" aria-label="Lluvia">${ilu('w_lluvia','1.1em')}</button></div>`);
  const mk=(parent,big)=>{ const p=document.createElement('button'); p.style.cssText=`position:relative;width:${big?30:28}%;max-width:120px;height:150px;display:flex;flex-direction:column;justify-content:flex-end;align-items:center`;
    p.innerHTML=`<span class="bug abs" style="top:24px;right:6px;font-size:var(--fs-2xl);display:none">${emo('🐛')}</span><span class="thirst abs" style="top:0;left:6px;font-size:var(--fs-xl);display:none">${emo('💧')}<b class="bang">!</b></span><span class="pt" style="font-size:var(--fs-7xl);line-height:1;transform-origin:50% 100%;transition:filter .5s,transform .5s"></span><span class="meter" style="font-size:var(--fs-2xs);height:12px;letter-spacing:-1px"></span><span class="mound"></span>`;
    parent.appendChild(p); const pl={el:p,t:null,st:0,prog:0,water:0,bug:false,fert:0}; plots.push(pl); p.addEventListener('click',()=>tap(pl)); };
  sceneParallax(root); scenePet(root,{at:'right:3%;top:calc((100% - var(--tbar-h)) * .46 - 92px)',size:62,prop:ilu('regadera','100%'),cls:'pet-garden'});
  const A=root.querySelector('#plotsA'), B=root.querySelector('#plotsB'); for(let i=0;i<3;i++) mk(A,false); for(let i=0;i<3;i++) mk(B,true);
  const P=pl=>PL[pl.t];
  function show(pl,anim=true){ const s=pl.el.querySelector('.pt');
    if (anim){ s.style.animation='none'; void s.offsetWidth; s.style.animation='popin .5s both'; }
    if (pl.t===null){ s.textContent=''; } else if (pl.st===0){ s.innerHTML=emo('🟤'); s.style.fontSize='24px'; } else { const stg=P(pl)[2]; s.innerHTML=emo(stg[Math.min(pl.st-1,stg.length-1)]); s.style.fontSize = (34+pl.st*7)+'px'; }
    const done = pl.t!==null && pl.st>=P(pl)[2].length;
    pl.el.querySelector('.meter').innerHTML = pl.t===null||done?'':'<i class="gm on"></i>'.repeat(pl.water)+'<i class="gm"></i>'.repeat(3-pl.water);
    pl.el.querySelector('.bug').style.display=pl.bug?'block':'none';
    const thirsty = pl.t!==null && !done && pl.water===0 && pl.st>0; pl.el.querySelector('.thirst').style.display=thirsty?'block':'none';
    s.style.filter = thirsty?'saturate(.4)':''; s.style.transform = thirsty?'rotate(-8deg) scaleY(.92)':''; }
  const grow=pl=>{ const max=P(pl)[2].length; if (pl.st>=max) return; pl.st++; show(pl); note(520+pl.st*90,.25,'sine',.09);
    if (pl.st===max){ sparks(pl.el,8); react('happy'); tsay(`¡Creció ${P(pl)[0]}! ${P(pl)[3]}`); visitor(); } };
  function tap(pl){
    if (tool==='seed'){ if (pl.t!==null){ tsay(pl.st>=P(pl)[2].length?'¡Ya está lista! Cosecha con ✂️':'Esta tierra ya tiene una plantita'); return; }
      pl.t=seed; pl.st=0; pl.prog=0; pl.water=0; show(pl); plopS(); tsay(`Sembraste ${PL[seed][0]}. ¡Ahora riégala!`); return; }
    if (pl.t===null){ tsay('Primero siembra una semilla 🌰'); return; }
    const max=P(pl)[2].length;
    if (tool==='water'){ if (pl.st>=max){ tsay('¡Ya está grande! Cosecha con ✂️'); return; }
      const can=document.createElement('span'); can.className='wcan'; can.innerHTML=ilu('regadera','100%'); pl.el.appendChild(can); setTimeout(()=>can.remove(),1150);
      for (let k=0;k<6;k++){ const d=document.createElement('span'); d.className='wdrop'; d.style.cssText=`left:calc(50% + ${(k%3)*6-8}px);animation-delay:${(.34+k*.08).toFixed(2)}s`; pl.el.appendChild(d); setTimeout(()=>d.remove(),1150); }
      splashS(); pl.water=3; if (pl.st===0) pl.st=0; setTimeout(()=>{ if (lv===1) grow(pl); else show(pl,false); },700); return; }
    if (tool==='bug'){ if (!pl.bug){ tsay('No hay bichitos aquí'); return; } pl.bug=false; show(pl,false); const l=document.createElement('span'); l.innerHTML=emo('🐞'); l.className='abs'; l.style.cssText='top:20px;right:0;font-size:var(--fs-2xl);transition:transform 1.2s,opacity 1.2s'; pl.el.appendChild(l);
      requestAnimationFrame(()=>requestAnimationFrame(()=>{ l.style.transform='translate(60px,-120px)'; l.style.opacity=0; })); setTimeout(()=>l.remove(),1300); popS(); tsay('¡Gracias! La mariquita se llevó al gusanito'); return; }
    if (tool==='fert'){ if (pl.st>=max) return; pl.fert=3; popS(); tsay('El abono le da alimento a la tierra'); sparks(pl.el,4); return; }
    if (tool==='harvest'){ if (pl.st<max){ tsay('Todavía no está lista'); return; }
      const nm=P(pl)[0]; flyTo(pl.el.querySelector('.pt'),'bk'); inv[nm]=(inv[nm]||0)+1; const tot=Object.values(inv).reduce((a,b)=>a+b,0); root.querySelector('#hv').textContent=tot;
      const tree=P(pl)[2].length>=5; if (tree){ pl.st=max-1; } else { pl.t=null; pl.st=0; } show(pl); popS(); addXP(1);
      tsay(`Cosechaste ${nm}${tree?'. ¡El árbol volverá a dar frutos!':''}`); checkOrder(); }
  }
  function visitor(){ if (root.querySelectorAll('.vis').length>=4) return; const b=document.createElement('div'); b.className='abs vis'; b.innerHTML=emo(pick(['🦋','🐝','🐞','🐦'])); b.style.cssText=`left:${rnd(10,70)}%;top:${rnd(14,32)}%;font-size:var(--fs-3xl);animation:flutter ${rnd(5,8)}s ease-in-out infinite;z-index:3;pointer-events:none`; root.appendChild(b); }
  function rainNow(){ const r=root.querySelector('#rain'); let n=0; const iv=setInterval(()=>{ for(let k=0;k<3;k++){ const d=document.createElement('span'); d.className='abs'; d.style.cssText=`left:${rnd(0,100)}%;top:-20px;width:3px;height:16px;border-radius:3px;background:#7FAFD3;animation:drop ${(.6+Math.random()*.4).toFixed(2)}s linear forwards`; r.appendChild(d); setTimeout(()=>d.remove(),1100); } if(++n>40) clearInterval(iv); },60);
    plots.forEach(pl=>{ if(pl.t!==null) pl.water=3; show(pl,false); }); noiseS(1.4,.08,1200); tsay('¡Llueve! Todas las plantas tienen agua'); }
  function setDay(d){ day=d; root.classList.toggle('night',!d); root.querySelector('#sky').style.background = d?'linear-gradient(#DDEFFA 0 46%,#E4C4A2 46% 100%)':'linear-gradient(#46507F 0 46%,#8E735E 46% 100%)';
    root.querySelector('#sun').style.opacity=d?1:0; root.querySelector('#moon').style.opacity=d?0:1; root.querySelector('#dn').innerHTML=ilu(d?'luna':'sol','1.1em'); tsay(d?'¡Buenos días! Con el sol, las plantas crecen':'De noche las plantas descansan'); }
  function newOrder(){ if (lv<3) return; const opts=PL.filter(p=>p[2].length<=4); const k=sample(opts,2); order=Object.fromEntries(k.map(p=>[p[0],rnd(1,3)]));
    root.querySelector('#ord').innerHTML=emo('🧾')+' Pedido de la vecina:<br>'+Object.entries(order).map(([n,c])=>`${c} ${emo(PL.find(p=>p[0]===n)[1])}`).join(' '); }
  function checkOrder(){ if (!order) return; if (Object.entries(order).every(([n,c])=>(inv[n]||0)>=c)){ Object.entries(order).forEach(([n,c])=>inv[n]-=c); root.querySelector('#hv').textContent=Object.values(inv).reduce((a,b)=>a+b,0); confetti(); win('¡Entregaste el pedido a la vecina!'); order=null; setTimeout(newOrder,2500); } }
  root.querySelector('#bk').addEventListener('click',()=>{ const o=document.createElement('div'); o.className='ov'; const items=Object.entries(inv).filter(([,c])=>c>0);
    o.innerHTML=`<div class="sheet"><h3>${emo('🧺')} Mi canasta</h3>${items.length?`<div style="display:flex;flex-wrap:wrap;gap:var(--s-3);margin:var(--s-3) 0;font-size:var(--fs-3xl)">${items.map(([n,c])=>`<span>${emo(PL.find(p=>p[0]===n)[1])}<b style="font-size:var(--fs-sm)"> ×${c}</b></span>`).join('')}</div>`:'<p class="muted">Todavía no has cosechado nada.</p>'}
      <h3 style="margin-top:var(--s-4)">${emo('🍲')} Cocina con tu cosecha</h3><div style="display:flex;flex-direction:column;gap:var(--s-2);margin-top:var(--s-2)">${RECIPES.map((r,i)=>{ const can=Object.entries(r[2]).every(([n,c])=>(inv[n]||0)>=c); return `<button class="opt" data-r="${i}" style="text-align:left;font-size:var(--fs-sm);${can?'':'opacity:.5'}">${emo(r[0])} <b>${r[1]}</b> · ${Object.entries(r[2]).map(([n,c])=>emo(PL.find(p=>p[0]===n)[1])).join(' + ')}</button>`; }).join('')}</div></div>`;
    o.addEventListener('click',e=>{ if(e.target===o) o.remove(); }); root.appendChild(o);
    o.querySelectorAll('[data-r]').forEach(b=>b.addEventListener('click',()=>{ const r=RECIPES[+b.dataset.r]; const can=Object.entries(r[2]).every(([n,c])=>(inv[n]||0)>=c);
      if (!can){ tsay(`Para ${r[1]} necesitas: ${Object.keys(r[2]).join(', ')}`); return; } Object.entries(r[2]).forEach(([n,c])=>inv[n]-=c); root.querySelector('#hv').textContent=Object.values(inv).reduce((a,b)=>a+b,0); o.remove(); made[r[0]]=(made[r[0]]||0)+1; showMade(r[0]); react('happy'); confetti(); win(`¡Preparaste ${r[1]} ${r[0]}! ¡Qué rico!`); })); });
  root.querySelectorAll('[data-t]').forEach(b=>b.addEventListener('click',()=>{ tool=b.dataset.t; root.querySelectorAll('[data-t]').forEach(x=>x.classList.toggle('on',x===b));
    if (tool==='seed'){ const o=document.createElement('div'); o.className='ov'; o.innerHTML=`<div class="sheet"><h3>${emo('🌰')} Elige una semilla</h3><div class="thumbs" style="grid-template-columns:repeat(4,1fr);margin-top:var(--s-3)">${PL.map((p,i)=>`<button data-s="${i}" style="font-size:var(--fs-2xs);aspect-ratio:auto;padding:var(--s-2) 2px"><span style="font-size:var(--fs-4xl)">${emo(p[1])}</span>${p[0]}</button>`).join('')}</div></div>`;
      o.addEventListener('click',e=>{ if(e.target===o) o.remove(); }); root.appendChild(o); o.querySelectorAll('[data-s]').forEach(x=>x.addEventListener('click',()=>{ seed=+x.dataset.s; root.querySelector('#sd').innerHTML=emo(PL[seed][1]); o.remove(); tsay(`Semilla de ${PL[seed][0]}: toca la tierra`); })); return; }
    tsay({water:'Regadera: toca una planta',bug:'Guantes: quita los bichitos',fert:'Abono: ayuda a crecer más rápido',harvest:'Tijeras: cosecha lo que esté listo'}[tool]); }));
  root.querySelector('#dn').addEventListener('click',()=>setDay(!day));
  root.querySelector('#rn').addEventListener('click',rainNow);
  tick=setInterval(()=>{ if (!day) return; plots.forEach(pl=>{ if (pl.t===null) return; const max=P(pl)[2].length; if (pl.st>=max) return;
      if (bugs && pl.st>=2 && !pl.bug && Math.random()<.06){ pl.bug=true; show(pl,false); tsay('¡Oh! Un gusanito se está comiendo una planta. Usa 🧤'); return; }
      if (pl.bug) return;
      if (pl.water>0){ pl.prog += pl.fert>0?2:1; if (pl.fert>0) pl.fert--; if (pl.prog>=3){ pl.prog=0; pl.water=Math.max(0,pl.water-1); grow(pl); } else show(pl,false); }
      else show(pl,false); }); }, lv===1?2200:2800);
  setTimeout(newOrder,2800);
  return ()=>clearInterval(tick);
}

/* ---------- 3. MÚSICA (instrumentos y percusión) ---------- */
function toyMusic2(root){
  const N=[[523.25,'do'],[587.33,'re'],[659.25,'mi'],[698.46,'fa'],[783.99,'sol'],[880,'la'],[987.77,'si'],[1046.5,'do']];
  const C=['#F4A6A6','#F7C59F','#F6E39A','#B9E3C6','#A9D3F0','#9FB7EE','#C9B8EE','#F5B8D0'];
  const INST=[['xilo','🎹','Xilófono'],['piano','🎼','Piano'],['flauta','🪈','Flauta'],['guitarra','🎸','Guitarra'],['campana','🔔','Campanas'],['robot','🤖','Robot']];
  let inst='xilo', oct=1, rec=null, recStart=0, timers=[], loop=null, simon=null;
  function play(f){ try{ AC=AC||new (window.AudioContext||window.webkitAudioContext)(); const t=AC.currentTime, g=AC.createGain(); g.connect(AC.destination);
      const osc=(type,fr,v,dur,att=.01)=>{ const o=AC.createOscillator(), gg=AC.createGain(); o.type=type; o.frequency.value=fr; gg.gain.setValueAtTime(.0001,t); gg.gain.exponentialRampToValueAtTime(v,t+att); gg.gain.exponentialRampToValueAtTime(.0001,t+dur); o.connect(gg).connect(g); o.start(t); o.stop(t+dur+.05); return o; };
      f*=oct;
      if (inst==='xilo'){ osc('sine',f,.22,1.2); osc('sine',f*4,.04,.25); }
      if (inst==='piano'){ osc('triangle',f,.2,1.6); osc('sine',f*2,.06,.8); osc('sine',f*3,.02,.4); }
      if (inst==='flauta'){ const o=osc('sine',f,.18,1.1,.12); const l=AC.createOscillator(), lg=AC.createGain(); l.frequency.value=5; lg.gain.value=f*.012; l.connect(lg).connect(o.frequency); l.start(t); l.stop(t+1.2); }
      if (inst==='guitarra'){ const o=AC.createOscillator(), fl=AC.createBiquadFilter(), gg=AC.createGain(); o.type='sawtooth'; o.frequency.value=f/2; fl.type='lowpass'; fl.frequency.setValueAtTime(3000,t); fl.frequency.exponentialRampToValueAtTime(300,t+.8); gg.gain.setValueAtTime(.18,t); gg.gain.exponentialRampToValueAtTime(.0001,t+1.2); o.connect(fl).connect(gg).connect(g); o.start(t); o.stop(t+1.3); }
      if (inst==='campana'){ osc('sine',f,.16,2.4); osc('sine',f*2.76,.06,1.4); osc('sine',f*5.4,.03,.8); }
      if (inst==='robot'){ osc('square',f,.07,.35); osc('square',f*1.01,.05,.35); }
    }catch(e){} }
  const DR=[['bombo','🥁',()=>{ try{ const t=AC.currentTime,o=AC.createOscillator(),g=AC.createGain(); o.frequency.setValueAtTime(150,t); o.frequency.exponentialRampToValueAtTime(45,t+.25); g.gain.setValueAtTime(.5,t); g.gain.exponentialRampToValueAtTime(.001,t+.35); o.connect(g).connect(AC.destination); o.start(t); o.stop(t+.4);}catch(e){} }],
    ['caja','🪘',()=>{ noiseS(.18,.25,1800); note(180,.1,'triangle',.08); }],['platillo','📀',()=>noiseS(.5,.12,7000)],['palmas','👏',()=>{ noiseS(.08,.25,1200); setTimeout(()=>noiseS(.08,.2,1300),25); }],['maracas','🪇',()=>noiseS(.07,.18,5000)],['güira','🎶',()=>{ noiseS(.12,.14,6000); }]];
  addHTML(root, `<div class="abs" style="left:8px;right:8px;top:10px;display:flex;gap:var(--s-2);overflow-x:auto;z-index:4">${INST.map(i=>`<button class="chip ${i[0]===inst?'on':''}" data-in="${i[0]}" style="flex:none">${i[1]} ${i[2]}</button>`).join('')}</div>
    <div id="bars" class="abs" style="inset:58px 8px 170px 8px;display:flex;gap:var(--s-1);align-items:center;justify-content:center">${N.map((n,i)=>`<button data-i="${i}" style="flex:1;max-width:66px;height:${94-i*5}%;border-radius:var(--r-md);background:${C[i]};border:3px solid rgba(0,0,0,.06);display:flex;flex-direction:column;justify-content:space-between;align-items:center;padding:var(--s-3) 0;font-weight:800;font-size:var(--fs-xs)"><span style="width:11px;height:11px;border-radius:50%;background:rgba(0,0,0,.18)"></span>${n[1]}<span style="width:11px;height:11px;border-radius:50%;background:rgba(0,0,0,.18)"></span></button>`).join('')}</div>
    <div class="abs" style="left:8px;right:8px;bottom:calc(var(--tbar-h) + 10px);display:grid;grid-template-columns:repeat(6,1fr);gap:var(--s-2)">${DR.map((d,i)=>`<button data-d="${i}" style="height:78px;border-radius:50%;background:radial-gradient(circle at 40% 35%,var(--white),#E9DFCF);border:3px solid #D9C2A5;font-size:var(--fs-2xl);display:flex;flex-direction:column;align-items:center;justify-content:center"><span>${d[1]}</span><small style="font-size:var(--fs-2xs);font-weight:800">${d[0]}</small></button>`).join('')}</div>
    <div class="tbar"><button id="oc">⬆️ Agudo</button><button id="bt">🔁 Ritmo</button><button id="rc">⏺️</button><button id="pl">▶️</button><button id="tw">⭐ Estrellita</button><button id="sm">🧠 Repite</button></div>`);
  const bars=[...root.querySelectorAll('[data-i]')];
  function hit(i,user=true){ play(N[i][0]); const b=bars[i]; b.style.animation='none'; void b.offsetWidth; b.style.animation='hit .35s ease';
    const r=root.getBoundingClientRect(), a=b.getBoundingClientRect(); const m=document.createElement('span'); m.className='abs'; m.innerHTML=ilu('nota_musical','1em'); m.style.cssText=`left:${a.left-r.left+a.width/2-10}px;top:${a.top-r.top-8}px;font-size:var(--fs-xl);animation:up 1.1s ease-out forwards;z-index:4;pointer-events:none`; root.appendChild(m); setTimeout(()=>m.remove(),1100);
    dance(); if (user && rec) rec.push(['n',i,performance.now()-recStart]);
    if (user && simon && simon.active){ if (i===simon.seq[simon.pos]){ simon.pos++; if (simon.pos===simon.seq.length){ simon.active=false; const L=simon.seq.length; win(`¡Perfecto! Repetiste ${L} notas`); setTimeout(()=>startSimon(L+1),2400); } } else { simon.active=false; simon.pos=0; tsay('¡Casi! Escucha otra vez'); setTimeout(playSimon,1600); } } }
  function drum(i,user=true){ try{ AC=AC||new (window.AudioContext||window.webkitAudioContext)(); }catch(e){} DR[i][2](); const b=root.querySelector(`[data-d="${i}"]`); b.style.animation='none'; void b.offsetWidth; b.style.animation='hit .25s ease'; dance(); if (user && rec) rec.push(['d',i,performance.now()-recStart]); }
  bars.forEach(b=>b.addEventListener('pointerdown',e=>{ e.preventDefault(); hit(+b.dataset.i); }));
  root.querySelectorAll('[data-d]').forEach(b=>b.addEventListener('pointerdown',e=>{ e.preventDefault(); drum(+b.dataset.d); }));
  root.querySelectorAll('[data-in]').forEach(b=>b.addEventListener('click',()=>{ inst=b.dataset.in; root.querySelectorAll('[data-in]').forEach(x=>x.classList.toggle('on',x===b)); hit(4,false); tsay(INST.find(x=>x[0]===inst)[2]); }));
  root.querySelector('#oc').addEventListener('click',e=>{ oct = oct===1?2:oct===2?.5:1; e.currentTarget.textContent = oct===2?'⬆️ Muy agudo':oct===.5?'⬇️ Grave':'⬆️ Agudo'; tsay(oct===2?'Sonido agudo':oct===.5?'Sonido grave':'Sonido normal'); });
  root.querySelector('#bt').addEventListener('click',e=>{ const b=e.currentTarget; if (loop){ clearInterval(loop); loop=null; b.classList.remove('on'); return; } b.classList.add('on'); let k=0; const pat=[[0,4],[3],[1,5],[3],[0],[3,4],[1],[3]];
    loop=setInterval(()=>{ pat[k%8].forEach(d=>drum(d,false)); k++; },250); tsay('¡Ritmo! Toca encima de él'); });
  root.querySelector('#rc').addEventListener('click',e=>{ const b=e.currentTarget; if (!rec){ rec=[]; recStart=performance.now(); b.innerHTML=kic('parar'); b.classList.add('on'); tsay('¡Grabando!'); } else { b.innerHTML='<span class="recdot"></span>'; b.classList.remove('on'); root._song=rec; tsay(rec.length?'¡Canción guardada! Toca ▶️':'No tocaste nada'); rec=null; } });
  root.querySelector('#pl').addEventListener('click',()=>{ const s=root._song; if(!s||!s.length){ tsay('Primero graba tu canción con ⏺️'); return; } timers.forEach(clearTimeout); timers=s.map(([k,i,t])=>setTimeout(()=>k==='n'?hit(i,false):drum(i,false),t)); });
  const seq=(arr,gap=430)=>{ timers.forEach(clearTimeout); timers=arr.map((x,k)=>setTimeout(()=>{ if(x!==null) hit(x,false); },k*gap)); };
  root.querySelector('#tw').addEventListener('click',()=>{ simon=null; seq([0,0,4,4,5,5,4,null,3,3,2,2,1,1,0]); });
  function playSimon(){ seq(simon.seq,650); timers.push(setTimeout(()=>{ if(simon){ simon.active=true; simon.pos=0; } }, simon.seq.length*650+150)); }
  function startSimon(len){ const top=LV()===1?4:7; simon={seq:Array.from({length:Math.min(len,12)},()=>rnd(0,top)),pos:0,active:false}; tsay(`Escucha ${simon.seq.length} notas y repítelas`); timers.push(setTimeout(playSimon,1700)); }
  root.querySelector('#sm').addEventListener('click',()=>startSimon(LV()+1));
  return ()=>{ timers.forEach(clearTimeout); if(loop) clearInterval(loop); };
}

/* ---------- 4. ACUARIO (completo) ---------- */
function toyAquarium2(root){
  const FISH=[['🐟','pez','Los peces respiran por las branquias.'],['🐠','pez tropical','Vive en los arrecifes de coral.'],['🐡','pez globo','Se infla para asustar a otros.'],['🐙','pulpo','Tiene ocho brazos y tres corazones.'],['🦑','calamar','Lanza tinta para esconderse.'],['🦀','cangrejo','Camina de lado.'],['🦞','langosta','Tiene un caparazón duro.'],['🐢','tortuga marina','Puede vivir muchísimos años.'],['🐬','delfín','Es un mamífero: respira aire.'],['🦈','tiburón','Tiene muchas filas de dientes.'],['🐳','ballena','Es el animal más grande del mundo.'],['🪼','medusa','No tiene huesos ni cerebro.']];
  const DECO=['🏰','🪸','🐚','🪨','🗿','💎','⚓','🌿'];
  const fish=[], food=[]; let raf, bub, night=false;
  addHTML(root, `<div id="tk" class="abs" style="inset:0 0 var(--tbar-h) 0;background:#BFE1F5;overflow:hidden;transition:background 1s">
      <div id="rays" class="abs" style="inset:0;background:repeating-linear-gradient(105deg,rgba(255,255,255,.18) 0 18px,transparent 18px 70px);pointer-events:none"></div>
      ${scene('acuario','inset:0')}
      ${[8,30,66,88].map(x=>`<span class="abs" style="left:${x}%;bottom:26px;font-size:var(--fs-6xl);transform-origin:50% 100%;animation:palm 4s ease-in-out ${-x/20}s infinite;pointer-events:none">${ilu('alga','1.1em')}</span>`).join('')}
      <div id="cnt" class="abs" style="left:12px;top:12px;background:rgba(255,255,255,.85);border-radius:var(--r-sm);padding:var(--s-1) var(--s-3);font-weight:800;font-size:var(--fs-xs)"></div></div>
    <div class="tbar"><button id="ad">➕${emo('🐠')}</button><button id="dc">${emo('🏰')}</button><button id="lt">💡</button><button id="cl" aria-label="Vaciar">${kic('borrar','1em')}</button></div>`);
  const tk=root.querySelector('#tk'); const Wt=()=>tk.clientWidth, Ht=()=>tk.clientHeight; sceneParallax(root); scenePet(root,{at:'left:6%;top:24%',size:58,prop:ilu('careta','100%'),cls:'pet-diver'});
  const count=()=>{ const g={}; fish.forEach(f=>g[f.n]=(g[f.n]||0)+1); root.querySelector('#cnt').innerHTML=Object.entries(g).map(([n,c])=>`${c} ${emo(FISH.find(x=>x[1]===n)[0],'1.5em')}`).join('  ')||'Acuario vacío'; };
  function add(i){ if (fish.length>=18){ tsay('¡El acuario está lleno!'); return; } const [e,n,fact]=FISH[i];
    const el=document.createElement('span'); el.className='abs fishw'; el.innerHTML=emo(e); el.style.cssText=`left:0;top:0;font-size:${n==='ballena'?62:n==='medusa'?38:42}px;will-change:transform;cursor:pointer`;
    tk.appendChild(el); if(el.animate&&!RM) el.animate([{opacity:0},{opacity:1}],{duration:500}); const f={el,n,fact,x:rnd(20,Wt()-70),y:rnd(40,Ht()-120),tx:0,ty:0,sp:n==='tortuga marina'||n==='medusa'?.4:.6+Math.random()*.9,dir:1,crab:['cangrejo','langosta'].includes(n),jelly:n==='medusa',hop:0}; newT(f); fish.push(f);
    el.addEventListener('pointerdown',ev=>{ ev.stopPropagation(); f.hop=20; speak(`${n}. ${fact}`); sparks(el,4); });
    plopS(); count(); }
  const newT=f=>{ f.tx=rnd(10,Wt()-70); f.ty=f.crab?Ht()-86:rnd(30,Ht()-120); };
  tk.addEventListener('pointerdown',e=>{ const p=rel(tk,e); for(let k=0;k<3;k++){ const el=document.createElement('span'); el.className='abs'; el.style.cssText='width:8px;height:8px;border-radius:50%;background:#D9B08A;border:1.4px solid #A9825F;left:0;top:0'; tk.appendChild(el); food.push({el,x:p.x+rnd(-12,12),y:p.y+rnd(-6,6)}); } popS(); });
  function loop(){
    food.forEach(fd=>{ if (fd.y<Ht()-50) fd.y+=.6; fd.el.style.transform=`translate(${fd.x}px,${fd.y}px)`; });
    fish.forEach(f=>{ let tx=f.tx, ty=f.ty, tf=null;
      if (food.length && !f.jelly){ tf=food.reduce((a,b)=>Math.hypot(b.x-f.x-20,b.y-f.y-20)<Math.hypot(a.x-f.x-20,a.y-f.y-20)?b:a); tx=tf.x-20; ty=f.crab?f.y:tf.y-20; }
      const dx=tx-f.x, dy=ty-f.y, d=Math.hypot(dx,dy)||1, sp=f.sp*(tf?2.2:1);
      if (d>2){ f.x+=dx/d*sp; f.y+=dy/d*sp*(f.jelly?.5:1); if (Math.abs(dx)>1) f.dir=dx>0?-1:1; }
      if (tf && Math.hypot(tf.x-f.x-20,tf.y-f.y-20)<20){ tf.el.remove(); food.splice(food.indexOf(tf),1); note(500,.08,'sine',.08); burbujitas(tk,f.x+20,f.y+14,{n:2,sube:40,c:'rgba(255,255,255,.6)',borde:'#FFFFFF'}); }
      else if (!tf && d<6) newT(f);
      if (f.hop>0) f.hop--; const jy = f.jelly ? Math.sin(performance.now()/500+f.x)*6 : 0;
      f.el.style.transform=`translate(${f.x}px,${f.y-f.hop+jy}px) scaleX(${f.crab||f.jelly?1:f.dir}) scale(${1+f.hop/60})`; });
    raf=requestAnimationFrame(loop); }
  bub=setInterval(()=>{ const b=document.createElement('span'); b.className='abs'; b.style.cssText=`left:${rnd(5,95)}%;bottom:36px;width:${rnd(8,16)}px;aspect-ratio:1;border-radius:50%;border:var(--bw) solid rgba(255,255,255,.8);animation:rise2 ${rnd(5,8)}s linear forwards;pointer-events:none`; tk.appendChild(b); setTimeout(()=>b.remove(),8000); },700);
  const sheet=(html)=>{ const o=document.createElement('div'); o.className='ov'; o.innerHTML=`<div class="sheet">${html}</div>`; o.addEventListener('click',e=>{ if(e.target===o) o.remove(); }); root.appendChild(o); return o; };
  root.querySelector('#ad').addEventListener('click',()=>{ const o=sheet(`<h3>➕ Agrega animales del mar</h3><div class="thumbs" style="grid-template-columns:repeat(4,1fr);margin-top:var(--s-3)">${FISH.map((f,i)=>`<button data-f="${i}" style="aspect-ratio:auto;padding:var(--s-2) 2px"><span style="font-size:var(--fs-4xl)">${emo(f[0])}</span>${f[1]}</button>`).join('')}</div>`);
    o.querySelectorAll('[data-f]').forEach(b=>b.addEventListener('click',()=>{ add(+b.dataset.f); speak(FISH[+b.dataset.f][1]); })); });
  root.querySelector('#dc').addEventListener('click',()=>{ const o=sheet(`<h3>${emo('🏰')} Decora tu acuario</h3><p class="muted" style="margin:var(--s-1) 0 var(--s-3)">Luego arrástralo a donde quieras</p><div class="thumbs" style="grid-template-columns:repeat(4,1fr)">${DECO.map(d=>`<button data-d="${d}" style="font-size:var(--fs-4xl);aspect-ratio:auto;padding:var(--s-2)">${emo(d)}</button>`).join('')}</div>`);
    o.querySelectorAll('[data-d]').forEach(b=>b.addEventListener('click',()=>{ o.remove(); const el=document.createElement('div'); el.className='abs'; el.innerHTML=emo(b.dataset.d); el.style.cssText=`left:${rnd(10,Wt()-70)}px;top:${Ht()-100}px;font-size:${b.dataset.d==='🏰'?64:46}px;z-index:1`; tk.appendChild(el); dragify(el,tk,{}); plopS(); })); });
  root.querySelector('#lt').addEventListener('click',()=>{ night=!night; root.classList.toggle('night',night); tk.style.background=night?'#33447A':'#BFE1F5'; root.querySelector('#rays').style.opacity=night?0:1; tsay(night?'Luces apagadas. ¡Shhh, los peces duermen!':'¡Buenos días, peces!'); });
  root.querySelector('#cl').addEventListener('click',()=>{ fish.splice(0).forEach(f=>f.el.remove()); count(); tsay('Acuario vacío'); });
  add(0); add(1); add(5); loop();
  /* un animal nuevo cae al agua: salpica arriba */
  const _add=add; add=i=>{ const n=fish.length; _add(i); if(fish.length>n){ const f=fish[fish.length-1]; ondas(tk,f.x+20,14,{ancho:90}); gotitas(tk,f.x+20,10,{n:4,c:'#E3F2FB'}); } };
  setTimeout(()=>tsay('Toca un animal para conocerlo. Toca el agua para darles comida'),2400);
  return ()=>{ cancelAnimationFrame(raf); clearInterval(bub); };
}

/* ---------- 5. BLOQUES (colores, girar, borrar) ---------- */
function toyBlocks2(root){
  const SH={cuadrado:[70,70,'border-radius:var(--r-sm)'],rectángulo:[140,46,'border-radius:var(--r-sm)'],torre:[46,120,'border-radius:var(--r-sm)'],triángulo:[84,72,'clip-path:polygon(50% 0,100% 100%,0 100%)'],arco:[104,52,'border-radius:52px 52px 6px 6px'],círculo:[66,66,'border-radius:50%'],puerta:[60,96,'border-radius:30px 30px 4px 4px'],ventana:[64,64,'border-radius:var(--r-xs);background-image:linear-gradient(90deg,transparent 46%,#fff 46% 54%,transparent 54%),linear-gradient(transparent 46%,#fff 46% 54%,transparent 54%)'],techo:[150,56,'clip-path:polygon(50% 0,100% 100%,0 100%)'],estrella:[70,70,'clip-path:polygon(50% 0,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)']};
  const ICON={cuadrado:'🟧',rectángulo:'▬',torre:'▮',triángulo:'🔺',arco:'🌙',círculo:'🔵',puerta:'🚪',ventana:'🪟',techo:'🔻',estrella:'⭐'};
  const COLS=['#F4A6A6','#F7C59F','#F6E39A','#B9E3C6','#A9D3F0','#C9B8EE','#F5B8D0','#D9B38C','#EE8A8A','#8DBDE6','#8CCB8C','#F6D36F'];
  const blocks=[]; let col=null, goalN = LV()===1?0:LV()===2?4:7, reached=false;
  addHTML(root, `<div class="abs" style="inset:0 0 var(--tbar-h) 0;background:#E3F2FB"></div>${scene('bloques','inset:0 0 var(--tbar-h) 0')}
    <div id="gr" class="abs" style="left:0;right:0;bottom:calc(var(--tbar-h) + 0px);height:34px;background:#D6EBC6;border-top:1.6px solid #9FC48A"></div>
    <div id="tr" class="abs" style="left:10px;bottom:calc(var(--tbar-h) + 10px);font-size:var(--fs-3xl);width:56px;height:56px;border-radius:var(--r-md);background:var(--card);border:2px dashed var(--line);display:grid;place-items:center;z-index:1">🗑️</div>
    <div id="cl2" class="abs" style="right:8px;top:10px;max-height:calc(100% - var(--tbar-h) - 20px);display:flex;flex-direction:column;flex-wrap:wrap-reverse;align-content:flex-start;gap:var(--s-1);z-index:5">${COLS.map(c=>`<button data-c="${c}" style="width:36px;height:36px;border-radius:50%;background:${c};border:3px solid var(--white);box-shadow:0 0 0 1px var(--line)"></button>`).join('')}<button data-c="" style="width:36px;height:36px;border-radius:50%;background:conic-gradient(var(--c-rosa),var(--c-mantequilla),var(--c-menta),var(--c-cielo),var(--c-lavanda),var(--c-rosa));border:3px solid var(--white);box-shadow:0 0 0 2px var(--ink)"></button></div>
    ${goalN?`<div id="bg" class="abs" style="left:12px;top:12px;background:var(--card);border:var(--bw) solid var(--line);border-radius:var(--r-md);padding:var(--s-2) var(--s-3);font-weight:800">🎯 Torre de ${goalN} bloques</div>`:''}
    <div class="tbar">${Object.keys(SH).map((k,i)=>{ const [w,h,css]=SH[k], s=Math.min(30/w,30/h); return `<button data-s="${k}" aria-label="${k}"><span class="bshape" style="width:${Math.round(w*s)}px;height:${Math.round(h*s)}px;${css.replace(/(\d+)px/g,(m,n)=>Math.max(2,Math.round(n*s))+'px')};background-color:${COLS[i%8]}"></span></button>`; }).join('')}<button data-s="amigo">${petMini(prof(),34)}</button><span class="sep"></span><button id="cl" aria-label="Borrar todo">${kic('borrar')}</button></div>`);
  const W=()=>root.clientWidth, groundY=()=>root.clientHeight-70-34;
  function settle(){
    const order=blocks.slice().sort((a,b)=>(b.y+b.h)-(a.y+a.h)); const done=[];
    order.forEach(b=>{ let land=groundY(), sup=null; done.forEach(s=>{ if (b.x < s.x+s.w-6 && b.x+b.w > s.x+6 && s.y<land){ land=s.y; sup=s; } });
      b.y=land-b.h; b.d=sup?sup.d+1:1; b.el.style.top=b.y+'px'; b.el.style.left=b.x+'px'; done.push(b); });
    const maxD=Math.max(0,...blocks.map(b=>b.d||0));
    if (goalN && maxD>=goalN && !reached){ reached=true; setTimeout(()=>{ win(`¡Torre de ${goalN} bloques!`); goalN=Math.min(12,goalN+1); reached=false; const e=root.querySelector('#bg'); if(e) e.textContent=`🎯 Ahora: torre de ${goalN}`; },500); }
  }
  function add(kind){
    const isF=kind==='amigo'; const s=isF?[66,66,'']:SH[kind]; const el=document.createElement('div');
    const b={el,w:s[0],h:s[1],x:Math.max(8,Math.min(W()-s[0]-44, W()/2-s[0]/2+rnd(-60,60))),y:10,kind,rot:0};
    el.className='abs'; el.style.cssText=`left:${b.x}px;top:10px;width:${b.w}px;height:${b.h}px;${isF?'':`background-color:${col||pick(COLS.slice(0,8))};box-shadow:inset 0 0 0 1.6px rgba(74,70,88,.22);${s[2]}`};transition:top .45s cubic-bezier(.5,0,.6,1.3),left .2s,width .2s,height .2s;z-index:2`;
    if (isF) el.innerHTML=petMini(prof(),66);
    root.appendChild(el); blocks.push(b); landSquash(el); let down=null;
    el.addEventListener('pointerdown',e=>{ down=[e.clientX,e.clientY]; },true);
    dragify(el, root, {drop:(e,px,py)=>{ const r=root.getBoundingClientRect(); const tapped = down && Math.hypot(down[0]-(r.left+px),down[1]-(r.top+py))<6;
      const t=root.querySelector('#tr').getBoundingClientRect(); if (r.left+px>t.left-10 && r.left+px<t.right+10 && r.top+py>t.top-10 && r.top+py<t.bottom+10){ el.remove(); blocks.splice(blocks.indexOf(b),1); noiseS(.2,.1,600); settle(); return; }
      if (tapped && ['rectángulo','torre','puerta','techo'].includes(kind)){ [b.w,b.h]=[b.h,b.w]; el.style.width=b.w+'px'; el.style.height=b.h+'px'; popS(); }
      else if (tapped && !isF){ el.style.backgroundColor=col||pick(COLS); popS(); }
      b.x=Math.max(0,Math.min(W()-b.w, parseFloat(e.style.left))); b.y=parseFloat(e.style.top); settle(); plopS(); }});
    requestAnimationFrame(()=>settle()); setTimeout(plopS,350);
    tsay(isF?`¡${mname(prof().avatar)} quiere subir!`:({cuadrado:'Un cuadrado',rectángulo:'Un rectángulo',torre:'Una torre',triángulo:'Un triángulo',arco:'Un arco',círculo:'Un círculo',puerta:'Una puerta',ventana:'Una ventana',techo:'Un techo',estrella:'Una estrella'})[kind]);
  }
  root.querySelectorAll('[data-s]').forEach(b=>b.addEventListener('click',()=>add(b.dataset.s)));
  root.querySelectorAll('[data-c]').forEach(b=>b.addEventListener('click',()=>{ col=b.dataset.c||null; root.querySelectorAll('[data-c]').forEach(x=>x.style.boxShadow=x===b?'0 0 0 2px var(--ink)':'0 0 0 1px var(--line)'); tsay(col?'Color elegido. Toca un bloque para pintarlo':'Colores al azar'); }));
  root.querySelector('#cl').addEventListener('click',()=>{ blocks.splice(0).forEach(b=>b.el.remove()); tsay('¡A construir otra vez!'); });
  setTimeout(()=>tsay('Toca un bloque para girarlo o pintarlo. Arrástralo a 🗑️ para quitarlo'),2800);
}

/* registro */
const T_=id=>TOYS.find(t=>t.id===id);
T_('paint').open=toyPaint2; T_('paint').hi='¡A pintar! Elige pincel y color, o toca 🖼️ para colorear un dibujo.';
T_('garden').open=toyGarden2; T_('garden').hi='Elige una semilla 🌰, siémbrala y riégala 💧. ¡Crecen con el sol!'; T_('garden').hi2='Cuida tu huerto: riega, quita bichitos y cosecha.';
T_('music').open=toyMusic2; T_('music').name='Música'; T_('music').hi='Elige un instrumento y toca. ¡Prueba los tambores!';
T_('aqua').open=toyAquarium2; T_('aqua').hi='Agrega animales del mar y decora tu acuario.';
T_('blocks').open=toyBlocks2;
/* juego libre, sin retos: no muestran el botón de nivel */
['paint','music','aqua','weather'].forEach(id=>{ T_(id).libre=true; });

/* ---------- 6. SALA DE MÚSICA: 7 instrumentos con explicación ---------- */
function toyMusic3(root){
  const INFO={
    piano:['🎹','Piano','Cuerda percutida (teclado)','Al presionar una tecla, un martillito golpea una cuerda dentro del piano. Las teclas blancas son do, re, mi, fa, sol, la y si; las negras son sostenidos.','Presiona las teclas con la yema de los dedos. A la izquierda suenan graves y a la derecha, agudos.'],
    xilo:['🎶','Xilófono','Percusión de láminas','Tiene láminas de madera o metal. Las láminas largas suenan graves y las cortas, agudas.','Golpea las láminas con las baquetas, suave, dejando que reboten.'],
    guitarra:['🎸','Guitarra','Cuerda pulsada','Tiene 6 cuerdas. La caja de madera hace que el sonido se escuche más fuerte.','Con una mano formas acordes en el mástil y con la otra rasgueas. Aquí: elige un acorde y desliza el dedo sobre las cuerdas.'],
    flauta:['🪈','Flauta','Viento','El sonido nace cuando soplas. Al tapar y destapar agujeros cambias la nota.','Sopla suavemente y tapa los agujeros con las yemas de los dedos. Aquí: toca cada agujero para escuchar su nota.'],
    violin:['🎻','Violín','Cuerda frotada','Tiene 4 cuerdas y se toca con un arco. Es el más pequeño y agudo de su familia.','Se apoya bajo la barbilla y se pasa el arco sobre las cuerdas. Aquí: desliza el dedo sobre una cuerda como si fuera el arco, o tócala para pellizcarla.'],
    bateria:['🥁','Batería','Percusión','Es un grupo de tambores y platillos: bombo, caja, toms y platillos.','Se toca con baquetas y el bombo con un pedal. El bombo marca el pulso de la canción.'],
    merengue:['🇩🇴','Tambora y güira','Percusión dominicana','Son instrumentos del merengue típico dominicano, junto al acordeón. La tambora es un tambor de dos parches y la güira es un cilindro de metal con agujeritos.','La tambora se toca con una mano y un palito. La güira se raspa con un rascador de metal, siguiendo el ritmo.']
  };
  const MI={piano:'piano',xilo:'xilofono',guitarra:'guitarra',flauta:'flauta',violin:'violin',bateria:'bateria',merengue:'tambora'}; /* ilustración de cada instrumento */
  let inst='piano', rec=null, recStart=0, timers=[], loop=null, held=null;
  const ctx=()=>{ AC=AC||new (window.AudioContext||window.webkitAudioContext)(); return AC; };
  function tone2(kind,f,dur){ try{ const A=ctx(), t=A.currentTime, out=A.createGain(); out.connect(A.destination);
    const osc=(type,fr,v,d,att=.01)=>{ const o=A.createOscillator(), g=A.createGain(); o.type=type; o.frequency.value=fr; g.gain.setValueAtTime(.0001,t); g.gain.exponentialRampToValueAtTime(v,t+att); g.gain.exponentialRampToValueAtTime(.0001,t+d); o.connect(g).connect(out); o.start(t); o.stop(t+d+.05); return o; };
    if (kind==='piano'){ osc('triangle',f,.22,1.8); osc('sine',f*2,.07,.9); osc('sine',f*3,.02,.4); }
    if (kind==='xilo'){ osc('sine',f,.24,1.1); osc('sine',f*4,.05,.2); }
    if (kind==='guitarra'){ const o=A.createOscillator(), fl=A.createBiquadFilter(), g=A.createGain(); o.type='sawtooth'; o.frequency.value=f; fl.type='lowpass'; fl.frequency.setValueAtTime(2600,t); fl.frequency.exponentialRampToValueAtTime(260,t+1); g.gain.setValueAtTime(.14,t); g.gain.exponentialRampToValueAtTime(.0001,t+1.6); o.connect(fl).connect(g).connect(out); o.start(t); o.stop(t+1.7); }
    if (kind==='flauta'){ const o=osc('sine',f,.2,1.0,.08); const l=A.createOscillator(), lg=A.createGain(); l.frequency.value=5; lg.gain.value=f*.01; l.connect(lg).connect(o.frequency); l.start(t); l.stop(t+1.1); noiseS(.25,.03,f*2); }
    if (kind==='pizz'){ osc('triangle',f,.2,.45); }
  }catch(e){} }
  function bowStart(f){ try{ const A=ctx(), t=A.currentTime; const o=A.createOscillator(), fl=A.createBiquadFilter(), g=A.createGain(), l=A.createOscillator(), lg=A.createGain(); o.type='sawtooth'; o.frequency.value=f; fl.type='lowpass'; fl.frequency.value=f*4; l.frequency.value=5.5; lg.gain.value=f*.008; l.connect(lg).connect(o.frequency);
    g.gain.setValueAtTime(.0001,t); g.gain.exponentialRampToValueAtTime(.12,t+.15); o.connect(fl).connect(g).connect(A.destination); o.start(t); l.start(t); held={o,g,l}; }catch(e){} }
  function bowStop(){ if(!held) return; try{ const t=AC.currentTime; held.g.gain.cancelScheduledValues(t); held.g.gain.setValueAtTime(held.g.gain.value,t); held.g.gain.exponentialRampToValueAtTime(.0001,t+.3); held.o.stop(t+.35); held.l.stop(t+.35); }catch(e){} held=null; }
  const DRUM={bombo:()=>{ try{ const A=ctx(),t=A.currentTime,o=A.createOscillator(),g=A.createGain(); o.frequency.setValueAtTime(150,t); o.frequency.exponentialRampToValueAtTime(45,t+.25); g.gain.setValueAtTime(.55,t); g.gain.exponentialRampToValueAtTime(.001,t+.35); o.connect(g).connect(A.destination); o.start(t); o.stop(t+.4);}catch(e){} },
    caja:()=>{ noiseS(.18,.25,1800); note(190,.1,'triangle',.08); }, platillo:()=>noiseS(.6,.12,7000), hihat:()=>noiseS(.06,.14,8000),
    tom1:()=>{ try{ const A=ctx(),t=A.currentTime,o=A.createOscillator(),g=A.createGain(); o.frequency.setValueAtTime(260,t); o.frequency.exponentialRampToValueAtTime(140,t+.2); g.gain.setValueAtTime(.35,t); g.gain.exponentialRampToValueAtTime(.001,t+.3); o.connect(g).connect(A.destination); o.start(t); o.stop(t+.35);}catch(e){} },
    tom2:()=>{ try{ const A=ctx(),t=A.currentTime,o=A.createOscillator(),g=A.createGain(); o.frequency.setValueAtTime(180,t); o.frequency.exponentialRampToValueAtTime(90,t+.25); g.gain.setValueAtTime(.35,t); g.gain.exponentialRampToValueAtTime(.001,t+.35); o.connect(g).connect(A.destination); o.start(t); o.stop(t+.4);}catch(e){} },
    tamboraG:()=>{ try{ const A=ctx(),t=A.currentTime,o=A.createOscillator(),g=A.createGain(); o.frequency.setValueAtTime(120,t); o.frequency.exponentialRampToValueAtTime(70,t+.2); g.gain.setValueAtTime(.5,t); g.gain.exponentialRampToValueAtTime(.001,t+.3); o.connect(g).connect(A.destination); o.start(t); o.stop(t+.35);}catch(e){} noiseS(.05,.08,500); },
    tamboraP:()=>{ noiseS(.06,.3,2600); note(420,.06,'square',.05); }, guira:()=>noiseS(.11,.16,6500), guiraL:()=>noiseS(.32,.12,6000)};
  const NOTES=[[261.63,'do'],[293.66,'re'],[329.63,'mi'],[349.23,'fa'],[392,'sol'],[440,'la'],[493.88,'si'],[523.25,'do']];
  const SHARP=[[277.18,0],[311.13,1],[369.99,3],[415.3,4],[466.16,5]];
  addHTML(root, `${scene('musica','inset:0 0 var(--tbar-h) 0')}<div class="abs" style="left:8px;right:8px;top:10px;display:flex;gap:var(--s-2);overflow-x:auto;z-index:4;scrollbar-width:none">${Object.entries(INFO).map(([k,v])=>`<button class="chip" data-in="${k}" style="flex:none;gap:var(--s-1);display:inline-flex;align-items:center">${ilu(MI[k],26)} ${v[1]}</button>`).join('')}</div>
    <div id="st" class="abs" style="left:8px;right:8px;top:58px;bottom:calc(var(--tbar-h) + 80px)"></div>
    <div class="tbar"><button id="inf">${kic('info')} Aprende</button><button id="tw">${kic('estrella')} Canción</button><button id="bt">${kic('musica')} Ritmo</button><button id="rc" aria-label="Grabar"><span class="recdot"></span></button><button id="pl" aria-label="Escuchar">${kic('play')}</button></div>`);
  const st=root.querySelector('#st'); sceneParallax(root); scenePet(root,{at:'left:16px;bottom:calc(var(--tbar-h) + 6px)',size:56,prop:ilu(MI[inst],'100%'),cls:'pet-music'});
  const floatNote=(el)=>{ const r=root.getBoundingClientRect(), a=el.getBoundingClientRect(); const m=document.createElement('span'); m.className='abs'; m.innerHTML=ilu('nota_musical','1em'); m.style.cssText=`left:${a.left-r.left+a.width/2-10}px;top:${a.top-r.top-6}px;font-size:var(--fs-xl);animation:up 1.1s ease-out forwards;z-index:4;pointer-events:none`; root.appendChild(m); setTimeout(()=>m.remove(),1100); };
  const bump=el=>{ el.style.animation='none'; void el.offsetWidth; el.style.animation='hit .3s ease'; };
  const log=(k,a,b)=>{ if (rec) rec.push([k,a,b,performance.now()-recStart]); };
  /* reproductor genérico */
  function playEv(k,a,b){ if (k==='t') tone2(a,b); else if (k==='d') DRUM[a](); }
  function draw(){
    root.querySelectorAll('[data-in]').forEach(x=>x.classList.toggle('on',x.dataset.in===inst)); bowStop(); setPetProp(root,ilu(MI[inst],'100%'));
    const I=INFO[inst]; let h=`<div style="text-align:center;font-weight:800;margin-bottom:var(--s-2)"><span style="font-size:var(--fs-xs)" class="muted">${I[2]}</span></div>`;
    if (inst==='piano'){ h+=`<div style="position:relative;height:calc(100% - 40px);max-height:340px;display:flex;gap:3px;margin-top:var(--s-3)">${NOTES.map((n,i)=>`<button data-k="${i}" style="flex:1;background:var(--card);border:var(--bw) solid #D9D2C7;border-radius:0 0 12px 12px;display:flex;align-items:flex-end;justify-content:center;padding-bottom:var(--s-3);font-weight:800;color:var(--soft);font-size:var(--fs-xs)">${n[1]}</button>`).join('')}
      ${SHARP.map(([f,i])=>`<button data-sh="${f}" style="position:absolute;top:0;left:calc(${(i+1)*12.5}% - 5.5%);width:9%;height:58%;background:#3C3848;border-radius:0 0 8px 8px;z-index:2"></button>`).join('')}</div>`; }
    if (inst==='xilo'){ const C=['#F4A6A6','#F7C59F','#F6E39A','#B9E3C6','#A9D3F0','#9FB7EE','#C9B8EE','#F5B8D0']; h+=`<div style="height:calc(100% - 40px);display:flex;gap:var(--s-1);align-items:center;justify-content:center">${NOTES.map((n,i)=>`<button data-x="${i}" style="flex:1;max-width:62px;height:${94-i*6}%;border-radius:var(--r-sm);background:${C[i]};border:3px solid rgba(0,0,0,.06);display:flex;flex-direction:column;justify-content:space-between;align-items:center;padding:var(--s-3) 0;font-weight:800;font-size:var(--fs-xs)"><span style="width:10px;height:10px;border-radius:50%;background:rgba(0,0,0,.18)"></span>${n[1]}<span style="width:10px;height:10px;border-radius:50%;background:rgba(0,0,0,.18)"></span></button>`).join('')}</div>`; }
    if (inst==='guitarra'){ h+=`<div style="display:flex;gap:var(--s-2);justify-content:center;margin-bottom:var(--s-2)">${['Do','Sol','Re','La menor','Mi menor'].map((c,i)=>`<button class="chip ${i===0?'on':''}" data-ch="${i}">${c}</button>`).join('')}</div>
      <div id="gs" style="position:relative;height:calc(100% - 90px);border-radius:var(--r-lg);background:#E2B282;border:1.6px solid #B48C66;touch-action:none;overflow:hidden"><div style="position:absolute;left:50%;top:50%;width:150px;height:150px;transform:translate(-50%,-50%);border-radius:50%;background:#7A5A44;border:1.6px solid #5E4433"></div>
      ${[0,1,2,3,4,5].map(i=>`<div class="str" data-s="${i}" style="position:absolute;left:0;right:0;top:${12+i*15}%;height:${1+i*.6+2}px;background:#F4F1EC;border-bottom:1px solid #B4B9C8"></div>`).join('')}</div>`; }
    if (inst==='flauta'){ h+=`<div style="height:calc(100% - 40px);display:flex;align-items:center;justify-content:center"><div style="position:relative;width:min(92%,420px);height:70px;border-radius:35px;background:#E9CFA6;border:1.6px solid #B48C66;display:flex;align-items:center;justify-content:space-evenly;padding-left:50px">
      <span style="position:absolute;left:14px;top:50%;transform:translateY(-50%);width:22px;height:12px;border-radius:6px;background:#8C6A4A"></span>${NOTES.slice(0,7).map((n,i)=>`<button data-fl="${i}" style="width:34px;height:34px;border-radius:50%;background:#5A4232;border:3px solid #E9D3B4;color:var(--white);font-size:var(--fs-2xs);font-weight:800">${n[1]}</button>`).join('')}</div></div>`; }
    if (inst==='violin'){ h+=`<div id="vs" style="position:relative;height:calc(100% - 40px);display:flex;justify-content:center;gap:12%;border-radius:120px 120px 90px 90px/80px 80px 60px 60px;background:#D98E5E;border:1.6px solid #A86640;touch-action:none;margin:0 14%">
      ${[[196,'sol'],[293.66,'re'],[440,'la'],[659.25,'mi']].map(([f,n],i)=>`<div class="vstr" data-f="${f}" style="position:relative;width:34px;display:flex;justify-content:center"><div style="width:${4-i*.6}px;height:100%;background:#F4F1EC"></div><b style="position:absolute;bottom:8px;color:var(--white);font-size:var(--fs-2xs)">${n}</b></div>`).join('')}</div>`; }
    if (inst==='bateria'){ const P=[['platillo','platillo','#F6E39A'],['hihat','platillo','#F7C59F'],['tom1','tambor','#A9D3F0'],['tom2','tambor','#C9B8EE'],['caja','tambor','#F5B8D0'],['bombo','bombo','#F4A6A6']]; h+=`<div style="height:calc(100% - 40px);display:grid;grid-template-columns:repeat(3,1fr);gap:var(--s-3);align-content:center">${P.map(([k,e,c])=>`<button data-dr="${k}" style="aspect-ratio:1;border-radius:50%;background:${c};border:1.6px solid rgba(74,70,88,.25);font-size:var(--fs-3xl);display:flex;flex-direction:column;align-items:center;justify-content:center"><span>${ilu(e,'1.2em')}</span><small style="font-size:var(--fs-2xs);font-weight:800">${k==='hihat'?'hi-hat':k==='tom1'?'tom agudo':k==='tom2'?'tom grave':k}</small></button>`).join('')}</div>`; }
    if (inst==='merengue'){ h+=`<div style="height:calc(100% - 40px);display:flex;flex-direction:column;gap:var(--s-4);justify-content:center;align-items:center">
      <div style="display:flex;align-items:center"><button data-dr="tamboraG" style="width:110px;height:110px;border-radius:50%;background:#F3E3C9;border:5px solid #B07E52;font-weight:800">${ilu('mano','2em')}<br><small>parche</small></button><div style="width:120px;height:90px;background:repeating-linear-gradient(90deg,#D9A876 0 12px,#B98E6A 12px 16px);border-top:1.6px solid #9C7454;border-bottom:1.6px solid #9C7454;"></div><button data-dr="tamboraP" style="width:110px;height:110px;border-radius:50%;background:#F3E3C9;border:5px solid #B07E52;font-weight:800">${ilu('palitos','2em')}<br><small>palito</small></button></div>
      <div id="gu" style="width:min(86%,320px);height:70px;border-radius:35px;background:repeating-linear-gradient(90deg,#E1E4EB 0 6px,#C3C8D6 6px 9px);display:grid;place-items:center;font-weight:800;touch-action:none;border:1.6px solid #9EA3AD">Raspa la güira</div></div>`; }
    st.innerHTML=h;
    st.querySelectorAll('[data-k]').forEach(b=>b.addEventListener('pointerdown',e=>{ e.preventDefault(); const f=NOTES[+b.dataset.k][0]; tone2('piano',f); log('t','piano',f); b.style.background='#F8EFC9'; setTimeout(()=>b.style.background='#fff',150); floatNote(b); dance(); }));
    st.querySelectorAll('[data-sh]').forEach(b=>b.addEventListener('pointerdown',e=>{ e.preventDefault(); const f=+b.dataset.sh; tone2('piano',f); log('t','piano',f); b.style.background='#8F82C6'; setTimeout(()=>b.style.background='#3C3848',150); dance(); }));
    st.querySelectorAll('[data-x]').forEach(b=>b.addEventListener('pointerdown',e=>{ e.preventDefault(); const f=NOTES[+b.dataset.x][0]*2; tone2('xilo',f); log('t','xilo',f); bump(b); floatNote(b); dance(); }));
    st.querySelectorAll('[data-fl]').forEach(b=>b.addEventListener('pointerdown',e=>{ e.preventDefault(); const f=NOTES[+b.dataset.fl][0]*2; tone2('flauta',f); log('t','flauta',f); b.style.background='#F8EFC9'; setTimeout(()=>b.style.background='#5A4232',200); floatNote(b); dance(); }));
    st.querySelectorAll('[data-dr]').forEach(b=>b.addEventListener('pointerdown',e=>{ e.preventDefault(); DRUM[b.dataset.dr](); log('d',b.dataset.dr); bump(b); dance(); }));
    const gs=st.querySelector('#gs');
    if (gs){ const CH=[[0,130.81,164.81,196,261.63,329.63],[98,123.47,146.83,196,246.94,392],[0,0,146.83,220,293.66,369.99],[0,110,164.81,220,261.63,329.63],[82.41,123.47,164.81,196,246.94,329.63]]; let ch=0, last=-1;
      st.querySelectorAll('[data-ch]').forEach(b=>b.addEventListener('click',()=>{ ch=+b.dataset.ch; st.querySelectorAll('[data-ch]').forEach(x=>x.classList.toggle('on',x===b)); speak(b.textContent); }));
      const strAt=y=>{ const r=gs.getBoundingClientRect(); const p=(y-r.top)/r.height*100; let best=-1; for(let i=0;i<6;i++){ if (Math.abs(p-(12+i*15))<6) best=i; } return best; };
      const pluck=i=>{ const f=CH[ch][5-i]; const s=st.querySelector(`[data-s="${i}"]`); s.style.transform='translateY(2px)'; setTimeout(()=>s.style.transform='',80); if (!f) return; tone2('guitarra',f); log('t','guitarra',f); };
      gs.addEventListener('pointerdown',e=>{ e.preventDefault(); try{gs.setPointerCapture(e.pointerId);}catch(_){} last=strAt(e.clientY); if (last>=0) pluck(last); dance(); });
      gs.addEventListener('pointermove',e=>{ if(!e.buttons&&e.pointerType==='mouse') return; const i=strAt(e.clientY); if (i>=0 && i!==last){ pluck(i); last=i; } });
      gs.addEventListener('pointerup',()=>last=-1); }
    const vs=st.querySelector('#vs');
    if (vs){ let cur=null, moved=0, sx=0, sy=0;
      vs.querySelectorAll('.vstr').forEach(s=>s.addEventListener('pointerdown',e=>{ e.preventDefault(); try{vs.setPointerCapture(e.pointerId);}catch(_){} cur=+s.dataset.f; moved=0; sx=e.clientX; sy=e.clientY; }));
      vs.addEventListener('pointermove',e=>{ if(cur===null) return; moved=Math.hypot(e.clientX-sx,e.clientY-sy); if (moved>10 && !held){ bowStart(cur); log('t','pizz',cur); dance(); } });
      vs.addEventListener('pointerup',()=>{ if (cur!==null && moved<=10){ tone2('pizz',cur); log('t','pizz',cur); } bowStop(); cur=null; }); }
    const gu=st.querySelector('#gu');
    if (gu){ let lx=null; gu.addEventListener('pointerdown',e=>{ e.preventDefault(); try{gu.setPointerCapture(e.pointerId);}catch(_){} lx=e.clientX; DRUM.guira(); log('d','guira'); });
      gu.addEventListener('pointermove',e=>{ if (lx===null) return; if (Math.abs(e.clientX-lx)>40){ DRUM.guira(); log('d','guira'); lx=e.clientX; dance(); } }); gu.addEventListener('pointerup',()=>lx=null); }
  }
  function showInfo(){ const I=INFO[inst]; const o=document.createElement('div'); o.className='ov';
    o.innerHTML=`<div class="sheet"><div style="text-align:center">${ilu(MI[inst],96)}</div><h2 style="text-align:center">${I[1]}</h2><p style="text-align:center"><span class="chip">${I[2]}</span></p><h3 style="margin-top:var(--s-3)">¿Qué es?</h3><p style="font-weight:600;line-height:1.5">${I[3]}</p><h3>¿Cómo se toca?</h3><p style="font-weight:600;line-height:1.5">${I[4]}</p><button class="btn full" id="okx">¡A tocar!</button></div>`;
    root.appendChild(o); o.querySelector('#okx').addEventListener('click',()=>{ speechSynthesis&&speechSynthesis.cancel(); o.remove(); }); o.addEventListener('click',e=>{ if(e.target===o){ o.remove(); } });
    speak(`${I[1]}. ${I[3]} ¿Cómo se toca? ${I[4]}`); }
  root.querySelectorAll('[data-in]').forEach(b=>b.addEventListener('click',()=>{ inst=b.dataset.in; draw(); tsay(`${INFO[inst][1]}. Toca ℹ️ para aprender sobre él`); }));
  root.querySelector('#inf').addEventListener('click',showInfo);
  root.querySelector('#tw').addEventListener('click',()=>{ const melodic={piano:'piano',xilo:'xilo',flauta:'flauta',guitarra:'guitarra',violin:'pizz'}[inst]; if (!melodic){ tsay('Prueba el botón 🔁 Ritmo con este instrumento'); return; }
    timers.forEach(clearTimeout); const mul=inst==='xilo'||inst==='flauta'?2:1; timers=[0,0,4,4,5,5,4,null,3,3,2,2,1,1,0].map((x,k)=>setTimeout(()=>{ if(x!==null){ tone2(melodic,NOTES[x][0]*mul); dance(); } },k*430)); tsay('Estrellita, ¿dónde estás?'); });
  root.querySelector('#bt').addEventListener('click',e=>{ const b=e.currentTarget; if (loop){ clearInterval(loop); loop=null; b.classList.remove('on'); return; } b.classList.add('on'); let k=0;
    const pat = inst==='merengue' ? [['tamboraG','guira'],['guira'],['tamboraP','guira'],['guiraL'],['tamboraG','guira'],['guira'],['tamboraP','tamboraP'],['guira']] : [['bombo','hihat'],['hihat'],['caja','hihat'],['hihat'],['bombo','hihat'],['bombo','hihat'],['caja','hihat'],['hihat']];
    loop=setInterval(()=>{ pat[k%8].forEach(d=>DRUM[d]()); k++; }, inst==='merengue'?190:250); tsay(inst==='merengue'?'¡Ritmo de merengue!':'¡Ritmo! Toca encima de él'); });
  root.querySelector('#rc').addEventListener('click',e=>{ const b=e.currentTarget; if (!rec){ rec=[]; recStart=performance.now(); b.innerHTML=kic('parar'); b.classList.add('on'); tsay('¡Grabando!'); } else { b.innerHTML='<span class="recdot"></span>'; b.classList.remove('on'); root._song=rec; tsay(rec.length?'¡Canción guardada! Toca ▶️':'No tocaste nada'); rec=null; } });
  root.querySelector('#pl').addEventListener('click',()=>{ const s=root._song; if(!s||!s.length){ tsay('Primero graba con ⏺️'); return; } timers.forEach(clearTimeout); timers=s.map(([k,a,b,t])=>setTimeout(()=>{ playEv(k,a,b); dance(); },t)); });
  draw();
  return ()=>{ timers.forEach(clearTimeout); if(loop) clearInterval(loop); bowStop(); };
}
T_('music').open=toyMusic3; T_('music').icon='🎼'; T_('music').hi='Elige un instrumento. Toca ℹ️ para aprender qué es y cómo se toca.'; T_('music').hi2=T_('music').hi;
