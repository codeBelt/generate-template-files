import GenerateTemplateFiles from '../GenerateTemplateFiles';
import { IConfigItem } from '../index';
import CaseConverterEnum from '../constants/CaseConverterEnum';
import yargs from 'yargs';
import colors from 'colors';

let consoleInfoSpy: jest.SpyInstance;
describe('GenerateTemplateFiles - Command Line', () => {
  beforeEach(() => {
    consoleInfoSpy = jest.spyOn(global.console, 'info').mockImplementation(() => null);
  });

  afterEach(() => {
    consoleInfoSpy.mockRestore();
  });

  test('should throw an error if no IConfigItem items', () => {
    const items: IConfigItem[] = [];
    const gtf = new GenerateTemplateFiles();

    gtf.commandLine(items);
    expect(consoleInfoSpy).toBeCalledWith(
      colors.bold.red(
        `[Error in generate-template-files]: ${colors.red('There was no IConfigItem items found.')}`
      )
    );
  });

  test('should throw an error if IConfigItem is not found for option name', () => {
    const notFoundOptionName = 'other-template';

    yargs([notFoundOptionName]);

    const items: IConfigItem[] = [
      {
        option: 'some-template',
        defaultCase: CaseConverterEnum.PascalCase,
        stringReplacers: ['__name__'],
        entry: {
          folderPath: 'path',
        },
        output: {
          path: 'path',
        },
      },
    ];
    const gtf = new GenerateTemplateFiles();

    gtf.commandLine(items);
    expect(consoleInfoSpy).toBeCalledWith(
      colors.bold.red(
        `[Error in generate-template-files]: ${colors.red(
          `No IConfigItem found for ${notFoundOptionName}`
        )}`
      )
    );
  });

  test('should throw an error if no stringReplacers or dynamicReplacers', () => {
    const items: IConfigItem[] = [
      {
        option: 'some-template',
        defaultCase: CaseConverterEnum.PascalCase,
        entry: {
          folderPath: 'path',
        },
        output: {
          path: 'path',
        },
      },
    ];
    const gtf = new GenerateTemplateFiles();

    gtf.commandLine(items);
    expect(consoleInfoSpy).toBeCalledWith(
      colors.bold.red(
        `[Error in generate-template-files]: ${colors.red(
          'IConfigItem needs to have a stringReplacers or dynamicReplacers.'
        )}`
      )
    );
  });
});
