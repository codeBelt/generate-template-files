const {generateTemplateFiles, StringUtility} = require('../../dist/generate-template-files.cjs');
// Note: In your file it will be like this:
// const {generateTemplateFiles, StringUtility} = require('generate-template-files');

const filename = require('file-name');
const insertLine = require('insert-line');

const config = require('../package.json');

generateTemplateFiles([
    // Angular
    {
        optionName: "Angular Ngrx Store",
        defaultCase: '(pascalCase)',
        entry: {
            folderPath: './tools/templates/angular/ngrx-store/',
        },
        stringReplacers: ['__name__', '__model__'],
        dynamicReplacers: [
            {slot:'__version__', slotValue: config.version},
            {slot:'__description__', slotValue: config.description}
        ],
        output: {
            path: './src/app/stores/__name__(lowerCase)',
            pathAndFileNameDefaultCase: '(kebabCase)',
        },
        onComplete: async (results) => {
            console.log(`results`, results);
        },
    },
    // Vue
    {
        optionName: 'Vue Vuex Store',
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
        optionName: 'React Redux Store',
        defaultCase: '(pascalCase)',
        entry: {
            folderPath: './tools/templates/react/redux-store/',
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
    {
        optionName: 'React Component',
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
        optionName: 'React Connected Component',
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
        optionName: 'Selector',
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
        optionName: 'Model',
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
        optionName: 'Interface',
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
        optionName: 'Enum',
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
]);

/*
 * NOTE: there is many ways you can do this. This is just an example on how you might approch it.
 */
async function importVuexStore(results) {
    const files = results.output.files;

    const fullPaths = files
        .map((folderPath) => folderPath.replace('src/', ''))        // remove 'src' from path
        .map((path) => `import ${filename(path)} from '${path}'`)   // create import statement
        .join('\n');                                                // put all imports on there own line

    try {
        await insertLine('src/import-test.ts').append(fullPaths);
    } catch (error) {
        console.log(``, error);
    }
}
