import CaseConverterEnum from '../constants/CaseConverterEnum';
import IResults from './IResults';

export default interface IConfigItem {
    option: string;
    defaultCase: CaseConverterEnum | string;
    entry: {
        folderPath: string;
    };
    stringReplacers: string[];
    output: {
        path: string;
        pathAndFileNameDefaultCase: CaseConverterEnum | string;
    };
    onComplete?: (results: IResults) => void;
}
