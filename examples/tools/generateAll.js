const {generateTemplateFiles} = require('../../dist/generate-template-files.cjs');

generateTemplateFiles([
    {
        option: 'Create new JS class',
        defaultCase: '(upperCase)',
        entry: {
            folderPath: './templates/new-service-js-class/',
        },
        stringReplacers: ['{{ServiceName}}'],
        output: {
            path: './scripts/',
        },
    },
    {
        option: 'Create new C# API',
        defaultCase: '(upperCase)',
        entry: {
            folderPath: './templates/new-service-cs-api/',
        },
        stringReplacers: ['{{ServiceName}}'],
        output: {
            path: './API/controllers/',
        },
    },
], true);
