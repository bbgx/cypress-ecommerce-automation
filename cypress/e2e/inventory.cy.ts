describe('Assert if inventory listing is working correctly.', () => {
  beforeEach(() => {
    cy.loginViaUi(Cypress.env('username'), Cypress.env('password'));
  });

  it('Assert if the user sees 6 items in the listing.', () => {
    cy.getByDataTest('inventory-item').should('have.length', 6);
  });

  it('Assert if "Add to cart" button is working correctly.', () => {
    cy.getByClass('btn_inventory').then((inventoryItems: string) => {
      const totalItems = inventoryItems.length;

      cy.wrap(inventoryItems).each((item, index) => {
        cy.wrap(item).click();
        cy.getByDataTest('shopping-cart-badge')
          .should('have.text', (index + 1).toString());
      });

      cy.getByDataTest('shopping-cart-badge')
        .should('have.text', totalItems.toString());
    });
  });

  it('Assert if "Remove" button removes the item from the cart counter when clicked.', () => {
    cy.getByClass('btn_inventory').then((inventoryItems: string) => {
      cy.wrap(inventoryItems).each((item) => {
        cy.wrap(item).click();
      });
    });

    cy.getByClass('btn_inventory').then((inventoryItems: string) => {
      const totalItems = inventoryItems.length;

      cy.wrap(inventoryItems).each((item, index) => {
        cy.wrap(item).click();

        const expectedItemsInCart = totalItems - (index + 1);

        if (expectedItemsInCart > 0) {
          cy.getByDataTest('shopping-cart-badge')
            .should('have.text', expectedItemsInCart.toString());
        }
      });

      cy.getByDataTest('shopping-cart-badge')
        .should('not.exist');
    });
  });

  it('Assert if sorting items ascending in the list by name returns the correct list.', () => {
    cy.getByDataTest('inventory-item-name').then((itemsName) => {
      const productsNamesArr: string[] = [];

      itemsName.each((index, element) => {
        productsNamesArr.push(element.innerText);
      });

      const productsNamesAscending = productsNamesArr.sort();

      cy.getByDataTest('product-sort-container').select('az');
      cy.getByDataTest('active-option').should('have.text', 'Name (A to Z)');

      cy.getByDataTest('inventory-item-name').then((sortedItemsName) => {
        const sortedNamesArr: string[] = [];

        sortedItemsName.each((index, element) => {
          sortedNamesArr.push(element.innerText);
        });

        expect(sortedNamesArr).to.deep.equal(productsNamesAscending);
      });
    });
  });

  it('Assert if sorting items descending in the list by name returns the correct list.', () => {
    cy.getByDataTest('inventory-item-name').then((itemsName) => {
      const productsNamesArr: string[] = [];

      itemsName.each((index, element) => {
        productsNamesArr.push(element.innerText);
      });

      const productsNamesAscending = productsNamesArr.reverse();

      cy.getByDataTest('product-sort-container').select('za');
      cy.getByDataTest('active-option').should('have.text', 'Name (Z to A)');

      cy.getByDataTest('inventory-item-name').then((sortedItemsName) => {
        const sortedNamesArr: string[] = [];

        sortedItemsName.each((index, element) => {
          sortedNamesArr.push(element.innerText);
        });

        expect(sortedNamesArr).to.deep.equal(productsNamesAscending);
      });
    });
  });

  it('Assert if sorting items ascending in the list by price returns the correct list.', () => {
    cy.getByDataTest('inventory-item-price').then((itemsPrices) => {
      const productsPricesArr: number[] = [];

      itemsPrices.each((index, element) => {
        const productPriceText = element.innerText;
        const productPriceValue = parseFloat(productPriceText.replace('$', ''));
        productsPricesArr.push(productPriceValue);
      });

      const productsPricesAscending = productsPricesArr.sort((a, b) => (a - b));
      cy.getByDataTest('product-sort-container').select('lohi');
      cy.getByDataTest('active-option').should('have.text', 'Price (low to high)');

      cy.getByDataTest('inventory-item-price').then((sortedItemsPrices) => {
        const sortedPricesArr: number[] = [];

        sortedItemsPrices.each((index, element) => {
          const productPriceText = element.innerText;
          const productPriceValue = parseFloat(productPriceText.replace('$', ''));
          sortedPricesArr.push(productPriceValue);
        });

        expect(sortedPricesArr).to.deep.equal(productsPricesAscending);
      });
    });
  });

  it('Assert if sorting items descending in the list by price returns the correct list.', () => {
    cy.getByDataTest('inventory-item-price').then((itemsPrices) => {
      const productsPricesArr: number[] = [];

      itemsPrices.each((index, element) => {
        const productPriceText = element.innerText;
        const productPriceValue = parseFloat(productPriceText.replace('$', ''));
        productsPricesArr.push(productPriceValue);
      });

      const productsPricesAscending = productsPricesArr.sort((a, b) => (b - a));
      cy.getByDataTest('product-sort-container').select('hilo');
      cy.getByDataTest('active-option').should('have.text', 'Price (high to low)');

      cy.getByDataTest('inventory-item-price').then((sortedItemsPrices) => {
        const sortedPricesArr: number[] = [];

        sortedItemsPrices.each((index, element) => {
          const productPriceText = element.innerText;
          const productPriceValue = parseFloat(productPriceText.replace('$', ''));
          sortedPricesArr.push(productPriceValue);
        });

        expect(sortedPricesArr).to.deep.equal(productsPricesAscending);
      });
    });
  });
});