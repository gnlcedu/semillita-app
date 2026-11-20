/* Semillita · Personajes dibujados, personalización, nivel y álbum */
/* =========================================================
   PERSONAJES DIBUJADOS · PERSONALIZACIÓN · NIVEL · ÁLBUM
   ========================================================= */
const SPECIES={'🦊':'zorro','🐢':'tortuga','🦉':'buho','🐬':'delfin','🦁':'leon','🐼':'panda','🐸':'rana','🦋':'mariposa','🐝':'abeja','🐨':'koala','🦜':'cotorra','🐙':'pulpo'};
const SPC={zorro:'#F39A5A',tortuga:'#A8D89A',buho:'#B98D6E',delfin:'#8EC5EA',leon:'#F5C76A',panda:'#FFFFFF',rana:'#96D48C',mariposa:'#C7B6EE',abeja:'#F7D35E',koala:'#BDBCCB',cotorra:'#7DCB86',pulpo:'#F3A6C3'};
const COLOR_OPTS=['#F39A5A','#F5C76A','#F7D35E','#96D48C','#8EC5EA','#C7B6EE','#F3A6C3','#BDBCCB','#B98D6E','#FFFFFF'];
function shade(h,a){ const n=parseInt(h.slice(1),16); const f=c=>Math.max(0,Math.min(255,Math.round(a<0?c*(1+a):c+(255-c)*a))); return '#'+[n>>16,n>>8&255,n&255].map(f).map(x=>x.toString(16).padStart(2,'0')).join(''); }

