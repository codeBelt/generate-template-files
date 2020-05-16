import IConfigItem from '../models/IConfigItem';
import IReplacer from '../models/IReplacer';
import StringUtility from './StringUtility';
import IReplacerSlotQuestion from '../models/IReplacerSlotQuestion';

export const isBooleanType = (value: any) => {
    return typeof value === 'boolean';
};

/**
 * Helper function for throwing errors if a given expression evaluates to false.
 * This function is strict and will throw an error the the type of the first
 * argument is not "boolean".
 */
export const errorIfFalse = (isError: boolean, errorMessage: string): Error | void => {
    if (!isBooleanType(isError)) {
        return errorIfFalse(false, `errorIfTrue()'s first argument must be a boolean but argument was of type ${typeof isError}`);
    }

    if (!isError) {
        return new Error(errorMessage);
    }
};

export const throwErrorIfNoConfigItems = (options: IConfigItem[]) => {
    const hasAtLeastOneItem = Boolean(options?.length);

    if (!hasAtLeastOneItem) {
        throw new Error('There was no IConfigItem items found.');
    }
};

export const throwErrorIfOptionNameIsNotFound = (item: IConfigItem | undefined, templateName: string) => {
    if (!item) {
        throw new Error(`No IConfigItem found for ${templateName}`);
    }
};

export const throwErrorIfStringReplacersDoNotMatch = (item: IConfigItem | undefined, commandLineStringReplacers: IReplacer[]) => {
    const configItemStringReplacers: (string | IReplacerSlotQuestion)[] = item?.stringReplacers ?? [];

    if (commandLineStringReplacers.length !== configItemStringReplacers.length) {
        throw new Error('IConfigItem stringReplacers do not match the command line arguments.');
    }

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

    if (configItemStringReplacersKeys !== commandLineStringReplacersKeys) {
        throw new Error(
            ` ${configItemStringReplacersKeys} does not match ${commandLineStringReplacersKeys}. IConfigItem stringReplacers do not match the command line arguments.`
        );
    }
};

export const throwErrorIfNoStringOrDynamicReplacers = (options: IConfigItem[]) => {
    const hasStringOrDynamicReplacers =
        options.every((item: IConfigItem) => {
            return Boolean(item?.stringReplacers?.length) || Boolean(item?.dynamicReplacers?.length);
        }) && options.length > 0;

    if (!hasStringOrDynamicReplacers) {
        throw new Error('IConfigItem needs to have a stringReplacers or dynamicReplacers.');
    }
};
