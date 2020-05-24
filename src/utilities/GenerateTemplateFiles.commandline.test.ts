import GenerateTemplateFiles from '../GenerateTemplateFiles';
import { IConfigItem } from '../index';
import CaseConverterEnum from '../constants/CaseConverterEnum';
import yargs from 'yargs';

describe.skip('GenerateTemplateFiles - Command Line', () => {
  test('should throw an error if no IConfigItem items', () => {
    const items: IConfigItem[] = [];
    const gtf = new GenerateTemplateFiles();

    expect(() => gtf.commandLine(items)).rejects.toThrowError(
      'There was no IConfigItem items found.'
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

    expect(() => gtf.commandLine(items)).rejects.toThrowError(
      `No IConfigItem found for ${notFoundOptionName}`
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

    expect(() => gtf.commandLine(items)).rejects.toThrowError(
      'IConfigItem needs to have a stringReplacers or dynamicReplacers.'
    );
  });
});
