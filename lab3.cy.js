import { commonPageChecks } from '../support/commonChecks';
describe('Lab 3 - Tables', () => {
  const pages = ['Lab.3.1.html', 'Lab.3.2.html'];

  pages.forEach((page) => {
    describe(`Checking: ${page}`, () => {
      beforeEach(() => {
        cy.visit(`/${page}`);
      });

      it('Common validation', () => {
        commonPageChecks();
      });

      it('At least one <table> exists', () => {
        cy.get('table').should('have.length.greaterThan', 0);
      });

      it('Table has <tr> rows', () => {
        cy.get('table').first().within(() => {
          cy.get('tr').should('have.length.greaterThan', 1);
        });
      });

      it('<td> or <th> cells exist', () => {
        cy.get('td, th').should('exist');
      });

      it('Table uses colspan or rowspan (merged cells)', () => {
        cy.get('td[colspan], td[rowspan], th[colspan], th[rowspan]').should('exist');
      });

      it('<thead> exists', () => {
        cy.get('thead').should('exist');
      });

      it('<tbody> exists', () => {
        cy.get('tbody').should('exist');
      });
    });
  });
});
