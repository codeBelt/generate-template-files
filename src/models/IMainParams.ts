import IReplacer from './IReplacer';
import IConfigItem from './IConfigItem';

export default interface IMainParams {
    selectedConfigItem: IConfigItem;
    answeredReplacers: IReplacer[];
    contentReplacers: IReplacer[];
    outputPathReplacers: IReplacer[];
    outputPath: string;
    forceWrite?: boolean;
}
