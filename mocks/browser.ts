import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

// Configuración global del worker
worker.events.on('unhandledException', (error) => {
  console.error('MSW Error:', error);
}); 