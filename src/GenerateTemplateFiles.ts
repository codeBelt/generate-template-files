import * as enquirer from 'enquirer';
import recursiveCopy from 'recursive-copy';
import pathExists from 'path-exists';
import through from 'through2';
import replaceString from 'replace-string';
import StringUtility from './utilities/StringUtility';
import CaseConverterEnum from './constants/CaseConverterEnum';
import get from 'lodash.get';
import IConfigItem from './models/IConfigItem';
import IReplacer from './models/IReplacer';
import IResults from './models/IResults';
import IDefaultCaseConverter from './models/IDefaultCaseConverter';
import CheckUtility from './utilities/CheckUtility';
import IReplacerSlotQuestion from './models/IReplacerSlotQuestion';
import yargs from 'yargs';

export default class GenerateTemplateFiles {
    public static isCommandLine: boolean = Boolean(yargs.argv._.length);

    /**
     * Main method to create your template files. Accepts an array of `IConfigItem` items.
     */
    public async generate(options: IConfigItem[]): Promise<void> {
        const selectedConfigItem: IConfigItem = await this._getSelectedItem(options);
        const answeredReplacers: IReplacer[] = await this._getReplacerSlotValues(selectedConfigItem);

        await this._outputFiles(selectedConfigItem, answeredReplacers);
    }

    /**
     * Main method to create your template files with the command line.
     */
    public async commandLine(options: IConfigItem[]): Promise<void> {
        const commandLineArgs: string[] = yargs.argv._;
        const templateName: string = commandLineArgs.shift() ?? '';
        const slots: string[] = commandLineArgs;

        const selectedConfigItem: IConfigItem | undefined = options.find((configItem: IConfigItem) => {
            return StringUtility.toCase(configItem.option, CaseConverterEnum.KebabCase) === templateName;
        });

        if (!selectedConfigItem) {
            CheckUtility.check(Boolean(selectedConfigItem), `There was no IConfigItem found for ${templateName}`);

            return;
        }

        const stringReplacersSlotNames: string[] | undefined = selectedConfigItem.stringReplacers?.map((item: string | IReplacerSlotQuestion) => {
            return StringUtility.isString(item) ? item : item.slot;
        });

        CheckUtility.check(
            (stringReplacersSlotNames?.length ?? 0) === slots.length,
            `The number of arguments do not match the number of stringReplacers for ${templateName}`
        );

        const commandLineReplacers: IReplacer[] = slots.map((str: string) => {
            const [slot, slotValue] = str.split('=');

            const isValidReplacer = Boolean(stringReplacersSlotNames?.includes(slot));
            CheckUtility.check(isValidReplacer, `${slot} is not found in stringReplacers for ${templateName}`);

            return {
                slot,
                slotValue,
            };
        });
        const dynamicReplacers: IReplacer[] = selectedConfigItem.dynamicReplacers || [];

        await this._outputFiles(selectedConfigItem, [...commandLineReplacers, ...dynamicReplacers]);
    }

    private async _outputFiles(selectedConfigItem: IConfigItem, replacers: IReplacer[]): Promise<void> {
        const hasStringOrDynamicReplacers: boolean = replacers.length > 0;

        if (!hasStringOrDynamicReplacers) {
            CheckUtility.check(hasStringOrDynamicReplacers, 'You need at least one IReplacer');

            return;
        }

        const {contentCase, outputPathCase} = this._getDefaultCaseConverters(selectedConfigItem);
        const contentReplacers: IReplacer[] = this._getReplacers(replacers, contentCase);
        const outputPathReplacers: IReplacer[] = this._getReplacers(replacers, outputPathCase);
        const outputPath: string = await this._getOutputPath(outputPathReplacers, selectedConfigItem);
        const shouldWriteFiles: boolean = GenerateTemplateFiles.isCommandLine
            ? yargs.argv.overwrite === true
            : await this._shouldWriteFiles(outputPath);

        if (shouldWriteFiles === false) {
            console.info('No new files created');

            if (GenerateTemplateFiles.isCommandLine) {
                console.info('Use --overwrite option to overwrite existing files');
            }

            return;
        }

        const outputtedFilesAndFolders: string[] = await this._createFiles(
            replacers,
            outputPathReplacers,
            contentReplacers,
            outputPath,
            selectedConfigItem.entry.folderPath
        );

        this._onComplete(selectedConfigItem, outputPath, outputtedFilesAndFolders, replacers);
    }

    /**
     * Ask what template options the user wants to use
     */
    private async _getSelectedItem(options: IConfigItem[]): Promise<IConfigItem> {
        const templateQuestions: any = {
            type: 'autocomplete',
            name: 'optionChoice',
            message: 'What do you want to generate?',
            choices: options.map((configItem: IConfigItem) => configItem.option),
            suggest(input: string, choices: string[]) {
                return choices.filter((choice: any) => {
                    return choice.message.toLowerCase().startsWith(input.toLowerCase());
                });
            },
        };
        const templateAnswers: {optionChoice: string} = await enquirer.prompt(templateQuestions);

        return options.find((item: IConfigItem) => item.option === templateAnswers.optionChoice) as IConfigItem;
    }

    /**
     */
    private _getDefaultCaseConverters(selectedConfigItem: IConfigItem): IDefaultCaseConverter {
        const defaultContentCase: CaseConverterEnum = get(selectedConfigItem, 'defaultCase', CaseConverterEnum.None) as CaseConverterEnum;
        const defaultOutputPath: CaseConverterEnum = get(
            selectedConfigItem,
            'output.pathAndFileNameDefaultCase',
            defaultContentCase
        ) as CaseConverterEnum;

        return {
            contentCase: defaultContentCase,
            outputPathCase: defaultOutputPath,
        };
    }

