enum CaseConverterEnum {
  /**
   *
   * [Case Converter](../index.html#case-converters) that does **not** convert [Replacer Slots](../index.html#replacer-slots). The text entered in will not be changed.
   *
   *  ```
   * // If you entered "Lives down BY the River" for __replacerSlot__
   * __replacerSlot__(noCase) OR __replacerSlot__NoCase__
   *
   * // It would output to:
   * Lives down BY the River
   * ```
   *
   * Usage:
   *
   * ```
   * CaseConverterEnum.None;
   * ```
   */
  None = '(noCase)',
  NoneUnderscore = 'NoCase__',
  /**
   * [Case Converter](../index.html#case-converters) that converts [Replacer Slots](../index.html#replacer-slots) to camel case.
   *
   *  ```
   * // If you entered "Lives down BY the River" for __replacerSlot__
   * __replacerSlot__(camelCase) OR __replacerSlot__CamelCase__
   *
   * // It would output to:
   * livesDownByTheRiver
   * ```
   *
   * Usage:
   *
   * ```
   * CaseConverterEnum.CamelCase;
   * ```
   */
  CamelCase = '(camelCase)',
  CamelCaseUnderscore = 'CamelCase__',
  /**
   * [Case Converter](../index.html#case-converters) that converts [Replacer Slots](../index.html#replacer-slots) to constant case.
   *
   *  ```
   * // If you entered "Lives down BY the River" for __replacerSlot__
   * __replacerSlot__(constantCase) OR __replacerSlot__ConstantCase__
   *
   * // It would output to:
   * LIVES_DOWN_BY_THE_RIVER
   * ```
   *
   * Usage:
   *
   * ```
   * CaseConverterEnum.ConstantCase;
   * ```
   */
  ConstantCase = '(constantCase)',
  ConstantCaseUnderscore = 'ConstantCase__',
  /**
   * [Case Converter](../index.html#case-converters) that converts [Replacer Slots](../index.html#replacer-slots) to dot case.
   *
   *  ```
   * // If you entered "Lives down BY the River" for __replacerSlot__
   * __replacerSlot__(dotCase) OR __replacerSlot__DotCase__
   *
   * // It would output to:
   * lives.down.by.the.river
   * ```
   *
   * Usage:
   *
   * ```
   * CaseConverterEnum.DotCase;
   * ```
   */
  DotCase = '(dotCase)',
  DotCaseUnderscore = 'DotCase__',
  /**
   * [Case Converter](../index.html#case-converters) that converts [Replacer Slots](../index.html#replacer-slots) to kebab case.
   *
   *  ```
   * // If you entered "Lives down BY the River" for __replacerSlot__
   * __replacerSlot__(kebabCase) OR __replacerSlot__KebabCase__
   *
   * // It would output to:
   * lives-down-by-the-river
   * ```
   *
   * Usage:
   *
   * ```
   * CaseConverterEnum.KebabCase;
   * ```
   */
  KebabCase = '(kebabCase)',
  KebabCaseUnderscore = 'KebabCase__',
  /**
   * [Case Converter](../index.html#case-converters) that converts [Replacer Slots](../index.html#replacer-slots) to all lower case.
   *
   *  ```
   * // If you entered "Lives down BY the River" for __replacerSlot__
   * __replacerSlot__(lowerCase) OR __replacerSlot__LowerCase__
   *
   * // It would output to:
   * livesdownbytheriver
   * ```
   *
   * Usage:
   *
   * ```
   * CaseConverterEnum.LowerCase;
   * ```
   */
  LowerCase = '(lowerCase)',
  LowerCaseUnderscore = 'LowerCase__',
  /**
   * [Case Converter](../index.html#case-converters) that converts [Replacer Slots](../index.html#replacer-slots) to pacal case.
   *
   *  ```
   * // If you entered "Lives down BY the River" for __replacerSlot__
   * __replacerSlot__(pascalCase) OR __replacerSlot__PascalCase__
   *
   * // It would output to:
   * LivesDownByTheRiver
   * ```
   *
   * Usage:
   *
   * ```
   * CaseConverterEnum.PascalCase;
   * ```
   */
  PascalCase = '(pascalCase)',
  PascalCaseUnderscore = 'PascalCase__',
  /**
   * [Case Converter](../index.html#case-converters) that converts [Replacer Slots](../index.html#replacer-slots) to path case.
   *
   *  ```
   * // If you entered "Lives down BY the River" for __replacerSlot__
   * __replacerSlot__(pathCase) OR __replacerSlot__PathCase__
   *
   * // It would output to:
   * lives/down/by/the/river
   * ```
   *
   * Usage:
   *
   * ```
   * CaseConverterEnum.PathCase;
   * ```
   */
  PathCase = '(pathCase)',
  PathCaseUnderscore = 'PathCase__',
  /**
   * [Case Converter](../index.html#case-converters) that converts [Replacer Slots](../index.html#replacer-slots) to sentence case.
   *
   *  ```
   * // If you entered "Lives down BY the River" for __replacerSlot__
   * __replacerSlot__(sentenceCase) OR __replacerSlot__SentenceCase__
   *
   * // It would output to:
   * Lives down by the river
   * ```
   *
   * Usage:
   *
   * ```
   * CaseConverterEnum.SentenceCase;
   * ```
   */
  SentenceCase = '(sentenceCase)',
  SentenceCaseUnderscore = 'SentenceCase__',
  /**
   * [Case Converter](../index.html#case-converters) that converts [Replacer Slots](../index.html#replacer-slots) to snake case.
   *
   *  ```
   * // If you entered "Lives down BY the River" for __replacerSlot__
   * __replacerSlot__(snakeCase) OR __replacerSlot__SnakeCase__
   *
   * // It would output to:
   * lives_down_by_the_river
   * ```
   *
   * Usage:
   *
   * ```
   * CaseConverterEnum.SnakeCase;
   * ```
   */
  SnakeCase = '(snakeCase)',
  SnakeCaseUnderscore = 'SnakeCase__',
  /**
   * [Case Converter](../index.html#case-converters) that converts [Replacer Slots](../index.html#replacer-slots) to title case.
   *
   *  ```
   * // If you entered "Lives down BY the River" for __replacerSlot__
   * __replacerSlot__(titleCase) OR __replacerSlot__TitleCase__
   *
   * // It would output to:
   * Lives Down By The River
   * ```
   *
   * Usage:
   *
   * ```
   * CaseConverterEnum.TitleCase;
   * ```
   */
  TitleCase = '(titleCase)',
  TitleCaseUnderscore = 'TitleCase__',
}

export default CaseConverterEnum;
