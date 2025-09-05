///<reference types="cypress"/>
 const perfil = require('../../fixtures/perfil.json')

describe('Funcionalidade: Login', () => {

    beforeEach(() => {
        cy.visit('minha-conta')
        
    });

    afterEach(() => {
        cy.screenshot()
    });

    it('Deve fazer login com sucesso', () => {
        cy.get('#username').type('beto.teste1910@teste.com.br')
        cy.get('#password').type('12345')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, beto.teste1910')
        
    });

    it('Deve inserir uma mensagem de erro quando inserir usuário inválido', () => {
        cy.get('#username').type('Roberto.teste1910@teste.com.br')
        cy.get('#password').type('12345')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error').should('contain' , 'Endereço de e-mail desconhecido.')
        cy.get('.woocommerce-error').should('exist')

        
    });

    it('Deve inserir uma mensagem de texto quando inserir senha inválida', () => {
        cy.get('#username').type('beto.teste1910@teste.com.br')
        cy.get('#password').type('12345@')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error').should('contain' , 'Erro: A senha fornecida para o e-mail beto.teste1910@teste.com.br está incorreta. Perdeu a senha?')
        cy.get('.woocommerce-error').should('exist')

        
    });

    it('Deve fazer login com sucesso - Usando massa de dados', () => {
        cy.get('#username').type(perfil.usuario)
        cy.get('#password').type(perfil.senha)
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, beto.teste1910')
        
    });

    it('Deve fazer login com sucesso - Usando Fixture', () => {
         cy.fixture('perfil').then(dados => {
            cy.get('#username').type(dados.usuario , {log: false})
            cy.get('#password').type(dados.senha , {log: false})
            cy.get('.woocommerce-form > .button').click()
            cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, beto.teste1910')



         })
        
    });

    
    
});