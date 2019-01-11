import IReplacer from './IReplacer';

export default interface IResults {
    output: {
        path: string;
        outputtedFilesAndFolders: string[];
    };
    stringReplacers: IReplacer[];
}
