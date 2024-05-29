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
    it('И профиль успешно загружается', () => {
        cy.getByTestId('ProfileCard.firstName').should('not.be.empty'); // Проверяем, что элемент не пустой
        // cy.wait(5000); // Ждем 5 секунд, чтобы данные могли загрузиться
        // изначально страница не успевала загружаться и выдавала ошибку
        // AssertionError Timed out retrying after 4000ms: expected '<input>' to have value 'test', but the text was ''
        cy.getByTestId('ProfileCard.firstName').should('have.value', 'test');
        cy.getByTestId('ProfileCard.lastName').should('have.value', 'user');
        cy.getByTestId('ProfileCard.age').should('have.value', '465');
        cy.getByTestId('ProfileCard.city').should('have.value', 'Moscow');
    });

    it.skip('И редактирует его', () => {
        const newName = 'new';
        const newLastname = 'lastname';
        cy.updateProfile(newName, newLastname);
        cy.getByTestId('ProfileCard.firstName').should('have.value', newName);
        cy.getByTestId('ProfileCard.lastName').should('have.value', newLastname);
    });
});
