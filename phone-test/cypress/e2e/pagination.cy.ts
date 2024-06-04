/// <reference types="cypress" />

describe('Check Pagination', () => {
  before(() => {
    cy.fixture('user').then(user => {
      this.user = user;
    });
  });

  it('Pagination, check change page', () => {
    cy.visit('/login');
    cy.get('#email').type(this.user.email).should('have.value', this.user.email);
    cy.get('#password').type(this.user.password).should('have.value', this.user.password);
    cy.get('button[type="submit"]').contains('Login').click();
    cy.wait(1000);

    cy.get('.bbDLwN > [data-test="select-trigger-container"]').should('be.visible');

    cy.get(
      '.bbDLwN > [data-test="select-trigger-container"] > [data-test="select-value-container"]'
    ).contains('25');

    cy.get('[data-test="pagination-page-1"]').contains('1');
    cy.get('[data-test="pagination-page-2"]').contains('2');
    cy.get('[data-test="pagination-page-3"]').contains('3');

    //change current page
    cy.get('[data-test="pagination-page-2"]').click();
    cy.url().should('include', 'offset=2');
    cy.get('[data-test="pagination-page-3"]').click();
    cy.url().should('include', 'offset=3');

    //change page size
    cy.get('.bbDLwN > [data-test="select-trigger-container"]').click();
    cy.get('[data-test="select-option-item-50"]').click();
    cy.url().should('include', 'limit=50');
    cy.get('.bbDLwN > [data-test="select-trigger-container"]').click();
    cy.get('[data-test="select-option-item-100"]').click();
    cy.url().should('include', 'limit=100');
  });
});
