const {items} = require('./items');
const {generateTemplateFiles} = require('../../dist/generate-template-files.cjs');
// Note: In your file it will be like this:
// const {generateTemplateFiles} = require('generate-template-files');

generateTemplateFiles(items);
