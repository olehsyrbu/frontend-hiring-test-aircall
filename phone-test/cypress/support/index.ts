import { mount } from 'cypress/react';

Cypress.Commands.add('login', (user: { email: string; password: string }) => {
  cy.visit('/login');
  cy.get('#email').type(user.email).should('have.value', user.email);
  cy.get('#password').type(user.password).should('have.value', user.password);
  cy.get('button[type="submit"]').contains('Login').click();
  return cy.wait(1000);
});

// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      login(user: any): Chainable<any>;
    }
  }
}
