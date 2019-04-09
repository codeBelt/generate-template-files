import {I__name__ReducerState} from './models/i-__name__(kebabCase)-reducer-state';
import {IAction} from '../i-action';
import {__name__Action, __name__ActionUnion} from './__name__(kebabCase).action';
import {__model__ResponseModel} from './models/__model__(kebabCase)-response.model';

// Version: __version__(noCase)
// Description: __description__(noCase)

export class __name__Reducer {
    public static readonly initialState: I__name__ReducerState = {
        isLoading__model__: false,
        __model__(camelCase): null,
    };

    public static reducer(state: I__name__ReducerState = __name__Reducer.initialState, action: IAction<__name__ActionUnion>): I__name__ReducerState {
        switch (action.type) {
            case __name__Action.LOAD___model__(constantCase):
                return {
                    ...state,
                    isLoading__model__: true,
                };
            case __name__Action.LOAD___model__(constantCase)_SUCCESS:
                return {
                    ...state,
                    isLoading__model__: false,
                    __model__(camelCase): action.payload as __model__ResponseModel,
                };
            default:
                return state;
        }
    }

}
