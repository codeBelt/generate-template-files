import {I~Component~ReducerState} from './models/i-~Component~(kebabCase)-reducer-state';
import {IAction} from '../i-action';
import {~Component~Action, ~Component~ActionUnion} from './~Component~(kebabCase).action';
import {~Model~ResponseModel} from './models/~Model~(kebabCase)-response.model';

export class ~Component~Reducer {
    private static readonly _initialState: I~Component~ReducerState = {
        isLoading: false,
        ~Model~(camelCase)Model: null,
    };

    public static reducer(state: I~Component~ReducerState = ~Component~Reducer._initialState, action: IAction<~Component~ActionUnion>): I~Component~ReducerState {
        switch (action.type) {
            case ~Component~Action.LOAD_~Model~(constantCase):
                return {
                    ...state,
                    isLoading: true,
                };
            case ~Component~Action.LOAD_~Model~(constantCase)_SUCCESS:
                return {
                    ...state,
                    isLoading: true,
                    ~Model~(camelCase)Model: action.payload as ~Model~ResponseModel,
                };
            default:
                return state;
        }
    }

}
