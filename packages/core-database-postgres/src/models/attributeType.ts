import { Database } from "@arkecosystem/core-interfaces";
import { Model } from "./model";

export class AttributeType extends Model {
    constructor(pgp) {
        super(pgp);

        this.columnsDescriptor = [
            {
                name: "name",
                supportedOperators: [Database.SearchOperator.OP_EQ, Database.SearchOperator.OP_IN],
            },
            {
                name: "data_type",
                supportedOperators: [Database.SearchOperator.OP_EQ, Database.SearchOperator.OP_IN],
            },
            {
                name: "validation",
                supportedOperators: [Database.SearchOperator.OP_EQ],
            },
            {
                name: "options",
                supportedOperators: [Database.SearchOperator.OP_EQ],
            },
        ];
    }

    /**
     * The table associated with the model.
     * @return {String}
     */
    public getTable() {
        return "attribute_types";
    }
}
