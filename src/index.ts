import * as inquirer from 'inquirer';
import recursiveCopy from 'recursive-copy';
import through from 'through2';
import replaceString from 'replace-string';
import StringUtility from './StringUtility';
import CaseEnum from './CaseEnum';
import get from 'lodash.get';

interface IConfigItem {
    option: string;
    defaultCase: CaseEnum;
    entry: {
        folderPath: string;
    };
    stringReplacers: string[];
    output: {
        path: string;
        pathAndFileNameDefaultCase: CaseEnum;
    };
    onComplete?: (data: any) => void | null;
}

interface IReplacer {
    readonly replacerKey: string;
    readonly replacerValue: string;
}

async function generateTemplateFiles(options: IConfigItem[]): Promise<void> {
    /*
     * Ask what template options the user wants to use
     */
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
    const selectedItem: IConfigItem = options[templateAnswers.questionIndex];
    const defaultCase: CaseEnum = get(selectedItem, 'defaultCase', CaseEnum.None);
    const defaultOutputPath: CaseEnum = get(selectedItem, 'output.pathAndFileNameDefaultCase', defaultCase);

    /*
     * New question asking what should text should be used to replace the template text.
     */
    const replacerQuestions: any[] = selectedItem.stringReplacers.map((str: string) => {
        return {
            name: str,
            message: `Replace ${str} with:`,
            validate: (answer: string) => {
                const isValid: boolean = Boolean(answer);

                return isValid || 'You must provide an answer.';
            },
        };
    });

    const replacerAnswers: {[replacer: string]: string} = await inquirer.prompt(replacerQuestions);
    console.log(`replacerAnswers`, replacerAnswers);
    // console.log(`selectedItem`, selectedItem.caseTypes.custom['(something)']('ccccc'));

    /*
     * Create every variation for the for the replacement keys
     */
    const caseTypes: string[] = Object.values(CaseEnum);
    const replacers: IReplacer[] = Object.entries(replacerAnswers).reduce(
        (previousReplacers: IReplacer[], [key, value]: [string, string]): IReplacer[] => {
            return [
                ...previousReplacers,
                ...caseTypes.map((caseType: string) => {
                    return {
                        replacerKey: `${key}${caseType}`,
                        replacerValue: StringUtility.toCase(value, caseType as CaseEnum),
                    };
                }),
                {
                    replacerKey: key,
                    replacerValue: StringUtility.toCase(value, defaultCase),
                },
            ];
        },
        []
    );
    const outputPathReplacers: IReplacer[] = Object.entries(replacerAnswers).reduce(
        (list: IReplacer[], [key, value]: [string, string]) => {
            const index: number = list.findIndex((item: IReplacer) => item.replacerKey === key);

            list[index] = {
                replacerKey: key,
                replacerValue: StringUtility.toCase(value, defaultOutputPath),
            };

            return list;
        },
        [...replacers]
    );

    // Create the output path replacing any template keys.
    const outputPathFormatted: string = outputPathReplacers.reduce((outputPath: string, replacer: IReplacer) => {
        return replaceString(outputPath, replacer.replacerKey, replacer.replacerValue);
    }, selectedItem.output.path);

    const outputPathAnswer: any = await inquirer.prompt({
        name: 'outputPath',
        message: `Output path (${outputPathFormatted}):`,
        default: (answer: any) => {
            return outputPathFormatted;
        },
    });

    /*
     * Process and copy files.
     */
    const recursiveCopyOptions: any = {
        overwrite: false,
        expand: false,
        dot: true,
        junk: true,
        rename: (outputPath: string): string => {
            return Object.entries(replacerAnswers).reduce((path: string, [key, value]: [string, string]) => {
                let formattedFilePath: string = path;

                outputPathReplacers.forEach((replacer: IReplacer) => {
                    formattedFilePath = replaceString(formattedFilePath, replacer.replacerKey, replacer.replacerValue);
                });

                return formattedFilePath;
            }, outputPath);
        },
        transform: (src: string, dest: string, stats: any) => {
            return through((chunk: any, enc: any, done: any) => {
                let output: string = chunk.toString();

                replacers.forEach((replacer: IReplacer) => {
                    output = replaceString(output, replacer.replacerKey, replacer.replacerValue);
                });

                done(null, output);
            });
        },
    };

    try {
        await recursiveCopy(selectedItem.entry.folderPath, outputPathAnswer.outputPath, recursiveCopyOptions);

        if (typeof selectedItem.onComplete === 'function') {
            const thing: any = {
                output: {
                    path: outputPathAnswer.outputPat,
                },
                stringReplacers: {
                    ...replacerAnswers,
                },
            };

            selectedItem.onComplete(thing);
        }

        console.info(`Files outed to: '${outputPathAnswer.outputPath}'`);
    } catch (error) {
        console.error(`Copy failed: ${error}`);
    }
}

export default generateTemplateFiles;
