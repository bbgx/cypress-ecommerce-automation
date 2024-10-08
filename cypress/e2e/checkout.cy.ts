import { REGEX } from "cypress/support/constants";

describe('Assert if the checkout feature is working as it should.', () => {
  beforeEach(() => {
    cy.loginViaUi(Cypress.env('username'), Cypress.env('password'));
  });

  it('Checkout a single item and check if the pricing matches.', () => {
    cy.addItemToCart('add-to-cart-sauce-labs-backpack');

    cy.getItemPrice(0).then((backpackPrice) => {
      cy.getByDataTest('shopping-cart-link').click();
      cy.getByDataTest('checkout').click();

      cy.fillCheckoutFormAndContinue('Cypress', 'User', '100110');

      cy.getByDataTest('subtotal-label')
        .invoke('text')
        .then((subtotal: string) => {
          const subtotalFloat = parseFloat(subtotal.replace(REGEX.PRICE, '$1'));
          expect(subtotalFloat).to.equal(backpackPrice);
        });
    });
  });


  it('Checkout two items and check if the total sum of the price matches.', () => {
    cy.addItemToCart('add-to-cart-sauce-labs-bike-light');
    cy.addItemToCart('add-to-cart-sauce-labs-backpack');

    const firstProductPricePromise = cy.getItemPrice(0);
    const secondProductPricePromise = cy.getItemPrice(1);

    Promise.all([firstProductPricePromise, secondProductPricePromise]).then(([firstProductPriceFloat, secondProductPriceFloat]) => {
      const totalPrice = firstProductPriceFloat + secondProductPriceFloat;

      cy.getByDataTest('shopping-cart-link').click();
      cy.getByDataTest('checkout').click();

      cy.fillCheckoutFormAndContinue('Cypress', 'User', '100110');

      cy.getByDataTest('subtotal-label')
        .invoke('text')
        .then((subtotal: string) => {
          const subtotalFloat = parseFloat(subtotal.replace(REGEX.PRICE, '$1'));
          expect(subtotalFloat).to.equal(totalPrice);
        });
    });
  });

  it('Checkout two items and verify total matches subtotal plus tax.', () => {
    cy.addItemToCart('add-to-cart-sauce-labs-bike-light');
    cy.addItemToCart('add-to-cart-sauce-labs-backpack');

    cy.getByDataTest('shopping-cart-link').click();
    cy.getByDataTest('checkout').click();

    cy.fillCheckoutFormAndContinue('Cypress', 'User', '100110');

    cy.getByDataTest('subtotal-label')
      .invoke('text')
      .then((subtotalText: string) => {
        const subtotalFloat = parseFloat(subtotalText.replace(REGEX.PRICE, '$1'));

        cy.get('[data-test="tax-label"]')
          .invoke('text')
          .then((taxText: string) => {
            const taxFloat = parseFloat(taxText.replace(REGEX.PRICE, '$1'));

            const expectedTotal = subtotalFloat + taxFloat;

            cy.get('[data-test="total-label"]')
              .invoke('text')
              .then((totalText: string) => {
                const totalFloat = parseFloat(totalText.replace(REGEX.PRICE, '$1'));

                expect(totalFloat).to.equal(expectedTotal);
              });
          });
      });
  });

  it('Assert if the user can complete the checkout process.', () => {
    cy.addItemToCart('add-to-cart-sauce-labs-bike-light');
    cy.addItemToCart('add-to-cart-sauce-labs-backpack');

    cy.getByDataTest('shopping-cart-link').click();
    cy.getByDataTest('checkout').click();

    cy.fillCheckoutFormAndContinue('Cypress', 'User', '100110');

    cy.getByDataTest('finish').click();

    cy.getByDataTest('complete-header')
      .should('exist')
      .and('have.text', 'Thank you for your order!');
    cy.getByDataTest('complete-text')
      .should('exist')
      .and('have.text', 'Your order has been dispatched, and will arrive just as fast as the pony can get there!');
    cy.getByDataTest('shopping-cart-badge')
      .should('not.exist');
  });
});