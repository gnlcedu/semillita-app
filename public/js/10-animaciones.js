/* Semillita · Animaciones y transiciones (fase 7)
   =========================================================
   - Entrada suave de cada pantalla (deslizar + desvanecer) con Web Animations API.
     Solo se anima la ENTRADA: go() sigue cambiando la vista de inmediato, así ningún
     código que espera la vista nueva al instante se rompe.
   - squash(el): aplastar y rebotar cuando algo cae y toca el suelo.
   - Solo transform/opacity, sin librerías. Con prefers-reduced-motion no se anima nada.
   Se carga después de 09-escenarios.js y antes de 05-juguetes-nuevos.js.
   ========================================================= */
(function(){
const reduce=()=> (typeof RM!=='undefined' && RM) || !Element.prototype.animate;

/* pantallas "hacia atrás": entran desde la izquierda */
const BACK=new Set(['home','profiles']);
let lastName=null;
if (typeof go==='function'){ const _go=go;
  go=function(v){ const r=_go(v); const app=document.getElementById('app');
    if (!reduce() && app && v && v.name!==lastName){
      const dx=BACK.has(v.name)?-22:22;
      app.animate([{opacity:0,transform:`translateX(${dx}px)`},{opacity:1,transform:'none'}],{duration:260,easing:'cubic-bezier(.2,.8,.3,1)'});
    }
    lastName=v&&v.name; return r; };
}

/* aplastar y rebotar (al aterrizar) */
window.squash=(el,k=1)=>{ if(!el||reduce()) return;
  el.animate([{transform:'scale(1,1)'},{transform:`scale(${1+.14*k},${1-.16*k})`},{transform:`scale(${1-.06*k},${1+.08*k})`},{transform:'scale(1,1)'}],
    {duration:420,easing:'ease-out',composite:'add'}); };
/* aterrizaje automático: cuando un elemento termina de caer (transición de "top") */
window.landSquash=el=>el.addEventListener('transitionend',e=>{ if(e.propertyName==='top') squash(el); });
})();