/* accesorios: [ranura, nombre, nivel para desbloquear, svg] */
const ACC={
 brote:['hat','Brote',1,`<path d="M100 56 Q98 42 100 32" stroke="#5E9E4E" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M100 36 Q84 22 76 32 Q86 44 100 36Z" fill="#8CCB6E"/><path d="M100 34 Q114 18 126 26 Q118 42 100 34Z" fill="#A6DA86"/>`],
 gorra:['hat','Gorra',2,`<path d="M64 64 Q100 16 136 64Z" fill="#6FA3CB"/><path d="M122 60 Q154 56 166 66 Q144 72 118 66Z" fill="#4F86B3"/><circle cx="100" cy="30" r="5" fill="#4F86B3"/>`],
 fiesta:['hat','Gorro de fiesta',2,`<path d="M80 60 L100 8 L120 60Z" fill="#F5B8D0"/><path d="M86 44 L114 44 M91 30 L109 30" stroke="#fff" stroke-width="5"/><circle cx="100" cy="8" r="8" fill="#F6C34A"/>`],
 copa:['hat','Sombrero de copa',3,`<rect x="74" y="16" width="52" height="40" rx="5" fill="#4A4658"/><rect x="74" y="42" width="52" height="8" fill="#E8505B"/><ellipse cx="100" cy="58" rx="38" ry="7" fill="#3A3646"/>`],
 chef:['hat','Gorro de chef',4,`<path d="M74 60 v-12 a13 13 0 0 1 8 -24 a16 16 0 0 1 36 0 a13 13 0 0 1 8 24 v12Z" fill="#fff" stroke="#D9D2C7" stroke-width="3"/>`],
 flor:['hat','Flor',4,`<g transform="translate(128 58)">${[0,72,144,216,288].map(a=>`<circle cx="${(12*Math.cos(a*Math.PI/180)).toFixed(1)}" cy="${(12*Math.sin(a*Math.PI/180)).toFixed(1)}" r="9" fill="#F5B8D0"/>`).join('')}<circle r="7" fill="#F6C34A"/></g>`],
 corona:['hat','Corona',5,`<path d="M70 60 L74 28 L88 46 L100 22 L112 46 L126 28 L130 60Z" fill="#F6C34A" stroke="#D9A43A" stroke-width="3" stroke-linejoin="round"/><circle cx="100" cy="50" r="5" fill="#E8505B"/><circle cx="84" cy="54" r="4" fill="#6FA3CB"/><circle cx="116" cy="54" r="4" fill="#6FA3CB"/>`],
 gafas:['eyes','Gafas',1,`<g fill="rgba(255,255,255,.25)" stroke="#4A4658" stroke-width="3.5"><circle cx="{EL}" cy="{EY}" r="14"/><circle cx="{ER}" cy="{EY}" r="14"/></g><path d="M{BL} {EY} h{BW}" stroke="#4A4658" stroke-width="3.5"/>`],
 sol:['eyes','Gafas de sol',3,`<g fill="#2F2B3A" stroke="#2F2B3A" stroke-width="3"><rect x="{EL0}" y="{EY0}" width="30" height="20" rx="8"/><rect x="{ER0}" y="{EY0}" width="30" height="20" rx="8"/></g><path d="M{BL} {EY} h{BW}" stroke="#2F2B3A" stroke-width="4"/>`],
 antifaz:['eyes','Antifaz',3,`<path d="M{MX0} {EY} q{MQ} -26 {MW} 0 q-{MQ2} 18 -{MW} 0Z" fill="#8F82C6" opacity=".9"/>`],
 corbatin:['neck','Corbatín',1,`<path d="M100 150 L80 140 L80 160Z M100 150 L120 140 L120 160Z" fill="#E8505B"/><circle cx="100" cy="150" r="5" fill="#C23E4B"/>`],
 bufanda:['neck','Bufanda',2,`<path d="M58 140 Q100 158 142 140 L142 152 Q100 170 58 152Z" fill="#6FAF8F"/><rect x="118" y="148" width="14" height="30" rx="5" fill="#5A9B7B"/>`],
 collar:['neck','Collar',3,`${[...Array(9)].map((_,i)=>{const a=(200+i*17.5)*Math.PI/180;return `<circle cx="${(100+46*Math.cos(a)*-1).toFixed(1)}" cy="${(118+46*Math.sin(-a)*-1+0).toFixed(1)}" r="5" fill="#fff" stroke="#D9D2C7" stroke-width="1.5"/>`}).join('')}`],
 medalla:['neck','Medalla',5,`<path d="M88 132 L100 156 L112 132" stroke="#6FA3CB" stroke-width="8" fill="none"/><circle cx="100" cy="162" r="11" fill="#F6C34A" stroke="#D9A43A" stroke-width="3"/><text x="100" y="167" text-anchor="middle" font-size="12" font-weight="800" fill="#B07E1E">1</text>`],
 globo:['hand','Globo',1,`<path d="M168 140 Q176 110 178 78" stroke="#8C879A" stroke-width="2" fill="none"/><ellipse cx="178" cy="60" rx="17" ry="21" fill="#F4A6A6"/><path d="M174 80 l4 4 l4 -4Z" fill="#F4A6A6"/>`],
 paleta:['hand','Paleta',2,`<path d="M166 140 L176 98" stroke="#fff" stroke-width="5" stroke-linecap="round"/><circle cx="178" cy="86" r="15" fill="#F5B8D0"/><path d="M178 86 m-9 0 a9 9 0 0 1 18 0 a6 6 0 0 1 -12 0" stroke="#fff" stroke-width="3" fill="none"/>`],
 varita:['hand','Varita mágica',3,`<path d="M164 142 L186 100" stroke="#4A4658" stroke-width="5" stroke-linecap="round"/><polygon points="188,84 192,95 203,96 194,103 197,114 188,108 179,114 182,103 173,96 184,95" fill="#F6C34A"/>`],
 bandera:['hand','Bandera dominicana',4,`<path d="M166 146 L170 66" stroke="#8C879A" stroke-width="4" stroke-linecap="round"/><g transform="translate(170 66)"><rect width="40" height="26" fill="#fff"/><rect width="17" height="11" fill="#1F4FA3"/><rect x="23" width="17" height="11" fill="#D2232A"/><rect y="15" width="17" height="11" fill="#D2232A"/><rect x="23" y="15" width="17" height="11" fill="#1F4FA3"/></g>`],
 mochila:['back','Mochila',2,`<rect x="136" y="96" width="40" height="52" rx="12" fill="#F7C59F" stroke="#D9946C" stroke-width="3"/>`],
 capa:['back','Capa',3,`<path d="M62 86 Q100 100 138 86 L166 178 Q100 196 34 178Z" fill="#E8505B"/>`],
 alas:['back','Alas',4,`<path d="M60 110 Q14 80 18 126 Q30 150 64 136Z M140 110 Q186 80 182 126 Q170 150 136 136Z" fill="#fff" stroke="#D9D2C7" stroke-width="3"/>`],
 /* niveles 6 a 10 */
 guano:['hat','Sombrero de guano',6,`<ellipse cx="100" cy="58" rx="64" ry="12" fill="#E8CF94" stroke="#B9965A" stroke-width="3"/><path d="M70 58 Q70 22 100 22 Q130 22 130 58Z" fill="#EBD49C" stroke="#B9965A" stroke-width="3"/><path d="M72 47 H128" stroke="#C98256" stroke-width="5"/><path d="M82 32 L85 56 M100 24 V56 M118 32 L115 56" stroke="#C9A86A" stroke-width="1.6"/>`],
 panuelo:['neck','Pañuelo',6,`<path d="M64 140 Q100 154 136 140 L100 174Z" fill="#F29A8E" stroke="#C9776C" stroke-width="3" stroke-linejoin="round"/><circle cx="88" cy="150" r="2.6" fill="#fff"/><circle cx="110" cy="152" r="2.6" fill="#fff"/><circle cx="100" cy="163" r="2.6" fill="#fff"/>`],
 corazones:['eyes','Gafas de corazón',7,`<g transform="translate({EL} {EY})"><path d="M0 9 C-17 -2 -13 -17 0 -8 C13 -17 17 -2 0 9Z" fill="#F5B8D0" stroke="#C97F97" stroke-width="3"/></g><g transform="translate({ER} {EY})"><path d="M0 9 C-17 -2 -13 -17 0 -8 C13 -17 17 -2 0 9Z" fill="#F5B8D0" stroke="#C97F97" stroke-width="3"/></g><path d="M{BL} {EY} h{BW}" stroke="#C97F97" stroke-width="3"/>`],
 explorador:['back','Mochila de explorador',7,`<rect x="134" y="92" width="44" height="58" rx="12" fill="#A3C27A" stroke="#7E9A5A" stroke-width="3"/><rect x="140" y="118" width="32" height="18" rx="5" fill="#8FB066" stroke="#7E9A5A" stroke-width="2"/>`],
 safari:['hat','Casco de explorador',8,`<path d="M62 60 Q62 18 100 18 Q138 18 138 60Z" fill="#E6D3A6" stroke="#B59F6E" stroke-width="3"/><ellipse cx="100" cy="60" rx="56" ry="9" fill="#DCC48E" stroke="#B59F6E" stroke-width="3"/><path d="M64 50 H136" stroke="#A3C27A" stroke-width="5"/>`],
 binoculares:['hand','Binoculares',8,`<g transform="translate(160 110)"><rect x="0" y="0" width="14" height="24" rx="5" fill="#8DBDE6" stroke="#5E86B0" stroke-width="2.5"/><rect x="16" y="0" width="14" height="24" rx="5" fill="#8DBDE6" stroke="#5E86B0" stroke-width="2.5"/><rect x="12" y="6" width="6" height="8" fill="#5E86B0"/><circle cx="7" cy="24" r="5" fill="#D6ECFA" stroke="#5E86B0" stroke-width="2"/><circle cx="23" cy="24" r="5" fill="#D6ECFA" stroke="#5E86B0" stroke-width="2"/></g>`],
 hoja:['hand','Hoja paraguas',9,`<path d="M168 142 L176 72" stroke="#7FC08E" stroke-width="4" stroke-linecap="round"/><path d="M176 72 Q140 66 136 92 Q158 84 176 92 Q194 84 214 94 Q212 66 176 72Z" fill="#8FCB86" stroke="#5E9E4E" stroke-width="3" stroke-linejoin="round"/><path d="M176 74 V92" stroke="#5E9E4E" stroke-width="2"/>`],
 semillas:['neck','Collar de semillas',9,`<ellipse cx="141.3" cy="137.5" rx="5" ry="3.6" fill="#F2D29B" stroke="#8C6A50" stroke-width="1.6"/><ellipse cx="134.9" cy="141.7" rx="5" ry="3.6" fill="#C29A7C" stroke="#8C6A50" stroke-width="1.6"/><ellipse cx="125.2" cy="145.1" rx="5" ry="3.6" fill="#F2D29B" stroke="#8C6A50" stroke-width="1.6"/><ellipse cx="113.2" cy="147.3" rx="5" ry="3.6" fill="#C29A7C" stroke="#8C6A50" stroke-width="1.6"/><ellipse cx="100.0" cy="148.0" rx="5" ry="3.6" fill="#F2D29B" stroke="#8C6A50" stroke-width="1.6"/><ellipse cx="86.8" cy="147.3" rx="5" ry="3.6" fill="#C29A7C" stroke="#8C6A50" stroke-width="1.6"/><ellipse cx="74.8" cy="145.1" rx="5" ry="3.6" fill="#F2D29B" stroke="#8C6A50" stroke-width="1.6"/><ellipse cx="65.1" cy="141.7" rx="5" ry="3.6" fill="#C29A7C" stroke="#8C6A50" stroke-width="1.6"/><ellipse cx="58.7" cy="137.5" rx="5" ry="3.6" fill="#F2D29B" stroke="#8C6A50" stroke-width="1.6"/>`],
 laurel:['hat','Corona de hojas',10,`<ellipse cx="56.8" cy="55.7" rx="11" ry="4.62" transform="rotate(290 56.8 55.7)" fill="#7FC08E" stroke="#5E9E4E" stroke-width="2"/><ellipse cx="65.8" cy="45.9" rx="11" ry="4.62" transform="rotate(312 65.8 45.9)" fill="#A3D69B" stroke="#5E9E4E" stroke-width="2"/><ellipse cx="79.8" cy="39" rx="11" ry="4.62" transform="rotate(334 79.8 39)" fill="#7FC08E" stroke="#5E9E4E" stroke-width="2"/><ellipse cx="96.8" cy="36.1" rx="11" ry="4.62" transform="rotate(356 96.8 36.1)" fill="#A3D69B" stroke="#5E9E4E" stroke-width="2"/><ellipse cx="103.2" cy="36.1" rx="11" ry="4.62" transform="rotate(364 103.2 36.1)" fill="#7FC08E" stroke="#5E9E4E" stroke-width="2"/><ellipse cx="120.2" cy="39" rx="11" ry="4.62" transform="rotate(386 120.2 39)" fill="#A3D69B" stroke="#5E9E4E" stroke-width="2"/><ellipse cx="134.2" cy="45.9" rx="11" ry="4.62" transform="rotate(408 134.2 45.9)" fill="#7FC08E" stroke="#5E9E4E" stroke-width="2"/><ellipse cx="143.2" cy="55.7" rx="11" ry="4.62" transform="rotate(430 143.2 55.7)" fill="#A3D69B" stroke="#5E9E4E" stroke-width="2"/>`],
 capahojas:['back','Capa de hojas',10,`<path d="M62 86 Q100 100 138 86 L166 178 Q100 196 34 178Z" fill="#8FCB86" stroke="#5E9E4E" stroke-width="3"/><path d="M100 96 V186 M100 120 L70 104 M100 120 L130 104 M100 146 L60 130 M100 146 L140 130 M100 170 L54 160 M100 170 L146 160" stroke="#5E9E4E" stroke-width="2" fill="none"/>`]
};
/* niveles 1 a 5 de siempre (nadie baja de nivel) y 6 a 10 nuevos */
const LEVELN=['Semillita','Brote','Plantita','Arbolito','Súper estrella','Gran árbol','Jardín mágico','Bosque','Selva','Guardián de la naturaleza'];
const XPT=[0,8,22,45,80,130,200,290,400,550];
const xpLevel = xp => XPT.filter(t=>xp>=t).length;

