import {AxiosResponse} from 'axios';
import environment from 'environment';
import __model__ResponseModel from './models/__model__(kebabCase)/__model__ResponseModel';

export default class __store__Effect {
    private static _http = new HttpUtility();

    public static async fetch__model__(): Promise<__model__ResponseModel | HttpErrorResponseModel> {
        const endpoint: string = environment.api.__model__(camelCase);
        const response: AxiosResponse | HttpErrorResponseModel = await __store__Effect._http.get(endpoint);

        if (response instanceof HttpErrorResponseModel) {
            return response;
        }

        return new __model__ResponseModel(response.data);
    }
}