    /**
     * New question asking what should text should be used to replace the template text.
     */
    private async _getReplacerSlotValues(selectedConfigItem: IConfigItem): Promise<IReplacer[]> {
        const stringReplacers: (string | IReplacerSlotQuestion)[] = selectedConfigItem.stringReplacers ?? [];
        const replacerQuestions: any[] = stringReplacers.map((item: string | IReplacerSlotQuestion) => {
            return {
                type: 'input',
                name: StringUtility.isString(item) ? item : item.slot,
                message: StringUtility.isString(item) ? `Replace ${item} with` : item.question,
                validate: (replacerSlotValue: string) => {
                    const isValid: boolean = Boolean(replacerSlotValue.trim());

                    return isValid || 'You must provide an answer.';
                },
            };
        });

        const answer: {[replacer: string]: string} = await enquirer.prompt(replacerQuestions);

        const replacers: IReplacer[] = Object.entries(answer).map(
            ([key, value]: [string, string]): IReplacer => {
                return {
                    slot: key,
                    slotValue: value,
                };
            }
        );
        const dynamicReplacers: IReplacer[] = selectedConfigItem.dynamicReplacers || [];

        return [...replacers, ...dynamicReplacers];
    }

    /**
     * Create every variation for the for the replacement keys
     */
    private _getReplacers(replacers: IReplacer[], defaultCase: CaseConverterEnum): IReplacer[] {
        const caseTypes: string[] = Object.values(CaseConverterEnum);

        return replacers.reduce((previousReplacers: IReplacer[], answeredReplacer: IReplacer): IReplacer[] => {
            const {slot, slotValue} = answeredReplacer;

            return [
                ...previousReplacers,
                ...caseTypes.map(
                    (caseType: string): IReplacer => {
                        return {
                            slot: `${slot}${caseType}`,
                            slotValue: StringUtility.toCase(slotValue, caseType as CaseConverterEnum),
                        };
                    }
                ),
                {
                    slot,
                    slotValue: StringUtility.toCase(slotValue, defaultCase),
                },
            ];
        }, []);
    }

    /**
     */
    private async _getOutputPath(outputPathReplacers: IReplacer[], selectedConfigItem: IConfigItem): Promise<string> {
        // Create the output path replacing any template keys.
        const outputPathFormatted: string = outputPathReplacers.reduce((outputPath: string, replacer: IReplacer) => {
            return replaceString(outputPath, replacer.slot, replacer.slotValue);
        }, selectedConfigItem.output.path);

        if (GenerateTemplateFiles.isCommandLine) {
            const outputPath = yargs.argv.outputpath as string | undefined;

            return outputPath ?? outputPathFormatted;
        }

        const outputPathAnswer: any = await enquirer.prompt({
            type: 'input',
            name: 'outputPath',
            message: 'Output path:',
            initial: outputPathFormatted,
        });

        return outputPathAnswer.outputPath;
    }

    /**
     */
    private async _shouldWriteFiles(outputPath: string): Promise<boolean> {
        const doesPathExist: boolean = await pathExists(outputPath);

        if (doesPathExist === false) {
            return true;
        }

        const overwriteFilesAnswer: any = await enquirer.prompt({
            name: 'overwrite',
            message: 'Overwrite files, continue?',
            type: 'confirm',
            default: false,
        });

        return overwriteFilesAnswer.overwrite;
    }

    /**
     * Process and copy files.
     */
    private async _createFiles(
        answeredReplacer: IReplacer[],
        outputPathReplacers: IReplacer[],
        replacers: IReplacer[],
        outputPath: string,
        entryFolderPath: string
    ): Promise<string[]> {
        const outputtedFilesAndFolders: string[] = [];

        const recursiveCopyOptions: any = {
            overwrite: true,
            expand: false,
            dot: true,
            junk: true,
            rename: (fileFolderPath: string): string => {
                const fileOrFolder: string = answeredReplacer.reduce((path: string) => {
                    let formattedFilePath: string = path;

                    outputPathReplacers.forEach((replacer: IReplacer) => {
                        formattedFilePath = replaceString(formattedFilePath, replacer.slot, replacer.slotValue);
                    });

                    return formattedFilePath;
                }, fileFolderPath);

                outputtedFilesAndFolders.push(fileOrFolder);

                return fileOrFolder;
            },
            transform: (src: string, dest: string, stats: unknown) => {
                return through((chunk: any, enc: any, done: any) => {
                    let output: string = chunk.toString();

                    replacers.forEach((replacer: IReplacer) => {
                        output = replaceString(output, replacer.slot, replacer.slotValue);
                    });

                    done(null, output);
                });
            },
        };

        try {
            await recursiveCopy(entryFolderPath, outputPath, recursiveCopyOptions);

            console.info(`Files saved to: '${outputPath}'`);

            return outputtedFilesAndFolders.filter(Boolean);
        } catch (error) {
            console.error(`Copy failed: ${error}`);

            return [`Copy failed: ${error}`];
        }
    }

    /**
     */
    private _onComplete(selectedConfigItem: IConfigItem, outputPath: string, outputtedFilesAndFolders: string[], stringReplacers: IReplacer[]): void {
        const files: string[] = outputtedFilesAndFolders.filter((path: string) => path.includes('.'));

        if (typeof selectedConfigItem.onComplete === 'function') {
            const results: IResults = {
                output: {
                    path: outputPath,
                    files: files.map((file: string) => `${outputPath}/${file}`),
                },
                stringReplacers,
            };

            selectedConfigItem.onComplete(results);
        }
    }
}
