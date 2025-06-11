import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

let worker: ReturnType<typeof setupWorker> | undefined;

if (typeof window !== 'undefined') {
  worker = setupWorker(...handlers);
}

export { worker };

// Configuración global del worker
worker?.events.on('unhandledException', (error) => {
  console.error('[MSW] Error no manejado:', error);
});

// Configuración para peticiones no manejadas
worker?.events.on('request:start', (context) => {
  const { request } = context;
  if (!handlers.some(handler => handler.test(request))) {
    console.warn('[MSW] Petición no manejada:', request.method, request.url);
  }
});

export async function initMocks(): Promise<boolean> {
  if (typeof window === 'undefined') {
    return false;
  }

  if (process.env.NODE_ENV !== 'development') {
    return false;
  }

  try {
    // Esperar a que el DOM esté completamente cargado
    if (document.readyState !== 'complete') {
      await new Promise((resolve) => {
        window.addEventListener('load', resolve);
      });
    }

    // Desregistrar cualquier Service Worker existente
    const registrations = await navigator.serviceWorker.getRegistrations();
    for (const registration of registrations) {
      await registration.unregister();
    }

    // Iniciar el worker con una URL absoluta
    await worker?.start({
      serviceWorker: {
        url: `${window.location.origin}/mockServiceWorker.js`,
        options: {
          scope: '/',
        },
      },
      onUnhandledRequest: 'bypass',
    });

    console.log('[MSW] Service Worker iniciado correctamente');
    return true;
  } catch (error) {
    console.error('[MSW] Error al iniciar el Service Worker:', error);
    return false;
  }
} 