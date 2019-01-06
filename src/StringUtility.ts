import CaseEnum from './CaseEnum';

export default class StringUtil {

    public static toCase(str: string, caseType: CaseEnum): string {
        switch (caseType) {
            case CaseEnum.CamelCase:
                return StringUtil.toCamelCase(str);
            case CaseEnum.PascalCase:
                return StringUtil.toPascalCase(str);
            case CaseEnum.KebabCase:
                return StringUtil.toSentence(str, '-');
            case CaseEnum.LowerCase:
                return StringUtil.toSentence(str, '');
            case CaseEnum.UpperCase:
                return StringUtil.toConstantCase(str);
            case CaseEnum.None:
            default:
                return str;
        }
    }

    /**
     * Converts a string to a sentence case string.
     *
     * @method toSentence
     * @param str {string}
     * @param [separator] {string} Can be any string you want to use as a separator.
     * @returns {string}
     * @public
     * @static
     * @example
     *      StringUtil.toSentence("liveDown_by-the.River");
     *      // 'live down by the river'
     *
     *      StringUtil.toSentence("liveDown_by-the.River", '-');
     *      // 'live-down-by-the-river'
     *
     *      StringUtil.toSentence("liveDown_by-the.River", '_');
     *      // 'live_down_by_the_river'
     *
     *      StringUtil.toSentence("liveDown_by-the.River", '/');
     *      // 'live/down/by/the/river'
     */
    public static toSentence(str: string, separator: string = ' '): string {
        return String(str)
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
            .replace(/\s+/g, separator);
    }

    /**
     * Converts a string to a camel case string.
     *
     * @method toCamelCase
     * @param str {string}
     * @returns {string}
     * @public
     * @static
     * @example
     *      StringUtil.toCamelCase("liveDown_by-the.River");
     *      // 'liveDownByTheRiver'
     */
    public static toCamelCase(str: string): string {
        return StringUtil.toSentence(str)
        // Replace spaces between words with a string upper cased character.
            .replace(/ (\w)/g, function (_, $1) {
                return $1.toUpperCase();
            });
    }

    /**
     * Converts a hyphen string to a pascal case string.
     *
     * @method toPascalCase
     * @param str {string}
     * @returns {string}
     * @public
     * @static
     * @example
     *      StringUtil.toPascalCase("liveDown_by-the.River");
     *      // 'LiveDownByTheRiver'
     */
    public static toPascalCase(str: string): string {
        return StringUtil.toCamelCase(str)
        // Make first character uppercase.
            .replace(/^[a-zA-Z]/, function (a, b, c) {
                return a.toUpperCase();
            });
    }


    /**
     * Converts a string to a constant case string.
     *
     * @method toConstantCase
     * @param str {string}
     * @returns {string}
     * @public
     * @static
     * @example
     *      StringUtil.toConstantCase("liveDown_by-the.River");
     *      // 'LIVE_DOWN_BY_THE_RIVER'
     */
    public static toConstantCase(str: string): string {
        return StringUtil.toSentence(str, '_')
            .toUpperCase();
    }
}
