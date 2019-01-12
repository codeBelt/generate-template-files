import {Module} from 'vuex';
import I__store__State from '@/stores/__store__(kebabCase)/models/actions/I__store__State';
import IRootState from '@/stores/IRootState';
import {__store__(camelCase)ModuleGetter} from '@/stores/__store__(kebabCase)/__store__ModuleGetter';
import {__store__(camelCase)ModuleAction} from '@/stores/__store__(kebabCase)/__store__ModuleAction';
import {__store__(camelCase)ModuleMutation} from '@/stores/__store__(kebabCase)/__store__ModuleMutation';
import {namespace} from 'vuex-class';
import {BindingHelper} from 'vuex-class/lib/bindings';

export const __store__(camelCase)Namespace: string = '__store__(camelCase)Module';
export const __store__Action: BindingHelper = namespace(__store__(camelCase)Namespace).Action;
export const __store__Getter: BindingHelper = namespace(__store__(camelCase)Namespace).Getter;
export const __store__Mutation: BindingHelper = namespace(__store__(camelCase)Namespace).Mutation;

export const __store__(camelCase)Module: Module<I__store__State, IRootState> = {
    state: {
        isLoading__model__: false,
        __model__(camelCase): null,
    },
    getters: __store__(camelCase)ModuleGetter,
    mutations: __store__(camelCase)ModuleMutation,
    actions: __store__(camelCase)ModuleAction,
    namespaced: true,
};
