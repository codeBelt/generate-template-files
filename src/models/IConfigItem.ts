import CaseConverterEnum from '../constants/CaseConverterEnum';
import IResults from './IResults';

export default interface IConfigItem {
    option: string;
    defaultCase: CaseConverterEnum;
    entry: {
        folderPath: string;
    };
    stringReplacers: string[];
    output: {
        path: string;
        pathAndFileNameDefaultCase: CaseConverterEnum;
    };
    onComplete?: (results: IResults) => void | null;
}
