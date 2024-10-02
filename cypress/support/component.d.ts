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
      openSideMenu: typeof getByClass;
    }
  }
}