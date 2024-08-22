// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
// declare namespace Cypress {
//   interface Chainable<Subject = any> {
//     customCommand(param: any): typeof customCommand;
//   }
// }
//
// function customCommand(param: any): void {
//   console.warn(param);
// }
//
// NOTE: You can use it like so:
// Cypress.Commands.add('customCommand', customCommand);
//
// ***********************************************
// This example commands.js shows you how to
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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
//https://docs.cypress.io/guides/references/best-practices#Selecting-Elements
//https://testing-angular.com/end-to-end-testing/#custom-cypress-commands
declare namespace Cypress {
  interface Chainable {
    /**
     * Get one or more DOM elements by test id.
     *
     * @param id The test id
     * @param options The same options as cy.get
     */
    byTestId<E extends Node = HTMLElement>(
      id: string,
      options?: Partial<
        Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow
      >,
    ): Cypress.Chainable<JQuery<E>>;
  }
}

Cypress.Commands.add(
  'byTestId',
  // Borrow the signature from cy.get
  <E extends Node = HTMLElement>(
    id: string,
    options?: Partial<
      Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow
    >,
  ): Cypress.Chainable<JQuery<E>> => cy.get(`[data-testid="${id}"]`, options),
);

/*
Cypress.Commands.add('signup', () => {
  cy.request({
    method: 'POST',
    form: true,
    url: Cypress.env("apiUrl") + "/api/users/signup",
    headers: {
      'Content-Type': 'application/json'  
    },
    body: { 
      "name": "test from cypress",
      "email": "test123@test.com", 
      "password": "test123"
     }
  })
  .as('signupResponse')
  .then(response => {
    Cypress.env('token', response.body.accessToken); // either this or some global var but remember that this will only work in one test case
    Cypress.env('retoken', response.body.refreshToken); // either this or some global var but remember that this will only work in one test case
    console.log(response)
    return response;
  })
  .its('status')
  .should('eq', 201);

})

Cypress.Commands.add('logout', () => {
  cy.request({
    method: 'DELETE',
    form: true,
    url: Cypress.env("apiUrl") + "/api/users/logout",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + Cypress.env("token")  
    },
    body: { email: 'test123@test.com' }
  })
  .as('logoutResponse')
  .then(response => {
    //Cypress.env('token', ''); // either this or some global var but remember that this will only work in one test case
    //Cypress.env('retoken', ''); // either this or some global var but remember that this will only work in one test case
    return response;
  })
  .its('status')
  .should('eq', 204);

})
*/