/**
 * @ignore
 */
export default class CheckUtility {
    /**
     * Helper function for throwing errors if a given expression evaluates to false.
     * This function is strict and will throw an error the the type of the first
     * argument is not "boolean".
     */
    public static check(predicate: boolean, errorMessage: string): void {
        if (CheckUtility._isNotTypeBoolean(predicate) === true) {
            throw CheckUtility.check(false, `CheckUtility.check()'s first argument must be a boolean but argument was of type ${typeof predicate}`);
        } else if (predicate === true) {
            return;
        }

        throw new Error(errorMessage);
    }

    private static _isNotTypeBoolean(value: any): boolean {
        return typeof value !== 'boolean';
    }
}
