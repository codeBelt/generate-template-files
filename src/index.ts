import GenerateTemplateFiles from './GenerateTemplateFiles';
import IConfigItem from './models/IConfigItem';
import StringUtility from './utilities/StringUtility';

exports.StringUtility = StringUtility;
exports.generateTemplateFiles = (data: IConfigItem[]): Promise<void> => {
    return new GenerateTemplateFiles().generate(data);
};
