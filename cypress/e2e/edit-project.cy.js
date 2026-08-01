//E2E Test 4 Edit One Project
//Signs in, opens the first project in the list, changes its title,
//and confirms the updated title appears in the list.
const TEST_EMAIL = 'omer@test.com';
const TEST_PASSWORD = 'test123';

describe('Edit Project', () => {
  it('edits an existing project', () => {
    const updatedTitle = `Edited Project ${Date.now()}`;

    // Sign in first editing requires authentication
    cy.visit('/signin');
    cy.get('[data-cy=signin-email]').type(TEST_EMAIL);
    cy.get('[data-cy=signin-password]').type(TEST_PASSWORD);
    cy.get('[data-cy=signin-submit]').click();
    cy.url().should('include', '/admin');

    // Open the projects list and click the first Edit button
    cy.visit('/admin/projects');
    cy.contains('Edit').first().click();

    // Change the title
    cy.get('[data-cy=project-title]').clear().type(updatedTitle);
    cy.get('[data-cy=save-project]').click();

       // Wait until we are back on the list page (not the edit page)
    cy.location('pathname').should('eq', '/admin/projects');

    // The updated title should appear in the refreshed list
    cy.contains(updatedTitle, { timeout: 10000 }).should('exist');
  });
});