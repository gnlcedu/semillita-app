// Punto de entrada moderno: letra Nunito sin internet + app instalable (PWA).
// La lógica de la app vive en /public/js/ (scripts clásicos que comparten variables globales).
import '@fontsource/nunito/400.css';
import '@fontsource/nunito/600.css';
import '@fontsource/nunito/700.css';
import '@fontsource/nunito/800.css';
import { registerSW } from 'virtual:pwa-register';

registerSW({ immediate: true });
