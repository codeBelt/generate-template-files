import {createSelector} from '@ngrx/store';
import {IStore} from '../../stores/i-store';

export class __name__Selector {
    public static get__name__(param: unknown): unknown {
        return null;
    }
}

export const get__name__ = createSelector(
    (state: IStore) => state.someReducer.__name__(camelCase),
    __name__Selector.get__name__
);
