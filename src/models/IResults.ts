import IReplacer from './IReplacer';

export default interface IResults {
    readonly output: {
        readonly path: string;
        readonly filesAndFolders: string[];
    };
    readonly stringReplacers: IReplacer[];
}
