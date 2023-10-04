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
        cy.get('input[id="firstName"]').type('Rai')
        cy.get('input[id="lastName"]').type('Test')
        cy.get('input[id="email"]').type('raitest@email.com')
        cy.get('textarea[id="open-text-area"]').type(longText, {delay:0})
        cy.contains('button', 'Enviar').click()
        cy.get('span[class="success"]').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('input[id="firstName"]').type('Rai')
        cy.get('input[id="lastName"]').type('Test')
        cy.get('input[id="email"]').type('raitest@email,com')
        cy.get('textarea[id="open-text-area"]').type('Test')
        cy.contains('button', 'Enviar').click()
        cy.get('span[class="error"]').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não-numérico', function() {
        cy.get('input[id="phone"]')
          .type('Test')
          .should('have.value', '')
    })
    
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('input[id="firstName"]').type('Rai')
        cy.get('input[id="lastName"]').type('Test')
        cy.get('input[id="email"]').type('raitest@email.com')
        cy.get('textarea[id="open-text-area"]').type('Test')
        cy.get('#phone-checkbox').check()
        cy.contains('button', 'Enviar').click()
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

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.contains('button', 'Enviar').click()
        cy.get('span[class="error"]').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
      cy.fillMandatoryFieldsAndSubmit()

      cy.get('span[class="success"]').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function() {
      cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
      cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function() {
      cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function() {
      cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function() {
      cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio) {
          cy.wrap($radio).check()
          cy.wrap($radio).should('be.checked')
        })
    })

    it('marca ambos checkboxes, depois desmarca o último', function() {
      cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')      
    })

    it('seleciona um arquivo da pasta fixtures', function() {
      cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should($input => {
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function() {
      cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', {action : 'drag-drop'})
        .should($input => {
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it.only('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
      cy.fixture('example.json').as('sampleFile')
      cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('@sampleFile')
        .should($input => {
          expect($input[0].files[0].name).to.equal('example.json')
        })
      })
})