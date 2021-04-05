var modes;

describe('Test Editor renders the right initial message and toggles submission button', () => {
    // Render Editor and GET modes.
    before(() => {
        cy.visit(Cypress.env('client_url'));
        cy.contains('Start Coding!')
        .click();
        const api_url = `${Cypress.env('api_url')}code`;
        cy.request({
            method: 'GET',
            url: api_url,
            headers: {
                'accept': 'application/json'
            }
        }).its('body').then(res => modes = res);
    })
    // Make languages select option visible.
    beforeEach(() => {
        cy.get('#nav-lang').click();
    });
        
    it('JavaScript', () => {
        cy.get('#nav-lang').click();
        cy.contains(modes['javascript'][0]);
        cy.get('#submit-btn').should('not.be.disabled');
    });

    it('CPP', () => {
        cy.get('#link-cpp').click();
        cy.contains(modes['cpp'][0]);
        cy.get('#submit-btn').should('not.be.disabled');
    });

    it('Haskell', () => {
        cy.get('#link-haskell').click();
        cy.contains(modes['haskell'][0]);
        cy.get('#submit-btn').should('not.be.disabled');
    });

    it('JSON', () => {
        cy.get('#link-json').click();
        cy.contains(modes['json'][0]);
        cy.get('#submit-btn').should('be.disabled');
    });

    it('HTML', () => {
        cy.get('#link-html').click();
        cy.contains(modes['html'][0]);
        cy.get('#submit-btn').should('be.disabled');
    });

    it('CSS', () => {
        cy.get('#link-css').click();
        cy.contains(modes['css'][0]);
        cy.get('#submit-btn').should('be.disabled');
    });

    it('Markdown', () => {
        cy.get('#link-markdown').click();
        cy.contains(modes['markdown'][0]);
        cy.get('#submit-btn').should('be.disabled');
    });
})

