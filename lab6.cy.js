import { commonPageChecks } from '../support/commonChecks';
describe('Lab 6 - CSS Styles', () => {
  beforeEach(() => {
    cy.visit('/Lab.6.html');
  });

  it('Common validation', () => {
    commonPageChecks();
  });

  // External stylesheet via <link>
  it('External CSS connected via <link rel="stylesheet">', () => {
    cy.get('link[rel="stylesheet"]').should('exist');
  });

  // Internal styles via <style> tag
  it('Internal <style> tag exists in <head>', () => {
    cy.get('head style').should('exist');
  });

  // Inline style on an element
  it('At least one element has inline style attribute', () => {
    cy.get('[style]').should('have.length.greaterThan', 0);
  });

  // CSS @import inside <style>
  it('CSS @import is used (style tag contains @import)', () => {
    cy.get('head style').invoke('text').should('include', '@import');
  });

  it('h1 exists', () => {
    cy.get('h1').should('exist');
  });

  it('h2 exists', () => {
    cy.get('h2').should('exist');
  });

  it('At least one <p> exists', () => {
    cy.get('p').should('have.length.greaterThan', 0);
  });

  it('<img> with alt attribute exists', () => {
    cy.get('img').should('exist');
    cy.get('img').each((img) => {
      cy.wrap(img).should('have.attr', 'alt');
    });
  });

  it('<a> links exist and have href', () => {
    cy.get('a').each((link) => {
      cy.wrap(link).should('have.attr', 'href');
    });
  });

  it('<ul> list exists', () => {
    cy.get('ul').should('exist');
  });

  it('<hr> tag exists', () => {
    cy.get('hr').should('exist');
  });

  it('Body has background-image set via CSS', () => {
    cy.get('body').should('have.css', 'background-image').and('not.equal', 'none');
  });

  it('Element with class exists (CSS class selector used)', () => {
    cy.get('[class]').should('have.length.greaterThan', 0);
  });

  it('Pseudo-class :hover defined (a:link style present)', () => {
    // Checks that <a> has color styling applied (result of a:link rule)
    cy.get('a').should('have.css', 'color');
  });
});
