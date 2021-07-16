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
      { slot: '__1scope__', slotValue: componentScope },
      { slot: '__s2cope__', slotValue: componentScope },
      { slot: '__sc2ope__', slotValue: componentScope },
      { slot: '__sco2pe__', slotValue: componentScope },
      { slot: '__scop2e__', slotValue: componentScope },
      { slot: '__scope2__', slotValue: componentScope },
      { slot: '__3scope__', slotValue: componentScope },
      { slot: '__s3cope__', slotValue: componentScope },
      { slot: '__sc3ope__', slotValue: componentScope },
      { slot: '__sco3pe__', slotValue: componentScope },
      { slot: '__scop3e__', slotValue: componentScope },
      { slot: '__4scope__', slotValue: componentScope },
      { slot: '__s4cope__', slotValue: componentScope },
      { slot: '__sc4ope__', slotValue: componentScope },
      { slot: '__sco44pe__', slotValue: componentScope },
      { slot: '__scope4__', slotValue: componentScope },
      { slot: '__s5cope__', slotValue: componentScope },
      { slot: '__s52cope__', slotValue: componentScope },
      { slot: '__sc5ope__', slotValue: componentScope },
      { slot: '__sco25pe__', slotValue: componentScope },
      { slot: '__sco6pe__', slotValue: componentScope },
      { slot: '__sco35pe__', slotValue: componentScope },
      { slot: '__sco5pe__', slotValue: componentScope },
      { slot: '__sco1pe__', slotValue: componentScope },
      { slot: '__s12cope__', slotValue: componentScope },
      { slot: '__sc53ope__', slotValue: componentScope },
      { slot: '__scfoape__', slotValue: componentScope },
      { slot: '__scopasde__', slotValue: componentScope },
      { slot: '__scosadfpe__', slotValue: componentScope },
      { slot: '__scosadafpe__', slotValue: componentScope },
      { slot: '__scofsdpe__', slotValue: componentScope },
      { slot: '__scopfe__', slotValue: componentScope },
    ],
    output: {
      path: `./src/__scope__/`,
      pathAndFileNameDefaultCase: CaseConverterEnum.CamelCase,
    },
  },
]);

