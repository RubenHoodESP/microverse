# Microverse — MVP Red Social tipo Twitter

Microverse es una red social estilo Twitter desarrollada con un enfoque **moderno, optimizado y escalable**, siguiendo buenas prácticas profesionales de desarrollo Front-End con **Next.js 15, React 19 y arquitectura limpia**.

---

## 🚀 Tecnologías principales usadas

| Tecnología                 | Descripción                                                         |
| -------------------------- | ------------------------------------------------------------------- |
| Next.js 15 (App Router)    | Framework React con soporte SSR, CSR, ISR y Server Components       |
| React 19                   | Última versión estable de React                                     |
| TypeScript                 | Tipado estricto y seguro                                            |
| Redux Toolkit + RTK Query  | Manejo de estado global y APIs con caching, invalidación automática |
| @tanstack/react-query (v5) | Fetching de datos optimizado, compatible con React 19               |
| TailwindCSS + shadcn/ui    | Estilos modernos y componentes flexibles                            |
| Framer Motion              | Animaciones suaves y controladas                                    |
| Lucide-React               | Librería moderna de iconos para React                               |
| next-themes                | Soporte de modo claro/oscuro dinámico                               |

---

## 🏗 Arquitectura aplicada

### Enfoques combinados:

- **Feature-Sliced Design:**  
  Modularización por características de negocio (`features/posts`, `features/auth`), cada una aislada con sus componentes, lógica y servicios.
- **Clean Architecture adaptada a Front-End:**  
  Separación estricta entre UI, lógica de negocio, servicios y entidades puras (`entities`), siguiendo principios SOLID.

- **Atomic Design (en shared/components):**  
  Componentes reutilizables y UI atómica bien documentada.

---

### Estructura de carpetas

app/ → App Router y páginas (SSR/CSR)
features/ → Features de negocio aisladas (posts, auth, comments)
entities/ → Entidades puras (Post, User)
shared/ → Compartido globalmente (UI, hooks, store, utils, services)
public/ → Assets públicos

---

## ⚙ Herramientas de calidad y DevOps

| Herramienta                       | Descripción                                           |
| --------------------------------- | ----------------------------------------------------- |
| ESLint + Prettier                 | Linter y formateo de código automático                |
| Husky + lint-staged               | Hooks de git para asegurar calidad en commits         |
| Commitlint + Conventional Commits | Validación de mensajes de commit siguiendo estándares |
| Jest + Testing Library            | Testing unitario e integración                        |
| Cypress                           | Testing End-to-End (E2E)                              |
| MSW (Mock Service Worker)         | Mocking de APIs en desarrollo y tests                 |
| GitHub Actions (previsto)         | CI/CD pipeline (build, lint, test, deploy)            |
| Storybook (previsto)              | Documentación visual y accesible de componentes UI    |

---

## 🔑 Buenas prácticas aplicadas

- Código limpio, modular y tipado fuerte con TypeScript.
- Aplicación de principios **SOLID** en Front-End.
- Uso de RTK Query + TanStack Query para fetching y caching moderno.
- Uso de Server Components cuando es posible.
- Separación clara por dominios de negocio (`features/`) y responsabilidades (`shared/`, `entities/`).
- Tests unitarios, de integración y E2E implementados desde el día 1.
- Integración de CI/CD con control de calidad en cada push.
- Documentación clara, mantenible y escalable.

---

## 💡 Próximos pasos (roadmap MVP → producto escalable)

1. Implementar Likes y Comments como features aisladas.
2. Añadir WebSocket o Polling para feed en tiempo real.
3. Completar perfil de usuario editable.
4. Añadir sistema de notificaciones.
5. Desplegar en Vercel con pipelines.
6. Integrar Lighthouse CI, SonarCloud.
7. Refinar accesibilidad y performance (Lighthouse 100%).
8. Publicar Storybook documentando la UI completa.

---

## 📁 Cómo ejecutar el proyecto

```bash
npm install
npm run dev

👥 Contribuciones y estilo de trabajo
Commits siguiendo Conventional Commits.

Ramas siguiendo la convención feature/, fix/, refactor/.

Pull Requests obligatorios con revisión y validación de CI.
```
