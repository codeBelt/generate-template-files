import HttpUtility from '@/utilities/HttpUtility';
import {AxiosResponse} from 'axios';
import __model__ResponseModel from '@/stores/__store__(kebabCase)/models/actions/__model__ResponseModel';
import environment from 'environment';

export default class __store__Service {
    private static _http: HttpUtility = new HttpUtility();

    public static async load__model__(): Promise<__model__ResponseModel> {
        const endpoint: string = environment.api.__model__(camelCase);
        const response: AxiosResponse = await __store__Service._http.cacheGet(endpoint);

        return new __model__ResponseModel(response.data);
    }
}
