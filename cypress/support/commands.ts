/// <reference types="cypress" />

Cypress.Commands.add('getBySel', (selector, ...args) => {
    return cy.get(`[data-test=${selector}]`, ...args)
})

Cypress.Commands.add('dnd', (element, target) => { 
    cy.get(`[data-test=${element}]`).first().trigger('dragstart');
    cy.get(`[data-test=${target}]`).first()
    .trigger('dragenter', { force: true })
    .trigger('dragover', { force: true })
    .trigger('drop', { force: true }).wait(50)
    .trigger('dragend', { force: true });
})

Cypress.Commands.add('prepareStore', () => { 
    cy.intercept('GET', '*api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', '*api/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', '*api/orders', { fixture: 'order.json' }).as('createOrder');
    cy.visit('/');
    cy.getBySel('react-modals').as('reactModals');
})

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }