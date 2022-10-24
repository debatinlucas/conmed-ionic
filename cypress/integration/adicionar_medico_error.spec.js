/// <reference types="cypress" />
describe('Adicionar Médico', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8100/medico/adicionar')
    })

    it ('verificar título da página', () => {
        cy.contains('Adicionar Médico')
        expect(2).to.equal(2)
    })

    it ('preecher formulário com erro', () => {
        cy.get('[data-cy=nome]').type('Lucas')
        cy.get('[data-cy=crm]').type('12345')
        cy.get('[data-cy=logradouro]').type('Rua teste 1')
        cy.get('[data-cy=numero]').type('123')
        cy.get('[data-cy=cidade]').type('Brusque')
        cy.get('[data-cy=uf]').click()
        cy.contains('.alert-radio-label', 'Santa Catarina').click()
        cy.contains('OK').click()
        cy.wait(500)
        cy.get('[data-cy=celular]').type('(47) 9599-599')
        cy.get('[data-cy=fixo]').type('(47) 9599-599')
        cy.get('[data-cy=btnadd]').click()
    })
})
