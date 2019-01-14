import GenerateTemplateFiles from './GenerateTemplateFiles';
import IConfigItem from './models/IConfigItem';

export default (data: IConfigItem[]): Promise<void> => {
    return new GenerateTemplateFiles().generate(data);
};
