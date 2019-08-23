const __model__(camelCase)Json = {data: null, errors: [], success: true};

import environment from 'environment';
import axios from 'axios';
import __store__Effect from './__store__Effect';
import __model__ResponseModel from './models/__model__(kebabCase)/__model__ResponseModel';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<any>;

describe('__store__Effect', () => {

    describe('fetch__model__', () => {
        it('returns a response model and called with the correct request data', async () => {
            const mockResponse = ApiHelper.apiResponseSuccess(__model__(camelCase)Json);

            mockedAxios.mockImplementationOnce(() => Promise.resolve(mockResponse));

            const actualResult = await __store__Effect.fetch__model__() as __model__ResponseModel;

            expect(mockedAxios).toHaveBeenCalledWith({
                method: RequestMethod.Get,
                url: environment.api.__model__(camelCase),
                withCredentials: true,
                // params: {},
            });
            expect(actualResult).toBeInstanceOf(__model__ResponseModel);
            expect(actualResult.data).toEqual(__model__(camelCase)Json.data);
        });

        it('returns a error model', async () => {
            const errors: string[] = ['Unauthorized'];
            const mockResponse = ApiHelper.apiErrorResponse(errors);

            mockedAxios.mockImplementationOnce(() => Promise.resolve(mockResponse));

            const actualResult = await __store__Effect.fetch__model__() as HttpErrorResponseModel;

            expect(actualResult).toBeInstanceOf(HttpErrorResponseModel);
            expect(actualResult.errors).toEqual(errors);
        });
    });

});
