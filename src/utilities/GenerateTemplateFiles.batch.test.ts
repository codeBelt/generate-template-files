import GenerateTemplateFiles from '../GenerateTemplateFiles';
import { IConfigItem } from '../index';
import CaseConverterEnum from '../constants/CaseConverterEnum';

describe.skip('GenerateTemplateFiles - Batch', () => {
  test('should throw an error if no IConfigItem items', () => {
    const items: IConfigItem[] = [];
    const gtf = new GenerateTemplateFiles();

    expect(() => gtf.batchGenerate(items)).rejects.toThrowError(
      'There was no IConfigItem items found.'
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

  test('should throw an error if batch IConfigItem is not found for option name', () => {
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

    expect(() => gtf.batchGenerate(items)).rejects.toThrowError(
      `IConfigItem for batchGenerate does not support stringReplacers, and must have dynamicReplacers.`
    );
  });
});
