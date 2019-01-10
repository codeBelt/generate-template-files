import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {map, switchMap} from 'rxjs/operators';
import {IAction} from '../i-action';
import {ErrorsAction} from '../errors/errors.action';
import {~Component~Service} from './~Component~(kebabCase).service';
import {~Component~Action} from './~Component~(kebabCase).action';
import {~Model~ResponseModel} from './models/~Model~(kebabCase)-response.model';

@Injectable()
export class ~Component~Effect {
    constructor(private _statusService: ~Component~Service, private _actions$: Actions) {}

    @Effect()
    public get~Model~(): Observable<IAction<~Model~ResponseModel | HttpErrorResponse>> {
        return this._actions$.pipe(
            ofType(~Component~Action.LOAD_~Model~(constantCase)),
            switchMap((action: IAction<void>) => {
                return this._statusService.get~Component~().pipe(
                    map((responseModel: ~Model~ResponseModel | HttpErrorResponse) => {
                        if (responseModel instanceof HttpErrorResponse) {
                            return ErrorsAction.requestFailure(responseModel);
                        }

                        return ~Component~Action.load~Model~Success(responseModel);
                    }),
                );
            }),
        );
    }

}
