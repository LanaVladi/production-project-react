/// <reference types="cypress" />

// import { login } from './commands/common';
import * as commonCommands from './commands/common';
import * as profileCommands from './commands/profile';
import * as articleCommands from './commands/article';
import * as commentsCommands from './commands/comments';
import * as ratingCommands from './commands/rating';
import * as searchCommands from './commands/search';
import * as sortOrderCommands from './commands/sorting';

// Cypress.Commands.add('login', login);
Cypress.Commands.addAll(commonCommands);
Cypress.Commands.addAll(profileCommands);
Cypress.Commands.addAll(articleCommands);
Cypress.Commands.addAll(commentsCommands);
Cypress.Commands.addAll(ratingCommands);
Cypress.Commands.addAll(searchCommands);
Cypress.Commands.addAll(sortOrderCommands);

// const { FIXTURE_MODE } = process.env;
// const fixtureName = req.method + req.url + hash(req.body);

// if (FIXTURE_MODE === 'READ') {
//     readFixture(fixtureName);
// }

// if (FIXTURE_MODE === 'WRITE') {
//     createFixture(fixtureName, req.body); // create .json file
// }

// В CI в отдельных пул риквестах можно работать с запросами в рамках фикстур, которые заранее были записаны.
// В релизах можно передавать FIXTURE_MODE как API и тестить с реальными данными с бэка.

// Если тестов немного (около 100), то можно вручную интерцепторами, если больше,
//  можно автоматизировать создание фикстур из данных запроса.
// Задаем переменную окружения, например,
// const FIXTURE_MODE = process.env.FIXTURE_MODE;
// Если  FIXTURE_MODE === ‘READ’, То берем данные из уже созданных фикстур, если же
//  FIXTURE_MODE === ‘WRITE’, то данные можно брать данные из запроса и в автоматизированном режиме создавать фикстуры из этих данных.
// Можно названия генерировать исходя из запроса (URL, hash name из url, какое-то уникальное имя)

export {};
