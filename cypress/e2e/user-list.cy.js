describe('Condo User System app', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it('displays list of users', () => {
        cy.get('tr').should('have.length', 46)

        cy.wait(1000)

        cy.get('tr').last().should('contains.text', 'Dorthea')
    })

    it('successfully creates new user', () => {
        cy.visit('http://localhost:3000/newUser');

        cy.wait(1000)

        cy.get('[data-testid="first_name"]').type('John');
        cy.get('[data-testid="last_name"]').type('Doe');
        cy.get('[data-testid="email"]').type('johndoe@example.com');
        cy.get('[data-testid="phone"]').type('1234567890');
        cy.get('[data-testid="address"]').type('123 Main St');
        cy.get('[data-testid="gender"]').type('Male');
        cy.get('[data-testid="car"]').type('Ford');
        cy.get('[data-testid="close_person"]').type('1234567890');

        cy.wait(1000)

        cy.get('[data-testid="submit"]').click();

        cy.wait(1000)

        cy.contains('John').should('exist');
    });

    it('successfully updates a user', () => {
        cy.wait(1000)

        cy.get('tr a').last().click();

        cy.get('[data-testid="first_name"]').type('New Name');

        cy.wait(1000)

        cy.get('[data-testid="submit"]').click();

        cy.wait(1000)

        cy.contains('New Name').should('exist');
    });

    it('successfully deletes a user', () => {
        cy.wait(1000)

        cy.get('[data-testid="delete"]').first().click();

        cy.wait(1000)

        cy.get('tr').should('have.length', 45)
    });
})
