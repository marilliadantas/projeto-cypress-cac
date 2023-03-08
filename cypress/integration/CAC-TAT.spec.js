/// <reference types="Cypress" />

beforeEach('', () => {
  cy.visit('./src/index.html');

})

describe('Central de Atendimento ao Cliente TAT', function () {
  it('verifica o título da aplicação', function () {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
})

it('Preenche os campos obrigatórios e envia o formulário', function () {

  const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'

  cy.get('#firstName').type('Marillia')
  cy.get('#lastName').type('Dantas')
  cy.get('#email').type('marillia@teste.com')
  cy.get('#open-text-area').type(longText, { delay: 0 })
  cy.contains('button', 'Enviar').click()

  cy.get('.success').should('be.visible')
})

it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
  cy.get('#firstName').type('Marillia')
  cy.get('#lastName').type('Dantas')
  cy.get('#email').type('marillia@teste,com')
  cy.get('#phone').type('8509090909')
  cy.get('#open-text-area').type('Teste')
  cy.contains('button', 'Enviar').click()

  cy.get('.error').should('be.visible')
})

it('Campo telefone continua vazio quando preenchido com valor não numérico', function () {
  cy.get('#phone')
    .type('abcdefgdfsdfsd')
    .should('have.value', '')

})

it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
  cy.get('#firstName').type('Marillia')
  cy.get('#lastName').type('Dantas')
  cy.get('#email').type('marillia@teste.com')
  cy.get('#phone-checkbox').click()
  cy.get('#open-text-area').type('Teste')
  cy.contains('button', 'Enviar').click()

  cy.get('.error').should('be.visible')
})

it('Preenche e limpa os campos nome, sobrenome, email e telefone', function () {
  cy.get('#firstName')
    .type('Marillia')
    .should('have.value', 'Marillia')
    .clear()
    .should('have.value', '')

  cy.get('#lastName')
    .type('Dantas')
    .should('have.value', 'Dantas')
    .clear()
    .should('have.value', '')

  cy.get('#email')
    .type('marillia@teste.com')
    .should('have.value', 'marillia@teste.com')
    .clear()
    .should('have.value', '')

  cy.get('#phone')
    .type('8509090909')
    .should('have.value', '8509090909')
    .clear()
    .should('have.value', '')
})

it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {

  cy.contains('button', 'Enviar').click()

  cy.get('.error').should('be.visible')
})

it('Envia o formulário com sucesso usando um comando customizado', () => {
  cy.fillMandatoryFieldsAndSubmit()

  cy.get('.success').should('be.visible')
})

it('seleciona um produto (YouTube) por seu texto', () => {
  cy.get('#product')
    .select('YouTube')
    .should('have.value', 'youtube')
})

it('seleciona um produto (Mentoria) por seu valor (value)', () => {
  cy.get('#product')
    .select('mentoria')
    .should('have.value', 'mentoria')
})

it('seleciona um produto (Blog) por seu índice', () => {
  cy.get('#product')
    .select(1)
    .should('have.value', 'blog')
})

it('Marca cada tipo de atendimento "Feedback"', () => {
  cy.get('input[type="radio"][value="feedback"]')
    .check()
    .should('have.value', 'feedback')
})

it('Marca cada tipo de atendimento', () => {
  cy.get('input[type="radio"]')
    .should('have.length', 3)
    .each(function ($radio) {
      cy.wrap($radio).check()
      cy.wrap($radio).should('be.checked')
    })
  it('Marca ambos checkboxes, depois desmarc o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('Exibe mensagem de erro quando o telefone se torna obrigatório, mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Marillia')
    cy.get('#lastName').type('Dantas')
    cy.get('#email').type('marillia@teste.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('Seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.js')
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.js', { action: 'drag-drop' })
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal('example.json')

      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
      .selectFile('@sampleFile')
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('#privacy a')
      .should('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('Talking About Testing').should('be.visible')
  })
})

