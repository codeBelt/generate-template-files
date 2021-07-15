// generateTemplateFile.js
const {generateTemplateFilesBatch, CaseConverterEnum} = require('../../dist/generate-template-files.cjs');
// Note: In your file it will be like this:
// const {generateTemplateFilesBatch, CaseConverterEnum} = require('generate-template-files');

const componentName = "UserProfile"
const componentScope = "example"

generateTemplateFilesBatch([
  {
    option: 'Testing out batch generate of file with mix of underscores and brackets',
    defaultCase: CaseConverterEnum.PascalCase,
    entry: {
      folderPath: './tools/templates/misc',
    },
    dynamicReplacers: [
      { slot: '__resourceName__', slotValue: componentName },
      { slot: '__scope__', slotValue: componentScope },
    ],
    output: {
      path: `./src/__scope__/`,
      pathAndFileNameDefaultCase: CaseConverterEnum.CamelCase,
    },
  },
]);

