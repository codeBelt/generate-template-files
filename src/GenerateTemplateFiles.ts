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
import IReplacerSlotQuestion from './models/IReplacerSlotQuestion';
import IMainParams from './models/IMainParams';
import CheckUtility from './utilities/CheckUtility';
import {EMode} from './enums/EMode.enum';

export default class GenerateTemplateFiles {
    private mode: EMode = EMode.prompt;

    /**
     * Main method to create your template files. Accepts an array of `IConfigItem` items and
     */
    public async generate(options: IConfigItem[], commandLineArgs: string[]): Promise<void> {
        if (commandLineArgs.length) {
            this.mode = EMode.commandLine;
        }

        let selectedConfigItem: IConfigItem,
            answeredReplacers: IReplacer[],
            outputPathReplacers: IReplacer[],
            contentReplacers: IReplacer[],
            outputPath: string,
            shouldWriteFiles: boolean,
            forceWrite: boolean | undefined;

        try {
            ({selectedConfigItem, answeredReplacers, outputPathReplacers, contentReplacers, outputPath, forceWrite} =
                this.mode === EMode.prompt ? await this._promptMode(options) : await this._commandLineMode(options, commandLineArgs));

            shouldWriteFiles = await this._shouldWriteFiles(outputPath, forceWrite);
        } catch (err) {
            console.error(err.message ? err.message : 'An error has occured');

            return;
        }

        if (shouldWriteFiles === false) {
            console.info('No new files created');

            return;
        }

        const outputtedFilesAndFolders: string[] = await this._createFiles(
            answeredReplacers,
            outputPathReplacers,
            contentReplacers,
            outputPath,
            selectedConfigItem.entry.folderPath
        );

        this._onComplete(selectedConfigItem, outputPath, outputtedFilesAndFolders, answeredReplacers);
    }

    /**
     */
    private async _promptMode(configItems: IConfigItem[]): Promise<IMainParams> {
        const selectedConfigItem: IConfigItem = await this._getSelectedItem(configItems);
        const answeredReplacers: IReplacer[] = await this._getReplacerSlotValues(selectedConfigItem);
        const {contentCase, outputPathCase} = this._getDefaultCaseConverters(selectedConfigItem);
        const contentReplacers: IReplacer[] = this._getReplacers(answeredReplacers, contentCase);
        const outputPathReplacers: IReplacer[] = this._getReplacers(answeredReplacers, outputPathCase);
        const outputPath: string = await this._getOutputPath(outputPathReplacers, selectedConfigItem);

        return {selectedConfigItem, answeredReplacers, contentReplacers, outputPathReplacers, outputPath};
    }

    /**
     */
    private async _commandLineMode(configItems: IConfigItem[], commandLineArgs: string[]): Promise<IMainParams> {
        const aliases: string[] = configItems.map((configItem: IConfigItem) => configItem.alias);
        const aliasFromArgs: string = commandLineArgs.shift() as string;
        const index: number = aliases.findIndex((alias: string) => alias === aliasFromArgs);
        if (index === -1) {
            throw new Error(`${aliasFromArgs} does not match with any alias of your configs`);
        }

        const selectedConfigItem: IConfigItem = configItems[index];
        const {replacers, forceWrite, outputPathArg} = this._commandLineArgsParser(selectedConfigItem, commandLineArgs);
        const {contentCase, outputPathCase} = this._getDefaultCaseConverters(selectedConfigItem);
        const contentReplacers: IReplacer[] = this._getReplacers(replacers, contentCase);
        const outputPathReplacers: IReplacer[] = this._getReplacers(replacers, outputPathCase);
        const outputPath: string = outputPathArg ? outputPathArg : await this._getOutputPath(outputPathReplacers, selectedConfigItem);

        return {selectedConfigItem, answeredReplacers: replacers, contentReplacers, outputPathReplacers, outputPath, forceWrite};
    }

    /**
     */
    private _commandLineArgsParser(
        selectedConfigItem: IConfigItem,
        args: string[]
    ): {replacers: IReplacer[]; forceWrite: boolean; outputPathArg?: string} {
        const stringReplacers: {[key: string]: string} = {};
        let forceWrite: boolean = false;
        let outputPath: string | undefined = undefined;

        args.forEach((arg: string) => {
            if (arg === '--force' || arg === '-f') {
                forceWrite = true;
            } else {
                const [option, value]: [string, string] = arg.split('=') as [string, string];
                if (!option || !value) {
                    throw new Error(`${arg} is not well formatted`);
                }
                if (option === 'outputpath') {
                    outputPath = value;
                } else {
                    if (!selectedConfigItem.stringReplacers?.length) {
                        throw new Error(`Too much arguments`);
                    }
                    const test = selectedConfigItem.stringReplacers.some((item: string | IReplacerSlotQuestion) => {
                        if (typeof item === 'string') {
                            return item === option;
                        }
                        return item.slot === option;
                    });
                    if (!test) {
                        throw new Error(`${option} is not a valid string replacer from ${selectedConfigItem.option} config`);
                    }
                    if (stringReplacers[option]) {
                        throw new Error(`The ${option} string replacer is already defined`);
                    }
                    stringReplacers[option] = value;
                }
            }
        });

        const replacers: IReplacer[] = Object.keys(stringReplacers).map((key: string) => ({
            slot: key,
            slotValue: stringReplacers[key],
        }));

        if (replacers.length !== (selectedConfigItem.stringReplacers as (string | IReplacerSlotQuestion)[]).length) {
            throw new Error('At least one string replacer is missing');
        }

        const dynamicReplacers: IReplacer[] = selectedConfigItem.dynamicReplacers || [];

        const hasStringOrDynamicReplacers: boolean = replacers.length > 0 || dynamicReplacers.length > 0;

        CheckUtility.check(hasStringOrDynamicReplacers, '"stringReplacers" or "dynamicReplacers" needs at least one item.');

        return {
            replacers: [...replacers, ...dynamicReplacers],
            forceWrite,
            outputPathArg: outputPath,
        };
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
            suggest(input: string, choices: any[]) {
                return choices.filter((choice: any) => (choice.message as string).toLowerCase().includes(input.toLowerCase()));
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

        const hasStringOrDynamicReplacers: boolean = stringReplacers.length > 0 || dynamicReplacers.length > 0;

        CheckUtility.check(hasStringOrDynamicReplacers, '"stringReplacers" or "dynamicReplacers" needs at least one item.');

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

        if (this.mode === EMode.prompt) {
            const outputPathAnswer: any = await enquirer.prompt({
                type: 'input',
                name: 'outputPath',
                message: 'Output path:',
                initial: outputPathFormatted,
            });
            return outputPathAnswer.outputPath;
        }
        return outputPathFormatted;
    }

    /**
     */
    private async _shouldWriteFiles(outputPath: string, forceWrite?: boolean): Promise<boolean> {
        const doesPathExist: boolean = await pathExists(outputPath);

        if (doesPathExist === false) {
            return true;
        }

        if (this.mode === EMode.prompt) {
            const overwriteFilesAnswer: any = await enquirer.prompt({
                name: 'overwrite',
                message: 'Overwrite files, continue?',
                type: 'confirm',
                default: false,
            });

            return overwriteFilesAnswer.overwrite;
        }

        if (!forceWrite) {
            console.info('Use --force option to overwrite existing files');
        }

        return !!forceWrite;
    }

    /**
     * Process and copy files.
     */
    private async _createFiles(
        answeredReplacers: IReplacer[],
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
                const fileOrFolder: string = answeredReplacers.reduce((path: string) => {
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

            console.info(`Files outed to: '${outputPath}'`);

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
