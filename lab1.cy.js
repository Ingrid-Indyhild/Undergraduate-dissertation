import { commonPageChecks } from '../support/commonChecks';
describe('Coursework - Page Validator', () => {
  const pages = [
    'index.html',
    'sample3.html'
  ];

  const studentName = Cypress.env('studentName');

  pages.forEach((page) => {
    describe(`Checking page: ${page}`, () => {

      beforeEach(() => {
        cy.visit(`/${page}`);
      });

      it('Common validation', () => {
        commonPageChecks();
      });

      it('Checking student name presence', () => {
        if (studentName) {
          cy.get('body')
            .should('contain.text', studentName);
        }
      });

      it('Checking that at least one header exists (h1–h6)', () => {
        cy.get('body').then((body) => {
          const hasHeader = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
            .some(tag => body.find(tag).length > 0);
          expect(hasHeader).to.be.true;
        });
      });

      it('Checking that h1 exists', () => {
        cy.get('h1').should('exist');
      });

      it('Background color is defined', () => {
        cy.get('body')
          .should('have.css', 'background-color')
          .and('not.equal', 'rgba(0, 0, 0, 0)');
      });

      it('Checking that at least one <table> exists', () => {
        cy.get('table').should('have.length.greaterThan', 0);
      });

      it('Checking table structure (rows and columns)', () => {
        cy.get('table').first().within(() => {
          cy.get('tr').should('have.length.greaterThan', 1);
          cy.get('td, th').should('exist');
        });
      });

      it('Checking that table has border', () => {
        cy.get('table')
          .should('have.attr', 'border');
      });

      it('Checking that at least one <footer> exists', () => {
        cy.get('footer').should('exist');
      });

      it('Checking that at least one paragraph exists', () => {
        cy.get('p').should('have.length.greaterThan', 0);
      });

      it('Checking links (<a>) exist and have href', () => {
        cy.get('a').each((link) => {
          cy.wrap(link).should('have.attr', 'href');
        });
      });

      it('Checking images (<img>) have alt attribute', () => {
        cy.get('img').each((img) => {
          cy.wrap(img).should('have.attr', 'alt');
        });
      });

      it('Checking list exists (ul or ol)', () => {
        cy.get('ul, ol').should('exist');
      });

      it('Checking CSS is connected', () => {
        cy.get('link[rel="stylesheet"]').should('exist');
      });

      it('Checking JS file is connected', () => {
        cy.get('script[src]').should('exist');
      });

      it('Checking button exists', () => {
        cy.get('button, input[type="button"], input[type="submit"]').should('exist');
      });

      it('Checking form exists', () => {
        cy.get('form').should('exist');
      });

      it('Checking input fields exist', () => {
        cy.get('input').should('have.length.greaterThan', 0);
      });

      it('No console errors', () => {
        cy.on('window:before:load', (win) => {
          cy.spy(win.console, 'error')
            .as('consoleError');
        });

        cy.reload();

        cy.get('@consoleError')
          .should('not.be.called');
      });

    });
  });
});