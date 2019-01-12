import {MutationTree} from 'vuex';
import I__store__State from '@/stores/__store__(kebabCase)/models/actions/I__store__State';
import __model__ResponseModel from '@/stores/__store__(kebabCase)/models/actions/__model__ResponseModel';

export enum __store__MutationEnum {
    load__model__ = 'load__model__',
    load__model__Success = 'load__model__Success',
}

export const __store__(camelCase)ModuleMutation: MutationTree<I__store__State> = {
    [__store__MutationEnum.load__model__](state: I__store__State, payload: void) {
        state.isLoading__model__ = true;
    },
    [__store__MutationEnum.load__model__Success](state: I__store__State, payload: __model__ResponseModel) {
        state.isLoading__model__ = false;
        state.__model__(camelCase) = payload;
};
