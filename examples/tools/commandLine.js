const {items} = require('./items');
const {generateTemplateFilesCommandLine} = require('../../dist/generate-template-files.cjs');
// Note: In your file it will be like this:
// const {generateTemplateFilesCommandLine} = require('generate-template-files');

// node ./tools/commandLine.js angular-ngrx-store __name__=some-name __model__=some-other-name --outputpath=./src/here --overwrite

generateTemplateFilesCommandLine(items);
