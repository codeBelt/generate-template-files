import CheckUtility from './CheckUtility';

describe('CheckUtility.check', () => {
    const errorString = 'Some error thrown for testing purposes';

    test('should throw an error if condition is false', () => {
        expect(() => CheckUtility.check(false, errorString)).toThrowError(errorString);
    });

    test('should throw an error if input is not a boolean', () => {
        expect(() => CheckUtility.check('true' as any, errorString)).toThrowError();
    });

    test('should not throw an error if condition evaluates to a boolean true', () => {
        expect(() => CheckUtility.check(true, errorString)).not.toThrowError();
    });
});
