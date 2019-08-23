import {BaseModel} from 'sjs-base-model';

/*
    // Returned Api Data Sample
    {
      "data": null,
      "success": true,
      "errors": []
    }
 */
export default class __model__ResponseModel extends BaseModel {

    public readonly data: unknown = null;
    public readonly success: boolean = true;
    public readonly errors: string[] = [];

    /*
     * Client-Side properties (Not from API)
     */
    // public noneApiProperties: unknown = null;

    constructor(data: Partial<__model__ResponseModel>) {
        super();

        this.update(data);
    }

    public update(data: Partial<__model__ResponseModel>): void {
        super.update(data);
    }

}
