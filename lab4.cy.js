import { commonPageChecks } from '../support/commonChecks';
describe('Lab 4 - Image Maps', () => {
  beforeEach(() => {
    cy.visit('/Lab.4.html');
  });

  it('Common validation', () => {
    commonPageChecks();
  });

  it('<img> with usemap attribute exists', () => {
    cy.get('img[usemap]').should('exist');
  });

  it('<map> tag exists', () => {
    cy.get('map').should('exist');
  });

  it('<map> has a name attribute', () => {
    cy.get('map').should('have.attr', 'name');
  });

  it('At least one <area> tag exists inside map', () => {
    cy.get('map area').should('have.length.greaterThan', 0);
  });

  it('All <area> tags have shape attribute', () => {
    cy.get('area').each((area) => {
      cy.wrap(area).should('have.attr', 'shape');
    });
  });

  it('All <area> tags have href attribute', () => {
    cy.get('area').each((area) => {
      cy.wrap(area).should('have.attr', 'href');
    });
  });

  it('All <area> tags have alt attribute', () => {
    cy.get('area').each((area) => {
      cy.wrap(area).should('have.attr', 'alt');
    });
  });

  it('Uses shape="rect"', () => {
    cy.get('area[shape="rect"]').should('exist');
  });

  it('Uses shape="circle"', () => {
    cy.get('area[shape="circle"]').should('exist');
  });

  it('Uses shape="poly"', () => {
    cy.get('area[shape="poly"]').should('exist');
  });

  it('Uses shape="default"', () => {
    cy.get('area[shape="default"]').should('exist');
  });

  it('<img> has alt attribute', () => {
    cy.get('img').each((img) => {
      cy.wrap(img).should('have.attr', 'alt');
    });
  });
});
