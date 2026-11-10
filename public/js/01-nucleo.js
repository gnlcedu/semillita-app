/* Semillita · Núcleo: estado, contenido de los 20 retos por grado, voz, vistas base */
/* =========================================================
   SEMILLITA · Web app de juegos educativos (1ro a 6to)
   Estructura: AREAS > rutas por grado > JUEGOS (3 niveles)
   ========================================================= */
const KEY = 'semillita.v1';
const GRADES = ['1ro','2do','3ro','4to','5to','6to'];
const AVATARS = ['🦊','🐢','🦉','🐬','🦁','🐼','🐸','🦋','🐝','🐨','🦜','🐙'];
const AREAS = [
  {id:'mat', name:'Matemática', icon:'🔢', c:'peach'},
  {id:'len', name:'Lengua Española', icon:'📖', c:'rose'},
  {id:'nat', name:'Ciencias Naturales', icon:'🌿', c:'mint'},
  {id:'soc', name:'Ciencias Sociales', icon:'🗺️', c:'sky'},
  {id:'ing', name:'Inglés', icon:'🗣️', c:'lav'},
  {id:'log', name:'Pensamiento Lógico', icon:'🧩', c:'butter'},
  {id:'val', name:'Valores', icon:'💛', c:'sage'}
];

/* ---------- utilidades ---------- */
const rnd = (a,b) => Math.floor(Math.random()*(b-a+1))+a;
const pick = a => a[Math.floor(Math.random()*a.length)];
const shuffle = a => { a = a.slice(); for (let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a; };
const sample = (a,n) => shuffle(a).slice(0,n);
const times = (n,f) => Array.from({length:n},(_,i)=>f(i));
const gcd = (a,b) => b ? gcd(b, a%b) : a;
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const strip = s => String(s).replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g,'');

function uniqOpts(correct, ds, n=4){
  const out=[String(correct)];
  for (const d of ds){ const v=String(d); if(!out.includes(v)) out.push(v); if(out.length>=n) break; }
  return out;
}
function numOpts(ans, step=1, dec=0){
  const set = new Set([ans.toFixed(dec)]);
  for (const d of shuffle([1,-1,2,-2,3,-3,5,-5,10,-10])){
    if (set.size>=4) break;
    const v = +(ans + d*step).toFixed(dec);
    if (v < 0) continue;
    set.add(v.toFixed(dec));
  }
  let k=4; while(set.size<4){ set.add((ans+k*step).toFixed(dec)); k++; }
  return [...set];
}
function Q(prompt, correct, options, extra={}){
  return Object.assign({type:'choice', prompt, correct:String(correct), options:options.map(String)}, extra);
}
function NQ(prompt, ans, extra={}, step=1, dec=0){
  return Q(prompt, ans.toFixed(dec), numOpts(ans, step, dec), extra);
}
function fromBank(bank, l, nByLevel=[5,7,10]){
  return sample(bank, Math.min(nByLevel[l-1], bank.length))
    .map(it => Q(it[0], it[1], uniqOpts(it[1], it[2]), {explain: it[3]||''}));
}

/* ---------- ayudas visuales ---------- */
const OBJ = ['🍎','⭐','🐞','🎈','🐟','🌸','🍌','⚽','🐥','🍓'];
function egrid(e,n){ return `<div class="egrid ${n>12?'s':''}">${times(n,()=>`<span>${e}</span>`).join('')}</div>`; }
function tens(t,u){ return `<div class="tens">${times(t,()=>`<div class="ten">${'<i></i>'.repeat(10)}</div>`).join('')}<div class="units">${'<i></i>'.repeat(u)}</div></div>`; }
function pie(n,d){
  const r=58,cx=65,cy=65; let s='';
  if (d===1) s=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${n?'#EFA98B':'#FFF7EE'}" stroke="#D9946C" stroke-width="2"/>`;
  else for(let i=0;i<d;i++){
    const a0=i/d*2*Math.PI-Math.PI/2, a1=(i+1)/d*2*Math.PI-Math.PI/2;
    const x0=cx+r*Math.cos(a0), y0=cy+r*Math.sin(a0), x1=cx+r*Math.cos(a1), y1=cy+r*Math.sin(a1);
    s+=`<path d="M${cx} ${cy}L${x0.toFixed(1)} ${y0.toFixed(1)}A${r} ${r} 0 ${(1/d)>.5?1:0} 1 ${x1.toFixed(1)} ${y1.toFixed(1)}Z" fill="${i<n?'#EFA98B':'#FFF7EE'}" stroke="#D9946C" stroke-width="2"/>`;
  }
  return `<svg viewBox="0 0 130 130" width="150" height="150" aria-hidden="true">${s}</svg>`;
}
function poly(n, w=150){
  const cx=75,cy=78,r=60; const pts=times(n,i=>{const a=i/n*2*Math.PI-Math.PI/2; return `${(cx+r*Math.cos(a)).toFixed(1)},${(cy+r*Math.sin(a)).toFixed(1)}`;}).join(' ');
  return `<svg viewBox="0 0 150 150" width="${w}" height="${w}" aria-hidden="true"><polygon points="${pts}" fill="#D6E9F6" stroke="#6FA3CB" stroke-width="3" stroke-linejoin="round"/></svg>`;
}
function shape(t){
  const S = (inner)=>`<svg viewBox="0 0 150 150" width="150" height="150" aria-hidden="true">${inner}</svg>`;
  const st='fill="#D6E9F6" stroke="#6FA3CB" stroke-width="3" stroke-linejoin="round"';
  switch(t){
    case 'círculo': return S(`<circle cx="75" cy="75" r="58" ${st}/>`);
    case 'cuadrado': return S(`<rect x="22" y="22" width="106" height="106" rx="4" ${st}/>`);
    case 'rectángulo': return S(`<rect x="8" y="40" width="134" height="72" rx="4" ${st}/>`);
    case 'triángulo': return poly(3);
    case 'rombo': return S(`<polygon points="75,10 135,75 75,140 15,75" ${st}/>`);
    case 'óvalo': return S(`<ellipse cx="75" cy="75" rx="66" ry="42" ${st}/>`);
    case 'pentágono': return poly(5);
    case 'hexágono': return poly(6);
    case 'octágono': return poly(8);
  }
}
function rectLabeled(a,b,u='cm'){
  return `<svg viewBox="0 0 220 150" width="220" height="150" aria-hidden="true"><rect x="30" y="20" width="160" height="90" rx="4" fill="#D6E9F6" stroke="#6FA3CB" stroke-width="3"/><text x="110" y="135" text-anchor="middle" font-size="16" font-weight="700" fill="#4A4658">${a} ${u}</text><text x="12" y="70" text-anchor="middle" font-size="16" font-weight="700" fill="#4A4658" transform="rotate(-90 12 70)">${b} ${u}</text></svg>`;
}
const textCard = t => `<div>${t}</div>`;

/* =========================================================
   GENERADORES DE CONTENIDO
   ========================================================= */

/* 1. Cuenta y toca (1ro-2do) */
function genContar(g,l){
  return times(8, () => {
    if (g===1){
      const max=[5,10,20][l-1], n=rnd(1,max), e=pick(OBJ);
      return NQ('¿Cuántos hay?', n, {visual:egrid(e,n)});
    }
    if (l===3){ const n=rnd(11,99), ask=pick(['decenas','unidades']);
      return NQ(`¿Cuántas ${ask} tiene el número ${n}?`, ask==='decenas'?Math.floor(n/10):n%10, {explain:`${n} = ${Math.floor(n/10)} decenas y ${n%10} unidades.`}); }
    const t=rnd(1,l===1?5:9), u=rnd(0,9);
    return NQ('Cada barra es una decena (10). ¿Qué número se forma?', t*10+u, {visual:tens(t,u), explain:`${t} decenas y ${u} unidades = ${t*10+u}.`});
  });
}

/* 2. Operaciones (1ro-6to) */
function genOps(g,l){
  return times(8, () => {
    let a,b,op,ans,dec=0,step=1,vis;
    if (g===1){
      if (l===1){ a=rnd(1,5); b=rnd(1,4); op='+'; ans=a+b; const e=pick(OBJ); vis=`${egrid(e,a)}<div class="expr">+</div>${egrid(e,b)}`; }
      else if (l===2){ if(Math.random()<.5){a=rnd(1,9);b=rnd(1,10-a);op='+';ans=a+b;} else {a=rnd(3,10);b=rnd(1,a);op='−';ans=a-b;} }
      else { if(Math.random()<.5){a=rnd(5,15);b=rnd(1,20-a);op='+';ans=a+b;} else {a=rnd(10,20);b=rnd(1,a);op='−';ans=a-b;} }
    } else if (g===2){
      if (l===1){ a=rnd(11,89); b=rnd(1,9-(a%10)); op='+'; ans=a+b; }
      else if (l===2){ a=rnd(15,69); b=rnd(15,30); op='+'; ans=a+b; }
      else { a=rnd(30,99); b=rnd(11,a-5); op='−'; ans=a-b; }
    } else if (g===3){
      if (l===1){ a=rnd(100,600); b=rnd(100,399); op='+'; ans=a+b; }
      else if (l===2){ a=rnd(400,999); b=rnd(100,a-50); op='−'; ans=a-b; }
      else { a=rnd(11,30); b=rnd(2,5); op='×'; ans=a*b; }
    } else if (g===4){
      if (l===1){ if(Math.random()<.5){a=rnd(1000,5000);b=rnd(500,4000);op='+';ans=a+b;} else {a=rnd(3000,9000);b=rnd(1000,a-500);op='−';ans=a-b;} }
      else if (l===2){ a=rnd(12,99); b=rnd(3,9); op='×'; ans=a*b; }
      else { b=rnd(2,9); ans=rnd(11,30); a=ans*b; op='÷'; }
    } else if (g===5){
      if (l===1){ a=rnd(11,99)/10; b=rnd(11,99)/10; op='+'; ans=+(a+b).toFixed(1); dec=1; step=.1; a=a.toFixed(1); b=b.toFixed(1); }
      else if (l===2){ a=rnd(12,45); b=rnd(11,25); op='×'; ans=a*b; step=10; }
      else { b=rnd(3,9); ans=rnd(21,99); a=ans*b; op='÷'; }
    } else {
      if (l===1){ a=rnd(11,99)/10; b=rnd(2,9); op='×'; ans=+(a*b).toFixed(1); dec=1; step=.1; a=a.toFixed(1); }
      else if (l===2){ const x=rnd(2,20), y=rnd(2,9), z=rnd(2,9); ans=x+y*z;
        return NQ('Resuelve respetando el orden de las operaciones', ans, {visual:`<div class="expr">${x} + ${y} × ${z}</div>`, explain:`Primero se multiplica: ${y} × ${z} = ${y*z}. Luego ${x} + ${y*z} = ${ans}.`}); }
      else { const p=pick([10,20,25,50,75]); const base=p===25||p===75?4:(p===20?5:10); const N=base*rnd(2,20); ans=N*p/100;
        return NQ(`¿Cuánto es el ${p}% de ${N}?`, ans, {explain:`${p}% de ${N} = ${N} × ${p} ÷ 100 = ${ans}.`}); }
    }
    return NQ('Resuelve', +ans, {visual: vis || `<div class="expr">${a} ${op} ${b}</div>`}, step, dec);
  });
}

/* 3. Tablas mágicas (2do-6to) */
function genTablas(g,l){
  return times(8, () => {
    let f,n;
    if (g===2){ f=pick([2,5,10]); n=rnd(1,10);
      if (l===3) return NQ(`${f} × ? = ${f*n}`, n, {explain:`${f} × ${n} = ${f*n}`});
      if (l===1) return NQ(`Grupos iguales: ${n} grupos de ${f}. ¿Cuántos hay en total?`, f*n, {explain:`${n} × ${f} = ${f*n}`});
      return NQ('Resuelve', f*n, {visual:`<div class="expr">${f} × ${n}</div>`}); }
    if (g===3){ f=rnd(2,5); n=rnd(1,10);
      if (l===3) return NQ('Resuelve', n, {visual:`<div class="expr">${f*n} ÷ ${f}</div>`, explain:`Porque ${f} × ${n} = ${f*n}.`});
      return NQ('Resuelve', f*n, {visual:`<div class="expr">${f} × ${n}</div>`}); }
    if (g===4){ f=rnd(l===1?6:2,9); n=rnd(2,10);
      if (l===2) return NQ('Resuelve', n, {visual:`<div class="expr">${f*n} ÷ ${f}</div>`, explain:`Porque ${f} × ${n} = ${f*n}.`});
      if (l===3) return NQ(`${f} × ? = ${f*n}`, n);
      return NQ('Resuelve', f*n, {visual:`<div class="expr">${f} × ${n}</div>`}); }
    if (g===5){
      if (l===1){ const a=rnd(12,99), m=pick([10,100]); return NQ('Resuelve', a*m, {visual:`<div class="expr">${a} × ${m}</div>`, explain:`Al multiplicar por ${m} se agregan ${m===10?'un cero':'dos ceros'}.`}, 10); }
      if (l===2){ f=rnd(3,9); n=rnd(11,20); return NQ('Resuelve', n, {visual:`<div class="expr">${f*n} ÷ ${f}</div>`}); }
      f=rnd(3,12); n=rnd(3,12); return NQ(`? × ${f} = ${f*n}`, n); }
    if (l===1){ f=pick([11,12]); n=rnd(2,12); return NQ('Resuelve', f*n, {visual:`<div class="expr">${f} × ${n}</div>`}); }
    if (l===2){ n=rnd(2,15); return NQ('¿Cuál es el cuadrado del número?', n*n, {visual:`<div class="expr">${n}²</div>`, explain:`${n}² = ${n} × ${n} = ${n*n}`}); }
    f=rnd(12,25); n=rnd(3,15); return NQ('Resuelve', n, {visual:`<div class="expr">${f*n} ÷ ${f}</div>`});
  });
}

