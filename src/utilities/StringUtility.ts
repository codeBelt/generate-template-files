import CaseConverterEnum from '../constants/CaseConverterEnum';

/**
 * Utility class to convert the case type of strings.
 */
export default class StringUtility {
  /**
   * Helper method for {@link CaseConverterEnum} to convert text into the proper case.
   *
   * ```
   * StringUtility.toCase('livesDown_by-the.River', CaseConverterEnum.PascalCase);
   * // 'LivesDownByTheRiver'
   * ```
   */
  public static toCase(str: string, caseType: CaseConverterEnum): string {
    switch (caseType) {
      case CaseConverterEnum.CamelCase:
      case CaseConverterEnum.CamelCaseUnderscore:
        return StringUtility.toCamelCase(str);
      case CaseConverterEnum.ConstantCase:
      case CaseConverterEnum.ConstantCaseUnderscore:
        return StringUtility.toConstantCase(str);
      case CaseConverterEnum.DotCase:
      case CaseConverterEnum.DotCaseUnderscore:
        return StringUtility.toSentence(str, '.');
      case CaseConverterEnum.KebabCase:
      case CaseConverterEnum.KebabCaseUnderscore:
        return StringUtility.toSentence(str, '-');
      case CaseConverterEnum.LowerCase:
      case CaseConverterEnum.LowerCaseUnderscore:
        return StringUtility.toSentence(str, '');
      case CaseConverterEnum.PascalCase:
      case CaseConverterEnum.PascalCaseUnderscore:
        return StringUtility.toPascalCase(str);
      case CaseConverterEnum.PathCase:
      case CaseConverterEnum.PathCaseUnderscore:
        return StringUtility.toSentence(str, '/');
      case CaseConverterEnum.SentenceCase:
      case CaseConverterEnum.SentenceCaseUnderscore:
        return StringUtility.toSentenceCase(str);
      case CaseConverterEnum.SnakeCase:
      case CaseConverterEnum.SnakeCaseUnderscore:
        return StringUtility.toSentence(str, '_');
      case CaseConverterEnum.TitleCase:
      case CaseConverterEnum.TitleCaseUnderscore:
        return StringUtility.toTitleCase(str);
      case CaseConverterEnum.None:
      case CaseConverterEnum.NoneUnderscore:
      default:
        return str;
    }
  }

  /**
   * Converts a string to a sentence case string.
   *
   * ```
   * StringUtility.toSentence('livesDown_by-the.River');
   * // 'lives down by the river'
   *
   * StringUtility.toSentence('livesDown_by-the.River', '-');
   * // 'lives-down-by-the-river'
   *
   * StringUtility.toSentence('livesDown_by-the.River', '_');
   * // 'lives_down_by_the_river'
   *
   * StringUtility.toSentence('livesDown_by-the.River', '/');
   * // 'lives/down/by/the/river'
   * ```
   */
  public static toSentence(str: string, separator: string = ' '): string {
    return (
      String(str)
        // Add a space after any digits.
        .replace(/(\d+)/g, ' $1 ')
        // Add a space before any upper case characters.
        .replace(/([a-z](?=[A-Z]))/g, '$1 ')
        // Remove all non-word characters and replace with a single space.
        .replace(/[^a-zA-Z0-9 ]/g, ' ')
        // Replace multiple Spaces with a single space.
        .replace(/\s+/g, ' ')
        // Trim whitespace around the string.
        .replace(/^ | $/g, '')
        // Lower case the entire string.
        .toLowerCase()
        // If a separator is passed in then replace the space with it.
        .replace(/\s+/g, separator)
    );
  }

  /**
   * Converts a string to a camel case string.
   *
   * ```
   * StringUtility.toCamelCase('livesDown_by-the.River');
   * // 'livesDownByTheRiver'
   * ```
   */
  public static toCamelCase(str: string): string {
    return (
      StringUtility.toSentence(str)
        // Replace spaces between words with a string upper cased character.
        .replace(/ (\w)/g, (_: unknown, $1: string) => {
          return $1.toUpperCase();
        })
    );
  }

  /**
   * Converts a hyphen string to a pascal case string.
   *
   * ```
   * StringUtility.toPascalCase('livesDown_by-the.River');
   * // 'LivesDownByTheRiver'
   * ```
   */
  public static toPascalCase(str: string): string {
    return (
      StringUtility.toCamelCase(str)
        // Make first character uppercase.
        .replace(/^[a-zA-Z]/, (a: string, b: unknown, c: unknown) => {
          return a.toUpperCase();
        })
    );
  }

  /**
   * Converts a string to a constant case string.
   *
   * ```
   * StringUtility.toConstantCase('livesDown_by-the.River');
   * // 'LIVES_DOWN_BY_THE_RIVER'
   * ```
   */
  public static toConstantCase(str: string): string {
    return StringUtility.toSentence(str, '_').toUpperCase();
  }

  /**
   * Converts a string to a title case string.
   *
   * ```
   * StringUtility.toTitleCase('livesDown_by-the.River');
   * // 'Lives Down By The River'
   * ```
   */
  public static toTitleCase(str: string): string {
    return StringUtility.toSentence(str).replace(/\w\S*/g, (txt: string) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  /**
   * Converts a string to a sentence case string.
   *
   * ```
   * StringUtility.toSentenceCase('livesDown_by-the.River');
   * // 'Lives down by the river'
   * ```
   */
  public static toSentenceCase(str: string): string {
    const sentence: string = StringUtility.toSentence(str);

    return sentence.charAt(0).toUpperCase() + sentence.substr(1).toLowerCase();
  }

  /**
   * Determines if the value is a string value
   *
   * ```
   * StringUtility.isString('livesDown_by-the.River');
   * // true
   * ```
   */
  public static isString(value: unknown): value is string {
    return typeof value === 'string';
  }
}
