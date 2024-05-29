export const getArticlesBySortOrder = (sort: string = 'createdAt', order: string = 'asc') => {
    cy.getByTestId('ArticlesPageFilters.ArticleSortSelector').click();
    cy.getByTestId('ArticleSortSelector.SortByParams').find('select').select(sort);
    cy.getByTestId('ArticleSortSelector.SortByAscDesc').find('select').select(order);

    // cy.getByTestId('ArticlesPageFilters.ArticleSortViewSelector').first().should('exist'); // ArticleSortSelector
    // cy.getByTestId('ArticlesPageFilters.ArticleSortViewSelector').first().first().should('exist'); // SortByParams
    // cy.getByTestId('ArticlesPageFilters.ArticleSortViewSelector').first().last().should('exist'); // SortByAscDesc
    return cy.request({
        method: 'GET',
        url: `http://localhost:8000/articles?_sort=${sort}&_order=${order}`,
        headers: { Authorization: 'asasf' },
    }).then((data) => {
        return data;
    });
};
declare global {
    namespace Cypress {
        interface Chainable {
            getArticlesBySortOrder(sort: string, order: string): Chainable<void>;
        }
    }
}
