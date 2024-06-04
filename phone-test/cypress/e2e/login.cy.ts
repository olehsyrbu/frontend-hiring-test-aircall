/// <reference types="cypress" />

describe('Check Login, detail page and logout', () => {
  before(() => {
    cy.fixture('user').then(user => {
      this.user = user;
    });
  });

  it('Login and redirect with logout', () => {
    cy.visit('/login');

    //set username and password
    cy.get('#email').type(this.user.email).should('have.value', this.user.email);
    cy.get('#password').type(this.user.password).should('have.value', this.user.password);
    cy.get('button[type="submit"]').contains('Login').click();

    cy.contains('a', 'logout').should('be.visible').click();
    cy.url().should('include', '/login');
    cy.getAllLocalStorage().should('be.empty');
  });

  it('Login without email and password', () => {
    cy.visit('/login');
    cy.get('button[type="submit"]').contains('Login').click();
    cy.get('input:invalid').should('have.length', 2);
    cy.url().should('include', '/login');
  });
});
