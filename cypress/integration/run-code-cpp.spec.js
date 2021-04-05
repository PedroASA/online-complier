describe('Test compiler behavior: cpp', () => {

    before(() => {
        cy.visit(Cypress.env('client_url'));
        cy.contains('Start Coding!')
        .click();
        cy.get('#nav-lang').click();
        cy.get('#link-cpp').click();
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

    it("Check stdout and stderr: example-code-cpp-comment", () => {
        cy.run_code('example-code-cpp-comment');
    });
    it("Check stdout and stderr: example-code-cpp-stdout", () => {
        cy.run_code('example-code-cpp-stdout');
    });
    it("Check stdout and stderr: example-code-cpp-stdout-stderr", () => {
        cy.run_code('example-code-cpp-stdout-stderr');
    });
    it("Check stdout and stderr: example-code-cpp-stderr", () => {
        cy.run_code('example-code-cpp-stderr');
    });
    it("Check stdout and stderr: example-code-cpp-stdin", () => {
        cy.run_code('example-code-cpp-stdin');
    });
    
})