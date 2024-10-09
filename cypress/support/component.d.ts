import { 
  getByDataTest, 
  loginViaUi, 
  submitLoginForm, 
  getByClass, 
  openSideMenu,
  addItemToCartFromItemPage,
  addItemToCart, 
  removeItemFromCart, 
  fillCheckoutFormAndContinue 
} from "./commands";

declare global {
  namespace Cypress {
    interface Chainable {
      getByDataTest: typeof getByDataTest;
      loginViaUi: typeof loginViaUi;
      submitLoginForm: typeof submitLoginForm;
      getByClass: typeof getByClass;
      openSideMenu: typeof openSideMenu;
      selectSortOption(option: 'hilo' | 'lohi' | 'za' | 'az'): Chainable<Element>;
      getAndSortInventoryItems(dataTest: string, isPrice: boolean, order: 'asc' | 'desc'): Chainable<string[] | number[]>;
      addItemToCartFromItemPage: typeof addItemToCartFromItemPage;
      addItemToCart: typeof addItemToCart;
      removeItemFromCart: typeof removeItemFromCart;
      fillCheckoutFormAndContinue: typeof fillCheckoutFormAndContinue;
      addItemToCart(dataTest: string): Chainable<void>;
      getItemPrice(index: number): Chainable<number>;
      addAllItemsToCart(): Chainable<void>;
      assertCartItemsCount(expectedCount: number): Chainable<void>;
    }
  }
}
