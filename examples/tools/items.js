const filename = require('file-name');
const insertLine = require('insert-line');

const config = require('../package.json');

const items = [
    // Angular
    {
        option: 'Angular Ngrx Store',
        defaultCase: '(pascalCase)',
        entry: {
            folderPath: './tools/templates/angular/ngrx-store/',
        },
        stringReplacers: ['__name__', {question: 'Insert model name', slot: '__model__'}],
        dynamicReplacers: [
            {slot: '__version__', slotValue: config.version},
            {slot: '__description__', slotValue: config.description},
        ],
        output: {
            path: './src/app/stores/__name__(lowerCase)',
            pathAndFileNameDefaultCase: '(kebabCase)',
            overwrite: false,
        },
        onComplete: async (results) => {
            // console.log(`results`, results);
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
        onComplete: async (results) => {
            console.log(`results`, results);
            await importVuexStore(results);
        },
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
            path: './src/stores/__store__(kebabCase)',
            pathAndFileNameDefaultCase: '(pascalCase)',
            overwrite: true,
        },
        onComplete: (results) => {
            console.log(`results`, results);
        },
    },
    {
        option: 'React Component',
        defaultCase: '(pascalCase)',
        entry: {
            folderPath: './tools/templates/react/component/',
        },
        stringReplacers: ['__name__'],
        output: {
            path: './src/views/__name__(kebabCase)',
            pathAndFileNameDefaultCase: '(pascalCase)',
        },
    },
    {
        option: 'React Connected Component',
        defaultCase: '(pascalCase)',
        entry: {
            folderPath: './tools/templates/react/connected-component/',
        },
        stringReplacers: ['__name__'],
        output: {
            path: './src/views/__name__(kebabCase)',
            pathAndFileNameDefaultCase: '(pascalCase)',
        },
    },
    {
        option: 'Selector',
        defaultCase: '(pascalCase)',
        entry: {
            folderPath: './tools/templates/react/selectors/',
        },
        stringReplacers: ['__name__'],
        output: {
            path: './src/selectors/__name__(kebabCase)',
            pathAndFileNameDefaultCase: '(pascalCase)',
        },
    },
    {
        option: 'Model',
        defaultCase: '(pascalCase)',
        entry: {
            folderPath: './tools/templates/react/__model__Model.ts',
        },
        stringReplacers: ['__model__'],
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
        stringReplacers: ['__interface__'],
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
        stringReplacers: ['__enum__'],
        output: {
            path: './src/constants/__enum__Enum.ts',
            pathAndFileNameDefaultCase: '(pascalCase)',
        },
    },
];

/*
 * NOTE: there is many ways you can do this. This is just an example on how you might approach it.
 */
async function importVuexStore(results) {
    const files = results.output.files;

    const fullPaths = files
        .map((folderPath) => folderPath.replace('src/', '')) // remove 'src' from path
        .map((path) => `import ${filename(path)} from '${path}'`) // create import statement
        .join('\n'); // put all imports on there own line

    try {
        await insertLine('src/import-test.ts').append(fullPaths);
    } catch (error) {
        console.log(``, error);
    }
}

exports.items = items;
