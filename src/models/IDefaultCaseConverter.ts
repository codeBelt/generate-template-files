import CaseConverterEnum from '../constants/CaseConverterEnum';

export default interface IDefaultCaseConverter {
    readonly defaultCase: CaseConverterEnum;
    readonly defaultOutputPath: CaseConverterEnum;
}
