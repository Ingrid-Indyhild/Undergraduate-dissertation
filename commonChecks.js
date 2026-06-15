export function commonPageChecks() {
  cy.title().should('not.be.empty');
  cy.get('meta[charset]').should('exist');
  cy.get('meta[name="viewport"]').should('exist');
}