/* 4. Fracciones (2do-6to) */
function genFracciones(g,l){
  const F=(a,b)=>`${a}/${b}`;
  return times(8, () => {
    if (g===2){
      const d=l===1?pick([2,4]):rnd(2,4), n=l===1?1:rnd(1,d-1);
      if (l===3) return Q('¿Qué fracción NO está pintada?', F(d-n,d), uniqOpts(F(d-n,d), shuffle([F(n,d),F(d,n),F(1,d+1),F(d-n,d+1)])), {visual:pie(n,d)});
      return Q('¿Qué fracción está pintada?', F(n,d), uniqOpts(F(n,d), shuffle([F(d,n),F(n,d+1),F(n+1,d),F(1,d===2?4:2)])), {visual:pie(n,d)});
    }
    if (g===3){
      if (l===1){ const d=rnd(2,8), n=rnd(1,d-1); return Q('¿Qué fracción está pintada?', F(n,d), uniqOpts(F(n,d), shuffle([F(d,n),F(d-n,d),F(n,d+1),F(n+1,d)])), {visual:pie(n,d)}); }
      if (l===2){ const d=rnd(3,9); let a=rnd(1,d-1), b=rnd(1,d-1); while(b===a) b=rnd(1,d-1);
        const big=Math.max(a,b); return Q('¿Cuál fracción es mayor?', F(big,d), [F(a,d),F(b,d)], {explain:'Si el denominador es igual, es mayor la que tiene el numerador más grande.'}); }
      const t=rnd(3,8), n=rnd(1,t-1);
      return Q('¿Qué fracción de los círculos son azules?', F(n,t), uniqOpts(F(n,t), shuffle([F(t-n,t),F(n,t-n||1),F(t,n),F(n+1,t)])), {visual:`<div class="egrid">${'🔵'.repeat(n)}${'⚪'.repeat(t-n)}</div>`});
    }
    if (g===4){
      const base=pick([[1,2],[1,3],[2,3],[1,4],[3,4],[2,5],[1,5]]), k=rnd(2,4), [a,b]=base;
      if (l===1) return Q(`¿Cuál fracción es equivalente a ${F(a,b)}?`, F(a*k,b*k), uniqOpts(F(a*k,b*k), shuffle([F(a+k,b+k),F(a*k,b+k),F(a,b*k),F(a*k+1,b*k)])), {explain:`Se multiplican numerador y denominador por ${k}.`});
      if (l===2){ const x=rnd(1,3); let d1=rnd(2,9), d2=rnd(2,9); while(d2===d1) d2=rnd(2,9);
        const c=d1<d2?F(x,d1):F(x,d2); return Q('¿Cuál fracción es mayor?', c, [F(x,d1),F(x,d2)], {explain:'Con el mismo numerador, es mayor la de denominador más pequeño (partes más grandes).'}); }
      return Q(`Simplifica ${F(a*k,b*k)}`, F(a,b), uniqOpts(F(a,b), shuffle([F(a*k,b),F(a,b*k),F(a+1,b),F(a*k-1,b*k-1)])), {explain:`Se divide arriba y abajo entre ${k}.`});
    }
    if (g===5){
      if (l===1){ const d=rnd(4,12), a=rnd(1,d-2), b=rnd(1,d-a); const r=F(a+b,d);
        return Q('Resuelve', r, uniqOpts(r, shuffle([F(a+b,d*2),F(a+b,d+d),F(a*b,d),F(a+b+1,d)])), {visual:`<div class="expr">${F(a,d)} + ${F(b,d)}</div>`, explain:'Con igual denominador, se suman los numeradores.'}); }
      if (l===2){ const d1=rnd(2,5), k=rnd(2,3), d2=d1*k, a=rnd(1,d1-1), b=rnd(1,d2-1); const r=F(a*k+b,d2);
        return Q('Resuelve', r, uniqOpts(r, shuffle([F(a+b,d1+d2),F(a+b,d2),F(a*k+b+1,d2),F(a+b*k,d2)])), {visual:`<div class="expr">${F(a,d1)} + ${F(b,d2)}</div>`, explain:`${F(a,d1)} = ${F(a*k,d2)}; luego ${a*k} + ${b} = ${a*k+b}.`}); }
      const d=rnd(4,12), a=rnd(2,d-1), b=rnd(1,a-1); const r=F(a-b,d);
      return Q('Resuelve', r, uniqOpts(r, shuffle([F(a+b,d),F(a-b,0+d*2),F(a-b+1,d),F(b,d)])), {visual:`<div class="expr">${F(a,d)} − ${F(b,d)}</div>`});
    }
    if (l===1){ const b=pick([2,3,4,5,10]), a=rnd(1,b-1), N=b*rnd(2,12); return NQ(`¿Cuánto es ${F(a,b)} de ${N}?`, N/b*a, {explain:`${N} ÷ ${b} = ${N/b}; luego × ${a} = ${N/b*a}.`}); }
    if (l===2){ const p=pick([10,20,25,50,75]); const N=(p%25===0&&p!==50?4:(p===20?5:10))*rnd(2,20); return NQ(`¿Cuánto es el ${p}% de ${N}?`, N*p/100); }
    const pairs=[['1/2','0.5'],['1/4','0.25'],['3/4','0.75'],['1/5','0.2'],['2/5','0.4'],['1/10','0.1'],['3/10','0.3'],['1/8','0.125']];
    const [fr,dc]=pick(pairs); return Q(`¿Qué número decimal es igual a ${fr}?`, dc, uniqOpts(dc, shuffle(pairs.map(p=>p[1]).filter(x=>x!==dc))));
  });
}

/* 5. Figuras y medidas (1ro-6to) */
function genGeo(g,l){
  const names1=['círculo','cuadrado','triángulo','rectángulo'], names2=names1.concat(['rombo','óvalo']);
  const sides={'triángulo':3,'cuadrado':4,'rectángulo':4,'rombo':4,'pentágono':5,'hexágono':6,'octágono':8};
  return times(8, () => {
    if (g===1){ const pool=l===3?names2:names1, t=pick(pool);
      return Q('¿Qué figura es?', t, uniqOpts(t, shuffle(pool.filter(x=>x!==t))), {visual:shape(t)}); }
    if (g===2){ const t=pick(Object.keys(sides)); const w=l===3?'vértices (esquinas)':'lados';
      if (l===1) { const t1=pick(['triángulo','cuadrado','rectángulo','pentágono','hexágono']); return NQ('¿Cuántos lados tiene?', sides[t1], {visual:shape(t1)}); }
      return NQ(`¿Cuántos ${w} tiene un ${t}?`, sides[t], {visual:shape(t)}); }
    if (g===3){ if (l===1){ const s=rnd(2,12); return NQ('Perímetro del cuadrado: suma de sus 4 lados', 4*s, {visual:`${shape('cuadrado')}<div><b>Cada lado: ${s} cm</b></div>`, explain:`${s} + ${s} + ${s} + ${s} = ${4*s} cm`}); }
      const a=rnd(4,15), b=rnd(2,a-1); if (l===2) return NQ('¿Cuál es el perímetro del rectángulo (en cm)?', 2*(a+b), {visual:rectLabeled(a,b), explain:`${a} + ${b} + ${a} + ${b} = ${2*(a+b)} cm`});
      const t=pick(['triángulo','cuadrado','pentágono','hexágono']); return NQ(`Un ${t} regular tiene lados de ${b} cm. ¿Cuál es su perímetro?`, sides[t]*b, {visual:shape(t)}); }
    if (g===4){ const a=rnd(3,12), b=rnd(2,9);
      if (l<3) return NQ('¿Cuál es el área del rectángulo (en cm²)?', a*b, {visual:rectLabeled(a,b), explain:`Área = largo × ancho = ${a} × ${b} = ${a*b} cm²`});
      const deg=pick([rnd(10,85),90,rnd(95,170)]); const t=deg<90?'agudo':deg===90?'recto':'obtuso';
      return Q(`Un ángulo de ${deg}° es...`, t, ['agudo','recto','obtuso'], {explain:'Agudo: menos de 90°. Recto: 90°. Obtuso: más de 90° y menos de 180°.'}); }
    if (g===5){
      if (l===1){ const b=rnd(2,12)*2, h=rnd(2,12); return NQ(`Un triángulo tiene base ${b} cm y altura ${h} cm. ¿Cuál es su área (cm²)?`, b*h/2, {visual:shape('triángulo'), explain:`Área = base × altura ÷ 2 = ${b} × ${h} ÷ 2 = ${b*h/2}`}); }
      if (l===2){ const a=rnd(30,90), b=rnd(20,150-a); return NQ(`Dos ángulos de un triángulo miden ${a}° y ${b}°. ¿Cuánto mide el tercero?`, 180-a-b, {explain:`Los ángulos de un triángulo suman 180°: 180 − ${a} − ${b} = ${180-a-b}°`}); }
      const t=pick(['pentágono','hexágono','octágono']), s=rnd(3,15); return NQ(`Un ${t} regular tiene lados de ${s} cm. ¿Cuál es su perímetro?`, sides[t]*s, {visual:shape(t)}); }
    if (l===1){ const a=rnd(2,10), b=rnd(2,8), c=rnd(2,6); return NQ(`Una caja mide ${a} cm × ${b} cm × ${c} cm. ¿Cuál es su volumen (cm³)?`, a*b*c, {explain:`Volumen = largo × ancho × alto = ${a*b*c} cm³`}, 2); }
    if (l===2){ const s=rnd(2,10); return NQ(`¿Cuál es el volumen de un cubo de ${s} cm de lado (cm³)?`, s*s*s, {explain:`${s} × ${s} × ${s} = ${s*s*s} cm³`}, s); }
    if (Math.random()<.5){ const r=rnd(2,20); return NQ(`Si el radio de un círculo mide ${r} cm, ¿cuánto mide el diámetro?`, 2*r, {visual:shape('círculo'), explain:'El diámetro es el doble del radio.'}); }
    const d=rnd(2,10); return NQ(`Circunferencia de un círculo de diámetro ${d} cm (usa π = 3.14)`, +(3.14*d).toFixed(2), {visual:shape('círculo'), explain:`C = π × d = 3.14 × ${d} = ${(3.14*d).toFixed(2)} cm`}, .1, 2);
  });
}

/* ---------- Lengua ---------- */
const VOC=[['🐝','abeja'],['✈️','avión'],['🌳','árbol'],['🐘','elefante'],['⭐','estrella'],['🏝️','isla'],['🦎','iguana'],['🧲','imán'],['🐻','oso'],['🐑','oveja'],['👁️','ojo'],['🍇','uvas'],['🦄','unicornio'],['1️⃣','uno']];
const SIL=[['✋','ma-no'],['🦆','pa-to'],['🏠','ca-sa'],['🌙','lu-na'],['🐱','ga-to'],['🐶','pe-rro'],['🐸','ra-na'],['🐄','va-ca'],['🍐','pe-ra'],['🍍','pi-ña'],['🎲','da-do'],['☁️','nu-be'],['🐺','lo-bo'],['🐒','mo-no'],['⚽','pe-lo-ta'],['🍅','to-ma-te'],['🍌','ba-na-na'],['🌹','ro-sa'],['🐔','ga-lli-na'],['🦋','ma-ri-po-sa'],['🐰','co-ne-jo'],['🐘','e-le-fan-te'],['🐊','co-co-dri-lo'],['🍞','pan'],['🌊','mar'],['🌸','flor'],['☀️','sol'],['⏰','re-loj'],['🐢','tor-tu-ga'],['🍓','fre-sa']];

/* 6. Vocales y sílabas (1ro-2do) */
function genSilabas(g,l){
  const mode = g===1 ? ['vocal','inicio','contar'][l-1] : ['inicio','contar','falta'][l-1];
  const multi = SIL.filter(s=>s[1].includes('-'));
  const firsts=[...new Set(multi.map(s=>s[1].split('-')[0]))];
  return times(8, () => {
    if (mode==='vocal'){ const [e,w]=pick(VOC), v=norm(w[0]);
      return Q('¿Con qué vocal empieza?', v, uniqOpts(v, shuffle(['a','e','i','o','u'].filter(x=>x!==v))), {visual:`<div class="egrid">${e}</div>`, say:`¿Con qué vocal empieza ${w}?`, big:true, explain:`${w} empieza con ${v}.`}); }
    if (mode==='inicio'){ const [e,w]=pick(multi), s=w.split('-')[0];
      return Q('¿Con qué sílaba empieza?', s, uniqOpts(s, shuffle(firsts.filter(x=>x!==s))), {visual:`<div class="egrid">${e}</div>`, say:`¿Con qué sílaba empieza ${w.replace(/-/g,'')}?`, explain:`${w.replace(/-/g,'')}: ${w}`}); }
    if (mode==='contar'){ const [e,w]=pick(SIL), n=w.split('-').length;
      return NQ('¿Cuántas sílabas tiene?', n, {visual:`<div class="egrid">${e}</div><div><b>${w.replace(/-/g,'')}</b></div>`, say:`¿Cuántas sílabas tiene ${w.replace(/-/g,'')}?`, explain:`${w}: ${n} sílaba${n>1?'s':''}.`}); }
    const [e,w]=pick(SIL.filter(s=>s[1].split('-').length>=3)), parts=w.split('-'), i=rnd(0,parts.length-1), s=parts[i];
    const shown=parts.map((p,j)=>j===i?'___':p).join(' - ');
    const all=[...new Set(SIL.flatMap(x=>x[1].split('-')))];
    return Q('¿Qué sílaba falta?', s, uniqOpts(s, shuffle(all.filter(x=>x!==s))), {visual:`<div class="egrid">${e}</div><div class="expr" style="font-size:var(--fs-3xl)">${shown}</div>`, explain:`La palabra es ${w.replace(/-/g,'')}.`});
  });
}

