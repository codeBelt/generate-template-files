import __store__Reducer from './__store__Reducer';
import __store__Action from './__store__Action';
import I__store__State from './models/I__store__State';
import __model__ResponseModel from './models/__model__(kebabCase)/__model__ResponseModel';

describe('__store__Reducer', () => {
    it('returns default state with invalid action type', () => {
        const action: IAction<any> = {type: ''};

        expect(__store__Reducer.reducer(undefined, action)).toEqual(__store__Reducer.initialState);
    });

    it('returns default state with error action', () => {
        const errorAction: IAction<any> = {type: 'error', error: true};

        expect(__store__Reducer.reducer(__store__Reducer.initialState, errorAction))
            .toEqual(__store__Reducer.initialState);
    });

    it('puts report data on the state when fetch__model__Finished', () => {
        const actionData = new __model__ResponseModel({});
        const action = __store__Action.fetch__model__Finished(actionData) as IAction<__model__ResponseModel>;

        const actualResult: I__store__State = __store__Reducer.reducer(__store__Reducer.initialState, action);
        const expectedResult: I__store__State = {
            ...__store__Reducer.initialState,
            __model__(camelCase): actionData.data,
        };

        expect(actualResult).toEqual(expectedResult);
        expect(action).toEqual({
            payload: actionData,
            type: __store__Action.REQUEST___model__(constantCase)_FINISHED,
            error: false,
        });
    });
});
