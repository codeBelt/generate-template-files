import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {QueryStringEncoderUtility} from '../../utilities/query-string-encoder.utility';
import {PropertyNormalizerUtility} from '../../utilities/property-normalizer.utility';
import {~Model~ResponseModel} from './models/~Model~(kebabCase)-response.model';

@Injectable()
export class ~Component~Service {
    constructor(private _http: HttpClient) {}

    public get~Model~(): Observable<~Model~ResponseModel | HttpErrorResponse> {
        const endpointUrl: string = environment.endpointUrl.provisioningCustomers;

        return this._http.get(endpointUrl).pipe(
            map((response: object) => PropertyNormalizerUtility.normalize(response)),
            map((response: object) => new ~Model~ResponseModel(response)),
            catchError((errorResponse: HttpErrorResponse): Observable<HttpErrorResponse> => of(errorResponse)),
        );
    }

}
