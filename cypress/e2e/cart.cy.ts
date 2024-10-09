import { SIDEBAR_MENU_ITEMS } from "cypress/support/constants";

describe('Shopping Cart Functionality', () => {
  beforeEach(() => {
    cy.loginViaUi(Cypress.env('username'), Cypress.env('password'));
  });

  it('should allow a user to add a single item to the shopping cart', () => {
    cy.addItemToCart('add-to-cart-sauce-labs-backpack');
    cy.getByDataTest('shopping-cart-link').click();
    cy.assertCartItemsCount(1);
  });

  it('should allow a user to add multiple items to the shopping cart', () => {
    cy.addAllItemsToCart();
    cy.getByDataTest('shopping-cart-link').click();
    cy.assertCartItemsCount(6);
  });

  it('should allow a user to remove items from the shopping cart', () => {
    cy.addAllItemsToCart();
    cy.getByDataTest('shopping-cart-link').click();

    cy.getByClass('cart_button').each((item, index, items) => {
      cy.wrap(item).click();
      const expectedCount = items.length - (index + 1);
      
      if (expectedCount > 0) {
        cy.assertCartItemsCount(expectedCount);
      }
    });

    cy.getByDataTest('inventory-item').should('not.exist');
    cy.getByDataTest('shopping-cart-badge').should('not.exist');
  });

  it.skip('should reset app state and remove items from the shopping cart', () => {
    // It's not working since it doesn't remove the items from the shopping cart if the shopping cart is open
    cy.addAllItemsToCart();
    cy.getByDataTest('shopping-cart-link').click();

    cy.openSideMenu();
    cy.getByDataTest(SIDEBAR_MENU_ITEMS.RESET_APP_STATE).click();

    cy.getByDataTest('inventory-item').should('not.exist');
    cy.getByDataTest('shopping-cart-badge').should('not.exist');
  });
});