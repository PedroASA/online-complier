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

Cypress.Commands.add('run_code', fix => {

    return cy.fixture(fix).then(function (testdata) {
        var data = testdata;

        // write code
        cy.get('.CodeMirror')
        .then((editor) => {
          editor[0].CodeMirror.setValue(data.code);
        });

        // write stdIn
        if(data.stdIn) {
            cy.get('#stdin').type(data.stdIn, { force: true });
            cy.get('#stdin').invoke('val')
            .then(val => {
                expect(val).to.equal(data.stdIn);
            });
        }

        // submit code
        cy.get('#submit-btn')
        .click();

        cy.wait(2000);

        // get stdout
        if(data.expected_stdout) {
            cy.get('[data-rb-event-key="stdout"]')
            .click();
            cy.get('#stdout').invoke('val')
            .then(val => {
                expect(val).to.equal(data.expected_stdout);
            });
        }
        else {
            cy.get('[data-rb-event-key="stdout"]').should('have.class', 'disabled');
        }

        // get stderr
        if(data.expected_stderr) {
            cy.get('[data-rb-event-key="stderr"]')
            .click();
            cy.get('#stderr').invoke('val')
            .then(val => {
                expect(val).to.contain(data.expected_stderr);
            });
        }
        else {
            cy.log(data.expected_stderr);
            cy.get('[data-rb-event-key="stderr"]').should('have.class', 'disabled');
        }
    })
});