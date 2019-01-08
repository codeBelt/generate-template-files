import * as inquirer from 'inquirer';
import recursiveCopy from 'recursive-copy';
import through from 'through2';
import replaceString from 'replace-string';
import logSymbols from 'log-symbols';
import StringUtil from './StringUtility';
import StringUtility from './StringUtility';
import CaseEnum from './CaseEnum';
import get from 'lodash/get';

interface IConfigItem {
    option: string;
    templatesPath: string;
    outputPath: string;
    defaultCase: string;
    stringReplacers: string[];
    caseTypes: {
        default: CaseEnum;
        fileNames: CaseEnum;
        // custom: {[replacer: string]: (str: string) => string}
    }
}

interface IReplacer {
    readonly replacerKey: string;
    readonly replacerValue: string;
}

const generateTemplateFiles = async (options: IConfigItem[]): Promise<void> => {
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
            }}),
        default: 'none',
        type: 'list'
    };

    const templateAnswers: {questionIndex: number} = await inquirer.prompt(templateQuestions);
    const selectedItem: IConfigItem = options[templateAnswers.questionIndex];
    const defaultCase: CaseEnum = get(selectedItem, 'caseTypes.default', CaseEnum.None);

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
            }
        }
    });

    const replacerAnswers: {[replacer: string]: string} = await inquirer.prompt(replacerQuestions);

    // console.log(`selectedItem`, selectedItem.caseTypes.custom['(something)']('ccccc'));
    /*
     * Create every variation for the for the replacement keys
     */
    const caseTypes: string[] = Object.values(CaseEnum);
    const replacers: IReplacer[] = Object.entries(replacerAnswers)
        .reduce((previousReplacers: IReplacer[], [key, value]: [string, string]): IReplacer[] => {
            return [
                ...previousReplacers,
                ...caseTypes.map((caseType: string) => {
                    return {
                        replacerKey: `${key}${caseType}`,
                        replacerValue: StringUtility.toCase(value, caseType as CaseEnum),
                    }
                }),
                {
                    replacerKey: key,
                    replacerValue: StringUtility.toCase(value, defaultCase),
                },
            ];
        }, []);


    // Create the output path replacing any template keys.
    const outputPath: string = replacers.reduce((outputPath: string, replacer: IReplacer) => {
        return replaceString(outputPath, replacer.replacerKey, replacer.replacerValue);
    }, selectedItem.outputPath);

    const outputPathAnswer: any = await inquirer.prompt({
        name: 'outputPath',
        message: `Output path (${outputPath}):`,
        default: (answer: any) => {
            return outputPath;
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
        rename: (filePath: string): string => {
            return Object.entries(replacerAnswers).reduce((path: string, [key, value]: [string, string]) => {
                const fileNamesCase: CaseEnum = get(selectedItem, 'caseTypes.fileNames', defaultCase);
                const nameFormatted: string = StringUtil.toCase(value, fileNamesCase);

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
        await recursiveCopy(selectedItem.templatesPath, outputPathAnswer.outputPath, recursiveCopyOptions);

        console.log(`${logSymbols.info}  Files outed to: '${outputPathAnswer.outputPath}'`);
    } catch (error) {
        console.error(`${logSymbols.error}  Copy failed: ${error}`);
    }
};

export default generateTemplateFiles;
