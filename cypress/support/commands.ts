/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare namespace Cypress {
  interface Chainable {
    login(email: string, password: string): Chainable<void>;
  }
}

Cypress.Commands.add('login', (email: string, password: string) => {
  // Interceptar la llamada a la API de login
  cy.intercept('POST', '/api/auth/login').as('loginRequest');

  // Visitar la página de login
  cy.visit('/login');

  // Llenar el formulario
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);

  // Enviar el formulario
  cy.get('button[type="submit"]').click();

  // Esperar la respuesta de la API
  cy.wait('@loginRequest').then((interception) => {
    if (interception.response?.statusCode === 200) {
      // Guardar el token en localStorage si es necesario
      const token = interception.response.body.token;
      if (token) {
        localStorage.setItem('token', token);
      }
    }
  });

  // Verificar que estamos autenticados
  cy.url().should('not.include', '/login');
});