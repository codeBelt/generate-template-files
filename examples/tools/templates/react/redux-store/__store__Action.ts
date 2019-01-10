import IAction from '../IAction';
import __model__ResponseModel from './models/__model__ResponseModel';

export type __store__ActionUnion = void | __model__ResponseModel;

export default class __store__Action {
    public static readonly LOAD___model__(constantCase): string = '__store__Action.LOAD___model__(constantCase)';
    public static readonly LOAD___model__(constantCase)_SUCCESS: string = '__store__Action.LOAD___model__(constantCase)_SUCCESS';

    public static load__model__(): IAction<void> {
        return {
            type: __store__Action.LOAD___model__(constantCase),
        };
    }

    public static load__model__Success(models: __model__ResponseModel): IAction<__model__ResponseModel> {
        return {
            type: __store__Action.LOAD___model__(constantCase)_SUCCESS,
            payload: models,
        };
    }
}
