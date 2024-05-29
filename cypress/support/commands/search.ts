export const getArticlesBySearch = (searchRequest: string) => {
    cy.getByTestId('ArticlesPageFilters.SearchInput').click();
    cy.getByTestId('ArticlesPageFilters.SearchInput').clear().type(searchRequest);
    return cy.request({
        method: 'GET',
        url: `http://localhost:8000/articles?q=${searchRequest}`,
        headers: { Authorization: 'asasf' },
    }).then((data) => {
        return data;
    });
};
declare global {
    namespace Cypress {
        interface Chainable {
            getArticlesBySearch(searchRequest: string): Chainable<void>;
        }
    }
}
