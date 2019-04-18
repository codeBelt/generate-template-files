import {createSelector, Selector} from 'reselect';

export class __name__Selector {

    public static get__name__(something: unknown): unknown {
        return null;
    }

}

export const get__name__: Selector<IStore, unknown> = createSelector(
    (state: IStore) => state.someReducer,
    __name__Selector.get__name__,
);
