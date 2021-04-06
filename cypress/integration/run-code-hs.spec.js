describe('Test compiler behavior: haskell', () => {

    before(() => {
        cy.visit(Cypress.env('client_url'));
        cy.contains('Start Coding!')
        .click();
        cy.get('#nav-lang').click();
        cy.get('#link-haskell').click();
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

    it("Check stdout and stderr: example-code-hs-comment", () => {
        cy.run_code('example-code-hs-comment');
    });
    it("Check stdout and stderr: example-code-hs-stdout-stderr", () => {
        cy.run_code('example-code-hs-stdout-stderr');
    });
    it("Check stdout and stderr: example-code-hs-stderr", () => {
        cy.run_code('example-code-hs-stderr');
    });
    it("Check stdout and stderr: example-code-hs-stdin", () => {
        cy.run_code('example-code-hs-stdin');
    });
    // Unstable
    it("Check stdout and stderr: example-code-hs-stdout", () => {
        cy.run_code('example-code-hs-stdout');
    });
    
})