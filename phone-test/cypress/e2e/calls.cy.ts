/// <reference types="cypress" />

describe('Check Calls page', () => {
  before(() => {
    cy.fixture('user').then(user => {
      this.user = user;
    });
  });

  it('Calls page check exist components', () => {
    cy.visit('/login');
    cy.get('#email').type(this.user.email).should('have.value', this.user.email);
    cy.get('#password').type(this.user.password).should('have.value', this.user.password);
    cy.get('button[type="submit"]').contains('Login').click();

    cy.get('p').contains('Loading calls...');
    cy.wait(1000);

    cy.get('.kGewgZ').contains('Calls History');
    cy.get(':nth-child(2) > [data-test="select-value-container"]').contains('All');
    cy.get('[data-cy=call-list]').should('be.visible');
    cy.get('[data-cy="pagination"]').should('be.visible');
  });
});
