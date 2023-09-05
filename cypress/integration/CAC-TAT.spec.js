/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', ()=> {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it ('1-Verifica o titulo da aplicação', ()=> {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it ('2-preenche os campos obrigatórios e envia o formulário', ()=> {
        const Textolongo = 'teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste,'
        cy.get('input[name="firstName"]').type('william')
        cy.get('input[name="lastName"]').type('mattos')
        cy.get('#email').type('papito@gmail.com')
        cy.get('input[id="email-checkbox"]').click()
        cy.get('textarea[name="open-text-area"]').type(Textolongo, {delay:0})
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })

    
    it('3-exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', ()=> {
        cy.get('input[name="firstName"]').type('william')
        cy.get('input[name="lastName"]').type('mattos')
        cy.get('#email').type('papitodfgmail.com')
        cy.get('textarea[name="open-text-area"]').type('Otimo curso de Cypress!!')
        cy.get('button[type="submit"]').click()
        
        cy.get('.error').should('be.visible')
    })

    it('4-campo telefone continua vazio quando preenchido com valor nao numerico', ()=> {
        cy.get('#phone').type('abcdefghij').should('have.value', '')
    })
    
    
    it('5-exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', ()=> {
        cy.get('input[name="firstName"]').type('william')
        cy.get('input[name="lastName"]').type('mattos')
        cy.get('#email').type('papitod@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('textarea[name="open-text-area"]').type('Otimo curso de Cypress!!')
        cy.contains('button', 'Enviar').click()
        
        cy.get('.error').should('be.visible')

    })
    it('6-preenche e limpa os campos nome, sobrenome, email e telefone', ()=> {
        cy.get('#firstName')
        .type('william')
        .should('have.value', 'william')
        .clear()
        .should('have.value', '')

    })
    it('7-exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', ()=> {
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('8-envia o formuário com sucesso usando um comando customizado', ()=> {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('9-Selecionar um produto Youtube por seu texto', ()=> {
        cy.get('#product').select('YouTube')
        .should('have.value', 'youtube')
    })

    it('10-seleciona um produto (Blog) por seu índice', function () {
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })

    it('11-marca cada tipo de atendimento"feedback', function () {
        cy.get('input[type="radio"][value="feedback"]').check()
        .should('have.value', 'feedback')
    })

    it('12-marca cada tipo de atendimento', ()=> {
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })
    it('13-marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })
    it('14-seleciona um arquivo da pasta fixtures', function (){
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it('15-seleciona um arquivo simulando um drag-and-drop', function () {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it('16-seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it('17-verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', ()=> {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })
    it('18-acessa a página da política de privacidade removendo o target e então clicando no link', function (){
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

    cy.contains('Talking About Testing').should('be.visible')
    })
    
})
