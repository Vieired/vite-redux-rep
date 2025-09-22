describe('testa a página de login', () => {
  it('Quando clicar em Entrar, deve ir para a página principal', () => {
    cy.visit("/");

    cy.get('#email').type("logominus@gmail.com");
    cy.get('#password').type("logominus@gmail.com");
    cy.contains("Entrar").click();
    cy.contains("BG Limpo").click();
  })
})