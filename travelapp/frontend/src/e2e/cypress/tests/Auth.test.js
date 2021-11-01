describe('Authentication', () => {
  it('renders and redirects to an unauthenticated app for unlogged users', () => {
    cy.visit('/');
    cy.findByText('Zaloguj się').should('exist');
    cy.findByText('Zarejestruj się').click();

    cy.visit('/photos');
    cy.findByText('Zaloguj się').should('exist');
  });

  it('redirects user to the main page after login', () => {
    cy.visit('/');

    cy.findByLabelText('Login').type('testuser');
    cy.findByLabelText('Hasło').type('testpassword');
    cy.findAllByText('Zaloguj się').click();

    cy.findByText('Pomyślne logowanie').should('exist');
    cy.findByText('Witamy ponownie!').should('exist');
    cy.findByText('Podróże').should('exist');
  });
});
