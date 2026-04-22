describe('Coursework - Page Validator', () => {
  const pages = [
    'index.html',
    'sample3.html'
  ];

  const studentName = 'Прізвище Студента';

  pages.forEach((page) => {
    describe(`Checking page: ${page}`, () => {

      beforeEach(() => {
        cy.visit(`http://127.0.0.1:8080/${page}`);
      });

      it('Checking page title exists and is not empty', () => {
        cy.title().should('not.be.empty');
      });

      it('Checking charset meta tag', () => {
        cy.get('meta[charset]').should('exist');
      });

      it('Checking viewport meta tag', () => {
        cy.get('meta[name="viewport"]').should('exist');
      });

      it('Checking student name presence', () => {
        cy.get('body').should('contain.text', studentName);
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

      it('Checking for defined background-color', () => {
        cy.get('body')
          .should('have.css', 'background-color')
          .and('equal', 'rgb(173, 216, 230)');
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

      it('Checking no console errors', () => {
        cy.window().then((win) => {
          cy.spy(win.console, 'error').as('consoleError');
        });
        cy.get('@consoleError').should('not.be.called');
      });

    });
  });
});