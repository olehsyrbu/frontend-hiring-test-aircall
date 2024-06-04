/// <reference types="cypress" />

describe('Check Filter', () => {
  before(() => {
    cy.fixture('user').then(user => {
      this.user = user;
    });
  });
  it('should change the value of the Filter select', () => {
    cy.visit('/login');
    cy.get('#email').type(this.user.email).should('have.value', this.user.email);
    cy.get('#password').type(this.user.password).should('have.value', this.user.password);
    cy.get('button[type="submit"]').contains('Login').click();
    cy.wait(1000);

    // Select the Filter component and change its value
    cy.get('[data-test="select-trigger-container"]').contains('All').click();
    cy.url().should('eq', 'http://localhost:3000/calls');

    cy.get('[data-test="select-option-item-inbound"]').click();
    cy.url().should('include', 'filter=inbound');
    cy.get(':nth-child(2) > [data-test="select-value-container"]').contains('Inbound').click();

    cy.get('[data-test="select-option-item-missed"]').click();
    cy.url().should('include', 'filter=missed');
    cy.get(':nth-child(2) > [data-test="select-value-container"]').contains('Missed').click();

    cy.get('[data-test="select-option-item-answered"]').click();
    cy.url().should('include', 'filter=answered');
    cy.get(':nth-child(2) > [data-test="select-value-container"]').contains('Answered').click();

    cy.get('[data-test="select-option-item-voicemail"]').click();
    cy.url().should('include', 'filter=voicemail');
    cy.get(':nth-child(2) > [data-test="select-value-container"]').contains('Voicemail').click();
  });
});
