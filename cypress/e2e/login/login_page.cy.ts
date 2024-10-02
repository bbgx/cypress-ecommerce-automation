import { LoginField } from "../../support/types/login_field_types";

describe('Test application login scenarios', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('Login with a valid user and check if the products page is shown correctly.', () => {
    cy.submitLoginForm(Cypress.env('username'), Cypress.env('password'));
    
    cy.getByDataTest('inventory-list').should('be.visible');
  });

  it('Login with invalid usernames to check error messages.', function() {
    cy.fixture('users').then((data) => {
      const users: LoginField[] = data.users; 

      users.forEach(user => {
        cy.getByDataTest('username').clear();
        if (user.username) {
          cy.getByDataTest('username').type(user.username);
        }

        cy.getByDataTest('password').clear();
        if (user.password) {
          cy.getByDataTest('password').type(user.password);
        }
        
        cy.getByDataTest('login-button').click();

        cy.get('[data-test="error"]').should('be.visible').and('have.text', user.expectedError);
      });
    });
  });
});
