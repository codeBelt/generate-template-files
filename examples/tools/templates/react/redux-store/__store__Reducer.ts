import I__store__ReducerState from './models/I__store__ReducerState';
import IAction from '../IAction';
import __store__Action, {__store__ActionUnion} from './__store__Action';
import __model__ResponseModel from './models/__model__ResponseModel';

export default class __store__Reducer {
    private static readonly _initialState: I__store__ReducerState = {
        isLoading__model__: false,
        __model__(camelCase): null,
    };

    public static reducer(state: I__store__ReducerState = __store__Reducer._initialState, action: IAction<__store__ActionUnion>): I__store__ReducerState {
        switch (action.type) {
            case __store__Action.LOAD___model__(constantCase):
                return {
                    ...state,
                    isLoading__model__: true,
                };
            case __store__Action.LOAD___model__(constantCase)_SUCCESS:
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
