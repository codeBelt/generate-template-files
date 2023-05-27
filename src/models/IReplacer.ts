import IObjectParamReplacer from './IObject';

export default interface IReplacer {
  readonly slot: string;
  readonly slotValue: string;

  readonly newSlot?: (params: IObjectParamReplacer) => string;
}
