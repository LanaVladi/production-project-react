let currentArticleId = '';
describe('Пользователь заходит на страницу статьи', () => {
    beforeEach(() => {
        cy.login();
        cy.createArticle().then((article) => {
            currentArticleId = article.id;
            // cy.log(JSON.stringify(article)); // логирование
            cy.visit(`articles/${article.id}`);
        });
    });
    afterEach(() => {
        cy.removeArticle(currentArticleId);
    });
    it('И видит содержимое статьи, заголовок, количество просмотров и дату создания статьи', () => {
        cy.getByTestId('ArticleDetails.Info').should('exist');
        cy.getByTestId('ArticleDetails.Info.ArticleTitle.Header').should('exist');
        cy.getByTestId('ArticleDetails.Info.ArticleTitle.Header').should('contain.text', 'TESTING ARTICLE');
        cy.getByTestId('ArticleDetails.Info.ArticleViews.Header').should('contain.text', '1022');
        cy.getByTestId('ArticleDetails.Info.ArticleCreatedAt.Header').should('contain.text', '26.02.2022');
    });
    it('И видит список рекомендаций', () => {
        cy.getByTestId('ArticleRecommendationsList').should('exist');
    });
    it('И оставляет комментарий', () => {
        cy.getByTestId('ArticleDetails.Info');
        cy.getByTestId('AddCommentForm').scrollIntoView(); // скроллим до формы создания коммента
        cy.addComment('text'); // вводим коммент
        cy.getByTestId('CommentCard.Content').should('have.length', 1); // проверяем, что коммент только 1 отправился
    });
    it('И ставит оценку', () => {
        cy.getByTestId('ArticleDetails.Info');
        cy.getByTestId('RatingCard').scrollIntoView();
        cy.setRate(4, 'feedback');
        cy.get('[data-selected=true]').should('have.length', 4);
    });

    it('И ставит оценку (пример с стабом на фикстурах)', () => {
        cy.intercept('GET', '**/articles/*', { fixture: 'article-details.json' }); // в FIXTURE_MODE === ‘READ’
        // cy.intercept('GET', '**/articles/*', (req) => req.method + req.headers + req.body); // в FIXTURE_MODE === WRITE
        cy.getByTestId('ArticleDetails.Info');
        cy.getByTestId('RatingCard').scrollIntoView();
        cy.setRate(4, 'feedback');
        cy.get('[data-selected=true]').should('have.length', 4);
    });
});
