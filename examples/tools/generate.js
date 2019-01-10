const generateTemplateFiles = require('../../dist/generate-template-files.cjs');

generateTemplateFiles([
    // Angular
    {
        option: "Ngrx Store",
        defaultCase: '(pascalCase)',
        entry: {
            folderPath: './tools/templates/angular/ngrx-store/',
        },
        stringReplacers: ['~Component~', '~Model~'],
        output: {
            path: './src/app/stores/~Component~(lowerCase)',
            pathAndFileNameDefaultCase: '(kebabCase)',
        } ,
    },
    // Vue
    {
        option: 'Vuex Store',
        defaultCase: '(pascalCase)',
        entry: {
            folderPath: './tools/templates/vue/vuex-store/',
        },
        stringReplacers: ['__store__', '__model__'],
        output: {
            path: './src/stores/__store__(lowerCase)',
            pathAndFileNameDefaultCase: '(pascalCase)',
        },
    },
    // React
    {
        option: 'Redux Store',
        defaultCase: '(pascalCase)',
        entry: {
            folderPath: './tools/templates/react/redux-store/',
        },
        stringReplacers: ['__store__', '__model__'],
        output: {
            path: './src/stores/__store__(lowerCase)',
            pathAndFileNameDefaultCase: '(pascalCase)',
        },
    },
    {
        option: 'Component',
        defaultCase: '(pascalCase)',
        entry: {
            folderPath: './tools/templates/react/component/',
        },
        stringReplacers: ['__name__',],
        output: {
            path: './src/views/__name__(lowerCase)',
            pathAndFileNameDefaultCase: '(pascalCase)',
        },
    },
    {
        option: 'Connected Component',
        defaultCase: '(pascalCase)',
        entry: {
            folderPath: './tools/templates/react/connected-component/',
        },
        stringReplacers: ['__name__',],
        output: {
            path: './src/views/__name__(lowerCase)',
            pathAndFileNameDefaultCase: '(pascalCase)',
        },
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
