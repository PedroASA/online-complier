describe('Test compiler behavior: javascript', () => {

    before(() => {
        cy.visit(Cypress.env('client_url'));
        cy.contains('Start Coding!')
        .click();
    });

    beforeEach(() => {
        // Delete code text.
        cy.get('.CodeMirror')
        .first()
        .then((editor) => {
          editor[0].CodeMirror.setValue('');
        });
        // Delete stdIn text
        cy.get('#stdin').clear({ force: true });
        // Select StdIn as active tab.
        cy.get('[data-rb-event-key="stdin"]')
        .click();
    });

    it("Check stdout and stderr: example-code-js-comment", () => {
        cy.run_code('example-code-js-comment');
    });
    it("Check stdout and stderr: example-code-js-stdout", () => {
        cy.run_code('example-code-js-stdout');
    });
    it("Check stdout and stderr: example-code-js-stdout-stderr", () => {
        cy.run_code('example-code-js-stdout-stderr');
    });
    it("Check stdout and stderr: example-code-js-stderr", () => {
        cy.run_code('example-code-js-stderr');
    });
    it("Check stdout and stderr: example-code-js-stdin", () => {
        cy.run_code('example-code-js-stdin');
    });
    
})