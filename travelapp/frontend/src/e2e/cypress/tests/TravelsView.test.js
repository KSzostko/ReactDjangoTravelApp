describe('Travels view', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.findByLabelText('Login').type('testuser');
    cy.findByLabelText('Hasło').type('testpassword');
    cy.findAllByText('Zaloguj się').click();
  });

  it('integrates sorting and filtering', () => {
    cy.get('#rc_select_0').click();
    cy.get(
      '.ant-select-item-option-active > .ant-select-item-option-content'
    ).click();
    cy.get('#travels-search_name').click();
    cy.get('#travels-search_name').type('F');
    cy.get('.ant-btn > span').click();
    cy.get('#travels-search').submit();

    cy.findByText('Fuerteventura').should('exist');
    cy.findByText('Hawaje').should('not.exist');
    cy.findByText('Rzym latem').should('not.exist');
  });

  it('renders list correctly after sorting clearance', () => {
    cy.get('.ant-select').click();
    cy.findByText('Najstarsze').click();
    cy.findByLabelText('close-circle').click();

    cy.findByText('Sortuj').should('exist');
  });
});
