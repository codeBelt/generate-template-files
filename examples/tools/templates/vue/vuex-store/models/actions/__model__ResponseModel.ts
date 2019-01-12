import {BaseModel} from 'sjs-base-model';

/*
    // Returned Api Data Sample
    {
    }
 */
export default class __model__ResponseModel extends BaseModel {

    public readonly exampleProperty: string = '';

    /*
     * Client-Side properties
     */
    public noneApiProperty: unknown = null;

    constructor(data: Partial<__model__ResponseModel>) {
        super();

        this.update(data);
    }
    
    public update(data: Partial<__model__ResponseModel>): void {
        super.update(data);
    }
    
}
