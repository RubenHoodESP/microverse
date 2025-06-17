describe('Autenticación E2E', () => {
  beforeEach(() => {
    // Limpiar cookies y localStorage antes de cada test
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  describe('Registro', () => {
    it('debe registrar un nuevo usuario exitosamente', () => {
      cy.visit('/register');

      // Llenar el formulario
      cy.get('input[name="email"]').type('newuser@test.com');
      cy.get('input[name="username"]').type('newuser');
      cy.get('input[name="password"]').type('password123');
      cy.get('input[name="name"]').type('New User');

      // Enviar el formulario
      cy.get('button[type="submit"]').click();

      // Verificar redirección
      cy.url().should('include', '/');

      // Verificar que estamos autenticados
      cy.get('[data-testid="user-menu"]').should('exist');
    });

    it('debe mostrar errores de validación', () => {
      cy.visit('/register');

      // Intentar enviar formulario vacío
      cy.get('button[type="submit"]').click();

      // Verificar mensajes de error
      cy.contains('Todos los campos son requeridos').should('be.visible');

      // Probar email inválido
      cy.get('input[name="email"]').type('invalid-email');
      cy.get('input[name="username"]').type('user');
      cy.get('input[name="password"]').type('123');
      cy.get('button[type="submit"]').click();

      cy.contains('Por favor, introduce un email válido').should('be.visible');
    });

    it('debe manejar email ya registrado', () => {
      cy.visit('/register');

      // Intentar registrar con email existente
      cy.get('input[name="email"]').type('existing@test.com');
      cy.get('input[name="username"]').type('existinguser');
      cy.get('input[name="password"]').type('password123');
      cy.get('button[type="submit"]').click();

      cy.contains('El email ya está registrado').should('be.visible');
    });
  });

  describe('Login', () => {
    it('debe realizar login exitosamente', () => {
      cy.visit('/login');

      // Llenar formulario
      cy.get('input[name="email"]').type('test@test.com');
      cy.get('input[name="password"]').type('password123');

      // Enviar formulario
      cy.get('button[type="submit"]').click();

      // Verificar redirección
      cy.url().should('include', '/');

      // Verificar que estamos autenticados
      cy.get('[data-testid="user-menu"]').should('exist');
    });

    it('debe mostrar error con credenciales inválidas', () => {
      cy.visit('/login');

      // Intentar login con credenciales incorrectas
      cy.get('input[name="email"]').type('wrong@test.com');
      cy.get('input[name="password"]').type('wrongpass');
      cy.get('button[type="submit"]').click();

      cy.contains('Credenciales inválidas').should('be.visible');
    });

    it('debe redirigir a registro', () => {
      cy.visit('/login');
      cy.contains('¿No tienes una cuenta?').click();
      cy.url().should('include', '/register');
    });
  });

  describe('Logout', () => {
    beforeEach(() => {
      // Login antes de cada test
      cy.login('test@test.com', 'password123');
    });

    it('debe realizar logout correctamente', () => {
      cy.visit('/');
      
      // Click en botón de logout
      cy.get('[data-testid="logout-button"]').click();

      // Verificar redirección a login
      cy.url().should('include', '/login');

      // Verificar que no estamos autenticados
      cy.get('[data-testid="user-menu"]').should('not.exist');
    });
  });

  describe('Protección de rutas', () => {
    it('debe redirigir a login en rutas protegidas', () => {
      // Intentar acceder a una ruta protegida sin autenticación
      cy.visit('/dashboard');
      cy.url().should('include', '/login');
    });

    it('debe redirigir a home en rutas de auth si está autenticado', () => {
      // Login
      cy.login('test@test.com', 'password123');

      // Intentar acceder a login estando autenticado
      cy.visit('/login');
      cy.url().should('eq', Cypress.config().baseUrl + '/');

      // Intentar acceder a registro estando autenticado
      cy.visit('/register');
      cy.url().should('eq', Cypress.config().baseUrl + '/');
    });
  });
}); 