import {IAction} from '../i-action';
import {__model__ResponseModel} from './models/__model__(kebabCase)-response.model';

export type __name__ActionUnion = void | __model__ResponseModel;

export class __name__Action {

    public static readonly LOAD___model__(constantCase): string = '__name__Action.LOAD___model__(constantCase)';
    public static readonly LOAD___model__(constantCase)_SUCCESS: string = '__name__Action.LOAD___model__(constantCase)_SUCCESS';

    public static load__model__(): IAction<void> {
        return {
            type: __name__Action.LOAD___model__(constantCase),
        };
    }

    public static load__model__Success(model: __model__ResponseModel): IAction<__model__ResponseModel> {
        return {
            type: __name__Action.LOAD___model__(constantCase)_SUCCESS,
            payload: model,
        };
    }

}
