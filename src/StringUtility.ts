import CaseEnum from './CaseEnum';

export default class StringUtility {

    public static toCase(str: string, caseType: CaseEnum): string {
        switch (caseType) {
            case CaseEnum.CamelCase:
                return StringUtility.toCamelCase(str);
            case CaseEnum.ConstantCase:
                return StringUtility.toConstantCase(str);
            case CaseEnum.DotCase:
                return StringUtility.toSentence(str, '.');
            case CaseEnum.KebabCase:
                return StringUtility.toSentence(str, '-');
            case CaseEnum.LowerCase:
                return StringUtility.toSentence(str, '');
            case CaseEnum.PascalCase:
                return StringUtility.toPascalCase(str);
            case CaseEnum.PathCase:
                return StringUtility.toSentence(str, '/');
            case CaseEnum.SentenceCase:
                return StringUtility.toSentenceCase(str);
            case CaseEnum.SnakeCase:
                return StringUtility.toSentence(str, '_');
            case CaseEnum.TitleCase:
                return StringUtility.toTitleCase(str);
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
     *      StringUtility.toSentence("liveDown_by-the.River");
     *      // 'live down by the river'
     *
     *      StringUtility.toSentence("liveDown_by-the.River", '-');
     *      // 'live-down-by-the-river'
     *
     *      StringUtility.toSentence("liveDown_by-the.River", '_');
     *      // 'live_down_by_the_river'
     *
     *      StringUtility.toSentence("liveDown_by-the.River", '/');
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
     *      StringUtility.toCamelCase("liveDown_by-the.River");
     *      // 'liveDownByTheRiver'
     */
    public static toCamelCase(str: string): string {
        return StringUtility.toSentence(str)
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
     *      StringUtility.toPascalCase("liveDown_by-the.River");
     *      // 'LiveDownByTheRiver'
     */
    public static toPascalCase(str: string): string {
        return StringUtility.toCamelCase(str)
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
     *      StringUtility.toConstantCase("liveDown_by-the.River");
     *      // 'LIVE_DOWN_BY_THE_RIVER'
     */
    public static toConstantCase(str: string): string {
        return StringUtility.toSentence(str, '_')
            .toUpperCase();
    }

    /**
     * Converts a string to a title case string.
     *
     * @method toTitleCase
     * @param str {string}
     * @returns {string}
     * @public
     * @static
     * @example
     *      StringUtility.toTitleCase("liveDown_by-the.River");
     *      // 'Live Down By The River'
     */
    public static toTitleCase(str: string): string {
        return StringUtility.toSentence(str).replace(/\w\S*/g, (txt: string) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    /**
     * Converts a string to a sentence case string.
     *
     * @method toSentenceCase
     * @param str {string}
     * @returns {string}
     * @public
     * @static
     * @example
     *      StringUtility.toSentenceCase("liveDown_by-the.River");
     *      // 'Live down by the river'
     */
    public static toSentenceCase(str: string): string {
        const sentence: string = StringUtility.toSentence(str);

        return sentence.charAt(0).toUpperCase() + sentence.substr(1).toLowerCase();
    }

}
