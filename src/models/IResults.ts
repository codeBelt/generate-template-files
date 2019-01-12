import IReplacer from './IReplacer';

export default interface IResults {
    readonly output: {
        readonly path: string;
        readonly outputtedFilesAndFolders: string[];
    };
    readonly stringReplacers: IReplacer[];
}
