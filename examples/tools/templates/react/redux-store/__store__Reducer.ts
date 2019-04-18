import I__store__State from './models/I__store__State';
import __store__Action, {__store__ActionUnion} from './__store__Action';
import __model__ResponseModel from './models/__model__(kebabCase)/__model__ResponseModel';

export default class __store__Reducer {
    public static readonly initialState: I__store__State = {
        __model__(camelCase): null,
    };

    public static reducer(state: I__store__State = __store__Reducer.initialState, action: IAction<__store__ActionUnion>): I__store__State {
        if (action.error) {
            return state;
        }

        switch (action.type) {
            case __store__Action.REQUEST___model__(constantCase)_FINISHED:
                return {
                    ...state,
                    __model__(camelCase): action.payload as __model__ResponseModel,
                };
            default:
                return state;
        }
    }
}
