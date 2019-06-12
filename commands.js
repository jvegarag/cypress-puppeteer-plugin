Cypress.Commands.add('nativeClick', {
    prevSubject: 'true'
}, (subject, arg1, arg2) => {
    if (subject) {
        // wrap the existing subject
        // and do something with it
        cy.task('click', subject.selector)
    } else {
        // TODO do nothing...
    }
});

Cypress.Commands.add('nativeDragDrop', {
    prevSubject: 'true'
}, (subject, x, y, options) => {

    const selector = subject.selector;
    const args = {selector, x, y, options}

    cy.task('dragDrop', args)

});

Cypress.Commands.overwrite('visit', (orig, url, options) => {
    console.log('Override visit', orig);
    orig(url, options)

    // TODO improve with options.onLoad ???

    cy.task('initPage');
});




