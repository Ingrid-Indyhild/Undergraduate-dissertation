import { commonPageChecks } from '../support/commonChecks';
describe('Lab 5 - Forms', () => {
  beforeEach(() => {
    cy.visit('/Lab.5.html');
  });

  it('Common validation', () => {
    commonPageChecks();
  });

  it('<form> exists with action and method', () => {
    cy.get('form').should('exist');
    cy.get('form').should('have.attr', 'action');
    cy.get('form').should('have.attr', 'method');
  });

  it('input[type="text"] exists', () => {
    cy.get('input[type="text"]').should('exist');
  });

  it('input[type="radio"] exists', () => {
    cy.get('input[type="radio"]').should('exist');
  });

  it('input[type="password"] exists', () => {
    cy.get('input[type="password"]').should('exist');
  });

  it('input[type="date"] exists', () => {
    cy.get('input[type="date"]').should('exist');
  });

  it('input[type="email"] exists', () => {
    cy.get('input[type="email"]').should('exist');
  });

  it('input[type="tel"] exists', () => {
    cy.get('input[type="tel"]').should('exist');
  });

  it('input[type="url"] exists', () => {
    cy.get('input[type="url"]').should('exist');
  });

  it('<textarea> exists', () => {
    cy.get('textarea').should('exist');
  });

  it('<select> with multiple exists', () => {
    cy.get('select[multiple]').should('exist');
  });

  it('<option> elements exist inside select', () => {
    cy.get('select option').should('have.length.greaterThan', 1);
  });

  it('input[type="number"] exists', () => {
    cy.get('input[type="number"]').should('exist');
  });

  it('input[type="datetime-local"] exists', () => {
    cy.get('input[type="datetime-local"]').should('exist');
  });

  it('input[type="time"] exists', () => {
    cy.get('input[type="time"]').should('exist');
  });

  it('input[type="week"] exists', () => {
    cy.get('input[type="week"]').should('exist');
  });

  it('input[type="month"] exists', () => {
    cy.get('input[type="month"]').should('exist');
  });

  it('input[type="checkbox"] exists', () => {
    cy.get('input[type="checkbox"]').should('exist');
  });

  it('input[type="color"] exists', () => {
    cy.get('input[type="color"]').should('exist');
  });

  it('input[type="range"] exists', () => {
    cy.get('input[type="range"]').should('exist');
  });

  it('input[type="file"] exists', () => {
    cy.get('input[type="file"]').should('exist');
  });

  it('input[type="search"] exists', () => {
    cy.get('input[type="search"]').should('exist');
  });

  it('input[type="reset"] exists', () => {
    cy.get('input[type="reset"]').should('exist');
  });

  it('input[type="submit"] exists', () => {
    cy.get('input[type="submit"]').should('exist');
  });

  it('input[type="image"] exists', () => {
    cy.get('input[type="image"]').should('exist');
  });

  it('input[type="hidden"] exists', () => {
    cy.get('input[type="hidden"]').should('exist');
  });

  it('<fieldset> and <legend> exist', () => {
    cy.get('fieldset').should('exist');
    cy.get('legend').should('exist');
  });

  it('All inputs have id or name', () => {
    cy.get('input[type!="hidden"]').each((input) => {
      const hasId = input.attr('id');
      const hasName = input.attr('name');
      expect(hasId || hasName).to.exist;
    });
  });

  it('<label> elements exist', () => {
    cy.get('label').should('have.length.greaterThan', 0);
  });
});
