import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {map, switchMap} from 'rxjs/operators';
import {IAction} from '../i-action';
import {__name__Action} from './__name__(kebabCase).action';
import {ErrorsAction} from '../errors/errors.action';
import {__name__Service} from './__name__(kebabCase).service';
import {__model__ResponseModel} from './models/__model__(kebabCase)-response.model';

@Injectable()
export class __name__Effect {
    constructor(private _statusService: __name__Service, private _actions$: Actions) {}

    @Effect()
    public get__model__(): Observable<IAction<__model__ResponseModel | HttpErrorResponse>> {
        return this._actions$.pipe(
            ofType(__name__Action.LOAD___model__(constantCase)),
            switchMap((action: IAction<void>) => {
                return this._statusService.get__model__().pipe(
                    map((responseModel: __model__ResponseModel | HttpErrorResponse) => {
                        if (responseModel instanceof HttpErrorResponse) {
                            return ErrorsAction.requestFailure(responseModel);
                        }

                        return __name__Action.load__model__Success(responseModel);
                    }),
                );
            }),
        );
    }

}
