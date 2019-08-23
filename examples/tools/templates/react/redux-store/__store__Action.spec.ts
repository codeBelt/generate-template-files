import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import __store__Action from './__store__Action';
import __store__Effect from './__store__Effect';
import __model__ResponseModel from './models/__model__(kebabCase)/__model__ResponseModel';

describe('__store__Action', () => {

    let store;
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);

    beforeEach(() => {
        store = mockStore({});
    });

    describe('fetch__model__', async () => {
        it('has a successful response', async () => {
            const expectedResponse = new __model__ResponseModel({});

            jest.spyOn(__store__Effect, 'fetch__model__').mockImplementation(() => expectedResponse);

            await store.dispatch(__store__Action.fetch__model__());

            const actualResult: IAction<any>[] = store.getActions();
            const expectedResult: IAction<any>[] = [
                { type: __store__Action.REQUEST___model__(constantCase) },
                {
                    error: false,
                    payload: expectedResponse,
                    type: __store__Action.REQUEST___model__(constantCase)_FINISHED,
                },
            ];

            expect(actualResult).toEqual(expectedResult);
        });

        it('has a error response', async () => {
            const expectedResponse = new HttpErrorResponseModel();

            jest.spyOn(__store__Effect, 'fetch__model__').mockImplementation(() => expectedResponse);

            await store.dispatch(__store__Action.fetch__model__());

            const actualResult: IAction<any>[] = store.getActions();
            const expectedResult: IAction<any>[] = [
                { type: __store__Action.REQUEST___model__(constantCase) },
                {
                    error: true,
                    payload: expectedResponse,
                    type: __store__Action.REQUEST___model__(constantCase)_FINISHED,
                },
            ];

            expect(actualResult).toEqual(expectedResult);
        });
    });

    describe('fetch__model__Finished', async () => {
        it('has a successful payload', () => {
            const model = new __model__ResponseModel({});

            const actualResult = __store__Action.fetch__model__Finished(model) as IAction<__model__ResponseModel>;
            const expectedResult: IAction<__model__ResponseModel> = {
                error: false,
                payload: model,
                type: __store__Action.REQUEST___model__(constantCase)_FINISHED,
            };

            expect(actualResult).toEqual(expectedResult);
        });

        it('has a error payload', () => {
            const model = new HttpErrorResponseModel();

            const actualResult = __store__Action.fetch__model__Finished(model) as IAction<HttpErrorResponseModel>;
            const expectedResult: IAction<HttpErrorResponseModel> = {
                error: true,
                payload: model,
                type: __store__Action.REQUEST___model__(constantCase)_FINISHED,
            };

            expect(actualResult).toEqual(expectedResult);
        });
    });

});
