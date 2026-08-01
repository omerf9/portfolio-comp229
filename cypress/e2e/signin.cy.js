//E2E Test 2 Sign In
//Signs in with an existing account and confirms the admin dashboard loads.
const TEST_EMAIL = 'omer@test.com';
const TEST_PASSWORD = 'test123';

describe('Sign In', () => {
  it('signs in an existing user', () => {
    cy.visit('/signin');

    cy.get('[data-cy=signin-email]').type(TEST_EMAIL);
    cy.get('[data-cy=signin-password]').type(TEST_PASSWORD);
    cy.get('[data-cy=signin-submit]').click();

    // After signing in the user lands on the admin dashboard
    cy.url().should('include', '/admin');

    // The Admin link should now be visible in the navbar
    cy.get('[data-cy=nav-admin]').should('exist');
  });
});