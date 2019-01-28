enum CaseConverterEnum {
    /**
     *
     * [Case Converter](../index.html#case-converters) that does **not** convert [Replacer Slots](../index.html#replacer-slots). The text entered in will not be changed.
     *
     *  ```
     * // If you entered "Lives down BY the River" for __replacerSlot__
     * __replacerSlot__(noCase)
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
    /**
     * [Case Converter](../index.html#case-converters) that converts [Replacer Slots](../index.html#replacer-slots) to camel case.
     *
     *  ```
     * // If you entered "Lives down BY the River" for __replacerSlot__
     * __replacerSlot__(camelCase)
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
    /**
     * [Case Converter](../index.html#case-converters) that converts [Replacer Slots](../index.html#replacer-slots) to constant case.
     *
     *  ```
     * // If you entered "Lives down BY the River" for __replacerSlot__
     * __replacerSlot__(constantCase)
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
    /**
     * [Case Converter](../index.html#case-converters) that converts [Replacer Slots](../index.html#replacer-slots) to dot case.
     *
     *  ```
     * // If you entered "Lives down BY the River" for __replacerSlot__
     * __replacerSlot__(dotCase)
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
    /**
     * [Case Converter](../index.html#case-converters) that converts [Replacer Slots](../index.html#replacer-slots) to kebab case.
     *
     *  ```
     * // If you entered "Lives down BY the River" for __replacerSlot__
     * __replacerSlot__(kebabCase)
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
    /**
     * [Case Converter](../index.html#case-converters) that converts [Replacer Slots](../index.html#replacer-slots) to all lower case.
     *
     *  ```
     * // If you entered "Lives down BY the River" for __replacerSlot__
     * __replacerSlot__(lowerCase)
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
    /**
     * [Case Converter](../index.html#case-converters) that converts [Replacer Slots](../index.html#replacer-slots) to pacal case.
     *
     *  ```
     * // If you entered "Lives down BY the River" for __replacerSlot__
     * __replacerSlot__(pascalCase)
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
    /**
     * [Case Converter](../index.html#case-converters) that converts [Replacer Slots](../index.html#replacer-slots) to path case.
     *
     *  ```
     * // If you entered "Lives down BY the River" for __replacerSlot__
     * __replacerSlot__(pathCase)
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
    /**
     * [Case Converter](../index.html#case-converters) that converts [Replacer Slots](../index.html#replacer-slots) to sentence case.
     *
     *  ```
     * // If you entered "Lives down BY the River" for __replacerSlot__
     * __replacerSlot__(sentenceCase)
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
    /**
     * [Case Converter](../index.html#case-converters) that converts [Replacer Slots](../index.html#replacer-slots) to snake case.
     *
     *  ```
     * // If you entered "Lives down BY the River" for __replacerSlot__
     * __replacerSlot__(snakeCase)
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
    /**
     * [Case Converter](../index.html#case-converters) that converts [Replacer Slots](../index.html#replacer-slots) to title case.
     *
     *  ```
     * // If you entered "Lives down BY the River" for __replacerSlot__
     * __replacerSlot__(titleCase)
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
}

export default CaseConverterEnum;
