# `generate-template-files`

[![NPM version][npm-img]][npm-url] [![Downloads][downloads-img]][npm-url]

A generator to create custom template files for boilerplate, scaffolding, skeleton, and templating code that you need to create over and over again.

> Find this useful? Give it a :star:

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

1. Check out the `examples` folder or create a file called `generate.js`. Note that this file name is flexible.
2. In that file, add in the example code below.
3. Run `node generate.js` within Terminal (Mac) or Powershell (Win) once you've added your template files.

```js
const generateTemplateFiles = require('generate-template-files');

generateTemplateFiles([
    {
        option: 'Create Redux Store',
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
        },
    },
    {
        option: 'Create Reduce Action',
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
]);
```

As outlined in the `examples` folder, I prefer to create a `tools` folder and place `generate.js` w/ `templates` files in there. Additionally, I'll add a script task (`"generate": "node ./tools/generate.js"`) to my `package.json` file for convienent running of the generator using `npm run generate` or `yarn generate`.

```
┣━ package.json
┣━ src
┗━ tools/
   ┣━ generate.js
   ┗━ templates/
      ┣━ SomeFile.js
      ┗━ __name_(pascalCase)Action.ts
```

## API

The `generateTemplateFiles` method takes an array of `IConfigItem` items.

#### `IConfigItem`

-   `option` - The name of the option to choose when asked.
-   `defaultCase` - The default [Case Converters](#case-converters) to use with the [Replacer Slots](#replacer-slots) in the template files. Default is `(noCase)`.
-   `entry.folderPath` - Path to a folder of files or a single template file.
-   `stringReplacers` - An array of [Replacer Slots](#replacer-slots) used to replace content in the designated `entry.folderPath`.
-   `output.path` - The desired output path for generated files. [Case Converters](#case-converters) and [Replacer Slots](#replacer-slots) can be used to make the path somewhat dynamic.
-   `output.pathAndFileNameDefaultCase` - The [Case Converters](#case-converters) to use for the file path and file name(s).
-   `onComplete` - `optional` Takes a callback function that is called once the file(s) have been outputted. A `IResults` object will be passed to the callback which has the following properties:
-   `output.path` - The file(s) output path
-   `outputtedFilesAndFolders` - Array of folder and filenames created
-   `stringReplacers` - Array of Replacer Slots; name and values entered during the setup process

### Replacer Slots

[Replacer Slots](#replacer-slots) are unique string value(s) to be replaced by the generator.

For example you can use something like this in your template files and/or in the file path names.

-   `~replacerSlot~`
-   `{{something else}}`
-   `__AnythingYouWant__`

### Case Converters

[Case Converters](#case-converters) transform the string value entered upon use of the generator.

Example

-   In the generator template `__replacerSlot__` is appended by the pascalCase converter such as `__replacerSlot__(pascalCase)`.
-   When the generator is run, the string `"product reducer"` is provided for `__replacerSlot__`.
-   As a result, the converter will produce `ProductReducer`.

Here is the string `Lives down BY the River` with each of the converters:

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

One Rule: no spaces between the [Replacer Slots](#replacer-slots) and [Case Converters](#case-converters). If there is a space, [Case Converters](#case-converters) will not work.

-   :white_check_mark: `__name__(camelCase)`
-   :warning: `__name__ (camelCase)`

[npm-url]: https://npmjs.org/package/generate-template-files
[downloads-img]: http://img.shields.io/npm/dm/generate-template-files.svg?style=flat-square
[npm-img]: http://img.shields.io/npm/v/generate-template-files.svg?style=flat-square
