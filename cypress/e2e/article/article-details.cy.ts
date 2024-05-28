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
    it('И видит содержимое статьи и заголовок', () => {
        cy.getByTestId('ArticleDetails.Info').should('exist');
        cy.getByTestId('ArticleDetails.Info.ArticleTitle.Header').should('exist');
        // cy.getByTestId('ArticleDetails.Info.ArticleTitle.Header').should('have.value', 'TESTING ARTICLE');
        // cy.getByTestId('ArticleDetails.Info.ArticleTitle.Paragraph').should('have.value', 'БиологиЯ');

        // можно проверить заголовок, количество просмотров, дату создания
    });
    it('И видит список рекоммендаций', () => {
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
});
