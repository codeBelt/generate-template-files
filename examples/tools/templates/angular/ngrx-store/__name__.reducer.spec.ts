// import {Chance} from 'chance';
import {I__name__ReducerState} from './models/i-__name__(kebabCase)-reducer-state';
import {__name__Reducer} from './__name__(kebabCase).reducer';
import {IAction} from '../i-action';
import {__name__Action} from './__name__(kebabCase).action';
import {__model__ResponseModel} from './models/__model__(kebabCase)-response.model';

describe('__name__Reducer', () => {
    // const chance: Chance.Chance = new Chance();
    let initialState: I__name__ReducerState = null;


    beforeEach(() => {
        initialState = __name__Reducer['initialState'];
    });

    afterEach(() => {
        initialState = null;
    });

    describe('non reducer action', () => {
        it('should return the initial state', () => {
            const action: IAction<void> = {type: 'none'};

            const actualResult: I__name__ReducerState = __name__Reducer.reducer(undefined, action);
            const expectedResult: I__name__ReducerState = initialState;

            expect(actualResult).toEqual(expectedResult);
        });
    });

    describe('load__model__ action', () => {
        it('should LOAD___model__(constantCase)', () => {
            const action: IAction<void> = __name__Action.load__model__();

            const actualResult: I__name__ReducerState = __name__Reducer.reducer(initialState, action);
            const expectedResult: I__name__ReducerState = {
                ...initialState,
                isLoading__model__: true,
            };

            expect(action.type).toEqual(__name__Action.LOAD___model__(constantCase));
            expect(actualResult).toEqual(expectedResult);
        });
    });

    describe('load__model__Success action', () => {
        const model: __model__ResponseModel = new __model__ResponseModel({});

        it('should LOAD___model__(constantCase)_SUCCESS', () => {
            const action: IAction<__model__ResponseModel> = __name__Action.load__model__Success(
                model
            );

            const actualResult: I__name__ReducerState = __name__Reducer.reducer(initialState, action);
            const expectedResult: I__name__ReducerState = {
                ...initialState,
                isLoading__model__: false,
                __model__(camelCase): model,
            };

            expect(action.type).toEqual(__name__Action.LOAD___model__(constantCase)_SUCCESS);
            expect(actualResult).toEqual(expectedResult);
        });
    });
});
