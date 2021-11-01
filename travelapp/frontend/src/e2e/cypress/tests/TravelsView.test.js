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
    cy.get('#travels-search_name').type('n');
    cy.get('.ant-btn > span').click();
    cy.get('#travels-search').submit();

    cy.findByText('nowa').should('exist');
    cy.findByText('Niedawna podróż').should('exist');
    cy.findByText('Testowa podróż').should('not.exist');
  });
});