/* 7. Arma la palabra (1ro-6to) */
const WORDS={
 1:[['☀️','sol'],['🍞','pan'],['🐻','oso'],['🌊','mar'],['✋','mano'],['🐱','gato'],['🏠','casa'],['🌙','luna'],['🦆','pato'],['🌸','flor'],['🐄','vaca'],['🍍','piña']],
 2:[['🐶','perro'],['🧀','queso'],['🍓','fresa'],['📕','libro'],['🐯','tigre'],['🎈','globo'],['☁️','nube'],['🪑','silla'],['🍽️','plato'],['🚀','cohete'],['🚆','tren'],['🐦','pájaro']],
 3:[['🦋','mariposa'],['🐢','tortuga'],['🍎','manzana'],['🏫','escuela'],['🐴','caballo'],['👟','zapato'],['🚚','camión'],['🪟','ventana'],['🎸','guitarra'],['⭐','estrella']],
 4:[['Lugar donde se guardan y prestan libros','biblioteca'],['Lugar donde atienden a las personas enfermas','hospital'],['Cuerpo celeste que gira alrededor del Sol','planeta'],['Gran elevación natural del terreno','montaña'],['De ella nace una nueva planta','semilla'],['Símbolo patrio de tela con colores','bandera'],['Animal que vive en el mar y tiene ocho brazos','pulpo'],['Persona que escribe libros','escritor']],
 5:[['Seres vivos y el ambiente donde viven','ecosistema'],['Ley más importante de un país','constitución'],['Proceso con el que las plantas fabrican su alimento','fotosíntesis'],['Animal que tiene columna vertebral','vertebrado'],['Libertad de un país para gobernarse solo','independencia'],['Gobierno en el que el pueblo elige','democracia'],['Mezcla de gases que rodea la Tierra','atmósfera']],
 6:[['Variedad de seres vivos de un lugar','biodiversidad'],['Cumplir con nuestros deberes','responsabilidad'],['Bienes y tradiciones heredados que debemos cuidar','patrimonio'],['Relación entre dos cantidades','proporción'],['Movimiento de la Tierra alrededor del Sol','traslación'],['Fuerza que atrae los objetos hacia la Tierra','gravedad'],['Energía que viene del Sol','solar']]
};
function genPalabra(g,l){
  const n=[5,6,8][l-1];
  return sample(WORDS[g], Math.min(n, WORDS[g].length)).map(([hint,w]) => {
    const letters=[...w];
    const decoys = (l===3 && g>1) ? sample([...'aeioulmnprst'].filter(c=>!w.includes(c)),2) : [];
    const isEmoji = g<=3;
    return {type:'arrange', prompt: isEmoji?'Arma la palabra':'Lee la pista y arma la palabra', say: isEmoji?w:hint,
      visual: isEmoji?`<div class="egrid">${hint}</div>`:`<div class="visual-hint"><b>Pista:</b> ${hint}</div>`,
      tokens:letters, decoys, joiner:'', explain:`La palabra es: ${w}.`, sayAnswer:w};
  });
}

/* 8. Detective gramatical (2do-6to) */
const GRAM={
 2:[['¿Cuál palabra es un sustantivo (nombre de una cosa)?','mesa',['correr','bonito'],'Los sustantivos nombran personas, animales, cosas o lugares.'],
    ['¿Cuál es el plural de "flor"?','flores',['flors','flore']],
    ['¿Cuál palabra debe escribirse con mayúscula?','maría',['pelota','árbol'],'Los nombres propios llevan mayúscula: María.'],
    ['¿Cuál es el singular de "lápices"?','lápiz',['lápice','lápis']],
    ['¿Qué palabra es una acción (verbo)?','saltar',['silla','rojo']],
    ['Completa: ___ casa es grande.','La',['El','Los']],
    ['¿Cuál es el femenino de "niño"?','niña',['niñe','niños']],
    ['¿Qué oración está bien escrita?','Mi perro se llama Toby.',['mi perro se llama toby.','Mi perro se llama toby']],
    ['¿Cuál palabra es un lugar?','escuela',['comer','feliz']]],
 3:[['¿Cuál es el adjetivo en "El gato negro duerme"?','negro',['gato','duerme'],'El adjetivo dice cómo es el sustantivo.'],
    ['¿Cuál es el verbo en "Carla canta en el coro"?','canta',['Carla','coro']],
    ['Sinónimo de "feliz"','contento',['triste','cansado'],'Sinónimo: palabra con significado parecido.'],
    ['Antónimo de "alto"','bajo',['grande','largo'],'Antónimo: palabra con significado contrario.'],
    ['Sinónimo de "rápido"','veloz',['lento','pesado']],
    ['Antónimo de "abrir"','cerrar',['empujar','entrar']],
    ['¿Cuál es el sustantivo en "El sol brilla mucho"?','sol',['brilla','mucho']],
    ['¿Cuál palabra está bien escrita?','tambor',['tanbor','tamvor'],'Antes de b y p se escribe m.'],
    ['¿Cuál palabra está bien escrita?','campo',['canpo','cambo']]],
 4:[['¿Cuál palabra es aguda?','canción',['árbol','música'],'Agudas: la fuerza de voz va en la última sílaba.'],
    ['¿Cuál palabra es llana (grave)?','árbol',['canción','pájaro'],'Llanas: la fuerza de voz va en la penúltima sílaba.'],
    ['¿Cuál palabra es esdrújula?','música',['camión','lápiz'],'Esdrújulas: fuerza en la antepenúltima sílaba; siempre llevan tilde.'],
    ['¿Por qué lleva tilde "café"?','Es aguda y termina en vocal',['Es llana','Es esdrújula']],
    ['¿Cuál pregunta está bien escrita?','¿Cómo estás?',['Cómo estás?','¿Cómo estás']],
    ['¿Cuál palabra tiene diptongo?','cuento',['poeta','leer'],'Diptongo: dos vocales juntas en la misma sílaba (cuen-to).'],
    ['¿Cuál es el sujeto en "Los niños juegan en el patio"?','Los niños',['juegan','en el patio']],
    ['¿Qué oración usa bien las comas?','Compré pan, leche y queso.',['Compré, pan leche y queso.','Compré pan leche, y queso.']]],
 5:[['¿Cuál es una oración interrogativa?','¿Vienes mañana?',['¡Qué hermoso día!','Hoy llueve.']],
    ['¿Cuál es una oración exclamativa?','¡Qué hermoso día!',['¿Dónde vives?','Mañana hay clase.']],
    ['Completa: Él ___ al colegio en guagua.','iba',['iva','hiba'],'El pretérito imperfecto terminado en -aba / -iba se escribe con b.'],
    ['¿Cuál es el plural de "pez"?','peces',['pezes','pecez'],'La z cambia a c antes de e.'],
    ['¿Cuál palabra está bien escrita?','canción',['cansión','canzión']],
    ['¿Cuál es el predicado en "Mi abuela prepara dulce de leche"?','prepara dulce de leche',['Mi abuela','dulce']],
    ['Sinónimo de "enorme"','gigantesco',['diminuto','común']],
    ['¿Cuál oración está bien escrita?','Hay muchos libros.',['Ay muchos libros.','Ahí muchos libros.'],'"Hay" es del verbo haber; "ay" es queja; "ahí" es lugar.']],
 6:[['¿En qué tiempo está el verbo "cantaré"?','futuro',['presente','pasado']],
    ['¿En qué tiempo está el verbo "comimos"?','pasado',['presente','futuro']],
    ['"Tus ojos son dos luceros" es una...','metáfora',['personificación','hipérbole'],'Metáfora: identifica una cosa con otra sin usar "como".'],
    ['"El viento cantaba entre los árboles" es una...','personificación',['metáfora','comparación'],'Personificación: da cualidades humanas a cosas o animales.'],
    ['"Blanco como la nieve" es una...','comparación (símil)',['metáfora','hipérbole'],'La comparación usa "como".'],
    ['"Te lo he dicho un millón de veces" es una...','hipérbole',['metáfora','personificación'],'Hipérbole: exageración.'],
    ['¿Cuál es el prefijo de "deshacer"?','des-',['-er','hacer']],
    ['¿Cuál es una palabra compuesta?','sacapuntas',['lapicero','cuaderno']],
    ['Completa: Él ___ que esperar mucho.','tuvo',['tubo','tuvó'],'"Tuvo" es del verbo tener; "tubo" es un objeto.']]
};
const genGram = (g,l) => fromBank(GRAM[g], l);

/* 9. Lectura comprensiva (1ro-6to) */
const LECT={
 1:[{t:'Ana tiene un gato. El gato es blanco. Se llama Copo. Copo toma leche.',q:[['¿Cómo se llama el gato?','Copo',['Ana','Nube']],['¿De qué color es el gato?','blanco',['negro','gris']],['¿Qué toma Copo?','leche',['agua','jugo']]]},
    {t:'Luis va a la playa con su papá. Ellos hacen un castillo de arena. El sol brilla.',q:[['¿A dónde va Luis?','a la playa',['a la escuela','al parque']],['¿Con quién va?','con su papá',['con su abuela','con su hermana']],['¿Qué hacen?','un castillo de arena',['una pizza','un dibujo']]]}],
 2:[{t:'Marta siembra una semilla de habichuela en un vaso. Todos los días le pone un poco de agua. Después de una semana, sale una plantita verde.',q:[['¿Qué sembró Marta?','una semilla de habichuela',['una semilla de mango','una flor']],['¿Qué le pone cada día?','agua',['leche','arena']],['¿Cuándo salió la plantita?','después de una semana',['al otro día','después de un año']]]},
    {t:'El sábado, la familia Pérez fue al mercado. Compraron plátanos, yuca y aguacates. Al llegar a casa, prepararon un rico sancocho.',q:[['¿Qué día fueron al mercado?','el sábado',['el lunes','el domingo']],['¿Qué compraron?','plátanos, yuca y aguacates',['pan y queso','pollo y arroz']],['¿Qué prepararon?','un sancocho',['un bizcocho','una ensalada']]]}],
 3:[{t:'La cigua palmera es el ave nacional de la República Dominicana. Vive en las palmas reales, donde construye nidos grandes que comparte con otras ciguas. Es un ave muy sociable y ruidosa.',q:[['¿Dónde vive la cigua palmera?','en las palmas reales',['en el mar','en las cuevas']],['¿Cómo son sus nidos?','grandes y compartidos',['pequeños y solitarios','de piedra']],['En el texto, "sociable" quiere decir...','que le gusta estar en grupo',['que es muy pequeña','que vuela muy alto']]]},
    {t:'Pedro olvidó su merienda en casa. Su amiga Rosa le ofreció la mitad de su sándwich. Pedro le dio las gracias y prometió compartir su merienda con ella al día siguiente.',q:[['¿Qué olvidó Pedro?','su merienda',['su cuaderno','su mochila']],['¿Qué hizo Rosa?','compartió la mitad de su sándwich',['se burló de Pedro','le dio dinero']],['¿Qué valor muestra Rosa?','la solidaridad',['la pereza','el egoísmo']]]}],
 4:[{t:'Los manglares son bosques que crecen donde el agua del mar se mezcla con el agua de los ríos. Sus raíces sirven de refugio a peces y cangrejos, y protegen las costas de las olas fuertes. En la República Dominicana hay manglares en Montecristi y en Samaná.',q:[['¿Dónde crecen los manglares?','donde el agua del mar se mezcla con la del río',['en lo alto de las montañas','en el desierto']],['¿Para qué sirven sus raíces?','dan refugio a animales y protegen las costas',['para hacer muebles','para atraer turistas']],['¿Cuál es la idea principal?','Los manglares son importantes para la naturaleza y las costas',['Los cangrejos son peligrosos','Samaná es una provincia grande']]]},
    {t:'Durante el verano, una hormiga guardaba comida cada día. Un grillo, en cambio, solo cantaba y se reía de ella. Cuando llegó el frío, el grillo no tenía qué comer y tocó la puerta de la hormiga, que lo invitó a pasar.',q:[['¿Qué hacía la hormiga en verano?','guardaba comida',['cantaba','dormía']],['¿Qué le pasó al grillo en el frío?','no tenía comida',['se fue de viaje','encontró un tesoro']],['¿Cuál es la enseñanza?','Es importante prepararse y ser responsables',['Hay que cantar todo el día','Los grillos son malos']]]}],
 5:[{t:'Juan Pablo Duarte nació en Santo Domingo en 1813. Estudió en Europa y regresó con la idea de una patria libre. En 1838 fundó La Trinitaria, una sociedad secreta que trabajó por la independencia del país.',q:[['¿En qué año nació Duarte?','1813',['1838','1844']],['¿Qué fundó en 1838?','La Trinitaria',['la Constitución','una escuela']],['¿Por qué La Trinitaria era secreta?','Para protegerse mientras luchaban por la independencia',['Porque tenía pocos miembros','Porque se reunía de noche por diversión']]]},
    {t:'Reciclar ayuda a cuidar el planeta. Cuando separamos el papel, el plástico y el vidrio, esos materiales pueden convertirse en nuevos productos. Así se produce menos basura y se ahorran recursos naturales. ¡Empecemos hoy en la escuela!',q:[['¿Cuál es el propósito del texto?','convencer de que reciclemos',['contar un cuento','describir un animal']],['¿Qué se logra al reciclar?','menos basura y ahorro de recursos',['más basura','gastar más agua']],['¿Qué materiales se mencionan?','papel, plástico y vidrio',['madera y metal','tela y cuero']]]}],
 6:[{t:'Los arrecifes de coral son ecosistemas llenos de vida. Cuando la temperatura del mar sube demasiado, los corales expulsan las algas que les dan color y alimento. Este fenómeno se llama blanqueamiento y puede causar la muerte del arrecife.',q:[['¿Qué causa el blanqueamiento?','el aumento de la temperatura del mar',['la lluvia','los peces grandes']],['¿Qué aportan las algas a los corales?','color y alimento',['sal y arena','oxígeno al aire']],['¿Qué se puede concluir?','Cuidar el clima ayuda a proteger los arrecifes',['Los corales no necesitan algas','El mar siempre está frío']]]},
    {t:'Opinión: El recreo debería durar más. Jugar ayuda a descansar la mente y a regresar al aula con más atención. Además, el recreo permite hacer amigos y moverse, algo necesario para la salud.',q:[['¿Qué tipo de texto es?','argumentativo',['narrativo','instructivo']],['¿Cuál es un argumento del autor?','Jugar ayuda a regresar con más atención',['El recreo es aburrido','Las clases deben ser más largas']],['¿Cuál sería un contraargumento?','Un recreo largo reduce el tiempo de clase',['Jugar es divertido','Los niños necesitan amigos']]]}]
};
function genLectura(g,l){
  const T=LECT[g]; const sets = l===3 ? T : [T[l-1]];
  const qs=[]; sets.forEach(s=>s.q.forEach(it=>qs.push(Q(it[0], it[1], uniqOpts(it[1], it[2]), {visual:s.t, visualText:true, say:s.t+'. '+it[0]}))));
  return l===3 ? shuffle(qs) : qs;
}

