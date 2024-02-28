// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from "cypress/vue";
import { h } from "vue";

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}
import "./cypress.scss";
import { createPinia, setActivePinia } from "pinia";

function fillStore(store, storeOptions) {
  storeOptions.forEach((storeOption) => {
    store[storeOption.propName] = storeOption.data;
  });
}

Cypress.Commands.add(
  "mount",
  (originalComponent, options, useStore, storeOptions) => {
    cy.viewport(1920, 1080);
    options = options || {};
    options.global = options.global || {};
    options.global.plugins = options.global.plugins || [];
    setActivePinia(createPinia());
    if (useStore && storeOptions) {
      const store = useStore();
      fillStore(store, storeOptions);
    }
    return mount(h(originalComponent), options);
  }
);
