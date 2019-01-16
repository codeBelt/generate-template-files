import {HttpClientTestingModule, HttpTestingController, TestRequest} from '@angular/common/http/testing';
import {async, TestBed} from '@angular/core/testing';
import {Chance} from 'chance';
import {HttpErrorResponse, HttpParams, HttpRequest} from '@angular/common/http';
import {__name__Service} from './__name__(kebabCase).service';
import {QueryStringEncoderUtility} from '../../utilities/query-string-encoder.utility';
import {__model__ResponseModel} from './models/__model__(kebabCase)-response.model';

describe('__name__Service', () => {
    const chance: Chance.Chance = new Chance();
    const errorStatusText: string = 'Server Error';
    const errorStatus: number = 500;
    let httpMock: HttpTestingController = null;
    let service: __name__Service = null;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [__name__Service],
            imports: [HttpClientTestingModule],
        });

        httpMock = TestBed.get(HttpTestingController);
        service = TestBed.get(__name__Service);
    });

    afterEach(() => {
        httpMock.verify();

        httpMock = null;
        service = null;
    });

    describe('get__name__', () => {
        const endpointUrl: string = 'todo/replace/with/api';
        const mockQueryParams: HttpParams = new HttpParams({
            encoder: new QueryStringEncoderUtility(),
            fromObject: {},
        });

        it('should be successful', async(() => {
            service.get__model__().subscribe((responseModel: __model__ResponseModel) => {
                expect(responseModel).toEqual(jasmine.any(__model__ResponseModel));
            });

            const testRequest: TestRequest = httpMock.expectOne((req: HttpRequest<any>) => req.url === endpointUrl);

            expect(testRequest.request.method).toEqual('GET');
            expect(testRequest.request.params).toEqual(mockQueryParams);

            testRequest.flush({replaceThisWithExpectedData: chance.string()});
        }));

        it('should error', async(() => {
            service.get__model__().subscribe((responseModel: HttpErrorResponse) => {
                expect(responseModel).toEqual(jasmine.any(HttpErrorResponse));
                expect(responseModel.statusText).toBe(errorStatusText);
                expect(responseModel.status).toBe(errorStatus);
            });

            const testRequest: TestRequest = httpMock.expectOne((req) => req.url === endpointUrl);

            testRequest.flush({}, {status: errorStatus, statusText: errorStatusText});
        }));
    });
});