/* ---------- Ciencias Naturales ---------- */
const CLASIF={
 1:{bins:['Ser vivo','No vivo'], it:[['🐶 perro',0],['🌳 árbol',0],['🪨 piedra',1],['🚗 carro',1],['🐟 pez',0],['🌻 girasol',0],['📱 celular',1],['🧸 peluche',1],['🐦 pájaro',0],['🍄 hongo',0],['⚽ pelota',1],['🐛 oruga',0],['🪑 silla',1],['💧 agua',1]], e:'Los seres vivos nacen, crecen, se alimentan, se reproducen y mueren.'},
 2:{bins:['Doméstico','Salvaje'], it:[['🐶 perro',0],['🐱 gato',0],['🐄 vaca',0],['🐔 gallina',0],['🐴 caballo',0],['🐑 oveja',0],['🦁 león',1],['🐯 tigre',1],['🐘 elefante',1],['🦒 jirafa',1],['🐊 cocodrilo',1],['🐒 mono',1]], e:'Los animales domésticos viven con las personas; los salvajes viven libres en la naturaleza.'},
 3:{bins:['Herbívoro','Carnívoro','Omnívoro'], it:[['🐄 vaca',0],['🐴 caballo',0],['🐰 conejo',0],['🦒 jirafa',0],['🐘 elefante',0],['🦁 león',1],['🦈 tiburón',1],['🐯 tigre',1],['🦅 águila',1],['🐊 cocodrilo',1],['🐻 oso',2],['🐷 cerdo',2],['🐔 gallina',2],['🧑 ser humano',2]], e:'Herbívoro come plantas; carnívoro come carne; omnívoro come de todo.'},
 4:{bins:['Vertebrado','Invertebrado'], it:[['🐟 pez',0],['🐸 rana',0],['🐍 serpiente',0],['🐦 pájaro',0],['🐶 perro',0],['🐢 tortuga',0],['🦋 mariposa',1],['🐌 caracol',1],['🐙 pulpo',1],['🕷️ araña',1],['🐜 hormiga',1],['🪱 lombriz',1],['🦀 cangrejo',1],['🐝 abeja',1]], e:'Los vertebrados tienen columna vertebral; los invertebrados no.'},
 5:{bins:['Sólido','Líquido','Gaseoso'], it:[['🧊 hielo',0],['🪨 roca',0],['🪵 madera',0],['🔑 llave',0],['🥛 leche',1],['💧 agua',1],['🧃 jugo',1],['🍯 miel',1],['💨 aire',2],['♨️ vapor de agua',2],['🎈 helio del globo',2],['🫁 oxígeno',2]], e:'Sólido: forma fija. Líquido: toma la forma del recipiente. Gas: se expande y ocupa todo el espacio.'},
 6:{bins:['Renovable','No renovable'], it:[['☀️ energía solar',0],['💨 viento',0],['💧 agua de los ríos',0],['🌳 bosques',0],['🌾 cultivos',0],['🛢️ petróleo',1],['⛽ gasolina',1],['🪨 carbón mineral',1],['🔥 gas natural',1],['🥇 oro',1]], e:'Los recursos renovables se regeneran; los no renovables se agotan porque tardan millones de años en formarse.'}
};
function genClasif(g,l){
  const C=CLASIF[g]; const n=[6,8,10][l-1];
  return sample(C.it, Math.min(n,C.it.length)).map(([name,b]) => {
    const [em,...rest]=name.split(' ');
    return Q(`¿En qué grupo va: ${rest.join(' ')}?`, C.bins[b], C.bins, {visual:`<div class="egrid">${em}</div><div><b>${rest.join(' ')}</b></div>`, keep:true, explain:C.e});
  });
}
const CUERPO={
 1:[['¿Con qué parte del cuerpo vemos?','los ojos',['las orejas','la nariz']],['¿Con qué parte del cuerpo oímos?','los oídos',['los ojos','la boca']],['¿Con qué olemos?','la nariz',['las manos','los pies']],['¿Con qué sentimos los sabores?','la lengua',['el pelo','la rodilla']],['¿Cuántos sentidos tenemos?','5',['3','10']],['¿Con qué sentimos si algo está caliente?','la piel',['los dientes','el pelo']],['¿Qué usamos para caminar?','las piernas',['las orejas','los codos']]],
 2:[['¿Qué debemos hacer antes de comer?','lavarnos las manos',['jugar en la tierra','ver televisión']],['¿Cuándo debemos cepillarnos los dientes?','después de cada comida',['una vez a la semana','nunca']],['¿Cuál es un alimento saludable?','una fruta',['un refresco','un dulce']],['¿Qué necesitamos para crecer sanos?','comer bien, dormir y hacer ejercicio',['comer solo dulces','dormir poco']],['¿Qué bebida es la mejor para el cuerpo?','agua',['refresco','café']],['¿Para qué sirven las vacunas?','para protegernos de enfermedades',['para crecer más alto','para tener sueño']]],
 3:[['¿Cómo se llama el conjunto de huesos del cuerpo?','esqueleto',['músculo','piel']],['¿Qué huesos protegen el cerebro?','el cráneo',['las costillas','la pelvis']],['¿Qué huesos protegen los pulmones y el corazón?','las costillas',['el cráneo','el fémur']],['¿Cuál es el hueso más largo del cuerpo?','el fémur',['la costilla','el dedo']],['¿Qué nos permiten hacer los músculos?','movernos',['ver','oler']],['¿Cómo se llama la unión entre dos huesos, como la rodilla?','articulación',['vena','pulmón']]],
 4:[['¿Dónde empieza la digestión?','en la boca',['en el estómago','en los pies']],['¿Qué tubo lleva el alimento de la boca al estómago?','el esófago',['la tráquea','la vena']],['¿Dónde se absorben la mayoría de los nutrientes?','en el intestino delgado',['en el esófago','en la boca']],['¿Qué órgano produce la bilis?','el hígado',['el corazón','el pulmón']],['¿Qué dientes sirven para cortar?','los incisivos',['las muelas','los colmillos']],['¿Qué órgano mezcla y tritura el alimento con jugos?','el estómago',['el riñón','el cerebro']]],
 5:[['¿Cuál es el órgano principal de la respiración?','los pulmones',['el estómago','el hígado']],['¿Qué gas tomamos al respirar?','oxígeno',['dióxido de carbono','helio']],['¿Qué gas expulsamos al respirar?','dióxido de carbono',['oxígeno','nitrógeno puro']],['¿Qué órgano bombea la sangre?','el corazón',['el pulmón','el riñón']],['¿Qué vasos llevan la sangre desde el corazón al cuerpo?','las arterias',['las venas','los nervios']],['¿Qué células defienden el cuerpo de infecciones?','los glóbulos blancos',['los glóbulos rojos','las plaquetas']],['¿Qué hacen las plaquetas?','ayudan a cerrar las heridas',['llevan oxígeno','digieren comida']]],
 6:[['¿Cuál es la unidad básica de los seres vivos?','la célula',['el átomo','el órgano']],['¿Qué órgano es el centro de control del cuerpo?','el cerebro',['el corazón','el estómago']],['¿Cómo se llaman las células del sistema nervioso?','neuronas',['glóbulos','músculos']],['¿Qué estructura protege la médula espinal?','la columna vertebral',['el cráneo','las costillas']],['¿Qué parte del encéfalo controla el equilibrio?','el cerebelo',['el cerebro','el bulbo raquídeo']],['Las vacunas fortalecen el sistema...','inmunológico',['digestivo','óseo']],['¿Qué órganos filtran la sangre y producen orina?','los riñones',['los pulmones','el corazón']]]
};
const PLANETA={
 1:[['¿Qué nos da luz y calor durante el día?','el Sol',['la Luna','las nubes']],['¿Qué usamos cuando llueve?','un paraguas',['gafas de sol','un abanico']],['¿Qué necesitan las plantas para vivir?','agua, luz y aire',['dulces','televisión']],['¿Qué vemos en el cielo de noche?','la Luna y las estrellas',['el arcoíris','el Sol']],['¿Dónde debemos botar la basura?','en el zafacón',['en la calle','en el río']],['¿Qué estación es calurosa y con mucho sol?','el verano',['el invierno','la noche']]],
 2:[['El hielo es agua en estado...','sólido',['líquido','gaseoso']],['¿Cómo podemos ahorrar agua?','cerrar la llave al cepillarnos',['dejar la llave abierta','jugar con la manguera']],['¿Alrededor de qué gira la Tierra?','el Sol',['la Luna','Marte']],['¿Qué animal nace de un huevo?','el pollito',['el perro','el gato']],['¿Dónde hay agua salada?','en el mar',['en los ríos','en la lluvia']],['¿Qué parte de la planta está bajo la tierra?','la raíz',['la flor','la hoja']]],
 3:[['Cuando el agua se calienta y sube como vapor se llama...','evaporación',['condensación','precipitación']],['Cuando el vapor forma nubes se llama...','condensación',['evaporación','filtración']],['Cuando el agua cae de las nubes se llama...','precipitación',['evaporación','condensación']],['¿Qué parte de la planta absorbe el agua?','la raíz',['la flor','el fruto']],['¿Qué parte de la planta fabrica el alimento?','la hoja',['la raíz','la semilla']],['¿Cómo se llama el proceso en que la planta fabrica su alimento?','fotosíntesis',['digestión','respiración']],['¿Qué parte de la planta lleva el agua a las hojas?','el tallo',['la flor','el fruto']]],
 4:[['¿Cuál es el planeta más cercano al Sol?','Mercurio',['Venus','Tierra']],['¿Cuál es el planeta más grande?','Júpiter',['Saturno','Tierra']],['¿Qué planeta es conocido como el planeta rojo?','Marte',['Venus','Neptuno']],['¿Qué planeta tiene los anillos más visibles?','Saturno',['Marte','Mercurio']],['¿Cuántos planetas tiene el sistema solar?','8',['9','7']],['¿Cuál es el satélite natural de la Tierra?','la Luna',['el Sol','Marte']],['¿Qué movimiento de la Tierra produce el día y la noche?','rotación',['traslación','gravedad']],['¿Qué movimiento de la Tierra dura un año?','traslación',['rotación','erupción']]],
 5:[['¿Cómo se llaman los seres que fabrican su propio alimento?','productores',['consumidores','descomponedores']],['Un animal que come plantas en la cadena alimenticia es un...','consumidor primario',['productor','descomponedor']],['¿Qué seres descomponen restos de plantas y animales?','hongos y bacterias',['leones y tigres','rosas y pinos']],['El conjunto de seres vivos y el lugar donde viven se llama...','ecosistema',['planeta','cadena']],['¿Qué protegen los manglares?','las costas',['los desiertos','las nubes']],['Un ecosistema de agua salada es...','marino',['de agua dulce','desértico']],['¿Qué pasa si desaparecen los productores de un ecosistema?','los demás seres se quedan sin alimento',['no pasa nada','hay más comida']]],
 6:[['¿Cuál es la capa externa de la Tierra?','la corteza',['el núcleo','el manto']],['¿Cuál es la capa central de la Tierra?','el núcleo',['la corteza','la atmósfera']],['¿Qué fuerza nos atrae hacia el suelo?','la gravedad',['el magnetismo','la fricción']],['La energía que tiene un cuerpo en movimiento es...','cinética',['potencial','química']],['¿Qué energía capturan los paneles solares?','solar',['eólica','nuclear']],['¿En qué unidad se mide la fuerza?','newton',['metro','litro']],['Los terremotos se producen por el movimiento de...','las placas tectónicas',['las nubes','los océanos']],['La fuerza que frena un objeto al rozar una superficie es...','la fricción',['la gravedad','la flotación']]]
};
const genCuerpo = (g,l) => fromBank(CUERPO[g], l);
const genPlaneta = (g,l) => fromBank(PLANETA[g], l);

