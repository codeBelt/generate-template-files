import __model__ResponseModel from './models/__model__(kebabCase)/__model__ResponseModel';
import __store__Effect from './__store__Effect';

export type __store__ActionUnion = void | __model__ResponseModel;

export default class __store__Action {
    public static readonly REQUEST___model__(constantCase): string = '__store__Action.REQUEST___model__(constantCase)';
    public static readonly REQUEST___model__(constantCase)_FINISHED: string = '__store__Action.REQUEST___model__(constantCase)_FINISHED';

    public static fetch__model__(): any {
        return async (dispatch, getState) => {
            dispatch({type: __store__Action.REQUEST___model__(constantCase)});

            const model: __model__ResponseModel | HttpErrorResponseModel = await __store__Effect.fetch__model__();

            dispatch(__store__Action.fetch__model__Finished(model));
        };
    }

    public static fetch__model__Finished(model: __model__ResponseModel | HttpErrorResponseModel): IAction<__model__ResponseModel | HttpErrorResponseModel> {
        return {
            type: __store__Action.REQUEST___model__(constantCase)_FINISHED,
            payload: model,
            error: model instanceof HttpErrorResponseModel,
        };
    }

}
