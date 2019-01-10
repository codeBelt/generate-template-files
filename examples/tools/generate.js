const generateTemplateFiles = require('../../dist/generate-template-files.cjs');

generateTemplateFiles([
    {
        option: "Create Ngrx Store",
        defaultCase: '(pascalCase)',
        entry: {
            folderPath: './tools/templates/ngrx/',
        },
        stringReplacers: ['~Component~', '~Model~'],
        output: {
            path: './dist/app/stores/~Component~(lowerCase)',
            pathAndFileNameDefaultCase: '(kebabCase)',
        } ,
        onComplete: (data) => {
            console.log(`data`, data);
        }
    },
    {
        option: "Create Ngrx Action",
        defaultCase: '(pascalCase)',
        entry: {
            folderPath: './tools/templates/ngrx/~Component~.action.ts',
        },
        stringReplacers: ['~Component~', '~Model~'],
        output: {
            path: './dist/app/stores/~Component~(lowerCase)/~Component~(pascalCase)Action.ts',
            pathAndFileNameDefaultCase: '(kebabCase)',
        } ,
    },
]);