/* ---------- Ciencias Sociales ---------- */
const PAIS={
 1:[['¿Cómo se llama nuestro país?','República Dominicana',['Puerto Rico','Cuba']],['¿Cuáles son los colores de la bandera dominicana?','azul, rojo y blanco',['verde, blanco y rojo','amarillo, azul y rojo']],['¿De qué color es la cruz de la bandera?','blanca',['amarilla','negra']],['¿Qué lugar es para aprender?','la escuela',['el hospital','el supermercado']],['¿Quién nos enseña en la escuela?','el maestro o la maestra',['el panadero','el chofer']],['¿Qué hacemos cuando suena el Himno Nacional?','nos ponemos de pie con respeto',['corremos','hablamos alto']],['¿Quiénes forman una familia?','personas que se quieren y se cuidan',['solo los vecinos','solo los amigos de la escuela']]],
 2:[['¿Cuál es la capital de la República Dominicana?','Santo Domingo',['Santiago','La Romana']],['¿En qué isla está la República Dominicana?','La Española',['Cuba','Jamaica']],['¿Con qué país compartimos la isla?','Haití',['Puerto Rico','Venezuela']],['¿Cuál es el lema del escudo?','Dios, Patria, Libertad',['Paz y amor','Unidos venceremos']],['¿Quién apaga los incendios?','el bombero',['el médico','el panadero']],['¿Quién cultiva los alimentos en el campo?','el agricultor',['el piloto','el cartero']],['¿Cuál es el ave nacional?','la cigua palmera',['la paloma','el loro']],['¿Qué día celebramos la Independencia Nacional?','27 de febrero',['16 de agosto','25 de diciembre']]],
 3:[['¿Cuántas provincias tiene el país, sin contar el Distrito Nacional?','31',['25','40']],['¿Cuál es el pico más alto de las Antillas?','Pico Duarte',['Pico Bisonó','Loma Isabel de Torres']],['¿Cuál es el lago más grande del país?','Lago Enriquillo',['Laguna Oviedo','Lago Azuei']],['¿Cuál es el río más largo del país?','Yaque del Norte',['Ozama','Isabela']],['¿Cuál es la flor nacional?','la rosa de Bayahíbe',['la rosa roja','el girasol']],['¿Cuál es el árbol nacional?','la caoba',['el roble','el pino']],['¿Cómo se llama la moneda del país?','el peso dominicano',['el dólar','el euro']],['¿Quién dirige un municipio?','el alcalde o la alcaldesa',['el presidente','el director escolar']]],
 4:[['¿Quiénes eran los primeros habitantes de la isla?','los taínos',['los españoles','los romanos']],['¿En cuántos cacicazgos estaba dividida la isla?','cinco',['tres','diez']],['¿Quién fue la cacica de Jaragua?','Anacaona',['Isabel','Caonabo']],['¿Qué cacique se rebeló en la sierra de Bahoruco?','Enriquillo',['Guarionex','Colón']],['¿En qué año llegó Cristóbal Colón a la isla?','1492',['1844','1600']],['¿Qué alimento hacían los taínos con la yuca?','casabe',['pan de trigo','arepa de maíz']],['¿Cómo se llamaba la vivienda redonda de los taínos?','bohío',['iglú','castillo']]],
 5:[['¿Quién fundó La Trinitaria?','Juan Pablo Duarte',['Pedro Santana','Gregorio Luperón']],['¿En qué año se fundó La Trinitaria?','1838',['1844','1863']],['¿Cuándo fue la Independencia Nacional?','27 de febrero de 1844',['16 de agosto de 1863','12 de octubre de 1492']],['¿Quién disparó el trabucazo en la Puerta del Conde?','Matías Ramón Mella',['Juan Pablo Duarte','Gregorio Luperón']],['¿Quiénes son los Padres de la Patria?','Duarte, Sánchez y Mella',['Colón, Ovando y Santana','Luperón, Heureaux y Báez']],['¿Cuándo se inició la Guerra de la Restauración?','16 de agosto de 1863',['27 de febrero de 1844','6 de noviembre de 1844']],['¿Contra qué país se luchó en la Restauración?','España',['Haití','Francia']],['¿Quién anexó el país a España en 1861?','Pedro Santana',['Juan Pablo Duarte','Francisco del Rosario Sánchez']]],
 6:[['¿Cuándo se proclamó la primera Constitución?','6 de noviembre de 1844',['27 de febrero de 1844','16 de agosto de 1863']],['¿En qué ciudad se firmó la primera Constitución?','San Cristóbal',['Santiago','Puerto Plata']],['¿Cuáles son los tres poderes del Estado?','Ejecutivo, Legislativo y Judicial',['Militar, Religioso y Escolar','Municipal, Provincial y Regional']],['¿Quiénes forman el Poder Legislativo?','el Senado y la Cámara de Diputados',['los jueces','los alcaldes']],['El presidente de la República pertenece al Poder...','Ejecutivo',['Judicial','Legislativo']],['¿Quién gobernó como dictador de 1930 a 1961?','Rafael Leónidas Trujillo',['Joaquín Balaguer','Juan Bosch']],['¿Qué fecha recuerda a las hermanas Mirabal?','25 de noviembre',['27 de febrero','1 de mayo']],['¿En qué año fue la Guerra de Abril?','1965',['1844','1916']]]
};
const GEO={
 1:[['¿Qué es un mapa?','un dibujo de un lugar visto desde arriba',['una foto de una persona','un cuento']],['Un lugar con mucha agua salada es...','el mar',['la montaña','el río']],['Una gran elevación de tierra es...','una montaña',['un lago','una calle']],['Una corriente de agua dulce que corre es...','un río',['una playa','una isla']],['¿Dónde vivimos con nuestra familia?','en la casa',['en el hospital','en la escuela']],['El lugar donde vivimos junto a nuestros vecinos es la...','comunidad',['nube','montaña']]],
 2:[['¿Por dónde sale el Sol?','por el Este',['por el Oeste','por el Sur']],['¿Por dónde se oculta el Sol?','por el Oeste',['por el Este','por el Norte']],['¿Cuántos puntos cardinales hay?','4',['2','8']],['¿Cuál es el punto cardinal opuesto al Norte?','el Sur',['el Este','el Oeste']],['Una porción de tierra rodeada de agua es una...','isla',['montaña','llanura']],['Un dibujo que muestra las partes de la escuela es un...','plano',['cuento','calendario']]],
 3:[['¿Qué país está al oeste de la República Dominicana?','Haití',['Puerto Rico','Cuba']],['¿Qué mar está al sur del país?','el Mar Caribe',['el Mar Mediterráneo','el Mar Rojo']],['¿Qué océano está al norte del país?','el océano Atlántico',['el océano Pacífico','el océano Índico']],['¿Cuál es la cordillera más alta del país?','la Cordillera Central',['la Cordillera Oriental','la Sierra de Bahoruco']],['¿Cómo se llama el gran valle fértil del norte?','Valle del Cibao',['Valle de San Juan','Valle de Neiba']],['¿Junto a qué río está la ciudad de Santo Domingo?','el Ozama',['el Yaque del Norte','el Artibonito']]],
 4:[['¿En qué región está Santiago?','el Cibao (Norte)',['el Sur','el Este']],['¿En qué provincia está Punta Cana?','La Altagracia',['Barahona','Dajabón']],['La provincia de Barahona está en la región...','Sur',['Norte','Este']],['La Romana y San Pedro de Macorís están en la región...','Este',['Norte','Sur']],['¿Dónde está la bahía de Samaná?','en el noreste',['en el suroeste','en el centro']],['¿Qué provincia hace frontera con Haití al norte?','Dajabón',['La Altagracia','Samaná']]],
 5:[['¿En qué continente está la República Dominicana?','América',['Europa','África']],['¿Cuál es el continente más grande?','Asia',['Europa','Oceanía']],['¿Cuál es el océano más grande?','el Pacífico',['el Atlántico','el Índico']],['La República Dominicana forma parte de las...','Antillas Mayores',['Antillas Menores','Islas Canarias']],['¿En qué continente está Brasil?','América del Sur',['África','Asia']],['¿En qué continente está Egipto?','África',['Asia','Europa']]],
 6:[['¿Qué línea imaginaria divide la Tierra en norte y sur?','el Ecuador',['el meridiano de Greenwich','el Trópico de Capricornio']],['El meridiano de Greenwich divide la Tierra en...','este y oeste',['norte y sur','día y noche']],['¿En qué hemisferio está la República Dominicana?','norte',['sur','ninguno']],['La República Dominicana está entre el Ecuador y el...','Trópico de Cáncer',['Trópico de Capricornio','Polo Sur']],['La latitud mide la distancia desde...','el Ecuador',['Greenwich','el Polo Sur']],['¿Qué instrumento ayuda a orientarnos con los puntos cardinales?','la brújula',['el termómetro','la balanza']]]
};
const genPais = (g,l) => fromBank(PAIS[g], l);
const genGeoSoc = (g,l) => fromBank(GEO[g], l);
const TIEMPO={
 1:[['¿En qué orden pasa tu día?',['Despertarme 🌅','Desayunar 🍳','Ir a la escuela 🏫','Dormir 😴']],['¿Cómo nos lavamos las manos?',['Mojar las manos 💧','Poner jabón 🧼','Frotar 👐','Enjuagar 🚿','Secar 🧻']],['Ordena los días',['Lunes','Martes','Miércoles','Jueves','Viernes']]],
 2:[['Ordena las etapas de la vida',['Bebé 👶','Niño 🧒','Joven 🧑','Adulto 🧔','Anciano 👴']],['Ordena las partes del día',['Mañana 🌅','Mediodía ☀️','Tarde 🌇','Noche 🌙']],['Ordena los meses',['Enero','Febrero','Marzo','Abril','Mayo']]],
 3:[['Del campo a la mesa',['Siembra 🌱','Cosecha 🧺','Transporte 🚚','Mercado 🏪','Mesa 🍽️']],['Ordena cómo cambió la comunicación',['Carta ✉️','Teléfono fijo ☎️','Teléfono celular 📱']],['Ordena estos hechos de la historia',['Los taínos habitan la isla','Llega Cristóbal Colón (1492)','Se funda la ciudad de Santo Domingo (1496)']]],
 4:[['Ordena estos hechos de la colonia',['Llegada de Colón a la isla (1492)','Fundación de La Isabela','Fundación de Santo Domingo (1496)','Rebelión de Enriquillo (1519)']],['Ordena el ciclo del agua',['Evaporación','Condensación','Precipitación','Escurrimiento hacia ríos y mares']]],
 5:[['Ordena el camino a la independencia',['Fundación de La Trinitaria (1838)','Independencia Nacional (1844)','Anexión a España (1861)','Guerra de la Restauración (1863)']],['Ordena la vida de Duarte',['Nace Juan Pablo Duarte (1813)','Funda La Trinitaria (1838)','Se proclama la Independencia (1844)']]],
 6:[['Ordena estos hechos de la historia dominicana',['Independencia Nacional (1844)','Guerra de la Restauración (1863)','Primera ocupación de EE. UU. (1916)','Fin de la dictadura de Trujillo (1961)','Guerra de Abril (1965)']],['Ordena los pasos del método científico',['Observar','Hacer una pregunta','Formular una hipótesis','Experimentar','Sacar conclusiones']]]
};
function genTiempo(g,l){
  return TIEMPO[g].map(([p,items]) => {
    const tk = l===3 ? items.map(s=>s.replace(/\s*\(\d{4}\)/,'')) : items;
    return {type:'arrange', prompt:p+' (toca en orden)', tokens:tk, joiner:' → ', vertical:true, explain:'Orden correcto: '+tk.join(' → ')};
  });
}

/* ---------- Inglés ---------- */
const VOCAB={
 1:[['red','🔴'],['blue','🔵'],['green','🟢'],['yellow','🟡'],['orange','🟠'],['purple','🟣'],['dog','🐶'],['cat','🐱'],['fish','🐟'],['bird','🐦'],['cow','🐄'],['duck','🦆']],
 2:[['eye','👁️'],['ear','👂'],['nose','👃'],['mouth','👄'],['hand','✋'],['foot','🦶'],['book','📕'],['pencil','✏️'],['backpack','🎒'],['scissors','✂️'],['baby','👶'],['grandmother','👵']],
 3:[['apple','🍎'],['banana','🍌'],['bread','🍞'],['milk','🥛'],['egg','🥚'],['rice','🍚'],['cheese','🧀'],['shirt','👕'],['shoes','👟'],['cap','🧢'],['dress','👗'],['socks','🧦']],
 4:[['house','🏠'],['school','🏫'],['hospital','🏥'],['bed','🛏️'],['door','🚪'],['beach','🏖️'],['store','🏪'],['church','⛪'],['bus','🚌'],['car','🚗'],['bike','🚲'],['tree','🌳']],
 5:[['doctor','🧑‍⚕️'],['teacher','🧑‍🏫'],['farmer','🧑‍🌾'],['firefighter','🧑‍🚒'],['police officer','👮'],['cook','🧑‍🍳'],['sunny','☀️'],['rainy','🌧️'],['windy','💨'],['cloudy','☁️'],['snowy','❄️'],['hot','🥵']],
 6:[['run','🏃'],['swim','🏊'],['read','📖'],['write','✍️'],['sing','🎤'],['dance','💃'],['sleep','😴'],['eat','🍽️'],['drink','🥤'],['play','⚽'],['cook','🍳'],['paint','🎨']]
};
function genListen(g,l){
  const V=VOCAB[g];
  return sample(V, 8).map(([w,e]) => {
    const others=sample(V.filter(x=>x[0]!==w),3);
    if (l===3) return Q('Choose the word / Elige la palabra', w, uniqOpts(w, others.map(x=>x[0])), {visual:`<div class="egrid">${e}</div>`, say:w, lang:'en-US', sayOnAnswer:true, noAuto:true});
    return Q(l===1?'Listen and choose 🎧 (Escucha y elige)':`Read and choose: <b>${w}</b>`, e, uniqOpts(e, others.map(x=>x[1])), {big:true, say:w, lang:'en-US', autoSay:l===1, explain:`${w} = ${e}`});
  });
}
function genMemoria(g,l){
  return {type:'memory', pairs: sample(VOCAB[g], [4,5,6][l-1])};
}
const SENT={
 1:[['I am happy','Estoy feliz'],['It is red','Es rojo'],['I see a cat','Veo un gato'],['The dog is big','El perro es grande'],['I like blue','Me gusta el azul']],
 2:[['This is my mother','Esta es mi mamá'],['I have two eyes','Tengo dos ojos'],['My book is green','Mi libro es verde'],['Open your book','Abre tu libro'],['I am seven years old','Tengo siete años']],
 3:[['I like apples','Me gustan las manzanas'],['She has a red dress','Ella tiene un vestido rojo'],['We eat rice and beans','Comemos arroz y habichuelas'],["I don't like milk",'No me gusta la leche'],['He is wearing shoes','Él lleva zapatos']],
 4:[['My house is big','Mi casa es grande'],['The school is near the park','La escuela está cerca del parque'],['There is a bed in my room','Hay una cama en mi cuarto'],['I go to the beach','Voy a la playa'],['Where is the hospital?','¿Dónde está el hospital?']],
 5:[['It is sunny today','Hoy está soleado'],['My father is a doctor','Mi papá es doctor'],['She wants to be a teacher','Ella quiere ser maestra'],['It is raining now','Está lloviendo ahora'],['Yesterday it was windy','Ayer hizo viento']],
 6:[['I played soccer yesterday','Jugué fútbol ayer'],['She is reading a book','Ella está leyendo un libro'],['We are going to swim','Vamos a nadar'],['Can you help me?','¿Puedes ayudarme?'],['They ate pizza last night','Ellos comieron pizza anoche']]
};
function genOracion(g,l){
  const extra=['the','is','a','my','and','to'];
  return sample(SENT[g], [3,4,5][l-1]).map(([en,es]) => {
    const tk=en.split(' ');
    return {type:'arrange', prompt:'Build the sentence / Arma la oración', visual:`<div><b>${es}</b></div>`, tokens:tk, decoys: l===3?sample(extra.filter(x=>!tk.includes(x)),1):[], joiner:' ', say:en, lang:'en-US', sayAnswer:en, sayAnswerLang:'en-US', explain:en};
  });
}

