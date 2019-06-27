import { Database } from "@arkecosystem/core-interfaces";
import { Model } from "./model";

export class Service extends Model {
    constructor(pgp) {
        super(pgp);

        this.columnsDescriptor = [
            {
                name: "name",
                supportedOperators: [Database.SearchOperator.OP_EQ],
            },
            {
                name: "provider",
                supportedOperators: [Database.SearchOperator.OP_EQ],
            },
            {
                name: "status",
                supportedOperators: [Database.SearchOperator.OP_EQ, Database.SearchOperator.OP_IN],
            },
            {
                name: "description",
                supportedOperators: [Database.SearchOperator.OP_EQ],
            },
            {
                name: "timestamp",
                supportedOperators: [Database.SearchOperator.OP_LTE, Database.SearchOperator.OP_GTE],
            },
            {
                name: "validations_required",
                supportedOperators: [
                    Database.SearchOperator.OP_EQ,
                    Database.SearchOperator.OP_LTE,
                    Database.SearchOperator.OP_GTE,
                ],
            },
            {
                name: "attribute_types",
                supportedOperators: [Database.SearchOperator.OP_EQ, Database.SearchOperator.OP_IN],
            },
        ];
    }

    /**
     * The table associated with the model.
     * @return {String}
     */
    public getTable() {
        return "services";
    }

    /**
     * The read-only structure with query-formatting columns.
     * @return {Object}
     */
    public getColumnSetForUpdate() {
        return this.createColumnSet([
            {
                name: "id",
            },
            {
                name: "status",
            },
        ]);
    }
}
