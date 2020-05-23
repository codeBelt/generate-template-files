import IConfigItem from '../models/IConfigItem';
import IReplacer from '../models/IReplacer';
import StringUtility from './StringUtility';
import IReplacerSlotQuestion from '../models/IReplacerSlotQuestion';
import colors from 'colors';

/**
 * https://timber.io/blog/creating-a-real-world-cli-app-with-node/#errors-and-exit-codes
 * @param message
 * @param isError
 */
export const errorMessageAndExit = (isError: boolean, message: string) => {
    if (isError) {
        console.error(colors.bold.red(`[Error in generate-template-files]:`), colors.red(message));
        process.exit(1);
    }
};

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
        return errorIfFalse(false, `errorIfTrue() first argument must be a boolean but argument was of type ${typeof isError}`);
    }

    if (!isError) {
        return new Error(errorMessage);
    }
};

export const errorIfNoConfigItems = (options: IConfigItem[]) => {
    const hasAtLeastOneItem = Boolean(options?.length);

    errorMessageAndExit(!hasAtLeastOneItem, 'There was no IConfigItem items found.');
};

export const errorIfOptionNameIsNotFound = (item: IConfigItem | undefined, templateName: string) => {
    errorMessageAndExit(!item, `No IConfigItem found for ${templateName}`);
};

export const errorIfStringReplacersDoNotMatch = (item: IConfigItem | undefined, commandLineStringReplacers: IReplacer[]) => {
    const configItemStringReplacers: (string | IReplacerSlotQuestion)[] = item?.stringReplacers ?? [];

    errorMessageAndExit(
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

    errorMessageAndExit(
        configItemStringReplacersKeys !== commandLineStringReplacersKeys,
        `${configItemStringReplacersKeys} does not match ${commandLineStringReplacersKeys}. IConfigItem stringReplacers do not match the command line arguments.`
    );
};

export const errorIfNoStringOrDynamicReplacers = (options: IConfigItem[]) => {
    const hasStringOrDynamicReplacers =
        options.every((item: IConfigItem) => {
            return Boolean(item?.stringReplacers?.length) || Boolean(item?.dynamicReplacers?.length);
        }) && options.length > 0;

    errorMessageAndExit(!hasStringOrDynamicReplacers, 'IConfigItem needs to have a stringReplacers or dynamicReplacers.');
};
