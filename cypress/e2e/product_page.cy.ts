import { SIDEBAR_MENU_ITEMS } from "cypress/support/constants";

describe('Test product page functionalities and information.', () => {

  beforeEach(() => {
    cy.loginViaUi(Cypress.env('username'), Cypress.env('password'));
  });

  it('Assert if product name matches with the name in inventory list.', () => {
    cy.getByDataTest('inventory-item-name').first().invoke('text').then((productName: string) => {
      cy.getByDataTest('inventory-item-name').first().click();

      cy.getByDataTest('inventory-item-name').should('have.text', productName);
    });
  });

  it('Assert if product description matches with the name in inventory list.', () => {
    cy.getByDataTest('inventory-item-desc').first().invoke('text').then((productName: string) => {
      cy.getByDataTest('inventory-item-name').first().click();

      cy.getByDataTest('inventory-item-desc').should('have.text', productName);
    });
  });

  it('Assert if product price matches with the price in inventory list.', () => {
    cy.getByDataTest('inventory-item-price').first().invoke('text').then((productName: string) => {
      cy.getByDataTest('inventory-item-name').first().click();

      cy.getByDataTest('inventory-item-price').should('have.text', productName);
    });
  });

  it('Assert if "Add to cart" button inside product page is working correctly.', () => {
    cy.getByDataTest('inventory-item-name').first().click();

    cy.addItemToCart('add-to-cart');

    cy.getByDataTest('shopping-cart-badge')
      .should('have.text', '1');
  });

  it('Assert if "Remove" button inside product page removes the added item from shopping cart.', () => {
    cy.getByDataTest('inventory-item-name').first().click();

    cy.addItemToCart('add-to-cart');

    cy.removeItemFromCart();

    cy.getByDataTest('shopping-cart-badge')
      .should('not.exist');
  });

  it.skip('Assert if "Reset App State" function resets the app state inside the product page.', () => {
    // This test will break since the reset app state do not reset the "Add to cart" button state 
    cy.getByDataTest('inventory-item-name').first().click();

    cy.addItemToCart('add-to-cart');

    cy.openSideMenu();
    cy.getByDataTest(SIDEBAR_MENU_ITEMS.RESET_APP_STATE).click();

    cy.getByDataTest('shopping-cart-badge').should('not.exist');
    cy.getByDataTest('add-to-cart').should('be.visible');
  });
});