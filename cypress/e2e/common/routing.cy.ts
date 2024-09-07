
describe('Роутинг', () => {
  it('Главная страница неавторизованный', () => {
    cy.visit('/')
    cy.selectByTestId('MockPage').should('exist')
  });
  it('Главная страница авторизованный', () => {
    cy.visit('/')
    cy.login('avs-dm@mail.ru','admin')
    cy.visit('/')
    // cy.get('[data-testid=ObjSubcatPage]').should('exist')
    cy.selectByTestId('ObjSubcatPage').should('exist')
  })
})