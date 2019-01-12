import {ActionTree, ActionContext} from 'vuex';
import I__store__State from '@/stores/__store__(kebabCase)/models/actions/I__store__State';
import IRootState from '@/stores/IRootState';
import __store__Service from '@/stores/__store__(kebabCase)/__store__Service';
import __model__ResponseModel from '@/stores/__store__(kebabCase)/models/actions/__model__ResponseModel';
import {__store__MutationEnum} from '@/stores/__store__(kebabCase)/__store__ModuleMutation';

export enum __store__ActionEnum {
    load__model__ = 'load__model__',
}

export const __store__(camelCase)ModuleAction: ActionTree<I__store__State, IRootState> = {
    async [__store__ActionEnum.load__model__Success](context: ActionContext<I__store__State, IRootState>, payload: void) {
        context.commit(__store__MutationEnum.load__model__);

        try {
            const responseModel: __model__ResponseModel = await __store__Service.load__model__();

            context.commit(__store__MutationEnum.load__model__Success, responseModel);
        } catch (error) {
            console.log(`error`, error);
        }
    },
};
