import { LoginField } from "../../support/types/login_field_types";

describe('Test application login scenarios', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('Login with a valid user and check if the products page is shown correctly.', () => {
    cy.get('[data-test="username"]').should('be.visible');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce', { delay: 50 });
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="inventory-list"]').should('be.visible');
  });

  it('Login with invalid usernames to check error messages.', function() {
    cy.fixture('users').then((data) => {
      const users: LoginField[] = data.users; 

      users.forEach(user => {
        cy.get('[data-test="username"]').clear()
        if (user.username) {
          cy.get('[data-test="username"]').type(user.username);
        }

        cy.get('[data-test="password"]').clear()
        if (user.password) {
          cy.get('[data-test="password"]').type(user.password);
        }
        
        cy.get('[data-test="login-button"]').click();

        cy.get('[data-test="error"]').should('be.visible').and('have.text', user.expectedError);
      });
    });
  });
});