function creature(sp, o={}){
  const c=o.color||SPC[sp]||'#F5C76A', dk=sp==='panda'&&!o.color?'#4A4658':shade(c,-.28), lt=shade(c,.6), ink='#3C3848';
  let ex=18, ey=108, my=126, back='', front='', face='', feet=true, mouth=true, eyeFill=ink;
  const tri=(p,f)=>`<path d="${p}" fill="${f}" stroke="${dk}" stroke-width="3" stroke-linejoin="round"/>`;
  switch(sp){
    case 'zorro': back=`<path d="M146 162 C196 154 200 104 180 88 C176 118 162 140 136 150Z" fill="${c}" stroke="${dk}" stroke-width="3"/><path d="M180 88 C188 100 190 112 186 124 C178 112 176 100 180 88Z" fill="#fff"/>`; front=tri('M54 80 L60 30 L92 60Z',c)+tri('M146 80 L140 30 L108 60Z',c)+`<path d="M62 70 L64 44 L80 60Z M138 70 L136 44 L120 60Z" fill="${dk}"/>`; face=`<ellipse cx="100" cy="126" rx="32" ry="20" fill="#FFF7EE"/><ellipse cx="100" cy="118" rx="6" ry="4.5" fill="${ink}"/>`; my=130; break;
    case 'tortuga': back=`<ellipse cx="100" cy="122" rx="76" ry="64" fill="${dk}"/>${[[64,100],[100,86],[136,100],[70,146],[130,146]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="14" fill="${shade(c,-.12)}"/>`).join('')}`; break;
    case 'buho': front=tri('M58 66 L54 34 L84 56Z',c)+tri('M142 66 L146 34 L116 56Z',c); face=`<circle cx="82" cy="108" r="16" fill="#FFF7EE"/><circle cx="118" cy="108" r="16" fill="#FFF7EE"/><path d="M93 122 L107 122 L100 134Z" fill="#F6A94A"/>`; mouth=false; break;
    case 'delfin': back=`<path d="M100 56 Q118 22 136 64Z" fill="${c}" stroke="${dk}" stroke-width="3"/>`; face=`<ellipse cx="100" cy="130" rx="26" ry="15" fill="${lt}"/>`; my=130; break;
    case 'leon': back=[...Array(14)].map((_,i)=>{const a=i/14*Math.PI*2; return `<circle cx="${(100+64*Math.cos(a)).toFixed(1)}" cy="${(112+58*Math.sin(a)).toFixed(1)}" r="22" fill="#E39A52"/>`;}).join(''); front=`<circle cx="66" cy="66" r="12" fill="${c}" stroke="${dk}" stroke-width="3"/><circle cx="134" cy="66" r="12" fill="${c}" stroke="${dk}" stroke-width="3"/>`; face=`<ellipse cx="100" cy="126" rx="24" ry="15" fill="#FFF6E2"/><ellipse cx="100" cy="119" rx="7" ry="5" fill="#8C5A3C"/>`; my=131; break;
    case 'panda': front=`<circle cx="62" cy="64" r="17" fill="#4A4658"/><circle cx="138" cy="64" r="17" fill="#4A4658"/>`; face=`<ellipse cx="81" cy="108" rx="14" ry="11" fill="#4A4658" transform="rotate(-20 81 108)"/><ellipse cx="119" cy="108" rx="14" ry="11" fill="#4A4658" transform="rotate(20 119 108)"/><ellipse cx="100" cy="121" rx="6" ry="4.5" fill="${ink}"/>`; eyeFill='#fff'; break;
    case 'rana': front=`<circle cx="72" cy="66" r="21" fill="${c}" stroke="${dk}" stroke-width="3"/><circle cx="128" cy="66" r="21" fill="${c}" stroke="${dk}" stroke-width="3"/><circle cx="72" cy="66" r="13" fill="#fff"/><circle cx="128" cy="66" r="13" fill="#fff"/>`; ex=28; ey=66; my=120; break;
    case 'mariposa': back=`<ellipse cx="48" cy="92" rx="40" ry="34" fill="#F5B8D0" stroke="#C97F97" stroke-width="3"/><ellipse cx="152" cy="92" rx="40" ry="34" fill="#F5B8D0" stroke="#C97F97" stroke-width="3"/><ellipse cx="56" cy="152" rx="30" ry="24" fill="#A9D3F0" stroke="#6FA3CB" stroke-width="3"/><ellipse cx="144" cy="152" rx="30" ry="24" fill="#A9D3F0" stroke="#6FA3CB" stroke-width="3"/><circle cx="42" cy="90" r="9" fill="#fff" opacity=".7"/><circle cx="158" cy="90" r="9" fill="#fff" opacity=".7"/>`; front=`<path d="M88 58 Q80 34 72 24 M112 58 Q120 34 128 24" stroke="${dk}" stroke-width="3" fill="none"/><circle cx="72" cy="24" r="6" fill="${dk}"/><circle cx="128" cy="24" r="6" fill="${dk}"/>`; break;
    case 'abeja': back=`<ellipse cx="54" cy="78" rx="26" ry="18" fill="rgba(255,255,255,.85)" stroke="#CFE3F1" stroke-width="3" transform="rotate(-25 54 78)"/><ellipse cx="146" cy="78" rx="26" ry="18" fill="rgba(255,255,255,.85)" stroke="#CFE3F1" stroke-width="3" transform="rotate(25 146 78)"/>`; front=`<path d="M88 58 Q82 36 74 30 M112 58 Q118 36 126 30" stroke="${ink}" stroke-width="3" fill="none"/><circle cx="74" cy="30" r="5" fill="${ink}"/><circle cx="126" cy="30" r="5" fill="${ink}"/>`; face=`<path d="M40 146 Q100 160 160 146 L160 158 Q100 172 40 158Z M52 168 Q100 180 148 168 L140 176 Q100 186 60 176Z" fill="#4A4658" opacity=".85"/>`; break;
    case 'koala': front=`<circle cx="52" cy="74" r="30" fill="${c}" stroke="${dk}" stroke-width="3"/><circle cx="148" cy="74" r="30" fill="${c}" stroke="${dk}" stroke-width="3"/><circle cx="52" cy="74" r="16" fill="#F6C9D4"/><circle cx="148" cy="74" r="16" fill="#F6C9D4"/>`; face=`<ellipse cx="100" cy="122" rx="11" ry="14" fill="#4A4658"/>`; my=142; break;
    case 'cotorra': face=`<ellipse cx="100" cy="76" rx="24" ry="13" fill="#fff"/><ellipse cx="100" cy="158" rx="18" ry="9" fill="#D9534F" opacity=".8"/><path d="M90 116 Q100 104 110 116 Q106 130 100 134 Q94 130 90 116Z" fill="#F6C34A" stroke="#D9A43A" stroke-width="2"/>`; mouth=false; break;
    case 'pulpo': back=[40,64,92,120,148].map((x,i)=>`<path d="M${x+6} 160 q-8 22 6 32 q10 6 14 -6" stroke="${c}" stroke-width="14" fill="none" stroke-linecap="round"/>`).join(''); feet=false; break;
  }
  const out=o.outfit||{}, acc=s=>{ const k=out[s]; if(!k||!ACC[k]) return ''; return ACC[k][3].replace(/\{EL\}/g,100-ex).replace(/\{ER\}/g,100+ex).replace(/\{EY\}/g,ey).replace(/\{EL0\}/g,100-ex-15).replace(/\{ER0\}/g,100+ex-15).replace(/\{EY0\}/g,ey-10).replace(/\{BL\}/g,100-ex+14).replace(/\{BW\}/g,2*ex-28).replace(/\{MX0\}/g,100-ex-22).replace(/\{MQ\}/g,ex+22).replace(/\{MW\}/g,2*ex+44).replace(/\{MQ2\}/g,ex+22); };
  const lvl=o.level||1, aura = lvl>=5 ? `<circle cx="100" cy="118" r="90" fill="#FBF1C8"/>` : '';
  const E=(cl,inner)=>`<g class="${cl}">${inner}</g>`;
  const eyes = E('eo',`<g class="blink"><circle cx="${100-ex}" cy="${ey}" r="7.5" fill="${eyeFill}"/><circle cx="${100+ex}" cy="${ey}" r="7.5" fill="${eyeFill}"/></g>`)
    + E('eh',`<path d="M${100-ex-8} ${ey+3} Q${100-ex} ${ey-7} ${100-ex+8} ${ey+3} M${100+ex-8} ${ey+3} Q${100+ex} ${ey-7} ${100+ex+8} ${ey+3}" stroke="${eyeFill}" stroke-width="4" fill="none" stroke-linecap="round"/>`)
    + E('es',`<path d="M${100-ex-8} ${ey-2} Q${100-ex} ${ey+6} ${100-ex+8} ${ey-2} M${100+ex-8} ${ey-2} Q${100+ex} ${ey+6} ${100+ex+8} ${ey-2}" stroke="${eyeFill}" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M${100-ex-10} ${ey-14} l14 4 M${100+ex+10} ${ey-14} l-14 4" stroke="${ink}" stroke-width="3" stroke-linecap="round"/>`)
    + E('ez',`<path d="M${100-ex-8} ${ey} h16 M${100+ex-8} ${ey} h16" stroke="${eyeFill}" stroke-width="4" stroke-linecap="round"/>`)
    /* sorprendido: ojos grandes y redondos con cejas arriba */
    + E('ew',`<circle cx="${100-ex}" cy="${ey}" r="10" fill="#fff" stroke="${ink}" stroke-width="2.5"/><circle cx="${100+ex}" cy="${ey}" r="10" fill="#fff" stroke="${ink}" stroke-width="2.5"/><circle cx="${100-ex}" cy="${ey}" r="5" fill="${ink}"/><circle cx="${100+ex}" cy="${ey}" r="5" fill="${ink}"/><path d="M${100-ex-9} ${ey-17} q9 -6 18 0 M${100+ex-9} ${ey-17} q9 -6 18 0" stroke="${ink}" stroke-width="3" fill="none" stroke-linecap="round"/>`)
    /* pensando: mira hacia arriba, una ceja levantada */
    + E('et',`<circle cx="${100-ex-2}" cy="${ey-3}" r="7" fill="${eyeFill}"/><circle cx="${100+ex-2}" cy="${ey-3}" r="7" fill="${eyeFill}"/><path d="M${100+ex-9} ${ey-18} l16 -5" stroke="${ink}" stroke-width="3" stroke-linecap="round"/>`);
  const mouths = !mouth ? '' : E('mo',`<path d="M92 ${my} Q100 ${my+8} 108 ${my}" stroke="${ink}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`)+E('mh',`<path d="M89 ${my-2} Q100 ${my+16} 111 ${my-2}Z" fill="#E86A7A" stroke="${ink}" stroke-width="3" stroke-linejoin="round"/>`)+E('ms',`<path d="M92 ${my+6} Q100 ${my-1} 108 ${my+6}" stroke="${ink}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`)
    +E('mw',`<ellipse cx="100" cy="${my+3}" rx="6" ry="7.5" fill="#E86A7A" stroke="${ink}" stroke-width="3"/>`)+E('mt',`<path d="M93 ${my+3} Q100 ${my+1} 107 ${my+4}" stroke="${ink}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`);
  return `<svg viewBox="-12 -12 224 224" class="crt" aria-hidden="true">
    ${aura}${acc('back')}${back}
    ${feet?`<ellipse cx="76" cy="178" rx="17" ry="9" fill="${dk}"/><ellipse cx="124" cy="178" rx="17" ry="9" fill="${dk}"/>`:''}
    <ellipse cx="38" cy="132" rx="11" ry="19" fill="${sp==='panda'&&!o.color?'#4A4658':c}" stroke="${dk}" stroke-width="3" transform="rotate(22 38 132)"/><ellipse cx="162" cy="132" rx="11" ry="19" fill="${sp==='panda'&&!o.color?'#4A4658':c}" stroke="${dk}" stroke-width="3" transform="rotate(-22 162 132)"/>
    <path d="M100 52 C150 52 168 90 168 122 C168 160 140 178 100 178 C60 178 32 160 32 122 C32 90 50 52 100 52Z" fill="${c}" stroke="${dk}" stroke-width="3"/>
    <ellipse cx="100" cy="148" rx="40" ry="26" fill="${shade(c,.45)}"/>
    ${front}${face}
    <ellipse cx="${sp==='rana'?62:66}" cy="${sp==='rana'?112:124}" rx="9" ry="5.5" fill="#F7B3BF"/><ellipse cx="${sp==='rana'?138:134}" cy="${sp==='rana'?112:124}" rx="9" ry="5.5" fill="#F7B3BF"/>
    ${eyes}${mouths}${acc('neck')}${acc('eyes')}${acc('hat')}${acc('hand')}
  </svg>`;
}
function petOf(p){ return {sp:SPECIES[p.avatar]||'leon', color:p.color, outfit:p.outfit||{hat:'brote'}, level:xpLevel(p.xp||0)}; }
/* reemplaza la mascota emoji por el personaje dibujado */
mascot = function(e,size=64,id='msc',cls=''){
  const p=prof(); const o = p && p.avatar===e ? petOf(p) : {sp:SPECIES[e]||'leon', outfit:{hat:'brote'}};
  return `<div class="mascot ${cls}" id="${id}" style="--ms:${size}px"><span class="body">${creature(o.sp,o)}</span><span class="shadow"></span></div>`;
};
const petMini = (p,s=40)=>`<span style="display:inline-block;width:${s}px;height:${s}px;vertical-align:middle">${creature(petOf(p).sp,petOf(p))}</span>`;

