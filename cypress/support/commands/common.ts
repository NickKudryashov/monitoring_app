import { testIdToCypressFormat } from "../../helpers/testIdToCypressFormat"

Cypress.Commands.add('login', (email, password) => {
    cy.request<{'access':string,'refresh':string}>('POST','http://localhost:8000/api/v1/auth/',{email,password})
    .then((result)=>{
        window.localStorage.setItem('access_token',result.body.access)
        window.localStorage.setItem('refresh_token',result.body.refresh)
    })
})


export const selectByTestId = (testid:string)=> cy.get(testIdToCypressFormat(testid))



declare global {
    namespace Cypress {
      interface Chainable {
        login(email: string, password: string): Chainable<void>
        selectByTestId(testid: string): ReturnType<typeof cy.get>
      //   drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      //   dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      //   visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
      }
    }
  }
export {}