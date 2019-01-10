import ErrorAction from '../errors/ErrorAction';
import {call, put} from 'redux-saga/effects';
import __store__Service from './__store__Service';
import __store__Action from './__store__Action';
import IAction from '../IAction';
import __model__ResponseModel from './models/__model__ResponseModel';

export default class __store__Saga {
    public static* load__model__(action: IAction<void>) {
        try {
            const responseModel: __model__ResponseModel = yield call(__store__Service.load__model__);

            yield put(__store__Action.load__model__Success(responseModel));
        } catch (error) {
            yield put(ErrorAction.requestFailure(error));
        }
    }
}
