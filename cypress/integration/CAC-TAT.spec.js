/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() { 

    beforeEach(() => {
        cy.visit('../../src/index.html')
    })
   

    it('verifica o título da aplicação', function() {
        cy.title().should('eq','Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'Test, test, Test, test, Test, test, Test, test, Test, test, Test, test, Test, test, Test, test, Test, test'
        cy.get('input[id="firstName"]').should('be.visible').type('Rai')
        cy.get('input[id="lastName"]').should('be.visible').type('Test')
        cy.get('input[id="email"]').should('be.visible').type('raitest@email.com')
        cy.get('textarea[id="open-text-area"]').should('be.visible').type(longText, {delay:0})
        cy.get('button[type="submit"]').should('be.visible').click()
        cy.get('span[class="success"]').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('input[id="firstName"]').should('be.visible').type('Rai')
        cy.get('input[id="lastName"]').should('be.visible').type('Test')
        cy.get('input[id="email"]').should('be.visible').type('raitest@email,com')
        cy.get('textarea[id="open-text-area"]').should('be.visible').type('Test')
        cy.get('button[type="submit"]').should('be.visible').click()
        cy.get('span[class="error"]').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não-numérico', function() {
        cy.get('input[id="phone"]')
          .type('Test')
          .should('have.value', '')
    })
    
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('input[id="firstName"]').should('be.visible').type('Rai')
        cy.get('input[id="lastName"]').should('be.visible').type('Test')
        cy.get('input[id="email"]').should('be.visible').type('raitest@email.com')
        cy.get('textarea[id="open-text-area"]').should('be.visible').type('Test')
        cy.get('#phone-checkbox').click()
        cy.get('button[type="submit"]').should('be.visible').click()
        cy.get('span[class="error"]').should('be.visible')         
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('input[id="firstName"]')
          .type('Rai')
          .should('have.value', 'Rai')
          .clear()
          .should('have.value', '')
        cy.get('input[id="lastName"]')
          .type('Test')
          .should('have.value', 'Test')
          .clear()
          .should('have.value', '')
        cy.get('input[id="email"]')
          .type('raitest@email.com')
          .should('have.value', 'raitest@email.com')
          .clear()
          .should('have.value', '')
        cy.get('input[id="phone"]')
          .type('1234567')
          .should('have.value', '1234567')
          .clear()
          .should('have.value', '')     
    })

    it.only('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.get('button[type="submit"]').should('be.visible').click()
        cy.get('span[class="error"]').should('be.visible')
    })

})