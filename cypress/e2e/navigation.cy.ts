import { SIDEBAR_MENU_ITEMS } from "cypress/support/constants";
import { Navigation } from "cypress/support/interface/Navigation";

describe('Test navigation links on hamburger menu.', () => {
  beforeEach(() => {
    cy.loginViaUi(Cypress.env('username'), Cypress.env('password'));
  });

  it('Assert menu links consistency.', () => {
    cy.fixture('navigation').then(data => {
      const menuLink: Navigation[] = data.menuLink;
      
      cy.openSideMenu();
      
      menuLink.forEach(menuItem => {
        cy.getByDataTest(menuItem.attr).should('be.visible');
        cy.getByDataTest(menuItem.attr)
          .should('have.attr', 'href', menuItem.href)
          .and('have.text', menuItem.text);
      });
    });
  });

  context('Go to shopping cart and them try to come back to products listing.', function () {
    it('Assert if "All Items" menu option is working correctly.', () => {
      cy.getByDataTest('shopping-cart-link').click();
      cy.openSideMenu();
      cy.getByDataTest(SIDEBAR_MENU_ITEMS.ALL_ITEMS).click();
      cy.getByDataTest('inventory-container').should('be.visible');
    });
  });

  it('Assert if the "Logout" menu option is logging out the user and redirecting to login form.', () => {
    cy.openSideMenu();
    cy.getByDataTest(SIDEBAR_MENU_ITEMS.LOGOUT).click();
    
    cy.getByDataTest('username').should('be.visible');
    cy.getCookie('session-username').should('not.exist');
  });

  it('Assert if the "About" menu option is redirecting to the correct website.', () => {
    cy.openSideMenu();
    cy.getByDataTest(SIDEBAR_MENU_ITEMS.ABOUT).click();
    
    cy.origin('https://saucelabs.com/', () => {
      cy.url().should('eq', 'https://saucelabs.com/');
    });
  });

  it('Assert if the "Reset App State" menu option clears the shopping cart and reset the page DOM.', () => {
      // This test will break since the reset app state do not reset the "Add to cart" button state 
      cy.getByDataTest('add-to-cart-sauce-labs-backpack').click();
      cy.openSideMenu();
      cy.getByDataTest(SIDEBAR_MENU_ITEMS.RESET_APP_STATE).click();

      cy.getByDataTest('shopping-cart-badge').should('not.exist');
      cy.getByDataTest('add-to-cart-sauce-labs-backpack').should('be.visible');
  });
});
