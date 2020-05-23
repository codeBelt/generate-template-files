import { errorIfFalse } from './CheckUtility';

describe('errorIfTrue', () => {
  const errorString = 'Some error thrown for testing purposes';

  test('should throw an error if condition is false', () => {
    expect(errorIfFalse(false, errorString)).toEqual(new Error(errorString));
  });

  test('should throw an error if input is not a boolean', () => {
    expect(errorIfFalse('true' as any, errorString)).toEqual(
      new Error('errorIfTrue() first argument must be a boolean but argument was of type string')
    );
  });

  test('should not throw an error if condition evaluates to a boolean true', () => {
    expect(errorIfFalse(true, errorString)).toEqual(undefined);
  });
});
