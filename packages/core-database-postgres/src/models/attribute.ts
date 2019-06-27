import { Database } from "@arkecosystem/core-interfaces";
import { Model } from "./model";

export class Attribute extends Model {
    constructor(pgp) {
        super(pgp);

        this.columnsDescriptor = [
            {
                name: "owner",
                supportedOperators: [Database.SearchOperator.OP_EQ],
            },
            {
                name: "type",
                supportedOperators: [Database.SearchOperator.OP_EQ, Database.SearchOperator.OP_IN],
            },
            {
                name: "value",
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
        return "attributes";
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
                name: "owner",
            },
            {
                name: "type",
            },
            {
                name: "value",
            },
            {
                name: "timestamp",
            },
            {
                name: "expire_timestamp",
                // prop: "expireTimestamp",
            },
        ]);
    }
}
