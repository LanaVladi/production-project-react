describe('Пользователь заходит на страницу со списком статей', () => {
    beforeEach(() => {
        cy.login().then((data) => {
            cy.visit('articles');
        });
    });
    it('и статьи успешно подгружаются', () => {
        cy.getByTestId('ArticleList').should('exist');
        cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3);
    });

    it('На стабах (фикстурах)', () => {
        cy.intercept('GET', '**/articles?*', { fixture: 'articles.json' });
        cy.getByTestId('ArticleList').should('exist');
        cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3);
    });

    it.skip('Пример заскипанного теста', () => {
        cy.getByTestId('ArticleList').should('exist');
        cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3);
        cy.get('asfasf').should('exist');
    });

    it('и совершает поиск по статьям', () => {
        const searchRequest = 'kotlin';
        cy.getByTestId('ArticlesPageFilters.SearchInput').should('exist');
        cy.getArticlesBySearch(searchRequest);
    });

    it('и сортирует статьи по просмотрам и по убыванию ', () => {
        const sort = 'views';
        const order = 'desc';
        cy.getByTestId('ArticlesPageFilters').should('exist');
        cy.getByTestId('ArticleSortSelector').should('exist');

        cy.getByTestId('ArticleSortSelector.SortByParams').should('exist');
        cy.getByTestId('ArticleSortSelector.SortByAscDesc').should('exist');

        cy.getArticlesBySortOrder(sort, order);

        // cy.getByTestId('ArticlesPageFilters').should('exist');
        // cy.getByTestId('ArticlesPageFilters.ArticleSortViewSelector').should('exist');
        // // cy.getByTestId('ArticlesPageFilters.ArticleSortViewSelector').first().should('exist'); // ArticleSortSelector

        // // cy.getByTestId('ArticlesPageFilters.ArticleSortViewSelector').first().first().should('exist'); // SortByParams
        // // cy.getByTestId('ArticlesPageFilters.ArticleSortViewSelector').first().last().should('exist'); // SortByAscDesc

        // // ЗАПРОС СОСТАВЛЯЕТ ПРАВИЛЬНО, НО СОРТИРОВКИ ВИДИМОЙ НЕ ПРОИСХОДИТ И ЭЛЕМЕНТЫ ДОЧЕРНИЕ НЕ ПОКАЗЫВАЕТ ОТДЕЛЬНО
        // cy.getArticlesBySortOrder(sort, order);
    });

    it('и открывает статьи в виде списка по клику ', () => {
        cy.getByTestId('ArticlesPageFilters').should('exist');
        cy.getByTestId('ArticlesPageFilters.ArticleViewSelector').should('exist');

        cy.getByTestId('ArticleViewSelector.SelectView').should('exist');
        cy.getByTestId('ArticleViewSelector.SelectView').first().should('exist'); // кликаем по первому элементу родителя - иконке с изображением GRID
        cy.getByTestId('ArticleViewSelector.SelectView').last().should('exist');

        cy.getByTestId('ArticleViewSelector.SelectView').last().click(); // кликаем по иконке с изображением LIST
    });
});
