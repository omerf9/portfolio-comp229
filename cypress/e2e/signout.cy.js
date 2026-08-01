//E2E Test 5 — Sign Out
//Signs in, then signs out and confirms the admin area is no longer accessible.
const TEST_EMAIL = 'omer@test.com';
const TEST_PASSWORD = 'test123';

describe('Sign Out', () => {
  it('signs the user out and blocks the admin area', () => {
    // Sign in first
    cy.visit('/signin');
    cy.get('[data-cy=signin-email]').type(TEST_EMAIL);
    cy.get('[data-cy=signin-password]').type(TEST_PASSWORD);
    cy.get('[data-cy=signin-submit]').click();
    cy.url().should('include', '/admin');

    // Sign out from the navbar
    cy.get('[data-cy=signout]').click();

    // Should be sent to the sign in page
    cy.url().should('include', '/signin');

    // The Admin link should no longer be in the navbar
    cy.get('[data-cy=nav-admin]').should('not.exist');

    // Trying to visit the admin area should redirect back to sign in
    cy.visit('/admin');
    cy.url().should('include', '/signin');
  });
});