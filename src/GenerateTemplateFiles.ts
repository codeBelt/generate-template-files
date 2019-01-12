import * as inquirer from 'inquirer';
import recursiveCopy from 'recursive-copy';
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
    public async generate(options: IConfigItem[]): Promise<void> {
        const selectedConfigItem: IConfigItem = await this._getSelectedItem(options);
        const answeredReplacers: IReplacer[] = await this._getReplacerSlotValues(selectedConfigItem);
        const {contentCase, outputPathCase} = this._getDefaultCaseConverters(selectedConfigItem);
        const contentReplacers: IReplacer[] = this._getReplacers(answeredReplacers, contentCase);
        const outputPathReplacers: IReplacer[] = this._getReplacers(answeredReplacers, outputPathCase);
        const outputPath: string = await this._getOutputPath(outputPathReplacers, selectedConfigItem);

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
     * Ask what template options the user wants to use
     *
     * @param options
     * @private
     */
    private async _getSelectedItem(options: IConfigItem[]): Promise<IConfigItem> {
        const templateQuestions: any = {
            name: 'questionIndex',
            message: 'What do you want to generate?',
            choices: options.map((configItem: IConfigItem, index: number) => {
                return {
                    name: configItem.option,
                    value: index,
                };
            }),
            default: 'none',
            type: 'list',
        };
        const templateAnswers: {questionIndex: number} = await inquirer.prompt(templateQuestions);

        return options[templateAnswers.questionIndex];
    }

    /**
     *
     * @param selectedConfigItem
     * @private
     */
    private _getDefaultCaseConverters(selectedConfigItem: IConfigItem): IDefaultCaseConverter {
        const defaultContentCase: CaseConverterEnum = get(selectedConfigItem, 'defaultCase', CaseConverterEnum.None);
        const defaultOutputPath: CaseConverterEnum = get(selectedConfigItem, 'output.pathAndFileNameDefaultCase', defaultContentCase);

        return {
            contentCase: defaultContentCase,
            outputPathCase: defaultOutputPath,
        };
    }

    /**
     * New question asking what should text should be used to replace the template text.
     *
     * @param selectedConfigItem
     * @private
     */
    private async _getReplacerSlotValues(selectedConfigItem: IConfigItem): Promise<IReplacer[]> {
        const replacerQuestions: any[] = selectedConfigItem.stringReplacers.map((str: string) => {
            return {
                name: str,
                message: `Replace ${str} with:`,
                validate: (replacerSlotValue: string) => {
                    const isValid: boolean = Boolean(replacerSlotValue);

                    return isValid || 'You must provide an answer.';
                },
            };
        });

        const answer: {[replacer: string]: string} = await inquirer.prompt(replacerQuestions);

        CheckUtility.check(Object.keys(answer).length > 0, '"stringReplacers" needs at least one item.');

        return Object.entries(answer).map(
            ([key, value]: [string, string]): IReplacer => {
                return {
                    slot: key,
                    slotValue: value,
                };
            }
        );
    }

    /**
     * Create every variation for the for the replacement keys
     *
     * @param replacers
     * @param defaultCase
     * @private
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
     *
     * @param outputPathReplacers
     * @param selectedConfigItem
     * @private
     */
    private async _getOutputPath(outputPathReplacers: IReplacer[], selectedConfigItem: IConfigItem): Promise<string> {
        // Create the output path replacing any template keys.
        const outputPathFormatted: string = outputPathReplacers.reduce((outputPath: string, replacer: IReplacer) => {
            return replaceString(outputPath, replacer.slot, replacer.slotValue);
        }, selectedConfigItem.output.path);

        const outputPathAnswer: any = await inquirer.prompt({
            name: 'outputPath',
            message: `Output path (${outputPathFormatted}):`,
            default: (answer: unknown) => {
                return outputPathFormatted;
            },
        });

        return outputPathAnswer.outputPath;
    }

    /**
     * Process and copy files.
     *
     * @param replacerKeyValue
     * @param outputPathReplacers
     * @param replacers
     * @param outputPath
     * @param entryFolderPath
     * @private
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
            overwrite: false,
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

    private _onComplete(selectedConfigItem: IConfigItem, outputPath: string, outputtedFilesAndFolders: string[], stringReplacers: IReplacer[]): void {
        if (typeof selectedConfigItem.onComplete === 'function') {
            const results: IResults = {
                output: {
                    path: outputPath,
                    outputtedFilesAndFolders,
                },
                stringReplacers,
            };

            selectedConfigItem.onComplete(results);
        }
    }
}
