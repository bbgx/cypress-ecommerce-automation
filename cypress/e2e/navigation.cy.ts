import { Navigation } from "cypress/support/interface/Navigation";

describe('Test navigation links on hamburger menu.', () => {
  beforeEach(() => {
    cy.loginViaUi(Cypress.env('username'), Cypress.env('password'));
  });

  it('Assert menu links consistency.', () => {
    cy.fixture('navigation').then(data => {
      const menuLink: Navigation[] = data.menuLink;
      
      cy.getByClass('bm-burger-button').click();
      
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
      cy.getByClass('bm-burger-button').click();
      cy.getByDataTest('inventory-sidebar-link').click();
      cy.getByDataTest('inventory-container').should('be.visible');
    });
  });

  it('Assert if the "Logout" menu option is logging out the user and redirecting to login form.', () => {
    cy.getByClass('bm-burger-button').click();
    cy.getByDataTest('logout-sidebar-link').click();
    
    cy.getByDataTest('username').should('be.visible');
    cy.getCookie('session-username').should('not.exist');
  });

  it('Assert if the "About" menu option is redirecting to the correct website.', () => {
    cy.getByClass('bm-burger-button').click();
    cy.getByDataTest('about-sidebar-link').click();
    
    cy.origin('https://saucelabs.com/', () => {
      cy.url().should('eq', 'https://saucelabs.com/');
    });
  });

  it('Assert if the "Reset App State" menu option clears the shopping cart and reset the page DOM.', () => {
      // This test will break since the reset app state do not reset the "Add to cart" button state 
      // (I think it should reset, need to open a BUG card on the board)
      cy.getByDataTest('add-to-cart-sauce-labs-backpack').click();
      cy.getByClass('bm-burger-button').click();
      cy.getByDataTest('reset-sidebar-link').click();

      cy.getByDataTest('shopping-cart-badge').should('not.exist');
      cy.getByDataTest('add-to-cart-sauce-labs-backpack').should('be.visible');
  });
});