/* ---------- XP, nivel y stickers ---------- */
const STK=['🦄','🐙','🦖','🐳','🦒','🦩','🐧','🦔','🐞','🦋','🍉','🍍','🍩','🧁','🍓','🥭','🚀','🪐','🌙','⭐','☄️','🛸','🌈','⛅','🌴','🌺','🐚','🏝️','🌋','🌻','🎸','🥁','🎺','🎻','🪇','🎨','⚽','🏀','⚾','🛼','🪁','🎈','👑','💎','🧸','🪀','🎁','🏆'];
const STK_PAGES=[['Animales',0],['Frutas y dulces',10],['Espacio y cielo',16],['Naturaleza',23],['Música y arte',30],['Juegos y premios',36]];
function toast(html){
  let t=document.getElementById('toast'); if(!t){ t=document.createElement('div'); t.id='toast'; t.style.cssText='position:fixed;left:50%;top:14px;transform:translate(-50%,-140%);background:var(--card);border:var(--bw) solid var(--line);border-radius:var(--r-md);padding:var(--s-3) var(--s-5);font-weight:800;z-index:60;transition:transform .35s;box-shadow:var(--sh-2);white-space:nowrap'; document.body.appendChild(t); }
  t.innerHTML=html; requestAnimationFrame(()=>t.style.transform='translate(-50%,0)'); clearTimeout(t._t); t._t=setTimeout(()=>t.style.transform='translate(-50%,-140%)',2600);
}
function addXP(n){
  const p=prof(); if(!p) return; const before=xpLevel(p.xp||0); p.xp=(p.xp||0)+n; save();
  const after=xpLevel(p.xp);
  if (after>before){ const un=Object.entries(ACC).filter(([,a])=>a[2]===after).map(([,a])=>a[1]);
    setTimeout(()=>{ confetti(); toast(`🌟 ¡${mname(p.avatar)} creció! Ahora es ${LEVELN[after-1]}`); speak(`¡Crecí! Ahora soy ${LEVELN[after-1]}. ${un.length?'Tengo ropa nueva: '+un.join(', '):''}`); },900); }
}
function giveSticker(prob=1){
  const p=prof(); if(!p || Math.random()>prob) return; p.stickers=p.stickers||[];
  const free=STK.filter(s=>!p.stickers.includes(s)); const s = free.length ? pick(free) : pick(STK); if (free.length) p.stickers.push(s); save();
  setTimeout(()=>{ toast(`🎁 ¡Nuevo sticker! <span style="font-size:var(--fs-2xl);vertical-align:middle">${s}</span>`); note(1320,.15,'sine',.1); }, 1400);
}
/* conectar con juegos existentes */
const _win=win; win=function(msg){ addXP(2); giveSticker(.45); return _win(msg); };
const _finish=finish; finish=function(c,t){ const pct=t?c/t:0; addXP(Math.round(pct*4)+1); if (pct>=.7) giveSticker(1); return _finish(c,t); };
const _vToy=vToy; vToy=function(){ const p=prof(); const k=new Date().toISOString().slice(0,10)+view.toy; p.opened=p.opened||{}; if(!p.opened[k]){ p.opened={[k]:1, ...Object.fromEntries(Object.entries(p.opened).filter(([x])=>x.startsWith(k.slice(0,10))))}; addXP(1); } _vToy(); };

