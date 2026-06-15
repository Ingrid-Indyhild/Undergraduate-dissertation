class MainPage {
  getHeader() {
    return cy.get('header');
  }

  getFooter() {
    return cy.get('footer');
  }

  getNavLinks() {
    return cy.get('nav a');
  }

  getSubmitButton() {
    return cy.get('button[type="submit"]');
  }

  clickSubmit() {
    this.getSubmitButton().click();
  }

  fillInputById(id, value) {
    cy.get(`#${id}`).clear().type(value);
  }
}

module.exports = new MainPage();