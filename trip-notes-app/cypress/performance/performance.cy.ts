describe('Search Rendering', () => {
  it('should render filtered trip notes in under 1200ms', () => {
    cy.visit('/');

    const start = performance.now();
    cy.get('input[placeholder="Search trip note..."]').type('Galati');

    cy.get('app-trip-note')
      .should('have.length', 1)
      .then(() => {
        const end = performance.now();
        const renderTime = end - start;

        cy.log(`Search rendering time: ${renderTime}ms`);
        expect(renderTime).to.be.lessThan(1200);
      });
  });
});
