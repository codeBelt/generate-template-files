const {items} = require('./items');
const {generateTemplateFilesCommandLine} = require('../../dist/generate-template-files.cjs');
// Note: In your file it will be like this:
// const {generateTemplateFilesCommandLine} = require('generate-template-files');

// node ./tools/generate.js angular-ngrx-store __name__=some-name __model__=some-other-name --outputpath=asdf/asdf/ --overwrite

generateTemplateFilesCommandLine(items);
