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
    cy.getAndSortInventoryItems('inventory-item-name', false, 'asc').then((itemsNameAsc) => {
      cy.selectSortOption('az');
      
      cy.getByDataTest('inventory-item-name').then((sortedItemsName) => {
        const sortedNamesArr: string[] = [];

        sortedItemsName.each((index, element) => {
          sortedNamesArr.push(element.innerText);
        });

        expect(sortedNamesArr).to.deep.equal(itemsNameAsc);
      });
    });
  });

  it('Assert if sorting items descending in the list by name returns the correct list.', () => {
    cy.getAndSortInventoryItems('inventory-item-name', false, 'desc').then((itemsNameDesc) => {
      cy.selectSortOption('za');

      cy.getByDataTest('inventory-item-name').then((sortedItemsName) => {
        const sortedNamesArr: string[] = [];

        sortedItemsName.each((index, element) => {
          sortedNamesArr.push(element.innerText);
        });

        expect(sortedNamesArr).to.deep.equal(itemsNameDesc);
      });
    });
  });

  it('Assert if sorting items ascending in the list by price returns the correct list.', () => {
    cy.getAndSortInventoryItems('inventory-item-price', true, 'asc').then((itemsPricesAsc) => {
      cy.selectSortOption('lohi');
      
      cy.getByDataTest('inventory-item-price').then((sortedItemsPrices) => {
        const sortedPricesArr: number[] = [];

        sortedItemsPrices.each((index, element) => {
          const productPriceText = element.innerText;
          const productPriceValue = parseFloat(productPriceText.replace('$', ''));
          sortedPricesArr.push(productPriceValue);
        });

        expect(sortedPricesArr).to.deep.equal(itemsPricesAsc);
      });
    });
  });

  it('Assert if sorting items descending in the list by price returns the correct list.', () => {
    cy.getAndSortInventoryItems('inventory-item-price', true, 'desc').then((itemsPricesDesc) => {
      cy.selectSortOption('hilo');
      
      cy.getByDataTest('inventory-item-price').then((sortedItemsPrices) => {
        const sortedPricesArr: number[] = [];

        sortedItemsPrices.each((index, element) => {
          const productPriceText = element.innerText;
          const productPriceValue = parseFloat(productPriceText.replace('$', ''));
          sortedPricesArr.push(productPriceValue);
        });

        expect(sortedPricesArr).to.deep.equal(itemsPricesDesc);
      });
    });
  });
});