import {displayError} from './CheckUtility';
import colors from 'colors';

describe('displayError', () => {
    const errorString = 'Some error thrown for testing purposes';

    test('should throw an error if condition is false', () => {
        console.info = jest.fn();

        displayError(true, errorString);

        expect(console.info).toHaveBeenCalledWith(colors.bold.red(`[Error in generate-template-files]: ${colors.red(errorString)}`));
    });
});
