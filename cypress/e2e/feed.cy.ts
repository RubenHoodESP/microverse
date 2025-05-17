describe('Feed público', () => {
  it('Muestra posts simulados correctamente', () => {
    cy.visit('/');
    cy.contains('Feed público');
    cy.contains('Primer post');
    cy.contains('Hola Microverse!');
  });
});