/* ---------- Mi amigo: ropa, color, nivel y álbum ---------- */
function vFriend(){
  const p=prof(); if(!p) return go({name:'profiles'}); const tab=view.tab||'ropa'; const o=petOf(p), lvl=o.level;
  const nextT=XPT[lvl]??null, xp=p.xp||0, pct=nextT?Math.round((xp-XPT[lvl-1])/(nextT-XPT[lvl-1])*100):100;
  let body='';
  if (tab==='ropa'){
    const SL=[['hat','Cabeza'],['eyes','Ojos'],['neck','Cuello'],['hand','Mano'],['back','Espalda']];
    body=SL.map(([s,n])=>`<h3 style="font-size:var(--fs-sm);margin:var(--s-4) 0 var(--s-2)">${n}</h3><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:var(--s-2)">`+
      Object.entries(ACC).filter(([,a])=>a[0]===s).map(([k,a])=>{ const locked=a[2]>lvl, on=o.outfit[s]===k;
        return `<button data-acc="${k}" ${locked?'data-lock="1"':''} style="background:${on?'var(--butter)':'#fff'};border:var(--bw) solid ${on?'var(--ink)':'var(--line)'};border-radius:var(--r-md);padding:var(--s-2) var(--s-1);position:relative">
          <span style="display:block;height:58px;${locked?'opacity:.25;filter:grayscale(1)':''}">${creature(o.sp,{...o,outfit:{[s]:k}})}</span><small style="font-weight:700;font-size:var(--fs-2xs)">${locked?`🔒 Nivel ${a[2]}`:a[1]}</small></button>`; }).join('')+`</div>`).join('');
  } else if (tab==='color'){
    body=`<p class="muted" style="font-weight:700">Elige el color de ${mname(p.avatar)}</p><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:var(--s-3)"><button data-col="" style="border:var(--bw) solid ${!p.color?'var(--ink)':'var(--line)'};border-radius:var(--r-md);background:var(--card);padding:var(--s-1)"><span style="display:block;height:70px">${creature(o.sp,{...o,color:null})}</span><small style="font-weight:700">Original</small></button>${COLOR_OPTS.map(c=>`<button data-col="${c}" style="border:var(--bw) solid ${p.color===c?'var(--ink)':'var(--line)'};border-radius:var(--r-md);background:var(--card);padding:var(--s-1)"><span style="display:block;height:70px">${creature(o.sp,{...o,color:c})}</span></button>`).join('')}</div>`;
  } else if (tab==='nivel'){
    body=`<div class="card" style="text-align:center"><b style="font-size:var(--fs-lg)">${LEVELN[lvl-1]}</b><div class="bar" style="height:14px;background:var(--line);margin:var(--s-3) 0"><i class="fg-mint" style="width:${pct}%"></i></div><span class="muted" style="font-weight:700">${nextT?`${xp} / ${nextT} puntos para ${LEVELN[lvl]}`:'¡Nivel máximo!'}</span></div>
      <p class="muted" style="font-weight:700;margin-top:var(--s-4)">${mname(p.avatar)} gana puntos cuando juegas, completas retos, lees y resuelves cálculos.</p>
      ${LEVELN.map((n,i)=>`<div class="row" style="padding:var(--s-3) 0;border-bottom:1px solid var(--line);${i+1>lvl?'opacity:.45':''}"><b style="width:26px">${i+1>lvl?'🔒':'✅'}</b><b style="flex:1">${n}</b><small class="muted">${Object.values(ACC).filter(a=>a[2]===i+1).map(a=>a[1]).join(', ')}</small></div>`).join('')}`;
  } else {
    const have=p.stickers||[];
    body=`<p style="font-weight:800;margin:var(--s-1) 0 var(--s-3)">${have.length} de ${STK.length} stickers</p>`+STK_PAGES.map(([n,st],pi)=>{ const end=(STK_PAGES[pi+1]||[0,STK.length])[1];
      return `<h3 style="font-size:var(--fs-sm);margin:var(--s-4) 0 var(--s-2)">${n}</h3><div style="display:grid;grid-template-columns:repeat(5,1fr);gap:var(--s-2)">${STK.slice(st,end).map(s=>`<div style="aspect-ratio:1;border-radius:var(--r-md);background:${have.includes(s)?'#fff':'#F1EDE6'};border:2px ${have.includes(s)?'solid':'dashed'} var(--line);display:grid;place-items:center;font-size:var(--fs-3xl)">${have.includes(s)?`<span style="animation:popin .4s both">${s}</span>`:'<span style="opacity:.25;font-size:var(--fs-lg)">?</span>'}</div>`).join('')}</div>`; }).join('');
  }
  app.innerHTML=`<div class="top"><button class="icon-btn" id="back">←</button><h2>Mi amigo ${mname(p.avatar)}</h2></div>
    <div style="display:flex;justify-content:center;margin:var(--s-1) 0 var(--s-2)">${mascot(p.avatar,150,'msc','')}</div>
    <div class="tabs centro">${[['ropa','🎩 Ropa'],['color','🐾 Cómo es'],['nivel','🌱 Nivel'],['album','📒 Álbum']].map(([k,n])=>`<button class="chip ${k===tab?'on':''}" data-tab="${k}">${n}</button>`).join('')}</div>
    <div>${body}</div>`;
  bind('#back',()=>go({name:'home'}));
  bind('[data-tab]',el=>go({name:'friend',tab:el.dataset.tab}));
  bind('[data-acc]',el=>{ if(el.dataset.lock){ tsay2(`Se desbloquea en el nivel ${ACC[el.dataset.acc][2]}. ¡Sigue jugando!`); return; }
    const k=el.dataset.acc, s=ACC[k][0]; p.outfit=p.outfit||{}; p.outfit[s]= p.outfit[s]===k?null:k; save(); popS(); const y=window.scrollY; render(); window.scrollTo(0,y); setTimeout(()=>{ react('happy'); speak(pick(['¡Me encanta!','¡Qué bonito!','¡Gracias!'])); },60); });
  bind('[data-col]',el=>{ p.color=el.dataset.col||null; save(); popS(); const y=window.scrollY; render(); window.scrollTo(0,y); setTimeout(()=>react('happy'),60); });
  bind('.mascot',()=>{ react('happy'); speak(pick(['¡Jiji, cosquillas!','¡Hola!','¡Vamos a jugar!'])); });
}
function tsay2(t){ toast(t); speak(t); }

