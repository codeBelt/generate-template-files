import CaseConverterEnum from '../constants/CaseConverterEnum';

export default interface IDefaultCaseConverter {
    readonly contentCase: CaseConverterEnum;
    readonly outputPathCase: CaseConverterEnum;
}
