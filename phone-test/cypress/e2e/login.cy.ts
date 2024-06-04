/// <reference types="cypress" />

describe('Check Login, detail page and logout', () => {
  before(() => {
    cy.fixture('user').then(user => {
      this.user = user;
    });
  });

  it('Should can not Login without email and password', () => {
    cy.visit('/login');
    cy.get('button[type="submit"]').contains('Login').click();
    cy.get('input:invalid').should('have.length', 2);
    cy.url().should('include', '/login');
  });

  it('Should Login with email and password', () => {
    cy.visit('/login');
    cy.get('#email').type(this.user.email).should('have.value', this.user.email);
    cy.get('#password').type(this.user.password).should('have.value', this.user.password);
    cy.get('button[type="submit"]').contains('Login').click();

    cy.url().should('include', '/calls');
    cy.get('[data-cy="username"]').should('be.visible').contains(`Welcome 123@google.com`);
    cy.get('a').contains('logout').should('be.visible');
  });

  it('Should check Calls page', () => {
    cy.visit('/login');
    cy.get('#email').type(this.user.email).should('have.value', this.user.email);
    cy.get('#password').type(this.user.password).should('have.value', this.user.password);
    cy.get('button[type="submit"]').contains('Login').click();
    cy.url().should('include', '/calls');

    cy.get('[data-cy="calls-list-title"]').should('be.visible');
    cy.get(':nth-child(2) > [data-test="select-trigger-container"]').should('be.visible');
    cy.get('[data-cy=call-list]').should('be.visible');
  });

  it('Should check Call detail page', () => {
    cy.visit('/login');
    cy.get('#email').type(this.user.email).should('have.value', this.user.email);
    cy.get('#password').type(this.user.password).should('have.value', this.user.password);
    cy.get('button[type="submit"]').contains('Login').click();

    cy.get('[data-cy=call-detail]').first().click();
    cy.get('[data-cy=call-details-title]').should('be.visible');
    cy.get('[data-cy=call-details-body]').should('be.visible');
  });

  it('Should logout with remove tokens', () => {
    cy.visit('/login');
    cy.get('#email').type(this.user.email).should('have.value', this.user.email);
    cy.get('#password').type(this.user.password).should('have.value', this.user.password);
    cy.get('button[type="submit"]').contains('Login').click();

    cy.contains('a', 'logout').should('be.visible').click();
    cy.url().should('include', '/login');
    cy.getAllLocalStorage().should('be.empty');
  });
});
