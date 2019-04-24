// import {Chance} from 'chance';
import {createStoreFixture} from '../../../__mocks__/create-store.fixture';
import {IStore} from '../../stores/i-store';
import {get__name__} from './__name__(kebabCase).selector';

describe('__name__Selector', () => {
    // const chance: Chance.Chance = new Chance();
    let mockStoreEmpty: IStore = null;
    let mockStore: IStore = null;

    beforeEach(() => {
        mockStoreEmpty = createStoreFixture();

        mockStore = {
            ...mockStoreEmpty,
        };
    });

    afterEach(() => {
        mockStoreEmpty = null;
        mockStore = null;
    });

    describe('method', () => {
        it('should ', () => {
            const actualResult: unknown = get__name__(mockStore);
            const expectedResult: unknown = null;

            expect(actualResult).toEqual(expectedResult);
        });
    });
});
