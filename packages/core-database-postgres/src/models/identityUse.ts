import { Database } from "@arkecosystem/core-interfaces";
import { Model } from "./model";

export class IdentityUse extends Model {
    constructor(pgp) {
        super(pgp);

        this.columnsDescriptor = [
            {
                name: "service_id",
                supportedOperators: [Database.SearchOperator.OP_EQ, Database.SearchOperator.OP_IN],
            },
            {
                name: "owner",
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
                name: "timestamp",
                supportedOperators: [Database.SearchOperator.OP_LTE, Database.SearchOperator.OP_GTE],
            },
            {
                name: "attributes",
                supportedOperators: [Database.SearchOperator.OP_EQ],
            },
        ];
    }

    /**
     * The table associated with the model.
     * @return {String}
     */
    public getTable() {
        return "identity_use_requests";
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
                name: "service_id",
            },
            {
                name: "owner",
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
                name: "attributes",
            },
        ]);
    }
}
