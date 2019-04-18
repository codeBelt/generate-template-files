import {get__name__} from './__name__Selector';

describe('__name__Selector', () => {
    let mockStoreEmpty: IStore;
    let mockStore: IStore;

    beforeEach(() => {
        mockStoreEmpty = createStoreFixture();

        mockStore = {
            ...mockStoreEmpty,
        };
    });

    describe('get__name__', () => {
        it('should return ...', () => {
            const actualResult: unknown = get__name__(mockStore);
            const expectedResult: unknown = null;

            expect(actualResult).toBe(expectedResult);
        });
    });

});
