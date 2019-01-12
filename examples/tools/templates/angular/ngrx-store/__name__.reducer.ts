import {I__name__ReducerState} from './models/i-__name__(kebabCase)-reducer-state';
import {IAction} from '../i-action';
import {__name__Action, __name__ActionUnion} from './__name__(kebabCase).action';
import {__model__ResponseModel} from './models/__model__(kebabCase)-response.model';

export class __name__Reducer {
    private static readonly _initialState: I__name__ReducerState = {
        isLoading: false,
        __model__(camelCase)Model: null,
    };

    public static reducer(state: I__name__ReducerState = __name__Reducer._initialState, action: IAction<__name__ActionUnion>): I__name__ReducerState {
        switch (action.type) {
            case __name__Action.LOAD___model__(constantCase):
                return {
                    ...state,
                    isLoading: true,
                };
            case __name__Action.LOAD___model__(constantCase)_SUCCESS:
                return {
                    ...state,
                    isLoading: true,
                    __model__(camelCase)Model: action.payload as __model__ResponseModel,
                };
            default:
                return state;
        }
    }

}
