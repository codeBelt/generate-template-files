import GenerateTemplateFiles from './GenerateTemplateFiles';
import IConfigItemDefault from './models/IConfigItem';
import StringUtilityDefault from './utilities/StringUtility';
import CaseConverterEnumDefault from './constants/CaseConverterEnum';
import IResultsDefault from './models/IResults';
import IReplacerDefault from './models/IReplacer';

export {StringUtilityDefault as StringUtility};
export {CaseConverterEnumDefault as CaseConverterEnum};

// Workaround for issue of exporting interfaces
export type IResults = IResultsDefault;
export type IConfigItem = IConfigItemDefault;
export type IReplacer = IReplacerDefault;

/**
 * Main method to create your template files.
 * Accepts an array of `IConfigItem` items.
 * Allows user to select from the `IConfigItem` items and process a single one.
 */
export function generateTemplateFiles(options: IConfigItem[]): Promise<void> {
    if (options.length > 0) {
        return new GenerateTemplateFiles().generate(options);
    }

    console.error('No config items found.');
    return Promise.reject();
}

/**
 * Accessory method to create all template files in a suite of `IConfigItem` items.
 * Accepts an array of `IConfigItem` items.
 * Will walk through the array and process every one.
 */
export function generateTemplateFilesInSequence(options: IConfigItem[]): Promise<void> {
    if (options.length > 0) {
        return new GenerateTemplateFiles().generateInSequence(options);
    }

    console.error('No config items found.');
    return Promise.reject();
}
