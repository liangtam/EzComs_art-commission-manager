describe('Login tests', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
    });

    it('Login.js - default elements show up', () => {
        cy.get('[data-testid="login-ezcoms-title"]').should("exist")
        .should("have.text", "EzComs");

        cy.get('[data-testid="login-ezcoms-logo"]').should("exist")
        .and("be.visible")
        .should("have.attr", "src");

        cy.get('[data-testid="ezcoms-intro"]').should("exist")
        .and("be.visible")
        .should("have.text", "Art commissions made ez for artists.");

        cy.get('[data-testid="ezcoms-intro-1"]').should("exist")
        .and("be.visible")
        .should("have.text", "Customize and create commission forms");

        cy.get('[data-testid="ezcoms-intro-2"]').should("exist")
        .and("be.visible")
        .should("have.text", "Track your orders");

        cy.get('[data-testid="ezcoms-intro-3"]').should("exist")
        .and("be.visible")
        .should("have.text", "Upload reference photos and progress art to your workspace");

        cy.get('[data-testid="ezcoms-intro-4"]').should("exist")
        .and("be.visible")
        .should("have.text", "Manage your income");

        cy.get('[data-testid="signup-title"]').should("exist")
        .and("be.visible")
        .should("have.text", "Sign Up Now");

        cy.get('[data-testid="signup-intro"]').should("exist")
        .and("be.visible")
        .should("have.text", "Guess what. It's just as Ez.");
    });

    it("Login.js - can login", () => {
        cy.fixture("users.json").then((mockUsers) => {
            const validUser = mockUsers.validUsers[0];
            cy.get('[data-testid="old-user-btn"]').click();
            cy.get('[data-testid="login-email"]').type(validUser.email);
            cy.get('[data-testid="login-password"]').type(validUser.password);
            cy.get('[data-testid="login-btn"]').click();

            cy.url().should("eq", "http://localhost:3000/");

        })
    })

    
});
