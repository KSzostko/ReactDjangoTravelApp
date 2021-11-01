describe('Authentication', () => {
  it('renders and redirects to an unauthenticated app for unlogged users', () => {
    cy.visit('/');
    cy.findByText('Zaloguj się').should('exist');
    cy.findByText('Zarejestruj się').click();

    cy.visit('/photos');
    cy.findByText('Zaloguj się').should('exist');
  });
});