/* ---------- Pensamiento lógico ---------- */
const SETS=[['🍎','🍌','🍇','🍓'],['🔴','🔵','🟢','🟡'],['⭐','🌙','☀️','☁️'],['🐶','🐱','🐰','🐻']];
const ANALOG=[['Perro es a ladrar como gato es a...','maullar',['volar','nadar']],['Pez es a agua como pájaro es a...','aire',['tierra','arena']],['Día es a noche como frío es a...','calor',['hielo','invierno']],['Mano es a guante como pie es a...','zapato',['sombrero','anillo']],['Libro es a leer como canción es a...','cantar',['comer','dormir']],['Doctor es a hospital como maestro es a...','escuela',['mercado','playa']],['Semilla es a árbol como huevo es a...','pollito',['nido','plátano']],['3 es a 6 como 5 es a...','10',['8','15']],['Alto es a bajo como rápido es a...','lento',['veloz','corto']]];
const INTRUSO=[[['🍎','🍌','🍇'],'🚗'],[['🐶','🐱','🐰'],'🌳'],[['✏️','📕','🎒'],'🍕'],[['🚗','🚌','🚲'],'🐟'],[['🌹','🌻','🌷'],'⚽'],[['☀️','🌙','⭐'],'👟']];
function seqQ(arr, ans, rule){
  return NQ('¿Qué número sigue?', ans, {visual:`<div class="expr" style="font-size:var(--fs-3xl)">${arr.join(', ')}, ?</div>`, explain:rule});
}
function genPatrones(g,l){
  return times(8, () => {
    if (g<=2 && !(g===2 && l===3)){
      const s=sample(pick(SETS),3); const [A,B,C]=s;
      let unit;
      if (g===1) unit = l===1?[A,B]:l===2?[A,A,B,B]:[A,B,C];
      else unit = l===1?pick([[A,B,C],[A,A,B]]):[A,B,B];
      const seq=times(Math.max(6, unit.length*2+1),i=>unit[i%unit.length]); const ans=unit[seq.length%unit.length];
      return Q('¿Qué sigue en el patrón?', ans, uniqOpts(ans, shuffle(s.filter(x=>x!==ans))), {visual:`<div class="egrid">${seq.join('')}❓</div>`, big:true});
    }
    if (g===2){ const st=rnd(1,10), d=pick([1,2]); const a=times(5,i=>st+i*d); return seqQ(a, st+5*d, `Va sumando ${d}.`); }
    if (g===3){ const d = l===1?pick([2,5,10]):l===2?-pick([2,5]):pick([3,4]); const st=d<0?rnd(40,80):rnd(0,20); const a=times(5,i=>st+i*d); return seqQ(a, st+5*d, d<0?`Va restando ${-d}.`:`Va sumando ${d}.`); }
    if (g===4){
      if (l===1){ const d=rnd(6,12), st=rnd(1,30); const a=times(5,i=>st+i*d); return seqQ(a, st+5*d, `Va sumando ${d}.`); }
      if (l===2){ const st=rnd(1,5); const a=times(5,i=>st*2**i); return seqQ(a, st*2**5, 'Cada número es el doble del anterior.'); }
      const [grp,odd]=pick(INTRUSO); const all=shuffle(grp.concat(odd));
      return Q('¿Cuál NO pertenece al grupo?', odd, all, {big:true, keep:true, explain:'Los demás son de la misma categoría.'}); }
    if (g===5){
      if (l===1){ const a1=rnd(3,6), b1=rnd(1,a1-1); let v=rnd(5,20); const a=[v]; for(let i=1;i<6;i++){ v = i%2? v+a1 : v-b1; a.push(v);} const next = 6%2? v+a1 : v-b1; return seqQ(a, next, `Alterna: +${a1}, −${b1}.`); }
      if (l===2){ const it=pick(ANALOG); return Q(it[0], it[1], uniqOpts(it[1], it[2])); }
      const st=rnd(1,3); const a=times(5,i=>st*3**i); return seqQ(a.slice(0,4), st*3**4, 'Cada número se multiplica por 3.'); }
    if (l===1){ const a=times(5,i=>(i+1)**2); return seqQ(a, 36, 'Son los cuadrados: 1², 2², 3²...'); }
    if (l===2){ const x=rnd(1,3), y=rnd(1,3); const f=[x,y]; for(let i=2;i<6;i++) f.push(f[i-1]+f[i-2]); return seqQ(f, f[4]+f[5], 'Cada número es la suma de los dos anteriores.'); }
    const t=pick(['tri','dbl']);
    if (t==='tri'){ const a=[1,3,6,10,15]; return seqQ(a, 21, 'Se suma 2, 3, 4, 5... (números triangulares).'); }
    const st=rnd(1,4); const a=[st]; for(let i=1;i<5;i++) a.push(a[i-1]*2+1); return seqQ(a, a[4]*2+1, 'Cada número es el doble del anterior más 1.');
  });
}

/* ---------- Valores ---------- */
const VALORES=[
 ['Encuentras una cartera en el patio de la escuela.','Se la entrego a la maestra para buscar a su dueño',['Me la quedo','La escondo'],'Honestidad: devolver lo que no es nuestro.'],
 ['Un compañero nuevo está solo en el recreo.','Lo invito a jugar',['Lo ignoro','Me río de él'],'Empatía: ponerse en el lugar del otro.'],
 ['Rompiste sin querer el lápiz de tu amiga.','Le pido disculpas y le ofrezco el mío',['Digo que no fui yo','Lo boto para que no lo vea'],'Responsabilidad: asumir lo que hacemos.'],
 ['Tienes tarea, pero quieres jugar.','Hago la tarea primero y luego juego',['Juego y no hago la tarea','Copio la tarea de otro'],'Responsabilidad: cumplir primero los deberes.'],
 ['Ves basura en el piso del aula.','La recojo y la echo en el zafacón',['La dejo ahí','La tiro por la ventana'],'Cuidado del ambiente.'],
 ['Tu amigo está hablando y tú también quieres hablar.','Espero mi turno y lo escucho',['Lo interrumpo','Hablo más alto que él'],'Respeto: escuchar a los demás.'],
 ['Un compañero se equivoca leyendo en voz alta.','Lo animo a seguir',['Me burlo','Le quito el libro'],'Respeto y empatía.'],
 ['Un vecino mayor carga bolsas pesadas.','Le ofrezco ayuda',['Hago como que no lo veo','Me río'],'Solidaridad: ayudar a quien lo necesita.'],
 ['Un ejercicio te sale mal varias veces.','Sigo practicando y pido ayuda',['Me rindo','Rompo la hoja'],'Perseverancia: no rendirse.'],
 ['Alguien comparte una foto burlona de un compañero en el chat.','No la comparto y aviso a un adulto',['La comparto','Escribo algo burlón'],'Respeto también en internet.'],
 ['Un compañero tiene costumbres o acento diferente al tuyo.','Lo respeto y aprendo de él',['Me burlo de él','No le hablo'],'Tolerancia: respetar las diferencias.'],
 ['En el colmado te dan cambio de más.','Devuelvo el dinero que sobra',['Me lo quedo','Compro dulces con eso'],'Honestidad.'],
 ['Tu equipo perdió el partido.','Felicito al otro equipo',['Me enojo y empujo','Digo que hicieron trampa'],'Respeto y deportividad.'],
 ['Notas que la llave del agua quedó abierta.','La cierro para no desperdiciar',['La dejo así','Juego con el agua'],'Cuidado de los recursos.'],
 ['Prometiste ayudar a tu mamá a recoger la casa.','Cumplo lo que prometí',['Me escondo','Digo que estoy cansado y me voy a jugar'],'Responsabilidad: cumplir nuestra palabra.'],
 ['Un desconocido en internet te pide tu dirección.','No se la doy y aviso a un adulto de confianza',['Se la doy','Le mando una foto de mi casa'],'Prudencia y seguridad.']
];
const genValores = (g,l) => fromBank(g<=2?VALORES.slice(0,10):VALORES, l, [5,7,9]).map(q=>Object.assign(q,{prompt:'¿Qué harías tú? <br><span class="muted" style="font-weight:600">'+q.prompt+'</span>', say:'¿Qué harías tú? '+q.prompt, one:true}));

/* =========================================================
   CATÁLOGO DE 20 JUEGOS
   ========================================================= */
const GAMES=[
 {id:'contar',   area:'mat', name:'Cuenta y toca',        icon:'🐞', grades:[1,2], gen:genContar,     desc:'Conteo, decenas y unidades'},
 {id:'ops',      area:'mat', name:'Operaciones',          icon:'➕', grades:[1,6], gen:genOps,        desc:'Suma, resta, multiplicación, división y porcentajes'},
 {id:'tablas',   area:'mat', name:'Tablas mágicas',       icon:'✖️', grades:[2,6], gen:genTablas,     desc:'Multiplicación y división'},
 {id:'fracc',    area:'mat', name:'Pizza de fracciones',  icon:'🍕', grades:[2,6], gen:genFracciones, desc:'Fracciones, decimales y porcentajes'},
 {id:'geo',      area:'mat', name:'Figuras y medidas',    icon:'📐', grades:[1,6], gen:genGeo,        desc:'Figuras, perímetro, área y volumen'},
 {id:'silabas',  area:'len', name:'Vocales y sílabas',    icon:'🔤', grades:[1,2], gen:genSilabas,    desc:'Conciencia fonológica'},
 {id:'palabra',  area:'len', name:'Arma la palabra',      icon:'🧱', grades:[1,6], gen:genPalabra,    desc:'Escritura y vocabulario'},
 {id:'gram',     area:'len', name:'Detective gramatical', icon:'🔍', grades:[2,6], gen:genGram,       desc:'Gramática y ortografía'},
 {id:'lectura',  area:'len', name:'Lectura comprensiva',  icon:'📚', grades:[1,6], gen:genLectura,    desc:'Comprensión de textos'},
 {id:'clasif',   area:'nat', name:'Clasifica la naturaleza', icon:'🌱', grades:[1,6], gen:genClasif,  desc:'Seres vivos, animales, materia y recursos'},
 {id:'cuerpo',   area:'nat', name:'Mi cuerpo',            icon:'🫀', grades:[1,6], gen:genCuerpo,     desc:'Sentidos, salud y sistemas del cuerpo'},
 {id:'planeta',  area:'nat', name:'Planeta y universo',   icon:'🪐', grades:[1,6], gen:genPlaneta,    desc:'Agua, plantas, sistema solar, ecosistemas y energía'},
 {id:'pais',     area:'soc', name:'Mi país',              icon:'🇩🇴', grades:[1,6], gen:genPais,      desc:'Símbolos patrios, historia y ciudadanía'},
 {id:'geosoc',   area:'soc', name:'Explora el mapa',      icon:'🧭', grades:[1,6], gen:genGeoSoc,     desc:'Orientación y geografía'},
 {id:'tiempo',   area:'soc', name:'Línea del tiempo',     icon:'⏳', grades:[1,6], gen:genTiempo,     desc:'Secuencias y hechos históricos'},
 {id:'listen',   area:'ing', name:'Listen & Choose',      icon:'🎧', grades:[1,6], gen:genListen,     desc:'Vocabulario con audio'},
 {id:'memoria',  area:'ing', name:'Memoria bilingüe',     icon:'🃏', grades:[1,6], gen:genMemoria,    desc:'Parejas palabra–imagen'},
 {id:'oracion',  area:'ing', name:'Sentence Builder',     icon:'🧩', grades:[1,6], gen:genOracion,    desc:'Construir oraciones'},
 {id:'patrones', area:'log', name:'Patrones y secuencias',icon:'🔁', grades:[1,6], gen:genPatrones,   desc:'Patrones, series, analogías e intrusos'},
 {id:'valores',  area:'val', name:'¿Qué harías tú?',      icon:'🤝', grades:[1,6], gen:genValores,    desc:'Honestidad, respeto, empatía y responsabilidad'}
];
const GM = Object.fromEntries(GAMES.map(g=>[g.id,g]));
const LEVELS = ['Nivel 1','Nivel 2','Reto'];
function routeNodes(area,g){
  return GAMES.filter(x=>x.area===area && g>=x.grades[0] && g<=x.grades[1])
    .flatMap(x=>[1,2,3].map(l=>({gid:x.id,l,key:`${x.id}|${g}|${l}`})));
}

/* =========================================================
   ESTADO Y PERSISTENCIA
   ========================================================= */
function load(){ try{ const r=localStorage.getItem(KEY); if(r) return JSON.parse(r);}catch(e){} return {profiles:[],current:null,progress:{},settings:{unlockAll:false,voice:true}}; }
let S = load();
function save(){ try{ localStorage.setItem(KEY, JSON.stringify(S)); }catch(e){} }
const prof = () => S.profiles.find(p=>p.id===S.current);
const P = pid => (S.progress[pid] = S.progress[pid] || {});
function starsOf(pid,key){ return (S.progress[pid]||{})[key]?.stars || 0; }
function isUnlocked(pid, nodes, i){ return S.settings.unlockAll || i===0 || starsOf(pid,nodes[i-1].key)>0; }
function areaStats(pid, area, g){
  const nodes=routeNodes(area,g); const got=nodes.reduce((s,n)=>s+starsOf(pid,n.key),0);
  return {got, max:nodes.length*3};
}

/* =========================================================
   MASCOTA ANIMADA
   ========================================================= */
