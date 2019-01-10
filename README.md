# `generate-template-files`

[![NPM version][npm-img]][npm-url] [![Downloads][downloads-img]][npm-url]

A generator to create custom template files for all your boilerplate, scaffolding, skeleton, templating code that you need to create over and over again.

## Install

With [NPM](http://npmjs.com):

```command
$ npm install generate-template-files
```

With [Yarn](https://yarnpkg.com):

```command
$ yarn add generate-template-files
```

## Usage

Create a `generate.js` file and add in the example below. Then you can do `node generate.js` or add a script task in your package.json file.

```js
const generateTemplateFiles = require('generate-template-files');

generateTemplateFiles([
    {
        option: 'Create Redux Store',
        defaultCase: '(pascalCase)',
        entry: {
            folderPath: './tools/templates/ngrx/',
        },
        stringReplacers: ['~Component~', '~Model~'],
        output: {
            path: './src/app/stores/~Component~(lowerCase)',
            pathAndFileNameDefaultCase: '(kebabCase)',
        },
    },
    {
        option: 'Create Ngrx Action',
        defaultCase: '(pascalCase)',
        entry: {
            folderPath: './tools/templates/ngrx/~Component~.action.ts',
        },
        stringReplacers: ['~Component~', '~Model~'],
        output: {
            path: './src/app/stores/~Component~(lowerCase)/~Component~(pascalCase)Action.ts',
            pathAndFileNameDefaultCase: '(kebabCase)',
        },
    },
]);
```

## API

The `generateTemplateFiles` method takes an array of `IConfigItem` items.

#### `IConfigItem`

-   `option` - The name of the option to choose when asked.
-   `defaultCase` - The default [Case Converters](#case-converters) you want to use with the [Replacer Slots](#replacer-slots) in your template files. Default is `(noCase)`.
-   `entry.folderPath` - Path to a folder of files or a single template file.
-   `stringReplacers` - An array of [Replacer Slots](#replacer-slots) used to replace content in your files and file paths.
-   `output.path` - The desired out put path for your generated files. You can you [Case Converters](#case-converters) and [Replacer Slots](#replacer-slots) to make the path somewhat dynamic.
-   `output.pathAndFileNameDefaultCase` - The default [Case Converters](#case-converters) you want for the file path and file name(s).

### Replacer Slots

[Replacer Slots](#replacer-slots) are unique string value(s) that you want other string data to replace.

For example you can use some like this in your template files or in the file path names.

-   `~replacerSlot~`
-   `{{something else}}`
-   `__AnythingYouWant__`

### Case Converters

[Case Converters](#case-converters) allows you to transform the entered in string value.

For example if you enter in `"product reducer"` for `~replacerSlot~` and in your template you had `~replacerSlot~(pascalCase)`. You will get `ProductReducer`.

Lets say you entered in `Lives down BY the River` with one of the converters:

    (noCase)        // Lives down BY the River
    (camelCase)     // livesDownByTheRiver
    (constantCase)  // LIVES_DOWN_BY_THE_RIVER
    (dotCase)       // lives.down.by.the.river
    (kebabCase)     // lives-down-by-the-river
    (lowerCase)     // livesdownbytheriver
    (pascalCase)    // LivesDownByTheRiver
    (pathCase)      // lives/down/by/the/river
    (sentenceCase)  // Lives down by the river
    (snakeCase)     // lives_down_by_the_river
    (titleCase)     // Lives Down By The River

One Rule - No spaces between the [Replacer Slots](#replacer-slots) and the [Case Converters](#case-converters).

-   `~name~(camelCase)` [Case Converters](#case-converters) Will work
-   `~name~ (camelCase)` [Case Converters](#case-converters) will `not` work

[npm-url]: https://npmjs.org/package/generate-template-files
[downloads-img]: http://img.shields.io/npm/dm/generate-template-files.svg?style=flat-square
[npm-img]: http://img.shields.io/npm/v/generate-template-files.svg?style=flat-square
