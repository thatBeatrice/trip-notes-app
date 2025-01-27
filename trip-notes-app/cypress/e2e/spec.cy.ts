describe('Search Bar', () => {
  it('should filter trip notes based on the search term', () => {
    cy.visit('/');

    cy.get('input[placeholder="Search trip note..."]').type('Galati');
    cy.get('app-trip-note')
      .should('have.length', 1)
      .and('contain.text', 'Galati');

    cy.get('input[placeholder="Search trip note..."]').clear();
    cy.get('app-trip-note').should('have.length.greaterThan', 1);
  });
});
