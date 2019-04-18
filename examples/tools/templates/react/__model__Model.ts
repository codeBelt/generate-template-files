import {BaseModel} from 'sjs-base-model';

/*
    // Returned Api Data Sample
    {
    }
 */
export default class __model__Model extends BaseModel {

    public readonly exampleProperty: string = '';

    /*
     * Client-Side properties (Not from API)
     */
    public noneApiProperties: unknown = null;

    constructor(data: Partial<__model__Model>) {
        super();

        this.update(data);
    }

    public update(data: Partial<__model__Model>): void {
        super.update(data);
    }

}
