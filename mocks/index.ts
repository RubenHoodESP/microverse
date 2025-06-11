import { worker } from './browser';

export async function initMocks(): Promise<boolean> {
  if (typeof window === 'undefined') {
    console.log('[MSW] Inicialización cancelada - window no está disponible');
    return false;
  }

  if (!worker) {
    console.log('[MSW] Inicialización cancelada - worker no está disponible');
    return false;
  }

  if (process.env.NODE_ENV !== 'development') {
    console.log('[MSW] Inicialización cancelada - no es entorno de desarrollo');
    return false;
  }

  try {
    console.log('[MSW] Intentando iniciar el worker...');
    
    // Verificar si el Service Worker ya está registrado
    const registrations = await navigator.serviceWorker.getRegistrations();
    console.log('[MSW] Service Workers registrados:', registrations.length);
    
    // Desregistrar cualquier Service Worker existente
    for (const registration of registrations) {
      console.log('[MSW] Desregistrando Service Worker:', registration.scope);
      await registration.unregister();
    }

    // Iniciar el worker con configuración explícita
    await worker.start({
      serviceWorker: {
        url: `${window.location.origin}/mockServiceWorker.js`,
        options: {
          scope: '/',
          type: 'module'
        },
      },
      onUnhandledRequest: 'bypass',
    });

    console.log('[MSW] Service Worker iniciado correctamente');
    return true;
  } catch (error) {
    console.error('[MSW] Error detallado al iniciar el Service Worker:', error);
    if (error instanceof Error) {
      console.error('[MSW] Mensaje de error:', error.message);
      console.error('[MSW] Stack trace:', error.stack);
    }
    return false;
  }
} 