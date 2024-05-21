// import { Project } from 'ts-morph';

// const project = new Project({});

// project.addSourceFilesAtPaths('src/**/*.ts'); // файлы с которыми будем работать
// project.addSourceFilesAtPaths('src/**/*.tsx');

// const files = project.getSourceFiles(); // получаем все .ts файлы нашего проекта

// function isAbsolute(value: string) {
//     const layers = ['app', 'shared', 'entities', 'features', 'widgets', 'pages'];
//     return layers.some((layer) => value.startsWith(layer));
// }

// files.forEach((sourceFile) => {
//     const importDeclarations = sourceFile.getImportDeclarations();
//     importDeclarations.forEach((importDeclaration) => {
//         const value = importDeclaration.getModuleSpecifierValue();

//         if (isAbsolute(value)) {
//             importDeclaration.setModuleSpecifier(`@/${value}`);
//         }
//     });
// });

// project.save(); // чтобы либа ts morph сохранила изменения
