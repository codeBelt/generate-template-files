// generateTemplateFile.js
const {generateTemplateFilesBatch, CaseConverterEnum} = require('../../dist/generate-template-files.cjs');
// Note: In your file it will be like this:
// const {generateTemplateFilesBatch, CaseConverterEnum} = require('generate-template-files');

const componentName = "Example"
const componentScope = "common"

generateTemplateFilesBatch([
  {
    option: 'Component',
    defaultCase: CaseConverterEnum.PascalCase,
    entry: {
      folderPath: './tools/templates/react/component',
    },
    dynamicReplacers: [
      { slot: '__name__', slotValue: componentName },
      { slot: '__scope__', slotValue: componentScope },
    ],
    output: {
      path: `./src/component/__scope__(camelCase)`,
      pathAndFileNameDefaultCase: CaseConverterEnum.PascalCase,
    },
  },
  {
    option: 'Component Interface',
    defaultCase: CaseConverterEnum.PascalCase,
    entry: {
      folderPath: './tools/templates/react/I__interface__.ts',
    },
    dynamicReplacers: [
      { slot: '__interface__', slotValue: componentName },
      { slot: '__scope__', slotValue: componentScope },
    ],
    output: {
      path: `./src/component/__scope__(camelCase)/I__interface__.ts`,
      pathAndFileNameDefaultCase: CaseConverterEnum.PascalCase,
    },
  },
]);

