// Punto de entrada moderno: letra Nunito sin internet + app instalable (PWA).
// La lógica de la app vive en /public/js/ (scripts clásicos que comparten variables globales).
import '@fontsource/nunito/400.css';
import '@fontsource/nunito/600.css';
import '@fontsource/nunito/700.css';
import '@fontsource/nunito/800.css';
import { registerSW } from 'virtual:pwa-register';

/* Estado de la instalación, que lee la tarjeta «Instalar» de la zona de adultos (07-aprender-adultos.js).
   - prompt: el aviso de instalación que ofrece Chrome en Android y computadoras (null si no lo ofrece).
   - offline: true cuando la app ya quedó guardada en el dispositivo y abre sin internet. */
const PWA = (window.SEMI_PWA = { prompt: null, offline: !!(navigator.serviceWorker && navigator.serviceWorker.controller) });
const redibujar = () => { try { if (view.name === 'adults') render(); } catch (e) {} };

window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); PWA.prompt = e; redibujar(); });
window.addEventListener('appinstalled', () => { PWA.prompt = null; PWA.installed = true; redibujar(); });

registerSW({ immediate: true, onOfflineReady() { PWA.offline = true; redibujar(); } });
