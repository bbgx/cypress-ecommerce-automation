import {
  LOGIN_PAGE,
} from '../support/constants';

Cypress.Commands.add('getByDataTest', (selector, ...args) => {
  return cy.get(`[data-test=${selector}]`, ...args);
});

Cypress.Commands.add('submitLoginForm', (username, password) => {
  cy.getByDataTest('username').should('be.visible');
  cy.getByDataTest('username').type(username);
  cy.getByDataTest('password').type(password);
  cy.getByDataTest('login-button').click();
});

Cypress.Commands.add('loginViaUi', (username, password) => {
  cy.visit('/');
  cy.getByDataTest('username').type(username);
  cy.getByDataTest('password').type(password);
  cy.getByDataTest('login-button').click();
  cy.get('.login-logo').should('be.visible').and('have.text', LOGIN_PAGE.LOGIN_LOGO_TXT);
});