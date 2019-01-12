const generateTemplateFiles = require('../../dist/generate-template-files.cjs');

// Note: In your file it will be like this:
// const generateTemplateFiles = require('generate-template-files');

generateTemplateFiles([
    // Angular
    {
        option: "Angular Ngrx Store",
        defaultCase: '(pascalCase)',
        entry: {
            folderPath: './tools/templates/angular/ngrx-store/',
        },
        stringReplacers: ['__name__', '__model__'],
        output: {
            path: './src/app/stores/__name__(lowerCase)',
            pathAndFileNameDefaultCase: '(kebabCase)',
        },
    },
    // Vue
    {
        option: 'Vue Vuex Store',
        defaultCase: '(pascalCase)',
        entry: {
            folderPath: './tools/templates/vue/vuex-store/',
        },
        stringReplacers: ['__store__', '__model__'],
        output: {
            path: './src/stores/__store__(kebabCase)',
            pathAndFileNameDefaultCase: '(pascalCase)',
        },
        onComplete: (results) => {
            console.log(`results`, results);
        }
    },
    // React
    {
        option: 'React Redux Store',
        defaultCase: '(pascalCase)',
        entry: {
            folderPath: './tools/templates/react/redux-store/',
        },
        stringReplacers: ['__store__', '__model__'],
        output: {
            path: './src/app/stores/__store__(lowerCase)',
            pathAndFileNameDefaultCase: '(kebabCase)',
        },
        onComplete: (results) => {
            console.log(`results`, results);
        }
    },
    {
        option: 'React Redux Action',
        defaultCase: '(pascalCase)',
        entry: {
            folderPath: './tools/templates/react/redux-store/__store__Action.ts',
        },
        stringReplacers: ['__store__', '__model__'],
        output: {
            path: './src/app/stores/__store__/__store__(lowerCase)/__store__(pascalCase)Action.ts',
            pathAndFileNameDefaultCase: '(kebabCase)',
        },
    },
    {
        option: 'React Component',
        defaultCase: '(pascalCase)',
        entry: {
            folderPath: './tools/templates/react/component/',
        },
        stringReplacers: ['__name__',],
        output: {
            path: './src/views/__name__(lowerCase)',
            pathAndFileNameDefaultCase: '(pascalCase)',
        },
        onComplete: (results) => {
            console.log(`results`, results);
        }
    },
    {
        option: 'React Connected Component',
        defaultCase: '(pascalCase)',
        entry: {
            folderPath: './tools/templates/react/connected-component/',
        },
        stringReplacers: ['__name__',],
        output: {
            path: './src/views/__name__(lowerCase)',
            pathAndFileNameDefaultCase: '(pascalCase)',
        },
        onComplete: (results) => {
            console.log(`results`, results);
        }
    },
    {
        option: 'Model',
        defaultCase: '(pascalCase)',
        entry: {
            folderPath: './tools/templates/react/__model__Model.ts',
        },
        stringReplacers: ['__model__',],
        output: {
            path: './src/models/__model__Model.ts',
            pathAndFileNameDefaultCase: '(pascalCase)',
        },
        onComplete: (results) => {
            console.log(`results`, results);
        }
    },
    {
        option: 'Interface',
        defaultCase: '(pascalCase)',
        entry: {
            folderPath: './tools/templates/react/I__interface__.ts',
        },
        stringReplacers: ['__interface__',],
        output: {
            path: './src/models/I__interface__.ts',
            pathAndFileNameDefaultCase: '(pascalCase)',
        },
    },
    {
        option: 'Enum',
        defaultCase: '(pascalCase)',
        entry: {
            folderPath: './tools/templates/react/__enum__Enum.ts',
        },
        stringReplacers: ['__enum__',],
        output: {
            path: './src/constants/__enum__Enum.ts',
            pathAndFileNameDefaultCase: '(pascalCase)',
        },
    },
]);
