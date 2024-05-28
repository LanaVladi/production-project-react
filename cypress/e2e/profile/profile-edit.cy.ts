let profileId = '';

describe('Пользователь заходит на страницу профиля', () => {
    beforeEach(() => {
        cy.visit('');
        cy.login().then((data) => {
            profileId = data.id;
            cy.visit(`profile/${data.id}`);
        });
    });
    afterEach(() => {
        cy.resetProfile(profileId);
    });
    // it('И профиль успешно загружается', () => {
    //     cy.getByTestId('ProfileCard.firstName').should('have.value', 'test');
    // });
    // FIX: // правильно не отрабатывает

    it('И редактирует его', () => {
        const newName = 'new';
        const newLastname = 'lastname';
        cy.updateProfile(newName, newLastname);
        cy.getByTestId('ProfileCard.firstName').should('have.value', newName);
        cy.getByTestId('ProfileCard.lastName').should('have.value', newLastname);
    });
});
