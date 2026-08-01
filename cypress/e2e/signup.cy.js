//E2E Test 1 Sign Up
//Creates a new user account through the signup form.
//A random email is generated each run so the test can be repeated.
describe('Sign Up', () => {
  it('creates a new user account', () => {
    const randomEmail = `testuser${Date.now()}@example.com`;

    cy.visit('/signup');

    cy.get('[data-cy=signup-firstname]').type('Test');
    cy.get('[data-cy=signup-lastname]').type('User');
    cy.get('[data-cy=signup-email]').type(randomEmail);
    cy.get('[data-cy=signup-password]').type('test1234');

    cy.get('[data-cy=signup-submit]').click();

    // After a successful signup the app redirects to the sign in page
    cy.url().should('include', '/signin');
  });
});