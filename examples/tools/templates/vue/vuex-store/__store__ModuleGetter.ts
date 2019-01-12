import {GetterTree} from 'vuex';
import I__store__State from '@/stores/__store__(kebabCase)/models/actions/I__store__State';
import IRootState from '@/stores/IRootState';

export enum __store__GetterEnum {
    isLoading__model__ = 'isLoading__model__',
    __model__(camelCase) = '__model__(camelCase)',
}

export const __store__(camelCase)ModuleGetter: GetterTree<I__store__State, IRootState> = {
    [__store__GetterEnum.__model__(camelCase)]: (state, getters, rootState) => state.__model__(camelCase),
    [__store__GetterEnum.isLoading__model__]: (state, getters, rootState) => state.isLoading__model__,
};
