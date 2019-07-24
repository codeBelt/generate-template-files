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

export default class GenerateTemplateFiles {
    /**
     * Main method to create your template files. Accepts an array of `IConfigItem` items.
     */
    public async generate(options: IConfigItem[]): Promise<void> {
        const selectedConfigItem: IConfigItem = await this._getSelectedItem(options);
        const answeredReplacers: IReplacer[] = await this._getReplacerSlotValues(selectedConfigItem);
        const {contentCase, outputPathCase} = this._getDefaultCaseConverters(selectedConfigItem);
        const contentReplacers: IReplacer[] = this._getReplacers(answeredReplacers, contentCase);
        const outputPathReplacers: IReplacer[] = this._getReplacers(answeredReplacers, outputPathCase);
        const outputPath: string = await this._getOutputPath(outputPathReplacers, selectedConfigItem);
        const shouldWriteFiles: boolean = await this._shouldWriteFiles(outputPath);

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
     * Method to create all template files from `IConfigItem` items array at once,
     * rather than allowing the user to select and process only a single option.
     * Accepts an array of `IConfigItem` items.
     */
    public async generateAll(options: IConfigItem[]): Promise<void> {
        const BRIGHT_CYAN_ANSI_CODE = '\x1b[1m\x1b[36m%s\x1b[0m';
        const GREEN_ANSI_CODE = '\x1b[32m%s\x1b[0m';

        const seedOption = options[0];

        /* Only get these values once - use them to seed the rest of the template options */
        const answeredReplacers: IReplacer[] = await this._getReplacerSlotValues(seedOption);
        const {contentCase, outputPathCase} = this._getDefaultCaseConverters(seedOption);
        const contentReplacers: IReplacer[] = this._getReplacers(answeredReplacers, contentCase);
        const outputPathReplacers: IReplacer[] = this._getReplacers(answeredReplacers, outputPathCase);

        let i = 1;
        for (const option of options) {
            console.log(BRIGHT_CYAN_ANSI_CODE, `Processing ${i} of ${options.length}: ${option.option}`);
            const outputPath: string = await this._getOutputPath(outputPathReplacers, option);
            const shouldWriteFiles: boolean = await this._shouldWriteFiles(outputPath);

            if (shouldWriteFiles === false) {
                console.info('No new files created');

                break;
            }

            const outputtedFilesAndFolders: string[] = await this._createFiles(
                answeredReplacers,
                outputPathReplacers,
                contentReplacers,
                outputPath,
                option.entry.folderPath
            );

            this._onComplete(option, outputPath, outputtedFilesAndFolders, answeredReplacers);
            i += 1;
        }

        console.log(GREEN_ANSI_CODE, '...Done!');
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
        const replacerQuestions: any[] = selectedConfigItem.stringReplacers.map((str: string) => {
            return {
                type: 'input',
                name: str,
                message: `Replace ${str} with:`,
                validate: (replacerSlotValue: string) => {
                    const isValid: boolean = Boolean(replacerSlotValue.trim());

                    return isValid || 'You must provide an answer.';
                },
            };
        });

        const answer: {[replacer: string]: string} = await enquirer.prompt(replacerQuestions);

        CheckUtility.check(Object.keys(answer).length > 0, '"stringReplacers" needs at least one item.');

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
