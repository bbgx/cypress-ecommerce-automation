import { getByDataTest, loginViaUi, submitLoginForm } from "./commands";

declare global {
  namespace Cypress {
    interface Chainable {
      getByDataTest: typeof getByDataTest;
    }
  }
}

declare global {
  namespace Cypress {
    interface Chainable {
      loginViaUi: typeof loginViaUi;
    }
  }
}

declare global {
  namespace Cypress {
    interface Chainable {
      submitLoginForm: typeof submitLoginForm;
    }
  }
}

declare global {
  namespace Cypress {
    interface Chainable {
      getByClass: typeof getByClass;
    }
  }
}

declare global {
  namespace Cypress {
    interface Chainable {
      openSideMenu: typeof openSideMenu;
    }
  }
}

declare global {
  namespace Cypress {
    interface Chainable {
      selectSortOption(option: 'hilo' | 'lohi' | 'za' | 'az'): Chainable<Element>;
    }
  }
}

declare global {
  namespace Cypress {
    interface Chainable {
      getAndSortInventoryItems(dataTest: string, isPrice: boolean, order: 'asc' | 'desc'): Chainable<string[] | number[]>;
    }
  }
}

declare global {
  namespace Cypress {
    interface Chainable {
      addItemToCart: typeof addItemToCart;
    }
  }
}

declare global {
  namespace Cypress {
    interface Chainable {
      removeItemFromCart: typeof removeItemFromCart;
    }
  }
}
