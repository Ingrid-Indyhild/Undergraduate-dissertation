import { commonPageChecks } from '../support/commonChecks';
describe('Lab 7 - JavaScript', () => {
  beforeEach(() => {
    cy.visit('/Lab.7.html');
  });

  it('Common validation', () => {
    commonPageChecks();
  });

  it('<script> tag exists (inline JS)', () => {
    cy.get('script').should('exist');
  });

  it('<button> exists', () => {
    cy.get('button').should('exist');
  });

  it('Button has onclick attribute', () => {
    cy.get('button[onclick]').should('exist');
  });

  it('<img> with alt attribute exists', () => {
    cy.get('img').should('exist');
    cy.get('img').each((img) => {
      cy.wrap(img).should('have.attr', 'alt');
    });
  });

  it('Result container div exists', () => {
    cy.get('#result-container').should('exist');
  });

  it('Button click triggers prompt and shows result', () => {
    // Stub the prompt to return a number
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('3');
    });

    cy.get('button').click();

    cy.get('#result-container').should('not.be.empty');
  });

  it('Result contains "Результат:" after valid input', () => {
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('2');
    });

    cy.get('button').click();

    cy.get('#result-container').should('contain.text', 'Результат:');
  });

  it('No console errors on page load', () => {
    cy.window().then((win) => {
      cy.spy(win.console, 'error').as('consoleError');
    });
    cy.get('@consoleError').should('not.be.called');
  });
});