const MASCOTS={'🦊':'Zorri','🐢':'Tortu','🦉':'Búho Sabio','🐬':'Delfi','🦁':'Leo','🐼':'Panchito','🐸':'Rita','🦋':'Mari','🐝':'Abejita','🐨':'Koko','🦜':'Cotorrín','🐙':'Pulpi'};
const RM = typeof matchMedia!=='undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
const mname = e => MASCOTS[e] || 'tu amigo';
function mascot(e,size=64,id='msc',cls=''){ return `<div class="mascot ${cls}" id="${id}" style="--ms:${size}px"><span class="body">${e}</span><span class="shadow"></span></div>`; }
function speaker(html, size=60){ return `<div class="speaker">${mascot(prof().avatar,size)}<div class="bubble">${html}</div></div>`; }
function react(mood, id='msc'){
  /* también reacciona el animalito que está dentro de la escena (#scp) */
  const ms=[document.getElementById(id), id==='msc'?document.getElementById('scp'):null].filter(Boolean); if(!ms.length) return;
  ms.forEach((m,k)=>{ m.classList.remove('happy','sad','talk','surprised','think'); void m.offsetWidth; m.classList.add(mood);
    if (mood==='happy' && k===ms.length-1) sparks(m);
    setTimeout(()=>m.classList.remove(mood), mood==='surprised'?1800:1500); });
}
function sparks(el, n=9){
  if (RM) return; const r=el.getBoundingClientRect();
  for (let i=0;i<n;i++){ const s=document.createElement('span'); s.className='spark'; s.textContent=pick(['✨','⭐','💛','🌟']);
    const a=Math.random()*Math.PI*2, d=50+Math.random()*50; s.style.left=(r.left+r.width/2)+'px'; s.style.top=(r.top+r.height/2)+'px';
    s.style.setProperty('--dx',Math.cos(a)*d+'px'); s.style.setProperty('--dy',Math.sin(a)*d+'px');
    document.body.appendChild(s); setTimeout(()=>s.remove(),1000); }
}
function confetti(){
  if (RM) return; const cols=['#FADFCC','#F6D8E1','#D2EDDF','#D6E9F6','#E2DCF5','#F8EFC9','#D9946C','#8F82C6','#6FAF8F'];
  for (let i=0;i<26;i++){ const c=document.createElement('div'); c.className='conf'; c.style.left=Math.random()*100+'vw'; c.style.background=pick(cols);
    c.style.animationDuration=(2+Math.random()*2)+'s'; c.style.animationDelay=(Math.random()*.6)+'s'; document.body.appendChild(c); setTimeout(()=>c.remove(),4800); }
}
function flyTo(el, targetId='msc'){
  if (RM) return; const t=document.getElementById(targetId); if(!t||!el) return;
  const a=el.getBoundingClientRect(), b=t.getBoundingClientRect(); const c=el.cloneNode(true);
  c.classList.add('fly'); c.style.left=a.left+'px'; c.style.top=a.top+'px'; c.style.width=a.width+'px'; c.style.height=a.height+'px'; c.style.margin='0';
  document.body.appendChild(c);
  requestAnimationFrame(()=>requestAnimationFrame(()=>{ c.style.transform=`translate(${b.left+b.width/2-a.left-a.width/2}px,${b.top+b.height/2-a.top-a.height/2}px) scale(.15)`; c.style.opacity='.2'; }));
  setTimeout(()=>c.remove(),600);
}

/* =========================================================
   VOZ Y SONIDO
   ========================================================= */
