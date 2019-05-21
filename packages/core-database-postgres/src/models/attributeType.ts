import { bignumify } from "@arkecosystem/core-utils";
import { Model } from "./model";

export class AttributeType extends Model {
    /**
     * The table associated with the model.
     * @return {String}
     */
    public getTable() {
        return "attribute_types";
    }

    /**
     * The read-only structure with query-formatting columns.
     * @return {Object}
     */
    public getColumnSet() {
        return this.createColumnSet([
            {
                name: "id",
            },
            {
                name: "name",
            },
            {
                name: "data_type",
            },
            {
                name: "validation",
            },
            {
                name: "options",
            }
        ]);
    }
}
