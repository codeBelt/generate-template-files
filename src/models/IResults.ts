import IReplacer from './IReplacer';

export default interface IResults {
  readonly output: {
    readonly path: string;
    readonly files: string[];
  };
  readonly stringReplacers: IReplacer[];
}
