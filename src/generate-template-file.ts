import * as inquirer from 'inquirer';
import recursiveCopy from 'recursive-copy';
import through from 'through2';
import replaceString from 'replace-string';
import StringUtil from './StringUtility';
import CaseEnum from './CaseEnum';
import StringUtility from './StringUtility';

interface IConfigItem {
    option: string;
    templatesPath: string;
    outputPath: string;
    defaultCase: string;
    stringReplacers: string[];
    caseTypes: {
        default: CaseEnum;
        fileNames: CaseEnum;
    }
}

interface IReplacer {
    readonly replacerKey: string;
    readonly replacerValue: string;
}

export default async (options: IConfigItem[]): Promise<void> => {
    const questions: any = {
        name: 'questionIndex',
        message: 'What do you want to generate?',
        choices: options.map((configItem: IConfigItem, index: number) => {
            return {
                name: configItem.option,
                value: index,
            }}),
        default: 'none',
        type: 'list'
    };

    const optionAnswer: {questionIndex: number} = await inquirer.prompt(questions);
    const selectedItem: IConfigItem = options[optionAnswer.questionIndex];
    const newQuestions: any[] = selectedItem.stringReplacers.map((str: string) => {
        return {
            name: str,
            message: `Replace ${str} with:`,
            validate: (answer: string) => {
                const isValid: boolean = Boolean(answer);

                return isValid || 'You must provide an answer.';
            }
        }
    });

    const results: {[replacer: string]: string} = await inquirer.prompt(newQuestions);
    const list: string[] = Object.values(CaseEnum);
    const replacers: IReplacer[] = Object.entries(results)
        .reduce((all: IReplacer[], [key, value]: [string, string]): IReplacer[] => {
            return [
                ...all,
                ...list.map((caseType: string) => {
                    return {
                        replacerKey: `${key}${caseType}`,
                        replacerValue: StringUtility.toCase(value, caseType as CaseEnum),
                    }
                }),
                {
                    replacerKey: key,
                    replacerValue: StringUtility.toCase(value, selectedItem.caseTypes.default),
                },
            ];
        }, []);

    const recursiveCopyOptions: any = {
        overwrite: false,
        expand: false,
        dot: true,
        junk: true,
        rename: (filePath: string): string => {
            return Object.entries(results).reduce((path: string, [key, value]: [string, string]) => {
                const nameFormatted: string = StringUtil.toCase(value, selectedItem.caseTypes.fileNames);

                return replaceString(path, key, nameFormatted);
            }, filePath);
        },
        transform: (src: string, dest: string, stats: any) => {
            return through((chunk: any, enc: any, done: any) => {
                let output: string = chunk.toString();

                replacers.forEach((dd: IReplacer) => {
                    output = replaceString(output, dd.replacerKey, dd.replacerValue);
                });

                done(null, output);
            });
        }
    };

    try {
        let outputPath: string = selectedItem.outputPath;

        replacers.forEach((replacer: IReplacer) => {
            outputPath = replaceString(outputPath, replacer.replacerKey, replacer.replacerValue);
        });

        await recursiveCopy(selectedItem.templatesPath, outputPath, recursiveCopyOptions);
    } catch (error) {
        console.error(`Copy failed: ${error}`);
    }
}
