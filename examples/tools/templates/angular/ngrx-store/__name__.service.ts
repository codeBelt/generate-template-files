import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {PropertyNormalizerUtility} from '../../utilities/property-normalizer.utility';
import {__model__ResponseModel} from './models/__model__(kebabCase)-response.model';

@Injectable()
export class __name__Service {
    constructor(private _http: HttpClient) {}

    public get__model__(): Observable<__model__ResponseModel | HttpErrorResponse> {
        const endpointUrl: string = environment.endpointUrl.provisioningCustomers;

        return this._http.get(endpointUrl).pipe(
            map((response: object) => PropertyNormalizerUtility.normalize(response)),
            map((response: object) => new __model__ResponseModel(response)),
            catchError((errorResponse: HttpErrorResponse): Observable<HttpErrorResponse> => of(errorResponse)),
        );
    }

}
