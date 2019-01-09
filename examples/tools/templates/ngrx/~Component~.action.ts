import {IAction} from '../i-action';
import {~Model~ResponseModel} from './models/~Model~(kebabCase)-response.model';

export type ~Component~ActionUnion = void | ~Model~ResponseModel;

export class ~Component~Action {

    public static readonly LOAD_~Model~(constantCase): string = '~Component~Action.LOAD_~Model~(constantCase)';
    public static readonly LOAD_~Model~(constantCase)_SUCCESS: string = '~Component~Action.LOAD_~Model~(constantCase)_SUCCESS';

    public static load~Model~(): IAction<void> {
        return {
            type: ~Component~Action.LOAD_~Model~(constantCase),
        };
    }

    public static load~Model~Success(model: ~Model~ResponseModel): IAction<~Model~ResponseModel> {
        return {
            type: ~Component~Action.LOAD_~Model~(constantCase)_SUCCESS,
            payload: model,
        };
    }

}
