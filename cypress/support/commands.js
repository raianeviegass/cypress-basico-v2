Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
        cy.get('input[id="firstName"]').type('Rai')
        cy.get('input[id="lastName"]').type('Test')
        cy.get('input[id="email"]').type('raitest@email.com')
        cy.get('textarea[id="open-text-area"]').type('Test')
        cy.contains('button', 'Enviar').click()

})