function speak(text, lang='es-ES'){
  try{
    if (!S.settings.voice || !('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(strip(text)); u.lang=lang; u.rate=lang.startsWith('en')?0.85:0.95;
    const v=speechSynthesis.getVoices().find(v=>v.lang.toLowerCase().startsWith(lang.slice(0,2).toLowerCase()));
    if (v) u.voice=v;
    const m=document.getElementById('msc');
    if (m){ u.onstart=()=>m.classList.add('talk'); u.onend=u.onerror=()=>m.classList.remove('talk'); }
    speechSynthesis.speak(u);
  }catch(e){}
}
let AC=null;
function tone(ok){
  try{
    AC = AC || new (window.AudioContext||window.webkitAudioContext)();
    const notes = ok ? [523.25,659.25] : [330,294];
    notes.forEach((f,i)=>{ const o=AC.createOscillator(), g=AC.createGain(); o.type='sine'; o.frequency.value=f;
      const t=AC.currentTime+i*0.12; g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(0.12,t+0.02); g.gain.exponentialRampToValueAtTime(0.0001,t+0.35);
      o.connect(g).connect(AC.destination); o.start(t); o.stop(t+0.4); });
  }catch(e){}
}

/* =========================================================
   VISTAS
   ========================================================= */
const app = typeof document!=='undefined' ? document.getElementById('app') : null;
const fb  = typeof document!=='undefined' ? document.getElementById('fb') : null;
let view = {name:'profiles'};
function go(v){ view=v; hideFb(); window.scrollTo(0,0); render(); }
function render(){
  try{ if('speechSynthesis' in window) speechSynthesis.cancel(); }catch(e){}
  if (view.name!=='toy' && typeof toyCleanup!=='undefined' && toyCleanup){ toyCleanup(); toyCleanup=null; }
  setTimeout(decorVT,0);
  ({profiles:vProfiles, newProfile:vNewProfile, home:vHome, learn:vLearn, toy:vToy, route:vRoute, play:vPlay, result:vResult, adults:vAdults}[view.name] || window.VIEWS[view.name])();
}
const bind = (sel, fn) => app.querySelectorAll(sel).forEach(el=>el.addEventListener('click', e=>fn(el,e)));

function vProfiles(){
  app.innerHTML = `
  <div class="row"><div class="logo">Semi<span>llita</span></div><div class="sp"></div><button class="chip" id="adults">👤 Adultos</button></div>
  <p class="muted" style="font-size:var(--fs-md);margin:var(--s-2) 0 0">Aprende jugando · 1ro a 6to de Primaria</p>
  <h2 style="margin-top:var(--s-7)">¿Quién va a jugar?</h2>
  <div class="profiles">
    ${S.profiles.map(p=>`<button class="pcard" data-id="${p.id}"><div class="av" style="width:76px;height:76px;margin:0 auto">${petMini(p,76)}</div><b>${esc(p.name)}</b><span class="muted">${p.age?p.age+' años · ':''}${GRADES[p.grade-1]}</span></button>`).join('')}
    <button class="pcard add" id="add"><div class="av">＋</div><b>Nuevo perfil</b></button>
  </div>`;
  bind('.pcard[data-id]', el=>{ S.current=el.dataset.id; save(); go({name:'home'}); });
  bind('#add', ()=>go({name:'newProfile'}));
  bind('#adults', ()=>gate());
}
function vNewProfile(){
  let av=AVATARS[0], gr=1, age=6;
  app.innerHTML = `
  <div class="row"><button class="icon-btn" id="back">←</button><h2>Nuevo perfil</h2></div>
  <label class="lb">Nombre</label><input class="txt" id="nm" maxlength="20" placeholder="Escribe el nombre">
  <label class="lb">Edad</label><div class="grades">${[5,6,7,8,9,10,11,12].map(a=>`<button class="chip ${a===6?'on':''}" data-age="${a}">${a} años</button>`).join('')}</div>
  <label class="lb">Grado</label><div class="grades">${GRADES.map((g,i)=>`<button class="chip ${i===0?'on':''}" data-g="${i+1}">${g}</button>`).join('')}</div>
  <label class="lb">Elige tu animalito amigo</label><div class="avatars">${AVATARS.map((a,i)=>`<button class="${i===0?'on':''}" data-a="${a}"><span style="display:block;height:56px">${creature(SPECIES[a],{outfit:{hat:'brote'}})}</span><small>${MASCOTS[a]}</small></button>`).join('')}</div>
  <div style="margin-top:var(--s-7)"><button class="btn full" id="ok">Crear perfil</button></div>`;
  bind('#back', ()=>go({name:'profiles'}));
  bind('[data-g]', el=>{ gr=+el.dataset.g; app.querySelectorAll('[data-g]').forEach(b=>b.classList.toggle('on', b===el)); });
  bind('[data-age]', el=>{ age=+el.dataset.age; app.querySelectorAll('[data-age]').forEach(b=>b.classList.toggle('on', b===el)); gr=Math.max(1,Math.min(6,age-5)); app.querySelectorAll('[data-g]').forEach(b=>b.classList.toggle('on', +b.dataset.g===gr)); });
  bind('[data-a]', el=>{ av=el.dataset.a; app.querySelectorAll('[data-a]').forEach(b=>b.classList.toggle('on', b===el)); sparks(el,6); speak(`¡Hola! Soy ${MASCOTS[av]}`); });
  bind('#ok', ()=>{ const nm=document.getElementById('nm').value.trim(); if(!nm){ document.getElementById('nm').focus(); return; }
    const p={id:'p'+Date.now(), name:nm, grade:gr, age, avatar:av}; S.profiles.push(p); S.current=p.id; save(); go({name:'home'}); });
}
function vLearn(){
  const p=prof(); if(!p) return go({name:'profiles'});
  const total=Object.values(P(p.id)).reduce((s,x)=>s+(x.stars||0),0);
  app.innerHTML = `
  <div class="top"><button class="icon-btn" id="switch">←</button><h2>🎒 Retos por grado</h2><span class="stars-pill">⭐ ${total}</span></div>
  ${speaker(`Elige una ruta. ¡Yo te acompaño, ${esc(p.name)}!`,60)}
  <div class="areas">${AREAS.map(a=>{ const s=areaStats(p.id,a.id,p.grade); const pct=s.max?Math.round(s.got/s.max*100):0;
    return `<button class="area bg-${a.c}" data-a="${a.id}"><span class="ic">${a.icon}</span><b>${a.name}</b><small>⭐ ${s.got} / ${s.max}</small><div class="bar"><i class="fg-${a.c}" style="width:${pct}%"></i></div></button>`; }).join('')}</div>`;
  bind('[data-a]', el=>go({name:'route', area:el.dataset.a, g:p.grade}));
  bind('#switch', ()=>go({name:'home'}));
}
function vRoute(){
  const p=prof(), A=AREAS.find(a=>a.id===view.area), g=view.g; const nodes=routeNodes(A.id,g);
  let html=`<div class="top"><button class="icon-btn" id="back">←</button><span style="font-size:var(--fs-3xl)">${A.icon}</span><h2>${A.name}</h2></div>
  <div class="tabs">${GRADES.map((x,i)=>`<button class="chip ${i+1===g?'on':''}" data-g="${i+1}">${x}</button>`).join('')}</div><div class="route">`;
  let cur=null;
  nodes.forEach((n,i)=>{
    const G=GM[n.gid];
    if (cur!==n.gid){ if(cur) html+='</div>'; cur=n.gid; html+=`<div class="gblock"><span class="gi bg-${A.c}">${G.icon}</span><div><b>${G.name}</b><small>${G.desc}</small></div></div><div class="nodes">`; }
    const st=starsOf(p.id,n.key), un=isUnlocked(p.id,nodes,i);
    html+=`<button class="node ${un?'':'lock'} bg-${A.c}" data-i="${i}" ${un?'':'aria-disabled="true"'}><span class="lv">${LEVELS[n.l-1]}</span>${un?(n.l===3?'🏆':n.l):'🔒'}<span class="st">${un?'★'.repeat(st)+'☆'.repeat(3-st):''}</span></button>`;
  });
  if (cur) html+='</div>';
  html+='</div>';
  app.innerHTML=html;
  bind('#back', ()=>go({name:'learn'}));
  bind('[data-g]', el=>go({name:'route', area:A.id, g:+el.dataset.g}));
  bind('.node', el=>{ const i=+el.dataset.i; if(!isUnlocked(p.id,nodes,i)) return; startGame(nodes[i].gid, g, nodes[i].l, A.id); });
}

function decorVT(){ document.querySelectorAll('.vt').forEach(b=>{ const on=S.settings.voice!==false; b.innerHTML= typeof kic==='function'&&kic('sonido')?kic(on?'sonido':'silencio','1.1em'):(on?'🔊':'🔇'); b.title=on?'Voz encendida':'Voz apagada'; b.setAttribute('aria-label',b.title);
  if(!b._vt){ b._vt=1; b.addEventListener('click',e=>{ e.stopPropagation(); S.settings.voice=!(S.settings.voice!==false); save(); try{ speechSynthesis.cancel(); }catch(_){} decorVT(); toast(S.settings.voice?'🔊 Voz encendida':'🔇 Voz apagada. Los mensajes se verán en pantalla'); }); } }); }
/* ---------- sesión de juego ---------- */
let sess=null;
function startGame(gid,g,l,area){
  const G=GM[gid]; const data=G.gen(g,l);
  sess = {gid,g,l,area, qs: Array.isArray(data)?data:[data], i:0, ok:0, marks:[]};
  go({name:'play'});
}
function vPlay(){
  const q=sess.qs[sess.i]; const G=GM[sess.gid];
  const dots = q.type==='memory' ? '' : sess.qs.map((_,i)=>`<i class="${sess.marks[i]||''} ${i===sess.i?'cur':''}"></i>`).join('');
  app.innerHTML = `<div class="top"><button class="icon-btn" id="close" aria-label="Salir">✕</button><div class="dots">${dots||`<b>${G.icon} ${G.name}</b>`}</div><button class="icon-btn vt" style="margin-right:var(--s-1)"></button><button class="icon-btn" id="say" aria-label="Escuchar">💬</button></div><div id="stage"></div>`;
  bind('#close', ()=>go({name:'route', area:sess.area, g:sess.g}));
  const sayQ = () => speak(q.say || q.prompt, q.lang || 'es-ES');
  bind('#say', sayQ);
  const stage=document.getElementById('stage');
  if (q.type==='choice') playChoice(stage,q);
  else if (q.type==='arrange') playArrange(stage,q);
  else playMemory(stage,q);
  if (!q.noAuto && (q.autoSay || (sess.g<=2 && q.type!=='memory'))) setTimeout(sayQ, 250);
}
function promptHTML(q){ return speaker(q.prompt, 58); }
function visualHTML(q){ return q.visual ? `<div class="visual ${q.visualText?'text':''}">${q.visual}</div>` : ''; }
function playChoice(stage,q){
  const opts = q.keep ? q.options : shuffle(q.options);
  const cls = q.big?'big':(q.one||opts.some(o=>strip(o).length>22)?'one':'');
  stage.innerHTML = promptHTML(q)+visualHTML(q)+`<div class="opts ${cls}">${opts.map((o,i)=>`<button class="opt" data-i="${i}">${o}</button>`).join('')}</div>`;
  let done=false;
  stage.querySelectorAll('.opt').forEach(b=>b.addEventListener('click',()=>{
    if (done) return; done=true;
    const v=opts[+b.dataset.i], ok = v===q.correct;
    stage.querySelectorAll('.opt').forEach((x,i)=>{ if(opts[i]===q.correct) x.classList.add('ok'); else if(x===b) x.classList.add('no'); else x.classList.add('dim'); });
    if (q.sayOnAnswer) speak(q.say, q.lang);
    if (ok) flyTo(b);
    answer(ok, q);
  }));
}
function playArrange(stage,q){
  const pool = shuffle(q.tokens.concat(q.decoys||[]).map((t,id)=>({t,id})));
  let ans=[]; let done=false;
  const draw = () => {
    stage.innerHTML = promptHTML(q)+visualHTML(q)+
      `<div class="slots ${q.vertical?'v':''}" id="slots">${ans.length?ans.map((x,i)=>`<button class="tile" data-a="${i}">${q.vertical?(i+1)+'. ':''}${x.t}</button>`).join(''):'<span class="muted">Toca las piezas en orden</span>'}</div>
       <div class="pool ${q.vertical?'v':''}">${pool.filter(x=>!ans.includes(x)).map(x=>`<button class="tile" data-p="${x.id}">${x.t}</button>`).join('')}</div>
       <button class="btn full" id="chk" ${ans.length===q.tokens.length?'':'disabled'}>Comprobar</button>`;
    stage.querySelectorAll('[data-p]').forEach(b=>b.addEventListener('click',()=>{ if(done) return; if(ans.length>=q.tokens.length) return; ans.push(pool.find(x=>x.id===+b.dataset.p)); draw(); }));
    stage.querySelectorAll('[data-a]').forEach(b=>b.addEventListener('click',()=>{ if(done) return; ans.splice(+b.dataset.a,1); draw(); }));
    const chk=stage.querySelector('#chk'); if (chk) chk.addEventListener('click',()=>{
      if (done) return; done=true;
      const ok = ans.map(x=>x.t).join(q.joiner)===q.tokens.join(q.joiner);
      stage.querySelector('#slots').classList.add(ok?'ok':'no'); chk.remove();
      if (q.sayAnswer) speak(q.sayAnswer, q.sayAnswerLang||'es-ES');
      answer(ok, q);
    });
  };
  draw();
}
function playMemory(stage,q){
  const cards = shuffle(q.pairs.flatMap(([w,e],k)=>[{k,face:e,t:'e'},{k,face:w,t:'w'}]));
  let open=[], matched=new Set(), moves=0, lock=false;
  stage.innerHTML = speaker('Find the pairs! Encuentra las parejas',58)+`<p class="muted" id="mv" style="margin:-6px 0 var(--s-3);font-weight:700">Intentos: 0</p><div class="mem ${cards.length>10?'c4':''}">${cards.map((c,i)=>`<button class="mcard ${c.t}" data-i="${i}" aria-label="Carta"></button>`).join('')}</div>`;
  const els=[...stage.querySelectorAll('.mcard')];
  els.forEach(el=>el.addEventListener('click',()=>{
    const i=+el.dataset.i, c=cards[i];
    if (lock || matched.has(i) || open.includes(i)) return;
    el.classList.add('up'); el.textContent=c.face; if (c.t==='w') speak(c.face,'en-US'); else { const w=q.pairs[c.k][0]; speak(w,'en-US'); }
    open.push(i);
    if (open.length===2){
      moves++; stage.querySelector('#mv').textContent='Intentos: '+moves;
      const [a,b]=open;
      if (cards[a].k===cards[b].k && cards[a].t!==cards[b].t){ matched.add(a); matched.add(b); els[a].classList.add('done'); els[b].classList.add('done'); open=[]; tone(true); react('happy');
        if (matched.size===cards.length){ const n=q.pairs.length; sess.ok=n; sess.memMoves=moves; setTimeout(()=>finish(n, moves),700); } }
      else { lock=true; setTimeout(()=>{ [a,b].forEach(j=>{els[j].classList.remove('up'); els[j].textContent='';}); open=[]; lock=false; },900); }
    }
  }));
}
const PRAISE=['¡Muy bien!','¡Excelente!','¡Lo lograste!','¡Genial!','¡Así se hace!'];
function answer(ok,q){
  sess.marks[sess.i]=ok?'ok':'no'; if(ok) sess.ok++;
  tone(ok); setTimeout(()=>react(ok?'happy':'sad'), ok?450:0);
  const last = sess.i===sess.qs.length-1;
  const msg = ok ? pick(PRAISE) : 'Casi. ¡Sigue intentando!';
  const det = !ok ? (q.type==='choice' ? `Respuesta correcta: <b>${q.correct}</b>` : `Respuesta correcta: <b>${q.tokens.join(q.joiner)}</b>`) : '';
  const ex = q.explain && (!ok || sess.g>=3) ? `<p>${q.explain}</p>` : '';
  if (ok && sess.g<=2 && !q.sayAnswer && !q.sayOnAnswer) speak(msg);
  showFb(ok, `<b>${msg}</b>${det?`<p>${det}</p>`:''}${ex}<button class="btn full" id="next">${last?'Ver resultado':'Continuar'}</button>`);
  fb.querySelector('#next').addEventListener('click',()=>{ hideFb(); if(last) finish(sess.ok, sess.qs.length); else { sess.i++; render(); } });
}
function showFb(ok,html){ fb.className='fb show '+(ok?'ok':'no'); fb.querySelector('.in').innerHTML=html; }
function hideFb(){ if(fb) fb.className='fb'; }
function finish(correct,total){
  const p=prof(); const isMem = GM[sess.gid].gen===genMemoria;
  let stars, pct;
  if (isMem){ const n=correct, m=total; pct=n/m; stars = m<=n+2?3 : m<=n*2?2 : 1; }
  else { pct=correct/total; stars = pct>=.9?3 : pct>=.7?2 : pct>=.5?1 : 0; }
  const key=`${sess.gid}|${sess.g}|${sess.l}`; const pr=P(p.id); const r=pr[key]||{stars:0,plays:0,correct:0,total:0};
  r.stars=Math.max(r.stars,stars); r.plays++; r.correct+=correct; r.total+=total; r.last=Date.now(); pr[key]=r; save();
  go({name:'result', stars, correct, total, isMem});
}
function vResult(){
  const {stars,correct,total,isMem}=view; const G=GM[sess.gid];
  const nodes=routeNodes(sess.area,sess.g); const idx=nodes.findIndex(n=>n.gid===sess.gid&&n.l===sess.l); const next=nodes[idx+1];
  const msg = stars===3?'¡Fantástico!':stars===2?'¡Muy buen trabajo!':stars===1?'¡Vas muy bien!':'¡Practica otra vez, tú puedes!';
  app.innerHTML = `<div class="result">
    ${mascot(prof().avatar,110,'msc',stars?'dance':'')}<h2 style="margin-top:var(--s-2)">${msg}</h2>
    <div class="big-stars">${[0,1,2].map(i=>`<span class="rstar ${i<stars?'on':''}" style="animation-delay:${.3+i*.25}s" aria-hidden="true">${typeof ilu==='function'&&ilu('estrella_oro')?ilu(i<stars?'estrella_oro':'estrella_plata','1em'):'⭐'}</span>`).join('')}<span class="sr">${stars} de 3 estrellas</span></div>
    <p class="muted" style="font-size:var(--fs-md);font-weight:700">${isMem?`${correct} parejas en ${total} intentos`:`${correct} de ${total} correctas`}</p>
    <div class="btns">
      ${next && stars>0 ? `<button class="btn full" id="nx">Siguiente: ${GM[next.gid].name} · ${LEVELS[next.l-1]}</button>`:''}
      <button class="btn soft full" id="again">Jugar otra vez</button>
      <button class="btn soft full" id="route">Volver a la ruta</button>
    </div></div>`;
  if (stars>0){ speak(msg); confetti(); }
  bind('#nx', ()=>startGame(next.gid, sess.g, next.l, sess.area));
  bind('#again', ()=>startGame(sess.gid, sess.g, sess.l, sess.area));
  bind('#route', ()=>go({name:'route', area:sess.area, g:sess.g}));
}

/* ---------- zona de adultos ---------- */
function gate(){
  const a=rnd(6,9), b=rnd(6,9);
  const m=document.createElement('div'); m.className='modal';
  m.innerHTML=`<div class="card stack"><h3>Zona para docentes y familias</h3><p class="muted" style="margin:var(--s-2) 0 0">Para continuar, resuelve: <b>${a} × ${b}</b></p><input class="txt" id="gv" inputmode="numeric" autocomplete="off"><div class="row"><button class="btn soft" id="gc">Cancelar</button><div class="sp"></div><button class="btn" id="go">Entrar</button></div><p class="muted" id="ge" style="margin:0"></p></div>`;
  document.body.appendChild(m); const inp=m.querySelector('#gv'); inp.focus();
  const tryIt=()=>{ if(+inp.value===a*b){ m.remove(); go({name:'adults'}); } else { m.querySelector('#ge').textContent='Respuesta incorrecta.'; inp.value=''; } };
  m.querySelector('#go').addEventListener('click',tryIt); inp.addEventListener('keydown',e=>{ if(e.key==='Enter') tryIt(); });
  m.querySelector('#gc').addEventListener('click',()=>m.remove());
}
function vAdults(){
  const fmt=t=>t?new Date(t).toLocaleDateString('es-DO',{day:'numeric',month:'short'}):'—';
  let html=`<div class="top"><button class="icon-btn" id="back">←</button><h2>Panel de progreso</h2></div>
  <div class="card" style="margin-bottom:var(--s-4)">
    <div class="toggle"><span>Voz y lectura en voz alta</span><button class="sw ${S.settings.voice?'on':''}" id="tv" aria-label="Voz"></button></div>
    <div class="toggle"><span>Desbloquear todos los niveles</span><button class="sw ${S.settings.unlockAll?'on':''}" id="tu" aria-label="Desbloquear"></button></div>
    <button class="btn soft full" id="csv" style="margin-top:var(--s-2)">Copiar progreso (CSV)</button><p class="muted" id="cmsg" style="margin:var(--s-2) 0 0;font-size:var(--fs-xs)"></p>
  </div>`;
  if (!S.profiles.length) html+=`<p class="muted">Aún no hay perfiles.</p>`;
  S.profiles.forEach(p=>{
    const pr=S.progress[p.id]||{};
    const rows=AREAS.map(a=>{ const s=areaStats(p.id,a.id,p.grade);
      const ent=Object.entries(pr).filter(([k])=>GM[k.split('|')[0]]?.area===a.id);
      const c=ent.reduce((x,[,v])=>x+v.correct,0), t=ent.reduce((x,[,v])=>x+v.total,0), last=Math.max(0,...ent.map(([,v])=>v.last||0));
      return `<tr><td>${a.icon} ${a.name}</td><td>${s.got}/${s.max}</td><td>${t?Math.round(c/t*100)+'%':'—'}</td><td>${fmt(last)}</td></tr>`; }).join('');
    html+=`<div class="card" style="margin-bottom:var(--s-4)"><div class="row">${petMini(p,44)}<div><b style="font-size:var(--fs-md)">${esc(p.name)}</b><div class="muted">${GRADES[p.grade-1]} grado</div></div><div class="sp"></div>
      <select class="chip" data-age="${p.id}">${[5,6,7,8,9,10,11,12].map(a=>`<option value="${a}" ${p.age===a?'selected':''}>${a} años</option>`).join('')}</select> <select class="chip" data-gr="${p.id}">${GRADES.map((g,i)=>`<option value="${i+1}" ${p.grade===i+1?'selected':''}>${g}</option>`).join('')}</select></div>
      <table style="margin-top:var(--s-3)"><thead><tr><th>Ruta (grado actual)</th><th>Estrellas</th><th>Aciertos</th><th>Última vez</th></tr></thead><tbody>${rows}</tbody></table>
      <div class="row" style="margin-top:var(--s-3)"><div class="sp"></div><button class="chip" data-del="${p.id}">Eliminar perfil</button></div></div>`;
  });
  app.innerHTML=html;
  bind('#back', ()=>go({name:'profiles'}));
  bind('#tv', ()=>{ S.settings.voice=!S.settings.voice; save(); render(); });
  bind('#tu', ()=>{ S.settings.unlockAll=!S.settings.unlockAll; save(); render(); });
  app.querySelectorAll('select[data-age]').forEach(s=>s.addEventListener('change',()=>{ const p=S.profiles.find(x=>x.id===s.dataset.age); p.age=+s.value; if(S.toyLv) delete S.toyLv[p.id]; save(); render(); }));
  app.querySelectorAll('[data-gr]').forEach(s=>s.addEventListener('change',()=>{ const p=S.profiles.find(x=>x.id===s.dataset.gr); p.grade=+s.value; save(); render(); }));
  bind('[data-del]', el=>{
    if (el.dataset.confirm){ S.profiles=S.profiles.filter(p=>p.id!==el.dataset.del); delete S.progress[el.dataset.del]; if(S.current===el.dataset.del) S.current=null; save(); render(); }
    else { el.dataset.confirm='1'; el.textContent='Toca otra vez para confirmar'; el.classList.add('on'); }
  });
  bind('#csv', ()=>{
    const lines=['Nombre,Grado del perfil,Área,Juego,Grado del juego,Nivel,Estrellas,Correctas,Total,Veces jugado,Última vez'];
    S.profiles.forEach(p=>Object.entries(S.progress[p.id]||{}).forEach(([k,v])=>{ const [gid,g,l]=k.split('|'); const G=GM[gid]; if(!G) return;
      lines.push([p.name,GRADES[p.grade-1],AREAS.find(a=>a.id===G.area).name,G.name,GRADES[g-1],LEVELS[l-1],v.stars,v.correct,v.total,v.plays,v.last?new Date(v.last).toISOString().slice(0,10):''].map(x=>`"${String(x).replace(/"/g,'""')}"`).join(',')); }));
    const txt=lines.join('\n'); const msg=document.getElementById('cmsg');
    try{ navigator.clipboard.writeText(txt).then(()=>msg.textContent='Copiado. Pégalo en Excel o Google Sheets.', ()=>msg.textContent='No se pudo copiar en este navegador.'); }catch(e){ msg.textContent='No se pudo copiar en este navegador.'; }
  });
}
