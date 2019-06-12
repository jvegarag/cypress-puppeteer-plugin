

describe('Tarificador', () => {
  it('test', () => {

      const {userLogin, userPassw} = Cypress.env();

      cy.visit('/login')

      cy.get('#mat-input-0').type(userLogin)
          .get('input[type=password]').type(userPassw, { log: false })
          .get('button.login-form-enter').click();

      cy.get('a[href*="/quote/calculator"]').click();
      // // cy.task('click', '.search-toolbar nav a:nth-child(4)');
      // // cy.task('click', '.search-toolbar nav a:nth-child(3)');
      // // cy.task('click', '.search-toolbar nav a:nth-child(2)');
      // // cy.task('click', '.search-toolbar nav a:nth-child(1)');
      cy.get('.search-toolbar nav a:nth-child(3)').nativeClick()
      //
      cy.get('.swiper-slide-active .card-wrapper:last-child img').nativeDragDrop(-500, 0, {steps: 20})
      cy.get('.swiper-slide-active .card-wrapper:first-child img').nativeDragDrop(500, 0, {steps: 20})
      //
      // cy.get('.swiper-slide-active .card-wrapper:last-child img').nativeDragDrop(-500, 0, {steps: 20})
      // cy.get('.swiper-slide-active .card-wrapper:first-child img').nativeDragDrop(500, 0, {steps: 20})
      //
      // cy.get('.swiper-slide-active .card-wrapper:last-child img').nativeDragDrop(-500, 0, {steps: 20})
      // cy.get('.swiper-slide-active .card-wrapper:first-child img').nativeDragDrop(500, 0, {steps: 20})

  })
});