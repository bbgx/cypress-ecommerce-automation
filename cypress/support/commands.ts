import {
  LOGIN_PAGE,
} from '../support/constants';

// Selectors cmds
Cypress.Commands.add('getByDataTest', (selector, ...args) => {
  return cy.get(`[data-test=${selector}]`, ...args);
});

Cypress.Commands.add('getByClass', (selector, ...args) => {
  return cy.get(`.${selector}`, ...args);
});

// Behavior cmds
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
  cy.getByClass('app_logo').should('be.visible').and('have.text', LOGIN_PAGE.LOGIN_LOGO_TXT);
});

Cypress.Commands.add('openSideMenu', () => {
  cy.getByClass('bm-burger-button').click();
  cy.getByClass('bm-cross-button').should('be.visible');
});

Cypress.Commands.add('selectSortOption', (option) => {
  const sortOptions: Record<string, string> = {
    hilo: 'Price (high to low)',
    lohi: 'Price (low to high)',
    za: 'Name (Z to A)',
    az: 'Name (A to Z)',
  };

  cy.getByDataTest('product-sort-container').select(option);
  cy.getByDataTest('active-option').should('have.text', sortOptions[option]);
});

Cypress.Commands.add('getAndSortInventoryItems', (dataTest, isPrice, order) => {
  const itemsArr: (string | number)[] = [];

  cy.getByDataTest(dataTest).then((items) => {
    items.each((index, element) => {
      const itemText = isPrice
        ? parseFloat(element.innerText.replace('$', ''))
        : element.innerText;
      itemsArr.push(itemText);
    });

    const sortedArr = itemsArr.sort((a, b) => {
      if (isPrice) {
        return order === 'asc' ? (a as number) - (b as number) : (b as number) - (a as number);
      } else {
        return order === 'asc' ? (a as string).localeCompare(b as string) : (b as string).localeCompare(a as string);
      }
    });

    return sortedArr;
  });
});

Cypress.Commands.add('addItemToCart', () => {
  cy.getByDataTest('add-to-cart').click();
});

Cypress.Commands.add('removeItemFromCart', () => {
  cy.getByDataTest('remove').click();
});

Cypress.Commands.add('fillCheckoutFormAndContinue', (firstName, lastName, postalCode) => {
  cy.getByDataTest('firstName').type(firstName);
  cy.getByDataTest('lastName').type(lastName);
  cy.getByDataTest('postalCode').type(postalCode);

  cy.getByDataTest('continue').click();
});

Cypress.Commands.add('addItemToCart', (dataTest: string) => {
  cy.getByDataTest(dataTest).click();
});

Cypress.Commands.add('getItemPrice', (index: number): Cypress.Chainable<number> => {
  return cy.getByDataTest('inventory-item-price').eq(index).invoke('text').then((price: string) => {
    return parseFloat(price.replace(/[$,]/g, ''));
  });
});