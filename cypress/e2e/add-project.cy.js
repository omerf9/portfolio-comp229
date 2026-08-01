//E2E Test 3 Add One Project
//Signs in, then creates a new project through the admin form
//and confirms it appears in the projects list.
const TEST_EMAIL = 'omer@test.com';
const TEST_PASSWORD = 'test123';

describe('Add Project', () => {
  it('adds a new project', () => {
    const projectTitle = `Cypress Test Project ${Date.now()}`;

    // Sign in first adding a project requires authentication
    cy.visit('/signin');
    cy.get('[data-cy=signin-email]').type(TEST_EMAIL);
    cy.get('[data-cy=signin-password]').type(TEST_PASSWORD);
    cy.get('[data-cy=signin-submit]').click();
    cy.url().should('include', '/admin');

    // Go to the projects management page
    cy.visit('/admin/projects');
    cy.get('[data-cy=add-project]').click();

    // Fill in the new project form
    cy.get('[data-cy=project-title]').type(projectTitle);
    cy.get('[data-cy=project-completion]').type('2026-01-15');
    cy.get('[data-cy=project-description]').type('A project created by an automated Cypress test.');

    cy.get('[data-cy=save-project]').click();

    // Should return to the list and show the new project
    cy.url().should('include', '/admin/projects');
    cy.contains(projectTitle).should('exist');
  });
});