import IConfigItem from '../models/IConfigItem';
import IReplacer from '../models/IReplacer';
import StringUtility from './StringUtility';
import IReplacerSlotQuestion from '../models/IReplacerSlotQuestion';
import colors from 'colors';

export const isBooleanType = (value: unknown): value is boolean => {
  return typeof value === 'boolean';
};

export const displayError = (isError: boolean, errorMessage: string): Error | void => {
  if (isError) {
    try {
      throw new Error(errorMessage);
    } catch (error) {
      console.info(
        colors.bold.red(`[Error in generate-template-files]: ${colors.red(error.message)}`)
      );
    }
  }
};

export const errorIfNoConfigItems = (options: IConfigItem[]) => {
  const hasAtLeastOneItem = Boolean(options?.length);

  displayError(!hasAtLeastOneItem, 'There was no IConfigItem items found.');
};

export const errorIfOptionNameIsNotFound = (
  item: IConfigItem | undefined,
  templateName: string
) => {
  displayError(!item, `No IConfigItem found for ${templateName}`);
};

export const errorIfStringReplacersDoNotMatch = (
  item: IConfigItem | undefined,
  commandLineStringReplacers: IReplacer[]
) => {
  const configItemStringReplacers: (string | IReplacerSlotQuestion)[] = item?.stringReplacers ?? [];

  displayError(
    commandLineStringReplacers.length !== configItemStringReplacers.length,
    'IConfigItem stringReplacers do not match the command line arguments.'
  );

  const configItemStringReplacersKeys = configItemStringReplacers
    .map((replacer: string | IReplacerSlotQuestion) => {
      return StringUtility.isString(replacer) ? replacer : replacer.slot;
    })
    .sort()
    .join(', ');

  const commandLineStringReplacersKeys = commandLineStringReplacers
    .map((replacer: IReplacer) => replacer.slot)
    .sort()
    .join(', ');

  displayError(
    configItemStringReplacersKeys !== commandLineStringReplacersKeys,
    `${configItemStringReplacersKeys} does not match ${commandLineStringReplacersKeys}.`
  );
};

export const errorIfNoStringOrDynamicReplacers = (options: IConfigItem[]) => {
  const hasStringOrDynamicReplacers =
    options.every((item: IConfigItem) => {
      return Boolean(item?.stringReplacers?.length) || Boolean(item?.dynamicReplacers?.length);
    }) && options.length > 0;

  displayError(
    !hasStringOrDynamicReplacers,
    'IConfigItem needs to have a stringReplacers or dynamicReplacers.'
  );
};
