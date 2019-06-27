import { Database } from "@arkecosystem/core-interfaces";
import { Model } from "./model";

export class AttributeValidation extends Model {
    constructor(pgp) {
        super(pgp);

        this.columnsDescriptor = [
            {
                name: "attribute_id",
                supportedOperators: [Database.SearchOperator.OP_EQ, Database.SearchOperator.OP_IN],
            },
            {
                name: "validator",
                supportedOperators: [Database.SearchOperator.OP_EQ],
            },
            {
                name: "status",
                supportedOperators: [Database.SearchOperator.OP_EQ, Database.SearchOperator.OP_IN],
            },
            {
                name: "reason",
                supportedOperators: [Database.SearchOperator.OP_EQ],
            },
            {
                name: "validation_type",
                supportedOperators: [Database.SearchOperator.OP_EQ],
            },
            {
                name: "timestamp",
                supportedOperators: [Database.SearchOperator.OP_LTE, Database.SearchOperator.OP_GTE],
            },
            {
                name: "expire_timestamp",
                supportedOperators: [Database.SearchOperator.OP_LTE, Database.SearchOperator.OP_GTE],
            },
        ];
    }

    /**
     * The table associated with the model.
     * @return {String}
     */
    public getTable() {
        return "attribute_validation_requests";
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
                name: "attribute_id",
            },
            {
                name: "validator",
            },
            {
                name: "status",
            },
            {
                name: "reason",
            },
            {
                name: "timestamp",
            },
            {
                name: "validation_type",
            },
            {
                name: "expire_timestamp",
                // prop: "expireTimestamp",
            },
        ]);
    }
}
