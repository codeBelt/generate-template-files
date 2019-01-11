import GenerateTemplateFiles from './GenerateTemplateFiles';
import IConfigItem from './models/IConfigItem';

export default (data: IConfigItem[]) => {
    return new GenerateTemplateFiles().generate(data);
};