/* ---------- Inicio ---------- */
vHome=function(){
  const p=prof(); if(!p) return go({name:'profiles'});
  const o=petOf(p), lvl=o.level, xp=p.xp||0, nextT=XPT[lvl], pct=nextT?Math.round((xp-XPT[lvl-1])/(nextT-XPT[lvl-1])*100):100;
  const hi=`¡Hola, ${esc(p.name)}! Soy ${mname(p.avatar)}. ¿A qué jugamos hoy?`;
  const tile=(t,i)=>`<button class="toytile bg-${t.c}" data-t="${t.id}" style="animation-delay:${i*.02}s"><span class="ic">${toyIcon(t,'1.25em')}</span><b>${t.name}</b></button>`;
  const adv=[['learn','🎒','Retos por grado','20 juegos de 1ro a 6to','lav'],['math','⚡','Cálculo mental','1 minuto al día','peach'],['fluency','📖','Lectura en voz alta','Mide tu velocidad lectora','rose'],['eng','🇺🇸','Mundo de inglés','Palabras, canciones y diálogos','sky'],['story','📚','Cuentos','Tú decides qué pasa','mint']];
  /* cada día (y para cada niño) cambia el orden de los juegos y de las secciones, para que vea todos con el tiempo.
     El orden se mantiene igual durante el día, así el niño encuentra lo que buscaba. */
  const dia=new Date(), semilla=[...(dia.getFullYear()+'-'+(dia.getMonth()+1)+'-'+dia.getDate()+'|'+p.id)].reduce((h,c)=>Math.imul(h^c.charCodeAt(0),16777619)>>>0,2166136261);
  let sem=semilla; const azar=()=>{ sem=(sem+0x6D2B79F5)>>>0; let r=Math.imul(sem^sem>>>15,1|sem); r=r+Math.imul(r^r>>>7,61|r)^r; return ((r^r>>>14)>>>0)/4294967296; };
  const mezclar=a=>{ a=a.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(azar()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; };
  const SECC=[
    c=>`<h2 class="h-sec${c}">Sala de juegos</h2><div class="toys">${mezclar(TOYS.filter(t=>!t.brain&&!t.hidden)).map(tile).join('')}</div>`,
    c=>`<h2 class="h-sec${c}" style="margin-bottom:var(--s-1)">Retos de ingenio ${ilu('ic_idea','1.1em')}</h2><p class="muted" style="margin:0 0 var(--s-3);font-weight:600">Para pensar, planear y resolver</p><div class="toys">${mezclar(TOYS.filter(t=>t.brain)).map(tile).join('')}</div>`,
    c=>`<h2 class="h-sec${c}">Aventuras para aprender</h2><div style="display:flex;flex-direction:column;gap:var(--s-3)">${mezclar(adv).map(([v,ic,n,d,c2])=>`<button class="area bg-${c2}" data-v="${v}" style="width:100%;min-height:0;flex-direction:row;align-items:center;gap:var(--s-4)"><span class="ic">${toyIcon(v,'1.35em')||ic}</span><span><b>${n}</b><br><small>${d}</small></span></button>`).join('')}</div>`];
  const secciones=mezclar(SECC).map((s,i)=>s(i?'':' first')).join('\n  ');
  app.innerHTML=`<div class="row" style="margin-bottom:var(--s-2)"><div class="logo" style="font-size:var(--fs-2xl)">Semi<span>llita</span></div><div class="sp"></div><button class="chip vt" style="margin-right:var(--s-2)"></button><button class="chip" id="switch">${ilu('ic_perfil','1.25em')} Cambiar</button></div>
  <div class="hero land" style="align-items:center">${mascot(p.avatar,100)}<div style="flex:1"><div class="bubble" style="font-size:var(--fs-md)">${hi}</div>
    <div class="row" style="margin-top:var(--s-3);gap:var(--s-2);flex-wrap:wrap"><button class="chip" id="friend">${ilu('ic_gorro','1.3em')} Mi amigo</button><button class="chip" id="album">${ilu('ic_album','1.25em')} ${(p.stickers||[]).length}/${STK.length}</button></div>
    <div class="nivel"><div style="font-size:var(--fs-xs);font-weight:800;color:#5A566B">${ilu('brote','1.5em')} ${LEVELN[lvl-1]}</div><div class="bar" style="background:var(--line);height:8px;margin-top:var(--s-1)"><i class="fg-mint" style="width:${pct}%"></i></div></div></div></div>
  ${secciones}`;
  /* rebote corto del ícono antes de abrir (sin animación con movimiento reducido) */
  const tapGo=(el,fn)=>{ const ic=el.querySelector('.ic'); if (RM||!ic||!ic.animate) return fn();
    ic.animate([{transform:'scale(1)'},{transform:'scale(.82,1.12)'},{transform:'scale(1.12,.9)'},{transform:'scale(1)'}],{duration:260,easing:'ease-out'}); setTimeout(fn,170); };
  bind('[data-t]', el=>tapGo(el,()=>go({name:'toy', toy:el.dataset.t})));
  bind('[data-v]', el=>tapGo(el,()=>go({name:el.dataset.v})));
  bind('#friend', ()=>go({name:'friend'})); bind('#album', ()=>go({name:'friend',tab:'album'}));
  bind('#switch', ()=>{ greeted=false; go({name:'profiles'}); });
  bind('.hero .mascot', ()=>{ react('happy'); speak(pick([`¡Hola, ${p.name}!`,'¡Me haces cosquillas!','¡Vamos a jugar!'])); });
  if (!greeted){ greeted=true; setTimeout(()=>speak(hi),500); }
};
