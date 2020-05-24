import CaseConverterEnum from '../constants/CaseConverterEnum';
import IResults from './IResults';
import IReplacer from './IReplacer';
import IReplacerSlotQuestion from './IReplacerSlotQuestion';

/**
 * ```
 * {
 *     option: 'Create Redux Store',
 *     defaultCase: '(pascalCase)',
 *     entry: {
 *         folderPath: './tools/templates/react/redux-store/',
 *     },
 *     stringReplacers: ['__store__', '__model__'],
 *     output: {
 *         path: './src/stores/__store__(lowerCase)',
 *         pathAndFileNameDefaultCase: '(kebabCase)',
 *     },
 *     onComplete: (results) => {
 *         console.log(`results`, results);
 *     },
 * }
 * ```
 */
export default interface IConfigItem {
  /**
   * The name of the option to choose when asked
   *
   * ```
   * option: 'Some Option Name',
   * ```
   */
  option: string;
  /**
   * The default [Case Converters](#case-converters) to use with the [Replacer Slots](#replacer-slots) in the template files or path/file name. Default is `(noCase)`.
   *
   * ```
   * defaultCase: '(pascalCase)',
   * ```
   */
  defaultCase: CaseConverterEnum;
  /**
   * ```
   * entry: {
   *     folderPath: './folder/to/templates/',
   * },
   * ```
   */
  entry: {
    folderPath: string;
  };
  /**
   * ```
   * stringReplacers: ['__store__', '__model__'],
   * ```
   */
  stringReplacers?: (string | IReplacerSlotQuestion)[];
  /**
   * ```
   * dynamicReplacers: [{slot:'__description__', slotValue: config.description}],
   * ```
   */
  dynamicReplacers?: IReplacer[];
  /**
   * ```
   * output: {
   *     path: './src/stores/__store__(lowerCase)',
   *     pathAndFileNameDefaultCase: '(kebabCase)',
   * },
   * ```
   */
  output: {
    path: string;
    pathAndFileNameDefaultCase?: CaseConverterEnum;
    overwrite?: boolean; // determines if existing files with the same name be over written.
  };
  /**
   * ```
   * onComplete: (results) => {
   *     console.log(`results`, results);
   * },
   * ```
   */
  onComplete?: (results: IResults) => void;
}
