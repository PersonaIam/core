import { bignumify } from "@arkecosystem/core-utils";
import { Model } from "./model";

export class IdentityUse extends Model {
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
    public getColumnSet() {
        return this.createColumnSet([
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
